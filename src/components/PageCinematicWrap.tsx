import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * PageCinematicWrap — wraps page content sections (below PageHero) with
 * the cinematic footer's visual theme: aurora glow, grid pattern, giant bg text
 * with GSAP scroll-triggered zoom effect.
 */

type Props = {
  children: React.ReactNode;
  auroraColor?: string;
  auroraSecondary?: string;
  grid?: boolean;
  giantText?: string;
  className?: string;
};

export default function PageCinematicWrap({
  children,
  auroraColor = '#8af5c0',
  auroraSecondary = '#5b76fe',
  grid = true,
  giantText: _giantText,
  className = '',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP scroll-triggered zoom effect on giant text
  useEffect(() => {
    if (!wrapRef.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { scale: 0.6, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 90%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={{ background: '#ffffff', overflowX: 'clip' }}>
      {/* Aurora glow */}
      <div
        className="absolute left-1/2 top-[30%] h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 cf-aurora rounded-[50%] blur-[80px] pointer-events-none z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${auroraColor}30 0%, ${auroraSecondary}20 40%, transparent 70%)` }}
      />
      <div
        className="absolute left-[30%] top-[70%] h-[50vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 cf-aurora rounded-[50%] blur-[100px] pointer-events-none z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${auroraSecondary}1a 0%, transparent 60%)`, animationDelay: '4s' }}
      />

      {/* Grid pattern */}
      {grid && <div className="cf-grid absolute inset-0 z-[1] pointer-events-none" />}

      {/* Giant text — positioned ABOVE content as a visible header element with zoom effect */}
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
