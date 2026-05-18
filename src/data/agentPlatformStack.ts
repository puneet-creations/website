// src/data/agentPlatformStack.ts

export type BeatId =
  | 'intro'
  | 'logistics' | 'pharma' | 'dental' | 'auto' | 'healthcare' | 'banking' | 'real-estate'
  | 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher' | 'tender' | 'fraud' | 'build'
  | 'synthesis';

export type Beat = {
  id: BeatId;
  start: number;  // 0..1, inclusive
  end: number;    // 0..1, exclusive (except synthesis which extends through 1.0)
};

// 17 beats: intro · 7 industries · 7 agents · build · synthesis
// 7 industries × 0.05 + 7 agents × 0.05 + intro 0.05 + build 0.05 + synthesis 0.20 = 1.00
export const BEATS: readonly Beat[] = [
  { id: 'intro',       start: 0.00, end: 0.05 },
  { id: 'logistics',   start: 0.05, end: 0.10 },
  { id: 'pharma',      start: 0.10, end: 0.15 },
  { id: 'dental',      start: 0.15, end: 0.20 },
  { id: 'auto',        start: 0.20, end: 0.25 },
  { id: 'healthcare',  start: 0.25, end: 0.30 },
  { id: 'banking',     start: 0.30, end: 0.35 },
  { id: 'real-estate', start: 0.35, end: 0.40 },
  { id: 'invoice',     start: 0.40, end: 0.45 },
  { id: 'pcr',         start: 0.45, end: 0.50 },
  { id: 'voice',       start: 0.50, end: 0.55 },
  { id: 'patient',     start: 0.55, end: 0.60 },
  { id: 'voucher',     start: 0.60, end: 0.65 },
  { id: 'tender',      start: 0.65, end: 0.70 },
  { id: 'fraud',       start: 0.70, end: 0.75 },
  { id: 'build',       start: 0.75, end: 0.80 },
  { id: 'synthesis',   start: 0.80, end: 1.001 },
] as const;

/**
 * Maps a scrollYProgress value in [0, 1] to the active beat.
 * Linear scan over 14 entries — O(n) but n is small and constant.
 * Called inside the scroll-event rAF loop; must stay cheap.
 */
export function activeBeatForProgress(p: number): Beat {
  for (const b of BEATS) {
    if (p >= b.start && p < b.end) return b;
  }
  return BEATS[BEATS.length - 1];
}

export type AgentLiveId = 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher' | 'tender' | 'fraud';
export type AgentId = AgentLiveId | 'build';

export type Industry = {
  id: 'logistics' | 'pharma' | 'dental' | 'auto' | 'healthcare' | 'banking' | 'real-estate';
  name: string;
  tagline: string;
  photoUrl: string;
  pairedAgentId: AgentLiveId;
};

export type Agent = {
  id: AgentId;
  name: string;
  domainLabel: string;
  flow: string;
  iconKey: 'FileText' | 'GitBranch' | 'Mic' | 'Phone' | 'Receipt' | 'Award' | 'ShieldAlert' | 'Plus';
  usesPlatformLayers: ReadonlyArray<1 | 2 | 3 | 4 | 5 | 6>;
};

export const INDUSTRIES: readonly Industry[] = [
  { id: 'logistics',   name: 'Logistics & trade finance', tagline: 'Clear the Monday backlog by 10:42.',                photoUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=70', pairedAgentId: 'invoice' },
  { id: 'pharma',      name: 'Pharma & life sciences',    tagline: 'Defect-report graphs across millions of reports.', photoUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=70', pairedAgentId: 'pcr' },
  { id: 'dental',      name: 'Dental networks',           tagline: 'Every clinical note written. Every call answered.', photoUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=70', pairedAgentId: 'voice' },
  { id: 'auto',        name: 'Automotive',                tagline: 'Warranty fraud flagged before payment.',           photoUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=70', pairedAgentId: 'voucher' },
  { id: 'healthcare',  name: 'Hospital systems',          tagline: 'Patient history, cited and reversible.',           photoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=70', pairedAgentId: 'patient' },
  { id: 'banking',     name: 'Banking & compliance',      tagline: 'KYC docs with a full audit trail.',                photoUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=70', pairedAgentId: 'invoice' },
  { id: 'real-estate', name: 'Real estate',               tagline: 'Every quote standardised to true landed cost.',    photoUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=70', pairedAgentId: 'tender' },
] as const;

export const AGENTS: readonly Agent[] = [
  { id: 'invoice', name: 'Invoice Intelligence',       domainLabel: 'Logistics',    flow: 'any format → finance system posted',  iconKey: 'FileText',    usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'pcr',     name: 'Defect-report Intelligence', domainLabel: 'Automotive',   flow: 'million reports → root cause cited',  iconKey: 'GitBranch',   usesPlatformLayers: [1, 2, 3, 5] },
  { id: 'voice',   name: 'Doctor’s Notes',             domainLabel: 'Healthcare',   flow: 'consult → structured note synced',    iconKey: 'Mic',         usesPlatformLayers: [1, 2, 3, 4] },
  { id: 'patient', name: 'Patient Call Agent',         domainLabel: 'Healthcare',   flow: 'call → book, bill, remind',           iconKey: 'Phone',       usesPlatformLayers: [1, 2, 3, 5, 6] },
  { id: 'voucher', name: 'Voucher Matching',           domainLabel: 'Logistics',    flow: 'six docs → clean payment out',        iconKey: 'Receipt',     usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'tender',  name: 'Tender Intelligence',        domainLabel: 'Real estate',  flow: 'every quote → one landed cost',       iconKey: 'Award',       usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'fraud',   name: 'Fraud Intelligence',         domainLabel: 'Automotive',   flow: 'every claim → scored at intake',      iconKey: 'ShieldAlert', usesPlatformLayers: [1, 2, 3, 5, 6] },
  { id: 'build',   name: '+ Build your own',           domainLabel: 'Any workflow', flow: '4 weeks to live',                     iconKey: 'Plus',        usesPlatformLayers: [1, 2, 3, 4, 5, 6] },
] as const;

export const PLATFORM_LAYERS: readonly { n: number; title: string; sub: string; tint: string }[] = [
  { n: 1, title: 'Sovereign runtime',       sub: 'On-prem · air-gapped · your hardware',            tint: 'rgba(138,245,192,0.12)' },
  { n: 2, title: 'Model router',            sub: 'Right model per task · small → frontier',          tint: 'rgba(245,168,212,0.12)' },
  { n: 3, title: 'Hallucination control',   sub: '4-layer citation · grounding · confidence gates',  tint: 'rgba(255,120,120,0.12)' },
  { n: 4, title: 'Enterprise connectors',   sub: 'SAP · Epic · Salesforce · DMS · Oracle',           tint: 'rgba(255,180,80,0.12)'  },
  { n: 5, title: 'Governance',              sub: 'Audit trail · approvals · RBAC · reversible',      tint: 'rgba(160,220,140,0.12)' },
  { n: 6, title: 'Security & compliance',   sub: 'GDPR · HIPAA · SOC 2 · ISO 27001 · PCI DSS',       tint: 'rgba(255,120,120,0.12)' },
] as const;

export type EngagementOption = {
  id: 'pilot' | 'evaluate' | 'architect';
  num: '01' | '02' | '03';
  label: string;
  pitch: string;
  href: string;
  ctaText: string;
};

export const ENGAGEMENT_OPTIONS: readonly EngagementOption[] = [
  { id: 'pilot',     num: '01', label: 'Scope your agent',      pitch: '4-week pilot. Fixed scope. One workflow live.',              href: '/pricing#assessment',        ctaText: 'Scope it' },
  { id: 'evaluate',  num: '02', label: 'Evaluate the platform', pitch: '30-day sandbox on your hardware. Bring your data.',         href: '/platform',                  ctaText: 'Start eval' },
  { id: 'architect', num: '03', label: 'Talk to an architect',  pitch: '30 min unfiltered. Regulatory, integrations, constraints.', href: 'mailto:hello@attentions.ai', ctaText: 'Book call' },
] as const;

// ============================================================
// Dev-only runtime assertions (no test framework in repo).
// Throws at module load if BEATS are miswired — surfaces in the
// browser console on first render during development. Tree-shaken
// out of production builds via import.meta.env.DEV check.
// ============================================================
if (import.meta.env.DEV) {
  for (let i = 0; i < BEATS.length - 1; i++) {
    if (BEATS[i].end !== BEATS[i + 1].start) {
      throw new Error(`BEATS gap/overlap between ${BEATS[i].id} and ${BEATS[i + 1].id}`);
    }
  }
  if (BEATS[0].start !== 0) throw new Error('BEATS must start at 0');
  if (BEATS[BEATS.length - 1].end < 1) throw new Error('BEATS must cover through 1.0');

  const cases: Array<[number, BeatId]> = [
    [0.00, 'intro'],
    [0.05, 'logistics'],
    [0.10, 'pharma'],
    [0.35, 'real-estate'],
    [0.40, 'invoice'],
    [0.65, 'tender'],
    [0.70, 'fraud'],
    [0.77, 'build'],
    [0.80, 'synthesis'],
    [1.00, 'synthesis'],
  ];
  for (const [p, expected] of cases) {
    const got = activeBeatForProgress(p).id;
    if (got !== expected) {
      throw new Error(`activeBeatForProgress(${p}) = ${got}, expected ${expected}`);
    }
  }
}
