/* -------------------------------------------
   UX UI MATE — cookie consent + Google Analytics 4
------------------------------------------- */
(function () {
    'use strict';

    /* Measurement ID from GA4 Admin → Data streams (G-…). */
    var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    var STORAGE_KEY = 'uxui_cookie_consent';
    var CONSENT_VERSION = '2026-08';

    var gtagLoaded = false;

    function hasRealMeasurementId() {
        return /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID.indexOf('XXXX') === -1;
    }

    function readConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!data || data.v !== CONSENT_VERSION) return null;
            return data.choice === 'granted' ? 'granted' : data.choice === 'denied' ? 'denied' : null;
        } catch (e) {
            return null;
        }
    }

    function writeConsent(choice) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                v: CONSENT_VERSION,
                choice: choice,
                at: new Date().toISOString()
            }));
        } catch (e) { /* private mode */ }
    }

    function cookiePolicyHref() {
        var path = (window.location.pathname || '').replace(/\\/g, '/');
        return path.indexOf('/articles/') !== -1 ? '../cookie-policy.html' : 'cookie-policy.html';
    }

    function ensureConsentDefaults() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
        });
    }

    function loadGtag() {
        if (gtagLoaded || !hasRealMeasurementId()) return;
        gtagLoaded = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
        document.head.appendChild(s);
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
            send_page_view: true
        });
    }

    function grantAnalytics() {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        loadGtag();
        if (hasRealMeasurementId()) {
            window.gtag('event', 'page_view', { page_location: window.location.href, page_title: document.title });
        }
    }

    function denyAnalytics() {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }

    function sendPageView() {
        if (readConsent() !== 'granted' || !hasRealMeasurementId() || typeof window.gtag !== 'function') return;
        window.gtag('event', 'page_view', {
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_title: document.title
        });
    }

    function hideBanner(banner) {
        var el = banner || document.getElementById('uxui-cookie-banner');
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }

    function showBanner() {
        if (document.getElementById('uxui-cookie-banner')) return;
        var banner = document.createElement('div');
        banner.id = 'uxui-cookie-banner';
        banner.className = 'uxui-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-labelledby', 'uxui-cookie-title');
        banner.setAttribute('aria-describedby', 'uxui-cookie-text');
        banner.innerHTML =
            '<div class="uxui-cookie-banner__inner">' +
                '<div class="uxui-cookie-banner__copy">' +
                    '<p id="uxui-cookie-title" class="uxui-cookie-banner__title">We use cookies</p>' +
                    '<p id="uxui-cookie-text" class="uxui-cookie-banner__text">We use cookies to make this website work and to understand how it is used. Optional analytics cookies are only set if you accept. See our <a href="' +
                    cookiePolicyHref() +
                    '">Cookie Policy</a>.</p>' +
                '</div>' +
                '<div class="uxui-cookie-banner__actions">' +
                    '<button type="button" class="uxui-cookie-btn uxui-cookie-btn--ghost" data-cookie-choice="denied">Reject</button>' +
                    '<button type="button" class="uxui-cookie-btn uxui-cookie-btn--solid" data-cookie-choice="granted">Accept</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(banner);
        banner.addEventListener('click', function (e) {
            var choice = e.target && e.target.getAttribute && e.target.getAttribute('data-cookie-choice');
            if (!choice) return;
            writeConsent(choice);
            if (choice === 'granted') grantAnalytics();
            else denyAnalytics();
            hideBanner(banner);
        });
    }

    function applyStoredChoice() {
        var choice = readConsent();
        if (choice === 'granted') {
            grantAnalytics();
            return;
        }
        if (choice === 'denied') {
            denyAnalytics();
            return;
        }
        showBanner();
    }

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ensureConsentDefaults();
    ready(applyStoredChoice);

    document.addEventListener('swup:contentReplaced', sendPageView);
    window.uxuiOpenCookieSettings = function () {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        showBanner();
    };
})();
