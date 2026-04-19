import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * SplitVerdict — the same prompt, two very different answers.
 * Left: Generic LLM card (red accent). Value flickers between a hallucinated and a plausible
 * answer to visually demonstrate unreliability.
 * Right: artiGen card (emerald accent). Value is stable, with cited source chips.
 */
export default function SplitVerdict() {
  const [ref, inView] = useInView<HTMLElement>();
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setFlicker((f) => !f), 1800);
    return () => clearInterval(t);
  }, []);

  const genericAnswer = flicker ? '$52,400.00' : '$14,250.00';

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s2)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[720px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>Generic vs sovereign</div>
          <h1 className={`display-hero sr d-1 ${inView ? 'is-in' : ''}`}>
            Same question. <span className="italic">Two very different answers.</span>
          </h1>
          <p className={`mt-5 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            This is why 70% of enterprise AI projects never make it past the security review.
          </p>
        </div>

        {/* Prompt banner */}
        <div className={`max-w-[820px] mx-auto mb-10 px-6 py-5 rounded-[20px] flex items-start gap-4 sr d-3 ${inView ? 'is-in' : ''}`} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="micro-upper text-[rgba(0,0,0,0.65)] pt-1">Prompt</div>
          <div className="font-display text-[16px] text-black flex-1">
            "What's the total on invoice INV-2024-8814 for Global Logistics LLC?"
          </div>
        </div>

        {/* Side-by-side verdict */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
          {/* LEFT — Generic LLM */}
          <div
            className={`relative p-8 sr d-4 ${inView ? 'is-in' : ''}`}
            style={{ background: 'rgba(255,120,120,0.06)', border: '1px solid rgba(255,120,120,0.12)', borderLeft: '6px solid #c0392b', borderRadius: 28 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#c0392b]" />
                <span className="micro-upper text-[#c0392b]">Generic LLM</span>
              </div>
              <span className="micro-upper text-[#c0392b]">Hallucinating</span>
            </div>
            <div className="font-display text-[48px] italic font-semibold text-black leading-none mb-3" style={{ transition: 'opacity 0.2s ease' }}>
              {genericAnswer}
            </div>
            <p className="text-[14px] text-[rgba(0,0,0,0.65)] leading-relaxed mb-6">
              "Based on my knowledge, the invoice total is approximately the amount shown — I'm confident in this answer."
            </p>
            <div className="capsule-light inline-flex items-center gap-2 rounded-full">
              ✗ Not in the document
            </div>
          </div>

          {/* RIGHT — artiGen */}
          <div
            className={`relative p-8 sr d-5 ${inView ? 'is-in' : ''}`}
            style={{ background: 'rgba(138,245,192,0.06)', border: '1px solid rgba(138,245,192,0.12)', borderLeft: '6px solid #8af5c0', borderRadius: 28 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00b473]" />
                <span className="micro-upper text-[#8af5c0]">artiGen</span>
              </div>
              <span className="micro-upper text-[#8af5c0]">Cited</span>
            </div>
            <div className="font-display text-[48px] italic font-semibold text-black leading-none mb-3">
              $12,860.00
            </div>
            <p className="text-[14px] text-[rgba(0,0,0,0.65)] leading-relaxed mb-6">
              Extracted from the invoice total line. Cross-checked against the PO reference and GRN tolerance before responding.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[
                { n: 1, l: 'INV-2024-8814' },
                { n: 2, l: 'Global Logistics LLC' },
                { n: 3, l: 'Page 2 · Total line' },
                { n: 4, l: 'PO-4473 match ✓' },
              ].map((c) => (
                <span
                  key={c.n}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-display"
                  style={{ background: 'rgba(138,245,192,0.08)', color: '#8af5c0', border: '1px solid rgba(138,245,192,0.15)' }}
                >
                  <span className="w-4 h-4 rounded-sm bg-[#8af5c0] text-[#0a0a0a] flex items-center justify-center text-[8px] font-semibold">{c.n}</span>
                  {c.l}
                </span>
              ))}
            </div>
            <div className="capsule-light inline-flex items-center gap-2 rounded-full">
              ✓ Cited · page 2 · line 14
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
