import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const revealConfigs = [
  { selector: '.reveal-up', from: { y: 60, opacity: 0 } },
  { selector: '.reveal-left', from: { x: -60, opacity: 0 } },
  { selector: '.reveal-right', from: { x: 60, opacity: 0 } }
];

const useReveal = () => {
  useEffect(() => {
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

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      context.revert();
    };
  }, []);
};

export default useReveal;
