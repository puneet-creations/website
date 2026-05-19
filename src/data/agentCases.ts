/**
 * agentCases.ts — data source for the per-agent deep-dive pages.
 *
 * One entry per agent (deck S06–S12). Each entry is a verbatim port of
 * the deck case-study slide: business-problem narrative → 3-step solution
 * → outcome (big metric) → business benefits → "why our solution wins"
 * four-up.
 *
 * Components in src/pages/AgentCasePage.tsx are pure consumers of this
 * data — add a new agent by adding a new entry here.
 */

export type AgentCaseStep = {
  n: string;
  name: string;
  body: string;
};

export type AgentCaseBenefit = {
  label: string;
  detail: string;
};

export type AgentCaseWin = {
  label: string;
  body: string;
};

export type AgentCase = {
  slug: string;            // URL slug · /agents/<slug>
  caseNumber: string;      // "01 of 07"
  domain: string;          // "ACCOUNTS PAYABLE · LIVE · DUBAI"
  agentName: string;       // "Invoice Intelligence"
  tagline: string;         // "Any format in. Clean finance-system entry out."
  problemLead: string;     // 1–2 sentence intro framing the buyer pain
  problemBody: string;     // long problem narrative
  problemChips: string[];  // input / output chip badges
  solutionSteps: AgentCaseStep[];
  metric: string;          // big outcome number
  metricLabel: string;     // "invoices posted with no human touch"
  outcomeNote: string;     // italic supporting sentence
  benefits: AgentCaseBenefit[];
  wins: AgentCaseWin[];
};

export const AGENT_CASES: AgentCase[] = [
  {
    slug: 'invoice-intelligence',
    caseNumber: '01 of 07',
    domain: 'Accounts payable · live · Dubai',
    agentName: 'Invoice Intelligence',
    tagline: 'Any format in. Clean finance-system entry out.',
    problemLead:
      'A global logistics group drowning in supplier invoices across twenty-plus business units. Each one had to be opened, read, matched and re-typed into the finance system by hand.',
    problemBody:
      'Finance staff open every supplier invoice by hand — PDFs, scans, email attachments, even handwritten margins. Each one is read, matched against the purchase order, then re-typed into the finance system. Four to six hours per person every day. Payments run late, early-payment discounts get missed, the audit team cannot keep up.',
    problemChips: ['Document', 'Scan', 'Email', 'Spreadsheet', 'Handwritten', '→ Posted to finance system'],
    solutionSteps: [
      {
        n: '01',
        name: 'Read',
        body:
          'Reads any format — document, scan, email attachment, even handwritten margins. Looks up the supplier in your master list automatically.',
      },
      {
        n: '02',
        name: 'Match',
        body:
          'Three-way match — invoice vs purchase order vs goods-received note. Applies your tolerance rules per category. Routes the approver automatically.',
      },
      {
        n: '03',
        name: 'Post',
        body:
          'Posts in under thirty seconds. Every field linked back to the source document. Full audit trail attached.',
      },
    ],
    metric: '88%',
    metricLabel: 'invoices posted with no human touch',
    outcomeNote: 'A clean invoice goes from inbox to finance system in under thirty seconds.',
    benefits: [
      {
        label: 'Early-payment discounts captured',
        detail: 'faster cash cycle, better supplier terms',
      },
      {
        label: 'Accounts-payable team reallocates',
        detail: 'from re-keying to higher-value work',
      },
      {
        label: 'Audit-ready close',
        detail: 'every posting cited, every approval logged',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Runs on millions of invoices a month across many business units — chat-based cloud tools can only handle a handful of files per chat.',
      },
      {
        label: 'Your business',
        body:
          'Trained on your suppliers, your tolerances and your tax codes — not a generic document reader.',
      },
      {
        label: 'Real meaning',
        body:
          'Actually matches the invoice against the purchase order and the goods-received note, line by line, with reasons.',
      },
      {
        label: 'Stays inside',
        body:
          'The invoice data, the trained agent and the audit log all stay inside your own network.',
      },
    ],
  },
  {
    slug: 'defect-report-intelligence',
    caseNumber: '02 of 07',
    domain: 'Quality engineering · live · South East Asia',
    agentName: 'Defect-report Intelligence',
    tagline: 'Cross-link millions of reports. Cite the root cause.',
    problemLead:
      'A global automotive maker with millions of unstructured field reports — across many models, regions and suppliers — and quality engineers reading them one PDF at a time.',
    problemBody:
      'Quality engineers read defect reports one PDF at a time, in five languages, across many vehicle models and hundreds of suppliers. Patterns hide in the volume. A common defect goes unnoticed for months — until it has become a recall, the warranty bill has arrived, and brand trust has taken a hit.',
    problemChips: ['1.2M reports', '5 languages', 'Many models', '→ Cited root-cause brief'],
    solutionSteps: [
      {
        n: '01',
        name: 'Read',
        body: 'Reads every defect report in any format and any language. Extracts the part, the symptom, the supplier and the warranty cost.',
      },
      {
        n: '02',
        name: 'Cross-link',
        body: 'Connects related reports across models and regions automatically. Same symptom, same supplier, same root cause — clustered in one view.',
      },
      {
        n: '03',
        name: 'Brief',
        body: 'Drafts a cited eight-step root-cause brief for the quality engineer. Every claim links back to the source report.',
      },
    ],
    metric: '1.2M',
    metricLabel: 'reports cross-linked across regions',
    outcomeNote: 'Root-cause briefs drafted in minutes instead of weeks.',
    benefits: [
      {
        label: 'Warranty leakage caught early',
        detail: 'supplier chargebacks recovered in the same quarter',
      },
      {
        label: 'Recall scope cut',
        detail: 'only the truly-affected vehicles instead of the whole production batch',
      },
      {
        label: 'Quality engineers reallocated',
        detail: 'from reading to deciding',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Runs on the full corpus of 1.2 million reports at once — not on a sample, and across every language and model.',
      },
      {
        label: 'Your business',
        body:
          'Knows your part numbers, suppliers, warranty-cost structure and dealer network.',
      },
      {
        label: 'Real meaning',
        body:
          'Actually identifies the root cause and cites the source report — not just keyword search.',
      },
      {
        label: 'Stays inside',
        body:
          'Defect reports, dealer data and the trained agent never leave your network.',
      },
    ],
  },
  {
    slug: 'doctors-notes',
    caseNumber: '03 of 07',
    domain: 'Clinical documentation · live · 38 clinics',
    agentName: 'Doctor’s Notes',
    tagline: 'Listen on the premises. Write the note. Sync to records.',
    problemLead:
      'Doctors at a multi-country hospital chain spend two hours a day writing clinical notes after the patient has left. Burnout climbs. Documentation slips.',
    problemBody:
      'Doctors spend about two hours every day after patients leave, writing up clinical notes from memory. Details slip, diagnosis codes get missed, billing leaks, doctors burn out. Every hour of paperwork is an hour of fewer appointments — and one of the biggest reasons clinicians leave the profession.',
    problemChips: ['Visit audio', 'On the premises', 'Health-data law compliant', '→ Structured note in records'],
    solutionSteps: [
      {
        n: '01',
        name: 'Listen',
        body: 'Listens on the premises during the consultation — audio never leaves the clinic. Compliant with the United States health-data law by design.',
      },
      {
        n: '02',
        name: 'Structure',
        body: 'Writes a structured note in real time, with standard diagnosis codes (the international code list used by every hospital) already filled in. Templates are tuned to each specialty.',
      },
      {
        n: '03',
        name: 'Sync',
        body: 'Sends the note into the hospital records system immediately. Doctor approves with one click. Audio is deleted afterwards.',
      },
    ],
    metric: '~2h',
    metricLabel: 'given back to each doctor per day',
    outcomeNote: 'United States health-data law compliant by architecture. Audio deleted after the note is written.',
    benefits: [
      {
        label: 'Doctor retention',
        detail: 'single biggest staff-retention lever the chain has seen',
      },
      {
        label: 'Billing capture improves',
        detail: 'every consultation properly coded',
      },
      {
        label: 'More appointments per day',
        detail: 'doctor returns to the patient instead of paperwork',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Runs on thousands of consultations a day across every specialty and every clinic in your network.',
      },
      {
        label: 'Your business',
        body:
          'Templates tuned to your specialties, your billing codes and your local language.',
      },
      {
        label: 'Real meaning',
        body:
          'Writes a structured clinical note with diagnosis codes — not a transcript that a doctor still has to interpret.',
      },
      {
        label: 'Stays inside',
        body:
          'Patient audio never leaves the clinic · compliant with health-data law by architecture.',
      },
    ],
  },
  {
    slug: 'patient-call-agent',
    caseNumber: '04 of 07',
    domain: 'Patient front desk · live · 24/7',
    agentName: 'Patient Call Agent',
    tagline: 'Answer every call. Book. Bill. Remind.',
    problemLead:
      'Clinics miss thirty percent of incoming calls — every missed call is missed revenue. A useful agent has to actually book appointments, check insurance and send reminders.',
    problemBody:
      'Front-desk staff cannot answer every call — roughly thirty percent go unanswered, especially after-hours, on weekends and at peak times. Each missed call is a missed appointment, a missed prescription refill, a missed revenue line. The next clinic on the patient’s list gets the booking instead.',
    problemChips: ['30% missed', 'Bookings lost', 'After-hours', '→ Every call answered'],
    solutionSteps: [
      {
        n: '01',
        name: 'Answer',
        body: 'Picks up every call 24/7 in the patient’s local language. Identifies the patient against your records.',
      },
      {
        n: '02',
        name: 'Act',
        body: 'Books, reschedules, checks insurance, sends reminders — directly inside your scheduling and billing tools.',
      },
      {
        n: '03',
        name: 'Escalate',
        body: 'Only the unusual calls go to a human. Everything else is closed by the agent with a written record attached to the patient.',
      },
    ],
    metric: '$100K+',
    metricLabel: 'recovered per clinic per year',
    outcomeNote: 'Calls answered around the clock — no patient ever hears a busy tone.',
    benefits: [
      {
        label: 'No-shows reduced',
        detail: 'automatic reminders, easy rescheduling',
      },
      {
        label: 'Front-desk staff reallocated',
        detail: 'from picking up phones to in-clinic patient care',
      },
      {
        label: 'After-hours bookings recovered',
        detail: 'clinics capture evening and weekend demand',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Handles every call simultaneously around the clock — no queue, no busy tone, no missed booking.',
      },
      {
        label: 'Your business',
        body:
          'Reads your schedule, hospital records, billing rules and pharmacy the way your staff would.',
      },
      {
        label: 'Real meaning',
        body:
          'Books, reschedules, bills, sends reminders inside your existing tools — not just a chatbot transcript.',
      },
      {
        label: 'Stays inside',
        body:
          'Patient identity and call content stay in the clinic · compliant with health-data law.',
      },
    ],
  },
  {
    slug: 'voucher-matching',
    caseNumber: '05 of 07',
    domain: 'Payment review · live · Dubai',
    agentName: 'Voucher Matching',
    tagline: 'Six documents in. Clean payment out.',
    problemLead:
      'A logistics-payments team had finance staff reading six source documents per payment packet — sales order, delivery note, invoice, customs, payment instruction, internal approval — and reconciling each by hand.',
    problemBody:
      'Finance staff read six documents per payment packet — sales order, delivery note, invoice, customs, payment instruction, internal approval — and reconcile each one by hand. Always days behind. Suppliers chase. Silent mismatches in quantity, currency or payee slip past until month-end reconciliation finds them.',
    problemChips: ['6 documents', 'Days behind', 'Silent breaks', '→ Payment cleared in minutes'],
    solutionSteps: [
      {
        n: '01',
        name: 'Read',
        body: 'Reads all six documents at once — sales order, delivery note, invoice, customs, payment instruction, internal approval.',
      },
      {
        n: '02',
        name: 'Match',
        body: 'Cross-checks line by line. Catches mismatched quantity, currency, tax, payee. Clean packets are released to pay.',
      },
      {
        n: '03',
        name: 'Flag',
        body: 'Routes risky packets to a named approver with the exact mismatch highlighted and the source line cited.',
      },
    ],
    metric: '5 min',
    metricLabel: 'per six-document payment packet',
    outcomeNote: 'Match rate above ninety-seven percent on production volume.',
    benefits: [
      {
        label: 'Working-capital freed',
        detail: 'payments clear days earlier, supplier relationships improve',
      },
      {
        label: 'Silent leakage caught',
        detail: 'payments to the wrong payee or currency are blocked at intake',
      },
      {
        label: 'Finance team reallocated',
        detail: 'from clerical reading to genuine review work',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Runs on tens of thousands of payment packets a month — every day, six documents per packet, cross-checked instantly.',
      },
      {
        label: 'Your business',
        body:
          'Knows your currencies, tax codes, approval limits and named exceptions.',
      },
      {
        label: 'Real meaning',
        body:
          'Actually identifies the mismatched line and cites the source document — not just a generic flag.',
      },
      {
        label: 'Stays inside',
        body:
          'Payment data and the trained agent stay inside the finance perimeter.',
      },
    ],
  },
  {
    slug: 'tender-intelligence',
    caseNumber: '06 of 07',
    domain: 'Real estate · pilot · Mumbai',
    agentName: 'Tender Intelligence',
    tagline: 'Every quote, every spec, every tax.',
    problemLead:
      'A real-estate developer awards purchase orders worth crores every month. Today every quote arrives in a different format, with different terms, in different files — and the procurement team has no way to compare apples to apples in time to award.',
    problemBody:
      'Quotes arrive in different formats, with terms hidden in different files — and the team spends weeks doing manual analysis just to compare apples to apples.',
    problemChips: ['Excel', 'Document', 'Scan', '→ Comparable landed cost'],
    solutionSteps: [
      {
        n: '01',
        name: 'Read & extract',
        body: 'Reads every quote in any format — Excel, document, scan. Pulls specs, supplier, freight, retention, payment terms.',
      },
      {
        n: '02',
        name: 'Standardise',
        body: 'Converts every quote to one true landed cost — tax, freight, retention, payment terms included. Vendor compliance verified.',
      },
      {
        n: '03',
        name: 'Compare & award',
        body: 'Benchmarks against your past paid rates and government rate cards. One-page decision pack with cited reasons for the committee.',
      },
    ],
    metric: '4–8%',
    metricLabel: 'saved on every purchase order awarded',
    outcomeNote: 'Faster tenders, lower cost, fewer disputes.',
    benefits: [
      {
        label: 'Faster tenders',
        detail: 'weeks become days · decide on time',
      },
      {
        label: 'Lower purchase-order cost',
        detail: 'true landed cost, compliance verified',
      },
      {
        label: 'Cited decisions',
        detail: 'every award has a one-page reason pack for the committee',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Compares every quote across every tender — your whole portfolio, not just current procurement.',
      },
      {
        label: 'Your business',
        body:
          'Knows your specs, approved vendors, past paid rates and government rate cards.',
      },
      {
        label: 'Real meaning',
        body:
          'True landed cost — sales tax, freight, retention and payment terms included.',
      },
      {
        label: 'Stays inside',
        body:
          'Tender and vendor data stay on your procurement system.',
      },
    ],
  },
  {
    slug: 'fraud-intelligence',
    caseNumber: '07 of 07',
    domain: 'Automotive · warranty fraud · pilot',
    agentName: 'Fraud Intelligence',
    tagline: 'Every claim, every pattern, every reason.',
    problemLead:
      'A commercial-vehicle maker processes fifteen thousand dealer warranty claims a month from seven hundred dealers. Today fraud is caught quarterly by audit — by then the money has gone out. Each fraud type needs a different model — and they must all run in under a second at upload, not in a quarterly review.',
    problemBody:
      'Fraud is caught quarterly by audit — by then the money has already left. The same photo across six claims, invoices that look authentic but were never paid, ghost vehicles paid out, dealers batching the same problem across many cars. Honest and fraudulent dealers wait in the same payment queue — and warranty leakage runs at three to five percent of total payouts, lakhs leaking out every month. Fifteen thousand claims a month is too many for any team to forensically check by hand.',
    problemChips: ['15K claims / mo', '14 patterns', '→ Score < 1s'],
    solutionSteps: [
      {
        n: '01',
        name: 'Score on upload',
        body: 'Every claim is scored at intake. Fourteen fraud patterns checked simultaneously (photo hash · three-way match · writer model · vehicle history · ghost dealer · time anomaly · geo anomaly · repeat claim · part mismatch · cost outlier · invoice forgery · mileage gap · signature scan · dealer pattern). Result in under one second.',
      },
      {
        n: '02',
        name: 'Cite the reason',
        body: 'Each flag is cited — the specific photo, invoice or vehicle history that triggered it. Approvers see the evidence before they decide.',
      },
      {
        n: '03',
        name: 'Block or pay',
        body: 'Clean claims pay automatically. Flagged ones route to the named approver with the evidence pack. Quarterly audit becomes monitoring, not discovery.',
      },
    ],
    metric: '< 1s',
    metricLabel: 'to flag fraud at intake',
    outcomeNote: 'Fourteen patterns checked at upload. Honest dealers paid faster, no audit queue.',
    benefits: [
      {
        label: 'Money saved',
        detail: 'payouts blocked before they leave',
      },
      {
        label: 'Honest dealers paid faster',
        detail: 'no audit queue',
      },
      {
        label: 'Audit becomes monitoring',
        detail: 'daily, not quarterly',
      },
      {
        label: 'Dealer network cleaner',
        detail: 'repeat offenders surfaced in weeks',
      },
    ],
    wins: [
      {
        label: 'Volume',
        body:
          'Scores every single claim at upload — not a quarterly sample, not a post-payment audit.',
      },
      {
        label: 'Your business',
        body:
          'Trained on your dealers, your parts, your historical fraud cases and your warranty-cost structure.',
      },
      {
        label: 'Real meaning',
        body:
          'Cites the specific photo, invoice or vehicle history that triggered the flag — approvers see the evidence.',
      },
      {
        label: 'Stays inside',
        body:
          'Claim data, dealer information and the trained models stay on your warranty system.',
      },
    ],
  },
];

export const AGENT_CASE_BY_SLUG: Record<string, AgentCase> = Object.fromEntries(
  AGENT_CASES.map((c) => [c.slug, c]),
);
