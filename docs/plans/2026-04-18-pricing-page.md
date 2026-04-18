# Pricing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite `/pricing` as a three-independent-doors page (Assessment / Platform / Agents), each a complete offer with a contrast pill and 5 accordion panels (HOW / WHAT / WHY / ROI / TIMELINE). No dollar figures anywhere — qualitative differentiation only. Forest-green accent.

**Architecture:** One page rewrite (`PricingPage.tsx`), 2 new components (`PricingDoor`, `PricingCloser`), one data file (`src/data/pricing.ts`) as single source of truth for the 3 doors × 5 panels. All content lives in `pricing.ts`; components are pure consumers. Page wrapped in `<MotionConfig reducedMotion="user">` for prefers-reduced-motion honoring. 3 old pricing components (`CostCurveHero`, `TierPanels`, `AlwaysIncluded`) are deleted.

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind · `framer-motion` for accordion height animation and motion · `lucide-react` for door icons · Three.js (via lazy-loaded `HeroOrb`) for the closer orb · existing utilities (`.cf-grid`, `.micro-upper`, `.capsule-light`, `.capsule-dark`) and CSS vars (`--serif`, `--mono`, `--bg-s2`).

**Design doc:** `docs/plans/2026-04-18-pricing-page-design.md`

---

## Pre-implementation checklist

From `/Users/puneet/website-attentions-miro/app`:

```bash
npm run build
# Expected: "✓ built in ..." zero errors
```

Also verify the latest state matches expectations:

```bash
git log --oneline -3
# Expected HEAD: ecca098 docs(pricing): add design doc for /pricing three-doors redesign
```

Preview `/pricing` today — you'll see the old page (hero with `$5K assessment` pill, cost curve, tier panels, "always included"). By the end of this plan, that page becomes 3 forest-green door cards with accordion Q&A.

---

## Task 1: Data foundation — `src/data/pricing.ts`

**Files:**
- Create: `src/data/pricing.ts`

**Purpose:** Single source of truth. All 3 doors, their 5 panels each, contrast pills, icons, CTAs. `PricingDoor` and `PricingPage` are pure consumers.

**Step 1: Create the file**

Create `src/data/pricing.ts` with this exact content:

```ts
/**
 * pricing.ts — data source for the /pricing page.
 *
 * Three doors (Assessment / Platform / Agents), each with:
 *   - tier name, icon, headline, pitch
 *   - contrast pill (typical vs. us — qualitative, no numbers)
 *   - 5 accordion panels (HOW / WHAT / WHY / ROI / TIMELINE)
 *   - CTA label + href
 *
 * No dollar figures anywhere. Page components are pure consumers.
 */

export type DoorId = 'assessment' | 'platform' | 'agents';
export type PanelId = 'how' | 'what' | 'why' | 'roi' | 'timeline';

export type ContrastPair = {
  typicalLabel: string;
  typicalText: string;
  usLabel: string;
  usText: string;
};

export type DoorPanel = {
  id: PanelId;
  label: string;
  body: string;
};

export type Door = {
  id: DoorId;
  iconName: string;
  tierName: string;
  headline: string;
  headlineAccent: string;
  pitch: string;
  contrast: ContrastPair;
  panels: DoorPanel[];
  ctaLabel: string;
  ctaHref: string;
};

const ASSESSMENT: Door = {
  id: 'assessment',
  iconName: 'SearchCheck',
  tierName: 'Assessment',
  headline: 'Scope the fit.',
  headlineAccent: 'Plan the pilot.',
  pitch:
    'A 2-week senior-architect-led engagement that delivers a board-ready business case and a ready-to-execute pilot plan — not a 200-page PDF.',
  contrast: {
    typicalLabel: 'Typical',
    typicalText: '6-month research + PDF deck that gets shelved.',
    usLabel: 'Us',
    usText: '2-week scoping + working POC on your data.',
  },
  panels: [
    {
      id: 'how',
      label: 'How it works',
      body: 'Two weeks, structured. Week 1: document + workflow + tech-stack audit across 2\u20133 target processes. We read your actual documents, talk to your ops team, map your existing systems. Week 2: ROI model for top candidates, platform-vs-build decision memo, pilot scope draft. Senior architects throughout \u2014 not a rotating team of juniors.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'A ranked list of AI opportunities across your organization (by ROI, feasibility, risk) \u00b7 quantified business case for the top 2\u20133 use cases \u00b7 a ready-to-execute pilot plan for one of them \u00b7 a platform-or-build decision memo \u00b7 a 60-minute board-presentation deck \u00b7 a named, contactable assessment lead.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical consulting assessment runs 4\u20136 months, dozens of consultants, and ends in a strategy deck that gets shelved because the assumptions don\u2019t match your reality. The team who assesses us is the team who\u2019ll build. Every ROI assumption is grounded in your actual documents, not industry benchmarks. Every pilot recommendation is something we can already point to running live somewhere close.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'The assessment itself pays back as a board-approvable business case. First real operating ROI lands ~90\u2013120 days later when the pilot ships. Typical outcome: 2\u20133 automation opportunities surface worth multiples of the engagement cost to scope, and 1 is ready to pilot within the quarter.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: 'Fixed 2-week window. Week 0: kickoff, NDA, document access, stakeholder interviews scheduled. Week 1: deep-dive. Week 2: ROI model + pilot scoping + decision point. We\u2019re in, we assess, we\u2019re out. No scope creep.',
    },
  ],
  ctaLabel: 'Scope this door',
  ctaHref: 'mailto:hello@attentions.ai?subject=Assessment%20Scoping',
};

const PLATFORM: Door = {
  id: 'platform',
  iconName: 'Layers',
  tierName: 'Platform',
  headline: 'Own the base.',
  headlineAccent: 'Every agent compounds.',
  pitch:
    'Sovereign artiGen runtime deployed on your hardware in 4\u20136 weeks. Every agent after the first costs ~80% less \u2014 the shared layers are already paid for.',
  contrast: {
    typicalLabel: 'Typical',
    typicalText: 'SaaS seat + shared models + their cloud + lock-in.',
    usLabel: 'Us',
    usText: 'Sovereign base + your models + your hardware, yours to own.',
  },
  panels: [
    {
      id: 'how',
      label: 'How it works',
      body: '4\u20136 weeks end-to-end. Weeks 1\u20132: hardware and connector audit. Weeks 3\u20134: core platform deployment \u2014 sovereign runtime, model router, 4-layer hallucination control. Weeks 5\u20136: governance rails and first agent integration. Handover with runbooks, deployment topology, and audit-trail examples your team can run with.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'Sovereign runtime on your hardware (bare-metal, VM, or air-gapped) \u00b7 model router configured across open-weight and fine-tuned models \u00b7 4-layer hallucination control \u00b7 enterprise connectors (SAP, Epic, Salesforce, or whatever your stack runs) \u00b7 governance layer (audit trail, RBAC, approval flows) \u00b7 one agent live on top \u00b7 infrastructure IP and model weights stay yours.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical enterprise AI platform is rented by the seat, runs in the vendor\u2019s cloud, uses the vendor\u2019s models. When their model changes, your outputs change. When their prices change, your budget changes. When regulators ask where the data went, you cite a third-party contract. Sovereign means your hardware, your models, your perimeter. The platform is a base you OWN, not a service you rent.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'Platform alone doesn\u2019t generate ROI \u2014 agents do. But the platform reduces cost-to-ship for every future agent by ~80% because the shared layers (runtime, routing, hallucination, connectors, governance, security) are already in place. First agent ROI typically lands 3\u20136 months after platform go-live. Second agent: weeks. Sixth agent: mostly configuration.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: '4\u20136 weeks to live. Owned forever. No annual renewal. Upgrades on your schedule, not a vendor\u2019s.',
    },
  ],
  ctaLabel: 'Scope this door',
  ctaHref: 'mailto:hello@attentions.ai?subject=Platform%20Scoping',
};

const AGENTS: Door = {
  id: 'agents',
  iconName: 'Workflow',
  tierName: 'Agents',
  headline: 'Targeted automation.',
  headlineAccent: 'Live in weeks.',
  pitch:
    'A production agent built to your workflow, trained on your data, integrated into your system of record. Executes \u2014 doesn\u2019t recommend. KPI-measured from day one.',
  contrast: {
    typicalLabel: 'Typical',
    typicalText: 'Generic LLM wrapper recommending, humans verify.',
    usLabel: 'Us',
    usText: 'Targeted automation executing, cited every field.',
  },
  panels: [
    {
      id: 'how',
      label: 'How it works',
      body: '8\u201312 weeks. Weeks 1\u20132: workflow and document deep-dive. Weeks 3\u20136: agent build \u2014 deep OCR calibrated to your document mix, a custom small language model fine-tuned on your vendor master or clinical codes or equivalent schema, integration to your system of record. Weeks 7\u201310: parallel run with humans, exception-routing tuning, audit-trail validation. Weeks 11\u201312: cutover to autonomous execution. KPI dashboard live.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'One production agent on one workflow \u00b7 custom small LM fine-tuned on your data (not a prompt template) \u00b7 deep integration to your system of record \u00b7 citation on every field (every output traces back to source document + page + line) \u00b7 exception routing so humans only see the 10\u201315% that need judgment \u00b7 live KPI dashboard \u00b7 fixed scope, measured against KPIs defined at kickoff.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical "AI agent" in the market is a generic foundation-model wrapper with a prompt template. Works on general cases, fails on your handwritten, multi-language, or edge-case data. Outputs are recommendations for humans to verify \u2014 not executions. We build targeted agents \u2014 bespoke to your workflow, trained on your schema, integrated into your system of record. They don\u2019t recommend. They EXECUTE. The difference between "AI that shows insight" and "AI that closes the loop." Three live today: Thomson, Qira, Daimler.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'Typical ROI within 60\u201390 days post-go-live. KPI defined at kickoff \u2014 cost takeout, cycle time, recovery rate, depending on the workflow. Measured against it. If the business case isn\u2019t hitting, we know before you do \u2014 we revisit scope, not invoice. Shapes we\u2019ve shipped: 88% no-touch invoicing, $400K+ recovered per clinic per year, weeks-to-hours on root cause.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: '8\u201312 weeks to live autonomous execution. Fixed-scope. KPI-measured. Live production, not a demo, not a POC. After go-live: a tuning cadence and the KPI dashboard stay in place.',
    },
  ],
  ctaLabel: 'Scope this door',
  ctaHref: 'mailto:hello@attentions.ai?subject=Agent%20Scoping',
};

export const DOORS: Door[] = [ASSESSMENT, PLATFORM, AGENTS];

export const DOOR_BY_ID: Record<DoorId, Door> = Object.fromEntries(
  DOORS.map((d) => [d.id, d])
) as Record<DoorId, Door>;
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: `✓ built in ...` zero TS errors.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/data/pricing.ts
git commit -m "$(cat <<'EOF'
feat(pricing): add pricing.ts data source

Three doors (Assessment / Platform / Agents), each with types for
contrast pairs + 5 accordion panels (how / what / why / roi / timeline)
+ CTA. No dollar figures. Single source of truth for /pricing page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: PricingPage skeleton — new hero + MotionConfig + ClientsStrip

**Files:**
- Modify (full rewrite): `src/pages/PricingPage.tsx`

**Purpose:** Replace the old page structure with the new skeleton. Drop `PageCinematicWrap`, `CostCurveHero`, `TierPanels`, `AlwaysIncluded`, `GTMPath` imports. New forest-green hero. `MotionConfig` at root. `ClientsStrip` after hero. Placeholder sections for the 3 doors (wired in Task 4) and closer.

**Step 1: Rewrite the page**

Replace the entire contents of `src/pages/PricingPage.tsx` with:

```tsx
import { MotionConfig } from 'framer-motion';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';
import { DOORS } from '../data/pricing';

/**
 * PricingPage v2 — three-doors redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip → 3 Door cards → [parallax] → PricingCloser
 *
 * Design: docs/plans/2026-04-18-pricing-page-design.md
 */
export default function PricingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="Pricing"
          title="Three doors."
          titleAccent="Every door a great strategy."
          description="Pick where you are. Each door delivers standalone. Scope-dependent — we price to your business, not to a rate card."
          accent="#3a7d44"
          orbColor="#a0d0a8"
          pills={[
            '3 engagement shapes',
            'Scope-dependent · no rate card',
            'ROI in months, not years',
            '2-week assessment start',
            'Own what you build',
          ]}
        />

        <ClientsStrip />

        {/* TEMPORARY placeholder sections for 3 doors — replaced in Task 4 */}
        {DOORS.map((d) => (
          <section
            key={d.id}
            id={d.id}
            style={{
              minHeight: '40vh',
              padding: '60px 24px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <h2 className="font-display text-3xl text-center">
              {d.tierName} (placeholder)
            </h2>
          </section>
        ))}
      </main>
    </MotionConfig>
  );
}
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 3: Visual QA**

Preview `http://localhost:5174/pricing`:
- Hero renders with forest-green accent (`#3a7d44`), sage-tinted orb on the right, 5 pills.
- ClientsStrip marquee renders below hero.
- 3 placeholder sections below ("Assessment (placeholder)", "Platform (placeholder)", "Agents (placeholder)").
- Old CostCurveHero / TierPanels / AlwaysIncluded / GTMPath no longer appear.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/pages/PricingPage.tsx
git commit -m "$(cat <<'EOF'
feat(pricing): rewrite PricingPage skeleton with forest-green hero

Drops PageCinematicWrap + giantText + CostCurveHero + TierPanels +
AlwaysIncluded + GTMPath. New "Three doors. Every door a great
strategy." hero with forest-green accent. MotionConfig reducedMotion
honors prefers-reduced-motion. 3 placeholder sections temporarily.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: PricingDoor component — contrast pill + 5 accordion panels

**Files:**
- Create: `src/components/pricing/PricingDoor.tsx`

**Purpose:** Reusable door card. Takes `Door` data as prop. Renders icon + tier name + headline + pitch + contrast pill + 5 accordion panels (HOW open by default) + CTA. Smooth height animation on expand/collapse via framer-motion.

**Step 1: Create the component**

Create `src/components/pricing/PricingDoor.tsx` with this exact content:

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import type { Door, PanelId } from '../../data/pricing';

const ACCENT = '#3a7d44';

/**
 * PricingDoor — one of the 3 door cards on the /pricing page.
 *
 * Contrast pill + 5 accordion Q&A panels (HOW open by default). Each
 * door is self-contained; visitors pick one (or read all three).
 */
export default function PricingDoor({ data }: { data: Door }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const [openPanels, setOpenPanels] = useState<Set<PanelId>>(new Set(['how']));

  const Icon: LucideIcon =
    (Lucide as unknown as Record<string, LucideIcon>)[data.iconName] ??
    Lucide.HelpCircle;

  const togglePanel = (id: PanelId) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.section
      ref={ref}
      id={data.id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(40px, 6vw, 80px) 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <article
          className="flex flex-col"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          {/* Forest-green top accent strip */}
          <div style={{ height: 1, background: ACCENT }} />

          <div className="p-8 md:p-10 flex flex-col gap-6">
            {/* Header: icon + tier name */}
            <div className="flex items-center gap-4">
              <div
                className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${ACCENT}10`,
                  border: `1px solid ${ACCENT}20`,
                }}
              >
                <Icon size={32} style={{ color: ACCENT }} aria-hidden="true" />
              </div>
              <div
                className="micro-upper"
                style={{ color: 'rgba(0,0,0,0.55)' }}
              >
                {data.tierName}
              </div>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#000000',
              }}
            >
              {data.headline}{' '}
              <span style={{ fontStyle: 'italic', color: ACCENT }}>
                {data.headlineAccent}
              </span>
            </h2>

            {/* Pitch */}
            <p
              className="text-[17px] leading-relaxed max-w-[800px]"
              style={{ color: 'rgba(0,0,0,0.70)' }}
            >
              {data.pitch}
            </p>

            {/* Contrast pill */}
            <div
              className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 rounded-2xl p-5 md:p-6"
              style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div>
                <div
                  className="micro-upper mb-1"
                  style={{ color: 'rgba(0,0,0,0.45)' }}
                >
                  {data.contrast.typicalLabel}
                </div>
                <div
                  className="text-[15px] leading-snug"
                  style={{ color: 'rgba(0,0,0,0.60)' }}
                >
                  {data.contrast.typicalText}
                </div>
              </div>
              <div
                className="hidden md:block text-[18px] font-light"
                style={{ color: ACCENT }}
                aria-hidden="true"
              >
                &rarr;
              </div>
              <div>
                <div
                  className="micro-upper mb-1"
                  style={{ color: ACCENT }}
                >
                  {data.contrast.usLabel}
                </div>
                <div
                  className="text-[15px] leading-snug font-medium"
                  style={{ color: '#000000' }}
                >
                  {data.contrast.usText}
                </div>
              </div>
            </div>

            {/* Accordion panels */}
            <div className="flex flex-col gap-2">
              {data.panels.map((panel) => {
                const isOpen = openPanels.has(panel.id);
                return (
                  <div
                    key={panel.id}
                    style={{
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: isOpen
                        ? 'rgba(58,125,68,0.03)'
                        : 'transparent',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => togglePanel(panel.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 transition-colors"
                      style={{
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        className="micro-upper"
                        style={{
                          color: isOpen ? ACCENT : 'rgba(0,0,0,0.65)',
                          fontSize: 12,
                        }}
                      >
                        {panel.label}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[14px] flex-shrink-0"
                        style={{
                          color: isOpen ? ACCENT : 'rgba(0,0,0,0.35)',
                        }}
                        aria-hidden="true"
                      >
                        &rsaquo;
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p
                            className="px-5 pb-5 text-[15px] leading-relaxed"
                            style={{ color: 'rgba(0,0,0,0.70)' }}
                          >
                            {panel.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={data.ctaHref}
              className="capsule-dark self-start inline-flex items-center gap-2 rounded-full transition-transform hover:scale-[1.03]"
              style={{
                padding: '10px 20px',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              {data.ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>
      </div>
    </motion.section>
  );
}
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors. TS may complain if `framer-motion`'s `AnimatePresence` / `motion` types don't resolve — they should, since they're already used elsewhere.

**Step 3: Commit (component only — not yet wired into the page)**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/pricing/PricingDoor.tsx
git commit -m "$(cat <<'EOF'
feat(pricing): add PricingDoor component with accordion panels

Reusable door card: icon + tier name + Fraunces headline + pitch +
contrast pill (typical vs us) + 5 accordion Q&A panels (HOW open by
default, smooth height animation on toggle) + scoped CTA. Consumes
Door data from src/data/pricing.ts.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Wire 3 doors into PricingPage

**Files:**
- Modify: `src/pages/PricingPage.tsx`

**Purpose:** Replace the 3 placeholder sections with real `<PricingDoor>` calls iterating over `DOORS`.

**Step 1: Modify PricingPage.tsx**

Replace the `DOORS.map` placeholder block with real door rendering. The final file should look like:

```tsx
import { MotionConfig } from 'framer-motion';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';
import PricingDoor from '../components/pricing/PricingDoor';
import { DOORS } from '../data/pricing';

/**
 * PricingPage v2 — three-doors redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip → 3 Door cards → [parallax] → PricingCloser
 *
 * Design: docs/plans/2026-04-18-pricing-page-design.md
 */
export default function PricingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="Pricing"
          title="Three doors."
          titleAccent="Every door a great strategy."
          description="Pick where you are. Each door delivers standalone. Scope-dependent — we price to your business, not to a rate card."
          accent="#3a7d44"
          orbColor="#a0d0a8"
          pills={[
            '3 engagement shapes',
            'Scope-dependent · no rate card',
            'ROI in months, not years',
            '2-week assessment start',
            'Own what you build',
          ]}
        />

        <ClientsStrip />

        {DOORS.map((d) => (
          <PricingDoor key={d.id} data={d} />
        ))}
      </main>
    </MotionConfig>
  );
}
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 3: Visual QA**

Preview `http://localhost:5174/pricing`:
- Three door cards stacked full-width below the hero + ClientsStrip.
- Each card: forest-green top accent, icon (`SearchCheck` / `Layers` / `Workflow`) in 72px rounded square with faint green tint, tier name ("Assessment" / "Platform" / "Agents") in mono uppercase, Fraunces headline with italic 2nd phrase in forest green.
- 1-line pitch, then contrast pill with "TYPICAL → US" columns (arrow only on desktop).
- 5 accordion panels: HOW expanded by default, others collapsed. Click a collapsed header: it expands smoothly, the caret rotates 90°, the header label changes to forest green.
- CTA button at bottom of each card: "Scope this door →" as capsule-dark.
- Click the CTA: opens a mailto with the door pre-filled in the subject.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/pages/PricingPage.tsx
git commit -m "$(cat <<'EOF'
feat(pricing): render 3 PricingDoor cards from DOORS data

Replaces placeholder sections. Each of the 3 doors renders via the
shared PricingDoor component with its accordion Q&A.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Add ParallaxHero divider

**Files:**
- Modify: `src/pages/PricingPage.tsx`

**Purpose:** Insert a `ParallaxHero` divider after the 3 doors and before the closer (closer added in Task 6).

**Step 1: Modify PricingPage.tsx**

Add `import ParallaxHero from '../components/ParallaxHero';` at the top. After the `DOORS.map(...)` block, insert:

```tsx
<ParallaxHero
  imageSrc="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=1080&fit=crop"
  headline="Start anywhere."
  headlineAccent="Compound over time."
  subline="A door you start with today becomes the foundation for the next. Every engagement is scoped to pay back in months, not years."
  label="The compound effect"
  height="60vh"
  clipRadius={24}
/>
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 3: Visual QA**

Preview `http://localhost:5174/pricing`, scroll past the 3 doors:
- ParallaxHero divider renders with an architecture/entryway image, "Start anywhere. *Compound over time.*" in `mix-blend-difference` text, label "THE COMPOUND EFFECT".
- Scroll through — background parallaxes at a different speed from content.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/pages/PricingPage.tsx
git commit -m "$(cat <<'EOF'
feat(pricing): add ParallaxHero divider after doors

"Start anywhere. Compound over time." divider signals doors are valid
independent starts that compose if the customer wants.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: PricingCloser component — forest-green orb + manifesto

**Files:**
- Create: `src/components/pricing/PricingCloser.tsx`
- Modify: `src/pages/PricingPage.tsx`

**Purpose:** Closing section. Two-column: forest-green glass orb on the left (lazy-mounted via `useInView`), manifesto on the right. Single CTA "Scope a door →".

**Step 1: Create the component**

Create `src/components/pricing/PricingCloser.tsx` with this exact content:

```tsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * PricingCloser — closing manifesto for the /pricing page.
 * Forest-green glass orb + "Scope small. Compound forever." manifesto
 * + single "Scope a door" CTA. Mirrors AgentsCloser / SolutionsCloser
 * / PlatformCloser with a forest-green variant.
 */
export default function PricingCloser() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-s2)',
        padding: 'clamp(96px, 14vw, 160px) 24px',
      }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Forest-green orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="relative"
              style={{
                width: 'clamp(280px, 32vw, 420px)',
                height: 'clamp(280px, 32vw, 420px)',
              }}
            >
              {inView && (
                <Suspense fallback={null}>
                  <HeroOrb
                    baseColor="#0a3a1a"
                    attenuationColor="#8af5a0"
                    envColor="#a0d0a0"
                    attenuationDistance={0.9}
                    breatheAmp={0.14}
                    floatAmp={0.25}
                  />
                </Suspense>
              )}
            </div>
          </motion.div>

          {/* Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div
              className="micro-upper mb-6"
              style={{ color: 'rgba(0,0,0,0.55)' }}
            >
              The engagement
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
              Scope small.{' '}
              <span style={{ fontStyle: 'italic' }}>Compound forever.</span>
            </h2>
            <p
              className="max-w-[560px] mx-auto md:mx-0 mb-8"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              Every door pays back in months. Every door leaves you owning what
              you built. Pick yours &mdash; or scope all three. Either way, the
              investment compounds on your balance sheet, not ours.
            </p>
            <a
              href="mailto:hello@attentions.ai?subject=Scoping"
              className="capsule-dark inline-flex items-center gap-2 rounded-full transition-transform hover:scale-[1.03]"
              style={{
                padding: '12px 24px',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              Scope a door
              <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into PricingPage**

Modify `src/pages/PricingPage.tsx`. Add `import PricingCloser from '../components/pricing/PricingCloser';` at top. Append `<PricingCloser />` after the ParallaxHero at the end of `<main>`.

Final JSX order in `<main>`:
1. `<PageHero>`
2. `<ClientsStrip />`
3. `{DOORS.map((d) => <PricingDoor key={d.id} data={d} />)}`
4. `<ParallaxHero ... />`
5. `<PricingCloser />`

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/pricing`, scroll to bottom:
- PricingCloser: forest-green glass orb on the left (breathing + floating), "THE ENGAGEMENT" label, "Scope small. *Compound forever.*" headline in Fraunces with italic 2nd phrase, italic supporting paragraph, "Scope a door →" CTA button.
- Orb is lazy-mounted — it only appears when the section comes into view.
- On mobile, the orb and manifesto stack.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/pricing/PricingCloser.tsx src/pages/PricingPage.tsx
git commit -m "$(cat <<'EOF'
feat(pricing): add PricingCloser with forest-green orb + manifesto

Two-column closer. Forest-green palette (#0a3a1a / #8af5a0 / #a0d0a0)
distinct from teal (agents), blue (platform), amber (solutions).
Lazy-mounts orb on useInView. Single "Scope a door" CTA.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: GradientMesh palette check

**Files:**
- Verify (possibly modify): `src/components/GradientMesh.tsx`
- Verify: `src/App.tsx` (ROUTE_TO_MESH already has `/pricing` → `pricing`)

**Purpose:** Confirm the existing `pricing` mesh palette in `GradientMesh.tsx` doesn't clash with forest green. If the palette is cool-toned or amber/gold-ish, swap it for something compatible.

**Step 1: Read the current pricing mesh**

Read `/Users/puneet/website-attentions-miro/app/src/components/GradientMesh.tsx` — look for the `pricing:` entry in the palette object (search `pricing`).

**Step 2: Judge fit**

If the existing palette uses cool or warm tones that clash with `#3a7d44` (e.g., gold, amber, blue), update the `pricing` entry to neutral / near-white with subtle green tint:

```ts
pricing: { base: '#f7faf6', blobs: [
  { color: 'rgba(138,245,160,0.05)', x: '20%', y: '30%', size: '50vw' },
  { color: 'rgba(58,125,68,0.04)', x: '80%', y: '70%', size: '40vw' },
] },
```

If the existing palette is already neutral or compatible (e.g., pale grey with soft tints), leave it alone.

**Step 3: Verify App.tsx**

In `src/App.tsx`, confirm `ROUTE_TO_MESH` has:
```ts
'/pricing': 'pricing',
```

It should already — no change expected.

**Step 4: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 5: Visual QA**

Preview `/pricing` — hero background should look clean with subtle green-tinted gradient. If the mesh fought the forest green accent (visible clashing), fix the palette and re-verify.

**Step 6: Commit (only if you changed GradientMesh.tsx)**

If no change: no commit needed. Report "no mesh change required".

If changed:
```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/GradientMesh.tsx
git commit -m "$(cat <<'EOF'
refactor(mesh): update pricing palette to green-tinted neutral

Accommodates the forest-green hero accent introduced by the /pricing
redesign. Palette values still pale and subtle; no visual regression
elsewhere.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Delete obsolete components

**Files:**
- Delete: `src/components/CostCurveHero.tsx`
- Delete: `src/components/TierPanels.tsx`
- Delete: `src/components/AlwaysIncluded.tsx`

**Purpose:** These three components were only used on the old `/pricing` page. The new page doesn't import them. Remove to keep the component surface tidy.

**Step 1: Verify no remaining imports**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -rn "CostCurveHero\|TierPanels\|AlwaysIncluded" src/
```

Expected: zero matches (assuming PricingPage rewrite in Task 2 dropped them). If any results appear, STOP and report.

**Step 2: Delete files**

```bash
cd /Users/puneet/website-attentions-miro/app
rm src/components/CostCurveHero.tsx src/components/TierPanels.tsx src/components/AlwaysIncluded.tsx
```

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Commit**

The 3 files were likely untracked (same repo git quirk as Solutions). If so, `rm` removes them from the `??` untracked list with no `D` entries. Check:

```bash
cd /Users/puneet/website-attentions-miro/app && git status --short | grep -E "CostCurveHero|TierPanels|AlwaysIncluded"
```

- If empty output: files were untracked, now gone from working tree. NO commit needed. Report this case.
- If `D` entries appear: files were tracked, commit the deletions:
  ```bash
  git add src/components/CostCurveHero.tsx src/components/TierPanels.tsx src/components/AlwaysIncluded.tsx
  git commit -m "$(cat <<'EOF'
  chore(pricing): remove obsolete components

  CostCurveHero / TierPanels / AlwaysIncluded only powered the old
  pricing page. The new three-doors design doesn't use them.

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

---

## Task 9: Final verification pass

**No files changed.**

**Step 1: Full build**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: `✓ built in ...` zero errors, no warnings introduced by this work.

**Step 2: Visual QA checklist — preview `http://localhost:5174/pricing`**

Walk through the full page and check each:

- [ ] Hero: forest-green accent (`#3a7d44`), sage-tinted orb on right, 5 pills ("3 engagement shapes", "Scope-dependent · no rate card", "ROI in months, not years", "2-week assessment start", "Own what you build").
- [ ] Hero headline "Three doors." normal + "Every door a great strategy." italic.
- [ ] ClientsStrip renders below hero with the marquee logos.
- [ ] **Door 1 — Assessment:** `SearchCheck` icon, "Assessment" tier label, "Scope the fit. *Plan the pilot.*" headline, pitch, contrast pill ("TYPICAL: 6-month research + PDF deck... / US: 2-week scoping + working POC..."), HOW panel expanded by default with "Two weeks, structured..." prose. Other 4 panels collapsed.
- [ ] Click WHY header on Assessment — expands smoothly with typical-consulting-firm contrast narrative; caret rotates.
- [ ] Click HOW header on Assessment — collapses smoothly.
- [ ] "Scope this door →" CTA at bottom opens mailto with `subject=Assessment Scoping`.
- [ ] **Door 2 — Platform:** `Layers` icon, "Platform" label, "Own the base. *Every agent compounds.*" headline, contrast pill ("SaaS + shared models / Sovereign + your models"), 5 panels (HOW open).
- [ ] **Door 3 — Agents:** `Workflow` icon, "Agents" label, "Targeted automation. *Live in weeks.*" headline, contrast pill ("Generic wrapper recommending / Targeted executing, cited"), 5 panels (HOW open). "Why" panel mentions Thomson / Qira / Daimler.
- [ ] ParallaxHero divider: architecture/entryway image, "Start anywhere. *Compound over time.*" in `mix-blend-difference` text, label "THE COMPOUND EFFECT".
- [ ] PricingCloser: forest-green orb animating (breathing + floating), "THE ENGAGEMENT" label, "Scope small. *Compound forever.*" headline, italic supporting paragraph, "Scope a door →" button.
- [ ] Clicking "Scope a door →" opens a mailto.

**Step 3: No-numbers audit**

Open the rendered `/pricing` page and search the DOM text (`Cmd+F` in browser) for:
- `$` — should return ZERO matches
- `5K`, `10K`, `20K`, `100K`, `1M` — should return ZERO matches
- `USD` — should return ZERO matches

If any match, STOP — a dollar figure leaked into the page. Fix in `src/data/pricing.ts` and re-verify.

**Step 4: Responsive check**

- [ ] Resize to ~375px mobile: hero stacks, ClientsStrip stacks, door cards full-width single-column, contrast pill stacks (arrow hidden), accordion panels readable, orb+manifesto stack in closer.
- [ ] Resize to ~768px tablet: door cards at full intended max-width, contrast pill horizontal with arrow visible.

**Step 5: Motion-reduction check**

- [ ] Open browser devtools → Rendering panel → emulate CSS media `prefers-reduced-motion: reduce`.
- [ ] Reload `/pricing`.
- [ ] Visual check: entrance animations skip (content appears immediately, not fading in). Orb breathing should also be muted.

**Step 6: Other pages unaffected**

- [ ] `/` (Landing) renders unchanged.
- [ ] `/platform` renders unchanged.
- [ ] `/agents` renders unchanged.
- [ ] `/solutions` renders unchanged.
- [ ] `/case-studies` still redirects to `/solutions`.

**Step 7: Final commit (only if any fixes surfaced)**

If nothing in Task 9 required a fix, no commit needed. If a fix was needed, commit under `fix(pricing): ...`.

---

## Summary of files touched

**Created (4 files):**
- `src/data/pricing.ts`
- `src/components/pricing/PricingDoor.tsx`
- `src/components/pricing/PricingCloser.tsx`
- `docs/plans/2026-04-18-pricing-page.md` (this plan)

**Modified (1 file):**
- `src/pages/PricingPage.tsx` (full rewrite; then incremental additions in Tasks 4, 5, 6)

**Optionally modified (1 file):**
- `src/components/GradientMesh.tsx` (only if Task 7 visual QA surfaced a palette clash)

**Deleted (3 files):**
- `src/components/CostCurveHero.tsx`
- `src/components/TierPanels.tsx`
- `src/components/AlwaysIncluded.tsx`

**Total commits:** 7–9 (depending on Task 7 / Task 8 no-op outcomes).

---

## If something goes wrong

**Build failure on PricingDoor:** typically a type import mismatch. Verify `import type { Door, PanelId } from '../../data/pricing';` and `import type { LucideIcon } from 'lucide-react';` are both present.

**Accordion doesn't animate smoothly:** check that `AnimatePresence` is imported from `'framer-motion'` and wraps the conditionally-rendered `motion.div`. The `height: 'auto'` target requires framer-motion's AnimatePresence.

**Orb doesn't appear in closer:** `useInView` is one-shot — once `inView` is true, it stays true. Verify the `{inView && <Suspense>...}` gate is wrapping the HeroOrb AND the `ref={ref}` is on the outer `<section>`.

**Dollar figure shows up somewhere:** grep `src/data/pricing.ts` for `$`, `USD`, `K · `, `K/`, `million`. The only acceptable dollar mention is `$400K` inside a ROI-pattern panel body quoting the Qira outcome (it's a customer outcome stat, not a pricing figure). If you prefer to strip even that reference, edit the ROI body to phrase it non-monetarily (e.g. "recovered revenue per clinic per year").

**CTA mailto doesn't pre-fill correctly:** verify the `ctaHref` in each Door entry uses URL-encoded `%20` for spaces in the subject line.

**`/pricing` URL goes to a 404 or shows old content:** verify `src/App.tsx` still has `<Route path="/pricing" element={<PricingPage />} />` — this should have been unchanged across the plan.
