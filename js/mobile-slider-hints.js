(function () {
  'use strict';

  var MQL = window.matchMedia('(max-width: 991px)');

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function getSlides(slider) {
    var kids = Array.prototype.slice.call(slider.children).filter(function (n) {
      return n.nodeType === 1;
    });
    if (!kids.length) return [];
    if (kids[0].classList && kids[0].classList.contains('mobile-card-slide')) return kids;
    if (kids[0].matches && kids[0].matches('[class*="col"]')) return kids;
    if (slider.tagName === 'UL' || slider.tagName === 'OL') return kids;
    return kids;
  }

  function activeSlideIndex(slider, slides) {
    if (!slides.length) return 0;
    var mid = slider.scrollLeft + slider.clientWidth * 0.5;
    var best = 0;
    var bestD = Number.POSITIVE_INFINITY;
    slides.forEach(function (el, i) {
      var c = el.offsetLeft + el.offsetWidth * 0.5;
      var d = Math.abs(c - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }

  function scrollSliderToIndex(slider, slides, index) {
    var el = slides[index];
    if (!el) return;
    var target = el.offsetLeft - (slider.clientWidth - el.offsetWidth) / 2;
    slider.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }

  function setActiveDots(dotsWrap, index) {
    qsa('.uxm-page-dot', dotsWrap).forEach(function (btn, i) {
      btn.classList.toggle('is-active', i === index);
    });
  }

  function buildDots(slider, slides, dotsWrap, hint) {
    var label = (hint.querySelector('.mobile-card-slider__text') || {}).textContent || 'Swipe to explore';
    dotsWrap.classList.add('uxm-page-dots', 'mobile-card-slider__dots');
    dotsWrap.innerHTML = '';
    dotsWrap.setAttribute('role', 'tablist');
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'uxm-page-dot' + (i === 0 ? ' is-active' : '');
      b.setAttribute('data-uxm-dot-index', String(i));
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', function () {
        scrollSliderToIndex(slider, slides, i);
      });
      dotsWrap.appendChild(b);
    });
    var textEl = hint.querySelector('.mobile-card-slider__text');
    if (textEl) {
      textEl.textContent = label.trim() || 'Swipe to explore';
    }
  }

  function bindSlider(slider, hint) {
    if (slider.getAttribute('data-uxm-hint-bound') === '1') return;
    var slides = getSlides(slider);
    if (slides.length < 2) {
      hint.style.display = 'none';
      return;
    }
    var dotsWrap = hint.querySelector('.mobile-card-slider__dots');
    if (!dotsWrap) return;
    buildDots(slider, slides, dotsWrap, hint);
    slider.setAttribute('data-uxm-hint-bound', '1');

    var raf = 0;
    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        raf = 0;
        if (!MQL.matches) return;
        var idx = activeSlideIndex(slider, slides);
        setActiveDots(dotsWrap, idx);
      });
    }

    slider.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    if (MQL.addEventListener) {
      MQL.addEventListener('change', onScroll);
    } else if (MQL.addListener) {
      MQL.addListener(onScroll);
    }
  }

  function ensureHintAfter(slider) {
    var next = slider.nextElementSibling;
    if (next && next.classList && next.classList.contains('mobile-card-slider__hint')) return next;
    var hint = document.createElement('div');
    hint.className = 'mobile-card-slider__hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML =
      '<div class="mobile-card-slider__dots"></div><span class="mobile-card-slider__text">Swipe to explore</span>';
    slider.parentNode.insertBefore(hint, slider.nextSibling);
    return hint;
  }

  function init() {
    if (!MQL.matches) return;
    qsa('.mobile-card-slider:not(.works-showcase__grid--catalog)').forEach(function (slider) {
      if (slider.getAttribute('data-slider-hint') === 'off') return;
      var hint = ensureHintAfter(slider);
      if (!hint) return;
      bindSlider(slider, hint);
    });
  }

  function scheduleInit() {
    if (!MQL.matches) return;
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInit);
  } else {
    scheduleInit();
  }

  if (MQL.addEventListener) {
    MQL.addEventListener('change', function () {
      if (MQL.matches) scheduleInit();
    });
  } else if (MQL.addListener) {
    MQL.addListener(scheduleInit);
  }
})();
