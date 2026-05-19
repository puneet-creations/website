import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { AGENT_CASE_BY_SLUG, type AgentCase } from '../data/agentCases';

/**
 * AgentCasePage — single per-agent case study page (deck S06+ pattern).
 *
 * Pulled from src/data/agentCases.ts so additional agents drop in without
 * editing this file. Visual is deck-faithful: stone canvas, arched
 * problem card, three-step solution, big outcome stat, business-benefit
 * checklist, four-up "why we win".
 *
 * Route: /agents/<slug>. Unknown slug → redirect to /agents.
 */

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';
const ICE = '#E8E8E8';

export default function AgentCasePage() {
  const { slug } = useParams<{ slug: string }>();
  const caseData = slug ? AGENT_CASE_BY_SLUG[slug] : undefined;

  // Always call hooks above conditional returns — React rule of hooks.
  usePageMeta({
    title: caseData
      ? `${caseData.agentName} · ${caseData.tagline} — Attentions AI`
      : 'Agent case — Attentions AI',
    description: caseData
      ? `${caseData.problemLead} ${caseData.outcomeNote}`
      : 'Sovereign AI agent case study.',
    ogUrl: caseData ? `https://attentions.ai/agents/${caseData.slug}` : undefined,
  });

  if (!caseData) return <Navigate to="/agents" replace />;

  return <AgentCaseView caseData={caseData} />;
}

function AgentCaseView({ caseData }: { caseData: AgentCase }) {
  const c = caseData;
  return (
    <main style={{ background: '#F4F2EE' }}>
      {/* Hero block */}
      <section
        className="relative scroll-mt-20"
        style={{ padding: 'clamp(56px, 9vw, 120px) clamp(16px, 4vw, 32px) 0' }}
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Breadcrumb */}
          <nav
            className="mb-6"
            aria-label="Breadcrumb"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            <Link to="/agents" className="apple-link" style={{ color: STEEL, borderBottom: 'none' }}>
              ← Agents
            </Link>
          </nav>

          {/* Eyebrow */}
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Case {c.caseNumber} · {c.domain}
          </div>

          {/* Headline */}
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(36px, 4.8vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: INK,
              maxWidth: 1100,
            }}
          >
            {c.agentName}.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>{c.tagline}</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: CHARCOAL,
              borderLeft: `2px solid ${INK}`,
              paddingLeft: 16,
              maxWidth: 980,
              marginBottom: 56,
            }}
          >
            {c.problemLead}
          </p>
        </div>
      </section>

      {/* Three-up: problem · solution · outcome */}
      <section style={{ padding: '0 clamp(16px, 4vw, 32px) clamp(64px, 10vw, 128px)' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-4 lg:gap-5 items-start">
          {/* Problem card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
            style={{
              background: ICE,
              border: `1px solid ${RULE}`,
              borderRadius: '80px 80px 4px 4px',
              padding: '32px 26px 24px',
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: INK,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Business problem
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: CHARCOAL }}>
              {c.problemBody}
            </p>
            <div className="flex flex-wrap items-center mt-auto" style={{ gap: 6 }}>
              {c.problemChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${RULE}`,
                    color: CHARCOAL,
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '5px 10px',
                    borderRadius: 999,
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Solution steps */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${RULE}`,
              borderRadius: 8,
              padding: '32px 26px 24px',
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: STEEL,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Our solution · how it works
            </div>
            {c.solutionSteps.map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    border: `1.5px solid ${INK}`,
                    borderRadius: '50%',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: INK,
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 19,
                      fontWeight: 600,
                      color: INK,
                      lineHeight: 1.2,
                      marginBottom: 6,
                    }}
                  >
                    {step.name}
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.55, color: CHARCOAL }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.article>

          {/* Outcome card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="flex flex-col"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${RULE}`,
              borderRadius: '80px 80px 4px 4px',
              padding: '32px 26px 24px',
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: INK,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Outcome
            </div>
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(56px, 6vw, 86px)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: INK,
                lineHeight: 1,
                textAlign: 'center',
                letterSpacing: '-0.02em',
              }}
            >
              {c.metric}
            </div>
            <div
              style={{
                fontSize: 14.5,
                color: CHARCOAL,
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {c.metricLabel}
            </div>
            <p
              style={{
                fontSize: 14,
                color: STEEL,
                lineHeight: 1.55,
                fontStyle: 'italic',
                textAlign: 'center',
                fontFamily: 'var(--serif)',
                padding: '12px 8px',
                borderTop: `1px dashed ${RULE}`,
                borderBottom: `1px dashed ${RULE}`,
                marginTop: 4,
              }}
            >
              {c.outcomeNote}
            </p>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: INK,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Business benefits
            </div>
            <ul className="flex flex-col" style={{ gap: 8, paddingLeft: 0, listStyle: 'none', margin: 0 }}>
              {c.benefits.map((b) => (
                <li key={b.label} style={{ fontSize: 13.5, lineHeight: 1.5, color: CHARCOAL }}>
                  <strong style={{ color: INK, fontWeight: 600 }}>{b.label}</strong> · {b.detail}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        {/* "Why our solution wins" four-up */}
        <div className="max-w-[1280px] mx-auto mt-10">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_repeat(4,1fr)] items-start gap-y-6 lg:gap-y-0 lg:gap-x-7"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${RULE}`,
              borderRadius: 6,
              padding: '24px 28px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: INK,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                lineHeight: 1.4,
              }}
            >
              Why our<br />solution wins
            </div>
            {c.wins.map((w) => (
              <div key={w.label}>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: STEEL,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {w.label}
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: CHARCOAL }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="max-w-[1280px] mx-auto mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link to="/pricing#assessment" className="apple-pill">
            Scope a 2-week assessment <span aria-hidden="true">→</span>
          </Link>
          <Link to="/agents" className="apple-pill-ghost">
            See all 7 agents <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
