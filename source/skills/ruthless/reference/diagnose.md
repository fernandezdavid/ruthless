# Diagnose: Rubric and Stage Classification

The diagnosis determines *where you are* and *what to do next*. Ruthless uses six sequential gates. The first gate that fails is the current stage — that's what the operator needs to work on before anything downstream matters.

This file defines each gate's scoring criteria and the stage classification logic.

---

## The Six Gates

Gates are sequential. Downstream gates assume upstream ones are passed — positioning without a known customer is fiction, an MVP without a strategy is a demo.

| # | Gate                  | Pass threshold | Reference file                 |
|---|-----------------------|----------------|--------------------------------|
| 1 | Customer clarity      | ≥ 3/4          | [discover.md](discover.md)     |
| 2 | Problem evidence      | ≥ 3/4          | [discover.md](discover.md)     |
| 3 | Strategic bet         | ≥ 3/4          | [validate.md](validate.md) + [strategy.md](strategy.md) |
| 4 | Positioning           | ≥ 3/4          | [position.md](position.md)     |
| 5 | Scope discipline      | ≥ 3/4          | [shape.md](shape.md)           |
| 6 | Execution alignment   | ≥ 3/4          | [challenge.md](challenge.md)   |

---

## Scoring Criteria

Score each gate 0–4 based on evidence (from repo + interview), not speculation. When in doubt, mark **unverified** and flag it to the user.

### Gate 1: Customer Clarity

Do you know, specifically, who this is for — with evidence they exist?

| Score | Criteria                                                                        |
|-------|---------------------------------------------------------------------------------|
| **0** | Don't know who it's for. "Anyone who…" or "people who want…"                   |
| **1** | Vague archetype ("founders", "developers", "marketers") with no narrowing.     |
| **2** | Named segment but no evidence the segment exists in the real world.            |
| **3** | Named narrow segment + some evidence (a few conversations, observed behavior, inbound). |
| **4** | Narrow segment with deep behavioral understanding — can describe their day, frictions, alternatives, buying triggers. |

Disqualifiers (auto-score 0 or 1 regardless):
- "It's for everyone who…"
- Personas invented without any conversations
- Customer = the operator themselves (unless that's explicitly a beachhead)

### Gate 2: Problem Evidence

Do you have external signal that the problem is real and urgent?

| Score | Criteria                                                                        |
|-------|---------------------------------------------------------------------------------|
| **0** | Assumed problem; no data beyond "it stands to reason."                         |
| **1** | Operator's own experience only — "I had this problem, so others must too."     |
| **2** | A few conversations; responses were generic ("yeah, I'd use that") rather than specific frictions. |
| **3** | Multiple conversations; specific frictions identified; customers described their workarounds. |
| **4** | Strong evidence: paying workarounds (spreadsheets, Zapier duct tape, paid alternatives), urgent unprompted requests, demonstrated willingness to pay. |

Disqualifiers:
- "Users said they'd use it" from survey-style questions
- Hypothetical future interest ("if it did X, I would…")
- "I can't imagine anyone not wanting this"

### Gate 3: Strategic Bet

Is there a clear bet? Is the riskiest assumption named, and ideally tested?

| Score | Criteria                                                                        |
|-------|---------------------------------------------------------------------------------|
| **0** | No bet articulated. The plan is "build product, users come."                   |
| **1** | Vision statement exists but no bet — a feel-good description of the future, no falsifiable claim. |
| **2** | Implicit bet — you can infer what must be true, but it's not stated or examined. |
| **3** | Clear bet; riskiest assumption named; the operator could defend the bet in conversation. |
| **4** | Riskiest assumption actually tested (interviews, landing page, prototype, concierge MVP) and survived. |

Disqualifiers:
- "The bet is that AI changes everything" (not falsifiable)
- Multiple bets stacked ("we're betting on X AND Y AND Z") — that's a wish list
- "The bet is we execute better than competitors" (also not falsifiable)

### Gate 4: Positioning

Can you state the positioning in one distinctive sentence that differentiates from the alternative?

| Score | Criteria                                                                        |
|-------|---------------------------------------------------------------------------------|
| **0** | No positioning statement.                                                       |
| **1** | Generic category copy. "Easy-to-use platform for modern teams." Could be any competitor. |
| **2** | Has positioning but it conflicts with the actual product or customer.          |
| **3** | Crisp, distinctive positioning. Names the customer, the alternative, the differentiator. A customer reading it knows whether it's for them. |
| **4** | Positioning tested with customers — they can repeat it back in their own words, and non-customers opt out correctly. |

Disqualifiers:
- Anything a direct competitor could paste onto their own site
- Positioning that tries to appeal to multiple segments simultaneously
- "AI-powered [category]" as the differentiator

### Gate 5: Scope Discipline

Is the MVP scoped to one — and only one — core use case?

| Score | Criteria                                                                        |
|-------|---------------------------------------------------------------------------------|
| **0** | No scope. "We're building a platform for X." Platform is not a product.        |
| **1** | Multiple use cases ("V1 will cover A, B, and C") with no prioritization.      |
| **2** | Primary use case named but the MVP still dilutes across several — features serving adjacent cases sneak in. |
| **3** | One clear core use case. The MVP is the smallest complete thing that proves it.|
| **4** | One use case + explicit anti-goals (what's being cut and why). Taste-level choices made early. |

Disqualifiers:
- "Core" use case list with more than one item
- "MVP" framed as "the whole product minus the nice-to-haves"
- Roadmap that assumes all cut scope comes back in V1.1

### Gate 6: Execution Alignment

Does what's actually built match the strategy, scope, and taste you want?

| Score | Criteria                                                                        |
|-------|---------------------------------------------------------------------------------|
| **0** | Building something that doesn't match any articulated strategy. Features exist because they exist. |
| **1** | Partial match. The strategy says X but the codebase is doing X + Y + a bit of Z. |
| **2** | Mostly aligned but clear feature creep; things built "while we were at it" that don't serve the bet. |
| **3** | Aligned execution. What's built maps to scope; what's not built is intentional. |
| **4** | Tasteful, focused execution matching strategy. Craft visible in details. No AI slop signals. |

Disqualifiers:
- Can't explain why a feature is in the codebase
- Feature set resembles the competitor list pasted together
- Generic AI aesthetic (see [anti-patterns.md](anti-patterns.md) #17)

---

## Stage Classification

The **first gate that fails** (score < 3) is the current stage. Name the stage after the remediation work, not the gate itself.

| Failing gate  | Stage                      | Recommended reference                                |
|---------------|----------------------------|------------------------------------------------------|
| 1 or 2        | **Discovering**            | [discover.md](discover.md) — customer + market work  |
| 3             | **Validating**             | [validate.md](validate.md) then [strategy.md](strategy.md) |
| 4             | **Positioning**            | [position.md](position.md)                           |
| 5             | **Shaping**                | [shape.md](shape.md) — MVP scoping                   |
| 6             | **Executing**              | [challenge.md](challenge.md) + targeted re-scoping   |
| None (all pass) | **Shipping** (rare)      | Re-run diagnose after each shipped feature           |

### Edge Cases

- **Everything scores 0 or 1**: User is pre-work. Stage = **Discovering**. Start with Gate 1.
- **Middle gates fail but downstream gates look high**: The downstream scores are unreliable — they were based on false upstream assumptions. Reset and start at the earliest failing gate.
- **Unverified gates**: Don't guess. Tell the user which gates you couldn't score and why, and ask for the information needed to score them before proposing a path.
- **Growth work misclassified as zero-to-one**: If during diagnosis it becomes clear the product has real scale, real retention data, and the question is optimization — stop. Ruthless is the wrong tool. Tell the user and suggest they use growth PM tools instead (A/B testing, cohort analysis, funnel instrumentation).

---

## Output Format

Present the diagnosis to the user as a visual rubric followed by a one-sentence rationale. Use filled/empty circles (●/○) for the score, total out of 24, and name the stage clearly.

```
Diagnosis
─────────
Customer clarity      ●●●○○  3/4  (named narrow segment, some evidence from 5 interviews)
Problem evidence      ●●○○○  2/4  (conversations were generic, no observed workarounds)
Strategic bet         ●○○○○  1/4  (vision stated, bet implicit — "AI will change X")
Positioning           ○○○○○  0/4  unverified (no landing or pitch to score against)
Scope discipline      ●●○○○  2/4  (one use case named, but roadmap dilutes across 3)
Execution alignment   ●●●○○  3/4  (repo is coherent with the stated scope)
                      ─────
                      11/24

Stage: Discovering (gate 2 — problem evidence — is the first failing gate)

Why this stage: You have a named customer but the problem evidence is thin. Before articulating a bet or positioning, you need to know whether the problem is real and urgent enough for this segment to pay.
```

Keep the rationale to one sentence. The scores do the talking.

---

## Re-diagnosis After Work

After completing a stage, re-run the diagnosis. Expect specific gate scores to change:

| Completed stage   | Gates likely to move                          |
|-------------------|-----------------------------------------------|
| Discover          | Gates 1 and 2 (customer + evidence)          |
| Validate          | Gate 3 (bet tested) and possibly 2 (new evidence) |
| Strategy          | Gate 3 (bet articulated)                      |
| Position          | Gate 4 (positioning)                          |
| Shape             | Gate 5 (scope discipline)                     |
| Challenge         | Gate 6 (alignment) — and may push 3, 4, or 5 backward if the artifact failed review |

If a gate *moves backward* after work, that's valuable — it usually means earlier confidence was misplaced and the user just learned something real. Celebrate it; don't hide it.
