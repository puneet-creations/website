import JourneyFlow from './JourneyFlow';

/**
 * FraudFlow — Fraud Intelligence (commercial-vehicle maker · 700 dealers).
 * 4 wide-format scenes. viewBox 1200×500.
 */
export default function FraudFlow() {
  return (
    <JourneyFlow
      stepLabels={['Score · 14 patterns at intake', 'Cite · evidence per flag', 'Decide · block or pay', 'Monitor · daily, not quarterly']}
      genericFail="Public LLMs cannot run 14 specialised fraud models per claim in under a second, and they cannot cite the exact photo/invoice/history that triggered the flag."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Every claim scored at upload · 14 fraud patterns checked simultaneously</text>

      {/* Incoming claim card */}
      <rect x="80" y="90" width="240" height="320" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(91,118,254,0.35)" />
      <rect x="80" y="90" width="240" height="36" rx="12" fill="rgba(91,118,254,0.10)" />
      <text x="200" y="113" fontSize="13" fontWeight="700" fill="#5b76fe" textAnchor="middle">DEALER CLAIM #44831</text>
      <text x="100" y="155" fontSize="12" fill="rgba(255,255,255,0.5)">Dealer:</text>
      <text x="100" y="173" fontSize="13" fill="rgba(255,255,255,0.85)">DLR-209 · Region SE</text>
      <text x="100" y="205" fontSize="12" fill="rgba(255,255,255,0.5)">Part:</text>
      <text x="100" y="223" fontSize="13" fill="rgba(255,255,255,0.85)">Turbo · CV-7821</text>
      <text x="100" y="255" fontSize="12" fill="rgba(255,255,255,0.5)">Photos:</text>
      <text x="100" y="273" fontSize="13" fill="rgba(255,255,255,0.85)">4 attached</text>
      <text x="100" y="305" fontSize="12" fill="rgba(255,255,255,0.5)">Invoice:</text>
      <text x="100" y="323" fontSize="13" fill="rgba(255,255,255,0.85)">₹ 84,200</text>
      <text x="100" y="355" fontSize="12" fill="rgba(255,255,255,0.5)">Submitted:</text>
      <text x="100" y="373" fontSize="13" fill="rgba(255,255,255,0.85)">0.4s ago</text>

      {/* Arrow */}
      <text x="360" y="255" fontSize="32" fill="rgba(255,255,255,0.3)" textAnchor="middle">→</text>

      {/* 14 patterns grid */}
      <text x="700" y="90" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.5)" textAnchor="middle">14 FRAUD PATTERNS · CHECKED IN PARALLEL</text>
      {[
        'Photo hash', 'Three-way match', 'Writer model', 'Vehicle history',
        'Ghost dealer', 'Time anomaly', 'Geo anomaly', 'Repeat claim',
        'Part mismatch', 'Cost outlier', 'Invoice forgery', 'Mileage gap',
        'Signature scan', 'Dealer pattern',
      ].map((p, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 420 + col * 165;
        const y = 110 + row * 70;
        return (
          <g key={p}>
            <rect x={x} y={y} width="155" height="58" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(138,245,192,0.20)" />
            <circle cx={x + 16} cy={y + 29} r="6" fill="#8af5c0" />
            <text x={x + 30} y={y + 33} fontSize="12" fill="rgba(255,255,255,0.85)">{p}</text>
          </g>
        );
      })}

      <rect x="280" y="440" width="640" height="40" rx="20" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="465" fontSize="14" fontWeight="700" fill="#8af5c0" textAnchor="middle">Result in &lt; 1 second · before payment</text>
    </svg>
  );
}

function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Each flag cited · the photo, invoice, or history that triggered it</text>

      <rect x="80" y="90" width="1040" height="370" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />

      <text x="120" y="125" fontSize="15" fontWeight="700" fill="#fff">FLAGGED · Dealer Claim #44831</text>
      <rect x="380" y="108" width="80" height="24" rx="12" fill="rgba(255,144,144,0.10)" stroke="rgba(255,144,144,0.30)" />
      <text x="420" y="125" fontSize="11" fontWeight="700" fill="#ff9090" textAnchor="middle">3 FLAGS</text>

      <line x1="100" y1="145" x2="1100" y2="145" stroke="rgba(255,255,255,0.08)" />

      {[
        { n: '01', flag: 'Photo hash match', cite: 'Same photo used in claim #41892 (DLR-209, 47 days ago)', sev: '#ff9090' },
        { n: '02', flag: 'Cost outlier', cite: 'Invoice ₹84,200 vs. regional median ₹62,400 (+35%)', sev: '#ffd080' },
        { n: '03', flag: 'Repeat claim pattern', cite: 'Same dealer + same part + 3 prior claims in 90 days', sev: '#ff9090' },
      ].map((r, i) => (
        <g key={r.n}>
          <rect x="120" y={170 + i * 90} width="960" height="76" rx="10" fill="rgba(255,255,255,0.02)" stroke={`${r.sev}30`} />
          <rect x="120" y={170 + i * 90} width="6" height="76" fill={r.sev} />
          <text x="150" y={195 + i * 90} fontSize="11" fontWeight="700" fill={r.sev}>{r.n} · {r.flag.toUpperCase()}</text>
          <text x="150" y={220 + i * 90} fontSize="14" fill="rgba(255,255,255,0.75)">Cite: {r.cite}</text>
        </g>
      ))}

      <rect x="280" y="442" width="640" height="16" rx="8" fill="rgba(255,255,255,0.04)" />
      <text x="600" y="455" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle">Approvers see the evidence before they decide</text>
    </svg>
  );
}

function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Clean claims pay automatically · flagged claims route to a named approver</text>

      {/* Two pipelines */}
      <rect x="80" y="90" width="490" height="340" rx="12" fill="rgba(138,245,192,0.05)" stroke="rgba(138,245,192,0.20)" />
      <text x="325" y="125" fontSize="14" fontWeight="700" fill="#8af5c0" textAnchor="middle">CLEAN · PAY AUTOMATICALLY</text>
      <text x="325" y="150" fontSize="12" fill="rgba(255,255,255,0.5)" textAnchor="middle">No flags · low risk score</text>

      {[
        { v: '#44829', amt: '₹ 24K', dlr: 'DLR-104' },
        { v: '#44830', amt: '₹ 18K', dlr: 'DLR-218' },
        { v: '#44832', amt: '₹ 62K', dlr: 'DLR-061' },
        { v: '#44833', amt: '₹ 38K', dlr: 'DLR-104' },
        { v: '#44834', amt: '₹ 91K', dlr: 'DLR-377' },
      ].map((c, i) => (
        <g key={c.v}>
          <rect x="100" y={170 + i * 46} width="450" height="38" rx="6" fill="rgba(255,255,255,0.03)" />
          <text x="115" y={193 + i * 46} fontSize="13" fontWeight="700" fill="#8af5c0">{c.v}</text>
          <text x="220" y={193 + i * 46} fontSize="13" fill="rgba(255,255,255,0.75)">{c.dlr}</text>
          <text x="500" y={193 + i * 46} fontSize="13" fontWeight="700" fill="#fff" textAnchor="end">{c.amt} · paid</text>
        </g>
      ))}

      <rect x="630" y="90" width="490" height="340" rx="12" fill="rgba(255,144,144,0.05)" stroke="rgba(255,144,144,0.20)" />
      <text x="875" y="125" fontSize="14" fontWeight="700" fill="#ff9090" textAnchor="middle">FLAGGED · ROUTE TO APPROVER</text>
      <text x="875" y="150" fontSize="12" fill="rgba(255,255,255,0.5)" textAnchor="middle">Evidence pack attached · named approver</text>

      {[
        { v: '#44831', amt: '₹ 84K', dlr: 'DLR-209', why: '3 flags' },
        { v: '#44827', amt: '₹ 142K', dlr: 'DLR-411', why: '2 flags' },
      ].map((c, i) => (
        <g key={c.v}>
          <rect x="650" y={170 + i * 56} width="450" height="48" rx="6" fill="rgba(255,255,255,0.03)" />
          <text x="665" y={195 + i * 56} fontSize="13" fontWeight="700" fill="#ff9090">{c.v}</text>
          <text x="770" y={195 + i * 56} fontSize="13" fill="rgba(255,255,255,0.75)">{c.dlr}</text>
          <text x="1080" y={195 + i * 56} fontSize="13" fontWeight="700" fill="#ff9090" textAnchor="end">{c.amt} · {c.why}</text>
        </g>
      ))}
    </svg>
  );
}

function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Quarterly audit becomes daily monitoring · repeat offenders surface in weeks</text>

      {/* Big stat cards */}
      {[
        { metric: '< 1s', label: 'TO FLAG AT INTAKE', sub: '14 patterns simultaneously', color: '#8af5c0', x: 90 },
        { metric: '15K', label: 'CLAIMS / MONTH', sub: '700 dealers · all scored', color: '#5b76fe', x: 440 },
        { metric: '3–5%', label: 'WARRANTY LEAKAGE CAUGHT', sub: 'Money saved before it leaves', color: '#ffd080', x: 790 },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y={100} width="320" height="200" rx="14" fill={`${m.color}10`} stroke={`${m.color}30`} />
          <text x={m.x + 160} y={170} fontSize="52" fontWeight="700" fill={m.color} textAnchor="middle">{m.metric}</text>
          <text x={m.x + 160} y={210} fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.65)" textAnchor="middle">{m.label}</text>
          <text x={m.x + 160} y={235} fontSize="12" fill="rgba(255,255,255,0.45)" textAnchor="middle">{m.sub}</text>
        </g>
      ))}

      <rect x="280" y="350" width="640" height="100" rx="20" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="385" fontSize="18" fontWeight="700" fill="#8af5c0" textAnchor="middle">Honest dealers paid faster · no audit queue</text>
      <text x="600" y="415" fontSize="14" fill="rgba(255,255,255,0.65)" textAnchor="middle">Audit becomes monitoring · dealer network cleaner in weeks</text>
      <text x="600" y="440" fontSize="13" fill="rgba(255,255,255,0.45)" textAnchor="middle">Live in automotive · 700 dealers</text>
    </svg>
  );
}
