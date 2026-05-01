import { useEffect } from 'react';
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
import EcoHerbalistUxHeroSlider from './EcoHerbalistUxHeroSlider';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery & Brief', text: 'Defined product goals, user needs, and success criteria for the UX redesign scope.' },
  { number: '02', title: 'UX Research & Analysis', text: 'Audited current flows and usability issues to identify trust and navigation barriers.' },
  { number: '03', title: 'Information Architecture', text: 'Restructured product discovery and content hierarchy to reduce cognitive load.' },
  { number: '04', title: 'Wireframing', text: 'Created low-fidelity flow structures for key journeys including product and checkout paths.' },
  { number: '05', title: 'UI Prototyping', text: 'Built high-fidelity interactive prototypes in Figma for realistic user validation.' },
  { number: '06', title: 'Iteration Cycles', text: 'Refined layouts, labels, and interactions through multiple design-feedback rounds.' },
  { number: '07', title: 'Usability Testing', text: 'Validated revised journeys with users to improve confidence and task completion.' },
  { number: '08', title: 'Design Handoff', text: 'Delivered final UX/UI files with clear components, annotations, and implementation guidance.' }
];

const BRIEF_ITEMS = [
  { number: '01', name: 'Context', description: 'Eco Herbalist needed to launch a wellness eCommerce experience users could trust.' },
  { number: '02', name: 'Core Challenge', description: 'Visitors struggled with vague product claims, weak navigation, and checkout hesitation.' },
  { number: '03', name: 'Strategic Goal', description: 'Enable confident purchases through clear information, trust cues, and simpler journeys.' },
  { number: '04', name: 'Execution Focus', description: 'Combine UX research and system-driven UI to improve clarity, trust, and conversion.' }
];

const HOW_SOLVED = [
  {
    id: 'how-solved-1',
    eyebrow: 'Readability & Content Clarity',
    heading: 'Information users can trust quickly',
    text: 'Typography, spacing, and section hierarchy were upgraded so users could evaluate products without cognitive overload or uncertainty.',
    image: '/img/works/eco-herbalist-ux/how-1.webp'
  },
  {
    id: 'how-solved-2',
    eyebrow: 'Checkout Flow Refinement',
    heading: 'Fewer points of hesitation',
    text: 'Checkout structure was simplified with clearer progression, stronger support cues, and persistent order visibility.',
    image: '/img/works/eco-herbalist-ux/how-2.webp'
  },
  {
    id: 'how-solved-3',
    eyebrow: 'Trust Architecture',
    heading: 'Credibility embedded in UI',
    text: 'Clear product details, transparent sections, and cleaner visual hierarchy built confidence required for wellness-related purchase decisions.',
    image: '/img/works/eco-herbalist-ux/how-3.webp'
  }
];

const OUTCOMES = [
  { value: '100%', title: 'Task success in usability validation', text: 'Post-redesign testing showed users could complete key product and checkout tasks without blockers.' },
  { value: '70%', title: 'Preference for symptom-based discovery', text: 'Most participants preferred symptom-led product paths, improving findability and decision speed.' },
  { value: '03', title: 'Step checkout for stronger completion', text: 'A simplified three-step checkout flow reduced confusion and created more predictable purchase progression.' }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Trust, clarity, and conversion alignment in one system.',
  lede: 'The redesign removed key friction points and enabled confident purchasing behavior for wellness users.'
};

const EcoHerbalistUxCaseStudyPage = () => {
  useReveal();
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
      <Helmet><title>Eco Herbalist UX — UX UI MATE</title></Helmet>
      <NavigationBar />
      <EcoHerbalistUxHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">Eco Herbalist</h3>
            <p className="video-case-meta-bar__text">Wellness eCommerce project</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.04">
            <span className="video-case-meta-bar__num">02 Project Timeline</span>
            <h3 className="video-case-meta-bar__title">August 2025</h3>
            <p className="video-case-meta-bar__text">Research to delivery</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.08">
            <span className="video-case-meta-bar__num">03 Role</span>
            <h3 className="video-case-meta-bar__title">UX Research &amp; Design</h3>
            <p className="video-case-meta-bar__text">Services delivered</p>
          </div>
        </Container>
      </section>

      <ServicesSection
        id="brief"
        sectionLabel="The Brief"
        heading="Built to make wellness decisions feel safe and clear."
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
        backgroundImage="/img/works/eco-herbalist-ux/hero-1.webp"
        showCta={false}
      />

      {HOW_SOLVED.map(item => (
        <AboutSection
          key={item.id}
          id={item.id}
          backgroundImage={item.image}
          backgroundPosition="center top"
          eyebrow={item.eyebrow}
          title={item.heading}
          paragraphs={[item.text]}
          linkHref=""
          showAtmosphere={false}
        />
      ))}

      <ServicesUxTheorySection
        sectionId="outcomes"
        headingId="eco-herbalist-ux-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/eco-herbalist-ux/hero-3.webp"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['eco-herbalist-ux']} />

      <section className="video-case-book-banner" aria-label="Book a call">
        <Container className="video-case-book-banner__container text-center reveal-up">
          <p className="video-case-book-banner__eyebrow">Next step</p>
          <h2>Book a free 30-minute call.</h2>
          <p>We will review your project and give you a clear next-step recommendation.</p>
          <Link className="btn btn-white btn-rounded btn-large" to="/contact?section=book-a-call">Book 30-min call →</Link>
        </Container>
      </section>

      <Footer />
      <BackToTop />
      <VideoCaseSectionDots />
      <AnimatedCursor />
    </div>
  );
};

export default EcoHerbalistUxCaseStudyPage;
