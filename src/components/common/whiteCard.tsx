import type { CSSProperties } from 'react';

/**
 * whiteCardStyle — returns inline-style object for the v2 white-card shell.
 * White bg + thin grey border + soft shadow + rounded corners + overflow-hidden.
 *
 * Consumers compose with their own motion wrapper and children:
 *
 *   <motion.article style={{ ...whiteCardStyle({ shadow: 'md' }), minHeight: 520 }}>
 *     <AccentStrip color="#000" />
 *     ...content...
 *   </motion.article>
 *
 * Does NOT include minHeight, padding, or custom classes — merge those into
 * the consumer's own style/className.
 */

type ShadowVariant = 'sm' | 'md';

type Options = {
  shadow?: ShadowVariant;  // default 'sm'
  radius?: number;          // default 24
};

const SHADOW_MAP: Record<ShadowVariant, string> = {
  sm: '0 4px 16px rgba(0,0,0,0.04)',
  md: '0 4px 24px rgba(0,0,0,0.05)',
};

export function whiteCardStyle({ shadow = 'sm', radius = 24 }: Options = {}): CSSProperties {
  return {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: SHADOW_MAP[shadow],
    borderRadius: radius,
    overflow: 'hidden',
  };
}

/**
 * AccentStrip — thin colored bar at the top of a WhiteCard. Purely
 * decorative; aria-hidden.
 */
export function AccentStrip({
  color,
  thickness = 1,
}: {
  color: string;
  thickness?: number;
}) {
  return <div aria-hidden="true" style={{ height: thickness, background: color }} />;
}
