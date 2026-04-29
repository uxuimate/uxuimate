import { useEffect, useId, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CONTACT_BOOK_CALL_ANCHOR, CONTACT_BRIEF_ANCHOR } from '@/constants/booking';
import { toggleDocumentAttribute } from '@/utils';
import { SERVICE_PAGE_FAQ_ITEMS } from '@/data/servicePageFaq';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import ServicesFluidBackground from './components/ServicesFluidBackground';
import ServicesUxTheorySection from './components/ServicesUxTheorySection';
import ServicesDeliverablesSection from './components/ServicesDeliverablesSection';
import ServicesTestimonialSection from './components/ServicesTestimonialSection';
import ServicesSectionDots from './components/ServicesSectionDots';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import OurProcessSection from '@/pages/uxuimate/components/OurProcessSection';
import SeoHead from '@/components/SeoHead';
import servicesProcessBg from './assets/img/our-process-bg.jpg';
import servicesProcessWebdev from './assets/our-process-webdev.jpg';
import servicesProcessBranding from './assets/our-process-branding.jpg';
import servicesProcessMobile from './assets/our-process-mobile.jpg';
import '@/pages/uxuimate/assets/css/style.css';
import './assets/services-page-development.css';
import './assets/services-page-branding.css';
import './assets/services-page-mobile.css';
import './assets/services-faq.css';

const services = [
  {
    number: '01',
    name: 'UX/UI Design',
    headline: 'Product Experience & Interface',
    text: 'Most products lose people in the first 30 seconds. Ours don\'t. We go deep into how your users think, move, and decide - then design every screen around that.'
  },
  {
    number: '02',
    name: 'Development',
    headline: 'We Build It. You Own It.',
    text: 'From landing pages to full web products - clean code, on time, ready to grow.'
  },
  {
    number: '03',
    name: 'Branding',
    headline: "You know your brand isn't quite right. We fix that.",
    text: 'A visual identity built for the web - so your brand looks as good on a screen as it does in your head.'
  },
  {
    number: '04',
    name: 'Mobile & SaaS',
    headline: 'From zero to app store. We design mobile and SaaS products.',
    text: 'For startups and product teams who need more than pretty screens - they need something people actually use.'
  }
];

const ServicesPage = () => {
  useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const faqBaseId = useId();
  const current = services[activeIndex];
  const isDevelopment = activeIndex === 1;
  const isBranding = activeIndex === 2;
  const isMobile = activeIndex === 3;
  const serviceMode = isMobile ? 'mobile' : isDevelopment ? 'development' : isBranding ? 'branding' : 'default';
  const pageThemeClass = isMobile ? 'services-page--mobile' : isDevelopment ? 'services-page--development' : isBranding ? 'services-page--branding' : 'services-page--ux';
  const fluidVariant = isMobile ? 'mobile' : isDevelopment ? 'development' : isBranding ? 'branding' : 'default';
  const processBackground = isMobile ? servicesProcessMobile : isDevelopment ? servicesProcessWebdev : isBranding ? servicesProcessBranding : servicesProcessBg;

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

  return <>
      <SeoHead
        title="Services - UX/UI, Branding, Web Development"
        description="UX UI MATE services: UX design, UI design, UX research, branding, web design, web development, no-code builds and custom code — premium digital studio for Newcastle, Sofia, the United Kingdom, Bulgaria and Europe."
        path="/services"
        image="/img/icons/logo-footer.png"
        keywords={[
          'UX UI services Newcastle',
          'branding and web development UK',
          'SaaS design Bulgaria',
          'no-code website development',
          'custom web development studio'
        ]}
      />
      <NavigationBar accentTheme={serviceMode} />

      <div className={pageThemeClass}>
      <div className="main-page-section services-carousel-page">
        <ServicesFluidBackground variant={fluidVariant} />

        <div className="services-hero" id="services-hero">
          <div
            className="item item--fluid-surface services-hero__panel"
            id="services-hero-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${current.number}`}
          >
            <div className="services-hero__inner" key={activeIndex}>
              <h1 className="services-hero__headline">
                {current.headline}
              </h1>
              <p className="services-hero__body">{current.text}</p>
              <div className="services-hero__ctas">
                <Link className="btn btn-white btn-rounded btn-large" to={CONTACT_BRIEF_ANCHOR}>
                  Send your brief
                </Link>
                <Link className="btn btn-transparent-white btn-rounded btn-large" to={CONTACT_BOOK_CALL_ANCHOR}>
                  Book 30-min call
                </Link>
              </div>
            </div>
          </div>
        </div>

        <nav className="service-picker" role="tablist" aria-label="Services">
          {services.map((service, index) => <button
            className={'service-picker__tab' + (activeIndex === index ? ' is-active' : '')}
            key={service.number}
            type="button"
            role="tab"
            id={`service-tab-${service.number}`}
            aria-selected={activeIndex === index}
            aria-controls="services-hero-panel"
            onClick={() => {
              setActiveIndex(index);
            }}
          >
            <span className="service-picker__text">{service.name}</span>
          </button>)}
        </nav>
      </div>

      <ServicesUxTheorySection serviceMode={serviceMode} />

      <ServicesDeliverablesSection serviceMode={serviceMode} />

      {activeIndex === 0 ? <ServicesTestimonialSection mode="ux" /> : null}
      {activeIndex === 1 ? <ServicesTestimonialSection mode="development" /> : null}
      {activeIndex === 2 ? <ServicesTestimonialSection mode="branding" /> : null}
      {activeIndex === 3 ? <ServicesTestimonialSection mode="mobile" /> : null}

      <OurProcessSection
        id="services-our-process"
        backgroundImage={processBackground}
        bookCallHref={CONTACT_BOOK_CALL_ANCHOR}
      />

      <section className="contact-faq" aria-labelledby="services-faq-heading">
        <Container className="contact-faq__container">
          <h2 id="services-faq-heading" className="contact-faq__heading reveal-up">
            Common questions
          </h2>
          <div className="contact-faq__list">
            {SERVICE_PAGE_FAQ_ITEMS.map((item, i) => {
              const panelId = `${faqBaseId}-panel-${i}`;
              const btnId = `${faqBaseId}-btn-${i}`;
              const open = faqOpen === i;
              return (
                <div key={item.q} className="contact-faq__item reveal-up" data-delay={String(i * 0.05)}>
                  <button
                    id={btnId}
                    type="button"
                    className="contact-faq__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setFaqOpen(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="contact-faq__icon" aria-hidden="true">
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="contact-faq__panel"
                    hidden={!open}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer accentTheme={serviceMode} />

      <BackToTop />

      <ServicesSectionDots />

      <AnimatedCursor />
      </div>
    </>;
};

export default ServicesPage;
