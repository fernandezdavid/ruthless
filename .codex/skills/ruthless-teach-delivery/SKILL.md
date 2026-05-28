---
name: ruthless-teach-delivery
description: "One-time setup that captures how this project ships features end-to-end — paths, primitives, test conventions, workflow tooling — and writes a Delivery Conventions block to the project's config file. Companion to `ruthless teach` (strategic context) and teach-impeccable (design context). The ruthless-ship / ruthless-discovery / ruthless-design skills read this block at startup so they don't re-derive conventions from scratch each session. Run once per project; re-run after major workflow changes."
argument-hint: "[force]"
license: Apache 2.0
---

# Ruthless teach delivery

A one-time interview that captures the *how-we-ship* layer of a project. Strategic context (why, for whom) lives in `.ruthless.md` via `$ruthless teach`. Design context (palette, typography, voice) lives in `AGENTS.md` via `$teach-impeccable` if installed. **This skill fills the gap between them**: the project conventions that delivery work depends on — where things live, how they're tested, how they ship.

Without this, the `ruthless-ship` family of skills re-derives paths and conventions from scratch every session, wastes context, and drifts.

## When to run

- **First time** running `$ruthless-ship`, `$ruthless-discovery`, or `$ruthless-design` in a new project.
- After a major workflow change (new design system, new test framework, switching issue trackers).
- Re-run with `$ruthless-teach-delivery force` to refresh after substantive changes.

## When NOT to run

- The user is in the middle of a delivery task → don't interrupt; finish first, then suggest running this.
- The project is research-only / no shipping happens → not applicable.
- A `Delivery Conventions` block already exists and is current → skip; mention it briefly and continue.

## Inputs read at startup

1. **`AGENTS.md`** — check for existing `Delivery Conventions` block (markers below). Also check for an Impeccable design-context section to reference instead of re-asking.
2. **`.ruthless.md`** if present — read product wedge, target user, audience size. These inform some delivery choices (e.g. private alpha vs public release).
3. **Repo cues** — scan for tells before asking:
   - `package.json` → test runner, framework
   - `.github/`, `linear.app` mentions → issue tracker
   - `playwright.config.*`, `cypress.config.*` → browser test tool
   - `brand/`, `design-system/`, `storybook/` → design system location
   - `docs/engineering/`, `docs/product/`, `ADR*` → documentation paths

Don't re-ask what the repo already tells you. Pre-fill answers, confirm with the user.

## The interview (5 sections)

For each section: detect what you can, surface a recommendation, the user confirms or corrects. Use multi-choice with a recommended option whenever the answer is enumerable.

### Section 1 — Source of truth (design system)

- **Where does the visual source of truth live?**
  - HTML catalog (e.g. `brand/design-system/*.html`) — recommended for hand-rolled apps
  - Storybook
  - Figma library (with sync to code)
  - None — design lives in the app code itself
- **Where is the canonical CSS / tokens file?**
- **Are design tokens versioned/named** (e.g. Fieldhouse v1)? Capture the name.

### Section 2 — Documentation paths

- **Discovery briefs go to**: default `docs/product/discovery/` — confirm or override
- **Engineering specs go to**: default `docs/engineering/` — confirm or override
- **ADRs (architecture decisions) go to**: default `docs/engineering/decisions.md` — confirm or override
- **Changelog**: file path (default `CHANGELOG.md`) and audience (users vs engineers)
- **Screenshots for PRs**: default `/tmp/<branch>/` (local), attach via web UI — confirm

### Section 3 — Test conventions

- **Test runner**: Node native test / Jest / Vitest / Mocha / pytest / other
- **Test directory pattern**: `tests/unit/`, `__tests__/`, `*.test.ts` colocated, etc.
- **TDD or test-after?** Capture the project's stance.
- **Browser-driven testing tool**: Playwright / Cypress / Puppeteer / none
- **How to run all tests** (the exact command, including `cd` if needed)
- **Smoke / e2e command** if separate

### Section 4 — Workflow & tracking

- **Issue tracker**: Linear / GitHub Issues / Jira / none. If Linear or similar: capture the project URL and team.
- **Branch strategy**: feature branches with PRs / trunk-based / other
- **Pre-push gates**: tests, lint, type-check, manual review, adversarial review skill, etc.
- **Pre-merge gates**: green CI, screenshots required, ADR if pattern change, changelog entry

### Section 5 — Load-bearing primitives

This is the most valuable section — captures the components the `ruthless-design` audit gates check against.

- **Sheet / drawer / modal**: name 1–2 canonical ones. Capture contract (height %, animation duration, dismissal paths supported).
- **Status indicators**: how does the project show readiness / state / severity? (chips, dots, badges, color text).
- **Card / list-item**: what's the recurring pattern?
- **Empty state pattern**: how does the project signal "no data here"?
- **Form / input pattern**: what's the default field treatment?

Capture file paths or class names so the audit gates can verify reuse.

## Output

Write a clearly-marked block to `AGENTS.md` (create the file if absent). Use these markers — the `ruthless-ship` family looks for them:

```markdown
<!-- delivery:conventions:start v1 -->
## Delivery Conventions

> Captured by `$ruthless-teach-delivery` on YYYY-MM-DD. Re-run with `$ruthless-teach-delivery force` after substantive workflow changes.

### Source of truth
- Design system: <path/URL>
- Canonical CSS / tokens: <path>
- Design system name/version: <e.g. Fieldhouse v1, or N/A>

### Documentation paths
- Discovery briefs: `<path>`
- Engineering specs: `<path>`
- ADRs: `<path>`
- Changelog: `<path>` (audience: <users | engineers>)
- Screenshots: `<path convention>`

### Test conventions
- Runner: <runner>
- Directory: `<path/pattern>`
- Approach: <TDD | test-after>
- Browser tool: <tool or none>
- Run all tests: `<command>`
- Smoke / e2e: `<command or N/A>`

### Workflow
- Issue tracker: <Linear/GitHub/none> · <project URL if applicable>
- Branch strategy: <feature branches | trunk-based | other>
- Pre-push gates: <list>
- Pre-merge gates: <list>

### Load-bearing primitives
- Sheet contract: <name, height, animation, dismissal>
- Status indicators: <pattern>
- Card / list-item: <pattern>
- Empty state: <pattern>
- Form / input: <pattern>

### Brand / design handoff
- Design context source: <`$teach-impeccable` output in this file | dedicated brand doc at `<path>` | none captured>
- Voice rules: <`<path>` | inline | N/A>

<!-- delivery:conventions:end -->
```

## Coordination with other teach skills

- **`$ruthless teach`** runs first (strategic context → `.ruthless.md`). At the end of its run, it should offer to chain into `$ruthless-teach-delivery` if no Delivery Conventions block exists.
- **`$teach-impeccable`** (if installed) handles design context. Read its output if present; recommend running it if absent but don't require it.

The three teach skills are independent but complementary:

```
ruthless teach              → why we ship          → .ruthless.md
teach-impeccable            → how it looks         → AGENTS.md#impeccable
ruthless-teach-delivery     → how we ship          → AGENTS.md#delivery
```

## How to enter

State explicitly: *"Running ruthless-teach-delivery."* Then walk through the 5 sections. For each, pre-fill from repo cues, surface recommendations, get confirmation.

End by writing the block to `AGENTS.md` and confirming with the user. Mention next steps:

> *"Delivery Conventions written to `AGENTS.md`. The `$ruthless-ship` / `$ruthless-discovery` / `$ruthless-design` skills will now read this block at startup. Run `$ruthless-teach-delivery force` to refresh after major workflow changes."*

## How to exit early

The user can say *"skip section X"* or *"that's enough, write what we have"*. Honor it; mark skipped sections as `TODO` in the output block so they're easy to fill later. Ask the user directly to clarify what you cannot infer.
