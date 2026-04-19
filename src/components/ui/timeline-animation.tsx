/* eslint-disable react-hooks/static-components */
// This component wraps framer-motion's motion.create(Tag) to expose a polymorphic
// "as" prop. Tag is caller-provided, so the motion component can't be hoisted
// to module scope; a useMemo stabilizes it per Tag value. Fires on both the
// memo-create and the JSX-use line, so the disable is file-level.
import { useMemo, type ReactNode, type ElementType } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
};

export function TimelineContent({
  children,
  as: Tag = 'div',
  className,
  animationNum,
  timelineRef,
  customVariants,
}: Props) {
  const isInView = useInView(timelineRef, { once: true, margin: '-100px' });
  // motion.create(Tag) must be memoized — calling it per render creates a
  // fresh component type each time, which resets internal motion state.
  // Memoizing per Tag keeps the rendered component identity stable across
  // renders (see file-level rule-disable comment for rationale).
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={customVariants}
    >
      {children}
    </MotionTag>
  );
}
