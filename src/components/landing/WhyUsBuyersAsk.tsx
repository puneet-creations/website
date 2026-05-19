import { motion } from 'framer-motion';

/**
 * WhyUsBuyersAsk — deck v2 S16 "Why us. Three things that make this engagement different." ported.
 *
 * Replaces the old ContextKing ("The question buyers ask / An agent without
 * your context is not production software") on the landing.
 *
 * Deck-faithful: arched cards (border-radius 80px 80px 4px 4px), 01-02-03
 * circle marker, display name, body, and the deck's signature ribbon-style
 * "Them → Us" contrast at the foot (gray Them pill, ink-bordered Us pill).
 *
 * Content lifted verbatim from S16.
 */

type Reason = {
  n: string;
  name: string;
  body: React.ReactNode;
  them: string;
  us: string;
};

// Three pillars are engagement-focused — each closes a different risk gate
// for enterprise procurement: technical (POC), financial (ROI), and
// contractual (fixed scope/fee). Together they make the 4-week build sit
// inside a 6-week engagement with the de-risking story baked in.
const REASONS: Reason[] = [
  {
    n: '01',
    name: 'Proof before production',
    body: (
      <>
        A 2-week assessment ships a{' '}
        <strong>working proof-of-concept on your own documents</strong> — not a slide deck.
        Decide to roll into the 4-week production build, or walk away with the business case.
      </>
    ),
    them: 'Big-bang production project',
    us: 'POC on your data, then production',
  },
  {
    n: '02',
    name: 'ROI named on day one',
    body: (
      <>
        A <strong>named success measure agreed in writing at kickoff</strong> — 88% no-touch,
        ~2 hours back per doctor, &lt; 1 second to flag, whatever the workflow demands.
        If the business case isn’t hitting, we know before you do, and we revisit scope — not invoice.
      </>
    ),
    them: 'Wait for ROI at year-end',
    us: 'Named success measure from week 1',
  },
  {
    n: '03',
    name: 'Fixed scope, fixed fee',
    body: (
      <>
        The <strong>numbers in the assessment are the numbers on the contract</strong>.
        No T&amp;M, no change orders, no mid-flight rewrites. One senior architect agrees
        the scope; that scope ships in four weeks, on your servers.
      </>
    ),
    them: 'T&M hours · scope creep',
    us: 'Fixed scope · fixed fee',
  },
];

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const MUTE = '#A8A8A8';
const RULE = '#D9D9D9';
const ICE = '#E8E8E8';

export default function WhyUsBuyersAsk() {
  return (
    <section
      className="relative"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(72px, 10vw, 128px) clamp(16px, 3vw, 32px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Eyebrow + headline + sub */}
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
            Why us · 4 weeks to develop sovereign AI agents
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
            Why us.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Three things that make this engagement different.
            </span>
          </h2>

          <p
            className="max-w-[1100px]"
            style={{
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: CHARCOAL,
              borderLeft: `2px solid ${INK}`,
              paddingLeft: 16,
              fontWeight: 400,
            }}
          >
            One named business problem.{' '}
            <strong style={{ color: INK, fontWeight: 600 }}>
              A 2-week assessment with a working proof-of-concept on your data, then a 4-week production build on your servers.
            </strong>{' '}
            Six weeks from "should we?" to a live agent. Here’s what makes that contract — and that timeline — different from anything else you’ve signed.
          </p>
        </div>

        {/* 3 arched reason cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {REASONS.map((r, i) => (
            <motion.article
              key={r.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${RULE}`,
                // Deck S16 reason-card: 80px arched top, near-flat bottom
                borderRadius: '80px 80px 4px 4px',
                padding: '32px 26px 22px',
                gap: 12,
                minHeight: 360,
              }}
            >
              {/* 01/02/03 marker */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 46,
                  height: 46,
                  border: `1.5px solid ${INK}`,
                  borderRadius: '50%',
                  fontFamily: 'var(--mono)',
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: INK,
                  margin: '0 auto',
                }}
                aria-hidden="true"
              >
                {r.n}
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1.2,
                  textAlign: 'center',
                  marginTop: 4,
                }}
              >
                {r.name}
              </h3>

              {/* Body */}
              <div
                style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: CHARCOAL,
                  lineHeight: 1.55,
                  textAlign: 'center',
                  padding: '8px 4px',
                  flex: 1,
                }}
              >
                {r.body}
              </div>

              {/* Ribbon: Them → Us */}
              <div
                className="grid items-stretch"
                style={{
                  marginTop: 'auto',
                  paddingTop: 12,
                  borderTop: `1px dashed ${RULE}`,
                  gridTemplateColumns: '1fr auto 1fr',
                  gap: 8,
                }}
              >
                {/* Them */}
                <div
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    padding: '8px 10px',
                    borderRadius: 4,
                    color: STEEL,
                    background: ICE,
                  }}
                >
                  <b
                    style={{
                      display: 'block',
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: 3,
                      fontWeight: 700,
                      color: STEEL,
                    }}
                  >
                    Them
                  </b>
                  {r.them}
                </div>

                {/* Arrow */}
                <div
                  className="self-center text-center"
                  style={{
                    fontFamily: 'var(--mono)',
                    color: MUTE,
                    fontSize: 14.5,
                  }}
                  aria-hidden="true"
                >
                  →
                </div>

                {/* Us */}
                <div
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.45,
                    padding: '8px 10px',
                    borderRadius: 4,
                    color: INK,
                    background: '#FFFFFF',
                    border: `1px solid ${INK}`,
                    fontWeight: 500,
                  }}
                >
                  <b
                    style={{
                      display: 'block',
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: 3,
                      fontWeight: 700,
                      color: STEEL,
                    }}
                  >
                    Us
                  </b>
                  {r.us}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
