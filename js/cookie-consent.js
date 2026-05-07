(function () {
  'use strict';

  var CONSENT_KEY = 'uxm_cookie_consent_v1';
  var ANALYTICS_ID = 'G-87Z218HTCK';
  var analyticsLoaded = false;

  function getStoredConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (err) {
      return null;
    }
  }

  function setStoredConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (err) {
      // No-op when storage is blocked.
    }
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID);

    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_ID;
    document.head.appendChild(gaScript);
  }

  function createBanner() {
    var banner = document.createElement('aside');
    banner.className = 'uxm-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie consent');

    banner.innerHTML =
      '<p class="uxm-cookie-banner__text">We use cookies and Google Analytics to understand site performance. By continuing to use this website, you agree to analytics cookies. You can reject analytics below. <a href="cookie-policy.html">Learn more</a>.</p>' +
      '<div class="uxm-cookie-banner__actions">' +
      '<button type="button" class="uxm-cookie-banner__btn uxm-cookie-banner__btn--accept">Accept</button>' +
      '<button type="button" class="uxm-cookie-banner__btn uxm-cookie-banner__btn--reject">Reject</button>' +
      '</div>';

    document.body.appendChild(banner);
    return banner;
  }

  function initConsentFlow() {
    var current = getStoredConsent();
    if (current === 'accepted') {
      loadAnalytics();
      return;
    }
    if (current === 'rejected') return;

    var banner = createBanner();
    var acceptBtn = banner.querySelector('.uxm-cookie-banner__btn--accept');
    var rejectBtn = banner.querySelector('.uxm-cookie-banner__btn--reject');

    var isClosed = false;
    var impliedHandlersBound = false;

    function closeBanner() {
      if (isClosed) return;
      isClosed = true;
      if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      if (impliedHandlersBound) {
        window.removeEventListener('scroll', onImpliedConsent, { passive: true });
        document.removeEventListener('click', onImpliedClick);
        document.removeEventListener('keydown', onImpliedConsent);
      }
    }

    function acceptConsent() {
      setStoredConsent('accepted');
      loadAnalytics();
      closeBanner();
    }

    function rejectConsent() {
      setStoredConsent('rejected');
      closeBanner();
    }

    function onImpliedConsent() {
      acceptConsent();
    }

    function onImpliedClick(event) {
      if (!banner.contains(event.target)) {
        acceptConsent();
      }
    }

    acceptBtn.addEventListener('click', acceptConsent);
    rejectBtn.addEventListener('click', rejectConsent);

    // Continue browsing => implied acceptance.
    impliedHandlersBound = true;
    window.addEventListener('scroll', onImpliedConsent, { passive: true, once: true });
    document.addEventListener('click', onImpliedClick, { once: true });
    document.addEventListener('keydown', onImpliedConsent, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsentFlow);
  } else {
    initConsentFlow();
  }
})();
