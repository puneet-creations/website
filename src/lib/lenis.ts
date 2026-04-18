import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide smooth-scroll singleton.
 * Driven by gsap.ticker so ScrollTrigger updates stay in sync with Lenis.
 * Native touch scroll is preserved (syncTouch defaults to false in v1.1+) —
 * iOS rubber-banding is easier to leave alone than to replicate in JS.
 */
export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
