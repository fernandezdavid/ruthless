#!/usr/bin/env node
/**
 * Ruthless link-global
 *
 * Symlinks every skill built into `<repo>/.claude/skills/<name>` from
 * `~/.claude/skills/<name>` so every Claude Code project on this machine
 * picks them up. Re-runs of `npm run build` then propagate live — no copying.
 *
 * Safe to re-run:
 *   - Already the correct symlink → skip (logged)
 *   - Missing target            → create symlink
 *   - Exists as something else  → skip + warn (use --force to overwrite)
 *
 * Default: links to ~/.claude/skills AND ~/.codex/skills (the two providers most
 * users actually run). Pass --provider=<name> for a single provider, or
 * --provider=all to link every supported provider (cursor, gemini, agents too).
 *
 * Usage:
 *   node scripts/link-global.mjs                  # Claude + Codex
 *   node scripts/link-global.mjs --force          # overwrite existing
 *   node scripts/link-global.mjs --provider=claude
 *   node scripts/link-global.mjs --provider=all
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROVIDER_GLOBAL = {
  claude: { source: '.claude/skills', global: path.join(os.homedir(), '.claude', 'skills') },
  cursor: { source: '.cursor/skills', global: path.join(os.homedir(), '.cursor', 'skills') },
  gemini: { source: '.gemini/skills', global: path.join(os.homedir(), '.gemini', 'skills') },
  codex:  { source: '.codex/skills',  global: path.join(os.homedir(), '.codex',  'skills') },
  agents: { source: '.agents/skills', global: path.join(os.homedir(), '.agents', 'skills') },
};

const DEFAULT_PROVIDERS = ['claude', 'codex'];

function parseArgs(argv) {
  const args = { force: false, provider: null };
  for (const a of argv.slice(2)) {
    if (a === '--force') args.force = true;
    else if (a.startsWith('--provider=')) args.provider = a.split('=')[1];
  }
  return args;
}

function linkProvider(providerKey, force) {
  const cfg = PROVIDER_GLOBAL[providerKey];
  const sourceDir = path.join(ROOT, cfg.source);
  if (!fs.existsSync(sourceDir)) {
    console.error(`✗ ${providerKey}: source dir ${cfg.source} missing — run \`npm run build\` first.`);
    return { linked: 0, skipped: 0, warned: 0, failed: true };
  }
  fs.mkdirSync(cfg.global, { recursive: true });

  const skills = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  let linked = 0, skipped = 0, warned = 0;
  for (const name of skills) {
    const target = path.join(cfg.global, name);
    const sourceAbs = path.join(sourceDir, name);

    let exists = false;
    let isSymlink = false;
    let currentTarget = null;
    try {
      const stat = fs.lstatSync(target);
      exists = true;
      isSymlink = stat.isSymbolicLink();
      if (isSymlink) currentTarget = fs.readlinkSync(target);
    } catch (_) { /* not present */ }

    if (exists && isSymlink && currentTarget === sourceAbs) {
      console.log(`  = ${providerKey}/${name} already linked`);
      skipped++;
      continue;
    }

    if (exists && !force) {
      const what = isSymlink ? `symlink → ${currentTarget}` : 'real directory';
      console.warn(`  ⚠ ${providerKey}/${name} skipped — exists as ${what}. Re-run with --force to overwrite.`);
      warned++;
      continue;
    }

    if (exists) {
      fs.rmSync(target, { recursive: true, force: true });
    }
    fs.symlinkSync(sourceAbs, target);
    console.log(`  ✓ ${providerKey}/${name} → ${sourceAbs}`);
    linked++;
  }

  return { linked, skipped, warned, failed: false };
}

function main() {
  const args = parseArgs(process.argv);
  let providers;
  if (args.provider === 'all') providers = Object.keys(PROVIDER_GLOBAL);
  else if (args.provider) providers = [args.provider];
  else providers = DEFAULT_PROVIDERS;

  const unknown = providers.filter((p) => !PROVIDER_GLOBAL[p]);
  if (unknown.length > 0) {
    console.error(`✗ Unknown provider(s): ${unknown.join(', ')}`);
    console.error(`  Valid: ${Object.keys(PROVIDER_GLOBAL).join(', ')}, all`);
    process.exit(1);
  }

  console.log(`\nRuthless link-global — provider: ${providers.join(', ')}${args.force ? ' (--force)' : ''}\n`);

  let totalLinked = 0, totalSkipped = 0, totalWarned = 0, anyFailed = false;
  for (const p of providers) {
    const { linked, skipped, warned, failed } = linkProvider(p, args.force);
    totalLinked += linked;
    totalSkipped += skipped;
    totalWarned += warned;
    if (failed) anyFailed = true;
  }

  console.log(`\nDone. ${totalLinked} linked · ${totalSkipped} already-linked · ${totalWarned} skipped.`);
  if (totalWarned > 0) {
    console.log(`Re-run with --force to overwrite the ${totalWarned} skipped target(s).`);
  }
  if (anyFailed) process.exit(1);
}

main();
