(function () {
  'use strict';

  var CONTACT_BRIEF = 'contact.html?section=contact';
  var CONTACT_BOOK = 'contact.html?section=book-a-call';

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* Header scroll */
  var header = qs('header.header-appear');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 220) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* Side menu */
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

  /* FAQ accordion */
  qsa('.contact-faq__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = trigger.closest('.contact-faq__item');
      if (!item) return;
      var panel = item.querySelector('.contact-faq__panel');
      var open = trigger.getAttribute('aria-expanded') === 'true';
      var next = !open;
      trigger.setAttribute('aria-expanded', next ? 'true' : 'false');
      if (panel) panel.hidden = !next;
      var icon = trigger.querySelector('.contact-faq__icon');
      if (icon) icon.textContent = next ? '\u2212' : '+';
    });
  });

  var dotSectionIds = ['services-hero', 'services-ux-theory', 'services-deliverables', 'services-our-process'];
  var dotButtons = qsa('.services-section-dots [data-services-dot]');
  var dotsRaf = 0;

  function scrollToSvcSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var NAV_OFFSET = 96;
    var top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  function updateServicesDots() {
    if (!dotButtons.length) return;
    var viewportCenter = window.scrollY + window.innerHeight / 2;
    var bestId = dotSectionIds[0];
    var bestDistance = Number.POSITIVE_INFINITY;

    dotSectionIds.forEach(function (sid) {
      var el = document.getElementById(sid);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var sectionTop = rect.top + window.scrollY;
      var sectionCenter = sectionTop + rect.height / 2;
      var d = Math.abs(sectionCenter - viewportCenter);
      if (d < bestDistance) {
        bestDistance = d;
        bestId = sid;
      }
    });

    dotButtons.forEach(function (btn) {
      var sid = btn.getAttribute('data-services-dot');
      var active = sid === bestId;
      btn.classList.toggle('is-active', active);
      if (active) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function scheduleDots() {
    if (dotsRaf) return;
    dotsRaf = requestAnimationFrame(function () {
      dotsRaf = 0;
      updateServicesDots();
    });
  }

  dotButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-services-dot');
      if (id) scrollToSvcSection(id);
    });
  });

  if (dotButtons.length) {
    updateServicesDots();
    window.addEventListener('scroll', scheduleDots, { passive: true });
    window.addEventListener('resize', scheduleDots);
  }

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

  var revealEls = qsa('.reveal-up, .reveal-right');
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
})();
