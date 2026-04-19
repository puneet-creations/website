import { useEffect, useState, Children, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [_isTransitioning, setIsTransitioning] = useState(false);
  void _isTransitioning; // suppress unused warning
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | undefined;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (contentSize > 0) {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: contentSize / currentSpeed,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return () => controls?.stop();
  }, [key, translation, currentSpeed, width, height, gap, direction, reverse]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
          setKey((prev) => prev + 1);
        },
        onHoverEnd: () => {
          setIsTransitioning(false);
          setCurrentSpeed(speed);
          setKey((prev) => prev + 1);
        },
      }
    : {};

  const childArr = Children.toArray(children);

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      {...hoverProps}
    >
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation, gap: `${gap}px` }
            : { y: translation, flexDirection: 'column', gap: `${gap}px` }),
        }}
        ref={ref}
      >
        {childArr.map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
        {childArr.map((child, i) => (
          <div key={`dup-${i}`} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
