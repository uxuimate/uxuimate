(function () {
  'use strict';

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* Hero slides (same behaviour as index main.js, scoped to case-study pages) */
  var root = qs('#root.video-case-page');
  if (root) {
    var slides = qsa('.offer-hero.video-case-hero .hero-slide', root);
    var bullets = qsa('.offer-hero.video-case-hero .offer-hero__pagination [data-hero-index]', root);
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
  }

  /* Section dots (matches React VideoCaseSectionDots) */
  var CANDIDATES = [
    { id: 'home', label: 'Hero' },
    { id: 'brief', label: 'Brief' },
    { id: 'process', label: 'Process' },
    { id: 'tools', label: 'Tools' },
    { id: 'how-solved-1', label: 'Section 1' },
    { id: 'how-solved-2', label: 'Section 2' },
    { id: 'how-solved-3', label: 'Section 3' },
    { id: 'how-solved-4', label: 'Section 4' },
    { id: 'nistravel-gallery', label: 'Gallery' },
    { id: 'he-video', label: 'Video' },
    { id: 'he-before-after', label: 'Compare' },
    { id: 'visual-language', label: 'Stories' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'works', label: 'More works' },
    { id: 'contact', label: 'Contact' },
    { id: 'page-footer', label: 'Footer' }
  ];

  function resolveSections() {
    return CANDIDATES.filter(function (s) {
      return document.getElementById(s.id);
    });
  }

  var sections = resolveSections();
  var dotNav = qs('nav.case-study-section-dots');
  if (dotNav && sections.length) {
    var ul = dotNav.querySelector('ul');
    if (ul) {
      ul.innerHTML = '';
      var activeId = sections[0].id;
      sections.forEach(function (sec) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-case-dot', sec.id);
        btn.setAttribute('aria-label', 'Go to ' + sec.label);
        btn.appendChild(document.createElement('span'));
        li.appendChild(btn);
        ul.appendChild(li);
      });

      var buttons = qsa('button[data-case-dot]', dotNav);
      var dotsRaf = 0;

      function scrollToSection(id) {
        var el = document.getElementById(id);
        if (!el) return;
        var NAV_OFFSET = 96;
        var top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      }

      function updateDots() {
        if (dotsRaf) return;
        dotsRaf = requestAnimationFrame(function () {
          dotsRaf = 0;
          var viewportCenter = window.scrollY + window.innerHeight / 2;
          var bestId = sections[0].id;
          var bestDistance = Number.POSITIVE_INFINITY;
          sections.forEach(function (sec) {
            var el = document.getElementById(sec.id);
            if (!el) return;
            var rect = el.getBoundingClientRect();
            var c = rect.top + window.scrollY + rect.height / 2;
            var d = Math.abs(c - viewportCenter);
            if (d < bestDistance) {
              bestDistance = d;
              bestId = sec.id;
            }
          });
          activeId = bestId;
          buttons.forEach(function (b) {
            var id = b.getAttribute('data-case-dot');
            var on = id === activeId;
            b.classList.toggle('active', on);
            if (on) b.setAttribute('aria-current', 'true');
            else b.removeAttribute('aria-current');
          });
        });
      }

      buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          scrollToSection(b.getAttribute('data-case-dot'));
        });
      });

      updateDots();
      window.addEventListener('scroll', updateDots, { passive: true });
      window.addEventListener('resize', updateDots);
    }
  }

  /* Healthy Eats before/after scrubber */
  function bindCompare(rootEl) {
    if (!rootEl) return;
    rootEl.addEventListener('mousemove', onMove);
    rootEl.addEventListener('touchmove', onTouch, { passive: false });
    rootEl.addEventListener('mouseleave', reset);
    rootEl.addEventListener('touchend', reset);

    function pctFromClientX(clientX) {
      var rect = rootEl.getBoundingClientRect();
      var x = clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    }

    function apply(p) {
      var before = rootEl.querySelector('.he-compare__before');
      var handle = rootEl.querySelector('.he-compare__handle');
      if (before) before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
      if (handle) handle.style.left = p + '%';
    }

    function onMove(e) {
      apply(pctFromClientX(e.clientX));
    }

    function onTouch(e) {
      var t = e.touches && e.touches[0];
      if (!t) return;
      e.preventDefault();
      apply(pctFromClientX(t.clientX));
    }

    function reset() {
      apply(50);
    }
  }

  qsa('.he-compare__media').forEach(bindCompare);
})();
