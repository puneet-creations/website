import { useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * CompetitorsRadar — artiGen vs 6 competitor categories across 5 axes.
 * A single SVG radar chart with artiGen filled in blue and the highlighted competitor
 * filled in a pastel color. Click any competitor to overlay it against artiGen.
 */

type Player = {
  id: string;
  name: string;
  category: string;
  scores: [number, number, number, number, number];
  color: string;
  ink: string;
  note: string;
};

const ARTIGEN: Player = {
  id: 'artigen',
  name: 'artiGen',
  category: 'Sovereign execution platform',
  scores: [5, 5, 5, 5, 5],
  color: '#5b76fe',
  ink: '#2a41b6',
  note: 'The only stack that wins on all five axes simultaneously.',
};

const COMPETITORS: Player[] = [
  { id: 'foundry',  name: 'Foundation model API',  category: 'OpenAI / Anthropic / Google',    scores: [1, 2, 1, 2, 4], color: 'rgba(255,120,120,0.06)', ink: '#ff9090', note: 'Powerful model. Public cloud. No execution layer. Your data trains theirs.' },
  { id: 'mbb',      name: 'Big-4 / MBB consulting', category: 'Accenture / Deloitte / McKinsey', scores: [2, 1, 1, 3, 1], color: 'rgba(255,180,80,0.06)', ink: '#ffd080', note: 'Expensive slideware. Months of strategy. Zero production agents at the end.' },
  { id: 'rpa',      name: 'Legacy RPA',              category: 'UiPath / Automation Anywhere',    scores: [4, 2, 2, 1, 3], color: 'rgba(245,168,212,0.06)', ink: '#f5a8d4', note: 'Deterministic but brittle. Any format change and the bot breaks.' },
  { id: 'copilot',  name: 'Enterprise copilot',      category: 'Microsoft / Google Workspace',    scores: [2, 3, 1, 2, 4], color: 'rgba(138,245,192,0.06)', ink: '#8af5c0', note: 'Recommends. Never executes. Still requires a human to do the work.' },
  { id: 'agentic',  name: 'Agentic AI startup',      category: 'Various small vendors',           scores: [2, 2, 2, 3, 3], color: 'rgba(160,220,140,0.06)', ink: '#a0dc8c', note: 'Demos well on their data. Falls over on yours. No enterprise context.' },
  { id: 'diy',      name: 'Build it yourself',       category: 'Your engineering team',           scores: [3, 2, 1, 4, 1], color: 'rgba(245,168,212,0.06)', ink: '#ff9090', note: 'Knows your business. 12-18 months. Quit before shipping. Most common failure mode.' },
];

const AXES = [
  'Sovereign\nby architecture',
  'Executes\nnot suggests',
  'Hallucination\nsolved in prod',
  'Enterprise\ncontext engine',
  '4 weeks\nto production',
];

export default function CompetitorsRadar() {
  const [ref, inView] = useInView<HTMLElement>();
  const [active, setActive] = useState<string>('foundry');
  const opponent = COMPETITORS.find((c) => c.id === active)!;

  // Radar math
  const CX = 220;
  const CY = 220;
  const R = 160;
  const N = 5;
  const angleFor = (i: number) => (Math.PI * 2 * i) / N - Math.PI / 2; // start at top

  const pointsFor = (scores: number[]) =>
    scores
      .map((s, i) => {
        const a = angleFor(i);
        const r = (R * s) / 5;
        const x = CX + Math.cos(a) * r;
        const y = CY + Math.sin(a) * r;
        return `${x},${y}`;
      })
      .join(' ');

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s2)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12 max-w-[720px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>Competitors</div>
          <h1 className={`display-hero sr d-1 ${inView ? 'is-in' : ''}`}>
            artiGen vs <span className="italic">the alternatives.</span>
          </h1>
          <p className={`mt-5 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Six different categories of AI buying. All six win on some axes. Only one wins on all five.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 max-w-[1100px] mx-auto items-center">
          {/* LEFT — the radar */}
          <div className="p-8" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)' }}>
            <svg viewBox="0 0 440 440" className="w-full">
              {/* Background rings */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((t) => (
                <polygon
                  key={t}
                  points={[0, 1, 2, 3, 4]
                    .map((i) => {
                      const a = angleFor(i);
                      const r = R * t;
                      return `${CX + Math.cos(a) * r},${CY + Math.sin(a) * r}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="1"
                />
              ))}
              {/* Spokes */}
              {[0, 1, 2, 3, 4].map((i) => {
                const a = angleFor(i);
                return (
                  <line
                    key={i}
                    x1={CX}
                    y1={CY}
                    x2={CX + Math.cos(a) * R}
                    y2={CY + Math.sin(a) * R}
                    stroke="rgba(0,0,0,0.06)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Opponent polygon */}
              <polygon
                points={pointsFor(opponent.scores)}
                fill={opponent.color}
                fillOpacity="0.35"
                stroke={opponent.ink}
                strokeWidth="2"
              />

              {/* artiGen polygon (on top) */}
              <polygon
                points={pointsFor(ARTIGEN.scores)}
                fill="#5b76fe"
                fillOpacity="0.18"
                stroke="#5b76fe"
                strokeWidth="2.5"
              />
              {/* artiGen dots */}
              {ARTIGEN.scores.map((_s, i) => {
                const a = angleFor(i);
                const r = R;
                return (
                  <circle
                    key={i}
                    cx={CX + Math.cos(a) * r}
                    cy={CY + Math.sin(a) * r}
                    r="5"
                    fill="#5b76fe"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Axis labels */}
              {AXES.map((label, i) => {
                const a = angleFor(i);
                const lr = R + 40;
                const x = CX + Math.cos(a) * lr;
                const y = CY + Math.sin(a) * lr;
                return label.split('\n').map((line, li) => (
                  <text
                    key={`${i}-${li}`}
                    x={x}
                    y={y + li * 11 - 5}
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    fill="black"
                  >
                    {line}
                  </text>
                ));
              })}
            </svg>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-2 text-[12px] font-display">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-sm" style={{ background: '#5b76fe' }} />
                <span className="text-black font-semibold">artiGen</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-sm" style={{ background: opponent.color, boxShadow: `inset 0 0 0 2px ${opponent.ink}` }} />
                <span className="text-black">{opponent.name}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — competitor picker */}
          <div className="flex flex-col gap-3">
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mb-1">Compare artiGen against</div>
            {COMPETITORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className="text-left p-4 transition-all"
                style={{
                  background: c.id === active ? c.color : 'rgba(0,0,0,0.03)',
                  borderRadius: 16,
                  border: c.id === active ? `1px solid ${c.ink}` : '1px solid rgba(0,0,0,0.06)',
                  boxShadow: c.id === active ? `0 0 20px ${c.ink}33` : 'none',
                  transform: c.id === active ? 'translateX(4px)' : 'none',
                }}
              >
                <div className="font-display text-[15px] text-black leading-tight">{c.name}</div>
                <div className="text-[11px] text-[rgba(0,0,0,0.50)] mb-1.5">{c.category}</div>
                {c.id === active && <div className="text-[12px] text-[rgba(0,0,0,0.65)] italic leading-snug">{c.note}</div>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
