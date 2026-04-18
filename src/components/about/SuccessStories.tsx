import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { SUCCESS_STORIES, PAGE_ACCENT as ACCENT } from '../../data/about';

/**
 * SuccessStories — 3 customer outcome cards. Same Thomson/Qira/Daimler
 * data as /solutions and /agents, but framed as proof of delivery
 * (track record), not vertical fit.
 */
export default function SuccessStories() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 24px', background: 'var(--bg-s2)' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            Proof of delivery
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
            Three enterprise clients.{' '}
            <span style={{ fontStyle: 'italic' }}>Production today.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {SUCCESS_STORIES.map((story, idx) => {
            const Icon: LucideIcon =
              (Lucide as unknown as Record<string, LucideIcon>)[story.iconName] ??
              Lucide.Building2;
            return (
              <motion.article
                key={story.client}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                className="flex flex-col overflow-hidden rounded-3xl"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  minHeight: 420,
                }}
              >
                <div style={{ height: 1, background: '#000000' }} />
                <div className="p-7 md:p-8 flex flex-col flex-1 gap-5">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${ACCENT}10`,
                      border: `1px solid ${ACCENT}20`,
                    }}
                  >
                    <Icon size={32} style={{ color: ACCENT }} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      className="font-display"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(22px, 1.8vw, 26px)',
                        fontWeight: 600,
                        color: '#000000',
                      }}
                    >
                      {story.client}
                    </div>
                    <div
                      className="micro-upper mt-1"
                      style={{ color: 'rgba(0,0,0,0.50)' }}
                    >
                      {story.region}
                    </div>
                  </div>
                  <div
                    className="leading-none"
                    style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(48px, 5vw, 72px)',
                      fontWeight: 600,
                      color: ACCENT,
                      filter: `drop-shadow(0 0 16px ${ACCENT}33)`,
                    }}
                  >
                    {story.metric}
                  </div>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: 'rgba(0,0,0,0.70)' }}
                  >
                    {story.outcome}
                  </p>
                  <div className="flex-1" />
                  <span
                    className="capsule-light rounded-full self-start"
                    style={{ fontSize: 11 }}
                  >
                    {story.proofChip}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
