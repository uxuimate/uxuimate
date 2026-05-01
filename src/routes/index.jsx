import { lazy } from 'react';
import LocalLandingPage from '@/pages/Locations/LocalLandingPage';
const InnovativeParallax = lazy(() => import('@/pages/uxuimate'));
const ServicesPage = lazy(() => import('@/pages/Services'));
const AboutUsPage = lazy(() => import('@/pages/AboutUs'));
const WorksPage = lazy(() => import('@/pages/Works'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const VideoNabliudenieCaseStudyPage = lazy(() => import('@/pages/CaseStudyVideoNabliudenie'));
const ErClimaCaseStudyPage = lazy(() => import('@/pages/CaseStudyErClima'));
const SoftPlayCaseStudyPage = lazy(() => import('@/pages/CaseStudySoftPlay'));
const HealthyEatsCaseStudyPage = lazy(() => import('@/pages/CaseStudyHealthyEats'));
const EcoHerbalistUxCaseStudyPage = lazy(() => import('@/pages/CaseStudyEcoHerbalistUx'));
const EcoHerbalistBrandingCaseStudyPage = lazy(() => import('@/pages/CaseStudyEcoHerbalistBranding'));
const CinematicEscapesCaseStudyPage = lazy(() => import('@/pages/CaseStudyCinematicEscapes'));
const NistravelCaseStudyPage = lazy(() => import('@/pages/CaseStudyNistravel'));
const PrivacyPolicyPage = lazy(() => import('@/pages/Legal/PrivacyPolicy'));
const TermsAndConditionsPage = lazy(() => import('@/pages/Legal/TermsAndConditions'));
const CookiePolicyPage = lazy(() => import('@/pages/Legal/CookiePolicy'));
const NewcastlePage = lazy(() => import('@/pages/Locations/Newcastle'));
const UkPage = lazy(() => import('@/pages/Locations/Uk'));
const BulgariaPage = lazy(() => import('@/pages/Locations/Bulgaria'));
const SofiaPage = lazy(() => import('@/pages/Locations/Sofia'));

/** New public URLs: add a matching entry in `src/constants/sitemapPaths.js` (sitemap regenerates on `npm run build`). */
export const appRoutes = [{
  path: '/',
  name: 'root',
  element: <InnovativeParallax />
}, {
  path: '/innovative-parallax',
  name: 'innovative-parallax',
  element: <InnovativeParallax />
}, {
  path: '/services',
  name: 'services-page',
  element: <ServicesPage />
}, {
  path: '/about-us',
  name: 'about-us',
  element: <AboutUsPage />
}, {
  path: '/works',
  name: 'works-page',
  element: <WorksPage />
}, {
  path: '/contact',
  name: 'contact-page',
  element: <ContactPage />
}, {
  path: '/works/videonabliudenie-bg',
  name: 'works-videonabliudenie-bg',
  element: <VideoNabliudenieCaseStudyPage />
}, {
  path: '/works/er-clima-solutions',
  name: 'works-er-clima-solutions',
  element: <ErClimaCaseStudyPage />
}, {
  path: '/works/soft-play-solutions',
  name: 'works-soft-play-solutions',
  element: <SoftPlayCaseStudyPage />
}, {
  path: '/works/healthy-eats-redesign',
  name: 'works-healthy-eats-redesign',
  element: <HealthyEatsCaseStudyPage />
}, {
  path: '/works/eco-herbalist-ux',
  name: 'works-eco-herbalist-ux',
  element: <EcoHerbalistUxCaseStudyPage />
}, {
  path: '/works/eco-herbalist-branding',
  name: 'works-eco-herbalist-branding',
  element: <EcoHerbalistBrandingCaseStudyPage />
}, {
  path: '/works/cinematic-escapes',
  name: 'works-cinematic-escapes',
  element: <CinematicEscapesCaseStudyPage />
}, {
  path: '/works/nistravel-bg',
  name: 'works-nistravel-bg',
  element: <NistravelCaseStudyPage />
}, {
  path: '/privacy-policy',
  name: 'privacy-policy',
  element: <PrivacyPolicyPage />
}, {
  path: '/terms-and-conditions',
  name: 'terms-and-conditions',
  element: <TermsAndConditionsPage />
}, {
  path: '/cookie-policy',
  name: 'cookie-policy',
  element: <CookiePolicyPage />
}, {
  path: '/ux-ui-design-newcastle',
  name: 'ux-ui-design-newcastle',
  element: <NewcastlePage />
}, {
  path: '/ux-ui-design-uk',
  name: 'ux-ui-design-uk',
  element: <UkPage />
}, {
  path: '/ux-ui-design-bulgaria',
  name: 'ux-ui-design-bulgaria',
  element: <BulgariaPage />
}, {
  path: '/ux-ui-design-sofia',
  name: 'ux-ui-design-sofia',
  element: <SofiaPage />
}, {
  path: '/web-development-newcastle',
  name: 'web-development-newcastle',
  element: <LocalLandingPage city="Newcastle" region="UK" path="/web-development-newcastle" serviceName="Web Development" eyebrow="Local Web Development Services" headline="Web development in Newcastle for high-performing business websites" description="UX UI MATE delivers conversion-focused web development in Newcastle, combining fast performance, clean code, and user-first interfaces." points={['Fast, responsive websites tailored to business goals.', 'Technical SEO-ready implementation for better discoverability.', 'Conversion-focused page structure and UX patterns.', 'Reliable delivery for launches, redesigns, and growth updates.']} keywords={['web development Newcastle', 'website development Newcastle', 'front-end development UK', 'conversion-focused websites Newcastle', 'UX UI MATE']} />
}, {
  path: '/web-development-uk',
  name: 'web-development-uk',
  element: <LocalLandingPage city="United Kingdom" region="UK" path="/web-development-uk" serviceName="Web Development" eyebrow="UK Web Development Services" headline="Web development services across the UK" description="UX UI MATE builds scalable web experiences for UK companies, from high-converting marketing sites to product-led business platforms." points={['Modern front-end build quality with responsive behavior.', 'SEO-aware implementation and strong Core Web Vitals foundations.', 'Clear collaboration from scoping to launch.', 'Flexible support for startups and established UK teams.']} keywords={['web development UK', 'website development agency UK', 'front-end development UK', 'high-converting websites UK', 'UX UI MATE']} />
}, {
  path: '/web-development-bulgaria',
  name: 'web-development-bulgaria',
  element: <LocalLandingPage city="Bulgaria" region="Europe" path="/web-development-bulgaria" serviceName="Web Development" eyebrow="Bulgaria Web Development Services" headline="Web development support for businesses in Bulgaria" description="UX UI MATE helps Bulgarian teams launch and improve websites with stronger UX structure, clean front-end execution, and measurable performance." points={['Responsive website development aligned with brand and UX goals.', 'Performance-driven implementation for speed and clarity.', 'SEO-friendly structure and semantic markup best practices.', 'Delivery model suited to both local and international business needs.']} keywords={['web development Bulgaria', 'website development Bulgaria', 'UI development Bulgaria', 'SEO-ready websites Bulgaria', 'UX UI MATE']} />
}, {
  path: '/web-development-sofia',
  name: 'web-development-sofia',
  element: <LocalLandingPage city="Sofia" region="Bulgaria" path="/web-development-sofia" serviceName="Web Development" eyebrow="Sofia Web Development Services" headline="Web development in Sofia for growth-focused companies" description="UX UI MATE provides web development in Sofia with a focus on speed, usability, and conversion outcomes for modern digital businesses." points={['Clean implementation with reusable front-end systems.', 'Landing pages and websites designed to convert.', 'Strong collaboration between design and development.', 'Practical rollout support for launches and redesigns.']} keywords={['web development Sofia', 'website development Sofia', 'front-end development Sofia', 'conversion websites Sofia', 'UX UI MATE']} />
}, {
  path: '/mobile-saas-newcastle',
  name: 'mobile-saas-newcastle',
  element: <LocalLandingPage city="Newcastle" region="UK" path="/mobile-saas-newcastle" serviceName="Mobile & SaaS Design" eyebrow="Mobile & SaaS Services" headline="Mobile app and SaaS UX/UI design in Newcastle" description="UX UI MATE supports Newcastle teams with mobile and SaaS product design, improving onboarding, usability, and product adoption." points={['User flow design for onboarding, activation, and retention.', 'Interface systems for scalable SaaS and mobile experiences.', 'Clear information architecture for complex product journeys.', 'UX decisions grounded in practical product outcomes.']} keywords={['mobile app design Newcastle', 'SaaS UX Newcastle', 'product design Newcastle', 'mobile UX UI Newcastle', 'UX UI MATE']} />
}, {
  path: '/mobile-saas-uk',
  name: 'mobile-saas-uk',
  element: <LocalLandingPage city="United Kingdom" region="UK" path="/mobile-saas-uk" serviceName="Mobile & SaaS Design" eyebrow="UK Mobile & SaaS Services" headline="Mobile and SaaS product design services across the UK" description="UX UI MATE helps UK startups and product teams design mobile and SaaS experiences that are intuitive, scalable, and ready for growth." points={['Product UX strategy for new and existing digital platforms.', 'Mobile-first interface design with strong usability principles.', 'Design systems that support roadmap scaling.', 'Collaboration model suitable for lean and in-house teams.']} keywords={['SaaS design UK', 'mobile app UX UK', 'product design UK', 'SaaS UI design UK', 'UX UI MATE']} />
}, {
  path: '/mobile-saas-bulgaria',
  name: 'mobile-saas-bulgaria',
  element: <LocalLandingPage city="Bulgaria" region="Europe" path="/mobile-saas-bulgaria" serviceName="Mobile & SaaS Design" eyebrow="Bulgaria Mobile & SaaS Services" headline="Mobile and SaaS UX/UI services for teams in Bulgaria" description="UX UI MATE partners with Bulgarian teams to design mobile and SaaS products with better usability, clearer navigation, and stronger product value communication." points={['UX improvements that reduce friction in core flows.', 'High-fidelity UI design for product consistency.', 'Scalable systems for mobile and SaaS feature growth.', 'Support for products serving local and international users.']} keywords={['SaaS design Bulgaria', 'mobile app UX Bulgaria', 'product design Bulgaria', 'SaaS UI Bulgaria', 'UX UI MATE']} />
}, {
  path: '/mobile-saas-sofia',
  name: 'mobile-saas-sofia',
  element: <LocalLandingPage city="Sofia" region="Bulgaria" path="/mobile-saas-sofia" serviceName="Mobile & SaaS Design" eyebrow="Sofia Mobile & SaaS Services" headline="Mobile app and SaaS design in Sofia for product teams" description="UX UI MATE provides mobile and SaaS UX/UI design in Sofia with a focus on onboarding, user engagement, and long-term product usability." points={['UX mapping for key SaaS and app interactions.', 'UI design systems for feature consistency and speed.', 'Product thinking applied to business and user goals.', 'Flexible collaboration for founders and growing teams.']} keywords={['SaaS design Sofia', 'mobile app design Sofia', 'product UX Sofia', 'SaaS UI Sofia', 'UX UI MATE']} />
}, {
  path: '/branding-newcastle',
  name: 'branding-newcastle',
  element: <LocalLandingPage city="Newcastle" region="UK" path="/branding-newcastle" serviceName="Branding Services" eyebrow="Local Branding Services" headline="Branding services in Newcastle for digital-first businesses" description="UX UI MATE creates strategic branding in Newcastle for businesses that need stronger positioning, visual consistency, and digital presence." points={['Brand identity systems that work across digital channels.', 'Visual language aligned with UX and website goals.', 'Consistent messaging and design direction for trust.', 'Branding support for startups, scaleups, and established teams.']} keywords={['branding Newcastle', 'brand identity Newcastle', 'digital branding Newcastle', 'branding studio UK', 'UX UI MATE']} />
}, {
  path: '/branding-uk',
  name: 'branding-uk',
  element: <LocalLandingPage city="United Kingdom" region="UK" path="/branding-uk" serviceName="Branding Services" eyebrow="UK Branding Services" headline="Branding services across the UK for modern businesses" description="UX UI MATE delivers branding services across the UK, helping companies build clear brand systems that strengthen recognition and digital performance." points={['Brand strategy and visual identity for digital products.', 'Design systems for coherent cross-channel brand expression.', 'Positioning support to improve perceived value.', 'Brand refinement for growth, relaunch, or market expansion.']} keywords={['branding UK', 'brand identity UK', 'digital branding UK', 'branding agency UK', 'UX UI MATE']} />
}, {
  path: '/branding-bulgaria',
  name: 'branding-bulgaria',
  element: <LocalLandingPage city="Bulgaria" region="Europe" path="/branding-bulgaria" serviceName="Branding Services" eyebrow="Bulgaria Branding Services" headline="Branding services in Bulgaria for ambitious teams" description="UX UI MATE helps Bulgarian businesses develop stronger brand identity systems with clear digital expression and better market consistency." points={['Strategic identity design aligned with growth goals.', 'Visual systems for websites, products, and communication.', 'Brand coherence that improves recognition and trust.', 'Support for brands operating in Bulgaria and abroad.']} keywords={['branding Bulgaria', 'brand identity Bulgaria', 'digital branding Bulgaria', 'branding design Bulgaria', 'UX UI MATE']} />
}, {
  path: '/branding-sofia',
  name: 'branding-sofia',
  element: <LocalLandingPage city="Sofia" region="Bulgaria" path="/branding-sofia" serviceName="Branding Services" eyebrow="Sofia Branding Services" headline="Branding in Sofia for product and service businesses" description="UX UI MATE provides branding services in Sofia focused on sharper positioning, stronger visual identity, and better digital consistency." points={['Identity direction built for web and product touchpoints.', 'Brand systems designed for consistency at scale.', 'Positioning support that clarifies your market message.', 'Branding partnerships tailored for growing Sofia teams.']} keywords={['branding Sofia', 'brand identity Sofia', 'digital branding Sofia', 'branding studio Sofia', 'UX UI MATE']} />
}];