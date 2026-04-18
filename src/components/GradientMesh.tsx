/**
 * GradientMesh — Apple-style organic gradient mesh background.
 * Each page gets a unique color scheme. The mesh uses multiple
 * radial gradients at varying positions and sizes to create an
 * organic, flowing color field. Glass cards float on top.
 */

type MeshConfig = {
  /** 2-5 radial gradient blobs */
  blobs: {
    color: string;
    position: string;  // e.g. "20% 30%"
    size: string;      // e.g. "40%" — radius of the gradient
    opacity?: number;
  }[];
  /** Base background color */
  base?: string;
};

const MESHES: Record<string, MeshConfig> = {
  landing: { base: '#ffffff', blobs: [
    { color: '#e0f5ec', position: '10% 15%', size: '45%', opacity: 0.30 },
    { color: '#e8eeff', position: '85% 20%', size: '35%', opacity: 0.20 },
    { color: '#f5e8f2', position: '70% 80%', size: '40%', opacity: 0.15 },
  ]},
  platform: { base: '#f8f9ff', blobs: [
    { color: '#e8eeff', position: '20% 10%', size: '50%', opacity: 0.25 },
    { color: '#e0f5ec', position: '50% 75%', size: '45%', opacity: 0.15 },
  ]},
  agents: { base: '#f8fcfa', blobs: [
    { color: '#e0f5ec', position: '30% 15%', size: '50%', opacity: 0.25 },
    { color: '#e8eeff', position: '15% 70%', size: '40%', opacity: 0.15 },
  ]},
  pricing: { base: '#fffcf8', blobs: [
    { color: '#fff3e0', position: '25% 15%', size: '45%', opacity: 0.20 },
    { color: '#e0f5ec', position: '75% 30%', size: '40%', opacity: 0.15 },
  ]},
  solutions: { base: '#f8fcfa', blobs: [
    { color: '#e0f5ec', position: '15% 20%', size: '50%', opacity: 0.25 },
    { color: '#fff3e0', position: '40% 80%', size: '40%', opacity: 0.12 },
  ]},
  competitors: { base: '#fff8f8', blobs: [
    { color: '#ffe8e8', position: '25% 15%', size: '45%', opacity: 0.18 },
    { color: '#e8eeff', position: '75% 25%', size: '40%', opacity: 0.15 },
  ]},
  whyGenericFail: { base: '#fff8f8', blobs: [
    { color: '#ffe8e8', position: '30% 10%', size: '50%', opacity: 0.20 },
    { color: '#fff3e0', position: '70% 30%', size: '35%', opacity: 0.12 },
  ]},
  security: { base: '#f8fcfa', blobs: [
    { color: '#e0f5ec', position: '20% 15%', size: '50%', opacity: 0.25 },
    { color: '#e8eeff', position: '50% 80%', size: '40%', opacity: 0.12 },
  ]},
  about: { base: '#faf9fc', blobs: [
    { color: '#fff3e0', position: '20% 15%', size: '45%', opacity: 0.18 },
    { color: '#e0f5ec', position: '80% 25%', size: '40%', opacity: 0.15 },
  ]},
  contact: { base: '#f8fcfa', blobs: [
    { color: '#e0f5ec', position: '30% 15%', size: '45%', opacity: 0.15 },
    { color: '#e8eeff', position: '70% 30%', size: '40%', opacity: 0.15 },
  ]},
  faq: { base: '#f8f9ff', blobs: [
    { color: '#e8eeff', position: '25% 15%', size: '50%', opacity: 0.20 },
    { color: '#e0f5ec', position: '40% 80%', size: '40%', opacity: 0.12 },
  ]},
};

type Props = {
  page: keyof typeof MESHES;
};

export default function GradientMesh({ page }: Props) {
  const mesh = MESHES[page] || MESHES.landing;

  const colorBlobs = mesh.blobs
    .map((b) => `radial-gradient(ellipse at ${b.position}, ${b.color}${Math.round((b.opacity ?? 0.15) * 255).toString(16).padStart(2, '0')} 0%, transparent ${b.size})`)
    .join(', ');

  return (
    <>
      {/* Base color mesh layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `${colorBlobs}, ${mesh.base}`,
        }}
        aria-hidden
      />

      {/* Black glassmorphic overlays — vertical, horizontal, center */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            /* Vertical — dark edges top & bottom */
            'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)',
            /* Horizontal — dark edges left & right */
            'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.25) 100%)',
            /* Center radial — dark vignette from edges, lighter center */
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.35) 100%)',
          ].join(', '),
        }}
        aria-hidden
      />

      {/* Glass specular — faint top-center shine for depth */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }}
        aria-hidden
      />
    </>
  );
}

export { MESHES };
