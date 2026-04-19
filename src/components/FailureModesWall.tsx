import { useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * FailureModesWall — 6 ways generic AI breaks in production.
 * Each failure mode is a pastel badge. Clicking a badge expands the detail panel
 * beside the wall showing the generic failure + how artiGen fixes it.
 * The wall is a visual grid, not a text-card list.
 */
export default function FailureModesWall() {
  const [ref, inView] = useInView<HTMLElement>();
  const [active, setActive] = useState(0);

  const modes = [
    {
      n: '01',
      name: 'Hallucination',
      color: 'rgba(255,120,120,0.06)',
      ink: '#ff9090',
      icon: '🫧',
      fail: 'The model invents a fact that looks plausible, because producing something is easier than saying "I don\'t know."',
      fix: 'Every answer is grounded in an exact document span. Below-threshold confidence is routed to a human before any action.',
      cost: 'One wrong invoice posted ≈ $10K+ cleanup',
    },
    {
      n: '02',
      name: 'No audit trail',
      color: 'rgba(245,168,212,0.06)',
      ink: '#f5a8d4',
      icon: '👁',
      fail: "The regulator asks 'why did the agent do that?' and the answer is a JSON blob with no reasoning trace.",
      fix: 'Every action is logged with inputs, cited evidence, confidence score, and the policy that authorized it. Queryable by date, user, agent.',
      cost: 'Audit failure · SOC 2 findings',
    },
    {
      n: '03',
      name: 'Prompt rot',
      color: 'rgba(255,180,80,0.06)',
      ink: '#ffd080',
      icon: '🪫',
      fail: 'The model provider pushes a minor update. Your prompts silently drift. Nobody notices until a customer complains.',
      fix: 'Fine-tuned small models live on your hardware, pinned and versioned. Your prompts don\'t drift because nothing upstream is changing.',
      cost: '2-6 month POC → production crash',
    },
    {
      n: '04',
      name: 'Tool break',
      color: 'rgba(138,245,192,0.06)',
      ink: '#8af5c0',
      icon: '🔌',
      fail: 'Agent calls your API, but a field changed upstream. Agent responds confidently with stale data.',
      fix: 'Every connector has a schema contract. Breaking changes block the action and surface to humans before data goes out.',
      cost: 'Data corruption · manual cleanup',
    },
    {
      n: '05',
      name: 'Runaway cost',
      color: 'rgba(160,220,140,0.06)',
      ink: '#a0dc8c',
      icon: '💸',
      fail: 'Usage scales. Every query hits a frontier model. Your monthly bill jumps from $5K to $80K and stays there.',
      fix: 'The model router sends each subtask to the smallest model that can do it cited. Fixed on-prem cost regardless of volume.',
      cost: '$60K-$400K/month in token bills',
    },
    {
      n: '06',
      name: 'IP leakage',
      color: 'rgba(245,168,212,0.06)',
      ink: '#ff9090',
      icon: '🕳',
      fail: 'Your proprietary vendor master, clinical notes, or design docs become training data for someone else\'s model.',
      fix: 'Everything runs on-prem or air-gapped. Your data never leaves your network and no weights are extracted.',
      cost: 'Trade-secret leakage · lawsuit',
    },
  ];

  const current = modes[active];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s1)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[720px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>Six ways generic AI breaks</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            The failure modes. <span className="italic">Side by side.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Click any failure to see what generic AI does vs what artiGen does instead.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10">
          {/* LEFT — the wall of 6 badges */}
          <div className="grid grid-cols-2 gap-4">
            {modes.map((m, i) => (
              <button
                key={m.n}
                type="button"
                onClick={() => setActive(i)}
                className="text-left p-5 transition-all hover:-translate-y-1"
                style={{
                  background: m.color,
                  borderRadius: 20,
                  border: '1px solid rgba(0,0,0,0.06)',
                  outline: active === i ? `2px solid ${m.ink}` : 'none',
                  boxShadow: active === i ? `0 0 20px ${m.ink}33` : 'none',
                  transform: active === i ? 'translateY(-2px) scale(1.02)' : 'none',
                }}
                aria-pressed={active === i}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[30px]">{m.icon}</div>
                  <div className="micro-upper" style={{ color: m.ink }}>{m.n}</div>
                </div>
                <div className="font-display text-[17px] leading-tight text-black mb-1">{m.name}</div>
                <div className="text-[11px] text-[rgba(0,0,0,0.50)] leading-snug">{m.cost}</div>
              </button>
            ))}
          </div>

          {/* RIGHT — detail panel for active failure mode */}
          <div
            className="p-8 lg:p-10 flex flex-col"
            style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)' }}
            key={active}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="text-[34px]">{current.icon}</div>
              <div>
                <div className="micro-upper" style={{ color: current.ink }}>Failure mode {current.n}</div>
                <div className="font-display text-[24px] leading-tight text-black">{current.name}</div>
              </div>
            </div>

            <div className="mb-6 p-5 rounded-2xl" style={{ background: 'rgba(255,120,120,0.06)', borderLeft: '4px solid #ff9090' }}>
              <div className="micro-upper text-[#ff9090] mb-2">What generic AI does</div>
              <div className="text-[14px] text-[rgba(0,0,0,0.75)] leading-relaxed">{current.fail}</div>
            </div>

            <div className="mb-6 p-5 rounded-2xl" style={{ background: 'rgba(138,245,192,0.06)', borderLeft: '4px solid #8af5c0' }}>
              <div className="micro-upper text-[#8af5c0] mb-2">What artiGen does</div>
              <div className="text-[14px] text-[rgba(0,0,0,0.75)] leading-relaxed">{current.fix}</div>
            </div>

            <div className="mt-auto text-[12px] text-[rgba(0,0,0,0.65)] italic">Cost of this failure: {current.cost}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
