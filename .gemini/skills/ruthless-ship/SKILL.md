---
name: ruthless-ship
description: "End-to-end coordinator: chains the ruthless-discovery skill (strategic context) to a user sign-off gate to the ruthless-design skill (design + build + ship). Use when the user says 'let's start on X' or 'begin work on feature Y' and X/Y is non-trivial. For tiny tweaks, route directly to implementation; for medium/large work, this is the canonical entry point."
---

# Ruthless ship (coordinator)

Single entry point for non-trivial feature work. Chains the two sub-skills with explicit gates between them.

## Startup — read project conventions

Before doing anything else, look for a `Delivery Conventions` block in `GEMINI.md` (markers: `<!-- delivery:conventions:start` / `end`). This block is installed by `/ruthless-teach-delivery` and tells you the project's paths (where discovery briefs go, where engineering specs live, where the design system is), test conventions, workflow tooling, and load-bearing primitives.

- **Block present**: read it, use its values for the rest of the flow. Don't re-derive paths from scratch.
- **Block absent**: offer to run `/ruthless-teach-delivery` first:

  > *"No Delivery Conventions block in `GEMINI.md` yet. Running `/ruthless-teach-delivery` first (10 min) will save context across this and future ship flows. Run it now, or proceed with sensible defaults and you'll fill in as we go?"*

  If the user declines, fall back to defaults (typical paths: `docs/product/discovery/`, `docs/engineering/`, `brand/design-system/`). Note explicitly in the conversation when you're using a default vs a captured convention so the user can correct.

```
USER REQUEST
    ↓
/ruthless-discovery          [Phases 0–9]
    ↓
<feature>-discovery.md (in project's discovery directory)
    ↓
[USER SIGN-OFF GATE]
    ↓
/ruthless-design             [Phases 1–7]
    ↓
PR + screenshots + ADR
```

## How it runs

1. **State the entry**: *"Running ruthless-ship for <feature>. Step 1: discovery."*

2. **Invoke discovery**: run `/ruthless-discovery` end-to-end. The output is a committed brief.

3. **Sign-off gate**: do NOT auto-advance. Show the user the brief and ask:
   > *"Discovery brief is at `<path>`. Ready to enter design flow with this as input?"*

   The user might:
   - Approve → proceed to design flow
   - Ask for revisions → loop back into discovery
   - Defer → stop, leave the brief in place, exit

4. **Invoke design flow**: run `/ruthless-design` with the discovery brief as the Phase 1 (FRAME) input. The skill reads the brief, doesn't re-frame.

5. **Sign-off gates within design flow**: `ruthless-design` already has its own gates (prototype pick, spec confirm, audit findings). Honor them — don't push through.

6. **Ship**: design flow's Phase 7 produces the PR. The discovery brief stays committed as part of the project record.

## When to skip the coordinator

- **Tiny work**: typo, color tweak, copy fix → route straight to implementation. No skill needed.
- **Resuming**: if a discovery brief already exists, jump straight to `/ruthless-design` and pass the existing brief.
- **Pure backend**: SQL migration, schema change, refactor with no user-visible change → neither skill applies; do the work directly.

## Inputs and outputs

| Stage | Input | Output |
|-------|-------|--------|
| Discovery | User request + project context | `<feature>-discovery.md` in the project's discovery directory |
| Design | Discovery brief | Design-system updates + engineering spec markdown |
| Build | Spec | App code + tests |
| Ship | Code + screenshots | PR + ADR + changelog |

## Naming conventions

- Discovery brief: matches the issue slug when one exists (e.g. `ocpm-123-<feature>-discovery.md`), or `<feature>-discovery.md` when no issue yet.
- Engineering spec: `<feature>.md` in the engineering docs directory.
- Design-system section ID: `<feature>` or `<feature>-<surface>`.

## Coordination notes

- Don't collapse discovery into design — they're separate gates for a reason.
- If discovery surfaces something that changes the strategic frame (e.g. the audit reveals the existing surface is actually fine), stop and tell the user. Don't auto-proceed to design when discovery argues against doing the work at all.
- Use TodoWrite (or equivalent task tracker) to track which stage you're in across the full pipeline. The flow can span multiple days; the todo list survives compaction.
- Ask the user directly to clarify what you cannot infer.
