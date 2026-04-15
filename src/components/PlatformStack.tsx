import { useInView } from '../hooks/useInView';

export default function PlatformStack() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const layers = [
    { n: '01', title: 'Sovereign runtime',        sub: 'On-prem · air-gapped · your hardware',            color: 'rgba(138,245,192,0.06)', border: 'rgba(138,245,192,0.12)', ink: '#000000' },
    { n: '02', title: 'Model router',             sub: 'Right model per task · small → frontier',         color: 'rgba(245,168,212,0.06)', border: 'rgba(245,168,212,0.12)', ink: '#000000' },
    { n: '03', title: 'Hallucination control',    sub: '4-layer citation · grounding · confidence gates', color: 'rgba(255,120,120,0.06)', border: 'rgba(255,120,120,0.12)', ink: '#000000' },
    { n: '04', title: 'Enterprise connectors',    sub: 'SAP · Epic · Salesforce · DMS · Oracle',          color: 'rgba(255,180,80,0.06)',  border: 'rgba(255,180,80,0.12)',  ink: '#000000' },
    { n: '05', title: 'Governance',               sub: 'Audit trail · approvals · RBAC · reversible',     color: 'rgba(160,220,140,0.06)', border: 'rgba(160,220,140,0.12)', ink: '#000000' },
    { n: '06', title: 'Security & compliance',    sub: 'GDPR · HIPAA · SOC 2 · ISO 27001 · PCI DSS',      color: 'rgba(255,120,120,0.06)', border: 'rgba(255,120,120,0.12)', ink: '#000000' },
  ];
  return (
    <section id="layers" className="py-24" ref={ref} style={{ background: 'var(--bg-s2)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[720px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>The platform</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Six shared layers. <span className="italic">Every agent plugs in.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            This is the base. Build one agent and you get five. Build five and the sixth is almost free.
          </p>
        </div>

        <div className="relative max-w-[760px] mx-auto">
          {layers.map((layer, i) => (
            <div
              key={layer.n}
              className={`relative flex items-center gap-6 px-8 py-6 mb-3 comet-slide-l ${inView ? 'is-in' : ''}`}
              style={{
                background: layer.color,
                border: `1px solid ${layer.border}`,
                borderRadius: 24,
                marginLeft: `${i * 28}px`,
                width: `calc(100% - ${i * 28}px)`,
                transitionDelay: `${i * 110}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-[14px] flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.04)', color: layer.ink }}
              >
                {layer.n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[20px] leading-tight text-black">{layer.title}</div>
                <div className="text-[13.5px] text-[rgba(0,0,0,0.55)] font-body mt-0.5">{layer.sub}</div>
              </div>
              <div className="micro-upper text-[rgba(0,0,0,0.30)] hidden md:block">shared</div>
            </div>
          ))}

          <div
            className={`relative flex items-center gap-6 px-8 py-6 border-2 border-dashed comet-slide-l ${inView ? 'is-in' : ''}`}
            style={{
              borderColor: '#5b76fe',
              background: 'rgba(91,118,254,0.06)',
              borderRadius: 24,
              marginLeft: `${layers.length * 28}px`,
              width: `calc(100% - ${layers.length * 28}px)`,
              transitionDelay: `${layers.length * 110}ms`,
            }}
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-450 text-blue-450 flex items-center justify-center font-display text-[22px] flex-shrink-0">+</div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-[20px] text-blue-450 italic">Your next agent</div>
              <div className="text-[13.5px] text-[rgba(0,0,0,0.65)] font-body mt-0.5">Plugs into the same base. Live in 4 weeks.</div>
            </div>
            <a href="mailto:hello@attentions.ai" className="text-blue-450 font-display font-semibold text-[14px] hidden md:inline-flex">Scope it →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
