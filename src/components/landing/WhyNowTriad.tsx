import { motion } from 'framer-motion';

/**
 * WhyNowTriad — deck v2 S02 "Why Sovereign AI. Why now." ported.
 *
 * Three arched cards (Privacy / Cost / Outcomes) with a deck-faithful
 * 01-02-03 circle marker, name + tagline + body + the deck's signature
 * "Old way → New way" row-shift contrast at the bottom of each card.
 *
 * Content lifted verbatim from S02 markup.
 */

type Pillar = {
  n: string;
  name: string;
  tag: string;
  body: React.ReactNode;
  oldWay: string;
  newWay: string;
};

const PILLARS: Pillar[] = [
  {
    n: '01',
    name: 'Privacy',
    tag: 'Your data is no longer allowed to leave.',
    body: (
      <>
        Every chat-based cloud query sends your <strong>contracts, invoices and customer records</strong> to a vendor’s servers — often in another country.{' '}
        <strong>New laws in the European Union, India and the Gulf prohibit this.</strong>
      </>
    ),
    oldWay: 'Send data to a cloud server. Trust the vendor.',
    newWay: 'Agent runs inside your network. Data never leaves.',
  },
  {
    n: '02',
    name: 'Cost',
    tag: 'AI cloud bills are unpredictable and unusually high.',
    body: (
      <>
        Chat-based cloud tools charge for <strong>every question and every document</strong>. The pilot looks cheap. At a million queries a month,{' '}
        <strong>the bill is unpredictable and consistently over budget</strong>.
      </>
    ),
    oldWay: 'Pay per query. Surprise bills every month.',
    newWay: 'Small agent on your servers. One flat cost.',
  },
  {
    n: '03',
    name: 'Outcomes',
    tag: 'The board stopped buying demos.',
    body: (
      <>
        Technology and finance leaders no longer ask “could AI help?” They ask{' '}
        <strong>“what did the agent actually do last week?”</strong> A slide-pilot does not survive that question.
      </>
    ),
    oldWay: 'Slide pilot. A year of scoping. Nothing live.',
    newWay: 'Live agent in twelve weeks. Measured on a named success measure.',
  },
];

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const MUTE = '#A8A8A8';
const RULE = '#D9D9D9';

export default function WhyNowTriad() {
  return (
    <section
      id="why-now"
      className="relative scroll-mt-20"
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
            Why now · rules · cost · what gets bought
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
            Why Sovereign AI.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Why now.
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
            Three things have changed in the last year.{' '}
            <strong style={{ color: INK, fontWeight: 600 }}>
              Sending your data to an outside cloud is no longer safe or legal. AI cloud bills are unpredictable and unusually high. And the board has stopped buying demos.
            </strong>{' '}
            Together, they make sovereign artificial intelligence — running on your own servers — the only option that scales.
          </p>
        </div>

        {/* 3 arched cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${RULE}`,
                // Deck's signature pill-top arched card
                borderRadius: '9999px 9999px 6px 6px',
                padding: '36px 28px 24px',
                gap: 14,
                minHeight: 460,
              }}
            >
              {/* 01/02/03 circle marker — centered */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 46,
                  height: 46,
                  border: `1.5px solid ${INK}`,
                  borderRadius: '50%',
                  fontFamily: 'var(--mono)',
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: INK,
                  margin: '0 auto 8px',
                }}
                aria-hidden="true"
              >
                {p.n}
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
                }}
              >
                {p.name}
              </h3>

              {/* Tag — one-line summary */}
              <div
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  color: CHARCOAL,
                  lineHeight: 1.45,
                  textAlign: 'center',
                  padding: '0 4px',
                  fontWeight: 500,
                }}
              >
                {p.tag}
              </div>

              {/* Body */}
              <div
                style={{
                  fontSize: 14.5,
                  color: STEEL,
                  lineHeight: 1.55,
                  padding: '0 4px',
                }}
              >
                {p.body}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* OLD WAY → NEW WAY row-shift */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 14,
                  borderTop: `1px solid ${RULE}`,
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 6,
                }}
              >
                {/* OLD WAY */}
                <div style={{ fontSize: 13.5, lineHeight: 1.45, color: STEEL }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: STEEL,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: 2,
                      fontWeight: 700,
                    }}
                  >
                    Old way
                  </span>
                  {p.oldWay}
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    fontFamily: 'var(--mono)',
                    color: MUTE,
                    fontSize: 11,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  ↓
                </div>

                {/* NEW WAY */}
                <div style={{ fontSize: 13.5, lineHeight: 1.45, color: INK, fontWeight: 500 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: STEEL,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: 2,
                      fontWeight: 700,
                    }}
                  >
                    New way
                  </span>
                  {p.newWay}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
