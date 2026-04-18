# Solutions Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign `/case-studies` as an industry-first `/solutions` landing page — 9 sections covering 10 industries (3 in production + 7 adjacent), with an Agent × Industry matrix that proves the 5 sovereign agents extend horizontally.

**Architecture:** One new page (`SolutionsPage.tsx`), 5 new components (`IndustrySwitcher`, `IndustryAnchorSection`, `AgentIndustryMatrix`, `AdjacentIndustries`, `SolutionsCloser`), one data module (`src/data/solutions.ts`) as the single source of truth. All 10 industries, the 5×10 matrix, and the adjacent-industry copy live in `solutions.ts`. Components are pure consumers of that data. Routing: `/solutions` is primary, `/case-studies` redirects to `/solutions` for back-compat. Visual QA replaces unit tests — this codebase has no test suite; verification is `npm run build` + browser preview at `http://localhost:5174/solutions`.

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind CSS · `framer-motion` for motion · `lucide-react` for icons · Three.js (via lazy-loaded `HeroOrb`) for the closer orb · existing utilities: `.cf-grid`, `.micro-upper`, `.capsule-light`, `.capsule-dark`, CSS vars `--serif` / `--mono` / `--bg-s1..--bg-s5` · existing `PageHero`, `ParallaxHero`, `ClientsStrip`, `HeroOrb`, `useInView` components/hooks.

**Design doc:** `docs/plans/2026-04-18-solutions-page-design.md`

---

## Pre-implementation checklist

Before Task 1, verify the dev server can run and the current `/case-studies` page renders:

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
# Expected: "✓ built in ..." zero errors
```

Then start the preview server if not already running (via the Claude_Preview tool, name `attentions-dev`, or manually `npm run dev`). Preview at `http://localhost:5174/case-studies` should render the existing (pre-redesign) page.

If the build fails, stop and escalate — the plan assumes a clean baseline.

---

## Task 1: Data foundation — `src/data/solutions.ts`

**Files:**
- Create: `src/data/solutions.ts`

**Purpose:** Single source of truth for the page. All five components import from here.

**Step 1: Create the file with types + constants**

Create `src/data/solutions.ts` with this exact content:

```ts
/**
 * solutions.ts — data source for the /solutions page.
 *
 * Defines the 5 agents, 10 industries, 5×10 fit matrix with reasoning
 * strings, the 3 in-production anchor industries, and the 7 adjacent
 * industry card specs. Components in src/components/solutions/ are
 * pure consumers of this data.
 */

export type Fit = 'proven' | 'fits' | 'none';

export type AgentId = 'invoice' | 'voucher' | 'pcr' | 'voice' | 'patient';

export type IndustryId =
  | 'finance-logistics'
  | 'healthcare'
  | 'manufacturing'
  | 'insurance'
  | 'banking'
  | 'hospitality'
  | 'legal'
  | 'pharma'
  | 'aviation'
  | 'retail';

// ── Agents ────────────────────────────────────────────────────────────

export type Agent = {
  id: AgentId;
  name: string;
  short: string; // 2–3 word label
};

export const AGENTS: Agent[] = [
  { id: 'invoice',  name: 'Invoice Intelligence',   short: 'Invoice Intel' },
  { id: 'voucher',  name: 'Voucher Matching',       short: 'Voucher Match' },
  { id: 'pcr',      name: 'PCR Intelligence',       short: 'PCR Intel' },
  { id: 'voice',    name: 'Voice AI · SOAP',        short: 'Voice AI' },
  { id: 'patient',  name: 'Patient Experience OS',  short: 'Patient OS' },
];

// ── Industries ────────────────────────────────────────────────────────

export type Industry = {
  id: IndustryId;
  name: string;
  short: string;  // 2–4 char code for matrix header
  iconName: string; // Lucide icon name
  proven: boolean;
};

export const INDUSTRIES: Industry[] = [
  { id: 'finance-logistics', name: 'Finance & Logistics', short: 'F&L', iconName: 'Building2',    proven: true  },
  { id: 'healthcare',        name: 'Healthcare',          short: 'HC',  iconName: 'Stethoscope',  proven: true  },
  { id: 'manufacturing',     name: 'Manufacturing',       short: 'Mfg', iconName: 'Factory',      proven: true  },
  { id: 'insurance',         name: 'Insurance',           short: 'Ins', iconName: 'ShieldCheck',  proven: false },
  { id: 'banking',           name: 'Banking',             short: 'Bnk', iconName: 'Landmark',     proven: false },
  { id: 'hospitality',       name: 'Hospitality',         short: 'Hsp', iconName: 'Hotel',        proven: false },
  { id: 'legal',             name: 'Legal',               short: 'Leg', iconName: 'Scale',        proven: false },
  { id: 'pharma',            name: 'Pharma',              short: 'Phm', iconName: 'FlaskConical', proven: false },
  { id: 'aviation',          name: 'Aviation',            short: 'Avn', iconName: 'Plane',        proven: false },
  { id: 'retail',            name: 'Retail',              short: 'Ret', iconName: 'ShoppingBag',  proven: false },
];

// ── Fit matrix: 5 agents × 10 industries ──────────────────────────────

type Cell = { fit: Fit; reason: string };

export const FIT_MATRIX: Record<AgentId, Record<IndustryId, Cell>> = {
  invoice: {
    'finance-logistics': { fit: 'proven', reason: 'Live at Thomson — 200+ handwritten invoices/day posted no-touch to SAP.' },
    'healthcare':        { fit: 'fits',   reason: 'Hospital AP — vendor invoices across pharmacy, equipment, services.' },
    'manufacturing':     { fit: 'fits',   reason: 'Supplier AP across plants and business units.' },
    'insurance':         { fit: 'fits',   reason: 'Vendor AP — claims adjuster invoices, IT services, regional offices.' },
    'banking':           { fit: 'fits',   reason: 'Branch AP and expense management at scale.' },
    'hospitality':       { fit: 'fits',   reason: 'F&B, maintenance, linens, utilities — AP across properties.' },
    'legal':             { fit: 'fits',   reason: 'Firm AP — expert witnesses, court reporters, outside counsel.' },
    'pharma':            { fit: 'fits',   reason: 'CRO invoices, clinical trial suppliers, lab services.' },
    'aviation':          { fit: 'fits',   reason: 'Parts, maintenance, ground handling, catering — heavy AP.' },
    'retail':            { fit: 'fits',   reason: 'Thousands of suppliers × tens of thousands of SKUs.' },
  },
  voucher: {
    'finance-logistics': { fit: 'proven', reason: 'Live at Thomson — 200-page vouchers matched in 5 min (was 2 hrs).' },
    'healthcare':        { fit: 'none',   reason: '' },
    'manufacturing':     { fit: 'fits',   reason: 'Supplier reconciliation — PO + GRN + invoice + contract packets.' },
    'insurance':         { fit: 'fits',   reason: 'Claims bundles are voucher packets — same multi-doc correlation.' },
    'banking':           { fit: 'fits',   reason: 'Trade finance — LC, bill of lading, shipping docs in one packet.' },
    'hospitality':       { fit: 'none',   reason: '' },
    'legal':             { fit: 'fits',   reason: 'E-discovery — thousands of docs correlated against claims.' },
    'pharma':            { fit: 'fits',   reason: 'Clinical trial docs — protocol + consent + lab + regulatory packet.' },
    'aviation':          { fit: 'fits',   reason: 'Maintenance records — part + work order + inspection packet.' },
    'retail':            { fit: 'none',   reason: '' },
  },
  pcr: {
    'finance-logistics': { fit: 'none',   reason: '' },
    'healthcare':        { fit: 'fits',   reason: 'Adverse event reports — same knowledge-graph pattern as PCRs.' },
    'manufacturing':     { fit: 'proven', reason: 'Live at Daimler — 1.2M+ reports indexed, root cause in hours.' },
    'insurance':         { fit: 'fits',   reason: 'Claims correlation — find the same incident described 3 ways.' },
    'banking':           { fit: 'none',   reason: '' },
    'hospitality':       { fit: 'none',   reason: '' },
    'legal':             { fit: 'none',   reason: '' },
    'pharma':            { fit: 'fits',   reason: 'Adverse events and pharmacovigilance — graph of similar reactions.' },
    'aviation':          { fit: 'fits',   reason: 'Incident reports at fleet scale — exactly the PCR pattern.' },
    'retail':            { fit: 'fits',   reason: 'Product defect QA — correlate complaints across channels.' },
  },
  voice: {
    'finance-logistics': { fit: 'none',   reason: '' },
    'healthcare':        { fit: 'proven', reason: 'Live at Qira — SOAP + ICD-10 in ~30s. Audio discarded.' },
    'manufacturing':     { fit: 'fits',   reason: 'Field inspection voice notes → structured defect reports.' },
    'insurance':         { fit: 'fits',   reason: 'Adjuster calls → structured claim notes with cited findings.' },
    'banking':           { fit: 'fits',   reason: 'Wealth advisory calls → compliant client summaries.' },
    'hospitality':       { fit: 'fits',   reason: 'Concierge + service calls → structured guest records.' },
    'legal':             { fit: 'fits',   reason: 'Depositions and client calls → transcript + citations.' },
    'pharma':            { fit: 'fits',   reason: 'Patient-reported outcome interviews → structured trial data.' },
    'aviation':          { fit: 'none',   reason: '' },
    'retail':            { fit: 'none',   reason: '' },
  },
  patient: {
    'finance-logistics': { fit: 'none',   reason: '' },
    'healthcare':        { fit: 'proven', reason: 'Live at Qira — $400K+ recovered/location, no system replacements.' },
    'manufacturing':     { fit: 'none',   reason: '' },
    'insurance':         { fit: 'fits',   reason: 'Claims intake + follow-up across 6–12 policy/claims tools.' },
    'banking':           { fit: 'fits',   reason: 'Wealth client service — every call answered, every tool synced.' },
    'hospitality':       { fit: 'fits',   reason: 'Front desk 24/7 across PMS, booking, CRM — zero replacement.' },
    'legal':             { fit: 'fits',   reason: 'Intake calls, scheduling, conflict-check — across intake tools.' },
    'pharma':            { fit: 'none',   reason: '' },
    'aviation':          { fit: 'none',   reason: '' },
    'retail':            { fit: 'fits',   reason: 'Customer service — returns, warranty, order status 24/7.' },
  },
};

// ── Anchor industries (3 in-production, full case study context) ──────

export type AnchorIndustry = {
  id: IndustryId;
  accent: string;       // hex color for the section accent
  docs: string[];       // 4–5 document types
  agents: AgentId[];    // which of the 5 apply
  client: string;
  region: string;
  metric: string;       // big display metric
  metricLabel: string;  // 1-line explanation below metric
  quote: string;
  attrib: string;
  chips: string[];      // 3 capsule-light proof chips
};

export const ANCHOR_INDUSTRIES: AnchorIndustry[] = [
  {
    id: 'finance-logistics',
    accent: '#187574',
    docs: [
      'Handwritten invoices',
      'Multi-currency vouchers',
      'POs, GRNs, cheques',
      'SOWs & contracts',
    ],
    agents: ['invoice', 'voucher'],
    client: 'Thomson Group UAE',
    region: 'Dubai · 20+ business units',
    metric: '88%',
    metricLabel: 'invoices posted to SAP with zero human touch',
    quote:
      'The team only sees the 12% that actually needs a human decision. Everything else is done. Posted. Audited. Before we\u2019ve had our morning coffee.',
    attrib: 'Thomson Group UAE · Accounts Payable',
    chips: ['LIVE · 200+ INVOICES/DAY', 'WEEK 1 ROI', '0 HALLUCINATION INCIDENTS'],
  },
  {
    id: 'healthcare',
    accent: '#8a2c6a',
    docs: [
      'Clinical consults (voice)',
      'SOAP notes + ICD-10',
      'Dentrix / Epic / OpenDental',
      'Insurance intake',
    ],
    agents: ['voice', 'patient'],
    client: 'Qira Labs US',
    region: '38 locations · multi-state',
    metric: '$400K+',
    metricLabel: 'recovered per location per year',
    quote:
      'The doctors look at the patients again, not the screens. The patients notice. The notes are better than what we were hand-typing.',
    attrib: 'Qira Labs US · Clinical Operations',
    chips: ['LIVE · 38 LOCATIONS', 'HIPAA', 'AUDIO DISCARDED'],
  },
  {
    id: 'manufacturing',
    accent: '#2f5d14',
    docs: [
      'Product Concern Reports',
      '8D reports (D1–D8)',
      'Dealer management exports',
      'Supplier traceability',
    ],
    agents: ['pcr'],
    client: 'Daimler Asia',
    region: 'Regional quality operations',
    metric: '1.2M',
    metricLabel: 'reports indexed, root cause in hours',
    quote:
      'For the first time, root cause traces back to a supplier batch in hours. Our engineers spend their time fixing, not hunting.',
    attrib: 'Daimler Asia · Quality Engineering',
    chips: ['LIVE · 1.2M+ REPORTS', 'HOURS TO ROOT CAUSE', 'AUTO-CITED 8D'],
  },
];

// ── Adjacent industries (7 cards) ─────────────────────────────────────

export type AdjacentIndustry = {
  id: IndustryId;
  iconName: string;     // Lucide name
  headline: string;     // first line (no italic)
  headlineAccent: string; // second line (italic)
  body: string;         // 1–2 sentences
  agents: AgentId[];    // agents that apply
  outcomeChip: string;  // single capsule-light chip
};

export const ADJACENT_INDUSTRIES: AdjacentIndustry[] = [
  {
    id: 'insurance',
    iconName: 'ShieldCheck',
    headline: 'Claims.',
    headlineAccent: 'Cited.',
    body: 'Every claim is a multi-document packet. Every adjuster call needs a structured summary. Every disputed claim wants cross-correlation across thousands of similar ones.',
    agents: ['voucher', 'pcr', 'voice'],
    outcomeChip: 'FASTER CYCLE · CITED DECISIONS',
  },
  {
    id: 'banking',
    iconName: 'Landmark',
    headline: 'Trade finance.',
    headlineAccent: 'Reconciled.',
    body: 'Letters of credit, bills of lading, shipping docs — every trade finance transaction is a voucher packet. Plus AP across regional branches.',
    agents: ['voucher', 'invoice'],
    outcomeChip: '5-MIN RECONCILIATION · ZERO MISMATCH',
  },
  {
    id: 'hospitality',
    iconName: 'Hotel',
    headline: 'Every call.',
    headlineAccent: 'Answered.',
    body: 'Front desk never sleeps. Reservations, concierge, service recovery, group bookings \u2014 across 6\u201312 PMS, booking, and CRM tools.',
    agents: ['patient', 'invoice'],
    outcomeChip: '24/7 · NO SYSTEM REPLACEMENT',
  },
  {
    id: 'legal',
    iconName: 'Scale',
    headline: 'Depositions.',
    headlineAccent: 'Briefed.',
    body: 'E-discovery is document reconciliation at scale. Depositions are voice-to-structured transcripts. Intake calls are 24/7 scheduling.',
    agents: ['voucher', 'voice', 'patient'],
    outcomeChip: 'HOURS TO DRAFT · EVERY CALL LOGGED',
  },
  {
    id: 'pharma',
    iconName: 'FlaskConical',
    headline: 'Adverse events.',
    headlineAccent: 'Traced.',
    body: 'Adverse event reporting is PCR at scale. Clinical trial docs are voucher packets. Patient-reported outcomes are voice intake.',
    agents: ['pcr', 'voucher', 'voice'],
    outcomeChip: 'ROOT CAUSE IN HOURS · FDA-READY',
  },
  {
    id: 'aviation',
    iconName: 'Plane',
    headline: 'Incidents.',
    headlineAccent: 'Classified.',
    body: 'Every incident report. Every maintenance log. Every supplier packet. "The same failure described three ways" \u2014 we\u2019ve seen this movie.',
    agents: ['pcr', 'voucher', 'invoice'],
    outcomeChip: 'CROSS-FLEET CORRELATION · SUPPLIER-TRACED',
  },
  {
    id: 'retail',
    iconName: 'ShoppingBag',
    headline: 'Supplier chaos.',
    headlineAccent: 'Unified.',
    body: 'Thousands of suppliers. Tens of thousands of SKUs. Claims, returns, and warranty tickets \u2014 each a packet. Every customer call, a ticket.',
    agents: ['invoice', 'pcr', 'patient'],
    outcomeChip: 'AP AT SCALE · 24/7 SERVICE',
  },
];

// ── Lookups (convenience) ─────────────────────────────────────────────

export const AGENT_BY_ID: Record<AgentId, Agent> = Object.fromEntries(
  AGENTS.map((a) => [a.id, a])
) as Record<AgentId, Agent>;

export const INDUSTRY_BY_ID: Record<IndustryId, Industry> = Object.fromEntries(
  INDUSTRIES.map((i) => [i.id, i])
) as Record<IndustryId, Industry>;
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: `✓ built in ...` with zero TS errors. The file has no imports, so TS errors would indicate a syntax typo in the data.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/data/solutions.ts
git commit -m "$(cat <<'EOF'
feat(solutions): add solutions.ts data source

Types, 5 agents, 10 industries, 5x10 fit matrix with 1-line reasoning,
3 anchor industry specs, 7 adjacent industry card specs. Single source
of truth consumed by all /solutions page components.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add `/solutions` route + `/case-studies` redirect

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/SolutionsPage.tsx` (minimal placeholder for now; expanded in Task 9)

**Purpose:** Establish routing end-to-end before building components, so each component can be verified in place at `http://localhost:5174/solutions`.

**Step 1: Create minimal SolutionsPage**

Create `src/pages/SolutionsPage.tsx`:

```tsx
import PageHero from '../components/PageHero';

/**
 * SolutionsPage — industry-first landing.
 *
 * Story arc:
 *   Hero → ClientsStrip → IndustrySwitcher (sticky) → 3 anchor industries →
 *   [parallax] → Agent×Industry matrix → 7 adjacent industry cards →
 *   [parallax] → SolutionsCloser
 *
 * Design: docs/plans/2026-04-18-solutions-page-design.md
 */
export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        label="Solutions by industry"
        title="Your industry."
        titleAccent="Your agents."
        description="Five agents. Three industries in production. Seven more where the same pattern ships. Pick yours."
        accent="#d97706"
        orbColor="#e0c080"
        pills={[
          '10 industries',
          '5 sovereign agents',
          '3 in production',
          '0 hallucination incidents',
          'On-prem by default',
        ]}
      />
    </main>
  );
}
```

**Step 2: Update `src/App.tsx`**

Find and modify these 3 locations in `src/App.tsx`:

a) Imports (around line 13) — replace `CaseStudiesPage` import:

```diff
-import CaseStudiesPage from './pages/CaseStudiesPage';
+import SolutionsPage from './pages/SolutionsPage';
+import { Navigate } from 'react-router-dom';
```

Also add `Navigate` to the existing `react-router-dom` import on line 2 if cleaner:

```tsx
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
```

(Drop the separate `import { Navigate }` line if you inline it into the main import.)

b) `ROUTE_TO_MESH` map (around line 24) — add `/solutions` alongside the existing `/case-studies` entry:

```diff
   '/case-studies': 'caseStudies',
+  '/solutions': 'caseStudies',  // reuse existing mesh for now; renamed in Task 12
```

c) Route definitions (around line 89) — replace `/case-studies` route with two routes:

```diff
-        <Route path="/case-studies" element={<CaseStudiesPage />} />
+        <Route path="/solutions" element={<SolutionsPage />} />
+        <Route path="/case-studies" element={<Navigate to="/solutions" replace />} />
```

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: `✓ built in ...` zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/solutions` — hero renders with amber accent, 5 pills, orb on right. Preview `http://localhost:5174/case-studies` — redirects to `/solutions` (URL bar updates).

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/App.tsx src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add /solutions route with hero, redirect /case-studies

Amber/copper accent hero. /case-studies now redirects to /solutions
via <Navigate replace>. CaseStudiesPage still exists but unreachable.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: IndustrySwitcher — sticky segmented control

**Files:**
- Create: `src/components/solutions/IndustrySwitcher.tsx`
- Modify: `src/pages/SolutionsPage.tsx` (insert below PageHero)

**Purpose:** Sticky horizontal pill strip with 10 industries. Active pill tracks the currently visible industry section via IntersectionObserver. Click smooth-scrolls with ~96px offset.

**Step 1: Create the component**

Create `src/components/solutions/IndustrySwitcher.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import { INDUSTRIES } from '../../data/solutions';

/**
 * IndustrySwitcher — sticky 10-pill segmented control under the SiteNav.
 * Tracks the industry section currently in view and smooth-scrolls on click.
 * Mobile: horizontal overflow scroll; active pill auto-centers.
 */
export default function IndustrySwitcher() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const stripRef = useRef<HTMLDivElement>(null);

  // Track which industry section is currently in view
  useEffect(() => {
    const ids = INDUSTRIES.map((i) => i.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio among those intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Top-of-viewport band: active = the section just under the sticky switcher.
        rootMargin: '-120px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  // When active pill changes on mobile, center it in the scrollable strip
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const activePill = strip.querySelector<HTMLAnchorElement>(
      `[data-industry-pill="${activeId}"]`
    );
    if (activePill) {
      activePill.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const proven = INDUSTRIES.filter((i) => i.proven);
  const adjacent = INDUSTRIES.filter((i) => !i.proven);

  return (
    <div
      className="sticky top-[64px] z-40"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div
        ref={stripRef}
        className="max-w-[1400px] mx-auto flex items-center gap-3 px-6 py-3 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <span className="micro-upper flex-shrink-0" style={{ color: 'rgba(0,0,0,0.45)' }}>
          Jump to
        </span>

        {/* Proven group */}
        <span
          className="micro-upper flex-shrink-0 px-2"
          style={{ color: 'rgba(0,0,0,0.35)', fontSize: 10 }}
        >
          · IN PRODUCTION ·
        </span>
        {proven.map((i) => (
          <Pill key={i.id} id={i.id} active={activeId === i.id} onClick={onClick}>
            {i.name}
          </Pill>
        ))}

        {/* Adjacent group */}
        <span
          className="micro-upper flex-shrink-0 px-2"
          style={{ color: 'rgba(0,0,0,0.35)', fontSize: 10 }}
        >
          · ADJACENT ·
        </span>
        {adjacent.map((i) => (
          <Pill key={i.id} id={i.id} active={activeId === i.id} onClick={onClick}>
            {i.name}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function Pill({
  id,
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${id}`}
      data-industry-pill={id}
      onClick={(e) => onClick(e, id)}
      className="flex-shrink-0 inline-flex items-center rounded-full transition-all duration-150"
      style={{
        padding: '6px 14px',
        fontFamily: 'var(--mono)',
        fontSize: 12,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        background: active ? '#000000' : 'transparent',
        color: active ? '#ffffff' : 'rgba(0,0,0,0.60)',
        border: active ? '1px solid #000000' : '1px solid rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.20)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
      }}
    >
      {children}
    </a>
  );
}
```

**Step 2: Temporarily wire into SolutionsPage for visual verification**

Modify `src/pages/SolutionsPage.tsx` to add the switcher + 10 placeholder sections with `id=` matching each industry (so the observer and clicks have targets):

```tsx
import PageHero from '../components/PageHero';
import IndustrySwitcher from '../components/solutions/IndustrySwitcher';
import { INDUSTRIES } from '../data/solutions';

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        label="Solutions by industry"
        title="Your industry."
        titleAccent="Your agents."
        description="Five agents. Three industries in production. Seven more where the same pattern ships. Pick yours."
        accent="#d97706"
        orbColor="#e0c080"
        pills={[
          '10 industries',
          '5 sovereign agents',
          '3 in production',
          '0 hallucination incidents',
          'On-prem by default',
        ]}
      />

      <IndustrySwitcher />

      {/* TEMPORARY placeholder sections — replaced in Tasks 4, 6, 7 */}
      {INDUSTRIES.map((i) => (
        <section
          key={i.id}
          id={i.id}
          style={{ minHeight: '80vh', padding: '80px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display text-4xl text-center">{i.name} (placeholder)</h2>
        </section>
      ))}
    </main>
  );
}
```

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/solutions`:
- Switcher appears right below the hero with 10 pills + "JUMP TO" label + "IN PRODUCTION" / "ADJACENT" divider labels.
- Scroll down past the hero — switcher sticks below the top nav.
- Click a pill (say "Healthcare") — page smooth-scrolls to the healthcare placeholder section; pill highlights black.
- Scroll manually — active pill changes as sections enter the viewport near the top.
- Narrow browser to ~375px — strip horizontally scrolls; active pill auto-centers.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/solutions/IndustrySwitcher.tsx src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add sticky IndustrySwitcher with 10 pills

IntersectionObserver tracks active section, smooth-scroll with 96px
offset on click, mobile horizontal scroll with active-pill auto-center.
Placeholder industry sections wired up temporarily for QA.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: IndustryAnchorSection — reusable proven-industry block

**Files:**
- Create: `src/components/solutions/IndustryAnchorSection.tsx`
- Modify: `src/pages/SolutionsPage.tsx` (replace placeholder sections for the 3 proven industries)

**Purpose:** Self-contained section for each of the 3 proven industries. Takes data as props; renders a 2-column layout with docs + agents on the left, client + metric + quote + chips on the right.

**Step 1: Create the component**

Create `src/components/solutions/IndustryAnchorSection.tsx`:

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { AGENT_BY_ID, INDUSTRY_BY_ID, type AnchorIndustry } from '../../data/solutions';

/**
 * IndustryAnchorSection — one of the 3 in-production industry blocks.
 *
 * Two-column layout: docs + agents on the left, client card on the right.
 * Fraunces headline with italic last word, amber metric, quote, proof chips.
 */
export default function IndustryAnchorSection({ data }: { data: AnchorIndustry }) {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const industry = INDUSTRY_BY_ID[data.id];

  // Split industry name into main + italic-accent parts
  //   "Finance & Logistics" → main "Finance &" accent "Logistics"
  //   "Healthcare"          → main "Healthcare" accent "" (no split — italic the whole word)
  const parts = industry.name.split(' ');
  const lastWord = parts[parts.length - 1];
  const leadWords = parts.slice(0, -1).join(' ');
  const hasSplit = parts.length > 1;

  return (
    <section
      ref={ref}
      id={data.id}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="micro-upper mb-4" style={{ color: data.accent }}>
            In production
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            {hasSplit ? (
              <>
                {leadWords}{' '}
                <span style={{ fontStyle: 'italic', color: data.accent }}>{lastWord}</span>
              </>
            ) : (
              <span style={{ fontStyle: 'italic', color: data.accent }}>{lastWord}</span>
            )}
          </h2>
        </motion.div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
          {/* LEFT: docs + agents */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
              The documents
            </div>
            <ul className="mb-10 space-y-2">
              {data.docs.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-[17px] leading-relaxed"
                  style={{ color: 'rgba(0,0,0,0.80)' }}
                >
                  <span
                    className="mt-[10px] flex-shrink-0 rounded-full"
                    style={{ width: 6, height: 6, background: data.accent }}
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
              The agents
            </div>
            <div className="flex flex-wrap gap-2">
              {data.agents.map((aid) => (
                <span
                  key={aid}
                  className="inline-flex items-center rounded-full"
                  style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#000000',
                    background: `${data.accent}12`,
                    border: `1px solid ${data.accent}30`,
                  }}
                >
                  {AGENT_BY_ID[aid].name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: client card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}
          >
            {/* Client header */}
            <div className="mb-6">
              <div className="font-display text-[24px] md:text-[28px] font-semibold" style={{ color: '#000000' }}>
                {data.client}
              </div>
              <div className="micro-upper mt-1" style={{ color: 'rgba(0,0,0,0.50)' }}>
                {data.region}
              </div>
            </div>

            {/* Lead metric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-2 leading-none"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(56px, 7vw, 96px)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: data.accent,
                filter: `drop-shadow(0 0 20px ${data.accent}33)`,
              }}
            >
              {data.metric}
            </motion.div>
            <div
              className="mb-8 text-[14px]"
              style={{ color: 'rgba(0,0,0,0.55)', fontFamily: 'var(--mono)' }}
            >
              {data.metricLabel}
            </div>

            {/* Quote */}
            <blockquote
              className="mb-3 pl-5"
              style={{
                borderLeft: `3px solid ${data.accent}`,
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.75)',
              }}
            >
              &ldquo;{data.quote}&rdquo;
            </blockquote>
            <div
              className="mb-8 pl-5 text-[13px]"
              style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}
            >
              &mdash; {data.attrib}
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-2">
              {data.chips.map((c) => (
                <span key={c} className="capsule-light rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Wire into SolutionsPage**

Modify `src/pages/SolutionsPage.tsx`. Replace the 3 proven-industry placeholder sections (finance-logistics, healthcare, manufacturing) with actual `IndustryAnchorSection` calls, but keep placeholders for the 7 adjacent (those get real content in Task 7):

```tsx
import PageHero from '../components/PageHero';
import IndustrySwitcher from '../components/solutions/IndustrySwitcher';
import IndustryAnchorSection from '../components/solutions/IndustryAnchorSection';
import { INDUSTRIES, ANCHOR_INDUSTRIES } from '../data/solutions';

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        label="Solutions by industry"
        title="Your industry."
        titleAccent="Your agents."
        description="Five agents. Three industries in production. Seven more where the same pattern ships. Pick yours."
        accent="#d97706"
        orbColor="#e0c080"
        pills={[
          '10 industries',
          '5 sovereign agents',
          '3 in production',
          '0 hallucination incidents',
          'On-prem by default',
        ]}
      />

      <IndustrySwitcher />

      {/* 3 proven industries */}
      {ANCHOR_INDUSTRIES.map((a) => (
        <IndustryAnchorSection key={a.id} data={a} />
      ))}

      {/* TEMPORARY placeholder sections for the 7 adjacent (replaced in Task 7) */}
      {INDUSTRIES.filter((i) => !i.proven).map((i) => (
        <section
          key={i.id}
          id={i.id}
          style={{ minHeight: '50vh', padding: '80px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display text-3xl text-center">{i.name} (placeholder)</h2>
        </section>
      ))}
    </main>
  );
}
```

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/solutions`:
- Scroll past hero + switcher. First section: "Finance & Logistics" (italic "Logistics" in teal `#187574`).
- Left column: 4 bullet docs; "Invoice Intelligence" and "Voucher Matching" chips below.
- Right column: white card with Thomson Group UAE name + region, huge italic "88%" metric in teal with soft glow, quote with left border in teal, 3 capsule-light proof chips.
- Verify the left column slides in from the left on scroll-into-view; right column slides from the right; metric number scales in after a short delay.
- Scroll to "Healthcare" section: accent `#8a2c6a` pink/magenta; italic word is "Healthcare" (single-word italic).
- Scroll to "Manufacturing" section: accent `#2f5d14` green; italic word is "Manufacturing".
- Click a switcher pill — smooth-scroll lands with ~96px offset, the section label "IN PRODUCTION" is not hidden behind the sticky switcher.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/solutions/IndustryAnchorSection.tsx src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add IndustryAnchorSection for 3 proven industries

Two-column layout with docs + agent chips on the left, client card with
big italic metric + quote + proof chips on the right. Entrance slides
+ metric scale-in. Thomson/Qira/Daimler quotes preserved verbatim.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: AgentIndustryMatrix — 5×10 grid with hover tooltips

**Files:**
- Create: `src/components/solutions/AgentIndustryMatrix.tsx`
- Modify: `src/pages/SolutionsPage.tsx` (insert matrix + first parallax divider between anchor sections and the adjacent placeholders)

**Purpose:** The centerpiece. A 5-row × 10-col grid showing `proven`, `fits`, or `none` per cell, with a hover tooltip displaying a 1-sentence fit reasoning.

**Step 1: Create the component**

Create `src/components/solutions/AgentIndustryMatrix.tsx`:

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import {
  AGENTS,
  INDUSTRIES,
  FIT_MATRIX,
  type AgentId,
  type IndustryId,
} from '../../data/solutions';

/**
 * AgentIndustryMatrix — 5 agents × 10 industries fit grid.
 *
 * Cells show proven (filled teal-halo dot), fits (open ring), or none
 * (tiny grey dot). Hover reveals a 1-sentence reasoning tooltip.
 * Mobile: horizontal scroll with sticky first column.
 */
export default function AgentIndustryMatrix() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const [hovered, setHovered] = useState<{ a: AgentId; i: IndustryId } | null>(null);

  const reason = hovered ? FIT_MATRIX[hovered.a][hovered.i].reason : '';

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(96px, 12vw, 160px) 24px', background: 'var(--bg-s2)' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The pattern, ten ways
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
            Five agents. <span style={{ fontStyle: 'italic' }}>Ten industries.</span>
          </h2>
          <p
            className="mt-4 mx-auto max-w-[560px]"
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 1.3vw, 18px)',
              color: 'rgba(0,0,0,0.60)',
              lineHeight: 1.55,
            }}
          >
            Three cells are live in production today. Thirty-five more where
            the same pattern ships. Hover a cell for the one-line fit.
          </p>
        </motion.div>

        {/* Matrix — horizontal scroll on narrow viewports */}
        <div className="overflow-x-auto">
          <div
            className="grid relative"
            style={{
              minWidth: 900,
              gridTemplateColumns: '180px repeat(10, minmax(72px, 1fr))',
              rowGap: 0,
              columnGap: 0,
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 16,
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            {/* Header row: empty corner + 10 industry columns */}
            <div
              className="sticky left-0 z-[2]"
              style={{
                background: '#fafafa',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                borderRight: '1px solid rgba(0,0,0,0.08)',
              }}
            />
            {INDUSTRIES.map((ind) => {
              const Icon = (Lucide as any)[ind.iconName] ?? Lucide.HelpCircle;
              return (
                <div
                  key={ind.id}
                  className="flex flex-col items-center justify-end gap-1 px-1 py-3"
                  style={{
                    background: '#fafafa',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    borderRight: '1px solid rgba(0,0,0,0.04)',
                    minHeight: 72,
                  }}
                >
                  <Icon size={14} style={{ color: 'rgba(0,0,0,0.55)' }} />
                  <span
                    className="text-center leading-tight"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.65)',
                    }}
                  >
                    {ind.short}
                  </span>
                </div>
              );
            })}

            {/* 5 rows × (agent label + 10 cells) */}
            {AGENTS.map((agent, rowIdx) => (
              <>
                {/* Row header (agent name) */}
                <div
                  key={`${agent.id}-label`}
                  className="sticky left-0 z-[1] flex items-center justify-end px-4 py-3 text-right"
                  style={{
                    background: '#ffffff',
                    borderBottom:
                      rowIdx === AGENTS.length - 1
                        ? 'none'
                        : '1px solid rgba(0,0,0,0.04)',
                    borderRight: '1px solid rgba(0,0,0,0.08)',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.80)',
                    minHeight: 48,
                  }}
                >
                  {agent.short}
                </div>

                {/* 10 fit cells for this agent */}
                {INDUSTRIES.map((ind, colIdx) => {
                  const cell = FIT_MATRIX[agent.id][ind.id];
                  const isHovered =
                    hovered?.a === agent.id && hovered?.i === ind.id;
                  return (
                    <motion.div
                      key={`${agent.id}-${ind.id}`}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + colIdx * 0.05 }}
                      onMouseEnter={() =>
                        cell.fit !== 'none' && setHovered({ a: agent.id, i: ind.id })
                      }
                      onMouseLeave={() => setHovered(null)}
                      className="flex items-center justify-center cursor-pointer"
                      style={{
                        borderBottom:
                          rowIdx === AGENTS.length - 1
                            ? 'none'
                            : '1px solid rgba(0,0,0,0.04)',
                        borderRight:
                          colIdx === INDUSTRIES.length - 1
                            ? 'none'
                            : '1px solid rgba(0,0,0,0.04)',
                        minHeight: 48,
                        background: isHovered ? 'rgba(138,245,192,0.08)' : 'transparent',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <CellGlyph fit={cell.fit} isHovered={isHovered} />
                    </motion.div>
                  );
                })}
              </>
            ))}
          </div>
        </div>

        {/* Tooltip — appears below the matrix, follows hovered cell */}
        <div
          className="mt-6 min-h-[48px] flex items-center justify-center text-center transition-opacity duration-200"
          style={{
            opacity: hovered ? 1 : 0,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: 'rgba(0,0,0,0.75)',
            maxWidth: 720,
            margin: '24px auto 0',
          }}
        >
          {reason}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <LegendChip fit="proven" label="PROVEN · in production today" />
          <LegendChip fit="fits" label="FITS · same pattern, new vertical" />
          <LegendChip fit="none" label="NOT YET · weak fit" />
        </div>
      </div>
    </section>
  );
}

function CellGlyph({ fit, isHovered }: { fit: 'proven' | 'fits' | 'none'; isHovered: boolean }) {
  if (fit === 'proven') {
    return (
      <span
        className="block rounded-full transition-transform duration-150"
        style={{
          width: 12,
          height: 12,
          background: '#000000',
          boxShadow: `0 0 0 4px rgba(138,245,192,0.35), 0 0 12px rgba(138,245,192,0.5)`,
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
        }}
      />
    );
  }
  if (fit === 'fits') {
    return (
      <span
        className="block rounded-full transition-transform duration-150"
        style={{
          width: 12,
          height: 12,
          background: 'transparent',
          border: '1.5px solid rgba(0,0,0,0.55)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
        }}
      />
    );
  }
  return (
    <span
      className="block rounded-full"
      style={{ width: 4, height: 4, background: 'rgba(0,0,0,0.15)' }}
    />
  );
}

function LegendChip({ fit, label }: { fit: 'proven' | 'fits' | 'none'; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 capsule-light rounded-full">
      <CellGlyph fit={fit} isHovered={false} />
      <span>{label}</span>
    </span>
  );
}
```

**Step 2: Insert ParallaxHero divider + matrix into SolutionsPage**

Modify `src/pages/SolutionsPage.tsx`. Add `ParallaxHero` import + `AgentIndustryMatrix` import. Insert the parallax divider + matrix after the 3 anchor sections (before the 7 adjacent placeholders):

```tsx
import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import IndustrySwitcher from '../components/solutions/IndustrySwitcher';
import IndustryAnchorSection from '../components/solutions/IndustryAnchorSection';
import AgentIndustryMatrix from '../components/solutions/AgentIndustryMatrix';
import { INDUSTRIES, ANCHOR_INDUSTRIES } from '../data/solutions';

export default function SolutionsPage() {
  return (
    <main>
      <PageHero /* ...same as before... */ />
      <IndustrySwitcher />

      {ANCHOR_INDUSTRIES.map((a) => (
        <IndustryAnchorSection key={a.id} data={a} />
      ))}

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080&fit=crop"
        headline="The same agent."
        headlineAccent="A different industry."
        subline="Five agents are live in three industries today. The same pattern ships in seven more."
        label="Extend the pattern"
        height="60vh"
        clipRadius={24}
      />

      <AgentIndustryMatrix />

      {/* TEMPORARY placeholders for the 7 adjacent (replaced in Task 7) */}
      {INDUSTRIES.filter((i) => !i.proven).map((i) => (
        <section
          key={i.id}
          id={i.id}
          style={{ minHeight: '50vh', padding: '80px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display text-3xl text-center">{i.name} (placeholder)</h2>
        </section>
      ))}
    </main>
  );
}
```

Keep the full `<PageHero>` props block from Task 2 — shown elided above for brevity.

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/solutions`, scroll to the matrix:
- Parallax divider between Manufacturing and the matrix shows urban/architecture image with "The same agent. *A different industry.*" in mix-blend-difference text; label "EXTEND THE PATTERN".
- Matrix has a white rounded card with 1px grey border. 10 industry headers across the top (tiny Lucide icon + 3-letter short code). 5 agent-name row headers on the left, right-aligned in mono.
- Proven cells: solid black 12px dots with a soft teal halo. Fits cells: open rings. None cells: tiny grey dots.
- Hover a `proven` or `fits` cell: cell background tints faint teal; the glyph scales up 1.15×; below the matrix the italic reasoning text fades in ("Claims bundles are voucher packets — same multi-doc correlation." when hovering Voucher × Insurance, etc.).
- Hover a `none` cell: no tooltip, no tint.
- Resize viewport narrow (~700px): matrix horizontally scrolls; first column (agent names) stays sticky on the left.
- Cells cascade in column-by-column on scroll into view.
- Below matrix: 3 legend chips with dot + label.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/solutions/AgentIndustryMatrix.tsx src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add 5x10 Agent x Industry matrix + first parallax divider

Proven cells get teal-haloed black dots; fits cells get open rings; none
cells get grey specks. Hover a cell to reveal the one-line fit reasoning
below the grid. Mobile horizontal scroll with sticky agent-name column.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: AdjacentIndustries — 7 cards + 1 CTA card

**Files:**
- Create: `src/components/solutions/AdjacentIndustries.tsx`
- Modify: `src/pages/SolutionsPage.tsx` (replace the 7 adjacent placeholder sections)

**Purpose:** 4×2 grid on desktop. 7 real industry cards plus one inverted CTA card. Each real card has a black 1px top strip, Lucide icon, mono industry label, Fraunces headline with italic accent on the second line, body copy, agent chips, outcome capsule-light chip.

**Step 1: Create the component**

Create `src/components/solutions/AdjacentIndustries.tsx`:

```tsx
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import {
  ADJACENT_INDUSTRIES,
  AGENT_BY_ID,
  INDUSTRY_BY_ID,
  type AdjacentIndustry,
} from '../../data/solutions';

/**
 * AdjacentIndustries — 7 industry cards + 1 CTA card (4x2 on desktop).
 *
 * Each card matches the IsThisYou pattern: black 1px top strip, icon
 * square, micro-upper industry label, Fraunces headline with italic
 * accent second line, body, agent chips, outcome chip.
 *
 * The 8th card is inverted (black bg) and is the "Your industry here?"
 * CTA pointing at hello@attentions.ai.
 */
export default function AdjacentIndustries() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(96px, 12vw, 160px) 24px', background: '#ffffff' }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-[720px]"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Same pattern · new verticals
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
            Seven more industries. <span style={{ fontStyle: 'italic' }}>Ready today.</span>
          </h2>
        </motion.div>

        {/* 4x2 grid (7 cards + 1 CTA) */}
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {ADJACENT_INDUSTRIES.map((card, idx) => (
            <Card key={card.id} data={card} delay={idx * 0.08} />
          ))}
          <CTACard delay={ADJACENT_INDUSTRIES.length * 0.08} />
        </div>
      </div>
    </section>
  );
}

function Card({ data, delay }: { data: AdjacentIndustry; delay: number }) {
  const Icon = (Lucide as any)[data.iconName] ?? Lucide.HelpCircle;
  const industry = INDUSTRY_BY_ID[data.id];

  return (
    <motion.div
      id={data.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="group flex flex-col"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: 520,
      }}
    >
      {/* Black 1px top accent strip */}
      <div style={{ height: 1, background: '#000000' }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Icon square */}
        <div
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <Icon size={28} style={{ color: '#000000' }} />
        </div>

        {/* Industry label */}
        <div className="micro-upper mb-3" style={{ color: 'rgba(0,0,0,0.55)' }}>
          {industry.name}
        </div>

        {/* Headline */}
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 2vw, 32px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#000000',
          }}
        >
          {data.headline}
          <br />
          <span style={{ fontStyle: 'italic' }}>{data.headlineAccent}</span>
        </h3>

        {/* Body */}
        <p
          className="mb-6 text-[15px] leading-relaxed"
          style={{ color: 'rgba(0,0,0,0.65)' }}
        >
          {data.body}
        </p>

        {/* Spacer to bottom */}
        <div className="flex-1" />

        {/* Agents that apply */}
        <div className="mb-4">
          <div className="micro-upper mb-3" style={{ color: 'rgba(0,0,0,0.40)', fontSize: 10 }}>
            Agents that apply
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.agents.map((aid) => (
              <span
                key={aid}
                className="inline-flex items-center rounded-full"
                style={{
                  padding: '4px 10px',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {AGENT_BY_ID[aid].short}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome chip */}
        <span
          className="capsule-light rounded-full self-start"
          style={{ fontSize: 11 }}
        >
          {data.outcomeChip}
        </span>
      </div>
    </motion.div>
  );
}

function CTACard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col"
      style={{
        background: '#000000',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: 520,
        color: '#ffffff',
      }}
    >
      {/* Amber top strip to match the page accent */}
      <div style={{ height: 1, background: '#d97706' }} />

      <div className="p-7 flex flex-col flex-1">
        <div
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)' }}
        >
          <Lucide.Plus size={28} style={{ color: '#ffffff' }} />
        </div>

        <div className="micro-upper mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Your industry?
        </div>

        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 2vw, 32px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Not here?
          <br />
          <span style={{ fontStyle: 'italic' }}>Bring the docs.</span>
        </h3>

        <p
          className="mb-6 text-[15px] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          The platform is industry-agnostic. The agents extend by pattern. If your
          workflow has mixed-format docs, regulated reporting, real-time voice, or
          multi-tool orchestration &mdash; we&rsquo;ve seen it before.
        </p>

        <div className="flex-1" />

        <a
          href="mailto:hello@attentions.ai?subject=New%20Industry%20Fit"
          className="self-start inline-flex items-center gap-2 rounded-full transition-all hover:scale-[1.03]"
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--mono)',
            fontSize: 12,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: '#ffffff',
            color: '#000000',
            textDecoration: 'none',
          }}
        >
          Tell us about your documents
          <span>&rarr;</span>
        </a>
      </div>
    </motion.div>
  );
}
```

**Step 2: Wire into SolutionsPage**

Modify `src/pages/SolutionsPage.tsx` — replace the 7 adjacent placeholder sections with a single `<AdjacentIndustries />`:

```tsx
// ... imports
import AdjacentIndustries from '../components/solutions/AdjacentIndustries';

// In JSX, delete the placeholder loop and insert:
<AdjacentIndustries />
```

Remove the `INDUSTRIES` import if it's no longer used after deleting the loop.

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/solutions` scroll to the adjacent-industries section:
- Section heading "Seven more industries. *Ready today.*" in Fraunces with italic accent.
- 8 cards in a 4×2 grid on desktop. Resize to tablet width — becomes 2×4. Mobile — stacks.
- First 7 cards: white bg, 1px black top strip, 60px rounded icon square, industry name in mono uppercase, Fraunces headline with italic 2nd line, grey body, agent chips, outcome `capsule-light` chip at bottom.
- Verify each card has the correct Lucide icon: `ShieldCheck`, `Landmark`, `Hotel`, `Scale`, `FlaskConical`, `Plane`, `ShoppingBag`.
- Verify each card has correct anchor id matching the industry id (use browser devtools → Elements, search `id="insurance"`, etc.) — switcher pills should scroll to these cards.
- 8th card (CTA): black bg, amber top strip, white plus icon on dark square, "Not here? *Bring the docs.*" headline, "Tell us about your documents →" white button. Click → opens mailto.
- Cards stagger-fade in on scroll with a gentle rise.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/solutions/AdjacentIndustries.tsx src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add AdjacentIndustries with 7 cards + CTA card

4x2 grid on desktop. 7 industry cards match IsThisYou pattern
(white, black top strip, icon, label, Fraunces headline, body, agent
chips, outcome chip). 8th card is inverted CTA to hello@attentions.ai.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: SolutionsCloser — amber orb + manifesto

**Files:**
- Create: `src/components/solutions/SolutionsCloser.tsx`
- Modify: `src/pages/SolutionsPage.tsx` (insert 2nd parallax + closer at the end)

**Purpose:** Mirror `AgentsCloser` / `PlatformCloser` with amber/copper orb variant.

**Step 1: Create the component**

Create `src/components/solutions/SolutionsCloser.tsx`:

```tsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * SolutionsCloser — Solutions page closing manifesto.
 * Amber/copper glass orb on the left, "Your industry. Your agents."
 * manifesto on the right. Mirrors AgentsCloser/PlatformCloser patterns.
 */
export default function SolutionsCloser() {
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
          {/* Amber/copper orb */}
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
                  baseColor="#6b3410"
                  attenuationColor="#f5a623"
                  envColor="#e0b080"
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
              The offer
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
              Your industry.{' '}
              <span style={{ fontStyle: 'italic' }}>Your agents.</span>
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
              Same platform. Same audit trail. Same sovereign runtime. A new vertical
              isn&rsquo;t a new product &mdash; it&rsquo;s the existing pattern,
              shaped to your documents.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Insert 2nd ParallaxHero + SolutionsCloser into SolutionsPage**

Modify `src/pages/SolutionsPage.tsx` — append after `<AdjacentIndustries />`:

```tsx
import SolutionsCloser from '../components/solutions/SolutionsCloser';

// At the end, after <AdjacentIndustries />:
<ParallaxHero
  imageSrc="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1920&h=1080&fit=crop"
  headline="Is your industry"
  headlineAccent="here?"
  subline="If your workflow has mixed-format docs, regulated reporting, real-time voice, or multi-tool orchestration — we've seen the pattern before."
  label="Not listed?"
  height="60vh"
  clipRadius={24}
/>

<SolutionsCloser />
```

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Visual QA**

Preview `http://localhost:5174/solutions` scroll to the bottom:
- Parallax divider between adjacent cards and closer: city skyline image with "Is your industry *here?*" in mix-blend-difference text; label "NOT LISTED?".
- Closer: amber/copper glass orb on the left (breathing + floating), "THE OFFER" label, "Your industry. *Your agents.*" headline in Fraunces, italic supporting paragraph. Two-column on desktop, stacks on mobile.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/solutions/SolutionsCloser.tsx src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add SolutionsCloser with amber/copper orb + 2nd parallax

Mirrors AgentsCloser/PlatformCloser layout. Distinct amber/copper palette
(#6b3410 base, #f5a623 attenuation, #e0b080 env) signals verticals/industries.
Closing manifesto: "Your industry. Your agents."

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Add ClientsStrip between hero and switcher

**Files:**
- Modify: `src/pages/SolutionsPage.tsx`

**Purpose:** The approved 9-section spec puts `ClientsStrip` between Hero (1) and IndustrySwitcher (3). We deferred it to the end because it's a one-liner with no risk.

**Step 1: Import and insert**

Modify `src/pages/SolutionsPage.tsx`:

```tsx
import ClientsStrip from '../components/ClientsStrip';

// In JSX, between <PageHero /> and <IndustrySwitcher />:
<ClientsStrip />
```

**Step 2: Build + visual QA**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Preview `http://localhost:5174/solutions`: below the hero, the client logos marquee renders (same as on landing + agents). Then the switcher, then anchor sections.

**Step 3: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/pages/SolutionsPage.tsx
git commit -m "$(cat <<'EOF'
feat(solutions): add ClientsStrip between hero and switcher

Completes the 9-section structure: hero, ClientsStrip, switcher,
3 anchors, parallax, matrix, adjacent cards, parallax, closer.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Update SiteNav links (6 edits)

**Files:**
- Modify: `src/components/SiteNav.tsx`

**Purpose:** All existing `/case-studies` links in the top nav point to the new `/solutions` route. Industry sub-links jump to specific anchors on `/solutions`.

**Step 1: Apply 6 edits**

In `src/components/SiteNav.tsx`, make these exact replacements:

a) Line ~61 (Solutions mega menu top-level link):
```diff
-    link: '/case-studies',
+    link: '/solutions',
```

b) Line ~66 (Finance & Logistics sub-link):
```diff
-          { label: 'Finance & Logistics', description: 'Invoices · vouchers · trade docs', icon: Building2, link: '/case-studies' },
+          { label: 'Finance & Logistics', description: 'Invoices · vouchers · trade docs', icon: Building2, link: '/solutions#finance-logistics' },
```

c) Line ~67 (Healthcare sub-link):
```diff
-          { label: 'Healthcare', description: 'SOAP · ICD-10 · patient experience', icon: Stethoscope, link: '/case-studies' },
+          { label: 'Healthcare', description: 'SOAP · ICD-10 · patient experience', icon: Stethoscope, link: '/solutions#healthcare' },
```

d) Line ~68 (Manufacturing sub-link):
```diff
-          { label: 'Manufacturing', description: 'PCR · 8D · supplier traceability', icon: Factory, link: '/case-studies' },
+          { label: 'Manufacturing', description: 'PCR · 8D · supplier traceability', icon: Factory, link: '/solutions#manufacturing' },
```

e) Line ~90 (About submenu — "Case studies" entry):
```diff
-          { label: 'Case studies', description: '3 operators · 3 industries', icon: Users, link: '/case-studies' },
+          { label: 'Solutions by industry', description: '10 industries · 5 agents', icon: Users, link: '/solutions' },
```

f) Line ~106 (ALL array used by mobile menu):
```diff
-  { to: '/case-studies', label: 'Case studies' },
+  { to: '/solutions', label: 'Solutions' },
```

**Step 2: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 3: Visual QA**

Preview any page (e.g. `http://localhost:5174/`):
- Hover "Solutions" in top nav → mega menu opens. Click the "Solutions" label itself → navigates to `/solutions`.
- Click "Finance & Logistics" sub-link → navigates to `/solutions#finance-logistics` and scrolls to the Finance & Logistics anchor section. Repeat for Healthcare (`#healthcare`) and Manufacturing (`#manufacturing`). (Note: anchor-scroll-on-route-change is handled by `ScrollToTop` currently scrolling to 0; the hash link may need a manual scroll — acceptable for now; anchors still reachable via the switcher once on-page.)
- Hover "About" → see "Solutions by industry" entry. Click → `/solutions`.
- Open mobile menu → see "Solutions" entry. Click → `/solutions`.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/SiteNav.tsx
git commit -m "$(cat <<'EOF'
feat(nav): point Solutions menu at /solutions with industry anchors

Top-level Solutions link, 3 industry sub-links with /solutions#anchor
targets, About submenu entry relabeled, mobile menu updated. /case-studies
links removed from all nav surfaces.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Update CinematicFooter + OutcomeTiles links

**Files:**
- Modify: `src/components/CinematicFooter.tsx`
- Modify: `src/components/OutcomeTiles.tsx`

**Step 1: CinematicFooter edit**

In `src/components/CinematicFooter.tsx`, around line 119:

```diff
-    { to: '/case-studies', label: 'Case studies' },
+    { to: '/solutions', label: 'Solutions' },
```

**Step 2: OutcomeTiles edit**

In `src/components/OutcomeTiles.tsx`, around line 193:

```diff
-          <a href="/case-studies" className="btn-outline">
+          <a href="/solutions" className="btn-outline">
```

The anchor text inside may say "See case studies" — update if it implies the old name:
- If the text is a generic "See the proof" or similar, leave as-is.
- If it explicitly says "case studies", replace with "solutions" (check the surrounding JSX by reading the file first).

**Step 3: Build + visual QA**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Preview `/` scroll to footer — "Solutions" link in the footer column. Preview anywhere `OutcomeTiles` is used — button links to `/solutions`.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/CinematicFooter.tsx src/components/OutcomeTiles.tsx
git commit -m "$(cat <<'EOF'
feat(nav): update footer + OutcomeTiles link to /solutions

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: GradientMesh — add `solutions` mesh variant (optional rename)

**Files:**
- Modify: `src/components/GradientMesh.tsx`
- Modify: `src/App.tsx`

**Purpose:** `GradientMesh.tsx` defines per-route background mesh palettes. We're currently pointing `/solutions` at the existing `caseStudies` mesh. That's functional but semantically wrong once `/case-studies` is only a redirect. Rename the mesh key for clarity.

**Step 1: Read current mesh palette**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -n "caseStudies" src/components/GradientMesh.tsx
```

This returns one match around line 38. Read lines 35–50 to see the palette values for `caseStudies`.

**Step 2: Rename `caseStudies` → `solutions` in GradientMesh**

Use `replace_all` to rename the mesh key throughout `GradientMesh.tsx` (should only affect 1 declaration):

```diff
-  caseStudies: { base: '#f8fcfa', blobs: [
+  solutions: { base: '#f8fcfa', blobs: [
```

If the palette values no longer suit amber/copper, optionally adjust — but keeping the cool-neutral base is fine and less risk.

**Step 3: Update App.tsx ROUTE_TO_MESH**

In `src/App.tsx`:

```diff
-  '/case-studies': 'caseStudies',
-  '/solutions': 'caseStudies',
+  '/solutions': 'solutions',
```

(Drop the `/case-studies` entry — the route now just redirects, its mesh value is irrelevant.)

**Step 4: TypeScript check**

If `GradientMesh.tsx` has a `PageKey` or similar union type that enumerates mesh keys, update it from `caseStudies` → `solutions`. Search for `caseStudies` across `src/components/GradientMesh.tsx` to confirm all occurrences are swapped:

```bash
cd /Users/puneet/website-attentions-miro/app && grep -n "caseStudies" src/components/GradientMesh.tsx
```

Expected: no matches after replacement.

**Step 5: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors. If the build complains about a missing key in a union type, grep the whole `src/` tree for any remaining `caseStudies` string usage and update each to `solutions`.

**Step 6: Visual QA**

Preview `/solutions` — background mesh renders (the soft teal-white gradient from the original caseStudies palette). Preview `/` and `/agents` — their mesh palettes are unchanged.

**Step 7: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/GradientMesh.tsx src/App.tsx
git commit -m "$(cat <<'EOF'
refactor(mesh): rename caseStudies mesh key to solutions

Consistent with the route rename. Palette values unchanged.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Delete old CaseStudiesPage.tsx

**Files:**
- Delete: `src/pages/CaseStudiesPage.tsx`

**Purpose:** No longer imported anywhere. The redirect route uses `<Navigate>` directly, not the component.

**Step 1: Verify no remaining imports**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -rn "CaseStudiesPage" src/
```

Expected: no results (if all previous tasks were done correctly).

If any results appear, stop and fix the stray imports before deleting.

**Step 2: Delete the file**

```bash
cd /Users/puneet/website-attentions-miro/app && rm src/pages/CaseStudiesPage.tsx
```

**Step 3: Build check**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add -A src/pages/CaseStudiesPage.tsx
git commit -m "$(cat <<'EOF'
chore(solutions): remove obsolete CaseStudiesPage.tsx

Replaced by SolutionsPage.tsx. /case-studies route remains as a
<Navigate replace> redirect for back-compat on old inbound links.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Final verification pass

**No files changed.** This task exists to catch regressions.

**Step 1: Full build**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: `✓ built in ...` zero errors, zero warnings introduced by this work.

**Step 2: Visual QA checklist — preview `http://localhost:5174/solutions`**

Walk through the full page top-to-bottom and check each of the following:

- [ ] Hero: amber/copper accent, "Your industry. *Your agents.*" headline, 5 pills, orb on the right.
- [ ] ClientsStrip marquee below hero.
- [ ] IndustrySwitcher appears below ClientsStrip. On scroll past hero it sticks below the SiteNav (top: 64px). "JUMP TO" label, 10 pills with "· IN PRODUCTION ·" and "· ADJACENT ·" group dividers.
- [ ] Click each of the 10 pills — smooth scroll lands with ~96px offset, active pill updates.
- [ ] Scroll through manually — active pill updates based on which industry section is in the top band of the viewport.
- [ ] Finance & Logistics anchor: teal accent, Thomson card, 88% metric with teal glow, correct quote, 3 proof chips, `Invoice Intelligence` + `Voucher Matching` chips in left column.
- [ ] Healthcare anchor: magenta/pink accent, Qira Labs card, $400K+ metric, correct quote, 3 proof chips, `Voice AI · SOAP` + `Patient Experience OS` chips.
- [ ] Manufacturing anchor: green accent, Daimler Asia card, 1.2M metric, correct quote, 3 proof chips, `PCR Intelligence` chip.
- [ ] ParallaxHero divider #1: urban architecture image, "The same agent. *A different industry.*" in white-difference text, label "EXTEND THE PATTERN".
- [ ] Matrix: 5 agent rows × 10 industry columns, proven cells have teal-haloed black dots, fits cells have open rings, none cells have tiny grey dots.
- [ ] Hover any `proven` or `fits` cell → background tints faint teal, glyph scales up, reasoning sentence appears below the grid.
- [ ] Legend below matrix shows 3 capsule-light chips.
- [ ] Adjacent industries section: 4×2 grid (7 real cards + 1 CTA). Each real card has correct Lucide icon, industry name label, italic 2nd-line headline, body copy, agent chips, outcome chip. CTA card is black bg with amber top strip and mailto button.
- [ ] ParallaxHero divider #2: city skyline image, "Is your industry *here?*" label "NOT LISTED?".
- [ ] SolutionsCloser: amber/copper orb animates (breathing + floating), "THE OFFER" label, "Your industry. *Your agents.*" headline, italic supporting paragraph.
- [ ] Footer renders normally (CinematicFooter).

**Step 3: Back-compat check**

- [ ] `http://localhost:5174/case-studies` → redirects to `/solutions` (URL bar updates).
- [ ] Landing page `/` renders unchanged.
- [ ] `/platform` renders unchanged.
- [ ] `/agents` renders unchanged. Deep link `/agents#production` still works.

**Step 4: Responsive check**

- [ ] Resize to ~375px mobile width: hero stacks, ClientsStrip stacks, switcher horizontally scrolls with active-pill auto-center, anchor sections stack (left col above right col), matrix horizontally scrolls with sticky agent column, adjacent cards stack 1-column, closer stacks.
- [ ] Resize to ~768px tablet: anchor sections stack, matrix fits with horizontal scroll, adjacent cards in 2×4 grid.

**Step 5: Final commit (if any fixes were needed during verification)**

If Task 13 surfaced any issue, fix it in the relevant file and commit with a message like:
```
fix(solutions): [specific issue]
```

If everything passes, no commit needed.

---

## Summary of files touched

**Created (8 files):**
- `src/data/solutions.ts`
- `src/pages/SolutionsPage.tsx`
- `src/components/solutions/IndustrySwitcher.tsx`
- `src/components/solutions/IndustryAnchorSection.tsx`
- `src/components/solutions/AgentIndustryMatrix.tsx`
- `src/components/solutions/AdjacentIndustries.tsx`
- `src/components/solutions/SolutionsCloser.tsx`
- `docs/plans/2026-04-18-solutions-page.md` (this plan)

**Modified (5 files):**
- `src/App.tsx`
- `src/components/SiteNav.tsx`
- `src/components/CinematicFooter.tsx`
- `src/components/OutcomeTiles.tsx`
- `src/components/GradientMesh.tsx`

**Deleted (1 file):**
- `src/pages/CaseStudiesPage.tsx`

**Total commits:** 13 (one per task).

---

## If something goes wrong

**Build failure on a component file:** read the TypeScript error carefully — usually a missing import from `../../data/solutions` or a mismatched prop type. The data types are defined in `solutions.ts`; import them explicitly.

**Switcher active pill doesn't update as you scroll:** the `IntersectionObserver` root margin is tuned for the current sticky header height (64px nav + 56px switcher). If the layout changes height, adjust the `rootMargin: '-120px 0px -60% 0px'` string in `IndustrySwitcher.tsx`.

**Matrix hover reasoning doesn't appear:** verify `FIT_MATRIX[agentId][industryId].reason` has a non-empty string for that cell. `none`-fit cells intentionally have an empty reason and don't register hover.

**Orb doesn't render in the closer:** Three.js lazy-loaded via `Suspense`; if the lazy import throws, there's no fallback UI. Check the browser console for a dynamic-import error and verify `src/components/HeroOrb.tsx` exists.

**`/case-studies` still renders the old page instead of redirecting:** verify both the old `<Route path="/case-studies" element={<CaseStudiesPage />}>` is removed *and* the new `<Route path="/case-studies" element={<Navigate to="/solutions" replace />}>` is added in `src/App.tsx`. Router matches the first match — if both exist, delete the old one.
