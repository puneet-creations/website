import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const HeroOrb = lazy(() => import('./HeroOrb'));

/**
 * PageHero — cinematic hero section with 3D orb, aurora glows, dust,
 * grid overlay, and scroll parallax. Used on every route. Configurable
 * accent color per page for subtle variation.
 */
type Props = {
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  accent?: string;
  pills?: string[];
  // Effect customisation
  orbColor?: string;
  dustCount?: number;
  withOrb?: boolean;
};

export default function PageHero({
  label, title, titleAccent, description, accent = '#8af5c0', pills,
  orbColor = '#f5e8c0', dustCount = 14, withOrb = true,
}: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const [viewRef, inView] = useInView<HTMLDivElement>(0.1);

  // Scroll parallax — orb + content fade/scale as you scroll past
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.85, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ background: '#ffffff', minHeight: '80vh' }}
    >
      {/* Grid overlay */}
      <div className="cf-grid absolute inset-0 pointer-events-none" />

      {/* Aurora breathing glows — 3 radial gradients using accent color */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[50vw] h-[50vh] rounded-full cf-aurora"
          style={{
            background: `radial-gradient(ellipse, ${accent}14 0%, ${accent}0F 40%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute left-[8%] bottom-[10%] w-[40vw] h-[40vh] rounded-full cf-aurora"
          style={{
            background: `radial-gradient(ellipse, ${accent}10 0%, transparent 60%)`,
            filter: 'blur(60px)',
            animationDuration: '14s',
            animationDirection: 'alternate-reverse',
          }}
        />
        <div
          className="absolute right-[5%] top-[55%] w-[30vw] h-[45vh] rounded-full cf-aurora"
          style={{
            background: `radial-gradient(ellipse, ${accent}0D 0%, transparent 60%)`,
            filter: 'blur(50px)',
            animationDuration: '12s',
          }}
        />
      </div>

      {/* Dust particles */}
      <Dust count={dustCount} />

      {/* 3D glass orb — lazy loaded */}
      {withOrb && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            right: '-8%',
            top: '2%',
            width: '60%',
            height: '85%',
            scale: orbScale,
            opacity: orbOpacity,
          }}
        >
          <Suspense fallback={null}>
            <HeroOrb attenuationColor={orbColor} />
          </Suspense>
        </motion.div>
      )}

      {/* Content — bottom-left placement (matches ParallaxHero) */}
      <motion.div
        ref={viewRef}
        className="relative z-10 flex flex-col justify-end"
        style={{
          minHeight: '80vh',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px)',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="max-w-[860px]">
          {/* Label pill */}
          <div className={`mb-5 sr ${inView ? 'is-in' : ''}`}>
            <span className="capsule-dark inline-flex items-center gap-2 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
              <span>{label}</span>
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`leading-[0.96] sr d-1 ${inView ? 'is-in' : ''}`}
            style={{
              fontFamily: "'Fraunces', 'Newsreader', Georgia, serif",
              fontWeight: 500,
              fontSize: 'clamp(40px, 6vw, 80px)',
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            {title}{' '}
            <span style={{ fontStyle: 'italic', color: accent }}>{titleAccent}</span>
          </h1>

          {/* Description */}
          <p
            className={`mt-5 max-w-[640px] sr d-2 ${inView ? 'is-in' : ''}`}
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(16px, 1.4vw, 20px)',
              fontStyle: 'italic',
              color: 'rgba(0,0,0,0.65)',
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>

          {/* Pills */}
          {pills && pills.length > 0 && (
            <div className={`mt-6 flex flex-wrap gap-2 sr d-3 ${inView ? 'is-in' : ''}`}>
              {pills.map((p) => (
                <span key={p} className="capsule-light rounded-full">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ── Dust particles — matches HeroAboveFold pattern ── */
function Dust({ count = 14 }: { count?: number }) {
  const p = Array.from({ length: count }).map((_, i) => ({
    left: `${(i * 53) % 100}%`,
    top: `${(i * 37) % 100}%`,
    size: 1.5 + (i % 3),
    dx: ((i * 13) % 60) - 30,
    dy: -40 - ((i * 17) % 80),
    dur: 16 + (i % 10),
    delay: (i * 1.1) % 16,
    opacity: 0.25 + ((i * 11) % 30) / 100,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {p.map((d, i) => (
        <span
          key={i}
          className="dust"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            '--dx': `${d.dx}px`,
            '--dy': `${d.dy}px`,
            '--dur': `${d.dur}s`,
            '--delay': `${d.delay}s`,
            '--o': d.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
