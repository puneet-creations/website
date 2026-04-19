/**
 * SvgDefs — shared SVG definitions for all motion story illustrations.
 * Dark premium fintech style: metallic gradients, teal/gold glow filters,
 * dark glass panels, shadow effects, arrow markers.
 *
 * Usage: Place <SvgDefs /> inside every <svg> as the first child.
 */
export default function SvgDefs() {
  return (
    <defs>
      {/* ── Metallic gradients ── */}
      <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8a84e" />
        <stop offset="40%" stopColor="#f5d98a" />
        <stop offset="60%" stopColor="#c8a84e" />
        <stop offset="100%" stopColor="#8a6d2b" />
      </linearGradient>
      <linearGradient id="silverMetal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d8d8d8" />
        <stop offset="30%" stopColor="#a0a0a0" />
        <stop offset="70%" stopColor="#c0c0c0" />
        <stop offset="100%" stopColor="#787878" />
      </linearGradient>
      <linearGradient id="tealMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2dd4a8" />
        <stop offset="50%" stopColor="#8af5c0" />
        <stop offset="100%" stopColor="#187574" />
      </linearGradient>
      <linearGradient id="redMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="50%" stopColor="#ff9090" />
        <stop offset="100%" stopColor="#c0392b" />
      </linearGradient>
      <linearGradient id="blueMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5b76fe" />
        <stop offset="50%" stopColor="#8ea6ff" />
        <stop offset="100%" stopColor="#2e3b7f" />
      </linearGradient>
      <linearGradient id="pinkMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d87aab" />
        <stop offset="50%" stopColor="#f5a8d4" />
        <stop offset="100%" stopColor="#8a2c6a" />
      </linearGradient>
      <linearGradient id="amberMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c38400" />
        <stop offset="50%" stopColor="#ffd080" />
        <stop offset="100%" stopColor="#8a6d2b" />
      </linearGradient>

      {/* ── Dark glass panel ── */}
      <linearGradient id="darkPanel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0d0d1a" />
      </linearGradient>
      <linearGradient id="darkPanelH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0d0d1a" />
      </linearGradient>

      {/* ── Glow filters ── */}
      <filter id="tealGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feFlood floodColor="#8af5c0" floodOpacity="0.5" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feFlood floodColor="#f5d98a" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="redGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feFlood floodColor="#ff6b6b" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* ── Drop shadow ── */}
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
      </filter>
      <filter id="shadowSm" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
      </filter>

      {/* ── Arrow markers ── */}
      <marker id="tealArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#8af5c0" />
      </marker>
      <marker id="redArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#ff6b6b" />
      </marker>
      <marker id="goldArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#f5d98a" />
      </marker>
      <marker id="whiteArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.5)" />
      </marker>

      {/* ── Dot grid pattern ── */}
      <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="0.6" fill="rgba(255,255,255,0.06)" />
      </pattern>
    </defs>
  );
}
