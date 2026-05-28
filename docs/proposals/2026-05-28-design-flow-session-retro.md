# Proposal — design-flow improvements from a real session retro

Date: 2026-05-28
Source: a 6-hour ruthless / ruthless-teach-delivery / ruthless-design session on the Fire Your Coach repo (OCPM-192: Hyrox lead-magnet intake SPEC).
Status: proposal · discussion welcome before any source edits.

## TL;DR

Seven candidates, ranked by the time they would have saved in the session that produced this retro. The session ran the full Ruthless flow (Shape → Challenge → Phase 1 → … → Phase 4 AUDIT-1), then went through one round of Codex adversarial review and a polish + scope reframe. Most of the wasted hours fell on specific gates that exist in the skills today but don't fire hard enough — or that don't exist at all.

| # | Candidate | Target file(s) | Effort |
| - | --------- | -------------- | ------ |
| 1 | Phase 3 needs a "match-the-reference" gate before SPEC closes | `ruthless-design/SKILL.md` (Phase 3) | M |
| 2 | AUDIT-1 needs explicit semantic-HTML invariants | `ruthless-design/reference/audit-1-design.md` | S |
| 3 | Shape produces two scope lists, not one | `ruthless/reference/shape.md` (sub-stage C + E + Common Failures) | S |
| 4 | `ruthless-teach-delivery` detects rich config and switches to extract-mode | `ruthless-teach-delivery/SKILL.md` (Step 0) | M |
| 5 | Phase 3 → Phase 4 needs a hard Playwright-verify gate | `ruthless-design/SKILL.md` (Phase 3 gate) | S |
| 6 | Issue-tracker artifacts move to Phase 6 / 7, not pre-Phase 4 | `ruthless-design/SKILL.md` (Phase 7) + `ruthless-ship` | M |
| 7 | Auto-invoke `/polish` + `/critique` as a Phase 3 closing ritual | `ruthless-design/SKILL.md` (complementary skills table) | S |

The three I'd implement first are **#2, #3, #5** — all small, high-leverage, no architectural side effects. The other four are larger debates the maintainer should weigh in on.

---

## The session in one paragraph

I drove the Ruthless flow on a closed-alpha training app: Shape produced an MVP brief, Challenge stress-tested it, Phase 3 produced a 1,300-line design-system SPEC HTML and a 600-line CSS promotion, AUDIT-1 cleared 11 items, the commit went to a branch, Codex adversarial review caught 3 issues, the user reframed scope ("don't touch the existing in-app intake — this is a standalone flow"), and we did a multi-hour follow-up to reconcile docs, Linear issues, and an HTML pattern fix. Most of those follow-up hours were avoidable.

---

## Candidate 1 — Phase 3 needs a "match-the-reference" gate

### What happened

Phase 3 produced a design-system SPEC for a new intake surface. The closest existing reference (`onboarding.html`, 1,500 lines) lived in the same design-system folder. The first SPEC pass felt "unpolished compared to onboarding"; we rebuilt twice using onboarding.html as a literal structural clone before the user accepted it. Each rebuild was ~45 minutes.

### Why the existing gate didn't catch it

Phase 3 says (excerpt from `source/skills/ruthless-design/SKILL.md`):

> **Gate**: Both files exist. Open the design-system page in a browser and confirm rendering. Self-check: *"Could a second engineer implement this from these two files alone?"*

That's an *implementability* self-check, not a *parity-with-the-bar* self-check. The relevant reference page exists in the same folder — but the gate doesn't require comparing against it.

### Proposed change

Add a step at the end of Phase 3, before declaring the deliverable done:

> **Reference parity self-check.** Identify the nearest existing design-system page (same family — e.g. same intake folder, same drilldown family, same sheet pattern). Open both side-by-side. Verify the new SPEC matches the reference's bar on:
>
> - Vertical rhythm + section spacing
> - Frame-help prose density and depth (do paragraphs explain the *why*, or are they one-liners?)
> - Notes-panel writing quality (do `<h4>` headings carry real weight?)
> - Eyebrow tracking, label hierarchy, kicker treatment
> - Inline CSS comment quality + rationale density
>
> If the new SPEC reads like a junior version of the reference, rebuild. *"Could a designer tell which one I wrote?"* If yes — rebuild.

### Why this works

The reference page is the bar that the operator has already accepted. Comparing against it forces the SPEC up to that bar before the operator has to call out *"this doesn't feel as polished"*.

### Risk

Could lead to over-cloning if there's no reference (greenfield project). Easy mitigation: the check is conditional on a reference existing.

---

## Candidate 2 — AUDIT-1 needs explicit semantic-HTML invariants

### What happened

Three times in the same session, I wrote `<div role="button">` containing inner `<button>` chips and an `<input type="date">`. Each time the browser flattened the inner buttons out of the outer container and broke layout. The user pointed it out twice with screenshots; on the third occurrence I saved a memory (`feedback_no_nested_buttons.md`). AUDIT-1 didn't catch any of them. Codex adversarial review eventually caught it post-commit, but only after a 2-hour cycle.

### Why the existing checklist didn't catch it

The current `audit-1-design.md` has sections for *Reuse before re-invent*, *Brand fidelity*, *States covered*, *Interaction parity*, *Documentation completeness*, *Timezone*, *Half-half deltas*. None of them check baseline accessibility/semantic-HTML invariants.

### Proposed change

Add a new section to [`source/skills/ruthless-design/reference/audit-1-design.md`](../../source/skills/ruthless-design/reference/audit-1-design.md):

````markdown
## Semantic HTML + accessibility invariants

- [ ] No interactive content nested inside another interactive container — no `<button>` / `<a>` / `<input>` / `<select>` / `role="button"` / `<label>` containing another labelable element. If a clickable card has child controls (chips, toggles, inputs), the child controls render as **siblings**, not descendants. Use radio-group + `<label>` + sibling-panel patterns instead of `<div role="button">` wrappers.
- [ ] Every `<button>` has an explicit `type="button"` (unless it's a real submit).
- [ ] Icon-only controls carry `aria-label`.
- [ ] Focus rings use `:focus-visible` (not `:focus`) and visible-by-default — never `outline: none` without a replacement.
- [ ] Dynamic updates that announce on every tick (timers) are NOT inside `aria-live` regions; status changes are.
- [ ] Form controls have associated labels (`<label for>` or wrapping `<label>`); helper text is wired via `aria-describedby`.
- [ ] Status / severity is not signaled by color alone — backed by icon, label, or shape.
````

### Why this works

These are invariants that any senior frontend reviewer checks first. They're cheap to enumerate in a checklist. The nested-interactive rule alone catches a high-recurrence bug class.

### Risk

None — these are widely accepted accessibility baselines. Worst case: a project explicitly opts out of one and notes it in the audit findings.

---

## Candidate 3 — Shape produces two scope lists, not one

### What happened

The Shape stage produced an MVP brief with 8 explicit cuts. At Phase 4 handoff, the user interrupted: *"this is a standalone lead-magnet flow; don't touch the existing in-app intake."* That single boundary triggered:

- 3 documents to rewrite (mvp-brief, engineering plan, design SPEC intro)
- 4 Linear issues to re-edit (parent + 3 sub-issues)
- New acceptance criteria ("`ALL_INTAKE_STEPS` in `app/src/web/app.js` is untouched") and a regression-test acceptance criterion

Total: ~90 minutes of doc reconciliation, all avoidable.

### Why the existing checklist didn't catch it

The Shape brief template ([`source/skills/ruthless/reference/shape.md`](../../source/skills/ruthless/reference/shape.md)) has a strong *Explicit Cuts* section — what's NOT in V1 — but no equivalent section for *what existing surfaces must keep working unchanged*. Those are different questions:

- **Cuts**: "What feature are we deferring?"
- **Boundaries**: "What existing code path must this work not touch?"

A project at scale doesn't just have features — it has existing surfaces that real users hit today. Shaping V1 against an active codebase needs both lists.

### Proposed change

Two surgical edits to `source/skills/ruthless/reference/shape.md`:

**1. Add a new sub-stage between C (Explicit Cuts) and D (Aesthetic Direction):**

````markdown
### C.5 Scope Boundaries · what existing surfaces stay untouched

For each existing user-facing surface or code path the MVP could plausibly touch, name explicitly whether it stays untouched. The question is not *"what are we cutting?"* (that's the previous section) but *"what do real users currently hit that we promise not to change?"*

Format:

- **Untouched:** [name the surface / module / route]
  - Real users hitting it today: [who, count if known]
  - Why untouched: [keeps working for current users / risk of regression too high / out of strategic scope]
  - How verified: [regression test name, manual smoke, "no diff in this directory"]

Aim for 3+ named boundaries when the project has active users. If the project is pre-launch, this sub-stage is a one-liner: *"no existing surfaces — greenfield."*

**Why this matters:** scope drift at handoff time is the #1 cause of mid-project rewrites. Naming the boundaries during Shape — when the operator can still adjust — is 10× cheaper than reconciling docs and issues during handoff.
````

**2. Add a new field to the MVP Brief template (sub-stage E):**

````markdown
## Scope Boundaries (existing surfaces that stay untouched)
- [Surface / code path] — Verified by: [regression test or smoke check]
- ...
````

**3. Add one item to "Common Failure Modes":**

````markdown
- **Cuts list named, boundaries list missing.** When the codebase has active users, the boundaries list is as important as the cuts list. Without it, scope drifts at handoff.
````

### Why this works

Both the cuts and the boundaries get named while the operator is in the Shape mindset — not 6 hours later during a Phase 3 → Phase 4 handoff. Sub-issues and engineering docs reflect the boundary from day one.

### Risk

Adds friction to greenfield Shapes (where the answer is *"no existing surfaces"*). Mitigated by allowing a one-liner answer in that case.

---

## Candidate 4 — `ruthless-teach-delivery` detects rich config and switches to extract-mode

### What happened

I invoked `ruthless-teach-delivery` on a project where `CLAUDE.md` was already ~500 lines covering paths, primitives, test conventions, deployment, workflow rules. The user had to manually override the interview with: *"CLAUDE.md is already extremely detailed on delivery conventions. Most of what this skill normally captures already exists there — paths, primitives, test conventions, deployment, workflow rules. The goal of this invocation is to extract and synthesize that into a formal Delivery Conventions block with markers, NOT to re-interview the user from scratch."*

The skill should detect this case natively.

### Why the existing skill doesn't catch it

The current Step 1 ("Review What's Already Known") summarizes for the user and asks for confirmation, but the 5-section interview still runs. There's no "skip the interview, just extract and synthesize" branch.

### Proposed change

Add a Step 0 before Step 1 in [`source/skills/ruthless-teach-delivery/SKILL.md`](../../source/skills/ruthless-teach-delivery/SKILL.md):

````markdown
### Step 0 — Detect rich existing config

Before walking the 5 sections, measure how much of the answer already lives in `{{config_file}}`. Signals of a rich-config project:

- `{{config_file}}` is >300 lines
- Has explicit sections on Development Commands, Architecture, Testing, Deployment, Workflow Rules
- Has ADR pointers (e.g. `docs/engineering/decisions.md`)
- Has named design-system tokens or canonical CSS file
- Has explicit pre-push / pre-merge gates

If 3+ signals are present, surface this to the user:

> Your `{{config_file}}` already documents most of what this skill normally interviews for. I'll **extract and synthesize** into the Delivery Conventions block instead of running the interview. I'll flag anything I can't extract and ask only those questions. Proceed?

If the user accepts, skip to Section 5 (load-bearing primitives — often the only piece not yet captured) and treat Sections 1–4 as extraction tasks against the existing config. Write the Delivery Conventions block referencing back to the relevant `{{config_file}}` section rather than duplicating content.

If the user declines, run the full interview.
````

### Why this works

Saves context, avoids re-asking, respects projects that have already done the writing work. Crucially, the block produced *references back* into `{{config_file}}` rather than duplicating content — so a single source of truth.

### Risk

Heuristic-based detection could mis-fire. Mitigated by surfacing the detection and asking before switching modes.

---

## Candidate 5 — Phase 3 → Phase 4 needs a hard Playwright-verify gate

### What happened

I twice asked the user to review visual SPEC HTML I had not opened in a browser myself. The user pushed back: *"come on, this is broken — don't ask me to review stuff you haven't checked yourself — use playwright."* That feedback is now in my persistent memory (`feedback_playwright_verify_before_review.md`). It happened again later in the same session.

The Phase 3 gate language ("Open the design-system page in a browser and confirm rendering") is soft — it doesn't say *what* to check, doesn't require a screenshot, and was repeatedly skipped under time pressure.

### Why the existing gate doesn't catch it

The gate is a one-liner: *"open and confirm rendering."* That's easy to skip when feeling fast. There's no artifact to produce, so there's nothing to point at and say *"this isn't done."*

### Proposed change

Replace the Phase 3 gate paragraph with:

````markdown
**Gate** (hard requirement to advance to Phase 4):

1. Both files (visual spec + interaction spec) exist.
2. Open the design-system page in a headless browser (Playwright or equivalent) and produce:
   - **A console-error report.** Zero unhandled errors / warnings / 404s on initial load.
   - **One screenshot per load-bearing frame** (the ★-marked frames from Phase 1 states). Save under the project's screenshot convention.
   - **A semantic-HTML probe report** that walks the DOM and asserts the AUDIT-1 invariants (no nested interactive content; every button has `type`; focus rings present). Report violations as a list — zero is the gate.
3. Self-check: *"Could a second engineer implement this from these two files alone?"* If no, the spec is incomplete.
4. Reference parity check (see Candidate 1).

Do not advance until 1–4 are satisfied. Specifically: **do not hand the SPEC to a reviewer for visual review until you have viewed it yourself in a browser and saved screenshots.**
````

### Why this works

The screenshots and probe report are concrete artifacts. They either exist or they don't — making the gate enforceable, not aspirational. The same probe machinery becomes reusable for AUDIT-2.

### Risk

Adds tooling assumption (Playwright). Mitigated by saying "or equivalent" — any headless probe works. Projects without a browser-tool can skip the probe but should still produce screenshots manually.

---

## Candidate 6 — Issue-tracker artifacts move to Phase 6 / 7, not pre-Phase 4

### What happened

I created Linear sub-issues (OCPM-193 / OCPM-194 / OCPM-195) before Phase 3 SPEC was finalized. Across this session, those issues had to be edited:

- Once after Phase 3 SPEC introduced new acceptance criteria
- Once after AUDIT-1 added a regression-test criterion
- Once after the scope reframe ("standalone, don't touch `ALL_INTAKE_STEPS`")
- Once after Codex adversarial review introduced the semantic-HTML contract

Each rewrite was ~5–10 minutes. ~30 minutes of rework on issue text that could have been one clean write at Phase 6 / 7.

### Why the existing flow doesn't catch it

`ruthless-design` Phase 7 mentions "PR description links the design-system section(s) touched, the engineering spec, and the issue" — but doesn't say *when* to create the issue. `ruthless-ship` references "issue tracker" but doesn't sequence issue creation against the design phases.

### Proposed change

Two paragraphs added — one to `ruthless-design/SKILL.md` Phase 1, one to Phase 7:

**Phase 1 footer:**

> **Note on issue tracker.** If a parent issue already exists (created during Shape or Discovery), link it and continue. Do NOT create sub-issues at Phase 1 — sub-issue acceptance criteria depend on Phase 3 SPEC, Phase 4 AUDIT-1, and (if used) adversarial review findings. Creating them now means editing them 3+ times before they're handed off. Sub-issues are a Phase 6 / 7 output.

**Phase 7 first paragraph:**

> **Issue-tracker artifacts.** Create sub-issues NOW (post-AUDIT-2), not earlier. Acceptance criteria draw from the SPEC, the AUDIT-1 findings that were addressed, the AUDIT-2 parity checks, and any adversarial-review-introduced contracts. Doing this at Phase 7 means writing each issue once.

### Why this works

Each issue gets one clean write reflecting the locked SPEC + audit state. No churn.

### Risk

Some teams want a parent issue early to anchor cross-team discussion. The change preserves that — only sub-issues are deferred.

---

## Candidate 7 — Auto-invoke `/polish` + `/critique` as a Phase 3 closing ritual

### What happened

`ruthless-design/SKILL.md` lists complementary skills (Impeccable's `/polish`, `/critique`, etc.) as optional, with guidance *"never invoke more than 2–3 complementary skills per phase — each costs context."* I followed that guidance and skipped them. After Phase 3, the user explicitly invoked `/polish` to improve the result. The skill *should* have been a Phase 3 ritual, not an after-the-fact rescue.

### Why the existing recommendation doesn't catch it

The complementary skills table positions them as accelerators *"when a phase needs heavier work."* In practice, every Phase 3 produces a SPEC that benefits from polish + critique. Framing them as optional means they get skipped under time pressure.

### Proposed change

Replace the relevant row in the complementary skills table with explicit ritual language. In `ruthless-design/SKILL.md`:

````markdown
### Phase 3 closing ritual (when Impeccable or equivalent is installed)

Before declaring SPEC done, run:

- `/polish` — one pass on the SPEC HTML and accompanying engineering doc. Catches inconsistent spacing, prose density gaps, comment-style drift.
- `/critique` — one independent UX read. Catches design decisions that look right in isolation but fail under outside eyes.

These are not optional accelerators — they are the Phase 3 acceptance ritual when the tooling is available. If the tools aren't installed, do an equivalent self-pass with explicit polish + critique mindsets.

Skip `/extract`, `/clarify`, `/audit` at Phase 3 unless something specific calls for them — they are Phase 4 / 5 / 6 fits.
````

### Why this works

Makes polish + critique a default, not an opt-in. Concentrates them at the phase where they have the highest return on investment (Phase 3 SPEC is the load-bearing artifact for Phases 4–7).

### Risk

Conflicts with the "never invoke more than 2–3 complementary skills per phase" guidance. The new framing supersedes that for Phase 3 specifically.

---

## Suggested rollout

If the maintainer agrees with the direction, suggested order:

1. **Land #2, #3, #5 first** — small, no architectural debate, immediately useful.
2. **Discuss #4 and #7** — both involve mode/branching logic and warrant a design discussion.
3. **#1 and #6** — larger structural edits to Phase 3 / Phase 7; benefit from being landed together with the #4 + #7 discussion outcome.

This proposal is comment-friendly: each candidate stands alone and can be approved / rejected / amended independently.

---

## What this proposal is NOT

- It is not a complaint about the skills. The skills produced a high-quality SPEC and caught real anti-patterns during Shape and Challenge. The issues here are gaps at specific gates, not foundational problems.
- It is not a request for new skills. Every candidate edits an existing skill or reference file — nothing new is being introduced.
- It is not implementation-blocking on the proposing project. The improvements would help the next project that runs the flow.
