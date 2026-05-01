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
import NistravelHeroSlider from './NistravelHeroSlider';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery & Audit', text: 'Audited the old website structure, visual hierarchy, and booking journey gaps across homepage and trip detail pages.' },
  { number: '02', title: 'Problem Framing', text: 'Mapped core blockers: dated UI, no multilingual flow, missing legal/contact pages, and weak mobile readability.' },
  { number: '03', title: 'UX Architecture', text: 'Restructured content flow so travellers can move from trust-building content to excursion discovery and enquiry faster.' },
  { number: '04', title: 'Visual Redesign', text: 'Modernized typography, spacing rhythm, cards, and CTA hierarchy while preserving travel-first storytelling.' },
  { number: '05', title: 'Internationalization Setup', text: 'Prepared and validated multilingual content support for English and Spanish audiences.' },
  { number: '06', title: 'Page Expansion', text: 'Added missing high-trust pages such as Contact Us, Privacy Policy, and Terms & Conditions.' },
  { number: '07', title: 'Responsive QA', text: 'Improved mobile readability, section stacking, and touch interactions across core pages and forms.' },
  { number: '08', title: 'Final Validation', text: 'Reviewed before/after consistency, CTA behavior, and deployment readiness for the redesigned experience.' }
];

const BRIEF_ITEMS = [
  { number: '01', name: 'Overview', description: 'Nistravel.bg required a full website redesign to modernize its digital presence and support expansion to international markets.' },
  { number: '02', name: 'Main Problems', description: 'The previous version had outdated visuals, no multilingual support, missing legal/contact pages, no cookie-consent layer, and limited homepage content blocks.' },
  { number: '03', name: 'Goal', description: 'Deliver a complete UX/UI refresh that improves trust, usability, and conversion readiness on desktop and mobile.' },
  { number: '04', name: 'Result Direction', description: 'A modern multilingual travel website with clearer content hierarchy, stronger page coverage, and responsive performance.' }
];

const WHAT_WE_DID = [
  {
    id: 'nistravel-what-we-did-1',
    eyebrow: 'Hero Section Redesign',
    heading: 'A stronger first impression above the fold',
    text: 'The homepage hero was rebuilt to communicate value instantly with a cleaner visual hierarchy, stronger headline clarity, and clearer CTA direction.',
    image: '/img/works/nistravel/photo-plovdiv.webp'
  },
  {
    id: 'nistravel-what-we-did-2',
    eyebrow: 'Transfers Section Added',
    heading: 'Clear transportation offer with instant pricing context',
    text: 'We introduced a dedicated Transfers section so users can quickly understand available routes, baseline prices, and contact options without unnecessary back-and-forth.',
    image: '/img/works/nistravel/photo-sofia.webp'
  },
  {
    id: 'nistravel-what-we-did-3',
    eyebrow: 'Trip Card Design',
    heading: 'Excursion cards redesigned for clarity and conversion',
    text: 'Trip cards were redesigned with clearer information hierarchy, stronger readability, and focused actions so travellers can evaluate and move forward faster.',
    image: '/img/works/nistravel/photo-island.webp'
  },
  {
    id: 'nistravel-what-we-did-4',
    eyebrow: 'Steps to Book Section',
    heading: 'A transparent booking journey from first message to departure',
    text: 'We added a step-by-step booking section to remove uncertainty, set clear expectations, and improve trust for first-time travellers.',
    image: '/img/works/nistravel/photo-rome.webp'
  }
];

const OUTCOMES = [
  { value: '02', title: 'New language tracks', text: 'Website structure now supports Spanish and English experiences for broader market reach.' },
  { value: '04', title: 'New trust and compliance elements delivered', text: 'Contact, Privacy Policy, Terms & Conditions, and a cookie-consent bar are now integrated into the core website architecture.' },
  { value: '100%', title: 'Responsive redesign coverage', text: 'Home and trip journeys were redesigned for cleaner behavior and readability across mobile and desktop.' }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Modernized brand presence, multilingual readiness, and stronger trust architecture.',
  lede: 'The redesign transformed Nistravel.bg into a scalable travel platform that supports clearer browsing and better conversion paths.'
};

const TOOLS_USED = [
  { name: 'Figma', icon: '/img/works/nistravel/tools/figma-uniform.webp', iconClass: 'nistravel-tools__icon--figma' },
  { name: 'Adobe Creative Cloud', icon: '/img/works/nistravel/tools/adobe-creative-cloud-uniform.webp' },
  { name: 'Framer', icon: '/img/works/nistravel/tools/framer-uniform.webp' }
];

const NistravelCaseStudyPage = () => {
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
        title="Nistravel.bg Case Study"
        description="Travel website redesign case study for Nistravel.bg: modern UX/UI, multilingual readiness, improved trust pages, and clearer trip-booking structure."
        path="/works/nistravel-bg"
        image="/img/works/nistravel/hero-redesign.webp"
        keywords={[
          'Nistravel case study',
          'travel website redesign',
          'multilingual website UX',
          'tour booking UX UI',
          'UX UI MATE case studies'
        ]}
      />

      <NavigationBar />
      <NistravelHeroSlider />

      <section className="video-case-meta-bar" aria-label="Project meta">
        <Container className="video-case-meta-bar__container">
          <div className="video-case-meta-bar__item reveal-up">
            <span className="video-case-meta-bar__num">01 Client</span>
            <h3 className="video-case-meta-bar__title">Nistravel.bg</h3>
            <p className="video-case-meta-bar__text">Travel agency</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.04">
            <span className="video-case-meta-bar__num">02 Project Focus</span>
            <h3 className="video-case-meta-bar__title">Redesign & Expansion</h3>
            <p className="video-case-meta-bar__text">UX/UI and content structure</p>
          </div>
          <div className="video-case-meta-bar__item reveal-up" data-delay="0.08">
            <span className="video-case-meta-bar__num">03 Services</span>
            <h3 className="video-case-meta-bar__title">Web Redesign, UX/UI, Mobile</h3>
            <p className="video-case-meta-bar__text">Including multilingual setup</p>
          </div>
        </Container>
      </section>

      <section className="nistravel-tools" aria-label="Tools used">
        <Container>
          <div className="nistravel-tools__header reveal-up">
            <p className="he-before-after__eyebrow">Tools used</p>
            <h2>Tools used in this redesign</h2>
          </div>
          <div className="nistravel-tools__grid">
            {TOOLS_USED.map((tool, index) => (
              <article className="nistravel-tools__item reveal-up" data-delay={(index * 0.03).toFixed(2)} key={tool.name}>
                <div className="nistravel-tools__icon-wrap">
                  <img
                    src={tool.icon}
                    alt={`${tool.name} logo`}
                    loading="lazy"
                    className={tool.iconClass || ''}
                  />
                </div>
                <h3>{tool.name}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ServicesSection
        id="brief"
        sectionLabel="The Brief"
        heading="A full redesign for a travel agency ready to scale internationally."
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
        intro="Eight focused phases from audit and architecture to multilingual and responsive validation."
        steps={PROCESS_STEPS}
        backgroundImage="/img/works/nistravel/photo-sunset.webp"
        showCta={false}
      />

      {WHAT_WE_DID.map(item => (
        <AboutSection
          key={item.id}
          id={item.id}
          backgroundImage={item.image}
          backgroundPosition="center center"
          eyebrow={item.eyebrow}
          title={item.heading}
          paragraphs={[item.text]}
          linkHref=""
          showAtmosphere={false}
        />
      ))}

      <section className="nistravel-ui-gallery" aria-label="Delivered UI sections">
        <Container>
          <div className="he-before-after__header reveal-up">
            <p className="he-before-after__eyebrow">Delivered sections</p>
            <h2>UI results from the redesign</h2>
            <p>Key interface areas that were redesigned and added across the Nistravel experience.</p>
          </div>
          <div className="nistravel-ui-gallery__grid">
            <article className="nistravel-ui-gallery__item nistravel-ui-gallery__item--large reveal-up">
              <div className="nistravel-ui-gallery__media">
                <img src="/img/works/nistravel/ui-hero-redesign.webp" alt="Nistravel redesigned hero section UI" loading="lazy" />
              </div>
            </article>
            <article className="nistravel-ui-gallery__item reveal-up" data-delay="0.03">
              <div className="nistravel-ui-gallery__media">
                <img src="/img/works/nistravel/ui-transfers-section.webp" alt="Nistravel transfers section added to website" loading="lazy" />
              </div>
            </article>
            <article className="nistravel-ui-gallery__item nistravel-ui-gallery__item--tall reveal-up" data-delay="0.06">
              <div className="nistravel-ui-gallery__media">
                <img src="/img/works/nistravel/ui-dedicated-trip-hero.webp" alt="Nistravel dedicated trip page hero UI" loading="lazy" />
              </div>
            </article>
            <article className="nistravel-ui-gallery__item reveal-up" data-delay="0.09">
              <div className="nistravel-ui-gallery__media">
                <img src="/img/works/nistravel/ui-steps-to-book.webp" alt="Nistravel steps-to-book section UI" loading="lazy" />
              </div>
            </article>
          </div>
        </Container>
      </section>

      <ServicesUxTheorySection
        sectionId="outcomes"
        headingId="nistravel-outcomes-heading"
        headerOverride={OUTCOMES_HEADER}
        pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
        backgroundImage="/img/works/nistravel/photo-boats.webp"
        className="video-case-outcomes"
      />

      <WorksSection eyebrow="More works" heading="More works" excludedProjectIds={['nistravel-bg']} />

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

export default NistravelCaseStudyPage;
