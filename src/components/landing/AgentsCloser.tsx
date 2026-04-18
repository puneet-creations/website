import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * AgentsCloser — Agents page closing manifesto.
 * Teal glass orb on the left, "Five agents today. Five more next quarter." manifesto on the right.
 * Mirrors the Platform page's PlatformCloser pattern with a teal variant.
 */

export default function AgentsCloser() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(96px, 14vw, 160px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Teal orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="relative"
              style={{ width: 'clamp(280px, 32vw, 420px)', height: 'clamp(280px, 32vw, 420px)' }}
            >
              <Suspense fallback={null}>
                <HeroOrb
                  baseColor="#0a3a2a"
                  attenuationColor="#8af5c0"
                  envColor="#a0e0c0"
                  attenuationDistance={0.9}
                  breatheAmp={0.14}
                  floatAmp={0.25}
                />
              </Suspense>
            </div>
          </motion.div>

          {/* Manifesto text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div className="micro-upper mb-6" style={{ color: 'rgba(0,0,0,0.55)' }}>
              The thesis
            </div>
            <h2
              className="mb-8"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#000000',
              }}
            >
              Five agents today.{' '}
              <span style={{ fontStyle: 'italic' }}>Five more next quarter.</span>
            </h2>
            <p
              className="max-w-[560px] mx-auto md:mx-0"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              Same base. Same pattern. Same audit trail. Each new agent costs 80% of the
              last &mdash; by layer six, it&rsquo;s mostly configuration.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
