import DeepDiveScrollLayout from './landing-cards/DeepDiveScrollLayout';
import type { Tab } from './landing-cards/DeepDiveLayout';
import InvoiceFlow from './motions/InvoiceFlow';
import PCRGraph from './motions/PCRGraph';
import VoiceWave from './motions/VoiceWave';
import PatientCall from './motions/PatientCall';
import VoucherStack from './motions/VoucherStack';

/**
 * AgentDeepDiveScroll — horizontal-scroll version of AgentDeepDive.
 * Each of the 5 agents is a full-viewport frame with:
 *   headline + metric + live motion story + 4-step workflow + outcome.
 * Uses the same DeepDiveScrollLayout as the landing cards.
 */

const tabs: Tab[] = [
  {
    id: 'invoice',
    label: 'Invoice Intelligence',
    color: '#c3faf5',
    ink: '#187574',
    metric: '88%',
    metricLabel: 'zero human touch · 6× ROI week one',
    headline: 'Handwritten invoice to ERP in under 30 seconds.',
    description: '200+ invoices daily across 20+ business units in every format. What took three people all day now takes artiGen 30 seconds per invoice. Humans only see the 12% that need a second opinion.',
    motion: <InvoiceFlow />,
    steps: [
      { n: '1', title: 'Receive', sub: 'Any format · routed to OCR' },
      { n: '2', title: 'Extract', sub: 'Vendor · amount · VAT · GL account' },
      { n: '3', title: 'Match', sub: 'PO + GRN · 3-way · ±2% tolerance' },
      { n: '4', title: 'Post', sub: 'SAP S/4HANA · audit logged · exceptions only' },
    ],
    outcome: 'Posted to SAP with zero human touch · 6× ROI from week one.',
    outcomeSub: 'Live at a Fortune 500 logistics operator · Dubai',
  },
  {
    id: 'pcr',
    label: 'PCR Intelligence',
    color: '#ffd8f4',
    ink: '#8a2c6a',
    metric: '1.2M',
    metricLabel: 'reports indexed · root cause in hours',
    headline: '1.2 million reports. One root cause. In hours.',
    description: 'The same turbocharger failure described three ways by three teams — nobody connected them. artiGen read all 1.2M+ PCRs, built a knowledge graph, and traced the root cause to the exact supplier batch.',
    motion: <PCRGraph />,
    steps: [
      { n: '1', title: 'Ingest', sub: '1.2M+ reports · all formats · all languages' },
      { n: '2', title: 'Graph', sub: 'Knowledge graph · cross-team failure correlation' },
      { n: '3', title: 'Trace', sub: 'Root cause · supplier batch · part number · cited' },
      { n: '4', title: 'Draft', sub: '8D report · D1–D8 auto-filled with cited evidence' },
    ],
    outcome: 'Root cause traced in hours, not weeks. 8D draft auto-filled.',
    outcomeSub: 'Live at a European auto OEM · SE Asia',
  },
  {
    id: 'voice',
    label: 'Voice AI · SOAP',
    color: '#ffc6c6',
    ink: '#600000',
    metric: '~30s',
    metricLabel: 'SOAP note + ICD-10 per consult',
    headline: 'Doctor talks. AI listens. Note done in ~30 seconds.',
    description: '50%+ of physician time is admin. artiGen listens to the consultation in real time on-prem, generates SOAP notes with diagnosis codes automatically. Audio discarded. Zero typing.',
    motion: <VoiceWave />,
    steps: [
      { n: '1', title: 'Listen', sub: 'Real time on-prem · audio discarded' },
      { n: '2', title: 'Generate', sub: 'SOAP · ICD-10 · medications · cited' },
      { n: '3', title: 'Sync', sub: 'Dentrix · Epic · OpenDental' },
      { n: '4', title: 'Follow up', sub: 'Pre-visit intake · re-engagement' },
    ],
    outcome: 'SOAP note + ICD-10 in ~30 seconds. Audio never stored.',
    outcomeSub: 'Live at a US multi-clinic dental group · 38 locations',
  },
  {
    id: 'patient',
    label: 'Patient Experience OS',
    color: '#fff4cf',
    ink: '#746019',
    metric: '$400K+',
    metricLabel: 'recovered per location per year',
    headline: '$400K+ recovered per location. Without replacing a single system.',
    description: '18% no-show rate. 10-minute hold times. $400K+ leaking from missed calls and forgotten follow-ups. artiGen answers every call 24/7, knows every patient, and orchestrates the full journey.',
    motion: <PatientCall />,
    steps: [
      { n: '1', title: 'Answer', sub: 'Every call · 24/7 · patient context' },
      { n: '2', title: 'Prepare', sub: 'Pre-visit intake · insurance · history' },
      { n: '3', title: 'Recover', sub: 'Missed calls · no-shows · follow-ups' },
      { n: '4', title: 'Orchestrate', sub: '6–12 tools · zero replacements' },
    ],
    outcome: '$400K+ recovered per location per year. Zero system replacements.',
    outcomeSub: 'Live at a US multi-clinic dental group · 38 locations',
  },
  {
    id: 'voucher',
    label: 'Voucher Matching',
    color: '#d7eac7',
    ink: '#2f5d14',
    metric: '5 min',
    metricLabel: 'per voucher (was 2 hours)',
    headline: '200-page vouchers matched in 5 minutes, not 2 hours.',
    description: 'Every payment voucher is a packet of Cheques, POs, GRNs, Invoices, SOWs, Contracts — all different formats. artiGen reads every document, correlates, applies your rules, and generates a verified summary.',
    motion: <VoucherStack />,
    steps: [
      { n: '1', title: 'Ingest', sub: '6 doc types per packet · any order' },
      { n: '2', title: 'Classify', sub: 'Doc type · vendor · cross-ref IDs' },
      { n: '3', title: 'Correlate', sub: 'Line-by-line · ±2% tolerance' },
      { n: '4', title: 'Summarise', sub: 'Verified summary · pre-payment flags' },
    ],
    outcome: '5 min per voucher (was 2 hours). Mismatches caught before payment.',
    outcomeSub: 'Live at a Fortune 500 logistics operator · Dubai',
  },
];

export default function AgentDeepDiveScroll() {
  return (
    <DeepDiveScrollLayout
      sectionLabel="LIVE PRODUCTION AGENTS"
      sectionAccent="#5b76fe"
      tabs={tabs}
    />
  );
}
