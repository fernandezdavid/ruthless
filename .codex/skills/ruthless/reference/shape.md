# Shape: Scope the MVP for One and Only One Core Use Case

This stage answers: **what is the single smallest thing we can ship, for one specific customer doing one specific job, that proves the bet and expresses the positioning — with taste?**

You enter Shape when Gate 5 (scope discipline) fails — the MVP is either undefined, too broad, or framed as a feature-reduced full product. You leave when you have a scope that is genuinely focused on one use case, with explicit cuts and an aesthetic direction.

This is the most distinctive Ruthless stage. The thesis — *when building is cheap, focus is the scarce resource* — lives here.

---

## Core Discipline

**One core use case, solved excellently.** Not ten half-features. Not "the full product minus the nice-to-haves." The MVP is the smallest *complete* thing that proves the bet for *one* specific customer doing *one* specific job, done with taste.

**Taste is a product decision, not a polish phase.** A tasteful, distinctive MVP punches above its feature weight. Generic-looking MVPs signal generic thinking and lose to competitors with less functionality and more craft. Aesthetic direction is set now, not after the code is written.

**Cutting is the work.** By the end of this stage, the operator should have named specific things they're *not* building. Without that, scope hasn't been set.

---

## Sub-Stages

### A. Name the One Use Case

From the Strategy and Positioning docs, extract the **single customer + single job** that the MVP serves.

Force the specificity. If the answer includes "and", interrogate:

- "Our MVP helps indie builders validate and build and ship products" → three use cases, pick one
- "Our MVP is for founders evaluating ideas and investors screening deals" → two customers, pick one
- "Users can do X and also Y" → Y is V2, not V1

The exercise: complete the sentence

> **"Our MVP is for [one specific customer] trying to [one specific job]. It is done when they can [specific outcome] without [specific friction they face today]."**

If this sentence can't be completed without qualifiers, keep narrowing.

Example:

> Our MVP is for indie builders who've freestyled a side project and want to evaluate whether it's worth continuing. It is done when they can run one command and get a diagnosis of their project's stage, a recommended path forward, and the first conversation of the guided flow — without hiring a PM or reading five product books.

### B. The Minimum-Complete Test

The MVP must be **complete for the chosen use case**, not 90% of the whole product.

For the chosen use case, map:

1. **Entry moment.** What situation brings the customer in? What are they holding in mind?
2. **The job end-to-end.** What steps must they go through to finish the job? Not the happy path only — include error states, empty states, friction points.
3. **Exit moment.** What does success look like? What do they do next? What do they tell someone else?

Every step in this arc must work. If the entry feels broken or the exit is confusing, the MVP isn't minimum — it's partial.

Things the MVP does NOT need:
- Features that serve adjacent use cases
- Polish on surfaces the chosen customer doesn't touch
- Infrastructure for scale the product won't reach in V1
- Flexibility for customers outside the chosen segment

### C. Explicit Cuts

List the things you're tempted to build but are cutting. For each, state:

- **What's being cut** (the feature / surface / capability)
- **Why it was tempting** (adjacent use case, competitor parity, "wouldn't take long")
- **Why it's cut for V1** (not load-bearing for the chosen use case; dilutes positioning; would double scope)
- **What would bring it back later** (e.g., "after we validate retention on use case A, add use case B in V1.1")

Aim for at least 5 explicit cuts. If you can't list five, scope probably isn't tight enough yet — there's always something seductive you were considering.

### D. Aesthetic Direction

Before scoping the code, commit to an aesthetic direction that matches the customer, the bet, and the positioning.

Three-word test: describe the product's voice in three concrete words. Not "modern" or "clean" — dead categories that produce AI slop. Try:

- "Warm and mechanical and opinionated"
- "Calm and clinical and careful"
- "Fast and dense and unimpressed"
- "Handmade and a little weird"

Then ask: what does this look like? What does this *sound* like (copy tone)? What does the first screen feel like at the first interaction?

Reference anti-patterns from [anti-patterns.md](anti-patterns.md) #17 (Generic AI Aesthetic) and #18 (Copy as Afterthought). Specifically reject:

- shadcn defaults with no customization
- Purple gradients, Inter, generic hero sections
- "Get Started" / "Learn More" CTAs
- Boilerplate error messages and empty states

Commit to a direction — bold and specific, executed with precision. Minimal and maximal both work; intentional is what matters.

### E. The Core Artifact: MVP Brief

Produce a brief that can be handed to a builder (human or AI) and result in the right thing. Use this structure:

```markdown
# MVP Brief

## The Use Case (one sentence)
[Customer + job + done-when, per sub-stage A]

## The Arc
1. Entry: [what brings them in]
2. Steps: [each step of the job, end-to-end]
3. Exit: [success state; what they do next]

## In Scope
- [Specific surface / feature / capability]
- [Another]
  ...

## Explicit Cuts
- [Cut 1] — Why tempting: [...]  Why cut: [...]  Condition to revisit: [...]
- [Cut 2] — ...
- [Cut 3] — ...
- [Cut 4] — ...
- [Cut 5] — ...

## Aesthetic Direction
- Voice: [three concrete words]
- Visual reference: [a specific non-obvious reference, not "clean modern dashboard"]
- Typography direction: [specific — not "system font"]
- Color direction: [specific]
- Copy tone: [how strings should read, with examples: "Instead of 'Submit', say 'Save and continue'"]

## Taste Anchors
- Three things this product should feel like: [non-obvious references]
- Three things this product should NOT feel like: [anti-references]

## Key States
For each screen / surface in scope, list:
- Default
- Empty (first-use, zero data)
- Loading
- Error (specific errors the user can cause)
- Success

## Success Criteria (for the MVP, not the business)
- [Specific behavior that indicates the MVP is working for the chosen customer]
- [e.g., "10 of 10 pilot users complete the full arc without asking for help"]
```

### F. The Handoff

The MVP brief is the handoff. Whoever builds next — the operator, an AI agent, another developer — should be able to read it and produce something tight, focused, and matching the positioning.

If the brief leaves the builder with questions like "what about X?" where X is an adjacent use case — good. The answer is "X is explicitly cut; see the Cuts section."

---

## Common Failure Modes

- **"Core" use case list with more than one item.** If the brief names A and B as "both core," push back. One is core; B is V2.
- **MVP = feature-reduced full product.** If the brief reads like "the full vision but smaller," rewrite as "this one use case, complete."
- **Cuts list is trivial.** If the Cuts section only contains obvious out-of-scope items, the scope isn't tight yet.
- **Aesthetic direction is "clean and modern."** That's AI slop in words. Push for something specific — a physical reference, a feeling, a concrete anti-reference.
- **No taste anchors at all.** The MVP will look generic and lose to competitors with less scope and more craft.
- **Success criteria are business metrics, not product metrics.** Revenue is not MVP success — that comes later. MVP success is "does the chosen customer finish the job?"

---

## Output

Save to `.ruthless/mvp-brief.md`. Update `.ruthless.md`:

```markdown
### MVP
- One use case: [customer + job]
- Top 3 cuts: [...]
- Aesthetic direction: [three words]
- Brief: .ruthless/mvp-brief.md

## State
- Current stage: Shaping [done]
- Ready for: Execution
```

---

## Anti-Patterns to Catch

- **#10 "MVP" as Feature-Reduced Full Product** — rewrite as one complete use case
- **#11 Multi-Use-Case V1** — force a pick
- **#12 Unconstrained Plans** — if scope exceeds the team's actual time, keep cutting
- **#17 Generic AI Aesthetic** — reject shadcn-default defaults; pick a direction
- **#18 Copy as Afterthought** — write the key strings now, not later

---

## When You're Done

Gate 5 scores **3+** — ideally **4** if explicit anti-goals are named. The brief is committed, the cuts are explicit, the aesthetic direction is specific. The next stage is execution — whoever's building takes the brief and ships. Return to [challenge.md](challenge.md) before and after shipping to stress-test against anti-patterns.
