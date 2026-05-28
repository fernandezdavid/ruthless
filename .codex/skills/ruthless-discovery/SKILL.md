---
name: ruthless-discovery
description: "Discovery workflow for non-trivial features. Produces a structured brief (job-to-be-done, audit, positioning, signal, competitive context, success metrics, scope) that becomes the input for the ruthless-design skill. Use when a user starts a feature that touches a major surface (onboarding, intake, plan generation, home, marketing) or asks 'let's revamp X'. Skip for tweaks, bug fixes, small extensions, or anything already settled."
argument-hint: "[<feature-slug>]"
license: Apache 2.0
---

# Ruthless discovery

Scope-aware discovery pipeline. By the time you start designing, the strategic context is locked: you know *why*, *for whom*, *against what alternatives*, and *what success means*.

## Startup — read project conventions

Before Phase 0, look for a `Delivery Conventions` block in `AGENTS.md` (markers: `<!-- delivery:conventions:start` / `end`). It tells you where discovery briefs are stored in this project. If present, use that path. If absent, default to `docs/product/discovery/` and note the assumption to the user — they may want to run `$ruthless-teach-delivery` to capture conventions properly.

Also check for `.ruthless.md` — if present, read the wedge, customer, and constraints sections. They inform several discovery phases (especially Job-to-be-done, Positioning, and Scope).

**Output**: a committed brief at the project's discovery directory (typically `docs/product/discovery/<feature>-discovery.md`) — feeds directly into `$ruthless-design` Phase 1 (FRAME).

**Companion**: `$ruthless-design` for design + build phases.

**Coordinator**: `$ruthless-ship` chains both.

---

## Scope auto-detection

The skill scales rigor to the size of the work. **Always start by asking the user which tier applies**, with a recommendation based on the request:

```
TIER 1 — TINY      → don't run the skill (typo, copy, color)
TIER 2 — SMALL     → run only Phases 1, 2, 8 (Frame, Job, Scope)
TIER 3 — MEDIUM    → run Phases 1–5 + 8 (add Audit, Positioning, Signal)
TIER 4 — LARGE     → run all phases (add Competitive, Metrics)
```

Cues for each tier:
- **Tiny**: "fix the spacing", "change this copy", "tweak the color"
- **Small**: "add another cell to the existing grid", "another empty state", "one more chip variant"
- **Medium**: "new bottom sheet for X", "new chart type", "new card pattern"
- **Large**: "revamp onboarding", "redesign intake", "rethink home", anything spanning multiple surfaces or making a strategic bet

When in doubt, present the user with the question and a recommended tier. Don't auto-decide for Medium/Large.

---

## Phase 1 — FRAME (all tiers)

One short paragraph. What problem, what triggered it, why now.

Multi-choice **What's the trigger?** with the user:
- Bug or broken behavior noticed
- User feedback (own usage, alpha reports, support)
- Strategic decision (positioning, wedge, GTM)
- Metric / signal (drop-off, low completion, retention)
- Personal observation (using the product, friction felt)
- Other

The trigger anchors the discovery — solving a bug ≠ solving a strategic gap.

**Output**: ~120 words inline. Section title `## Problem`.

---

## Phase 2 — JOB (all tiers)

Job-to-be-done statement:

> *When [context], the [user] wants to [goal], so they can [outcome].*

Draft 2–3 candidates, then ask the user to pick or refine. Recommendation = the one most aligned with the project's product wedge (read it from `AGENTS.md` or the project's Ruthless `.ruthless.md` if present).

Constraints — capture only the load-bearing ones:
- Platform / form factor (phone-first, desktop, etc.)
- Audience size (beta of N, public, internal)
- Design-system fidelity required
- Deadline (event, launch, beta window)
- Technical constraint (model cost, API rate, dependency)

**Output**: JTBD line + 3–5 constraint bullets. Section title `## Job-to-be-done`.

---

## Phase 3 — AUDIT EXISTING (Medium + Large)

If a surface already exists, audit it before designing the replacement.

Look in three places:
1. **App code**: search for the existing implementation. List surfaces and files touched.
2. **Design system**: any documented states? Are they current?
3. **Throwaway prototypes**: any experiments that informed prior decisions?

Use complementary skills when needed:
- `$audit` for comprehensive evaluation (accessibility, performance, theming, responsive)
- `$critique` for a UX read on the existing surface

Output structured findings:
- **Works**: what's right that we should preserve
- **Broken**: failures, friction, off-brand bits
- **Missing**: states / paths the current implementation doesn't handle

**Output**: 3-block section. Section title `## Audit of existing state`.

---

## Phase 4 — POSITIONING (Medium + Large)

For surfaces that must convey value to a user — onboarding, intake, home, the site — sharpen the message before designing the layout.

Anchor to the project's product wedge (read from `AGENTS.md` or `.ruthless.md`).

Use `$positioning-messaging` for the heavy lifting.

Capture three things:
- **The one-line value prop** this surface must land
- **What we're NOT** (positioning by negation)
- **The voice rules** (relevant subset)

**Output**: 3-bullet section. Section title `## Positioning`.

---

## Phase 5 — SIGNAL (optional, Medium + Large)

Pull real-user signal so the design isn't grounded in vibes.

Sources, cheapest first:
1. **Existing research** in the project's research directory — interviews, notes, problem statements
2. **Reddit** via `$reddit-scout` — what users say about this problem space
3. **User interviews** via `$conducting-user-interviews` — only if the gap is big enough to warrant a live conversation

For small audiences (alpha, beta), the user's own observations count as primary signal. Don't over-engineer.

**Output**: 3–5 quotes / observations with source attribution. Section title `## Signal`.

---

## Phase 6 — COMPETITIVE (Large only)

Quick 20-minute scan of how competitors solve the same surface. Not a deep teardown.

For each competitor:
- What they do well on this specific surface
- What they screw up
- What we'd steal vs explicitly NOT do

Frame as **table-stakes vs differentiators**:
- Table-stakes: the user expects this; missing it = looks amateur
- Differentiators: where we can credibly be different (this is where the wedge lives)

**Output**: short matrix or list. Section title `## Competitive scan`.

---

## Phase 7 — METRICS (mandatory Large, optional Medium)

What does shipped success look like? Without this, you can't tell if it worked.

Three layers:
- **Quantitative**: drop-off rate, completion rate, time-to-X, % users reaching a milestone
- **Qualitative**: user reactions, retention signal, gut read
- **Anti-metrics**: what we explicitly DON'T want to optimize for

For small audiences (alpha, beta), quant metrics are noise. Lean qualitative + specific micro-signals. Be honest about small-N constraints.

**Output**: 3-block section. Section title `## Success metrics`.

---

## Phase 8 — SCOPE (all tiers)

Three buckets:
- **In**: must ship to call this done
- **Out**: explicitly excluded
- **Deferred**: parked for follow-up

For each, one line of rationale. Avoid hand-waving.

**Output**: 3-block section. Section title `## Scope`.

---

## Phase 9 — OUTPUT

Synthesize into a single committed brief at the project's discovery directory.

**Template** (matches `$ruthless-design` Phase 1 input):

```markdown
# <Feature> — Discovery

> Status: discovery complete · ready for $ruthless-design
> Tier: <Small | Medium | Large>
> Issue: <issue ID or "no issue yet">

## Problem
<Phase 1 output>

## Job-to-be-done
<Phase 2 output>

## Audit of existing state
<Phase 3 output, or "N/A — greenfield">

## Positioning
<Phase 4 output, or "N/A — internal-facing surface">

## Signal
<Phase 5 output, or "N/A — not needed for this tier">

## Competitive scan
<Phase 6 output, or "N/A — not run for this tier">

## Success metrics
<Phase 7 output, or "N/A — not run for this tier">

## Scope
**In**: ...
**Out**: ...
**Deferred**: ...

## Handoff to design flow
<2–3 sentences summarizing the most important constraints the design flow must respect>
```

**Gate**: file exists, all sections populated (or marked N/A with rationale), user has signed off. Then either run `$ruthless-design` next, or hand back control.

---

## Complementary skills

| Phase | Skill | When |
|-------|-------|------|
| 3 — AUDIT | `$audit` | Comprehensive evaluation of existing surface |
| 3 — AUDIT | `$critique` | UX read on existing surface |
| 4 — POSITIONING | `$positioning-messaging` | Sharpening the value prop |
| 5 — SIGNAL | `$reddit-scout` | Pulling user-language signal from Reddit |
| 5 — SIGNAL | `$conducting-user-interviews` | If a fresh interview is warranted |

Optional accelerators — the skill works without them, but they're the right tool when a phase needs heavier work.

---

## How to enter the flow

State explicitly: *"Running ruthless-discovery. Phase 0 — Scope check."* Then ask the tier question with a recommendation.

For each phase, ask multi-choice questions with a recommendation. The user can override at any point. Use TodoWrite (or the equivalent task tracker) to track phase progress across multi-day work.

## How to exit early

The user can say *"skip to scope"* or *"that's enough, write the brief"* at any phase. Honor it; note in the brief which phases were skipped and why. Ask the user directly to clarify what you cannot infer.
