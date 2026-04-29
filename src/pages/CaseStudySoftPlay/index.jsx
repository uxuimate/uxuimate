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
import SoftPlayHeroSlider from './SoftPlayHeroSlider';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery & Brief', text: 'Business goals, audience, and sales bottlenecks mapped before design execution.' },
  { number: '02', title: 'UX Research & Analysis', text: 'Competitor and flow analysis to identify trust gaps and conversion friction.' },
  { number: '03', title: 'Visual Direction', text: 'Professional direction aligned to international B2B credibility and proof-first storytelling.' },
  { number: '04', title: 'UI Design & Prototyping', text: 'Responsive bilingual interface design in Figma across key landing and service flows.' },
  { number: '05', title: 'Usability Testing', text: 'Validation around multilingual navigation, service clarity, and inquiry steps.' },
  { number: '06', title: 'Frontend Development', text: 'Responsive implementation with clean structure and performance-focused delivery.' },
  { number: '07', title: 'On-Page SEO', text: 'Bilingual metadata, heading hierarchy, and content structure tuned for discoverability.' },
  { number: '08', title: 'Launch & Support', text: 'Post-launch QA and optimization for inquiry quality and operational handoff.' }
];

const BRIEF_ITEMS = [
  { number: '01', name: 'Context', description: 'A 10+ year playground construction business had no official website despite 100+ completed projects in 21 countries.' },
  { number: '02', name: 'Core Challenge', description: 'Sales conversations lacked instant proof and credibility because projects and certifications were not visible online.' },
  { number: '03', name: 'Strategic Goal', description: 'Build a bilingual website that works as a 24/7 sales tool and supports international lead generation.' },
  { number: '04', name: 'Execution Focus', description: 'Combine UX, UI, development, and conversion strategy into one coherent digital platform.' }
];

const HOW_SOLVED = [
  {
    id: 'how-solved-1',
    eyebrow: 'Visual Trust Through Projects',
    heading: 'Proof-first project storytelling',
    text: 'A curated set of completed installations was prioritized to establish credibility quickly and support decision-making in early sales conversations.',
    image: '/img/works/soft-play-solutions/hero-2.jpg'
  },
  {
    id: 'how-solved-2',
    eyebrow: 'Service Architecture',
    heading: 'Clear hierarchy for revenue services',
    text: 'Core services were structured with straightforward explanations and direct paths to contact, reducing friction between interest and enquiry.',
    image: '/img/works/soft-play-solutions/how-2.jpg'
  },
  {
    id: 'how-solved-3',
    eyebrow: 'Conversion & International Reach',
    heading: 'Bilingual journeys with inquiry focus',
    text: 'Bulgarian and English content, strategic CTAs, and form-driven lead capture transformed the site into a continuous sales support channel.',
    image: '/img/works/soft-play-solutions/how-3.jpg'
  }
];

const OUTCOMES = [
  { value: '21+', title: 'Countries supported by bilingual presence', text: 'The new site supports international communication with seamless Bulgarian and English content paths.' },
  { value: '100+', title: 'Projects converted into trust assets', text: 'Completed work now actively supports sales by giving prospects immediate visual proof of delivery capability.' },
  { value: '24/7', title: 'Lead capture and enquiry readiness', text: 'Inquiry-focused structure and automated form flows now generate opportunities continuously beyond office hours.' }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'From zero digital presence to a conversion-ready portfolio.',
  lede: 'The website now supports trust, international reach, and lead generation as an always-on sales tool.'
};

const SoftPlayCaseStudyPage = () => {
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
      <Helmet><title>Soft Play Solutions — UX UI MATE</title></Helmet>
      <NavigationBar />
      <SoftPlayHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">Soft Play Solutions</h3>
            <p className="video-case-meta-bar__text">Primary project owner</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.04">
            <span className="video-case-meta-bar__num">02 Project Timeline</span>
            <h3 className="video-case-meta-bar__title">2025</h3>
            <p className="video-case-meta-bar__text">Discovery to launch</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.08">
            <span className="video-case-meta-bar__num">03 Role</span>
            <h3 className="video-case-meta-bar__title">UX/UI Design &amp; Research, Development and SEO</h3>
            <p className="video-case-meta-bar__text">Services delivered</p>
          </div>
        </Container>
      </section>

      <ServicesSection
        id="brief"
        sectionLabel="The Brief"
        heading="Built to turn credibility into qualified enquiries."
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
        backgroundImage="/img/works/soft-play-solutions/hero-1.jpg"
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

      <ServicesUxTheorySection
        sectionId="outcomes"
        headingId="soft-play-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/soft-play-solutions/how-1.jpg"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['soft-play-solutions']} />

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

export default SoftPlayCaseStudyPage;
