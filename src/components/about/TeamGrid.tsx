import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { whiteCardStyle } from '../common/whiteCard';
import { FOUNDERS, ADVISORS, TEAM_TOTAL_COUNT, PAGE_ACCENT as ACCENT } from '../../data/about';

/**
 * TeamGrid — 2 founder bios + 3 advisory board members + aggregate
 * footer "+ 18 team members across AI research, ML engineering, data
 * science, domain expertise".
 */
export default function TeamGrid() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

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
            <span style={{ fontStyle: 'italic' }}>Advisors who&rsquo;ve scaled.</span>
          </h2>
        </motion.div>

        {/* Founders block */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {FOUNDERS.map((founder, idx) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="p-8 md:p-10"
              style={whiteCardStyle({ shadow: 'md' })}
            >
              <div className="flex items-start gap-5 mb-5">
                <div
                  aria-hidden="true"
                  className="w-[80px] h-[80px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                  }}
                >
                  {founder.photoUrl ? (
                    <img
                      src={founder.photoUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--serif)',
                        fontStyle: 'italic',
                        fontSize: 24,
                        fontWeight: 600,
                        color: ACCENT,
                      }}
                    >
                      {founder.initials}
                    </span>
                  )}
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

        {/* Advisory Board block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <div
            className="micro-upper mb-3"
            style={{ color: ACCENT }}
          >
            Advisory board
          </div>
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(22px, 2.4vw, 32px)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#000000',
            }}
          >
            Strategic guidance.{' '}
            <span style={{ fontStyle: 'italic' }}>Institutional credibility.</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {ADVISORS.map((advisor, idx) => (
            <motion.article
              key={advisor.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }}
              className="p-7"
              style={whiteCardStyle({ shadow: 'sm' })}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  aria-hidden="true"
                  className="w-[64px] h-[64px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}20`,
                  }}
                >
                  {advisor.photoUrl ? (
                    <img
                      src={advisor.photoUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--serif)',
                        fontStyle: 'italic',
                        fontSize: 20,
                        fontWeight: 600,
                        color: ACCENT,
                      }}
                    >
                      {advisor.initials}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 20,
                      fontWeight: 500,
                      color: '#000000',
                      lineHeight: 1.15,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {advisor.name}
                  </div>
                  <div
                    className="micro-upper mt-1"
                    style={{ color: ACCENT, fontSize: 11 }}
                  >
                    {advisor.role}
                  </div>
                </div>
              </div>
              <div
                className="mb-3 text-[13px] font-medium"
                style={{ color: 'rgba(0,0,0,0.80)' }}
              >
                {advisor.affiliation}
              </div>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.65)' }}
              >
                {advisor.bio}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Aggregate footer */}
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
          + {TEAM_TOTAL_COUNT} team members across AI research, ML engineering, data science, domain expertise.
        </motion.div>
      </div>
    </section>
  );
}
