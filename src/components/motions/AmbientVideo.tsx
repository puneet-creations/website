import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * AmbientVideo — autoplay-muted-loop video wrapper for cinematic
 * section backgrounds.
 *
 * What this is for: real editorial footage layered behind text. Not
 * stock-business-meeting cliché — clips here are curated close-ups
 * (paper, ink, hands writing) that fit the deck's "calm brochure"
 * brand without fighting the Fraunces type.
 *
 * Behaviour:
 *  - autoplays muted (browser policy requires muted for autoplay)
 *  - loops
 *  - pauses via IntersectionObserver when off-screen (saves CPU + battery)
 *  - skips entirely under prefers-reduced-motion (poster frame only)
 *  - swallows play() rejections silently (some browsers reject autoplay
 *    even when muted; we fall back to the still poster frame)
 *  - parchment-tinted overlay + opacity prop = visible-but-atmospheric;
 *    use 0.18–0.30 for hero, 0.10–0.15 for behind dense text
 *
 * Wrap inside a `relative` parent and pair with z-indexed content.
 */

export type AmbientVideoProps = {
  /** Path to MP4 (place in public/video/). */
  src: string;
  /** Path to a poster image (poster.webp/jpg in public/video/). Optional. */
  poster?: string;
  /** Opacity overlay 0..1 — how strongly the video reads through. */
  opacity?: number;
  /** CSS object-position — e.g. 'center 30%' to lift focus higher. */
  objectPosition?: string;
  /** Optional parchment tint colour (defaults to deck-canon ink wash). */
  tint?: string;
  /** Tint opacity 0..1 (defaults to 0.3 to keep video subtle behind text). */
  tintOpacity?: number;
  /** Extra className on the wrapper. */
  className?: string;
};

export default function AmbientVideo({
  src,
  poster,
  opacity = 0.22,
  objectPosition = 'center center',
  tint = '#0A0A0A',
  tintOpacity = 0.35,
  className = 'absolute inset-0 overflow-hidden pointer-events-none',
}: AmbientVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => { /* autoplay rejected — poster shows */ });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!reduced}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          opacity,
          // Subtle desaturation so the video reads as atmosphere, not as
          // a coloured photograph competing with the brand palette.
          filter: 'grayscale(0.45) contrast(1.05) brightness(0.95)',
        }}
      />
      {/* Parchment / ink wash — keeps the video legible behind type
          and locks the brand palette. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: tint,
          opacity: tintOpacity,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
