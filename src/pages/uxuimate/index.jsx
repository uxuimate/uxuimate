import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HeroOfferSlider from './components/HeroOfferSlider';
import ParallaxSections from './components/ParallaxSections';
import WorksSection from './components/WorksSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import FeedbackSection from './components/FeedbackSection';
import AnimatedCursor from './components/AnimatedCursor';
import SectionDots from './components/SectionDots';
import useReveal from './hooks/useReveal';
import { lenisScrollToElementId } from '@/utils/lenisScroll';
import SeoHead from '@/components/SeoHead';
import { buildStudioHomeJsonLd } from '@/constants/siteSeo';
import './assets/css/style.css';

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
        image="/img/icons/logo-footer.png"
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

      <WorksSection />

      <ServicesSection />

      <AboutSection />

      <FeedbackSection />

      <ParallaxSections />

      <Footer />

      <BackToTop />

      <SectionDots />

      <AnimatedCursor />
    </>;
};
export default InnovativeParallax;