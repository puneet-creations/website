import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { STATS } from '../../data/about';

const ACCENT = '#475569';

/**
 * StatRow — 4-up metric grid. White cards, 1px slate top accent,
 * Fraunces italic metric + mono description.
 */
export default function StatRow() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(40px, 6vw, 80px) 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-4 md:gap-5 grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ height: 1, background: ACCENT }} />
              <div className="p-6 md:p-7 text-center">
                <div
                  className="leading-none mb-3"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {stat.metric}
                </div>
                <div
                  className="text-[12px] uppercase tracking-wider leading-snug"
                  style={{ color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--mono)' }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
