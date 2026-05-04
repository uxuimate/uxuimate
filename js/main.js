(function () {
  'use strict';

  /** Same-folder static build (open index.html locally). For production, point CTAs at https://uxuimate.com/contact?... */
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
  if (closeBtn) closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setMenuOpen(false);
  });
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

  /* Hero slides */
  var slides = qsa('.offer-hero .hero-slide');
  var bullets = qsa('.offer-hero__pagination [data-hero-index]');
  var heroIndex = 0;
  var heroTimer;

  function showHeroSlide(i) {
    if (!slides.length) return;
    heroIndex = (i + slides.length) % slides.length;
    slides.forEach(function (el, idx) {
      el.classList.toggle('active', idx === heroIndex);
    });
    bullets.forEach(function (btn, idx) {
      btn.classList.toggle('active', idx === heroIndex);
    });
  }

  function nextHero() {
    showHeroSlide(heroIndex + 1);
  }

  bullets.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var i = parseInt(btn.getAttribute('data-hero-index'), 10);
      if (!isNaN(i)) {
        showHeroSlide(i);
        clearInterval(heroTimer);
        heroTimer = setInterval(nextHero, 5200);
      }
    });
  });

  if (slides.length) {
    showHeroSlide(0);
    heroTimer = setInterval(nextHero, 5200);
  }

  /* Testimonials */
  var tItems = qsa('#innovative-testimonial-quote .item');
  var tThumbs = qsa('.feedback-section__thumb');
  var tIndex = 0;
  var tTimer;

  function showTestimonial(i) {
    if (!tItems.length) return;
    tIndex = (i + tItems.length) % tItems.length;
    tItems.forEach(function (el, idx) {
      el.classList.toggle('active', idx === tIndex);
    });
    tThumbs.forEach(function (btn, idx) {
      btn.classList.toggle('active', idx === tIndex);
    });
  }

  tThumbs.forEach(function (btn, idx) {
    btn.addEventListener('click', function () {
      showTestimonial(idx);
      clearInterval(tTimer);
      tTimer = setInterval(function () {
        showTestimonial(tIndex + 1);
      }, 2500);
    });
  });

  if (tItems.length) {
    showTestimonial(0);
    tTimer = setInterval(function () {
      showTestimonial(tIndex + 1);
    }, 2500);
  }

  /* Scroll reveal */
  var revealEls = qsa('.reveal-up, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var rawDelay = en.target.getAttribute('data-delay');
            var d = rawDelay === null || rawDelay === '' ? 0 : parseFloat(rawDelay);
            if (isNaN(d)) d = 0;
            var ms = d * 1000;
            setTimeout(function () {
              en.target.classList.add('is-visible');
            }, ms);
            io.unobserve(en.target);
          }
        });
      },
      /* No negative bottom margin: it shrinks the root and content in the last ~10vh of the viewport never intersects, so the footer stayed opacity:0 forever. */
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

  /* Section spy for nav active */
  var navSections = ['home', 'projects', 'services', 'about', 'contact'];
  var navLinks = qsa('.navbar-top-default .nav-link[data-section]');

  function updateNavActive() {
    var y = window.scrollY + 140;
    var current = 'home';
    for (var i = navSections.length - 1; i >= 0; i--) {
      var id = navSections[i];
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) {
        current = id;
        break;
      }
    }
    navLinks.forEach(function (a) {
      var sec = a.getAttribute('data-section');
      if (sec === current) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'true');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  }
  window.addEventListener('scroll', updateNavActive, { passive: true });
  updateNavActive();

  /* Fixed section dots (same logic as React SectionDots.jsx) */
  var sectionDotIds = ['home', 'projects', 'services', 'about', 'feedback', 'process', 'contact'];
  var sectionDotButtons = qsa('.section-dots [data-section-dot]');
  var sectionDotsRaf = 0;

  function scrollToSectionById(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var NAV_OFFSET = 96;
    var top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  function updateSectionDotsActive() {
    if (!sectionDotButtons.length) return;
    var viewportCenter = window.scrollY + window.innerHeight / 2;
    var bestId = sectionDotIds[0];
    var bestDistance = Number.POSITIVE_INFINITY;

    sectionDotIds.forEach(function (sid) {
      var el = document.getElementById(sid);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var sectionTop = rect.top + window.scrollY;
      var sectionCenter = sectionTop + rect.height / 2;
      var distance = Math.abs(sectionCenter - viewportCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestId = sid;
      }
    });

    sectionDotButtons.forEach(function (btn) {
      var sid = btn.getAttribute('data-section-dot');
      var active = sid === bestId;
      btn.classList.toggle('active', active);
      if (active) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function scheduleSectionDotsUpdate() {
    if (sectionDotsRaf) return;
    sectionDotsRaf = requestAnimationFrame(function () {
      sectionDotsRaf = 0;
      updateSectionDotsActive();
    });
  }

  sectionDotButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-section-dot');
      if (id) scrollToSectionById(id);
    });
  });

  if (sectionDotButtons.length) {
    updateSectionDotsActive();
    window.addEventListener('scroll', scheduleSectionDotsUpdate, { passive: true });
    window.addEventListener('resize', scheduleSectionDotsUpdate);
  }

  /* Back to top (same threshold as React BackToTop.jsx) */
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

  /* Works card tilt: fine pointer + real hover only (avoids fighting touch scroll on phones/tablets). */
  var cards = qsa('.works-card--fan');
  var cardTiltMql = window.matchMedia('(hover: hover) and (pointer: fine)');
  var worksCardTiltBound = false;
  function bindWorksCardTilt() {
    if (worksCardTiltBound || !cardTiltMql.matches) return;
    worksCardTiltBound = true;
    cards.forEach(function (card) {
      function onEnter() {
        var rect = card.getBoundingClientRect();
        card._rect = rect;
      }
      function onMove(ev) {
        var rect = card._rect || card.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;
        var rotateX = ((y / rect.height) - 0.5) * -8;
        var rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.setProperty('--tilt-x', rotateX + 'deg');
        card.style.setProperty('--tilt-y', rotateY + 'deg');
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
      }
      function onLeave() {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '0%');
      }
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
    });
  }
  if (cardTiltMql.matches) {
    bindWorksCardTilt();
  } else if (cardTiltMql.addEventListener) {
    cardTiltMql.addEventListener('change', bindWorksCardTilt);
  }

  /* Selected projects: scroll-synced 3D on tablet/mobile + dot pagination */
  var worksFanEl = qs('.works-section .works-fan');
  var worksFanItemEls = qsa('.works-section .works-fan__item');
  var worksFanBullets = qsa('.works-fan-pagination [data-works-fan-index]');
  var worksFanMql = window.matchMedia('(max-width: 991px)');
  var worksFanReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var worksFanRaf = 0;

  function worksFanActiveIndex() {
    if (!worksFanEl) return 0;
    var fanRect = worksFanEl.getBoundingClientRect();
    var centerX = fanRect.left + fanRect.width / 2;
    var bestIdx = 0;
    var bestDist = Number.POSITIVE_INFINITY;
    worksFanItemEls.forEach(function (item, idx) {
      var r = item.getBoundingClientRect();
      var mid = r.left + r.width / 2;
      var d = Math.abs(mid - centerX);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = idx;
      }
    });
    return bestIdx;
  }

  function syncWorksFanBullets(active) {
    worksFanBullets.forEach(function (btn, idx) {
      var on = idx === active;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function applyWorksFanCarousel() {
    if (!worksFanEl || worksFanItemEls.length < 2) return;
    if (!worksFanMql.matches) {
      worksFanEl.classList.remove('works-fan--carousel');
      worksFanEl.removeAttribute('data-active-index');
      worksFanItemEls.forEach(function (item) {
        item.classList.remove('is-works-fan-active');
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
      });
      worksFanBullets.forEach(function (btn) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });
      return;
    }

    worksFanEl.classList.add('works-fan--carousel');
    var active = worksFanActiveIndex();
    worksFanEl.setAttribute('data-active-index', String(active));

    worksFanItemEls.forEach(function (item, idx) {
      item.classList.toggle('is-works-fan-active', idx === active);
    });

    var motionOff = worksFanReduce.matches;
    if (motionOff) {
      worksFanItemEls.forEach(function (item, idx) {
        var rel = idx - active;
        var away = Math.abs(rel);
        var sc = away === 0 ? 1.03 : away === 1 ? 0.97 : 0.94;
        item.style.transform = 'translateZ(0) scale(' + sc + ')';
        item.style.opacity = away === 0 ? '1' : String(Math.max(0.82, 0.92 - away * 0.05));
        item.style.zIndex = away === 0 ? '5' : String(Math.max(1, 3 - away));
      });
      syncWorksFanBullets(active);
      return;
    }

    worksFanItemEls.forEach(function (item, idx) {
      var rel = idx - active;
      var ry = 0;
      var tz = 0;
      var sc = 1;
      var op = 1;
      /* Shallower Z than desktop fan — less clipping inside overflow-x scrollport on small screens. */
      if (rel < 0) {
        ry = 8 * -rel;
        tz = -8 - 7 * (-rel - 1);
        sc = 0.96 - 0.03 * (-rel - 1);
        op = 0.9 - 0.05 * (-rel - 1);
      } else if (rel > 0) {
        ry = -8 * rel;
        tz = -8 - 7 * (rel - 1);
        sc = 0.96 - 0.03 * (rel - 1);
        op = 0.9 - 0.05 * (rel - 1);
      } else {
        ry = 0;
        tz = 18;
        sc = 1.04;
        op = 1;
      }
      var z = rel === 0 ? 5 : Math.max(1, 4 - Math.abs(rel));
      item.style.transform =
        'rotateY(' + ry + 'deg) translateZ(' + tz + 'px) scale(' + sc + ')';
      item.style.opacity = String(Math.max(0.82, Math.min(1, op)));
      item.style.zIndex = String(z);
    });

    syncWorksFanBullets(active);
  }

  function scheduleWorksFanCarousel() {
    if (worksFanRaf) return;
    worksFanRaf = window.requestAnimationFrame(function () {
      worksFanRaf = 0;
      applyWorksFanCarousel();
    });
  }

  function bindWorksFanMql(mql, fn) {
    if (mql.addEventListener) mql.addEventListener('change', fn);
    else if (mql.addListener) mql.addListener(fn);
  }

  if (worksFanEl && worksFanItemEls.length) {
    bindWorksFanMql(worksFanMql, applyWorksFanCarousel);
    bindWorksFanMql(worksFanReduce, applyWorksFanCarousel);
    worksFanEl.addEventListener('scroll', scheduleWorksFanCarousel, { passive: true });
    worksFanEl.addEventListener('scrollend', scheduleWorksFanCarousel, { passive: true });
    window.addEventListener('scroll', scheduleWorksFanCarousel, { passive: true });
    window.addEventListener('resize', scheduleWorksFanCarousel);
    worksFanBullets.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-works-fan-index'), 10);
        if (!isNaN(i) && worksFanItemEls[i]) {
          worksFanItemEls[i].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      });
    });
    if (typeof IntersectionObserver !== 'undefined') {
      var fanIo = new IntersectionObserver(
        function () {
          scheduleWorksFanCarousel();
        },
        { root: worksFanEl, rootMargin: '0px', threshold: [0.08, 0.35, 0.65, 0.92] }
      );
      worksFanItemEls.forEach(function (item) {
        fanIo.observe(item);
      });
    }
    applyWorksFanCarousel();
  }

  /* Contact CTA links in hero */
  qsa('a[data-contact="brief"]').forEach(function (a) {
    a.setAttribute('href', CONTACT_BRIEF);
  });
  qsa('a[data-contact="book"]').forEach(function (a) {
    a.setAttribute('href', CONTACT_BOOK);
  });

  var contactForm = qs('#contact-form-data');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }

  /* Contact form → mailto */
  var contactBtn = qs('.contact_btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function () {
      var name = (qs('#first_name') && qs('#first_name').value) || '';
      var phone = (qs('#phone') && qs('#phone').value) || '';
      var email = (qs('#email') && qs('#email').value) || '';
      var message = (qs('#message') && qs('#message').value) || '';
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
        '\r\n\r\n' +
        message;
      window.location.href =
        'mailto:uxuimate@gmail.com?subject=' +
        encodeURIComponent('Website enquiry') +
        '&body=' +
        encodeURIComponent(body);
    });
  }
})();
