/**
 * solutions.ts — data source for the /solutions page.
 *
 * Defines the 7 deep-dive agents (5 original + Tender + Fraud per Capability
 * Deck v2), 11 industries (+ Real Estate), 7×11 fit matrix, the 3 in-production
 * anchor industries, and the adjacent industry card specs. Components in
 * src/components/solutions/ are pure consumers of this data.
 *
 * Note: total marketing claim is 15 agents live in production — 7 are detailed
 * here, the other 8 ship across pharma, banking, hospitality, legal, aviation,
 * retail, insurance, and additional manufacturing flavors.
 */

export type Fit = 'proven' | 'fits' | 'none';

export type AgentId = 'invoice' | 'voucher' | 'pcr' | 'voice' | 'patient' | 'tender' | 'fraud';

export type IndustryId =
  | 'finance-logistics'
  | 'healthcare'
  | 'manufacturing'
  | 'real-estate'
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
  { id: 'invoice',  name: 'Invoice Intelligence',         short: 'Invoice Intel' },
  { id: 'voucher',  name: 'Voucher Matching',             short: 'Voucher Match' },
  { id: 'pcr',      name: 'Defect-report Intelligence',   short: 'Defect Intel' },
  { id: 'voice',    name: 'Doctor’s Notes',               short: 'Doctor Notes' },
  { id: 'patient',  name: 'Patient Call Agent',           short: 'Patient Call' },
  { id: 'tender',   name: 'Tender Intelligence',          short: 'Tender Intel' },
  { id: 'fraud',    name: 'Fraud Intelligence',           short: 'Fraud Intel' },
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
  { id: 'real-estate',       name: 'Real Estate',         short: 'RE',  iconName: 'Building',     proven: true  },
  { id: 'insurance',         name: 'Insurance',           short: 'Ins', iconName: 'ShieldCheck',  proven: false },
  { id: 'banking',           name: 'Banking',             short: 'Bnk', iconName: 'Landmark',     proven: false },
  { id: 'hospitality',       name: 'Hospitality',         short: 'Hsp', iconName: 'Hotel',        proven: false },
  { id: 'legal',             name: 'Legal',               short: 'Leg', iconName: 'Scale',        proven: false },
  { id: 'pharma',            name: 'Pharma',              short: 'Phm', iconName: 'FlaskConical', proven: false },
  { id: 'aviation',          name: 'Aviation',            short: 'Avn', iconName: 'Plane',        proven: false },
  { id: 'retail',            name: 'Retail',              short: 'Ret', iconName: 'ShoppingBag',  proven: false },
];

// ── Fit matrix: 7 agents × 11 industries ──────────────────────────────

type Cell = { fit: Fit; reason: string };

export const FIT_MATRIX: Record<AgentId, Record<IndustryId, Cell>> = {
  invoice: {
    'finance-logistics': { fit: 'proven', reason: 'Live in logistics — 200+ handwritten invoices/day posted no-touch to the finance system.' },
    'healthcare':        { fit: 'fits',   reason: 'Hospital AP — vendor invoices across pharmacy, equipment, services.' },
    'manufacturing':     { fit: 'fits',   reason: 'Supplier AP across plants and business units.' },
    'real-estate':       { fit: 'fits',   reason: 'Developer AP — vendor invoices across multiple projects and sites.' },
    'insurance':         { fit: 'fits',   reason: 'Vendor AP — claims adjuster invoices, IT services, regional offices.' },
    'banking':           { fit: 'fits',   reason: 'Branch AP and expense management at scale.' },
    'hospitality':       { fit: 'fits',   reason: 'F&B, maintenance, linens, utilities — AP across properties.' },
    'legal':             { fit: 'fits',   reason: 'Firm AP — expert witnesses, court reporters, outside counsel.' },
    'pharma':            { fit: 'fits',   reason: 'CRO invoices, clinical trial suppliers, lab services.' },
    'aviation':          { fit: 'fits',   reason: 'Parts, maintenance, ground handling, catering — heavy AP.' },
    'retail':            { fit: 'fits',   reason: 'Thousands of suppliers × tens of thousands of SKUs.' },
  },
  voucher: {
    'finance-logistics': { fit: 'proven', reason: 'Live in logistics — six-doc payment packets matched in 5 min (was 2 hrs).' },
    'healthcare':        { fit: 'none',   reason: '' },
    'manufacturing':     { fit: 'fits',   reason: 'Supplier reconciliation — PO + GRN + invoice + contract packets.' },
    'real-estate':       { fit: 'fits',   reason: 'Construction billing packets — contract, milestone, retention, payment.' },
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
    'healthcare':        { fit: 'fits',   reason: 'Adverse event reports — same knowledge-graph pattern as defect reports.' },
    'manufacturing':     { fit: 'proven', reason: 'Live in automotive — 1.2M+ reports indexed, root cause in hours.' },
    'real-estate':       { fit: 'none',   reason: '' },
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
    'healthcare':        { fit: 'proven', reason: 'Live in 38 clinics — structured clinical note in ~30s. Audio discarded.' },
    'manufacturing':     { fit: 'fits',   reason: 'Field inspection voice notes → structured defect reports.' },
    'real-estate':       { fit: 'none',   reason: '' },
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
    'healthcare':        { fit: 'proven', reason: 'Live in 38 clinics — $100K+ recovered/clinic/yr, no system replacements.' },
    'manufacturing':     { fit: 'none',   reason: '' },
    'real-estate':       { fit: 'fits',   reason: 'Sales inquiries 24/7 — qualifies leads, books site visits across CRM.' },
    'insurance':         { fit: 'fits',   reason: 'Claims intake + follow-up across 6–12 policy/claims tools.' },
    'banking':           { fit: 'fits',   reason: 'Wealth client service — every call answered, every tool synced.' },
    'hospitality':       { fit: 'fits',   reason: 'Front desk 24/7 across PMS, booking, CRM — zero replacement.' },
    'legal':             { fit: 'fits',   reason: 'Intake calls, scheduling, conflict-check — across intake tools.' },
    'pharma':            { fit: 'none',   reason: '' },
    'aviation':          { fit: 'none',   reason: '' },
    'retail':            { fit: 'fits',   reason: 'Customer service — returns, warranty, order status 24/7.' },
  },
  tender: {
    'finance-logistics': { fit: 'fits',   reason: 'Carrier + 3PL RFPs benchmarked against past paid rates.' },
    'healthcare':        { fit: 'fits',   reason: 'Equipment + service tenders across facilities, one comparable view.' },
    'manufacturing':     { fit: 'fits',   reason: 'Supplier RFQs across plants — apples-to-apples landed cost.' },
    'real-estate':       { fit: 'proven', reason: 'Live in real estate — every quote standardised to landed cost, 4–8% saved on every PO awarded.' },
    'insurance':         { fit: 'none',   reason: '' },
    'banking':           { fit: 'none',   reason: '' },
    'hospitality':       { fit: 'fits',   reason: 'Vendor RFPs across properties — F&B, linen, services.' },
    'legal':             { fit: 'none',   reason: '' },
    'pharma':            { fit: 'fits',   reason: 'CRO and trial-supplier RFPs benchmarked against past awards.' },
    'aviation':          { fit: 'fits',   reason: 'MRO + parts supplier tenders compared at true landed cost.' },
    'retail':            { fit: 'fits',   reason: 'Supplier RFPs across thousands of SKUs.' },
  },
  fraud: {
    'finance-logistics': { fit: 'fits',   reason: 'Cargo claim fraud — pattern signals scored at intake in <1s.' },
    'healthcare':        { fit: 'fits',   reason: 'Billing fraud — claim correlation across providers.' },
    'manufacturing':     { fit: 'proven', reason: 'Live in automotive — 15K dealer warranty claims/mo scored in <1s, 14 patterns checked simultaneously.' },
    'real-estate':       { fit: 'none',   reason: '' },
    'insurance':         { fit: 'fits',   reason: 'Claim-fraud detection at first notice of loss — 14 patterns at intake.' },
    'banking':           { fit: 'fits',   reason: 'Transaction-fraud scoring at the moment of authorisation.' },
    'hospitality':       { fit: 'none',   reason: '' },
    'legal':             { fit: 'none',   reason: '' },
    'pharma':            { fit: 'fits',   reason: 'Clinical-trial data fraud — outlier and duplication detection.' },
    'aviation':          { fit: 'none',   reason: '' },
    'retail':            { fit: 'fits',   reason: 'Return + gift-card fraud — pattern-scored at intake.' },
  },
};

// ── Anchor industries (3 in-production, full case study context) ──────

export type AnchorIndustry = {
  id: IndustryId;
  accent: string;       // hex color for the section accent
  headline: string;        // first part (normal weight); empty string allowed for single-word accents
  headlineAccent: string;  // last part (italic, accent-colored)
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
    headline: 'Finance &',
    headlineAccent: 'Logistics',
    docs: [
      'Handwritten invoices',
      'Multi-currency vouchers',
      'POs, GRNs, cheques',
      'SOWs & contracts',
    ],
    agents: ['invoice', 'voucher'],
    client: 'Global logistics group',
    region: 'Dubai · 20+ business units',
    metric: '88%',
    metricLabel: 'invoices posted to SAP with zero human touch',
    quote:
      'The team only sees the 12% that actually needs a human decision. Everything else is done. Posted. Audited. Before we\u2019ve had our morning coffee.',
    attrib: 'Logistics group · Dubai · Accounts Payable',
    chips: ['LIVE · 200+ INVOICES/DAY', 'WEEK 1 ROI', '0 HALLUCINATION INCIDENTS'],
  },
  {
    id: 'healthcare',
    accent: '#8a2c6a',
    headline: '',
    headlineAccent: 'Healthcare',
    docs: [
      'Clinical consults (voice)',
      'SOAP notes + ICD-10',
      'Dentrix / Epic / OpenDental',
      'Insurance intake',
    ],
    agents: ['voice', 'patient'],
    client: 'Multi-state dental group',
    region: '38 locations · multi-state',
    metric: '$100K+',
    metricLabel: 'recovered per clinic per year',
    quote:
      'The doctors look at the patients again, not the screens. The patients notice. The notes are better than what we were hand-typing.',
    attrib: 'Dental group · 38 clinics · Clinical Operations',
    chips: ['LIVE · 38 LOCATIONS', 'HIPAA', 'AUDIO DISCARDED'],
  },
  {
    id: 'manufacturing',
    accent: '#2f5d14',
    headline: '',
    headlineAccent: 'Manufacturing',
    docs: [
      'Product Concern Reports',
      '8D reports (D1–D8)',
      'Dealer management exports',
      'Supplier traceability',
    ],
    agents: ['pcr'],
    client: 'Global automotive maker',
    region: 'SE Asia · regional quality operations',
    metric: '1.2M',
    metricLabel: 'reports indexed, root cause in hours',
    quote:
      'For the first time, root cause traces back to a supplier batch in hours. Our engineers spend their time fixing, not hunting.',
    attrib: 'Automotive OEM · SE Asia · Quality Engineering',
    chips: ['LIVE · 1.2M+ REPORTS', 'HOURS TO ROOT CAUSE', 'AUTO-CITED 8D'],
  },
  {
    id: 'real-estate',
    accent: '#1c456e',
    headline: 'Real',
    headlineAccent: 'Estate',
    docs: [
      'RFQs · Excel · document · scan',
      'Specs, supplier compliance',
      'Past-paid + government rate cards',
      'Award decision pack',
    ],
    agents: ['tender'],
    client: 'Real-estate developer',
    region: 'Mumbai · awarding crores monthly',
    metric: '4–8%',
    metricLabel: 'saved on every purchase order awarded',
    quote:
      'We compare every quote at one true landed cost — tax, freight, retention, terms — against past paid and government rate cards. The committee decides in days, not weeks.',
    attrib: 'Real-estate developer · Mumbai · Procurement',
    chips: ['LIVE · TENDER INTELLIGENCE', '4–8% PO SAVINGS', 'CITED DECISION PACK'],
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
