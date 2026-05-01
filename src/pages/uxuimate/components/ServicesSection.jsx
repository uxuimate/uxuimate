import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ServicesAtmosphere = lazy(() => import('./ServicesAtmosphere'));

const services = [
  {
    number: '01',
    name: 'UX/UI DESIGN',
    description: 'Visitors who understand your offer in seconds stay longer, trust faster, and buy more confidently.'
  },
  {
    number: '02',
    name: 'WEB DEVELOPMENT',
    description: "A site that loads fast, ranks on Google, and doesn't break when traffic spikes - so you never lose a lead to a technical failure."
  },
  {
    number: '03',
    name: 'BRANDING',
    description: "When your brand looks like it charges more, clients stop questioning your price and start asking when you're available."
  },
  {
    number: '04',
    name: 'MOBILE & SAAS',
    description: 'An app your users open out of habit, not obligation - because the experience was designed around how they actually think.'
  }
];

const ServicesSection = ({
  id = 'services',
  sectionLabel = 'WHAT WE DO',
  heading = 'Services Built Around Your Growth.',
  statValue = '100%',
  statLabel = 'Client Satisfaction',
  showStat = true,
  items = services,
  footerHref = '/services',
  footerText = 'View all services',
  showAtmosphere = true
}) => {
  const [showAtmosphereLayer, setShowAtmosphereLayer] = useState(false);
  const [allowAtmosphere, setAllowAtmosphere] = useState(false);
  const isExternal = /^https?:\/\//i.test(footerHref);
  const isSpaPath = footerHref.startsWith('/') && !footerHref.startsWith('//') && !isExternal;

  useEffect(() => {
    if (!showAtmosphere) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
    const update = () => {
      setAllowAtmosphere(mediaQuery.matches);
    };
    update();
    mediaQuery.addEventListener('change', update);
    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, [showAtmosphere]);

  useEffect(() => {
    if (!showAtmosphere || !allowAtmosphere) {
      return undefined;
    }

    let cancelled = false;
    const run = () => {
      if (!cancelled) {
        setShowAtmosphereLayer(true);
      }
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timeoutId = window.setTimeout(run, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [showAtmosphere, allowAtmosphere]);

  return <section className="services-section" id={id}>
      {showAtmosphere && allowAtmosphere && showAtmosphereLayer ? <Suspense fallback={null}>
          <ServicesAtmosphere />
        </Suspense> : null}
      <div className="services-section__container">
        <div className="services-section__top reveal-up">
          <div className="services-section__intro">
            <span>{sectionLabel}</span>
            <h2>{heading}</h2>
          </div>
          {showStat ? <div
            className={
              'services-section__stat' +
              (statValue == null || statValue === '' ? ' services-section__stat--phrase' : '')
            }
          >
              {statValue != null && statValue !== '' ? (
                <>
                  <strong>{statValue}</strong>
                  <span>{statLabel}</span>
                </>
              ) : (
                <strong>{statLabel}</strong>
              )}
            </div> : null}
        </div>

        <div className="services-section__divider reveal-up" />

        <div className="services-grid">
          {items.map((service, index) => <article className="service-item reveal-up" data-delay={(index * 0.1).toFixed(1)} key={service.number}>
              <span>{service.number}</span>
              <h3>{service.name}</h3>
              <div className="service-item__line" />
              <p>{service.description}</p>
            </article>)}
        </div>

        <div className="services-section__footer reveal-up">
          {isSpaPath ? <Link to={footerHref} className="btn btn-white btn-rounded btn-large services-section__btn-link">
              {footerText}
            </Link> : <a href={footerHref} className="btn btn-white btn-rounded btn-large services-section__btn-link">
              {footerText}
            </a>}
        </div>
      </div>
    </section>;
};

export default ServicesSection;
