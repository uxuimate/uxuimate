import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroRotatingTypewriter from '@/components/HeroRotatingTypewriter';

const WORKS_HERO_CYCLE_WORDS = ['remembered', 'felt', 'seen', 'held', 'known'];

const WorksHero = () => {
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

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const beam = beamWrapRef.current;
      if (beam) {
        gsap.set(beam, { transformOrigin: '50% 0%' });
        if (reduceMotion) {
          gsap.set(beam, { scaleY: 1, opacity: 1 });
        } else {
          gsap.fromTo(
            beam,
            { scaleY: 0.08, opacity: 0.2 },
            { scaleY: 1, opacity: 1, duration: 1.35, ease: 'power3.inOut' }
          );
        }
      }
      if (beamCoreRef.current) {
        if (reduceMotion) {
          gsap.set(beamCoreRef.current, { opacity: 1 });
        } else {
          gsap.fromTo(
            beamCoreRef.current,
            { opacity: 0 },
            { delay: 0.15, duration: 1.1, ease: 'power2.out', opacity: 1 }
          );
        }
      }
      if (beamHaloRef.current) {
        if (reduceMotion) {
          gsap.set(beamHaloRef.current, { opacity: 1, scaleX: 1 });
        } else {
          gsap.fromTo(
            beamHaloRef.current,
            { opacity: 0, scaleX: 0.6 },
            { delay: 0.2, duration: 1.2, ease: 'power2.out', opacity: 1, scaleX: 1 }
          );
        }
      }
      if (poolRef.current) {
        if (reduceMotion) {
          gsap.set(poolRef.current, { opacity: 1, y: 0, scale: 1 });
        } else {
          gsap.fromTo(
            poolRef.current,
            { opacity: 0, y: 24, scale: 0.92 },
            { delay: 0.5, duration: 1.25, ease: 'power3.out', opacity: 1, scale: 1, y: 0 }
          );
        }
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
          if (reduceMotion) {
            gsap.set(p, { strokeDasharray: 'none', strokeDashoffset: 0 });
          } else {
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(p, {
              delay: 0.35 + i * 0.1,
              duration: 2.1,
              ease: 'power1.inOut',
              strokeDashoffset: 0
            });
          }
        });
      }
      if (textRef.current) {
        if (reduceMotion) {
          gsap.set(textRef.current, { y: 0, opacity: 1 });
        } else {
          gsap.fromTo(
            textRef.current,
            { y: 40, opacity: 0 },
            { delay: 0.45, duration: 1, ease: 'power3.out', opacity: 1, y: 0 }
          );
        }
      }

      if (!reduceMotion && beamSheenRef.current) {
        gsap.to(beamSheenRef.current, {
          duration: 3.2,
          ease: 'sine.inOut',
          repeat: -1,
          y: '+=12',
          yoyo: true
        });
      }
    }, root);

    const beamXTo = beamWrapRef.current
      ? gsap.quickTo(beamWrapRef.current, 'x', { duration: 0.85, ease: 'power2.out' })
      : null;
    const poolXTo = poolRef.current
      ? gsap.quickTo(poolRef.current, 'x', { duration: 0.95, ease: 'power2.out' })
      : null;
    const archXTo = archRef.current
      ? gsap.quickTo(archRef.current, 'x', { duration: 1.05, ease: 'power1.out' })
      : null;
    const archYTo = archRef.current
      ? gsap.quickTo(archRef.current, 'y', { duration: 1.05, ease: 'power1.out' })
      : null;

    let rafId = 0;
    let nextX = 0;
    let nextY = 0;

    const flushPointerAnimation = () => {
      rafId = 0;
      beamXTo?.(nextX * 14);
      poolXTo?.(nextX * 8);
      archXTo?.(nextX * 18);
      archYTo?.(nextY * 10);
    };

    const onMove = e => {
      if (reduceMotion || !root) {
        return;
      }
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      nextX = (e.clientX / w - 0.5) * 2;
      nextY = (e.clientY / h - 0.5) * 2;
      if (!rafId) {
        rafId = window.requestAnimationFrame(flushPointerAnimation);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('pointermove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section className="works-hero" id="works-hero" ref={rootRef} aria-labelledby="works-hero-title">
      <div className="works-hero__void" />
      <svg
        className="works-hero__architecture"
        ref={archRef}
        viewBox="0 0 800 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="works-arch-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(232, 25, 90, 0.32)" />
            <stop offset="0.45" stopColor="rgba(248, 80, 120, 0.2)" />
            <stop offset="1" stopColor="rgba(255, 255, 255, 0.06)" />
          </linearGradient>
        </defs>
        <path
          d="M 120 200 Q 400 40 680 200"
          fill="none"
          stroke="url(#works-arch-stroke)"
          strokeWidth="0.4"
        />
        <path
          d="M 80 480 Q 400 360 720 500"
          fill="none"
          stroke="url(#works-arch-stroke)"
          strokeWidth="0.35"
          opacity="0.7"
        />
        <ellipse
          cx="400"
          cy="720"
          fill="none"
          opacity="0.4"
          rx="320"
          ry="200"
          stroke="url(#works-arch-stroke)"
          strokeWidth="0.35"
          transform="rotate(-8 400 720)"
        />
      </svg>
      <div className="works-hero__pool" ref={poolRef} aria-hidden="true" />
      <div className="works-hero__beam-column" ref={beamWrapRef}>
        <div className="works-hero__beam-ambient" />
        <div className="works-hero__beam-halo" ref={beamHaloRef} />
        <div className="works-hero__beam-core" ref={beamCoreRef} />
        <div className="works-hero__beam-sheen" ref={beamSheenRef} />
      </div>
      <div className="works-hero__content">
        <div className="works-hero__text" ref={textRef}>
          <p className="works-hero__eyebrow">Selected work</p>

          <h1 id="works-hero-title" className="works-hero__title-block">
            <span className="works-hero__title-line">Crafted to be</span>
            <span className="works-hero__cycle">
              <HeroRotatingTypewriter
                words={WORKS_HERO_CYCLE_WORDS}
                className="works-hero__cycle-word works-hero__cycle-word--typewriter"
              />
            </span>
          </h1>

          <p className="works-hero__rule" aria-hidden="true" />
          <p className="works-hero__lede">
            Product, brand, and web - shaped with precision from first conversation to final handoff.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorksHero;
