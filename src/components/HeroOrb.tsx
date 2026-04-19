import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroOrb — 3D glass sphere via vanilla Three.js (no r3f/drei).
 *
 * Uses MeshPhysicalMaterial with transmission for real glass refraction,
 * an HDR-like environment via PMREMGenerator + scene cubemap, cursor-
 * reactive tilt, idle rotation, and breathing scale.
 *
 * All Three.js work lives inside useEffect — no hooks are called during
 * the Three.js render loop, which avoids the React 19 reconciler conflict
 * that r3f's hook-based components hit.
 */
export default function HeroOrb({
  attenuationColor = '#f5e8c0',
  baseColor = '#ffffff',
  envColor = '#f5e8c0',
  attenuationDistance = 1.5,
  breatheAmp = 0.055,
  floatAmp = 0.14,
}: {
  attenuationColor?: string;
  baseColor?: string;
  envColor?: string;
  attenuationDistance?: number;
  breatheAmp?: number;
  floatAmp?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(5, 5, 5);
    scene.add(sun);
    const warm = new THREE.DirectionalLight(0xffd28a, 0.6);
    warm.position.set(-3, 2, -5);
    scene.add(warm);

    // Environment cubemap — procedural sunset-ish gradient via PMREMGenerator
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const envGeo = new THREE.SphereGeometry(10, 32, 32);
    const envMat = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: new THREE.Color(envColor),
    });
    envScene.add(new THREE.Mesh(envGeo, envMat));
    // Warm overhead
    const topLight = new THREE.PointLight(0xffd48a, 4, 20);
    topLight.position.set(3, 6, 2);
    envScene.add(topLight);
    const envMap = pmrem.fromScene(envScene, 0, 0.01, 100).texture;
    scene.environment = envMap;
    pmrem.dispose();

    // Glass sphere
    const geo = new THREE.SphereGeometry(1.35, 96, 96);
    const mat = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 1.4,
      roughness: 0.04,
      ior: 1.45,
      color: new THREE.Color(baseColor),
      attenuationColor: new THREE.Color(attenuationColor),
      attenuationDistance,
      envMapIntensity: 1.6,
      clearcoat: 0.35,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.97,
      side: THREE.DoubleSide,
    });
    const orb = new THREE.Mesh(geo, mat);
    scene.add(orb);

    // Resize handler
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * Math.min(window.devicePixelRatio, 2);
      canvas.height = h * Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // Pointer tracking (global, normalised -1..1)
    const onPointer = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onPointer);

    // Render loop
    const targetRot = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    const render = () => {
      if (disposed) return;
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      // Cursor-reactive tilt
      targetRot.x = pointerRef.current.y * 0.25;
      targetRot.y = pointerRef.current.x * 0.5;
      orb.rotation.x += (targetRot.x - orb.rotation.x) * 0.04;
      orb.rotation.y += (targetRot.y - orb.rotation.y) * 0.04 + dt * 0.06;

      // Breathing scale — contract/expand
      const s = 1 + Math.sin(t * 1.3) * breatheAmp;
      orb.scale.set(s, s, s);

      // Gentle float (y position)
      orb.position.y = Math.sin(t * 0.8) * floatAmp;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointer);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      envMap.dispose();
    };
    // Three.js mount-once setup: props (attenuationColor, baseColor, envColor,
    // attenuationDistance, breatheAmp, floatAmp) are captured at initial mount
    // and are NOT intended to re-apply dynamically — doing so would tear down
    // and rebuild the entire WebGL scene graph per prop change. To support
    // live prop updates, migrate the material/animation refs outside the
    // effect and mutate them from a separate effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
