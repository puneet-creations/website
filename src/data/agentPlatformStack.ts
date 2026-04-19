// src/data/agentPlatformStack.ts

export type BeatId =
  | 'intro'
  | 'logistics' | 'pharma' | 'dental' | 'auto' | 'healthcare' | 'banking'
  | 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher' | 'build'
  | 'synthesis';

export type Beat = {
  id: BeatId;
  start: number;  // 0..1, inclusive
  end: number;    // 0..1, exclusive (except synthesis which extends through 1.0)
};

export const BEATS: readonly Beat[] = [
  { id: 'intro',       start: 0.00, end: 0.05 },
  { id: 'logistics',   start: 0.05, end: 0.12 },
  { id: 'pharma',      start: 0.12, end: 0.19 },
  { id: 'dental',      start: 0.19, end: 0.26 },
  { id: 'auto',        start: 0.26, end: 0.33 },
  { id: 'healthcare',  start: 0.33, end: 0.40 },
  { id: 'banking',     start: 0.40, end: 0.47 },
  { id: 'invoice',     start: 0.47, end: 0.53 },
  { id: 'pcr',         start: 0.53, end: 0.59 },
  { id: 'voice',       start: 0.59, end: 0.65 },
  { id: 'patient',     start: 0.65, end: 0.71 },
  { id: 'voucher',     start: 0.71, end: 0.77 },
  { id: 'build',       start: 0.77, end: 0.83 },
  { id: 'synthesis',   start: 0.83, end: 1.001 },
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

export type AgentLiveId = 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher';
export type AgentId = AgentLiveId | 'build';

export type Industry = {
  id: 'logistics' | 'pharma' | 'dental' | 'auto' | 'healthcare' | 'banking';
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
  iconKey: 'FileText' | 'GitBranch' | 'Mic' | 'Phone' | 'Receipt' | 'Plus';
  usesPlatformLayers: ReadonlyArray<1 | 2 | 3 | 4 | 5 | 6>;
};

export const INDUSTRIES: readonly Industry[] = [
  { id: 'logistics',  name: 'Logistics & trade finance', tagline: 'Clear the Monday backlog by 10:42.',      photoUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=70', pairedAgentId: 'invoice' },
  { id: 'pharma',     name: 'Pharma & life sciences',    tagline: 'PCR graphs across millions of reports.', photoUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=70', pairedAgentId: 'pcr' },
  { id: 'dental',     name: 'Dental networks',           tagline: 'Every patient call logged and coded.',   photoUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=70', pairedAgentId: 'voice' },
  { id: 'auto',       name: 'Automotive aftermarket',    tagline: 'Handwritten warranty claims → SAP.',     photoUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=70', pairedAgentId: 'voucher' },
  { id: 'healthcare', name: 'Hospital systems',          tagline: 'Patient history, cited and reversible.', photoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=70', pairedAgentId: 'patient' },
  { id: 'banking',    name: 'Banking & compliance',      tagline: 'KYC docs with a full audit trail.',      photoUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=70', pairedAgentId: 'invoice' },
] as const;

export const AGENTS: readonly Agent[] = [
  { id: 'invoice', name: 'Invoice Intelligence', domainLabel: 'Logistics',     flow: 'handwritten invoice → SAP posted',      iconKey: 'FileText',  usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'pcr',     name: 'PCR Graph',            domainLabel: 'Pharma',        flow: 'lab reports → knowledge graph',         iconKey: 'GitBranch', usesPlatformLayers: [1, 2, 3, 5] },
  { id: 'voice',   name: 'Voice Wave',           domainLabel: 'Dental',        flow: 'call audio → structured transcript',    iconKey: 'Mic',       usesPlatformLayers: [1, 2, 3, 4] },
  { id: 'patient', name: 'Patient Call',         domainLabel: 'Healthcare',    flow: 'call → SOAP notes',                     iconKey: 'Phone',     usesPlatformLayers: [1, 2, 3, 5, 6] },
  { id: 'voucher', name: 'Voucher Stack',        domainLabel: 'Auto warranty', flow: 'handwritten → SAP vouchers',            iconKey: 'Receipt',   usesPlatformLayers: [1, 2, 3, 4, 5] },
  { id: 'build',   name: '+ Build your own',     domainLabel: 'Any workflow',  flow: '4-8 weeks to live',                     iconKey: 'Plus',      usesPlatformLayers: [1, 2, 3, 4, 5, 6] },
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
  { id: 'pilot',     num: '01', label: 'Scope your agent',      pitch: '4-week pilot. Fixed scope. One workflow live.',              href: '/pricing#pilot',             ctaText: 'Scope it' },
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
    [0.12, 'pharma'],
    [0.47, 'invoice'],
    [0.82, 'build'],
    [0.83, 'synthesis'],
    [1.00, 'synthesis'],
  ];
  for (const [p, expected] of cases) {
    const got = activeBeatForProgress(p).id;
    if (got !== expected) {
      throw new Error(`activeBeatForProgress(${p}) = ${got}, expected ${expected}`);
    }
  }
}
