import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { whiteCardStyle, AccentStrip } from '../common/whiteCard';

/**
 * ContextKing — two WhiteCards comparing Generic LLM vs artiGen+context.
 * Terminal-style code-diff blocks and 3-bullet contrast per card.
 * No orbs (dropped from prior design to reduce landing-page orb count).
 */

const BAD_BULLETS = [
  'Guesses vendor names, fabricates GL codes',
  'No tolerance rules, no approval ladder',
  'No audit trail \u2014 undefendable',
];

const GOOD_BULLETS = [
  'Your masters, your taxonomy, your rules',
  'Every field traceable to a source chunk',
  'Full audit trail \u2014 reversible, defensible',
];

const RED = '#d94a4a';

export default function ContextKing() {
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s4)', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The question buyers ask
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
            An agent without your context{' '}
            <span style={{ fontStyle: 'italic' }}>is not production software.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ ...whiteCardStyle({ shadow: 'md' }) }}
          >
            <AccentStrip color={RED} />
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div className="micro-upper" style={{ color: RED }}>
                Generic LLM
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                The demo that{' '}
                <span style={{ fontStyle: 'italic' }}>dies in UAT.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    vendor: <span style={{ color: '#000000' }}>&ldquo;Global Logistics Inc.&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; wrong</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    gl: <span style={{ color: '#000000' }}>&ldquo;AP 2000&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; guessed</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    approver: <span style={{ color: '#000000' }}>&ldquo;system admin&rdquo;</span>
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
                      <X size={14} style={{ color: '#ffffff' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ ...whiteCardStyle({ shadow: 'md' }) }}
          >
            <AccentStrip color="#000000" />
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div className="micro-upper" style={{ color: '#000000' }}>
                artiGen + context
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                The agent that{' '}
                <span style={{ fontStyle: 'italic' }}>actually ships.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    vendor: <span style={{ color: '#000000', fontWeight: 500 }}>Global Logistics LLC</span>
                    <span className="ml-2" style={{ color: '#000000' }}>V-472 \u2713</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    gl: <span style={{ color: '#000000', fontWeight: 500 }}>Freight \u00b7 6100-2340</span>
                    <span className="ml-2" style={{ color: '#000000' }}>cited \u2713</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    approver: <span style={{ color: '#000000', fontWeight: 500 }}>CFO \u00b7 Named</span>
                    <span className="ml-2" style={{ color: '#000000' }}>audit \u2713</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {GOOD_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: '#000000' }}
                    >
                      <Check size={14} style={{ color: '#ffffff' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
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
