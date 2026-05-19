import { motion } from 'framer-motion';

/**
 * CustomerQuote — single big editorial quote section that breaks up the
 * 5-card-grid run on the landing.
 *
 * Deck-faithful palette (parchment + ink), Fraunces italic display quote,
 * minimal chrome — the words do the work. Lifts the customer voice we
 * already have buried in /solutions to the landing where it earns the proof.
 */

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';

export default function CustomerQuote() {
  return (
    <section
      className="relative scroll-mt-20"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(80px, 11vw, 140px) clamp(16px, 3vw, 32px)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Quote eyebrow */}
          <div
            className="mb-6 inline-flex items-center"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(11px, 1vw, 13px)',
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              gap: 12,
            }}
          >
            <span style={{ width: 24, height: 1, background: STEEL, display: 'inline-block' }} />
            Customer voice · accounts payable · live in production
            <span style={{ width: 24, height: 1, background: STEEL, display: 'inline-block' }} />
          </div>

          {/* The quote — Fraunces, mixed italic, big */}
          <blockquote
            className="relative max-w-[900px] mx-auto"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(26px, 3vw, 44px)',
              fontWeight: 500,
              lineHeight: 1.25,
              letterSpacing: '-0.018em',
              color: INK,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, -110%)',
                top: 0,
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(56px, 6vw, 92px)',
                fontStyle: 'italic',
                color: 'rgba(0,0,0,0.15)',
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>
            The team only sees the{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>12% that actually needs a human decision</span>.
            Everything else is done. Posted. Audited.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>Before we’ve had our morning coffee.</span>
          </blockquote>

          {/* Attribution */}
          <div
            className="mt-10 inline-flex flex-col items-center gap-1"
            style={{
              borderTop: `1px solid ${RULE}`,
              paddingTop: 18,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(16px, 1.3vw, 19px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.3,
              }}
            >
              CFO · Global logistics group
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: STEEL,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Dubai · 20+ business units
            </div>
          </div>

          {/* Three-up proof row beneath the quote */}
          <div
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-y-0 sm:gap-x-8 max-w-[760px] mx-auto"
            style={{ borderTop: `1px dashed ${RULE}`, paddingTop: 28 }}
          >
            {[
              { metric: '14,200', label: 'vouchers · Monday backlog' },
              { metric: '10:42 AM', label: 'cleared by' },
              { metric: '6 wks', label: 'first ROI booked' },
            ].map((p) => (
              <div key={p.label} className="text-center">
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(22px, 2.2vw, 30px)',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: INK,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    marginBottom: 6,
                  }}
                >
                  {p.metric}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: CHARCOAL,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
