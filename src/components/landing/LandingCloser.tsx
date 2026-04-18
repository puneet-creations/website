import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

const OWNERSHIP_BULLETS = [
  {
    title: 'You own the weights.',
    body: 'The small language model trained on your data \u2014 yours forever, on your hardware.',
  },
  {
    title: 'You own the agent.',
    body: 'Code, connectors, prompts, policies \u2014 your IP, in your repo.',
  },
  {
    title: 'You own the proof.',
    body: 'Audit trail, evaluation harness, production runbook \u2014 all handed over.',
  },
];

/**
 * LandingCloser — landing page closing manifesto.
 * Black glass orb on the left, "Sovereign AI isn't borrowed. It's built."
 * manifesto on the right plus 3 ownership bullets absorbed from the
 * (now-dissolved) OwnershipBand. Brand-neutral palette distinct from
 * the 5 sub-page accents (blue / teal / amber / forest / slate).
 */
export default function LandingCloser() {
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
          {/* Black glass orb */}
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
                    baseColor="#0a0a0a"
                    attenuationColor="#1a1a1a"
                    envColor="#3a3a3a"
                    attenuationDistance={0.9}
                    breatheAmp={0.14}
                    floatAmp={0.25}
                  />
                </Suspense>
              )}
            </div>
          </motion.div>

          {/* Manifesto + ownership bullets */}
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
              Sovereign AI isn&rsquo;t borrowed.{' '}
              <span style={{ fontStyle: 'italic' }}>It&rsquo;s built.</span>
            </h2>
            <p
              className="max-w-[560px] mx-auto md:mx-0 mb-10"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              You rented your cloud for a decade. You won&rsquo;t rent your
              intelligence. The agents your regulator asks about &mdash; the
              ones that decide what gets posted to SAP, booked at 9 AM,
              approved by the CFO &mdash; belong inside your building.
            </p>

            <ul className="space-y-4 max-w-[560px] mx-auto md:mx-0 text-left">
              {OWNERSHIP_BULLETS.map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: '#000000' }}
                  >
                    <Check size={14} style={{ color: '#ffffff' }} strokeWidth={3} />
                  </span>
                  <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.80)' }}>
                    <strong style={{ color: '#000000', fontWeight: 600 }}>{b.title}</strong>{' '}
                    <span style={{ color: 'rgba(0,0,0,0.65)' }}>{b.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
