import ServicesAtmosphere from './ServicesAtmosphere';
import { Link } from 'react-router-dom';

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
  statValue = '7+',
  statLabel = 'Projects Delivered',
  showStat = true,
  items = services,
  footerHref = '/services',
  footerText = 'View all services',
  showAtmosphere = true
}) => {
  const isExternal = /^https?:\/\//i.test(footerHref);
  const isSpaPath = footerHref.startsWith('/') && !footerHref.startsWith('//') && !isExternal;

  return <section className="services-section" id={id}>
      {showAtmosphere ? <ServicesAtmosphere /> : null}
      <div className="services-section__container">
        <div className="services-section__top reveal-up">
          <div className="services-section__intro">
            <span>{sectionLabel}</span>
            <h2>{heading}</h2>
          </div>
          {showStat ? <div className="services-section__stat">
              <strong>{statValue}</strong>
              <span>{statLabel}</span>
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
