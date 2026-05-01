import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '@/pages/uxuimate/components/NavigationBar';
import Footer from '@/pages/uxuimate/components/Footer';
import BackToTop from '@/pages/uxuimate/components/BackToTop';
import AnimatedCursor from '@/pages/uxuimate/components/AnimatedCursor';
import SeoHead from '@/components/SeoHead';
import '@/pages/uxuimate/assets/css/style.css';
import './local-pages.css';

const LocalLandingPage = ({
  city,
  region,
  path,
  headline,
  description,
  points,
  serviceName = 'UX/UI Design',
  eyebrow = 'Local UX/UI Services',
  keywords
}) => (
  <div className="main-page-section local-seo-page">
    <SeoHead
      title={`${serviceName} ${city}`}
      description={description}
      path={path}
      image="/img/icons/logo-footer.webp"
      keywords={keywords || [
        `UX design ${city}`,
        `UI design ${city}`,
        `UX research ${city}`,
        `branding ${city}`,
        `web design ${city}`,
        `web development ${city}`,
        `no-code development ${city}`,
        `${serviceName} ${city}`,
        `UX agency ${region}`,
        'UX UI MATE'
      ]}
    />
    <NavigationBar />
    <section className="local-seo-page__hero" aria-labelledby="local-seo-title">
      <Container className="local-seo-page__container">
        <p className="local-seo-page__eyebrow">{eyebrow}</p>
        <h1 id="local-seo-title" className="local-seo-page__title">
          {headline}
        </h1>
        <p className="local-seo-page__lede">{description}</p>
        <div className="local-seo-page__cta-row">
          <Link to="/contact?section=contact" className="btn btn-white btn-rounded btn-large">
            Send your brief
          </Link>
          <Link to="/works" className="btn btn-transparent-white btn-rounded btn-large">
            View case studies
          </Link>
        </div>
      </Container>
    </section>

    <section className="local-seo-page__content" aria-label={`Why teams in ${city} choose UX UI MATE`}>
      <Container className="local-seo-page__container">
        <h2>Why teams in {city} work with UX UI MATE</h2>
        <ul className="local-seo-page__list">
          {points.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Container>
    </section>

    <Footer />
    <BackToTop />
    <AnimatedCursor />
  </div>
);

export default LocalLandingPage;
