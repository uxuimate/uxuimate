import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { toggleDocumentAttribute } from '@/utils';
import { lenisScrollToElementId } from '@/utils/lenisScroll';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import '@/pages/uxuimate/assets/css/style.css';
import './assets/about-us.css';
import AboutLampHero from './components/AboutLampHero';
import AboutTrustedStrip from './components/AboutTrustedStrip';
import AboutIntroFloating from './components/AboutIntroFloating';
import AboutPrinciplesSection from './components/AboutPrinciplesSection';
import AboutWhyStudioSection from './components/AboutWhyStudioSection';
import AboutFounderSection from './components/AboutFounderSection';
import AboutSectionDots from './components/AboutSectionDots';
import InnovativeContactSection from '@/pages/uxuimate/components/InnovativeContactSection';
import SeoHead from '@/components/SeoHead';

const AboutUsPage = () => {
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
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

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
    <div className="main-page-section about-page">
      <SeoHead
        title="About UX UI MATE"
        description="About UX UI MATE — premium digital studio for UX design, UI design, UX research, branding, web design, web development, no-code and custom code. Based in Newcastle, UK and Sofia, Bulgaria; serving the United Kingdom, Bulgaria and Europe."
        path="/about-us"
        image="/img/icons/logo-footer.png"
        keywords={[
          'about UX UI MATE',
          'UX design studio Newcastle',
          'digital agency Sofia',
          'UK Bulgaria design studio',
          'founder-led UX studio'
        ]}
      />
      <NavigationBar />

      <AboutLampHero />

      <AboutTrustedStrip />

      <AboutIntroFloating />

      <AboutWhyStudioSection />

      <AboutPrinciplesSection />

      <AboutFounderSection />

      <InnovativeContactSection />

      <Footer />

      <BackToTop />

      <AboutSectionDots />

      <AnimatedCursor />
    </div>
  );
};

export default AboutUsPage;
