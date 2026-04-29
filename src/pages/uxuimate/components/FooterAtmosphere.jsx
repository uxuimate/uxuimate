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

const ACCENT_HEX_BY_THEME = {
  default: '#e8195a',
  development: '#A855F7',
  branding: '#92680A',
  mobile: '#3B82F6'
};

const FooterAtmosphere = ({ accentTheme = 'default' }) => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(46, 1, 0.1, 1000);
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    const positions = [];
    const colors = [];
    const white = new Color('#ffffff');
    const accentHex = ACCENT_HEX_BY_THEME[accentTheme] ?? ACCENT_HEX_BY_THEME.default;
    const accent = new Color(accentHex);
    const particleCount = 120;

    for (let index = 0; index < particleCount; index += 1) {
      const progress = index / particleCount;
      const angle = progress * Math.PI * 10;
      const radius = 1.4 + Math.sin(progress * Math.PI) * 4.6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 0.72) * 1.15;
      const z = (Math.random() - 0.5) * 2.6;
      const color = white.clone().lerp(accent, Math.max(0, 0.18 - progress * 0.12));

      positions.push(x, y, z);
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.68,
      size: 0.046,
      transparent: true,
      vertexColors: true
    });
    const particles = new Points(geometry, material);
    let frameId = 0;

    camera.position.z = 7.6;
    particles.position.y = 0.15;
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
        const time = Date.now() * 0.00018;

        particles.rotation.z = time * 0.18;
        particles.rotation.y = Math.sin(time * 1.4) * 0.12;
        particles.position.x = Math.sin(time * 1.2) * 0.18;
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
  }, [accentTheme]);

  return <div className="innovative-footer-atmosphere" ref={hostRef} aria-hidden="true" />;
};

export default FooterAtmosphere;
