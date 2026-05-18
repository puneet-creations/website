import { motion } from 'framer-motion';

/**
 * MoreAgentsStrip — "8 more agents live" reconciler.
 *
 * The /agents page deep-dives 7 named agents. Our marketing claim is 15 agents
 * live in production. This strip surfaces the other 8 by industry domain so the
 * count adds up, without committing to a full deep-dive per agent.
 */

const MORE_AGENTS = [
  { domain: 'Pharma',         tag: 'Adverse event correlation' },
  { domain: 'Banking',        tag: 'Trade finance reconciliation' },
  { domain: 'Hospitality',    tag: 'Front-desk orchestration' },
  { domain: 'Legal',          tag: 'E-discovery + intake' },
  { domain: 'Aviation',       tag: 'Incident + maintenance' },
  { domain: 'Retail',         tag: 'Supplier + returns' },
  { domain: 'Insurance',      tag: 'Claims-fraud at intake' },
  { domain: 'Manufacturing',  tag: 'Field inspection' },
];

export default function MoreAgentsStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(60px, 8vw, 100px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 max-w-[760px] mx-auto">
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            + 8 more in production
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#000000',
            }}
          >
            Seven detailed above.{' '}
            <span style={{ fontStyle: 'italic' }}>Eight more live across these domains.</span>
          </h2>
          <p
            className="mt-5 text-[16px] leading-relaxed max-w-[620px] mx-auto"
            style={{ color: 'rgba(0,0,0,0.65)' }}
          >
            New domains land every quarter. The four promises — sovereign, deterministic, cost-effective, scalable — hold for every one.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {MORE_AGENTS.map((a, i) => (
            <motion.div
              key={a.domain}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="p-4 md:p-5 rounded-2xl"
              style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div
                className="micro-upper mb-1.5"
                style={{ color: 'rgba(0,0,0,0.45)', fontSize: 10 }}
              >
                Domain
              </div>
              <div
                className="font-display text-[17px] font-semibold mb-2"
                style={{ color: '#000000' }}
              >
                {a.domain}
              </div>
              <div
                className="text-[13px] leading-snug"
                style={{ color: 'rgba(0,0,0,0.60)' }}
              >
                {a.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
