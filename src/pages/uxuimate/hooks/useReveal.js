import { useEffect } from 'react';

const revealConfigs = [
  { selector: '.reveal-up', from: { y: 60, opacity: 0 } },
  { selector: '.reveal-left', from: { x: -60, opacity: 0 } },
  { selector: '.reveal-right', from: { x: 60, opacity: 0 } }
];

const useReveal = () => {
  useEffect(() => {
    const desktopRevealQuery = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldRunReveal = desktopRevealQuery.matches && !reducedMotionQuery.matches;
    if (!shouldRunReveal) {
      return undefined;
    }

    let cancelled = false;
    let gsapLib;
    let ScrollTriggerPlugin;
    let context;

    const runPass = () => {
      if (cancelled || !gsapLib) {
        return;
      }

      revealConfigs.forEach(({ selector, from }) => {
        gsapLib.utils.toArray(selector).forEach(element => {
          if (element.dataset.revealInit === '1') {
            return;
          }
          element.dataset.revealInit = '1';
          const delay = Number(element.dataset.delay || 0);

          gsapLib.fromTo(element, from, {
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

    const initReveals = async () => {
      const [{ default: gsapModule }, { default: scrollTriggerModule }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      if (cancelled) {
        return;
      }

      gsapLib = gsapModule;
      ScrollTriggerPlugin = scrollTriggerModule;
      gsapLib.registerPlugin(ScrollTriggerPlugin);

      context = gsapLib.context(() => {
        runPass();
      });

      // Second pass catches sections rendered shortly after first paint.
      window.setTimeout(() => {
        runPass();
        ScrollTriggerPlugin.refresh();
      }, 1200);
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => {
        void initReveals();
      }, { timeout: 1600 });

      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
        context?.revert();
      };
    }

    const timeoutId = window.setTimeout(() => {
      void initReveals();
    }, 450);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      context?.revert();
    };
  }, []);
};

export default useReveal;
