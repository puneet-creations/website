# Solutions Page — Industry-Landing Redesign (rename from `/case-studies`)

**Date:** 2026-04-18
**Status:** Approved. Proceed to implementation plan.

## Context

The current `/case-studies` page shows 3 long narrative deep-dives (Thomson / Daimler / Qira) using old design language (`PageCinematicWrap`, `giantText="CASES"`, border-left quote blocks, alternating bespoke layouts). It does not fit the site's "Solutions" mega-menu promise — the nav already organizes Solutions **By Industry** (Finance & Logistics / Healthcare / Manufacturing) with three sub-links all pointing to `/case-studies`, so the page is being asked to be an industry landing but is structured as a case-study showcase.

Meanwhile, `/agents` already carries the 3 clients as a white-card `ProductionProof` summary — so a second pure case-study page creates overlap.

User decision: **rename `/case-studies` → `/solutions`** and redesign as an **industry-first landing** that extends the story to "the same 5 agents work in 7 more industries too." The goal is to show, by industry, what is possible — not to tell three stories for their own sake.

## Story Arc

> Ten industries. Five sovereign agents. Three already in production — seven more where the same pattern ships. Your industry is here. Pick it.

## New Structure (9 sections, ~10,500–11,500 px)

```
1. HERO                       [new — PageHero, amber/copper accent, bottom-left text]
2. ClientsStrip               [reuse — same as landing/agents]
3. IndustrySwitcher           [NEW — sticky segmented control, 10 pills]
4. IndustryAnchorSection × 3  [NEW — Finance & Logistics, Healthcare, Manufacturing]
5. PARALLAX                   [new — "The same agent. A different industry."]
6. AgentIndustryMatrix        [NEW — 5 agents × 10 industries grid]
7. AdjacentIndustries         [NEW — 7 industry cards + 1 CTA card, 4×2 grid]
8. PARALLAX                   [new — "Is your industry here?"]
9. SolutionsCloser            [NEW — amber/copper orb + manifesto]
```

### What this page adds that Landing / Platform / Agents don't

- Only page organized **by vertical/industry** (others are by thesis, architecture, or agent).
- Only page with the **Agent × Industry matrix** — the "this scales horizontally" proof.
- Only page with **adjacent-industry cards** explicitly naming fits outside the 3 proven verticals.
- Case-study depth still lives here (3 anchor sections) but in tighter industry-first framing; `/agents` keeps its 3-card summary.

**No overlap concerns:** `/agents` `ProductionProof` is a compact 3-card summary; here those same 3 clients become full anchor sections with documents + agent chips + case context. Different fidelity, shared source of truth.

## Section Designs

### 1. Hero

```tsx
<PageHero
  label="Solutions by industry"
  title="Your industry."
  titleAccent="Your agents."
  description="Five agents. Three industries in production. Seven more where the same pattern ships. Pick yours."
  accent="#d97706"
  orbColor="#e0c080"
  pills={['10 industries', '5 sovereign agents', '3 in production', '0 hallucination incidents', 'On-prem by default']}
/>
```

### 3. IndustrySwitcher (sticky segmented control)

- **Placement:** between ClientsStrip and first anchor section; natural document flow at rest.
- **Behavior:** `position: sticky; top: 64px; z-index: 40` — sticks below `SiteNav`. IntersectionObserver watches 10 industry sections; active pill reflects the section closest to the top. Click → smooth-scroll with ~96px offset.
- **Mobile:** strip is `overflow-x: auto`; active pill auto-scrolls into view via `scrollIntoView({ inline: 'center' })`.
- **Visual:** white bg, `1px solid rgba(0,0,0,0.06)` bottom border. Row height 56px desktop / 48px mobile. Left `micro-upper` label "JUMP TO". 10 pills in mono 12px uppercase. Active pill = solid black bg, white text. Inactive = transparent bg, `rgba(0,0,0,0.6)` text, `1px solid rgba(0,0,0,0.08)` border. Hover border darkens. Small dividers between the 3 proven and 7 adjacent pills with "·IN PRODUCTION·" and "·ADJACENT·" micro-upper labels.

### 4. IndustryAnchorSection (×3 — Finance & Logistics, Healthcare, Manufacturing)

Full viewport width, max content 1280px, ~900–1000px tall. Two-column body.

**Layout:**
- Section `id` = industry slug (e.g. `#finance-logistics`).
- Top: `micro-upper` accent label "IN PRODUCTION" + Fraunces 500 headline, italic last word.
- Left column (55%): "THE DOCUMENTS" list of 4–5 doc types; "THE AGENTS" row of capsule-light agent chips.
- Right column (45%): client name + region/scale · lead metric (Fraunces italic 96px) · quote · proof chips (3× capsule-light).

**Per-industry content (quotes + metrics preserved verbatim from current `CaseStudiesPage`):**

| Industry | Accent | Docs | Agents | Client | Metric | Proof chips |
|---|---|---|---|---|---|---|
| Finance & Logistics | `#187574` | Handwritten invoices · multi-currency vouchers · POs, GRNs, cheques · SOWs & contracts | Invoice Intelligence · Voucher Matching | Thomson Group UAE (Dubai · 20+ BUs) | **88%** zero-touch to SAP | LIVE · 200+ INVOICES/DAY · WEEK 1 ROI · 0 INCIDENTS |
| Healthcare | `#8a2c6a` | Clinical consults (voice) · SOAP notes · ICD-10 · Dentrix/Epic/OpenDental records · insurance intake | Voice AI · SOAP · Patient Experience OS | Qira Labs US (38 locations) | **$400K+** recovered per location/year | LIVE · 38 LOCATIONS · HIPAA · AUDIO DISCARDED |
| Manufacturing | `#2f5d14` | Product Concern Reports · 8D reports · DMS exports · supplier traceability | PCR Intelligence | Daimler Asia | **1.2M** reports indexed, root cause in hours | LIVE · 1.2M+ REPORTS · HOURS TO ROOT CAUSE · AUTO-CITED 8D |

**Entrance animations:** `useInView` at 0.2 threshold. Left col slides in from `x: -40`, right from `x: +40`, both fade. Metric scales 0.92 → 1.0 over 0.8s.

### 5 & 8. ParallaxHero dividers (existing component)

| # | Label | Headline | Image | Height |
|---|---|---|---|---|
| 5 | `EXTEND THE PATTERN` | "The same agent. *A different industry.*" | `photo-1487958449943-2429e8be8625` (urban architecture) | 60vh |
| 8 | `NOT LISTED?` | "Is your industry *here?*" | `photo-1473091534298-04dcbce3278c` (city skyline) | 60vh |

Both: `mix-blend-difference` text, `clipRadius={24}`, subline 1 sentence.

### 6. AgentIndustryMatrix

**Grid:** 5 rows (agents) × 10 columns (industries). Three cell states: ● PROVEN · ◎ FITS · · NOT YET.

**Matrix data:**

| Agent \ Industry | F&L | HC | Mfg | Ins | Bnk | Hsp | Leg | Phm | Avn | Ret |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Invoice Intelligence | ● | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ |
| Voucher Matching | ● | · | ◎ | ◎ | ◎ | · | ◎ | ◎ | ◎ | · |
| PCR Intelligence | · | ◎ | ● | ◎ | · | · | · | ◎ | ◎ | ◎ |
| Voice AI · SOAP | · | ● | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ | · | · |
| Patient Experience OS | · | ● | · | ◎ | ◎ | ◎ | ◎ | · | · | ◎ |

Totals: 3 proven, 35 fits, 12 not-yet. Every cell has a 1-sentence reasoning string (tooltip on hover).

**Reasoning-string examples:**
- Voucher Matching × Insurance: *"Claims bundles are voucher packets — same multi-doc correlation."*
- PCR Intelligence × Aviation: *"Incident reports at fleet scale — exactly the knowledge-graph pattern."*
- Voice AI × Legal: *"Depositions and client calls — voice → structured transcript + citations."*

**Visual:**
- CSS grid `grid-template-columns: 180px repeat(10, 1fr);` · 48px row height.
- Header row: industry name mono 11px + Lucide icon stacked vertically.
- Row headers: agent name mono 13px right-aligned.
- Cell glyphs: ● = solid 12px black dot with `#8af5c0` teal halo · ◎ = 12px open black ring · · = 4px `rgba(0,0,0,0.15)` dot.
- Hover: scale 1.1, 1-sentence tooltip below.
- Legend strip: 3 capsule-light chips below matrix.

**Mobile:** horizontal scroll with sticky first column (agent names).

**Entrance:** matrix fades in; dots cascade column-by-column over 0.8s ("filling up" effect) on `useInView` at 0.3 threshold.

### 7. AdjacentIndustries (7 cards + 1 CTA card)

Grid: `lg:grid-cols-4 md:grid-cols-2 grid-cols-1` = perfect 4×2 desktop.

**Card template (matches `IsThisYou` / `ProductionProof`):**
- 1px black top accent strip.
- 72px rounded grey icon square, Lucide icon.
- `micro-upper` mono industry label.
- Fraunces 500 headline, italic accent on 2nd line.
- 1–2 sentence body in `rgba(0,0,0,0.65)`.
- "AGENTS THAT APPLY" micro-upper + capsule-light chips.
- Outcome capsule-light chip at the bottom.

**7 industry cards:**

| # | Industry | Icon | Headline | Body | Agents | Outcome chip |
|---|---|---|---|---|---|---|
| 1 | Insurance | `ShieldCheck` | *Claims. Cited.* | "Every claim is a multi-document packet. Every adjuster call needs a structured summary. Every disputed claim wants cross-correlation across thousands of similar ones." | Voucher Matching · PCR Intelligence · Voice AI | FASTER CYCLE · CITED DECISIONS |
| 2 | Banking | `Landmark` | *Trade finance. Reconciled.* | "Letters of credit, bills of lading, shipping docs — every trade finance transaction is a voucher packet. Plus AP across regional branches." | Voucher Matching · Invoice Intelligence | 5-MIN RECONCILIATION · ZERO MISMATCH |
| 3 | Hospitality | `Hotel` | *Every call. Answered.* | "Front desk never sleeps. Reservations, concierge, service recovery, group bookings — across 6–12 PMS/booking/CRM tools." | Patient Experience OS · Invoice Intelligence | 24/7 · NO SYSTEM REPLACEMENT |
| 4 | Legal | `Scale` | *Depositions. Briefed.* | "E-discovery is document reconciliation at scale. Depositions are voice-to-structured transcripts. Intake calls are 24/7 scheduling." | Voucher Matching · Voice AI · Patient Experience OS | HOURS TO DRAFT · EVERY CALL LOGGED |
| 5 | Pharma | `FlaskConical` | *Adverse events. Traced.* | "Adverse event reporting is PCR at scale. Clinical trial docs are voucher packets. Patient-reported outcomes are voice intake." | PCR Intelligence · Voucher Matching · Voice AI | ROOT CAUSE IN HOURS · FDA-READY |
| 6 | Aviation | `Plane` | *Incidents. Classified.* | "Every incident report. Every maintenance log. Every supplier packet. 'The same failure described three ways' — we've seen this movie." | PCR Intelligence · Voucher Matching · Invoice Intelligence | CROSS-FLEET CORRELATION · SUPPLIER-TRACED |
| 7 | Retail | `ShoppingBag` | *Supplier chaos. Unified.* | "Thousands of suppliers. Tens of thousands of SKUs. Claims, returns, and warranty tickets — each a packet. Every customer call, a ticket." | Invoice Intelligence · PCR Intelligence · Patient Experience OS | AP AT SCALE · 24/7 SERVICE |

**8th CTA card** (inverted — black bg, white text):
- Icon: `Plus`
- Label (micro-upper): "Your industry?"
- Headline: "Not here? / *Bring the docs.*"
- Body: "The platform is industry-agnostic. The agents extend by pattern. If your workflow has mixed-format docs, regulated reporting, real-time voice, or multi-tool orchestration — we've seen it before."
- Link: "Tell us about your documents →" → `mailto:hello@attentions.ai?subject=New%20Industry%20Fit`

**Entrance:** staggered entry from below (same `motion.div` pattern as `IsThisYou`).

### 9. SolutionsCloser (new component)

Two-column: glass orb left (340–420px), manifesto right.

**Orb props (amber/copper — distinct from teal/blue):**
- `baseColor="#6b3410"`
- `attenuationColor="#f5a623"`
- `envColor="#e0b080"`
- `attenuationDistance={0.9}`
- `breatheAmp={0.14}`
- `floatAmp={0.25}`

**Text:**
- Label: `THE OFFER`
- Headline (Fraunces 500, `clamp(40px, 5.5vw, 72px)`, italic 2nd line):
  > "Your industry. *Your agents.*"
- Supporting (italic serif, `rgba(0,0,0,0.65)`, max-width 560px):
  > "Same platform. Same audit trail. Same sovereign runtime. A new vertical isn't a new product — it's the existing pattern, shaped to your documents."

No CTA (footer handles that).

### Color palette rationale

| Page | Hero accent | Closer orb | Signal |
|---|---|---|---|
| Landing | multi | — | brand-neutral |
| Platform | `#5b76fe` blue | navy `#1a3a8f` | trust, technology |
| Agents | `#8af5c0` teal | `#0a3a2a`/`#8af5c0` | growth, velocity |
| **Solutions** | `#d97706` amber | `#6b3410`/`#f5a623` | industrial, human, "verticals" |

Matrix uses teal `#8af5c0` for PROVEN halos — references `/agents` as the source of truth for live production.

## Data architecture

Single source of truth: `src/data/solutions.ts`.

```ts
type Fit = 'proven' | 'fits' | 'none';
type AgentId = 'invoice' | 'voucher' | 'pcr' | 'voice' | 'patient';
type IndustryId = 'finance-logistics' | 'healthcare' | 'manufacturing'
                | 'insurance' | 'banking' | 'hospitality' | 'legal'
                | 'pharma' | 'aviation' | 'retail';

export const AGENTS: { id: AgentId; name: string; iconName: string }[];
export const INDUSTRIES: { id: IndustryId; name: string; short: string; iconName: string; proven: boolean }[];
export const FIT_MATRIX: Record<AgentId, Record<IndustryId, { fit: Fit; reason: string }>>;
export const ANCHOR_INDUSTRIES: { id: IndustryId; accent: string; docs: string[]; agents: AgentId[]; client: string; region: string; metric: string; metricLabel: string; quote: string; attrib: string; chips: string[] }[];
export const ADJACENT_INDUSTRIES: { id: IndustryId; iconName: string; headline: string; headlineAccent: string; body: string; agents: AgentId[]; outcomeChip: string }[];
```

Components import this data; no inline content.

## Files to change

| File | Action | Scope |
|---|---|---|
| `src/pages/SolutionsPage.tsx` | **Create** | New 9-section page (~80 lines) |
| `src/components/solutions/IndustrySwitcher.tsx` | **Create** | Sticky segmented control (~120 lines) |
| `src/components/solutions/IndustryAnchorSection.tsx` | **Create** | Reusable anchor block (~180 lines) |
| `src/components/solutions/AgentIndustryMatrix.tsx` | **Create** | Grid + tooltips + mobile scroll (~220 lines) |
| `src/components/solutions/AdjacentIndustries.tsx` | **Create** | 7 + 1 cards, 4×2 grid (~200 lines) |
| `src/components/solutions/SolutionsCloser.tsx` | **Create** | Orb + manifesto (~90 lines) |
| `src/data/solutions.ts` | **Create** | Data source (~200 lines) |
| `src/pages/CaseStudiesPage.tsx` | **Delete** | Replaced |
| `src/App.tsx` | **Modify** | Import + route swap; `/case-studies` → redirect; `ROUTE_TO_MESH` update (~10 lines) |
| `src/components/SiteNav.tsx` | **Modify** | 6 link updates (~10 lines) |
| `src/components/CinematicFooter.tsx` | **Modify** | 1 link update (~1 line) |
| `src/components/OutcomeTiles.tsx` | **Modify** | 1 link update (~1 line) |
| `src/components/GradientMesh.tsx` | **Verify** | Add `solutions` mesh variant OR reuse `caseStudies` key (TBD at implementation) |

## Routing strategy

- `/solutions` — primary route, renders `SolutionsPage`.
- `/case-studies` — kept as backward-compat redirect using `<Navigate to="/solutions" replace />`.
- All internal links point to `/solutions` directly.

## Design language adopted from Landing + Platform + Agents

- ParallaxHero dividers with `mix-blend-difference` text.
- Closing manifesto + 3D glass orb (amber/copper variant for this page).
- IsThisYou / ProductionProof white-card pattern on the adjacent-industry cards.
- `capsule-light` / `capsule-dark` / `micro-upper` utilities (existing).
- No `SectionIntro`, no `CurveDivider`, no `giantText`, no `PageCinematicWrap`.
- Fraunces 500 headings with italic accent; JetBrains Mono for micro-upper + card labels.

## Out of scope

- Adding new industries beyond the 10.
- Changing `PageHero`, `ClientsStrip`, `ParallaxHero`, or existing orb components.
- Per-anchor-industry motion stories (those live on `/agents`; anchor sections here are static).
- Matrix click-filter / sort UI (hover tooltip only).
- Analytics / tracking for pill clicks.
- Touching Landing, Platform, or Agents pages except for updating `/case-studies` links (none exist in those pages — links are only in `SiteNav`, `CinematicFooter`, `OutcomeTiles`).

## Verification

- `npm run build` — zero errors.
- Preview `/solutions`: 9 sections render in declared order.
- `IndustrySwitcher` sticks below `SiteNav` on scroll past hero; active pill updates via IntersectionObserver as sections scroll through the viewport.
- Pill click → smooth scroll with ~96px offset.
- 3 anchor sections show correct content; Thomson/Daimler/Qira quotes and metrics preserved verbatim.
- Matrix renders 5×10 with correct fit glyphs; hover shows 1-sentence reasoning; mobile horizontally scrolls with sticky first column.
- 7 adjacent cards + 8th CTA card render in 4×2 desktop grid; collapses to 2×4 tablet and stacks on mobile.
- Amber/copper closer orb animates (breathing + float).
- Page total height: 10,500–11,500 px.
- `/case-studies` redirects to `/solutions` (back-compat).
- Landing, Platform, Agents pages unaffected; deep links like `/agents#production` still work.

## User Approval

Four questions answered on 2026-04-18:
1. Page role → **A. Industry landing ("Pick your industry")**
2. Cross-industry view → **D. Matrix + adjacent-industry cards**
3. Industry count → **Option 2 — 7 adjacent (10 total: F&L, HC, Mfg, Ins, Bnk, Hsp, Leg, Phm, Avn, Ret)**
4. Navigation → **C. Sticky segmented control at the top**

Additional confirmations across 4 design presentations:
- Overall 9-section structure: ✅
- IndustrySwitcher + 3 anchor industry layouts: ✅
- AgentIndustryMatrix + 7 adjacent-industry cards: ✅
- Parallax dividers + closer + amber/copper palette + files + routing: ✅
