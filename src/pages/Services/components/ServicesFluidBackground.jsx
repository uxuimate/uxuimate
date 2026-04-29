import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer
} from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/* Brand pink / red (default services hero) */
const fragmentShaderDefault = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.18;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 black = vec3(0.015, 0.014, 0.018);
    vec3 red = vec3(0.91, 0.10, 0.35);
    vec3 blue = vec3(0.02, 0.55, 0.78);
    vec3 color = mix(black, red, flow * 0.72);
    color = mix(color, blue, fieldB * 0.18);
    color += red * ribbon * 0.34;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* Web Development tab - purple / violet (matches UI accent) */
const fragmentShaderDevelopment = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.18;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 black = vec3(0.015, 0.012, 0.022);
    vec3 purple = vec3(0.58, 0.34, 0.99);
    vec3 cyan = vec3(0.12, 0.45, 0.95);
    vec3 color = mix(black, purple, flow * 0.72);
    color = mix(color, cyan, fieldB * 0.12);
    color += purple * ribbon * 0.32;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* Branding tab - warm gold (#92680A) on deep warm black */
const fragmentShaderBranding = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.16;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 black = vec3(0.059, 0.051, 0.035);
    vec3 gold = vec3(0.573, 0.408, 0.039);
    vec3 champagne = vec3(0.941, 0.816, 0.502);
    vec3 color = mix(black, gold, flow * 0.74);
    color = mix(color, champagne, fieldB * 0.14);
    color += gold * ribbon * 0.34;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* Mobile & SaaS tab - blue (#3B82F6) on deep slate */
const fragmentShaderMobile = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = mat2(1.62, 1.12, -1.12, 1.62) * p + uTime * 0.05;
      amplitude *= 0.52;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 ratio = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * ratio;

    float loopTime = mod(uTime, 12.0);
    float angle = loopTime * 0.17;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    vec2 q = rotation * p;
    float fieldA = fbm(q * 2.4 + vec2(loopTime * 0.09, sin(loopTime * 0.22)));
    float fieldB = fbm(q * 4.2 - vec2(cos(loopTime * 0.18), loopTime * 0.07));
    float flow = smoothstep(0.18, 0.92, fieldA + fieldB * 0.48);

    float ribbon = sin((q.x + fieldA * 0.85) * 8.0 + loopTime * 0.7) * 0.5 + 0.5;
    ribbon = smoothstep(0.46, 0.92, ribbon) * flow;

    vec3 slate = vec3(0.02, 0.04, 0.08);
    vec3 blue = vec3(0.231, 0.510, 0.965);
    vec3 cyan = vec3(0.15, 0.75, 0.92);
    vec3 color = mix(slate, blue, flow * 0.72);
    color = mix(color, cyan, fieldB * 0.14);
    color += blue * ribbon * 0.32;

    float vignette = smoothstep(0.96, 0.14, length(p));
    float alpha = (0.42 + flow * 0.48 + ribbon * 0.32) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

const pickFragmentShader = (variant) => {
  if (variant === 'development') {
    return fragmentShaderDevelopment;
  }

  if (variant === 'branding') {
    return fragmentShaderBranding;
  }

  if (variant === 'mobile') {
    return fragmentShaderMobile;
  }

  return fragmentShaderDefault;
};

const ServicesFluidBackground = ({ variant = 'default' }) => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const fs = pickFragmentShader(variant);

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) }
    };
    const material = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fragmentShader: fs,
      uniforms,
      vertexShader
    });
    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    const startTime = performance.now();

    scene.add(mesh);
    host.appendChild(renderer.domElement);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      const dpr = window.innerWidth > 1600 ? 1.25 : Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };

    let inView = true;
    let tabVisible = document.visibilityState !== 'hidden';

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { root: null, rootMargin: '80px 0px', threshold: 0 }
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
      uniforms.uTime.value = (performance.now() - startTime) / 1000;
      renderer.render(scene, camera);
    };

    resize();
    requestAnimationFrame(() => resize());
    gsap.ticker.add(render);
    window.addEventListener('resize', resize);

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
      gsap.ticker.remove(render);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return <div className="services-fluid-bg" ref={hostRef} aria-hidden="true" />;
};

export default ServicesFluidBackground;
