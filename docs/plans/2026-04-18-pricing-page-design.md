# Pricing Page — Three-Doors Redesign

**Date:** 2026-04-18
**Status:** Approved. Proceed to implementation plan.

## Context

The current `/pricing` page is thin (28 lines) and uses old design language (`PageCinematicWrap`, `giantText="PRICING"`, `CostCurveHero`, `TierPanels`, `AlwaysIncluded`). It pins a specific dollar figure ($5K) in the hero pills and exposes only 2 engagement shapes (assessment + deployment).

User decision: restructure as **three independent doors**, each a great strategy on its own. No fixed dollar figures anywhere on the page — neither ours nor competitors'. Differentiation comes from qualitative dimensional contrast, not price comparison. Each door answers the five questions a business buyer has — **how · what · why · ROI · timeline** — in accordion-collapsible panels, with the HOW panel open by default.

## Story Arc

> Three doors. Every door a great strategy. Start small. Scope what you need. Own what you build.

## New Structure (7 sections, ~5,500–6,500 px)

```
1. HERO                   [new — "Three doors. Every door a great strategy."]
2. ClientsStrip           [reuse — social proof anchor]
3. Door 1: Assessment     [NEW — contrast pill + 5 accordion panels (HOW open)]
4. Door 2: Platform       [NEW — same shape]
5. Door 3: Agents         [NEW — same shape]
6. PARALLAX               [new — "Start anywhere. Compound over time."]
7. PricingCloser          [NEW — forest-green orb + manifesto + CTA]
```

Doors stacked full-width at max-w-[1200px] centered (not 3-col grid — 3-col leaves each card ~400px wide, too cramped for 5-panel accordion with prose).

## No-numbers stance

- No dollar figures appear anywhere — not for our doors, not for competitor pricing.
- Tier names replace price anchors: "Assessment" / "Platform" / "Agents".
- Anti-competitor positioning uses **qualitative dimensional contrast** ("Typical: 6-month research + PDF deck. Us: 2-week scoping + working POC on your data").
- ROI anchored in outcome shapes and payback windows, not revenue projections.
- Scope-dependent pricing is made explicit in hero subline: "we price to your business, not to a rate card."

## Page role vs. `/solutions`

| | `/solutions` | `/pricing` |
|---|---|---|
| Organized by | 10 industries | 3 engagement shapes |
| Buyer question answered | "Does this fit my vertical?" | "How do I engage — and what's the commitment?" |
| Content shape | Industry sections + matrix + adjacent cards | 3 door cards with per-door 5-panel Q&A |
| Tone | Proof-first (named customers, metrics) | Selection-first (pick your entry, understand commitment) |

No overlap. Solutions sells by vertical fit. Pricing sells by engagement shape.

## Section Designs

### 1. Hero

```tsx
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
```

### 3–5. Door cards (PricingDoor component, ×3)

**Layout per card** — full-width, max-w-[1200px]:

```
┌────────────────────────────────────────────────────────────┐
│ ── 1px forest-green top accent strip ──                     │
│                                                              │
│ [icon 72px]   ASSESSMENT      ← micro-upper tier name        │
│                                                              │
│ Door headline in Fraunces 500, italic accent 2nd phrase      │
│ 1-line pitch paragraph                                        │
│                                                              │
│ ┌ contrast pill ──────────────────────────────────────────┐ │
│ │ TYPICAL              →              US                    │ │
│ │ [qualitative]                       [qualitative]         │ │
│ └───────────────────────────────────────────────────────────┘ │
│                                                              │
│ ▼ HOW IT WORKS          [expanded by default]                │
│   prose content                                              │
│ ▶ WHAT YOU GET          [collapsed]                          │
│ ▶ WHY US                [collapsed]                          │
│ ▶ ROI PATTERN           [collapsed]                          │
│ ▶ TIMELINE              [collapsed]                          │
│                                                              │
│                          [ Scope this door → ]               │
└────────────────────────────────────────────────────────────┘
```

**Style:** white bg, soft shadow, rounded-3xl, 1px forest-green top accent, Lucide icon in 72px rounded square with faint grey tint, Fraunces headline with italic accent, accordion caret animates on toggle, CTA uses `capsule-dark` class.

**Accordion behavior:** HOW panel expanded by default. Clicking a collapsed header expands; click again collapses. One panel open at a time is not required — visitors can open multiple. Smooth height animation via framer-motion or CSS transitions.

### Door content (full)

#### Door 1 — Assessment

- **Icon:** `SearchCheck`
- **Headline:** *Scope the fit. Plan the pilot.*
- **Pitch:** "A 2-week senior-architect-led engagement that delivers a board-ready business case and a ready-to-execute pilot plan — not a 200-page PDF."
- **Contrast:** `TYPICAL: 6-month research + PDF deck. US: 2-week scoping + working POC on your data.`
- **CTA:** "Scope this door →" → `mailto:hello@attentions.ai?subject=Assessment%20Scoping`

**5 panels:**

| Panel | Full prose (~60-80 words) |
|---|---|
| **HOW IT WORKS** | Two weeks, structured. Week 1: document + workflow + tech-stack audit across 2–3 target processes. We read your actual documents, talk to your ops team, map your existing systems. Week 2: ROI model for top candidates, platform-vs-build decision memo, pilot scope draft. Senior architects throughout — not a rotating team of juniors. |
| **WHAT YOU GET** | A ranked list of AI opportunities across your organization (by ROI, feasibility, risk) · quantified business case for the top 2–3 use cases · a ready-to-execute pilot plan for one of them · a platform-or-build decision memo · a 60-minute board-presentation deck · a named, contactable assessment lead. |
| **WHY US** | A typical consulting assessment runs 4–6 months, dozens of consultants, and ends in a strategy deck that gets shelved because the assumptions don't match your reality. The team who assesses us is the team who'll build. Every ROI assumption is grounded in your actual documents, not industry benchmarks. Every pilot recommendation is something we can already point to running live somewhere close. |
| **ROI PATTERN** | The assessment itself pays back as a board-approvable business case. First real operating ROI lands ~90–120 days later when the pilot ships. Typical outcome: 2–3 automation opportunities surface worth multiples of the engagement cost to scope, and 1 is ready to pilot within the quarter. |
| **TIMELINE** | Fixed 2-week window. Week 0: kickoff, NDA, document access, stakeholder interviews scheduled. Week 1: deep-dive. Week 2: ROI model + pilot scoping + decision point. We're in, we assess, we're out. No scope creep. |

#### Door 2 — Platform

- **Icon:** `Layers`
- **Headline:** *Own the base. Every agent compounds.*
- **Pitch:** "Sovereign artiGen runtime deployed on your hardware in 4–6 weeks. Every agent after the first costs ~80% less — shared layers are already paid for."
- **Contrast:** `TYPICAL: SaaS seat + shared models + their cloud. US: Sovereign base + your models + your hardware.`
- **CTA:** "Scope this door →" → `mailto:hello@attentions.ai?subject=Platform%20Scoping`

**5 panels:**

| Panel | Full prose |
|---|---|
| **HOW IT WORKS** | 4–6 weeks end-to-end. Weeks 1–2: hardware and connector audit. Weeks 3–4: core platform deployment — sovereign runtime, model router, 4-layer hallucination control. Weeks 5–6: governance rails and first agent integration. Handover with runbooks, deployment topology, and audit-trail examples your team can run with. |
| **WHAT YOU GET** | Sovereign runtime on your hardware (bare-metal, VM, or air-gapped) · model router configured across open-weight and fine-tuned models · 4-layer hallucination control · enterprise connectors (SAP, Epic, Salesforce, or whatever your stack runs) · governance layer (audit trail, RBAC, approval flows) · one agent live on top · infrastructure IP and model weights stay yours. |
| **WHY US** | A typical enterprise AI platform is rented by the seat, runs in the vendor's cloud, uses the vendor's models. When their model changes, your outputs change. When their prices change, your budget changes. When regulators ask where the data went, you cite a third-party contract. Sovereign means your hardware, your models, your perimeter. The platform is a base you OWN, not a service you rent. |
| **ROI PATTERN** | Platform alone doesn't generate ROI — agents do. But the platform reduces cost-to-ship for every future agent by ~80% because the shared layers (runtime, routing, hallucination, connectors, governance, security) are already in place. First agent ROI typically lands 3–6 months after platform go-live. Second agent: weeks. Sixth agent: mostly configuration. |
| **TIMELINE** | 4–6 weeks to live. Owned forever. No annual renewal. Upgrades on your schedule, not a vendor's. |

#### Door 3 — Agents

- **Icon:** `Workflow`
- **Headline:** *Targeted automation. Live in weeks.*
- **Pitch:** "A production agent built to your workflow, trained on your data, integrated into your system of record. Executes — doesn't recommend. KPI-measured from day one."
- **Contrast:** `TYPICAL: Generic LLM wrapper recommending. US: Targeted automation executing, cited every field.`
- **CTA:** "Scope this door →" → `mailto:hello@attentions.ai?subject=Agent%20Scoping`

**5 panels:**

| Panel | Full prose |
|---|---|
| **HOW IT WORKS** | 8–12 weeks. Weeks 1–2: workflow and document deep-dive. Weeks 3–6: agent build — deep OCR calibrated to your document mix, a custom small language model fine-tuned on your vendor master or clinical codes or equivalent schema, integration to your system of record. Weeks 7–10: parallel run with humans, exception-routing tuning, audit-trail validation. Weeks 11–12: cutover to autonomous execution. KPI dashboard live. |
| **WHAT YOU GET** | One production agent on one workflow · custom small LM fine-tuned on your data (not a prompt template) · deep integration to your system of record · citation on every field (every output traces back to source document + page + line) · exception routing so humans only see the 10–15% that need judgment · live KPI dashboard · fixed scope, measured against KPIs defined at kickoff. |
| **WHY US** | A typical "AI agent" in the market is a generic foundation-model wrapper with a prompt template. Works on general cases, fails on your handwritten, multi-language, or edge-case data. Outputs are recommendations for humans to verify — not executions. We build targeted agents — bespoke to your workflow, trained on your schema, integrated into your system of record. They don't recommend. They EXECUTE. The difference between "AI that shows insight" and "AI that closes the loop." Three live today: Thomson, Qira, Daimler. |
| **ROI PATTERN** | Typical ROI within 60–90 days post-go-live. KPI defined at kickoff — cost takeout, cycle time, recovery rate, depending on the workflow. Measured against it. If the business case isn't hitting, we know before you do — we revisit scope, not invoice. Shapes we've shipped: 88% no-touch invoicing, $400K+ recovered per clinic per year, weeks-to-hours on root cause. |
| **TIMELINE** | 8–12 weeks to live autonomous execution. Fixed-scope. KPI-measured. Live production, not a demo, not a POC. After go-live: a tuning cadence and the KPI dashboard stay in place. |

### 6. ParallaxHero divider

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

Image: architecture / entryways (abstract, matches "three doors" metaphor). Between doors and closer.

### 7. PricingCloser (new component)

Two-column: forest-green glass orb on left, manifesto on right. Mirrors `AgentsCloser` / `SolutionsCloser` / `PlatformCloser` pattern.

**Orb props (forest green — distinct from teal/blue/amber/navy of other pages):**
- `baseColor="#0a3a1a"`
- `attenuationColor="#8af5a0"`
- `envColor="#a0d0a0"`
- `attenuationDistance={0.9}`
- `breatheAmp={0.14}`
- `floatAmp={0.25}`

**Text:**
- Label: `THE ENGAGEMENT`
- Headline (Fraunces 500, clamp(40, 5.5vw, 72px), italic 2nd line):
  > "Scope small. *Compound forever.*"
- Supporting (italic serif, `rgba(0,0,0,0.65)`, max-width 560px):
  > "Every door pays back in months. Every door leaves you owning what you built. Pick yours — or scope all three. Either way, the investment compounds on your balance sheet, not ours."

**CTA:** single `capsule-dark` button → "Scope a door →" → `mailto:hello@attentions.ai?subject=Scoping`.

## Color palette rationale

| Page | Hero accent | Closer orb | Signal |
|---|---|---|---|
| Landing | multi | — | brand-neutral |
| Platform | `#5b76fe` blue | navy | trust, technology |
| Agents | `#8af5c0` teal | `#0a3a2a` / `#8af5c0` | growth, velocity |
| Solutions | `#d97706` amber | `#6b3410` / `#f5a623` | industrial, verticals |
| **Pricing** | **`#3a7d44` forest green** | `#0a3a1a` / `#8af5a0` | **value, ROI, steady commitment** |

Why forest green: money/value signal, distinct from the existing four palettes, avoids the "gold = cash" cliché, enterprise-serious without being cold.

## Data architecture

Single source of truth: `src/data/pricing.ts`.

```ts
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
  label: string;   // "HOW IT WORKS" etc.
  body: string;    // 60-80 words of prose
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

export const DOORS: Door[] = [/* 3 entries */];
```

`PricingDoor` and `PricingPage` are pure consumers. All content edits happen in `pricing.ts`.

## Files to change

| File | Action | Scope |
|---|---|---|
| `src/pages/PricingPage.tsx` | **Full rewrite** | New 7-section page (~100 lines) |
| `src/components/pricing/PricingDoor.tsx` | **Create** | Reusable door: contrast pill + 5 accordion panels + CTA (~300 lines) |
| `src/components/pricing/PricingCloser.tsx` | **Create** | Forest-green orb + manifesto + CTA (~90 lines) |
| `src/data/pricing.ts` | **Create** | Data source: 3 doors × (icon, headline, pitch, contrast, 5 panels, CTA) (~180 lines) |
| `src/App.tsx` | **Verify** | `ROUTE_TO_MESH['/pricing']` already set; no change expected |
| `src/components/GradientMesh.tsx` | **Verify** | `pricing` mesh palette present; tweak if cool tones clash with forest-green hero |

## Files to delete

| File | Why |
|---|---|
| `src/components/CostCurveHero.tsx` | Old cost-curve chart; replaced by door content |
| `src/components/TierPanels.tsx` | Old tier panels; replaced by `PricingDoor` |
| `src/components/AlwaysIncluded.tsx` | Absorbed into each door's "WHAT YOU GET" panel |

Keep `GTMPath.tsx` (still used on landing).

## Design language adopted from other v2 pages

- `<MotionConfig reducedMotion="user">` at root (honors `prefers-reduced-motion`).
- `ParallaxHero` divider with `mix-blend-difference` text.
- Closing manifesto + 3D glass orb (forest-green variant).
- White card pattern for door cards (matches `IsThisYou` / `ProductionProof` / `AdjacentIndustries`).
- `capsule-light` / `capsule-dark` / `micro-upper` utilities.
- Fraunces 500 headings with italic accent.
- JetBrains Mono for tier names, panel labels, micro-upper strings.
- No `SectionIntro`, no `CurveDivider`, no `giantText`, no `PageCinematicWrap`, no emoji icons.

## Out of scope

- Universal FAQ section beneath the doors (Q2 was C — Q&A lives inside each door).
- Dynamic pricing calculators or forms (no numbers anywhere).
- A "decision helper" quiz to pick a door (keep it simple; doors are self-evident).
- Updating landing / platform / agents / solutions (those v2 pages remain untouched).
- About page redesign (separate brainstorm cycle after Pricing ships).

## Verification

- `npm run build` — zero errors.
- Preview `/pricing`: 7 sections in declared order.
- Hero renders forest green accent with 5 pills and sage-tinted orb.
- 3 door cards stack full-width; each has tier name, headline, pitch, contrast pill, 5 accordion panels (HOW open by default), CTA.
- Clicking a collapsed panel header expands smoothly; click again collapses.
- Clicking door CTA opens mailto or `/contact` with door pre-filled.
- ParallaxHero divider renders with architecture image, "Start anywhere. *Compound over time.*" in `mix-blend-difference` text.
- Closer forest-green orb animates (breathing + float).
- `prefers-reduced-motion: reduce` users get static transitions.
- No dollar figures or competitor numbers appear anywhere.
- Page total height: ~5,500–6,500 px.
- Landing / Platform / Agents / Solutions pages unaffected.

## User approval

Five questions answered on 2026-04-18:
1. Relationship between doors → **A. Three independent doors ("every door a great strategy")**
2. Q&A structure → **C. Per-door FAQ blocks (5 panels × 3 doors)**
3a. Initial price framing → **C + ratio-framing hybrid** (tier names + qualitative ratios)
3b. After "no competitor numbers" directive → **Fully qualitative** (no figures anywhere, neither ours nor competitors')
4. Anti-competitor positioning → **D. Contrast pill up top + full narrative in "Why" panel**
5. Panel UX → **C. Accordion with HOW panel open by default**

Three design sections approved:
- Section 1 (overview + structure): ✅
- Section 2 (per-door anatomy + Q&A summaries): ✅
- Section 3 (hero + parallax + closer + files + routing): ✅
