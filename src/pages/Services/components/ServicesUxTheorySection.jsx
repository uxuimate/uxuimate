import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import gsap from 'gsap';
import MobileSliderHint from '@/components/MobileSliderHint';
import designThinkingBg from '../assets/design-thinking.webp';
import webDevTheoryBg from '../assets/web-dev-theory.webp';
import brandingTheoryBg from '../assets/branding-theory.webp';
import mobileSaasTheoryBg from '../assets/mobile-saas-theory.webp';

const uxPillars = [
  {
    num: '01',
    title: 'Before any screen',
    text: 'Most teams skip the thinking and go straight to screens. We don\'t. Before anything is designed, we map how your users actually behave - where they hesitate, where they drop off.'
  },
  {
    num: '02',
    title: 'Decisions, not decoration',
    text: 'That research shapes everything. Every flow, every layout, every interaction is designed around a real decision your user needs to make. Nothing is decorative. Nothing is guesswork.'
  },
  {
    num: '03',
    title: 'Effortless for a reason',
    text: 'The result is a product that feels effortless to use - because the hard work happened long before the visuals did.'
  }
];

const devPillars = [
  {
    num: '01',
    title: 'Built for your business',
    text: 'Whether you need a landing page, a full website, or an online store - we build it properly the first time. No shortcuts, no templates you can\'t control.'
  },
  {
    num: '02',
    title: 'Designed to grow with you',
    text: 'We build on React, Framer, and Squarespace depending on what fits your needs. Small business today, bigger tomorrow - your site grows with you.'
  },
  {
    num: '03',
    title: 'You stay in control',
    text: 'We hand everything over clean - you\'ll never be locked out of your own website or dependent on us to make a simple change.'
  }
];

const UX_HEADER = {
  eyebrow: 'What UX is - and who it\'s for',
  statement: "Great UX isn't invisible by accident.",
  lede: 'For teams who need product experience that carries people from first glance to confident action - not just pretty screens.'
};

const DEV_HEADER = {
  eyebrow: 'How We Build For You',
  statement: 'Your website should work as hard as you do.',
  lede: 'For businesses who need a partner that speaks plain English, delivers on time, and builds something you actually own.'
};

const brandPillars = [
  {
    num: '01',
    title: 'Digital-first thinking',
    text: 'Most branding is built for print. We build yours for screens - your website, your social, your product. Every element is designed to look sharp and consistent wherever your audience sees it.'
  },
  {
    num: '02',
    title: 'More than a logo',
    text: 'A logo without a system falls apart. We give you colours, typography, and visual rules that make every touchpoint feel like it came from the same confident place.'
  },
  {
    num: '03',
    title: 'Built to hand over',
    text: 'You get everything you need to use your brand independently - no coming back to us every time you need a banner or a social post.'
  }
];

const BRAND_HEADER = {
  eyebrow: 'What it is',
  statement: 'Your brand is the first thing people judge you on.',
  lede: 'Visual identity that works on screens first - so every touchpoint looks like the same confident business.'
};

const mobilePillars = [
  {
    num: '01',
    title: 'We design around real users',
    text: 'Before any screen is designed, we map how your users move through your product - where they get confused, where they drop off, and what keeps them coming back.'
  },
  {
    num: '02',
    title: 'Every screen has a job',
    text: 'Whether it\'s an onboarding flow, a dashboard, or a checkout - every screen is designed to move your user one step closer to the outcome they came for.'
  },
  {
    num: '03',
    title: 'Ready for your dev team',
    text: 'We hand off production-ready designs with clear specs, component notes, and a clickable prototype - so your developers can build without guessing.'
  }
];

const MOBILE_SAAS_HEADER = {
  eyebrow: 'What it is',
  statement: 'Complex products, made simple.',
  lede: 'For startups and product teams who need more than pretty screens - they need something people actually use.'
};

const ServicesUxTheorySection = ({
  serviceMode = 'default',
  sectionId,
  headingId,
  headerOverride,
  pillarsOverride,
  backgroundImage,
  className = ''
}) => {
  const sectionRef = useRef(null);
  const isDev = serviceMode === 'development';
  const isBrand = serviceMode === 'branding';
  const isMobile = serviceMode === 'mobile';
  const bgDefault = isMobile ? mobileSaasTheoryBg : isBrand ? brandingTheoryBg : isDev ? webDevTheoryBg : designThinkingBg;
  const bg = backgroundImage || bgDefault;
  const pillarsDefault = isMobile ? mobilePillars : isBrand ? brandPillars : isDev ? devPillars : uxPillars;
  const pillars = pillarsOverride || pillarsDefault;
  const headerDefault = isMobile ? MOBILE_SAAS_HEADER : isBrand ? BRAND_HEADER : isDev ? DEV_HEADER : UX_HEADER;
  const header = headerOverride || headerDefault;
  const resolvedHeadingId = headingId || (isMobile ? 'services-mobile-theory-heading' : isBrand ? 'services-brand-theory-heading' : isDev ? 'services-dev-theory-heading' : 'services-ux-theory-heading');
  const resolvedSectionId = sectionId || 'services-ux-theory';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      return undefined;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
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
  }, [serviceMode]);

  return <section
      ref={sectionRef}
      className={`services-ux-theory services-ux-theory--has-bg ${className}`.trim()}
      id={resolvedSectionId}
      aria-labelledby={resolvedHeadingId}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Container className="services-ux-theory__container">
        <div className="services-ux-theory__connector services-ux-theory__reveal" aria-hidden="true">
          <span className="services-ux-theory__connector-line" />
          <span className="services-ux-theory__connector-dot" />
          <span className="services-ux-theory__connector-line" />
        </div>

        <header className="services-ux-theory__header services-ux-theory__reveal">
          <p className="services-ux-theory__eyebrow">{header.eyebrow}</p>
          <h2 className="services-ux-theory__statement" id={resolvedHeadingId}>
            {header.statement}
          </h2>
          <p className="services-ux-theory__lede">
            {header.lede}
          </p>
        </header>

        <Row className="services-ux-theory__row services-ux-theory__row--pillars mobile-card-slider">
          {pillars.map((p, i) => <Col
              id={`services-ux-pillar-${i + 1}`}
              key={p.num}
              xs={12}
              md={4}
              className="services-ux-theory__col services-ux-theory__reveal mobile-card-slide"
            >
              <div className="services-ux-theory__cover">
                <div className="services-ux-theory__num-wrap">
                  <span className="services-ux-theory__number">{p.num}.</span>
                </div>
                <h3 className="services-ux-theory__title">{p.title}</h3>
                <p className="services-ux-theory__text">{p.text}</p>
              </div>
            </Col>)}
        </Row>
        <MobileSliderHint dotCount={pillars.length} />
      </Container>
    </section>;
};

export default ServicesUxTheorySection;
