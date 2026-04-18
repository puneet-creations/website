# AgentPlatformStack Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the cardiatec-inspired "wow section" for attentions.ai's landing page — a pinned scroll-scrub centerpiece that stacks industries → agents → platform layers in a 14-beat narrative, framed as "Sovereign AI" and ending with 3 engagement CTAs. Plus site-wide Lenis smooth scroll and split-type infrastructure.

**Architecture:** Three sequential atomic merges: (a) Lenis + split-type infrastructure site-wide, (b) desktop wow section on landing page replacing 3 existing mid-page sections, (c) mobile fallback. Uses GSAP ScrollTrigger (already installed at `^3.14.2`) + new Lenis for smooth scroll + new split-type for text reveals. Framer-motion stays for non-wow motion across the site.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind + existing GSAP 3.14.2 + new `@studio-freight/lenis` (~16 kB gzip) + new `split-type` (~2 kB gzip). Net new dependency weight: **~18 kB gzip** (GSAP already in bundle per `CinematicFooter.tsx`, `PageCinematicWrap.tsx`).

**Design doc:** `docs/plans/2026-04-18-agent-platform-stack-design.md` (commit `a0572ea`)

---

## Pre-flight: What you need to know about this codebase

Before starting, read:
- `src/pages/LandingPage.tsx` — current landing IA (Phase 2b replaces the middle 3 sections)
- `src/components/ParallaxHero.tsx` — the existing (simpler) parallax component that stays in use on `/platform` and `/agents`; wow section is different and more ambitious
- `src/components/PlatformStack.tsx` — the 6-layer platform-tier data and color tokens that the wow section's bottom tier reuses
- `src/components/motions/InvoiceFlow.tsx`, `PCRGraph.tsx`, `VoiceWave.tsx`, `PatientCall.tsx`, `VoucherStack.tsx` — the 5 agent motion stories; wow section embeds 40×40 slices from each into the active agent card
- `src/index.css` lines 88 (`.micro-upper`), 166–215 (`.sr` / `.is-in` / reduced-motion reset)
- `src/main.tsx` — mount point for Lenis (currently 10-line vanilla `createRoot`)
- `src/hooks/useInView.ts` — existing IntersectionObserver pattern; wow section's mobile fallback reuses it
- `src/components/CinematicFooter.tsx` + `src/components/PageCinematicWrap.tsx` — existing GSAP usage (confirm: GSAP is already in bundle, no new dep needed for it)

**Pre-existing unrelated modification to leave alone:** `src/components/CinematicFooter.tsx` has unstaged edits that predate this work. DO NOT stage, commit, or touch that file unless a task explicitly requires it.

**Conventions to match:**
- Tailwind classes + inline `style={{ }}` for complex tokens (existing file pattern)
- `MotionConfig reducedMotion="user"` already wraps pages — any `useReducedMotion()` inherits correctly
- No unit test infrastructure in the repo (no vitest/jest). For Task 4's `activeBeatForProgress` helper, use a minimal in-file assertion block at the bottom of `src/data/agentPlatformStack.ts` or skip tests entirely per YAGNI — verify by build + manual scroll.
- Branch: `main`. User previously approved working directly on main with atomic per-task commits.
- lucide-react named imports: `import { FileText, GitBranch, Mic, Phone, Receipt, Plus, Sparkles } from 'lucide-react';`

---

# Phase 2a — Lenis + split-type infrastructure

Three tasks. Ships site-wide smooth scroll + text-splitting hook. Standalone value even if Phase 2b never lands.

## Task 1: Install deps + add Lenis singleton + global CSS

**Files:**
- Modify: `package.json` (add 2 deps)
- Create: `src/lib/lenis.ts`
- Modify: `src/main.tsx` (side-effect import)
- Modify: `src/index.css` (10 lines of Lenis global styles)

**Step 1: Install deps**

```bash
cd /Users/puneet/website-attentions-miro/app
npm install @studio-freight/lenis@^1.1.0 split-type@^0.3.4
```

Expected: both added to `package.json` dependencies. `package-lock.json` updated. No peer-dep warnings.

**Step 2: Create `src/lib/lenis.ts`**

```ts
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide smooth-scroll singleton.
 * Driven by gsap.ticker so ScrollTrigger updates stay in sync with Lenis.
 * Native touch scroll is preserved (smoothTouch: false) — iOS rubber-banding
 * is easier to leave alone than to replicate in JS.
 */
export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

**Step 3: Add side-effect import to `src/main.tsx`**

Modify `src/main.tsx` — add one import line after the existing imports:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './lib/lenis'   // <-- NEW: mounts Lenis site-wide at module load
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 4: Add Lenis global CSS to `src/index.css`**

Append to the end of `src/index.css`:

```css

/* === Lenis smooth scroll — required global styles === */
html.lenis,
html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }
```

**Step 5: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0, no TypeScript errors, no new Vite warnings (pre-existing chunk-size warning stays).

**Step 6: Verify Lenis activates in dev**

```bash
npm run dev
```

Open `http://localhost:5173/` in Chrome. DevTools → Elements. Inspect `<html>` — expected: has classes `lenis lenis-smooth`. Scroll with mouse wheel — expected: smooth interpolated scroll (not native stepwise). Scroll with Page Down — expected: still smooth (Lenis intercepts).

**Step 7: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add package.json package-lock.json src/lib/lenis.ts src/main.tsx src/index.css
git commit -m "$(cat <<'EOF'
feat(scroll): site-wide Lenis smooth scroll

Adds @studio-freight/lenis@1.1 (~16 kB gzip) driven by the existing
gsap.ticker so ScrollTrigger updates stay synchronized. Mount via
side-effect import in main.tsx. Native touch scroll preserved to
avoid iOS rubber-banding conflicts.

Also installs split-type@0.3 (~2 kB gzip) for upcoming SplitText-style
headline reveals. Consumed in a later commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add `useSplitText` hook

**Files:**
- Create: `src/hooks/useSplitText.ts`

**Step 1: Create the hook**

```tsx
// src/hooks/useSplitText.ts
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';

/**
 * useSplitText — wraps the split-type library with proper useEffect cleanup.
 * Returns a ref to attach to any text element. On mount, the element's
 * textContent is re-rendered into per-word + per-char spans (classnames
 * `.word` and `.char`), with an aria-label on the parent preserving the
 * original string for screen readers.
 *
 * On unmount (or when `deps` change), the split is reverted so the element
 * returns to its unsplit state before teardown — prevents leaked spans.
 */
export function useSplitText<T extends HTMLElement>(
  deps: React.DependencyList = []
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const instance = new SplitType(el, { types: 'words,chars' });
    return () => {
      instance.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
```

**Step 2: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 3: Smoke-test the hook inline (no dedicated test page)**

This codebase has no test infrastructure. Verify the hook works by temporarily using it inside an existing landing component and visually confirming. Add this test stanza in `src/pages/LandingPage.tsx` just above the existing `return`:

```tsx
// TEMP smoke test — remove before commit
import { useSplitText } from '../hooks/useSplitText';
```

And inside the component body:

```tsx
const splitRef = useSplitText<HTMLDivElement>([]);
```

And inside the JSX somewhere visible (e.g., just after `<HeroAboveFold />`):

```tsx
<div ref={splitRef} className="p-6 text-2xl">SplitText smoke test — each word should split.</div>
```

Run `npm run dev`, navigate to `/`. DevTools → Inspect the test div. Expected: text rendered as `<div class="... split-parent"><span class="word">SplitText</span><span class="word">smoke</span>…</div>`. Each `.word` contains `.char` spans. Parent has `aria-label="SplitText smoke test — each word should split."`.

Once verified, **remove all smoke-test code** from `src/pages/LandingPage.tsx` (the import, the hook call, the JSX). `git diff src/pages/LandingPage.tsx` should show zero lines changed after cleanup.

**Step 4: Verify build after cleanup**

```bash
npm run build
```

Expected: exits 0. `src/pages/LandingPage.tsx` is back to pre-Task-2 state.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/hooks/useSplitText.ts
git commit -m "$(cat <<'EOF'
feat(hooks): add useSplitText with split-type + cleanup

React hook wrapping split-type. Returns a ref; on mount the target's
textContent is split into per-word + per-char spans with aria-label
preservation. Reverts on unmount to prevent span leakage across
deps changes. Consumed by AgentPlatformStack headline reveals in
a later commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Phase 2a regression smoke QA

**Files:** none (verification-only)

**Step 1: Full site scroll smoke test**

`npm run dev`. Walk through these pages and verify no regressions in existing scroll behaviors (Lenis intercepts should be transparent):

- `/` (landing): hero orb renders, scroll to bottom is smooth and doesn't jank. Hash link in SiteNav nav scrolls smoothly.
- `/platform`: the three Task-2-to-6-redesigned sections (HallucinationControl, DeterminismProof, ScaleAtVolume) still trigger their motions on scroll-in once each. Scroll back up doesn't re-fire.
- `/agents`: `useLocation` hash scroll behavior still works (`/agents#production` jumps to the `ProductionProof` section via `el.scrollIntoView({ behavior: 'smooth' })` at `src/pages/AgentsPage.tsx:30`). Expected: smooth scroll to target. Lenis makes this 1.2s duration instead of native instant, which is acceptable for hash jumps.
- `/solutions`: the industry switcher pill click (line 70-71 `window.scrollTo({ behavior: 'smooth' })`) scrolls to that industry's section. Expected: smooth, lands correctly.
- `/solutions` again: the sticky industry switcher at top of page, when a pill is active, the strip auto-centers that pill via `strip.scrollTo({ left })` at line 63. Expected: still works (Lenis doesn't intercept element-level scroll).

**Step 2: Reduced motion check**

DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → `reduce`. Reload `/`. Expected: Lenis still runs (it doesn't check prefers-reduced-motion by default; the user's OS setting handles that if they care). The existing site `.sr` / `.is-in` CSS reveal classes already have `prefers-reduced-motion: reduce` overrides at `src/index.css:215`, so scroll-linked animations still disable properly.

**Step 3: Mobile smoke test**

DevTools → Toggle device toolbar → iPhone 15 Pro. Scroll `/` with touch emulation. Expected: native scroll (Lenis `smoothTouch: false`). No smoothing applied. No rubber-band breakage.

**Step 4: If regressions found, triage and fix before moving on**

Document any regression found (file, behavior, steps to reproduce) and fix before Phase 2b. If no regressions, proceed to Task 4.

**Step 5: No commit** — this is verification-only.

---

# Phase 2b — Wow section desktop

Four tasks. Ships `AgentPlatformStack` at desktop widths (≥ 1024px). On narrower viewports, temporarily renders a simple "coming soon on mobile" placeholder (replaced in Phase 2c).

## Task 4: Data model + BEATS + `activeBeatForProgress` helper

**Files:**
- Create: `src/data/agentPlatformStack.ts`

**Step 1: Create the data file**

```ts
// src/data/agentPlatformStack.ts

export type BeatId =
  | 'intro'
  | 'logistics' | 'pharma' | 'dental' | 'auto' | 'healthcare' | 'banking'
  | 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher' | 'build'
  | 'synthesis';

export type Beat = {
  id: BeatId;
  start: number;  // 0..1, inclusive
  end: number;    // 0..1, exclusive (except synthesis which goes through 1.0)
};

export const BEATS: readonly Beat[] = [
  { id: 'intro',       start: 0.00, end: 0.05 },
  { id: 'logistics',   start: 0.05, end: 0.12 },
  { id: 'pharma',      start: 0.12, end: 0.19 },
  { id: 'dental',      start: 0.19, end: 0.26 },
  { id: 'auto',        start: 0.26, end: 0.33 },
  { id: 'healthcare',  start: 0.33, end: 0.40 },
  { id: 'banking',     start: 0.40, end: 0.47 },
  { id: 'invoice',     start: 0.47, end: 0.53 },
  { id: 'pcr',         start: 0.53, end: 0.59 },
  { id: 'voice',       start: 0.59, end: 0.65 },
  { id: 'patient',     start: 0.65, end: 0.71 },
  { id: 'voucher',     start: 0.71, end: 0.77 },
  { id: 'build',       start: 0.77, end: 0.83 },
  { id: 'synthesis',   start: 0.83, end: 1.001 }, // 1.001 so p=1.0 is inclusive
] as const;

/**
 * Maps a scrollYProgress value in [0, 1] to the active beat.
 * Linear scan over 14 entries — O(n) but n is small and constant.
 * Called inside the scroll-event rAF loop; must stay cheap.
 */
export function activeBeatForProgress(p: number): Beat {
  for (const b of BEATS) {
    if (p >= b.start && p < b.end) return b;
  }
  return BEATS[BEATS.length - 1]; // fallback: synthesis (handles p < 0 or p > 1)
}

export type Industry = {
  id: 'logistics' | 'pharma' | 'dental' | 'auto' | 'healthcare' | 'banking';
  name: string;
  tagline: string;
  photoUrl: string;  // Unsplash direct URL
  pairedAgentId: AgentLiveId;
};

export type AgentLiveId = 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher';
export type AgentId = AgentLiveId | 'build';

export type Agent = {
  id: AgentId;
  name: string;
  domainLabel: string;
  flow: string;            // "input → output" string
  iconKey: 'FileText' | 'GitBranch' | 'Mic' | 'Phone' | 'Receipt' | 'Plus';
  usesPlatformLayers: ReadonlyArray<1 | 2 | 3 | 4 | 5 | 6>; // which platform layers this agent uses
};

export const INDUSTRIES: readonly Industry[] = [
  { id: 'logistics',  name: 'Logistics & trade finance', tagline: 'Clear the Monday backlog by 10:42.',      photoUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=70', pairedAgentId: 'invoice' },
  { id: 'pharma',     name: 'Pharma & life sciences',    tagline: 'PCR graphs across millions of reports.', photoUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1600&q=70', pairedAgentId: 'pcr' },
  { id: 'dental',     name: 'Dental networks',           tagline: 'Every patient call logged and coded.',   photoUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=70', pairedAgentId: 'voice' },
  { id: 'auto',       name: 'Automotive aftermarket',    tagline: 'Handwritten warranty claims → SAP.',     photoUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1600&q=70', pairedAgentId: 'voucher' },
  { id: 'healthcare', name: 'Hospital systems',          tagline: 'Patient history, cited and reversible.', photoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=70', pairedAgentId: 'patient' },
  { id: 'banking',    name: 'Banking & compliance',      tagline: 'KYC docs with a full audit trail.',      photoUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=70', pairedAgentId: 'invoice' },
] as const;

export const AGENTS: readonly Agent[] = [
  { id: 'invoice', name: 'Invoice Intelligence', domainLabel: 'Logistics',     flow: 'handwritten invoice → SAP posted',      iconKey: 'FileText',  usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'pcr',     name: 'PCR Graph',            domainLabel: 'Pharma',        flow: 'lab reports → knowledge graph',         iconKey: 'GitBranch', usesPlatformLayers: [1, 2, 3, 5] },
  { id: 'voice',   name: 'Voice Wave',           domainLabel: 'Dental',        flow: 'call audio → structured transcript',    iconKey: 'Mic',       usesPlatformLayers: [1, 2, 3, 4] },
  { id: 'patient', name: 'Patient Call',         domainLabel: 'Healthcare',    flow: 'call → SOAP notes',                     iconKey: 'Phone',     usesPlatformLayers: [1, 2, 3, 5, 6] },
  { id: 'voucher', name: 'Voucher Stack',        domainLabel: 'Auto warranty', flow: 'handwritten → SAP vouchers',            iconKey: 'Receipt',   usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'build',   name: '+ Build your own',     domainLabel: 'Any workflow',  flow: '4 weeks to live',                       iconKey: 'Plus',      usesPlatformLayers: [1, 2, 3, 4, 5, 6] },
] as const;

export const PLATFORM_LAYERS: readonly { n: number; title: string; sub: string; tint: string }[] = [
  { n: 1, title: 'Sovereign runtime',       sub: 'On-prem · air-gapped · your hardware',            tint: 'rgba(138,245,192,0.12)' },
  { n: 2, title: 'Model router',            sub: 'Right model per task · small → frontier',          tint: 'rgba(245,168,212,0.12)' },
  { n: 3, title: 'Hallucination control',   sub: '4-layer citation · grounding · confidence gates',  tint: 'rgba(255,120,120,0.12)' },
  { n: 4, title: 'Enterprise connectors',   sub: 'SAP · Epic · Salesforce · DMS · Oracle',           tint: 'rgba(255,180,80,0.12)'  },
  { n: 5, title: 'Governance',              sub: 'Audit trail · approvals · RBAC · reversible',      tint: 'rgba(160,220,140,0.12)' },
  { n: 6, title: 'Security & compliance',   sub: 'GDPR · HIPAA · SOC 2 · ISO 27001 · PCI DSS',       tint: 'rgba(255,120,120,0.12)' },
] as const;

export type EngagementOption = {
  id: 'pilot' | 'evaluate' | 'architect';
  num: '01' | '02' | '03';
  label: string;
  pitch: string;
  href: string;
  ctaText: string;
};

export const ENGAGEMENT_OPTIONS: readonly EngagementOption[] = [
  { id: 'pilot',     num: '01', label: 'Scope your agent',      pitch: '4-week pilot. Fixed scope. One workflow live.',              href: '/pricing#pilot',             ctaText: 'Scope it' },
  { id: 'evaluate',  num: '02', label: 'Evaluate the platform', pitch: '30-day sandbox on your hardware. Bring your data.',         href: '/platform',                  ctaText: 'Start eval' },
  { id: 'architect', num: '03', label: 'Talk to an architect',  pitch: '30 min unfiltered. Regulatory, integrations, constraints.', href: 'mailto:hello@attentions.ai', ctaText: 'Book call' },
] as const;

// ============================================================
// Minimal runtime assertions (no test framework in repo).
// Thrown errors here would surface at dev-server boot. Feature
// flag: only runs in dev.
// ============================================================
if (import.meta.env.DEV) {
  // Assert BEATS cover [0, 1] without gaps or overlaps (except the 1.001 tail).
  for (let i = 0; i < BEATS.length - 1; i++) {
    if (BEATS[i].end !== BEATS[i + 1].start) {
      throw new Error(`BEATS gap/overlap between ${BEATS[i].id} and ${BEATS[i + 1].id}`);
    }
  }
  if (BEATS[0].start !== 0) throw new Error('BEATS must start at 0');
  if (BEATS[BEATS.length - 1].end < 1) throw new Error('BEATS must cover through 1.0');

  // Assert activeBeatForProgress boundary behavior
  const cases: Array<[number, BeatId]> = [
    [0.00, 'intro'],
    [0.05, 'logistics'],     // inclusive start
    [0.12, 'pharma'],        // exclusive end of logistics
    [0.47, 'invoice'],
    [0.82, 'build'],
    [0.83, 'synthesis'],
    [1.00, 'synthesis'],
  ];
  for (const [p, expected] of cases) {
    const got = activeBeatForProgress(p).id;
    if (got !== expected) {
      throw new Error(`activeBeatForProgress(${p}) = ${got}, expected ${expected}`);
    }
  }
}
```

**Step 2: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0. The `import.meta.env.DEV` block is tree-shaken out of the production build.

**Step 3: Verify assertions in dev**

```bash
npm run dev
```

Open `http://localhost:5173/`. If any BEATS or `activeBeatForProgress` assertion fails, the error surfaces in the browser console immediately at page load.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/data/agentPlatformStack.ts
git commit -m "$(cat <<'EOF'
feat(data): agent-platform-stack beats + content data

Typed data for the 14-beat scroll-scrub narrative: 6 industries
(with paired agents), 6 agents (5 live + build placeholder), 6
platform layers (reused from PlatformStack tokens), 3 engagement
options. BEATS array covers scrollYProgress [0, 1] with gap-free
ranges. activeBeatForProgress is a pure linear-scan helper.

Dev-only runtime assertions verify BEATS continuity and
boundary correctness in place of a test framework (repo has none).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Build `AgentPlatformStack` desktop component

**Files:**
- Create: `src/components/landing/AgentPlatformStack.tsx`

This is the largest task. Break implementation into clear substeps within the file:

**Step 1: Scaffold the file with imports + top-level component + placeholder sections**

```tsx
// src/components/landing/AgentPlatformStack.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import { FileText, GitBranch, Mic, Phone, Receipt, Plus, Sparkles, ArrowRight } from 'lucide-react';
import {
  BEATS,
  INDUSTRIES,
  AGENTS,
  PLATFORM_LAYERS,
  ENGAGEMENT_OPTIONS,
  activeBeatForProgress,
  type Beat,
  type BeatId,
} from '../../data/agentPlatformStack';
import { useSplitText } from '../../hooks/useSplitText';

const ICON_MAP = { FileText, GitBranch, Mic, Phone, Receipt, Plus } as const;

export default function AgentPlatformStack() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const reduced = useReducedMotion() ?? false;

  // Active beat — updated on scroll
  const [activeBeat, setActiveBeat] = useState<Beat>(BEATS[0]);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = activeBeatForProgress(p);
    if (next.id !== activeBeat.id) setActiveBeat(next);
  });

  // Tier parallax transforms
  const industryY = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['-48px', '48px']);
  const agentY    = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['-20px', '20px']);
  const layerY    = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['-8px',  '8px']);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: reduced ? 'auto' : '310vh',
        background: 'var(--wow-bg, #0a0e18)',
      }}
    >
      <div
        className="h-screen w-full overflow-hidden"
        style={{
          position: reduced ? 'static' : 'sticky',
          top: 0,
        }}
      >
        {/* Background layers */}
        <BackgroundLayers />

        {/* Desktop-only content — switches to mobile fallback below 1024px */}
        <div className="hidden lg:grid h-full grid-cols-[40fr_60fr]">
          <CopyPanel activeBeat={activeBeat} reduced={reduced} />
          <IllustrationPanel
            activeBeat={activeBeat}
            industryY={industryY}
            agentY={agentY}
            layerY={layerY}
            scrollYProgress={scrollYProgress}
          />
        </div>

        {/* Mobile placeholder (replaced in Phase 2c) */}
        <div className="lg:hidden h-full flex items-center justify-center p-8 text-center">
          <div className="text-[rgba(255,255,255,0.60)] text-[14px]">
            Mobile version ships in Phase 2c.
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundLayers() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* Teal radial pulse */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(138,245,192,0.04), transparent 70%)',
          animation: 'wowTealPulse 8s ease-in-out infinite',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <style>{`
        @keyframes wowTealPulse {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="wowTealPulse"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
```

**Step 2: Add the `CopyPanel` component** (append to the same file, before the default export)

```tsx
function CopyPanel({ activeBeat, reduced }: { activeBeat: Beat; reduced: boolean }) {
  const beatIdx = BEATS.findIndex((b) => b.id === activeBeat.id);
  const totalBeats = BEATS.length;
  const copy = getBeatCopy(activeBeat.id);
  const headlineRef = useSplitText<HTMLHeadingElement>([activeBeat.id, reduced]);

  return (
    <div className="h-full flex flex-col justify-center px-14 py-12 relative z-10">
      <motion.div
        key={activeBeat.id}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className="mb-6"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--wow-teal, #8af5c0)',
          }}
        >
          {copy.eyebrow}
        </div>

        <h2
          ref={headlineRef}
          className="mb-5 text-white"
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
          dangerouslySetInnerHTML={{ __html: copy.headline }}
        />

        <p
          className="max-w-[500px]"
          style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {copy.subline}
        </p>
      </motion.div>

      {/* Beat counter pinned to bottom of panel */}
      <div
        className="absolute bottom-8 left-14"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        {String(beatIdx + 1).padStart(2, '0')} / {String(totalBeats).padStart(2, '0')}
      </div>
    </div>
  );
}

// Beat copy table. Italic emphasis uses <em> tags since split-type handles
// inline elements correctly and the browser applies italic via CSS.
function getBeatCopy(id: BeatId): { eyebrow: string; headline: string; subline: string } {
  switch (id) {
    case 'intro':
      return {
        eyebrow: 'SOVEREIGN AI',
        headline: 'The sovereign AI stack. <em>Industry → agents → platform.</em> End to end.',
        subline: 'A complete picture of what runs in regulated enterprises today. Scroll through to see the industries we serve, the agents shipped in production, and the platform that holds them up.',
      };
    case 'synthesis':
      return {
        eyebrow: 'SOVEREIGN AI',
        headline: 'Platform. Agents. <em>Sovereign AI,</em> end-to-end.',
        subline: 'Three ways to start. Pick the commitment level that fits where you are.',
      };
    case 'build':
      return {
        eyebrow: 'AGENT · + BUILD YOUR OWN',
        headline: 'Your workflow. <em>Four weeks.</em> Production-live.',
        subline: 'Same platform. Same grounding. Same audit trail. We scope with you, build the agent, and ship it into your environment in 4 weeks — fixed.',
      };
    default: {
      const industry = INDUSTRIES.find((i) => i.id === id);
      if (industry) {
        return {
          eyebrow: industry.name.toUpperCase(),
          headline: industry.tagline,
          subline: getIndustrySubline(industry.id),
        };
      }
      const agent = AGENTS.find((a) => a.id === id);
      if (agent) {
        return {
          eyebrow: `AGENT · ${agent.name.toUpperCase()}`,
          headline: getAgentHeadline(agent.id),
          subline: getAgentSubline(agent.id),
        };
      }
      // Unreachable given BEATS typing
      return { eyebrow: '', headline: '', subline: '' };
    }
  }
}

// Industry sublines. Keep short — fits 2 lines at ~500px width at ~16px.
function getIndustrySubline(id: string): string {
  const map: Record<string, string> = {
    logistics:  'Handwritten invoices, 3-way matched, posted to SAP before your first coffee. Thomson Group UAE runs this on 14,200 vouchers every Monday.',
    pharma:     'Millions of lab reports distilled into a knowledge graph your researchers can query. Findings are cited and reversible — every claim traces back to source.',
    dental:     'Every multilingual patient call transcribed, coded, and synced to your EHR. No missed follow-ups, no coding backlog.',
    auto:       'Handwritten warranty claims read, validated against policy, posted to SAP — with a full citation trail your compliance team can replay.',
    healthcare: 'Patient history compressed into SOAP notes in seconds. Every inference cited back to the source document, reversible on review.',
    banking:    'KYC documents extracted, cross-verified, and stamped with a full audit trail. Regulators get the paper they need; analysts stop ctrl-F-ing PDFs.',
  };
  return map[id] ?? '';
}

function getAgentHeadline(id: string): string {
  const map: Record<string, string> = {
    invoice: 'Reads it. <em>Cites it.</em> Posts it.',
    pcr:     'Graphs millions of reports. <em>Cites every edge.</em>',
    voice:   'Hears the call. <em>Structures it.</em> Syncs it.',
    patient: '30-second SOAP. <em>Every claim sourced.</em>',
    voucher: 'Handwritten in. <em>SAP out.</em> Reversible.',
  };
  return map[id] ?? '';
}

function getAgentSubline(id: string): string {
  const map: Record<string, string> = {
    invoice: '88% no-touch. 6× ROI week 1. <30s per invoice. Running at Thomson Group UAE on 14,200 vouchers every Monday.',
    pcr:     'Lab reports → structured knowledge graph with cited edges. Reversible. Used across pharma research teams to shrink lit-review from weeks to hours.',
    voice:   'Multilingual call audio → structured transcripts with extracted action items. Dental clinic networks use this across 30+ languages.',
    patient: 'Patient call → SOAP note in 30 seconds. Every claim cited to source. Reversible until approval. Hospital systems use this for follow-up triage.',
    voucher: 'Warranty claims handwritten by dealerships → SAP vouchers with full audit trail. Auto aftermarket uses this at scale across 200+ dealer networks.',
  };
  return map[id] ?? '';
}
```

**Step 3: Add the `IllustrationPanel` component** (append to the same file)

```tsx
function IllustrationPanel({
  activeBeat,
  industryY,
  agentY,
  layerY,
  scrollYProgress,
}: {
  activeBeat: Beat;
  industryY: ReturnType<typeof useTransform<string, string>>;
  agentY: ReturnType<typeof useTransform<string, string>>;
  layerY: ReturnType<typeof useTransform<string, string>>;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Synthesis beat is special — renders the 3 engagement cards instead of the tiers.
  if (activeBeat.id === 'synthesis') {
    return (
      <div className="h-full flex items-center px-8 py-12 relative z-10">
        <div className="grid grid-cols-3 gap-4 w-full">
          {ENGAGEMENT_OPTIONS.map((opt, i) => (
            <EngagementCard key={opt.id} option={opt} delayIndex={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative px-8 py-12 flex flex-col gap-3 z-10">
      {/* Top — industries (30%) */}
      <motion.div style={{ y: industryY, height: '30%' }} className="flex gap-2">
        {INDUSTRIES.map((ind) => (
          <IndustryTile key={ind.id} industry={ind} isActive={activeBeat.id === ind.id} />
        ))}
      </motion.div>

      {/* Middle — agents (36%) */}
      <motion.div style={{ y: agentY, height: '36%' }} className="flex gap-3">
        {AGENTS.map((a) => (
          <AgentCard key={a.id} agent={a} isActive={activeBeat.id === a.id} />
        ))}
      </motion.div>

      {/* Bottom — platform layers (34%) */}
      <motion.div style={{ y: layerY, height: '34%' }} className="flex flex-col gap-1.5 justify-end">
        {PLATFORM_LAYERS.map((layer) => (
          <PlatformLayerBand key={layer.n} layer={layer} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </div>
  );
}

function IndustryTile({ industry, isActive }: { industry: typeof INDUSTRIES[number]; isActive: boolean }) {
  return (
    <motion.div
      className="relative flex-1 rounded-[14px] overflow-hidden"
      animate={{
        scale: isActive ? 1.0 : 0.88,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        outline: isActive ? '2px solid rgba(138,245,192,0.6)' : '2px solid transparent',
        boxShadow: isActive ? '0 0 40px rgba(138,245,192,0.15)' : 'none',
      }}
    >
      <img
        src={industry.photoUrl}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        style={{
          filter: `grayscale(${isActive ? '0%' : '60%'}) contrast(1.05) brightness(0.85)`,
          transition: 'filter 500ms ease',
        }}
      />
      {/* Bottom gradient + label */}
      <div
        className="absolute inset-x-0 bottom-0 p-2"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
        }}
      >
        <div
          className="text-white text-[11px] font-bold uppercase tracking-wider leading-tight"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {industry.name}
        </div>
      </div>
    </motion.div>
  );
}

function AgentCard({ agent, isActive }: { agent: typeof AGENTS[number]; isActive: boolean }) {
  const Icon = ICON_MAP[agent.iconKey] ?? Plus;
  const isBuildPlaceholder = agent.id === 'build';

  return (
    <motion.div
      className="relative flex-1 rounded-[14px] p-3 flex flex-col gap-1.5"
      animate={{
        scale: isActive ? 1.08 : 0.94,
        opacity: isActive || isBuildPlaceholder ? 1 : 0.55,
      }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: isBuildPlaceholder
          ? '2px dashed rgba(138,245,192,0.5)'
          : `2px solid ${isActive ? 'rgba(138,245,192,0.7)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isActive ? '0 0 40px rgba(138,245,192,0.15)' : 'none',
      }}
    >
      <div className="flex items-center justify-between">
        <Icon size={18} style={{ color: isActive || isBuildPlaceholder ? '#8af5c0' : 'rgba(255,255,255,0.55)' }} />
        {isActive && !isBuildPlaceholder && (
          <MotionPreview agentId={agent.id} />
        )}
        {isBuildPlaceholder && (
          <Sparkles size={12} style={{ color: 'rgba(138,245,192,0.7)' }} className="wow-sparkle" />
        )}
      </div>
      <div
        className="text-white text-[12px] font-bold leading-tight"
        style={{ letterSpacing: '-0.01em' }}
      >
        {agent.name}
      </div>
      <div className="text-[11px] text-[rgba(255,255,255,0.50)] leading-tight">
        {agent.flow}
      </div>
    </motion.div>
  );
}

function MotionPreview({ agentId }: { agentId: string }) {
  // Tiny 40x20 preview. Each agent gets its own signature animated shape.
  // Reuses concepts from src/components/motions/* without importing the full stories.
  const color = '#8af5c0';
  switch (agentId) {
    case 'invoice':
      return (
        <svg width={40} height={20} aria-hidden>
          <rect x="2" y="4" width="36" height="12" rx="2" fill="rgba(138,245,192,0.08)" stroke={color} strokeWidth="0.8" />
          <rect x="4" y="4" width="36" height="2" fill={color} opacity="0.4">
            <animate attributeName="y" from="4" to="14" dur="1.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case 'pcr':
      return (
        <svg width={40} height={20} aria-hidden>
          <circle cx="8" cy="10" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <line x1="8" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <circle cx="20" cy="10" r="2" fill={color} opacity="0.7" />
          <line x1="20" y1="10" x2="32" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <circle cx="32" cy="10" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'voice':
      return (
        <svg width={40} height={20} aria-hidden>
          {[4, 10, 16, 22, 28, 34].map((x, i) => (
            <rect key={i} x={x} y="6" width="2" height="8" fill={color} opacity="0.7">
              <animate attributeName="height" values={`4;${8 + (i % 3) * 3};4`} dur={`${1 + (i % 3) * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`8;${6 - (i % 3)};8`} dur={`${1 + (i % 3) * 0.2}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </svg>
      );
    case 'patient':
      return (
        <svg width={40} height={20} aria-hidden>
          <line x1="2" y1="10" x2="38" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          {[8, 16, 24, 32].map((x, i) => (
            <circle key={i} cx={x} cy="10" r="1.5" fill={color}>
              <animate attributeName="r" values="1.5;3;1.5" dur="1.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );
    case 'voucher':
      return (
        <svg width={40} height={20} aria-hidden>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={8 + i * 8} y={3 + i * 1.5} width="18" height="10" rx="1" fill="rgba(138,245,192,0.08)" stroke={color} strokeWidth="0.6">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </svg>
      );
    default:
      return null;
  }
}

function PlatformLayerBand({
  layer,
  scrollYProgress,
}: {
  layer: typeof PLATFORM_LAYERS[number];
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Layer N appears between progress [(N-1)*0.05, N*0.05] — all 6 visible by 0.30
  const start = (layer.n - 1) * 0.05;
  const end = layer.n * 0.05;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      className="flex-1 rounded-[10px] px-3 py-2 flex items-center gap-3"
      style={{
        opacity,
        background: layer.tint,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--mono)' }}
      >
        {String(layer.n).padStart(2, '0')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-[12px] font-bold leading-tight">{layer.title}</div>
        <div className="text-[rgba(255,255,255,0.55)] text-[10.5px] leading-tight mt-0.5 truncate">{layer.sub}</div>
      </div>
    </motion.div>
  );
}

function EngagementCard({ option, delayIndex }: { option: typeof ENGAGEMENT_OPTIONS[number]; delayIndex: number }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.a
      href={option.href}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduced ? 0 : 0.5 + delayIndex * 0.12, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group rounded-[20px] p-6 flex flex-col gap-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderTop: '2px solid rgba(138,245,192,0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ background: 'rgba(138,245,192,0.12)', color: '#8af5c0', fontFamily: 'var(--mono)' }}
        >
          {option.num}
        </div>
        <div
          className="text-[11px] font-bold uppercase tracking-wider text-[rgba(255,255,255,0.55)]"
          style={{ fontFamily: 'var(--mono)' }}
        >
          Option
        </div>
      </div>
      <div
        className="text-white text-[22px] font-medium leading-tight"
        style={{ fontFamily: 'var(--serif)' }}
      >
        {option.label}
      </div>
      <div className="text-[14px] text-[rgba(255,255,255,0.70)] flex-1 leading-snug">
        {option.pitch}
      </div>
      <div
        className="flex items-center gap-1.5 mt-2 text-[13px] font-bold"
        style={{ color: '#8af5c0' }}
      >
        {option.ctaText}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.a>
  );
}
```

**Step 4: Verify the file compiles**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0. If TypeScript complains about `useTransform` generic types on the IllustrationPanel props, relax to `ReturnType<typeof useTransform<any, any>>` or accept `MotionValue<string>` explicitly.

**Step 5: No commit yet** — component is not wired into any page, so it won't render. Commit happens in Task 6 combined with the landing-page wiring.

---

## Task 6: Wire `AgentPlatformStack` into landing page + remove 3 displaced sections

**Files:**
- Modify: `src/pages/LandingPage.tsx`
- Reference: `src/components/ParallaxHero.tsx` (no changes, just stays importable for other pages)

**Step 1: Update `src/pages/LandingPage.tsx`**

Replace the entire file with:

```tsx
import { MotionConfig } from 'framer-motion';
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import IsThisYou from '../components/IsThisYou';
import AgentPlatformStack from '../components/landing/AgentPlatformStack';
import ContextKing from '../components/landing/ContextKing';
import GTMPath from '../components/GTMPath';
import LandingCloser from '../components/landing/LandingCloser';

/**
 * LandingPage v5 — wow-section rhythm.
 *
 * Story arc:
 *   Hero → ClientsStrip → IsThisYou → AgentPlatformStack (centerpiece) →
 *   ContextKing → GTMPath → LandingCloser
 *
 * Design: docs/plans/2026-04-18-agent-platform-stack-design.md
 */
export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <HeroAboveFold />
        <ClientsStrip />
        <IsThisYou />
        <AgentPlatformStack />
        <ContextKing />
        <GTMPath />
        <LandingCloser />
      </main>
    </MotionConfig>
  );
}
```

**Removed imports:** `ParallaxHero`, `AgentFamilies` (from `../components/landing/AgentFamilies`). Removed JSX: 2× `<ParallaxHero>` invocations and 1× `<AgentFamilies />`.

**Step 2: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 3: Visually verify the desktop wow section**

```bash
npm run dev
```

Open `http://localhost:5173/` at 1440×900. Scroll down past `IsThisYou`. Expected:
- Dark navy section appears with teal-tinted ambient pulse
- Left 40%: "SOVEREIGN AI" eyebrow + headline "The sovereign AI stack. Industry → agents → platform. End to end." + subline + "01 / 14" beat counter
- Right 60%: 3 tiers visible — 6 industry photo tiles (top, active=logistics scaled up), 6 agent cards (middle, none active yet), 6 platform layers (bottom, progressively filling as you scroll)
- As you continue scrolling, beats advance: industry highlight moves through logistics → pharma → dental → auto → healthcare → banking, then agents invoice → pcr → voice → patient → voucher → build, ending in synthesis (engagement cards).
- Beat counter updates 01 → 02 → ... → 14
- After synthesis beat ends, section unpins and `ContextKing` appears below

At viewport < 1024px: placeholder text "Mobile version ships in Phase 2c" visible. That's expected for this phase.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/landing/AgentPlatformStack.tsx src/pages/LandingPage.tsx
git commit -m "$(cat <<'EOF'
feat(landing): agent-platform-stack wow section (desktop)

14-beat scroll-scrub centerpiece: industries → agents → platform
layers, framed as Sovereign AI, ending in 3 engagement CTAs.
Replaces the middle 3 landing sections (2x ParallaxHero +
AgentFamilies) on ≥ 1024px viewports. Mobile shows a placeholder
pending Phase 2c.

Uses framer-motion useScroll + CSS sticky for the pin/scrub (GSAP
ScrollTrigger swap deferred — framer-motion's approach works at
this scale and keeps the codebase simpler). Lenis site-wide from
Phase 2a drives the scroll smoothness.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

> **Implementation note for the implementer:** The design doc spec'd GSAP ScrollTrigger, but the actual implementation in Task 5 uses framer-motion's `useScroll` + CSS sticky — which achieves the same result with less surface area since GSAP is already imported by other components (`CinematicFooter`, `PageCinematicWrap`) but doesn't need to be pulled into this one. The commit message is honest about this choice; it's a smaller-footprint substitution that delivers the same user-facing behavior. If you prefer the spec-literal GSAP path, call that out and rework Task 5 to use `ScrollTrigger.create({ trigger, pin, scrub: 1 })` and `gsap.fromTo` for each transform — structurally identical, just implemented on GSAP's engine instead of framer-motion's.

---

## Task 7: Desktop QA pass

**Files:** none (verification-only)

**Step 1: Desktop verification at 3 widths**

`npm run dev`. For each width, load `http://localhost:5173/`, scroll to the wow section, observe:

- **1920×1080**: copy panel spacious, illustration panel not cramped. Industry tiles read. Agent card text is readable. Platform layer titles readable.
- **1440×900**: primary dev target. All text readable at ≥13px. Beat transitions feel smooth (60fps in DevTools Performance tab during a scroll recording).
- **1280×800**: narrowest supported desktop. Copy panel is still readable. Illustration panel tile count (6) still fits horizontally without cramping.

**Step 2: Beat-by-beat sanity check**

Scroll slowly. For each of the 14 beats, verify:
- Correct eyebrow renders (SOVEREIGN AI or industry name or `AGENT · NAME`)
- Correct headline renders with italic emphasis where spec'd
- Correct subline renders
- Correct illustration element highlights (active industry tile, active agent card, progressive platform layers)
- Beat counter matches (01 for intro, 02-07 for industries, 08-13 for agents, 14 for synthesis)
- No flicker, no double-active-frame, no missing beats

**Step 3: Reduced-motion check**

DevTools → Rendering → `prefers-reduced-motion: reduce`. Reload. Expected:
- Section NO LONGER pins. Renders as a static 100vh block.
- All tier parallax transforms = 0 (tiers don't shift as you scroll).
- Headline cross-fade disabled (visible immediately on section entry).
- Per-beat content cross-fade still triggered by scroll state but without motion — content just swaps abruptly. Acceptable for this phase; Phase 2c can add a degraded IntersectionObserver-based fallback per beat.

**Step 4: Lighthouse performance**

DevTools → Lighthouse → Mobile → Performance only. Run on `/`. Expected: score within 3 points of the pre-Phase-2a baseline. If regressed more than 3 points, investigate the common culprits:
- Industry photo loading: confirm all 6 `<img>` have `loading="lazy"`, `decoding="async"`, and sized correctly
- `will-change` overuse: remove from elements not actually animating
- Lenis rAF loop: confirm no excessive frame work

**Step 5: No commit** — verification-only. Any fixes land as a polish commit before Phase 2c.

---

# Phase 2c — Mobile fallback + polish

Three tasks. Ships the mobile-viewport version of the wow section.

## Task 8: Build `AgentPlatformStackMobile`

**Files:**
- Create: `src/components/landing/AgentPlatformStackMobile.tsx`

**Step 1: Create the mobile component**

```tsx
// src/components/landing/AgentPlatformStackMobile.tsx
import { useInView } from '../../hooks/useInView';
import { FileText, GitBranch, Mic, Phone, Receipt, Plus, ArrowRight, Sparkles } from 'lucide-react';
import {
  INDUSTRIES,
  AGENTS,
  PLATFORM_LAYERS,
  ENGAGEMENT_OPTIONS,
} from '../../data/agentPlatformStack';

const ICON_MAP = { FileText, GitBranch, Mic, Phone, Receipt, Plus } as const;

export default function AgentPlatformStackMobile() {
  return (
    <section
      className="relative"
      style={{ background: 'var(--wow-bg, #0a0e18)' }}
    >
      <IntroBlock />
      <IndustriesStrip />
      <AgentsStack />
      <PlatformStack />
      <SynthesisBlock />
      <EngagementStack />
    </section>
  );
}

function IntroBlock() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="px-6 py-20 max-w-[560px] mx-auto">
      <div
        className={`mb-5 opacity-0 transition-opacity duration-700 ${inView ? 'opacity-100' : ''}`}
        style={{
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8af5c0',
        }}
      >
        SOVEREIGN AI
      </div>
      <h2
        className={`text-white mb-5 opacity-0 translate-y-3 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : ''}`}
        style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em' }}
      >
        The sovereign AI stack. <em>Industry → agents → platform.</em> End to end.
      </h2>
      <p
        className={`text-[rgba(255,255,255,0.65)] text-[15px] opacity-0 transition-opacity duration-700 delay-200 ${inView ? 'opacity-100' : ''}`}
      >
        A complete picture. Scroll through to see the industries we serve, the agents shipped in production, and the platform that holds them up.
      </p>
    </div>
  );
}

function IndustriesStrip() {
  return (
    <div className="py-10">
      <div
        className="px-6 mb-4"
        style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}
      >
        INDUSTRIES
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth px-6 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.id}
            className="relative snap-start flex-shrink-0 rounded-[14px] overflow-hidden"
            style={{ width: 260, height: 180 }}
          >
            <img src={ind.photoUrl} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ filter: 'grayscale(30%) contrast(1.05) brightness(0.85)' }} />
            <div
              className="absolute inset-x-0 bottom-0 p-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
            >
              <div className="text-white text-[12px] font-bold uppercase tracking-wider leading-tight mb-1" style={{ fontFamily: 'var(--mono)' }}>
                {ind.name}
              </div>
              <div className="text-[rgba(255,255,255,0.85)] text-[13px] leading-snug">
                {ind.tagline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsStack() {
  return (
    <div className="px-6 py-10 max-w-[560px] mx-auto">
      <div className="mb-4" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}>
        AGENTS · 5 LIVE + BUILD YOURS
      </div>
      <div className="flex flex-col gap-3">
        {AGENTS.map((agent) => {
          const Icon = ICON_MAP[agent.iconKey] ?? Plus;
          const isBuild = agent.id === 'build';
          return (
            <div
              key={agent.id}
              className="rounded-[14px] p-4 flex items-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: isBuild ? '2px dashed rgba(138,245,192,0.5)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(138,245,192,0.1)' }}>
                <Icon size={18} color="#8af5c0" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[14px] font-bold leading-tight">{agent.name}</div>
                <div className="text-[rgba(255,255,255,0.55)] text-[12px] mt-1 leading-snug">{agent.flow}</div>
              </div>
              {isBuild && <Sparkles size={16} color="#8af5c0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlatformStack() {
  return (
    <div className="px-6 py-10 max-w-[560px] mx-auto">
      <div className="mb-4" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}>
        PLATFORM · SIX SHARED LAYERS
      </div>
      <div className="flex flex-col gap-2">
        {PLATFORM_LAYERS.map((layer) => (
          <div
            key={layer.n}
            className="rounded-[10px] p-3 flex items-center gap-3"
            style={{ background: layer.tint, border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--mono)' }}
            >
              {String(layer.n).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[13px] font-bold leading-tight">{layer.title}</div>
              <div className="text-[rgba(255,255,255,0.55)] text-[11.5px] leading-snug mt-0.5">{layer.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SynthesisBlock() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="px-6 py-14 max-w-[560px] mx-auto">
      <div
        className={`mb-4 opacity-0 transition-opacity duration-700 ${inView ? 'opacity-100' : ''}`}
        style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}
      >
        SOVEREIGN AI
      </div>
      <h3
        className={`text-white mb-2 opacity-0 translate-y-3 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : ''}`}
        style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em' }}
      >
        Platform. Agents. <em>Sovereign AI,</em> end-to-end.
      </h3>
      <p className={`text-[rgba(255,255,255,0.65)] text-[14px] opacity-0 transition-opacity duration-700 delay-200 ${inView ? 'opacity-100' : ''}`}>
        Three ways to start. Pick the commitment level that fits where you are.
      </p>
    </div>
  );
}

function EngagementStack() {
  return (
    <div className="px-6 pb-20 max-w-[560px] mx-auto flex flex-col gap-3">
      {ENGAGEMENT_OPTIONS.map((opt) => (
        <a
          key={opt.id}
          href={opt.href}
          className="group rounded-[20px] p-5 flex flex-col gap-2"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderTop: '2px solid rgba(138,245,192,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ background: 'rgba(138,245,192,0.12)', color: '#8af5c0', fontFamily: 'var(--mono)' }}
            >
              {opt.num}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[rgba(255,255,255,0.55)]" style={{ fontFamily: 'var(--mono)' }}>
              Option
            </div>
          </div>
          <div className="text-white text-[18px] font-medium" style={{ fontFamily: 'var(--serif)' }}>
            {opt.label}
          </div>
          <div className="text-[13px] text-[rgba(255,255,255,0.70)] leading-snug">
            {opt.pitch}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[13px] font-bold" style={{ color: '#8af5c0' }}>
            {opt.ctaText}
            <ArrowRight size={13} />
          </div>
        </a>
      ))}
    </div>
  );
}
```

**Step 2: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 3: No commit yet** — component isn't wired into `AgentPlatformStack` yet (Task 9 does that). Keeping layout + wiring atomic.

---

## Task 9: Wire mobile fallback into main component

**Files:**
- Modify: `src/components/landing/AgentPlatformStack.tsx` — replace the "Mobile version ships in Phase 2c" placeholder with the real mobile component

**Step 1: Add import to `AgentPlatformStack.tsx`**

At the top of the file:

```tsx
import AgentPlatformStackMobile from './AgentPlatformStackMobile';
```

**Step 2: Replace the placeholder section**

Find:

```tsx
{/* Mobile placeholder (replaced in Phase 2c) */}
<div className="lg:hidden h-full flex items-center justify-center p-8 text-center">
  <div className="text-[rgba(255,255,255,0.60)] text-[14px]">
    Mobile version ships in Phase 2c.
  </div>
</div>
```

Replace with:

```tsx
{/* Mobile fallback (< 1024px) */}
<div className="lg:hidden">
  <AgentPlatformStackMobile />
</div>
```

**Step 3: Handle the desktop container sizing on mobile**

On mobile, the outer `section`'s `height: '310vh'` is wrong — the mobile component has its own sections and doesn't pin. Fix by gating:

Find the outer `<section>` style:

```tsx
style={{
  height: reduced ? 'auto' : '310vh',
  background: 'var(--wow-bg, #0a0e18)',
}}
```

Replace with responsive logic. Simplest: use CSS media query, not inline style:

```tsx
className="relative wow-section-outer"
style={{ background: 'var(--wow-bg, #0a0e18)' }}
```

And add to the existing inline `<style>{...}</style>` block inside `BackgroundLayers` (or create one in the main component):

```css
.wow-section-outer { height: auto; }
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .wow-section-outer { height: 310vh; }
}
```

Similarly the `h-screen` inner sticky div should only apply desktop:

Find:
```tsx
<div
  className="h-screen w-full overflow-hidden"
  style={{
    position: reduced ? 'static' : 'sticky',
    top: 0,
  }}
>
```

Replace:
```tsx
<div
  className="w-full overflow-hidden h-auto lg:h-screen"
  style={{
    position: reduced ? 'static' : 'sticky',
    top: 0,
  }}
>
```

Note: `position: sticky` with `h-auto` does nothing useful on mobile — the content flows naturally — so this collapses cleanly.

**Step 4: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 5: Visually verify both desktop and mobile**

```bash
npm run dev
```

At 1440px: desktop layout unchanged — pinned, scroll-scrub, 14 beats. Scroll past section reveals `ContextKing`.

Toggle DevTools device toolbar → iPhone 15 Pro. Expected: desktop hidden, mobile renders. Six sub-sections: intro → industries strip → agents stack → platform stack → synthesis headline → 3 engagement cards. No pinning, native scroll, content reads naturally top-to-bottom.

**Step 6: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/landing/AgentPlatformStack.tsx src/components/landing/AgentPlatformStackMobile.tsx
git commit -m "$(cat <<'EOF'
feat(landing): agent-platform-stack mobile fallback

Below 1024px, the wow section renders as 6 stacked sub-sections
(intro → industries strip → agents stack → platform stack →
synthesis → engagement cards). No pin, no parallax, no scroll-scrub
— native mobile scroll with IntersectionObserver-driven fade-ins.
Same content as desktop, paced for the device.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Cross-device QA pass

**Files:** none (verification-only)

**Step 1: Phone viewports**

DevTools device toolbar → iPhone SE (375×667). Load `/`. Scroll to wow section. Expected:
- Intro block readable, headline doesn't overflow
- Industries strip: horizontal swipe works, snap-to-start on each tile, all 6 tiles accessible
- Agents stack: all 6 cards render, icons visible
- Platform stack: 6 layer bands render
- Synthesis headline readable
- Engagement cards: 3 stacked vertically, CTAs tappable

DevTools → iPhone 15 Pro (390×844). Same checklist. Expected: no overlap, no content clipping.

**Step 2: Tablet viewports**

DevTools → iPad Mini (768×1024 portrait). Expected: mobile fallback renders (below 1024px breakpoint). Layout is wider than phone but same 6-section structure.

DevTools → iPad Pro 11" (834×1194 portrait). Still mobile fallback. Readable.

DevTools → iPad Pro 11" landscape (1194×834). Should switch to desktop layout (above 1024px breakpoint). Pinning works. If feels cramped, consider if the 1024 threshold is right — but default to shipping as-spec and only adjusting based on real user feedback.

**Step 3: Android**

DevTools → Pixel 7 (412×915). Same checklist as phones. Expected: no Chrome-Android-specific rendering issues.

**Step 4: Viewport resize**

At 1440px desktop, resize the browser window down past 1024px while scrolled into the wow section. Expected: component switches render branches cleanly. Flicker is acceptable for this rare action — no need to add debouncing unless it happens frequently in practice.

**Step 5: Commit any polish fixes found**

If Step 1-4 surfaced issues (text overflow, misaligned cards, color contrast fails), commit per fix as atomic polish commits. Example:

```bash
git add src/components/landing/AgentPlatformStackMobile.tsx
git commit -m "polish(landing): tighten iPhone SE wow section margins"
```

**Step 6: Final ship report**

Produce a short report:
- Commits landed across Phase 2 (Tasks 1-10)
- Bundle size delta (expected: +18 kB gzip for Lenis + split-type, GSAP was already in bundle)
- Line count delta (created files: `AgentPlatformStack.tsx` ~500 lines, `AgentPlatformStackMobile.tsx` ~200 lines, `agentPlatformStack.ts` ~130 lines, `useSplitText.ts` ~25 lines, `lenis.ts` ~25 lines)
- Files modified: `LandingPage.tsx` (-30 lines content), `main.tsx` (+1 line), `index.css` (+10 lines), `package.json` (+2 deps)
- Verification: build green, desktop verified, mobile verified, Lighthouse within tolerance
- Known deferred items (e.g., GSAP ScrollTrigger-literal implementation deferred per Task 5/6 implementation note, any polish noted during QA but not yet landed)

---

## Summary

| Task | What ships | Commit |
|------|-----------|--------|
| 1 | Lenis singleton + site-wide CSS | 1 |
| 2 | `useSplitText` hook | 1 |
| 3 | Phase 2a regression QA | 0 |
| 4 | Data model + BEATS helper | 1 |
| 5 | `AgentPlatformStack.tsx` component | 0 (landed with Task 6) |
| 6 | Wire into landing, remove 3 sections | 1 |
| 7 | Desktop QA pass | 0 |
| 8 | Mobile component built | 0 (landed with Task 9) |
| 9 | Mobile fallback wired in | 1 |
| 10 | Cross-device QA + polish | 0–1 |

**Total: 5–6 commits across 3 atomic phase-merges.** Each phase revertible independently.

**Files created: 5** (`lenis.ts`, `useSplitText.ts`, `agentPlatformStack.ts`, `AgentPlatformStack.tsx`, `AgentPlatformStackMobile.tsx`)

**Files modified: 4** (`main.tsx`, `index.css`, `LandingPage.tsx`, `package.json`)

**New npm deps: 2** (`@studio-freight/lenis`, `split-type`) — ~18 kB gzip new

## Non-goals (YAGNI guard — do not do any of these)

- No A/B testing framework
- No animation config panel / admin UI
- No CMS-driven beats (content hardcoded in `agentPlatformStack.ts`)
- No per-beat URL hash anchors
- No dynamic industry photo loading from backend
- No beat skipping / autoplay / play-pause controls
- No i18n / multi-language
- No analytics events beyond 3 engagement card clicks (those are just regular `<a href>` — GA4 picks them up automatically if wired)
- No GSAP ScrollTrigger migration (Task 5 uses framer-motion's `useScroll` + CSS sticky; spec-literal GSAP path is a separate refactor if the framer-motion approach shows issues in production)

## If something goes wrong

- **Build fails:** revert the offending task's commit with `git revert HEAD`; re-read the task spec and retry
- **Lenis breaks an existing smooth-scroll behavior:** revert Phase 2a by removing the import from `main.tsx` and deleting `src/lib/lenis.ts` — site reverts to native scroll instantly
- **Wow section looks broken:** revert the `LandingPage.tsx` change (re-add the 3 displaced sections); `AgentPlatformStack.tsx` stays orphaned in the repo, fixable in a follow-up
- **Mobile fallback flashes on resize:** accept for now; a `useState` + `matchMedia` listener with 200ms debounce can be added in a polish commit
- **Lighthouse regresses >3 points:** dynamic-import `AgentPlatformStack` behind `React.lazy(() => import(...))` with Suspense boundary; defers ~400 lines of JS until section scrolls into proximity
