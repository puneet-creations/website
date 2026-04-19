import JourneyFlow from './JourneyFlow';

/**
 * VoucherStack — Voucher Matching (Thomson Group UAE).
 * 4 wide-format scenes. viewBox 1200×500.
 */
export default function VoucherStack() {
  return (
    <JourneyFlow
      stepLabels={['Ingest · 6 doc types', 'Classify · cross-reference', 'Correlate · line-by-line', 'Summarize · pre-payment flags']}
      genericFail="Public LLMs cannot cross-reference 6 document types in a 200-page voucher packet with tolerance rules."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">6 document types per voucher packet · any order</text>

      {[
        { title: 'Cheque', color: '#8af5c0', x: 60 },
        { title: 'Purchase Order', color: '#5b76fe', x: 260 },
        { title: 'GRN', color: '#ffd080', x: 460 },
        { title: 'Invoice', color: '#f5a8d4', x: 660 },
        { title: 'SOW', color: '#8ea6ff', x: 860 },
        { title: 'Contract', color: '#a0dc8c', x: 1020 },
      ].map((d, i) => (
        <g key={d.title}>
          <rect x={d.x} y={80 + (i % 2) * 30} width="160" height="200" rx="8" fill="rgba(255,255,255,0.03)" stroke={`${d.color}25`} />
          <rect x={d.x} y={80 + (i % 2) * 30} width="160" height="35" rx="8" fill={`${d.color}10`} />
          <text x={d.x + 80} y={103 + (i % 2) * 30} fontSize="14" fontWeight="700" fill={d.color} textAnchor="middle">{d.title}</text>
          {/* Fake content lines */}
          {[0, 1, 2, 3, 4].map((l) => (
            <rect key={l} x={d.x + 15} y={130 + (i % 2) * 30 + l * 22} width={80 + (l * 13) % 60} height="8" rx="4" fill="rgba(255,255,255,0.06)" />
          ))}
        </g>
      ))}

      {/* Arrow down */}
      <text x="600" y="360" fontSize="24" fill="rgba(255,255,255,0.2)" textAnchor="middle">↓</text>

      <rect x="300" y="380" width="600" height="50" rx="25" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="410" fontSize="16" fontWeight="700" fill="#8af5c0" textAnchor="middle">200-page packets · all formats · any order</text>

      <rect x="300" y="440" width="600" height="35" rx="17" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="600" y="462" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">Previously: 2 hours per voucher · 4 AP clerks · manual</text>
    </svg>
  );
}

function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Each document classified · vendor and cross-ref IDs extracted</text>

      <rect x="60" y="80" width="1080" height="380" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="90" y="115" fontSize="16" fontWeight="700" fill="#8af5c0">CLASSIFICATION RESULT</text>

      {/* Table header */}
      <text x="100" y="155" fontSize="14" fontWeight="600" fill="rgba(255,255,255,0.5)">DOC TYPE</text>
      <text x="300" y="155" fontSize="14" fontWeight="600" fill="rgba(255,255,255,0.5)">ID</text>
      <text x="550" y="155" fontSize="14" fontWeight="600" fill="rgba(255,255,255,0.5)">VENDOR</text>
      <text x="800" y="155" fontSize="14" fontWeight="600" fill="rgba(255,255,255,0.5)">CROSS-REF</text>
      <text x="1050" y="155" fontSize="14" fontWeight="600" fill="rgba(255,255,255,0.5)">CONF</text>
      <line x1="90" y1="165" x2="1110" y2="165" stroke="rgba(255,255,255,0.06)" />

      {[
        { type: 'Cheque', id: 'CHQ-9941', vendor: 'V-00472', xref: 'INV-8814', conf: '97%', color: '#8af5c0' },
        { type: 'Purchase Order', id: 'PO-4473', vendor: 'V-00472', xref: 'GRN-8821', conf: '99%', color: '#5b76fe' },
        { type: 'GRN', id: 'GRN-8821', vendor: 'V-00472', xref: 'PO-4473', conf: '98%', color: '#ffd080' },
        { type: 'Invoice', id: 'INV-8814', vendor: 'Global Logistics', xref: 'PO-4473', conf: '96%', color: '#f5a8d4' },
        { type: 'SOW', id: 'SOW-2024-112', vendor: 'V-00472', xref: 'PO-4473', conf: '94%', color: '#8ea6ff' },
        { type: 'Delivery Note', id: 'DN-5521', vendor: 'V-00472', xref: 'GRN-8821', conf: '95%', color: '#a0dc8c' },
      ].map((r, i) => (
        <g key={r.id}>
          <text x="100" y={195 + i * 35} fontSize="15" fontWeight="600" fill={r.color}>{r.type}</text>
          <text x="300" y={195 + i * 35} fontSize="15" fill="#fff" fontFamily="'JetBrains Mono',monospace">{r.id}</text>
          <text x="550" y={195 + i * 35} fontSize="15" fill="rgba(255,255,255,0.7)">{r.vendor}</text>
          <text x="800" y={195 + i * 35} fontSize="15" fill="rgba(255,255,255,0.6)" fontFamily="'JetBrains Mono',monospace">{r.xref}</text>
          <text x="1050" y={195 + i * 35} fontSize="15" fill="#8af5c0">{r.conf}</text>
        </g>
      ))}

      <rect x="90" y="410" width="1030" height="35" rx="17" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="432" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">6 / 6 classified · all cross-references resolved ✓</text>
    </svg>
  );
}

function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Line-by-line correlation · ±2% tolerance · mismatches flagged</text>

      <rect x="60" y="80" width="540" height="380" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(138,245,192,0.10)" />
      <text x="90" y="115" fontSize="16" fontWeight="700" fill="#8af5c0">LINE CORRELATION</text>

      {[
        { line: 'Port clearance', inv: '$5,830', po: '$5,830', status: '✓ exact', color: '#8af5c0' },
        { line: 'Inland freight', inv: '$5,120', po: '$5,200', status: '✓ 1.5% under', color: '#ffd080' },
        { line: 'Documentation', inv: '$1,910', po: '$1,910', status: '✓ exact', color: '#8af5c0' },
      ].map((l, i) => (
        <g key={l.line}>
          <rect x="90" y={135 + i * 70} width="480" height="55" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
          <text x="110" y={165 + i * 70} fontSize="15" fill="#fff">{l.line}</text>
          <text x="340" y={155 + i * 70} fontSize="14" fill="rgba(255,255,255,0.5)">INV</text>
          <text x="340" y={175 + i * 70} fontSize="16" fill="#fff" fontFamily="'JetBrains Mono',monospace">{l.inv}</text>
          <text x="440" y={155 + i * 70} fontSize="14" fill="rgba(255,255,255,0.5)">PO</text>
          <text x="440" y={175 + i * 70} fontSize="16" fill="#fff" fontFamily="'JetBrains Mono',monospace">{l.po}</text>
          <text x="540" y={165 + i * 70} fontSize="14" fill={l.color} textAnchor="end">{l.status}</text>
        </g>
      ))}

      <rect x="90" y="360" width="480" height="40" rx="8" fill="rgba(138,245,192,0.06)" stroke="rgba(138,245,192,0.10)" />
      <text x="330" y="385" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">Total: $12,860 vs $12,940 · 0.6% under ✓</text>

      <rect x="90" y="415" width="480" height="35" rx="17" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.20)" />
      <text x="330" y="437" fontSize="14" fontWeight="700" fill="#8af5c0" textAnchor="middle">TOLERANCE ±2% · WITHIN RANGE · READY</text>

      {/* Right: summary */}
      <rect x="660" y="80" width="480" height="380" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="900" y="130" fontSize="36" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">5 min</text>
      <text x="900" y="165" fontSize="16" fill="rgba(255,255,255,0.6)" textAnchor="middle">per voucher (was 2 hours)</text>

      <line x1="720" y1="190" x2="1080" y2="190" stroke="rgba(255,255,255,0.06)" />

      <text x="900" y="230" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle">Pre-payment checks</text>
      {['✓ Vendor match across all 6 docs', '✓ Amount within ±2% tolerance', '✓ Line items correlated', '✓ No duplicate payments detected', '✓ Contract terms validated'].map((c, i) => (
        <text key={i} x="720" y={270 + i * 30} fontSize="15" fill="rgba(255,255,255,0.7)">{c}</text>
      ))}

      <rect x="720" y="420" width="360" height="30" rx="15" fill="rgba(255,208,128,0.08)" stroke="rgba(255,208,128,0.12)" />
      <text x="900" y="440" fontSize="14" fontWeight="700" fill="#ffd080" textAnchor="middle">0 incorrect payments released</text>
    </svg>
  );
}

function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="50" fontSize="22" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Georgia,serif">Voucher matched · payment approved · audit complete</text>

      {[
        { metric: '5 min', label: 'PER VOUCHER', sub: 'Was 2 hours', color: '#8af5c0', x: 80 },
        { metric: '24×', label: 'FASTER', sub: '200-page packets', color: '#ffd080', x: 440 },
        { metric: '0', label: 'MISMATCHES MISSED', sub: 'Pre-payment detection', color: '#5b76fe', x: 800 },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y="80" width="320" height="130" rx="12" fill={`${m.color}08`} stroke={`${m.color}15`} />
          <text x={m.x + 160} y="130" fontSize="40" fontWeight="700" fill={m.color} textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">{m.metric}</text>
          <text x={m.x + 160} y="160" fontSize="14" fontWeight="700" fill="rgba(255,255,255,0.6)" textAnchor="middle">{m.label}</text>
          <text x={m.x + 160} y="185" fontSize="14" fill="rgba(255,255,255,0.4)" textAnchor="middle">{m.sub}</text>
        </g>
      ))}

      {/* Monday backlog */}
      <rect x="200" y="250" width="800" height="100" rx="12" fill="rgba(255,208,128,0.04)" stroke="rgba(255,208,128,0.10)" />
      <text x="600" y="285" fontSize="16" fontWeight="700" fill="#ffd080" textAnchor="middle">Monday backlog · Thomson Group</text>
      <text x="400" y="320" fontSize="18" fontWeight="700" fill="#fff">14,200 vouchers</text>
      <text x="800" y="320" fontSize="18" fontWeight="700" fill="#8af5c0">Cleared by 10:42 AM</text>

      <rect x="300" y="390" width="600" height="50" rx="25" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="420" fontSize="16" fontWeight="700" fill="#8af5c0" textAnchor="middle">Live at Thomson Group · Dubai · Fortune 500 logistics</text>
    </svg>
  );
}
