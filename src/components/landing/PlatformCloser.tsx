import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * PlatformCloser — Platform page closing manifesto.
 * Blue glass orb on the left, "Six layers. One base. Every agent plugs in." manifesto on the right.
 * Mirrors the LandingCloser orb + closer pattern.
 */

export default function PlatformCloser() {
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

          {/* Blue orb */}
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
                  baseColor="#1a3a8f"
                  attenuationColor="#5b76fe"
                  envColor="#a0b0e0"
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
              Six layers. One base.{' '}
              <span style={{ fontStyle: 'italic' }}>Every agent plugs in.</span>
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
              The platform isn&rsquo;t the product. The platform is what makes the product
              keep shipping &mdash; one agent today, five next quarter, at the same cost of
              ownership.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
