import { useEffect, useRef } from 'react';
import { CALENDLY_INLINE_WIDGET_URL } from '@/constants/booking';

const WIDGET_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Loads Calendly widget.js once and mounts the inline scheduler via Embed API.
 * @see https://developer.calendly.com/embed-api
 */
const CalendlyInlineWidget = ({ className = '' }) => {
  const parentRef = useRef(null);

  useEffect(() => {
    if (!parentRef.current) {
      return undefined;
    }

    const stripOuterWhiteShell = () => {
      const root = parentRef.current;
      const wrap = root?.querySelector('.calendly-inline-widget');
      if (!wrap) {
        return;
      }
      /* Calendly may set a pale mat; keep host + wrapper transparent so page void shows around iframe only */
      wrap.style.setProperty('background-color', 'transparent', 'important');
      wrap.style.setProperty('background-image', 'none', 'important');
      if (root) {
        root.style.setProperty('background', 'transparent', 'important');
      }
    };

    const init = () => {
      if (typeof window.Calendly === 'undefined' || !parentRef.current) {
        return;
      }
      parentRef.current.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: CALENDLY_INLINE_WIDGET_URL,
        parentElement: parentRef.current
      });
      stripOuterWhiteShell();
      requestAnimationFrame(stripOuterWhiteShell);
      window.setTimeout(stripOuterWhiteShell, 200);
      window.setTimeout(stripOuterWhiteShell, 900);
    };

    const existing = document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`);
    if (existing) {
      const run = () => {
        if (typeof window.Calendly !== 'undefined') {
          init();
        }
      };
      if (window.Calendly) {
        run();
      } else {
        existing.addEventListener('load', run);
      }
      return () => {
        existing.removeEventListener('load', run);
        if (parentRef.current) {
          parentRef.current.innerHTML = '';
        }
      };
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = WIDGET_SCRIPT_SRC;
    const run = () => {
      if (typeof window.Calendly !== 'undefined') {
        init();
      }
    };
    script.onload = run;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      if (parentRef.current) {
        parentRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={parentRef} className={className} aria-label="Book a 30-minute call" />;
};

export default CalendlyInlineWidget;
