import JourneyFlow from './JourneyFlow';

/**
 * PCRGraph — PCR Intelligence (Daimler Asia).
 * 4 wide-format scenes. viewBox 1200×500. 14px+ text.
 */
export default function PCRGraph() {
  return (
    <JourneyFlow
      stepLabels={['Ingest · PDF + XLSX + LOG', 'Normalize · shared taxonomy', 'Graph · root cause traced', '8D draft · routed to QE']}
      genericFail="Public LLMs cannot ingest PDF + Excel + DMS logs simultaneously or maintain a persistent knowledge graph."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">3 formats · 3 teams · 1 failure</text>

      {/* 3 document cards */}
      {[
        { title: 'PDF · Customer Report', color: '#c0392b', x: 40, lines: ['Vehicle: OM-654 2.0L', 'Complaint: metallic noise', 'at cold start', 'Dealer: replaced turbo hose'] },
        { title: 'XLSX · Workshop DMS', color: '#8af5c0', x: 420, lines: ['U-1182  17k  vib idle', 'U-1207  19k  turbo lag', 'U-1214  16k  whistle', '+287 more rows'] },
        { title: 'LOG · ECU Telemetry', color: '#ffd080', x: 800, lines: ['P0299 LOW_BOOST', 'WARN oil_p low', 'turbo_rpm 85k', 'FAIL oil_starv'] },
      ].map((d) => (
        <g key={d.title}>
          <rect x={d.x} y="70" width="360" height="280" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${d.color}30`} />
          <rect x={d.x} y="70" width="360" height="40" rx="10" fill={`${d.color}12`} />
          <text x={d.x + 20} y="96" fontSize="15" fontWeight="700" fill={d.color}>{d.title}</text>
          {d.lines.map((l, i) => (
            <text key={i} x={d.x + 20} y={140 + i * 30} fontSize="15" fill="rgba(255,255,255,0.75)" fontFamily="'JetBrains Mono',monospace">{l}</text>
          ))}
          <text x={d.x + 180} y="320" fontSize="14" fill={`${d.color}60`} textAnchor="middle">Supplier batch: MHI · W38</text>
        </g>
      ))}

      {/* Bottom: unified stream label */}
      <rect x="200" y="380" width="800" height="45" rx="22" fill="rgba(91,118,254,0.08)" stroke="rgba(91,118,254,0.15)" />
      <text x="600" y="408" fontSize="16" fontWeight="700" fill="#5b76fe" textAnchor="middle">OCR + PDF parse + XLSX + log tail → unified stream</text>

      {/* Arrows down */}
      {[220, 600, 980].map((x) => (
        <line key={x} x1={x} y1="350" x2={x} y2="378" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
      ))}
    </svg>
  );
}

function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Private taxonomy collapses 3 vocabularies into one</text>

      {/* 3 input vocabularies */}
      {[
        { label: 'PDF · customer', term: '"metallic engine noise"', color: '#c0392b', x: 60 },
        { label: 'XLSX · workshop', term: '"vib at idle / turbo lag"', color: '#8af5c0', x: 440 },
        { label: 'LOG · ECU', term: '"P0299 low boost · oil_p"', color: '#ffd080', x: 820 },
      ].map((v) => (
        <g key={v.label}>
          <rect x={v.x} y="70" width="320" height="80" rx="8" fill={`${v.color}08`} stroke={`${v.color}20`} />
          <text x={v.x + 20} y="100" fontSize="14" fontWeight="600" fill={v.color}>{v.label}</text>
          <text x={v.x + 20} y="125" fontSize="15" fill="rgba(255,255,255,0.75)" fontFamily="'JetBrains Mono',monospace">{v.term}</text>
        </g>
      ))}

      {/* Arrows converging */}
      {[220, 600, 980].map((x) => (
        <line key={x} x1={x} y1="150" x2="600" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
      ))}

      {/* Normalized entity */}
      <rect x="200" y="200" width="800" height="260" rx="12" fill="rgba(91,118,254,0.04)" stroke="rgba(91,118,254,0.12)" />
      <rect x="200" y="200" width="800" height="45" rx="12" fill="rgba(91,118,254,0.10)" />
      <text x="600" y="228" fontSize="17" fontWeight="700" fill="#5b76fe" textAnchor="middle">NORMALIZED ENTITY</text>

      {[
        { field: 'part_id', value: 'TRB-OM654-V2', y: 280 },
        { field: 'failure_mode', value: 'oil_starvation', y: 310 },
        { field: 'location', value: 'turbo_inlet', y: 340 },
        { field: 'severity', value: 'HIGH · field-stop', y: 370 },
        { field: 'batch', value: 'MHI-2025-W38', y: 400 },
      ].map((f) => (
        <g key={f.field}>
          <text x="260" y={f.y} fontSize="15" fill="rgba(255,255,255,0.5)" fontFamily="'JetBrains Mono',monospace">{f.field}</text>
          <text x="520" y={f.y} fontSize="16" fontWeight="600" fill="#fff" fontFamily="'JetBrains Mono',monospace">{f.value}</text>
        </g>
      ))}

      <text x="600" y="440" fontSize="14" fill="rgba(91,118,254,0.6)" textAnchor="middle">Taxonomy: Daimler Q-Codes v4.2 · 12,400 failure modes</text>
    </svg>
  );
}

function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Knowledge graph traces fault to supplier batch</text>

      {/* Graph nodes */}
      {[
        { label: 'TRB-OM654', x: 200, y: 150, r: 35, color: '#8af5c0' },
        { label: 'oil_starv', x: 500, y: 120, r: 30, color: '#ff9090' },
        { label: 'OM-654', x: 350, y: 280, r: 28, color: '#5b76fe' },
        { label: 'MHI', x: 700, y: 200, r: 32, color: '#ffd080' },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}12`} stroke={n.color} strokeWidth="2" />
          <text x={n.x} y={n.y + 5} fontSize="14" fontWeight="600" fill={n.color} textAnchor="middle">{n.label}</text>
        </g>
      ))}

      {/* Edges */}
      <line x1="235" y1="150" x2="470" y2="120" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="230" y1="175" x2="330" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="530" y1="130" x2="670" y2="190" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="380" y1="280" x2="670" y2="210" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Root cause box */}
      <rect x="820" y="80" width="340" height="180" rx="12" fill="rgba(255,144,144,0.06)" stroke="rgba(255,144,144,0.20)" strokeWidth="2" />
      <text x="840" y="115" fontSize="14" fontWeight="700" fill="#ff9090">ROOT CAUSE</text>
      <text x="840" y="145" fontSize="18" fontWeight="700" fill="#fff">Oil feed restrictor</text>
      <text x="840" y="170" fontSize="16" fill="rgba(255,255,255,0.7)">undersized · batch W38</text>
      <line x1="840" y1="185" x2="1140" y2="185" stroke="rgba(255,255,255,0.06)" />
      <text x="840" y="210" fontSize="15" fill="#ffd080" fontWeight="600">Batch MHI-2025-W38</text>
      <text x="840" y="235" fontSize="14" fill="rgba(255,255,255,0.6)">1,284 units · 93 reports · 7.2% rate</text>

      {/* Bottom proof */}
      <rect x="820" y="290" width="340" height="45" rx="22" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="990" y="318" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">Cited from 1.2M indexed PCRs</text>

      {/* Hours not weeks */}
      <rect x="100" y="380" width="400" height="80" rx="10" fill="rgba(138,245,192,0.04)" stroke="rgba(138,245,192,0.10)" />
      <text x="300" y="415" fontSize="32" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">Hours</text>
      <text x="300" y="440" fontSize="15" fill="rgba(255,255,255,0.5)" textAnchor="middle">not weeks</text>

      <rect x="550" y="380" width="400" height="80" rx="10" fill="rgba(91,118,254,0.04)" stroke="rgba(91,118,254,0.10)" />
      <text x="750" y="415" fontSize="32" fontWeight="700" fill="#5b76fe" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">1.2M</text>
      <text x="750" y="440" fontSize="15" fill="rgba(255,255,255,0.5)" textAnchor="middle">PCRs indexed</text>
    </svg>
  );
}

function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />

      {/* 8D Report */}
      <rect x="60" y="40" width="700" height="420" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(142,166,255,0.12)" />
      <rect x="60" y="40" width="700" height="45" rx="12" fill="rgba(142,166,255,0.08)" />
      <text x="90" y="70" fontSize="16" fontWeight="700" fill="#8ea6ff" fontFamily="'JetBrains Mono',monospace">8D REPORT · DRAFT · PCR-88421</text>

      {[
        { d: 'D1', label: 'Team', value: 'Powertrain · SEA QE · MHI rep' },
        { d: 'D2', label: 'Problem', value: 'Turbo oil starvation · W38' },
        { d: 'D3', label: 'Contain', value: 'Stop-ship 1,284 units · SEA' },
        { d: 'D4', label: 'Root', value: 'Oil restrictor undersized' },
        { d: 'D5', label: 'Correct', value: 'Spec Ø1.8 → 2.1mm' },
        { d: 'D6', label: 'Verify', value: '200hr bench endurance' },
        { d: 'D7', label: 'Prevent', value: '100% incoming bore QC' },
        { d: 'D8', label: 'Close', value: 'Awaiting QE sign-off' },
      ].map((r, i) => (
        <g key={r.d}>
          <text x="90" y={120 + i * 40} fontSize="14" fontWeight="700" fill="#8ea6ff" fontFamily="'JetBrains Mono',monospace">{r.d}</text>
          <text x="140" y={120 + i * 40} fontSize="15" fontWeight="600" fill="rgba(255,255,255,0.7)">{r.label}</text>
          <text x="300" y={120 + i * 40} fontSize="15" fill="#fff">{r.value}</text>
        </g>
      ))}

      {/* Routed badge */}
      <rect x="820" y="60" width="340" height="200" rx="12" fill="rgba(142,166,255,0.06)" stroke="rgba(142,166,255,0.15)" />
      <text x="990" y="100" fontSize="16" fontWeight="700" fill="#8ea6ff" textAnchor="middle">ROUTED TO</text>

      <circle cx="920" cy="160" r="30" fill="rgba(142,166,255,0.12)" stroke="#8ea6ff" strokeWidth="2" />
      <text x="920" y="167" fontSize="16" fontWeight="700" fill="#8ea6ff" textAnchor="middle">QE</text>
      <text x="990" y="145" fontSize="15" fill="#fff">Quality Engineering</text>
      <text x="990" y="168" fontSize="14" fill="rgba(255,255,255,0.5)">Stuttgart HQ</text>
      <text x="990" y="195" fontSize="14" fill="rgba(255,255,255,0.5)">SLA: 24h · cited evidence</text>
      <text x="990" y="225" fontSize="14" fill="#8af5c0">✓ auto-routed by artiGen</text>

      {/* Bottom metrics */}
      <rect x="820" y="290" width="340" height="170" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="990" y="330" fontSize="36" fontWeight="700" fill="#8ea6ff" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">1.2M</text>
      <text x="990" y="360" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">REPORTS INDEXED</text>
      <text x="990" y="400" fontSize="24" fontWeight="700" fill="#8af5c0" textAnchor="middle">Hours, not weeks</text>
      <text x="990" y="425" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">Root cause · 8D draft · auto-filled</text>
    </svg>
  );
}
