import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Vector3 } from 'three';
import { Container } from 'react-bootstrap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { toggleDocumentAttribute } from '@/utils';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import useReveal from '@/pages/uxuimate/hooks/useReveal';
import WorksHeroBackdrop from '@/pages/Works/components/WorksHeroBackdrop';
import contactSectionBg from '@/pages/uxuimate/assets/img/contact-section-bg.jpg';
import '@/pages/Works/assets/works-page.css';
import '@/pages/uxuimate/assets/css/style.css';
import './assets/contact-page.css';
import HeroRotatingTypewriter from '@/components/HeroRotatingTypewriter';
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget';
import SeoHead from '@/components/SeoHead';
import MobileSliderHint from '@/components/MobileSliderHint';

const CONTACT_EMAIL = 'uxuimate@gmail.com';
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}`;
const WHATSAPP_DISPLAY = '+44 7384 303 337';
const WHATSAPP_HREF = 'https://wa.me/447384303337';

const CONTACT_HERO_WORDS = ['project', 'idea', 'brand'];

/** WebGL mist accents (sage / deep forest) - Contact-only; Works keeps champagne defaults */
const CONTACT_MIST_PRIMARY = new Vector3(0.42, 0.64, 0.52);
const CONTACT_MIST_SECONDARY = new Vector3(0.2, 0.36, 0.3);

const NEXT_STEPS = [
  {
    num: '01',
    title: 'Submit your brief.',
    body: "Tell us what you're building and your budget."
  },
  {
    num: '02',
    title: 'We review and reach out.',
    body: 'Expect a response within 24 hours.'
  },
  {
    num: '03',
    title: 'Free discovery call.',
    body: 'We align on scope, timeline, and next steps.'
  }
];

/** POST key `projectType[]` unchanged for mailer handlers */
const CONTACT_PROJECT_OPTIONS = [
  { id: 'website', label: 'Website' },
  { id: 'app', label: 'App' },
  { id: 'saas', label: 'SaaS Platform' },
  { id: 'branding', label: 'Branding' },
  { id: 'ux-ui-redesign', label: 'UX/UI Redesign' },
  { id: 'ecommerce', label: 'E-commerce' }
];

const BUDGET_MIN = 1000;
const BUDGET_MAX = 20000;
const BUDGET_STEP = 500;

function formatBudget(value) {
  const n = Number(value);
  if (n >= BUDGET_MAX) {
    return '£20,000+';
  }
  return `£${n.toLocaleString('en-GB')}`;
}

const ContactPage = () => {
  const [budget, setBudget] = useState(5000);
  const location = useLocation();

  useReveal();

  useLayoutEffect(() => {
    const section = new URLSearchParams(location.search).get('section');
    const fromQuery = section === 'book-a-call' || section === 'contact' ? section : null;
    const fromHash = location.hash === '#book-a-call' || location.hash === '#contact' ? location.hash.slice(1) : null;
    const target = fromQuery || fromHash;

    if (!target) {
      return undefined;
    }

    const run = () => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    run();
    const t = window.setTimeout(run, 120);
    const t2 = window.setTimeout(run, 400);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash, location.search]);

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

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'UX UI MATE',
    url: 'https://uxuimate.com/contact',
    email: CONTACT_EMAIL,
    telephone: WHATSAPP_DISPLAY,
    areaServed: ['Newcastle', 'United Kingdom', 'Bulgaria', 'Europe'],
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      telephone: WHATSAPP_DISPLAY,
      areaServed: 'GB'
    }]
  };

  return (
    <div className="main-page-section contact-page">
      <SeoHead
        title="Contact UX UI MATE"
        description="Contact UX UI MATE in Newcastle, UK for UX/UI design, web development, branding and product design support across the UK, Europe and Bulgaria."
        path="/contact"
        image="/img/icons/logo-footer.png"
        jsonLd={contactJsonLd}
      />
      <NavigationBar />

      {/* Section 1 - full viewport hero (Works-style ambient) */}
      <section className="works-hero contact-page__hero-shell" id="contact-hero" aria-labelledby="contact-hero-heading">
        <WorksHeroBackdrop mistPrimary={CONTACT_MIST_PRIMARY} mistSecondary={CONTACT_MIST_SECONDARY} />
        <div className="works-hero__grain" aria-hidden="true" />
        <div className="works-hero__bloom" aria-hidden="true" />
        <div className="works-hero__vignette" aria-hidden="true" />

        <div className="works-hero__content">
          <h1 id="contact-hero-heading" className="works-hero__title-block contact-page__hero-heading reveal-up">
            <span className="works-hero__title-line contact-page__headline-line">
              Let&apos;s talk about your{' '}
              <HeroRotatingTypewriter words={CONTACT_HERO_WORDS} className="contact-page__rotating-word" />
            </span>
          </h1>
          <p className="works-hero__lede reveal-up" data-delay="0.06" style={{ maxWidth: '560px' }}>
            We reply within 24 hours - no commitment, just clarity.
          </p>
          <div className="contact-page__hero-ctas reveal-up" data-delay="0.1">
            <a className="btn btn-white btn-rounded btn-large contact-page__hero-cta contact-page__hero-cta--solid" href="#contact">
              Send your brief →
            </a>
            <a className="btn btn-transparent-white btn-rounded btn-large contact-page__hero-cta contact-page__hero-cta--outline" href="#book-a-call">
              Book a 30-min call
            </a>
          </div>
        </div>
      </section>

      {/* Section 2 - what happens next */}
      <section className="contact-next" aria-labelledby="contact-next-heading">
        <h2 id="contact-next-heading" className="visually-hidden">
          What happens next
        </h2>
        <Container fluid className="contact-next__container">
          <div className="contact-next__row mobile-card-slider">
            {NEXT_STEPS.map((step, i) => (
              <Fragment key={step.num}>
                {i > 0 ? <div className="contact-next__rule" aria-hidden="true" /> : null}
                <div className="contact-next__cell reveal-up mobile-card-slide" data-delay={String(i * 0.06)}>
                  <span className="contact-next__num">{step.num}</span>
                  <h3 className="contact-next__step-title">{step.title}</h3>
                  <p className="contact-next__step-body">{step.body}</p>
                </div>
              </Fragment>
            ))}
          </div>
          <MobileSliderHint dotCount={NEXT_STEPS.length} />
        </Container>
      </section>

      {/* Section 3 - contact bar */}
      <section className="contact-bar" aria-label="Contact details">
        <Container fluid className="contact-bar__container">
          <div className="contact-bar__grid">
            <div className="contact-bar__cell reveal-up">
              <span className="contact-bar__label">Email</span>
              <p className="contact-bar__value">
                <a href={MAILTO_HREF}>{CONTACT_EMAIL}</a>
              </p>
            </div>
            <div className="contact-bar__cell reveal-up" data-delay="0.05">
              <span className="contact-bar__label">WhatsApp &amp; mobile</span>
              <p className="contact-bar__value">
                <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                  {WHATSAPP_DISPLAY}
                </a>
              </p>
            </div>
            <div className="contact-bar__cell reveal-up" data-delay="0.1">
              <span className="contact-bar__label">Offices</span>
              <p className="contact-bar__value contact-bar__value--stack">
                <span>Newcastle, UK · GMT</span>
                <span>Sofia, Bulgaria · GMT+2</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Project enquiry form */}
      <section
        className="contact-page-form-section"
        id="contact"
        aria-labelledby="contact-form-section-heading"
        style={{ backgroundImage: `url(${contactSectionBg})` }}
      >
        <Container fluid className="contact-form-wide">
          <header className="contact-page__block-intro reveal-up">
            <h2 id="contact-form-section-heading" className="contact-page__block-title">
              Send us your brief.
            </h2>
            <p className="contact-page__block-lede">We&apos;ll come back with a clear next step within 24 hours.</p>
          </header>
          <form
            className="innovative-contact-form contact-form contact-form--extended"
            id="contact-form-data"
            data-validate-message="true"
          >
            <div className="px-0 mb-3" id="result" />

            <div className="contact-form-wide__fields">
              <div className="contact-form__group contact-form__group--details" role="group" aria-labelledby="contact-details-label">
                <h2 id="contact-details-label" className="contact-form__section-label">
                  Your details
                </h2>
                <div className="contact-form__details-row">
                  <div className="form-group contact-form__field contact-form__field--full-width">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name"
                      required
                      id="first_name"
                      name="firstName"
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group contact-form__field">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      name="userEmail"
                      autoComplete="email"
                    />
                  </div>
                  <div className="form-group contact-form__field">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Phone"
                      required
                      id="phone"
                      name="userPhone"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="contact-form__group contact-form__group--project" role="group" aria-labelledby="contact-project-heading">
                <h2 id="contact-project-heading" className="contact-form__section-label">
                  Your project
                </h2>
                <fieldset className="contact-fieldset contact-fieldset--in-group">
                  <legend className="visually-hidden">Project type (select any that apply)</legend>
                  <div className="contact-check-grid">
                    {CONTACT_PROJECT_OPTIONS.map(({ id, label }) => (
                      <label key={id} className="contact-check">
                        <input type="checkbox" name="projectType[]" value={label} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="contact-form__group contact-form__group--budget" role="group" aria-labelledby="contact-budget-label">
                <h2 id="contact-budget-label" className="contact-form__section-label">
                  Your budget
                </h2>
                <div className="contact-budget contact-budget--in-group">
                  <div className="contact-budget__row">
                    <span className="contact-budget__tick">£1k</span>
                    <input
                      id="contact-budget-range"
                      name="budget"
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={BUDGET_STEP}
                      value={budget}
                      onChange={e => setBudget(Number(e.target.value))}
                      aria-valuetext={formatBudget(budget)}
                    />
                    <span className="contact-budget__tick">£20k+</span>
                  </div>
                  <output className="contact-budget__output" htmlFor="contact-budget-range">
                    {formatBudget(budget)}
                  </output>
                </div>
              </div>

              <div className="contact-form__group contact-form__group--message" role="group" aria-labelledby="contact-message-label">
                <h2 id="contact-message-label" className="contact-form__section-label">
                  Your message
                </h2>
                <div className="form-group contact-form__field contact-form__field--flush">
                  <textarea
                    className="form-control"
                    placeholder="Tell us what you're building and what help you need."
                    id="message"
                    name="userMessage"
                    rows={6}
                    required
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

            <div className="contact-form__submit-wrap">
              <button type="button" className="btn btn-transparent-white btn-rounded btn-large contact_btn contact-form__submit">
                Send your brief →
              </button>
            </div>
          </form>
        </Container>
      </section>

      {/* Calendly - below form */}
      <section className="contact-calendly" id="book-a-call" aria-labelledby="contact-calendly-section-heading">
        <header className="contact-page__block-intro contact-calendly__intro reveal-up">
          <h2 id="contact-calendly-section-heading" className="contact-page__block-title">
            Book a free 30-minute call.
          </h2>
          <p className="contact-page__block-lede">Pick a time that works for you - no commitment, just clarity.</p>
        </header>
        <div className="contact-calendly__embed-wrap reveal-up">
          <CalendlyInlineWidget className="contact-calendly__embed" />
        </div>
      </section>

      <Footer />

      <BackToTop />

      <AnimatedCursor />
    </div>
  );
};

export default ContactPage;
