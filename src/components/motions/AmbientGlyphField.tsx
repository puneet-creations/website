import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * AmbientGlyphField — generative cinematic background.
 *
 * A Canvas-rendered field of Fraunces glyphs (letters, digits, punctuation)
 * that drift slowly upward at varying speeds, with subtle ink-bleed alpha.
 *
 * Design choices, all deliberate:
 *  - Glyphs, not particles: ties the motion to the brand's typographic
 *    identity ("language" = the medium the agents work in).
 *  - Very low opacity (≤ 0.10) so it never fights the Fraunces headline.
 *  - Slow vertical drift (≤ 30 px/s) — atmosphere, not animation.
 *  - Skipped under prefers-reduced-motion AND on viewports < 768 px
 *    (battery + perf budget on mobile).
 *  - Pauses via IntersectionObserver when the hero scrolls off-screen.
 *  - Re-renders on resize (devicePixelRatio-aware) so it stays crisp on
 *    retina without bloating CPU.
 *
 * Not a video. Not a stock loop. Unique to Attentions AI by construction.
 */

const GLYPHS = [
  'A', 'a', 'g', 'n', 't', 'i', 'c', 'I', '·', '—',
  '0', '1', '2', '4', '8', 'k', 'M', '%', '·', '↗',
  'Q', 'R', 's', 'e', 'm', 'i', 'o', 't', 'i', 'c',
  '§', '¶', '†', '"', "'", '/', ':', '·', '·', '·',
];

type Glyph = {
  ch: string;
  x: number;
  y: number;
  vy: number;
  size: number;
  alpha: number;
  rot: number;
};

export default function AmbientGlyphField({
  density = 0.6,
  className = 'absolute inset-0 w-full h-full pointer-events-none',
  tint = 'rgba(10, 10, 10, 1)',
}: {
  density?: number; // 0..1 — multiplier for glyph count
  className?: string;
  tint?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let glyphs: Glyph[] = [];
    let raf = 0;
    let running = true;

    const seed = (w: number, h: number) => {
      const target = Math.round((w * h) / 26000 * density);
      glyphs = Array.from({ length: target }).map(() => spawn(w, h, true));
    };

    const spawn = (w: number, h: number, anywhere: boolean): Glyph => ({
      ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + Math.random() * 80,
      vy: -(8 + Math.random() * 18) / 60, // px / frame ≈ 8–26 px/s
      size: 16 + Math.random() * 32,
      alpha: 0.04 + Math.random() * 0.10, // 0.04–0.14 — visible-but-atmospheric
      rot: (Math.random() - 0.5) * 0.06,
    });

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '500 24px "Fraunces", "EB Garamond", Georgia, serif';
      seed(width, height);
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        g.y += g.vy;

        // Respawn at bottom once drifted off-screen
        if (g.y < -40) {
          glyphs[i] = spawn(width, height, false);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = g.alpha;
        ctx.fillStyle = tint;
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rot);
        ctx.font = `500 ${g.size}px "Fraunces", "EB Garamond", Georgia, serif`;
        ctx.fillText(g.ch, 0, 0);
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause when off-screen — saves CPU on long-scroll pages
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(tick);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, tint, reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
