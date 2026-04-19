import JourneyFlow from './JourneyFlow';

/**
 * InvoiceFlow — Invoice Intelligence (Thomson Group UAE).
 * 4 wide-format scenes for horizontal slider. viewBox 1200×500.
 * All text 14px+ in SVG space. Responsive via w-full h-auto.
 */
export default function InvoiceFlow() {
  return (
    <JourneyFlow
      stepLabels={['Receive · OCR sweep', 'Extract · vendor lookup', '3-way match · tolerance', 'Post to SAP · audited']}
      genericFail="Public LLMs cannot read handwritten + scanned invoices reliably."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

/* Scene 1: Invoice + OCR extraction */
function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />

      {/* Invoice */}
      <rect x="50" y="30" width="500" height="440" rx="8" fill="#f5e8c0" />
      <text x="70" y="70" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#1a1a1a">GLOBAL LOGISTICS LLC</text>
      <text x="70" y="95" fontSize="14" fill="#666">Free Zone, Jebel Ali · Dubai, UAE</text>
      <text x="460" y="70" fontSize="24" fontWeight="700" fill="#1a1a1a" textAnchor="end" fontFamily="Georgia,serif">INVOICE</text>
      <text x="460" y="95" fontSize="14" fill="#666" textAnchor="end">INV-2024-8814</text>
      <line x1="70" y1="110" x2="530" y2="110" stroke="#c0b080" />

      <text x="70" y="140" fontSize="14" fontWeight="600" fill="#888">BILL TO</text>
      <text x="70" y="160" fontSize="15" fill="#333">Thomson Group UAE · AP Dept</text>
      <text x="340" y="140" fontSize="14" fontWeight="600" fill="#888">REF</text>
      <text x="340" y="160" fontSize="15" fill="#333">PO-4473 · GRN-8821</text>

      <line x1="70" y1="180" x2="530" y2="180" stroke="#c0b080" strokeWidth="0.5" />
      <text x="70" y="205" fontSize="14" fontWeight="600" fill="#888">DESCRIPTION</text>
      <text x="460" y="205" fontSize="14" fontWeight="600" fill="#888" textAnchor="end">AMOUNT</text>
      <text x="70" y="235" fontSize="15" fill="#333">Port clearance · shipment 4473</text>
      <text x="460" y="235" fontSize="15" fill="#333" textAnchor="end" fontFamily="monospace">$5,830.00</text>
      <text x="70" y="260" fontSize="15" fill="#333">Inland freight · DXB → JEB</text>
      <text x="460" y="260" fontSize="15" fill="#333" textAnchor="end" fontFamily="monospace">$5,120.00</text>
      <text x="70" y="285" fontSize="15" fill="#333">Documentation &amp; handling</text>
      <text x="460" y="285" fontSize="15" fill="#333" textAnchor="end" fontFamily="monospace">$1,910.00</text>

      <line x1="300" y1="310" x2="530" y2="310" stroke="#c0b080" />
      <text x="300" y="335" fontSize="15" fill="#666">Subtotal</text>
      <text x="460" y="335" fontSize="15" fill="#333" textAnchor="end" fontFamily="monospace">$12,860.00</text>
      <text x="300" y="358" fontSize="15" fill="#666">VAT 5%</text>
      <text x="460" y="358" fontSize="15" fill="#333" textAnchor="end" fontFamily="monospace">$643.00</text>
      <line x1="300" y1="370" x2="530" y2="370" stroke="#1a1a1a" strokeWidth="2" />
      <text x="300" y="400" fontSize="20" fontWeight="700" fill="#1a1a1a" fontFamily="Georgia,serif">TOTAL</text>
      <text x="460" y="400" fontSize="20" fontWeight="700" fill="#1a1a1a" textAnchor="end" fontFamily="Georgia,serif">$13,503.00</text>
      <text x="80" y="440" fontSize="18" fill="#555" opacity="0.5" fontFamily="cursive">CFO</text>
      <text x="470" y="290" fontSize="16" fill="#c0392b" opacity="0.4" fontFamily="cursive" transform="rotate(-10,470,290)">handwritten</text>

      {/* Scan line */}
      <rect x="50" y="30" width="500" height="20" fill="#5b76fe" opacity="0.15" rx="4">
        <animate attributeName="y" values="30;450;30" dur="3s" repeatCount="indefinite" />
      </rect>

      {/* Arrow */}
      <line x1="570" y1="250" x2="630" y2="250" stroke="#8af5c0" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
      <polygon points="635,244 648,250 635,256" fill="#8af5c0" opacity="0.5" />

      {/* OCR result */}
      <rect x="660" y="50" width="500" height="400" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(138,245,192,0.12)" />
      <text x="690" y="85" fontSize="17" fontWeight="700" fill="#8af5c0" fontFamily="'JetBrains Mono',monospace">artiGen · Field Extraction</text>
      <text x="690" y="110" fontSize="14" fill="rgba(255,255,255,0.5)">Confidence gate: all fields &gt; 0.85</text>

      {[
        { label: 'invoice_no', value: 'INV-2024-8814', conf: '96%', y: 150 },
        { label: 'vendor', value: 'Global Logistics LLC', conf: '94%', y: 200 },
        { label: 'total', value: '$13,503.00', conf: '99%', y: 250 },
        { label: 'gl_account', value: '6100-2340', conf: '88%', y: 300 },
      ].map((f) => (
        <g key={f.label}>
          <rect x="690" y={f.y - 20} width="440" height="40" rx="6" fill="rgba(138,245,192,0.05)" stroke="rgba(138,245,192,0.08)" />
          <text x="710" y={f.y} fontSize="14" fill="rgba(255,255,255,0.5)" fontFamily="'JetBrains Mono',monospace">{f.label}</text>
          <text x="860" y={f.y} fontSize="16" fontWeight="600" fill="#fff" fontFamily="'JetBrains Mono',monospace">{f.value}</text>
          <text x="1100" y={f.y} fontSize="15" fill="#8af5c0" textAnchor="end" fontFamily="'JetBrains Mono',monospace">{f.conf}</text>
        </g>
      ))}

      <rect x="690" y="350" width="440" height="40" rx="20" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.20)" />
      <text x="910" y="375" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="'JetBrains Mono',monospace">✓ ALL FIELDS ABOVE THRESHOLD</text>
    </svg>
  );
}

/* Scene 2: 3-way match */
function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />

      {/* 3 document cards */}
      {[
        { title: 'INVOICE', sub: 'INV-2024-8814', detail: '$13,503.00', accent: '#8af5c0', x: 60 },
        { title: 'PURCHASE ORDER', sub: 'PO-4473', detail: 'Limit: $13,800', accent: '#5b76fe', x: 440 },
        { title: 'GOODS RECEIPT', sub: 'GRN-8821', detail: 'Value: $13,500', accent: '#ffd080', x: 820 },
      ].map((d) => (
        <g key={d.title}>
          <rect x={d.x} y="40" width="300" height="130" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${d.accent}30`} />
          <rect x={d.x} y="40" width="300" height="35" rx="10" fill={`${d.accent}10`} />
          <text x={d.x + 20} y="64" fontSize="14" fontWeight="700" fill={d.accent} fontFamily="'JetBrains Mono',monospace">{d.title}</text>
          <text x={d.x + 20} y="100" fontSize="16" fill="#fff" fontFamily="'JetBrains Mono',monospace">{d.sub}</text>
          <text x={d.x + 20} y="125" fontSize="15" fill="rgba(255,255,255,0.6)">{d.detail}</text>
        </g>
      ))}

      {/* Connecting lines down to match panel */}
      <line x1="210" y1="170" x2="400" y2="230" stroke="#8af5c0" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="590" y1="170" x2="600" y2="230" stroke="#5b76fe" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="970" y1="170" x2="800" y2="230" stroke="#ffd080" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />

      {/* Match panel */}
      <rect x="200" y="220" width="800" height="240" rx="12" fill="rgba(138,245,192,0.03)" stroke="rgba(138,245,192,0.10)" />
      <text x="600" y="260" fontSize="20" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Georgia,serif">3-Way Reconciliation</text>

      {[
        { check: 'Vendor match', result: '✓ V-00472', y: 300 },
        { check: 'Amount match', result: '✓ $13,503', y: 330 },
        { check: 'Line items match', result: '✓ 3 lines', y: 360 },
        { check: 'Tolerance ±2%', result: '2.15% under · $297', y: 390 },
      ].map((r) => (
        <g key={r.check}>
          <text x="280" y={r.y} fontSize="16" fill="rgba(255,255,255,0.7)">{r.check}</text>
          <text x="720" y={r.y} fontSize="16" fill="#8af5c0" textAnchor="end" fontFamily="'JetBrains Mono',monospace">{r.result}</text>
        </g>
      ))}

      <rect x="350" y="415" width="500" height="35" rx="17" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.20)" />
      <text x="600" y="438" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="'JetBrains Mono',monospace">WITHIN TOLERANCE · READY TO POST ✓</text>
    </svg>
  );
}

/* Scene 3: SAP posting */
function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />

      {/* SAP panel */}
      <rect x="60" y="40" width="700" height="420" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,208,128,0.12)" />
      <rect x="60" y="40" width="700" height="45" rx="12" fill="rgba(255,208,128,0.08)" />
      <text x="90" y="70" fontSize="16" fontWeight="700" fill="#ffd080" fontFamily="'JetBrains Mono',monospace">SAP S/4HANA · MIRO · Vendor Invoice</text>

      {[
        { label: 'Doc type', value: 'RE — Vendor invoice', y: 120 },
        { label: 'Vendor', value: 'V-00472 — Global Logistics LLC', y: 155 },
        { label: 'Reference', value: 'INV-2024-8814', y: 190 },
        { label: 'PO ref', value: 'PO-4473 / GRN-8821', y: 225 },
        { label: 'GL account', value: '6100-2340 — Freight & logistics', y: 260 },
        { label: 'Amount', value: '$13,503.00 USD (incl. VAT)', y: 295 },
      ].map((f) => (
        <g key={f.label}>
          <text x="100" y={f.y} fontSize="15" fill="rgba(255,255,255,0.5)">{f.label}</text>
          <text x="300" y={f.y} fontSize="16" fill="#fff" fontFamily="'JetBrains Mono',monospace">{f.value}</text>
        </g>
      ))}

      {/* POSTED badge */}
      <rect x="820" y="50" width="330" height="160" rx="14" fill="rgba(138,245,192,0.06)" stroke="rgba(138,245,192,0.20)" strokeWidth="2" />
      <text x="985" y="115" fontSize="48" fontWeight="900" fill="#8af5c0" textAnchor="middle" fontFamily="Georgia,serif" opacity="0.8">POSTED</text>
      <text x="985" y="150" fontSize="15" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="'JetBrains Mono',monospace">Doc 5400892341</text>
      <text x="985" y="175" fontSize="14" fill="rgba(138,245,192,0.6)" textAnchor="middle">03-Mar-2026 · 10:42 AM</text>

      {/* Audit trail */}
      <rect x="820" y="240" width="330" height="220" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="850" y="272" fontSize="15" fontWeight="700" fill="#8af5c0" fontFamily="'JetBrains Mono',monospace">AUDIT TRAIL</text>
      <text x="850" y="305" fontSize="14" fill="rgba(255,255,255,0.6)">Source: page 2 line 14 · cited</text>
      <text x="850" y="335" fontSize="14" fill="rgba(255,255,255,0.6)">Posted by: artiGen-agent</text>
      <text x="850" y="365" fontSize="14" fill="rgba(255,255,255,0.6)">Approved by: AP-supervisor</text>
      <text x="850" y="395" fontSize="14" fill="rgba(138,245,192,0.7)">Reversible until: 03-Apr-2026</text>
      <text x="850" y="425" fontSize="14" fill="rgba(138,245,192,0.7)">Undo path: doc 5400892341</text>
    </svg>
  );
}

/* Scene 4: Outcome dashboard */
function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="55" fontSize="22" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Georgia,serif">Invoice IN-8892 · Complete</text>

      {/* 4 step chain */}
      {['Receive', 'Extract', 'Match', 'Post'].map((s, i) => {
        const x = 150 + i * 240;
        const colors = ['#8af5c0', '#5b76fe', '#ffd080', '#8af5c0'];
        return (
          <g key={s}>
            <circle cx={x} cy="120" r="24" fill={`${colors[i]}15`} stroke={colors[i]} strokeWidth="2" />
            <text x={x} y="127" fontSize="18" fontWeight="700" fill={colors[i]} textAnchor="middle" fontFamily="'JetBrains Mono',monospace">{i + 1}</text>
            <text x={x} y="165" fontSize="16" fontWeight="600" fill="#fff" textAnchor="middle">{s}</text>
            {i < 3 && <line x1={x + 30} y1="120" x2={x + 210} y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="6 4" />}
          </g>
        );
      })}

      {/* Metric cards */}
      {[
        { metric: '88%', label: 'NO-TOUCH', sub: 'Thomson Group', color: '#8af5c0', x: 80 },
        { metric: '6×', label: 'ROI WEEK 1', sub: '200+ invoices/day', color: '#ffd080', x: 440 },
        { metric: '<30s', label: 'INVOICE→ERP', sub: 'End-to-end', color: '#5b76fe', x: 800 },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y="210" width="320" height="130" rx="12" fill={`${m.color}08`} stroke={`${m.color}15`} />
          <text x={m.x + 160} y="260" fontSize="40" fontWeight="700" fill={m.color} textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">{m.metric}</text>
          <text x={m.x + 160} y="290" fontSize="14" fontWeight="700" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="'JetBrains Mono',monospace">{m.label}</text>
          <text x={m.x + 160} y="315" fontSize="14" fill="rgba(255,255,255,0.4)" textAnchor="middle">{m.sub}</text>
        </g>
      ))}

      {/* Badges */}
      <rect x="320" y="380" width="240" height="45" rx="22" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.20)" />
      <text x="440" y="408" fontSize="16" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="'JetBrains Mono',monospace">100% CITED</text>
      <rect x="600" y="380" width="280" height="45" rx="22" fill="rgba(138,245,192,0.10)" stroke="rgba(138,245,192,0.20)" />
      <text x="740" y="408" fontSize="16" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="'JetBrains Mono',monospace">100% REVERSIBLE</text>
    </svg>
  );
}
