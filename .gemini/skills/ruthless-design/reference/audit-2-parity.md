# AUDIT-2 — Post-implementation parity checklist

Run this AFTER implementation, BEFORE claiming done. Compare the live app against the design-system spec side-by-side. Open both in a browser; don't audit from screenshots or memory.

## Visual parity

For each documented state in the design-system frame-set:

- [ ] **Empty state**: live app renders matches design-system frame.
- [ ] **Partial state**: matches.
- [ ] **Full state**: matches.
- [ ] **Today / future** (if time-aware): matches.
- [ ] **Special / excluded** (if plan-aware): matches.
- [ ] **Error state**: matches OR triggers correct fallback.

Check:
- [ ] Typography matches (display, body, mono — sizes match).
- [ ] Colors match (use browser inspector — design tokens, not hex literals).
- [ ] Spacing matches (compare paddings/margins in both renderings).
- [ ] Geometry matches (radius / corner treatment as specified).
- [ ] No inline styles that should have been classes.

## Interaction parity (manual or browser-driven)

Mandatory checks for any sheet/drawer/picker:

- [ ] **Entry**: backdrop fades in (~120ms), sheet slides up (~480ms), no jank.
- [ ] **Tap backdrop**: sheet dismisses immediately. Backdrop has `pointer-events: auto` on `.is-open`.
- [ ] **Tap close button**: dismisses with same animation as backdrop tap.
- [ ] **Swipe handle down** (if implemented): velocity-based commit.
- [ ] **Navigation away**: closes the sheet (cleanup function called from navigation handler).
- [ ] **Escape key**: closes the sheet (if applicable).
- [ ] **Scroll**: internal scroll works, handle stays visible, no double-scroll.

For navigation/tabs/drilldowns:
- [ ] Transitions match design-system spec timing.
- [ ] No leftover state from previous screen visible during transition.

## Data state parity (use real data or seeded data)

- [ ] Each state from the design-system spec reproducible with real or seeded data.
- [ ] No-data states show the documented fallback (em-dash, "no felt", "—"), not "undefined" or "[object Object]".
- [ ] Today cell aligns with calendar today.
- [ ] Timezone correctness: log a data point in the user's TZ, confirm the corresponding cell renders on the correct day.

## Console / network

- [ ] No console errors during open / interact / close.
- [ ] No 404s, no 500s in the network tab.
- [ ] No prop-type / hydration warnings.

## Tests

- [ ] Unit tests for new domain logic pass.
- [ ] Unit tests cover the edge cases enumerated in Phase 1 (FRAME).
- [ ] Browser-driven walkthrough (if applicable) hits every documented state.

## Screenshots for PR

- [ ] Captured each canonical state to the local screenshot directory.
- [ ] Filename convention: `<issue-id>-<surface>-<state>.png`.
- [ ] Side-by-side with the design-system reference where possible.

## Output format

```
AUDIT-2 findings:
1. [Item] — [what's drifted] — [fix proposed or deferred with reason]
2. ...

Status: BLOCKED (N items unresolved), READY-WITH-DEFERRALS (N items deferred with rationale), or READY (clean)
```
