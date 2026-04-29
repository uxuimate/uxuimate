import LocalLandingPage from './LocalLandingPage';

const UkPage = () => (
  <LocalLandingPage
    city="United Kingdom"
    region="UK"
    path="/ux-ui-design-uk"
    headline="UX/UI and web design services across the UK"
    description="UX UI MATE works with UK businesses to design better user journeys, stronger brands, and digital experiences that turn visitors into qualified leads."
    points={[
      'UX/UI design for websites, SaaS products, and mobile-first services.',
      'Branding systems aligned to digital performance and market positioning.',
      'User-centered design improvements that reduce friction and increase trust.',
      'Reliable partner model for design sprints, redesigns, and full product work.'
    ]}
  />
);

export default UkPage;
