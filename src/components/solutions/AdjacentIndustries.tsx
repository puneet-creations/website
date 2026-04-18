import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import {
  ADJACENT_INDUSTRIES,
  AGENT_BY_ID,
  INDUSTRY_BY_ID,
  type AdjacentIndustry,
} from '../../data/solutions';

/**
 * AdjacentIndustries — 7 industry cards + 1 CTA card (4x2 on desktop).
 *
 * Each card matches the IsThisYou pattern: black 1px top strip, icon
 * square, micro-upper industry label, Fraunces headline with italic
 * accent second line, body, agent chips, outcome chip.
 *
 * The 8th card is inverted (black bg) and is the "Your industry here?"
 * CTA pointing at hello@attentions.ai.
 */
export default function AdjacentIndustries() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(96px, 12vw, 160px) 24px', background: '#ffffff' }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-[720px]"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Same pattern · new verticals
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Seven more industries. <span style={{ fontStyle: 'italic' }}>Ready today.</span>
          </h2>
        </motion.div>

        {/* 4x2 grid (7 cards + 1 CTA) */}
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {ADJACENT_INDUSTRIES.map((card, idx) => (
            <Card key={card.id} data={card} delay={idx * 0.08} />
          ))}
          <CTACard delay={ADJACENT_INDUSTRIES.length * 0.08} />
        </div>
      </div>
    </section>
  );
}

function Card({ data, delay }: { data: AdjacentIndustry; delay: number }) {
  const Icon = (Lucide as any)[data.iconName] ?? Lucide.HelpCircle;
  const industry = INDUSTRY_BY_ID[data.id];

  return (
    <motion.div
      id={data.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="group flex flex-col"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: 520,
      }}
    >
      {/* Black 1px top accent strip */}
      <div style={{ height: 1, background: '#000000' }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Icon square */}
        <div
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <Icon size={28} style={{ color: '#000000' }} />
        </div>

        {/* Industry label */}
        <div className="micro-upper mb-3" style={{ color: 'rgba(0,0,0,0.55)' }}>
          {industry.name}
        </div>

        {/* Headline */}
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 2vw, 32px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#000000',
          }}
        >
          {data.headline}
          <br />
          <span style={{ fontStyle: 'italic' }}>{data.headlineAccent}</span>
        </h3>

        {/* Body */}
        <p
          className="mb-6 text-[15px] leading-relaxed"
          style={{ color: 'rgba(0,0,0,0.65)' }}
        >
          {data.body}
        </p>

        {/* Spacer to bottom */}
        <div className="flex-1" />

        {/* Agents that apply */}
        <div className="mb-4">
          <div className="micro-upper mb-3" style={{ color: 'rgba(0,0,0,0.40)', fontSize: 10 }}>
            Agents that apply
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.agents.map((aid) => (
              <span
                key={aid}
                className="inline-flex items-center rounded-full"
                style={{
                  padding: '4px 10px',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {AGENT_BY_ID[aid].short}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome chip */}
        <span
          className="capsule-light rounded-full self-start"
          style={{ fontSize: 11 }}
        >
          {data.outcomeChip}
        </span>
      </div>
    </motion.div>
  );
}

function CTACard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col"
      style={{
        background: '#000000',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: 520,
        color: '#ffffff',
      }}
    >
      {/* Amber top strip to match the page accent */}
      <div style={{ height: 1, background: '#d97706' }} />

      <div className="p-7 flex flex-col flex-1">
        <div
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)' }}
        >
          <Lucide.Plus size={28} style={{ color: '#ffffff' }} />
        </div>

        <div className="micro-upper mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Your industry?
        </div>

        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 2vw, 32px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Not here?
          <br />
          <span style={{ fontStyle: 'italic' }}>Bring the docs.</span>
        </h3>

        <p
          className="mb-6 text-[15px] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          The platform is industry-agnostic. The agents extend by pattern. If your
          workflow has mixed-format docs, regulated reporting, real-time voice, or
          multi-tool orchestration &mdash; we&rsquo;ve seen it before.
        </p>

        <div className="flex-1" />

        <a
          href="mailto:hello@attentions.ai?subject=New%20Industry%20Fit"
          className="self-start inline-flex items-center gap-2 rounded-full transition-all hover:scale-[1.03]"
          style={{
            padding: '10px 20px',
            fontFamily: 'var(--mono)',
            fontSize: 12,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: '#ffffff',
            color: '#000000',
            textDecoration: 'none',
          }}
        >
          Tell us about your documents
          <span>&rarr;</span>
        </a>
      </div>
    </motion.div>
  );
}
