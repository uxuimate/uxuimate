import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import App from './App';
import { lenis } from './lenisInstance';

gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')).render(
// <StrictMode>
<HashRouter>
      <App />
    </HashRouter>
// </StrictMode>
);