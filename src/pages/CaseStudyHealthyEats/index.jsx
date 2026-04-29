import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import WorksSection from '@/pages/uxuimate/components/WorksSection';
import ServicesSection from '@/pages/uxuimate/components/ServicesSection';
import AboutSection from '@/pages/uxuimate/components/AboutSection';
import OurProcessSection from '@/pages/uxuimate/components/OurProcessSection';
import ServicesUxTheorySection from '@/pages/Services/components/ServicesUxTheorySection';
import VideoCaseSectionDots from '@/pages/CaseStudyVideoNabliudenie/VideoCaseSectionDots';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import { CONTACT_BRIEF_ANCHOR } from '@/constants/booking';
import HealthyEatsHeroSlider from './HealthyEatsHeroSlider';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery & Brief', text: 'Defined product goals, pain points, and UX success criteria with stakeholders.' },
  { number: '02', title: 'UX Research & Analysis', text: 'Usability testing with 5 users identified hierarchy, CTA, and navigation issues.' },
  { number: '03', title: 'Information Architecture', text: 'Reworked content structure for faster comparison and clearer decision paths.' },
  { number: '04', title: 'Wireframing', text: 'Mapped low-fidelity user journeys for browsing, basket, payment, and delivery.' },
  { number: '05', title: 'UI Prototyping', text: 'Created high-fidelity interactive prototypes to validate redesigned flows.' },
  { number: '06', title: 'Iteration Cycles', text: 'Refined layout, copy hierarchy, and interaction cues through feedback rounds.' },
  { number: '07', title: 'Usability Testing', text: 'Retested core journeys to reduce hesitation and improve completion confidence.' },
  { number: '08', title: 'Design Handoff', text: 'Delivered final UX/UI files with components, annotations, and implementation guidance.' }
];

const BRIEF_ITEMS = [
  { number: '01', name: 'Context', description: 'A production food-ordering app had weak visual hierarchy and inconsistent interface patterns.' },
  { number: '02', name: 'Core Challenge', description: 'Users struggled to compare options and complete checkout confidently due to cognitive overload.' },
  { number: '03', name: 'Strategic Goal', description: 'Create clear structure, predictable flows, and faster product-to-checkout progression.' },
  { number: '04', name: 'Execution Focus', description: 'Ship a system-driven redesign with reusable components and one-primary-action logic.' }
];

const HOW_SOLVED = [
  {
    id: 'how-solved-1',
    eyebrow: 'Hierarchy & Scanability',
    heading: 'Content → price → action rhythm',
    text: 'Card layouts were standardized so users can quickly scan products, compare options, and identify next actions without reading unnecessary detail.',
    image: '/img/works/healthy-eats/how-1.jpg'
  },
  {
    id: 'how-solved-2',
    eyebrow: 'Checkout Architecture',
    heading: 'Linear flow with predictable next steps',
    text: 'Basket, payment, and delivery were structured as one clear progression to reduce hesitation and remove ambiguity at each checkout decision point.',
    image: '/img/works/healthy-eats/how-2.jpg'
  },
  {
    id: 'how-solved-3',
    eyebrow: 'Design System',
    heading: 'Reusable patterns that scale',
    text: 'A reusable component system ensured visual consistency, reduced re-learning, and made future product growth possible without redesign debt.',
    image: '/img/works/healthy-eats/how-3.jpg'
  }
];

const OUTCOMES = [
  { value: '05', title: 'Usability participants informed key decisions', text: 'Real testing exposed friction in hierarchy, CTA clarity, and checkout sequencing before finalizing the redesign.' },
  { value: '01', title: 'Primary action per screen', text: 'Each screen now emphasizes one dominant next step, reducing decision paralysis and improving user confidence.' },
  { value: '100%', title: 'System-driven consistency across flows', text: 'Reusable UI patterns keep browsing, comparison, and checkout behavior predictable across mobile and desktop.' }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Lower cognitive load, clearer decisions, stronger checkout confidence.',
  lede: 'The redesign replaced friction-heavy journeys with predictable, system-led product and checkout flows.'
};

const HealthyEatsCaseStudyPage = () => {
  useReveal();
  const [compareA, setCompareA] = useState(50);
  const [compareB, setCompareB] = useState(50);

  const createCompareHandlers = setter => ({
    onMouseMove: event => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const value = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setter(value);
    },
    onMouseLeave: () => setter(50),
    onTouchMove: event => {
      const touch = event.touches?.[0];
      if (!touch) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const value = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setter(value);
    }
  });

  const compareAHandlers = createCompareHandlers(setCompareA);
  const compareBHandlers = createCompareHandlers(setCompareB);
  useEffect(() => {
    const $ = window.jQuery || window.$;
    if ($) $('.main-page-section').show();
    else document.querySelectorAll('.main-page-section').forEach(el => { el.style.display = 'block'; });
    toggleDocumentAttribute('data-spy', 'scroll', 'body');
    toggleDocumentAttribute('data-target', '.navbar', 'body');
    toggleDocumentAttribute('data-offset', '90', 'body');
    return () => {
      toggleDocumentAttribute('data-spy', 'scroll', 'body', true);
      toggleDocumentAttribute('data-target', '.navbar', 'body', true);
      toggleDocumentAttribute('data-offset', '90', 'body', true);
    };
  }, []);

  return (
    <div className="main-page-section video-case-page">
      <Helmet><title>Healthy Eats Redesign — UX UI MATE</title></Helmet>
      <NavigationBar />
      <HealthyEatsHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">Healthy Eats</h3>
            <p className="video-case-meta-bar__text">Product redesign project</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.04">
            <span className="video-case-meta-bar__num">02 Project Timeline</span>
            <h3 className="video-case-meta-bar__title">2025</h3>
            <p className="video-case-meta-bar__text">Research to delivery</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.08">
            <span className="video-case-meta-bar__num">03 Role</span>
            <h3 className="video-case-meta-bar__title">Product UI Redesign</h3>
            <p className="video-case-meta-bar__text">UX-led UI execution</p>
          </div>
        </Container>
      </section>

      <ServicesSection
        id="brief"
        sectionLabel="The Brief"
        heading="Built to remove checkout friction at scale."
        statValue="01"
        statLabel="Case study brief"
        showStat={false}
        items={BRIEF_ITEMS}
        showAtmosphere={false}
        footerHref={CONTACT_BRIEF_ANCHOR}
        footerText="Discuss your project"
      />

      <OurProcessSection
        id="process"
        eyebrow="Our Process"
        heading="How this case study was delivered, step by step."
        intro="Eight clear delivery phases from discovery to post-launch support."
        steps={PROCESS_STEPS}
        backgroundImage="/img/works/healthy-eats/hero-1.jpg"
        showCta={false}
      />

      {HOW_SOLVED.map(item => (
        <AboutSection
          key={item.id}
          id={item.id}
          backgroundImage={item.image}
          backgroundPosition={item.id === 'how-solved-2' ? 'center center' : 'center top'}
          eyebrow={item.eyebrow}
          title={item.heading}
          paragraphs={[item.text]}
          linkHref=""
          showAtmosphere={false}
        />
      ))}

      <section className="he-video-showcase" aria-label="Healthy Eats product video">
        <Container>
          <div className="he-video-showcase__header reveal-up">
            <p className="he-video-showcase__eyebrow">Product walkthrough</p>
            <h2>Live product flow preview</h2>
            <p>A real interaction capture showing the redesigned Healthy Eats experience across key moments.</p>
          </div>
          <div className="he-video-showcase__frame reveal-up" data-delay="0.05">
            <video autoPlay loop muted playsInline preload="metadata" controls>
              <source src="/img/works/healthy-eats/healthy-eats-web.mp4" type="video/mp4" />
            </video>
          </div>
        </Container>
      </section>

      <section className="he-before-after" aria-label="Before and after redesign comparison">
        <Container>
          <div className="he-before-after__header reveal-up">
            <p className="he-before-after__eyebrow">Transformation</p>
            <h2>Before vs After</h2>
            <p>Side-by-side interaction comparisons that highlight hierarchy, clarity, and checkout flow improvements.</p>
          </div>

          <div className="he-compare reveal-up" data-delay="0.04">
            <div className="he-compare__media" {...compareAHandlers}>
              <img src="/img/works/healthy-eats/after-home-product.jpg" alt="Healthy Eats redesign after state for home and product views" />
              <div className="he-compare__before" style={{ clipPath: `inset(0 ${100 - compareA}% 0 0)` }}>
                <img src="/img/works/healthy-eats/before-home-product.jpg" alt="Healthy Eats original before state for home and product views" />
              </div>
              <div className="he-compare__handle" style={{ left: `${compareA}%` }} aria-hidden="true" />
              <span className="he-compare__label he-compare__label--before">Before</span>
              <span className="he-compare__label he-compare__label--after">After</span>
            </div>
          </div>

          <div className="he-compare reveal-up" data-delay="0.08">
            <div className="he-compare__media" {...compareBHandlers}>
              <img src="/img/works/healthy-eats/after-checkout.jpg" alt="Healthy Eats redesign after state for basket, payment, and delivery" />
              <div className="he-compare__before" style={{ clipPath: `inset(0 ${100 - compareB}% 0 0)` }}>
                <img src="/img/works/healthy-eats/before-checkout.jpg" alt="Healthy Eats original before state for basket, payment, and delivery" />
              </div>
              <div className="he-compare__handle" style={{ left: `${compareB}%` }} aria-hidden="true" />
              <span className="he-compare__label he-compare__label--before">Before</span>
              <span className="he-compare__label he-compare__label--after">After</span>
            </div>
          </div>
        </Container>
      </section>

      <ServicesUxTheorySection
        sectionId="outcomes"
        headingId="healthy-eats-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/healthy-eats/how-2.jpg"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['healthy-eats']} />

      <section className="video-case-book-banner" aria-label="Book a call">
        <Container className="video-case-book-banner__container text-center reveal-up">
          <p className="video-case-book-banner__eyebrow">Next step</p>
          <h2>Book a free 30-minute call.</h2>
          <p>We will review your project and give you a clear next-step recommendation.</p>
          <Link className="btn btn-white btn-rounded btn-large" to="/contact#book-a-call">Book 30-min call →</Link>
        </Container>
      </section>

      <Footer />
      <BackToTop />
      <VideoCaseSectionDots />
      <AnimatedCursor />
    </div>
  );
};

export default HealthyEatsCaseStudyPage;
