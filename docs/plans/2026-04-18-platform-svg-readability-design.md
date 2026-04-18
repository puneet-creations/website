# Platform SVG Readability Redesign — Design Document

**Date:** 2026-04-18
**Scope:** Phase 1 of the cardiatec-inspired enrichment pass
**Author:** Brainstorm with Puneet (user approved Sections 1, 2, 3)

## Context

Three visualization sections on `/platform` are objectively hard to read: all of their SVG-embedded text renders at ~10–11px actual pixels regardless of viewport, well below any accessibility or comfort threshold. The root cause is shared: each section crams enterprise-density data (field scores, JSON, multi-model agreement stats, routing fanouts) into a fixed-ratio SVG viewBox, and the viewBox scaling plus the 1400px max-width cap floors out around 10–13px.

User feedback: _"also fix the svg cards in the platform, agents specially ones which are difficult to read and understand."_

Audit also covered `/agents` (motion stories) and found them readable — text is 14–48px on dark backgrounds with proper contrast. No redesign needed there.

User selected scope option **A**: ship SVG readability fixes as Phase 1 (standalone merge), before the Phase 2 wow section + site-wide scroll polish.

User selected design philosophy **Elevated**: readability fix plus one storytelling motion moment per section. Not plain HTML cards (too much regression from the current attempt at visualization), not heavy scrollytelling (Phase 2 territory).

## Sections affected

One file: `src/components/PlatformStory.tsx` (810 lines). Three exported functions rewritten:

1. `HallucinationControl` (lines 424–577) — "Four walls, not four prompts"
2. `DeterminismProof` (lines 582–672) — "Same input. Same output. Every time."
3. `ScaleAtVolume` (lines 675–810) — "From one document to thousands per hour."

Other exports in the file (`AgentFamilies`, utility functions) are untouched.

## Shared conventions

These apply across all 3 redesigns so the sections read as a set, not 3 one-offs.

**Typography floor — the actual readability fix:**

| Element           | Before | After |
|-------------------|--------|-------|
| Body text         | 10px   | **14px** |
| Monospace / data  | 10px   | **13px** |
| Card headings     | 11px   | **18–22px** |
| Metric callouts   | 44–48px | unchanged |

**Card primitives** (reuse existing `WhiteCard` pattern from `src/components/common/whiteCard.tsx`):

- Background: `rgba(0,0,0,0.03)`
- Border: `1px solid rgba(0,0,0,0.06)`
- Radius: `20px`
- Number badges: 32px circle, `rgba(0,0,0,0.04)` fill, Plus Jakarta Sans 14px bold
- Stat chips: rounded pill, 14px text, same token background

**Motion pattern** (shared across all 3 sections):

- Library: `framer-motion` + `useInView(0.25)` — both already in codebase
- Easing: `[0.22, 0.61, 0.36, 1]` (ease-out curve already used on landing)
- Stagger base: 250ms between children
- Duration budget: each section's full animation completes within 1.5–3s
- `MotionConfig reducedMotion="user"` already wraps `/platform` at page level — `prefers-reduced-motion: reduce` fallbacks inherit automatically

**Accent discipline:**

- Blue `#5b76fe` is the accent ink (existing `/platform` palette)
- No teal anywhere — teal is reserved for Phase 2 wow section on `/agents`

**Layout breakpoints:**

- Desktop (≥1024px): horizontal flow (matches current visual metaphor)
- Tablet (768–1023px): 2-col grid or condensed flow
- Mobile (<768px): stacked vertical with chevron dividers

**Explicitly unchanged:**

- All section headlines, subheadlines, and body copy
- Section backgrounds (`var(--bg-s3)`, `var(--bg-s4)`, `var(--bg-s5)`)
- 4-metric strip on ScaleAtVolume and 3-metric strip under HallucinationControl (already readable at 44–48px)

---

## 2A. HallucinationControl — "Four walls, not four prompts"

### Layout (desktop)

```
[CANDIDATE] → [01 Grounding] → [02 Confidence] → [03 Cross-verify] → [04 Schema lock] → [APPROVED]
   160px         220px             220px               220px                220px           140px
```

Each wall is an HTML card (not SVG) with a consistent structure:

- **Header row:** `[32px circle · 01]` + `Grounding` (18px bold)
- **Description:** 14px, 2 lines max
- **Gate line:** small-caps 12px label `GATE:` + 14px body gate criterion
- **Evidence panel** (differs per wall):
  - Wall 1 (Grounding): two stat rows — `Rejected today 14` / `Passed 8,204`
  - Wall 2 (Confidence): three horizontal progress bars at 14px — `vendor 99%` / `gl 95%` / `amount 72% ⚑` (flag is `lucide-react` `Flag` icon, not SVG unicode char)
  - Wall 3 (Cross-verify): two 14px model chips `Llama-70 primary` + `Mistral-8x verifier` stacked, then `Agreement 97.8%` / `Escalated 2.2%` as stat rows
  - Wall 4 (Schema lock): real HTML `<pre>` code block with monospace 13px, 7 lines of readable JSON

**Chevron connectors between walls:** 24px `lucide-react` `ChevronRight` at 40% opacity — replaces the SVG dashed arrows.

### Motion — "dot traversal"

- A small 8px blue dot enters from the `CANDIDATE` card
- Travels along connector arrows left-to-right, pausing 400ms above each wall (wall's border flashes blue ring during the pause)
- On final arrival at `APPROVED`, dot expands into a checkmark
- Total duration: 2.8s. Plays once on inView.

**reducedMotion fallback:** all walls start with static blue ring, no dot, no flash.

### Mobile

6 cards stack vertically with downward chevrons between them. Traversal dot becomes a vertical line that fills progressively on inView (no pausing — mobile gets a simpler "progress bar" version).

---

## 2B. DeterminismProof — "Same input. Same output. Every time."

### Layout (desktop, vertical 3-act story)

**Act 1 — Input** (centered, 320px wide card):

- Header: `INPUT · IN-8892`
- Body: `Global Logistics LLC` / `USD 13,503.00`
- Hash chip: `sha256: 7a2f…0e19` (13px monospace, readable)
- Subline: `fed 4× throughout the day`

**Act 2 — Pinning layer** (420px wide card under Act 1):

- Label: `PINNING LAYER`
- Real `<pre>` code block at 13px monospace showing 7 config lines:
  ```
  temperature = 0
  seed = 42
  top_p = 1.0
  retriever = idx_v12
  model = llama-70-v4.2
  schema = invoice.v3
  replay_enabled = true
  ```

**Act 3 — 4 identical runs** (stacked vertical, full width):

- Each run is a 72px-tall card (up from 52px)
- Left: `Run 01 · 09:14 AM` (18px bold)
- Center: three monospace chips at 13px — `vendor_id: V-472` / `amount: 13503.00` / `gl: 6100-2340`
- Right: hash chip `sha256: 4a2f…0e19` (13px mono) + green `✓ identical` badge

Timestamps: `09:14 AM`, `11:47 AM`, `02:22 PM`, `06:08 PM`.

### Motion — "stamping proof"

- Act 1 + Act 2 fade in first (600ms)
- 4 run cards slide in from the right one at a time (250ms stagger, 400ms per card)
- As each run card lands, its hash chip flashes green for 300ms (the "stamp")
- After all 4 are in, a thin vertical green line grows from Run 01's hash down to Run 04's hash — visually connecting the 4 identical hashes
- Total duration: 2.6s

**reducedMotion fallback:** all cards visible from start, vertical line drawn statically.

### Mobile

Same vertical stack, run cards span full width, chip row wraps to two lines, hash moves below the timestamp.

---

## 2C. ScaleAtVolume — "From one document to thousands per hour."

### Layout

**Top:** existing 4 metric cards (`12,400` docs/hr, `<2.4s` p95, `3.1M`/mo, `99.94%` SLA) — **untouched, already work.**

**Middle — replace router fanout SVG with a CSS sankey bar** (full width within existing white card):

- Header row: `Monday backlog · Thomson Group · 14,200 vouchers` (left) and `Cleared by 10:42 AM` (right) — existing, unchanged
- **Sankey bar** — single horizontal bar, 80px tall, divided into 3 weighted segments:

  | Segment       | Width | Volume  | Cost / rate   | Fill                          |
  |---------------|-------|---------|---------------|-------------------------------|
  | Small model   | 83%   | 11,820  | $0.0002/doc   | `rgba(91,118,254,0.22)`       |
  | Frontier      | 14%   | 1,960   | $0.004/doc    | `rgba(91,118,254,0.45)`       |
  | Human review  | 3%    | 420     | 90s avg       | `rgba(91,118,254,0.70)`       |

- Each segment shows **inside the bar** (if width allows) or **below the bar** (for the 3% segment): label at 14px bold + volume at 18px + cost/rate chip at 13px
- Below the bar: existing `QUEUE 14,200 → ROUTER → POSTED TO SAP 0 errors` becomes 3 text chips in a row (HTML, not SVG)

**Bottom:** existing timeline progress bar (`06:00 → 10:42`) — untouched, already works.

### Motion — "sankey grow"

- On inView, 3 sankey segments animate width from `0%` → target widths sequentially (not simultaneously):
  - 83% bar grows first over 900ms
  - 14% joins over 400ms
  - 3% over 300ms
- Labels fade in 200ms after each segment settles
- Total duration: 2s

**reducedMotion fallback:** all segments shown at full width from start, labels visible.

### Mobile

Sankey bar becomes 3 stacked horizontal bars (one per lane), full width each, heights proportional (80px / 20px / 8px). This keeps the visual-encoding message even when the horizontal layout fails.

---

## Testing & verification

### Automated

- `npm run build` — zero TypeScript errors, zero Vite warnings
- Visual smoke: boot dev server, screenshot all 3 sections at 1440px, 1024px, 768px, 375px
- No new unit tests — presentational components with no logic branches. Visual regression via screenshot is the right test for this scope.

### Manual

- **Readability floor:** every text node in the 3 sections renders at ≥13px actual pixels at 1440px width (verify via DevTools inspection, not by trusting CSS)
- **Contrast:** all text passes WCAG AA (≥4.5:1) against its background — especially the 13px monospace inside the pinning layer code block and the sankey segment labels on the tinted blue fills
- **reducedMotion:** toggle `prefers-reduced-motion: reduce` in DevTools → verify no animation plays, all content visible from the start
- **Scroll cadence:** normal scroll from `/platform` hero to bottom doesn't feel jumpy; each section's motion triggers once and doesn't re-fire on scroll back up

### Edge cases explicitly handled

- **Tab not focused during animation:** `useInView` doesn't fire until tab visible + section in view, so animation plays correctly when user actually looks
- **Section re-enters view after scroll-up:** `useInView` with `triggerOnce: true` — animation plays once per session, subsequent views show static final state (matches existing `sr` animation pattern throughout codebase)
- **Very wide viewport (>1600px):** max-width containers already capped at 1400px, so sankey segments and wall cards don't stretch weirdly
- **Very narrow mobile (320px):** HallucinationControl's 6-card vertical stack and DeterminismProof's wrapped chip rows stay readable (verify at iPhone SE width)
- **Touch devices:** all motion is scroll-triggered, no hover dependencies. Touch scroll on iOS triggers `useInView` the same as desktop

### Rollback plan

- Single file changed (`PlatformStory.tsx`) with 3 exported functions rewritten
- Each of the 3 redesigned exports is self-contained — if `DeterminismProof` looks wrong in prod, we can revert just that function without touching the other two
- Git commit per section so revert granularity matches the design granularity

### Explicit non-goals (YAGNI guard)

- No Lenis, no SplitText, no scroll-scrub library — those are Phase 2
- No font loading changes — Plus Jakarta Sans and the mono fallback are already loaded
- No prop API changes — sections consumed as `<HallucinationControl />` with no props today, stays that way
- No copy edits — headlines and body text stay exactly as-is
- No changes to `AgentFamilies` or any other export in `PlatformStory.tsx`
- No changes outside `src/components/PlatformStory.tsx`

## Phase 2 preview (out of scope for this doc)

Phase 2, once Phase 1 ships and stabilizes, covers:

- Cardiatec-style 5-layer parallax wow section (teal/agents theme)
- Site-wide Lenis smooth scroll + SplitText headline reveals
- Placement for the wow section TBD between: replace `PlatformFlow` on `/agents` / new `/platform` section / new landing section

A separate design doc will cover Phase 2 after Phase 1 ships.
