import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { CONTACT_BRIEF_ANCHOR } from '@/constants/booking';
import founderPhoto from '../assets/founder.jpg';
import founderImage2 from '../assets/founder/2.webp';
import founderImage6 from '../assets/founder/6.webp';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/uxalexander/', icon: 'fab fa-linkedin-in' },
  { label: 'Facebook', href: 'https://www.facebook.com/uxuimate', icon: 'fab fa-facebook-f' },
  { label: 'Behance', href: 'https://www.behance.net/uxuimate', icon: 'fab fa-behance' }
];

const founderFloatingImages = [
  { src: founderPhoto, alt: 'Aleksandar Kehayov, founder' },
  { src: founderImage2, alt: 'UX and design work' },
  { src: founderImage6, alt: 'UX UI Mate - project visuals' }
];

const AboutFounderSection = () => {
  const sectionRef = useRef(null);
  const visualWrapRef = useRef(null);
  const orbitRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      if (visualWrapRef.current) {
        const circles = visualWrapRef.current.querySelectorAll('.about-founder__circle');
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
    <section className="about-founder" id="about-founder" ref={sectionRef} aria-labelledby="about-founder-name">
      <div className="about-founder__backdrop" aria-hidden="true">
        <div className="about-founder__backdrop-bloom about-founder__backdrop-bloom--gold" />
        <div className="about-founder__backdrop-bloom about-founder__backdrop-bloom--rose" />
        <div className="about-founder__orbit-wrap">
          <svg
            className="about-founder__orbit about-founder__orbit--section"
            ref={orbitRef}
            viewBox="0 0 1200 720"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="600" cy="360" opacity="0.5" rx="420" ry="300" stroke="currentColor" strokeWidth="0.4" />
            <ellipse
              cx="600"
              cy="360"
              opacity="0.38"
              rx="300"
              ry="420"
              stroke="currentColor"
              strokeWidth="0.4"
              transform="rotate(48 600 360)"
            />
            <path d="M 40 380 Q 600 90 1160 380" opacity="0.45" stroke="currentColor" strokeWidth="0.35" />
            <path d="M 60 520 Q 420 620 900 460" opacity="0.28" stroke="currentColor" strokeWidth="0.3" />
            <ellipse cx="220" cy="210" opacity="0.24" rx="190" ry="135" stroke="currentColor" strokeWidth="0.35" transform="rotate(-14 220 210)" />
            <ellipse cx="990" cy="520" opacity="0.24" rx="210" ry="150" stroke="currentColor" strokeWidth="0.35" transform="rotate(22 990 520)" />
            <path d="M 720 120 Q 980 40 1120 200" opacity="0.22" stroke="currentColor" strokeWidth="0.3" />
            <path d="M 100 280 Q 260 180 380 300" opacity="0.2" stroke="currentColor" strokeWidth="0.28" />
          </svg>
        </div>
      </div>
      <div className="about-founder__inner">
        <div className="about-founder__visual reveal-left" ref={visualWrapRef}>
          <div className="about-founder__circles">
            {founderFloatingImages.map((item, i) => (
              <div key={i} className="about-founder__circle">
                <img src={item.src} alt={item.alt} width={200} height={200} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="about-founder__content reveal-up">
          <p className="about-founder__eyebrow">Founder &amp; Creative Director</p>
          <h2 className="about-founder__name" id="about-founder-name">
            Aleksandar Kehayov
          </h2>
          <div className="about-founder__rule" role="presentation" />
          <div className="about-founder__story">
            <p>
              A background in web technology and marketing means I&apos;ve always seen design and business as one
              conversation - not two separate disciplines.
            </p>
            <p>
              I started UX UI Mate because I kept seeing the same problem: good products let down by poor experience.
              That&apos;s the gap we close. Based in Newcastle. Working globally.
            </p>
          </div>
          <ul className="about-founder__social">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  className="about-founder__social-link"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                >
                  <i className={icon} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <Link className="btn btn-transparent-white btn-rounded btn-large about-founder__cta" to={CONTACT_BRIEF_ANCHOR}>
            Work with us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutFounderSection;
