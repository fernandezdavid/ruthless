#!/usr/bin/env node
/**
 * Ruthless unlink-global
 *
 * Removes the symlinks created by `link-global.mjs`. Only removes entries
 * that are symlinks pointing at the build output — real directories at the
 * global location are left alone (someone else's install).
 *
 * Pass --provider=<name> to unlink a non-Claude provider.
 * Pass --provider=all to unlink every provider's symlinks.
 *
 * Usage:
 *   node scripts/unlink-global.mjs
 *   node scripts/unlink-global.mjs --provider=all
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
  const args = { provider: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--provider=')) args.provider = a.split('=')[1];
  }
  return args;
}

function unlinkProvider(providerKey) {
  const cfg = PROVIDER_GLOBAL[providerKey];
  const sourceDir = path.join(ROOT, cfg.source);
  if (!fs.existsSync(sourceDir) || !fs.existsSync(cfg.global)) {
    return { removed: 0, kept: 0, missing: 1 };
  }

  const skills = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  let removed = 0, kept = 0, missing = 0;
  for (const name of skills) {
    const target = path.join(cfg.global, name);
    const sourceAbs = path.join(sourceDir, name);

    let exists = false, isSymlink = false, currentTarget = null;
    try {
      const stat = fs.lstatSync(target);
      exists = true;
      isSymlink = stat.isSymbolicLink();
      if (isSymlink) currentTarget = fs.readlinkSync(target);
    } catch (_) { /* not present */ }

    if (!exists) {
      missing++;
      continue;
    }
    if (!isSymlink) {
      console.log(`  = ${providerKey}/${name} kept (not a symlink, real directory)`);
      kept++;
      continue;
    }
    if (currentTarget !== sourceAbs) {
      console.log(`  = ${providerKey}/${name} kept (symlink points elsewhere: ${currentTarget})`);
      kept++;
      continue;
    }
    fs.unlinkSync(target);
    console.log(`  ✗ ${providerKey}/${name} unlinked`);
    removed++;
  }

  return { removed, kept, missing };
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

  console.log(`\nRuthless unlink-global — provider: ${providers.join(', ')}\n`);

  let totalRemoved = 0, totalKept = 0;
  for (const p of providers) {
    const { removed, kept } = unlinkProvider(p);
    totalRemoved += removed;
    totalKept += kept;
  }

  console.log(`\nDone. ${totalRemoved} removed · ${totalKept} kept.`);
}

main();
