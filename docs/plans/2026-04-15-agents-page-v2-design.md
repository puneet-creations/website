# Agents Page v2 — Redesign

**Date:** 2026-04-15
**Status:** Approved. Proceed to implementation plan.

## Context

Audit shows the current Agents page is **~19,000px (27 viewports) with 13 sections** — roughly 2× the length of Landing (~10K) and Platform v2 (~10K). It carries 4 separate visualizations of "the 5 live agents," 3 copies of the READ/THINK/DO/PROVE pattern, and two marquees of clients. It still uses design patterns (`SectionIntro`, `CurveDivider`, `PageCinematicWrap` giantText, `dot-pulse`, dark GradientCards) that have been removed from Landing and Platform pages during their v2 redesigns.

User decision: **heavy restructure** applying landing+platform design language — ParallaxHero dividers, closing manifesto + orb, white-theme card redesign, full removal of redundant sections.

## Story Arc

> Five agents. Running today. Here's the pattern they all follow. Here's each one in depth. Here are the real customers running them. Here's the thesis.

## New Structure (9 sections, ~10-11K px)

```
1. HERO                    [keep — PageHero, teal orb, bottom-left text]
2. ClientsStrip            [reorder — moved to #2 for immediate social proof]
3. PlatformFlow            [keep — 4-circle agent pattern (Reads/Thinks/Does/Cites)]
4. PARALLAX                [new — "Five agents. Live today."]
5. AgentDeepDiveScroll     [keep — 5-agent horizontal scroll, THE centerpiece]
6. PARALLAX                [new — "Production proof. In your industry."]
7. ProductionProof         [redesign — dark GradientCards → white-theme cards]
8. AgentsCloser            [new — teal orb + manifesto]
```

**From 13 sections / ~19K px → 9 sections / ~11K px. Cut by ~42%.**

## Removed (7 elements, ~10K px saved)

| Removed | Reason |
|---------|--------|
| `SectionIntro` standalone (~390px) | Pattern removed on platform; adds empty vertical space |
| `AgentsCard` 4-tab stacking (~5,469px) | Duplicates the message PlatformFlow delivers in ~900px |
| `CurveDivider` | Not used on landing/platform; replaced by ParallaxHero dividers |
| `dot-pulse` divider | One-off custom element; inconsistent with site language |
| `PlatformStack` (~1,394px) | 6-layer architecture belongs on `/platform`, already lives there |
| `AgentConstellation` (~1,438px) | Same 5 agents as AgentDeepDiveScroll — redundant visualization |
| `IndustryStrip` (~338px) | Duplicates ClientsStrip marquee |
| `PageCinematicWrap` wrapper + `giantText="AGENTS"` | Removed on platform page; inconsistent |

## Redesigned Sections

### 7. ProductionProof — white-theme cards

Current: 3 dark `GradientCard` instances with white text inside (Thomson / Daimler / Qira), ~2,079px tall.

New: 3 white cards matching the `IsThisYou` pattern (landing page):
- Black 1px top accent strip
- Light-tinted icon rounded square (Lucide icon: `Truck`, `Car`, `Stethoscope`)
- `micro-upper` label (company + industry)
- Serif headline (italic accent on company name)
- Grey description paragraph
- Checklist with black ✓ circles + white checkmark
- `capsule-light` proof chip at the bottom (e.g., "18,000 vouchers/mo")
- Middle-first entrance animation (mirrors IsThisYou: middle card up from below, sides slide in)

Text content stays the same (same clients, same metrics, same quotes).

### 8. AgentsCloser (new component)

Layout: Two-column. Teal glass orb on the left (340-420px). Manifesto on the right.

**Orb props:**
- `baseColor="#0a3a2a"`
- `attenuationColor="#8af5c0"`
- `envColor="#a0e0c0"`
- `attenuationDistance={0.9}`
- `breatheAmp={0.14}`
- `floatAmp={0.25}`

**Text:**
- Label: `THE THESIS`
- Headline (Fraunces 500, `clamp(40px, 5.5vw, 72px)`, italic on second line):
  > "Five agents today. *Five more next quarter.*"
- Supporting paragraph (italic serif, `rgba(0,0,0,0.65)`, max-width 560px):
  > "Same base. Same pattern. Same audit trail. Each new agent costs 80% of the last — by layer six, it's mostly configuration."

No CTA (footer handles that).

### ParallaxHero dividers

Using existing `ParallaxHero` component:

| # | Label | Headline | Unsplash image |
|---|-------|----------|----------------|
| 4 | `IN PRODUCTION` | "Five agents. *Live today.*" | `photo-1558494949-ef010cbdcc31` (data center) or warehouse equivalent |
| 6 | `PROOF` | "Production proof. *In your industry.*" | `photo-1486406146926-c627a92ad1ab` (enterprise building) |

Each uses existing `ParallaxHero` props: `imageSrc`, `headline`, `headlineAccent`, `subline`, `label`, `height`, `clipRadius={24}`.

## Design Language Adopted from Landing + Platform

- ✅ ParallaxHero dividers with `mix-blend-difference` text
- ✅ Closing manifesto + 3D glass orb (teal variant, matching page accent)
- ✅ White-theme card redesign for ProductionProof
- ✅ No `SectionIntro`, `CurveDivider`, `giantText`, `PageCinematicWrap`, `dot-pulse`
- ✅ Teal accent `#8af5c0` throughout

## Files to Change

| File | Action | Scope |
|------|--------|-------|
| `src/pages/AgentsPage.tsx` | Full rewrite — new 9-section structure; remove 7 imports; remove local `SectionIntro` helper | ~60 lines |
| `src/components/landing/ProductionProof.tsx` | Redesign: dark GradientCards → white cards matching IsThisYou pattern | ~200 line rewrite |
| `src/components/landing/AgentsCloser.tsx` | NEW — teal orb + manifesto | ~90 lines |

## Out of scope

- Touching `AgentDeepDiveScroll` (the 5-agent horizontal scroll stays as-is)
- Touching `ClientsStrip` or `PlatformFlow` (used as-is)
- Changing ProductionProof copy (same 3 clients, same quotes, same metrics)
- Adding a 6th agent or expanding the agent list
- Changing the Agents page hero (just updated to bottom-left text layout)
- Removing `AgentsCard.tsx`, `AgentConstellation.tsx`, `IndustryStrip.tsx`, `PlatformFlow.tsx`, `PlatformStack.tsx` files — just remove imports; keep files for other pages if used later

## Verification

- `npm run build` zero errors
- Preview `/agents`: section order matches spec
- Each ParallaxHero divider renders with label, headline, image
- ProductionProof shows 3 white cards with black accents, matching IsThisYou visually
- Closing teal orb animates (breathing + float)
- Page total height in range 9,000-12,000 px (down from 19,000)
- Landing and Platform pages unaffected

## User Approval

Three questions answered on 2026-04-15:
1. Page role = Heavy restructure applying landing design language
2. Structure approved as proposed
