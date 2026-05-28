#!/usr/bin/env node
/**
 * Ruthless Build System
 *
 * Reads skills from `source/skills/<name>/` and emits provider-specific
 * outputs into one dot-directory per provider at the repo root.
 *
 * Providers:
 *   - Claude Code     → .claude/skills/
 *   - Cursor          → .cursor/skills/
 *   - Gemini CLI      → .gemini/skills/
 *   - Codex CLI       → .codex/skills/
 *   - Agent Skills    → .agents/skills/  (generic standard; VS Code Copilot, etc.)
 *
 * Placeholders replaced per provider:
 *   - {{command_prefix}}    → `/` or `$`
 *   - {{model}}             → `Claude`, `Gemini`, `GPT`, `the model`, …
 *   - {{config_file}}       → `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, …
 *   - {{config_file_note}}  → empty for most providers; for Cursor, an
 *                              inline parenthetical noting that
 *                              `.cursorrules` is also valid
 *   - {{ask_instruction}}   → provider-appropriate instruction for asking user
 *
 * Invocation:
 *   node scripts/build.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'source', 'skills');

// ---------------------------------------------------------------------------
// Provider configuration
// ---------------------------------------------------------------------------

const PROVIDERS = {
  'claude-code': {
    displayName: 'Claude Code',
    configDir: '.claude',
    frontmatterFields: ['user-invocable', 'argument-hint', 'license'],
    placeholders: {
      model: 'Claude',
      config_file: 'CLAUDE.md',
      config_file_note: '',
      ask_instruction: 'STOP and ask the user to clarify what you cannot infer.',
      command_prefix: '/',
    },
  },
  cursor: {
    displayName: 'Cursor',
    configDir: '.cursor',
    frontmatterFields: ['license'],
    placeholders: {
      model: 'the model',
      config_file: 'AGENTS.md',
      config_file_note: ' (Cursor reads both `AGENTS.md` and `.cursorrules` — use whichever your project already has, or create `AGENTS.md` if neither exists)',
      ask_instruction: 'Ask the user directly to clarify what you cannot infer.',
      command_prefix: '/',
    },
  },
  gemini: {
    displayName: 'Gemini CLI',
    configDir: '.gemini',
    frontmatterFields: [],
    placeholders: {
      model: 'Gemini',
      config_file: 'GEMINI.md',
      config_file_note: '',
      ask_instruction: 'Ask the user directly to clarify what you cannot infer.',
      command_prefix: '/',
    },
  },
  codex: {
    displayName: 'Codex CLI',
    configDir: '.codex',
    frontmatterFields: ['argument-hint', 'license'],
    placeholders: {
      model: 'GPT',
      config_file: 'AGENTS.md',
      config_file_note: '',
      ask_instruction: 'Ask the user directly to clarify what you cannot infer.',
      command_prefix: '$',
    },
  },
  agents: {
    displayName: 'Agent Skills',
    configDir: '.agents',
    frontmatterFields: ['user-invocable', 'argument-hint', 'license'],
    placeholders: {
      model: 'the model',
      config_file: 'AGENTS.md',
      config_file_note: '',
      ask_instruction: 'Ask the user directly to clarify what you cannot infer.',
      command_prefix: '/',
    },
  },
};

// ---------------------------------------------------------------------------
// Frontmatter parsing (minimal — key: value and key: "value")
// ---------------------------------------------------------------------------

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const [, block, body] = match;
  const frontmatter = {};

  for (const line of block.split('\n')) {
    if (!line.trim()) continue;
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === 'true') value = true;
    else if (value === 'false') value = false;

    frontmatter[key] = value;
  }

  return { frontmatter, body: body.replace(/^\n+/, '') };
}

// ---------------------------------------------------------------------------
// Source reader
// ---------------------------------------------------------------------------

function readSkills() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`);
  }

  const skills = [];
  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillDir = path.join(SOURCE_DIR, entry.name);
    const skillMd = path.join(skillDir, 'SKILL.md');
    if (!fs.existsSync(skillMd)) continue;

    const { frontmatter, body } = parseFrontmatter(fs.readFileSync(skillMd, 'utf-8'));

    const references = [];
    const refDir = path.join(skillDir, 'reference');
    if (fs.existsSync(refDir)) {
      for (const refFile of fs.readdirSync(refDir)) {
        if (!refFile.endsWith('.md')) continue;
        references.push({
          name: path.basename(refFile, '.md'),
          content: fs.readFileSync(path.join(refDir, refFile), 'utf-8'),
        });
      }
    }

    skills.push({
      name: frontmatter.name || entry.name,
      description: frontmatter.description || '',
      license: frontmatter.license || '',
      userInvocable: frontmatter['user-invocable'] === true,
      argumentHint: frontmatter['argument-hint'] || '',
      body,
      references,
    });
  }

  return skills;
}

// ---------------------------------------------------------------------------
// Placeholder replacement
// ---------------------------------------------------------------------------

function applyPlaceholders(text, placeholders) {
  return text
    .replace(/\{\{command_prefix\}\}/g, placeholders.command_prefix)
    .replace(/\{\{model\}\}/g, placeholders.model)
    .replace(/\{\{config_file\}\}/g, placeholders.config_file)
    .replace(/\{\{config_file_note\}\}/g, placeholders.config_file_note || '')
    .replace(/\{\{ask_instruction\}\}/g, placeholders.ask_instruction);
}

// ---------------------------------------------------------------------------
// Frontmatter emitter
// ---------------------------------------------------------------------------

const FIELD_MAP = {
  'user-invocable': (skill) => skill.userInvocable ? true : null,
  'argument-hint': (skill) => (skill.userInvocable && skill.argumentHint) || null,
  license: (skill) => skill.license || null,
};

function emitFrontmatter(skill, provider) {
  const lines = ['---', `name: ${skill.name}`];

  // Description may contain colons and quotes — always wrap in quotes, escape inner quotes.
  const desc = skill.description.replace(/"/g, '\\"');
  lines.push(`description: "${desc}"`);

  for (const field of provider.frontmatterFields) {
    const getter = FIELD_MAP[field];
    if (!getter) continue;
    const value = getter(skill);
    if (value == null || value === '') continue;
    lines.push(`${field}: ${formatYamlValue(value)}`);
  }

  lines.push('---');
  return lines.join('\n');
}

function formatYamlValue(value) {
  if (typeof value === 'boolean') return String(value);
  const str = String(value);
  // Quote values that YAML would otherwise parse as flow sequences,
  // flow mappings, or that contain special chars.
  if (/^[\[{]/.test(str) || /[:#]/.test(str)) {
    return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return str;
}

// ---------------------------------------------------------------------------
// Writer
// ---------------------------------------------------------------------------

function cleanDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

function buildProvider(providerKey, provider, skills) {
  const outputRoot = path.join(ROOT, provider.configDir, 'skills');
  // Only clean the skills/ subdirectory — users/devs may have other files
  // (settings, config, etc.) in the provider's dot-directory that must be preserved.
  cleanDir(outputRoot);

  let refCount = 0;

  for (const skill of skills) {
    const skillOutDir = path.join(outputRoot, skill.name);
    const frontmatter = emitFrontmatter(skill, provider);
    const body = applyPlaceholders(skill.body, provider.placeholders);

    writeFile(path.join(skillOutDir, 'SKILL.md'), `${frontmatter}\n\n${body}`);

    for (const ref of skill.references) {
      const refContent = applyPlaceholders(ref.content, provider.placeholders);
      writeFile(path.join(skillOutDir, 'reference', `${ref.name}.md`), refContent);
      refCount++;
    }
  }

  const userInvocable = skills.filter((s) => s.userInvocable).length;
  console.log(
    `✓ ${provider.displayName.padEnd(14)} → ${provider.configDir}/skills/  ` +
    `(${skills.length} skill${skills.length === 1 ? '' : 's'}, ` +
    `${userInvocable} invocable, ${refCount} reference file${refCount === 1 ? '' : 's'})`
  );
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
  const skills = readSkills();
  if (skills.length === 0) {
    console.error('No skills found in source/skills/');
    process.exit(1);
  }

  console.log(`\nRuthless build — ${skills.length} skill${skills.length === 1 ? '' : 's'} from source/skills/\n`);

  for (const [key, provider] of Object.entries(PROVIDERS)) {
    buildProvider(key, provider, skills);
  }

  console.log('\nBuild complete.\n');
}

main();
