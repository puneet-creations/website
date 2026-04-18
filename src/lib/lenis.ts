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
