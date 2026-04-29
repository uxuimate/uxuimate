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

const FeedbackAtmosphere = () => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(55, 1, 0.1, 1000);
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    const particleCount = 130;
    const positions = [];
    const colors = [];
    const colorA = new Color('#f033b5');
    const colorB = new Color('#03a9f5');

    for (let index = 0; index < particleCount; index += 1) {
      positions.push(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );

      const color = colorA.clone().lerp(colorB, Math.random());
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.72,
      size: 0.045,
      transparent: true,
      vertexColors: true
    });
    const particles = new Points(geometry, material);
    let frameId = 0;

    camera.position.z = 8;
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
        particles.rotation.y += 0.0018;
        particles.rotation.x = Math.sin(Date.now() * 0.00025) * 0.08;
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

  return <div className="feedback-atmosphere" ref={hostRef} aria-hidden="true" />;
};

export default FeedbackAtmosphere;
