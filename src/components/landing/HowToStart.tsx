import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * HowToStart — closing manifesto for the landing page.
 * Pure type, no CTAs. CTAs live in the footer.
 *
 * Angle: sovereignty + regulated reality (combined per design 2026-04-15).
 */

export default function HowToStart() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(96px, 14vw, 180px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="micro-upper mb-8"
          style={{ color: 'rgba(0,0,0,0.55)' }}
        >
          The thesis
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: '#000000',
          }}
        >
          Sovereign AI isn&rsquo;t borrowed.{' '}
          <span style={{ fontStyle: 'italic' }}>It&rsquo;s built.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-10"
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 1.5vw, 22px)',
            lineHeight: 1.55,
            color: 'rgba(0,0,0,0.65)',
            maxWidth: 640,
          }}
        >
          You rented your cloud for a decade. You won&rsquo;t rent your intelligence.
          The agents your regulator asks about &mdash; the ones that decide what gets
          posted to SAP, booked at 9 AM, approved by the CFO &mdash; belong inside
          your building. Your hardware. Your weights. Your audit trail.
        </motion.p>
      </div>
    </section>
  );
}
