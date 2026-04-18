import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { TIMELINE } from '../../data/about';

const ACCENT = '#475569';

/**
 * TimelineStrip — 5-node horizontal timeline on desktop, vertical
 * on mobile. Uniform slate accent (no per-node colors).
 */
export default function TimelineStrip() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The journey
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
            From idea{' '}
            <span style={{ fontStyle: 'italic' }}>to live in production.</span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-5 gap-6 md:gap-4">
          <div
            className="hidden md:block absolute left-[10%] right-[10%] top-[42px] h-[1px] pointer-events-none"
            style={{ borderTop: `1px dashed ${ACCENT}40` }}
          />
          {TIMELINE.map((node, idx) => (
            <motion.div
              key={`${node.year}-${node.label}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="relative z-10 w-[84px] h-[84px] rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `${ACCENT}0d`,
                  border: `1px solid ${ACCENT}26`,
                }}
              >
                <span
                  className="micro-upper"
                  style={{ color: ACCENT, fontSize: 11 }}
                >
                  {node.year}
                </span>
              </div>
              <div
                className="mb-2"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#000000',
                  lineHeight: 1.2,
                }}
              >
                {node.label}
              </div>
              <div
                className="text-[12px] leading-snug"
                style={{ color: 'rgba(0,0,0,0.60)' }}
              >
                {node.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
