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
];

export const AGENT_CASE_BY_SLUG: Record<string, AgentCase> = Object.fromEntries(
  AGENT_CASES.map((c) => [c.slug, c]),
);
