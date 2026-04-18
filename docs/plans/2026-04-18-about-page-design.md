# About Page — Credibility-Lead Redesign

**Date:** 2026-04-18
**Status:** Approved. Proceed to implementation plan.

## Context

The current `/about` page (211 lines) has rich content — timeline, 5 beliefs, 5 principles, founder bios — but uses legacy design patterns (`PageCinematicWrap` + `giantText="ABOUT"`, amber accent `#c38400`, emoji icons `🛡 ✓ 📎 🚀 🤝`, `display-hero` / `display-2` classes, grey rgba cards, `.sr` serial-reveal entrance).

User decision: **heavy restructure** leading with **enterprise credibility** — not the origin-story thesis the current page leads with. Buyer lands on `/about` asking "can I trust them with my data?" The redesigned page answers that question first through certifications + named clients + team depth, then layers in origin story and beliefs beneath the proof stack.

Content scope: preserve the solid existing content (founder bios, 5 beliefs, 5 principles, timeline, founder quotes) but reorganize + add new sections (certifications strip, success stories, team grid, merged beliefs/principles, closer orb).

## Story Arc

> **Built by architects who ship. Certified. Named enterprise clients. Five production agents. Zero incidents.**

Credibility first. Origin story below the proof stack.

## New Structure (10 sections, ~9,500–11,000 px)

```
1.  HERO                      [new — credibility lead, "Proof" framing, slate accent]
2.  ClientsStrip              [reuse — trust anchor]
3.  CertificationsStrip       [NEW — SOC 2 Type 1 / HIPAA / GDPR / ISO 27001 badge strip]
4.  StatRow                   [refresh — 18 / 5 / 3 / 0 in v2 white-card design]
5.  SuccessStories            [NEW — 3 customer cards (Thomson / Qira / Daimler), About framing]
6.  PARALLAX                  [new — "Shipped. Audited. Live."]
7.  TeamGrid                  [NEW — 2 founder bios (richer) + 5–8 named experts + aggregate 18]
8.  HowWeWork                 [NEW — merged 5 beliefs/principles items (from old 5+5 = 10)]
9.  Timeline                  [keep content verbatim, refresh design — 5 nodes as horizontal strip]
10. AboutCloser               [NEW — slate orb + thesis manifesto]
```

Dropped from the old page: `PageCinematicWrap`, `giantText="ABOUT"`, emoji icons, `display-hero` / `display-2` classes, `.sr` entrance, amber accent, per-node timeline color backgrounds.

## Merging beliefs + principles — the content reasoning

Current page has 5 Beliefs (numbered) + 5 Principles (emoji-iconed). Content overlaps significantly — the principles are how we act on the beliefs. Merged into 5 items that combine both, each with a belief (why) + principle (how we act) structure.

| # | Old Belief | Old Principle | Merged Item (New) |
|---|---|---|---|
| 01 | Purpose-built or won't work | — | PURPOSE-BUILT |
| 02 | Execution gap is the problem | Measure by execution, not output | EXECUTION |
| 03 | Sovereignty becomes a requirement | Sovereignty is architectural, not contractual | SOVEREIGNTY |
| 04 | Hallucination is a design failure | Every output cites its source | CITATIONS |
| 05 | Win by owning AI, not renting | We own outcomes, not hours | OUTCOMES |
| — | — | Production, not prototype | Absorbed into EXECUTION |

Result: 5 dense "How we work" items, each combining the belief's reasoning with the principle's action commitment.

## Page role vs. other v2 pages

| | Landing | Platform | Agents | Solutions | Pricing | **About** |
|---|---|---|---|---|---|---|
| Organized by | Thesis + ICP | Architecture | 5 agents | Industry | Engagement shape | **Proof + People + Beliefs** |
| Primary buyer question | "What is this?" | "How does it work?" | "What can I ship?" | "Fits my vertical?" | "How do I engage?" | **"Can I trust them?"** |
| Tone | Manifesto | Educational | Proof-first | Proof-first | Selection-first | **Credibility-first** |

No overlap: `/solutions` uses Thomson/Qira/Daimler to prove vertical fit; `/about` uses the same 3 to prove execution track record. Shared source of truth, different angle.

## Section Designs

### 1. Hero

```tsx
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
```

Immediate credibility signal. Slate accent differentiates from the 5 other v2 pages.

### 3. CertificationsStrip

4-column grid desktop / 2×2 tablet / 1-col mobile. Section sits directly below ClientsStrip as the first proof anchor.

**Layout per badge:**
- Lucide icon in 72px slate-tinted rounded square
- Cert name (Fraunces 500, 20–24px)
- Status label (`micro-upper`, mono 11px)

| Cert | Icon | Status label |
|---|---|---|
| SOC 2 | `ShieldCheck` | Type 1 Certified |
| HIPAA | `Lock` | Compliant |
| GDPR | `Globe` | Compliant |
| ISO 27001 | `FileCheck2` | Certified |

Caption below the 4 cards: *"Audit reports available on request under NDA."*

### 4. StatRow (refresh)

Same 4 stats as current, new v2 design:
- White cards, `rounded-3xl`, soft shadow, 1px slate top accent strip
- Fraunces italic metric (48–56px) · mono description (12px uppercase)
- 4-col desktop / 2×2 mobile

| Metric | Label |
|---|---|
| **18** | Top experts in AI + product |
| **5** | Agents live in production |
| **3** | Enterprise clients · 3 industries |
| **0** | Hallucination incidents · day one |

### 5. SuccessStories

3 customer cards framed as **proof of delivery** (not vertical fit — that's on Solutions). Same Thomson/Qira/Daimler outcomes, new angle.

| Client | Metric | Outcome | Icon | Proof chip |
|---|---|---|---|---|
| Thomson Group UAE · AP · Dubai | **88%** | Invoices posted no-touch to SAP. 200+/day. Week 1 ROI. | `Building2` | LIVE · 20+ BUSINESS UNITS |
| Qira Labs US · Clinical Ops · Multi-state | **$400K+** | Revenue recovered per clinic per year. 38 locations. Zero system replacements. | `Stethoscope` | LIVE · HIPAA · AUDIO DISCARDED |
| Daimler Asia · Quality Engineering | **1.2M** | Reports cross-correlated. Root cause in hours, not weeks. 8D drafts auto-cited. | `Factory` | LIVE · AUTO-CITED 8D |

**Card pattern:** matches `IsThisYou` / `ProductionProof` / `AdjacentIndustries` — white card, black 1px top strip, 72px rounded icon square, `micro-upper` client name + region, huge italic Fraunces metric, outcome paragraph, `capsule-light` proof chip. **No CTA** (About, not pitch).

### 6. ParallaxHero divider

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

One parallax divider on the page (the other v2 pages use 2). Keeps page readable and reinforces the proof spine without visual fatigue.

### 7. TeamGrid

**Layout:** 2-col founder block (top) + 4-col experts grid (below) + aggregate footer.

**Founders block** — 2 wide cards, one per founder:
- 80px initials avatar (Fraunces italic, 20px in slate-tinted circle)
- Name (Fraunces 500, 28px)
- Role · region (`micro-upper`)
- Bio paragraph (3–4 sentences — expand current bios with a bit more narrative)
- Optional LinkedIn icon link

**Founder bios (expanded from current):**

- **Puneet Kumar Ojha** · Founder & CEO · Dubai
  > Spent years inside Deutsche Telekom as an Enterprise Architect — implementing AI across regulated workflows and watching it stop short of execution. The pattern repeated everywhere: impressive demos, brittle production, and teams still typing AI output into SAP by hand. Founded Attentions AI in 2023 to build the platform that finishes the job — on your hardware, with your data, for your regulator.

- **Ankit Agrahari** · Founder & CTO · Pune
  > Architected enterprise integrations at Deutsche Telekom — the deep system-integration work that makes artiGen's execution layer possible. Knows what breaks when an AI output tries to post itself into a live ERP, and how to architect around it. Leads 18 top experts in AI, ML, product engineering, and domain expertise.

**Experts grid** — 4-col desktop / 2-col tablet / 1-col mobile. 5–8 cards, each ~220px tall:
- 60px initials avatar (slate tint)
- Name (Fraunces 500, 18px)
- Role + responsibility line (e.g., "Lead OCR Engineer · Document intelligence")

**Implementation note:** Names/roles are TBD at time of design. The implementation plan will include 8 placeholder slots in `src/data/about.ts` for the user to fill in before shipping. If fewer than 8 available, grid handles 5/6/7 gracefully.

**Aggregate footer** below grid:
> `+ N more across AI research, ML engineering, data science, domain expertise`

Where `N = 18 − (number of named experts shown)`.

### 8. HowWeWork — 5 merged items

Vertical-stack format. Each item: `micro-upper` number + label · Fraunces 500 title with italic accent · grey body paragraph (40–60 words combining belief reasoning + principle action commitment).

| # | Label | Title | Body |
|---|---|---|---|
| 01 | PURPOSE-BUILT | *Built for your workflow. Not prompt-wrapped around a demo.* | Generic models are trained on the world. Your workflows run on your data — your vendor master, your clinical codes, your schema. We fine-tune small LMs on what your business actually looks like. No templates. No foundation-model wrappers. |
| 02 | EXECUTION | *We measure by what got done. Not by what got summarized.* | The industry has spent five years making AI better at understanding. Enterprise doesn't need better understanding — it needs completion. The invoice read correctly is worthless if a human still has to post it. Every engagement is measured by work actually finished. |
| 03 | SOVEREIGNTY | *Sovereign by architecture. Not by contract.* | Any vendor can promise your data stays safe. We make it structurally impossible to leave — your hardware, your network, your perimeter. Regulators can ask where the data went; the answer is "it didn't." |
| 04 | CITATIONS | *Every output cites its source. Hallucination is a design failure.* | In a system that recommends, a hallucination is embarrassing. In a system that executes, it's a liability. Every field, every decision, every flag traces to an exact document, page, and line. Three live clients in regulated industries. Zero hallucination incidents. Achievable as architecture. |
| 05 | OUTCOMES | *We own outcomes. Not billable hours.* | We're not a consulting firm counting hours. ROI metrics defined at scoping. Production agent live on your infrastructure by the end. If the business case isn't delivering, we know before you do — and we revisit scope, not the invoice. |

Each item uses the white-card pattern — 1px slate top accent · `micro-upper` label · Fraunces serif title with italic · grey body paragraph.

### 9. Timeline (content verbatim, design refreshed)

5-node horizontal strip on desktop, vertical stack on mobile. Dashed connecting line on desktop. Uniform slate accent (drop the per-node color backgrounds from current design).

**Per node:**
- Year chip (mono uppercase, 11px, slate-tinted circle 84px)
- Label (Fraunces 500, 15px)
- Body (grey, 12px, 2-3 lines)

**5 nodes (content verbatim from current page):**

| # | Year | Label | Body |
|---|---|---|---|
| 1 | Pre-2023 | Deutsche Telekom | Same pattern everywhere: impressive AI, zero automation. Finance teams typing into SAP. Doctors typing into Epic. Engineers writing 8Ds by hand. |
| 2 | 2023 | Attentions AI Labs founded | Dubai + Pune. One mission: finish the job. The platform that executes, not just understands. |
| 3 | 2023 | First hire wave | 18 top experts in AI and product engineering joined. AI research, document intelligence, ERP connectors. |
| 4 | 2024 | First production agents | Thomson Group, Daimler Asia, Qira Labs went live. Three industries. Three document types. Zero hallucination incidents. |
| 5 | Today | Live in production | 5 agents live. 3 enterprise clients. 0 hallucination incidents. The shared platform is the moat. |

**Entrance:** `useInView` + framer-motion staggered reveal (left → right desktop, top → bottom mobile).

### 10. AboutCloser

Two-column: deep-slate 3D glass orb on left, thesis manifesto on right. Mirrors `AgentsCloser` / `SolutionsCloser` / `PricingCloser` with slate palette.

**Orb props (deep slate, distinct from the 5 other pages):**
- `baseColor="#1e2a3a"`
- `attenuationColor="#a0b0c8"`
- `envColor="#c8d0dc"`
- `attenuationDistance={0.9}`, `breatheAmp={0.14}`, `floatAmp={0.25}`
- Lazy-mount on `useInView` (same pattern as PricingCloser)

**Text:**
- Label: `THE MEASURE`
- Headline (Fraunces 500, `clamp(40px, 5.5vw, 72px)`, italic 2nd line):
  > "We ship agents. *You ship outcomes.*"
- Supporting (italic serif, `rgba(0,0,0,0.65)`, max-width 560px):
  > "Thomson's AP team. Qira's doctors. Daimler's engineers. They don't see our platform — they see work finished. That's what we built for. That's the measure."

No CTA (footer handles it).

## Color palette rationale

| Page | Hero accent | Closer orb | Signal |
|---|---|---|---|
| Landing | multi | — | brand-neutral |
| Platform | `#5b76fe` blue | `#1a3a8f` / `#5b76fe` | trust, technology |
| Agents | `#8af5c0` teal | `#0a3a2a` / `#8af5c0` | growth, velocity |
| Solutions | `#d97706` amber | `#6b3410` / `#f5a623` | industrial, verticals |
| Pricing | `#3a7d44` forest | `#0a3a1a` / `#8af5a0` | value, steady commitment |
| **About** | **`#475569` deep slate** | **`#1e2a3a` / `#a0b0c8` / `#c8d0dc`** | **gravity, institutional trust** |

Deep slate = distinct from all 5 existing palettes, reads as enterprise-serious, pairs cleanly with the credibility-lead framing.

## Data architecture

Single source of truth: `src/data/about.ts`.

```ts
export type CertStatus = 'certified' | 'type-1' | 'compliant';

export type Certification = {
  id: 'soc2' | 'hipaa' | 'gdpr' | 'iso27001';
  name: string;
  statusLabel: string;    // e.g. "Type 1 Certified"
  iconName: string;       // Lucide icon name
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
  name: string;           // TBD — user fills in before ship
  role: string;           // TBD
  initials: string;
};

export type Stat = {
  metric: string;
  label: string;
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
  num: string;            // "01" … "05"
  label: string;          // "PURPOSE-BUILT"
  title: string;
  titleAccent: string;    // italic part
  body: string;
};

export type TimelineNode = {
  year: string;
  label: string;
  body: string;
};

export const CERTIFICATIONS: Certification[];
export const STATS: Stat[];
export const FOUNDERS: Founder[];
export const EXPERTS: Expert[];              // 5–8 entries, TBD names
export const EXPERT_TOTAL_COUNT: number;     // 18
export const SUCCESS_STORIES: SuccessStory[];
export const WORK_PRINCIPLES: WorkPrinciple[];
export const TIMELINE: TimelineNode[];
```

All components pure consumers. One place to edit all copy.

## Files to change

| File | Action | Scope |
|---|---|---|
| `src/pages/AboutPage.tsx` | **Full rewrite** | New 10-section page (~120 lines) |
| `src/data/about.ts` | **Create** | Single source of truth (~220 lines) |
| `src/components/about/CertificationsStrip.tsx` | **Create** | 4-cert badge strip (~120 lines) |
| `src/components/about/StatRow.tsx` | **Create** | 4-up stat grid (~90 lines) |
| `src/components/about/SuccessStories.tsx` | **Create** | 3-card customer outcome grid (~180 lines) |
| `src/components/about/TeamGrid.tsx` | **Create** | Founders block + experts grid + aggregate (~220 lines) |
| `src/components/about/HowWeWork.tsx` | **Create** | 5-item merged beliefs/principles stack (~160 lines) |
| `src/components/about/TimelineStrip.tsx` | **Create** | Horizontal 5-node timeline (~140 lines) |
| `src/components/about/AboutCloser.tsx` | **Create** | Slate orb + thesis manifesto (~90 lines) |

**Total:** 1 data file + 7 new components + 1 page rewrite. Closer in scope to Solutions (5 components) than Pricing (3 components).

## Routing

No changes. `/about` route already exists. Implementation rewrites the page in place.

## Design language adopted from other v2 pages

- `<MotionConfig reducedMotion="user">` at root (honors `prefers-reduced-motion`).
- `ParallaxHero` divider (1 on this page).
- Closing manifesto + 3D glass orb (slate variant, lazy-mounted on `useInView`).
- White card pattern for SuccessStories / Certifications / How-we-work / Team cards (matches `IsThisYou` / `ProductionProof` / `AdjacentIndustries` / `PricingDoor`).
- `capsule-light` / `capsule-dark` / `micro-upper` utilities.
- Fraunces 500 headings with italic accent.
- JetBrains Mono for micro-upper, tier names, status labels.
- No `PageCinematicWrap`, no `giantText`, no emoji icons, no `.sr` class entrance.

## Out of scope

- Partnerships section (user explicitly skipped).
- Press mentions / awards (not available).
- Open roles / careers page (separate scope).
- Photos of team or offices (not available today).
- Live LinkedIn feed / team blog.
- Culture / working-style deep dive (could layer in later).
- Updating Landing / Platform / Agents / Solutions / Pricing pages (v2 done).

## Verification

- `npm run build` zero errors.
- Preview `/about`: 10-section order matches spec.
- Hero renders deep-slate accent with 5 credibility pills.
- All 4 certs shown with correct status labels — SOC 2 specifically labeled **Type 1** Certified.
- 3 SuccessStory cards render with correct metrics (Thomson 88%, Qira $400K+, Daimler 1.2M) and About-angle framing (not vertical fit).
- TeamGrid renders 2 founder cards (richer bios) + 5–8 expert cards + `+N more` aggregate footer.
- HowWeWork renders 5 merged items in order.
- Timeline renders horizontal strip desktop, vertical mobile, all 5 nodes with correct content.
- AboutCloser slate orb animates (breathing + float), lazy-mounts on `useInView`.
- `prefers-reduced-motion: reduce` users get static transitions.
- Landing / Platform / Agents / Solutions / Pricing pages unaffected.
- No legacy patterns: no `PageCinematicWrap`, no `giantText`, no emoji icons, no `.sr` entrance class.

## User approval

Three questions answered on 2026-04-18:
1. Content scope → **C. Heavy content restructure + design refresh**
2. Primary buyer question → **A. "Can I trust them with my data?" — Enterprise credibility lead**
3. Content inventory → Team profiles (names + roles) + Certifications (SOC 2 Type 1 / HIPAA / GDPR / ISO 27001 all certified) + Success stories reframed. No partnerships.

Three design sections approved:
- Section 1 (overview + structure + merge logic + slate palette): ✅
- Section 2 (5 new/refreshed content sections): ✅
- Section 3 (hero + parallax + timeline refresh + files + routing): ✅
