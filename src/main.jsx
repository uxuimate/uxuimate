import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const shouldEnableSmoothDesktopScroll = () =>
  window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)').matches;

if (shouldEnableSmoothDesktopScroll()) {
  void Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('./lenisInstance')]).then(
    ([{ default: gsap }, { default: ScrollTrigger }, { lenis }]) => {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  );
}

createRoot(document.getElementById('root')).render(
// <StrictMode>
<HashRouter>
      <App />
    </HashRouter>
// </StrictMode>
);