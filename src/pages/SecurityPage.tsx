import { useReducedMotion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import ParallaxHero from '../components/ParallaxHero';
import PageCinematicWrap from '../components/PageCinematicWrap';
import { COMPLIANCE } from '../data/compliance';

/**
 * SecurityPage — concentric security rings diagram.
 * Five rings from outside-in: Physical → Network → Runtime → Model → Data.
 * Compliance badges orbit the rings. Visual-first, no text card grid.
 */
const RINGS = [
  { n: '01', name: 'Physical',   body: 'Your hardware. Your rack. Your facility. Attestation on request.',                       radius: 260, color: 'rgba(245,168,212,0.08)', ink: '#ff9090' },
  { n: '02', name: 'Network',    body: 'Your VPC. No egress to the internet. Air-gapped option.',                                 radius: 215, color: 'rgba(245,168,212,0.08)', ink: '#f5a8d4' },
  { n: '03', name: 'Runtime',    body: 'Containerised · signed images · SBOM per build · role-based access.',                    radius: 170, color: 'rgba(255,180,80,0.08)',   ink: '#ffd080' },
  { n: '04', name: 'Model',      body: 'Your fine-tuned weights. Never uploaded. Versioned + reproducible.',                     radius: 125, color: 'rgba(138,245,192,0.08)',  ink: '#8af5c0' },
  { n: '05', name: 'Data',       body: 'Your raw documents never leave. Only your business outputs are surfaced — cited.',       radius: 80,  color: 'rgba(160,220,140,0.08)', ink: '#a0dc8c' },
];

export default function SecurityPage() {
  const [ref, inView] = useInView<HTMLElement>();
  const reduced = useReducedMotion() ?? false;

  return (
    <main className="pb-20" ref={ref}>
      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
        headline="Your data. Your building."
        headlineAccent="Period."
        subline="On-prem by default. Air-gapped on request. SOC 2, HIPAA, GDPR, ISO 27001 — pre-documented, not retrofitted."
        label="Security"
        pills={['On-prem', 'Air-gapped', 'SOC 2', 'HIPAA', 'GDPR', 'ISO 27001']}
        height="80vh"
        clipRadius={0}
      />
      <PageCinematicWrap auroraColor="#187574" auroraSecondary="#8af5c0" giantText="SECURITY">
      {/* Hero */}
      <section className="max-w-[900px] mx-auto px-6 pt-16 pb-12 text-center">
        <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>Security & compliance</div>
        <h1 className={`display-hero sr d-1 ${inView ? 'is-in' : ''}`}>
          Architectural, <span className="italic">not contractual.</span>
        </h1>
        <p className={`mt-5 text-[18px] text-[rgba(0,0,0,0.65)] max-w-[620px] mx-auto sr d-2 ${inView ? 'is-in' : ''}`}>
          Most AI vendors promise safety in a contract. We make it structurally impossible for data to leave. Five rings, three live clients, zero incidents.
        </p>
      </section>

      {/* The concentric rings */}
      <section className="max-w-[1100px] mx-auto px-6 mb-20">
        <div className="relative aspect-square max-w-[640px] mx-auto">
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full" aria-hidden>
            {RINGS.map((r, i) => (
              <circle
                key={r.n}
                cx="300"
                cy="300"
                r={r.radius}
                fill={r.color}
                fillOpacity="1"
                stroke={r.ink}
                strokeWidth="1.5"
                strokeOpacity={0.4}
                strokeDasharray={i === 0 ? '0' : '4 4'}
                className={`transition-all`}
                style={{
                  transformOrigin: 'center',
                  // prefers-reduced-motion: reduce → rings render at final
                  // scale immediately, no enlarging animation. Opacity still
                  // fades in via inView to keep the staggered reveal, but
                  // without the scale-in — matches WCAG 2.3.3 guidance.
                  transform: reduced || inView ? 'scale(1)' : 'scale(0.3)',
                  opacity: inView ? 1 : 0,
                  transition: reduced
                    ? `opacity 0.4s ease ${i * 0.06}s`
                    : `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s, opacity 0.8s ease ${i * 0.12}s`,
                }}
              />
            ))}
            {/* Center — "your data" */}
            <circle cx="300" cy="300" r="32" fill="#5b76fe" stroke="rgba(0,0,0,0.08)" strokeWidth="3" />
            <text x="300" y="298" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">your</text>
            <text x="300" y="312" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">data</text>
          </svg>

          {/* Ring labels positioned along each ring's top edge */}
          {RINGS.map((r) => (
            <div
              key={r.n}
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{
                top: `calc(50% - ${(r.radius / 600) * 100}%)`,
                transform: 'translate(-50%, -8px)',
              }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full font-display text-[10px] font-semibold"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)', color: r.ink }}
              >
                {r.n} · {r.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Ring detail list */}
      <section className="max-w-[900px] mx-auto px-6 grid md:grid-cols-2 gap-4 mb-20">
        {RINGS.map((r) => (
          <div
            key={r.n}
            className="p-6"
            style={{ background: r.color, borderRadius: 20, borderLeft: `4px solid ${r.ink}`, border: '1px solid rgba(0,0,0,0.04)', borderLeftWidth: 4, borderLeftColor: r.ink }}
          >
            <div className="micro-upper mb-2" style={{ color: r.ink }}>Ring {r.n} · {r.name}</div>
            <div className="text-[14px] text-[rgba(0,0,0,0.65)] leading-relaxed">{r.body}</div>
          </div>
        ))}
      </section>

      {/* Compliance band */}
      <section id="compliance" className="max-w-[900px] mx-auto px-6 text-center">
        <div className="micro-upper text-[rgba(0,0,0,0.65)] mb-5">Compliance</div>
        <div className="flex flex-wrap justify-center gap-3">
          {COMPLIANCE.map((c) => (
            <span
              key={c}
              className="px-5 py-2.5 rounded-full font-display font-semibold text-[13px]"
              style={{ background: 'rgba(0,0,0,0.04)', color: '#8af5c0', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-[rgba(0,0,0,0.65)] italic max-w-[580px] mx-auto">
          Because the architecture is sovereign, most compliance is achieved structurally rather than contractually — the data cannot leave, so most data-residency requirements are met by definition.
        </p>
      </section>
      </PageCinematicWrap>
    </main>
  );
}
