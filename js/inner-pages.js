(function () {
  'use strict';

  var CONTACT_BRIEF = 'contact.html?section=contact';
  var CONTACT_BOOK = 'contact.html?section=book-a-call';
  var CALENDLY_URL =
    'https://calendly.com/uxuimate/30min?hide_event_type_details=1&background_color=d5d9e2&text_color=1a1b20&primary_color=e8195a';
  var CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  var header = qs('header.header-appear');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 220) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  var sideMenu = qs('.side-menu');
  var openBtn = qs('#sidemenu_toggle');
  var closeBtn = qs('#btn_sideNavClose');
  var closeOverlay = qs('#close_side_menu');

  function setMenuOpen(open) {
    if (!sideMenu) return;
    if (open) {
      sideMenu.classList.remove('hidden');
      sideMenu.classList.add('side-menu-active');
      document.body.classList.add('nav-menu-is-open');
      if (closeOverlay) closeOverlay.classList.add('is-active');
    } else {
      sideMenu.classList.remove('side-menu-active');
      sideMenu.classList.add('hidden');
      document.body.classList.remove('nav-menu-is-open');
      if (closeOverlay) closeOverlay.classList.remove('is-active');
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      setMenuOpen(true);
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      setMenuOpen(false);
    });
  }
  if (closeOverlay) {
    closeOverlay.addEventListener('click', function (e) {
      e.preventDefault();
      setMenuOpen(false);
    });
  }

  qsa('.side-nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  var scrollTopBtn = qs('#scroll_top_btn');
  function updateBackToTopVisibility() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > 500);
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
  }

  var revealEls = qsa('.reveal-up, .reveal-right, .reveal-left');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var rawDelay = en.target.getAttribute('data-delay');
            var d = rawDelay === null || rawDelay === '' ? 0 : parseFloat(rawDelay);
            if (isNaN(d)) d = 0;
            setTimeout(function () {
              en.target.classList.add('is-visible');
            }, d * 1000);
            io.unobserve(en.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  qsa('a[data-contact="brief"]').forEach(function (a) {
    a.setAttribute('href', CONTACT_BRIEF);
  });
  qsa('a[data-contact="book"]').forEach(function (a) {
    a.setAttribute('href', CONTACT_BOOK);
  });

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Crossfade + vertical slide (clipped by .works-hero__cycle-slot / .contact-page__rotating-wrap). */
  function rotateWordsAnimated(el, words, intervalMs) {
    if (!el || !words || !words.length) return;
    el.textContent = words[0];
    if (words.length < 2) return;
    if (prefersReducedMotion()) {
      var j = 0;
      window.setInterval(function () {
        j = (j + 1) % words.length;
        el.textContent = words[j];
      }, intervalMs || 2800);
      return;
    }
    var i = 0;
    var outMs = 420;
    var inMs = 560;
    window.setInterval(function () {
      el.classList.remove('is-swap-in');
      el.classList.add('is-swap-out');
      window.setTimeout(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove('is-swap-out');
        void el.offsetWidth;
        el.classList.add('is-swap-in');
        window.setTimeout(function () {
          el.classList.remove('is-swap-in');
        }, inMs);
      }, outMs);
    }, intervalMs || 2800);
  }

  rotateWordsAnimated(qs('[data-typewriter-works]'), ['remembered', 'felt', 'seen', 'held', 'known'], 3000);
  rotateWordsAnimated(qs('[data-typewriter-contact]'), ['project', 'idea', 'brand'], 2800);

  var ABOUT_DOT_IDS = [
    'about-hero',
    'about-intro',
    'about-why-studio',
    'about-principles',
    'about-founder',
    'contact',
    'page-footer'
  ];
  var aboutDotNav = qs('.about-section-dots');
  if (aboutDotNav) {
    var aboutButtons = qsa('.about-section-dots button[data-about-dot]');
    var aboutDotsRaf = 0;

    function resolveAboutSections() {
      return ABOUT_DOT_IDS.filter(function (id) {
        return document.getElementById(id);
      });
    }

    function scrollToAboutSection(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var NAV_OFFSET = 96;
      var top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }

    function updateAboutDots() {
      var sections = resolveAboutSections();
      if (!sections.length || !aboutButtons.length) return;
      var viewportCenter = window.scrollY + window.innerHeight / 2;
      var bestId = sections[0];
      var bestDistance = Number.POSITIVE_INFINITY;
      sections.forEach(function (sid) {
        var element = document.getElementById(sid);
        if (!element) return;
        var rect = element.getBoundingClientRect();
        var sectionTop = rect.top + window.scrollY;
        var sectionCenter = sectionTop + rect.height / 2;
        var distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = sid;
        }
      });
      aboutButtons.forEach(function (btn) {
        var sid = btn.getAttribute('data-about-dot');
        var active = sid === bestId;
        btn.classList.toggle('active', active);
        if (active) btn.setAttribute('aria-current', 'true');
        else btn.removeAttribute('aria-current');
      });
    }

    function scheduleAboutDots() {
      if (aboutDotsRaf) return;
      aboutDotsRaf = requestAnimationFrame(function () {
        aboutDotsRaf = 0;
        updateAboutDots();
      });
    }

    aboutButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-about-dot');
        if (id) scrollToAboutSection(id);
      });
    });

    updateAboutDots();
    window.addEventListener('scroll', scheduleAboutDots, { passive: true });
    window.addEventListener('resize', scheduleAboutDots);
  }

  function formatBudget(n) {
    var BUDGET_MAX = 20000;
    if (n >= BUDGET_MAX) return '£20,000+';
    return '£' + Number(n).toLocaleString('en-GB');
  }

  var budgetInput = qs('#contact-budget-range');
  var budgetOut = qs('#contact-budget-output');
  if (budgetInput && budgetOut) {
    function syncBudget() {
      var v = Number(budgetInput.value);
      budgetOut.textContent = formatBudget(v);
      budgetInput.setAttribute('aria-valuetext', formatBudget(v));
    }
    budgetInput.addEventListener('input', syncBudget);
    syncBudget();
  }

  function scrollToHashOrQuery() {
    var params = new URLSearchParams(window.location.search);
    var sec = params.get('section');
    var targetId = null;
    if (sec === 'book-a-call') targetId = 'book-a-call';
    else if (sec === 'contact') targetId = 'contact';
    if (!targetId && window.location.hash) {
      var h = window.location.hash.replace(/^#/, '');
      if (h === 'book-a-call' || h === 'contact') targetId = h;
    }
    if (!targetId) return;
    var el = document.getElementById(targetId);
    if (!el) return;
    var run = function () {
      var NAV_OFFSET = 96;
      var top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    };
    run();
    window.setTimeout(run, 120);
    window.setTimeout(run, 400);
  }
  scrollToHashOrQuery();

  document.addEventListener(
    'click',
    function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.contact_btn') : null;
      if (!btn || btn.closest('.contact-form--extended')) return;
      e.preventDefault();
      var root = btn.closest('form') || document;
      function val(sel) {
        var el = qs(sel, root);
        return el && el.value ? el.value : '';
      }
      var name = val('#first_name');
      var phone = val('#phone');
      var email = val('#email');
      var message = val('#message');
      if (!email) {
        window.alert('Please enter your email so we can reply.');
        return;
      }
      var body =
        'Name: ' + name + '\r\nPhone: ' + phone + '\r\nEmail: ' + email + '\r\n\r\n' + message;
      window.location.href =
        'mailto:uxuimate@gmail.com?subject=' +
        encodeURIComponent('Website enquiry') +
        '&body=' +
        encodeURIComponent(body);
    },
    false
  );

  var extendedForm = qs('#contact-form-data.contact-form--extended');
  if (extendedForm) {
    extendedForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    var submitBtn = qs('.contact-form--extended .contact_btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var name = (qs('#first_name') && qs('#first_name').value) || '';
        var phone = (qs('#phone') && qs('#phone').value) || '';
        var email = (qs('#email') && qs('#email').value) || '';
        var message = (qs('#message') && qs('#message').value) || '';
        var types = qsa('input[name="projectType[]"]:checked', extendedForm).map(function (c) {
          return c.value;
        });
        var budget = budgetInput ? budgetInput.value : '';
        if (!email) {
          window.alert('Please enter your email so we can reply.');
          return;
        }
        var body =
          'Name: ' +
          name +
          '\r\nPhone: ' +
          phone +
          '\r\nEmail: ' +
          email +
          '\r\nBudget: ' +
          formatBudget(Number(budget) || 0) +
          '\r\nProject types: ' +
          (types.length ? types.join(', ') : '(none selected)') +
          '\r\n\r\n' +
          message;
        window.location.href =
          'mailto:uxuimate@gmail.com?subject=' +
          encodeURIComponent('Website enquiry - extended brief') +
          '&body=' +
          encodeURIComponent(body);
      });
    }
  }

  var calHost = qs('#calendly-inline-host');
  if (calHost) {
    function initCalendly() {
      if (typeof window.Calendly === 'undefined' || !calHost) return;
      calHost.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: calHost
      });
    }
    if (window.Calendly) {
      initCalendly();
    } else {
      var existing = document.querySelector('script[src="' + CALENDLY_SCRIPT + '"]');
      if (existing) {
        if (window.Calendly) initCalendly();
        else existing.addEventListener('load', initCalendly);
      } else {
        var script = document.createElement('script');
        script.src = CALENDLY_SCRIPT;
        script.async = true;
        script.onload = initCalendly;
        document.body.appendChild(script);
      }
    }
  }
})();
