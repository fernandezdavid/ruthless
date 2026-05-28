# Contributing to Ruthless

Thanks for being interested. Ruthless is an opinionated project — the goal is
not to cover every PM framework that exists, but to encode a specific lens
(zero-to-one, discovery-heavy, taste-driven, ruthless focus) in a way that
changes how AI agents do product work.

Contributions are welcome. This guide explains what fits and what doesn't.

## Philosophy

Ruthless fights generic AI product thinking the same way Impeccable fights
generic AI design. Before contributing, read the [core principles][principles]
and the [anti-pattern catalog][anti-patterns]. If your contribution doesn't
align with the lens, it probably doesn't belong here — but it might belong in
a fork or a companion project.

[principles]: source/skills/ruthless/reference/principles.md
[anti-patterns]: source/skills/ruthless/reference/anti-patterns.md

**What's in scope:**
- Sharper articulation of existing principles or anti-patterns
- New anti-patterns backed by specific, observable failure cases
- New specialized skills that fit the existing families (see "What's Inside" in the README)
- Improvements to the build system or provider support
- Bug fixes to placeholder handling, frontmatter generation, etc.

**What's out of scope (for now):**
- Generic PM framework documentation (RICE, MoSCoW, Jobs-to-be-Done deep dives)
  — unless they're framed against a specific anti-pattern
- Growth PM content — Ruthless is tuned for zero-to-one
- New skills whose value depends on a non-Ruthless skill pack being installed —
  the repo itself stays self-contained. **Optional** references to external
  packs (e.g. Impeccable accelerators in the ship-family Complementary skills
  tables) are fine when the flow works without them.

## Repo Structure

```
ruthless/
├── source/skills/<name>/        ← source of truth; edit here only
│   ├── SKILL.md
│   ├── reference/*.md
│   └── scripts/                 ← (optional) helper scripts
├── scripts/build.mjs            ← transforms source → provider outputs
├── .claude/ .cursor/ .gemini/ .codex/ .agents/   ← generated; committed for
│                                                    install-without-build
├── package.json
├── README.md
├── LICENSE
└── NOTICE.md
```

**Edit `source/` only.** Never edit files in the generated provider directories
directly — they will be overwritten on the next build.

## Placeholders

Source files use placeholders that the build replaces per provider:

| Placeholder          | Replaced with (example)                          |
|----------------------|--------------------------------------------------|
| `{{command_prefix}}` | `/` (most) or `$` (Codex)                        |
| `{{model}}`          | `Claude` / `Gemini` / `GPT` / `the model`        |
| `{{config_file}}`    | `CLAUDE.md` / `GEMINI.md` / `AGENTS.md`          |
| `{{ask_instruction}}`| Provider-appropriate "ask the user" instruction  |

When writing source content, use these placeholders instead of hard-coding a
specific provider's conventions. See `scripts/build.mjs` for the full map.

## Development Workflow

Requirements: Node 18+.

```bash
# Build (regenerates all provider directories from source/)
npm run build

# Clean and rebuild
npm run rebuild

# Clean only (removes generated directories)
npm run clean
```

After any change to `source/`, run `npm run build` and commit both the source
edit and the regenerated provider outputs together. Reviewers will check that
the two are consistent.

## Skill families and naming

Ruthless skills are organized into two families:

- **Strategy** (`ruthless`) — the orchestrator that owns customer, problem,
  strategic bet, positioning, MVP scoping. Installs the governance block.
- **Ship family** (`ruthless-ship`, `ruthless-discovery`, `ruthless-design`,
  `ruthless-teach-delivery`) — feature-level pipeline: discovery brief →
  design + build → ship.

**Naming convention** for any new skill in this repo:

- Prefix with `ruthless-` so it clusters with the family in users' skill lists.
- **Verbs** for skills that coordinate other skills (e.g. `ruthless-ship`).
- **Nouns** for single-job skills (e.g. `ruthless-discovery`, `ruthless-design`).
- No `-flow` suffix — every skill is a flow; the word adds noise.

If a contribution doesn't fit either family cleanly, raise an issue first so
we can talk through whether it belongs.

## Adding a New Skill

1. Create `source/skills/<skill-name>/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: "Short description; appears in autocomplete."
   argument-hint: "[optional-arg]"
   user-invocable: true
   license: Apache 2.0
   ---
   ```
2. **Decide which family the skill belongs to**, and write the body accordingly:
   - **Strategy skills** assume Ruthless governance is already active in the
     project (via the block in `{{config_file}}`) and `.ruthless.md` may exist.
     They can link to other strategy reference files and the governance block;
     they don't need a mandatory `ruthless` invocation.
   - **Ship-family skills** read the `Delivery Conventions` block at startup
     (installed by `{{command_prefix}}ruthless-teach-delivery`) and may read
     `.ruthless.md` for strategic context. They cross-link to siblings rather
     than mandatory-prep into `ruthless`.
3. Add reference files as needed in `source/skills/<skill-name>/reference/*.md`.
4. **Cross-link, don't centralize.** Reference siblings inline where it's
   useful (e.g. ship-family skills already reference each other in their
   startup sections). There is no central routing list to update.
5. **Update the README's "What's Inside" section** so the skill appears in
   either the Strategy or Ship-family table. If the skill warrants a separate
   family, propose the new family structure in the PR.
6. **For strategy skills**, also consider whether `source/skills/ruthless/reference/governance.md`
   should mention the new skill (so governance can nudge agents toward it).
7. Run `npm run build` and verify outputs in each provider directory.

Match the existing quality bar: specificity over vagueness, explicit
anti-patterns, gate-driven flow where appropriate, quantitative criteria
where possible. If the skill reads like generic PM advice, it's not ready.

## Adding a New Provider

1. Add an entry to `PROVIDERS` in `scripts/build.mjs` with `displayName`,
   `configDir`, `frontmatterFields`, and `placeholders`.
2. Run `npm run build` and verify the new directory is created correctly.
3. Add an installation section to `README.md` for the new provider.

## Opening a Pull Request

- Describe the anti-pattern or gap your change addresses.
- Include a before/after if you're sharpening an existing principle or pattern.
- Run `npm run build` before committing; include the regenerated outputs.
- Keep commits small and focused.

## License

By contributing, you agree that your contributions will be licensed under the
Apache License 2.0 (same as the project).
