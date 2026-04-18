import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

/**
 * PricingCloser — closing manifesto for the /pricing page.
 * Forest-green glass orb + "Scope small. Compound forever." manifesto
 * + single "Scope a door" CTA. Mirrors AgentsCloser / SolutionsCloser
 * / PlatformCloser with a forest-green variant.
 */
export default function PricingCloser() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-s2)',
        padding: 'clamp(96px, 14vw, 160px) 24px',
      }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Forest-green orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="relative"
              style={{
                width: 'clamp(280px, 32vw, 420px)',
                height: 'clamp(280px, 32vw, 420px)',
              }}
            >
              {inView && (
                <Suspense fallback={null}>
                  <HeroOrb
                    baseColor="#0a3a1a"
                    attenuationColor="#8af5a0"
                    envColor="#a0d0a0"
                    attenuationDistance={0.9}
                    breatheAmp={0.14}
                    floatAmp={0.25}
                  />
                </Suspense>
              )}
            </div>
          </motion.div>

          {/* Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div
              className="micro-upper mb-6"
              style={{ color: 'rgba(0,0,0,0.55)' }}
            >
              The engagement
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
              Scope small.{' '}
              <span style={{ fontStyle: 'italic' }}>Compound forever.</span>
            </h2>
            <p
              className="max-w-[560px] mx-auto md:mx-0 mb-8"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              Every door pays back in months. Every door leaves you owning what
              you built. Pick yours &mdash; or scope all three. Either way, the
              investment compounds on your balance sheet, not ours.
            </p>
            <a
              href="mailto:hello@attentions.ai?subject=Scoping"
              className="capsule-dark inline-flex items-center gap-2 rounded-full transition-transform hover:scale-[1.03]"
              style={{
                padding: '12px 24px',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              Scope a door
              <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
