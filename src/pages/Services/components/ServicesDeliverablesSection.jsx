import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import gsap from 'gsap';
import { CONTACT_BRIEF_ANCHOR } from '@/constants/booking';
import MobileSliderHint from '@/components/MobileSliderHint';

const UX_TIERS = [
  {
    name: 'STARTER',
    price: 'Price from £2000',
    lead: 'For teams who need a solid foundation.',
    items: [
      'Stakeholder interview - 1 session',
      'Information architecture & user flow',
      '5 designed screens',
      'Clickable prototype',
      '1 revision round',
      'Files ready for your developer'
    ],
    cta: 'Start your project'
  },
  {
    name: 'GROWTH',
    badge: 'Most Popular',
    price: 'Price from £4000',
    lead: 'For teams ready to design, test, and launch.',
    items: [
      'User & stakeholder interviews - up to 3 sessions',
      'Information architecture & user flow',
      '15 designed screens',
      'Clickable prototype',
      'Redesign based on real feedback',
      '3 revision rounds',
      'Files ready for your developer'
    ],
    cta: 'Start your project',
    featured: true
  },
  {
    name: 'ENTERPRISE',
    price: 'Price from Custom',
    lead: 'For teams who need the full picture.',
    items: [
      'User & stakeholder interviews - up to 6 sessions',
      'Full information architecture & user flows',
      'Up to 40 designed screens',
      'Advanced prototype for stakeholder sign-off',
      'Full redesign cycles based on research',
      'Up to 6 revision rounds',
      'Dedicated design team',
      'Priority turnaround'
    ],
    cta: "Let's talk"
  }
];

const DEV_TIERS = [
  {
    name: 'Starter',
    price: 'Price from £2,000',
    lead: 'For small businesses & landing pages',
    items: [
      'Landing page or business website',
      'Up to 5 pages',
      'Contact form & basic integrations',
      'Mobile friendly & fast loading',
      'Handed over ready to use'
    ],
    cta: 'Discuss Scope'
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    price: 'Price from £4,000',
    lead: 'For growing businesses & online stores',
    items: [
      'Full business website or ecommerce store',
      'Up to 10 pages',
      'Product catalogue & payment setup',
      'Booking systems or lead capture',
      'Blog or content management',
      '4 weeks of post-launch support'
    ],
    cta: 'Start Your Build',
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Price from Custom',
    lead: 'For larger businesses & custom builds',
    items: [
      'Everything in Growth',
      'Custom web applications',
      'Third-party integrations & APIs',
      'Dedicated lead developer',
      'Ongoing maintenance & updates'
    ],
    cta: "Let's Talk"
  }
];

const UX_HEADER = {
  eyebrow: 'What you actually get',
  title: 'Deliverables by engagement tier',
  lede: 'Three clear stacks - from research-only to full product UI. Every item is something you can hand to a stakeholder or a developer, not a vague "strategy deck" with no next step.'
};

const DEV_HEADER = {
  eyebrow: 'What you actually get',
  title: 'Engagement by build depth',
  lede: 'Three clear ways to work with us on web: from a sharp first release to a platform your team can extend for years. No mystery scope - you always know what ships.'
};

const BRAND_TIERS = [
  {
    name: 'Basic',
    price: 'Price from £1,200',
    lead: 'For new businesses & startups',
    items: [
      'Logo design - 3 concepts',
      'Colour palette',
      'Typography selection',
      '2 revision rounds',
      'All files ready to use'
    ],
    cta: 'Discuss scope'
  },
  {
    name: 'Pro',
    badge: 'Most Popular',
    price: 'Price from £2,500',
    lead: 'For businesses ready to look the part',
    items: [
      'Logo design - 3 concepts',
      'Full colour & typography system',
      'Brand guidelines document',
      'Social media kit',
      'Marketing asset templates',
      '3 revision rounds'
    ],
    cta: 'Start your brand',
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Price from £4,500',
    lead: 'For businesses that need the full picture',
    items: [
      'Everything in Pro',
      'Full visual identity system',
      'Website-ready brand assets',
      'Icon set & illustration style',
      'Brand launch support',
      'Unlimited revisions'
    ],
    cta: "Let's talk"
  }
];

const BRAND_HEADER = {
  eyebrow: 'What you actually get',
  title: 'Branding packages',
  lede: 'Three clear tiers - from a focused logo system to a full identity you can ship everywhere without guesswork.'
};

const MOBILE_TIERS = [
  {
    name: 'Starter',
    price: 'Price from £2,500',
    lead: 'For early-stage startups & MVPs',
    items: [
      'User & stakeholder interview - 1 session',
      'User flow & information architecture',
      'Up to 8 designed screens',
      'Clickable prototype',
      '1 revision round',
      'Files ready for your developer'
    ],
    cta: 'Start your project'
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    price: 'Price from £5,500',
    lead: 'For funded teams ready to launch',
    items: [
      'User & stakeholder interviews - up to 3 sessions',
      'Full user flow & information architecture',
      'Up to 20 designed screens',
      'Clickable prototype',
      'Redesign based on real feedback',
      '3 revision rounds',
      'Files ready for your developer'
    ],
    cta: 'Start your project',
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Price from Custom',
    lead: 'For scaling products & larger teams',
    items: [
      'User & stakeholder interviews - up to 6 sessions',
      'Full information architecture & user flows',
      'Up to 40 designed screens',
      'Advanced prototype for stakeholder sign-off',
      'Full redesign cycles based on research',
      'Up to 6 revision rounds',
      'Dedicated design team',
      'Priority turnaround'
    ],
    cta: "Let's talk"
  }
];

const MOBILE_HEADER = {
  eyebrow: 'What you actually get',
  title: 'Mobile & SaaS packages',
  lede: 'Three clear tiers - from a focused MVP to full product design your developers can ship without guesswork.'
};

const DELIVERABLES_CTA_TEXT = 'Send your brief';

const ServicesDeliverablesSection = ({ serviceMode = 'default' }) => {
  const sectionRef = useRef(null);
  const isDev = serviceMode === 'development';
  const isBrand = serviceMode === 'branding';
  const isMobile = serviceMode === 'mobile';
  const tiers = isMobile ? MOBILE_TIERS : isBrand ? BRAND_TIERS : isDev ? DEV_TIERS : UX_TIERS;
  const header = isMobile ? MOBILE_HEADER : isBrand ? BRAND_HEADER : isDev ? DEV_HEADER : UX_HEADER;
  const hId = isMobile ? 'services-deliverables-heading-mobile' : isBrand ? 'services-deliverables-heading-brand' : isDev ? 'services-deliverables-heading-dev' : 'services-deliverables-heading';

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
      const items = el.querySelectorAll('.services-deliverables__reveal');

      gsap.from(items, {
        opacity: 0,
        y: 40,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });
    }, el);

    return () => ctx.revert();
  }, [serviceMode]);

  return <section
      key={isMobile ? 'deliverables-mobile' : isBrand ? 'deliverables-brand' : isDev ? 'deliverables-dev' : 'deliverables-ux'}
      ref={sectionRef}
      className="services-deliverables"
      id="services-deliverables"
      aria-labelledby={hId}
    >
      <Container className="services-deliverables__container">
        <header className="services-deliverables__header services-deliverables__reveal">
          <p className="services-deliverables__eyebrow">{header.eyebrow}</p>
          <h2 className="services-deliverables__title" id={hId}>
            {header.title}
          </h2>
          <p className="services-deliverables__lede">
            {header.lede}
          </p>
        </header>

        <Row className="services-deliverables__row services-deliverables__row--fan services-deliverables__row--three g-0 mobile-card-slider">
          {tiers.map(t => <Col key={t.name} md={4} xs={12} className="services-deliverables__reveal services-deliverables__col mobile-card-slide">
              <article className={'services-deliverables__card' + (t.featured ? ' services-deliverables__card--featured' : '')}>
                <div className="services-deliverables__card-head">
                  <h3 className="services-deliverables__name">{t.name}</h3>
                  {t.badge ? <p className="services-deliverables__ribbon" aria-label={t.badge}>
                      {t.badge}
                    </p> : null}
                </div>
                <p className="services-deliverables__price">{t.price}</p>
                <p className="services-deliverables__lead">{t.lead}</p>
                <ul className="services-deliverables__list" role="list">
                  {t.items.map(item => <li key={item} className="services-deliverables__item">{item}</li>)}
                </ul>
                <a className="btn btn-transparent-white btn-rounded btn-large services-deliverables__btn" href={CONTACT_BRIEF_ANCHOR}>
                  {DELIVERABLES_CTA_TEXT}
                </a>
              </article>
            </Col>)}
        </Row>
        <MobileSliderHint dotCount={tiers.length} />
      </Container>
    </section>;
};

export default ServicesDeliverablesSection;
