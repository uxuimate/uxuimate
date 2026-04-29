import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_REJECTED,
  getCookieConsentValue,
  isLegalPagePath,
  loadAnalyticsScripts,
  setCookieConsentValue
} from '@/utils/cookieConsent';
import './CookieConsentBar.css';

const CookieConsentBar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const hiddenOnThisPage = useMemo(() => isLegalPagePath(location.pathname), [location.pathname]);

  useEffect(() => {
    const consent = getCookieConsentValue();

    if (consent === COOKIE_CONSENT_ACCEPTED) {
      loadAnalyticsScripts();
    }

    if (!consent && !hiddenOnThisPage) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  }, [hiddenOnThisPage]);

  const handleChoice = choice => {
    setCookieConsentValue(choice);
    if (choice === COOKIE_CONSENT_ACCEPTED) {
      loadAnalyticsScripts();
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="cookie-consent" role="region" aria-label="Cookie consent">
      <p className="cookie-consent__text">
        We use cookies to personalise content, analyse traffic, and improve your experience. Read our{' '}
        <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>
      <div className="cookie-consent__actions">
        <button
          type="button"
          className="btn btn-transparent-white btn-rounded btn-medium cookie-consent__btn"
          onClick={() => handleChoice(COOKIE_CONSENT_REJECTED)}
        >
          Reject
        </button>
        <button
          type="button"
          className="btn btn-white btn-rounded btn-medium cookie-consent__btn"
          onClick={() => handleChoice(COOKIE_CONSENT_ACCEPTED)}
        >
          Accept
        </button>
      </div>
    </aside>
  );
};

export default CookieConsentBar;
