# Ruthless — post–PR #1 follow-up

Actionable backlog after merging [PR #1](https://github.com/fernandezdavid/ruthless/pull/1) (ship-family skills + `link-global`). Use this as a checklist; check items off as you ship them.

**Last reviewed:** 2026-05-28 (against `main` @ merge `ac9ac8a`)

---

## Already done on `main`

- [x] README: install all five skills (`cp -r …/.`, `link-global`)
- [x] README: “What’s Inside” — strategy + ship-family tables
- [x] README: repo structure lists all `source/skills/*`
- [x] Generated outputs aligned with source (no stale `feature-*` skill dirs)
- [x] `link-global` / `unlink-global`: unknown `--provider` exits non-zero
- [x] `link-global`: missing provider build dir exits non-zero

---

## High value (do next)

### 1. Align `CONTRIBUTING.md` with the ship family  ✅ done (PR #2)

**Problem:** Contributors are told every new skill needs a **MANDATORY PREPARATION** block invoking `ruthless`, a **routing list** in `ruthless/SKILL.md`, and a README **roadmap section** — none of which match how ship-family skills work today.

**Tasks:**

- [x] Document naming convention: `ruthless-*` prefix; verbs = coordinators, nouns = single-job skills; no `-flow` suffix
- [x] Split guidance: **strategy skills** vs **ship-family skills** (prep optional for ship family; cross-links instead of mandatory prep)
- [x] Replace “routing list in `ruthless/SKILL.md`” with what actually exists (handoff in teach mode + README skill map)
- [x] Point “update README” to **What's Inside** / install sections, not a removed roadmap block

**Files:** `CONTRIBUTING.md`

---

### 2. Connect governance to the ship family  ✅ done (PR #2)

**Problem:** Governance filters generic PM slop but doesn’t nudge agents toward delivery skills when work is clearly feature/UI shaped.

**Tasks:**

- [x] Add a short “When building features” subsection to `source/skills/ruthless/reference/governance.md`
  - Non-trivial UI/feature → suggest `{{command_prefix}}ruthless-ship` (or discovery/design directly if brief exists)
  - Remind: delivery conventions block from `{{command_prefix}}ruthless-teach-delivery`
- [x] Run `npm run build` and commit regenerated provider outputs

**Files:** `source/skills/ruthless/reference/governance.md`, generated `*/skills/ruthless/reference/governance.md`

---

### 3. Disambiguate the two “discovery” concepts  ✅ done (PR #2)

**Problem:** `ruthless` stage **Discover** (`reference/discover.md`) vs skill **`ruthless-discovery`** (feature brief) sound the same; wrong skill gets invoked.

**Tasks:**

- [x] Add a “Two kinds of discovery” subsection to README (under What's Inside or How to Use It)
- [x] One paragraph in `source/skills/ruthless-discovery/SKILL.md` upstream (“not the same as `/ruthless` Discover stage”)
- [x] Optional one-liner in `source/skills/ruthless/reference/discover.md` pointing to ship family for *feature* work

**Files:** `README.md`, `source/skills/ruthless-discovery/SKILL.md`, optionally `source/skills/ruthless/reference/discover.md`

---

## Medium value (hardening & clarity)

### 4. Mark external skill accelerators as optional  ✅ done (PR #2)

**Problem:** `ruthless-design` and `ruthless-discovery` reference commands like `/distill`, `/audit`, `/positioning-messaging` that live outside this repo (often [Impeccable](https://github.com/pbakaus/impeccable) or other installs).

**Tasks:**

- [x] In `source/skills/ruthless-design/SKILL.md` complementary-skills table: prefix with “Optional (external)” and note Impeccable where relevant
- [x] Same for `ruthless-discovery` complementary-skills table
- [x] One sentence in README ship-family section: accelerators are optional; flow works without them

**Files:** `source/skills/ruthless-design/SKILL.md`, `source/skills/ruthless-discovery/SKILL.md`, `README.md`

---

### 5. Document install paths for `npm` vs clone  ✅ done (PR #2)

**Problem:** `package.json` `"files"` publishes only `source/`, `scripts/`, docs — not `.claude/` etc. Easy to assume `npm install ruthless` installs invocable skills.

**Tasks:**

- [x] README install section: explicit note — **skills are used via clone/copy/symlink**, not via npm package contents alone
- [ ] Optional: add `INSTALL.md` link from README if this doc grows

**Files:** `README.md`

---

### 6. Cursor delivery conventions target  ✅ done (PR #2 amend)

**Problem:** Build maps Cursor `{{config_file}}` → `.cursorrules`. Many Cursor projects use `AGENTS.md` or `.cursor/rules` instead.

**Resolution:** Support both — Cursor now defaults to `AGENTS.md` (matches the cross-tool standard), with a `{{config_file_note}}` placeholder injected at the first mention in each skill explaining that `.cursorrules` is also valid for legacy projects. Other providers get an empty `{{config_file_note}}`.

**Tasks:**

- [x] Decide: change Cursor placeholder to `AGENTS.md`, document “copy block to `.cursorrules` if you use that”, or support both in skill text — **support both**
- [x] Update `scripts/build.mjs` Cursor `config_file` and add the `config_file_note` placeholder
- [x] Insert `{{config_file_note}}` at the first config_file mention in `ruthless`, `ruthless-teach-delivery`, and each ship-family skill
- [x] Rebuild all providers

**Files:** `scripts/build.mjs`, ship-family + `ruthless-teach-delivery` + `ruthless` source skills

---

### 7. “First hour” onboarding path  ✅ done (PR #2)

**Problem:** Skill map exists but no ordered path for a new project.

**Tasks:**

- [x] Add short subsection to README, e.g. **Getting started on a new project**
  1. Install all five skills
  2. `/ruthless teach` → `.ruthless.md` + governance
  3. Optional `/ruthless-teach-delivery` → Delivery Conventions block
  4. For a non-trivial feature: `/ruthless-ship`

**Files:** `README.md`

---

## Lower priority (V2 / polish)

### 8. Examples directory

- [ ] `examples/sample-discovery.md` — minimal feature discovery brief
- [ ] `examples/sample-delivery-conventions.md` — snippet for `AGENTS.md` / `CLAUDE.md`
- [ ] Link from README

---

### 9. Build & link script tests

- [ ] Test `build.mjs`: placeholders replaced, no `{{…}}` left in outputs, frontmatter `name:` matches dir
- [ ] Test `link-global.mjs`: unknown provider → exit 1; missing source dir → exit 1
- [ ] Wire into `package.json` (`npm test`) and CI

**Files:** `tests/` or `scripts/*.test.mjs`, `package.json`, `.github/workflows/*.yml`

---

### 10. CI: generated output drift check

- [ ] GitHub Action: `npm run rebuild` then `git diff --exit-code` on `.claude/`, `.cursor/`, etc.
- [ ] Fails PRs that edit generated dirs without updating `source/`

---

### 11. Stage skills as V2 (explicit roadmap)

**Problem:** README no longer promises `/shape`, `/discover` as separate invocable skills; ship family partially covers execution, not PM-stage shortcuts.

**Tasks:**

- [ ] Add **Roadmap** subsection to README or this file: promote `discover`, `validate`, `shape`, etc. from `ruthless/reference/` to direct-invocable skills when ready
- [ ] Avoid duplicating ship-family responsibilities

---

### 12. Release hygiene

- [ ] `CHANGELOG.md` entry for ship-family + link-global
- [ ] Tag `v0.2.0` (or bump `package.json` version) when follow-up batch is done

---

## Suggested PR batches

| PR | Items | Rough scope |
|----|--------|-------------|
| **A — Docs** | 1, 3, 4, 5, 7 | CONTRIBUTING + README + small skill text |
| **B — Governance** | 2 | governance.md + rebuild |
| **C — Tooling** | 9, 10 | tests + CI |
| **D — Polish** | 6, 8, 11, 12 | Cursor config, examples, roadmap, release |

---

## Notes

- Always edit `source/skills/` only; run `npm run build` (or `rebuild`) before committing provider dirs.
- Ship-family skills intentionally **do not** require a MANDATORY PREPARATION block — they assume governance + optional `.ruthless.md` / Delivery Conventions instead.
- Delete or archive this file once the checklist is empty, or move remaining items to GitHub Issues.
