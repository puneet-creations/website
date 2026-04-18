# Landing + Agents v2 — Design Review & Redesign

**Date:** 2026-04-18
**Status:** Approved. Proceed to implementation plan.

## Context

After shipping five v2 pages (Platform, Agents, Solutions, Pricing, About) with a consistent design system — white-card sections + ParallaxHero dividers + per-page 3D glass orb closer + `<MotionConfig reducedMotion="user">` + dropping `PageCinematicWrap` / `giantText` / emoji icons / `.sr d-` class entrances — the Landing page still carries **three legacy components** (ContextKing, OwnershipBand, GTMPath) using `display-2` + `.sr d-1` classes, plus OwnershipBand + ContextKing each ship a 2-orb-side-by-side layout that together puts **4 orbs** on the landing page. The Hero hardcodes `$5K` in its CTA and GTMPath hardcodes `$5K` as a station price — conflicting with the "no fixed numbers" stance shipped on Pricing. OwnershipBand carries the "if we're not delivering, you don't pay" commitment that was explicitly removed from About in favor of "outcomes in ~2 months of deployment."

Agents page is mostly v2-compliant — only `PlatformFlow.tsx` still uses emoji icons (`👁 🧠 ⚡ 📎`) + `.sr d-1` / `display-2` classes.

User decision: **full landing redesign applying v2 rhythm end-to-end** — 10 sections → 9, 4 orbs → 1, absorb OwnershipBand + HowToStart into a new `LandingCloser` with brand-neutral black glass orb, rewrite ContextKing + GTMPath in the v2 WhiteCard pattern, modernize AgentFamilies entrance, and sync content with Pricing/About decisions.

## Story Arc

> Agentic AI. Total sovereignty. Zero concessions. Live today in 3 regulated industries — and the platform is yours to own.

## New Structure

### Landing (9 sections, down from 10)

```
1. HeroAboveFold         [keep visual — drop $5K from CTA only]
2. ClientsStrip          [reuse]
3. IsThisYou             [already v2 + WhiteCard-ified]
4. PARALLAX              [already v2 — "Your data never leaves your building"]
5. AgentFamilies         [modernize — drop .sr d-1 + display-* classes; migrate to WhiteCard primitive]
6. PARALLAX              [already v2 — "Context is everything"]
7. ContextKing           [rewrite — 2 WhiteCards, no orbs, Lucide X/Check icons]
8. GTMPath               [rewrite — 3 WhiteCard steps, no station circles, no $5K]
9. LandingCloser         [NEW — black glass orb + "Sovereign AI isn't borrowed" manifesto + 3 ownership bullets absorbed from OwnershipBand]
```

**Dropped from old layout:**
- `OwnershipBand.tsx` (dissolved into LandingCloser — IP bullets migrate; "you don't pay" line + "Why this isn't consulting" column dropped; the commercial-model message already lives on Pricing)
- `landing/HowToStart.tsx` (absorbed into LandingCloser — its manifesto text becomes the closer's headline + supporting paragraph)

### Agents (8 sections — unchanged count, 1 component fix)

```
1. PageHero              ✅
2. ClientsStrip          ✅
3. PlatformFlow          [MODERNIZE — Lucide icons (Eye/Brain/Zap/Quote), drop .sr + display- classes]
4. PARALLAX              ✅
5. AgentDeepDiveScroll   ✅
6. PARALLAX              ✅
7. ProductionProof       ✅
8. AgentsCloser          ✅
```

## Section Designs

### 9. LandingCloser (new component)

Two-column layout. Orb left (black glass, brand-neutral, distinct from all 5 other pages' orbs). Right side is the densest closer content of any v2 page — justified because Landing is the primary entry and absorbed OwnershipBand's IP commitments.

**Orb props (brand-neutral):**
- `baseColor="#0a0a0a"` (near-black)
- `attenuationColor="#1a1a1a"` (deep charcoal)
- `envColor="#3a3a3a"` (medium grey reflection)
- `attenuationDistance={0.9}`, `breatheAmp={0.14}`, `floatAmp={0.25}`
- Lazy-mount on `useInView` (same pattern as AboutCloser / PricingCloser)

**Text + content:**

- **Label** (micro-upper): `THE THESIS`
- **Headline** (Fraunces 500, `clamp(40px, 5.5vw, 72px)`, italic 2nd line):
  > "Sovereign AI isn't borrowed. *It's built.*"
- **Supporting paragraph** (italic serif, `rgba(0,0,0,0.65)`, max-width 560px):
  > "You rented your cloud for a decade. You won't rent your intelligence. The agents your regulator asks about — the ones that decide what gets posted to SAP, booked at 9 AM, approved by the CFO — belong inside your building."
- **3 ownership bullets** (Lucide `Check` in black circle + bold claim + muted expansion):
  1. **You own the weights.** The small language model trained on your data — yours forever, on your hardware.
  2. **You own the agent.** Code, connectors, prompts, policies — your IP, in your repo.
  3. **You own the proof.** Audit trail, evaluation harness, production runbook — all handed over.

**No CTA** — footer handles it (matches other v2 closers).

### 7. ContextKing (rewrite)

Layout: 2 adjacent WhiteCards (`md:grid-cols-2 gap-6`). Drops the 2 orbs entirely. Preserves the comparative argument's core — a terminal-style code-diff block and 3 bullet contrast — but reframes as cards.

**Section heading** (centered, above the 2 cards):
- `micro-upper` label: `THE QUESTION BUYERS ASK`
- Fraunces headline: "An agent without your context *is not production software.*"

**Left card** — "Generic LLM" (red accent):
- Top strip: `1px solid #d94a4a` (muted red)
- Label (micro-upper): `GENERIC LLM`
- Headline (Fraunces): *The demo that dies in UAT.*
- Terminal-style block (preserved from current design):
  - `vendor: "Global Logistics Inc." ← wrong`
  - `gl: "AP 2000" ← guessed`
  - `approver: "system admin" ← invented`
- 3 bullets with Lucide `X` (red) in circle:
  - Guesses vendor names, fabricates GL codes
  - No tolerance rules, no approval ladder
  - No audit trail — undefendable

**Right card** — "artiGen + context" (black accent):
- Top strip: `1px solid #000000`
- Label (micro-upper): `ARTIGEN + CONTEXT`
- Headline (Fraunces): *The agent that actually ships.*
- Terminal-style block (preserved):
  - `vendor: Global Logistics LLC  V-472 ✓`
  - `gl: Freight · 6100-2340  cited ✓`
  - `approver: CFO · Named  audit ✓`
- 3 bullets with Lucide `Check` (black) in circle:
  - Your masters, your taxonomy, your rules
  - Every field traceable to a source chunk
  - Full audit trail — reversible, defensible

**Changes vs. legacy:**
- Drops 2 orbs (page-wide perf + visual redundancy win — ContextKing + OwnershipBand both had 2-orb side-by-side layouts stacked ~one viewport apart).
- Drops `display-2` + `.sr d-1` entrance classes → inline Fraunces + motion.div framer-motion entrance.
- `✗` / `✓` unicode in circles → Lucide `X` / `Check` icons (matches AdjacentIndustries pattern).
- Preserves the terminal-style code-diff block (unique value — keep).
- WhiteCard pattern consumes the `whiteCardStyle` helper + `<AccentStrip color={"#d94a4a" | "#000000"} />` primitive already shipped.

### 8. GTMPath (rewrite)

Layout: 3 WhiteCards in `md:grid-cols-3 gap-6`, with a dashed connector line on desktop (same pattern as About TimelineStrip).

**Section heading:**
- `micro-upper`: `THE ENGAGEMENT PATH`
- Fraunces: "Three steps from curious *to live in production.*"
- Subline: "No surprises. No rewrites."

**3 step cards:**

| # | Label | Name | Body | Effort chip |
|---|---|---|---|---|
| 01 | WEEKS 1-2 | *Assessment* | One senior expert maps your workflows, scores them by AI leverage, and returns with a pilot spec. | 2-week engagement |
| 02 | WEEKS 3-6 | *Pilot* | We ship one agent into production on your hardware. Real document, real workflow, real users. | 4-week deployment |
| 03 | MONTH 2+ | *Platform* | The agent you shipped becomes the first node on the shared base. New agents reuse every layer. | Ongoing ownership |

**Per card shell:**
- `whiteCardStyle({ shadow: 'md', radius: 24 })`
- 1px top accent strip in a neutral slate (or drop the strip — this section is more procedural/instructional, not a hero identity)
- `micro-upper` number (01 / 02 / 03) in neutral slate
- `micro-upper` week range in slate
- Fraunces name (italic) in clamp(28px, 3vw, 36px)
- Body paragraph (~40 words)
- `capsule-light` chip at the bottom with effort framing (not dollar)

Dashed horizontal connector line spans `left-[16%] right-[16%]` at `top-[96px]` on desktop (hidden on mobile).

**Changes vs. legacy:**
- 240×240 station circles → WhiteCard with 1px slate top accent.
- `$5K` hardcoded price → `"2-week engagement"` effort chip (consistent with Pricing's no-fixed-numbers stance).
- `"Per scope"` → `"4-week deployment"`.
- `"Subscription"` → `"Ongoing ownership"`.
- `display-2` + `.sr d-1` → inline Fraunces + motion.div entrance.
- Dashed connector line kept on desktop; hidden on mobile.

### 5. AgentFamilies (minor modernization — keep structure)

**Unchanged structurally.** 3 white cards with Document / Voice / Multimodal icons + checklist bullets + proof chip.

**Only touch:**
- `.sr d-1` + `display-` classes → inline Fraunces + motion.div entrance (match other v2 components).
- Card shell inline styles (background / border / boxShadow / borderRadius / overflow) → migrate to `whiteCardStyle({ shadow: 'md', radius: 24 })` + `<AccentStrip color="#000000" />` primitive.
- `✓` unicode bullet → keep (landing-wide bullet style; consistent with other v2 components).
- Card content (labels, titles, bullets, proof): untouched.

### 3. PlatformFlow (Agents page — modernize)

**Unchanged structurally.** 4 stations connected by arrows — "It reads. It thinks. It does. On your servers."

**Changes:**
- Emoji icons `👁 🧠 ⚡ 📎` → Lucide `Eye` / `Brain` / `Zap` / `Quote`.
- Icons wrapped in 72px rounded colored-tint squares (same pattern as About CertificationsStrip).
- Preserve per-station color variety (`rgba(255,120,120,0.06)` red, `rgba(245,168,212,0.06)` pink, `rgba(138,245,192,0.06)` teal, `rgba(255,180,80,0.06)` gold).
- `display-2` + `.sr d-1` classes → inline Fraunces + motion.div entrance.
- Horizontal arrow → keep.
- Status chip at bottom ("Zero hallucination incidents in production") → keep.

### 1. HeroAboveFold (minor edit)

**Only edit:** `$5K` removal from CTA.

Before:
```tsx
<a href="mailto:hello@attentions.ai?subject=$5K%20Assessment" ...>
  Get a $5K assessment →
</a>
```

After:
```tsx
<a href="mailto:hello@attentions.ai?subject=Assessment" ...>
  Get an assessment →
</a>
```

All other HeroAboveFold elements (card galleries, aurora, dust, agent cards, trust row) untouched. User explicitly said "love it, don't change."

## Content edits — cross-component summary

| Edit | Where | Reason |
|---|---|---|
| Drop `$5K` | HeroAboveFold CTA + GTMPath price chips | Consistent with Pricing's no-fixed-numbers stance |
| Drop "if we're not delivering … you don't pay" | OwnershipBand → gone entirely; not reproduced in LandingCloser | User decision (made on About) |
| Drop "Why this isn't consulting" column | OwnershipBand → gone; message lives on Pricing Assessment door | Avoid Landing/Pricing redundancy |
| Replace emoji icons | PlatformFlow | Lucide — matches About decision |
| Strip `display-2` / `display-hero` / `.sr d-` classes | PlatformFlow, ContextKing, GTMPath, AgentFamilies | v2 convention |

## Color / orb palette summary (all 6 pages now have closer orbs)

| Page | Closer orb palette | Signal |
|---|---|---|
| **Landing** | **`#0a0a0a` / `#1a1a1a` / `#3a3a3a` (black glass)** | **brand-neutral, authoritative, thesis** |
| Platform | navy / blue | trust, technology |
| Agents | dark teal / teal | growth, velocity |
| Solutions | copper / amber | industrial, verticals |
| Pricing | deep forest / sage | value, commitment |
| About | deep slate / cool grey | gravity, institutional |

Landing's black glass orb matches the existing OwnershipBand black orb (visual continuity preserved) — and distinguishes Landing as brand-entry, not a sub-product.

## Files to change

### Landing (8 files)

| File | Action | Scope |
|---|---|---|
| `src/pages/LandingPage.tsx` | Modify | Remove `OwnershipBand`/`HowToStart` imports, add `LandingCloser` (~3 lines change) |
| `src/components/HeroAboveFold.tsx` | Modify | `$5K` → generic in CTA (2 char edits) |
| `src/components/landing/AgentFamilies.tsx` | Modify | Drop legacy classes, migrate to `whiteCardStyle` (~20 lines change) |
| `src/components/landing/ContextKing.tsx` | **Full rewrite** | 2-card WhiteCard, no orbs, Lucide icons (~200 lines rewrite) |
| `src/components/GTMPath.tsx` | **Full rewrite** | 3 WhiteCard steps, no station circles, no `$5K` (~140 lines rewrite) |
| `src/components/landing/LandingCloser.tsx` | **Create** | Black orb + manifesto + 3 ownership bullets (~120 lines) |
| `src/components/OwnershipBand.tsx` | **Delete** | Absorbed into LandingCloser |
| `src/components/landing/HowToStart.tsx` | **Delete** | Absorbed into LandingCloser |

### Agents (1 file)

| File | Action | Scope |
|---|---|---|
| `src/components/PlatformFlow.tsx` | Modify | Lucide icons + drop legacy classes (~40 lines change) |

**Total:** 8 Landing edits + 1 Agents edit + 1 new file + 2 deletions = 12 git touches.

## Routing

No changes. `/` and `/agents` routes already exist.

## Design language adopted from other v2 pages

- WhiteCard primitive (`whiteCardStyle` helper + `<AccentStrip />`) for all new card shells.
- Lucide icons throughout (no emoji).
- Fraunces 500 headlines with italic accent.
- `micro-upper` + `capsule-light` / `capsule-dark` utilities.
- 3D glass orb closer with per-page accent palette.
- `<MotionConfig reducedMotion="user">` at page root (already on LandingPage / AgentsPage — preserved).
- No `PageCinematicWrap`, no `giantText`, no `display-hero`/`display-2`, no `.sr d-` classes.

## Out of scope

- HeroAboveFold card-gallery visual design (user said "love it, don't change").
- AgentDeepDiveScroll horizontal scroll (kept as-is — centerpiece of Agents).
- ClientsStrip, PageHero, ParallaxHero, IsThisYou, ProductionProof, AgentsCloser (already v2 ✅).
- Platform / Solutions / Pricing / About pages (already done).
- Adding new content to landing (structural cleanup only).
- Changing CTA mailtos to pre-filled door subjects (Pricing door CTAs already handle scope-specific mailtos).

## Verification

- `npm run build` — zero errors.
- Preview `/` renders 9 sections in declared order.
- **Grep audit:**
  - `grep -n "display-hero\|display-2\|sr d-\|PageCinematicWrap\|giantText" src/pages/LandingPage.tsx src/pages/AgentsPage.tsx src/components/landing/ src/components/HeroAboveFold.tsx src/components/GTMPath.tsx src/components/PlatformFlow.tsx` → ZERO matches.
  - `grep "👁\|🧠\|⚡\|📎" src/components/PlatformFlow.tsx` → ZERO matches.
  - `grep "\\$5K\|you don\u2019t pay\|you don't pay" src/pages/LandingPage.tsx src/components/HeroAboveFold.tsx src/components/GTMPath.tsx src/components/landing/` → ZERO matches.
- **Orb count on landing:** exactly 1 (in LandingCloser). Previously 4 (ContextKing 2 + OwnershipBand 2).
- LandingCloser orb animates (breathing + float), lazy-mounts on `useInView`.
- `OwnershipBand.tsx` and `HowToStart.tsx` no longer present on disk or imported anywhere.
- PlatformFlow renders 4 Lucide icons (Eye / Brain / Zap / Quote) in colored-tint rounded squares.
- `prefers-reduced-motion: reduce` users get static transitions.
- Platform / Solutions / Pricing / About pages unaffected.

## User approval

2 questions answered on 2026-04-18:
1. Scope → **C. Full landing redesign applying v2 rhythm end-to-end**
2. Structural aggressiveness → **B. 10 sections → 9 sections (merge OwnershipBand + HowToStart into LandingCloser with orb)**

3 design sections approved:
- Section 1 (structure + palette + content edits): ✅
- Section 2 (ContextKing + GTMPath + AgentFamilies + PlatformFlow details): ✅
- Section 3 (LandingCloser + Hero CTA + files): ✅
