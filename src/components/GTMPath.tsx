import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const TEAL = '#8af5c0';

const STEPS = [
  {
    num: '01',
    week: 'Weeks 1-2',
    name: 'Assessment',
    body: 'One senior expert maps your workflows, scores them by AI leverage, and returns with a pilot spec.',
    effort: '2-week engagement',
  },
  {
    num: '02',
    week: 'Weeks 3-6',
    name: 'Pilot',
    body: 'We ship one agent into production on your hardware. Real document, real workflow, real users.',
    effort: '4-week deployment',
  },
  {
    num: '03',
    week: 'Month 2+',
    name: 'Platform',
    body: 'The agent you shipped becomes the first node on the shared base. New agents reuse every layer.',
    effort: 'Ongoing ownership',
  },
];

/**
 * GTMPath — 3-step customer journey (Assessment → Pilot → Platform).
 * Dark-cinematic palette matches ContextKing + AgentPlatformStack.
 */
export default function GTMPath() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0a0e18', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      {/* Subtle backdrop matching ContextKing */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
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
            The engagement path
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
            Three steps from curious{' '}
            <span style={{ fontStyle: 'italic' }}>to live in production.</span>
          </h2>
          <p
            className="mt-4 text-[18px]"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}
          >
            No surprises. No rewrites.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Teal dashed connector on desktop */}
          <div
            className="hidden md:block absolute left-[16%] right-[16%] top-[96px] h-[1px] pointer-events-none"
            style={{ borderTop: `1px dashed ${TEAL}30` }}
          />

          {STEPS.map((s, idx) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
              className="relative rounded-[20px] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `3px solid ${TEAL}`,
              }}
            >
              <div className="p-8 md:p-10 flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(138,245,192,0.12)',
                      color: TEAL,
                      fontFamily: 'var(--mono)',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="ml-2"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.50)',
                    }}
                  >
                    {s.week}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(28px, 2.8vw, 36px)',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'rgba(255,255,255,0.95)',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {s.body}
                </p>
                <span
                  className="rounded-full self-start mt-2 px-3 py-1 text-[12px] font-semibold"
                  style={{
                    background: 'rgba(138,245,192,0.08)',
                    color: TEAL,
                    border: `1px solid ${TEAL}25`,
                    fontFamily: 'var(--mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.effort}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
