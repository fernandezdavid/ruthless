# Challenge: Stress-Test the Artifact

This stage answers: **does the current artifact — strategy, positioning, MVP brief, PRD, pitch, built product — survive contact with the anti-patterns, the evidence, and the strategic bet?**

You enter Challenge when Gate 6 (execution alignment) fails, or at any point you want a hard check on an artifact before committing further. Challenge is the only stage that can be invoked mid-flow at any time — it's the pressure test, not a forward step.

---

## Core Discipline

**Challenge looks for failure, not confirmation.** The goal is to identify what's broken, what's drifting, and what doesn't survive scrutiny. Praise has its place, but not here.

**Name anti-patterns out loud.** Vague discomfort is not useful. "This is a solution-first PRD" or "the scope section describes three use cases" is actionable.

**Challenge is structural.** Don't polish copy or tweak wording when the bones are wrong. If the artifact exhibits an anti-pattern, rewrite — don't patch.

---

## What to Challenge

Challenge applies to any artifact in the flow:

| Artifact                  | Where it came from           | Main failure modes                          |
|---------------------------|------------------------------|---------------------------------------------|
| Product Context           | Teach → `.ruthless.md`       | Imagined customers; no evidence; TAM math   |
| Discovery findings        | Discover                     | Over-narrow; over-broad; weak signal        |
| Experiment brief / results | Validate                    | Gamed success criterion; wrong assumption tested |
| Strategy doc              | Strategy                     | No "Not Doing"; vague bet; hand-waved GTM   |
| Positioning               | Position                     | Category copy; too broad; clever over clear |
| MVP brief                 | Shape                        | Multi-use-case; generic aesthetic; weak cuts |
| Built product (code/UX)   | Execution                    | Doesn't match brief; AI slop signals; feature creep |

Run the challenge against whichever artifact is the current decision point.

---

## Challenge Protocol

### Step 1: Load the Artifact and Context

Read the full artifact. Read the `.ruthless.md` Product Context. Read the strategy and positioning docs if they exist. Don't challenge in isolation — the question is always "does this artifact serve the bet in context?"

### Step 2: Run the Anti-Pattern Scan

For each anti-pattern in [anti-patterns.md](anti-patterns.md), check whether the artifact exhibits it. Be explicit:

- **Match / No match / Partial match**
- **Evidence** (quote or reference the specific part of the artifact)
- **Severity** (P0 = structural; P1 = notable; P2 = minor tweak)

Don't skip anti-patterns that "don't feel relevant." A systematic scan is the point — blind spots are where AI slop slips through.

### Step 3: Run the Evidence Check

Every load-bearing claim in the artifact should be traceable to evidence. Check:

- Customer claims → sourced to interviews, observed behavior, or clearly marked as hypothesis
- Problem claims → sourced to specific conversations or observed workarounds
- Market claims → grounded, not TAM math
- GTM claims → specific channels with real access
- Success criteria → measurable, pre-registered, falsifiable

Any claim without evidence should be marked — either add evidence now, or reframe as an explicit hypothesis to test.

### Step 4: Run the Strategic Fit Check

Does this artifact serve the strategic bet from `.ruthless.md`? Check:

- **Customer fit** — does this serve the narrow customer, or has the segment drifted wider?
- **Bet fit** — does this move the bet forward, or is it orthogonal?
- **Positioning fit** — does this deliver on the positioning, or is it generic?
- **Constraints fit** — can this actually be done within the time/team/budget constraint?

If any of these misalign, the artifact is drifting. Name the drift.

### Step 5: Run the Slop Test

> If you showed this artifact to ten other operators and said "Claude helped with this," would they believe you immediately?

If yes, identify why specifically. Common tells:

- Generic phrasing that could describe any product in the category
- Feature lists where opinions should be
- Hedges where specifics should be
- Unmotivated structure (sections exist because PRD templates have them)
- Boilerplate copy, category adjectives, "AI-powered X"

### Step 6: Produce the Challenge Report

Use this format:

```markdown
# Challenge Report: [artifact name]

## Summary
- Overall: [Pass / Pass with revisions / Fail — rewrite]
- Most serious issue: [one-sentence headline]

## Anti-Pattern Findings

### Matches (P0 — structural)
- **[Anti-pattern #]:** [specific evidence from artifact]
  - Rewrite: [what to change]

### Matches (P1 — notable)
- ...

### Matches (P2 — minor)
- ...

## Evidence Gaps
- **[Claim in artifact]** — no evidence cited. Either sourced to [source] or reframe as hypothesis to test.

## Strategic Drift
- **Customer drift:** [what's drifting, where it shows up, severity]
- **Bet drift:** [...]
- **Positioning drift:** [...]

## Slop Test
- Verdict: [would pass as human-crafted / feels AI-generated]
- Specific tells: [list]

## Recommended Actions
1. [Most important change, with rewrite guidance]
2. [Next most important]
3. ...

## If rewriting, start here
[One paragraph with the specific first move — the single edit that most improves the artifact]
```

### Step 7: Present and Propose Next

Walk the user through the report. Don't bury the lead — start with the most serious finding.

Then propose:

- **If Pass:** "This holds up. Proceed to [next stage]."
- **If Pass with revisions:** "The bones are good; fix these P0/P1 issues and re-challenge."
- **If Fail — rewrite:** "The structural issues are too big to patch. Propose rewinding to [earlier stage]."

---

## Calibration: How Hard to Challenge

Challenge should be **tough but honest**.

**Too soft:**
- "This looks good overall, maybe tighten section 3"
- Skipping anti-patterns because they seem minor
- Treating evidence gaps as "we'll figure it out later"

**Too hard:**
- Finding fault everywhere to signal rigor
- Treating normal V1 gaps as disqualifying
- Demanding perfection from a stage that's meant to be provisional

The calibration: **is this good enough to commit further resources to?** If yes, move on despite imperfection. If no, name why specifically and propose the fix.

---

## Special Case: Challenging Built Code

When the artifact is a running product (late-stage), the challenge includes looking at the actual experience, not just docs.

- Open the product as a first-time user in the target segment. Run through the chosen use case end-to-end. Note every moment of friction, confusion, or AI-slop feel.
- Check: does the UI match the aesthetic direction? Does the copy match the tone? Does the empty state teach? Does the error message help?
- Compare to the MVP brief — what's there that shouldn't be? What's missing that should?

Produce the challenge report against the live product, not the intended product.

---

## Output

Save to `.ruthless/challenges/[artifact-name]-[date].md`. Update `.ruthless.md`:

```markdown
## State
- Last challenge: [date, artifact, verdict]
- Open issues from challenge: [...]
```

---

## Anti-Patterns to Catch in the Challenge Itself

- **Praise sandwich bias** — if every challenge report starts with "great work, just a few notes," you're softening the signal
- **Listing minor issues to appear thorough** — prioritize ruthlessly; P2 findings should be rare, not filler
- **Challenging copy when bones are broken** — if the structure is wrong, don't rearrange the deck chairs

---

## When You're Done

The challenge either passes (move to next stage), passes with revisions (fix and re-challenge), or fails (rewind to earlier stage). Challenge is not a destination — it's a gate. Re-run it frequently as artifacts evolve.
