import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxHero — full-viewport parallax background image section.
 * Inspired by davincho-hero pattern, adapted for Vite+React.
 *
 * Features:
 *   - Background image with scroll-driven parallax (useTransform, no position:fixed)
 *   - clipPath inset with rounded corners for visual container effect
 *   - mix-blend-difference text — readable on any background
 *   - Optional pills rendered below headline
 */

type ParallaxHeroProps = {
  imageSrc: string;
  imageAlt?: string;
  headline: string;
  headlineAccent?: string;
  subline?: string;
  pills?: string[];
  height?: string;
  clipRadius?: number;
  label?: string;
};

export default function ParallaxHero({
  imageSrc,
  imageAlt = '',
  headline,
  headlineAccent,
  subline,
  pills,
  height = '80vh',
  clipRadius = 24,
  label,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        height,
        minHeight: height,
        margin: clipRadius > 0 ? '0 16px' : 0,
        clipPath: clipRadius > 0 ? `inset(0 round ${clipRadius}px)` : undefined,
        isolation: 'isolate',
      }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute left-0 right-0 w-full"
        style={{
          y: bgY,
          top: '-10%',
          bottom: '-10%',
          willChange: 'transform',
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
          style={{ filter: 'grayscale(20%) contrast(1.05)' }}
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.50) 100%)' }}
      />

      {/* Text content — white on dark overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 md:p-14 lg:p-20">
        {/* Label */}
        {label && (
          <span
            className="text-[12px] font-bold uppercase tracking-[0.08em] mb-4"
            style={{ fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.65)' }}
          >
            {label}
          </span>
        )}

        {/* Headline */}
        <h2
          className="mb-3"
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 5vw, 72px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#ffffff',
          }}
        >
          {headline}
          {headlineAccent && (
            <>
              {' '}
              <span style={{ fontStyle: 'italic' }}>{headlineAccent}</span>
            </>
          )}
        </h2>

        {/* Subline */}
        {subline && (
          <p
            className="max-w-[550px] mb-4"
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(13px, 1.3vw, 17px)',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.70)',
            }}
          >
            {subline}
          </p>
        )}

        {/* Pills */}
        {pills && pills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pills.map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--mono)',
                  color: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.30)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
