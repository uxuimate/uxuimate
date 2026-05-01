import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import gsap from 'gsap';
import theoryBg from '@/pages/Services/assets/design-thinking.webp';

const pillars = [
  {
    num: '01',
    title: 'You speak to the person doing the work',
    text: 'Not an account manager passing messages.'
  },
  {
    num: '02',
    title: 'Your budget goes on craft, not overhead',
    text: 'No layers of management eating your project cost.'
  },
  {
    num: '03',
    title: 'Every project gets senior attention',
    text: 'We take on fewer projects so each one gets more.'
  }
];

const HEADER = {
  eyebrow: 'Why work with us',
  statement: 'Why choose us - not an agency',
  lede: 'Direct access, lean teams, and craft-first delivery - without the agency layers.'
};

const headingId = 'about-why-studio-heading';

const AboutWhyStudioSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.services-ux-theory__reveal');

      gsap.from(items, {
        opacity: 0,
        y: 44,
        duration: 0.8,
        stagger: 0.11,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-ux-theory services-ux-theory--has-bg"
      id="about-why-studio"
      aria-labelledby={headingId}
      style={{ backgroundImage: `url(${theoryBg})` }}
    >
      <Container className="services-ux-theory__container">
        <div className="services-ux-theory__connector services-ux-theory__reveal" aria-hidden="true">
          <span className="services-ux-theory__connector-line" />
          <span className="services-ux-theory__connector-dot" />
          <span className="services-ux-theory__connector-line" />
        </div>

        <header className="services-ux-theory__header services-ux-theory__reveal">
          <p className="services-ux-theory__eyebrow">{HEADER.eyebrow}</p>
          <h2 className="services-ux-theory__statement" id={headingId}>
            {HEADER.statement}
          </h2>
          <p className="services-ux-theory__lede">{HEADER.lede}</p>
        </header>

        <Row className="services-ux-theory__row services-ux-theory__row--pillars">
          {pillars.map((p, i) => (
            <Col
              id={`about-why-pillar-${i + 1}`}
              key={p.num}
              xs={12}
              md={4}
              className="services-ux-theory__col services-ux-theory__reveal"
            >
              <div className="services-ux-theory__cover">
                <div className="services-ux-theory__num-wrap">
                  <span className="services-ux-theory__number">{p.num}.</span>
                </div>
                <h3 className="services-ux-theory__title">{p.title}</h3>
                <p className="services-ux-theory__text">{p.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutWhyStudioSection;
