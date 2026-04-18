import { Map, TrendingUp, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { motion } from 'framer-motion';
import { whiteCardStyle, AccentStrip } from './common/whiteCard';

/**
 * IsThisYou — 3 ICP persona cards. Clean white cards with colored accent
 * border, large heading, proof metric, quote, and CTA.
 */

const personas = [
  {
    icon: Map,
    label: 'No AI roadmap',
    pain: 'You know AI matters — you don\'t know where it fits in your organization or what it\'s worth.',
    proofMetric: '2 weeks',
    proofLabel: 'assessment · where & how AI helps',
    proofQuote: 'A 2-week expert-led assessment maps where AI delivers the highest ROI across your workflows — with a board-ready business case and a pilot plan.',
    proofAttr: 'Outcome · Strategy + ROI model',
    cta: 'Start the 2-week assessment',
    href: 'mailto:hello@attentions.ai?subject=2-Week%20Assessment',
  },
  {
    icon: TrendingUp,
    label: 'Running AI at cost',
    pain: 'Your bills on public AI keep climbing. The same workloads could run sovereign for a fraction of the cost.',
    proofMetric: 'up to 50%',
    proofLabel: 'cost reduction vs public AI',
    proofQuote: 'We port your running workloads from public AI (OpenAI, Claude, Gemini) to a sovereign deployment on your hardware — same outputs, predictable fixed infra cost.',
    proofAttr: 'Outcome · Fixed cost · Same accuracy',
    cta: 'Migrate to sovereign',
    href: 'mailto:hello@attentions.ai?subject=Migrate%20to%20Sovereign',
  },
  {
    icon: Shield,
    label: 'Blocked by compliance',
    pain: 'Data residency, compliance, and IP risk rule out public AI — but the opportunity cost is too high to wait.',
    proofMetric: '0 bytes',
    proofLabel: 'leave your perimeter',
    proofQuote: 'Sovereign AI platform on your hardware — air-gapped if needed — plus production-ready agents that automate regulated workflows end to end.',
    proofAttr: 'Outcome · Platform + automation agents',
    cta: 'Go sovereign',
    href: 'mailto:hello@attentions.ai?subject=Sovereign%20AI%20Platform',
  },
];

export default function IsThisYou() {
  const [ref, inView] = useInView<HTMLElement>(0.12);

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden" style={{ background: 'var(--bg-s2)' }}>
      <div className="cf-grid absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-[1320px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 max-w-[700px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.65)' }}>
            Which one are you?
          </div>
          <h2
            className={`sr d-1 ${inView ? 'is-in' : ''}`}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 56px)',
              letterSpacing: '-0.025em',
              color: '#000000',
              lineHeight: 1.1,
            }}
          >
            Where are you{' '}
            <span style={{ fontStyle: 'italic' }}>stuck?</span>
          </h2>
        </div>

        {/* 3 persona cards — middle card enters first from below, then sides */}
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((p, i) => {
            const isMiddle = i === 1;
            // Middle enters first from below, then left/right with delay
            const delay = isMiddle ? 0 : 0.45;
            const initialX = i === 0 ? -60 : i === 2 ? 60 : 0;
            const initialY = isMiddle ? 80 : 0;
            return (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: initialY, x: initialX }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 55, damping: 15, delay }}
              className="group"
            >
              <div
                className="relative transition-shadow duration-300 hover:shadow-xl flex flex-col"
                style={{
                  ...whiteCardStyle({ shadow: 'md' }),
                  minHeight: 680,
                }}
              >
                {/* Top accent strip */}
                <AccentStrip color="#000000" thickness={4} />

                <div className="p-10 flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                  >
                    <p.icon className="w-9 h-9" style={{ color: '#000000' }} />
                  </div>

                  {/* Persona label — THE HERO */}
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(32px, 3vw, 42px)',
                      fontWeight: 600,
                      lineHeight: 1.1,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.label}
                  </h3>

                  {/* Pain — subtitle */}
                  <p className="text-[20px] leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.60)' }}>
                    {p.pain}
                  </p>

                  {/* Proof metric — inline with label */}
                  <div
                    className="flex items-baseline gap-3 mb-6 pb-6"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                  >
                    <span
                      className="leading-none"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(44px, 4.5vw, 60px)',
                        fontWeight: 600,
                        fontStyle: 'italic',
                        color: '#000000',
                      }}
                    >
                      {p.proofMetric}
                    </span>
                    <span
                      className="text-[16px] uppercase tracking-wider leading-tight"
                      style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}
                    >
                      {p.proofLabel}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Quote + attribution */}
                  <blockquote
                    className="text-[18px] leading-relaxed mb-2"
                    style={{ color: 'rgba(0,0,0,0.70)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}
                  >
                    &ldquo;{p.proofQuote}&rdquo;
                  </blockquote>
                  <div className="text-[16px] mb-8" style={{ color: 'rgba(0,0,0,0.40)', fontFamily: 'var(--mono)' }}>
                    {p.proofAttr}
                  </div>

                  {/* CTA */}
                  <a
                    href={p.href}
                    className="capsule-dark self-start group-hover:scale-[1.03] transition-transform"
                    style={{ textDecoration: 'none', padding: '10px 20px', fontSize: 14 }}
                  >
                    {p.cta}
                    <span className="ml-1">&rarr;</span>
                  </a>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
