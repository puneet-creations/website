# Closing Manifesto + Enhanced Footer with Orb — Design

**Date:** 2026-04-15
**Status:** Approved, ready for implementation

## Context

The landing page currently ends with `HowToStart` — a "founder call" closer. But the section immediately below it (`CinematicFooter`) already contains:
- "Three doors. One phone call." heading
- Three CTA cards (No AI roadmap / Cost & hallucination / IP & compliance risk) — **which duplicate `IsThisYou` AND `HowToStart`**

Result: the landing page repeats the same CTA pattern 3 times near the end. The final user moment is noisy and unfocused.

## Goals

1. **Replace `HowToStart` with a philosophical closer** — a manifesto that leaves the reader with a conviction, not another CTA.
2. **Enhance `CinematicFooter`** with:
   - A large black glass orb as the visual anchor (replaces duplicate CTAs).
   - A comprehensive 5-column link structure with jump-links into page anchors.
3. **Remove the duplicate "Three doors" block** from the footer — `IsThisYou` and the new manifesto handle the persona/conviction work.

## Design

### 1. Closing Manifesto (replaces `HowToStart`)

**Section spec:**
- Location: `src/components/landing/HowToStart.tsx` (rewritten, same filename to avoid touching imports).
- Background: `var(--bg-s2)` (light). Generous vertical padding (`py-32`).
- No cards, no borders, no buttons. Pure type.
- Max-width: `900px`, centered.

**Content:**
```
THE THESIS

Sovereign AI isn't borrowed. It's built.

You rented your cloud for a decade. You won't rent your intelligence.
The agents your regulator asks about — the ones that decide what gets
posted to SAP, booked at 9 AM, approved by the CFO — belong inside
your building. Your hardware. Your weights. Your audit trail.
```

**Typography:**
- Label: `micro-upper`, `color: rgba(0,0,0,0.55)`
- Headline: `var(--serif)`, `clamp(48px, 6.5vw, 96px)`, weight 500, `letter-spacing: -0.03em`, italic on "It's built."
- Body: `var(--serif)`, italic, `clamp(18px, 1.5vw, 22px)`, `color: rgba(0,0,0,0.65)`, `max-width: 640px`.

**Motion:** Standard `useInView` scroll reveal on the 3 elements with staggered delays.

**Angle:** Combines sovereignty (option 1) + regulated reality (option 3) per user approval.

---

### 2. Enhanced Footer (`CinematicFooter.tsx`)

**Top → bottom structure:**

```
┌─────────────────────────────────────────────────────┐
│  Diagonal marquee (keep existing)                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│         ╔═══════════════╗                           │
│         ║   BLACK ORB   ║   "Ready to own it?"      │
│         ║   (animated)  ║    Book a founder call →  │
│         ║               ║                           │
│         ╚═══════════════╝                           │
│                                                     │
├─────────────────────────────────────────────────────┤
│  PRODUCT   SOLUTIONS  PROOF    COMPANY   CONNECT    │
│  ...       ...        ...      ...       ...       │
├─────────────────────────────────────────────────────┤
│  © 2026 attentions.ai · Built for regulated ent.    │
└─────────────────────────────────────────────────────┘
```

**Orb specs:**
- Component: `HeroOrb` (reused).
- Props: `baseColor="#1a1a1a"`, `attenuationColor="#000000"`, `envColor="#666666"`, `attenuationDistance={0.6}`, `breatheAmp={0.12}`, `floatAmp={0.22}`.
- Container size: `clamp(320px, 30vw, 420px)` square.
- Layout on desktop: orb on the left, headline + CTA on the right (2-column grid).
- Layout on mobile: stacked — orb top, text below.

**Orb-side headline:**
- "Ready to own it?" (Fraunces serif, italic accent "*own*", `clamp(40px, 5vw, 64px)`)
- Supporting line: "30-minute founder call. No SDR, no slides." (subtle, `rgba(255,255,255,0.70)`)
- Single CTA button: **BOOK A FOUNDER CALL →** (black bg, white text — `capsule-dark` style).
- `hello@attentions.ai · Response within 4 business hours` beneath.

**Removed from current footer:**
- The "Three doors. One phone call." heading.
- The 3 ICP CTA door cards (duplicate of `IsThisYou`).
- Giant "ATTENTIONS" text (orb takes over as the visual centerpiece).

**Kept:**
- Dark `#060a12` background.
- Aurora glow + grid pattern.
- Diagonal marquee band at top.

**5-column link structure:**

| PRODUCT | SOLUTIONS | PROOF | COMPANY | CONNECT |
|---------|-----------|-------|---------|---------|
| Platform overview → `/platform` | Document agents → `/agents#document` | Case studies → `/case-studies` | About → `/about` | hello@attentions.ai |
| Six shared layers → `/platform#layers` | Voice agents → `/agents#voice` | Competitors → `/competitors` | Contact → `/contact` | LinkedIn |
| Agent pattern → `/platform#pattern` | Multimodal → `/agents#multimodal` | Why generic fails → `/why-generic-fail` | FAQ → `/faq` | Privacy |
| Pricing → `/pricing` | IP & ownership → `/#ownership` | Live production → `/agents#production` | Security → `/security` | Terms |

**Link styling:**
- Column header: `micro-upper`, `color: rgba(255,255,255,0.40)`, small.
- Links: `text-[14px]`, `color: rgba(255,255,255,0.65)`, hover `color: #ffffff`.
- Jump-link hash anchors use standard `/path#anchor` — target elements on each page need matching `id` attributes (see Implementation notes below).

**Bottom legal row:**
- Left: `© 2026 attentions.ai · Built for regulated enterprise.`
- Right: small text links (Privacy · Terms).
- Border top: `1px solid rgba(255,255,255,0.06)`.

---

### 3. Jump-link anchor IDs needed

The footer links reference `#` anchors that must exist on target pages. Implementation phase needs to add `id=` attributes to:

- `/platform` page:
  - `#layers` → the PlatformStack section.
  - `#pattern` → the 4-verb READ/THINK/DO/PROVE (already removed per earlier request — so this link can instead point to a related section or be dropped).
  - `#hallucination` → the HallucinationControl subsection of PlatformStory.
- `/agents` page:
  - `#document`, `#voice`, `#multimodal` → the 3 agent family sections in `AgentsCard` / `AgentDeepDiveScroll`.
  - `#production` → `ProductionProof`.
- `/` landing page:
  - `#ownership` → `OwnershipBand`.
  - `#sovereign` → the first ParallaxHero or `ClientsStrip`.

If a target section doesn't exist or was removed, the link should be dropped or redirected to a related URL. The implementer should audit during the build.

## Files to change

| File | Action |
|------|--------|
| `src/components/landing/HowToStart.tsx` | Rewrite: manifesto content (no CTAs). |
| `src/components/CinematicFooter.tsx` | Remove "Three doors" section, remove giant text, add orb + 5 columns + legal row. |
| `src/components/landing/AgentFamilies.tsx` | (optional) Add `id="document"` `id="voice"` `id="multimodal"` anchors on each card for jump-links. |
| `src/components/OwnershipBand.tsx` | Add `id="ownership"` on the section. |
| `src/components/PlatformStack.tsx` | Add `id="layers"` on the section. |
| `src/components/PlatformStory.tsx` | Add `id="hallucination"` on the HallucinationControl subsection. |

## Out of scope

- Newsletter signup (not requested).
- Social icon strip beyond LinkedIn placeholder.
- Animated logo in footer.
- Translating the manifesto into other languages.

## Verification

- `npm run build` — zero errors.
- Preview landing page:
  - `HowToStart` section displays the manifesto cleanly with no CTA buttons.
  - Footer shows large animated black orb with headline + CTA to its right (desktop).
  - 5 columns of links render in a clean grid, hover states work.
  - Jump-links scroll to target section when clicked.
- Preview other pages (`/platform`, `/agents`, etc.) — footer orb appears consistently.
- Mobile: orb stacks above text, columns collapse to 2 or 1 per row gracefully.

## Approved by user

Three questions answered on 2026-04-15:
1. Closer = Closing manifesto.
2. Orb = Inside the footer itself (replaces giant "ATTENTIONS" text).
3. Footer = 4–5 columns with jump-links.
4. Manifesto angle = Sovereignty + Regulated reality (blended).
