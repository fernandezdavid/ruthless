# Anti-Patterns: The PM Slop Catalog

These are the specific, recognizable failure modes of AI-assisted product work from 2024-2026. Match-and-refuse: if you catch yourself producing one, stop and rewrite using the alternative.

The anti-patterns are grouped by the part of the product-thinking stack they corrupt: **thinking**, **artifacts**, **scope**, **metrics**, **positioning**, **taste**.

---

## Thinking

### 1. Feature Factory Output

**Pattern:** Producing a list of features in response to "what should we build?" without a problem, customer, or bet defined. Bullet lists of "core features" organized by category (auth, dashboard, settings…). Adding features because they exist in comparable products.

**Why it fails:** A feature list without a problem is a furniture catalog, not a product. You can't tell whether any of it is right. It invites scope creep because there's no principle for saying no.

**Rewrite:** Start with the problem. Name one customer, one job, one thing they're trying to get done. Then ask: what is the *single smallest thing* that would solve that for them? Only after that is established should "features" enter the conversation, and they should appear one at a time, each justified against the job.

---

### 2. Solution-First Thinking

**Pattern:** "Let's add a dashboard." "We need an AI agent that does X." "Users want a templates gallery." Starting from a proposed solution and reverse-engineering the problem.

**Why it fails:** The proposed solution is usually one of many possible responses to an under-specified problem. By starting there, you foreclose on better responses and anchor on a specific implementation before understanding what's needed.

**Rewrite:** Every time a solution is proposed, reframe it as a problem. "Let's add a dashboard" → "What decision are users trying to make that a dashboard would help with?" Only once the decision/job is clear, evaluate whether a dashboard is actually the right response — it often isn't.

---

### 3. Imagined Customers

**Pattern:** "Users want…", "Our target audience expects…", "Founders need…" — speaking about customers in abstract terms with no grounding in actual conversations, observed behavior, or demonstrated demand. Fabricating plausible personas without evidence.

**Why it fails:** Imagined customers are a mirror — they want whatever the operator wants them to want. Products built for imagined customers reliably miss, because the imagined customer doesn't have the frictions, habits, budgets, or priorities of the real one.

**Rewrite:** Any claim about what customers want must be sourced. "Users want X" becomes "In 7 interviews, 5 described doing X manually and said they'd pay for automation" — or it doesn't get made. If you have no evidence, say so explicitly: "We're assuming customers want X; we haven't verified this; here's the cheapest way to find out."

---

### 4. Skipping Discovery to "Just Ship and Learn"

**Pattern:** "Let's just build it and see." Treating shipping as a substitute for thinking. Using "iterate in public" as a reason to avoid the hard work of forming hypotheses and testing them before committing code.

**Why it fails:** Shipping is the most expensive learning mechanism available — in time, money, and reputation. Most of what you'd learn from launching a bad product can be learned in a week of interviews and a painted-door test. "Ship to learn" is often "ship to avoid having to think."

**Rewrite:** Some learning genuinely only happens in-market — pricing elasticity, retention curves, specific UX edge cases. Shipping is the right tool for those. For everything else — "will anyone care?", "is this the right framing?", "will they pay?" — use cheaper tools first: interviews, paper prototypes, landing-page tests, concierge MVPs. Shipping is the last resort, not the first.

---

### 5. Prioritization Theater

**Pattern:** Applying RICE, MoSCoW, weighted scoring matrices, ICE, or 2×2 grids mechanically to produce a number that justifies a pre-decided answer. Multiple frameworks producing multiple rankings, with the operator picking the one that agrees with them.

**Why it fails:** The number is the output of your assumptions about reach, impact, confidence, and effort — each of which is itself a judgment call. Stacking multipliers of guesses doesn't produce insight; it laundered opinion into numeric dress. Worse, it discourages the actual question: *what's the bet, and what survives it?*

**Rewrite:** Prioritize by bet, not by score. "This is the riskiest assumption, so this experiment is first." "This one feature expresses the whole positioning, so it goes first." Frameworks are useful as checklists to avoid missing dimensions, not as answer generators. If you use RICE, write down your confidence as a sentence, not a number.

---

## Artifacts

### 6. Solution-First PRDs

**Pattern:** Product requirements documents where the "Solution" or "Design" section is long and specific, and the "Problem" section is two sentences of vague framing. PRDs that describe *what to build* in detail before establishing *why it should exist*.

**Why it fails:** A PRD that can't articulate the problem in the customer's voice, with evidence, isn't a product decision — it's a build order. It will ship something internally coherent and externally irrelevant.

**Rewrite:** The Problem section should be longer and harder than the Solution section. Required elements: (1) who specifically has this problem, (2) how you know they have it (evidence), (3) what they're doing today instead, (4) what would make it worth their time to switch. Only after those are solid should solutions be considered — and the PRD should evaluate 2-3 alternatives before committing to one.

---

### 7. Generic PRDs

**Pattern:** PRDs filled with boilerplate sections (Background, Requirements, User Stories, Acceptance Criteria…) that could describe any product. Every section present, none of them load-bearing.

**Why it fails:** Structure without opinion is noise. A PRD should make a specific bet visible and arguable. Generic PRDs launder ambiguity into the appearance of rigor.

**Rewrite:** Every section in a PRD should contain an opinion that could be wrong. If a section could say "TBD" without losing anything, delete it. Favor small, pointed PRDs: the problem, the bet, the smallest test, the success criterion, the main risks. Everything else is ceremony.

---

### 8. Roadmaps as To-Do Lists

**Pattern:** Quarterly roadmaps presented as commitments to ship a list of items. Features stacked in time with ship dates. Items rarely fall off; new items only get added.

**Why it fails:** Roadmaps-as-commitments confuse the map with the territory. They force the team to ship items regardless of what's been learned, and they signal certainty the team doesn't actually have. They also become political artifacts — stakeholders negotiate for their item rather than arguing about the bet.

**Rewrite:** Frame the roadmap as a set of hypotheses and the experiments that would test them. "In Q2 we believe X; we'll know if we're right by Y; if we are, Z becomes worth building." Items should fall off as evidence accumulates. A roadmap that hasn't changed in a quarter is either a miracle or a lie.

---

### 9. Missing Go-to-Market

**Pattern:** Product plans, strategy docs, or PRDs with no articulated theory of distribution. GTM treated as a launch activity to figure out later, or as a marketing problem the PM doesn't own.

**Why it fails:** A product that can't be distributed is not a product. GTM shapes the product itself — what it does, how it's priced, what the first use case is, what it looks like. Treating distribution as an afterthought produces products that are unreachable by the customers they were built for.

**Rewrite:** Every strategy doc and PRD includes a GTM section from the start. Required elements: (1) how does the target customer find out this exists? (2) what's the trigger — what are they doing at the moment they'd reach for it? (3) what's the channel — self-serve, sales-led, community, content, partnerships? (4) what's the first proof point — the moment they get value, not the signup. If you can't answer these, the product isn't ready to build.

---

## Scope

### 10. "MVP" as Feature-Reduced Full Product

**Pattern:** Defining an MVP as "the full product with some things removed." A scoped-down version of everything. Ten half-built features instead of one complete one.

**Why it fails:** A feature-reduced full product is worse than any single piece of it, because every piece is incomplete. Customers don't experience "90% of the vision" — they experience the specific thing they tried to do, which half-worked.

**Rewrite:** Define the MVP as the *smallest complete thing that proves the bet for one specific use case*. One customer, one job, done end-to-end with taste. If you have to cut, cut use cases before you cut quality. A product that does one thing brilliantly beats a product that does ten things adequately, especially at zero-to-one.

---

### 11. Multi-Use-Case V1

**Pattern:** "Our V1 covers these three use cases: A, B, and C." Launching with multiple customer segments or jobs because "we didn't want to leave them out."

**Why it fails:** Each use case demands its own UX, positioning, and go-to-market. Three use cases means three products poorly served and zero positioning clarity. Customers can't tell who the product is for, because it's for no one specifically.

**Rewrite:** Pick one. "We will be the best in the world at X for Y." The other use cases are V2+ — not "out of scope forever" but "not what we're proving first." The discipline of picking one is where the strategy lives.

---

### 12. Unconstrained Plans

**Pattern:** Plans that assume unlimited time, team, or capital. "We'll build X, then Y, then Z" without reference to what's actually available. Multi-quarter roadmaps from two-person teams with three months of runway.

**Why it fails:** Constraints are not obstacles to the plan; they are the plan. A plan that doesn't survive contact with the real team, the real budget, and the real calendar isn't a plan — it's a wish list.

**Rewrite:** Put the constraint at the top of the plan. "We have 2 people for 3 months. Everything below must survive that." Then plan backwards from the constraint: what's the single thing this team can do excellently in that window? Anything bigger than that is a fantasy, and naming it in the plan only creates pressure to cut corners.

---

## Metrics

### 13. Vanity Metrics

**Pattern:** Measuring signups, registered users, page views, impressions, email list size, downloads, followers. Numbers that go up, look good in updates, and don't indicate anyone got value.

**Why it fails:** Vanity metrics are optimized by acquisition activity, not by product value. They rise when you run ads and fall when you stop, regardless of whether the product is working. They anchor the team on the wrong flywheel.

**Rewrite:** Measure behavior that indicates value delivered. Activation = the moment the customer gets the first thing they came for. Retention = they keep coming back for it. Paid conversion = they care enough to pay. Word-of-mouth = they care enough to tell someone. If your top-line metric can rise without anyone getting value, it's the wrong metric.

---

### 14. Goodhart's Law Violations

**Pattern:** Picking a metric, tying team goals to it, and watching it become gamed. DAU tracked by forcing login. NPS tracked by sending surveys only to happy users. "Engagement" tracked by counting clicks regardless of intent.

**Why it fails:** "When a measure becomes a target, it ceases to be a good measure." Optimizing the number decouples it from the underlying thing it was supposed to indicate.

**Rewrite:** Use constellations of metrics, not single numbers. Pair every growth metric with a quality metric that would fall if the growth metric were gamed. Treat the quality metric as a guardrail that can veto the growth metric. And revisit the metric set when the world changes — metrics have a shelf life.

---

## Positioning

### 15. Generic Positioning

**Pattern:** "The easy-to-use platform for modern teams." "Powerful, flexible, and built for scale." "Your AI assistant for [category]." Category copy that could describe any company in the space.

**Why it fails:** If a competitor could paste your positioning onto their site without changing a word, it isn't positioning — it's category boilerplate. It doesn't differentiate, doesn't attract the specific customer you want, and doesn't repel the ones you don't.

**Rewrite:** Positioning is a specific claim with a specific customer, a specific alternative you're better than, and a specific reason why. The test: a customer reading your positioning should feel either "this is for me" or "this is not for me." If they feel "this could be for me, I guess?" — it's wrong.

---

### 16. Trying to Be For Everyone

**Pattern:** Positioning designed to avoid excluding any customer segment. Language that's deliberately vague so it works for startups, enterprises, individuals, teams. Multiple "use cases" on the landing page.

**Why it fails:** A product for everyone is a product for no one. When every segment sees themselves partially reflected and no segment sees themselves fully, the product loses to competitors who picked a lane.

**Rewrite:** Pick the narrowest customer you can credibly serve. Over-index on being *the* choice for that segment, even at the cost of not serving adjacent segments. You can expand later; you can't build a beachhead by spreading thin.

---

## Taste

### 17. Generic AI Aesthetic

**Pattern:** MVPs that look like every other AI-assisted product: shadcn defaults, purple gradients, boilerplate dashboard layout, Inter everywhere, empty states that say "Nothing here yet," generic hero sections with a gradient and a CTA. Functional but indistinguishable.

**Why it fails:** Zero-to-one products compete on memorability as much as functionality. A tasteful, distinctive MVP for one use case beats a generic MVP with more features — because customers remember the distinctive one, and "AI-looking" now actively signals low effort. Slop-looking products signal slop-quality thinking, fairly or not.

**Rewrite:** Treat taste as a product decision, not a polish phase. Pick an aesthetic direction early, tied to the brand voice and customer context, and execute it with precision. The MVP should look like something — not like every other MVP. If someone can immediately tell it was AI-generated, that's the problem.

---

### 18. Copy as Afterthought

**Pattern:** Generic button text ("Submit", "Get Started", "Learn More"), boilerplate error messages ("Something went wrong"), empty states that teach nothing, microcopy that could be from any product.

**Why it fails:** Copy is the product's voice. Generic copy = generic voice = forgettable product. It also fails specific customers: "Get Started" doesn't tell a skeptical buyer what they'll get; "Something went wrong" doesn't help a frustrated user recover.

**Rewrite:** Every string is a product decision. CTAs should describe the specific outcome ("Start my first project," not "Get Started"). Error messages should explain what happened and how to recover. Empty states should teach the product. If a string could be in any product in your category, rewrite it.

---

## How to Use This Catalog

When shaping, reviewing, or challenging any product artifact:

1. **Scan for match.** For each anti-pattern above, check whether the artifact exhibits it. Be honest — the goal is to catch yourself, not defend your work.
2. **If matched, rewrite using the alternative.** Don't tweak; rewrite. Anti-patterns are structural, not cosmetic.
3. **Name the anti-pattern out loud.** "This is a solution-first PRD" is more useful than "this feels off." Naming lets you fix it with confidence.

The `$challenge` skill runs this scan systematically against any artifact you hand it.
