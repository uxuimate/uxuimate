import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';

const DEFAULT_MIST_PRIMARY = new Vector3(0.72, 0.62, 0.44);
const DEFAULT_MIST_SECONDARY = new Vector3(0.55, 0.42, 0.38);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/**
 * Full-frame cinematic mist - layered fbm fog only (no lens / SDF form).
 */
const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uMistPrimary;
  uniform vec3 uMistSecondary;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbmTime(vec2 p, float tm) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = mat2(1.55, 1.08, -1.08, 1.55) * p + tm * 0.028;
      a *= 0.52;
    }
    return v;
  }

  vec3 fluidColor(vec2 uv, float t) {
    float asp = uResolution.x / max(uResolution.y, 1.0);
    vec2 ratio = vec2(asp, 1.0);
    vec2 p = (uv - 0.5) * ratio;
    p += (uMouse - 0.5) * 0.042;

    float lt = mod(t, 22.0);
    float ang = lt * 0.075;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    vec2 q = rot * p;

    float fa = fbmTime(q * 1.72 + vec2(lt * 0.045, sin(lt * 0.12)), t);
    float fb = fbmTime(q * 2.95 - vec2(cos(lt * 0.1), lt * 0.04), t);
    float fc = fbmTime(q * 0.65 + vec2(sin(lt * 0.07), lt * 0.03), t * 0.85);
    float flow = smoothstep(0.12, 0.82, fa * 0.58 + fb * 0.32 + fc * 0.18);
    float mistLayer = smoothstep(0.2, 0.95, fa * 0.45 + fb * 0.55);

    float silk = sin((q.y + fa) * 5.2 + lt * 0.35) * 0.5 + 0.5;
    silk = smoothstep(0.28, 0.9, silk) * flow * 0.62;

    vec3 voidCol = vec3(0.014, 0.015, 0.022);
    vec3 deep = vec3(0.048, 0.05, 0.062);
    vec3 lift = vec3(0.11, 0.105, 0.128);
    vec3 mistHaze = vec3(0.14, 0.13, 0.16);

    vec3 ice = vec3(0.45, 0.48, 0.55);

    vec3 col = mix(voidCol, deep, flow * 0.92);
    col = mix(col, lift, fb * 0.26);
    col = mix(col, mistHaze, mistLayer * 0.38);
    col = mix(col, ice * 0.42, (1.0 - flow) * 0.14);
    col = mix(col, uMistSecondary, silk * 0.28);
    col = mix(col, uMistPrimary, silk * 0.48 + flow * 0.065);
    col += uMistPrimary * silk * 0.11;
    col += (uMistPrimary * 0.35 + uMistSecondary * 0.65) * (mistLayer * 0.22);

    float vign = smoothstep(1.18, 0.28, length(p));
    col *= 0.9 + 0.14 * vign;
    col = pow(col, vec3(0.96));
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime;
    vec3 col = fluidColor(uv, t);

    float gr = hash(uv * uResolution * 0.35 + t * 40.0);
    col += (gr - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * @param {{ mistPrimary?: Vector3; mistSecondary?: Vector3 }} props
 * Mist tint: two accent colours mixed in the shader loop (defaults match Works / champagne-warm).
 */
const WorksHeroBackdrop = ({
  mistPrimary = DEFAULT_MIST_PRIMARY,
  mistSecondary = DEFAULT_MIST_SECONDARY,
  className = ''
}) => {
  const hostRef = useRef(null);
  const mouseRef = useRef(new Vector2(0.5, 0.5));
  const targetMouseRef = useRef(new Vector2(0.5, 0.5));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const renderer = new WebGLRenderer({
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x03040a, 1);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uMouse: { value: mouseRef.current.clone() },
      uMistPrimary: { value: mistPrimary.clone() },
      uMistSecondary: { value: mistSecondary.clone() }
    };

    const material = new ShaderMaterial({
      depthWrite: false,
      fragmentShader,
      uniforms,
      vertexShader
    });
    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const start = performance.now();
    host.appendChild(renderer.domElement);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      const dpr = window.innerWidth > 1600 ? 1.25 : Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, true);
      uniforms.uResolution.value.set(w, h);
    };

    const onPointer = e => {
      targetMouseRef.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    };

    let inView = true;
    let tabVisible = document.visibilityState !== 'hidden';

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { root: null, rootMargin: '64px 0px', threshold: 0 }
    );
    io.observe(host);

    const onVis = () => {
      tabVisible = document.visibilityState !== 'hidden';
    };
    document.addEventListener('visibilitychange', onVis);

    const render = () => {
      if (!inView || !tabVisible) {
        return;
      }
      uniforms.uMouse.value.lerp(targetMouseRef.current, 0.045);
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
    };

    resize();
    requestAnimationFrame(resize);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    gsap.ticker.add(render);

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
      gsap.ticker.remove(render);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mistPrimary, mistSecondary]);

  return (
    <div className={`works-hero__webgl${className ? ` ${className}` : ''}`} ref={hostRef} aria-hidden="true" />
  );
};

export default WorksHeroBackdrop;
