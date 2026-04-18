/**
 * about.ts — data source for the /about page.
 *
 * Single source of truth. All 10 sections on /about consume from here.
 */

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

export type Advisor = {
  name: string;
  role: string;          // e.g., "EVP of Data, Analytics & AI"
  affiliation: string;   // e.g., "Swisscom"
  initials: string;
  bio: string;
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

// ── Advisory Board (3 real advisors from old attentions.ai/about-us) ──

export const ADVISORS: Advisor[] = [
  {
    name: 'Omair Ahmed Khan',
    role: 'EVP of Data, Analytics & AI',
    affiliation: 'Swisscom',
    initials: 'OK',
    bio:
      'Drives enterprise transformation with deep expertise in AI strategy, data governance, and large-scale change management across regulated industries.',
  },
  {
    name: 'Monica Dalla Riva',
    role: 'Chief Design Officer',
    affiliation: 'Deutsche Telekom',
    initials: 'MD',
    bio:
      'Shapes customer-focused innovation through global design and product expertise. Two decades architecting digital products at enterprise scale.',
  },
  {
    name: 'Murad Semercioglu',
    role: 'CEO',
    affiliation: 'CPC Y\u00f6netim Dan\u0131\u015fmanl\u0131k',
    initials: 'MS',
    bio:
      'Guides leaders and organizations through strategic transformation with expertise in executive advisory and performance coaching.',
  },
];

export const TEAM_TOTAL_COUNT = 18;

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
      'We\u2019re not a consulting firm counting hours. ROI metrics defined at scoping. Production agent live on your infrastructure by the end \u2014 and outcomes land within ~2 months of deployment, not years. If the business case isn\u2019t delivering, we know before you do, and we revisit scope.',
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
