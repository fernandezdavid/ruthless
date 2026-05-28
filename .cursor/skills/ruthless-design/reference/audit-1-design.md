# AUDIT-1 — Pre-implementation design checklist

Run this against the design-system spec (Phase 3 deliverable) before writing any app code. Self-audit, report findings as a numbered list inline.

## Reuse before re-invent

- [ ] Every primitive needed already exists in the project's design system. If something is genuinely new, it has been added to the design system, not invented inline.
- [ ] No new chip / dot / card / sheet / scoreboard variant that duplicates an existing one with different class names.
- [ ] Status indicators (readiness, severity, state) reuse shared primitives — not new color-coded text spans.
- [ ] Numerics use the design system's mono token, not the body font.

## Brand fidelity

- [ ] Geometry tokens used as specified (e.g. hard-cut where the system calls for it; rounded only where intended).
- [ ] No drop shadows where rules would do, if the system favors rules.
- [ ] No gradients unless the system explicitly allows them.
- [ ] No system fonts. Display, body, mono fonts as specified.
- [ ] Touch targets ≥ 48px (or the project's minimum) on interactive elements.
- [ ] No emojis. No motivational language unless the voice rules permit. Voice rules read from the project's brand docs.

## States covered

- [ ] Empty / first-time state designed and named.
- [ ] Partial-data state designed (e.g. young plan, sparse history, one half of window empty).
- [ ] Full / steady state designed.
- [ ] Loading state designed OR explicitly documented as "skeleton not needed because…".
- [ ] Error state designed OR explicitly documented.
- [ ] Today / future cells handled if time-aware.
- [ ] Special / excluded weeks handled if plan-aware.
- [ ] No-data-for-this-row handled (em-dash, "no felt", "—").

## Interaction parity (across sibling surfaces)

Find every existing surface of the same type (sheet, picker, drawer, etc.) and confirm:

- [ ] Same entry animation timing and easing.
- [ ] Same height contract (e.g. all bottom sheets open to the same percentage of viewport — don't deviate per metric).
- [ ] Same dismissal paths: backdrop tap, close button, swipe handle, escape, navigation away.
- [ ] Same scroll behavior (internal scroll, fixed handle).
- [ ] Same focus behavior on open.

## Documentation completeness

- [ ] Design-system page has the new section/frame-set.
- [ ] CSS is in the design-system CSS file, not inline.
- [ ] Sidecar notes panel documents: anatomy, interaction (entry/exit/dismiss/scroll), color semantics, data states.
- [ ] Engineering spec markdown exists with: implementation plan, files touched, data shape, test plan, edge cases.

## Timezone / date handling (if applicable)

- [ ] Any date comparison uses local date formatting, not `toISOString().slice(0,10)` (which shifts in non-UTC TZs).
- [ ] Week bucketing matches the backend's bucketing semantics.
- [ ] "Today" cell anchored to local midday (`setHours(12,0,0,0)`) to avoid TZ edge cases.

## Half-half delta edge cases (if applicable)

- [ ] All-data-in-one-half handled (don't return null; show current value with "—" change).
- [ ] Single-week window handled.
- [ ] Exclusions (e.g. deload weeks) documented.

## Output format

After running the checklist, report inline:

```
AUDIT-1 findings:
1. [Item from checklist] — [what's missing] — [fix proposed]
2. ...

Status: BLOCKED (N items unresolved) or READY (all items addressed)
```
