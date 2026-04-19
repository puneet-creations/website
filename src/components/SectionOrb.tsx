/**
 * SectionOrb — Pure CSS gradient orb extracted from artigen_v5.html.
 * Each variant has a unique multi-layered radial gradient + inner pattern + glow halo.
 * Used alongside the horizontal scroll cards — orb appears with associated text
 * as the card scrolls into view.
 */

export type OrbVariant = 'sovereign' | 'invoice' | 'pcr' | 'voice' | 'patient' | 'voucher' | 'pain' | 'proof' | 'platform' | 'agents' | 'engage';

type Props = {
  variant: OrbVariant;
  size?: number;      // orb diameter in px (default 120)
  label?: string;     // text label that appears near the orb
  className?: string;
};

const ORB_STYLES: Record<OrbVariant, { glow: string; bg: string; pattern: string }> = {
  sovereign: {
    glow: 'radial-gradient(circle,rgba(37,99,235,0.18) 0%,rgba(147,197,253,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 38% 35%,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 62% 58%,rgba(147,197,253,0.65) 0%,rgba(37,99,235,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(219,234,254,0.75) 0%,rgba(147,197,253,0.4) 45%,rgba(59,130,246,0.15) 70%,transparent 100%)`,
    pattern: `repeating-linear-gradient(0deg,rgba(37,99,235,0.06) 0px,rgba(37,99,235,0.06) 1px,transparent 1px,transparent 16px),
              repeating-linear-gradient(60deg,rgba(37,99,235,0.06) 0px,rgba(37,99,235,0.06) 1px,transparent 1px,transparent 16px),
              repeating-linear-gradient(120deg,rgba(37,99,235,0.06) 0px,rgba(37,99,235,0.06) 1px,transparent 1px,transparent 16px)`,
  },
  invoice: {
    glow: 'radial-gradient(circle,rgba(217,119,6,0.18) 0%,rgba(251,191,36,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 36% 33%,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 64% 60%,rgba(251,191,36,0.65) 0%,rgba(217,119,6,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(254,243,199,0.80) 0%,rgba(251,191,36,0.4) 45%,rgba(217,119,6,0.15) 70%,transparent 100%)`,
    pattern: 'repeating-linear-gradient(180deg,transparent 0px,transparent 8px,rgba(183,101,26,0.10) 8px,rgba(183,101,26,0.10) 9px)',
  },
  pcr: {
    glow: 'radial-gradient(circle,rgba(124,58,237,0.18) 0%,rgba(167,139,250,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 35% 34%,rgba(255,255,255,0.68) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 64% 60%,rgba(167,139,250,0.65) 0%,rgba(124,58,237,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(237,233,254,0.80) 0%,rgba(167,139,250,0.4) 45%,rgba(124,58,237,0.15) 70%,transparent 100%)`,
    pattern: `radial-gradient(circle 2px at 38% 42%,rgba(124,58,237,0.5) 0%,transparent 100%),
              radial-gradient(circle 1.5px at 60% 35%,rgba(124,58,237,0.45) 0%,transparent 100%),
              radial-gradient(circle 2px at 55% 62%,rgba(124,58,237,0.4) 0%,transparent 100%),
              radial-gradient(circle 1.5px at 35% 60%,rgba(124,58,237,0.4) 0%,transparent 100%)`,
  },
  voice: {
    glow: 'radial-gradient(circle,rgba(6,182,212,0.18) 0%,rgba(103,232,249,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 36% 33%,rgba(255,255,255,0.70) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 64% 60%,rgba(103,232,249,0.65) 0%,rgba(6,182,212,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(236,254,255,0.82) 0%,rgba(103,232,249,0.4) 45%,rgba(6,182,212,0.15) 70%,transparent 100%)`,
    pattern: `radial-gradient(circle 8px at 50% 50%,transparent 5px,rgba(6,182,212,0.22) 5px,rgba(6,182,212,0.22) 7px,transparent 7px),
              radial-gradient(circle 16px at 50% 50%,transparent 12px,rgba(6,182,212,0.14) 12px,rgba(6,182,212,0.14) 14px,transparent 14px)`,
  },
  // Pain variants — red-shifted
  pain: {
    glow: 'radial-gradient(circle,rgba(192,57,43,0.18) 0%,rgba(255,120,100,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 38% 35%,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 60% 58%,rgba(255,120,100,0.6) 0%,rgba(192,57,43,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(255,200,190,0.75) 0%,rgba(255,120,100,0.35) 45%,rgba(192,57,43,0.12) 70%,transparent 100%)`,
    pattern: 'repeating-linear-gradient(45deg,rgba(192,57,43,0.04) 0px,rgba(192,57,43,0.04) 1px,transparent 1px,transparent 12px)',
  },
  // Proof — green-shifted
  proof: {
    glow: 'radial-gradient(circle,rgba(0,180,115,0.18) 0%,rgba(138,245,192,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 36% 33%,rgba(255,255,255,0.72) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 62% 60%,rgba(138,245,192,0.65) 0%,rgba(0,180,115,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(200,250,220,0.80) 0%,rgba(138,245,192,0.4) 45%,rgba(0,180,115,0.12) 70%,transparent 100%)`,
    pattern: `radial-gradient(circle 2px at 40% 45%,rgba(0,180,115,0.4) 0%,transparent 100%),
              radial-gradient(circle 2px at 60% 35%,rgba(0,180,115,0.35) 0%,transparent 100%),
              radial-gradient(circle 2px at 50% 65%,rgba(0,180,115,0.3) 0%,transparent 100%)`,
  },
  // Platform — blue
  platform: {
    glow: 'radial-gradient(circle,rgba(91,118,254,0.18) 0%,rgba(180,195,255,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 38% 35%,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 62% 58%,rgba(180,195,255,0.65) 0%,rgba(91,118,254,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(220,230,255,0.75) 0%,rgba(180,195,255,0.4) 45%,rgba(91,118,254,0.15) 70%,transparent 100%)`,
    pattern: `repeating-linear-gradient(0deg,rgba(91,118,254,0.05) 0px,rgba(91,118,254,0.05) 1px,transparent 1px,transparent 14px),
              repeating-linear-gradient(60deg,rgba(91,118,254,0.05) 0px,rgba(91,118,254,0.05) 1px,transparent 1px,transparent 14px),
              repeating-linear-gradient(120deg,rgba(91,118,254,0.05) 0px,rgba(91,118,254,0.05) 1px,transparent 1px,transparent 14px)`,
  },
  // Agents — teal (same as voice)
  agents: {
    glow: 'radial-gradient(circle,rgba(6,182,212,0.18) 0%,rgba(103,232,249,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 36% 33%,rgba(255,255,255,0.70) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 64% 60%,rgba(103,232,249,0.65) 0%,rgba(6,182,212,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(236,254,255,0.82) 0%,rgba(103,232,249,0.4) 45%,rgba(6,182,212,0.15) 70%,transparent 100%)`,
    pattern: `radial-gradient(circle 8px at 50% 50%,transparent 5px,rgba(6,182,212,0.18) 5px,rgba(6,182,212,0.18) 7px,transparent 7px)`,
  },
  // Engage — amber (same as invoice)
  engage: {
    glow: 'radial-gradient(circle,rgba(195,132,0,0.18) 0%,rgba(255,200,80,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 36% 33%,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 64% 60%,rgba(255,200,80,0.65) 0%,rgba(195,132,0,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(255,240,200,0.80) 0%,rgba(255,200,80,0.4) 45%,rgba(195,132,0,0.12) 70%,transparent 100%)`,
    pattern: 'repeating-linear-gradient(180deg,transparent 0px,transparent 8px,rgba(195,132,0,0.08) 8px,rgba(195,132,0,0.08) 9px)',
  },
  patient: {
    glow: 'radial-gradient(circle,rgba(217,119,6,0.18) 0%,rgba(251,191,36,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 36% 33%,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 64% 60%,rgba(251,191,36,0.65) 0%,rgba(217,119,6,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(254,243,199,0.80) 0%,rgba(251,191,36,0.4) 45%,rgba(217,119,6,0.15) 70%,transparent 100%)`,
    pattern: 'repeating-linear-gradient(180deg,transparent 0px,transparent 8px,rgba(183,101,26,0.10) 8px,rgba(183,101,26,0.10) 9px)',
  },
  voucher: {
    glow: 'radial-gradient(circle,rgba(47,93,20,0.18) 0%,rgba(138,200,100,0.10) 40%,transparent 70%)',
    bg: `radial-gradient(circle at 38% 35%,rgba(255,255,255,0.72) 0%,rgba(255,255,255,0) 38%),
         radial-gradient(circle at 62% 60%,rgba(138,200,100,0.65) 0%,rgba(47,93,20,0.3) 38%,transparent 65%),
         radial-gradient(circle at 50% 50%,rgba(215,234,199,0.80) 0%,rgba(138,200,100,0.4) 45%,rgba(47,93,20,0.12) 70%,transparent 100%)`,
    pattern: `radial-gradient(circle 2px at 40% 40%,rgba(47,93,20,0.35) 0%,transparent 100%),
              radial-gradient(circle 2px at 60% 60%,rgba(47,93,20,0.3) 0%,transparent 100%)`,
  },
};

export default function SectionOrb({ variant, size = 120, label, className = '' }: Props) {
  const s = ORB_STYLES[variant];
  const glowSize = size * 2.2;

  return (
    <div className={`flex flex-col items-center gap-3 pointer-events-none ${className}`}>
      {/* Orb + glow */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow halo */}
        <div
          className="absolute"
          style={{
            width: glowSize,
            height: glowSize,
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: s.glow,
            filter: 'blur(32px)',
            animation: 'glowPulse 5s ease-in-out infinite alternate',
          }}
        />
        {/* Orb sphere */}
        <div
          className="relative rounded-full"
          style={{
            width: size,
            height: size,
            background: s.bg,
            maskImage: 'radial-gradient(circle at 50% 50%, black 30%, rgba(0,0,0,0.6) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, rgba(0,0,0,0.6) 55%, transparent 75%)',
            animation: 'orbFloat 7s ease-in-out infinite, orbShimmer 4s ease-in-out infinite alternate',
          }}
        >
          {/* Inner pattern */}
          <div
            className="absolute inset-3 rounded-full"
            style={{ background: s.pattern }}
          />
        </div>
      </div>

      {/* Label text */}
      {label && (
        <span
          className="text-center"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
