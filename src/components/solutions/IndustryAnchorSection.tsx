import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { whiteCardStyle } from '../common/whiteCard';
import { AGENT_BY_ID, type AnchorIndustry } from '../../data/solutions';

/**
 * IndustryAnchorSection — one of the 3 in-production industry blocks.
 *
 * Two-column layout: docs + agents on the left, client card on the right.
 * Fraunces headline with italic accent word, amber metric, quote, proof chips.
 */
export default function IndustryAnchorSection({ data }: { data: AnchorIndustry }) {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      id={data.id}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="micro-upper mb-4" style={{ color: data.accent }}>
            In production
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            {data.headline && <>{data.headline}{' '}</>}
            <span style={{ fontStyle: 'italic', color: data.accent }}>{data.headlineAccent}</span>
          </h2>
        </motion.div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
          {/* LEFT: docs + agents */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
              The documents
            </div>
            <ul className="mb-10 space-y-2">
              {data.docs.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-[17px] leading-relaxed"
                  style={{ color: 'rgba(0,0,0,0.80)' }}
                >
                  <span
                    className="mt-[10px] flex-shrink-0 rounded-full"
                    style={{ width: 6, height: 6, background: data.accent }}
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
              The agents
            </div>
            <div className="flex flex-wrap gap-2">
              {data.agents.map((aid) => (
                <span
                  key={aid}
                  className="inline-flex items-center rounded-full"
                  style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#000000',
                    background: `${data.accent}12`,
                    border: `1px solid ${data.accent}30`,
                  }}
                >
                  {AGENT_BY_ID[aid].name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: client card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 md:p-10"
            style={whiteCardStyle({ shadow: 'md' })}
          >
            {/* Client header */}
            <div className="mb-6">
              <div className="font-display text-[24px] md:text-[28px] font-semibold" style={{ color: '#000000' }}>
                {data.client}
              </div>
              <div className="micro-upper mt-1" style={{ color: 'rgba(0,0,0,0.50)' }}>
                {data.region}
              </div>
            </div>

            {/* Lead metric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-2 leading-none"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(56px, 7vw, 96px)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: data.accent,
                filter: `drop-shadow(0 0 20px ${data.accent}33)`,
              }}
            >
              {data.metric}
            </motion.div>
            <div
              className="mb-8 text-[14px]"
              style={{ color: 'rgba(0,0,0,0.55)', fontFamily: 'var(--mono)' }}
            >
              {data.metricLabel}
            </div>

            {/* Quote */}
            <blockquote
              className="mb-3 pl-5"
              style={{
                borderLeft: `3px solid ${data.accent}`,
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.75)',
              }}
            >
              &ldquo;{data.quote}&rdquo;
            </blockquote>
            <div
              className="mb-8 pl-5 text-[13px]"
              style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}
            >
              &mdash; {data.attrib}
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-2">
              {data.chips.map((c) => (
                <span key={c} className="capsule-light rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
