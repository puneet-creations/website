# /platform AgentFamilies readability + FlowDiagram GSAP motion — Design Document

**Date:** 2026-04-18
**Scope:** Rewrite the 3 AgentFamilies card SVG mini-flows as HTML/CSS for readability (same pattern as Phase 1), and add a GSAP ScrollTrigger motion sequence to FlowDiagram — both on `/platform`.
**Author:** Brainstorm with Puneet (approved)

## Context

Task 7 of the Post-Phase-2 Cohesion Pass did light polish on `AgentFamilies` (padding `p-10` → `p-8`, one SVG stroke width 1.2 → 1.5) and `FlowDiagram` (corner radius 24 → 28). That was explicitly scoped as "cosmetic only, no palette or layout changes" — but user review of the live site revealed the core problem was the SVG mini-flow diagrams INSIDE each AgentFamilies card: 10px text in a small `viewBox` produced the same cramped unreadable content that Phase 1 fixed on HallucinationControl, DeterminismProof, and ScaleAtVolume. Task 7's polish didn't touch that because it was scoped as "no SVG rewrites."

Additionally, user asked for GSAP motion on FlowDiagram ("enhance with GSAP"). FlowDiagram was already readable (22px headings) but static — adding motion gives the flow narrative weight.

This design addresses both in one pass. `/platform` stays light-themed (Phase 3's "Approach 3" decision holds — dark sections only on landing). Only the SVG internals of AgentFamilies change; card palettes stay as-is.

## Section 1 — AgentFamilies SVG → HTML rewrite

### Current state

`src/components/PlatformStory.tsx` exports `AgentFamilies` (around lines 56-292). Renders 3 cards:
- Document agents (`var(--bg-s1)`, teal accent `#187574`)
- Voice agents (pink accent `#f5a8d4`)
- Multimodal agents (amber accent `#ffd080`)

Each card has the same structure:
1. Icon (📄/🎙/🧩) + eyebrow ("Document agents")
2. Display headline ("Read anything. Cite everything.")
3. **Inline SVG mini-flow** — this is what's unreadable
4. Three bullet points (✓ checked list)
5. Customer caption ("Thomson Group · 18,000 vouchers/mo")

The SVG problem per card:
- Document: 3 doc-stack rects + `OCR + layout` chip + 4-row `STRUCTURED` output — all labels at `fontSize="10"`
- Voice: similar — live audio block + NER chip + 4-row SOAP/ICD output at 10px
- Multimodal: 3-input fan-in (image, voice, doc) + FUSION chip + DECISION output at 10px

### New structure per card (HTML, not SVG)

Keep everything above + below the SVG intact. Replace ONLY the `<svg>` block with an HTML 3-segment horizontal flow:

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  [INPUT pills]   →   [PROCESS chip]   →   [OUTPUT panel]           │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

Grid: `grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1.2fr);`
Chevrons between segments via `lucide-react` `ChevronRight` at 40% opacity.

### Document agents — mini-flow content

| Segment | Content |
|---|---|
| INPUT | Bold label `INV · PO · GRN` (14px) / dim subline `mixed PDFs` (12.5px) |
| PROCESS | `OCR + layout · artiGen` (14px) / subline `on-prem · auto-routed` (12px) — card bg `rgba(24,117,116,0.08)` |
| OUTPUT | 4-row key/value: `vendor: V-472` / `amount: $13,503` / `gl: 6100-2340` / `conf: 99.2%` (13px mono, dim key + strong value) + `→ SAP` badge (12px teal uppercase) below |

### Voice agents — mini-flow content

| Segment | Content |
|---|---|
| INPUT | `Dental · live audio` / `on-prem ASR` |
| PROCESS | `Domain NER · SOAP+ICD mapping` — card bg `rgba(245,168,212,0.08)` |
| OUTPUT | 4-row SOAP: `S: cold sens 2w` / `O: #3 Class II` / `A: K02.51` / `P: D2392 · 2-vst` + `→ Dentrix` badge |

### Multimodal agents — mini-flow content

| Segment | Content |
|---|---|
| INPUT | 3 stacked small chips: `🖼 Image: ins. card photo` / `🎙 Voice: "tooth hurts"` / `📄 Doc: chart history` (each 12.5-13px) |
| PROCESS | `Cross-modal fusion · cited` — card bg `rgba(255,208,128,0.10)` |
| OUTPUT | 4-row decision: `Plan: Delta PPO` / `Proc: D2392` / `Slot: Thu 9:00` / `Cite: img+voice` + `→ booked` badge |

### Typography floor

- Primary content: 14px bold
- Secondary / mono data: 13px
- Sublines: 12.5-13px
- Chevron icons: 24px at 40% opacity

Nothing below 12px. Matches Phase 1's floor.

### What explicitly stays unchanged

- Card bg tints (light pastels per family)
- Icon + eyebrow + headline
- 3 bullet points (`▸` prefixed, already HTML)
- Customer caption
- Card layout inside `AgentFamilies` grid (`md:grid-cols-3`)
- `AgentFamilies` section header + subline
- All surrounding code (ContextMatters, HallucinationControl, etc.) — strictly out of scope

## Section 2 — FlowDiagram GSAP motion

### Current state

`src/components/FlowDiagram.tsx` — 4 stage cards in a horizontal row:
- 01 Document arrives (PDF · email · audio · API)
- 02 artiGen reads & reasons (Routes to right model · on-prem)
- 03 Acts on your systems (SAP · Epic · Salesforce · DMS)
- 04 Every answer cited (Audit trail · human approvals)

Static layout; CSS `sr` / `is-in` reveals the section on scroll but nothing animates internally.

### Motion timeline

GSAP `ScrollTrigger.create({ trigger: sectionRef, start: 'top 70%', once: true })` fires a timeline on viewport entry:

```
t=0.00s  Stage 01 slides in from x=-24 → 0, opacity 0→1, 0.4s ease-out
t=0.35s  Stage 02 slides in (same curve)
t=0.70s  Stage 03 slides in
t=1.05s  Stage 04 slides in
t=0.20s  Chevron arrows begin draw-in via stroke-dashoffset tween
         (3 arrows staggered 150ms each, 1.2s total)
t=1.60s  Traveling "document" pill animation starts:
         — Small rounded pill labeled "INV-8892" (14px mono, white on teal)
         — Animates horizontally from stage 01 center → stage 04 center
         — Duration: 2.8s, ease-out
         — As it passes each stage's x-midpoint, that stage's border-left
           flashes teal (#8af5c0) for 300ms
         — Pill fades out over the last 200ms at stage 04
         — At pill-exit, stage 04 shows a ✓ teal check-mark stamp
t=4.40s  All motion settled
```

### Implementation notes

- GSAP already bundled (used by `CinematicFooter.tsx`, `PageCinematicWrap.tsx`, `src/lib/lenis.ts` with `gsap.registerPlugin(ScrollTrigger)`) — no new deps
- Single `useRef<HTMLDivElement>` on the section + 4 stage refs for flashing + 1 pill ref
- One GSAP timeline (`gsap.timeline()`) constructed inside `useEffect`, killed on unmount via cleanup
- Chevron arrows: SVG `<path>` with `strokeDasharray` set to path length, `strokeDashoffset` animated from full length → 0
- Pill: absolutely-positioned `<div>`, GSAP animates `x` (transform)
- `will-change: transform` added to pill on timeline start, removed on complete

### Reduced-motion fallback

Canonical guard at the top of the useEffect:
```ts
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

When triggered:
- No timeline created
- 4 stage cards rely on the existing `sr` / `is-in` CSS reveal (already respects `prefers-reduced-motion` via index.css:215 reset)
- Pill never renders (or renders at final position with opacity 0 — decide during implementation)
- Chevron arrows render at `strokeDashoffset: 0` (fully drawn) statically

Content fully accessible in reduced-motion state; only the orchestration disappears.

### Performance guardrails

- Timeline fires once per section entry (`once: true`)
- Single rAF loop under GSAP.ticker
- Pill is one DOM node — minimal paint cost
- No simultaneous stage flashes (sequential, 1 at a time)
- Target: 60fps at 1440×900 during the 4.4s sequence

## Files affected

**Modify only:**
- `src/components/PlatformStory.tsx` — rewrite `AgentFamilies` function's 3 card SVG blocks as HTML. Everything else in the file untouched.
- `src/components/FlowDiagram.tsx` — add GSAP import, refs, useEffect timeline, traveling pill element, chevron path refs with stroke-dash.

**No new npm deps.**

**No changes outside these 2 files.**

## Shipping plan

3 atomic commits:

1. **Commit 1**: AgentFamilies Document card — rewrite the Document-card SVG mini-flow as HTML. Validates the 3-segment HTML pattern on one card before batching the other two. Small, reviewable, revertible.
2. **Commit 2**: AgentFamilies Voice + Multimodal cards — apply the same 3-segment pattern to the other 2 cards. Share a helper `<MiniFlow>` subcomponent if extraction is clean; otherwise inline per card (the content varies enough that extraction may not pay off — decide during implementation).
3. **Commit 3**: FlowDiagram GSAP motion — timeline + traveling pill + chevron draw-in + reduced-motion guard.

## Non-goals (YAGNI)

- No palette change (light cards stay light)
- No copy rewrites (eyebrow / headline / bullets / caption all unchanged)
- No bullet-list changes (already readable HTML)
- No touching of other sections on `/platform` (Phase 1 sections stay as-shipped)
- No landing page changes (cohesion pass already shipped)
- No AgentFamilies palette going dark (that would conflict with the /platform-stays-light decision)
- No new SVG illustrations — we're removing SVG here, not adding
- No animated data (static values; no real-time meter ticking)

## Testing

- `npm run build` exits 0 after each commit
- `npm run lint` clean
- Visual: `/platform` at 1440 / 1024 / 768 / 375 — mini-flows readable at all widths, flow-diagram motion plays at 60fps on scroll-in
- Reduced-motion: toggle `prefers-reduced-motion: reduce`, reload `/platform`, confirm FlowDiagram stages render statically + traveling pill not visible
- No regression on AgentFamilies card palette (still light pastel per family)

## Rollback

Each of the 3 commits is independently revertible. If Commit 3 (GSAP motion) causes issues, revert just that one — cards 1+2's readability fix stays shipped. If AgentFamilies readability rewrite is wrong, revert commits 1+2 — FlowDiagram motion remains.
