import DeepDiveScrollLayout from './landing-cards/DeepDiveScrollLayout';
import type { Tab } from './landing-cards/DeepDiveLayout';
import InvoiceFlow from './motions/InvoiceFlow';
import PCRGraph from './motions/PCRGraph';
import VoiceWave from './motions/VoiceWave';
import PatientCall from './motions/PatientCall';
import VoucherStack from './motions/VoucherStack';
import TenderFlow from './motions/TenderFlow';
import FraudFlow from './motions/FraudFlow';

/**
 * AgentDeepDiveScroll — horizontal-scroll version of AgentDeepDive.
 * Each of the 7 agents is a full-viewport frame with:
 *   headline + metric + live motion story + 4-step workflow + outcome.
 * Names + metrics aligned to Attentions AI Capability Deck v2 (2026).
 */

const tabs: Tab[] = [
  {
    id: 'invoice',
    label: 'Invoice Intelligence',
    color: '#c3faf5',
    ink: '#187574',
    metric: '88%',
    metricLabel: 'no-touch post rate · 6× ROI week one',
    headline: 'Handwritten invoice in. Clean finance-system entry out.',
    description: '200+ invoices daily across 20+ business units in every format — PDFs, scans, email attachments, handwritten margins. artiGen reads them all, matches against the PO and goods-received note, posts clean ones to the finance system in under thirty seconds, and routes only the 12% needing judgement to a human.',
    motion: <InvoiceFlow />,
    steps: [
      { n: '1', title: 'Read', sub: 'Any format · supplier looked up automatically' },
      { n: '2', title: 'Match', sub: 'Three-way · invoice + PO + GRN · ±2% tolerance' },
      { n: '3', title: 'Post', sub: 'Posted in under 30s · cited every field' },
      { n: '4', title: 'Route', sub: 'Only the 12% needing judgement reach a human' },
    ],
    outcome: '88% posted with zero human touch. Audit-ready close every cycle.',
    outcomeSub: 'Live in a global logistics group · Dubai',
  },
  {
    id: 'pcr',
    label: 'Defect-report Intelligence',
    color: '#ffd8f4',
    ink: '#8a2c6a',
    metric: '1.2M',
    metricLabel: 'reports cross-linked · root cause in hours',
    headline: '1.2 million reports. One root cause. In hours.',
    description: 'The same turbocharger failure described three ways by three teams — nobody connected them. artiGen reads every defect report in any format and any language, extracts part, symptom, supplier, warranty cost, and clusters every related report so one root cause surfaces in hours instead of weeks.',
    motion: <PCRGraph />,
    steps: [
      { n: '1', title: 'Read', sub: '1.2M+ reports · all formats · 5 languages' },
      { n: '2', title: 'Cross-link', sub: 'Same symptom · same supplier · same root cause' },
      { n: '3', title: 'Trace', sub: 'Root cause · supplier batch · part number · cited' },
      { n: '4', title: 'Draft', sub: 'Cited 8-step root-cause brief for the QE team' },
    ],
    outcome: 'Root cause traced in hours, not weeks. Cited brief auto-drafted.',
    outcomeSub: 'Live at a global automotive maker · SE Asia',
  },
  {
    id: 'voice',
    label: 'Doctor’s Notes',
    color: '#ffc6c6',
    ink: '#600000',
    metric: '~2h',
    metricLabel: 'given back to each doctor per day',
    headline: 'Doctor talks. Note done. Records updated. ~2 hours back per day.',
    description: 'Doctors spend about two hours every day after patients leave, writing notes from memory. artiGen listens on the premises during the consultation, writes a structured clinical note in real time with diagnosis codes already filled in, and syncs to the hospital records system. Audio is deleted after the note is written.',
    motion: <VoiceWave />,
    steps: [
      { n: '1', title: 'Listen', sub: 'On the premises · audio never leaves the clinic' },
      { n: '2', title: 'Structure', sub: 'Structured clinical note + ICD codes · cited' },
      { n: '3', title: 'Sync', sub: 'Records system · one-click approve' },
      { n: '4', title: 'Delete', sub: 'Audio deleted after the note is written' },
    ],
    outcome: '~2 hours given back to each doctor per day. Audio never stored.',
    outcomeSub: 'Live in a multi-state dental group · 38 clinics',
  },
  {
    id: 'patient',
    label: 'Patient Call Agent',
    color: '#fff4cf',
    ink: '#746019',
    metric: '$100K+',
    metricLabel: 'recovered per clinic per year',
    headline: 'Every call answered. Books, bills, reminds. $100K+ per clinic.',
    description: 'Clinics miss thirty percent of incoming calls — every missed call is missed revenue. artiGen picks up every call 24/7 in the patient’s local language, identifies them against records, books or reschedules, checks insurance, sends reminders — and only the unusual calls go to a human.',
    motion: <PatientCall />,
    steps: [
      { n: '1', title: 'Answer', sub: 'Every call · 24/7 · patient identified' },
      { n: '2', title: 'Act', sub: 'Books, reschedules, checks insurance, reminds' },
      { n: '3', title: 'Recover', sub: 'After-hours bookings · no-show follow-ups' },
      { n: '4', title: 'Escalate', sub: 'Only unusual calls reach a human' },
    ],
    outcome: '$100K+ recovered per clinic per year. No patient hears a busy tone.',
    outcomeSub: 'Live in a multi-state dental group · 38 clinics',
  },
  {
    id: 'voucher',
    label: 'Voucher Matching',
    color: '#d7eac7',
    ink: '#2f5d14',
    metric: '5 min',
    metricLabel: 'per six-document payment packet',
    headline: 'Six documents in. Clean payment out. 5 minutes per packet.',
    description: 'Every payment packet is six source documents — sales order, delivery note, invoice, customs, payment instruction, internal approval. artiGen reads all six at once, cross-checks line by line, releases clean packets to pay, and routes risky ones to a named approver with the exact mismatch highlighted.',
    motion: <VoucherStack />,
    steps: [
      { n: '1', title: 'Read', sub: '6 doc types per packet · any order' },
      { n: '2', title: 'Match', sub: 'Line-by-line · quantity · currency · tax · payee' },
      { n: '3', title: 'Flag', sub: 'Risky packets routed with the exact mismatch cited' },
      { n: '4', title: 'Pay', sub: 'Clean packets released · 97%+ match rate' },
    ],
    outcome: '5 min per packet (was 2 hours). Mismatches caught before payment.',
    outcomeSub: 'Live in a global logistics group · Dubai',
  },
  {
    id: 'tender',
    label: 'Tender Intelligence',
    color: '#c0d8e8',
    ink: '#1c456e',
    metric: '4–8%',
    metricLabel: 'saved on every purchase order awarded',
    headline: 'Every quote, every spec, every tax — one true landed cost.',
    description: 'Quotes arrive in different formats with terms hidden in different files — and procurement teams spend weeks doing manual analysis just to compare apples to apples. artiGen reads every quote in any format, converts each to one true landed cost (tax, freight, retention, payment terms included), benchmarks against past paid and government rate cards, and ships a one-page cited decision pack.',
    motion: <TenderFlow />,
    steps: [
      { n: '1', title: 'Read', sub: 'Excel · document · scan · email — every format' },
      { n: '2', title: 'Standardise', sub: 'One true landed cost · vendor compliance verified' },
      { n: '3', title: 'Benchmark', sub: 'Past paid rates · government rate cards' },
      { n: '4', title: 'Award', sub: 'One-page decision pack with cited reasons' },
    ],
    outcome: '4–8% saved on every PO. Faster tenders. Fewer disputes.',
    outcomeSub: 'Live in real estate · Mumbai',
  },
  {
    id: 'fraud',
    label: 'Fraud Intelligence',
    color: '#ffd0c8',
    ink: '#6b1c10',
    metric: '< 1s',
    metricLabel: 'to flag fraud at intake · 14 patterns checked',
    headline: 'Every claim, every pattern, every reason — scored in under a second.',
    description: 'Fraud is normally caught quarterly by audit — by then the money is gone. artiGen scores every claim at intake, runs fourteen specialised fraud models simultaneously, cites the exact photo, invoice or vehicle history that triggered each flag, and routes flagged claims to a named approver. Clean claims pay automatically.',
    motion: <FraudFlow />,
    steps: [
      { n: '1', title: 'Score', sub: '14 patterns · checked simultaneously · in < 1s' },
      { n: '2', title: 'Cite', sub: 'Photo · invoice · history that triggered each flag' },
      { n: '3', title: 'Route', sub: 'Flagged → named approver with evidence pack' },
      { n: '4', title: 'Pay', sub: 'Clean claims pay automatically · no audit queue' },
    ],
    outcome: 'Audit becomes monitoring. 3–5% warranty leakage caught at intake.',
    outcomeSub: 'Live in automotive · 15K claims / mo · 700 dealers',
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
