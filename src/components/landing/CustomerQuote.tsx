import { motion, useReducedMotion } from 'framer-motion';
import AmbientVideo from '../motions/AmbientVideo';

/**
 * CustomerQuote — single big editorial quote section that breaks up the
 * 5-card-grid run on the landing.
 *
 * Deck-faithful palette (parchment + ink), Fraunces italic display quote,
 * minimal chrome — the words do the work. Lifts the customer voice we
 * already have buried in /solutions to the landing where it earns the proof.
 *
 * The quote itself reveals word-by-word on first scroll-in — a quiet,
 * cinematic moment that doesn't fight the typography. Reduced-motion
 * skips the stagger and renders statically.
 */

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';

/* Word-by-word reveal helper. Each word is a motion.span; the container
   drives the stagger via Framer's `variants`. Words wrap naturally and
   keep their parent's typography. */
type QuotePart = { text: string; emphasis?: boolean };
function QuoteReveal({ parts }: { parts: QuotePart[] }) {
  const reduced = useReducedMotion() ?? false;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.035,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  } as const;

  const word = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
    },
  } as const;

  let key = 0;
  return (
    <motion.span
      variants={container}
      initial={reduced ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      style={{ display: 'inline' }}
    >
      {parts.map((part, pi) => {
        const tokens = part.text.split(/(\s+)/); // keep whitespace tokens
        return tokens.map((tok) => {
          if (/^\s+$/.test(tok)) {
            // preserve spacing as a non-animated text node so wrapping behaves
            return <span key={key++}>{tok}</span>;
          }
          if (tok === '') return null;
          return (
            <motion.span
              key={key++}
              variants={word}
              style={{
                display: 'inline-block',
                fontStyle: part.emphasis ? 'italic' : undefined,
                fontWeight: part.emphasis ? 600 : undefined,
                willChange: 'transform, opacity, filter',
              }}
              data-emphasis={part.emphasis ? 'true' : undefined}
              data-part={pi}
            >
              {tok}
            </motion.span>
          );
        });
      })}
    </motion.span>
  );
}

const QUOTE_PARTS: QuotePart[] = [
  { text: 'The team only sees the ' },
  { text: '12% that actually needs a human decision', emphasis: true },
  { text: '. Everything else is done. Posted. Audited. ' },
  { text: 'Before we’ve had our morning coffee.', emphasis: true },
];

export default function CustomerQuote() {
  return (
    <section
      className="relative scroll-mt-20 overflow-hidden"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(80px, 11vw, 140px) clamp(16px, 3vw, 32px)',
      }}
    >
      {/*
        Editorial backdrop — slow macro of a paper stack on a desk.
        Heavily tinted (0.85 white wash) so the video reads as a soft
        textural cue rather than a foreground photograph. The Fraunces
        quote sits on a white panel above it; the paper-stack hint
        bleeds in at the section edges.
      */}
      <AmbientVideo
        src="/video/quote-papers.mp4"
        opacity={0.42}
        tint="#FFFFFF"
        tintOpacity={0.78}
        objectPosition="center 50%"
      />

      <div className="relative max-w-[1100px] mx-auto" style={{ zIndex: 1 }}>
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
            <QuoteReveal parts={QUOTE_PARTS} />
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
