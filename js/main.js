/* -------------------------------------------
   UX UI MATE - https://uxuimate.com
   hello@uxuimate.com
------------------------------------------- */

(function uxuiLoadSiteHelpers() {
    var el = document.querySelector('script[src*="js/main.js"]');
    if (!el || !el.src) return;
    var base = el.src.replace(/main\.js(\?.*)?$/i, '');
    ['consent-analytics.js', 'forms-mail.js'].forEach(function (file) {
        var s = document.createElement('script');
        s.src = base + file + '?v=20260827';
        s.async = false;
        (document.body || document.head).appendChild(s);
    });
})();

$(function () {

    "use strict";

    /** Hero dodecahedron: large data-value-1 + thick borders looked very heavy on mobile */
    function milCapScaleStartForMobileHero(el, value1) {
        if (window.innerWidth > 768 || !el || typeof el.closest !== "function") {
            return value1;
        }
        if (!el.closest(".mil-inner-banner, .mil-banner, .mil-banner-personal")) {
            return value1;
        }
        var v = parseFloat(value1, 10);
        if (isNaN(v)) {
            return value1;
        }
        return Math.min(v, 2.35);
    }

    /** Pills/arrows warp if GSAP scale + CSS `transition: all` both write transform. */
    function milScrollAppearTargets() {
        return Array.prototype.filter.call(document.querySelectorAll(".mil-up"), function (el) {
            return !el.classList.contains("mil-link")
                && !el.classList.contains("mil-button")
                && !el.classList.contains("mil-arrow-place")
                && !el.closest(".mil-fan, .mil-fan__wrap, .works-fan");
        });
    }

    /***************************

    swup

    ***************************/
    /* Only same-site and relative links: Swup's default filter was overridden with
       'a:not([data-no-swup])' which also matched https://… and broke external URLs. */
    var swupOrigin = window.location.origin || '';
    var swupLinkSelector = [
        'a[href^="' + swupOrigin + '"]:not([data-no-swup])',
        'a[href^="/"]:not([href^="//"]):not([data-no-swup])',
        'a:not([href^="http://"]):not([href^="https://"]):not([href^="//"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="javascript:"]):not([href^="data:"]):not([href^="#"]):not([data-no-swup])'
    ].join(', ');
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: swupLinkSelector,
        animationSelector: '[class="mil-main-transition"]'
    };
    const swup = new Swup(options);

    /** Footer links to the current page: scroll to top (Swup otherwise does nothing). */
    function milNormalizePagePath(pathname) {
        if (!pathname || pathname === "/") {
            return "/";
        }
        var p = pathname.replace(/\/$/, "");
        if (/\/index\.html$/i.test(p)) {
            p = p.replace(/\/index\.html$/i, "");
            return p || "/";
        }
        if (/^index\.html$/i.test(p)) {
            return "/";
        }
        return p;
    }
    document.addEventListener(
        "click",
        function (e) {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                return;
            }
            var a = e.target.closest && e.target.closest("footer.mil-dark-bg a[href]");
            if (!a) {
                return;
            }
            var hrefAttr = a.getAttribute("href");
            if (!hrefAttr || hrefAttr.indexOf("mailto:") === 0 || hrefAttr.indexOf("tel:") === 0) {
                return;
            }
            if (hrefAttr.charAt(0) === "#" && hrefAttr.length > 1) {
                return;
            }
            var resolved;
            try {
                resolved = new URL(a.href);
            } catch (err) {
                return;
            }
            if (resolved.origin !== window.location.origin) {
                return;
            }
            if (resolved.search !== window.location.search) {
                return;
            }
            if (milNormalizePagePath(resolved.pathname) !== milNormalizePagePath(window.location.pathname)) {
                return;
            }
            e.preventDefault();
            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        true
    );

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    var milReviewsPaginationMenu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>'];

    function milJsDir() {
        var el = document.querySelector('script[src*="js/main.js"]');
        if (el && el.src) {
            return el.src.replace(/main\.js(\?.*)?$/, "");
        }
        return "js/";
    }

    function milLoadScriptOnce(src) {
        return new Promise(function (resolve) {
            var file = src.split("/").pop().split("?")[0];
            var existing = document.querySelector('script[src*="' + file + '"]');
            if (existing) {
                resolve();
                return;
            }
            var s = document.createElement("script");
            s.src = src;
            s.async = false;
            s.onload = function () { resolve(); };
            s.onerror = function () { resolve(); };
            document.body.appendChild(s);
        });
    }

    function milEnsurePageScripts() {
        var base = milJsDir();
        var jobs = [];
        if (document.querySelector(".mil-animated-gallery__column")) {
            jobs.push(milLoadScriptOnce(base + "animated-gallery.js"));
        }
        if (document.getElementById("flip-gallery-grid")) {
            jobs.push(milLoadScriptOnce(base + "flip-gallery.js"));
        }
        if (document.querySelector(".mil-pagination")) {
            jobs.push(milLoadScriptOnce(base + "blog-pagination.js"));
        }
        return Promise.all(jobs);
    }

    function milKillOrphanScrollTriggers() {
        if (typeof ScrollTrigger === "undefined" || typeof ScrollTrigger.getAll !== "function") {
            return;
        }
        var main = document.getElementById("swupMain");
        ScrollTrigger.getAll().forEach(function (st) {
            var t = st.trigger;
            if (!t || t === window || t === document || t === document.body || t === document.documentElement) {
                return;
            }
            if (t.nodeType !== 1) {
                return;
            }
            if (!document.documentElement.contains(t) || (main && main.contains(t))) {
                st.kill();
            }
        });
    }

    function milInitContactFormNext() {
        var nextInput = document.getElementById("contact-form-next");
        if (!nextInput) {
            return;
        }
        try {
            var path = (window.location.pathname || "").replace(/\\/g, "/");
            if (/contact\.html$/i.test(path)) {
                nextInput.value = window.location.origin + path + "?thanks=1";
            } else {
                nextInput.value = new URL("contact.html?thanks=1", window.location.href).href;
            }
        } catch (err) {
            nextInput.value = "contact.html?thanks=1";
        }
    }

    function milInitBlogCategoryFilter() {
        var categoryFilters = document.querySelectorAll(".category-filter");
        if (!categoryFilters.length) {
            return;
        }
        function filterByCategory(category) {
            var filters = document.querySelectorAll(".category-filter");
            filters.forEach(function (f) {
                f.classList.remove("mil-active");
            });
            var activeFilter = Array.prototype.find.call(filters, function (f) {
                return f.getAttribute("data-category") === category;
            });
            if (activeFilter) {
                activeFilter.classList.add("mil-active");
            }
            if (category === "all") {
                if (window.location.search) {
                    history.replaceState(null, "", "blog.html");
                }
                if (typeof window.paginateArticles === "function") {
                    setTimeout(window.paginateArticles, 50);
                }
            } else {
                var blogContainer = document.querySelector("#blog .container.mil-p-120-120");
                if (!blogContainer) {
                    return;
                }
                blogContainer.querySelectorAll("a.mil-blog-card[data-category]").forEach(function (card) {
                    var parentCol = card.closest(".col-lg-12");
                    if (!parentCol || parentCol.querySelector(".mil-pagination")) {
                        return;
                    }
                    var match = card.getAttribute("data-category") === category;
                    if (match) {
                        parentCol.classList.remove("pagination-hidden");
                        parentCol.style.display = "";
                    } else {
                        parentCol.style.display = "none";
                    }
                });
                var paginationContainer = document.querySelector(".mil-pagination");
                if (paginationContainer) {
                    paginationContainer.style.display = "none";
                }
            }
            if (typeof ScrollTrigger !== "undefined") {
                setTimeout(function () {
                    ScrollTrigger.refresh();
                }, 150);
            }
        }
        categoryFilters.forEach(function (filter) {
            if (filter.getAttribute("data-mil-cat-bound") === "1") {
                return;
            }
            filter.setAttribute("data-mil-cat-bound", "1");
            filter.addEventListener("click", function (e) {
                e.preventDefault();
                var category = this.getAttribute("data-category");
                if (category) {
                    filterByCategory(category);
                }
            });
        });
    }

    function milInitBeforeAfterSliders() {
        document.querySelectorAll(".mil-before-after-slider").forEach(function (slider) {
            if (slider.dataset.initialized) {
                return;
            }
            var container = slider.querySelector(".mil-before-after-container");
            var beforeDiv = slider.querySelector(".mil-before-after-before");
            var handle = slider.querySelector(".mil-before-after-handle");
            if (!container || !beforeDiv || !handle) {
                return;
            }
            slider.dataset.initialized = "1";
            var isDragging = false;
            var touchOpts = { passive: false };
            beforeDiv.style.clipPath = "inset(0 50% 0 0)";
            handle.style.left = "50%";
            function updateSlider(clientX) {
                var rect = container.getBoundingClientRect();
                if (!rect.width) {
                    return;
                }
                var x = clientX - rect.left;
                var percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                beforeDiv.style.clipPath = "inset(0 " + (100 - percent) + "% 0 0)";
                handle.style.left = percent + "%";
            }
            function handleMove(e) {
                if (!isDragging) {
                    return;
                }
                e.preventDefault();
                var cx = e.clientX;
                if (e.touches && e.touches[0]) {
                    cx = e.touches[0].clientX;
                }
                if (cx != null) {
                    updateSlider(cx);
                }
            }
            function handleEnd() {
                isDragging = false;
                document.removeEventListener("mousemove", handleMove);
                document.removeEventListener("touchmove", handleMove, touchOpts);
                document.removeEventListener("mouseup", handleEnd);
                document.removeEventListener("touchend", handleEnd);
            }
            function handleStart(e) {
                isDragging = true;
                var cx = e.clientX;
                if (e.touches && e.touches[0]) {
                    cx = e.touches[0].clientX;
                }
                if (cx != null) {
                    updateSlider(cx);
                }
                e.preventDefault();
                document.addEventListener("mousemove", handleMove);
                document.addEventListener("touchmove", handleMove, touchOpts);
                document.addEventListener("mouseup", handleEnd);
                document.addEventListener("touchend", handleEnd);
            }
            slider.addEventListener("mousedown", handleStart);
            slider.addEventListener("touchstart", handleStart);
            slider.addEventListener("mousemove", function (e) {
                if (!isDragging) {
                    updateSlider(e.clientX);
                }
            });
            slider.addEventListener("mouseleave", function () {
                if (!isDragging) {
                    beforeDiv.style.clipPath = "inset(0 50% 0 0)";
                    handle.style.left = "50%";
                }
            });
        });
    }

    function milRefreshScrollTriggersSoon() {
        if (typeof ScrollTrigger === "undefined" || typeof ScrollTrigger.refresh !== "function") {
            return;
        }
        requestAnimationFrame(function () {
            ScrollTrigger.refresh();
        });
        setTimeout(function () {
            ScrollTrigger.refresh();
        }, 350);
        setTimeout(function () {
            ScrollTrigger.refresh();
        }, 1000);
    }

    function milInitPageMotionExtras() {
        milEnsurePageScripts().then(function () {
            if (typeof window.milInitAnimatedGallery === "function") {
                window.milInitAnimatedGallery();
            }
            if (typeof window.milInitFlipGallery === "function") {
                window.milInitFlipGallery();
            }
            if (typeof window.paginateArticles === "function") {
                window.paginateArticles();
            }
            milInitBlogCategoryFilter();
            milRefreshScrollTriggersSoon();
        });
        milInitContactFormNext();
        milInitBlogCategoryFilter();
        milInitBeforeAfterSliders();
    }

    function milBindFancyboxGallery() {
        if (typeof $ === "undefined" || typeof $.fancybox !== "function") {
            return;
        }
        $.fancybox.defaults.hash = false;

        var $classic = $('[data-fancybox="gallery"]');
        if ($classic.length) {
            $classic.fancybox({
                buttons: [
                    "slideShow",
                    "zoom",
                    "fullScreen",
                    "close"
                ],
                loop: false,
                protect: true
            });
        }

    }

    function milInitSwiperInstances() {
        if (typeof Swiper === "undefined") {
            return;
        }
        if (document.querySelector(".mil-reviews-slider")) {
            new Swiper(".mil-reviews-slider", {
                pagination: {
                    el: ".mil-revi-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (milReviewsPaginationMenu[index]) + "</span>";
                    },
                },
                speed: 800,
                effect: "fade",
                parallax: true,
                autoHeight: true,
                on: {
                    init: function () {
                        this.updateAutoHeight(0);
                    },
                    slideChangeTransitionStart: function () {
                        this.updateAutoHeight(300);
                    },
                    resize: function () {
                        this.updateAutoHeight(0);
                    }
                },
                navigation: {
                    nextEl: ".mil-revi-next",
                    prevEl: ".mil-revi-prev",
                },
            });
        }
        if (document.querySelector(".mil-infinite-show")) {
            new Swiper(".mil-infinite-show", {
                slidesPerView: 2,
                spaceBetween: 30,
                speed: 5000,
                autoplay: true,
                autoplay: {
                    delay: 0,
                },
                loop: true,
                freeMode: true,
                breakpoints: {
                    992: {
                        slidesPerView: 4,
                    },
                },
            });
        }
        if (document.querySelector(".mil-portfolio-slider")) {
            new Swiper(".mil-portfolio-slider", {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                parallax: true,
                mousewheel: {
                    enable: true
                },
                navigation: {
                    nextEl: ".mil-portfolio-next",
                    prevEl: ".mil-portfolio-prev",
                },
                pagination: {
                    el: ".swiper-portfolio-pagination",
                    type: "fraction",
                },
            });
        }
        if (document.querySelector(".mil-1-slider")) {
            new Swiper(".mil-1-slider", {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 800,
                parallax: true,
                navigation: {
                    nextEl: ".mil-portfolio-next",
                    prevEl: ".mil-portfolio-prev",
                },
                pagination: {
                    el: ".swiper-portfolio-pagination",
                    type: "fraction",
                },
            });
        }
        if (document.querySelector(".mil-2-slider")) {
            new Swiper(".mil-2-slider", {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 800,
                parallax: true,
                navigation: {
                    nextEl: ".mil-portfolio-next",
                    prevEl: ".mil-portfolio-prev",
                },
                pagination: {
                    el: ".swiper-portfolio-pagination",
                    type: "fraction",
                },
                breakpoints: {
                    992: {
                        slidesPerView: 2,
                    },
                },
            });
        }
        if (document.querySelector(".nt-hero__slider")) {
            new Swiper(".nt-hero__slider", {
                slidesPerView: 1,
                loop: true,
                speed: 800,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".nt-hero__pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                },
            });
        }
    }

    function milIsBootstrapColumn(el) {
        if (!el || el.nodeType !== 1 || !el.classList) {
            return false;
        }
        for (var i = 0; i < el.classList.length; i++) {
            var c = el.classList[i];
            if (c === "col" || c.indexOf("col-") === 0) {
                return true;
            }
        }
        return false;
    }

    function milInitCardRailHints() {
        /** Mobile horizontal card rails: dots + “Slide for more” (no arrow buttons — matches videonabliudenie-style hints). */
        var selectors = [
            ".mil-services-grid",
            ".mil-other-services-row",
            ".mil-what-we-solve-row"
        ];
        var isMobile = window.matchMedia("(max-width: 992px)").matches;
        var minCards = 2;

        function syncActiveDot(strip, slides, dotEls) {
            if (!dotEls.length || !slides.length) {
                return;
            }
            var stripRect = strip.getBoundingClientRect();
            var bestIdx = 0;
            var bestVis = -1;
            slides.forEach(function (slide, i) {
                var r = slide.getBoundingClientRect();
                var vis = Math.max(0, Math.min(r.right, stripRect.right) - Math.max(r.left, stripRect.left));
                if (vis > bestVis) {
                    bestVis = vis;
                    bestIdx = i;
                }
            });
            dotEls.forEach(function (d, i) {
                d.classList.toggle("is-active", i === bestIdx);
            });
        }

        selectors.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (row) {
                var directCols = Array.prototype.filter.call(row.children, milIsBootstrapColumn);
                var cardsCount = directCols.length;
                var existingHint = row.nextElementSibling && row.nextElementSibling.classList.contains("mil-card-rail-hint")
                    ? row.nextElementSibling
                    : null;

                if (!isMobile || cardsCount < minCards) {
                    if (row._milRailScrollHandler) {
                        row.removeEventListener("scroll", row._milRailScrollHandler);
                        row._milRailScrollHandler = null;
                    }
                    if (row._milRailResizeObserver) {
                        row._milRailResizeObserver.disconnect();
                        row._milRailResizeObserver = null;
                    }
                    delete row.dataset.milRailImgBound;
                    if (existingHint) {
                        existingHint.remove();
                    }
                    return;
                }

                if (existingHint && !existingHint.querySelector(".mil-card-rail-hint__dots")) {
                    existingHint.remove();
                    existingHint = null;
                    if (row._milRailScrollHandler) {
                        row.removeEventListener("scroll", row._milRailScrollHandler);
                        row._milRailScrollHandler = null;
                    }
                    if (row._milRailResizeObserver) {
                        row._milRailResizeObserver.disconnect();
                        row._milRailResizeObserver = null;
                    }
                    delete row.dataset.milRailImgBound;
                }

                if (!existingHint) {
                    existingHint = document.createElement("div");
                    existingHint.className = "mil-card-rail-hint";
                    existingHint.setAttribute("aria-hidden", "true");
                    var inner = document.createElement("div");
                    inner.className = "mil-card-rail-hint__inner";
                    var dotsWrap = document.createElement("div");
                    dotsWrap.className = "mil-card-rail-hint__dots";
                    var afford = document.createElement("div");
                    afford.className = "mil-card-rail-hint__affordance";
                    var label = document.createElement("span");
                    label.className = "mil-card-rail-hint__label";
                    label.textContent = "Slide for more";
                    afford.appendChild(label);
                    inner.appendChild(dotsWrap);
                    inner.appendChild(afford);
                    existingHint.appendChild(inner);
                    for (var d = 0; d < cardsCount; d++) {
                        var dot = document.createElement("span");
                        dot.className = "mil-card-rail-hint__dot";
                        dotsWrap.appendChild(dot);
                    }
                    row.insertAdjacentElement("afterend", existingHint);
                }

                var dotEls = Array.prototype.slice.call(existingHint.querySelectorAll(".mil-card-rail-hint__dot"));

                function refreshRailHint() {
                    var w = row.scrollWidth;
                    var cw = row.clientWidth;
                    var hasOverflow = w > cw + 0.5;
                    /* 3+ cards use the horizontal rail layout; show hint even if overflow metrics lag (fonts, images). */
                    var show = hasOverflow || cardsCount >= 3;
                    existingHint.classList.toggle("mil-card-rail-hint--visible", show);
                    if (show) {
                        syncActiveDot(row, directCols, dotEls);
                    }
                }

                if (row._milRailScrollHandler) {
                    row.removeEventListener("scroll", row._milRailScrollHandler);
                }
                row._milRailScrollHandler = refreshRailHint;
                row.addEventListener("scroll", row._milRailScrollHandler, { passive: true });

                if (row._milRailResizeObserver) {
                    row._milRailResizeObserver.disconnect();
                }
                if (typeof ResizeObserver !== "undefined") {
                    row._milRailResizeObserver = new ResizeObserver(refreshRailHint);
                    row._milRailResizeObserver.observe(row);
                }

                if (!row.dataset.milRailImgBound) {
                    row.dataset.milRailImgBound = "1";
                    row.querySelectorAll("img").forEach(function (img) {
                        if (!img.complete) {
                            img.addEventListener("load", refreshRailHint, { passive: true });
                        }
                    });
                }

                refreshRailHint();
                requestAnimationFrame(refreshRailHint);
            });
        });
    }

    var MIL_CALENDLY_URL = 'https://calendly.com/hello-uxuimate/30min?hide_event_type_details=1&background_color=ffffff&text_color=000000&primary_color=e5526a';
    var MIL_CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

    function milGetContactSectionId() {
        var params = new URLSearchParams(window.location.search);
        var sec = params.get('section');
        if (sec === 'book-a-call' || sec === 'contact') {
            return sec;
        }
        var hash = (window.location.hash || '').replace(/^#/, '');
        if (hash === 'book-a-call' || hash === 'contact') {
            return hash;
        }
        return null;
    }

    function milScrollToContactSection() {
        var targetId = milGetContactSectionId();
        if (!targetId) {
            return false;
        }
        var el = document.getElementById(targetId);
        if (!el) {
            return false;
        }
        var offset = $(window).width() < 1200 ? 90 : 0;
        var top = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - offset);
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
        return true;
    }

    $(document).on('click', 'a[href="#contact"], a[href="#book-a-call"], a[href="#contact-next"]', function (e) {
        var id = (this.getAttribute('href') || '').replace('#', '');
        if (!document.getElementById(id)) {
            return;
        }
        e.preventDefault();
        if (history.replaceState) {
            history.replaceState(null, '', '#' + id);
        }
        var el = document.getElementById(id);
        var offset = $(window).width() < 1200 ? 90 : 0;
        var top = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - offset);
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });

    function milInitContactPageExtras() {
        function formatBudget(n) {
            if (n >= 50000) {
                return "£50,000+";
            }
            return "£" + Number(n).toLocaleString("en-GB");
        }
        var budgetInput = document.getElementById("contact-budget-range");
        var budgetOut = document.getElementById("contact-budget-output");
        if (budgetInput && budgetOut && budgetInput.getAttribute("data-budget-bound") !== "1") {
            budgetInput.setAttribute("data-budget-bound", "1");
            function syncBudget() {
                var v = Number(budgetInput.value);
                budgetOut.textContent = formatBudget(v);
                budgetInput.setAttribute("aria-valuetext", formatBudget(v));
            }
            budgetInput.addEventListener("input", syncBudget);
            syncBudget();
        }
    }

    function milInitCalendlyEmbed() {
        var calHost = document.getElementById('calendly-inline-host');
        if (!calHost) {
            return;
        }
        if (calHost.getAttribute('data-calendly-ready') === '1' && calHost.querySelector('iframe')) {
            return;
        }
        function initCalendly() {
            if (typeof window.Calendly === 'undefined') {
                return;
            }
            var host = document.getElementById('calendly-inline-host');
            if (!host) {
                return;
            }
            host.innerHTML = '';
            window.Calendly.initInlineWidget({
                url: MIL_CALENDLY_URL,
                parentElement: host
            });
            host.setAttribute('data-calendly-ready', '1');
        }
        if (window.Calendly) {
            initCalendly();
            return;
        }
        var existing = document.querySelector('script[src="' + MIL_CALENDLY_SCRIPT + '"]');
        if (existing) {
            existing.addEventListener('load', initCalendly);
            return;
        }
        var script = document.createElement('script');
        script.src = MIL_CALENDLY_SCRIPT;
        script.async = true;
        script.onload = initCalendly;
        document.body.appendChild(script);
    }

    function milInitWorksFan() {
        window.__milFanSchedulers = [];
        var roots = [];
        document.querySelectorAll(".works-section").forEach(function (el) {
            roots.push(el);
        });
        document.querySelectorAll("[data-mil-fan]").forEach(function (el) {
            roots.push(el);
        });
        roots.forEach(function (section) {
            section.removeAttribute("data-works-fan");
            section.removeAttribute("data-works-tilt");
            section.removeAttribute("data-mil-fan-ready");
            var fan = section.querySelector(".mil-fan, .works-fan");
            if (fan) {
                fan.classList.remove("mil-fan--carousel", "works-fan--carousel");
                fan.removeAttribute("data-active-index");
            }
            section.querySelectorAll(".mil-fan__item, .works-fan__item").forEach(function (item) {
                item.classList.remove("is-mil-fan-active", "is-works-fan-active");
                item.style.transform = "";
                item.style.opacity = "";
                item.style.zIndex = "";
            });
            milInitUxmFanRoot(section);
        });
    }

    function milInitUxmFanRoot(section) {
        if (!section) {
            return;
        }

        var isMilFan = !!section.querySelector(".mil-fan");
        var fanSel = isMilFan ? ".mil-fan" : ".works-fan";
        var itemSel = isMilFan ? ".mil-fan__item" : ".works-fan__item";
        var cardSel = isMilFan ? ".mil-fan-card" : ".works-card--fan";
        var bulletSel = isMilFan
            ? ".mil-fan__pagination [data-mil-fan-index]"
            : ".works-fan-pagination [data-works-fan-index]";
        var indexAttr = isMilFan ? "data-mil-fan-index" : "data-works-fan-index";
        var carouselClass = isMilFan ? "mil-fan--carousel" : "works-fan--carousel";
        var activeClass = isMilFan ? "is-mil-fan-active" : "is-works-fan-active";
        var readyAttr = isMilFan ? "data-mil-fan-ready" : "data-works-fan";

        var cards = Array.prototype.slice.call(section.querySelectorAll(cardSel));
        var cardTiltMql = window.matchMedia("(hover: hover) and (pointer: fine)");
        if (cardTiltMql.matches && section.getAttribute("data-works-tilt") !== "1") {
            section.setAttribute("data-works-tilt", "1");
            cards.forEach(function (card) {
                function onEnter() {
                    card._rect = card.getBoundingClientRect();
                }
                function onMove(ev) {
                    var rect = card._rect || card.getBoundingClientRect();
                    var x = ev.clientX - rect.left;
                    var y = ev.clientY - rect.top;
                    var rotateX = ((y / rect.height) - 0.5) * -8;
                    var rotateY = ((x / rect.width) - 0.5) * 10;
                    card.style.setProperty("--tilt-x", rotateX + "deg");
                    card.style.setProperty("--tilt-y", rotateY + "deg");
                    card.style.setProperty("--glow-x", x + "px");
                    card.style.setProperty("--glow-y", y + "px");
                }
                function onLeave() {
                    card.style.setProperty("--tilt-x", "0deg");
                    card.style.setProperty("--tilt-y", "0deg");
                    card.style.setProperty("--glow-x", "50%");
                    card.style.setProperty("--glow-y", "0%");
                }
                card.addEventListener("pointerenter", onEnter);
                card.addEventListener("pointermove", onMove);
                card.addEventListener("pointerleave", onLeave);
            });
        }

        var worksFanEl = section.querySelector(fanSel);
        var worksFanItemEls = Array.prototype.slice.call(section.querySelectorAll(itemSel));
        var worksFanBullets = Array.prototype.slice.call(section.querySelectorAll(bulletSel));
        if (!worksFanEl || worksFanItemEls.length < 2 || section.getAttribute(readyAttr) === "1") {
            return;
        }
        section.setAttribute(readyAttr, "1");

        var worksFanMql = window.matchMedia("(max-width: 991px)");
        var worksFanReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        var worksFanRaf = 0;

        function worksFanIsHidden() {
            return section.offsetParent === null || section.getClientRects().length === 0;
        }

        function worksFanActiveIndex() {
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
                btn.classList.toggle("is-active", on);
                btn.setAttribute("aria-selected", on ? "true" : "false");
            });
        }

        function applyWorksFanCarousel() {
            if (worksFanIsHidden()) {
                return;
            }
            if (!worksFanMql.matches) {
                worksFanEl.classList.remove(carouselClass);
                worksFanEl.removeAttribute("data-active-index");
                worksFanItemEls.forEach(function (item) {
                    item.classList.remove(activeClass);
                    item.style.transform = "";
                    item.style.opacity = "";
                    item.style.zIndex = "";
                });
                worksFanBullets.forEach(function (btn) {
                    btn.classList.remove("is-active");
                    btn.setAttribute("aria-selected", "false");
                });
                return;
            }

            worksFanEl.classList.add(carouselClass);
            var active = worksFanActiveIndex();
            worksFanEl.setAttribute("data-active-index", String(active));

            worksFanItemEls.forEach(function (item, idx) {
                item.classList.toggle(activeClass, idx === active);
            });

            if (worksFanReduce.matches) {
                worksFanItemEls.forEach(function (item, idx) {
                    var rel = idx - active;
                    var away = Math.abs(rel);
                    var sc = away === 0 ? 1.03 : away === 1 ? 0.97 : 0.94;
                    item.style.transform = "translateZ(0) scale(" + sc + ")";
                    item.style.opacity = away === 0 ? "1" : String(Math.max(0.82, 0.92 - away * 0.05));
                    item.style.zIndex = away === 0 ? "5" : String(Math.max(1, 3 - away));
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
                item.style.transform = "rotateY(" + ry + "deg) translateZ(" + tz + "px) scale(" + sc + ")";
                item.style.opacity = String(Math.max(0.82, Math.min(1, op)));
                item.style.zIndex = String(z);
            });

            syncWorksFanBullets(active);
        }

        function scheduleWorksFanCarousel() {
            if (worksFanRaf) {
                return;
            }
            worksFanRaf = window.requestAnimationFrame(function () {
                worksFanRaf = 0;
                applyWorksFanCarousel();
            });
        }

        section.__milFanSchedule = scheduleWorksFanCarousel;
        section.__milFanApply = applyWorksFanCarousel;

        function bindWorksFanMql(mql, fn) {
            if (mql.addEventListener) {
                mql.addEventListener("change", fn);
            } else if (mql.addListener) {
                mql.addListener(fn);
            }
        }

        bindWorksFanMql(worksFanMql, applyWorksFanCarousel);
        bindWorksFanMql(worksFanReduce, applyWorksFanCarousel);
        worksFanEl.addEventListener("scroll", scheduleWorksFanCarousel, { passive: true });
        worksFanEl.addEventListener("scrollend", scheduleWorksFanCarousel, { passive: true });
        if (!window.__milFanSchedulers) {
            window.__milFanSchedulers = [];
        }
        window.__milFanSchedulers.push(scheduleWorksFanCarousel);
        if (!window.__milWorksFanWindowBound) {
            window.__milWorksFanWindowBound = true;
            function runAllFanSchedules() {
                (window.__milFanSchedulers || []).forEach(function (fn) {
                    if (typeof fn === "function") {
                        fn();
                    }
                });
            }
            window.addEventListener("scroll", runAllFanSchedules, { passive: true });
            window.addEventListener("resize", runAllFanSchedules);
        }
        worksFanBullets.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var i = parseInt(btn.getAttribute(indexAttr), 10);
                if (!isNaN(i) && worksFanItemEls[i]) {
                    worksFanItemEls[i].scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
                }
            });
        });
        if (typeof IntersectionObserver !== "undefined") {
            var fanIo = new IntersectionObserver(
                function () {
                    scheduleWorksFanCarousel();
                },
                { root: worksFanEl, rootMargin: "0px", threshold: [0.08, 0.35, 0.65, 0.92] }
            );
            worksFanItemEls.forEach(function (item) {
                fanIo.observe(item);
            });
        }
        applyWorksFanCarousel();
        /* Center the featured middle card on mobile (desktop fan already elevates --1) */
        if (worksFanMql.matches && worksFanItemEls.length >= 3 && worksFanItemEls[1]) {
            worksFanItemEls[1].scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "center"
            });
            applyWorksFanCarousel();
        }
    }

    /***************************

    color variables

    ***************************/

    var accentLight = '#E5526A';
    var accentDark = '#ff9800';
    var accent = accentLight;
    var dark = '#000';
    var light = '#fff';
    var accordionSymbolBase = 'rgb(229, 229, 229)';

    function getAccentColor() {
        return $('body').hasClass('mil-theme-dark') ? accentDark : accentLight;
    }

    function getAccordionSymbolBaseColor() {
        return $('body').hasClass('mil-theme-dark') ? '#1d1d25' : accordionSymbolBase;
    }

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".mil-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".mil-animation-1 .mil-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".mil-animation-1 .mil-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".mil-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".mil-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".mil-reveal-box", {
        right: "0"
    });
    timeline.to(".mil-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".mil-animation-2 .mil-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".mil-animation-2 .mil-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".mil-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".mil-up:not(.mil-link):not(.mil-button):not(.mil-arrow-place)", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.mil-preloader').addClass("mil-hidden");
            if ($('.mil-wrapper').hasClass('mil-homepage')) {
                $('.mil-frame').addClass('mil-nav-visible');
            }
            milScrollToContactSection();
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var targetSelector = $.attr(this, 'href');
        var targetEl = targetSelector ? document.querySelector(targetSelector) : null;
        if (!targetEl) {
            return;
        }
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        var top = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - offset);
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        // Only the hidden template must be cloned — never all `.mil-arrow` (card-rail hints inject
        // the same class on slider SVGs; cloning the full set stacks many arrows in each place).
        $(".mil-hidden-elements svg.mil-arrow").first().clone().appendTo(".mil-arrow-place");
        $(".mil-dodecahedron").clone().appendTo(".mil-animation");
        $(".mil-lines-place .mil-lines").remove();
        $(".mil-lines").clone().appendTo(".mil-lines-place");
        /* Current-page spine label removed — top nav already shows location. */

        // Accessibility safety-net for icon-only controls across legacy pages.
        document.querySelectorAll('a.social-icon:not([aria-label])').forEach(function (link) {
            var href = (link.getAttribute('href') || '').toLowerCase();
            if (href.indexOf('linkedin.com') !== -1) link.setAttribute('aria-label', 'LinkedIn');
            else if (href.indexOf('behance.net') !== -1) link.setAttribute('aria-label', 'Behance');
            else if (href.indexOf('facebook.com') !== -1) link.setAttribute('aria-label', 'Facebook');
            else link.setAttribute('aria-label', 'Social profile');
        });
        document.querySelectorAll('form.mil-subscribe-form button[type="submit"]:not([aria-label])').forEach(function (btn) {
            btn.setAttribute('aria-label', 'Submit email for free consultation');
            btn.setAttribute('title', 'Submit email for free consultation');
        });
        document.querySelectorAll('a.mil-arrow-down:not([aria-label])').forEach(function (link) {
            link.setAttribute('aria-label', 'Scroll to next section');
            link.setAttribute('title', 'Scroll to next section');
        });
        milInitCalendlyEmbed();
        milInitContactPageExtras();
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let box = element.querySelector(".mil-accordion-content");
        let symbol = element.querySelector(".mil-symbol");
        let minusElement = element.querySelector(".mil-minus");
        let plusElement = element.querySelector(".mil-plus");

        gsap.set(symbol, {
            background: getAccordionSymbolBaseColor(),
        });

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: getAccentColor(),
                ease: "none",
            }, 0)
            .reverse();

        animation.eventCallback("onReverseComplete", function () {
            gsap.set(symbol, {
                background: getAccordionSymbolBaseColor(),
            });
        });

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                if (animation.reversed()) {
                    gsap.set(symbol, {
                        background: getAccentColor(),
                    });
                }
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    function milDetachBackToTop() {
        var wrap = document.querySelector(".mil-back-to-top");
        if (!wrap) {
            return null;
        }
        if (!wrap.classList.contains("mil-back-to-top-detached")) {
            wrap.classList.add("mil-back-to-top-detached");
            document.body.appendChild(wrap);
        }
        return wrap.querySelector(".mil-link");
    }

    function milInitBackToTopAnimation() {
        var btt = milDetachBackToTop();
        if (!btt) {
            return;
        }
        gsap.set(btt, {
            x: -20,
            opacity: 0,
        });
        gsap.to(btt, {
            x: 0,
            opacity: 1,
            ease: 'sine',
            scrollTrigger: {
                trigger: "body",
                start: "top -40%",
                end: "top -40%",
                toggleActions: "play none reverse none"
            }
        });
    }
    milInitBackToTopAnimation();
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.mil-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.mil-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('mil-accent');
    });

    $('.mil-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('mil-accent');
    });

    $('.mil-drag').mouseover(function () {
        gsap.to($('.mil-ball .mil-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-drag').mouseleave(function () {
        gsap.to($('.mil-ball .mil-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.mil-more').mouseover(function () {
        gsap.to($('.mil-ball .mil-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-more').mouseleave(function () {
        gsap.to($('.mil-ball .mil-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.mil-choose').mouseover(function () {
        gsap.to($('.mil-ball .mil-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-choose').mouseleave(function () {
        gsap.to($('.mil-ball .mil-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.mil-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.mil-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu (side panel — no dim overlay)

    ***************************/
    function closeMobileMenu() {
        $(".mil-menu-btn").removeClass("mil-active");
        $(".mil-menu").removeClass("mil-active");
        $(".mil-menu-frame").removeClass("mil-active");
        $("body").removeClass("nav-menu-is-open");
    }
    function openMobileMenu() {
        $(".mil-menu-btn").addClass("mil-active");
        $(".mil-menu").addClass("mil-active");
        $(".mil-menu-frame").addClass("mil-active");
        $("body").addClass("nav-menu-is-open");
    }
    $(".mil-menu-btn").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(".mil-menu-frame").hasClass("mil-active")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    $(document).on("click", function (e) {
        if (!$(".mil-menu-frame").hasClass("mil-active")) return;
        if ($(e.target).closest(".mil-menu-frame, .mil-menu-btn").length) return;
        closeMobileMenu();
    });
    $(document).on("keydown", function (e) {
        if (e.key === "Escape") closeMobileMenu();
    });
    $(document).on("click", ".mil-menu-frame .mil-main-menu > ul > li:not(.mil-has-children) > a, .mil-menu-frame .mil-has-children ul a", function () {
        closeMobileMenu();
    });
    /***************************

    theme toggle (dark / light)
    ***************************/
    function applyTheme(isDark) {
        if (isDark) {
            $('body').addClass('mil-theme-dark');
            $('.mil-nav-theme-toggle i').removeClass('fa-sun').addClass('fa-moon');
        } else {
            $('body').removeClass('mil-theme-dark');
            $('.mil-nav-theme-toggle i').removeClass('fa-moon').addClass('fa-sun');
        }
        accent = getAccentColor();
        try { localStorage.setItem('mil-theme', isDark ? 'dark' : 'light'); } catch (e) {}
    }
    function initTheme() {
        try {
            var saved = localStorage.getItem('mil-theme');
            applyTheme(saved === 'dark');
        } catch (e) {
            applyTheme(false);
        }
    }
    initTheme();
    $(document).on('click', '.mil-nav-theme-toggle', function () {
        var isDark = $('body').hasClass('mil-theme-dark');
        applyTheme(!isDark);
    });
    /***************************

    top nav: mark current page
    ***************************/
    function milNavFileName() {
        var path = (window.location.pathname || "").replace(/\\/g, "/");
        var parts = path.split("/").filter(Boolean);
        var file = (parts.pop() || "index.html").toLowerCase();
        if (!file || file.indexOf(".") === -1) {
            return "index.html";
        }
        return file;
    }

    function milNavSectionForFile(file) {
        var path = (window.location.pathname || "").replace(/\\/g, "/").toLowerCase();
        var services = {
            "services.html": 1,
            "ux-ui-design.html": 1,
            "ux-research-strategy.html": 1,
            "website-design-and-development.html": 1,
            "branding-and-visual-identity.html": 1
        };
        var projects = {
            "works.html": 1,
            "nistravel-travel-website-redesign.html": 1,
            "videonabliudenie-b2b-security-ux-case-study.html": 1,
            "bomi-clima-ecommerce-case-study.html": 1,
            "softplay-solutions.html": 1,
            "eco-herbalist-ux-case-study.html": 1,
            "eco-herbalist-branding.html": 1,
            "healthy-eats-case-study.html": 1,
            "cinematic-escapes.html": 1
        };
        var about = { "about.html": 1, "founder.html": 1 };
        var contact = { "contact.html": 1, "feedback.html": 1 };

        if (file === "index.html") return "home";
        if (services[file]) return "services";
        if (projects[file]) return "projects";
        if (about[file]) return "about";
        if (contact[file]) return "contact";
        if (file === "blog.html" || path.indexOf("/articles/") !== -1) return "insights";
        return null;
    }

    function milHrefFile(href) {
        if (!href) return "";
        return (String(href).split("?")[0].split("#")[0].split("/").pop() || "").toLowerCase();
    }

    function milUpdateCurrentNav() {
        var file = milNavFileName();
        var section = milNavSectionForFile(file);
        var sectionFile = {
            home: "index.html",
            projects: "works.html",
            services: "services.html",
            insights: "blog.html",
            about: "about.html",
            contact: "contact.html"
        }[section] || null;

        /* Clear previous highlights (top nav persists across Swup; menu is replaced) */
        $(".mil-frame .mil-nav-links a, .mil-frame .mil-nav-cta").removeClass("is-current");
        $("#swupMenu > ul > li").removeClass("mil-active");

        if (!sectionFile) return;

        $(".mil-frame .mil-nav-links > a, .mil-frame .mil-nav-cta").each(function () {
            if (milHrefFile($(this).attr("href")) === sectionFile) {
                $(this).addClass("is-current");
            }
        });

        if (section === "services") {
            $(".mil-frame .mil-nav-dropdown-trigger").addClass("is-current");
        }

        /* Exact page inside Services dropdown */
        $(".mil-frame .mil-nav-dropdown-menu a").each(function () {
            if (milHrefFile($(this).attr("href")) === file) {
                $(this).addClass("is-current");
            }
        });

        /* Fullscreen / mobile menu */
        $("#swupMenu > ul > li").each(function () {
            var href = milHrefFile($(this).children("a").first().attr("href"));
            if (href === sectionFile) {
                $(this).addClass("mil-active");
            }
        });
    }

    milUpdateCurrentNav();
    /***************************

    top nav Services dropdown - close when a link is clicked
    ***************************/
    $('.mil-nav-dropdown').on('mouseenter', function () {
        $(this).addClass('mil-nav-dropdown-open');
    }).on('mouseleave', function () {
        $(this).removeClass('mil-nav-dropdown-open');
    });
    $('.mil-nav-dropdown-menu a').on('click', function () {
        $('.mil-nav-dropdown').removeClass('mil-nav-dropdown-open');
    });
    /***************************

    main menu

    ***************************/
    $('.mil-has-children a').on('click', function () {
        $('.mil-has-children ul').removeClass('mil-active');
        $('.mil-has-children a').removeClass('mil-active');
        $(this).toggleClass('mil-active');
        $(this).next().toggleClass('mil-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.mil-progress', {
        scaleY: 1,
        transformOrigin: 'top top',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = milScrollAppearTargets();

    if (typeof ScrollTrigger !== "undefined" && typeof ScrollTrigger.batch === "function") {
        ScrollTrigger.batch(appearance, {
            onEnter: function (batch) {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "sine",
                    stagger: 0.06
                });
            },
            onLeaveBack: function (batch) {
                gsap.to(batch, {
                    y: 40,
                    opacity: 0,
                    scale: 0.98,
                    duration: 0.2,
                    ease: "sine",
                    stagger: 0.03
                });
            },
            start: "top 92%"
        });
    } else {
        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const scaleImage = document.querySelectorAll(".mil-scale");

    scaleImage.forEach((section) => {
        var value1 = milCapScaleStartForMobileHero(section, $(section).data("value-1"));
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".mil-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    milBindFancyboxGallery();
    milInitSwiperInstances();
    milInitCalendlyEmbed();
    milInitContactPageExtras();
    milInitWorksFan();
    milInitPageMotionExtras();

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        milKillOrphanScrollTriggers();
        milInitPageMotionExtras();
        milUpdateCurrentNav();

        if (document.activeElement && typeof document.activeElement.blur === "function") {
            document.activeElement.blur();
        }

        if (window.UXUI_i18n) {
            var lang = window.UXUI_i18n.getLang();
            window.UXUI_i18n.apply(lang);
            if (typeof window.UXUI_i18n.updateFlagActiveState === 'function') {
                window.UXUI_i18n.updateFlagActiveState(lang);
            }
        }

        if (!milGetContactSectionId()) {
            $('html, body').animate({
                scrollTop: 0,
            }, 0);
        }

        gsap.to('.mil-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.mil-menu-btn').removeClass('mil-active');
        $('.mil-menu').removeClass('mil-active');
        $('.mil-menu-frame').removeClass('mil-active');
        milInitBackToTopAnimation();
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".mil-arrow-place .mil-arrow, .mil-animation .mil-dodecahedron").remove();
            $(".mil-lines-place .mil-lines").remove();
            $(".mil-hidden-elements svg.mil-arrow").first().clone().appendTo(".mil-arrow-place");
            $(".mil-dodecahedron").clone().appendTo(".mil-animation");
            $(".mil-lines").clone().appendTo(".mil-lines-place");
            /* Current-page spine label removed — top nav already shows location. */
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let box = element.querySelector(".mil-accordion-content");
            let symbol = element.querySelector(".mil-symbol");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(symbol, {
                background: getAccordionSymbolBaseColor(),
            });

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: getAccentColor(),
                    ease: "none",
                }, 0)
                .reverse();

            animation.eventCallback("onReverseComplete", function () {
                gsap.set(symbol, {
                    background: getAccordionSymbolBaseColor(),
                });
            });

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    if (animation.reversed()) {
                        gsap.set(symbol, {
                            background: getAccentColor(),
                        });
                    }
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.mil-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('mil-accent');
        });

        $('.mil-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('mil-accent');
        });

        $('.mil-drag').mouseover(function () {
            gsap.to($('.mil-ball .mil-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-drag').mouseleave(function () {
            gsap.to($('.mil-ball .mil-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.mil-more').mouseover(function () {
            gsap.to($('.mil-ball .mil-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-more').mouseleave(function () {
            gsap.to($('.mil-ball .mil-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.mil-choose').mouseover(function () {
            gsap.to($('.mil-ball .mil-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-choose').mouseleave(function () {
            gsap.to($('.mil-ball .mil-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.mil-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.mil-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.mil-has-children a').on('click', function () {
            $('.mil-has-children ul').removeClass('mil-active');
            $('.mil-has-children a').removeClass('mil-active');
            $(this).toggleClass('mil-active');
            $(this).next().toggleClass('mil-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = milScrollAppearTargets();
        if (typeof gsap !== "undefined" && appearance.length) {
            gsap.killTweensOf(appearance);
            gsap.set(appearance, {
                opacity: 0,
                y: 40,
                scale: 0.98
            });
        }

        if (typeof ScrollTrigger !== "undefined" && typeof ScrollTrigger.batch === "function") {
            ScrollTrigger.batch(appearance, {
                onEnter: function (batch) {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "sine",
                        stagger: 0.06
                    });
                },
                onLeaveBack: function (batch) {
                    gsap.to(batch, {
                        y: 40,
                        opacity: 0,
                        scale: 0.98,
                        duration: 0.2,
                        ease: "sine",
                        stagger: 0.03
                    });
                },
                start: "top 92%"
            });
        } else {
            appearance.forEach((section) => {
                gsap.fromTo(section, {
                    opacity: 0,
                    y: 40,
                    scale: .98,
                    ease: 'sine',

                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: .4,
                    scrollTrigger: {
                        trigger: section,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        appearance.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "sine"
                });
            }
        });

        const scaleImage = document.querySelectorAll(".mil-scale");

        scaleImage.forEach((section) => {
            var value1 = milCapScaleStartForMobileHero(section, $(section).data("value-1"));
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".mil-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".mil-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        milBindFancyboxGallery();
        milInitSwiperInstances();
        milInitCardRailHints();
                milInitCalendlyEmbed();
        milInitContactPageExtras();
        milInitWorksFan();
        milRefreshScrollTriggersSoon();
        if (milGetContactSectionId()) {
            window.setTimeout(milScrollToContactSection, 120);
            window.setTimeout(milScrollToContactSection, 400);
        }

        requestAnimationFrame(function () {
            milInitCardRailHints();
        });
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                milInitCardRailHints();
            });
        });

    });

    $(window).on("load", function () {
        $(".mil-arrow-place .mil-arrow").remove();
        $(".mil-hidden-elements svg.mil-arrow").first().clone().appendTo(".mil-arrow-place");
        milInitCardRailHints();
    });

    window.addEventListener("resize", function () {
        if (window.__milCardRailResizeTimer) {
            clearTimeout(window.__milCardRailResizeTimer);
        }
        window.__milCardRailResizeTimer = setTimeout(function () {
            milInitCardRailHints();
        }, 180);
    });

});

