# Per-Page Footer Messages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the shared `CinematicFooter` message block (eyebrow + headline + pills + tagline + CTA) vary per route across 6 grouped variants, while keeping the link grid, compliance strip, legal row, and motion backdrop identical.

**Architecture:** A new data module `src/data/footerMessages.ts` exports a typed list of 6 variants keyed by pathname plus a pure `resolveFooterMessage(pathname)` helper. `CinematicFooter` reads `useLocation().pathname` and swaps every hardcoded string in the message JSX for its `msg.*` counterpart. Nothing below the message block (compliance strip, 5-column link grid, legal row) changes. A small bug-fix is included: the existing GSAP headline fade-in effect has `[]` deps and won't re-fire when `pathname` changes, so we add `pathname` to its deps.

**Tech Stack:** React 19 · TypeScript · `react-router-dom` v7 (`useLocation`) · framer-motion · GSAP (existing headline entrance).

**Design doc:** `docs/plans/2026-04-19-per-page-footer-messages-design.md`

**No test runner is configured in the repo** (no `vitest`/`jest`/`test` script in `package.json`). Verification uses TypeScript compile (`npm run build`) + lint (`npm run lint`) + manual route walk. Do not add a test runner — that is scope creep.

---

## Task 1: Create `footerMessages.ts` data file with type, 6 variants, and resolver

**Files:**
- Create: `src/data/footerMessages.ts`

**Step 1: Create the file with the exact content below**

```ts
// src/data/footerMessages.ts
//
// Per-route message content for CinematicFooter. The footer resolves
// the active variant by pathname — everything below the message block
// (compliance strip, 5-column link grid, legal row) is NOT covered
// here, that stays identical across routes.
//
// Readability guardrails — DO NOT exceed these on edits:
//   eyebrow         ≤ 22 chars  (12px mono uppercase, 0.12em track)
//   headline + accent combined ≤ 60 chars (Fraunces clamp(36-72px))
//   each pill       ≤ 20 chars  (13px, 3-up flex row)
//   tagline         ≤ 55 chars  (15px Fraunces italic, one line)
//   ctaLabel        ≤ 28 chars  (14px mono uppercase)
//
// Pills are typed as a 3-tuple so the layout can't silently drift
// to 2 or 4. If you need a different count, change the component,
// not the type.

export type FooterMessage = {
  id: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  pills: [string, string, string];
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
};

type FooterMessageEntry = {
  matches: string | string[] | '*';
  message: FooterMessage;
};

// Ordered — first match wins. The '*' entry is the fallback default
// and must be last.
export const FOOTER_MESSAGES: FooterMessageEntry[] = [
  {
    matches: '/',
    message: {
      id: 'landing',
      eyebrow: 'FOUNDER FIRST',
      headline: 'Sovereign AI and production agents on the',
      headlineAccent: 'artiGen Platform.',
      pills: ['Secure by architecture', 'Fixed low cost', 'ROI in weeks'],
      tagline: "Don't hand your IP to public AI.",
      ctaLabel: 'Book a founder call',
      ctaHref: 'mailto:hello@attentions.ai?subject=Founder%20Call',
    },
  },
  {
    matches: '/platform',
    message: {
      id: 'platform',
      eyebrow: 'PLATFORM',
      headline: 'Six shared layers.',
      headlineAccent: 'Your agents on top.',
      pills: ['Deterministic', 'Cited outputs', 'On your hardware'],
      tagline: 'Architectural, not contractual.',
      ctaLabel: 'See agents in production',
      ctaHref: '/agents#agent-deep-dive',
    },
  },
  {
    matches: '/agents',
    message: {
      id: 'agents',
      eyebrow: 'AGENTS IN PRODUCTION',
      headline: 'Five shipped.',
      headlineAccent: 'Yours next.',
      pills: ['Live at 3 clients', '4\u20138 week builds', 'Signed & versioned'],
      tagline: 'Your fine-tuned weights. Never uploaded.',
      ctaLabel: 'Start your assessment',
      ctaHref: '/pricing#assessment',
    },
  },
  {
    matches: '/security',
    message: {
      id: 'trust',
      eyebrow: 'SOVEREIGN BY DESIGN',
      headline: 'The data never leaves.',
      headlineAccent: 'Period.',
      pills: ['On-prem default', 'Air-gapped option', 'Zero incidents'],
      tagline: 'Compliance is structural \u2014 not retrofitted.',
      ctaLabel: 'Request a security review',
      ctaHref: 'mailto:hello@attentions.ai?subject=Security%20Review',
    },
  },
  {
    matches: ['/pricing', '/contact'],
    message: {
      id: 'conversion',
      eyebrow: 'READY TO SHIP',
      headline: 'Fixed cost.',
      headlineAccent: 'Production in 4\u20138 weeks.',
      pills: ['No seat licenses', 'No data leaves', 'ROI in weeks'],
      tagline: 'Pilot \u2192 Production \u2192 Yours.',
      ctaLabel: 'Kick off the assessment',
      ctaHref: 'mailto:hello@attentions.ai?subject=Assessment%20Kickoff',
    },
  },
  {
    matches: '*',
    message: {
      id: 'default',
      eyebrow: 'FOUNDER FIRST',
      headline: 'Questions worth asking.',
      headlineAccent: 'Answered in 30 minutes.',
      pills: ['Direct to founders', 'No sales funnel', 'Reply in 4 hrs'],
      tagline: "Don't hand your IP to public AI.",
      ctaLabel: 'Book a founder call',
      ctaHref: 'mailto:hello@attentions.ai?subject=Founder%20Call',
    },
  },
];

/**
 * Resolve the FooterMessage for a given pathname. First-match-wins over
 * FOOTER_MESSAGES; '*' always matches. The final entry MUST have
 * matches:'*' so this function can never return undefined.
 */
export function resolveFooterMessage(pathname: string): FooterMessage {
  for (const entry of FOOTER_MESSAGES) {
    if (entry.matches === '*') return entry.message;
    if (Array.isArray(entry.matches)) {
      if (entry.matches.includes(pathname)) return entry.message;
    } else if (entry.matches === pathname) {
      return entry.message;
    }
  }
  // Unreachable — '*' entry always matches. TS narrows on the loop
  // so we need this for exhaustiveness.
  return FOOTER_MESSAGES[FOOTER_MESSAGES.length - 1].message;
}
```

**Step 2: Verify TypeScript compiles**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: completes with no errors, no new warnings about unused exports (the file is re-exported by the footer in Task 2).

If the build fails because of the tuple type — the file is correct; re-check you pasted it verbatim.

**Step 3: Verify lint passes**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run lint`
Expected: no new errors/warnings in `src/data/footerMessages.ts`.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/data/footerMessages.ts
git commit -m "$(cat <<'EOF'
feat: add footerMessages data + resolver (6 per-route variants)

6 ordered entries keyed by pathname; first-match-wins resolver with
'*' fallback. Pills tuple-typed to force exactly 3. Readability floors
encoded as a docstring header so future edits can't regress layout.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Wire `footerMessages` into `CinematicFooter.tsx`

**Files:**
- Modify: `src/components/CinematicFooter.tsx`

**Context:** The hardcoded message block currently lives at `CinematicFooter.tsx:231-307`. The GSAP headline fade-in effect is at lines 123-135 with `[]` deps — that needs `[pathname]` added so the entrance animation re-fires when the route changes (the footer stays mounted across routes because it's rendered once in `Shell`).

**Step 1: Add the two new imports at the top of the file**

After the existing `import { Link } from 'react-router-dom';` (line 2), replace with:

```tsx
import { Link, useLocation } from 'react-router-dom';
```

After `import { COMPLIANCE } from '../data/compliance';` (line 6), add:

```tsx
import { resolveFooterMessage } from '../data/footerMessages';
```

**Step 2: Resolve the message inside the component**

At the top of `export default function CinematicFooter() {` (currently line 86-87), after the existing refs, add:

```tsx
const { pathname } = useLocation();
const msg = resolveFooterMessage(pathname);
```

Place these two lines immediately after `const videoRef = useRef<HTMLVideoElement>(null);` (line 89) and before the `useState<boolean>` for `prefersReducedMotion`.

**Step 3: Add `pathname` to the GSAP headline fade-in effect deps**

Find the existing effect (lines 123-135):

```tsx
useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = gsap.context(() => {
    gsap.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: wrapperRef.current, start: 'top 70%' },
    });
  });
  return () => ctx.revert();
}, []);
```

Change the dependency array from `[]` to `[pathname]`:

```tsx
}, [pathname]);
```

Add a brief comment above the effect explaining why:

```tsx
// Re-fire the headline entrance on route change — the footer stays
// mounted across routes (rendered in Shell), so without `pathname`
// in deps the new per-route headline would swap in without its fade.
```

**Step 4: Replace the hardcoded strings in the message JSX**

The 5 swaps below are all inside the `{/* Headline + CTA */}` block (currently `CinematicFooter.tsx:231-307`):

**4a. Eyebrow** (line ~244, currently `Founder first`):
```tsx
{msg.eyebrow}
```

**4b. Headline + accent** (lines ~258-259, currently `Sovereign AI and production agents on the{' '} <span style={{ fontStyle: 'italic' }}>artiGen Platform.</span>`):
```tsx
{msg.headline}{' '}
<span style={{ fontStyle: 'italic' }}>{msg.headlineAccent}</span>
```

**4c. Pills** (lines ~263-282) — replace the hardcoded array in the `.map()` call:

Change the array literal
```tsx
{[
  'Secure by architecture',
  'Fixed low cost',
  'ROI in weeks',
].map((pill) => (
```
to:
```tsx
{msg.pills.map((pill) => (
```

**4d. Tagline** (line ~285, currently `Don&rsquo;t hand your IP to public AI.`):
```tsx
{msg.tagline}
```

**4e. CTA anchor** (lines ~287-303) — the `<motion.a>`. Two swaps:

- `href` attribute: change from `"mailto:hello@attentions.ai?subject=Founder%20Call"` to `msg.ctaHref`.
- Link label text inside the anchor: change from `Book a founder call <span>→</span>` to `{msg.ctaLabel} <span>→</span>`.

Leave every other attribute (`whileHover`, `whileTap`, `className`, `style`, etc.) untouched.

**Step 5: Verify TypeScript compiles**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: no errors. `tsc -b` should pass. If it fails with "Property 'pills' does not exist" — you skipped Task 1 or the import path is wrong.

**Step 6: Verify lint passes**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run lint`
Expected: no new errors/warnings.

**Step 7: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/CinematicFooter.tsx
git commit -m "$(cat <<'EOF'
feat: route-aware footer message (6 variants via resolveFooterMessage)

Footer now reads pathname and swaps the message block per route;
link grid, compliance strip, legal row, backdrop all unchanged.
Fixes latent bug where GSAP headline entrance didn't re-fire on
route change — added pathname to the effect deps.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Manual smoke test across all 11 routes

**Why:** There's no unit test runner. The resolver is tiny and the type system catches most breaks, but we still need to eyeball each route to verify the eyebrow / headline / pill copy / CTA all match the design doc.

**Step 1: Start the dev server in the background**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run dev`
Expected: Vite prints `Local: http://localhost:5173/` (or 5174 if 5173 is occupied). Leave running.

**Step 2: Walk each route and verify the footer's eyebrow matches the expected variant**

Open each URL, scroll to the footer, and check the green teal eyebrow text above the large headline:

| Route | Expected eyebrow | Expected variant id |
|---|---|---|
| `http://localhost:5173/` | `FOUNDER FIRST` | landing |
| `http://localhost:5173/platform` | `PLATFORM` | platform |
| `http://localhost:5173/agents` | `AGENTS IN PRODUCTION` | agents |
| `http://localhost:5173/security` | `SOVEREIGN BY DESIGN` | trust |
| `http://localhost:5173/pricing` | `READY TO SHIP` | conversion |
| `http://localhost:5173/contact` | `READY TO SHIP` | conversion |
| `http://localhost:5173/about` | `FOUNDER FIRST` | default |
| `http://localhost:5173/faq` | `FOUNDER FIRST` | default |
| `http://localhost:5173/solutions` | `FOUNDER FIRST` | default |
| `http://localhost:5173/competitors` | `FOUNDER FIRST` | default |
| `http://localhost:5173/why-generic-fail` | `FOUNDER FIRST` | default |

Also verify on each route:
- Headline text matches the variant's `headline` + italic `headlineAccent`.
- Three pills match the variant's `pills` tuple.
- CTA button label matches `ctaLabel`; clicking the CTA lands on the right href (mailto opens mail client or in-site anchor navigates).
- Below the message: the **5-column link grid, compliance strip, legal row are identical** on every route.

**Step 3: Verify headline entrance animation re-fires on client-side navigation**

From `/`, click the site nav link to `/platform`. Watch the footer headline — it should fade in from y+30 again (not appear pre-rendered). If it doesn't, Step 3 of Task 2 (pathname deps) is broken.

**Step 4: Verify `prefers-reduced-motion` respected**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce", refresh any route. The headline should appear immediately with no y-offset fade. Video should be paused. This confirms the existing reduced-motion guards still work.

**Step 5: Verify mobile readability at 375px**

In DevTools → responsive mode → 375×667. Check all 11 routes. Nothing should wrap more than 2 lines in the headline or more than a single extra row in the pill wrap-flex.

**Step 6: Stop the dev server**

Ctrl+C.

**Step 7: Commit the plan completion marker (optional)**

This task only has observations — no code changes to commit. If you want a record that smoke-test passed, add a short note to a CHANGELOG or skip.

---

## Task 4: Push to origin

**Step 1: Verify clean working tree**

Run: `cd /Users/puneet/website-attentions-miro/app && git status`
Expected: `nothing to commit, working tree clean` — only the two commits from Task 1 and Task 2 are ahead of origin.

**Step 2: Push**

Run: `cd /Users/puneet/website-attentions-miro/app && git push origin main`
Expected: two commits pushed successfully.

---

## Verification Summary

- Task 1 commit: `feat: add footerMessages data + resolver`
- Task 2 commit: `feat: route-aware footer message`
- `npm run build` green after Task 1 and Task 2
- `npm run lint` clean after Task 1 and Task 2
- 11 routes manually walked, eyebrows match the table in Task 3
- Headline entrance re-fires on SPA nav
- Reduced-motion honoured

## Non-Goals (do not do)

- Do not add a test runner (vitest/jest) — out of scope.
- Do not touch `src/App.tsx`, any `src/pages/*.tsx`, or the link grid/compliance/legal sections of `CinematicFooter.tsx`.
- Do not introduce a React Context or prop-drill route state into the footer.
- Do not change the orb, marquee, or video backdrop.
- Do not vary the eyebrow colour per group (stays teal `#8af5c0` — single brand signature).
