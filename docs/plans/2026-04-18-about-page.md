# About Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite `/about` as a credibility-lead page — SOC 2 Type 1 / HIPAA / GDPR / ISO 27001 certifications, named team grid, 3 customer success stories, merged beliefs/principles, horizontal timeline, slate-palette closer. Drops legacy `PageCinematicWrap` / `giantText` / emoji icons / `.sr` class entrance.

**Architecture:** One page rewrite (`AboutPage.tsx`), 7 new components (`CertificationsStrip`, `StatRow`, `SuccessStories`, `TeamGrid`, `HowWeWork`, `TimelineStrip`, `AboutCloser`), one data file (`src/data/about.ts`) as single source of truth. All content lives in `about.ts`; components are pure consumers. Page wrapped in `<MotionConfig reducedMotion="user">` for prefers-reduced-motion honoring. Slate palette (`#475569` hero / `#1e2a3a`+`#a0b0c8`+`#c8d0dc` orb) distinct from the 5 other v2 pages.

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind · `framer-motion` (MotionConfig + motion + AnimatePresence) · `lucide-react` for certification + story icons · Three.js (via lazy `HeroOrb`) for closer orb · existing utilities (`.cf-grid`, `.micro-upper`, `.capsule-light`, `.capsule-dark`) and CSS vars (`--serif`, `--mono`, `--bg-s2`).

**Design doc:** `docs/plans/2026-04-18-about-page-design.md`

---

## Pre-implementation checklist

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
# Expected: "✓ built in ..." zero errors

git log --oneline -3
# Expected HEAD: 943aae4 docs(about): add design doc for /about credibility-lead redesign
```

Preview `/about` today — you'll see the current page (amber hero, `giantText="ABOUT"`, emoji-iconed principles, grey stat cards). By the end of this plan the page becomes a 10-section slate-palette credibility-lead page.

---

## Task 1: Data foundation — `src/data/about.ts`

**Files:**
- Create: `src/data/about.ts`

**Purpose:** Single source of truth for /about. All components are pure consumers. **Includes 6 TBD placeholder expert slots** — user fills in real names + roles in this file before shipping. Component handles missing/empty gracefully but plan assumes 6 filled entries.

**Step 1: Create the file with exactly this content:**

```ts
/**
 * about.ts — data source for the /about page.
 *
 * Single source of truth. All 10 sections on /about consume from here.
 * Before shipping: user must fill in EXPERTS with real names + roles
 * (the TBD placeholders below are not appropriate for production).
 */

export type CertStatus = 'certified' | 'type-1' | 'compliant';

export type Certification = {
  id: 'soc2' | 'hipaa' | 'gdpr' | 'iso27001';
  name: string;
  statusLabel: string;
  iconName: string;
};

export type Stat = {
  metric: string;
  label: string;
};

export type Founder = {
  name: string;
  role: string;
  region: string;
  initials: string;
  bio: string;
  linkedinUrl?: string;
};

export type Expert = {
  name: string;
  role: string;
  initials: string;
};

export type SuccessStory = {
  client: string;
  region: string;
  metric: string;
  outcome: string;
  iconName: string;
  proofChip: string;
};

export type WorkPrinciple = {
  num: string;
  label: string;
  title: string;
  titleAccent: string;
  body: string;
};

export type TimelineNode = {
  year: string;
  label: string;
  body: string;
};

// ── Certifications ─────────────────────────────────────────────────────

export const CERTIFICATIONS: Certification[] = [
  { id: 'soc2',     name: 'SOC 2',      statusLabel: 'Type 1 Certified', iconName: 'ShieldCheck' },
  { id: 'hipaa',    name: 'HIPAA',      statusLabel: 'Compliant',        iconName: 'Lock' },
  { id: 'gdpr',     name: 'GDPR',       statusLabel: 'Compliant',        iconName: 'Globe' },
  { id: 'iso27001', name: 'ISO 27001',  statusLabel: 'Certified',        iconName: 'FileCheck2' },
];

// ── Stats (for StatRow — same 4 as the current page) ───────────────────

export const STATS: Stat[] = [
  { metric: '18', label: 'Top experts in AI + product' },
  { metric: '5',  label: 'Agents live in production' },
  { metric: '3',  label: 'Enterprise clients · 3 industries' },
  { metric: '0',  label: 'Hallucination incidents · day one' },
];

// ── Founders (2 bios, expanded narrative) ──────────────────────────────

export const FOUNDERS: Founder[] = [
  {
    name: 'Puneet Kumar Ojha',
    role: 'Founder & CEO',
    region: 'Dubai',
    initials: 'PO',
    bio:
      'Spent years inside Deutsche Telekom as an Enterprise Architect \u2014 implementing AI across regulated workflows and watching it stop short of execution. The pattern repeated everywhere: impressive demos, brittle production, and teams still typing AI output into SAP by hand. Founded Attentions AI in 2023 to build the platform that finishes the job \u2014 on your hardware, with your data, for your regulator.',
  },
  {
    name: 'Ankit Agrahari',
    role: 'Founder & CTO',
    region: 'Pune',
    initials: 'AA',
    bio:
      'Architected enterprise integrations at Deutsche Telekom \u2014 the deep system-integration work that makes artiGen\u2019s execution layer possible. Knows what breaks when an AI output tries to post itself into a live ERP, and how to architect around it. Leads 18 top experts in AI, ML, product engineering, and domain expertise.',
  },
];

// ── Experts (6 slots — USER MUST FILL IN BEFORE SHIPPING) ─────────────

export const EXPERTS: Expert[] = [
  { name: '[Name TBD]', role: 'AI Research Lead \u00b7 Document intelligence',  initials: 'TB' },
  { name: '[Name TBD]', role: 'Platform Engineering Lead \u00b7 Sovereign runtime', initials: 'TB' },
  { name: '[Name TBD]', role: 'ERP Connectors Lead \u00b7 SAP / Epic integrations', initials: 'TB' },
  { name: '[Name TBD]', role: 'Voice AI Lead \u00b7 Real-time transcription',    initials: 'TB' },
  { name: '[Name TBD]', role: 'Governance & Compliance \u00b7 Audit trail',     initials: 'TB' },
  { name: '[Name TBD]', role: 'Product Design Lead \u00b7 Operator workflows',   initials: 'TB' },
];

export const EXPERT_TOTAL_COUNT = 18;

// ── Success stories (Thomson / Qira / Daimler, About framing) ──────────

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    client: 'Thomson Group UAE',
    region: 'AP \u00b7 Dubai',
    metric: '88%',
    outcome:
      'Invoices posted no-touch to SAP. 200+/day. Week 1 ROI across 20+ business units.',
    iconName: 'Building2',
    proofChip: 'LIVE \u00b7 20+ BUSINESS UNITS',
  },
  {
    client: 'Qira Labs US',
    region: 'Clinical Ops \u00b7 Multi-state',
    metric: '$400K+',
    outcome:
      'Revenue recovered per clinic per year. 38 locations. Zero system replacements.',
    iconName: 'Stethoscope',
    proofChip: 'LIVE \u00b7 HIPAA \u00b7 AUDIO DISCARDED',
  },
  {
    client: 'Daimler Asia',
    region: 'Quality Engineering',
    metric: '1.2M',
    outcome:
      'Reports cross-correlated. Root cause in hours, not weeks. 8D drafts auto-cited from source.',
    iconName: 'Factory',
    proofChip: 'LIVE \u00b7 AUTO-CITED 8D',
  },
];

// ── How we work (5 merged beliefs + principles) ───────────────────────

export const WORK_PRINCIPLES: WorkPrinciple[] = [
  {
    num: '01',
    label: 'Purpose-built',
    title: 'Built for your workflow.',
    titleAccent: 'Not prompt-wrapped around a demo.',
    body:
      'Generic models are trained on the world. Your workflows run on your data \u2014 your vendor master, your clinical codes, your schema. We fine-tune small LMs on what your business actually looks like. No templates. No foundation-model wrappers.',
  },
  {
    num: '02',
    label: 'Execution',
    title: 'We measure by what got done.',
    titleAccent: 'Not by what got summarized.',
    body:
      'The industry has spent five years making AI better at understanding. Enterprise doesn\u2019t need better understanding \u2014 it needs completion. The invoice read correctly is worthless if a human still has to post it. Every engagement is measured by work actually finished.',
  },
  {
    num: '03',
    label: 'Sovereignty',
    title: 'Sovereign by architecture.',
    titleAccent: 'Not by contract.',
    body:
      'Any vendor can promise your data stays safe. We make it structurally impossible to leave \u2014 your hardware, your network, your perimeter. Regulators can ask where the data went; the answer is "it didn\u2019t."',
  },
  {
    num: '04',
    label: 'Citations',
    title: 'Every output cites its source.',
    titleAccent: 'Hallucination is a design failure.',
    body:
      'In a system that recommends, a hallucination is embarrassing. In a system that executes, it\u2019s a liability. Every field, every decision, every flag traces to an exact document, page, and line. Three live clients in regulated industries. Zero hallucination incidents. Achievable as architecture.',
  },
  {
    num: '05',
    label: 'Outcomes',
    title: 'We own outcomes.',
    titleAccent: 'Not billable hours.',
    body:
      'We\u2019re not a consulting firm counting hours. ROI metrics defined at scoping. Production agent live on your infrastructure by the end. If the business case isn\u2019t delivering, we know before you do \u2014 and we revisit scope, not the invoice.',
  },
];

// ── Timeline (5 nodes, content verbatim from current page) ─────────────

export const TIMELINE: TimelineNode[] = [
  {
    year: 'Pre-2023',
    label: 'Deutsche Telekom',
    body:
      'Same pattern everywhere: impressive AI, zero automation. Finance teams typing into SAP. Doctors typing into Epic. Engineers writing 8Ds by hand.',
  },
  {
    year: '2023',
    label: 'Attentions AI Labs founded',
    body:
      'Dubai + Pune. One mission: finish the job. The platform that executes, not just understands.',
  },
  {
    year: '2023',
    label: 'First hire wave',
    body:
      '18 top experts in AI and product engineering joined. AI research, document intelligence, ERP connectors.',
  },
  {
    year: '2024',
    label: 'First production agents',
    body:
      'Thomson Group, Daimler Asia, Qira Labs went live. Three industries. Three document types. Zero hallucination incidents.',
  },
  {
    year: 'Today',
    label: 'Live in production',
    body:
      '5 agents live. 3 enterprise clients. 0 hallucination incidents. The shared platform is the moat.',
  },
];
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: `✓ built in ...` zero errors.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/data/about.ts
git commit -m "$(cat <<'EOF'
feat(about): add about.ts data source

Types + CERTIFICATIONS (4 certs, SOC 2 Type 1), STATS (4 numbers),
FOUNDERS (Puneet + Ankit, expanded bios), EXPERTS (6 TBD slots;
USER MUST FILL IN NAMES BEFORE SHIPPING), EXPERT_TOTAL_COUNT (18),
SUCCESS_STORIES (Thomson / Qira / Daimler, About framing),
WORK_PRINCIPLES (5 merged belief+principle items), TIMELINE
(5 nodes, content verbatim from current page).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: AboutPage skeleton — MotionConfig + hero + ClientsStrip + placeholders

**Files:**
- Modify (full rewrite): `src/pages/AboutPage.tsx`

**Purpose:** Replace the legacy page. New slate hero. `MotionConfig reducedMotion="user"` at root. `ClientsStrip` after hero. 8 placeholder sections for the yet-to-come components.

**Step 1: Replace entire contents of `src/pages/AboutPage.tsx` with:**

```tsx
import { MotionConfig } from 'framer-motion';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';

/**
 * AboutPage v2 — credibility-lead redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip → Certifications → Stats → Success stories →
 *   [parallax] → Team → How we work → Timeline → Closer
 *
 * Design: docs/plans/2026-04-18-about-page-design.md
 */
export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="About"
          title="Built to ship."
          titleAccent="Certified to scale."
          description="18 experts. Five production agents. Three enterprise clients. Zero hallucination incidents since day one. SOC 2 Type 1, HIPAA, GDPR, ISO 27001 — all certified."
          accent="#475569"
          orbColor="#c8d0dc"
          pills={[
            '18 experts',
            '5 agents live',
            '3 enterprise clients',
            '0 incidents',
            '4 certifications',
          ]}
        />

        <ClientsStrip />

        {/* TEMPORARY placeholders — replaced in Tasks 3–10 */}
        {['certs', 'stats', 'success', 'parallax', 'team', 'how', 'timeline', 'closer'].map((id) => (
          <section
            key={id}
            id={id}
            style={{
              minHeight: '30vh',
              padding: '60px 24px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <h2 className="font-display text-3xl text-center">{id} (placeholder)</h2>
          </section>
        ))}
      </main>
    </MotionConfig>
  );
}
```

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): rewrite AboutPage skeleton with slate hero

Drops PageCinematicWrap + giantText + useInView/sr entrance pattern +
amber accent. New "Built to ship. Certified to scale." hero with slate
(#475569) accent and 5 credibility pills. MotionConfig reducedMotion
honors prefers-reduced-motion. 8 placeholder sections temporarily.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: CertificationsStrip component

**Files:**
- Create: `src/components/about/CertificationsStrip.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `certs` placeholder with `<CertificationsStrip />`)

**Step 1: Create `src/components/about/CertificationsStrip.tsx`:**

```tsx
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { CERTIFICATIONS } from '../../data/about';

const ACCENT = '#475569';

/**
 * CertificationsStrip — 4-cert badge grid below ClientsStrip.
 * SOC 2 Type 1 / HIPAA / GDPR / ISO 27001 with Lucide icons.
 */
export default function CertificationsStrip() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="micro-upper" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Certified &amp; compliant
          </div>
        </motion.div>

        <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
          {CERTIFICATIONS.map((cert, idx) => {
            const Icon: LucideIcon =
              (Lucide as unknown as Record<string, LucideIcon>)[cert.iconName] ??
              Lucide.ShieldCheck;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                className="flex flex-col items-center text-center rounded-3xl p-6 md:p-7"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                  }}
                >
                  <Icon size={28} style={{ color: ACCENT }} aria-hidden="true" />
                </div>
                <div
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(20px, 1.6vw, 24px)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: '#000000',
                  }}
                >
                  {cert.name}
                </div>
                <div
                  className="micro-upper"
                  style={{ color: ACCENT, fontSize: 11 }}
                >
                  {cert.statusLabel}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-center text-[14px]"
          style={{ color: 'rgba(0,0,0,0.50)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}
        >
          Audit reports available on request under NDA.
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into page — replace the `certs` placeholder.** Modify `src/pages/AboutPage.tsx`: add `import CertificationsStrip from '../components/about/CertificationsStrip';` and remove `'certs'` from the placeholder array, rendering `<CertificationsStrip />` in its place BEFORE the remaining placeholders.

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/CertificationsStrip.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add CertificationsStrip with 4 certs

SOC 2 Type 1 / HIPAA / GDPR / ISO 27001 badge strip below
ClientsStrip. 4-col desktop / 2x2 mobile with slate-tinted icon
squares, Fraunces cert names, mono status labels, NDA caption.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: StatRow component

**Files:**
- Create: `src/components/about/StatRow.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `stats` placeholder)

**Step 1: Create `src/components/about/StatRow.tsx`:**

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { STATS } from '../../data/about';

const ACCENT = '#475569';

/**
 * StatRow — 4-up metric grid. White cards, 1px slate top accent,
 * Fraunces italic metric + mono description.
 */
export default function StatRow() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(40px, 6vw, 80px) 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-4 md:gap-5 grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ height: 1, background: ACCENT }} />
              <div className="p-6 md:p-7 text-center">
                <div
                  className="leading-none mb-3"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {stat.metric}
                </div>
                <div
                  className="text-[12px] uppercase tracking-wider leading-snug"
                  style={{ color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--mono)' }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into page — replace `stats` placeholder with `<StatRow />`.**

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/StatRow.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add StatRow with 4 credibility metrics

18 experts / 5 agents / 3 enterprise clients / 0 incidents. White
cards, 1px slate top accent, Fraunces italic metric, mono description.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: SuccessStories component

**Files:**
- Create: `src/components/about/SuccessStories.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `success` placeholder)

**Step 1: Create `src/components/about/SuccessStories.tsx`:**

```tsx
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SUCCESS_STORIES } from '../../data/about';

const ACCENT = '#475569';

/**
 * SuccessStories — 3 customer outcome cards. Same Thomson/Qira/Daimler
 * data as /solutions and /agents, but framed as proof of delivery
 * (track record), not vertical fit.
 */
export default function SuccessStories() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px', background: 'var(--bg-s2)' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Proof of delivery
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Three enterprise clients.{' '}
            <span style={{ fontStyle: 'italic' }}>Production today.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {SUCCESS_STORIES.map((story, idx) => {
            const Icon: LucideIcon =
              (Lucide as unknown as Record<string, LucideIcon>)[story.iconName] ??
              Lucide.Building2;
            return (
              <motion.article
                key={story.client}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                className="flex flex-col overflow-hidden rounded-3xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  minHeight: 420,
                }}
              >
                <div style={{ height: 1, background: '#000000' }} />
                <div className="p-7 md:p-8 flex flex-col flex-1 gap-5">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${ACCENT}10`,
                      border: `1px solid ${ACCENT}20`,
                    }}
                  >
                    <Icon size={32} style={{ color: ACCENT }} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      className="font-display"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(22px, 1.8vw, 26px)',
                        fontWeight: 600,
                        color: '#000000',
                      }}
                    >
                      {story.client}
                    </div>
                    <div
                      className="micro-upper mt-1"
                      style={{ color: 'rgba(0,0,0,0.50)' }}
                    >
                      {story.region}
                    </div>
                  </div>
                  <div
                    className="leading-none"
                    style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(48px, 5vw, 72px)',
                      fontWeight: 600,
                      color: ACCENT,
                      filter: `drop-shadow(0 0 16px ${ACCENT}33)`,
                    }}
                  >
                    {story.metric}
                  </div>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: 'rgba(0,0,0,0.70)' }}
                  >
                    {story.outcome}
                  </p>
                  <div className="flex-1" />
                  <span
                    className="capsule-light rounded-full self-start"
                    style={{ fontSize: 11 }}
                  >
                    {story.proofChip}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into page — replace `success` placeholder.**

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/SuccessStories.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add SuccessStories with 3 customer cards

Thomson (88% no-touch), Qira ($400K+ recovered), Daimler (1.2M
reports) cards in About framing — proof of delivery track record,
not vertical fit. White cards, 1px black top strip, Lucide icon
squares, big italic slate metric, outcome paragraph, proof chip.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: ParallaxHero divider

**Files:**
- Modify: `src/pages/AboutPage.tsx` (replace `parallax` placeholder)

**Step 1: Add import at top of AboutPage.tsx:**

```tsx
import ParallaxHero from '../components/ParallaxHero';
```

**Step 2: Replace the `parallax` placeholder with:**

```tsx
<ParallaxHero
  imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
  headline="Shipped. Audited."
  headlineAccent="Live."
  subline="Three enterprise clients in regulated industries. Zero hallucination incidents since day one. Four certifications on file."
  label="The track record"
  height="60vh"
  clipRadius={24}
/>
```

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add ParallaxHero divider between success stories and team

"Shipped. Audited. Live." — reinforces track record spine before the
team + how-we-work + timeline layer.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: TeamGrid component

**Files:**
- Create: `src/components/about/TeamGrid.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `team` placeholder)

**Step 1: Create `src/components/about/TeamGrid.tsx`:**

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { FOUNDERS, EXPERTS, EXPERT_TOTAL_COUNT } from '../../data/about';

const ACCENT = '#475569';

/**
 * TeamGrid — 2 founder bios (richer) + 5–8 named experts grid +
 * aggregate footer "+ N more across AI research, ML engineering,
 * data science, domain expertise".
 */
export default function TeamGrid() {
  const [ref, inView] = useInView<HTMLElement>(0.1);
  const remaining = EXPERT_TOTAL_COUNT - EXPERTS.length - FOUNDERS.length;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The team
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Founders who shipped.{' '}
            <span style={{ fontStyle: 'italic' }}>Experts who deliver.</span>
          </h2>
        </motion.div>

        {/* Founders block */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {FOUNDERS.map((founder, idx) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-start gap-5 mb-5">
                <div
                  className="w-[80px] h-[80px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 24,
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {founder.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 28,
                      fontWeight: 500,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                    }}
                  >
                    {founder.name}
                  </div>
                  <div
                    className="micro-upper mt-1"
                    style={{ color: ACCENT }}
                  >
                    {founder.role} · {founder.region}
                  </div>
                </div>
              </div>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.70)' }}
              >
                {founder.bio}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Experts grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTS.map((expert, idx) => (
            <motion.div
              key={`${expert.name}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
              className="rounded-2xl p-5"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${ACCENT}0d`,
                    border: `1px solid ${ACCENT}1a`,
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 18,
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {expert.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 18,
                      fontWeight: 500,
                      color: '#000000',
                      lineHeight: 1.1,
                    }}
                  >
                    {expert.name}
                  </div>
                  <div
                    className="mt-1 text-[12px] leading-snug"
                    style={{ color: 'rgba(0,0,0,0.55)' }}
                  >
                    {expert.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate footer */}
        {remaining > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center text-[14px]"
            style={{
              color: 'rgba(0,0,0,0.55)',
              fontStyle: 'italic',
              fontFamily: 'var(--serif)',
            }}
          >
            + {remaining} more across AI research, ML engineering, data science, domain expertise.
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Wire into page — replace `team` placeholder.**

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/TeamGrid.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add TeamGrid with founders + experts + aggregate

Founders block (Puneet + Ankit, expanded bios) + experts grid
(6 slots, TBD names) + "+ N more" aggregate footer tallying to
EXPERT_TOTAL_COUNT (18).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: HowWeWork component

**Files:**
- Create: `src/components/about/HowWeWork.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `how` placeholder)

**Step 1: Create `src/components/about/HowWeWork.tsx`:**

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { WORK_PRINCIPLES } from '../../data/about';

const ACCENT = '#475569';

/**
 * HowWeWork — 5 merged beliefs/principles items. Vertical stack.
 * Each item: number + micro-upper label + Fraunces title with italic
 * accent + grey body paragraph.
 */
export default function HowWeWork() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px', background: 'var(--bg-s2)' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[880px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            How we work
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Five commitments.{' '}
            <span style={{ fontStyle: 'italic' }}>Every engagement.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {WORK_PRINCIPLES.map((item, idx) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                borderLeft: `3px solid ${ACCENT}`,
              }}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <div
                  className="flex-shrink-0"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 32,
                    fontWeight: 600,
                    color: ACCENT,
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </div>
                <div
                  className="micro-upper"
                  style={{ color: 'rgba(0,0,0,0.55)' }}
                >
                  {item.label}
                </div>
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                {item.title}{' '}
                <span style={{ fontStyle: 'italic', color: ACCENT }}>
                  {item.titleAccent}
                </span>
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.70)' }}
              >
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into page — replace `how` placeholder.**

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/HowWeWork.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add HowWeWork with 5 merged principles

Replaces the old 5 beliefs + 5 principles duplication with 5 merged
items (PURPOSE-BUILT / EXECUTION / SOVEREIGNTY / CITATIONS / OUTCOMES).
White cards with 3px slate left-border accent, numbered, Fraunces
title with italic accent, grey body.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: TimelineStrip component

**Files:**
- Create: `src/components/about/TimelineStrip.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `timeline` placeholder)

**Step 1: Create `src/components/about/TimelineStrip.tsx`:**

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { TIMELINE } from '../../data/about';

const ACCENT = '#475569';

/**
 * TimelineStrip — 5-node horizontal timeline on desktop, vertical
 * on mobile. Uniform slate accent (no per-node colors).
 */
export default function TimelineStrip() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The journey
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            From idea{' '}
            <span style={{ fontStyle: 'italic' }}>to live in production.</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-5 gap-6 md:gap-4">
          <div
            className="hidden md:block absolute left-[10%] right-[10%] top-[42px] h-[1px] pointer-events-none"
            style={{ borderTop: `1px dashed ${ACCENT}40` }}
          />
          {TIMELINE.map((node, idx) => (
            <motion.div
              key={`${node.year}-${node.label}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="relative z-10 w-[84px] h-[84px] rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `${ACCENT}0d`,
                  border: `1px solid ${ACCENT}26`,
                }}
              >
                <span
                  className="micro-upper"
                  style={{ color: ACCENT, fontSize: 11 }}
                >
                  {node.year}
                </span>
              </div>
              <div
                className="mb-2"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#000000',
                  lineHeight: 1.2,
                }}
              >
                {node.label}
              </div>
              <div
                className="text-[12px] leading-snug"
                style={{ color: 'rgba(0,0,0,0.60)' }}
              >
                {node.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into page — replace `timeline` placeholder.**

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/TimelineStrip.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add TimelineStrip with 5-node horizontal timeline

Content preserved from current page (Pre-2023 / 2023 founded /
2023 hires / 2024 production / Today). Uniform slate accent
replaces the old per-node color backgrounds. Horizontal strip
on desktop, vertical stack on mobile, dashed connecting line.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: AboutCloser component

**Files:**
- Create: `src/components/about/AboutCloser.tsx`
- Modify: `src/pages/AboutPage.tsx` (replace `closer` placeholder, remove placeholder loop entirely)

**Step 1: Create `src/components/about/AboutCloser.tsx`:**

```tsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * AboutCloser — deep-slate closing manifesto. Mirrors AgentsCloser /
 * SolutionsCloser / PricingCloser with slate palette.
 */
export default function AboutCloser() {
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
                    baseColor="#1e2a3a"
                    attenuationColor="#a0b0c8"
                    envColor="#c8d0dc"
                    attenuationDistance={0.9}
                    breatheAmp={0.14}
                    floatAmp={0.25}
                  />
                </Suspense>
              )}
            </div>
          </motion.div>

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
              The measure
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
              We ship agents.{' '}
              <span style={{ fontStyle: 'italic' }}>You ship outcomes.</span>
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
              Thomson&rsquo;s AP team. Qira&rsquo;s doctors. Daimler&rsquo;s
              engineers. They don&rsquo;t see our platform &mdash; they see
              work finished. That&rsquo;s what we built for. That&rsquo;s
              the measure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Finalize AboutPage.tsx — remove placeholder loop entirely**

Final state of `src/pages/AboutPage.tsx` after this task:

```tsx
import { MotionConfig } from 'framer-motion';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';
import ParallaxHero from '../components/ParallaxHero';
import CertificationsStrip from '../components/about/CertificationsStrip';
import StatRow from '../components/about/StatRow';
import SuccessStories from '../components/about/SuccessStories';
import TeamGrid from '../components/about/TeamGrid';
import HowWeWork from '../components/about/HowWeWork';
import TimelineStrip from '../components/about/TimelineStrip';
import AboutCloser from '../components/about/AboutCloser';

/**
 * AboutPage v2 — credibility-lead redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip → Certifications → Stats → Success stories →
 *   [parallax] → Team → How we work → Timeline → Closer
 *
 * Design: docs/plans/2026-04-18-about-page-design.md
 */
export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="About"
          title="Built to ship."
          titleAccent="Certified to scale."
          description="18 experts. Five production agents. Three enterprise clients. Zero hallucination incidents since day one. SOC 2 Type 1, HIPAA, GDPR, ISO 27001 — all certified."
          accent="#475569"
          orbColor="#c8d0dc"
          pills={[
            '18 experts',
            '5 agents live',
            '3 enterprise clients',
            '0 incidents',
            '4 certifications',
          ]}
        />

        <ClientsStrip />

        <CertificationsStrip />

        <StatRow />

        <SuccessStories />

        <ParallaxHero
          imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          headline="Shipped. Audited."
          headlineAccent="Live."
          subline="Three enterprise clients in regulated industries. Zero hallucination incidents since day one. Four certifications on file."
          label="The track record"
          height="60vh"
          clipRadius={24}
        />

        <TeamGrid />

        <HowWeWork />

        <TimelineStrip />

        <AboutCloser />
      </main>
    </MotionConfig>
  );
}
```

**Step 3: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/about/AboutCloser.tsx src/pages/AboutPage.tsx
git commit -m "$(cat <<'EOF'
feat(about): add AboutCloser with deep-slate orb + manifesto

Two-column closer. Deep-slate palette (#1e2a3a / #a0b0c8 / #c8d0dc)
distinct from teal (agents), blue (platform), amber (solutions),
forest (pricing). Lazy-mounts orb on useInView. "We ship agents.
You ship outcomes." thesis manifesto. Finalizes /about page:
placeholder loop removed, all 10 sections wired up.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Final verification pass

**No files changed.** This task catches regressions.

**Step 1: Full build**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 2: Visual QA checklist — preview `http://localhost:5174/about`**

- [ ] Hero: deep-slate accent (`#475569`), cool-neutral orb, 5 pills (18 experts / 5 agents / 3 clients / 0 incidents / 4 certifications).
- [ ] ClientsStrip renders below hero.
- [ ] CertificationsStrip: 4 cards — SOC 2 Type 1 Certified · HIPAA Compliant · GDPR Compliant · ISO 27001 Certified. Slate-tinted icon squares. "Audit reports available on request under NDA." caption.
- [ ] StatRow: 4 cards — 18 / 5 / 3 / 0. White cards, 1px slate top strip, italic Fraunces metric.
- [ ] SuccessStories: 3 cards with "Proof of delivery" heading. Thomson 88% · Qira $400K+ · Daimler 1.2M.
- [ ] ParallaxHero divider: server-room/enterprise image, "Shipped. Audited. *Live.*" in mix-blend-difference, label "THE TRACK RECORD".
- [ ] TeamGrid: 2 founder cards (Puneet + Ankit, expanded bios) + 6 expert cards (TBD names — these need to be filled in before shipping) + "+ 10 more..." footer.
- [ ] HowWeWork: 5 merged items with slate left-border, numbered 01–05, labels PURPOSE-BUILT / EXECUTION / SOVEREIGNTY / CITATIONS / OUTCOMES.
- [ ] TimelineStrip: 5 nodes horizontal on desktop (Pre-2023 / 2023 / 2023 / 2024 / Today), vertical on mobile. Dashed slate connecting line desktop.
- [ ] AboutCloser: deep-slate orb animating (breathing + float), "THE MEASURE" label, "We ship agents. *You ship outcomes.*" headline, italic supporting paragraph.

**Step 3: TBD expert names check**

- [ ] TeamGrid shows "[Name TBD]" entries 6 times. This is expected until you fill in real names in `src/data/about.ts`. **Before deploying to production,** edit EXPERTS in `src/data/about.ts` with real names + roles + initials. The component gracefully handles any number of entries from 0–N.

**Step 4: Responsive check**

- [ ] ~375px mobile: hero stacks, all 4-col grids stack 1-col, timeline stacks vertically, orb+manifesto stack in closer.
- [ ] ~768px tablet: 4-col grids become 2×2, timeline already in 5-col (may feel tight — acceptable).

**Step 5: Motion-reduction check**

- [ ] Browser devtools → emulate `prefers-reduced-motion: reduce`. Reload. Entrance animations skip; orb animation muted.

**Step 6: Other pages unaffected**

- [ ] `/`, `/platform`, `/agents`, `/solutions`, `/pricing` all render unchanged.

**Step 7: Legacy pattern audit**

Grep `src/pages/AboutPage.tsx` for old patterns — must return ZERO matches:

```bash
cd /Users/puneet/website-attentions-miro/app && grep -n "PageCinematicWrap\|giantText\|display-hero\|display-2\|sr d-\|🛡\|🚀\|🤝" src/pages/AboutPage.tsx src/components/about/*.tsx
```

Expected: zero matches.

**Step 8: No commit needed unless fixes surfaced**

If all checks pass, no commit. If a fix was needed, commit under `fix(about): ...`.

---

## Summary of files touched

**Created (8 + 1 plan):**
- `src/data/about.ts`
- `src/components/about/CertificationsStrip.tsx`
- `src/components/about/StatRow.tsx`
- `src/components/about/SuccessStories.tsx`
- `src/components/about/TeamGrid.tsx`
- `src/components/about/HowWeWork.tsx`
- `src/components/about/TimelineStrip.tsx`
- `src/components/about/AboutCloser.tsx`
- `docs/plans/2026-04-18-about-page.md` (this plan)

**Modified (1 file, rewritten + layered 10x):**
- `src/pages/AboutPage.tsx`

**Deleted:** none.

**Total commits:** 10 (Tasks 1–10; Task 11 may be a no-op).

---

## User post-ship todo

Before public deploy:
1. Fill in real names + roles + initials in `src/data/about.ts` → `EXPERTS` array (replace the 6 `[Name TBD]` slots with actual employees).
2. Confirm SOC 2 Type 2 audit status — if Type 2 is in-progress, update `CERTIFICATIONS` entry to `statusLabel: 'Type 1 Certified · Type 2 in audit'`.
3. (Optional) Add `linkedinUrl` on founders if public-facing links are desired.

---

## If something goes wrong

**TypeScript error on motion imports:** verify `import { motion } from 'framer-motion'` (not `'motion/react'`). Both paths exist in some environments but this project uses `'framer-motion'` consistently.

**Lucide icon doesn't render:** verify the `iconName` string matches an exact Lucide export (e.g., `'ShieldCheck'` not `'ShieldChecked'`). The fallback lookup returns `HelpCircle` silently.

**"+ N more" aggregate shows wrong count:** verify `EXPERT_TOTAL_COUNT = 18` in `src/data/about.ts`. The component computes `remaining = EXPERT_TOTAL_COUNT - EXPERTS.length - FOUNDERS.length`. With 6 experts + 2 founders, remaining = 10.

**Orb doesn't appear in closer:** verify `{inView && <Suspense>...}` wraps the HeroOrb. `useInView` is one-shot — once in view it stays mounted.

**Timeline looks cramped on 1280px viewport:** the 5-col grid with 84px circles + text gives each column ~250px. If text wraps ugly, shrink circle to 72px or reduce `md:gap-4` to `md:gap-2`.
