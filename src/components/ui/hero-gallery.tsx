import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * HeroGallery — animated card gallery for the hero section.
 * Cards fan out from a stacked center position with spring physics.
 * Each card is draggable with hover lift + rotation.
 * Adapted from shadcn PhotoGallery for React/Vite (no Next.js).
 */

type CardData = {
  id: number;
  label: string;
  sublabel: string;
  details?: string;
  metric?: string;
  accent: string;
  image?: string;
  icon?: React.ComponentType<{ accent: string }>;
  order: number;
  x: string;
  y: string;
  zIndex: number;
  direction: 'left' | 'right';
};

type Props = {
  cards: CardData[];
  animationDelay?: number;
  dropIn?: boolean;
  large?: boolean;
};

export function HeroGallery({ cards, animationDelay = 0.6, dropIn = false, large = false }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropIn) {
      // For drop-in: trigger only when container scrolls into view
      const el = containerRef.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setIsLoaded(true), 200);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    } else {
      // For fan-out: use timer-based delay
      const t1 = setTimeout(() => setIsVisible(true), animationDelay * 1000);
      const t2 = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [animationDelay, dropIn]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardVariants: any = dropIn
    ? {
        // Drop-in: cards fall from above, one by one, landing at final position
        hidden: (custom: { x: string; order: number }) => ({
          x: custom.x,
          y: -600,
          rotate: (custom.order % 2 === 0 ? -1 : 1) * (8 + custom.order * 3),
          scale: 0.85,
          opacity: 0,
        }),
        visible: (custom: { x: string; y: string; order: number }) => ({
          x: custom.x,
          y: custom.y,
          rotate: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 55,
            damping: 14,
            mass: 1.2,
            delay: custom.order * 0.18,
            opacity: { duration: 0.3, delay: custom.order * 0.18 },
          },
        }),
      }
    : {
        // Fan-out: cards spread from center stack
        hidden: { x: 0, y: 0, rotate: 0, scale: 0.95 },
        visible: (custom: { x: string; y: string; order: number }) => ({
          x: custom.x,
          y: custom.y,
          rotate: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 70, damping: 12, mass: 1, delay: custom.order * 0.12 },
        }),
      };

  return (
    <div ref={containerRef} className="relative w-full flex items-center justify-center" style={{ height: large ? 'clamp(420px, 38vw, 560px)' : 'clamp(420px, 36vw, 520px)' }}>
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          <div className="relative" style={{ height: large ? 'clamp(380px, 34vw, 500px)' : 'clamp(380px, 32vw, 460px)', width: large ? 'clamp(340px, 28vw, 440px)' : 'clamp(340px, 26vw, 400px)' }}>
            {[...cards].reverse().map((card) => (
              <motion.div
                key={card.id}
                className="absolute left-0 top-0"
                style={{ zIndex: card.zIndex }}
                variants={cardVariants}
                custom={{ x: card.x, y: card.y, order: card.order }}
              >
                <GalleryCard card={card} large={large} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function GalleryCard({ card, large = false }: { card: CardData; large?: boolean }) {
  // Random tilt seeded once at mount via the useState initializer so the
  // value is stable across renders without syncing state from an effect.
  const [rotation] = useState<number>(
    () => (1 + Math.random() * 3) * (card.direction === 'left' ? -1 : 1),
  );
  const x = useMotionValue(100);
  const y = useMotionValue(100);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 9999 }}
      whileHover={{ scale: 1.08, rotateZ: 1.5 * (card.direction === 'left' ? -1 : 1), zIndex: 9999 }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{ width: large ? 'clamp(340px, 28vw, 440px)' : 'clamp(340px, 26vw, 400px)', height: large ? 'clamp(380px, 34vw, 500px)' : 'clamp(380px, 32vw, 460px)', perspective: 400, touchAction: 'none', userSelect: 'none' }}
      className="relative shrink-0 cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(100); y.set(100); }}
      draggable={false}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-3xl"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        {large ? (
          /* ── LARGE: Full-bleed image + glassmorphism ── */
          <>
            {card.image && (
              <img src={card.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} />
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.95) 100%)' }} />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div>
                <div className="font-semibold leading-tight mb-2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 2.4vw, 32px)', color: '#000000' }}>{card.label}</div>
                <div className="mb-2" style={{ fontFamily: 'var(--mono)', color: 'rgba(0,0,0,0.65)', letterSpacing: '0.04em', fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 600 }}>{card.sublabel}</div>
                {card.details && <div className="leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)', fontSize: 'clamp(15px, 1.3vw, 18px)' }}>{card.details}</div>}
              </div>
            </div>
          </>
        ) : (
          /* ── SMALL: Icon + text (agent cards — white theme) ── */
          <>
            <div className="relative w-full overflow-hidden flex items-center justify-center" style={{ height: '48%', background: `linear-gradient(135deg, ${card.accent}10 0%, ${card.accent}06 100%)` }}>
              {card.icon && <div style={{ width: '70%', height: '75%' }}><card.icon accent={card.accent} /></div>}
            </div>
            <div className="px-6 pb-5 pt-4 flex flex-col" style={{ height: '52%' }}>
              <div className="font-semibold leading-tight mb-1.5" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.8vw, 24px)', color: '#000000' }}>{card.label}</div>
              <div className="mb-1.5" style={{ fontFamily: 'var(--mono)', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.04em', fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 600 }}>{card.sublabel}</div>
              {card.details && <div className="leading-snug" style={{ color: 'rgba(0,0,0,0.50)', fontSize: 'clamp(13px, 1.1vw, 15px)' }}>{card.details}</div>}
            </div>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)' }} />
      </div>
    </motion.div>
  );
}
