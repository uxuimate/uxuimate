import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedCursor = () => {
  const outerRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const dot = dotRef.current;

    if (!outer || !dot) return undefined;

    const moveCursor = event => {
      const { clientX: x, clientY: y } = event;

      gsap.to(outer, { x, y, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(dot, { x, y, duration: 0.1, ease: 'power3.out', overwrite: 'auto' });
    };

    const growCursor = () => {
      gsap.to(outer, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
    };

    const resetCursor = () => {
      gsap.to(outer, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
    };

    const interactiveElements = document.querySelectorAll('a, button');

    document.body.classList.add('custom-cursor-enabled');
    window.addEventListener('mousemove', moveCursor);
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', growCursor);
      element.addEventListener('mouseleave', resetCursor);
    });

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', growCursor);
        element.removeEventListener('mouseleave', resetCursor);
      });
    };
  }, []);

  return <>
      <div id="cursor-outer" ref={outerRef} />
      <div id="cursor-dot" ref={dotRef} />
    </>;
};

export default AnimatedCursor;
