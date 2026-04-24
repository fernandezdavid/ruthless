# Position: Articulate the Distinctive Positioning

This stage answers: **in one sentence, who is this for, why it's better than the alternative, and what makes it memorable?**

You enter Position when Gate 4 (positioning) fails — no positioning exists, or what exists is generic category copy. You leave when you have a crisp, distinctive positioning statement that a customer could repeat back in their own words.

---

## Core Discipline

**Positioning is a specific claim with a specific audience.** A positioning statement that could describe any competitor in the space isn't positioning — it's category boilerplate.

**The test is opt-in / opt-out.** A customer reading your positioning should feel either "this is for me" or "this is not for me." If they feel "this could be for me, I guess?" — it's wrong.

**Positioning shapes the product, not just the marketing.** The positioning you land on here will constrain what the MVP includes (Shape stage) and what you build. Positioning that's incompatible with the product you want to build means one of them is wrong.

---

## The Positioning Formula

Start with a structured formula, then refine. The formula exists to make sure every load-bearing element is present — not to be the final form.

> **For [narrow customer] who [struggles with specific job], [product name] is [category] that [specific benefit], unlike [alternative], because [differentiator].**

### The six slots

1. **Narrow customer** — from Discover. If you're generalizing to "everyone who…" here, stop and narrow.
2. **Specific job / struggle** — the job-to-be-done or friction, in customer-readable language.
3. **Category** — the existing mental bucket you're slotting into. Inventing a new category is a tax you can rarely afford; default to an existing one.
4. **Specific benefit** — the concrete outcome, not a feature. "Get to focus without interruptions" not "customizable notification settings."
5. **Alternative** — the real competition: the workaround, the incumbent, or "nothing." Naming the alternative is half the differentiation.
6. **Differentiator** — the one thing that makes you the better fit for this narrow customer, rooted in the strategic bet from Strategy.

### Example

> For indie builders shipping their own products, Ruthless is an in-repo product manager that pushes you to pick one core use case and solve it excellently, unlike generic AI assistants that happily generate 47 features, because it encodes opinionated PM discipline rather than helpful acquiescence.

Breaking down the slots:
- Customer: indie builders shipping their own products
- Job: building something worth shipping (not a feature zoo)
- Category: product manager (in-repo variant)
- Benefit: pushes you to pick one core use case and solve it excellently
- Alternative: generic AI assistants
- Differentiator: opinionated PM discipline vs. helpful acquiescence

---

## Sub-Stages

### A. Fill the Formula

Work through the six slots with the operator. For each, aim for concrete specifics — if a slot feels generic, push back until it's sharp.

Common issues and fixes:

- **"Professionals who want…"** → narrow to the specific job and context
- **"The easiest way to…"** → every competitor claims this; what's the *real* edge?
- **"Unlike spreadsheets"** → be specific — which spreadsheet workflow?
- **"Because we use AI"** → AI is not a differentiator in 2026. What specifically does the AI enable that matters to this customer?

### B. The Rewrite Pass

Once the formula is filled, rewrite into a natural sentence that doesn't feel formulaic. The formula is a skeleton; the final positioning should read like something a founder would say, not a template.

Apply these filters:

1. **Can a direct competitor paste this on their own site?** If yes, the differentiator is weak.
2. **Is the customer named specifically enough that a non-customer would self-deselect?** If it sounds like it's for everyone, narrow.
3. **Is the differentiator tied to the strategic bet, or bolted on?** If positioning and strategy don't agree, one of them is wrong.
4. **Could the target customer repeat this back in their own words after reading once?** If no, it's too dense or too clever.

### C. Variants and Derivatives

From the core positioning statement, derive three variants the operator will need:

1. **The tagline** — 5-10 words. The positioning statement compressed to the most memorable fragment.
   Example: "Build the right thing."
2. **The pitch** — 2-3 sentences. The positioning expanded with the customer situation and the core insight.
3. **The "for one customer" version** — a version of the pitch written as if to a single, specific person in your ICP. This is often what goes in a cold email or a first customer conversation.

### D. Test It

Positioning should survive contact with the customer. Before committing:

- **Read it out loud** — if it's stilted or jargon-heavy, revise
- **Show it to at least one target customer** — not "do you like this?" but "does this describe you?"
- **Show it to someone outside the target** — do they correctly opt out?
- **Pitch it cold** — in a one-minute conversation with a stranger, does it land?

---

## The AI Slop Test for Positioning

The same slop test applies here:

> If a competitor in your space pasted your positioning statement onto their site, would anyone notice?

If the answer is "maybe not," rewrite. Specifically avoid:

- "AI-powered [category]"
- "The simplest / easiest / fastest way to [generic verb]"
- "Built for modern teams / the modern [job title]"
- "Powerful, flexible, and [third adjective]"
- "Your [category] co-pilot"
- Adjective stacking: "intelligent, intuitive, and elegant"

These are the verbal equivalent of shadcn default + purple gradient. They're not positioning; they're default category filler.

---

## Common Failure Modes

- **Trying to be for everyone.** If the "Customer" slot keeps drifting wider during the session, it's because the operator is afraid of excluding people. Saying no is the work.
- **Differentiator that's actually a feature.** "Our differentiator is voice input" — features aren't positioning. The differentiator is *why* voice input matters to this customer — the strategic insight behind the choice.
- **Category invention.** "We're in a new category: [made-up term]." Occasionally correct, usually premature. Default to slotting into an existing category customers already understand.
- **Positioning that doesn't match the product.** If what you're about to shape in [shape.md](shape.md) doesn't deliver on this positioning, one of them has to change now — before you build.
- **Clever over clear.** A positioning statement that takes two readings to parse is worse than a boring one that lands immediately.

---

## Output

Save the positioning to `.ruthless/positioning.md`:

```markdown
# Positioning

## Core Statement
[One sentence, derived from the formula, refined]

## Formula Slots
- For: [customer]
- Who: [job/struggle]
- [Product] is: [category]
- That: [benefit]
- Unlike: [alternative]
- Because: [differentiator]

## Tagline
[5-10 words]

## Pitch (2-3 sentences)
[Extended version]

## For One Customer (cold-email/first-conversation version)
[Personalized variant]

## What this positioning says we're NOT
- [Inference 1]
- [Inference 2]
- [Inference 3]

## Tested with
- [Customer name or segment, date, reaction]
```

Update `.ruthless.md`:

```markdown
### Positioning
- Statement: [one sentence]
- Tagline: [...]
- Tested: [yes/no; notes]
- Doc: .ruthless/positioning.md
```

---

## Anti-Patterns to Catch

- **#15 Generic Positioning** — category copy; rewrite with specifics
- **#16 Trying to Be For Everyone** — if the customer slot keeps widening, push back
- **#17 Generic AI Aesthetic** — adjective stacking and "AI-powered X" are slop; reject

---

## When You're Done

Gate 4 scores **3+**. The positioning is crisp, distinctive, and ideally validated with at least one target customer. The next stage is [shape.md](shape.md) — scoping the MVP that actually delivers on this positioning for one core use case.
