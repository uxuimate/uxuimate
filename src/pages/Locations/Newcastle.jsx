import LocalLandingPage from './LocalLandingPage';

const NewcastlePage = () => (
  <LocalLandingPage
    city="Newcastle"
    region="UK"
    path="/ux-ui-design-newcastle"
    headline="UX/UI design studio in Newcastle for ambitious brands"
    description="UX UI MATE supports businesses in Newcastle with UX/UI design, web design, branding, and high-conversion digital product experiences."
    points={[
      'Clear UX strategy before visual design so decisions are based on user behavior.',
      'Conversion-focused website and landing page design for local and national growth.',
      'Close collaboration across discovery, design, and implementation.',
      'Fast communication and practical delivery for startups and established teams.'
    ]}
  />
);

export default NewcastlePage;
