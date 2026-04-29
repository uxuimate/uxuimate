import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const defaultImages = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&auto=format', alt: 'Team work session - replace with your image' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop&auto=format', alt: 'Collaboration at a desk - replace with your image' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop&auto=format', alt: 'Reviewing work together - replace with your image' }
];

const AboutIntroFloating = ({ images = defaultImages }) => {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const orbitRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      if (wrapRef.current) {
        const circles = wrapRef.current.querySelectorAll('.about-belief__circle');
        circles.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 0 },
            {
              y: -8 - i * 1.5,
              duration: 2.4 + i * 0.3,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1
            }
          );
        });
      }
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          duration: 20,
          ease: 'sine.inOut',
          repeat: -1,
          rotation: 2.5,
          transformOrigin: '50% 50%',
          yoyo: true
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-belief" id="about-intro" ref={sectionRef} aria-labelledby="about-belief-title">
      <div className="about-belief__glow" aria-hidden="true" />
      <div className="about-belief__mesh" aria-hidden="true" />
      <svg
        className="about-belief__ribbons"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="belief-ribbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(232, 25, 90, 0.38)" />
            <stop offset="1" stopColor="rgba(232, 168, 50, 0.28)" />
          </linearGradient>
        </defs>
        <path
          d="M 0 320 Q 300 200 600 360 T 1200 280"
          fill="none"
          stroke="url(#belief-ribbon)"
          strokeWidth="0.5"
        />
        <path
          d="M 0 520 Q 400 400 800 550 T 1200 480"
          fill="none"
          opacity="0.4"
          stroke="url(#belief-ribbon)"
          strokeWidth="0.4"
        />
      </svg>

      <div className="about-belief__inner">
        <div className="about-belief__grid">
          <div className="about-belief__copy">
            <h2 className="about-belief__lede reveal-up" id="about-belief-title">
              <span className="about-belief__accent">
                We treat your users like <span className="text-brand-rose">gold</span> and your{' '}
                <span className="text-brand-gold">revenue</span> like our own.
              </span>
            </h2>
            <p className="about-belief__body reveal-up" data-delay="0.12">
              That means we ask hard questions before we open Figma, challenge assumptions before we write a line of
              code, and stay accountable until the work is done.
            </p>
          </div>

          <div className="about-belief__visual reveal-right" ref={wrapRef}>
            <div className="about-belief__bloom" aria-hidden="true" />
            <svg
              className="about-belief__orbit"
              ref={orbitRef}
              viewBox="0 0 420 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <ellipse cx="210" cy="200" opacity="0.5" rx="198" ry="150" stroke="currentColor" strokeWidth="0.5" />
              <ellipse
                cx="210"
                cy="200"
                opacity="0.4"
                rx="150"
                ry="198"
                stroke="currentColor"
                strokeWidth="0.5"
                transform="rotate(48 210 200)"
              />
              <path
                d="M 20 200 Q 210 20 400 200"
                fill="none"
                opacity="0.5"
                stroke="currentColor"
                strokeWidth="0.4"
              />
            </svg>
            <div className="about-belief__circles">
              {images.map((item, i) => (
                <div key={i} className="about-belief__circle">
                  <img src={item.src} alt={item.alt} width={200} height={200} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroFloating;
