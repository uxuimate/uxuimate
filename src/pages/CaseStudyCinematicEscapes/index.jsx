import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import InnovativeContactSection from '@/pages/uxuimate/components/InnovativeContactSection';
import WorksSection from '@/pages/uxuimate/components/WorksSection';
import VideoCaseSectionDots from '@/pages/CaseStudyVideoNabliudenie/VideoCaseSectionDots';
import ServicesUxTheorySection from '@/pages/Services/components/ServicesUxTheorySection';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import '@/pages/uxuimate/assets/css/style.css';
import '@/pages/CaseStudyVideoNabliudenie/video-nabliudenie-case-study.css';
import CinematicEscapesHeroSlider from './CinematicEscapesHeroSlider';

const VISUAL_STORIES = [
  {
    title: 'Luxury travel storytelling',
    text: 'A cinematic narrative style crafted to communicate aspiration and emotional belonging from the first frame.',
    image: '/img/works/cinematic-escapes/hero-1.webp'
  },
  {
    title: 'Atmospheric art direction',
    text: 'Color, composition, and depth were tuned for premium positioning and campaign memorability.',
    image: '/img/works/cinematic-escapes/hero-2.webp'
  },
  {
    title: 'Cross-channel visual consistency',
    text: 'The key visual language scales across digital placements while preserving the same cinematic identity.',
    image: '/img/works/cinematic-escapes/hero-3.webp'
  }
];

const GALLERY_IMAGES = [
  '/img/works/cinematic-escapes/hero-1.webp',
  '/img/works/cinematic-escapes/hero-2.webp',
  '/img/works/cinematic-escapes/hero-3.webp',
  '/img/works/cinematic-escapes/hero-4.webp',
  '/img/works/cinematic-escapes/hero-5.webp',
  '/img/works/cinematic-escapes/hero-6.webp',
  '/img/works/cinematic-escapes/hero-7.webp',
  '/img/works/cinematic-escapes/hero-8.webp'
];

const OUTCOMES = [
  {
    value: '08',
    title: 'Campaign visuals delivered',
    text: 'Eight cinematic compositions prepared for launch-ready campaign use.'
  },
  {
    value: '01',
    title: 'Unified creative direction',
    text: 'One coherent visual language applied consistently across all key visuals.'
  },
  {
    value: '100%',
    title: 'Art direction consistency',
    text: 'Color, composition, and atmosphere aligned to one premium narrative standard.'
  }
];

const OUTCOMES_HEADER = {
  eyebrow: 'Outcomes',
  statement: 'Visual system built for campaign impact.',
  lede: 'Cinematic Escapes delivers a coherent visual world ready for premium digital campaign execution.'
};

const CinematicEscapesCaseStudyPage = () => {
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
    <div className="main-page-section video-case-page video-case-page--cinematic">
      <Helmet>
        <title>Cinematic Escapes - UX UI MATE</title>
      </Helmet>

      <NavigationBar />
      <main className="video-case-main">
        <CinematicEscapesHeroSlider />

        <section className="video-case-meta-bar video-case-meta">
        <div className="container video-case-meta-bar__container">
          <article className="video-case-meta-bar__item">
            <span className="video-case-meta-bar__num">01</span>
            <h3 className="video-case-meta-bar__title">Private project</h3>
            <p className="video-case-meta-bar__text">Client</p>
          </article>
          <article className="video-case-meta-bar__item">
            <span className="video-case-meta-bar__num">02</span>
            <h3 className="video-case-meta-bar__title">2023</h3>
            <p className="video-case-meta-bar__text">Year</p>
          </article>
          <article className="video-case-meta-bar__item">
            <span className="video-case-meta-bar__num">03</span>
            <h3 className="video-case-meta-bar__title">UX UI MATE</h3>
            <p className="video-case-meta-bar__text">Author</p>
          </article>
        </div>
        </section>

        <section className="cinematic-brief" id="brief">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <span className="cinematic-eyebrow">The Brief</span>
              <h2>Cinematic Escapes</h2>
              <p>
                This project focused on image-led campaign concepts where each visual functions as both storytelling and brand positioning.
                The direction balances surreal atmosphere with clarity so luxury audiences connect instantly and remember the narrative.
              </p>
            </div>
          </div>
        </div>
        </section>

        <section className="cinematic-stories" id="visual-language">
        <div className="container">
          <div className="row">
            {VISUAL_STORIES.map(story => (
              <div className="col-lg-4 mb-4" key={story.title}>
                <article className="cinematic-story-card">
                  <div className="cinematic-story-card__media">
                    <img src={story.image} alt={`${story.title} from Cinematic Escapes`} loading="lazy" />
                  </div>
                  <div className="cinematic-story-card__body">
                    <h3>{story.title}</h3>
                    <p>{story.text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        </section>

        <section className="cinematic-gallery" id="gallery">
        <div className="container-fluid px-0">
          <div className="cinematic-gallery__grid">
            {GALLERY_IMAGES.map((image, index) => (
              <div className="cinematic-gallery__item" key={image}>
                <img src={image} alt={`Cinematic Escapes visual ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        </section>

        <ServicesUxTheorySection
          sectionId="outcomes"
          headingId="cinematic-escapes-outcomes-heading"
          headerOverride={OUTCOMES_HEADER}
          pillarsOverride={OUTCOMES.map(item => ({ num: item.value, title: item.title, text: item.text }))}
          backgroundImage="/img/works/cinematic-escapes/hero-8.webp"
          className="video-case-outcomes"
        />

        <WorksSection
          id="more-works"
          title="More works"
          subtitle="More selected projects"
          excludedProjectIds={['cinematic-escapes']}
        />

        <InnovativeContactSection />
      </main>
      <Footer />
      <BackToTop />
      <VideoCaseSectionDots />
      <AnimatedCursor />
    </div>
  );
};

export default CinematicEscapesCaseStudyPage;
