# Platform Page v2 — Architecture-First Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the Platform page around the 6 shared layers as the architectural spine. Remove 3 redundant helper components (SectionIntro, CurveDivider, PlatformCard/tabs), add 3 ParallaxHero dividers + a closing manifesto with a blue glass orb, and trim the "why a platform" pitch from 3,400px of stacking cards to a single 600px 2-column section.

**Architecture:** 3 new components (`PlatformWhySection`, `PlatformCloser`) + full rewrite of `PlatformPage.tsx`. Reuses existing components (`PageHero`, `PlatformStack`, `PlatformStory`, `FlowDiagram`, `ParallaxHero`, `HeroOrb`) with no changes to them. `PlatformStory` is refactored to export its sub-sections individually so the platform page can pick which ones to render (omits `ContextMatters` since it duplicates landing's ContextKing).

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS, framer-motion, Three.js (via existing `HeroOrb`), existing `useInView` hook. No new npm packages.

**Verification:** No unit tests in this project. Each task verified via `npm run build` (zero errors) and visual inspection at `http://localhost:5174/platform`.

---

## Task 1: Refactor `PlatformStory.tsx` to export sub-sections individually

Currently `PlatformStory.tsx` has a default export that renders all 5 sub-sections in a hardcoded order. We need to export each sub-section so the platform page can pick which ones to render (omitting `ContextMatters` since landing's ContextKing covers that ground better).

**Files:**
- Modify: `src/components/PlatformStory.tsx`

**Step 1: Read the current file structure**

```bash
cd /Users/puneet/website-attentions-miro/app
grep -n "^function \|^export" src/components/PlatformStory.tsx
```

Expected: You should see a default export `PlatformStory` and 5 internal functions: `AgentFamilies`, `ContextMatters`, `HallucinationControl`, `DeterminismProof`, `ScaleAtVolume`.

**Step 2: Add named exports for each sub-section**

Find each sub-section function (`function AgentFamilies()`, `function ContextMatters()`, etc.) and change them to `export function ...`:

```tsx
// Before:
function AgentFamilies() { ... }
function ContextMatters() { ... }
function HallucinationControl() { ... }
function DeterminismProof() { ... }
function ScaleAtVolume() { ... }

// After:
export function AgentFamilies() { ... }
export function ContextMatters() { ... }
export function HallucinationControl() { ... }
export function DeterminismProof() { ... }
export function ScaleAtVolume() { ... }
```

Keep the default export `export default function PlatformStory()` intact — it still renders all 5 in the original order. Other callers (if any) are unaffected.

**Step 3: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built`, zero errors.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "refactor(platform-story): export sub-sections individually"
```

---

## Task 2: Create `PlatformWhySection.tsx` — "Why a platform" manifesto replacement

Replaces the existing 3-tab `PlatformCard` (3,400px tall) with a single compact 2-column section (~600px).

**Files:**
- Create: `src/components/landing/PlatformWhySection.tsx`

**Step 1: Create the file**

Write the full content:

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * PlatformWhySection — replaces the 3-tab PlatformCard on the Platform page.
 * Two-column layout: manifesto text on the left, before/after glyph on the right.
 * ~600px tall instead of the previous 3,400px.
 */

export default function PlatformWhySection() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s1)', padding: 'clamp(80px, 12vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: manifesto text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="micro-upper mb-5" style={{ color: 'rgba(0,0,0,0.55)' }}>
              Why a platform
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#000000',
              }}
            >
              Prompt-wrapping makes demos.{' '}
              <span style={{ fontStyle: 'italic' }}>A platform ships agents.</span>
            </h2>
            <p
              className="max-w-[520px]"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              Six teams stitching prompts into five different LLMs isn&rsquo;t a strategy &mdash;
              it&rsquo;s a bill. One sovereign base. Six shared layers. Every new agent
              compounds on what the last one built.
            </p>
          </motion.div>

          {/* Right: before/after glyph */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <BeforeAfterGlyph />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function BeforeAfterGlyph() {
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full max-w-[520px] h-auto">
      {/* LEFT side: BEFORE — 5 scattered disconnected circles */}
      <g>
        <text x="100" y="40" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="0.1em" fill="rgba(0,0,0,0.50)">BEFORE</text>
        <text x="100" y="58" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(0,0,0,0.40)">5 teams · 5 stacks</text>

        {[
          { cx: 55, cy: 120 }, { cx: 140, cy: 115 }, { cx: 95, cy: 175 },
          { cx: 45, cy: 225 }, { cx: 155, cy: 235 },
        ].map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r="22" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
        ))}

        <text x="100" y="295" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="14" fontStyle="italic" fill="rgba(0,0,0,0.55)">disconnected</text>
      </g>

      {/* Arrow */}
      <g transform="translate(215, 175)">
        <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
        <polygon points="40,0 34,-5 34,5" fill="rgba(0,0,0,0.45)" />
      </g>

      {/* RIGHT side: AFTER — 5 circles stacked on one base */}
      <g transform="translate(280, 0)">
        <text x="100" y="40" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="0.1em" fill="#000000">AFTER</text>
        <text x="100" y="58" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(0,0,0,0.45)">1 base · shared</text>

        {/* 5 connected circles */}
        {[
          { cx: 45, cy: 125 }, { cx: 80, cy: 100 }, { cx: 120, cy: 100 },
          { cx: 155, cy: 125 }, { cx: 100, cy: 80 },
        ].map((c, i) => (
          <g key={i}>
            {/* connector to base */}
            <line x1={c.cx} y1={c.cy} x2="100" y2="215" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            <circle cx={c.cx} cy={c.cy} r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.8" />
          </g>
        ))}

        {/* Base platform */}
        <rect x="25" y="215" width="150" height="36" rx="8" fill="#000000" />
        <text x="100" y="238" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="700" fill="#ffffff" letterSpacing="0.08em">ARTIGEN</text>

        <text x="100" y="295" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="14" fontStyle="italic" fill="#000000">6 layers · shared</text>
      </g>
    </svg>
  );
}
```

**Step 2: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built`, zero errors.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/landing/PlatformWhySection.tsx
git commit -m "feat(platform): add PlatformWhySection with before/after glyph"
```

---

## Task 3: Create `PlatformCloser.tsx` — closing manifesto with blue orb

Closing section mirroring the landing page's manifesto + orb pattern, but with a blue glass orb matching the platform page's accent color.

**Files:**
- Create: `src/components/landing/PlatformCloser.tsx`

**Step 1: Create the file**

Write the full content:

```tsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * PlatformCloser — Platform page closing manifesto.
 * Blue glass orb on the left, "Six layers. One base. Every agent plugs in." manifesto on the right.
 * Mirrors the landing page's OwnershipBand orb + closer pattern.
 */

export default function PlatformCloser() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(96px, 14vw, 160px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Blue orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="relative"
              style={{ width: 'clamp(280px, 32vw, 420px)', height: 'clamp(280px, 32vw, 420px)' }}
            >
              <Suspense fallback={null}>
                <HeroOrb
                  baseColor="#1a3a8f"
                  attenuationColor="#5b76fe"
                  envColor="#a0b0e0"
                  attenuationDistance={0.9}
                  breatheAmp={0.14}
                  floatAmp={0.25}
                />
              </Suspense>
            </div>
          </motion.div>

          {/* Manifesto text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div className="micro-upper mb-6" style={{ color: 'rgba(0,0,0,0.55)' }}>
              The thesis
            </div>
            <h2
              className="mb-8"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#000000',
              }}
            >
              Six layers. One base.{' '}
              <span style={{ fontStyle: 'italic' }}>Every agent plugs in.</span>
            </h2>
            <p
              className="max-w-[560px] mx-auto md:mx-0"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              The platform isn&rsquo;t the product. The platform is what makes the product
              keep shipping &mdash; one agent today, five next quarter, at the same cost of
              ownership.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```

**Step 2: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built`, zero errors.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/landing/PlatformCloser.tsx
git commit -m "feat(platform): add PlatformCloser with blue glass orb"
```

---

## Task 4: Full rewrite of `PlatformPage.tsx` with new structure

Replace the existing `PlatformPage.tsx` entirely with the new architecture-first structure: hero → why platform → parallax 1 → 6 layers → parallax 2 → 3 deep dives → parallax 3 → agent families → flow → closer.

**Files:**
- Modify: `src/pages/PlatformPage.tsx` (full rewrite)

**Step 1: Replace file content**

Write the full new content:

```tsx
import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import PlatformStack from '../components/PlatformStack';
import FlowDiagram from '../components/FlowDiagram';
import { AgentFamilies, HallucinationControl, DeterminismProof, ScaleAtVolume } from '../components/PlatformStory';
import PlatformWhySection from '../components/landing/PlatformWhySection';
import PlatformCloser from '../components/landing/PlatformCloser';

/**
 * PlatformPage v2 — architecture-first redesign.
 *
 * Story arc:
 *   Hero → Why a platform → [parallax] → 6 Layers →
 *   [parallax] → Hallucination · Determinism · Scale deep dives →
 *   [parallax] → Agent families → Read/Think/Do/Cites flow → Closer
 *
 * Design: docs/plans/2026-04-15-platform-page-v2-design.md
 */
export default function PlatformPage() {
  return (
    <main>
      <PageHero
        label="The platform"
        title="The sovereign AI platform"
        titleAccent="that ships agents to production."
        description="artiGen is the base. Document agents, voice agents, and the messy multimodal combinations of both — built on your hardware, grounded in your data, auditable by your regulators."
        accent="#5b76fe"
        orbColor="#c0d0f5"
        pills={['On-prem · sovereign', 'Hallucination-controlled', 'Deterministic', 'Cited · auditable', '12,400 docs/hr']}
      />

      <PlatformWhySection />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
        headline="Six layers."
        headlineAccent="Solved once."
        subline="The hard parts — runtime, routing, hallucination control, connectors, governance, security — solved once for every agent that ships on artiGen."
        label="The base"
        height="70vh"
        clipRadius={24}
      />

      <PlatformStack />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop"
        headline="How the hardest layers"
        headlineAccent="actually work."
        subline="Hallucination control, determinism, and scale — the three properties your regulator asks about. Each shipped in production."
        label="How it holds"
        height="60vh"
        clipRadius={24}
      />

      <HallucinationControl />
      <DeterminismProof />
      <ScaleAtVolume />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop"
        headline="Documents. Voice."
        headlineAccent="Multimodal."
        subline="Three agent families on one platform. Custom-built for your workflow, not prompt-wrapped around ChatGPT."
        label="What you build"
        height="60vh"
        clipRadius={24}
      />

      <AgentFamilies />
      <FlowDiagram />

      <PlatformCloser />
    </main>
  );
}
```

**Step 2: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built`, zero errors.

If TypeScript complains that `AgentFamilies`, `HallucinationControl`, `DeterminismProof`, or `ScaleAtVolume` are not exported from `PlatformStory`, go back and re-verify Task 1 was committed correctly.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/pages/PlatformPage.tsx
git commit -m "feat(platform): rewrite PlatformPage with architecture-first structure"
```

---

## Task 5: Final build + visual audit

**Step 1: Production build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build 2>&1 | tail -10
```

Expected: `✓ built`, zero errors. Bundle size should be slightly smaller (since `PlatformCard` is no longer imported on the platform page) or similar.

**Step 2: Visual audit — platform page top to bottom**

Preview at `http://localhost:5174/platform`. Verify section order:

1. ✅ Hero — blue orb top-right, "The sovereign AI platform *that ships agents to production.*" bottom-left
2. ✅ "Why a platform" — 2-column: manifesto left, before/after SVG right, compact (~600px)
3. ✅ Parallax: "Six layers. *Solved once.*" (data center image, mix-blend text)
4. ✅ 6 Layer cards (Runtime, Model Router, Hallucination Control, Connectors, Governance, Security)
5. ✅ Parallax: "How the hardest layers *actually work.*" (network image)
6. ✅ Hallucination Control (4-wall gauntlet SVG)
7. ✅ Deterministic by design (replay SVG)
8. ✅ Scale at volume (pipeline SVG)
9. ✅ Parallax: "Documents. Voice. *Multimodal.*" (factory/industrial image)
10. ✅ Agent Families (Document / Voice / Multimodal cards)
11. ✅ Flow Diagram (Read → Think → Do → Cites circles)
12. ✅ Closing manifesto — blue orb left, "Six layers. One base. Every agent *plugs in.*" right

**Confirm NOT present:**
- ❌ No `SectionIntro` standalone blocks (the 3× 360px empty sections are gone)
- ❌ No `CurveDivider` (the 2× decorative curve sections are gone)
- ❌ No `PlatformCard` 3 stacking cards (replaced by PlatformWhySection)
- ❌ No `ContextMatters` diagram (Generic LLM vs artiGen) — that's only on the landing page now
- ❌ No large background "PLATFORM" text

**Step 3: Verify other pages unaffected**

Navigate to:
- `/` (landing) — unchanged
- `/agents` — unchanged
- `/pricing`, `/about`, `/contact`, `/faq`, `/case-studies`, `/security`, `/competitors`, `/why-generic-fail` — unchanged

**Step 4: Verify orb animates**

On platform page, scroll to the closing section. The blue glass orb should:
- Breathe (scale oscillates ~14%)
- Float (y position oscillates)
- Tilt subtly toward cursor

**Step 5: Mobile viewport check (optional)**

Resize preview to 375px width. Verify:
- 2-column sections (Why / Closer) stack to 1 column
- Parallax heroes still render (text may wrap)
- 6 layer cards collapse to 1 or 2 columns

**Step 6: Final commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add -A
git commit --allow-empty -m "chore: Platform page v2 complete — architecture-first structure verified"
```

---

## Notes for the implementer

- **DRY:** `AgentFamilies`, `HallucinationControl`, `DeterminismProof`, `ScaleAtVolume` are now exported from `PlatformStory.tsx` — Platform page imports them as named exports. Landing page continues to use its own components, unaffected.
- **YAGNI:** The existing `PlatformCard` component is no longer imported on the platform page but the file still exists in `src/components/landing-cards/`. Don't delete it — another page or a future iteration may use it. Just remove the import on the platform page.
- **No unit tests:** Frontend presentation work. Verify via build + browser preview.
- **Commit after each task:** Granularity is by task (1-5). The final task (#5) is visual audit + empty commit to mark completion.
- **If a TS error appears on Task 4:** Most likely Task 1 wasn't committed. Re-check PlatformStory.tsx has `export function AgentFamilies()` etc. Do not add `@ts-ignore`.
- **If the blue orb color looks off:** Test different `baseColor`/`attenuationColor` combos. `#1a3a8f` is a deep navy; `#5b76fe` is the platform blue. The orb should look unmistakably blue against the light `--bg-s2` background — if it looks grey/dim, bump `envColor` to `#b0c0ee`.
- **Parallax images:** The three Unsplash URLs are already used elsewhere in the site. If any one loads slowly or doesn't match the mood, swap for a different Unsplash photo ID — but verify the new image loads without CORS issues.

---

## Out of scope

- Redesigning `PlatformStack` layer cards (they already match the landing design language)
- Changing `FlowDiagram` content (Read/Think/Do/Cites is fine as-is)
- Adding per-layer deep dive pages (6 × new pages — not requested)
- Adding a "compare to alternatives" table (not requested)
- Changing the landing page (any landing changes are out of scope for this plan)
