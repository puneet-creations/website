import JourneyFlow from './JourneyFlow';

/**
 * TenderFlow — Tender Intelligence (real-estate developer · Mumbai).
 * 4 wide-format scenes. viewBox 1200×500.
 */
export default function TenderFlow() {
  return (
    <JourneyFlow
      stepLabels={['Read · Excel + doc + scan', 'Standardise · one true landed cost', 'Compare · benchmark vs paid + gov rate', 'Award · one-page decision pack']}
      genericFail="Public LLMs cannot read mixed-format quotes and reconcile tax, freight, retention, and payment terms into one comparable landed cost."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Every quote in any format · Excel · document · scan</text>

      {[
        { title: 'Vendor A · XLS', color: '#8af5c0', x: 80 },
        { title: 'Vendor B · DOC', color: '#5b76fe', x: 320 },
        { title: 'Vendor C · PDF', color: '#ffd080', x: 560 },
        { title: 'Vendor D · SCAN', color: '#f5a8d4', x: 800 },
        { title: 'Vendor E · EML', color: '#a0dc8c', x: 1040 },
      ].map((d) => (
        <g key={d.title}>
          <rect x={d.x} y={90} width="140" height="220" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${d.color}25`} />
          <rect x={d.x} y={90} width="140" height="36" rx="10" fill={`${d.color}10`} />
          <text x={d.x + 70} y={113} fontSize="13" fontWeight="700" fill={d.color} textAnchor="middle">{d.title}</text>
          {[0, 1, 2, 3, 4, 5].map((l) => (
            <rect key={l} x={d.x + 12} y={140 + l * 22} width={80 + ((l * 17) % 50)} height="6" rx="3" fill="rgba(255,255,255,0.06)" />
          ))}
        </g>
      ))}

      <text x="600" y="370" fontSize="24" fill="rgba(255,255,255,0.2)" textAnchor="middle">↓</text>

      <rect x="280" y="395" width="640" height="50" rx="25" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="425" fontSize="16" fontWeight="700" fill="#8af5c0" textAnchor="middle">Specs · supplier · freight · retention · payment terms extracted</text>
    </svg>
  );
}

function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">One true landed cost · tax + freight + retention + terms included</text>

      {/* Comparison table */}
      <rect x="80" y="90" width="1040" height="320" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />

      {/* Column headers */}
      {['Vendor', 'Quote', '+ Tax', '+ Freight', '+ Retention', 'Landed Cost'].map((h, i) => (
        <text key={h} x={120 + i * 175} y={125} fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.6)">{h}</text>
      ))}

      <line x1="100" y1="140" x2="1100" y2="140" stroke="rgba(255,255,255,0.10)" />

      {[
        { v: 'Vendor A', q: '₹ 12.4L', tax: '+18%', fr: '+₹ 80K', rt: '+5%', lc: '₹ 17.2L', color: '#8af5c0' },
        { v: 'Vendor B', q: '₹ 11.9L', tax: '+18%', fr: '+₹ 95K', rt: '+5%', lc: '₹ 16.8L', color: '#5b76fe' },
        { v: 'Vendor C', q: '₹ 13.1L', tax: '+18%', fr: '+₹ 60K', rt: '+5%', lc: '₹ 17.7L', color: '#ffd080' },
        { v: 'Vendor D', q: '₹ 11.2L', tax: '+18%', fr: '+₹ 1.4L', rt: '+5%', lc: '₹ 17.0L', color: '#f5a8d4' },
      ].map((r, i) => (
        <g key={r.v}>
          <text x="120" y={175 + i * 50} fontSize="14" fontWeight="600" fill={r.color}>{r.v}</text>
          <text x="295" y={175 + i * 50} fontSize="14" fill="rgba(255,255,255,0.85)">{r.q}</text>
          <text x="470" y={175 + i * 50} fontSize="14" fill="rgba(255,255,255,0.65)">{r.tax}</text>
          <text x="645" y={175 + i * 50} fontSize="14" fill="rgba(255,255,255,0.65)">{r.fr}</text>
          <text x="820" y={175 + i * 50} fontSize="14" fill="rgba(255,255,255,0.65)">{r.rt}</text>
          <text x="995" y={175 + i * 50} fontSize="14" fontWeight="700" fill="#fff">{r.lc}</text>
        </g>
      ))}

      <rect x="280" y="430" width="640" height="40" rx="20" fill="rgba(255,208,128,0.06)" stroke="rgba(255,208,128,0.10)" />
      <text x="600" y="455" fontSize="14" fill="#ffd080" textAnchor="middle">Apples-to-apples comparison · vendor compliance verified</text>
    </svg>
  );
}

function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Benchmarked against past paid rates + government rate cards</text>

      {[
        { y: 110, label: 'Past paid (last 12 months)', value: '₹ 17.4L median', color: '#5b76fe' },
        { y: 180, label: 'Government rate card', value: '₹ 17.6L', color: '#ffd080' },
        { y: 250, label: 'This tender · awarded', value: '₹ 16.8L', color: '#8af5c0' },
      ].map((r) => (
        <g key={r.label}>
          <rect x="120" y={r.y} width="960" height="50" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${r.color}25`} />
          <rect x="120" y={r.y} width="6" height="50" fill={r.color} />
          <text x="160" y={r.y + 22} fontSize="13" fontWeight="700" fill={r.color}>{r.label}</text>
          <text x="160" y={r.y + 42} fontSize="14" fill="rgba(255,255,255,0.65)">{r.value}</text>
          <text x="1040" y={r.y + 32} fontSize="18" fontWeight="700" fill={r.color} textAnchor="end">●</text>
        </g>
      ))}

      <rect x="200" y="370" width="800" height="80" rx="40" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.20)" />
      <text x="600" y="405" fontSize="22" fontWeight="700" fill="#8af5c0" textAnchor="middle">4–8% saved on every PO awarded</text>
      <text x="600" y="430" fontSize="14" fill="rgba(255,255,255,0.6)" textAnchor="middle">Faster tenders · lower cost · fewer disputes</text>
    </svg>
  );
}

function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">One-page decision pack · cited reasons for the committee</text>

      <rect x="80" y="80" width="1040" height="320" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />

      <text x="120" y="120" fontSize="16" fontWeight="700" fill="#fff">AWARD RECOMMENDATION</text>
      <text x="120" y="148" fontSize="14" fill="rgba(255,255,255,0.6)">Project: Residential Tower B · Phase 2 fit-out</text>

      <line x1="100" y1="170" x2="1100" y2="170" stroke="rgba(255,255,255,0.08)" />

      {[
        { l: 'Selected vendor', v: 'Vendor B', color: '#8af5c0' },
        { l: 'Landed cost', v: '₹ 16.8L', color: '#fff' },
        { l: 'Savings vs benchmark', v: '6.2% · ₹ 1.06L', color: '#8af5c0' },
        { l: 'Compliance', v: 'GST · PAN · MSME verified', color: '#fff' },
        { l: 'Cited evidence', v: '4 quotes · 1 gov rate card · 12 past POs', color: '#ffd080' },
      ].map((r, i) => (
        <g key={r.l}>
          <text x="120" y={210 + i * 36} fontSize="13" fontWeight="600" fill="rgba(255,255,255,0.5)">{r.l.toUpperCase()}</text>
          <text x="500" y={210 + i * 36} fontSize="15" fontWeight="600" fill={r.color}>{r.v}</text>
        </g>
      ))}

      <rect x="280" y="425" width="640" height="45" rx="22" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="453" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">Live in real estate · Mumbai · ₹ crores awarded monthly</text>
    </svg>
  );
}
