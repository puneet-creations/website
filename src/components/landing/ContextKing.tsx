import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * ContextKing — dark-cinematic comparison (post-Phase-2 cohesion pass).
 * Generic LLM vs artiGen+context, code-diff blocks + 3 bullets each.
 * Matches AgentPlatformStack's palette: #0a0e18 bg, teal accents, serif
 * italic headlines.
 */

const BAD_BULLETS = [
  'Guesses vendor names, fabricates GL codes',
  'No tolerance rules, no approval ladder',
  'No audit trail — undefendable',
];

const GOOD_BULLETS = [
  'Your masters, your taxonomy, your rules',
  'Every field traceable to a source chunk',
  'Full audit trail — reversible, defensible',
];

const RED = '#ff7a7a'; // brighter red for dark bg (vs light-bg #d94a4a)
const TEAL = '#8af5c0';

export default function ContextKing() {
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0a0e18', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      {/* Subtle teal radial pulse + dot grid, matching AgentPlatformStack */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(138,245,192,0.04), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: TEAL,
            }}
          >
            The question buyers ask
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            An agent without your context{' '}
            <span style={{ fontStyle: 'italic' }}>is not production software.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left — Generic LLM (red accent) */}
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[20px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,122,122,0.20)',
              borderTop: `3px solid ${RED}`,
            }}
          >
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: RED,
                }}
              >
                Generic LLM
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                The demo that{' '}
                <span style={{ fontStyle: 'italic' }}>dies in UAT.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    vendor: <span style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;Global Logistics Inc.&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; wrong</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    gl: <span style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;AP 2000&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; guessed</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    approver: <span style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;system admin&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; invented</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {BAD_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: RED }}
                    >
                      <X size={14} style={{ color: '#0a0e18' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* Right — artiGen + context (teal accent) */}
          <motion.article
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-[20px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(138,245,192,0.25)',
              borderTop: `3px solid ${TEAL}`,
            }}
          >
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: TEAL,
                }}
              >
                artiGen + context
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                The agent that{' '}
                <span style={{ fontStyle: 'italic' }}>actually ships.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    vendor: <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>Global Logistics LLC</span>
                    <span className="ml-2" style={{ color: TEAL }}>V-472 ✓</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    gl: <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>Freight · 6100-2340</span>
                    <span className="ml-2" style={{ color: TEAL }}>cited ✓</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    approver: <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>CFO · Named</span>
                    <span className="ml-2" style={{ color: TEAL }}>audit ✓</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {GOOD_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: TEAL }}
                    >
                      <Check size={14} style={{ color: '#0a0e18' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
