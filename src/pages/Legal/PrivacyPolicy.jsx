import LegalPolicyLayout from './components/LegalPolicyLayout';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => (
  <LegalPolicyLayout eyebrow="Privacy Policy" title="Privacy Policy" path="/privacy-policy">
    <p>
      UX UI MATE ("we", "us", "our") is a premium UX/UI design studio. This Privacy Policy explains how we collect,
      use, and protect your personal data when you use this website or get in touch with us. This policy applies to
      visitors and clients in the United Kingdom, the European Union, and elsewhere, in line with UK GDPR and EU GDPR
      where relevant.
    </p>
    <p>Data Controller. For the purposes of UK and EU data protection law, the Data Controller is UX UI MATE.</p>

    <h2>1. Information We Collect</h2>
    <h3>a) Information you provide voluntarily</h3>
    <p>
      When you contact us via the website or email, we may collect: Name, Email address, Phone number (optional),
      Message and project details.
    </p>
    <h3>b) Information collected automatically</h3>
    <p>
      When you browse the website, limited technical and usage data may be collected: Browser type and device
      information, Screen size, Pages visited and time spent, Referrer and approximate country. This data is used only
      to understand how the website is used and to improve it.
    </p>

    <h2>2. Cookies &amp; Analytics</h2>
    <p>
      Currently, this website uses privacy-friendly, cookieless analytics that do not collect personal data and do not
      require consent. If we introduce tools that use cookies in the future, we will display a clear cookie banner,
      ask for explicit consent, and allow you to change or withdraw consent at any time. See our{' '}
      <Link to="/cookie-policy">Cookie Policy</Link>.
    </p>

    <h2>3. Lawful Basis for Processing</h2>
    <p>
      We rely on: Legitimate interests - responding to enquiries, operating and improving the website; Consent - where
      required for cookies or marketing. You may withdraw consent at any time.
    </p>

    <h2>4. How We Use Your Data</h2>
    <p>
      We use personal data only to: Respond to enquiries and discuss projects; Improve the website and understand
      which content is useful; Maintain website performance and security. We do not use your data for automated
      decision-making or profiling.
    </p>

    <h2>5. Sharing of Data</h2>
    <p>
      Your personal data is never sold. Data is shared only where necessary: with trusted collaborators (with your
      permission); with service providers under appropriate safeguards; where required by law.
    </p>

    <h2>6. Storage &amp; Retention</h2>
    <p>
      Contact form and enquiry data is stored for up to 2 years. Analytics data is retained for no longer than 24
      months. Data is deleted or anonymised when no longer required.
    </p>

    <h2>7. Your Rights (UK GDPR &amp; EU GDPR)</h2>
    <p>
      You have the right to: Access the personal data we hold about you; Correct inaccurate or incomplete data;
      Request deletion; Restrict or object to processing; Withdraw consent at any time. EU users may lodge a complaint
      with their local data protection authority. To exercise any rights, email{' '}
      <a href="mailto:uxuimate@gmail.com">uxuimate@gmail.com</a>. Requests are handled within 30 days.
    </p>

    <h2>8. Children&apos;s Data</h2>
    <p>This website is not intended for children under 16, and we do not knowingly collect data from children.</p>

    <h2>9. Contact</h2>
    <p>UX UI MATE</p>
    <p>United Kingdom</p>
  </LegalPolicyLayout>
);

export default PrivacyPolicyPage;
