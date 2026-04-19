# Platform Page v2 — Architecture-First Redesign

**Date:** 2026-04-15
**Status:** Approved. Proceed to implementation plan.

## Context

The Platform page has grown redundant with the Landing page: it repeats AgentFamilies and ContextMatters identically, covers the 6 layers twice (via `PlatformCard` → "Six layers. Solved once." AND `PlatformStack` → "Six shared layers. Every agent plugs in."), and uses design patterns (`SectionIntro` helper, `CurveDivider`, `giantText`) that are no longer part of the landing page design language.

User decision: **heavy restructure** with the 6 layers as the architectural spine. Some content duplication is acceptable — the page should still sell on its own — but the story arc should lead with architecture.

## Story Arc

> artiGen is a **sovereign AI platform**. That platform is **6 shared layers**. Here's **why** a platform beats prompt-wrapping. Here are **the 6 layers**. Here's **how the hardest layers actually work** (hallucination, determinism, scale). Here's **what you build on top** (3 agent families + the Read-Think-Do-Prove flow). Here's the **thesis**.

## New Structure

```
1.  HERO                                  [keep — PageHero, blue orb, bottom-left text]
2.  Why a platform (manifesto-style)      [redesign — replaces 3-tab PlatformCard]
3.  PARALLAX: "Six layers. Solved once."  [new — ParallaxHero divider]
4.  THE 6 LAYERS                          [keep — PlatformStack]
5.  PARALLAX: "How the hardest layers…"   [new — ParallaxHero divider]
6.  Hallucination Control deep dive       [keep — PlatformStory::HallucinationControl]
7.  Determinism deep dive                 [keep — PlatformStory::DeterminismProof]
8.  Scale deep dive                       [keep — PlatformStory::ScaleAtVolume]
9.  PARALLAX: "What you build on it."     [new — ParallaxHero divider]
10. Agent Families                        [keep — PlatformStory::AgentFamilies]
11. Flow Diagram (Read → Think → Do)      [keep — FlowDiagram]
12. Closing manifesto + blue orb          [new — mirrors landing's closing manifesto]
```

**Total sections:** 12 (down from 14). **Estimated height:** ~9,000px (down from ~12,000px).

## Removed

| Removed | Reason |
|---------|--------|
| `SectionIntro` helper component (3 instances) | Adds 1,080px of empty space; landing pages don't use standalone intro sections |
| `CurveDivider` (2 instances) | Replaced by ParallaxHero dividers which do the same visual job + add content |
| `PlatformCard` component (3 stacking cards) | Replaced by a single punchy "why a platform" section |
| `ContextMatters` subsection (from PlatformStory) | Duplicates landing page's `ContextKing` (with orbs); the landing version is stronger |
| `PageCinematicWrap` giantText "PLATFORM" | Not used on landing anymore; inconsistent |

## Section Designs

### Section 2 — "Why a platform" manifesto-style

Two-column layout, compact (~600px tall):

**Left column (heading + prose):**
> **Prompt-wrapping makes demos.**
> *A platform ships agents.*
>
> Six teams stitching prompts into five different LLMs isn't a strategy — it's a bill. One sovereign base. Six shared layers. Every new agent compounds on what the last one built.

**Right column (visual):**
- Simple before/after glyph or small diagram
- Before: 5 scattered circles (isolated prompts, disconnected)
- After: 1 stacked base → 5 connected circles above it
- Minimal SVG, pure black & white

**No tabs, no stacking cards.** Replaces ~3,400px of PlatformCard content with ~600px.

### Section 3, 5, 9 — Parallax dividers

Using existing `ParallaxHero` component (80vh, clipRadius: 24):

| # | Label | Headline | Unsplash image query |
|---|-------|----------|-----|
| 3 | `THE BASE` | "Six layers. *Solved once.*" | Server rack / datacenter / photo-1558494949-ef010cbdcc31 |
| 5 | `HOW IT HOLDS` | "How the hardest layers *actually work.*" | Structural / network / photo-1639322537228-f710d846310a |
| 9 | `WHAT YOU BUILD` | "Documents. Voice. *Multimodal.*" | Factory / modular / photo-1677442136019-21780ecad995 |

Each parallax gives the reader a visual breath before the next dense section.

### Section 12 — Closing manifesto with blue orb

Mirrors the landing page's closing manifesto + OwnershipBand orb pattern:

**Layout:** Two-column. Blue glass orb on the left (340–420px). Manifesto text on the right.

**Orb props:**
- `baseColor="#1a3a8f"`
- `attenuationColor="#5b76fe"`
- `envColor="#a0b0e0"`
- `attenuationDistance={0.9}`
- `breatheAmp={0.14}`
- `floatAmp={0.25}`

**Text:**
- Label: `THE THESIS`
- Headline (Fraunces serif, 500 weight, `clamp(40px, 5.5vw, 72px)`, italic on last two words):
  > "Six layers. One base. Every agent *plugs in.*"
- Supporting paragraph (italic serif, `rgba(0,0,0,0.65)`, max-width 640px):
  > "The platform isn't the product. The platform is what makes the product keep shipping — one agent today, five next quarter, at the same cost of ownership."

No CTA button (footer handles that).

## Design Language Adopted from Landing Page

- ✅ `ParallaxHero` for section dividers (mix-blend-difference text)
- ✅ Closing manifesto (Fraunces italic hero text)
- ✅ 3D glass orb as hero of closing section
- ✅ Inline section headings (no `SectionIntro` standalone block)
- ✅ Black & white SVGs in deep-dive diagrams (already done in PlatformStory)
- ✅ No CurveDivider, no giantText background

## Files to change

| File | Action | Scope |
|------|--------|-------|
| `src/pages/PlatformPage.tsx` | Full rewrite | ~50 lines |
| `src/components/landing/PlatformWhySection.tsx` | NEW — 2-col "why platform" manifesto | ~100 lines |
| `src/components/landing/PlatformCloser.tsx` | NEW — closing manifesto + blue orb | ~80 lines |
| `src/components/PlatformStory.tsx` | Minor — keep the 5 sub-sections but PlatformPage only renders 4 (omits ContextMatters). Or: PlatformStory exports each sub-section individually so PlatformPage can pick which to render. | ~10 line change |

## Out of scope

- Revising AgentFamilies content (keep same copy as landing)
- Changing the 6-layer SVG designs (PlatformStack stays as-is)
- Changing `PageHero` again (was just updated for bottom-left text placement)
- Adding testimonials / customer logos (not requested)
- Adding a comparison table (not requested)

## Verification

- `npm run build` zero errors
- Preview `/platform`: section order matches above
- Each parallax divider renders with correct image, label, headline
- Closing orb animates (breathing + float)
- "Why a platform" section is ~600px (not 3,400px)
- No `SectionIntro` helper used
- No `CurveDivider` instances
- No giantText "PLATFORM" in background
- Other pages (Landing, Agents) unchanged
