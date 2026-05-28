---
name: ruthless-design
description: "Gate-driven workflow from idea to prototype variations to design-system spec to implementation to tests for UI changes that introduce a new component, surface, or interaction. Auto-invoke when the request introduces a new bottom sheet, card, chart, drill-down, screen, interaction pattern, or any UI primitive that doesn't already exist in the project's design system. Skip for typos, copy edits, color tweaks, bug fixes that don't change the design contract, or extensions of existing patterns where the design is settled."
---

# Ruthless design

A 7-phase pipeline with hard gates between each. The goal: minimize back-and-forth between "what we wanted" and "what ships" by forcing variations before code, design-system specs before implementation, and audits before claiming done.

## Startup — read project conventions

Before Phase 1, look for a `Delivery Conventions` block in `GEMINI.md` (markers: `<!-- delivery:conventions:start` / `end`). It tells you:
- Where the design system lives (canonical visual source of truth)
- Where engineering specs go
- Where ADRs go
- Test conventions and runners
- Load-bearing primitives (sheet contracts, status indicators, etc.) — critical for AUDIT-1 parity checks

If the block is **present**: read it, use its values throughout.

If the block is **absent**: offer to run `/ruthless-teach-delivery` first. If the user declines or defers, fall back to typical defaults (`brand/design-system/`, `docs/engineering/`, etc.) and flag every default explicitly in the conversation so the user can correct as you go. Note: AUDIT-1 parity checks against "load-bearing primitives" will be weaker without captured conventions — you'll be reasoning from code rather than from a documented contract.

**When to use**: A new UI component, new interaction surface, new screen, or non-trivial revision of an existing one. Cues: "let's add a sheet that…", "design a card for…", "redesign the drill-down…".

**When NOT to use**: Typos, copy edits, color tweaks, bug fixes that don't change the design contract, small extensions of an existing pattern.

When in doubt, ask: *"This feels like a new-pattern task — should we run the design flow, or is this a small extension?"*

**Upstream**: `/ruthless-discovery` produces a discovery brief that feeds into Phase 1. If that brief exists, read it — don't re-frame from scratch. If it doesn't, decide whether to invoke discovery first (for Large work) or proceed (for Medium/Small where the frame is already clear).

---

## The 7 phases

```
1. FRAME      → problem statement + enumerated states
2. PROTOTYPE  → 2+ variations (for new patterns) OR 1 (for extensions)
3. SPEC       → chosen design lands in design-system HTML + interaction .md
4. AUDIT-1    → pre-implementation checklist (design.md)
5. IMPLEMENT  → port CSS from design-system, TDD domain logic
6. AUDIT-2    → post-implementation parity check (parity.md)
7. SHIP       → screenshots, ADR if needed, changelog, PR
```

Each phase has a deliverable. Don't advance until the deliverable exists. State the current phase explicitly to the user: *"Frame: …"*, *"Prototype: …"*, etc.

---

## Phase 1 — FRAME

**Goal**: One short paragraph describing the user job, the data, and an explicit enumeration of states.

**Deliverable**: Inline in the conversation, ~150 words. Or read from `/ruthless-discovery`'s output if available.

Required:
- **Job**: What is the user trying to do with this specific surface?
- **Data**: What does the backend provide? Be specific — actual API fields.
- **States** (enumerate, don't list generically):
  - Empty / first-time
  - Partial data (e.g. young plan, sparse history, one half of the window empty)
  - Full / steady state
  - Loading
  - Error
  - Today / future cells if time-aware
  - Deload / special weeks if plan-aware
  - Timezone implications if date-aware
- **Constraints**: Form-factor, design-system tokens, performance budget

**Gate**: At least 4 states enumerated. Data source identified by file:line. If not, do more research before proposing pixels.

---

## Phase 2 — PROTOTYPE

**Goal**: Show the user concrete variations before committing.

**Deliverable**:
- **New pattern**: 2+ variations as ASCII mocks (for terminal review) OR design-system frame-sets (for browser review). Each shows the trade-off in one sentence.
- **Extension of existing pattern**: 1 mock acceptable, but reference the existing primitive being extended.

Rules:
- Variations must differ on a **decision dimension** (information density, navigation pattern, color usage, etc.), not on cosmetic differences.
- Each variation includes the worst-case state (sparse data, error), not just the happy path.
- Use real example data from the database when available, not lorem ipsum.

**Gate**: User picks one OR rejects all (loop back to FRAME). Do not advance until you have an explicit pick. "Sounds good" is not a pick — confirm: *"Going with variation B, correct?"*

---

## Phase 3 — SPEC

**Goal**: The chosen design becomes documented source of truth.

**Deliverables** (two files):

### Visual spec → project's design-system source of truth
- New components: a new section / frame-set in the design-system catalog
- New states of an existing component: new frame-set(s) in the existing section
- CSS in the design-system's CSS file (not inline)
- Include frame-help text explaining what each frame represents
- Include a sidecar notes panel with:
  - Sheet/component anatomy (classes, dimensions, tokens used)
  - Interaction spec (entry, exit, dismiss, scroll, animation timing)
  - Color semantics
  - Data states (one row per state, what the user sees)
  - Edge cases enumerated in Phase 1

### Interaction/flow spec → project's engineering docs directory
- Implementation plan: files touched, order of operations
- Data shape: what backend returns, frontend transforms
- Test plan: unit tests for data states, manual checkpoints for interactions
- Edge cases with expected behavior
- Future considerations (what's deferred)

**Gate**: Both files exist. Open the design-system page in a browser and confirm rendering. Self-check: *"Could a second engineer implement this from these two files alone?"* If no, the spec is incomplete.

---

## Phase 4 — AUDIT-1 (pre-implementation)

**Goal**: Catch design problems before they become code problems.

Run the checklist at [reference/audit-1-design.md](reference/audit-1-design.md). Self-audit, report findings inline.

Examples of what AUDIT-1 must catch:
- Reusing inline styles instead of design-system classes
- New primitives that should reuse existing ones
- Inconsistency with sibling surfaces (sheet heights, animation timing, dismissal paths)
- Missing states (no empty state, no error state, no today/future state)
- Color/typography/geometry off-brand
- Missing interaction spec (no documented entry, no documented dismiss)

**Gate**: Report findings as a numbered list. Address each one OR explicitly defer with rationale. Do not start implementation while the list is non-empty.

---

## Phase 5 — IMPLEMENT

**Goal**: Port from design-system to app with minimal re-invention.

Rules:
- **CSS**: copy from the design-system CSS file to the app's runtime CSS. Do not rewrite, do not add inline styles for design-system-class elements. If a token is missing in the app's CSS, copy the value.
- **HTML**: use the same class names as the design system. If you find yourself adding `style="…"` more than once for the same purpose, that's a missing class — add it to both CSS files.
- **JS**: TDD for domain logic. Tests first (unit), then implementation. Frontend rendering doesn't need TDD but should mirror the design-system frame structure 1:1.
- **Interaction parity**: this is the biggest source of bugs. When implementing a new sheet, find every existing sheet and copy its dismissal handlers, height, animation timing, screen-switch behavior. Document the parity in a comment.

**Common parity failures to watch for**:
- Backdrop tap doesn't dismiss → missing `pointer-events: auto` on `.is-open`
- Sheet height varies per metric → forgot to put `height` on the shared modifier
- Tab/screen switch doesn't close sheet → missing cleanup call in the navigation function
- Timezone date mismatch → `toISOString().slice(0,10)` in non-UTC timezone shifts day
- All-data-one-half edge case → half/half delta returns null, breakdown empty
- New component re-derives state from raw data → should consume the same shape as the design-system spec

**Gate**: All tests pass. App renders without console errors. Sheet/component matches the design-system page side-by-side.

---

## Phase 6 — AUDIT-2 (post-implementation)

**Goal**: Confirm what shipped matches what was specified.

Run the checklist at [reference/audit-2-parity.md](reference/audit-2-parity.md). Required actions:
- Open the design-system page and the live app side-by-side
- Compare each documented state: empty, partial, full, today, deload, error
- Compare each interaction: entry animation, exit paths, scroll, screen-switch dismissal
- Run any browser-driven walkthrough mentioned in the engineering spec
- Take screenshots of canonical states for the PR

**Gate**: Report parity findings inline. Each finding either fixed or explicitly deferred with reason. The user may spot-check at this point.

---

## Phase 7 — SHIP

**Goal**: Ship with the trail needed for future archaeology.

Required:
- **Screenshots** saved locally (typically `/tmp/<branch>/`) for the user to attach to the PR
- **PR description** links the design-system section(s) touched, the engineering spec, and the issue
- **ADR** in the project's decisions doc IF a new pattern was introduced (not for extensions)
- **Changelog** entry for user-facing changes

**Gate**: All artifacts exist. PR is ready for review.

---

## How to enter the flow

When the user asks for something that triggers this skill (new component / new interaction / new screen), state explicitly:

> *Running the design flow. Phase 1 — Frame.*

Then proceed phase by phase. At each gate, summarize what was produced and confirm with the user before advancing. Use TodoWrite to track phase progress on multi-day work.

## How to exit early

The user can override at any time: *"skip the audit"*, *"just implement it"*. When this happens, name what's being skipped and the risk. Don't argue — they own the trade-off. Ask the user directly to clarify what you cannot infer.

---

## Complementary skills (optional, external)

These are **optional accelerators** that live outside the Ruthless repo —
mostly in [Impeccable](https://github.com/pbakaus/impeccable). The design
flow works fully without them; use them when a phase needs heavier work
and you happen to have the skill installed. If a referenced skill isn't
installed in your agent, skip it and proceed with the in-flow guidance.

| Phase | Skill | Use when | Source |
|-------|-------|----------|--------|
| 2 — PROTOTYPE | `/distill` | Variations are too cluttered; strip to essence | Impeccable |
| 2 — PROTOTYPE | `/bolder` / `/quieter` | Wrong energy level for the brand | Impeccable |
| 2 — PROTOTYPE | `/colorize` | Variation is too monochromatic | Impeccable |
| 3 — SPEC | `/clarify` | Microcopy / labels / error messages need sharpening | Impeccable |
| 4 — AUDIT-1 | `/critique` | Independent UX read on the spec | Impeccable |
| 4 — AUDIT-1 | `/audit` | Comprehensive accessibility / responsive / theming check | Impeccable |
| 4 — AUDIT-1 | `/extract` | Spot a new shared primitive that should land in the design system | Impeccable |
| 5 — IMPLEMENT | `/normalize` | Ensure design-system consistency across the new code | Impeccable |
| 5 — IMPLEMENT | `/harden` | Error handling, overflow, i18n, edge cases | Impeccable |
| 5 — IMPLEMENT | `/adapt` | Confirm the surface works across screen sizes / orientations | Impeccable |
| 5 — IMPLEMENT | `/animate` | Purposeful motion (only where it improves usability) | Impeccable |
| 5 — IMPLEMENT | `/delight` | A small moment of personality (sparingly, on-brand) | Impeccable |
| 6 — AUDIT-2 | `/polish` | Final alignment, spacing, consistency, detail pass | Impeccable |
| 6 — AUDIT-2 | `/audit` | Final accessibility / performance pass | Impeccable |
| 6 — AUDIT-2 | `/critique` | Fresh-eyes UX read on the live implementation | Impeccable |

Rules of thumb:
- Never invoke more than 2–3 complementary skills per phase — each costs context.
- `/polish` is the most reliable AUDIT-2 entry; default to it.
- `/extract` during AUDIT-1 is high-value when you notice a recurring inline pattern that should be a shared primitive.
- For onboarding-shaped features, `/onboard` is a primary input — read it BEFORE Phase 2.

## Reference

- Checklists: [audit-1-design.md](reference/audit-1-design.md), [audit-2-parity.md](reference/audit-2-parity.md)
- Upstream: `/ruthless-discovery` (strategic context before design)
- Coordinator: `/ruthless-ship` (chains discovery → design → ship)
- Sibling: `/frontend-design` (creative aesthetic guidance, complements this workflow)
