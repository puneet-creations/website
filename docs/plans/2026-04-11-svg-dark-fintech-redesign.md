# SVG Motion Story Redesign — Dark Premium Fintech Style

## Summary

Redesign all 29 SVG motion story files to match dark premium fintech aesthetic inspired by reference images (metallic gradients, teal edge glow, 3D perspective, glass panels, high-contrast data grids). Production-ready quality.

## Design System

### Shared SVG Defs Block

Every motion file imports a shared defs block with these reusable elements:

```xml
<defs>
  <!-- Metallic gradients -->
  <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#c8a84e"/>
    <stop offset="40%" stopColor="#f5d98a"/>
    <stop offset="60%" stopColor="#c8a84e"/>
    <stop offset="100%" stopColor="#8a6d2b"/>
  </linearGradient>
  <linearGradient id="silverMetal" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#e8e8e8"/>
    <stop offset="30%" stopColor="#b0b0b0"/>
    <stop offset="70%" stopColor="#d0d0d0"/>
    <stop offset="100%" stopColor="#888888"/>
  </linearGradient>
  <linearGradient id="tealMetal" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#2dd4a8"/>
    <stop offset="50%" stopColor="#8af5c0"/>
    <stop offset="100%" stopColor="#187574"/>
  </linearGradient>

  <!-- Dark glass panel background -->
  <linearGradient id="darkPanel" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#1a1a2e"/>
    <stop offset="100%" stopColor="#0d0d1a"/>
  </linearGradient>

  <!-- Glow filters -->
  <filter id="tealGlow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
    <feFlood floodColor="#8af5c0" floodOpacity="0.5" result="color"/>
    <feComposite in="color" in2="blur" operator="in" result="glow"/>
    <feMerge>
      <feMergeNode in="glow"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
  <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
    <feFlood floodColor="#f5d98a" floodOpacity="0.4" result="color"/>
    <feComposite in="color" in2="blur" operator="in" result="glow"/>
    <feMerge>
      <feMergeNode in="glow"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>

  <!-- Drop shadow -->
  <filter id="shadow">
    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.35"/>
  </filter>

  <!-- Arrow markers -->
  <marker id="tealArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 Z" fill="#8af5c0"/>
  </marker>
  <marker id="redArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 Z" fill="#ff6b6b"/>
  </marker>
</defs>
```

### Element Patterns

**Dark Glass Panel (for documents, cards, screens):**
```xml
<g filter="url(#shadow)">
  <rect x="X" y="Y" width="W" height="H" rx="12" fill="url(#darkPanel)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
  <!-- Inner top highlight -->
  <line x1="X+4" y1="Y+1" x2="X+W-4" y2="Y+1" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
</g>
```

**Metallic Header Bar:**
```xml
<rect x="X" y="Y" width="W" height="28" rx="12" fill="url(#tealMetal)"/>
<!-- Bottom edge cut -->
<rect x="X" y="Y+20" width="W" height="8" fill="url(#tealMetal)"/>
```

**Data Row:**
```xml
<rect x="X" y="Y" width="W" height="24" rx="0" fill="rgba(255,255,255,0.03)"/>
<line x1="X" y1="Y+24" x2="X+W" y2="Y+24" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
<text x="X+8" y="Y+16" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="'JetBrains Mono'">label</text>
<text x="X+W-8" y="Y+16" textAnchor="end" fontSize="11" fill="#ffffff" fontWeight="600" fontFamily="'Noto Sans'">value</text>
```

**Person Silhouette:**
```xml
<g>
  <circle cx="CX" cy="CY-12" r="9" fill="url(#silverMetal)"/>
  <ellipse cx="CX" cy="CY+2" rx="14" ry="8" fill="url(#silverMetal)"/>
  <circle cx="CX+10" cy="CY-14" r="3" fill="#8af5c0"/> <!-- status dot -->
</g>
```

**Teal Glow Number:**
```xml
<text filter="url(#tealGlow)" fontSize="28" fontWeight="800" fill="#8af5c0" fontFamily="'Noto Sans'">$250K</text>
```

**Status Badge:**
```xml
<g>
  <rect x="X" y="Y" width="W" height="22" rx="11" fill="rgba(138,245,192,0.15)" stroke="#8af5c0" strokeWidth="1"/>
  <text x="X+W/2" y="Y+15" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8af5c0" fontFamily="'JetBrains Mono'" letterSpacing="0.08em">LABEL</text>
</g>
```

**Grid Background Dots:**
```xml
{/* Subtle dot grid for depth */}
<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
  <circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.08)"/>
</pattern>
<rect width="400" height="240" fill="url(#grid)"/>
```

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Teal accent | #8af5c0 | Primary glow, status dots, success states |
| Gold accent | #f5d98a | Premium elements, financial, warnings |
| Red accent | #ff6b6b | Errors, failures, pain states |
| Blue accent | #8ea6ff | Secondary info, links |
| Pink accent | #f5a8d4 | Tertiary, compliance |
| White primary | #ffffff | Headlines, key data |
| White secondary | rgba(255,255,255,0.70) | Body text, labels |
| White muted | rgba(255,255,255,0.40) | Subtle labels, grid lines |
| Panel bg dark | #1a1a2e to #0d0d1a | Card/panel backgrounds |
| Panel border | rgba(255,255,255,0.12) | Glass edges |

### Typography Inside SVGs

| Role | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| Big number | Noto Sans | 24-32px | 800 | #8af5c0 or #f5d98a + glow filter |
| Heading | Noto Sans | 14-16px | 700 | #ffffff |
| Label | JetBrains Mono | 9-10px | 700 | rgba(255,255,255,0.50), uppercase, tracking |
| Data value | Noto Sans | 11-12px | 600 | #ffffff |
| Data label | JetBrains Mono | 9-10px | 500 | rgba(255,255,255,0.40) |
| Body | Noto Sans | 10-11px | 400 | rgba(255,255,255,0.60) |

## Implementation

### Phase 1: Create shared defs component
Extract the shared defs block into `src/components/motions/SvgDefs.tsx` as a reusable React component that each motion file imports.

### Phase 2: Redesign Pain motions (6 files)
### Phase 3: Redesign Proof motions (6 files)
### Phase 4: Redesign Platform motions (4 files)
### Phase 5: Redesign Agent motions (4 files)
### Phase 6: Redesign Engage motions (4 files)
### Phase 7: Redesign standalone motions (5 files)
### Phase 8: Build + verify

## Verification

1. npm run build — no errors
2. All 29 motion files render professional dark fintech SVGs
3. 4-scene animation cycle works on all motions
4. Text readable at all sizes (min 9px for labels, 11px for data)
5. Glow effects render correctly (no browser compat issues)
6. Performance — SVG filter count stays under 6 per scene
