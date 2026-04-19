import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GradientCard — premium 3D card with mouse-tracking tilt, glass reflection,
 * bottom edge glow, and noise texture. Only the outer wrapper uses framer-motion
 * for 3D tilt; all inner decorative layers use pure CSS transitions for performance.
 */

type Props = {
  children: React.ReactNode;
  accent?: string;
  accentSecondary?: string;
  className?: string;
  radius?: number;
  tilt?: boolean;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: string;
  'aria-expanded'?: boolean;
  'aria-label'?: string;
  [key: `data-${string}`]: string | number | undefined;
};

export function GradientCard({
  children,
  accent = '#8af5c0',
  accentSecondary: _accentSecondary = '#5b76fe',
  className = '',
  radius = 28,
  tilt = true,
  style: externalStyle,
  ...rest
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRotation({
      x: -((e.clientY - rect.top - rect.height / 2) / rect.height) * 4,
      y: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 4,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`gc-root relative overflow-hidden ${className}`}
      {...rest}
      style={{ borderRadius: radius, transformStyle: 'preserve-3d', backgroundColor: '#000000', ...externalStyle }}
      animate={{
        y: isHovered ? -4 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        boxShadow: isHovered
          ? `0 -8px 60px 8px rgba(255,255,255,0.10), 0 20px 60px -10px rgba(0,0,0,0.5)`
          : `0 -4px 40px 4px ${accent}18, 0 12px 40px -8px rgba(0,0,0,0.4)`,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      {/* Glass reflection — CSS transition only */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          borderRadius: radius,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 40%, transparent 80%, rgba(255,255,255,0.04) 100%)',
          zIndex: 35,
          opacity: isHovered ? 0.8 : 0.5,
        }}
      />

      {/* Black bg */}
      <div className="absolute inset-0" style={{ borderRadius: radius, background: '#000000', zIndex: 0 }} />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          borderRadius: radius,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          zIndex: 10,
        }}
      />

      {/* Dual-tone bottom glow — CSS transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(ellipse at bottom right, rgba(255,255,255,0.25) -10%, transparent 65%), radial-gradient(ellipse at bottom left, rgba(255,255,255,0.20) -10%, transparent 65%)`,
          filter: 'blur(40px)',
          zIndex: 20,
          opacity: isHovered ? 0.7 : 0.5,
        }}
      />

      {/* Center glow — CSS transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle at bottom center, rgba(255,255,255,0.20) -20%, transparent 55%)`,
          filter: 'blur(45px)',
          zIndex: 21,
          opacity: isHovered ? 0.6 : 0.4,
        }}
      />

      {/* Bottom edge glow line — CSS transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none transition-all duration-400"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 100%)',
          zIndex: 25,
          boxShadow: isHovered
            ? `0 0 16px 3px rgba(255,255,255,0.40), 0 0 28px 5px rgba(255,255,255,0.25), 0 0 40px 8px rgba(255,255,255,0.15)`
            : `0 0 10px 2px rgba(255,255,255,0.30), 0 0 20px 4px rgba(255,255,255,0.18), 0 0 30px 6px rgba(255,255,255,0.10)`,
          opacity: isHovered ? 1 : 0.85,
        }}
      />

      {/* Left + right edge glow — CSS transition */}
      {['left', 'right'].map((side) => (
        <div
          key={side}
          className="absolute bottom-0 h-1/4 w-[1px] pointer-events-none rounded-full transition-all duration-400"
          style={{
            [side]: 0,
            background: 'linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)',
            zIndex: 25,
            boxShadow: isHovered
              ? `0 0 12px 3px rgba(255,255,255,0.35), 0 0 24px 5px rgba(255,255,255,0.20)`
              : `0 0 8px 2px rgba(255,255,255,0.25), 0 0 16px 4px rgba(255,255,255,0.12)`,
          }}
        />
      ))}

      {/* Top border highlight */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.10) 70%, transparent 100%)',
          zIndex: 25,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 40 }}>{children}</div>
    </motion.div>
  );
}
