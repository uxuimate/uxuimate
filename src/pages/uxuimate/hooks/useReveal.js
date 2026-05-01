import { useEffect } from 'react';

const revealConfigs = [
  { selector: '.reveal-up', from: { y: 60, opacity: 0 } },
  { selector: '.reveal-left', from: { x: -60, opacity: 0 } },
  { selector: '.reveal-right', from: { x: 60, opacity: 0 } }
];

const useReveal = () => {
  useEffect(() => {
    const shouldRunReveal =
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)').matches;

    if (!shouldRunReveal) {
      return undefined;
    }

    let cleanup = () => {};
    let cancelled = false;

    const initReveal = async () => {
      const [gsapModule, scrollTriggerModule] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) {
        return;
      }

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);

    const animatedElements = new WeakSet();
    const initReveals = () => {
      revealConfigs.forEach(({ selector, from }) => {
        gsap.utils.toArray(selector).forEach(element => {
          if (animatedElements.has(element)) {
            return;
          }
          animatedElements.add(element);
          const delay = Number(element.dataset.delay || 0);

          gsap.fromTo(element, from, {
            x: 0,
            y: 0,
            opacity: 1,
            delay,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
              fastScrollEnd: true
            }
          });
        });
      });
    };

      const context = gsap.context(() => {
        initReveals();
      });

      let rafId = 0;
      const observer = new MutationObserver(() => {
        if (rafId) {
          return;
        }
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          initReveals();
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });

      cleanup = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        observer.disconnect();
        context.revert();
      };
    };

    void initReveal();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
};

export default useReveal;
