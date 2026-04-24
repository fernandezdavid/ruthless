# Strategy: Produce the Strategy Document

This stage answers: **what is the bet, who it's for, what you're NOT doing, and how success gets measured?**

You enter Strategy when Gate 3 (strategic bet) needs articulation in writing — typically after Validate has tested the riskiest assumption, or when the bet needs to be committed to text to be debated and refined.

The output is a **strategy doc**: a focused, opinionated artifact that can be read in 10 minutes and debated in 30. Not a 20-page deck.

---

## Core Discipline

**A strategy that doesn't exclude things is not a strategy.** Half the value of the doc is the "Not Doing" section. The other half is clarity on the bet.

**This is not a PRD.** PRDs describe what to build. Strategy docs describe what to bet on and why. If the bulk of the doc is feature lists, rewrite.

**Opinions, not hedges.** Every section should contain claims that could be wrong. Vague, undifferentiated hedges add nothing.

---

## The Strategy Doc Format

Use this structure. Keep it short — ideally one page of dense text per section, not multi-page prose. Ruthless is opinionated about brevity because length hides thinking.

### 1. The One-Sentence Bet

A single falsifiable sentence. The same bet statement from Validate, refined.

> **"We believe [narrow customer] will [specific behavior / outcome] if [product does X], enough to [business outcome] within [time horizon]."**

If you can't state it in one sentence, you don't have a strategy yet — you have a feeling.

### 2. Customer

Two paragraphs max.

- **Who specifically.** Narrow segment (from Discover). Who you're NOT serving should be implied by how narrow this is.
- **Their situation.** The concrete context in which they'd reach for this — the job they're trying to get done, the frictions they experience today, the workaround they'd be switching from.

### 3. Why Now

One paragraph. What specifically has changed in the world — technology, customer behavior, market structure, cost curves — that makes this viable now and wouldn't have five years ago? If "why now" can't be answered concretely, the bet is probably weaker than it looks.

### 4. The Insight

One paragraph. What do *you* see that most people in the space don't? This is where the contrarian, non-obvious claim lives. If the insight is "there's a need for this" — that's not an insight, that's a description. If your competitors could read this section and nod along, rewrite.

### 5. The Approach

Two paragraphs, no more.

- **What we're doing.** The specific angle — what kind of product, what use case, what form factor, what channel. Not a feature list; a compressed description of the approach.
- **Why this shape.** Why *this* form and not alternatives. "We're doing a self-serve in-repo agent, not a SaaS dashboard, because [specific reason tied to customer behavior]."

### 6. Not Doing

**Required section.** This is where the ruthlessness lives. List the things a reasonable reader would expect you to do, and state clearly that you're not doing them, with the reason.

Examples:
- "We are not building a marketplace. Reason: our bet is on direct ICP relationship; marketplace dynamics would pull attention away from the one thing we need to be great at."
- "We are not adding team collaboration features in V1. Reason: our target customer is solo, and adding team features dilutes positioning."
- "We are not integrating with [obvious tool]. Reason: the integration would take 6 weeks and our top-priority customers don't use it."

Every item should have a one-sentence reason. "Not now" is different from "not ever" — state which.

### 7. Success Criteria

One paragraph. What specific, measurable things will tell us within [horizon] whether the bet is working? Avoid vanity metrics.

Good: "10 paying customers in the target segment at ≥$30/month by month 6, with month-over-month retention ≥80%."
Bad: "Gain traction in the developer community."

### 8. Go-to-Market

Two paragraphs max. This is NOT optional or "figured out later."

- **First customer path.** How does the first customer actually hear about this and try it? Be specific. Not "content marketing" — which content, where, reaching whom. Not "community" — which community, why you'll earn trust there.
- **Distribution constraint.** What channels are actually open to you given team, time, and budget? Which are closed? If you depend on a channel you don't have access to, the strategy is broken.

### 9. Risks

Short list, maybe 3-5 items. The assumptions that, if wrong, kill the bet — and what would be evidence they're going wrong. This is a callback to the ranked list from Validate, distilled.

### 10. Review Cadence

One sentence. When does this strategy get revisited — with what evidence triggering what kind of update? Strategies decay; schedule the review now.

---

## The Rewrite Test

After drafting, apply these filters in order. Revise until all four pass.

1. **Specificity test.** Pick any sentence. If it could appear unchanged in a competitor's strategy doc, rewrite it with specifics.
2. **Falsifiability test.** The bet and the success criteria must be things that can be shown wrong. If everything in the doc is unfalsifiable, there's no strategy — just a vision board.
3. **Not-doing test.** The "Not Doing" section must contain items a reader would plausibly expect. If it only lists obviously-out-of-scope things, the strategy isn't ruthless.
4. **One-reader test.** Show it to one member of the target customer segment. Not "do they like it" — "does it describe them and their situation accurately?" Revise until yes.

---

## Common Failure Modes

- **Strategy doc as visionary blog post.** Lots of prose about the future, no falsifiable claims. Rewrite to be a bet, not a manifesto.
- **"Not Doing" is empty or trivial.** "We are not building a rocket ship" is not a strategic exclusion. Force yourself to name things you're actively tempted to do but choosing not to.
- **Success criteria are vanity.** Signups, impressions, waitlist size. Replace with usage metrics that indicate value delivered (activation, retention, paid conversion).
- **GTM is hand-waved.** "We'll figure out distribution later" = the strategy will fail. Either the GTM is plausible now, or the bet needs rethinking.
- **Feature list in disguise.** If "The Approach" section is bullets of features, compress it to a paragraph about the angle.
- **Hedged bets.** "We're focused on X, but also Y and Z." Pick one. Write Y and Z in Not Doing.

---

## Output

Save the strategy doc to `.ruthless/strategy.md` (create the directory if needed). Update `.ruthless.md`:

```markdown
### Strategic Bet
- Bet: [one-sentence bet, now committed in writing]
- Insight: [one-sentence version of the contrarian claim]
- Approach: [one-sentence compressed description]
- Not doing: [one-sentence summary of top 3 exclusions]
- Success criteria: [concrete metrics with horizon]
- GTM: [one-sentence first-customer path]
- Doc: [link to .ruthless/strategy.md]

## State
- Last diagnosis: [date]
- Strategy doc: committed [date]
- Review cadence: [next review date]
```

---

## Anti-Patterns to Catch

- **#6 Solution-First PRDs** — if the strategy doc reads like a build order, rewrite as a bet
- **#7 Generic PRDs** — if every section could be in anyone's doc, sharpen with specifics
- **#8 Roadmaps as To-Do Lists** — the strategy doc should contain bets and criteria, not a feature timeline
- **#9 Missing Go-to-Market** — GTM is a required section; if it's weak, the strategy is incomplete
- **#11 Multi-Use-Case V1** — if the doc tries to serve more than one segment, force a pick
- **#15 Generic Positioning** — this isn't the positioning doc, but if category boilerplate sneaks in here it'll be worse in Position

---

## When You're Done

Gate 3 scores **3+**. The bet is in writing, committed, and defendable. The next stage is usually [position.md](position.md) — turning the strategy into a one-sentence positioning that can go on a landing page.
