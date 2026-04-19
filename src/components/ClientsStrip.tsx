import { Sparkles } from './ui/sparkles';
import { InfiniteSlider } from './ui/infinite-slider';
import { Ship, Car, Stethoscope, Building2, FlaskConical } from 'lucide-react';

/** Cinematic clients strip with sparkle particles + infinite logo slider.
 *  Dark theme — black background, white text, white horizon glow.
 */

const clients = [
  { name: 'Logistics operator · Dubai', icon: Ship },
  { name: 'Auto OEM · SE Asia', icon: Car },
  { name: 'Dental group · SF · 38 clinics', icon: Stethoscope },
  { name: 'Banking & Insurance', icon: Building2 },
  { name: 'Pharma & Life Sciences', icon: FlaskConical },
];

const trustMetrics = [
  { n: '5', label: 'agents live in production' },
  { n: '3', label: 'regulated industries' },
  { n: '0', label: 'hallucination incidents' },
  { n: '88%', label: 'no-touch processing rate' },
];

const complianceChips = ['GDPR', 'HIPAA', 'SOC 2', 'ISO 27001', 'Data residency', 'Air-gapped available'];

const platformMetrics = [
  { n: '6', label: 'shared platform layers' },
  { n: '−92%', label: 'per-document cost' },
  { n: '4 wk', label: 'to production' },
  { n: '100%', label: 'cited + reversible' },
];

type Props = {
  variant?: 'trust' | 'platform';
};

export default function ClientsStrip({ variant = 'trust' }: Props) {
  const isTrust = variant === 'trust';
  const metrics = isTrust ? trustMetrics : platformMetrics;
  const headerLeft = isTrust ? 'Live in production at' : 'Powering regulated workflows';
  const headerRight = isTrust ? '· Zero hallucination incidents' : '· On-prem · Sovereign · Cited';

  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-6 mb-5 flex items-center gap-4">
        <span className="micro-upper" style={{ color: 'rgba(255,255,255,0.80)' }}>
          {headerLeft}
        </span>
        <span className="micro-upper" style={{ color: 'rgba(255,255,255,0.70)' }}>
          {headerRight}
        </span>
      </div>

      {/* Infinite slider */}
      <div
        className="relative h-[72px] w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <InfiniteSlider gap={32} speed={60} reverse={!isTrust}>
          {clients.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex-shrink-0 inline-flex items-center gap-3 px-5 py-3 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <Icon size={20} style={{ color: '#ffffff' }} />
              <span
                className="text-[15px] font-display font-semibold"
                style={{ color: '#ffffff', whiteSpace: 'nowrap' }}
              >
                {name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>

      {/* Metrics row */}
      <div className="max-w-[1100px] mx-auto px-6 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="text-center py-5">
            <div
              className="font-display italic text-[56px] font-semibold leading-none"
              style={{ color: '#ffffff' }}
            >
              {m.n}
            </div>
            <div
              className="text-[14px] mt-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(255,255,255,0.70)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Compliance chips */}
      <div className="max-w-[1100px] mx-auto px-6 mt-8 flex flex-wrap justify-center gap-2">
        {complianceChips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center rounded-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '7px 16px',
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Horizon light (white glow) underneath */}
      <div
        className="relative -mt-8 h-32 w-full overflow-hidden"
        style={{
          maskImage: 'radial-gradient(50% 50%, white, transparent)',
          WebkitMaskImage: 'radial-gradient(50% 50%, white, transparent)',
        }}
      >
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#ffffff,transparent_70%)] before:opacity-25" />
        <div
          className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-white/10"
          style={{ background: '#000000' }}
        />
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full"
          color="#ffffff"
          size={1.2}
          speed={0.8}
        />
      </div>
    </section>
  );
}
