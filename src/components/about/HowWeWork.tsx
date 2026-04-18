import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { WORK_PRINCIPLES, PAGE_ACCENT as ACCENT } from '../../data/about';

/**
 * HowWeWork — 5 merged beliefs/principles items. Vertical stack.
 * Each item: number + micro-upper label + Fraunces title with italic
 * accent + grey body paragraph.
 */
export default function HowWeWork() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px', background: 'var(--bg-s2)' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[880px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            How we work
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
            Five commitments.{' '}
            <span style={{ fontStyle: 'italic' }}>Every engagement.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {WORK_PRINCIPLES.map((item, idx) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                borderLeft: `3px solid ${ACCENT}`,
              }}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <div
                  className="flex-shrink-0"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 32,
                    fontWeight: 600,
                    color: ACCENT,
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </div>
                <div
                  className="micro-upper"
                  style={{ color: 'rgba(0,0,0,0.55)' }}
                >
                  {item.label}
                </div>
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                {item.title}{' '}
                <span style={{ fontStyle: 'italic', color: ACCENT }}>
                  {item.titleAccent}
                </span>
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.70)' }}
              >
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
