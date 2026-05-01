import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
// <StrictMode>
<HashRouter>
      <App />
    </HashRouter>
// </StrictMode>
);

const shouldEnableSmoothDesktopScroll = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  return window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)').matches;
};

if (shouldEnableSmoothDesktopScroll()) {
  Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('./lenisInstance')])
    .then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;
      const { lenis } = lenisModule;

      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    })
    .catch((error) => {
      console.error('Desktop smooth-scroll runtime skipped:', error);
    });
}