import { Suspense, lazy } from 'react';
import { useInView } from '../hooks/useInView';

const HeroOrb = lazy(() => import('./HeroOrb'));

/**
 * OwnershipBand — two full-width orb statements.
 * Black orb (IP & ownership) + White orb (Why this isn't consulting).
 * Each orb sits above a text block with heading + 3 checkpoints.
 */
export default function OwnershipBand() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} id="ownership" className="py-24" style={{ background: 'var(--bg-s2)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[720px] mx-auto">
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            You own everything. <span className="italic">We own the outcome.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            This is not consulting. The model trained on your data is yours. The agent running on your hardware is yours. The hours we bill are scoped against the result, not the calendar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT — Black orb — IP & ownership */}
          <div className={`flex flex-col items-center text-center sr d-3 ${inView ? 'is-in' : ''}`}>
            <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] mb-10">
              <Suspense fallback={null}>
                <HeroOrb
                  baseColor="#1a1a1a"
                  attenuationColor="#000000"
                  envColor="#666666"
                  attenuationDistance={0.6}
                  breatheAmp={0.14}
                  floatAmp={0.25}
                />
              </Suspense>
            </div>

            <div className="max-w-[460px]">
              <div className="micro-upper text-black mb-3">IP & ownership</div>
              <h3 className="font-display text-[30px] leading-tight text-black mb-6">
                Everything we build <em className="italic text-black">belongs to you.</em>
              </h3>
              <ul className="space-y-4 text-[17px] text-[rgba(0,0,0,0.70)] leading-relaxed text-left">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5" style={{ background: '#000000' }}>✓</span>
                  <span>The fine-tuned small language model trained on your data — yours forever, on your hardware.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5" style={{ background: '#000000' }}>✓</span>
                  <span>The agent code, the connectors, the prompts, the policies — your IP, in your repo.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5" style={{ background: '#000000' }}>✓</span>
                  <span>The audit trail, the evaluation harness, the production runbook — all handed over.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT — White orb — Why this isn't consulting */}
          <div className={`flex flex-col items-center text-center sr d-4 ${inView ? 'is-in' : ''}`}>
            <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] mb-10">
              <Suspense fallback={null}>
                <HeroOrb
                  baseColor="#ffffff"
                  attenuationColor="#ffffff"
                  envColor="#f2f2f2"
                  attenuationDistance={2.4}
                  breatheAmp={0.14}
                  floatAmp={0.25}
                />
              </Suspense>
            </div>

            <div className="max-w-[460px]">
              <div className="micro-upper text-black mb-3">Why this isn't consulting</div>
              <h3 className="font-display text-[30px] leading-tight text-black mb-6">
                We own the outcome. <em className="italic text-black">Not the hours.</em>
              </h3>
              <ul className="space-y-4 text-[17px] text-[rgba(0,0,0,0.70)] leading-relaxed text-left">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5" style={{ background: '#000000' }}>✓</span>
                  <span>ROI metrics defined at scoping. Bi-weekly progress against them. Quarterly reviews.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5" style={{ background: '#000000' }}>✓</span>
                  <span>Live agent on your infrastructure within 4 weeks — not a prototype, not a pilot deck.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5" style={{ background: '#000000' }}>✓</span>
                  <span>If we're not delivering the business case we presented — you know before we do, and you don't pay.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
