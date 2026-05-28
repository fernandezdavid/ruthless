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

Ruthless ships **five skills** that work together (see [What's Inside](#whats-inside)).
Install them all — they reference each other.

### Option A: Clone + symlink globally (recommended)

If you want the skills available in every project on your machine, and
updates to propagate when you `git pull`:

```bash
git clone https://github.com/fernandezdavid/ruthless.git
cd ruthless
npm install              # no runtime deps
npm run link-global      # symlinks all skills into ~/.claude/skills + ~/.codex/skills
```

Other npm scripts:

```bash
npm run link-global:all      # also link Cursor, Gemini, and the generic Agent dirs
npm run link-global:force    # overwrite an existing entry
npm run unlink-global        # remove the symlinks
npm run unlink-global:all    # remove from every provider directory
```

### Option B: Copy into a single project

Each provider directory at the repo root contains the full set of skills.
Copy whichever provider matches your agent:

```bash
# Claude Code
cp -r .claude/skills/. /path/to/your/project/.claude/skills/

# Cursor
cp -r .cursor/skills/. /path/to/your/project/.cursor/skills/

# Gemini CLI
cp -r .gemini/skills/. /path/to/your/project/.gemini/skills/

# Codex CLI
cp -r .codex/skills/. /path/to/your/project/.codex/skills/

# Generic Agent Skills (VS Code Copilot, others)
cp -r .agents/skills/. /path/to/your/project/.agents/skills/
```

The trailing `.` matters — it copies the *contents* of the directory so all
five skills land directly under your project's `skills/` folder.

### Then invoke Ruthless

In Claude Code, Cursor, Gemini, or any `/`-prefix agent:

```
/ruthless
```

In Codex (which uses `$` as the command prefix):

```
$ruthless
```

### Other agents

Any agent that reads the Agent Skills format should work with `.agents/`.
If your agent expects a different layout, `source/` is the single source of
truth — use the build system (below) to generate a custom provider output.

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

Ruthless ships **five skills** in two families:

### Strategy

| Skill | What it does |
|-------|--------------|
| `/ruthless` | The PM layer. Installs governance into your config file, captures product context, diagnoses what stage you're at (discovery, validation, strategy, positioning, MVP scoping, execution), and drives you through one stage at a time. **Start here.** |

The `ruthless` skill comes with ten reference files (`principles.md`,
`anti-patterns.md`, `zero-to-one.md`, `diagnose.md`, `discover.md`,
`validate.md`, `strategy.md`, `position.md`, `shape.md`, `challenge.md`)
that the orchestrator loads on demand.

### Ship family

Once you've decided *what* to build, the ship family helps you do it well —
gate-driven, with explicit discovery and design steps so you don't slide
into Frankenstein delivery.

| Skill | What it does |
|-------|--------------|
| `/ruthless-ship` | End-to-end coordinator: chains discovery → user sign-off → design → PR. The canonical entry point for non-trivial features. |
| `/ruthless-discovery` | Produces a strategic discovery brief (job-to-be-done, audit, positioning, signal, competitive scan, success metrics, scope) that feeds the design phase. |
| `/ruthless-design` | A 7-phase pipeline (frame → prototype → spec → audit → implement → audit → ship) with hard gates between each. |
| `/ruthless-teach-delivery` | One-time interview that captures *how* this project ships — paths, primitives, test conventions, workflow tooling — into a `Delivery Conventions` block. The other ship-family skills read it at startup. |

The five skills cluster under the `ruthless-*` prefix so they're easy to
spot in your skill list. Verbs indicate coordinators (`ruthless-ship`),
nouns indicate single-job skills (`ruthless-discovery`, `ruthless-design`).

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
├── source/skills/                ← source of truth
│   ├── ruthless/                   strategy (with reference/*.md)
│   ├── ruthless-ship/              ship-family coordinator
│   ├── ruthless-discovery/         discovery brief
│   ├── ruthless-design/            design + build pipeline (with reference/*.md)
│   └── ruthless-teach-delivery/    one-time conventions interview
├── scripts/
│   ├── build.mjs                 ← transform source → providers
│   ├── link-global.mjs           ← symlink built skills into ~/.<provider>/skills/
│   └── unlink-global.mjs
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
