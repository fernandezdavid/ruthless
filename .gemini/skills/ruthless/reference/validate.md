# Validate: Test the Riskiest Assumption

This stage answers: **what would have to be true for this bet to work, and what's the cheapest way to find out?**

You enter Validate when Gate 3 (strategic bet) fails. You leave when the riskiest assumption has been articulated and, ideally, tested — with the test surviving contact with reality.

---

## Core Discipline

**The riskiest assumption is the real work.** Every bet rests on a few assumptions that, if wrong, kill the whole thing. Identify them, rank them, and test the riskiest *before* building. Everything else is procrastination dressed up as productivity.

**Shipping is a last-resort learning tool.** Most questions ("will anyone care?", "will they pay?", "is this the right framing?") can be answered in a week of experimentation — much faster and cheaper than building.

---

## Sub-Stages

### A. Extract the Bet

From the Product Context and any existing strategy material, state the bet as one falsifiable sentence:

> **"We believe that [narrow customer] will [specific behavior / outcome] if [the product does X], enough to [business outcome] within [time horizon]."**

Examples:
- "We believe that indie AI tool builders will pay $30/month for an in-repo PM agent that diagnoses their project stage, enough to reach $10k MRR within 6 months."
- "We believe that enterprise security teams will switch from Okta to [us] if we offer [specific capability], enough to win 3 design-partner deals in 90 days."

If the operator's bet can't be stated this crisply, the work is to make it crisp. A bet you can't state falsifiably is a bet you can't test.

### B. List the Assumptions

Every bet contains nested assumptions. Make them explicit. For the first example above, the assumptions include:

- Indie AI tool builders exist as a coherent segment reachable by us
- Enough of them perceive "project stage diagnosis" as a real pain
- They prefer an in-repo agent to other formats (SaaS app, human coach)
- They're willing to pay $30/month (vs. $10, vs. free)
- Our distribution can reach enough of them at that price point
- We can ship the product at a quality that matches the pitch

List 5-10 of these. More is better than fewer at this stage — hidden assumptions are what kill projects.

### C. Rank by Risk

For each assumption, score two dimensions on a simple 1-3 scale:

- **Load-bearing:** how badly does the bet break if this is wrong? (1 = minor, 3 = fatal)
- **Uncertainty:** how unsure are you this is true? (1 = well-evidenced, 3 = total guess)

Multiply for a risk score. The **riskiest assumption** is the highest-scoring one.

Example:

| Assumption                                      | Load | Uncertainty | Risk |
|-------------------------------------------------|------|-------------|------|
| Segment exists + is reachable                   | 3    | 2           | 6    |
| They'll pay $30/mo                              | 3    | 3           | 9    |
| They prefer in-repo agent to SaaS app           | 2    | 3           | 6    |
| We can ship at quality                          | 2    | 1           | 2    |
| Distribution can reach 500 in year 1            | 3    | 2           | 6    |

The $30/mo willingness-to-pay is the riskiest. That's where the test goes.

### D. Design the Cheapest Test

The test must be cheaper than building and still produce a clear answer. Ordered cheapest-to-most-expensive:

| Method                  | Good for                                              | Cost       |
|-------------------------|-------------------------------------------------------|------------|
| **Interviews**          | "Is this a real problem?" "How do they handle it today?" | Hours      |
| **Painted-door / landing page** | "Will they click through / sign up for this specific pitch?" | Hours-day |
| **Price test landing** | "Will they *pre-pay* or drop an email at this price?" | Day       |
| **Concierge MVP**       | "If we did this by hand for 5 customers, would they find it valuable?" | Days    |
| **Wizard-of-Oz**        | "Would they use a product that appears to do X, where X is actually humans?" | Days-week |
| **Prototype usability** | "Is the UX legible? Do they get the value prop from seeing it?" | Days    |
| **Full MVP shipped**    | Last resort; only if no cheaper test exists           | Weeks      |

**Design rules for the test:**

1. **Name the hypothesis.** What specifically are you testing? "Users will pre-pay $30/mo for this" is testable. "Users will like this" is not.
2. **Define pass/fail upfront.** "If at least 10% of landing visitors click through to the pricing page" — not "we'll see what happens."
3. **Pre-register the sample size.** How many interviews, visitors, or attempts constitute a readable result?
4. **Close the loopholes.** If passing is trivially easy (e.g., signups with no commitment), the test isn't measuring anything. Add friction proportional to the claim.
5. **Minimize confounds.** A landing page that tests two different pitches tests neither cleanly.

Produce an **Experiment Brief**:

```markdown
## Experiment: [name]

**Hypothesis**: [the specific thing we're testing]
**Assumption being tested**: [from the ranked list]
**Method**: [interviews / landing / concierge / ...]
**Sample**: [who, how many, how reached]
**Success criterion**: [specific, pre-registered, falsifiable]
**Timebox**: [how long before you call it]
**Cost**: [hours, dollars]
**Possible outcomes**:
  - Pass: [what we learn and do next]
  - Fail: [what we learn and do next — this matters! "kill the bet" is a valid answer]
  - Ambiguous: [what we learn and do next]
```

### E. Run the Test

Execute the experiment. During the run:
- Do not tweak the experiment mid-flight to hit the success criterion — that makes the result meaningless.
- Collect raw data (quotes, click-through logs, sign-up emails) so you can review later.
- Note surprises, even if they're not what you were measuring.

### F. Synthesize Honestly

After the test:

1. **Did it pass the pre-registered criterion?** Yes or no — not "kind of."
2. **What did we learn that we didn't expect?** Surprises often matter more than the headline result.
3. **What's the next riskiest assumption now?** Passing Test 1 usually moves the bottleneck, not eliminates it.
4. **What's the update to the bet?** Keep, refine, or abandon.

**Beware success theater.** If the test "passed" but only because you gamed the criterion or the sample was unrepresentative, you learned nothing. Be honest.

**Beware premature abandonment.** If the test failed because of execution issues (bad pitch, bad sample, bad channel) — not because the underlying assumption was wrong — re-run before killing the bet.

---

## Outputs from Validate

`.ruthless.md` gets updated:

```markdown
### Strategic Bet
- Bet statement: [falsifiable one-sentence version]
- Key assumptions: [list, ranked by risk]
- Riskiest assumption: [which one]
- Status: [untested / tested: passed / tested: failed / tested: ambiguous]
- Evidence: [results from the test, with sample size and criterion]

## State
- Last diagnosis: [date]
- Experiments run: [list with pass/fail status]
- Updated bet: [if the test changed the bet]
```

---

## Anti-Patterns to Catch at This Stage

- **#4 Skipping Discovery to "Just Ship and Learn"** — if the proposed test is "build the product and see," push back hard
- **#5 Prioritization Theater** — if the risk ranking is done by feel rather than by load × uncertainty, sharpen it
- **#13 Vanity Metrics** — if the success criterion is "signups" without commitment friction, it doesn't measure what you think
- **#14 Goodhart's Law Violations** — if the team is going to be judged on the test result, expect the test to be gamed; add guardrail metrics

---

## When You're Done

Gate 3 (strategic bet) is at **3+** — the bet is articulated, the riskiest assumption is named, and ideally one key experiment has been run. The next failing gate is usually Gate 4 (positioning) → [position.md](position.md).

If the test failed and the bet doesn't survive, the honest answer is to stop and reshape. That's a valid outcome of this stage — not a loss. Re-run diagnosis; you may be back at Discovery with new information.
