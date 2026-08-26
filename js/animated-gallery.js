/**
 * Animated work gallery — duplicates column content for infinite vertical scroll.
 * Respects prefers-reduced-motion (no duplication / no animation).
 */
(function () {
    "use strict";

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function initAnimatedGallery() {
        var columns = document.querySelectorAll(".mil-animated-gallery__column");
        if (!columns.length) {
            return;
        }

        var reduceMotion = prefersReducedMotion();

        columns.forEach(function (column) {
            column.setAttribute("data-mil-ag-duped", "");
            column.style.setProperty("--mil-ag-animation", reduceMotion ? "none" : "mil-animated-gallery-slide");
            column.style.height = reduceMotion ? "auto" : "200%";

            if (!reduceMotion) {
                var hasMirror = !!column.querySelector(".mil-animated-gallery__segment--mirror");
                if (!hasMirror) {
                    var seg = column.querySelector(".mil-animated-gallery__segment");
                    if (seg) {
                        var mirror = seg.cloneNode(true);
                        mirror.setAttribute("aria-hidden", "true");
                        mirror.classList.add("mil-animated-gallery__segment--mirror");
                        column.appendChild(mirror);
                    } else {
                        column.innerHTML = column.innerHTML + column.innerHTML;
                    }
                }
            }
        });
    }

    function scheduleInit() {
        setTimeout(initAnimatedGallery, 50);
        setTimeout(initAnimatedGallery, 300);
        setTimeout(initAnimatedGallery, 900);
    }

    window.milInitAnimatedGallery = scheduleInit;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", scheduleInit);
    } else {
        scheduleInit();
    }

    document.addEventListener("swup:contentReplaced", scheduleInit);

    window.addEventListener("load", function () {
        if (document.querySelector(".mil-animated-gallery__column")) {
            scheduleInit();
        }
    });

    window.addEventListener("resize", function () {
        if (document.querySelector(".mil-animated-gallery__column")) {
            scheduleInit();
        }
    });

    document.querySelectorAll(".mil-animated-gallery__viewport img").forEach(function (img) {
        if (!img.complete) {
            img.addEventListener("load", scheduleInit, { passive: true });
        }
    });
})();
