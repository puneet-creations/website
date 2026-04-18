# AgentPlatformStack — Landing Page Wow Section Design Document

**Date:** 2026-04-18
**Scope:** Phase 2 of the cardiatec-inspired enrichment pass
**Author:** Brainstorm with Puneet (user approved Sections 1–6 over iterative review)

## Context

Phase 1 shipped three SVG-to-HTML readability redesigns on `/platform`. Phase 2 adds the signature "wow section" and site-wide scroll polish originally scoped in the Phase 1 brainstorm.

**User direction (iterative, in order):**

1. "A single parallax which covers the platform layers and agents on top of it … more agents which can be built … put it in the landing page."
2. "Explains each agent one by one and also each layer of the platform."
3. "Add industry on top of it so business user gets end-to-end picture of the offering and benefits and agents and platform."
4. "Add option how you can engage with attentions … 3 options."
5. "Platform with agents sovereign AI."

The resulting section is a pinned scroll-scrub landing centerpiece that stacks three tiers — **industries (top) → agents (middle) → platform layers (bottom)** — and narrates through 14 beats: industry-by-industry, agent-by-agent, culminating in a synthesis beat with three engagement CTAs. "Sovereign AI" is the section's overarching frame.

The section replaces three existing landing sections (`ParallaxHero` × 2 + `AgentFamilies`) and keeps `ContextKing` as the follow-up counter-beat.

## Section 1 — Architecture + tech choices

### Tech stack additions

| Library | Purpose | Bundle cost (gzip) | Why |
|---|---|---|---|
| `@studio-freight/lenis` 1.1.x | Site-wide smooth scroll | ~16 kB | Same library cardiatec uses. Driven by gsap.ticker, fires standard scroll events. |
| `gsap` 3.12.x + `ScrollTrigger` | Pin + scrub engine for the wow section | ~74 kB | Battle-tested for this exact pattern. Framer-motion's `useScroll` + CSS sticky was an alternative; user chose GSAP. |
| `split-type` 0.3.x | SplitText-style word/char splitting for headline reveals | ~2 kB | Open-source free alternative to GSAP Premium SplitText. |

**Framer-motion stays** for all other site motion. GSAP only runs inside `AgentPlatformStack`.

**Net new bundle weight:** ~92 kB gzip (≈ 20% of current `index.js` gzip). Mitigation later if Lighthouse regresses: dynamic-import GSAP behind a scroll-proximity trigger.

### Files to create / modify

**Create (5):**
- `src/components/landing/AgentPlatformStack.tsx` — main desktop component
- `src/components/landing/AgentPlatformStackMobile.tsx` — mobile fallback component
- `src/data/agentPlatformStack.ts` — beats data, BEATS constant, `activeBeatForProgress` helper
- `src/lib/lenis.ts` — Lenis + GSAP ScrollTrigger singleton wiring
- `src/hooks/useSplitText.ts` — split-type wrapper with useEffect cleanup

**Modify (4):**
- `src/main.tsx` — side-effect import `./lib/lenis` to mount
- `src/pages/LandingPage.tsx` — replace 3 sections with `<AgentPlatformStack />`
- `src/index.css` — add Lenis global styles (~10 lines)
- `package.json` — add `@studio-freight/lenis`, `gsap`, `split-type`

### Pin + scrub mechanism

GSAP ScrollTrigger with `pin: true, scrub: true` on the outer container. `scrollYProgress` equivalent (0 → 1) drives tier parallax transforms, per-beat content transitions, and the progressive fill of the platform tier.

Lenis integrates with ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`.

### Reduced motion + mobile

- `useReducedMotion()` returns true → bypass all pinning, parallax, scroll-scrub. Render as plain stacked vertical sections, one per beat, with IntersectionObserver fade-ins only.
- `< 1024px` viewport → switch to `AgentPlatformStackMobile.tsx`. Stacked sub-sections, native scroll, same content.
- Same content in both paths. Degraded motion, not degraded information.

## Section 2 — Content data model + narrative beat sequence

### The 3 tiers

**Top tier — Industries (6 items):**

| id | name | tagline | hero photo (Unsplash ID) |
|---|---|---|---|
| `logistics` | Logistics & trade finance | "Clear the Monday backlog by 10:42." | `photo-1556761175-5973dc0f32e7` |
| `pharma` | Pharma & life sciences | "PCR graphs across millions of reports." | `photo-1576086213369-97a306d36557` |
| `dental` | Dental networks | "Every patient call logged and coded." | `photo-1629909613654-28e377c37b09` |
| `auto` | Automotive aftermarket | "Handwritten warranty claims → SAP." | `photo-1486006920555-c77dcf18193c` |
| `healthcare` | Hospital systems | "Patient history, cited and reversible." | `photo-1519494026892-80bbd2d6fd0d` |
| `banking` | Banking & compliance | "KYC docs with a full audit trail." | `photo-1556761175-b413da4baf72` |

**Middle tier — Agents (5 live + 1 placeholder):**

| id | name | domain | input → output | lucide icon |
|---|---|---|---|---|
| `invoice` | Invoice Intelligence | logistics (Thomson Group) | handwritten invoice → SAP posted | `FileText` |
| `pcr` | PCR Graph | pharma analytics | lab reports → knowledge graph | `GitBranch` |
| `voice` | Voice Wave | dental intake | call audio → structured transcript | `Mic` |
| `patient` | Patient Call | healthcare follow-ups | call → SOAP notes | `Phone` |
| `voucher` | Voucher Stack | auto warranty | handwritten → SAP vouchers | `Receipt` |
| `build` | **+ Build your own** | any regulated workflow | 4 weeks to live | `Plus` |

**Bottom tier — Platform layers (6 items):** reuses `PlatformStack`'s data unchanged — 01 Sovereign runtime, 02 Model router, 03 Hallucination control, 04 Enterprise connectors, 05 Governance, 06 Security & compliance.

### Beat sequence (14 beats)

Top-down narrative. Scroll progress 0 → 1 maps to beats via `activeBeatForProgress()` pure function.

```ts
export const BEATS = [
  { id: 'intro',       start: 0.00, end: 0.05 }, // beat 00 — opener
  { id: 'logistics',   start: 0.05, end: 0.12 }, // beat 01 — industry
  { id: 'pharma',      start: 0.12, end: 0.19 }, // beat 02
  { id: 'dental',      start: 0.19, end: 0.26 }, // beat 03
  { id: 'auto',        start: 0.26, end: 0.33 }, // beat 04
  { id: 'healthcare',  start: 0.33, end: 0.40 }, // beat 05
  { id: 'banking',     start: 0.40, end: 0.47 }, // beat 06
  { id: 'invoice',     start: 0.47, end: 0.53 }, // beat 07 — agent
  { id: 'pcr',         start: 0.53, end: 0.59 }, // beat 08
  { id: 'voice',       start: 0.59, end: 0.65 }, // beat 09
  { id: 'patient',     start: 0.65, end: 0.71 }, // beat 10
  { id: 'voucher',     start: 0.71, end: 0.77 }, // beat 11
  { id: 'build',       start: 0.77, end: 0.83 }, // beat 12 — + build
  { id: 'synthesis',   start: 0.83, end: 1.00 }, // beat 13 — engagement CTAs
] as const;
```

**Platform tier progressive fill:** layer 01 visible by progress 0.05, layer 02 by 0.10, ..., layer 06 by 0.30. By the time agent beats start (0.47), all 6 layers are fully visible underneath. Encodes "platform is the foundation" visually.

### Copy — key beats

- **Beat 00 eyebrow:** `SOVEREIGN AI`
- **Beat 00 headline:** `The sovereign AI stack. Industry → agents → platform. End to end.` (italic on "Industry → agents → platform")
- **Beat 01 (industry example):** eyebrow `LOGISTICS & TRADE FINANCE` · headline `Clear the Monday backlog by 10:42.` · subline `Handwritten invoices, 3-way matched, posted to SAP before your first coffee. Thomson Group UAE runs this on 14,200 vouchers every Monday.`
- **Beat 07 (agent example):** eyebrow `AGENT · INVOICE INTELLIGENCE` · headline `Reads it. Cites it. Posts it.` · stats `88% no-touch · 6× ROI week 1 · <30s per invoice`
- **Beat 13 (synthesis):** eyebrow `SOVEREIGN AI` · headline `Platform. Agents. Sovereign AI, end-to-end.` (italic on "Sovereign AI") · 3 engagement option cards below.

### Scroll length

14 beats averaging ~14vh each + 17vh for beat 13 (engagement cards need room) = **210vh of scroll track**. Outer section height: `100vh pin viewport + 210vh track = 310vh`.

## Section 3 — Visual composition

### Viewport layout (desktop ≥ 1024px)

Left 40% = copy panel (eyebrow + serif headline + subline + beat counter). Right 60% = 3-tier illustration (all tiers always visible, active item per tier lights up per beat).

### The 3 tiers

**Top (30% height) — Industries:** 6 tiles horizontal. Active tile: scale 1.0, full saturation, tagline visible, teal glow outline. Inactive: scale 0.88, desaturate 60%, opacity 0.55, name only. Tier parallax: `-48px → +48px` across scroll (fastest).

**Middle (36% height) — Agents:** 6 cards horizontal (5 + `+build`). Active: scale 1.12, teal border, embedded motion preview plays. Inactive: scale 0.94, opacity 0.50. `+build` placeholder always has dashed teal border (no inactive state). Tier parallax: `-20px → +20px` (medium).

**Bottom (34% height) — Platform layers:** 6 stacked bands, progressively filling in. Reuses `PlatformStack.tsx` color tokens but on dark background. Tier parallax: `-8px → +8px` (almost static — "stable foundation").

### Background

- Base: `#0a0e18` (matches agent motion stories' dark background)
- Teal radial wash: `rgba(138,245,192,0.04)` breathing pulse, 8s sinusoid
- Dot-grid: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)` 32px spacing
- Noise texture overlay at 2% opacity

### Color palette

| Token | Value | Use |
|---|---|---|
| `--wow-bg` | `#0a0e18` | Section background |
| `--wow-ink` | `rgba(255,255,255,0.95)` | Primary text |
| `--wow-ink-2` | `rgba(255,255,255,0.65)` | Subline |
| `--wow-ink-3` | `rgba(255,255,255,0.35)` | Beat counter, dim meta |
| `--wow-teal` | `#8af5c0` | Active highlights, eyebrows, `+build` |
| `--wow-teal-dim` | `rgba(138,245,192,0.22)` | Teal backgrounds |
| `--wow-gold` | `#ffd080` | Secondary stat chips |
| `--wow-blue` | `#5b76fe` | Platform-tier subtle accent |

### Typography

Reuses existing site type system — no new font loads. Eyebrows: `var(--mono)` 12px uppercase. Headlines: `var(--serif)` `clamp(36px, 4vw, 64px)` with italic accent words. Sublines: `var(--body)` `clamp(14px, 1.4vw, 18px)`.

### Assets

- **Industry photos:** 6 Unsplash URLs (IDs in Section 2 table), treated with `filter: grayscale(30%) contrast(1.05) brightness(0.85)`, `loading="lazy"`.
- **Agent icons:** lucide-react named imports (zero new assets).
- **Motion previews:** crop slices from existing `src/components/motions/*.tsx` files — `InvoiceFlow`, `PCRGraph`, `VoiceWave`, `PatientCall`, `VoucherStack`. `+build` gets a small new `Sparkles` pulse (~8 lines framer-motion).

### 3 engagement options (beat 13)

| # | Label | Pitch | Target |
|---|---|---|---|
| 1 | **Scope your agent** | "4-week pilot. Fixed scope. One workflow live." | `/pricing#pilot` or `mailto:hello@attentions.ai` |
| 2 | **Evaluate the platform** | "30-day sandbox on your hardware. Bring your data." | `/platform` or dedicated `/evaluate` form |
| 3 | **Talk to an architect** | "30 min unfiltered. Regulatory, integrations, constraints." | Calendly or `mailto:` |

Card shape: `rounded-[20px]` + teal-dim top border + numbered badge + bold title + subline + arrow link. Hover: `translateY(-4px)` + border brightens. Equal weight — no "recommended" emphasis.

**Responsive:** 3 columns on desktop ≥ 1024px. Tablet stacks 1+2 or 2+1. Mobile stacks all 3 vertically.

### Mobile fallback (< 1024px)

No pin, no parallax, no left-right split. Stacked sub-sections:
1. Headline + opening eyebrow (beat 00)
2. Industries — horizontal scroll strip (native swipe)
3. Agents — vertical stack of cards
4. Platform — reuses existing `PlatformStack` component
5. Synthesis beat 13 headline
6. 3 engagement cards stacked vertically

Same content, sequential reading, no cinematic pin.

## Section 4 — Motion choreography

### 4.1 Timeline model

`scrollYProgress` 0 → 1 drives everything via the `BEATS` array and `activeBeatForProgress(p)` helper (defined in Section 2).

### 4.2 Tier parallax equations

```ts
const industryY = useTransform(scrollYProgress, [0, 1], ['-48px', '+48px']);
const agentY    = useTransform(scrollYProgress, [0, 1], ['-20px', '+20px']);
const layerY    = useTransform(scrollYProgress, [0, 1], ['-8px',  '+8px']);
```

Platform tier progressive fill — one `useTransform` per layer opacity, progressing 0 → 1 across narrow sub-ranges (0.00-0.05 for layer 01, 0.05-0.10 for layer 02, etc., all 6 visible by 0.30).

### 4.3 Per-beat content transitions

**Copy panel cross-fade** (left 40%):
- Outgoing: opacity 1→0, y 0→-12px, 280ms
- Incoming: opacity 0→1, y 12px→0, 400ms, with 120ms overlap
- Headline: `split-type` per-word reveal, 40ms stagger, 400-600ms total
- Italic accent words: +100ms "bloom" with `letter-spacing: 0.02em → -0.02em`
- Beat counter "03 / 13": tween-count via framer-motion `MotionValue`

**Illustration active-item highlight** (right 60%):
- Industry active: scale 0.88→1.0, grayscale 60%→0%, opacity 0.55→1.0, 500ms
- Agent active: scale 0.94→1.12, border→teal, motion preview starts playing
- 80ms delay between outgoing fade and incoming grow (prevents "double bright" frame)

**Connector lines** between tiers:
- Default opacity 0.08 (barely visible, structural depth)
- Active agent's connectors to its platform layers: 0.40 over 350ms
- Active industry's connector to its paired agent: 0.20

### 4.4 Embedded motion previews in active agent card

Reuses existing `src/components/motions/*.tsx` components. Slice a 40×40 area from each:
- `invoice` → `InvoiceFlow` scan-line
- `pcr` → `PCRGraph` pulsing node
- `voice` → `VoiceWave` waveform
- `patient` → `PatientCall` timeline tick
- `voucher` → `VoucherStack` flip
- `build` → new `Sparkles` pulse (8 lines framer-motion)

60% speed, loops while active, CSS `animation-play-state: paused` when inactive (no JS re-render cost).

### 4.5 Background micro-motion

- Teal radial gradient pulses: 8s sinusoid, 0.04 → 0.06 opacity (CSS @keyframes, `will-change: opacity`)
- Dot-grid + noise stay static

### 4.6 Lenis + ScrollTrigger integration

```ts
// src/lib/lenis.ts
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

### 4.7 Reduced-motion fallback contract

`useReducedMotion() === true` triggers full bypass:
- No pin (outer `height: auto`, inner no sticky)
- No parallax (all tier `y` transforms = 0)
- No scroll-scrub (14 stacked `<section>` elements with IntersectionObserver fade-ins)
- No SplitText reveals (one-shot headlines)
- No embedded motion previews (static icons)
- Background pulse disabled via `@media (prefers-reduced-motion: reduce)`

Content identical — paced by user scroll instead of orchestrated.

### 4.8 Performance guardrails

- Active-section `motion.div` elements: `will-change: transform`
- Industry `<img>`: `loading="lazy"`, `decoding="async"`, explicit width/height (no CLS)
- Component lazy-loaded via `React.lazy(() => import('./AgentPlatformStack'))` with Suspense boundary
- Target: 60fps at 1440×900, ≤16ms per frame with all motion active
- Lighthouse perf regression tolerance: ≤ -3 points from current baseline

## Section 5 — Integration + rollout

### Landing page IA change

**Removed from landing (3 sections):**
- First `ParallaxHero` ("Your data never leaves your building") — absorbed into platform tier
- `AgentFamilies` (landing component) — richer per-agent narrative in wow section
- Second `ParallaxHero` ("Context is everything") — hallucination-control is now platform tier

**Added:** `<AgentPlatformStack />` after `IsThisYou`, before `ContextKing`.

**Kept:** `ContextKing` survives as the "yes but context is still hard" counter-beat.

**Net landing length change:** +70vh. Negligible.

### Lenis site-wide integration

Mounts once via side-effect import in `src/main.tsx`. Driven by gsap.ticker. Every existing scroll behavior continues to work:

| File | Existing call | Works with Lenis? |
|---|---|---|
| `IndustrySwitcher.tsx:70-71` | `window.scrollTo({ behavior: 'smooth' })` | ✓ Lenis intercepts |
| `IndustrySwitcher.tsx:63` | `strip.scrollTo({ behavior: 'smooth' })` | ✓ element scroll, Lenis doesn't touch |
| `AgentsPage.tsx:30` | `el.scrollIntoView({ behavior: 'smooth' })` | ✓ Lenis handles |

No API changes needed to existing scroll code.

### Rollout — 3 atomic merges

**Phase 2a — Lenis + SplitText infrastructure (foundational):**
1. Install deps, add `src/lib/lenis.ts`, add CSS, mount in `main.tsx`
2. Add `src/hooks/useSplitText.ts` + split-type integration test
3. QA: verify no regressions across existing scroll behaviors

Ship and monitor 24h.

**Phase 2b — Wow section desktop (feature):**
4. Build `src/data/agentPlatformStack.ts` + BEATS + helper
5. Build `src/components/landing/AgentPlatformStack.tsx` desktop composition
6. Wire into `LandingPage.tsx`, remove 3 displaced sections
7. Desktop QA at 1440 / 1920

Ship and monitor conversion.

**Phase 2c — Mobile fallback + polish (closing):**
8. Build `src/components/landing/AgentPlatformStackMobile.tsx`
9. Viewport switch in `AgentPlatformStack.tsx` (media query + render branch)
10. Cross-device QA: iPhone SE / 15 Pro / iPad / Android mid-range

Ship. Phase 2 complete.

**Total: 10 tasks across 3 merges. Each atomically revertible.**

### Rollback strategy

- Phase 2a revert: remove Lenis import from `main.tsx`, delete CSS, delete `lenis.ts`. Native scroll resumes.
- Phase 2b revert: re-add 3 sections to `LandingPage.tsx`. `AgentPlatformStack.tsx` file stays unused.
- Phase 2c revert: force desktop branch render on mobile (single-line change) until fixed.

## Section 6 — Testing, verification, edge cases

### Automated verification

- `npm run build` — zero TS errors, no new Vite warnings beyond chunk-size growth (~92 kB acceptable)
- `activeBeatForProgress` gets a 10-line Vitest covering boundary progress values (0, 0.05, 0.47, 1.0) — confirms beats map without overlap or gap
- No snapshot / visual regression infra (project doesn't have Percy/Chromatic/Playwright)

### Cross-device matrix

| Device | Browser | Verify |
|---|---|---|
| 1920×1080 desktop | Chrome, Safari, Firefox | Full pin/scrub, all beats readable |
| 1440×900 | Chrome | Primary dev target — 60fps |
| 1280×800 | Chrome | Minimum desktop width |
| 1024×768 iPad landscape | Safari iPadOS | Still renders desktop comp |
| 1023×768 | Safari iPadOS | Must switch to mobile fallback (critical threshold) |
| 390×844 iPhone 15 Pro | Safari iOS | Native scroll, industries horizontal swipe |
| 375×667 iPhone SE | Safari iOS | Narrowest common viewport |
| 360×800 Android mid | Chrome Android | Lenis behaves with scroll-restoration |

### Performance targets

- Scroll frame rate ≥ 55fps at 1440×900 (2020 MBP baseline)
- LCP ≤ 2.5s on landing (mobile Lighthouse)
- CLS = 0 on wow section
- No memory leak on repeated scroll-through (20-pass heap growth test)

### Accessibility

- `prefers-reduced-motion: reduce` → full content accessible in plain stacked flow
- VoiceOver: headlines read as unbroken sentences (split-type `aria-label`)
- Keyboard: industry/agent tiles not focusable; engagement cards are, tab-navigable
- WCAG AA contrast on: beat eyebrows (~15:1), dim meta text (borderline ~4.9:1), industry tile labels (photo-dependent, guaranteed by gradient overlay), engagement cards

### Edge cases handled

| Case | Handling |
|---|---|
| Fast momentum scroll past section | Lenis duration 1.2 tames, IntersectionObserver still fires |
| Scroll up through section | Scroll-scrub is bidirectional by construction |
| Hash navigation to a beat | Not supported in scope; lands at beat 00 |
| Viewport resize crossing 1024px threshold | Debounced 200ms media query, React `key` flip for clean remount |
| JS disabled | `<noscript>` fallback with static text + 3 engagement CTAs |
| Slow network, photos unloaded | Tailwind `bg-*` solid-color placeholder per tile |
| iOS Safari address bar collapse | CSS `height: 100dvh` (with `100vh` fallback) |

### Post-ship metrics

| Metric | Target | Tool |
|---|---|---|
| Landing scroll depth median | +15% | GA4 scroll events |
| Time on landing | +20s minimum | GA4 session duration |
| Engagement-card CTR per option | Track self-routing split | GA4 custom event |
| `/pricing#pilot` referrals from landing | +10% | GA4 referrer |
| Bounce rate | ≤ +2pp (no regression) | GA4 |
| Lighthouse perf | ≤ -3 points from baseline | Manual / Lighthouse CI |

### Explicit non-goals (YAGNI guard)

- No A/B testing framework
- No animation timing config panel / admin UI
- No CMS-driven beats (content lives in `src/data/agentPlatformStack.ts`)
- No per-beat URL hash anchors (deferred)
- No dynamic industry photo loading from backend (hardcoded Unsplash URLs)
- No beat skipping / autoplay / play-pause controls
- No i18n / multi-language
- No analytics events beyond 3 engagement card clicks

## Summary — what ships

- **1 new component + 2 supporting files + 2 library files + 2 config modifications** (5 create, 4 modify)
- **3 new npm deps**: `@studio-freight/lenis`, `gsap`, `split-type` (~92 kB gzip new)
- **10 tasks across 3 atomic phase-merges** with 24h monitoring between each
- **Zero regressions** to existing scroll behaviors across site (audited `IndustrySwitcher`, `AgentsPage`)
- **Reduced-motion content parity** — same narrative accessible without any motion
- **Mobile-parity** — same narrative as sequential stacked sections below 1024px

Phase 2 lands as 3 separate, individually-revertible merges. Phase 2a ships Lenis site-wide as a standalone value (smoother feel everywhere). Phase 2b ships the centerpiece on desktop. Phase 2c ships mobile parity. Each phase is a complete story; skip or defer any of them without breaking the others.
