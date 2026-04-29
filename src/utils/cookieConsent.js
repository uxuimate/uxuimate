export const COOKIE_CONSENT_KEY = 'cookieConsent';
export const COOKIE_CONSENT_ACCEPTED = 'accepted';
export const COOKIE_CONSENT_REJECTED = 'rejected';

const ANALYTICS_FLAG = '__analyticsLoadedByConsent';

export function getCookieConsentValue() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setCookieConsentValue(value) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // Ignore storage errors (privacy mode / unavailable storage).
  }
}

export function isLegalPagePath(pathname = '') {
  return pathname === '/cookie-policy' || pathname === '/privacy-policy' || pathname === '/terms-and-conditions';
}

export function loadAnalyticsScripts() {
  if (typeof window === 'undefined') {
    return;
  }

  if (window[ANALYTICS_FLAG]) {
    return;
  }

  window[ANALYTICS_FLAG] = true;

  // Hook for any analytics bootstrap code added later.
  // Integrators can attach a function to window to initialize tracking.
  if (typeof window.initializeAnalytics === 'function') {
    window.initializeAnalytics();
  }
}
