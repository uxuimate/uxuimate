import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const AboutLampHero = () => {
  const rootRef = useRef(null);
  const beamWrapRef = useRef(null);
  const beamCoreRef = useRef(null);
  const beamHaloRef = useRef(null);
  const beamSheenRef = useRef(null);
  const poolRef = useRef(null);
  const textRef = useRef(null);
  const archRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const beam = beamWrapRef.current;
      if (beam) {
        gsap.set(beam, { transformOrigin: '50% 0%' });
        gsap.fromTo(
          beam,
          { scaleY: 0.08, opacity: 0.2 },
          { scaleY: 1, opacity: 1, duration: 1.35, ease: 'power3.inOut' }
        );
      }
      if (beamCoreRef.current) {
        gsap.fromTo(
          beamCoreRef.current,
          { opacity: 0 },
          { delay: 0.15, duration: 1.1, ease: 'power2.out', opacity: 1 }
        );
      }
      if (beamHaloRef.current) {
        gsap.fromTo(
          beamHaloRef.current,
          { opacity: 0, scaleX: 0.6 },
          { delay: 0.2, duration: 1.2, ease: 'power2.out', opacity: 1, scaleX: 1 }
        );
      }
      if (poolRef.current) {
        gsap.fromTo(
          poolRef.current,
          { opacity: 0, y: 24, scale: 0.92 },
          { delay: 0.5, duration: 1.25, ease: 'power3.out', opacity: 1, scale: 1, y: 0 }
        );
      }
      if (archRef.current) {
        const paths = archRef.current.querySelectorAll('path, ellipse');
        paths.forEach((p, i) => {
          let len = 0;
          if (typeof p.getTotalLength === 'function') {
            try {
              len = p.getTotalLength();
            } catch {
              len = 0;
            }
          }
          if (len < 8) {
            return;
          }
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(p, {
            delay: 0.35 + i * 0.1,
            duration: 2.1,
            ease: 'power1.inOut',
            strokeDashoffset: 0
          });
        });
      }
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          { delay: 0.45, duration: 1, ease: 'power3.out', opacity: 1, y: 0 }
        );
      }

      if (beamSheenRef.current) {
        gsap.to(beamSheenRef.current, {
          duration: 3.2,
          ease: 'sine.inOut',
          repeat: -1,
          y: '+=12',
          yoyo: true
        });
      }
    }, root);

    const onMove = e => {
      if (!root) {
        return;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      gsap.to(beamWrapRef.current, {
        x: x * 14,
        duration: 0.85,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      if (poolRef.current) {
        gsap.to(poolRef.current, {
          x: x * 8,
          duration: 0.95,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
      if (archRef.current) {
        gsap.to(archRef.current, {
          x: x * 18,
          y: y * 10,
          duration: 1.05,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section className="about-lamp-hero" id="about-hero" ref={rootRef} aria-labelledby="about-lamp-title">
      <div className="about-lamp-hero__void" />
      <svg
        className="about-lamp-hero__architecture"
        ref={archRef}
        viewBox="0 0 800 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ab-arch-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(232, 25, 90, 0.22)" />
            <stop offset="0.5" stopColor="rgba(232, 168, 50, 0.16)" />
            <stop offset="1" stopColor="rgba(255, 255, 255, 0.04)" />
          </linearGradient>
        </defs>
        <path
          d="M 120 200 Q 400 40 680 200"
          fill="none"
          stroke="url(#ab-arch-stroke)"
          strokeWidth="0.4"
        />
        <path
          d="M 80 480 Q 400 360 720 500"
          fill="none"
          stroke="url(#ab-arch-stroke)"
          strokeWidth="0.35"
          opacity="0.7"
        />
        <ellipse cx="400" cy="720" fill="none" opacity="0.4" rx="320" ry="200" stroke="url(#ab-arch-stroke)" strokeWidth="0.35" transform="rotate(-8 400 720)" />
      </svg>
      <div className="about-lamp-hero__pool" ref={poolRef} aria-hidden="true" />
      <div className="about-lamp-hero__beam-column" ref={beamWrapRef}>
        <div className="about-lamp-hero__beam-ambient" />
        <div className="about-lamp-hero__beam-halo" ref={beamHaloRef} />
        <div className="about-lamp-hero__beam-core" ref={beamCoreRef} />
        <div className="about-lamp-hero__beam-sheen" ref={beamSheenRef} />
      </div>
      <div className="about-lamp-hero__content">
        <div className="about-lamp-hero__text" ref={textRef}>
          <p className="about-lamp-hero__eyebrow">About us</p>
          <h1 id="about-lamp-title" className="about-lamp-hero__title">
            A studio that designs with care
          </h1>
          <p className="about-lamp-hero__sub">
            Clarity, craft, and accountability - from first question to final handoff.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutLampHero;
