import { motion } from 'framer-motion';

/**
 * ThreeOfferings — deck v2 S03 "What we do. And what it costs." ported.
 *
 * Replaces the old IsThisYou ("Where are you stuck?") section on the landing.
 * Deck-faithful: arched cards (border-radius 9999px 9999px 6px 6px), big
 * light-weight number, mono week-fee row, italic tagline, bulleted promise
 * list, OUTCOME callout with dashed top/bottom borders + ink accent bar,
 * big display price + mono caption.
 *
 * Content lifted verbatim from S03 markup.
 */

type Offering = {
  num: string;
  week: string;
  name: string;
  tag: string;
  bullets: string[];
  outcome: React.ReactNode;
  priceNum: string;
  priceSub: string;
  ctaLabel: string;
  ctaHref: string;
};

const OFFERINGS: Offering[] = [
  {
    num: '01',
    week: '2 weeks · fixed fee',
    name: 'Enterprise AI Assessment',
    tag: 'A board-ready business case in two weeks.',
    bullets: [
      'One senior architect, working with your team',
      'Two to three candidate processes audited and scored',
      'Named success measure agreed in writing',
      'Board-ready business case and agent specification',
    ],
    outcome: (
      <>
        A signed business case and a <strong>target go-live date</strong> for your first agent.
      </>
    ),
    priceNum: '$5,000 USD',
    priceSub: 'Fixed · One time',
    ctaLabel: 'Start the assessment',
    ctaHref: 'mailto:hello@attentions.ai?subject=Enterprise%20AI%20Assessment',
  },
  {
    num: '02',
    week: '4 weeks · per agent',
    name: 'Sovereign AI Agent',
    tag: 'One agent, live on your servers, in four weeks.',
    bullets: [
      'One named business problem, solved end-to-end',
      'Scope and fee fixed at the end of the assessment',
      'No platform commitment required',
      'Runs on your servers from day one',
    ],
    outcome: (
      <>
        <strong>One live agent</strong> on your servers, measured against the named success measure.
      </>
    ),
    priceNum: 'From $10,000 USD',
    priceSub: 'Up to $50K · Complex workflow',
    ctaLabel: 'Scope an agent',
    ctaHref: 'mailto:hello@attentions.ai?subject=Sovereign%20AI%20Agent',
  },
  {
    num: '03',
    week: '6 weeks · platform + agents',
    name: 'Sovereign AI Platform',
    tag: 'Full platform deployed, three custom agents live.',
    bullets: [
      'Platform deployed inside your network',
      'Three custom agents built and live in phase one',
      'Every additional agent at the same flat fee',
      'One foundation. Many agents. Compounding return.',
    ],
    outcome: (
      <>
        <strong>Three agents live, platform deployed</strong> — every next agent at the same flat fee.
      </>
    ),
    priceNum: '$20,000 USD / year',
    priceSub: '+ $10,000 USD per custom agent',
    ctaLabel: 'Scope the platform',
    ctaHref: 'mailto:hello@attentions.ai?subject=Sovereign%20AI%20Platform',
  },
];

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';

export default function ThreeOfferings() {
  return (
    <section
      id="offerings"
      className="relative scroll-mt-20"
      style={{
        background: '#F4F2EE',                                  // --stone
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
            What we do · three offerings · transparent pricing
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
            What we do.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              And what it costs.
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
            Three ways to start, listed in order of commitment — a two-week scoping assessment, a single sovereign agent live in four weeks, or the full platform deployed in six.{' '}
            <strong style={{ color: INK, fontWeight: 600 }}>
              The numbers on this page are the numbers on the contract.
            </strong>
          </p>
        </div>

        {/* 3 arched offering cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {OFFERINGS.map((o, i) => (
            <motion.article
              key={o.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${RULE}`,
                // Pill-shaped top, near-flat bottom — the deck's signature arch
                borderRadius: '9999px 9999px 6px 6px',
                padding: '40px 28px 24px',
                gap: 11,
                minHeight: 580,
              }}
            >
              {/* Big number 01/02/03 */}
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(46px, 4.4vw, 60px)',
                  fontWeight: 300,
                  color: INK,
                  lineHeight: 1,
                  textAlign: 'center',
                  letterSpacing: '-0.04em',
                }}
              >
                {o.num}
              </div>

              {/* Week · fee */}
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  color: STEEL,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {o.week}
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1.2,
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                {o.name}
              </h3>

              {/* Tag */}
              <div
                style={{
                  fontSize: 14.5,
                  color: CHARCOAL,
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  textAlign: 'center',
                  padding: '0 6px',
                }}
              >
                {o.tag}
              </div>

              {/* Bullet list */}
              <ul
                className="flex flex-col"
                style={{
                  fontSize: 13.5,
                  color: CHARCOAL,
                  lineHeight: 1.45,
                  gap: 7,
                  paddingTop: 12,
                  borderTop: `1px solid ${RULE}`,
                  margin: 0,
                  listStyle: 'none',
                }}
              >
                {o.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: INK,
                        flexShrink: 0,
                        marginTop: 7,
                      }}
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* OUTCOME callout */}
              <div
                className="flex flex-col"
                style={{
                  marginTop: 14,
                  padding: '12px 0',
                  borderTop: `1px dashed ${RULE}`,
                  borderBottom: `1px dashed ${RULE}`,
                  gap: 5,
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
                    borderLeft: `3px solid ${INK}`,
                    paddingLeft: 10,
                  }}
                >
                  Outcome
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: CHARCOAL,
                    lineHeight: 1.45,
                    fontStyle: 'italic',
                    paddingLeft: 13,
                  }}
                >
                  {o.outcome}
                </div>
              </div>

              {/* Price block */}
              <div
                className="flex flex-col items-center"
                style={{ marginTop: 'auto', paddingTop: 14, gap: 4 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 28,
                    fontWeight: 700,
                    color: INK,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    textAlign: 'center',
                  }}
                >
                  {o.priceNum}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: STEEL,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  {o.priceSub}
                </div>
              </div>

              {/* CTA */}
              <a
                href={o.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full transition-transform hover:scale-[1.03]"
                style={{
                  marginTop: 14,
                  padding: '11px 18px',
                  background: INK,
                  color: '#FFFFFF',
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                {o.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
