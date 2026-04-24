# Ruthless

**Build the right thing.**

Ruthless is an opinionated product management skill system for AI coding
agents. It fights generic AI-generated product thinking — Frankenstein feature
lists, solution-first PRDs, vanity metrics, roadmaps-as-to-do-lists — and
pushes operators to pick one core use case and solve it excellently.

Works with Claude Code, Cursor, Gemini CLI, Codex CLI, and any agent that
supports the Agent Skills specification.

> **Inspired by [Impeccable](https://github.com/pbakaus/impeccable)** by
> [Paul Bakaus](https://github.com/pbakaus) — the project that pioneered
> cross-provider skill systems and the "fight AI slop" framing (for design).
> Ruthless takes the same architecture and applies it to product strategy.
> See [`NOTICE.md`](NOTICE.md) for full attribution.

---

## Why This Exists

**When building is cheap, focus is the scarce resource.**

AI makes shipping easy. It will happily generate 47 features, a 12-page PRD,
and an implementation plan — without ever asking "should we build this at
all?" The result is Frankenstein products: internally coherent code,
externally incoherent value. The hard part of product management — deciding
what to build, for whom, and why — gets skipped.

Ruthless pushes that work back into the conversation. It encodes an opinionated
product lens:

- **Zero-to-one over growth.** Tuned for building new things, not optimizing
  existing products.
- **Strategic bets over feature roadmaps.** One thing you believe, one thing
  you're testing.
- **Discovery over delivery.** Because delivery is the easy part everyone
  overdoes, and discovery is where the leverage is.
- **One use case over ten.** A tasteful, delightful MVP for one job beats a
  generic MVP for many.
- **External signal over internal conviction.** If the market isn't telling
  you this is real, it isn't real yet.
- **Taste as product strategy.** Generic-looking MVPs lose to distinctive
  ones with less scope.

---

## Installation

Pick your agent below. Each provider has a pre-built skills directory in this
repo — copy it into your project (or your user config) and the agent
discovers it automatically.

### Claude Code

Copy `.claude/skills/ruthless/` into your project:

```bash
cp -r .claude/skills/ruthless/ /path/to/your/project/.claude/skills/
```

Or install globally for all projects:

```bash
cp -r .claude/skills/ruthless/ ~/.claude/skills/
```

Then, in Claude Code:

```
/ruthless teach
```

### Cursor

```bash
cp -r .cursor/skills/ruthless/ /path/to/your/project/.cursor/skills/
```

Invoke: `/ruthless teach`

### Gemini CLI

```bash
cp -r .gemini/skills/ruthless/ /path/to/your/project/.gemini/skills/
```

Invoke: `/ruthless teach`

### Codex CLI

```bash
cp -r .codex/skills/ruthless/ /path/to/your/project/.codex/skills/
```

Invoke: `$ruthless teach`  (Codex uses `$` as the command prefix)

### Agent Skills (VS Code Copilot, others)

```bash
cp -r .agents/skills/ruthless/ /path/to/your/project/.agents/skills/
```

Invoke: `/ruthless teach`

### Other Agents

Any agent that reads Agent Skills format should work with the `.agents/`
directory. If your agent expects a different layout, the `source/` directory
is the single source of truth — use the build system (below) to generate a
custom provider output.

---

## How to Use It

After installing, just invoke Ruthless:

```
/ruthless
```

Ruthless is an orchestrator. It will:

1. **Ingest** your repo — read the README, the code structure, landing copy,
   existing research, and any `.ruthless.md` from prior runs
2. **Teach itself** — if anything's missing, ask a focused interview to
   capture your customer, problem, strategic bet, competitive landscape,
   constraints, and anti-goals (written to `.ruthless.md`)
3. **Diagnose** — score your project against a six-gate rubric (customer
   clarity, problem evidence, strategic bet, positioning, scope discipline,
   execution alignment) and classify what stage you're at
4. **Propose a path** — recommend the next 2-3 steps with reasoning
5. **Execute** — drive through each stage with you, one at a time,
   re-diagnosing after each completed stage

You only need to know one command. Ruthless figures out what you need.

### Other modes

| Invocation              | What it does                                                |
|-------------------------|-------------------------------------------------------------|
| `/ruthless`             | Full orchestration (default — the main use case)            |
| `/ruthless teach`       | Just capture product context; write `.ruthless.md`          |
| `/ruthless diagnose`    | Health check: score the rubric without executing            |
| `/ruthless continue`    | Resume the orchestrated flow where it left off              |

(Codex users: substitute `$ruthless` for `/ruthless`.)

---

## What's Inside

V1 ships **one skill** with **ten reference files** covering every stage of
the flow:

- `principles.md` — the seven core beliefs Ruthless operates from
- `anti-patterns.md` — the 18-pattern PM slop catalog with rewrites
- `zero-to-one.md` — why 0→1 is a different game than growth PM
- `diagnose.md` — the six-gate rubric and stage classification
- `discover.md` — customer, market, and competitive discovery
- `validate.md` — experiment design for the riskiest assumption
- `strategy.md` — the strategy doc format (with a required "Not Doing" section)
- `position.md` — distinctive positioning in one sentence
- `shape.md` — MVP scoping for one and only one core use case, with taste
- `challenge.md` — systematic stress-test against anti-patterns

The orchestrator in `/ruthless` loads the right reference file on demand as
you move through stages. In future releases, each stage reference may be
promoted to its own direct-invocable skill (`/shape`, `/discover`, etc.) for
users who want to jump ahead.

---

## The Seven Principles

Full treatment in
[`source/skills/ruthless/reference/principles.md`](source/skills/ruthless/reference/principles.md).

1. **One core use case, solved excellently.** Not ten half-features.
2. **Problem before solution, always.** Always reframe solutions to the
   problem they serve.
3. **External signal beats internal conviction.** Opinions are worth nothing
   next to evidence.
4. **Constraints are features, not obstacles.** Name the constraint; plan
   within it.
5. **The riskiest assumption is the real work.** Test the thing that could
   kill the bet, first.
6. **Ruthless means saying no with clarity.** A strategy that excludes
   nothing isn't a strategy.
7. **Taste is a product decision.** Generic-looking products lose, even with
   more features.

---

## The PM Slop Test

If you showed this product — its feature list, PRD, pitch, landing page, or
MVP — to ten other operators and said "an AI helped with this," would they
believe you immediately?

If yes, that's the problem. A distinctive product makes someone ask *what is
this and how did they arrive at it?* — not *which AI template did they use?*

Ruthless catalogs the specific failure patterns in
[`source/skills/ruthless/reference/anti-patterns.md`](source/skills/ruthless/reference/anti-patterns.md)
and gives you tools to spot them in your own work.

---

## Building from Source

If you want to customize skills or add a new provider:

```bash
npm install           # no runtime deps; installs nothing (dev deps optional)
npm run build         # regenerates all provider directories from source/
npm run rebuild       # clean + build
```

Source of truth lives in `source/skills/<name>/`. Provider outputs
(`.claude/`, `.cursor/`, `.gemini/`, `.codex/`, `.agents/`) are generated —
do not edit them directly. See [CONTRIBUTING.md](CONTRIBUTING.md) for the
full workflow.

---

## Repo Structure

```
ruthless/
├── source/skills/ruthless/       ← source of truth
│   ├── SKILL.md
│   └── reference/
│       ├── anti-patterns.md
│       ├── principles.md
│       └── zero-to-one.md
├── scripts/build.mjs             ← transform source → providers
├── .claude/ .cursor/ .gemini/    ← generated outputs (committed)
├── .codex/ .agents/
├── package.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── NOTICE.md
```

---

## Influences

Ruthless is a synthesis of:

- **Teresa Torres** — continuous discovery, opportunity solution trees
- **Marty Cagan** — product discovery, empowered teams
- **Lenny Rachitsky** — strategy doc format, GTM thinking
- **The Mom Test** — customer conversations that produce honest signal
- **[Paul Bakaus](https://github.com/pbakaus)'s
  [Impeccable](https://github.com/pbakaus/impeccable)** — the cross-provider
  skill-system architecture and the "fight AI slop" framing (applied to
  design), which Ruthless extends to product strategy. Full attribution in
  [`NOTICE.md`](NOTICE.md).

---

## License

[Apache 2.0](LICENSE). See [NOTICE.md](NOTICE.md) for attributions.

Contributions welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first —
Ruthless is opinionated, and not every contribution will fit.
