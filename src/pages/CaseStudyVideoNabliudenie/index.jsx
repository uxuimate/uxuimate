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
import VideoCaseHeroSlider from './VideoCaseHeroSlider';
import VideoCaseSectionDots from './VideoCaseSectionDots';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import { CONTACT_BRIEF_ANCHOR } from '@/constants/booking';
import '@/pages/uxuimate/assets/css/style.css';
import './video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Brief',
    text: 'Stakeholder interview and a detailed project questionnaire to fully understand the business, audience, and goals.'
  },
  {
    number: '02',
    title: 'UX Research & Analysis',
    text: 'Audit of the existing site, competitor analysis, identification of UX problems and key user flows.'
  },
  {
    number: '03',
    title: 'Visual Direction',
    text: 'Mood board, typography system, colour palette, and visual concept approved before any design work began.'
  },
  {
    number: '04',
    title: 'UI Design & Prototyping',
    text: 'All pages designed responsive in Figma - desktop, tablet, and mobile - with two rounds of client revisions included.'
  },
  {
    number: '05',
    title: 'Usability Testing',
    text: 'Two real users from the target business audience tested the site, with findings used to make final UX corrections.'
  },
  {
    number: '06',
    title: 'Frontend Development',
    text: 'Hand-written HTML and CSS, semantic structure, responsive implementation and performance optimisation across all pages.'
  },
  {
    number: '07',
    title: 'On-Page SEO',
    text: 'Heading structure, meta titles and descriptions, keyword integration, alt texts, and Schema.org markup implemented across all live routes.'
  },
  {
    number: '08',
    title: 'Launch & Support',
    text: 'One month post-launch period for real-world testing, bug fixes, and content corrections before final handoff.'
  }
];

const BRIEF_ITEMS = [
  {
    number: '01',
    name: 'Context',
    description: 'The business delivered integrated security and IT systems, but the website looked like a local ad-hoc installer.'
  },
  {
    number: '02',
    name: 'Trust Gap',
    description: 'Buyers could not quickly verify capability, process, or enterprise-level proof signals across pages.'
  },
  {
    number: '03',
    name: 'Strategic Goal',
    description: 'Reframe perception to B2B systems partner with one coherent story from first visit to enquiry.'
  },
  {
    number: '04',
    name: 'Execution Focus',
    description: 'Rebuild UX structure, visual hierarchy, and technical clarity so procurement and technical stakeholders can decide faster.'
  }
];

const HOW_SOLVED = [
  {
    id: 'how-solved-1',
    eyebrow: 'Research & Usability Testing',
    heading: 'Research-led trust architecture',
    text: 'We ran moderated sessions with technical and commercial profiles to identify where confidence dropped in the first journey steps. Real site photography and visible aftercare signals consistently outperformed generic marketing patterns. These findings shaped hierarchy so high-trust evidence appears early, not buried.',
    image: '/img/works/videonabliudenie-bg/how-1.webp'
  },
  {
    id: 'how-solved-2',
    eyebrow: 'Information Architecture',
    heading: 'One integrated-system journey',
    text: 'We replaced fragmented page logic with a repeatable structure: intent, integrated scope, proof, then enquiry. This model mirrors how B2B buyers de-risk procurement decisions. Every key page now reinforces the same single-system narrative.',
    image: '/img/works/videonabliudenie-bg/how-2.webp'
  },
  {
    id: 'how-solved-3',
    eyebrow: 'Results',
    heading: 'Sharper B2B conversion quality',
    text: 'The shipped experience now reads as an integrated systems partner instead of a one-off installer. Qualification conversations start deeper because decision-makers can verify capability and delivery approach faster. UX, UI, code, and SEO stayed under one direction, so quality held from concept to launch.',
    image: '/img/works/videonabliudenie-bg/how-3.webp'
  }
];

const OUTCOMES = [
  {
    value: '15+',
    title: 'Crawlable route architecture',
    text: '15+ live routes rebuilt with clear hierarchy, intent-led headings, and internal linking around one integrated-system narrative.'
  },
  {
    value: '08',
    title: 'Research-to-launch execution',
    text: 'UX research, IA, UI, semantic front-end, and SEO shipped as one controlled delivery pipeline with no fragmented handoffs.'
  },
  {
    value: '01',
    title: 'B2B positioning system',
    text: 'From hero to deep service pages, the message now reads as systems integrator-first - not small installer - and improves lead quality.'
  }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Commercial clarity, technical credibility, and SEO strength.',
  lede: 'Outcomes focused on enterprise positioning, search discoverability, and higher-intent enquiries.'
};

const VideoNabliudenieCaseStudyPage = () => {
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
      <Helmet>
        <title>VideoNabliudenie — UX UI MATE</title>
      </Helmet>

      <NavigationBar />

      <VideoCaseHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">VideoNabliudenie.bg</h3>
            <p className="video-case-meta-bar__text">Primary project owner</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.04">
            <span className="video-case-meta-bar__num">02 Project Timeline</span>
            <h3 className="video-case-meta-bar__title">Jan 2026 - Mar 2026</h3>
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
        heading="Built to reposition trust at first glance."
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
        backgroundImage="/img/works/videonabliudenie-bg/process.webp"
        showCta={false}
      />

      {HOW_SOLVED.map(item => (
        <AboutSection
          key={item.id}
          id={item.id}
          backgroundImage={item.image}
          eyebrow={item.eyebrow}
          title={item.heading}
          paragraphs={[item.text]}
          linkHref=""
          showAtmosphere={false}
        />
      ))}

      <ServicesUxTheorySection
        sectionId="outcomes"
        headingId="video-case-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/videonabliudenie-bg/outcomes.webp"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['videonabliudenie-bg']} />

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

export default VideoNabliudenieCaseStudyPage;
