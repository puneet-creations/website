import { motion } from 'framer-motion';
import { Target, Quote, Settings2 } from 'lucide-react';

/**
 * WhyUsTriad — deck "Why us. Three things that make this engagement different."
 *
 * Outcome-owned · Cited by default · Tuned, not generic.
 * Verbatim from Attentions AI Capability Deck v2 (2026) page 12.
 */

const PILLARS = [
  {
    n: '01',
    icon: Target,
    title: 'Outcome-owned',
    sub: 'Measured by what got done. Not by what got summarised.',
    body:
      'Measured by what got posted into your finance system, written into the chart, or drafted to specification — not what got summarised in a slide.',
    them: 'Project plan',
    us: 'Contract tied to a named success measure',
  },
  {
    n: '02',
    icon: Quote,
    title: 'Cited by default',
    sub: 'Every output points back to a real source page or row.',
    body:
      'Every output the agent produces points back to a real source page or row. No hand-waving, no black-box answers. Verify the answer, don’t just trust it.',
    them: 'Trust the answer',
    us: 'Verify the answer',
  },
  {
    n: '03',
    icon: Settings2,
    title: 'Tuned, not generic',
    sub: 'Each agent tuned on your documents, your suppliers, your specs.',
    body:
      'Each agent is tuned on your documents, your suppliers, your specifications — not a generic model that knows none of your specifics.',
    them: 'One-size model',
    us: 'Your-business model',
  },
];

export default function WhyUsTriad() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s1)', padding: 'clamp(80px, 12vw, 140px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-[760px] mx-auto">
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Why us · three things that make this engagement different
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Three things that make this engagement{' '}
            <span style={{ fontStyle: 'italic' }}>different.</span>
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 md:p-10 rounded-3xl flex flex-col"
              style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                minHeight: 460,
              }}
            >
              {/* Number badge */}
              <div
                className="micro-upper mb-6"
                style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12, letterSpacing: '0.12em' }}
              >
                {p.n}
              </div>

              {/* Icon */}
              <div
                className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <p.icon size={28} style={{ color: '#000000' }} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                }}
              >
                {p.title}
              </h3>

              {/* Sub */}
              <p
                className="text-[15px] leading-snug mb-5"
                style={{
                  color: 'rgba(0,0,0,0.65)',
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                }}
              >
                {p.sub}
              </p>

              {/* Body */}
              <p
                className="text-[14px] leading-relaxed mb-6"
                style={{ color: 'rgba(0,0,0,0.65)' }}
              >
                {p.body}
              </p>

              {/* Them → Us contrast */}
              <div className="flex-1" />
              <div
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-5"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div>
                  <div
                    className="micro-upper mb-1"
                    style={{ color: 'rgba(0,0,0,0.40)', fontSize: 10 }}
                  >
                    Them
                  </div>
                  <div
                    className="text-[13px] leading-snug"
                    style={{ color: 'rgba(0,0,0,0.55)' }}
                  >
                    {p.them}
                  </div>
                </div>
                <span
                  className="text-[14px]"
                  style={{ color: 'rgba(0,0,0,0.30)' }}
                  aria-hidden="true"
                >
                  →
                </span>
                <div>
                  <div
                    className="micro-upper mb-1"
                    style={{ color: '#000000', fontSize: 10 }}
                  >
                    Us
                  </div>
                  <div
                    className="text-[13px] leading-snug font-semibold"
                    style={{ color: '#000000' }}
                  >
                    {p.us}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
