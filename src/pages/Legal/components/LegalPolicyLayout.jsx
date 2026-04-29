import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import SeoHead from '@/components/SeoHead';
import '@/pages/uxuimate/assets/css/style.css';
import '../assets/legal-pages.css';

const LegalPolicyLayout = ({ eyebrow, title, path, children }) => {
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

  return (
    <div className="main-page-section legal-page">
      <SeoHead
        title={title}
        description={`${title} for UX UI MATE.`}
        path={path}
        mergeCoreKeywords={false}
      />
      <NavigationBar />
      <section className="legal-page__section" aria-labelledby="legal-page-title">
        <Container className="legal-page__container">
          <span className="legal-page__eyebrow">{eyebrow}</span>
          <p className="legal-page__meta">18 March 2026</p>
          <h1 id="legal-page-title" className="legal-page__title">
            {title}
          </h1>
          <article className="legal-page__content">{children}</article>
        </Container>
      </section>
      <Footer />
      <BackToTop />
      <AnimatedCursor />
    </div>
  );
};

export default LegalPolicyLayout;
