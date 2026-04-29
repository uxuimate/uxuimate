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
    const context = gsap.context(() => {
      revealConfigs.forEach(({ selector, from }) => {
        gsap.utils.toArray(selector).forEach(element => {
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
    });

    return () => context.revert();
  }, []);
};

export default useReveal;
