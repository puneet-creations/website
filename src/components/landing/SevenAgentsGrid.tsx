import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Receipt, Wrench, Stethoscope, PhoneCall, FileCheck2, Building2, ShieldAlert,
  Shield, Target, TrendingDown, Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { InvoiceFieldExtract, PatientWavePulse, FraudAnomalyFlash } from '../motions/CardMotions';

/**
 * SevenAgentsGrid — deck v2 S04 "Seven agents in production" port.
 *
 * Visual ported verbatim from Attentions-AI-Capability-Deck-v2.html:
 *   - Arched cards (border-radius 70px 70px 4px 4px) — the deck's signature shape
 *   - Circle icon, mono "NN · Domain" eyebrow, display agent name
 *   - Strong-emphasized "does" body, dashed-bordered flow pipe
 *   - Big display stat number + caption
 *   - Foundation strip below — "All seven run on the same sovereign platform"
 *     with the four promises (Sovereign · Deterministic · Cost-effective · Scalable)
 *
 * Each card's content is deck-canon: lifted verbatim from S04 markup.
 */

type Agent = {
  n: string;
  domain: string;
  name: string;
  does: React.ReactNode;
  pipe: [string, string, string];      // 3 flow tokens; middle one rendered bold
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
  slug: string;                        // routes to /agents/<slug> case-study page
  motion?: React.ComponentType;        // optional in-view micro-animation
};

const AGENTS: Agent[] = [
  {
    n: '01',
    domain: 'Logistics',
    name: 'Invoice Intelligence',
    does: (
      <>
        Reads <strong>any format invoice</strong>, matches purchase order and goods-received note, posts clean ones straight into the finance system.
      </>
    ),
    pipe: ['Doc', 'Match', 'Post'],
    metric: '88%',
    metricLabel: 'no-touch post rate',
    icon: Receipt,
    slug: 'invoice-intelligence',
    motion: InvoiceFieldExtract,
  },
  {
    n: '02',
    domain: 'Automotive',
    name: 'Defect-report Intelligence',
    does: (
      <>
        Links <strong>millions of defect reports</strong> across models, regions, suppliers · drafts cited root-cause briefs.
      </>
    ),
    pipe: ['Reports', 'Graph', 'Brief'],
    metric: '1.2M',
    metricLabel: 'reports cross-linked',
    icon: Wrench,
    slug: 'defect-report-intelligence',
  },
  {
    n: '03',
    domain: 'Healthcare',
    name: 'Doctor’s Notes',
    does: (
      <>
        <strong>Listens on the premises</strong> · writes a structured clinical note · syncs to the hospital records system.
      </>
    ),
    pipe: ['Audio', 'Note', 'Records'],
    metric: '2h',
    metricLabel: 'given back per doctor / day',
    icon: Stethoscope,
    slug: 'doctors-notes',
  },
  {
    n: '04',
    domain: 'Healthcare',
    name: 'Patient Call Agent',
    does: (
      <>
        Answers <strong>every patient call 24/7</strong> · books, bills, reminds · only unusual calls go to staff.
      </>
    ),
    pipe: ['Call', 'Act', 'Book'],
    metric: '$100K',
    metricLabel: 'recovered per clinic / yr',
    icon: PhoneCall,
    slug: 'patient-call-agent',
    motion: PatientWavePulse,
  },
  {
    n: '05',
    domain: 'Logistics',
    name: 'Voucher Matching',
    does: (
      <>
        Cross-checks <strong>all six payment documents</strong> · clears clean packets · flags risky ones for finance.
      </>
    ),
    pipe: ['6 Docs', 'Match', 'Pay'],
    metric: '5 min',
    metricLabel: 'per six-doc packet',
    icon: FileCheck2,
    slug: 'voucher-matching',
  },
  {
    n: '06',
    domain: 'Real estate',
    name: 'Tender Intelligence',
    does: (
      <>
        Normalises every quote to <strong>true landed cost</strong> · benchmarks against past paid and government rates.
      </>
    ),
    pipe: ['Quotes', 'Compare', 'Award'],
    metric: '4–8%',
    metricLabel: 'savings on purchase orders',
    icon: Building2,
    slug: 'tender-intelligence',
  },
  {
    n: '07',
    domain: 'Automotive',
    name: 'Fraud Intelligence',
    does: (
      <>
        Scores <strong>every claim at upload</strong> · 12 fraud patterns checked · cited reasons in &lt; 1 second.
      </>
    ),
    pipe: ['Claim', 'Score', 'Block'],
    metric: '< 1s',
    metricLabel: 'to flag fraud at intake',
    icon: ShieldAlert,
    slug: 'fraud-intelligence',
    motion: FraudAnomalyFlash,
  },
];

const FOUNDATION = [
  { icon: Shield,        title: 'Sovereign',      sub: 'on your servers · data never leaves' },
  { icon: Target,        title: 'Deterministic',  sub: 'every answer cites page and line' },
  { icon: TrendingDown,  title: 'Cost-effective', sub: '~80% cheaper per task' },
  { icon: Layers,        title: 'Scalable',       sub: 'agent 2 to N are mostly settings' },
];

const INK = '#0A0A0A';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';
const ICE = '#E8E8E8';

export default function SevenAgentsGrid() {
  return (
    <section
      id="seven-agents"
      className="relative scroll-mt-20"
      style={{ padding: 'clamp(64px, 9vw, 120px) clamp(16px, 3vw, 32px)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Eyebrow + headline + sub — deck S04 framing */}
        <div className="mb-10 md:mb-14">
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            In production today · across every regulated domain we touch
          </div>

          <h2
            className="mb-5"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(34px, 4.4vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: INK,
            }}
          >
            In production today.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Across every domain we serve.
            </span>
          </h2>

          <p
            className="max-w-[1100px]"
            style={{
              fontFamily: 'var(--sans, "Plus Jakarta Sans")',
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: '#2B2B2B',
              borderLeft: `2px solid ${INK}`,
              paddingLeft: 16,
              fontWeight: 400,
            }}
          >
            <strong style={{ color: INK, fontWeight: 600 }}>
              We do not sell a catalog — we build the agent your industry needs.
            </strong>{' '}
            Below is a snapshot of the agents in production today; new domains land every quarter. The four promises hold for every one.
          </p>
        </div>

        {/* Arched-card grid — deck-faithful.
            Breakpoint ladder picked so cards stay readable but never wrap into
            an awkward single-orphan row:
              < 640px  : 1 col           (mobile)
              640-767  : 2 col           (sm)
              768-1023 : 3 col           (md  → 7 = 3+3+1)
              1024-1279: 4 col           (lg  → 7 = 4+3)
              ≥ 1280px : 7 col single row (xl — matches deck slide S04) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {AGENTS.map((a, i) => (
            <motion.div
              key={a.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
            <Link
              to={`/agents/${a.slug}`}
              aria-label={`${a.name} case study — ${a.metric} ${a.metricLabel}`}
              className="block h-full flex-col no-underline transition-all hover:-translate-y-0.5"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${RULE}`,
                // Signature arched card: ultra-rounded top, near-flat bottom
                borderRadius: '70px 70px 4px 4px',
                padding: '26px 16px 22px',
                minHeight: 360,
                display: 'flex',
                gap: 13,
                color: 'inherit',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = INK;
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = RULE;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top: circle icon */}
              <div className="flex flex-col items-center" style={{ gap: 10 }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 50,
                    height: 50,
                    border: `1.5px solid ${INK}`,
                    borderRadius: '50%',
                    color: INK,
                  }}
                  aria-hidden="true"
                >
                  <a.icon size={24} strokeWidth={1.8} />
                </div>
              </div>

              {/* NN · Domain */}
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 12.5,
                  color: STEEL,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  fontWeight: 700,
                }}
              >
                {a.n} · {a.domain}
              </div>

              {/* Agent name */}
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 19,
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}
              >
                {a.name}
              </h3>

              {/* What it does */}
              <div
                style={{
                  fontFamily: 'var(--sans, "Plus Jakarta Sans")',
                  fontSize: 14.5,
                  color: '#2B2B2B',
                  lineHeight: 1.45,
                  textAlign: 'center',
                  flex: 1,
                  padding: '4px 4px',
                }}
              >
                {a.does}
              </div>

              {/*
                Domain-specific micro-animation — fires once on first
                scroll into view, then loops a quiet gesture. Only
                attached to the highest-narrative agents (Invoice,
                Patient, Fraud); the other four show the static card
                as before. Keeps the page coherent — every card has
                the same geometry, but the ones with motion act as
                "visual anchors" that draw the eye across the grid.
              */}
              {a.motion && (
                <div style={{ margin: '2px 0 6px' }}>
                  <a.motion />
                </div>
              )}

              {/* Flow pipe — dashed borders */}
              <div
                className="flex items-center justify-center"
                style={{
                  gap: 1,
                  fontFamily: 'var(--mono)',
                  fontSize: 11.5,
                  color: STEEL,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '11px 0',
                  borderTop: `1px dashed ${RULE}`,
                  borderBottom: `1px dashed ${RULE}`,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <span style={{ padding: '0 2px', flexShrink: 0 }}>{a.pipe[0]}</span>
                <span style={{ color: '#A8A8A8', fontWeight: 400, padding: '0 2px' }}>→</span>
                <span
                  style={{
                    padding: '0 2px',
                    color: INK,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {a.pipe[1]}
                </span>
                <span style={{ color: '#A8A8A8', fontWeight: 400, padding: '0 2px' }}>→</span>
                <span style={{ padding: '0 2px', flexShrink: 0 }}>{a.pipe[2]}</span>
              </div>

              {/* Stat */}
              <div className="flex flex-col items-center" style={{ gap: 6, paddingTop: 4 }}>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 40,
                    fontWeight: 700,
                    color: INK,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {a.metric}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--sans, "Plus Jakarta Sans")',
                    fontSize: 13,
                    color: STEEL,
                    lineHeight: 1.4,
                    textAlign: 'center',
                  }}
                >
                  {a.metricLabel}
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>

        {/* Foundation strip — "All seven run on the same sovereign platform"
            Responsive: stacks to a 2-col grid below md, becomes a 5-col strip
            (label + 4 promises) at md+ to match the deck slide. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:[grid-template-columns:auto_repeat(4,1fr)] items-center gap-y-5 gap-x-6"
          style={{
            background: ICE,
            border: `1px solid ${RULE}`,
            borderRadius: 4,
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12.5,
              color: INK,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            All seven
            <span
              style={{
                display: 'block',
                color: STEEL,
                fontWeight: 500,
                marginTop: 4,
                fontSize: 12,
              }}
            >
              run on the same sovereign platform
            </span>
          </div>

          {FOUNDATION.map((f) => (
            <div key={f.title} className="flex items-center" style={{ gap: 10 }}>
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  border: `1.5px solid ${INK}`,
                  borderRadius: '50%',
                  color: INK,
                }}
                aria-hidden="true"
              >
                <f.icon size={14} strokeWidth={1.8} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans, "Plus Jakarta Sans")',
                  fontSize: 12.5,
                  color: '#2B2B2B',
                  lineHeight: 1.45,
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    color: INK,
                    fontWeight: 700,
                    fontSize: 14.5,
                    marginBottom: 2,
                  }}
                >
                  {f.title}
                </strong>
                {f.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
