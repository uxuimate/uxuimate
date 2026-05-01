import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import '@/pages/uxuimate/assets/css/style.css';
import './assets/works-page.css';
import WorksHero from './components/WorksHero';
import WorksProjectsSection from './components/WorksProjectsSection';
import WorksCtaSection from './components/WorksCtaSection';
import SeoHead from '@/components/SeoHead';

const WorksPage = () => {
  const location = useLocation();
  useReveal();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
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

  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) {
      return undefined;
    }
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <div className="main-page-section works-page">
      <SeoHead
        title="Case Studies"
        description="Portfolio: UX design, UI design, UX research, branding, web design and web development case studies from a premium digital studio — Newcastle, Sofia, United Kingdom, Bulgaria and Europe."
        path="/works"
        image="/img/icons/logo-footer.webp"
        keywords={[
          'UX case studies UK',
          'branding portfolio Newcastle',
          'web development case studies Bulgaria',
          'SaaS UX portfolio',
          'premium digital studio work'
        ]}
      />
      <NavigationBar />

      <WorksHero />

      <WorksProjectsSection />

      <WorksCtaSection />

      <Footer />

      <BackToTop />

      <AnimatedCursor />
    </div>
  );
};

export default WorksPage;
