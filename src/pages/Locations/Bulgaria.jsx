import LocalLandingPage from './LocalLandingPage';

const BulgariaPage = () => (
  <LocalLandingPage
    city="Bulgaria"
    region="Europe"
    path="/ux-ui-design-bulgaria"
    headline="UX/UI design and branding support for teams in Bulgaria"
    description="UX UI MATE helps companies in Bulgaria design polished digital products with stronger UX flows, modern interfaces, and scalable visual systems."
    points={[
      'Product UX audits and redesigns for better usability and customer retention.',
      'Modern UI design systems ready for web and mobile implementation.',
      'Brand identity and digital touchpoint consistency for growth-stage teams.',
      'Cross-market experience supporting both Bulgarian and wider European audiences.'
    ]}
  />
);

export default BulgariaPage;
