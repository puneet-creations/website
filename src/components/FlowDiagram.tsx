import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FlowDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<Array<SVGPathElement | null>>([]);

  const stages = [
    { n: '01', label: 'Document arrives', sub: 'PDF · email · audio · API',       color: 'rgba(255,120,120,0.06)', ink: '#ff9090' },
    { n: '02', label: 'artiGen reads & reasons', sub: 'Routes to right model · on-prem', color: 'rgba(138,245,192,0.06)', ink: '#8af5c0' },
    { n: '03', label: 'Acts on your systems',    sub: 'SAP · Epic · Salesforce · DMS',   color: 'rgba(160,220,140,0.06)', ink: '#a0dc8c' },
    { n: '04', label: 'Every answer cited',      sub: 'Audit trail · human approvals',   color: 'rgba(255,180,80,0.06)',  ink: '#ffd080' },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pre-set chevron arrows hidden (stroke-dashoffset === length)
      arrowRefs.current.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      // Pre-set pill invisible at starting position
      gsap.set(pillRef.current, { opacity: 0, x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      // Stages slide in from left sequentially
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.from(el, { x: -24, opacity: 0, duration: 0.4, ease: 'power2.out' }, i * 0.35);
      });

      // Chevron arrows draw in
      arrowRefs.current.forEach((path, i) => {
        if (!path) return;
        tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 0.2 + i * 0.15);
      });

      // Traveling document pill
      const pillTimeline = gsap.timeline();
      pillTimeline
        .set(pillRef.current, { opacity: 1 })
        .to(pillRef.current, {
          x: '100%',
          duration: 2.8,
          ease: 'power1.inOut',
          onUpdate: function () {
            const pct = this.progress();
            const stageIdx = Math.min(3, Math.floor(pct * 4));
            const el = stageRefs.current[stageIdx];
            if (el && !el.dataset.flashed) {
              el.dataset.flashed = 'true';
              gsap.fromTo(
                el,
                { boxShadow: '0 0 0 0 rgba(138,245,192,0.0)' },
                {
                  boxShadow: '0 0 0 3px rgba(138,245,192,0.5)',
                  duration: 0.15,
                  ease: 'power2.out',
                  yoyo: true,
                  repeat: 1,
                }
              );
            }
          },
        })
        .to(pillRef.current, { opacity: 0, duration: 0.2 });

      tl.add(pillTimeline, 1.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="flow" className="py-24" ref={sectionRef} style={{ background: 'var(--bg-s5)' }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[700px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>The flow</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            From first document to <span className="italic">live action in your systems.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            One arrow, four stages, zero rewrites. Every agent follows the same path.
          </p>
        </div>

        {/* Stages + traveling pill container */}
        <div className="relative mt-12">
          {/* Pill — absolutely positioned, travels across the 4-stage row */}
          <div
            ref={pillRef}
            aria-hidden
            className="absolute z-10 pointer-events-none"
            style={{
              top: 4,
              left: 16,
              width: 'calc(100% - 120px)',
              pointerEvents: 'none',
              opacity: 0,
            }}
          >
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: '#5b76fe',
                color: '#ffffff',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 4px 12px rgba(91,118,254,0.35)',
              }}
            >
              <span aria-hidden>📄</span>
              INV-8892
            </div>
          </div>

          <div className="relative grid lg:grid-cols-4 gap-4 lg:gap-0 items-stretch">
            {stages.map((s, i) => (
              <div key={s.n} className="relative flex items-stretch">
                <div
                  ref={(el) => { stageRefs.current[i] = el; }}
                  className="flex-1 p-7"
                  style={{ background: s.color, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 28 }}
                >
                  <div className="micro-upper mb-3" style={{ color: s.ink }}>Step {s.n}</div>
                  <div className="font-display text-[22px] leading-tight mb-2 text-black">{s.label}</div>
                  <div className="text-[14px] text-[rgba(0,0,0,0.65)] font-body">{s.sub}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className="hidden lg:flex items-center px-3 select-none" aria-hidden>
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                      <path
                        ref={(el) => { arrowRefs.current[i] = el; }}
                        d="M4 12 L34 12 M26 4 L34 12 L26 20"
                        stroke="#5b76fe"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
