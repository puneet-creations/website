import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Flag } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/**
 * PlatformStory — visual long-form platform narrative.
 *   A. Three agent families (document · voice · multimodal) — each with a mini flow diagram
 *   B. Context matters — naked LLM vs context-fed agent, visual
 *   C. Hallucination control — 4-wall gauntlet diagram
 *   D. Determinism — replay visual, same input → same output
 *   E. Scale — Monday-backlog pipeline
 */
export default function PlatformStory() {
  return (
    <>
      <style>{`
        @keyframes psFloat {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-3px); }
        }
        @keyframes psPulse {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
        @keyframes psFlow {
          0%   { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes psFill {
          0% { width: 0%; }
          100% { width: var(--w, 100%); }
        }
        .ps-dash   { stroke-dasharray: 4 3; animation: psFlow 1.2s linear infinite; }
        .ps-float  { animation: psFloat 3s ease-in-out infinite; }
        .ps-pulse  { animation: psPulse 1.6s ease-in-out infinite; }
      `}</style>
      <AgentFamilies />
      <ContextMatters />
      <HallucinationControl />
      <DeterminismProof />
      <ScaleAtVolume />
    </>
  );
}

/* ============================================================ */
/*  A. Three agent families — each with a visual mini-flow      */
/* ============================================================ */
export function AgentFamilies() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s1)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>What you can build</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Three agent families. <span className="italic">One platform underneath.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Documents, voice, and the messy multimodal combinations of both — custom-built for your workflow, not prompt-wrapped around ChatGPT.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* DOCUMENT AGENT */}
          <div
            className={`rounded-[24px] p-10 sr ${inView ? 'is-in' : ''}`}
            style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-[20px]" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>📄</div>
              <div className="micro-upper text-[#000000]">Document agents</div>
            </div>
            <div className="font-display text-[30px] leading-tight text-black mb-3">Read anything. Cite everything.</div>

            {/* Visual flow */}
            <div className="motion-card mb-4">
              <svg viewBox="0 0 320 140" className="w-full h-[180px]">
                {/* Input stack of docs */}
                <g className="ps-float">
                  <rect x="8" y="22" width="56" height="78" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.2" />
                  <rect x="14" y="14" width="56" height="78" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.2" />
                  <rect x="20" y="6" width="56" height="78" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" />
                  <line x1="26" y1="22" x2="68" y2="22" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                  <line x1="26" y1="30" x2="62" y2="30" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                  <line x1="26" y1="38" x2="68" y2="38" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                  <line x1="26" y1="46" x2="58" y2="46" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                  <text x="26" y="72" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">INV · PO · GRN</text>
                </g>
                {/* Arrow */}
                <line x1="92" y1="48" x2="128" y2="48" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" className="ps-dash" markerEnd="url(#ps-arr-1)" />
                <defs>
                  <marker id="ps-arr-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="rgba(0,0,0,0.30)" />
                  </marker>
                </defs>
                {/* OCR engine */}
                <rect x="130" y="28" width="64" height="42" rx="6" fill="rgba(0,0,0,0.08)" />
                <text x="162" y="46" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">OCR +</text>
                <text x="162" y="56" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">layout</text>
                <text x="162" y="64" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">artiGen</text>
                {/* Arrow */}
                <line x1="198" y1="48" x2="232" y2="48" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" className="ps-dash" markerEnd="url(#ps-arr-1)" />
                {/* Structured output */}
                <rect x="234" y="18" width="82" height="64" rx="6" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" />
                <rect x="234" y="18" width="82" height="12" rx="6" fill="rgba(0,0,0,0.08)" />
                <text x="240" y="27" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">STRUCTURED</text>
                <text x="240" y="40" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">vendor</text>
                <text x="278" y="40" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">V-472</text>
                <text x="240" y="49" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">amount</text>
                <text x="278" y="49" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">$13,503</text>
                <text x="240" y="58" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">gl</text>
                <text x="278" y="58" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">6100-2340</text>
                <text x="240" y="67" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">conf</text>
                <text x="278" y="67" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">99.2%</text>
                <rect x="240" y="72" width="70" height="6" rx="3" fill="rgba(0,0,0,0.03)" />
                <text x="275" y="77" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">→ SAP</text>
                {/* labels */}
                <text x="48" y="122" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">mixed PDFs</text>
                <text x="162" y="122" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">layout + NER</text>
                <text x="275" y="122" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">typed JSON</text>
              </svg>
            </div>

            <ul className="space-y-1.5 mb-4 text-[18px] text-[rgba(0,0,0,0.75)]">
              <li>▸ Cross-doc reconciliation (PO ↔ GRN ↔ Invoice)</li>
              <li>▸ Field-level confidence + provenance citation</li>
              <li>▸ Writes to SAP · Oracle · Dynamics · NetSuite</li>
            </ul>
            <div className="capsule-light rounded-full inline-block text-[14px]">
              Thomson Group · 18,000 vouchers/mo
            </div>
          </div>

          {/* VOICE AGENT */}
          <div className={`rounded-[24px] p-10 sr d-1 ${inView ? 'is-in' : ''}`} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-[20px]" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>🎙</div>
              <div className="micro-upper text-[#000000]">Voice agents</div>
            </div>
            <div className="font-display text-[30px] leading-tight text-black mb-3">Listen. Structure. Route.</div>

            <div className="motion-card mb-4">
              <svg viewBox="0 0 320 140" className="w-full h-[180px]">
                {/* Mic + wave */}
                <g transform="translate(30, 46)">
                  <circle r="20" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" />
                  <rect x="-5" y="-10" width="10" height="14" rx="5" fill="rgba(0,0,0,0.30)" />
                  <line x1="-8" y1="6" x2="8" y2="6" stroke="rgba(0,0,0,0.30)" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="6" x2="0" y2="12" stroke="rgba(0,0,0,0.30)" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                {/* Waveform */}
                {[0,1,2,3,4,5,6,7,8,9].map((i) => {
                  const h = 4 + ((i * 7) % 14);
                  return (
                    <rect
                      key={i}
                      x={60 + i * 5}
                      y={46 - h / 2}
                      width="3"
                      height={h}
                      rx="1.5"
                      fill="rgba(0,0,0,0.30)"
                      className="ps-pulse"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                  );
                })}
                {/* Arrow */}
                <line x1="115" y1="46" x2="148" y2="46" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" className="ps-dash" markerEnd="url(#ps-arr-2)" />
                <defs>
                  <marker id="ps-arr-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="rgba(0,0,0,0.30)" />
                  </marker>
                </defs>
                {/* NER engine */}
                <rect x="150" y="28" width="60" height="36" rx="6" fill="rgba(0,0,0,0.08)" />
                <text x="180" y="44" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">Dental</text>
                <text x="180" y="54" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">NER</text>
                <line x1="214" y1="46" x2="244" y2="46" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" className="ps-dash" markerEnd="url(#ps-arr-2)" />
                {/* SOAP */}
                <rect x="246" y="14" width="68" height="70" rx="6" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" />
                <rect x="246" y="14" width="68" height="12" rx="6" fill="rgba(0,0,0,0.08)" />
                <text x="252" y="23" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">SOAP + ICD</text>
                <text x="252" y="36" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">S</text>
                <text x="262" y="36" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">cold sens 2w</text>
                <text x="252" y="46" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">O</text>
                <text x="262" y="46" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">#3 Class II</text>
                <text x="252" y="56" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">A</text>
                <text x="262" y="56" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">K02.51</text>
                <text x="252" y="66" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">P</text>
                <text x="262" y="66" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">D2392 · 2-vst</text>
                <rect x="252" y="72" width="56" height="6" rx="3" fill="rgba(0,0,0,0.03)" />
                <text x="280" y="77" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">→ Dentrix</text>

                <text x="48" y="122" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">live audio</text>
                <text x="180" y="122" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">on-prem ASR</text>
                <text x="280" y="122" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">EHR sync</text>
              </svg>
            </div>

            <ul className="space-y-1.5 mb-4 text-[18px] text-[rgba(0,0,0,0.75)]">
              <li>▸ On-prem ASR (no audio leaves your VPC)</li>
              <li>▸ Domain NER — dental · radiology · legal</li>
              <li>▸ Writes to Dentrix · Epic · Salesforce</li>
            </ul>
            <div className="capsule-light rounded-full inline-block text-[14px]">
              Qira Labs · 2,400 consults/week
            </div>
          </div>

          {/* MULTIMODAL AGENT */}
          <div className={`rounded-[24px] p-10 sr d-2 ${inView ? 'is-in' : ''}`} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-[20px]" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>🧩</div>
              <div className="micro-upper text-[#000000]">Multimodal agents</div>
            </div>
            <div className="font-display text-[30px] leading-tight text-black mb-3">Docs + voice + images, fused.</div>

            <div className="motion-card mb-4">
              <svg viewBox="0 0 320 140" className="w-full h-[180px]">
                {/* 3 inputs stacked */}
                <g>
                  <rect x="8" y="8" width="62" height="28" rx="5" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1" />
                  <text x="14" y="20" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">🖼 IMAGE</text>
                  <text x="14" y="30" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">ins. card photo</text>

                  <rect x="8" y="42" width="62" height="28" rx="5" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1" />
                  <text x="14" y="54" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">🎙 VOICE</text>
                  <text x="14" y="64" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">"tooth hurts"</text>

                  <rect x="8" y="76" width="62" height="28" rx="5" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1" />
                  <text x="14" y="88" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">📄 DOC</text>
                  <text x="14" y="98" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">chart history</text>
                </g>
                {/* Converge arrows */}
                <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" fill="none" className="ps-dash">
                  <path d="M70,22 Q110,22 132,56" />
                  <path d="M70,56 L132,56" />
                  <path d="M70,90 Q110,90 132,56" />
                </g>
                {/* Fusion core */}
                <circle cx="162" cy="56" r="26" fill="rgba(0,0,0,0.08)" />
                <text x="162" y="54" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">FUSION</text>
                <text x="162" y="64" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">cross-modal</text>
                {/* Out */}
                <line x1="190" y1="56" x2="224" y2="56" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" className="ps-dash" markerEnd="url(#ps-arr-3)" />
                <defs>
                  <marker id="ps-arr-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="rgba(0,0,0,0.30)" />
                  </marker>
                </defs>
                {/* Decision card */}
                <rect x="226" y="22" width="86" height="70" rx="6" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" />
                <rect x="226" y="22" width="86" height="12" rx="6" fill="rgba(0,0,0,0.08)" />
                <text x="232" y="31" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">DECISION</text>
                <text x="232" y="44" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">plan</text>
                <text x="252" y="44" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">Delta PPO</text>
                <text x="232" y="54" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">proc</text>
                <text x="252" y="54" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">D2392</text>
                <text x="232" y="64" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">slot</text>
                <text x="252" y="64" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">Thu 9:00</text>
                <text x="232" y="74" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">cite</text>
                <text x="252" y="74" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">img+voice</text>
                <rect x="232" y="80" width="74" height="6" rx="3" fill="rgba(0,0,0,0.03)" />
                <text x="269" y="85" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">→ booked</text>
              </svg>
            </div>

            <ul className="space-y-1.5 mb-4 text-[18px] text-[rgba(0,0,0,0.75)]">
              <li>▸ Vision + speech + text fused at runtime</li>
              <li>▸ Cross-modal citations — "from the photo"</li>
              <li>▸ Image forensics (stamps · signatures)</li>
            </ul>
            <div className="capsule-light rounded-full inline-block text-[14px]">
              Daimler Asia · warranty claims
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  B. Context matters — visual comparison                      */
/* ============================================================ */
export function ContextMatters() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s2)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>Why context is king</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            An agent without your context <span className="italic">is not production software.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            A demo. The gap between a clever ChatGPT prompt and a system you can bet a regulated workflow on — is everything artiGen ships in the box.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
          {/* Naked LLM */}
          <div className={`rounded-[24px] p-10 sr ${inView ? 'is-in' : ''}`} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderLeft: '4px solid rgba(0,0,0,0.60)' }}>
            <div className="micro-upper text-[#000000] mb-3">Generic LLM — no context</div>
            <div className="font-display text-[28px] text-black leading-tight mb-4">The demo that dies in UAT</div>

            <div className="rounded-[16px] p-6 mb-4" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <svg viewBox="0 0 360 180" className="w-full">
                {/* Question */}
                <rect x="10" y="14" width="140" height="32" rx="8" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                <text x="18" y="28" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">"Post invoice IN-8892"</text>
                <text x="18" y="38" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">from finance team</text>

                {/* Arrow */}
                <line x1="150" y1="30" x2="180" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" markerEnd="url(#ps-arr-red)" />
                <defs>
                  <marker id="ps-arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="rgba(0,0,0,0.30)" />
                  </marker>
                </defs>

                {/* LLM bubble */}
                <circle cx="210" cy="30" r="22" fill="rgba(0,0,0,0.08)" />
                <text x="210" y="28" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">LLM</text>
                <text x="210" y="38" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.40)">generic</text>

                {/* Missing sources crossed out */}
                <g opacity="0.5">
                  <rect x="244" y="8" width="104" height="14" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <text x="252" y="18" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">✗ vendor master</text>
                  <rect x="244" y="26" width="104" height="14" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <text x="252" y="36" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">✗ GL chart</text>
                  <rect x="244" y="44" width="104" height="14" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <text x="252" y="54" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">✗ tolerance rules</text>
                </g>

                {/* Output (wrong) */}
                <line x1="210" y1="52" x2="210" y2="84" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" markerEnd="url(#ps-arr-red)" />
                <rect x="60" y="90" width="260" height="78" rx="10" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                <text x="68" y="104" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">HALLUCINATED OUTPUT</text>
                <text x="68" y="118" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">vendor: "Global Logistics Inc."</text>
                <text x="240" y="118" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">wrong</text>
                <text x="68" y="132" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">gl: "Accounts Payable 2000"</text>
                <text x="240" y="132" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">guessed</text>
                <text x="68" y="146" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">approver: "system admin"</text>
                <text x="240" y="146" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">invented</text>
                <text x="68" y="160" fontFamily="Plus Jakarta Sans" fontSize="10" fontStyle="italic" fill="rgba(0,0,0,0.45)">no citation · no audit · silent fail</text>
              </svg>
            </div>

            <ul className="space-y-1.5 text-[18px] text-[rgba(0,0,0,0.75)]">
              <li className="flex gap-2"><span className="text-[#000000]">✗</span>Guesses vendor names, fabricates GL codes</li>
              <li className="flex gap-2"><span className="text-[#000000]">✗</span>No tolerance rules, no approval ladder</li>
              <li className="flex gap-2"><span className="text-[#000000]">✗</span>No audit trail — undefendable in a regulator's room</li>
            </ul>
          </div>

          {/* Context-fed agent */}
          <div className={`rounded-[24px] p-10 sr d-1 ${inView ? 'is-in' : ''}`} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', borderLeft: '4px solid #000000' }}>
            <div className="micro-upper text-[#000000] mb-3">artiGen — full context</div>
            <div className="font-display text-[28px] text-black leading-tight mb-4">The agent that actually ships</div>

            <div className="motion-card mb-4">
              <svg viewBox="0 0 360 180" className="w-full">
                {/* Question */}
                <rect x="10" y="14" width="140" height="32" rx="8" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                <text x="18" y="28" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">"Post invoice IN-8892"</text>
                <text x="18" y="38" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">from finance team</text>

                <line x1="150" y1="30" x2="180" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" markerEnd="url(#ps-arr-blue)" />
                <defs>
                  <marker id="ps-arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="rgba(0,0,0,0.30)" />
                  </marker>
                </defs>

                {/* Agent core */}
                <circle cx="210" cy="30" r="22" fill="rgba(0,0,0,0.08)" />
                <text x="210" y="28" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">agent</text>
                <text x="210" y="38" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.40)">+ context</text>

                {/* Sources plugged in */}
                <rect x="244" y="4" width="108" height="14" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="0.8" />
                <text x="250" y="14" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">✓ vendor master · V-472</text>
                <rect x="244" y="22" width="108" height="14" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="0.8" />
                <text x="250" y="32" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">✓ GL chart · 6100-2340</text>
                <rect x="244" y="40" width="108" height="14" rx="4" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.10)" strokeWidth="0.8" />
                <text x="250" y="50" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">✓ tol · ±2% · named appr</text>
                <line x1="232" y1="18" x2="244" y2="11" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7" className="ps-dash" />
                <line x1="232" y1="28" x2="244" y2="29" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7" className="ps-dash" />
                <line x1="232" y1="38" x2="244" y2="47" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7" className="ps-dash" />

                {/* Output correct */}
                <line x1="210" y1="52" x2="210" y2="84" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" markerEnd="url(#ps-arr-blue)" />
                <rect x="60" y="90" width="260" height="78" rx="10" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                <text x="68" y="104" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">GROUNDED OUTPUT</text>
                <text x="68" y="118" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">vendor: Global Logistics LLC</text>
                <text x="240" y="118" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">V-472 ✓</text>
                <text x="68" y="132" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">gl: Freight · 6100-2340</text>
                <text x="240" y="132" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">cited</text>
                <text x="68" y="146" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">approver: CFO · Named approver</text>
                <text x="240" y="146" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">named</text>
                <text x="68" y="160" fontFamily="Plus Jakarta Sans" fontSize="10" fontStyle="italic" fill="rgba(0,0,0,0.45)">4 sources cited · audit emitted · reversible</text>
              </svg>
            </div>

            <ul className="space-y-1.5 text-[18px] text-[rgba(0,0,0,0.75)]">
              <li className="flex gap-2"><span className="text-[#000000]">✓</span>Your masters, your taxonomy, your rules — joined at query time</li>
              <li className="flex gap-2"><span className="text-[#000000]">✓</span>Every field traceable to a source chunk</li>
              <li className="flex gap-2"><span className="text-[#000000]">✓</span>Full audit trail — reversible, defensible</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  C. Hallucination control — 4-wall gauntlet                  */
/* ============================================================ */
export function HallucinationControl() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const reduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  // indices: -1 = not started, 0 = candidate, 1..4 = walls, 5 = approved

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      // Light up all cards statically, skip traversal
      setActiveIdx(5);
      return;
    }
    const sequence = [0, 1, 2, 3, 4, 5];
    const stepMs = 400;
    const timers = sequence.map((idx, i) =>
      window.setTimeout(() => setActiveIdx(idx), i * stepMs)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  const walls = [
    {
      n: '01',
      title: 'Grounding',
      desc: 'Must cite a chunk from your private index.',
      gate: 'no source → reject',
      evidence: (
        <div className="space-y-2">
          <StatRow label="Rejected today" value="14" />
          <StatRow label="Passed" value="8,204" />
        </div>
      ),
    },
    {
      n: '02',
      title: 'Confidence',
      desc: 'Every field scored. Below θ → human review.',
      gate: 'low score → escalate',
      evidence: (
        <div className="space-y-2">
          <ScoreBar label="vendor" pct={99} />
          <ScoreBar label="gl" pct={95} />
          <ScoreBar label="amount" pct={72} flag />
        </div>
      ),
    },
    {
      n: '03',
      title: 'Cross-verify',
      desc: '2nd model validates the first. Disagree → escalate.',
      gate: 'agreement < θ → escalate',
      evidence: (
        <div className="space-y-2">
          <ModelChip name="Llama-70" role="primary" />
          <ModelChip name="Mistral-8x" role="verifier" />
          <StatRow label="Agreement" value="97.8%" />
          <StatRow label="Escalated" value="2.2%" />
        </div>
      ),
    },
    {
      n: '04',
      title: 'Schema lock',
      desc: 'Typed JSON. Invalid → rejected at runtime.',
      gate: 'schema fail → reject',
      evidence: (
        <pre className="text-[13px] leading-[1.5] font-mono text-black bg-[rgba(0,0,0,0.04)] rounded-[8px] p-3 overflow-x-auto">
{`{
  "vendor_id": "V-472",
  "amount": 13503.00,
  "gl": "6100-2340",
  "cite": ["inv:p2"],
  "conf": 0.98
}`}
        </pre>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s3)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>
            Hallucination control
          </div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Four walls, <span className="italic">not four prompts.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            A regulated workflow can't survive a 3% hallucination rate. Every artiGen output passes the same 4-layer gauntlet before it leaves the runtime.
          </p>
        </div>

        {/* Gauntlet row */}
        <div
          className={`flex flex-col lg:flex-row items-stretch gap-3 sr d-3 ${inView ? 'is-in' : ''}`}
        >
          <EndCard variant="candidate" active={activeIdx >= 0} />
          {walls.map((w, i) => (
            <div key={w.n} className="flex items-stretch gap-3 lg:contents">
              <Chevron />
              <WallCard {...w} active={activeIdx >= i + 1} />
            </div>
          ))}
          <Chevron />
          <EndCard variant="approved" active={activeIdx >= 5} />
        </div>

        {/* Metric strip — unchanged */}
        <div
          className={`max-w-[900px] mx-auto mt-10 rounded-[24px] p-8 grid grid-cols-3 gap-6 text-center sr d-4 ${inView ? 'is-in' : ''}`}
          style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div>
            <div className="font-display text-[48px] text-black">0.04<span className="text-[28px] text-[rgba(0,0,0,0.65)]">%</span></div>
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-1">silent error rate</div>
            <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">vs 3.2% on GPT-4 baseline</div>
          </div>
          <div>
            <div className="font-display text-[48px] text-black">100<span className="text-[28px] text-[rgba(0,0,0,0.65)]">%</span></div>
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-1">cited outputs</div>
            <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">zero ungrounded answers</div>
          </div>
          <div>
            <div className="font-display text-[48px] text-black">12<span className="text-[28px] text-[rgba(0,0,0,0.65)]">mo</span></div>
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-1">in regulated prod</div>
            <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">dental · auto · logistics</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Subcomponents for HallucinationControl --- */

function WallCard({
  n,
  title,
  desc,
  gate,
  evidence,
  active,
}: {
  n: string;
  title: string;
  desc: string;
  gate: string;
  evidence: React.ReactNode;
  active?: boolean;
}) {
  return (
    <motion.div
      animate={{
        boxShadow: active ? '0 0 0 2px #5b76fe' : '0 0 0 0px rgba(91,118,254,0)',
      }}
      transition={{ duration: active ? 0.2 : 0.4 }}
      className="flex-1 min-w-0 rounded-[20px] p-5"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold text-black"
          style={{ background: 'rgba(0,0,0,0.04)' }}
        >
          {n}
        </div>
        <div className="font-display text-[18px] text-black leading-tight">{title}</div>
      </div>
      <div className="text-[14px] text-[rgba(0,0,0,0.70)] leading-snug mb-3">{desc}</div>
      <div className="flex items-baseline gap-2 mb-3">
        <div className="micro-upper" style={{ color: 'rgba(0,0,0,0.50)' }}>
          Gate
        </div>
        <div className="text-[14px] text-black font-medium">{gate}</div>
      </div>
      <div>{evidence}</div>
    </motion.div>
  );
}

function EndCard({ variant, active }: { variant: 'candidate' | 'approved'; active?: boolean }) {
  const isCandidate = variant === 'candidate';
  return (
    <motion.div
      animate={{
        boxShadow: active ? '0 0 0 2px #5b76fe' : '0 0 0 0px rgba(91,118,254,0)',
      }}
      transition={{ duration: active ? 0.2 : 0.4 }}
      className="lg:w-[140px] rounded-[20px] p-5 flex flex-col justify-center"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="micro-upper mb-2" style={{ color: 'rgba(0,0,0,0.50)' }}>
        {isCandidate ? 'Candidate' : 'Approved'}
      </div>
      <div className="font-display text-[18px] text-black leading-tight mb-1">
        {isCandidate ? 'raw answer' : '✓ safe'}
      </div>
      <div className="text-[14px] text-[rgba(0,0,0,0.50)]">
        {isCandidate ? 'untrusted · unchecked' : 'safe to emit'}
      </div>
    </motion.div>
  );
}

function Chevron() {
  return (
    <div className="hidden lg:flex items-center text-[rgba(0,0,0,0.30)]" aria-hidden>
      <ChevronRight size={24} />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-baseline justify-between rounded-[8px] px-3 py-2"
      style={{ background: 'rgba(0,0,0,0.04)' }}
    >
      <div className="text-[13px] text-[rgba(0,0,0,0.60)]">{label}</div>
      <div className="text-[14px] font-bold text-black">{value}</div>
    </div>
  );
}

function ScoreBar({ label, pct, flag }: { label: string; pct: number; flag?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <div className="text-[13px] text-[rgba(0,0,0,0.60)] flex items-center gap-1">
          {label}
          {flag && <Flag size={12} className="text-[rgba(0,0,0,0.60)]" />}
        </div>
        <div className="text-[13px] font-bold text-black">{pct}%</div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'rgba(0,0,0,0.30)' }} />
      </div>
    </div>
  );
}

function ModelChip({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="flex items-baseline justify-between rounded-[8px] px-3 py-2"
      style={{ background: 'rgba(0,0,0,0.04)' }}
    >
      <div className="text-[14px] font-bold text-black">{name}</div>
      <div className="text-[13px] text-[rgba(0,0,0,0.50)]">{role}</div>
    </div>
  );
}

/* ============================================================ */
/*  D. Determinism proof — visual replay                        */
/* ============================================================ */
export function DeterminismProof() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s4)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>Deterministic by design</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Same input. <span className="italic">Same output. Every time.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Public LLMs are non-deterministic by default — run the same prompt twice, get two different answers. artiGen pins seeds, temperature, retrievers, and schemas so the same document produces the same voucher at 9 AM, noon, and midnight.
          </p>
        </div>

        {/* Visual: same input → 4 runs → same hash */}
        <div className={`max-w-[1400px] mx-auto rounded-[24px] p-10 sr ${inView ? 'is-in' : ''}`} style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <svg viewBox="0 0 1040 340" className="w-full">
            {/* Single input */}
            <rect x="14" y="130" width="130" height="80" rx="10" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
            <rect x="14" y="130" width="130" height="16" rx="10" fill="rgba(0,0,0,0.08)" />
            <text x="22" y="142" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">INPUT · IN-8892</text>
            <text x="22" y="160" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">Global Logistics LLC</text>
            <text x="22" y="172" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">USD 13,503.00</text>
            <text x="22" y="184" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.45)">hash: 7a2f…0e19</text>
            <text x="22" y="198" fontFamily="Plus Jakarta Sans" fontSize="10" fontStyle="italic" fill="rgba(0,0,0,0.45)">fed 4× throughout day</text>

            {/* Pinning core */}
            <g transform="translate(220, 110)">
              <rect x="0" y="0" width="180" height="120" rx="12" fill="rgba(0,0,0,0.04)" />
              <rect x="0" y="0" width="180" height="18" rx="12" fill="rgba(0,0,0,0.08)" />
              <text x="10" y="13" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">PINNING LAYER</text>
              <text x="10" y="34" fontFamily="monospace" fontSize="10" fill="#000000">temperature = 0</text>
              <text x="10" y="46" fontFamily="monospace" fontSize="10" fill="#000000">seed = 42</text>
              <text x="10" y="58" fontFamily="monospace" fontSize="10" fill="#000000">top_p = 1.0</text>
              <text x="10" y="70" fontFamily="monospace" fontSize="10" fill="#000000">retriever = idx_v12</text>
              <text x="10" y="82" fontFamily="monospace" fontSize="10" fill="#000000">model = llama-70-v4.2</text>
              <text x="10" y="94" fontFamily="monospace" fontSize="10" fill="#000000">schema = invoice.v3</text>
              <text x="10" y="106" fontFamily="monospace" fontSize="10" fill="#000000">replay_enabled = true</text>
            </g>

            {/* 4 run branches */}
            {[
              { y: 18, t: '09:14 AM', delay: '0s' },
              { y: 112, t: '11:47 AM', delay: '0.4s' },
              { y: 206, t: '02:22 PM', delay: '0.8s' },
              { y: 300, t: '06:08 PM', delay: '1.2s' },
            ].map((r, i) => (
              <g key={i}>
                {/* branch line */}
                <path
                  d={`M 402,170 C 452,170 452,${r.y + 26} 502,${r.y + 26}`}
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 3"
                />
                {/* output card */}
                <rect x="500" y={r.y} width="360" height="52" rx="8" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
                <text x="510" y={r.y + 16} fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">Run {String(i + 1).padStart(2, '0')} · {r.t}</text>
                <text x="510" y={r.y + 30} fontFamily="monospace" fontSize="10" fill="#000000">vendor_id: "V-472"</text>
                <text x="644" y={r.y + 30} fontFamily="monospace" fontSize="10" fill="#000000">amount: 13503.00</text>
                <text x="776" y={r.y + 30} fontFamily="monospace" fontSize="10" fill="#000000">gl: "6100-2340"</text>
                <text x="510" y={r.y + 44} fontFamily="monospace" fontSize="10" fill="rgba(0,0,0,0.45)">tol: 0.15% under · 2 sources cited</text>
                <text x="852" y={r.y + 44} textAnchor="end" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">✓ identical</text>
                {/* hash chip */}
                <rect x="880" y={r.y + 18} width="136" height="18" rx="9" fill="rgba(0,0,0,0.03)" />
                <text x="948" y={r.y + 30} textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#000000">sha256: 4a2f…0e19</text>
              </g>
            ))}

            {/* input→pinning arrow */}
            <line x1="144" y1="170" x2="218" y2="170" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>

          <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-[rgba(0,0,0,0.06)] pt-5">
            <div className="text-[18px] text-[rgba(0,0,0,0.65)]">
              <b className="text-black">All four runs hash-identical.</b> Replay harness runs last month's vouchers against today's build before every promote — regression caught pre-prod, never in prod.
            </div>
            <code className="capsule-light rounded-full whitespace-nowrap">
              4 / 4 identical · 0 drift
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  E. Scale at volume — throughput pipeline                    */
/* ============================================================ */
export function ScaleAtVolume() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  const metrics = [
    { n: '12,400', label: 'docs / hour', sub: 'peak · 1 rack' },
    { n: '< 2.4s', label: 'p95 latency', sub: 'end-to-end' },
    { n: '3.1M', label: 'docs / month', sub: '3 tenants' },
    { n: '99.94%', label: 'uptime SLA', sub: 'trailing 12mo' },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s5)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>Scale</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            From one document <span className="italic">to thousands per hour.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            A demo that handles one PDF is a parlor trick. Production means a Monday-morning backlog of 14,000 vouchers and an SLA that doesn't care about your weekend.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-4 max-w-[1400px] mx-auto mb-10">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`rounded-[20px] p-6 text-center sr ${inView ? 'is-in' : ''}`}
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-[44px] text-black leading-none">{m.n}</div>
              <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-2">{m.label}</div>
              <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline visual */}
        <div className={`max-w-[1400px] mx-auto rounded-[24px] p-10 sr d-3 ${inView ? 'is-in' : ''}`} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="micro-upper mb-1" style={{ color: 'rgba(0,0,0,0.50)' }}>Monday backlog · Thomson Group</div>
              <div className="font-display text-[28px] text-black">14,200 vouchers</div>
            </div>
            <div className="text-right">
              <div className="micro-upper mb-1" style={{ color: 'rgba(0,0,0,0.50)' }}>Cleared by</div>
              <div className="font-display text-[28px] text-black">10:42 AM</div>
            </div>
          </div>

          {/* Router fanout SVG */}
          <svg viewBox="0 0 1020 160" className="w-full mb-4">
            {/* Queue */}
            <rect x="10" y="50" width="160" height="60" rx="10" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.2" />
            <text x="90" y="72" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">QUEUE · 14,200</text>
            <g>
              {[0,1,2,3,4,5,6,7,8,9].map((i) => (
                <rect key={i} x={20 + i * 14} y={84} width="10" height="14" rx="1" fill="#000000" opacity={0.08 + (i % 4) * 0.04} />
              ))}
            </g>

            {/* Router */}
            <circle cx="260" cy="80" r="34" fill="rgba(0,0,0,0.08)" />
            <text x="260" y="78" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">ROUTER</text>
            <text x="260" y="90" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.40)">cost + complexity</text>
            <line x1="170" y1="80" x2="224" y2="80" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* 3 fanout lanes */}
            <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" fill="none" strokeDasharray="4 3">
              <path d="M294,68 C350,40 380,20 420,20" />
              <path d="M294,80 L420,80" />
              <path d="M294,92 C350,120 380,140 420,140" />
            </g>

            {/* Lane 1 — small */}
            <rect x="420" y="4" width="260" height="34" rx="8" fill="rgba(0,0,0,0.03)" />
            <text x="430" y="20" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">SMALL MODEL · 7B on-prem</text>
            <text x="430" y="30" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">invoices · simple vouchers · receipts</text>
            <rect x="600" y="4" width="80" height="34" rx="8" fill="rgba(0,0,0,0.08)" />
            <text x="640" y="20" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">11,820</text>
            <text x="640" y="30" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">83% · $0.0002/doc</text>

            {/* Lane 2 — medium */}
            <rect x="420" y="62" width="260" height="34" rx="8" fill="rgba(0,0,0,0.03)" />
            <text x="430" y="78" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">FRONTIER · Llama-70 / Mistral</text>
            <text x="430" y="88" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">cross-doc matches · handwritten · edge</text>
            <rect x="600" y="62" width="80" height="34" rx="8" fill="rgba(0,0,0,0.08)" />
            <text x="640" y="78" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">1,960</text>
            <text x="640" y="88" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">14% · $0.004/doc</text>

            {/* Lane 3 — human */}
            <rect x="420" y="120" width="260" height="34" rx="8" fill="rgba(0,0,0,0.03)" />
            <text x="430" y="136" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">HUMAN REVIEW</text>
            <text x="430" y="146" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">confidence &lt; θ · exception · flagged</text>
            <rect x="600" y="120" width="80" height="34" rx="8" fill="rgba(0,0,0,0.08)" />
            <text x="640" y="136" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">420</text>
            <text x="640" y="146" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="#000000">3% · 90s avg</text>

            {/* Converge */}
            <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" fill="none" strokeDasharray="4 3">
              <path d="M680,20 C740,20 760,60 800,80" />
              <path d="M680,80 L800,80" />
              <path d="M680,140 C740,140 760,100 800,80" />
            </g>

            {/* ERP */}
            <rect x="800" y="50" width="210" height="60" rx="10" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.2" />
            <text x="905" y="72" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">POSTED TO SAP</text>
            <text x="905" y="86" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" fill="#000000">14,200 · 0 errors</text>
            <text x="905" y="98" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(0,0,0,0.50)">audit trail emitted · reversible</text>
          </svg>

          {/* Throughput progress bar */}
          <div className="relative h-5 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(0,0,0,0.05)' }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: inView ? '100%' : '0%',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 100%)',
                transition: 'width 2.4s ease-out',
              }}
            />
          </div>
          <div className="grid grid-cols-5 text-[16px] text-[rgba(0,0,0,0.50)]">
            <div>06:00</div>
            <div>07:30</div>
            <div>09:00</div>
            <div>10:30</div>
            <div className="text-right text-[#000000]">done 10:42</div>
          </div>
        </div>
      </div>
    </section>
  );
}
