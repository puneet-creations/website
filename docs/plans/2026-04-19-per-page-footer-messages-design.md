# Per-Page Footer Messages — Design

**Date:** 2026-04-19
**Status:** Approved, ready for implementation plan

## Problem

The shared `CinematicFooter` (rendered once in `App.tsx`'s `Shell` below every route's `<Outlet/>`) carries a hardcoded message block — eyebrow `FOUNDER FIRST`, headline "Sovereign AI and production agents on the artiGen Platform.", three pills (Secure by architecture · Fixed low cost · ROI in weeks), italic tagline "Don't hand your IP to public AI.", and the CTA "Book a founder call →". The message is identical on all 11 routes. The user wants the message to echo each page's closing argument while keeping the compliance strip, 5-column link grid, and legal row untouched.

## Goal

Per-route footer message variants, selected by `pathname`, with 6 distinct variants covering the 11 routes. Link grid + compliance strip + legal row + motion backdrop + 3D orb remain unchanged. Readability floors (font size, max character counts) are encoded in the design so future copy edits can't regress the layout.

## Approach

**Selected:** Approach 2 — extract the message content to a data file and have the footer look up by `pathname`. Matches the codebase's existing data-layer convention (`data/compliance.ts`, `data/agentPlatformStack.ts`, `data/pricingPlans.ts`).

**Rejected alternatives:**
- *Inline map inside the component* — mixes routing logic + presentation + content in one file. Harder to edit copy without touching JSX.
- *React Context with pages registering copy at mount* — over-engineered for 6 static variants; introduces a flash-of-default-copy between footer mount and page effect fire.

## Data Shape

New file `src/data/footerMessages.ts`:

```ts
export type FooterMessage = {
  id: string;                      // stable key: 'landing' | 'platform' | 'agents' | 'trust' | 'conversion' | 'default'
  eyebrow: string;                 // 12px mono uppercase, ≤22 chars
  headline: string;                // roman part of Fraunces headline
  headlineAccent: string;          // italic emphasis part
  pills: [string, string, string]; // exactly 3, ≤20 chars each
  tagline: string;                 // 15px Fraunces italic, ≤55 chars
  ctaLabel: string;                // 14px mono uppercase, ≤28 chars
  ctaHref: string;                 // mailto: or in-site route/anchor
};

export const FOOTER_MESSAGES: Array<{
  matches: string | string[];      // pathname, list of pathnames, or '*'
  message: FooterMessage;
}> = [ /* 6 entries, ordered, first-match-wins */ ];

export function resolveFooterMessage(pathname: string): FooterMessage;
```

**Why this shape:**
- `pills: [string, string, string]` tuple forces exactly 3 at compile time — copy drift can't break the layout.
- `headline` + `headlineAccent` split preserves the current italic-emphasis pattern ("Sovereign AI and production agents on the *artiGen Platform.*").
- `matches: string | string[] | '*'` collapses single-route and multi-route groups into one schema. `/pricing` and `/contact` share variant ⑤ via `matches: ['/pricing', '/contact']`.
- Ordered-array-first-match-wins gives predictable precedence with zero regex cost.

## Copy — 6 Variants

### ① `landing` — `/`
*Keeps today's copy verbatim — it IS the overall brand pitch.*
- Eyebrow: `FOUNDER FIRST`
- Headline: `Sovereign AI and production agents on the`
- Accent: `artiGen Platform.`
- Pills: `Secure by architecture` · `Fixed low cost` · `ROI in weeks`
- Tagline: `Don't hand your IP to public AI.`
- CTA: `Book a founder call →` → `mailto:hello@attentions.ai?subject=Founder%20Call`

### ② `platform` — `/platform`
- Eyebrow: `PLATFORM`
- Headline: `Six shared layers.`
- Accent: `Your agents on top.`
- Pills: `Deterministic` · `Cited outputs` · `On your hardware`
- Tagline: `Architectural, not contractual.`
- CTA: `See agents in production →` → `/agents#agent-deep-dive`

### ③ `agents` — `/agents`
- Eyebrow: `AGENTS IN PRODUCTION`
- Headline: `Five shipped.`
- Accent: `Yours next.`
- Pills: `Live at 3 clients` · `4–8 week builds` · `Signed & versioned`
- Tagline: `Your fine-tuned weights. Never uploaded.`
- CTA: `Start your assessment →` → `/pricing#assessment`

### ④ `trust` — `/security`
- Eyebrow: `SOVEREIGN BY DESIGN`
- Headline: `The data never leaves.`
- Accent: `Period.`
- Pills: `On-prem default` · `Air-gapped option` · `Zero incidents`
- Tagline: `Compliance is structural — not retrofitted.`
- CTA: `Request a security review →` → `mailto:hello@attentions.ai?subject=Security%20Review`

### ⑤ `conversion` — `/pricing`, `/contact`
- Eyebrow: `READY TO SHIP`
- Headline: `Fixed cost.`
- Accent: `Production in 4–8 weeks.`
- Pills: `No seat licenses` · `No data leaves` · `ROI in weeks`
- Tagline: `Pilot → Production → Yours.`
- CTA: `Kick off the assessment →` → `mailto:hello@attentions.ai?subject=Assessment%20Kickoff`

### ⑥ `default` — `/about`, `/faq`, `/solutions`, `/competitors`, `/why-generic-fail` (matches: `'*'`)
- Eyebrow: `FOUNDER FIRST`
- Headline: `Questions worth asking.`
- Accent: `Answered in 30 minutes.`
- Pills: `Direct to founders` · `No sales funnel` · `Reply in 4 hrs`
- Tagline: `Don't hand your IP to public AI.`
- CTA: `Book a founder call →` → `mailto:hello@attentions.ai?subject=Founder%20Call`

## Component Changes

`src/components/CinematicFooter.tsx`:
1. Add `import { useLocation } from 'react-router-dom';`
2. Add `import { resolveFooterMessage } from '../data/footerMessages';`
3. Inside component: `const { pathname } = useLocation(); const msg = resolveFooterMessage(pathname);`
4. Swap every hardcoded string in the message JSX for its `msg.*` counterpart.
5. **Fix existing GSAP headline-fade bug** — the existing `useEffect` has `[]` deps but the footer stays mounted across routes. Add `pathname` to the deps so the entrance animation re-fires when the headline text changes. Keep the `prefers-reduced-motion` guard.

**Zero changes** to: compliance strip, 5-column link grid, legal row, marquee band, motion video backdrop, 3D orb, video IntersectionObserver pause.

## Readability Guardrails

Encoded as docstring comments in `footerMessages.ts` so future edits have the constraints inline:

| Slot | Size | Max chars |
|---|---|---|
| Eyebrow | 12px mono uppercase, `0.12em` tracking | 22 |
| Headline (roman + accent combined) | `clamp(36px, 5.5vw, 72px)` Fraunces 500 | 60 |
| Pills (each) | 13px Noto Sans, 3-up flex-wrap | 20 |
| Tagline | 15px Fraunces italic | 55 |
| CTA label | 14px mono uppercase, `0.06em` tracking | 28 |

All 6 drafted variants pass these bounds.

## Testing

1. **Unit** — `resolveFooterMessage()` is a pure function. Cover: each of the 11 known routes returns its expected variant id; unknown route returns `'default'`; empty string falls back to default.
2. **Manual smoke** — Click through all 11 routes; verify message updates without reload; verify reduced-motion skips GSAP re-fire; verify no wrap/overflow at 375px mobile and 1440px desktop.
3. **Build** — `npm run build` must stay green. `npm run lint` clean.

## Non-Goals (YAGNI)

- Per-group colour accents (eyebrow stays teal `#8af5c0` everywhere — single brand signature).
- Per-page orb colour / backdrop video variation.
- Admin-editable copy (strings live in code, ship via PR).
- i18n.

## Files

**Create:**
- `src/data/footerMessages.ts`
- `src/data/__tests__/footerMessages.test.ts` *(if a test runner is configured — otherwise skip)*

**Modify:**
- `src/components/CinematicFooter.tsx`

**Untouched:**
- `src/App.tsx`
- `src/data/compliance.ts`
- Every page file (`src/pages/*.tsx`)
