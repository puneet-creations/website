import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { whiteCardStyle, AccentStrip } from './common/whiteCard';

const SLATE = '#475569';

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
 * GTMPath — the 3-step customer journey.
 * Assessment → Pilot → Platform.
 * WhiteCard grid (no station circles). Effort-based chips (not dollar).
 */
export default function GTMPath() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s4)', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The engagement path
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
            Three steps from curious{' '}
            <span style={{ fontStyle: 'italic' }}>to live in production.</span>
          </h2>
          <p
            className="mt-4 text-[18px]"
            style={{ color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}
          >
            No surprises. No rewrites.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-6">
          <div
            className="hidden md:block absolute left-[16%] right-[16%] top-[96px] h-[1px] pointer-events-none"
            style={{ borderTop: `1px dashed ${SLATE}40` }}
          />

          {STEPS.map((s, idx) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
              className="relative"
              style={{ ...whiteCardStyle({ shadow: 'md' }) }}
            >
              <AccentStrip color={SLATE} />
              <div className="p-8 md:p-10 flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: 28,
                      fontWeight: 600,
                      color: SLATE,
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="micro-upper" style={{ color: 'rgba(0,0,0,0.50)' }}>
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
                    color: '#000000',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'rgba(0,0,0,0.70)' }}
                >
                  {s.body}
                </p>
                <span className="capsule-light rounded-full self-start mt-2">
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
