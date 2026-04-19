import JourneyFlow from './JourneyFlow';

/**
 * VoiceWave — Voice AI / SOAP (Qira Labs, 38 clinics).
 * 4 wide-format scenes. viewBox 1200×500.
 */

// Precomputed once at module load so the waveform heights stay stable across
// renders. Previously Math.random was called during render per bar, which
// violated React's purity rule and produced flicker on re-render.
const WAVE_BAR_HEIGHTS: readonly number[] = Array.from({ length: 20 }, (_, i) =>
  30 + Math.sin(i * 0.8) * 25 + Math.random() * 15
);

export default function VoiceWave() {
  return (
    <JourneyFlow
      stepLabels={['Capture · on-prem audio', 'NER · ICD-10 lookup', 'Generate · SOAP note', 'Sync · Dentrix EHR']}
      genericFail="Running voice on-prem under HIPAA. Sending patient voice to ChatGPT is a compliance breach."
      scenes={[<S1 key="1" />, <S2 key="2" />, <S3 key="3" />, <S4 key="4" />]}
    />
  );
}

function S1() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Live consult · captured on-prem · audio discarded after</text>

      {/* Microphone */}
      <rect x="80" y="100" width="200" height="300" rx="100" fill="rgba(245,168,212,0.06)" stroke="rgba(245,168,212,0.20)" strokeWidth="2" />
      <rect x="140" y="140" width="80" height="140" rx="40" fill="rgba(245,168,212,0.12)" stroke="#f5a8d4" strokeWidth="2" />
      <line x1="180" y1="280" x2="180" y2="340" stroke="#f5a8d4" strokeWidth="2" />
      <line x1="140" y1="340" x2="220" y2="340" stroke="#f5a8d4" strokeWidth="2" strokeLinecap="round" />

      {/* Waveform bars — heights seeded once at module load (see WAVE_BAR_HEIGHTS) */}
      {WAVE_BAR_HEIGHTS.map((h, i) => (
        <rect key={i} x={340 + i * 22} y={250 - h / 2} width="14" height={h} rx="7" fill="#f5a8d4" opacity={0.3 + (i % 3) * 0.15} />
      ))}

      {/* LIVE badge */}
      <rect x="340" y="100" width="200" height="40" rx="20" fill="rgba(245,168,212,0.12)" stroke="rgba(245,168,212,0.25)" />
      <circle cx="370" cy="120" r="6" fill="#f5a8d4"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" /></circle>
      <text x="390" y="126" fontSize="15" fontWeight="700" fill="#f5a8d4">LIVE · ON-PREM · HIPAA</text>

      {/* Transcript */}
      <rect x="780" y="80" width="380" height="340" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(245,168,212,0.10)" />
      <text x="810" y="115" fontSize="16" fontWeight="700" fill="#f5a8d4">TRANSCRIPT · real-time</text>

      {[
        { speaker: 'Dr:', text: 'How long has this sensitivity been bothering you?', y: 155 },
        { speaker: 'Pt:', text: 'About two weeks. Only with cold drinks.', y: 195 },
        { speaker: 'Dr:', text: 'I see a Class II lesion on the mesial of tooth #3.', y: 235 },
        { speaker: 'Dr:', text: "We'll plan a 2-visit composite restoration.", y: 275 },
      ].map((l) => (
        <g key={l.y}>
          <text x="810" y={l.y} fontSize="14" fontWeight="700" fill="#f5a8d4">{l.speaker}</text>
          <text x="850" y={l.y} fontSize="14" fill="rgba(255,255,255,0.75)">{l.text}</text>
        </g>
      ))}

      <text x="810" y="330" fontSize="14" fill="rgba(245,168,212,0.5)">Audio processed on-device</text>
      <text x="810" y="355" fontSize="14" fill="rgba(245,168,212,0.5)">Discarded after transcription</text>
      <rect x="810" y="370" width="320" height="35" rx="17" fill="rgba(245,168,212,0.08)" stroke="rgba(245,168,212,0.15)" />
      <text x="970" y="393" fontSize="14" fontWeight="700" fill="#f5a8d4" textAnchor="middle">ZERO AUDIO STORED</text>
    </svg>
  );
}

function S2() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">Dental NER extracts entities · ICD-10 codes matched</text>

      {/* Extracted entities */}
      <rect x="60" y="80" width="500" height="380" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(245,168,212,0.10)" />
      <text x="90" y="115" fontSize="16" fontWeight="700" fill="#f5a8d4">EXTRACTED ENTITIES</text>

      {[
        { type: 'SYMPTOM', value: 'cold sensitivity · 2 weeks', color: '#ffd080' },
        { type: 'TOOTH', value: '#3 · mesial surface', color: '#8af5c0' },
        { type: 'FINDING', value: 'Class II lesion', color: '#5b76fe' },
        { type: 'PROCEDURE', value: '2-visit composite restoration', color: '#f5a8d4' },
        { type: 'MATERIAL', value: 'composite resin', color: '#8ea6ff' },
      ].map((e, i) => (
        <g key={e.type}>
          <rect x="90" y={140 + i * 55} width="120" height="30" rx="15" fill={`${e.color}15`} stroke={`${e.color}30`} />
          <text x="150" y={160 + i * 55} fontSize="14" fontWeight="600" fill={e.color} textAnchor="middle">{e.type}</text>
          <text x="230" y={160 + i * 55} fontSize="15" fill="#fff">{e.value}</text>
        </g>
      ))}

      {/* ICD-10 lookup */}
      <rect x="640" y="80" width="500" height="380" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(91,118,254,0.10)" />
      <text x="670" y="115" fontSize="16" fontWeight="700" fill="#5b76fe">ICD-10 / CDT CODE LOOKUP</text>

      {[
        { code: 'K02.51', desc: 'Dental caries — Class II', conf: '99%' },
        { code: 'D2392', desc: 'Resin composite — 2 surfaces', conf: '97%' },
        { code: 'D0220', desc: 'Intraoral periapical X-ray', conf: '94%' },
      ].map((c, i) => (
        <g key={c.code}>
          <rect x="670" y={140 + i * 70} width="440" height="55" rx="8" fill="rgba(91,118,254,0.05)" stroke="rgba(91,118,254,0.08)" />
          <text x="690" y={165 + i * 70} fontSize="18" fontWeight="700" fill="#5b76fe" fontFamily="'JetBrains Mono',monospace">{c.code}</text>
          <text x="800" y={165 + i * 70} fontSize="15" fill="rgba(255,255,255,0.75)">{c.desc}</text>
          <text x="1080" y={165 + i * 70} fontSize="15" fill="#8af5c0" textAnchor="end">{c.conf}</text>
        </g>
      ))}

      <rect x="670" y="370" width="440" height="40" rx="20" fill="rgba(138,245,192,0.08)" stroke="rgba(138,245,192,0.15)" />
      <text x="890" y="395" fontSize="15" fontWeight="700" fill="#8af5c0" textAnchor="middle">BILLABLE · 99.2% first-pass acceptance</text>
    </svg>
  );
}

function S3() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />

      {/* SOAP Note */}
      <rect x="60" y="40" width="1080" height="420" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(138,245,192,0.12)" />
      <rect x="60" y="40" width="1080" height="45" rx="12" fill="rgba(138,245,192,0.06)" />
      <text x="90" y="70" fontSize="16" fontWeight="700" fill="#8af5c0">SOAP NOTE · Auto-generated · ~30 seconds</text>
      <text x="1110" y="70" fontSize="14" fill="rgba(138,245,192,0.6)" textAnchor="end">Tooth #3 · Visit 04/04/2026</text>

      {[
        { letter: 'S', title: 'Subjective', content: 'Patient reports cold sensitivity on lower right for 2 weeks. Pain is sharp, lasts a few seconds. No spontaneous pain.', y: 110, color: '#ffd080' },
        { letter: 'O', title: 'Objective', content: 'Class II carious lesion on mesial of #3. No periapical pathology on radiograph. Tooth is vital, responds normally to cold test.', y: 190, color: '#5b76fe' },
        { letter: 'A', title: 'Assessment', content: 'K02.51 — Dental caries on smooth surface penetrating into dentin. Prognosis: good with restoration.', y: 270, color: '#f5a8d4' },
        { letter: 'P', title: 'Plan', content: '2-visit composite restoration (D2392). Local anesthesia. Isolation with rubber dam. Caries excavation, bonding, composite placement.', y: 350, color: '#8af5c0' },
      ].map((s) => (
        <g key={s.letter}>
          <circle cx="110" cy={s.y + 15} r="20" fill={`${s.color}15`} stroke={s.color} strokeWidth="1.5" />
          <text x="110" y={s.y + 21} fontSize="18" fontWeight="800" fill={s.color} textAnchor="middle">{s.letter}</text>
          <text x="150" y={s.y + 10} fontSize="16" fontWeight="700" fill="#fff">{s.title}</text>
          <text x="150" y={s.y + 35} fontSize="14" fill="rgba(255,255,255,0.7)">{s.content}</text>
          <text x="150" y={s.y + 55} fontSize="14" fill={`${s.color}60`}>ICD: K02.51 · CDT: D2392 · cited from transcript</text>
        </g>
      ))}
    </svg>
  );
}

function S4() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
      <rect width="1200" height="500" fill="#0a0e18" rx="16" />
      <text x="600" y="45" fontSize="22" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Georgia,serif">Synced to Dentrix · Complete</text>

      {/* Metrics */}
      {[
        { metric: '~30s', label: 'SOAP NOTE', sub: 'Per consultation', color: '#f5a8d4', x: 80 },
        { metric: '0', label: 'AUDIO STORED', sub: 'Discarded after processing', color: '#8af5c0', x: 440 },
        { metric: '99.2%', label: 'FIRST-PASS', sub: 'Claim acceptance rate', color: '#5b76fe', x: 800 },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y="80" width="320" height="130" rx="12" fill={`${m.color}08`} stroke={`${m.color}15`} />
          <text x={m.x + 160} y="130" fontSize="40" fontWeight="700" fill={m.color} textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic">{m.metric}</text>
          <text x={m.x + 160} y="160" fontSize="14" fontWeight="700" fill="rgba(255,255,255,0.6)" textAnchor="middle">{m.label}</text>
          <text x={m.x + 160} y="185" fontSize="14" fill="rgba(255,255,255,0.4)" textAnchor="middle">{m.sub}</text>
        </g>
      ))}

      {/* Compliance */}
      <rect x="200" y="250" width="800" height="100" rx="12" fill="rgba(138,245,192,0.04)" stroke="rgba(138,245,192,0.10)" />
      <text x="600" y="290" fontSize="18" fontWeight="700" fill="#8af5c0" textAnchor="middle">HIPAA Compliant by Architecture</text>
      <text x="600" y="320" fontSize="15" fill="rgba(255,255,255,0.6)" textAnchor="middle">Audio on-device only · PII stays on-prem · Zero external API calls</text>

      {/* Live badge */}
      <rect x="350" y="390" width="500" height="50" rx="25" fill="rgba(245,168,212,0.08)" stroke="rgba(245,168,212,0.15)" />
      <text x="600" y="420" fontSize="16" fontWeight="700" fill="#f5a8d4" textAnchor="middle">Live at Qira Labs · 38 clinics · 2,400 consults/week</text>
    </svg>
  );
}
