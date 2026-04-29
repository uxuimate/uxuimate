import LegalPolicyLayout from './components/LegalPolicyLayout';
import { Link } from 'react-router-dom';

const TermsAndConditionsPage = () => (
  <LegalPolicyLayout eyebrow="Terms & Conditions" title="Terms & Conditions" path="/terms-and-conditions">
    <h2>1. About This Website</h2>
    <p>
      This website is operated under the trading name UX UI MATE. UX UI MATE is a UK-based sole trader business
      providing design, UX/UI, and related digital services. Any client services are provided only under a separate
      written agreement.
    </p>

    <h2>2. Acceptance of These Terms</h2>
    <p>
      By accessing or using this website, you agree to be bound by these Terms &amp; Conditions. If you do not agree,
      you must not use the website.
    </p>

    <h2>3. Use of the Website</h2>
    <p>
      You agree not to: Use the website for unlawful purposes; Attempt unauthorised access to systems or data; Copy,
      reproduce, or reuse website content for commercial purposes; Misrepresent your identity or intentions. Access may
      be restricted or terminated if misuse is detected.
    </p>

    <h2>4. Information Disclaimer</h2>
    <p>
      All information on this website is provided for general information purposes only. Nothing constitutes a binding
      offer. Pricing, timelines, and availability are indicative only. Services are provided only under a separate
      written agreement.
    </p>

    <h2>5. No Guarantee of Results</h2>
    <p>
      While professional care and skill are applied, no guarantees or warranties are made regarding outcomes (business
      performance, revenue, conversions, rankings, or growth). Results depend on multiple factors outside the
      operator&apos;s control.
    </p>

    <h2>6. Intellectual Property</h2>
    <p>
      All website content is owned by or licensed to UX UI MATE. You may view content for personal, non-commercial use
      only. Reproduction, redistribution, or commercial use without prior written permission is prohibited.
    </p>

    <h2>7. Use of Completed Work</h2>
    <p>
      Unless otherwise agreed in writing, UX UI MATE may display completed work and reference projects in our work
      gallery and marketing materials. Confidential information will not be disclosed without consent.
    </p>

    <h2>8. Portfolio &amp; case study content</h2>
    <p>
      Some portfolio or case-study materials on this website may describe illustrative, speculative, or otherwise
      non-client scenarios and are included solely to demonstrate our approach and way of thinking, not as a
      representation of a specific live client engagement. Where we present a genuine client project that is publicly
      available on the web, we will ordinarily link from that case study to the client&apos;s own external website so you
      can verify it independently.
    </p>

    <h2>9. Third-Party Links &amp; Tools</h2>
    <p>
      This website may link to third-party platforms. UX UI MATE is not responsible for their content, availability, or
      data practices. Use of third-party services is governed by their own terms and policies.
    </p>

    <h2>10. Website Availability</h2>
    <p>
      The website is provided &quot;as is&quot; and &quot;as available&quot;. No guarantee is given that it will be uninterrupted,
      error-free, or compatible with all devices. The website may be modified, suspended, or withdrawn at any time
      without notice.
    </p>

    <h2>11. Limitation of Liability</h2>
    <p>
      To the fullest extent permitted by law: All implied warranties are excluded. UX UI MATE shall not be liable for
      loss of profit, business, revenue, savings, data, goodwill, or any indirect or consequential losses. The total
      aggregate liability shall be strictly limited to £100. Nothing limits liability for death or personal injury
      caused by negligence, fraud, or any liability which cannot be excluded by law.
    </p>

    <h2>12. No Professional Advice</h2>
    <p>
      Content on this website does not constitute professional, legal, financial, or business advice. Any services
      provided are subject exclusively to a separate written agreement.
    </p>

    <h2>13. Consumer Rights</h2>
    <p>Nothing in these Terms affects mandatory consumer rights under applicable UK law.</p>

    <h2>14. Privacy</h2>
    <p>
      Personal data is handled in accordance with our <Link to="/privacy-policy">Privacy Policy</Link> and{' '}
      <Link to="/cookie-policy">Cookie Policy</Link>, which form part of these Terms &amp; Conditions.
    </p>

    <h2>15. Governing Law &amp; Jurisdiction</h2>
    <p>
      These Terms &amp; Conditions are governed by the laws of England and Wales. The courts of England and Wales shall
      have exclusive jurisdiction.
    </p>

    <h2>16. Contact</h2>
    <p>UX UI MATE - UK-based sole trader</p>
    <p>Further legal operator details will be provided where required by law.</p>
  </LegalPolicyLayout>
);

export default TermsAndConditionsPage;
