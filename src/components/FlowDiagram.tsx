import { useInView } from '../hooks/useInView';

export default function FlowDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const stages = [
    { n: '01', label: 'Document arrives', sub: 'PDF · email · audio · API', color: 'rgba(255,120,120,0.06)', ink: '#ff9090' },
    { n: '02', label: 'artiGen reads & reasons', sub: 'Routes to right model · on-prem', color: 'rgba(138,245,192,0.06)', ink: '#8af5c0' },
    { n: '03', label: 'Acts on your systems', sub: 'SAP · Epic · Salesforce · DMS', color: 'rgba(160,220,140,0.06)', ink: '#a0dc8c' },
    { n: '04', label: 'Every answer cited', sub: 'Audit trail · human approvals', color: 'rgba(255,180,80,0.06)', ink: '#ffd080' },
  ];
  return (
    <section id="flow" className="py-24" ref={ref} style={{ background: 'var(--bg-s5)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[700px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>The flow</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            From first document to <span className="italic">live action in your systems.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            One arrow, four stages, zero rewrites. Every agent follows the same path.
          </p>
        </div>

        <div className="relative mt-12 grid lg:grid-cols-4 gap-4 lg:gap-0 items-stretch">
          {stages.map((s, i) => (
            <div key={s.n} className="relative flex items-stretch">
              <div
                className={`flex-1 p-7 sr d-${i + 2} ${inView ? 'is-in' : ''}`}
                style={{ background: s.color, borderRadius: 28, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="micro-upper mb-3" style={{ color: s.ink }}>Step {s.n}</div>
                <div className="font-display text-[22px] leading-tight mb-2 text-black">{s.label}</div>
                <div className="text-[14px] text-[rgba(0,0,0,0.65)] font-body">{s.sub}</div>
              </div>
              {i < stages.length - 1 && (
                <div className={`hidden lg:flex items-center px-3 text-blue-450 text-3xl font-semibold select-none sr d-${i + 3} ${inView ? 'is-in' : ''}`} aria-hidden>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
