# Agents Page v2 — Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the Agents page from 13 sections (~19,000px) down to 9 sections (~11,000px) by removing 7 redundant components, reordering for immediate social proof, redesigning `ProductionProof` to match the landing page white-theme card pattern, adding 2 ParallaxHero dividers, and adding a closing manifesto with a teal glass orb.

**Architecture:** 1 new component (`AgentsCloser`), 1 full rewrite (`ProductionProof` cards), 1 page rewrite (`AgentsPage`). Reuses existing components (`PageHero`, `ClientsStrip`, `PlatformFlow`, `AgentDeepDiveScroll`, `ParallaxHero`, `HeroOrb`) with no changes. Removes imports of: `AgentsCard`, `PlatformStack`, `AgentConstellation`, `IndustryStrip`, `CurveDivider`, `PageCinematicWrap`, local `SectionIntro` helper.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS, framer-motion, lucide-react, Three.js (via `HeroOrb`). No new npm packages.

**Verification:** No unit tests in this project. Each task verified via `npm run build` (zero errors) and visual inspection at `http://localhost:5174/agents`.

---

## Task 1: Redesign `ProductionProof.tsx` — white-theme cards matching IsThisYou pattern

Replace the 3 dark `GradientCard` instances with 3 white cards that match the landing page's `IsThisYou` visual language: black 1px top accent, Lucide icon in rounded square, uppercase monospace label, serif heading with italic accent, checklist with black ✓ circles, `capsule-light` proof chip at bottom. Keep the 3 clients (Thomson / Daimler / Qira), their metrics, and their quotes.

**Files:**
- Modify: `src/components/landing/ProductionProof.tsx` (full rewrite)

**Step 1: Read the current file to capture content to preserve**

Run: `cat /Users/puneet/website-attentions-miro/app/src/components/landing/ProductionProof.tsx` and note the exact text for:
- Section heading: "Not a pilot. Not a POC. Production. Named."
- Each client's: name, industry descriptor, metric, metric label, descriptive paragraph, quote, attribution.

Do not change this copy.

**Step 2: Replace file content**

Write the full new content. Use Lucide icons `Truck` (Thomson), `Car` (Daimler), `Stethoscope` (Qira):

```tsx
import { Truck, Car, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * ProductionProof — 3 white cards with real production clients.
 * Matches IsThisYou pattern: black top strip, Lucide icon, serif heading,
 * ✓ checklist, capsule-light proof chip.
 * Middle card animates in first from below, sides slide in from left/right.
 */

const clients = [
  {
    icon: Truck,
    label: 'Thomson Group · Logistics · Dubai',
    title: 'Eighteen thousand vouchers.',
    titleAccent: 'Every month.',
    metric: '88%',
    metricLabel: 'no-touch processing',
    bullets: [
      'Invoice Intelligence · 6× ROI week one',
      'Voucher Matching · 5 min vs 2 hours',
      'SAP S/4HANA · posted with full audit trail',
    ],
    quote: 'We reassigned two headcount within 6 weeks. The board asked what else we could do.',
    attribution: 'CFO · Thomson Group',
    proof: '18,000 vouchers / mo',
  },
  {
    icon: Car,
    label: 'Daimler Asia · Auto OEM · SE Asia',
    title: 'One point two million reports.',
    titleAccent: 'One knowledge graph.',
    metric: '1.2M',
    metricLabel: 'PCR reports indexed',
    bullets: [
      'PCR Intelligence · cross-format (PDF · XLS · DMS)',
      'Root cause traced in hours, not weeks',
      '8D report · D1–D8 auto-drafted with citations',
    ],
    quote: 'The same turbocharger failure described three ways by three teams — we never connected them before.',
    attribution: 'Quality Director · Daimler Asia',
    proof: '1.2M reports indexed',
  },
  {
    icon: Stethoscope,
    label: 'Qira Labs · Dental · 38 clinics',
    title: 'Every consult.',
    titleAccent: 'SOAP done in 30 seconds.',
    metric: '$400K+',
    metricLabel: 'recovered per location / year',
    bullets: [
      'Voice AI · on-prem ASR · ICD-10 synced to Dentrix',
      'Patient Experience OS · every call answered 24/7',
      '50% of physician admin time reclaimed',
    ],
    quote: 'We cleared CISO and DPO review in one meeting. Nothing we do ever leaves the data centre.',
    attribution: 'CISO · Qira Labs',
    proof: '38 clinics · 2,400 consults/wk',
  },
];

export default function ProductionProof() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="production"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(80px, 12vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-[1320px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-16 max-w-[720px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.65)' }}>
            Production proof
          </div>
          <h2
            className={`sr d-1 ${inView ? 'is-in' : ''}`}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 56px)',
              letterSpacing: '-0.025em',
              color: '#000000',
              lineHeight: 1.1,
            }}
          >
            Not a pilot. Not a POC.{' '}
            <span style={{ fontStyle: 'italic' }}>Production. Named.</span>
          </h2>
        </div>

        {/* 3 client cards — middle enters first from below */}
        <div className="grid md:grid-cols-3 gap-8">
          {clients.map((c, i) => {
            const isMiddle = i === 1;
            const delay = isMiddle ? 0 : 0.45;
            const initialX = i === 0 ? -60 : i === 2 ? 60 : 0;
            const initialY = isMiddle ? 80 : 0;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: initialY, x: initialX }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 55, damping: 15, delay }}
                className="group"
              >
                <div
                  className="relative rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                    minHeight: 620,
                  }}
                >
                  {/* Top strip */}
                  <div className="h-1 w-full" style={{ background: '#000000' }} />

                  <div className="p-10 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                    >
                      <c.icon className="w-9 h-9" style={{ color: '#000000' }} strokeWidth={1.5} />
                    </div>

                    {/* Label */}
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(0,0,0,0.50)',
                      }}
                    >
                      {c.label}
                    </div>

                    {/* Heading */}
                    <h3
                      className="mb-5"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(22px, 2vw, 28px)',
                        fontWeight: 600,
                        lineHeight: 1.15,
                        color: '#000000',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {c.title}{' '}
                      <span style={{ fontStyle: 'italic' }}>{c.titleAccent}</span>
                    </h3>

                    {/* Metric */}
                    <div className="flex items-baseline gap-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <span
                        className="leading-none"
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: 'clamp(36px, 3.5vw, 48px)',
                          fontWeight: 600,
                          fontStyle: 'italic',
                          color: '#000000',
                        }}
                      >
                        {c.metric}
                      </span>
                      <span
                        className="text-[14px] uppercase tracking-wider leading-tight"
                        style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}
                      >
                        {c.metricLabel}
                      </span>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-3 mb-6 text-left">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5"
                            style={{ background: '#000000' }}
                          >
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Quote */}
                    <blockquote
                      className="text-[15px] leading-relaxed mb-2"
                      style={{ color: 'rgba(0,0,0,0.70)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}
                    >
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    <div className="text-[13px] mb-6" style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}>
                      {c.attribution}
                    </div>

                    {/* Proof capsule */}
                    <div
                      className="capsule-light self-start"
                      style={{ padding: '8px 16px', fontSize: 12 }}
                    >
                      {c.proof}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built`, zero errors.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/landing/ProductionProof.tsx
git commit -m "feat(agents): redesign ProductionProof with white cards matching IsThisYou"
```

---

## Task 2: Create `AgentsCloser.tsx` — teal orb + closing manifesto

Closing section for the Agents page mirroring `PlatformCloser` but with a teal glass orb matching the agents page accent color.

**Files:**
- Create: `src/components/landing/AgentsCloser.tsx`

**Step 1: Write the file**

```tsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * AgentsCloser — Agents page closing manifesto.
 * Teal glass orb on the left, "Five agents today. Five more next quarter." manifesto on the right.
 * Mirrors the Platform page's PlatformCloser pattern with a teal variant.
 */

export default function AgentsCloser() {
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

          {/* Teal orb */}
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
                  baseColor="#0a3a2a"
                  attenuationColor="#8af5c0"
                  envColor="#a0e0c0"
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
              Five agents today.{' '}
              <span style={{ fontStyle: 'italic' }}>Five more next quarter.</span>
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
              Same base. Same pattern. Same audit trail. Each new agent costs 80% of the
              last &mdash; by layer six, it&rsquo;s mostly configuration.
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
git add src/components/landing/AgentsCloser.tsx
git commit -m "feat(agents): add AgentsCloser with teal glass orb"
```

---

## Task 3: Full rewrite of `AgentsPage.tsx` with new 9-section structure

Remove 7 unused imports, the local `SectionIntro` helper, `PageCinematicWrap`, `CurveDivider`, `dot-pulse` divider. Reorder to put `ClientsStrip` immediately after the hero. Add 2 ParallaxHero dividers and the new `AgentsCloser`.

**Files:**
- Modify: `src/pages/AgentsPage.tsx` (full rewrite)

**Step 1: Replace file contents**

Write this exact content to `/Users/puneet/website-attentions-miro/app/src/pages/AgentsPage.tsx`:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import ClientsStrip from '../components/ClientsStrip';
import PlatformFlow from '../components/PlatformFlow';
import AgentDeepDiveScroll from '../components/AgentDeepDiveScroll';
import ProductionProof from '../components/landing/ProductionProof';
import AgentsCloser from '../components/landing/AgentsCloser';

/**
 * AgentsPage v2 — redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip (social proof) → PlatformFlow (the pattern) →
 *   [parallax] → AgentDeepDiveScroll (5-agent showcase) →
 *   [parallax] → ProductionProof (customer cards) → AgentsCloser
 *
 * Design: docs/plans/2026-04-15-agents-page-v2-design.md
 */
export default function AgentsPage() {
  const { hash } = useLocation();

  // Preserve hash-scroll behavior for footer jump-links like /agents#production
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <main>
      <PageHero
        label="Live production agents"
        title="Five agents."
        titleAccent="One sovereign base."
        description="Each runs on the same platform. Scroll through to see inputs, live motion stories, workflows, and outcomes."
        accent="#8af5c0"
        orbColor="#c0f5e0"
        pills={['5 agents live', '3 regulated industries', '0 hallucination incidents', '88% no-touch', '12,400 docs/hr']}
      />

      <ClientsStrip />

      <PlatformFlow />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
        headline="Five agents."
        headlineAccent="Live today."
        subline="Handwritten invoices. Voice consultations. Knowledge graphs across millions of reports. Each running on your hardware right now."
        label="In production"
        height="70vh"
        clipRadius={24}
      />

      <div id="agent-deep-dive">
        <AgentDeepDiveScroll />
      </div>

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
        headline="Production proof."
        headlineAccent="In your industry."
        subline="Not a pilot. Not a POC. These are the teams running artiGen in production today, across regulated workflows."
        label="Proof"
        height="60vh"
        clipRadius={24}
      />

      <ProductionProof />

      <AgentsCloser />
    </main>
  );
}
```

**Step 2: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built`, zero errors.

If TypeScript complains about unused exports (e.g. `AgentsCard`, `PlatformStack`, `AgentConstellation`, `IndustryStrip`, `PageCinematicWrap`, `CurveDivider`), those files still exist in the codebase — just not imported on this page. That's fine.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/pages/AgentsPage.tsx
git commit -m "feat(agents): rewrite AgentsPage with v2 9-section structure"
```

---

## Task 4: Final build + visual audit

**Step 1: Production build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build 2>&1 | tail -12
```

Expected: `✓ built`, zero errors.

**Step 2: Visual audit — agents page**

Preview `http://localhost:5174/agents`. Verify section order top to bottom:

1. ✅ Hero (teal orb top-right, "Five agents. *One sovereign base.*" bottom-left)
2. ✅ ClientsStrip (black bar — marquee + metrics + compliance chips)
3. ✅ PlatformFlow (4 circles: Reads · Thinks · Does · Cites)
4. ✅ Parallax: "Five agents. *Live today.*" (data center image)
5. ✅ AgentDeepDiveScroll (5-agent horizontal scroll — Invoice / PCR / Voice / Patient / Voucher)
6. ✅ Parallax: "Production proof. *In your industry.*" (enterprise building)
7. ✅ ProductionProof (3 white cards — Thomson / Daimler / Qira with black top strips, icons, checklists, quotes, `capsule-light` chips)
8. ✅ AgentsCloser (teal glass orb left, "Five agents today. *Five more next quarter.*" right)

**Confirm NOT present:**
- ❌ `SectionIntro` standalone block "The agent pattern. READ·THINK·DO·PROVE."
- ❌ `AgentsCard` 4-tab stacking cards
- ❌ `CurveDivider`
- ❌ `dot-pulse` dots
- ❌ `PlatformStack` (6-layer cards)
- ❌ `AgentConstellation` (5 agents as star nodes)
- ❌ `IndustryStrip` (marquee of industries)
- ❌ Giant "AGENTS" background text

**Step 3: Verify jump-link still works**

Click footer link `/agents#production` from the platform or landing page. Expected: navigates to `/agents`, then scrolls to `ProductionProof` section (which has `id="production"`).

**Step 4: Verify other pages unaffected**

Navigate to `/`, `/platform`, `/pricing`, `/about`, `/contact`, `/faq`, `/case-studies`, `/security`, `/competitors`, `/why-generic-fail`. All should render normally. `ProductionProof` is only imported on `AgentsPage` — no other page uses it, so this redesign doesn't affect others.

**Step 5: Verify orb animation**

Scroll to the bottom of `/agents`. The teal glass orb in `AgentsCloser` should:
- Breathe (scale oscillates ~14%)
- Float (y position oscillates)
- Tilt subtly toward cursor

**Step 6: Measure final page height**

```javascript
document.body.scrollHeight
```

Expected: between 9,000 and 12,000 pixels (down from ~19,000 pre-redesign).

**Step 7: Mobile check (optional)**

Resize preview to 375px. Expected:
- 2-column `AgentsCloser` stacks to 1 column (orb above text)
- `ProductionProof` 3 cards stack to 1 column
- Parallax heroes render with wrapped text
- All readable, nothing overflows

**Step 8: Final commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add -A
git commit --allow-empty -m "chore: Agents page v2 complete — 9-section structure verified"
```

---

## Notes for the implementer

- **DRY:** `ProductionProof` reuses the exact IsThisYou card pattern — same black top strip, same icon container, same label → heading → metric → checklist → quote → capsule-light chip flow. If you find yourself inventing new styling patterns, stop and match IsThisYou.
- **YAGNI:** Don't delete the removed component files (`AgentsCard.tsx`, `PlatformStack.tsx`, `AgentConstellation.tsx`, `IndustryStrip.tsx`). Those components are still used on other pages (or may be useful later). Just remove imports from `AgentsPage.tsx`.
- **Hash-scroll preservation:** The existing `useLocation()` + `hash` effect in `AgentsPage.tsx` is important — the footer has `/agents#production` and `/agents#document` jump-links. Keep the effect. `ProductionProof` must retain `id="production"`.
- **No unit tests:** Frontend presentation work. Verify via build + browser preview.
- **Commit per task (1–4):** Granularity is one commit per task. Task 4 is visual audit with optional empty commit to mark completion.
- **If a TS error appears:** Fix without `@ts-ignore`. Most likely unused imports leftover from the old file — clean them up.
- **If the teal orb color looks dim:** The orb reads strongly blue/teal on a white background. If it appears grey-ish, bump `envColor` from `#a0e0c0` to `#b0eed0`, or raise `attenuationDistance` from `0.9` to `1.1`. Don't remove the orb.

---

## Out of scope

- Touching `AgentDeepDiveScroll` (the horizontal 5-agent scroll is preserved as-is)
- Changing the agents page hero (just updated to bottom-left text placement)
- Removing `AgentsCard.tsx`, `PlatformStack.tsx`, `AgentConstellation.tsx`, `IndustryStrip.tsx`, `CurveDivider.tsx` files (may be used elsewhere)
- Adding a 6th agent or expanding the agent list
- Changing any other page (landing, platform, security, pricing, etc.)
- Adding new unit tests (project has none)
