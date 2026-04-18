import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { FOUNDERS, EXPERTS, EXPERT_TOTAL_COUNT } from '../../data/about';

const ACCENT = '#475569';

/**
 * TeamGrid — 2 founder bios (richer) + 5–8 named experts grid +
 * aggregate footer "+ N more across AI research, ML engineering,
 * data science, domain expertise".
 */
export default function TeamGrid() {
  const [ref, inView] = useInView<HTMLElement>(0.1);
  const remaining = EXPERT_TOTAL_COUNT - EXPERTS.length - FOUNDERS.length;

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
            The team
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
            Founders who shipped.{' '}
            <span style={{ fontStyle: 'italic' }}>Experts who deliver.</span>
          </h2>
        </motion.div>

        {/* Founders block */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {FOUNDERS.map((founder, idx) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-start gap-5 mb-5">
                <div
                  className="w-[80px] h-[80px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 24,
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {founder.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 28,
                      fontWeight: 500,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                    }}
                  >
                    {founder.name}
                  </div>
                  <div
                    className="micro-upper mt-1"
                    style={{ color: ACCENT }}
                  >
                    {founder.role} · {founder.region}
                  </div>
                </div>
              </div>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.70)' }}
              >
                {founder.bio}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Experts grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTS.map((expert, idx) => (
            <motion.div
              key={`${expert.name}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
              className="rounded-2xl p-5"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${ACCENT}0d`,
                    border: `1px solid ${ACCENT}1a`,
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: 18,
                    fontWeight: 600,
                    color: ACCENT,
                  }}
                >
                  {expert.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 18,
                      fontWeight: 500,
                      color: '#000000',
                      lineHeight: 1.1,
                    }}
                  >
                    {expert.name}
                  </div>
                  <div
                    className="mt-1 text-[12px] leading-snug"
                    style={{ color: 'rgba(0,0,0,0.55)' }}
                  >
                    {expert.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate footer */}
        {remaining > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center text-[14px]"
            style={{
              color: 'rgba(0,0,0,0.55)',
              fontStyle: 'italic',
              fontFamily: 'var(--serif)',
            }}
          >
            + {remaining} more across AI research, ML engineering, data science, domain expertise.
          </motion.div>
        )}
      </div>
    </section>
  );
}
