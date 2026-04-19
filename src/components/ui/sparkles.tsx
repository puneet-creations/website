import { useEffect, useId, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

type SparklesProps = {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  direction?:
    | 'none'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left'
    | 'outside'
    | 'inside';
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  mousemove?: boolean;
  hover?: boolean;
  background?: string;
  options?: ISourceOptions;
};

export function Sparkles({
  className,
  size = 1.2,
  minSize = null,
  density = 800,
  speed = 1.5,
  minSpeed = null,
  opacity = 1,
  direction = 'none',
  opacitySpeed = 3,
  minOpacity = null,
  color = '#ffffff',
  mousemove = false,
  hover = false,
  background = 'transparent',
  options = {},
}: SparklesProps) {
  const [isReady, setIsReady] = useState(false);
  const id = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const defaultOptions: ISourceOptions = {
    key: id,
    background: {
      color: { value: background },
    },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 300,
    particles: {
      color: { value: color },
      direction,
      move: {
        enable: true,
        outModes: { default: 'out' },
        random: true,
        speed: { min: minSpeed || speed / 10, max: speed },
        straight: false,
      },
      collisions: {
        absorb: { speed: 2 },
        bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
        enable: false,
        maxSpeed: 50,
        mode: 'bounce' as const,
        overlap: { enable: true, retries: 0 },
      },
      number: {
        value: density,
      },
      opacity: {
        value: { min: minOpacity || opacity / 10, max: opacity },
        animation: {
          enable: true,
          speed: opacitySpeed,
          sync: false,
          startValue: 'random' as const,
        },
      },
      size: {
        value: { min: minSize || size / 2.5, max: size },
      },
    },
    interactivity: {
      events: {
        onClick: { enable: true, mode: 'push' as const },
        onHover: {
          enable: hover,
          mode: 'grab' as const,
          parallax: { enable: mousemove, force: 60, smooth: 10 },
        },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    detectRetina: true,
  };

  return isReady ? (
    <Particles
      id={id}
      options={{ ...defaultOptions, ...options }}
      className={className}
    />
  ) : null;
}
