import LegalPolicyLayout from './components/LegalPolicyLayout';
import { Link } from 'react-router-dom';

const CookiePolicyPage = () => (
  <LegalPolicyLayout
    eyebrow="Cookie Policy"
    title="Cookie Policy"
    path="/cookie-policy"
    description="Cookie Policy for UX UI MATE, including current cookie usage status and consent approach for future tracking technologies."
  >
    <h2>1. Introduction</h2>
    <p>
      This Cookie Policy explains how UX UI MATE (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies and similar technologies on this
      website (&quot;Website&quot;).
    </p>
    <p>
      UX UI MATE is a premium UX/UI design studio offering UX/UI design, web development, and branding services.
    </p>
    <p>
      We are based in the United Kingdom and provide services to clients in the UK and the European Union. This Cookie
      Policy is intended to comply with UK GDPR, EU GDPR, UK PECR, and EU ePrivacy Directive.
    </p>
    <p>
      This policy should be read together with our <Link to="/privacy-policy">Privacy Policy</Link>.
    </p>

    <h2>2. What Are Cookies?</h2>
    <p>
      Cookies are small text files placed on your device when you visit a website. Cookies help websites function
      properly, improve user experience, and provide information to website owners.
    </p>
    <ul>
      <li>Session cookies - deleted when you close your browser</li>
      <li>Persistent cookies - stored for a defined period</li>
      <li>First-party cookies - set by this Website</li>
      <li>Third-party cookies - set by external services</li>
    </ul>

    <h2>3. Do We Currently Use Cookies?</h2>
    <p>
      At this time, UX UI MATE does not actively use cookies or similar tracking technologies on this Website.
    </p>
    <p>
      However, this Website may implement cookies in the future for functionality, analytics, marketing, or integration
      with third-party services.
    </p>
    <ul>
      <li>Inform users transparently</li>
      <li>Ensure compliance when cookies are introduced</li>
      <li>Avoid retroactive non-compliance</li>
    </ul>

    <h2>4. Types of Cookies We May Use in the Future</h2>
    <p>
      If and when cookies are enabled, they may include: Strictly Necessary, Functional, Analytics/Performance, and
      Marketing/Advertising cookies. Non-essential cookies will require consent.
    </p>

    <h2>5. Cookie Consent and Control</h2>
    <p>
      When cookies are introduced, users will be presented with a cookie consent banner allowing them to accept all,
      reject non-essential, or manage preferences.
    </p>
    <p>Non-essential cookies will not be set unless and until valid consent is obtained.</p>

    <h2>6. How to Manage Cookies via Your Browser</h2>
    <p>
      Users can manage or delete cookies at any time through their browser settings. Instructions vary by browser
      (Chrome, Firefox, Safari, Edge). Disabling cookies may affect Website functionality.
    </p>

    <h2>7. Contact Information</h2>
    <p>UX UI MATE</p>
    <p>Location: United Kingdom</p>
  </LegalPolicyLayout>
);

export default CookiePolicyPage;
