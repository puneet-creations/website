import { useEffect, useRef, useState } from 'react';

/**
 * Drop-in hook that returns [ref, inView].
 * When the referenced element first intersects the viewport (by `threshold`),
 * inView flips to true and stays true. One-shot reveal.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0,
  rootMargin = '0px 0px 200px 0px'
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  // Initialize to `true` in environments without IntersectionObserver (SSR,
  // very old browsers) so the "one-shot reveal" shows content rather than
  // leaving it hidden. Computing at state-init avoids a setState-in-effect.
  const [inView, setInView] = useState<boolean>(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
