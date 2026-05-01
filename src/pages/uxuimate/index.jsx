import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from './components/NavigationBar';
import BackToTop from './components/BackToTop';
import HeroOfferSlider from './components/HeroOfferSlider';
import useReveal from './hooks/useReveal';
import { lenisScrollToElementId } from '@/utils/lenisScroll';
import SeoHead from '@/components/SeoHead';
import { buildStudioHomeJsonLd } from '@/constants/siteSeo';
import './assets/css/style.css';

const WorksSection = lazy(() => import('./components/WorksSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const FeedbackSection = lazy(() => import('./components/FeedbackSection'));
const ParallaxSections = lazy(() => import('./components/ParallaxSections'));
const Footer = lazy(() => import('./components/Footer'));
const SectionDots = lazy(() => import('./components/SectionDots'));
const AnimatedCursor = lazy(() => import('./components/AnimatedCursor'));

const InnovativeParallax = () => {
  const location = useLocation();
  useReveal();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const sectionId = location.hash.replace('#', '');
    let active = true;

    const handle = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (active) {
          lenisScrollToElementId(sectionId);
        }
      });
    });

    return () => {
      active = false;
      cancelAnimationFrame(handle);
    };
  }, [location.hash, location.pathname]);

  useEffect(() => {
    toggleDocumentAttribute('data-spy', 'scroll', 'body');
    toggleDocumentAttribute('data-target', '.navbar', 'body');
    toggleDocumentAttribute('data-offset', '90', 'body');
    return () => {
      toggleDocumentAttribute('data-spy', 'scroll', 'body', true);
      toggleDocumentAttribute('data-target', '.navbar', 'body', true);
      toggleDocumentAttribute('data-offset', '90', 'body', true);
    };
  }, []);
  return <>
      <SeoHead
        title="UX/UI Design Studio Newcastle"
        description="Premium digital studio UX UI MATE: UX design, UI design, UX research, branding, web design, web development, no-code and custom code — Newcastle, UK and Sofia, Bulgaria, serving the United Kingdom, Bulgaria and Europe."
        path="/"
        image="/img/icons/logo-footer.webp"
        keywords={[
          'UX UI design Newcastle',
          'web design Newcastle',
          'UX agency UK',
          'branding studio UK',
          'web development UK',
          'UX UI Sofia',
          'UX UI Bulgaria',
          'UX UI Europe'
        ]}
        jsonLd={buildStudioHomeJsonLd()}
      />
      <NavigationBar />

      <HeroOfferSlider />

      <Suspense fallback={null}>
        <WorksSection />

        <ServicesSection />

        <AboutSection />

        <FeedbackSection />

        <ParallaxSections />

        <Footer />
      </Suspense>

      <BackToTop />

      <Suspense fallback={null}>
        <SectionDots />
        <AnimatedCursor />
      </Suspense>
    </>;
};
export default InnovativeParallax;