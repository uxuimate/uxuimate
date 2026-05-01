import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import SeoHead from '@/components/SeoHead';
import ErClimaHeroSlider from './ErClimaHeroSlider';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Brief',
    text: 'Stakeholder alignment and business audit to define priorities, target users, and commercial goals before execution.'
  },
  {
    number: '02',
    title: 'UX Research & Analysis',
    text: 'Review of existing flows and friction points, then competitor benchmarking to identify structural improvements.'
  },
  {
    number: '03',
    title: 'Visual Direction',
    text: 'A professional visual language focused on trust, technical clarity, and clear hierarchy across service and catalog pages.'
  },
  {
    number: '04',
    title: 'UI Design & Prototyping',
    text: 'Responsive interface design in Figma for desktop and mobile with iterative revisions around user clarity.'
  },
  {
    number: '05',
    title: 'Usability Testing',
    text: 'Validation sessions on core user tasks to remove confusion and simplify discovery and enquiry flows.'
  },
  {
    number: '06',
    title: 'Frontend Development',
    text: 'Semantic, responsive implementation with performance and accessibility baseline improvements.'
  },
  {
    number: '07',
    title: 'On-Page SEO',
    text: 'Content hierarchy, metadata, keyword mapping, and schema markup setup to support discoverability.'
  },
  {
    number: '08',
    title: 'Launch & Support',
    text: 'Post-launch QA and support period to fine-tune usability and content based on real usage signals.'
  }
];

const BRIEF_ITEMS = [
  {
    number: '01',
    name: 'Context',
    description: 'Er Clima Solutions needed a stronger digital presence to present HVAC services and products with confidence.'
  },
  {
    number: '02',
    name: 'Core Challenge',
    description: 'Over 1,100 products and service offerings had to be presented without confusion or decision fatigue.'
  },
  {
    number: '03',
    name: 'Strategic Goal',
    description: 'Create a clear structure that helps visitors understand value quickly and move to enquiry faster.'
  },
  {
    number: '04',
    name: 'Execution Focus',
    description: 'Unify UX, UI, development, and SEO into one coherent delivery to support trust and long-term growth.'
  }
];

const HOW_SOLVED = [
  {
    id: 'how-solved-1',
    eyebrow: 'Service and Catalog Separation',
    heading: 'Clear paths for different user intents',
    text: 'We separated service journeys from product-browsing journeys so visitors can immediately understand where to go. This removed ambiguity and helped users follow the right decision path based on their intent.',
    image: '/img/works/er-clima/how-1.webp'
  },
  {
    id: 'how-solved-2',
    eyebrow: 'Information Architecture',
    heading: 'Structure for 1,100+ HVAC products',
    text: 'The catalog was reorganized with consistent grouping and hierarchy to reduce cognitive load. Users can now explore categories and product detail content with greater speed and confidence.',
    image: '/img/works/er-clima/hero-2.webp'
  },
  {
    id: 'how-solved-3',
    eyebrow: 'Conversion Strategy',
    heading: 'Trust-forward UX at key moments',
    text: 'Calls-to-action and trust signals were intentionally placed at high-intent moments so users can move from exploration to enquiry without friction. The result is a more reliable conversion flow for commercial conversations.',
    image: '/img/works/er-clima/how-3.webp'
  }
];

const OUTCOMES = [
  {
    value: '1100+',
    title: 'Products structured for discoverability',
    text: 'A large HVAC catalog is now presented through clear architecture and navigation that supports faster product discovery.'
  },
  {
    value: '01',
    title: 'Unified platform for services and sales',
    text: 'One coherent experience now supports both service enquiries and product exploration without fragmented journeys.'
  },
  {
    value: '2025',
    title: 'Redesign delivered for scalable growth',
    text: 'The new website foundation supports ongoing expansion while preserving UX clarity, trust signals, and SEO readiness.'
  }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Clear structure, stronger trust, and conversion-ready journeys.',
  lede: 'The redesign turned a complex setup into a scalable platform that supports both discovery and enquiries.'
};

const ErClimaCaseStudyPage = () => {
  useReveal();

  useEffect(() => {
    const $ = window.jQuery || window.$;

    if ($) {
      $('.main-page-section').show();
    } else {
      document.querySelectorAll('.main-page-section').forEach(el => {
        el.style.display = 'block';
      });
    }

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
      <SeoHead
        title="Er Clima Solutions Case Study"
        description="HVAC web platform case study for Er Clima Solutions: improved information architecture for 1,100+ products, clearer service journeys, and conversion-focused UX."
        path="/works/er-clima-solutions"
        image="/img/works/er-clima/hero-1.webp"
        keywords={[
          'Er Clima case study',
          'HVAC website redesign',
          'information architecture case study',
          'B2B industrial UX UI',
          'UX UI MATE web development'
        ]}
      />

      <NavigationBar />
      <ErClimaHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">Er Clima Solutions</h3>
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
        heading="Built to simplify complex HVAC journeys."
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
        backgroundImage="/img/works/er-clima/hero-1.webp"
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
        headingId="er-clima-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/er-clima/outcomes-bg.webp"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['bomi-clima']} />

      <section className="video-case-book-banner" aria-label="Book a call">
        <Container className="video-case-book-banner__container text-center reveal-up">
          <p className="video-case-book-banner__eyebrow">Next step</p>
          <h2>Book a free 30-minute call.</h2>
          <p>We will review your project and give you a clear next-step recommendation.</p>
          <Link className="btn btn-white btn-rounded btn-large" to="/contact?section=book-a-call">
            Book 30-min call →
          </Link>
        </Container>
      </section>

      <Footer />
      <BackToTop />
      <VideoCaseSectionDots />
      <AnimatedCursor />
    </div>
  );
};

export default ErClimaCaseStudyPage;
