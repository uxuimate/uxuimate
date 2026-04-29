import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer
} from 'three';
import { subscribeAtmosphereVisibility } from '@/pages/uxuimate/utils/atmosphereVisibility';

const AboutAtmosphere = () => {
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
    const positions = [];
    const colors = [];
    const coolWhite = new Color('#dcecff');
    const white = new Color('#ffffff');
    const particleCount = 180;

    for (let index = 0; index < particleCount; index += 1) {
      const progress = index / particleCount;
      const angle = progress * Math.PI * 8;
      const radius = 1.2 + progress * 4.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.36;
      const z = (Math.random() - 0.5) * 3.6;
      const color = coolWhite.clone().lerp(white, Math.random() * 0.45);

      positions.push(x, y, z);
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.76,
      size: 0.052,
      transparent: true,
      vertexColors: true
    });
    const particles = new Points(geometry, material);
    let frameId = 0;

    camera.position.z = 8;
    particles.position.x = 2.1;
    scene.add(particles);
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
        const time = Date.now() * 0.0003;

        particles.rotation.z = time * 0.22;
        particles.rotation.y = Math.sin(time) * 0.16;
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="about-atmosphere" ref={hostRef} aria-hidden="true" />;
};

export default AboutAtmosphere;
