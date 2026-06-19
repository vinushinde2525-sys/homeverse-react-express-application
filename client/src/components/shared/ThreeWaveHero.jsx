// src/components/shared/ThreeWaveHero.jsx
// Three.js animated flowing wave-line field (inspired by spring/ribbon wave refs).
// Lightweight: one BufferGeometry of line-loops animated via sine springs, no postprocessing.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeWaveHero({ className = '', lineColor = '#ffe0d5', glowColor = '#f04d22' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Build N wavy ribbon lines, each a sine "spring" curve drifting in phase
    const LINES = 26;
    const POINTS = 120;
    const group = new THREE.Group();
    const lines = [];

    for (let i = 0; i < LINES; i++) {
      const positions = new Float32Array(POINTS * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const t = i / LINES;
      const color = new THREE.Color(lineColor).lerp(new THREE.Color(glowColor), t);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18 + t * 0.35,
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);
      lines.push({ line, offset: i * 0.35, ampY: 1.4 + t * 2.6, speed: 0.25 + t * 0.4, baseY: (i - LINES / 2) * 0.5 });
    }
    scene.add(group);
    group.rotation.x = -0.15;
    group.rotation.z = 0.05;

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      lines.forEach(({ line, offset, ampY, speed, baseY }) => {
        const pos = line.geometry.attributes.position;
        for (let p = 0; p < POINTS; p++) {
          const x = (p / (POINTS - 1)) * 22 - 11;
          const wave =
            Math.sin(x * 0.45 + elapsed * speed + offset) * ampY * 0.6 +
            Math.sin(x * 0.15 + elapsed * speed * 0.6 + offset) * ampY * 0.4;
          pos.setXYZ(p, x, baseY + wave * 0.5, Math.sin(x * 0.2 + elapsed * 0.2 + offset) * 1.2);
        }
        pos.needsUpdate = true;
      });
      group.rotation.y = Math.sin(elapsed * 0.06) * 0.12;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      lines.forEach(({ line }) => { line.geometry.dispose(); line.material.dispose(); });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [lineColor, glowColor]);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} />;
}
