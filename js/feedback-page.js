(function () {
  'use strict';

  var STORAGE_KEY = 'uxmFeedbackDraft';
  var form = document.getElementById('feedback-form');
  if (!form) return;

  var steps = [
    document.getElementById('feedback-step-1'),
    document.getElementById('feedback-step-2'),
    document.getElementById('feedback-step-3'),
  ].filter(Boolean);
  var dots = Array.prototype.slice.call(document.querySelectorAll('[data-feedback-step-dot]'));
  var npsHidden = document.getElementById('feedback-nps-value');
  var npsBtns = Array.prototype.slice.call(document.querySelectorAll('[data-nps-btn]'));

  var currentStep = 1;

  function getFieldMap() {
    return {
      fullName: form.querySelector('[name="fullName"]'),
      email: form.querySelector('[name="email"]'),
      company: form.querySelector('[name="company"]'),
      nps: npsHidden,
      communication: form.querySelector('[name="communication"]'),
      valuableOutcome: form.querySelector('[name="valuableOutcome"]'),
      stoodOut: form.querySelector('[name="stoodOut"]'),
      testimonialDraft: form.querySelector('[name="testimonialDraft"]'),
      portfolioFeature: form.querySelector('[name="portfolioFeature"]'),
    };
  }

  function readValues() {
    var m = getFieldMap();
    return {
      fullName: (m.fullName && m.fullName.value) || '',
      email: (m.email && m.email.value) || '',
      company: (m.company && m.company.value) || '',
      satisfaction: form.querySelector('[name="satisfaction"]:checked')
        ? form.querySelector('[name="satisfaction"]:checked').value
        : '',
      nps: (npsHidden && npsHidden.value) || '',
      communication: (m.communication && m.communication.value) || '',
      scopeDelivery: form.querySelector('[name="scopeDelivery"]:checked')
        ? form.querySelector('[name="scopeDelivery"]:checked').value
        : '',
      valuableOutcome: (m.valuableOutcome && m.valuableOutcome.value) || '',
      stoodOut: (m.stoodOut && m.stoodOut.value) || '',
      testimonialDraft: (m.testimonialDraft && m.testimonialDraft.value) || '',
      portfolioFeature: m.portfolioFeature && m.portfolioFeature.checked,
      attribution: form.querySelector('[name="attribution"]:checked')
        ? form.querySelector('[name="attribution"]:checked').value
        : '',
    };
  }

  function applyValues(v) {
    if (!v) return;
    var set = function (name, val) {
      var el = form.querySelector('[name="' + name + '"]');
      if (!el) return;
      if (el.type === 'checkbox') {
        el.checked = !!val;
      } else if (el.type === 'radio') {
        var r = form.querySelector('[name="' + name + '"][value="' + val + '"]');
        if (r) r.checked = true;
      } else {
        el.value = val;
      }
    };
    set('fullName', v.fullName);
    set('email', v.email);
    set('company', v.company);
    if (v.satisfaction) {
      var sat = form.querySelector('[name="satisfaction"][value="' + v.satisfaction + '"]');
      if (sat) sat.checked = true;
    }
    if (v.nps !== '' && v.nps != null) {
      if (npsHidden) npsHidden.value = String(v.nps);
      syncNpsButtons();
    }
    set('communication', v.communication);
    if (v.scopeDelivery) {
      var sc = form.querySelector('[name="scopeDelivery"][value="' + v.scopeDelivery + '"]');
      if (sc) sc.checked = true;
    }
    set('valuableOutcome', v.valuableOutcome);
    set('stoodOut', v.stoodOut);
    set('testimonialDraft', v.testimonialDraft);
    var pf = form.querySelector('[name="portfolioFeature"]');
    if (pf) pf.checked = !!v.portfolioFeature;
    if (v.attribution) {
      var at = form.querySelector('[name="attribution"][value="' + v.attribution + '"]');
      if (at) at.checked = true;
    }
  }

  function saveDraft() {
    try {
      var payload = { step: currentStep, values: readValues() };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      /* ignore */
    }
  }

  function loadDraft() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data.values) applyValues(data.values);
      if (data.step >= 1 && data.step <= 3) {
        currentStep = data.step;
        updateStepUI();
      }
    } catch (e) {
      /* ignore */
    }
  }

  function clearFieldError(wrap) {
    if (!wrap) return;
    wrap.classList.remove('is-invalid');
  }

  function setFieldError(wrap, show) {
    if (!wrap) return;
    wrap.classList.toggle('is-invalid', !!show);
  }

  function wrapFor(el) {
    return el && el.closest ? el.closest('.feedback-page__field') : null;
  }

  function validateStep1() {
    var ok = true;
    var m = getFieldMap();
    [['fullName', m.fullName], ['email', m.email]].forEach(function (pair) {
      var el = pair[1];
      var w = wrapFor(el);
      clearFieldError(w);
      if (!el || !String(el.value).trim()) {
        setFieldError(w, true);
        ok = false;
        return;
      }
      if (pair[0] === 'email') {
        var em = String(el.value).trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
          setFieldError(w, true);
          ok = false;
        }
      }
    });
    var sat = form.querySelector('[name="satisfaction"]:checked');
    var sw = document.getElementById('feedback-satisfaction-field');
    clearFieldError(sw);
    if (!sat) {
      setFieldError(sw, true);
      ok = false;
    }
    clearFieldError(wrapFor(npsHidden));
    if (!npsHidden || npsHidden.value === '') {
      setFieldError(document.getElementById('feedback-nps-wrap'), true);
      ok = false;
    }
    var comm = m.communication;
    var cw = wrapFor(comm);
    clearFieldError(cw);
    if (!comm || !comm.value) {
      setFieldError(cw, true);
      ok = false;
    }
    return ok;
  }

  function validateStep2() {
    var ok = true;
    var scope = form.querySelector('[name="scopeDelivery"]:checked');
    var sw = document.getElementById('feedback-scope-wrap');
    clearFieldError(sw);
    if (!scope) {
      setFieldError(sw, true);
      ok = false;
    }
    var ta = form.querySelector('[name="valuableOutcome"]');
    var tw = wrapFor(ta);
    clearFieldError(tw);
    if (!ta || !String(ta.value).trim()) {
      setFieldError(tw, true);
      ok = false;
    }
    return ok;
  }

  function validateStep3() {
    var ok = true;
    var att = form.querySelector('[name="attribution"]:checked');
    var aw = document.getElementById('feedback-attribution-wrap');
    clearFieldError(aw);
    if (!att) {
      setFieldError(aw, true);
      ok = false;
    }
    return ok;
  }

  function updateStepUI() {
    steps.forEach(function (el, i) {
      if (!el) return;
      el.classList.toggle('is-active', i + 1 === currentStep);
    });
    dots.forEach(function (dot, i) {
      dot.classList.remove('is-active', 'is-done');
      if (i + 1 === currentStep) dot.classList.add('is-active');
      else if (i + 1 < currentStep) dot.classList.add('is-done');
    });
  }

  function goStep(n) {
    currentStep = Math.max(1, Math.min(3, n));
    updateStepUI();
    saveDraft();
    try {
      window.scrollTo({ top: form.offsetTop - 80, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, form.offsetTop - 80);
    }
  }

  function syncNpsButtons() {
    var v = npsHidden ? npsHidden.value : '';
    npsBtns.forEach(function (btn) {
      btn.classList.toggle('is-selected', btn.getAttribute('data-nps-btn') === v);
    });
  }

  function initCommunicationGlassSelect() {
    var root = document.getElementById('feedback-communication-select-root');
    var native = document.getElementById('fb-communication');
    var trigger = document.getElementById('fb-communication-trigger');
    var list = document.getElementById('fb-communication-listbox');
    if (!root || !native || !trigger || !list) return;

    var labelEl = trigger.querySelector('[data-feedback-select-label]');
    var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));

    function syncLabel() {
      var idx = native.selectedIndex;
      var opt = native.options[idx];
      if (labelEl) labelEl.textContent = opt ? opt.text : 'Select…';
      trigger.classList.toggle('is-placeholder', !native.value);
      options.forEach(function (li) {
        var sel = li.getAttribute('data-value') === native.value;
        li.setAttribute('aria-selected', sel ? 'true' : 'false');
        li.classList.toggle('is-active', sel);
      });
    }

    function close() {
      list.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      root.classList.remove('is-open');
    }

    function open() {
      list.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      root.classList.add('is-open');
    }

    function toggle() {
      if (list.hidden) open();
      else close();
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (list.hidden) open();
      } else if (e.key === 'Escape') {
        close();
      }
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('is-open')) close();
    });

    options.forEach(function (li) {
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
      });
      li.addEventListener('click', function () {
        var v = li.getAttribute('data-value');
        native.value = v === null ? '' : v;
        native.dispatchEvent(new Event('change', { bubbles: true }));
        syncLabel();
        clearFieldError(wrapFor(native));
        close();
      });
    });

    native.addEventListener('change', syncLabel);
    syncLabel();
  }

  form.addEventListener('input', saveDraft);
  form.addEventListener('change', saveDraft);

  form.querySelectorAll('input, select, textarea').forEach(function (el) {
    el.addEventListener('blur', function () {
      var w = wrapFor(el);
      if (w && w.classList.contains('is-invalid')) {
        if (el.type === 'radio' || el.type === 'checkbox') return;
        if (String(el.value || '').trim()) clearFieldError(w);
      }
    });
  });

  var commTrigger = document.getElementById('fb-communication-trigger');
  if (commTrigger) {
    commTrigger.addEventListener('blur', function () {
      var el = document.getElementById('fb-communication');
      var w = wrapFor(el);
      if (w && w.classList.contains('is-invalid') && el && String(el.value || '').trim()) {
        clearFieldError(w);
      }
    });
  }

  npsBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-nps-btn');
      if (npsHidden) npsHidden.value = val;
      clearFieldError(document.getElementById('feedback-nps-wrap'));
      syncNpsButtons();
      saveDraft();
    });
  });

  document.querySelectorAll('[data-feedback-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (currentStep === 1 && !validateStep1()) return;
      if (currentStep === 2 && !validateStep2()) return;
      goStep(currentStep + 1);
    });
  });

  document.querySelectorAll('[data-feedback-back]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goStep(currentStep - 1);
    });
  });

  form.addEventListener('submit', function (e) {
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      e.preventDefault();
      if (!validateStep1()) goStep(1);
      else if (!validateStep2()) goStep(2);
      else goStep(3);
      return;
    }
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err2) {
      /* ignore */
    }
  });

  initCommunicationGlassSelect();
  loadDraft();
  var commAfterDraft = document.getElementById('fb-communication');
  if (commAfterDraft) commAfterDraft.dispatchEvent(new Event('change', { bubbles: true }));
  syncNpsButtons();
  updateStepUI();
})();
