import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer
} from 'three';
import { subscribeAtmosphereVisibility } from '@/pages/uxuimate/utils/atmosphereVisibility';

const ServicesAtmosphere = () => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    const group = new Group();
    const accent = new Color('#e8195a');
    const blue = new Color('#03a9f5');
    const particlePositions = [];
    const particleColors = [];
    const linePositions = [];
    const lineColors = [];
    const rows = 7;
    const columns = 18;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const progress = column / (columns - 1);
        const wave = Math.sin(progress * Math.PI * 2 + row * 0.65);
        const x = (progress - 0.5) * 14;
        const y = (row - (rows - 1) / 2) * 0.62 + wave * 0.25;
        const z = -Math.abs(wave) * 1.3 - row * 0.08;
        const color = accent.clone().lerp(blue, progress * 0.55);

        particlePositions.push(x, y, z);
        particleColors.push(color.r, color.g, color.b);

        if (column > 0) {
          const prevProgress = (column - 1) / (columns - 1);
          const prevWave = Math.sin(prevProgress * Math.PI * 2 + row * 0.65);
          const previous = [
            (prevProgress - 0.5) * 14,
            (row - (rows - 1) / 2) * 0.62 + prevWave * 0.25,
            -Math.abs(prevWave) * 1.3 - row * 0.08
          ];

          linePositions.push(...previous, x, y, z);
          lineColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
        }
      }
    }

    const pointsGeometry = new BufferGeometry();
    pointsGeometry.setAttribute('position', new Float32BufferAttribute(particlePositions, 3));
    pointsGeometry.setAttribute('color', new Float32BufferAttribute(particleColors, 3));

    const linesGeometry = new BufferGeometry();
    linesGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new Float32BufferAttribute(lineColors, 3));

    const points = new Points(pointsGeometry, new PointsMaterial({
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
      size: 0.055,
      transparent: true,
      vertexColors: true
    }));
    const lines = new LineSegments(linesGeometry, new LineBasicMaterial({
      blending: AdditiveBlending,
      opacity: 0.22,
      transparent: true,
      vertexColors: true
    }));
    let frameId = 0;

    camera.position.z = 8.5;
    group.add(lines, points);
    scene.add(group);
    const dpr = window.innerWidth > 1600 ? 1.25 : Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    host.appendChild(renderer.domElement);

    let shouldRun = true;
    const unsubVisibility = subscribeAtmosphereVisibility(host, ok => {
      shouldRun = ok;
    });

    const resize = () => {
      const { clientWidth, clientHeight } = host;

      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      if (shouldRun) {
        const time = Date.now() * 0.00022;

        group.rotation.x = Math.sin(time) * 0.08;
        group.rotation.y = Math.cos(time * 0.8) * 0.12;
        group.position.y = Math.sin(time * 1.8) * 0.12;
        renderer.render(scene, camera);
      }
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      unsubVisibility();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      pointsGeometry.dispose();
      linesGeometry.dispose();
      points.material.dispose();
      lines.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="services-atmosphere" ref={hostRef} aria-hidden="true" />;
};

export default ServicesAtmosphere;
