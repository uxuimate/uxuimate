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
import EcoHerbalistBrandingHeroSlider from './EcoHerbalistBrandingHeroSlider';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery & Brief', text: 'Brand goals, audience values, and competitive positioning were mapped upfront.' },
  { number: '02', title: 'Research & Brand Analysis', text: 'Market and visual landscape review identified differentiation opportunities.' },
  { number: '03', title: 'Creative Direction', text: 'Nature-led but premium design direction defined tone, mood, and visual intent.' },
  { number: '04', title: 'Identity Design', text: 'Logo system, color strategy, and typography pairings were crafted for consistency.' },
  { number: '05', title: 'System Validation', text: 'Applications were tested across digital and physical contexts for coherence.' },
  { number: '06', title: 'Asset Production', text: 'Core brand assets were prepared for web, social, print, and packaging use.' },
  { number: '07', title: 'Guideline Structuring', text: 'Rules and examples were documented to prevent drift and reduce revision cycles.' },
  { number: '08', title: 'Handoff & Support', text: 'Final handbook and practical support enabled confident rollout across channels.' }
];

const BRIEF_ITEMS = [
  { number: '01', name: 'Context', description: 'Eco Herbalist needed a stronger identity to stand out in a saturated wellness market.' },
  { number: '02', name: 'Core Challenge', description: 'Existing visuals felt generic and lacked consistent standards across touchpoints.' },
  { number: '03', name: 'Strategic Goal', description: 'Create a distinctive brand system that builds recognition, trust, and conversion momentum.' },
  { number: '04', name: 'Execution Focus', description: 'Deliver a practical, scalable identity manual for real-world implementation.' }
];

const HOW_SOLVED = [
  {
    id: 'how-solved-1',
    eyebrow: 'Typography & Color System',
    heading: 'Clarity through controlled visual language',
    text: 'A deliberate typography and color system balanced warmth, readability, and premium perception across digital and print environments.',
    image: '/img/works/eco-herbalist-branding/how-1.jpg'
  },
  {
    id: 'how-solved-2',
    eyebrow: 'Guideline Depth',
    heading: 'One source of truth for execution',
    text: 'Clear application rules were created for layouts, imagery, and assets to keep the brand consistent regardless of channel or vendor.',
    image: '/img/works/eco-herbalist-branding/how-2.jpg'
  },
  {
    id: 'how-solved-3',
    eyebrow: 'Brand Applications',
    heading: 'Systemized touchpoint rollout',
    text: 'The identity was translated across social, web, packaging, and collateral so every customer interaction reinforces the same brand signal.',
    image: '/img/works/eco-herbalist-branding/how-3.jpg'
  }
];

const OUTCOMES = [
  { value: '37', title: 'Pages of brand system documentation', text: 'A complete handbook gives teams and partners clear standards for consistent rollout and faster execution.' },
  { value: '60%', title: 'Fewer design revision cycles', text: 'Structured rules reduced ambiguity, helping production teams ship assets with fewer rounds of correction.' },
  { value: '40%', title: 'Stronger brand recognition signal', text: 'Consistent identity across channels improved memorability and credibility in a highly competitive category.' }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Distinctive identity, faster execution, measurable brand lift.',
  lede: 'The branding system became a practical growth asset, not just a visual refresh.'
};

const EcoHerbalistBrandingCaseStudyPage = () => {
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
      <Helmet><title>Eco Herbalist Branding — UX UI MATE</title></Helmet>
      <NavigationBar />
      <EcoHerbalistBrandingHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">Eco Herbalist</h3>
            <p className="video-case-meta-bar__text">Branding project owner</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.04">
            <span className="video-case-meta-bar__num">02 Project Timeline</span>
            <h3 className="video-case-meta-bar__title">2024</h3>
            <p className="video-case-meta-bar__text">Strategy to handoff</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.08">
            <span className="video-case-meta-bar__num">03 Role</span>
            <h3 className="video-case-meta-bar__title">Brand Identity Design</h3>
            <p className="video-case-meta-bar__text">Visual system delivery</p>
          </div>
        </Container>
      </section>

      <ServicesSection
        id="brief"
        sectionLabel="The Brief"
        heading="Built to make the brand unmistakable."
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
        backgroundImage="/img/works/eco-herbalist-branding/hero-1.jpg"
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
        headingId="eco-herbalist-branding-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/eco-herbalist-branding/hero-3.jpg"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['eco-herbalist-brand']} />

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

export default EcoHerbalistBrandingCaseStudyPage;
