import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Standard easeOutExpo — Robert Penner's exponential ease-out.
 * The 1.001 offset is the Penner convention to guarantee hitting 1.0 at t=1
 * without clamping artifacts below; Math.min caps the negligible overshoot.
 */
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Site-wide smooth-scroll singleton.
 * Driven by gsap.ticker so ScrollTrigger updates stay in sync with Lenis.
 * Native touch scroll is preserved (syncTouch defaults to false in v1.1+) —
 * iOS rubber-banding is easier to leave alone than to replicate in JS.
 */
export const lenis = new Lenis({
  duration: 1.2,
  easing: easeOutExpo,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/**
 * Smooth-scroll to an element by selector / id-string / Element ref.
 *
 * Native `element.scrollIntoView({ behavior: 'smooth' })` is a no-op while
 * Lenis is driving the page (Lenis hijacks the document scroll). Use this
 * helper from any click handler or React effect that needs to bring a
 * section into view.
 *
 * Defaults match the Lenis singleton's easing so on-page jumps feel
 * consistent with mouse-wheel scrolling.
 */
export function scrollToTarget(
  target: string | HTMLElement | null | undefined,
  options?: { offset?: number; duration?: number },
) {
  if (!target) return;
  const el =
    typeof target === 'string'
      ? document.querySelector<HTMLElement>(
          target.startsWith('#') || target.startsWith('.') ? target : `#${target}`,
        )
      : target;
  if (!el) return;
  lenis.scrollTo(el, {
    offset: options?.offset ?? -16,
    duration: options?.duration ?? 1.2,
  });
}
