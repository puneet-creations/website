import { Eye, Brain, Zap, Quote, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

type Step = {
  verb: string;
  Icon: LucideIcon;
  detail: string;
  bg: string;
  ink: string;
};

const STEPS: Step[] = [
  { verb: 'Reads', Icon: Eye, detail: 'Any format. PDF, audio, email, API.', bg: 'rgba(255,120,120,0.06)', ink: '#ff9090' },
  { verb: 'Thinks', Icon: Brain, detail: 'Routes to the right model. On your servers.', bg: 'rgba(245,168,212,0.06)', ink: '#f5a8d4' },
  { verb: 'Does', Icon: Zap, detail: 'Posts to SAP. Writes to Epic. Syncs to DMS.', bg: 'rgba(138,245,192,0.06)', ink: '#8af5c0' },
  { verb: 'Cites', Icon: Quote, detail: 'Every answer traceable to page and line.', bg: 'rgba(255,180,80,0.06)', ink: '#ffd080' },
];

/**
 * PlatformFlow — the 4-verb promise of every agent.
 * "It reads. It thinks. It does. On your servers."
 * Horizontal 4-station flow with Lucide icons in colored-tint squares.
 */
export default function PlatformFlow() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s5)', padding: 'clamp(80px, 10vw, 120px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-[780px] mx-auto"
        >
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
            It reads. It thinks. It does.{' '}
            <span style={{ fontStyle: 'italic' }}>On your servers.</span>
          </h2>
          <p className="mt-4 text-[18px]" style={{ color: 'rgba(0,0,0,0.65)' }}>
            Every agent is a four-step promise. Same on-prem runtime every time.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          {STEPS.map((s, i) => (
            <div key={s.verb} className="flex items-center gap-4 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center justify-center text-center flex-1"
              >
                <div
                  className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-4"
                  style={{ background: s.bg, border: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <s.Icon size={44} style={{ color: s.ink }} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="font-display text-[24px] leading-none mb-2" style={{ color: '#000000' }}>
                  {s.verb}.
                </div>
                <div className="text-[14px] max-w-[170px]" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  {s.detail}
                </div>
              </motion.div>
              {i < STEPS.length - 1 && (
                <div
                  className="text-4xl font-light hidden lg:block"
                  style={{ color: 'rgba(0,0,0,0.15)' }}
                  aria-hidden="true"
                >
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14 text-center"
        >
          <span className="capsule-light inline-flex items-center gap-2 rounded-full">
            <span className="w-2 h-2 rounded-full" style={{ background: '#00b473' }} />
            Zero hallucination incidents in production
          </span>
        </motion.div>
      </div>
    </section>
  );
}
