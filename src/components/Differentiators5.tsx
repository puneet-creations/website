import { useInView } from '../hooks/useInView';

/**
 * Differentiators5 — "Nobody else does all five of these."
 * Five pastel badges arranged as a pentagon around a center node. Not a card list —
 * the visual IS the message. Each badge has a short label and a one-line proof chip.
 */
export default function Differentiators5() {
  const [ref, inView] = useInView<HTMLElement>();

  const diffs = [
    {
      n: '01',
      title: 'Sovereign by architecture',
      proof: 'On-prem · air-gapped · no back doors',
      color: 'rgba(138,245,192,0.06)',
      ink: '#8af5c0',
      pos: { x: 50, y: 8 },
    },
    {
      n: '02',
      title: 'Executes — not suggests',
      proof: 'Posts to SAP · writes to Epic · reconciles vouchers',
      color: 'rgba(245,168,212,0.06)',
      ink: '#f5a8d4',
      pos: { x: 88, y: 34 },
    },
    {
      n: '03',
      title: 'Hallucination solved in prod',
      proof: '0 incidents · 3 live enterprise clients',
      color: 'rgba(255,120,120,0.06)',
      ink: '#ff9090',
      pos: { x: 75, y: 82 },
    },
    {
      n: '04',
      title: 'Enterprise context engine',
      proof: 'Knows your vendor master · your GL · your coding',
      color: 'rgba(255,180,80,0.06)',
      ink: '#ffd080',
      pos: { x: 25, y: 82 },
    },
    {
      n: '05',
      title: '4 weeks to live production',
      proof: 'Not a prototype · guaranteed or you don\'t pay',
      color: 'rgba(160,220,140,0.06)',
      ink: '#a0dc8c',
      pos: { x: 12, y: 34 },
    },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s3)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[700px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>The five</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Nobody else does <span className="italic">all five of these.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Many competitors do one or two. artiGen is the only stack that delivers all five in production.
          </p>
        </div>

        {/* Pentagon layout */}
        <div className="relative max-w-[820px] mx-auto aspect-square">
          {/* Connector lines from center to each point */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {diffs.map((d, i) => (
              <line
                key={d.n}
                x1="50"
                y1="50"
                x2={d.pos.x}
                y2={d.pos.y}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="0.35"
                strokeDasharray="1.5 1.5"
                opacity={inView ? 0.5 : 0}
                style={{ transition: 'opacity 0.8s ease', transitionDelay: `${i * 0.12 + 0.3}s` }}
              />
            ))}
          </svg>

          {/* Center — the "all five" badge */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full flex flex-col items-center justify-center text-white font-display text-center core-pulse z-10 pop ${inView ? 'is-in' : ''}`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #7d93ff 0%, #5b76fe 45%, #3a4fc0 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              transitionDelay: '0.2s',
            }}
          >
            <div className="text-[30px] italic font-semibold leading-none">all 5</div>
            <div className="micro-upper mt-1 opacity-80">artiGen only</div>
          </div>

          {/* Five pentagon badges */}
          {diffs.map((d, i) => (
            <div
              key={d.n}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-[220px] p-4 pop ${inView ? 'is-in' : ''}`}
              style={{
                left: `${d.pos.x}%`,
                top: `${d.pos.y}%`,
                background: d.color,
                borderRadius: 20,
                border: `1px solid ${d.ink}22`,
                transitionDelay: `${i * 0.12 + 0.4}s`,
              }}
            >
              <div className="micro-upper mb-1" style={{ color: d.ink }}>{d.n}</div>
              <div className="font-display text-[15px] leading-tight text-black mb-2">{d.title}</div>
              <div className="text-[11px] text-[rgba(0,0,0,0.65)] leading-snug">{d.proof}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
