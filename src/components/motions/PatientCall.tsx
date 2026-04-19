import JourneyFlow from './JourneyFlow';

/**
 * PatientCall — Patient Experience OS (Qira Labs, 38 clinics).
 * 4 wide-format scenes. viewBox 1200×500.
 */
export default function PatientCall() {
  return (
    <JourneyFlow
      stepLabels={['Ring · context lookup', 'Orchestrate · 4 tools', 'Book · confirm slot', 'Recover · no-show follow-up']}
      genericFail="Running patient voice on public AI is a HIPAA breach. No public LLM can orchestrate across 6 disconnected clinic tools."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Missed call at 6:47 PM · AI picks up in 1 ring</text>

      {/* Phone icon */}
      <circle cx="200" cy="250" r="80" fill="rgba(91,118,254,0.08)" stroke="#5b76fe" strokeWidth="2" />
      <circle cx="200" cy="250" r="50" fill="rgba(91,118,254,0.15)" />
      <text x="200" y="240" fontSize="28" fill="#5b76fe" textAnchor="middle">📞</text>
      <text x="200" y="280" fontSize="15" fontWeight="700" fill="#5b76fe" textAnchor="middle">+1 (415) 555-2419</text>

      {/* Caller resolved card */}
      <rect x="400" y="80" width="500" height="320" rx="12" fill="rgba(91,118,254,0.04)" stroke="rgba(91,118,254,0.15)" />
      <rect x="400" y="80" width="500" height="45" rx="12" fill="rgba(91,118,254,0.10)" />
      <text x="430" y="108" fontSize="16" fontWeight="700" fill="#5b76fe">CALLER RESOLVED · 240ms</text>

      {[
        { label: 'Name', value: 'Sarah Chen', y: 155 },
        { label: 'Last visit', value: '09/22/25 · cleaning', y: 185 },
        { label: 'Insurance', value: 'Delta PPO · verified active', y: 215 },
        { label: 'Flags', value: '⚠ 2 no-shows in 2024', y: 245 },
        { label: 'Open treatment', value: 'Crown #14 · $1,240 · 6 mo old', y: 275 },
      ].map((f) => (
        <g key={f.label}>
          <text x="430" y={f.y} fontSize="15" fill="rgba(255,255,255,0.5)">{f.label}</text>
          <text x="600" y={f.y} fontSize="16" fontWeight="600" fill="#fff">{f.value}</text>
        </g>
      ))}

      <text x="430" y="330" fontSize="14" fill="rgba(91,118,254,0.6)">Sources: Dentrix · Eligibility API · Call log</text>
      <text x="430" y="355" fontSize="14" fill="rgba(91,118,254,0.6)">PII stays on-prem · HIPAA compliant</text>

      {/* 24/7 badge */}
      <rect x="960" y="120" width="180" height="80" rx="40" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="1050" y="155" fontSize="28" fontWeight="700" fill="#8af5c0" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">24/7</text>
      <text x="1050" y="180" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">Every call answered</text>

      <rect x="960" y="230" width="180" height="80" rx="40" fill="rgba(255,208,128,0.08)" stroke="rgba(255,208,128,0.15)" />
      <text x="1050" y="265" fontSize="28" fontWeight="700" fill="#ffd080" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">0</text>
      <text x="1050" y="290" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">Hold time</text>
    </svg>
  );
}

function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">AI orchestrates 4 tools in parallel · zero system replacements</text>

      {/* Center hub */}
      <circle cx="600" cy="250" r="60" fill="rgba(138,245,192,0.08)" stroke="#8af5c0" strokeWidth="2" />
      <text x="600" y="240" fontSize="16" fontWeight="700" fill="#8af5c0" textAnchor="middle">artiGen</text>
      <text x="600" y="262" fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">Orchestrator</text>

      {/* 4 tool nodes */}
      {[
        { label: 'Dentrix', sub: 'Patient records', x: 200, y: 120, color: '#8af5c0' },
        { label: 'Eligibility API', sub: 'Insurance verify', x: 1000, y: 120, color: '#5b76fe' },
        { label: 'Scheduler', sub: 'Open slots', x: 200, y: 380, color: '#ffd080' },
        { label: 'Call Router', sub: 'IVR + queue', x: 1000, y: 380, color: '#f5a8d4' },
      ].map((t) => (
        <g key={t.label}>
          <rect x={t.x - 80} y={t.y - 30} width="160" height="60" rx="10" fill={`${t.color}08`} stroke={`${t.color}20`} />
          <text x={t.x} y={t.y - 5} fontSize="16" fontWeight="700" fill={t.color} textAnchor="middle">{t.label}</text>
          <text x={t.x} y={t.y + 18} fontSize="14" fill="rgba(255,255,255,0.5)" textAnchor="middle">{t.sub}</text>
          <line x1={t.x} y1={t.y + (t.y < 250 ? 30 : -30)} x2="600" y2="250" stroke={`${t.color}30`} strokeWidth="1.5" strokeDasharray="6 4" />
        </g>
      ))}

      <rect x="400" y="430" width="400" height="40" rx="20" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="600" y="455" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">6–12 tools · zero replacements · parallel calls</text>
    </svg>
  );
}

function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">4 slots offered · patient confirms · booked in real-time</text>

      {/* Available slots */}
      <rect x="60" y="80" width="500" height="380" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(138,245,192,0.10)" />
      <text x="90" y="115" fontSize="16" fontWeight="700" fill="#8af5c0">AVAILABLE · next 14 days</text>

      {[
        { day: 'Tue · Apr 8', time: '10:00 AM', selected: false },
        { day: 'Wed · Apr 9', time: '2:30 PM', selected: true },
        { day: 'Thu · Apr 10', time: '9:00 AM', selected: false },
        { day: 'Mon · Apr 14', time: '11:30 AM', selected: false },
      ].map((s, i) => (
        <g key={i}>
          <rect x="90" y={140 + i * 60} width="440" height="48" rx="8"
            fill={s.selected ? 'rgba(138,245,192,0.10)' : 'rgba(255,255,255,0.02)'}
            stroke={s.selected ? '#8af5c0' : 'rgba(255,255,255,0.06)'} strokeWidth={s.selected ? 2 : 1} />
          <text x="120" y={170 + i * 60} fontSize="16" fontWeight={s.selected ? '700' : '400'} fill={s.selected ? '#fff' : 'rgba(255,255,255,0.7)'}>{s.day}</text>
          <text x="350" y={170 + i * 60} fontSize="16" fill={s.selected ? '#8af5c0' : 'rgba(255,255,255,0.5)'} fontFamily="'JetBrains Mono',monospace">{s.time}</text>
          {s.selected && <text x="490" y={170 + i * 60} fontSize="16" fill="#8af5c0" textAnchor="end">✓</text>}
        </g>
      ))}

      {/* Confirmation */}
      <rect x="640" y="80" width="500" height="380" rx="12" fill="rgba(138,245,192,0.04)" stroke="rgba(138,245,192,0.12)" />
      <text x="890" y="130" fontSize="20" fontWeight="700" fill="#8af5c0" textAnchor="middle">CONFIRMED</text>
      <text x="890" y="170" fontSize="18" fill="#fff" textAnchor="middle">Wed · Apr 9 · 2:30 PM</text>
      <text x="890" y="200" fontSize="16" fill="rgba(255,255,255,0.6)" textAnchor="middle">Crown preparation · Tooth #14</text>

      <line x1="700" y1="225" x2="1080" y2="225" stroke="rgba(255,255,255,0.06)" />

      <text x="700" y="260" fontSize="15" fill="rgba(255,255,255,0.6)">✓ SMS confirmation sent</text>
      <text x="700" y="290" fontSize="15" fill="rgba(255,255,255,0.6)">✓ Dentrix calendar updated</text>
      <text x="700" y="320" fontSize="15" fill="rgba(255,255,255,0.6)">✓ Insurance pre-auth initiated</text>
      <text x="700" y="350" fontSize="15" fill="rgba(255,255,255,0.6)">✓ 24hr reminder scheduled</text>
      <text x="700" y="380" fontSize="15" fill="rgba(255,255,255,0.6)">✓ Pre-visit intake form sent</text>

      <rect x="700" y="400" width="360" height="40" rx="20" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="880" y="425" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">ALL AUTOMATED · ZERO MANUAL</text>
    </svg>
  );
}

function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="22" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Georgia,serif">$400K+ recovered per location per year</text>

      {[
        { metric: '$400K+', label: 'RECOVERED', sub: 'Per location/year', color: '#ffd080', x: 80 },
        { metric: '100%', label: 'CALLS ANSWERED', sub: '24/7 · zero hold time', color: '#8af5c0', x: 440 },
        { metric: '0', label: 'SYSTEM REPLACEMENTS', sub: 'Works with existing tools', color: '#5b76fe', x: 800 },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y="80" width="320" height="130" rx="12" fill={`${m.color}08`} stroke={`${m.color}15`} />
          <text x={m.x + 160} y="130" fontSize="40" fontWeight="700" fill={m.color} textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">{m.metric}</text>
          <text x={m.x + 160} y="160" fontSize="14" fontWeight="700" fill="rgba(255,255,255,0.6)" textAnchor="middle">{m.label}</text>
          <text x={m.x + 160} y="185" fontSize="14" fill="rgba(255,255,255,0.4)" textAnchor="middle">{m.sub}</text>
        </g>
      ))}

      {/* Recovery breakdown */}
      <rect x="200" y="250" width="800" height="140" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <text x="600" y="285" fontSize="16" fontWeight="700" fill="#ffd080" textAnchor="middle">Revenue recovery breakdown</text>
      <text x="280" y="320" fontSize="15" fill="rgba(255,255,255,0.7)">Missed calls recovered</text>
      <text x="280" y="345" fontSize="20" fontWeight="700" fill="#ffd080">$180K</text>
      <text x="530" y="320" fontSize="15" fill="rgba(255,255,255,0.7)">No-show recovery</text>
      <text x="530" y="345" fontSize="20" fontWeight="700" fill="#8af5c0">$140K</text>
      <text x="780" y="320" fontSize="15" fill="rgba(255,255,255,0.7)">Treatment follow-up</text>
      <text x="780" y="345" fontSize="20" fontWeight="700" fill="#5b76fe">$80K</text>

      <rect x="300" y="420" width="600" height="45" rx="22" fill="rgba(255,208,128,0.08)" stroke="rgba(255,208,128,0.15)" />
      <text x="600" y="448" fontSize="16" fontWeight="700" fill="#ffd080" textAnchor="middle">Live at Qira Labs · 38 clinics · zero system replacements</text>
    </svg>
  );
}
