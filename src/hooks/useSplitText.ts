import { useEffect, useRef } from 'react';
import SplitType from 'split-type';

/**
 * useSplitText — wraps the split-type library with proper useEffect cleanup.
 * Returns a ref to attach to any text element. On mount, the element's
 * textContent is re-rendered into per-word + per-char spans (classnames
 * `.word` and `.char`), with an aria-label on the parent preserving the
 * original string for screen readers.
 *
 * On unmount (or when `deps` change), the split is reverted so the element
 * returns to its unsplit state before teardown — prevents leaked spans.
 */
export function useSplitText<T extends HTMLElement>(
  deps: React.DependencyList = []
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // split-type 0.3.4 does not set aria-label itself; capture the original
    // text and pin it here so screen readers hear the unbroken sentence
    // instead of per-char prosody on the split spans.
    const originalText = el.textContent?.trim() ?? '';
    if (originalText && !el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', originalText);
    }
    const instance = new SplitType(el, { types: 'words,chars' });
    return () => {
      instance.revert();
      if (originalText && el.getAttribute('aria-label') === originalText) {
        el.removeAttribute('aria-label');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
