/* -------------------------------------------
   Forms → hello@uxuimate.com via FormSubmit
------------------------------------------- */
(function () {
    'use strict';

    var MAILBOX = 'hello@uxuimate.com';
    var ENDPOINT = 'https://formsubmit.co/ajax/' + MAILBOX;

    function ensureHidden(form, name, value) {
        var el = form.querySelector('input[name="' + name + '"]');
        if (!el) {
            el = document.createElement('input');
            el.type = 'hidden';
            el.name = name;
            form.appendChild(el);
        }
        el.value = value;
    }

    function isContactForm(form) {
        return form && (form.id === 'contact-form' || form.id === 'contact-form-data' || form.id === 'feedback-form');
    }

    function thanksCopy(form) {
        if (form && form.id === 'feedback-form') {
            return {
                eyebrow: 'Received',
                title: 'Thank you',
                text: 'We have received your review. We will only use your words publicly if you gave permission.'
            };
        }
        if (form && form.classList.contains('mil-subscribe-form')) {
            return {
                eyebrow: 'Received',
                title: 'Thank you',
                text: 'We have your email. We will send consultation details shortly.'
            };
        }
        return {
            eyebrow: 'Sent',
            title: 'Thank you',
            text: 'Your enquiry is with us. We will reply to your email within 24 hours.'
        };
    }

    function fillThanksPanel(panel, form) {
        var copy = thanksCopy(form);
        var eyebrow = panel.querySelector('.uxui-form-thanks__eyebrow');
        var title = panel.querySelector('.uxui-form-thanks__title') || panel.querySelector('h3');
        var text = panel.querySelector('.uxui-form-thanks__text');
        if (!text) {
            var paragraphs = panel.querySelectorAll('p');
            text = paragraphs.length ? paragraphs[paragraphs.length - 1] : null;
        }
        if (eyebrow) eyebrow.textContent = copy.eyebrow;
        if (title) title.textContent = copy.title;
        if (text && text !== eyebrow) text.textContent = copy.text;
    }

    function findLocalThanks(form) {
        var scope = form.closest('section') || form.parentElement;
        if (!scope) return null;
        return scope.querySelector('#contact-thank-you, .uxui-form-thanks');
    }

    function createThanksPanel(form) {
        var panel = document.createElement('div');
        panel.className = 'uxui-form-thanks';
        panel.setAttribute('role', 'status');
        panel.setAttribute('aria-live', 'polite');
        panel.innerHTML =
            '<p class="uxui-form-thanks__eyebrow"></p>' +
            '<h3 class="uxui-form-thanks__title"></h3>' +
            '<p class="uxui-form-thanks__text"></p>';
        fillThanksPanel(panel, form);
        form.parentNode.insertBefore(panel, form);
        return panel;
    }

    function prepareForm(form) {
        if (!form || !form.getAttribute('action')) return false;
        var action = form.getAttribute('action') || '';
        if (action.indexOf('formsubmit.co') === -1) return false;
        form.setAttribute('action', ENDPOINT.replace('/ajax/', '/'));
        ensureHidden(form, '_captcha', 'false');
        ensureHidden(form, '_template', 'table');
        ensureHidden(form, '_honey', '');
        if (!form.querySelector('input[name="_subject"]')) {
            ensureHidden(form, '_subject', 'Website enquiry (UX UI MATE)');
        }
        var next = form.querySelector('input[name="_next"]');
        if (next && !next.value) {
            next.value = window.location.origin + window.location.pathname + '?thanks=1';
        }
        return true;
    }

    function showThanks(form) {
        if (!form) return;
        var errorBox = form.closest('section') && form.closest('section').querySelector('#contact-form-error');
        if (errorBox) errorBox.style.display = 'none';

        var panel = findLocalThanks(form) || createThanksPanel(form);
        if (!panel.querySelector('.uxui-form-thanks__title') && !panel.querySelector('h3')) {
            fillThanksPanel(panel, form);
        }
        panel.classList.add('uxui-form-thanks', 'is-visible');
        panel.style.display = 'block';
        panel.removeAttribute('hidden');
        panel.setAttribute('tabindex', '-1');

        form.style.display = 'none';
        form.setAttribute('hidden', '');
        form.reset();

        var intro = document.getElementById('contact-form-intro');
        if (intro && form.id === 'contact-form') intro.style.display = 'none';

        var flow = document.getElementById('feedback-flow');
        if (flow && form.id === 'feedback-form') flow.style.display = 'none';

        if (isContactForm(form)) {
            try {
                history.replaceState(null, '', window.location.pathname + '?thanks=1');
            } catch (e) { }
        }

        try {
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof panel.focus === 'function') panel.focus({ preventScroll: true });
        } catch (e) { }
    }

    function showError(form, message) {
        var scope = (form && form.closest('section')) || document;
        var errorBox = scope.querySelector('#contact-form-error');
        var p = errorBox && errorBox.querySelector('p');
        if (errorBox && p) {
            p.textContent = message || 'Something went wrong. Please email hello@uxuimate.com.';
            errorBox.style.display = 'block';
            errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        window.alert(message || 'Could not send. Please email hello@uxuimate.com.');
    }

    function submitAjax(form, btn) {
        var btnLabel = btn && (btn.querySelector('span') || btn);
        var original = btnLabel ? btnLabel.textContent : '';
        if (btn) btn.disabled = true;
        if (btnLabel) btnLabel.textContent = 'Sending…';

        return fetch(ENDPOINT, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form)
        }).then(function (res) {
            return res.json().then(function (data) {
                return { ok: res.ok, data: data };
            }).catch(function () {
                return { ok: res.ok, data: null };
            });
        }).then(function (result) {
            var data = result.data || {};
            if (result.ok && data.success !== false && !data.error) {
                showThanks(form);
                return;
            }
            showError(form, data.message || data.error || 'Please try again or email hello@uxuimate.com.');
        }).catch(function () {
            showError(form, 'Network error. Please email hello@uxuimate.com directly.');
        }).finally(function () {
            if (btn) btn.disabled = false;
            if (btnLabel && original) btnLabel.textContent = original;
        });
    }

    window.uxuiSubmitMailForm = function (form, btn) {
        if (!prepareForm(form)) return Promise.reject(new Error('Not a mail form'));
        return submitAjax(form, btn);
    };

    function restoreThanksFromQuery() {
        if (window.location.search.indexOf('thanks=1') === -1) return;
        var form = document.getElementById('contact-form')
            || document.getElementById('contact-form-data')
            || document.getElementById('feedback-form');
        if (form) showThanks(form);
    }

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        var forms = document.querySelectorAll('form[action*="formsubmit.co"]');
        for (var i = 0; i < forms.length; i++) {
            prepareForm(forms[i]);
        }
        restoreThanksFromQuery();
        document.addEventListener('submit', function (e) {
            var form = e.target;
            if (!form || form.tagName !== 'FORM') return;
            if (!prepareForm(form)) return;
            if (form.id === 'contact-form' || form.id === 'feedback-form') return;
            e.preventDefault();
            var btn = form.querySelector('[type="submit"]');
            submitAjax(form, btn);
        }, true);
    });

    document.addEventListener('swup:contentReplaced', function () {
        var forms = document.querySelectorAll('form[action*="formsubmit.co"]');
        for (var i = 0; i < forms.length; i++) {
            prepareForm(forms[i]);
        }
        restoreThanksFromQuery();
    });
})();
