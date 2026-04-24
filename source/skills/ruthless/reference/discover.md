# Discover: Customer, Market, and Competitive Discovery

This stage answers: **who is this for, what's their problem, and what's the external evidence that either is real?**

You enter Discover when Gate 1 (customer clarity) or Gate 2 (problem evidence) fails. You leave when both pass — you have a narrow, specific customer and evidence (not just opinion) that they have this problem urgently.

---

## Core Discipline

**External signal beats internal conviction.** If it's just what the operator thinks customers want, it's nothing. The work is to produce evidence from outside the building.

**Problem before solution, always.** Discover focuses on the customer's *situation and struggle*, not on the operator's proposed product. The Mom Test principle applies: ask about their life, not your idea.

---

## Sub-Stages

Do these in order. Do not skip ahead.

### A. Narrow the Customer

The operator almost always starts with too broad a definition ("founders", "developers", "product people"). Narrowing is the work.

**Technique — the Narrowing Ladder.** Start with the stated customer and narrow until you reach a segment you could list the individual members of.

Example:
- "Developers" → too broad
- "Indie developers" → still too broad
- "Indie developers building AI tooling" → warmer
- "Indie developers building AI tooling who have shipped at least one product and have an audience < 10k" → narrow enough

Ask the operator:
- Which of the people you'd target do you personally know by name? How many?
- What do they have in common that distinguishes them from people who *wouldn't* be the customer?
- Can you describe a specific day in their week where this product would fit?

If the operator can't narrow — the segment exists only in the abstract — that's the finding. The first action isn't to build; it's to find and talk to five real members of the candidate segment.

### B. Gather External Signal

Once the segment is narrowed, the question is: **do these people actually have this problem, and how urgently?**

Signals, ranked by strength:

| Rank | Signal                                                            | Why it's strong                           |
|------|-------------------------------------------------------------------|-------------------------------------------|
| ★★★★ | They're already paying for a workaround (spreadsheets, Zapier, consultants, a worse product) | They've voted with their money for the problem's existence |
| ★★★★ | Unprompted, repeated requests to you or in public (forums, support tickets, social posts) | The problem surfaces without you asking   |
| ★★★ | Specific, articulated frictions from interviews (not just "yeah, that'd be cool") | They can describe the pain in detail     |
| ★★★ | Demonstrable behaviors: they're building workarounds, complaining online, asking competitors for this | Evidence of the problem, not just agreement |
| ★★  | Waiting list sign-ups from a clear pitch                         | Some commitment, but cheap               |
| ★   | Survey "I'd use this" answers                                    | Largely useless; tops-of-mind bias       |
| —   | "I can't imagine anyone not wanting this"                        | Not a signal; it's conviction.            |

**Task for the operator:** produce at least three ★★★ or better signals before passing Gate 2. If they can't, the first work is to talk to five members of the segment.

### C. Customer Interviews (The Mom Test)

When interviews are needed (almost always), run them with discipline.

**Rules:**
1. Talk about their life and work, not your idea. Your idea will bias the answers.
2. Ask about past behavior, not future intentions. "What did you do last time you faced this?" beats "Would you use X?"
3. Listen for specific frictions, workarounds, and urgency. Generic agreement is noise.
4. If they volunteer a compliment or interest in your idea, redirect to behavior: "When's the last time this came up? What did you do?"

**Interview guide starter** (adapt to the segment):

- Walk me through how you handle [the job] today. Where does it take the most time?
- Tell me about the last time [the problem situation] happened. What did you do?
- What have you tried to fix this? Spreadsheets, tools, hacks?
- How much time does this cost you per [day/week/month]?
- Who else does this affect? Who else would care if it got better?
- If this were magically solved tomorrow, what would change in your work?
- What would make you NOT adopt a solution, even if it worked?

**Synthesis rule:** look for patterns across 5-7 interviews, not averages. A single specific, vivid story often beats ten generic agreements. If three interviews independently mention the same workaround, that's a real signal.

### D. Map the Competitive Landscape

The "competition" is rarely the other products in the space. The real competition is usually:
- **The customer doing nothing** (the problem isn't urgent enough to act on)
- **A spreadsheet or manual workflow**
- **A generic tool being misused** (Notion, Google Sheets, Trello for things they weren't designed for)
- **A consultant or freelancer doing it for them**
- **One of the incumbents the operator didn't take seriously**

For each real competitor (including "nothing"):
- What's their angle? (Price? Integration? Workflow? Speed? Specialization?)
- Where are they strong?
- Where are they weak — specifically, for *your* narrow customer?
- Why does your narrow customer settle for them today?

Produce a short competitive matrix. Not comprehensive — focused on the gap you're entering.

### E. Market Sizing — Real, Not Slide Math

Skip the TAM/SAM/SOM theater. Answer three concrete questions:

1. **Realistic near-term population:** How many members does your narrow segment have, in the geographies and channels you can actually reach? Bound it with specifics (e.g., "~3,000 indie AI tool builders with >1k audience on X/GitHub, based on cross-referencing [sources]").
2. **Reachability:** Through what channels can you actually touch them? Not "SEO" or "we'll do content" — specifically where.
3. **Willingness-to-pay floor:** What do they pay today for the worst version of this (spreadsheets, consultant time, worse products)? That floor anchors your pricing hypothesis.

If the operator can't answer these grounded, stop and do the research. A plan built on TAM is a plan built on nothing.

---

## Outputs from Discover

By the end of this stage, `.ruthless.md` should contain:

```markdown
### Customer
- Narrow segment: [specific, listable]
- Defining characteristics: [what distinguishes them]
- Where to find them: [reachable channels]
- Estimated near-term reachable population: [number + how derived]

### Problem
- In their words: ["direct quotes from interviews or observed behavior"]
- Current alternatives: [workarounds, competitors, doing nothing]
- Urgency evidence: [what they're already paying / doing / saying]
- Willingness-to-pay floor: [what they spend on worst-version-of-this today]

### Competitive Landscape
- Real competition: [who or what; often includes "nothing"]
- Gap you're entering: [specific weakness the competition has for your narrow customer]
- Why now: [what changed that makes this viable now vs. 5 years ago]
```

Update the state section with completion date and interview count.

---

## Anti-Patterns to Catch at This Stage

See [anti-patterns.md](anti-patterns.md) for the full catalog. Specifically watch for:

- **#3 Imagined Customers** — any claim not sourced to interviews or observed behavior
- **#4 Skipping Discovery to "Just Ship and Learn"** — shipping is not discovery
- **#13 Vanity Metrics** — if the "evidence" is signups from a landing page with no commitment, that's weak
- **#16 Trying to Be For Everyone** — if the narrowing exercise keeps drifting wider, push back

---

## When You're Done

Gate 1 (customer clarity) is at **3+** and Gate 2 (problem evidence) is at **3+**. Re-run the diagnosis. The next failing gate becomes the next stage — almost always Gate 3 (Strategic Bet), which takes you into [validate.md](validate.md) and [strategy.md](strategy.md).
