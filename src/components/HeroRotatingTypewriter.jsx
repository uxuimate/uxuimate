import { useEffect, useRef, useState } from 'react';

const DEFAULT_TYPE_MS = 72;
const DEFAULT_DELETE_MS = 48;
const DEFAULT_PAUSE_FULL_MS = 2600;
const DEFAULT_PAUSE_EMPTY_MS = 380;
const DEFAULT_START_DELAY_MS = 900;

/**
 * Delete / type loop for hero headlines (Works, Contact, etc.).
 * Pass a stable `words` array (module-level const) to avoid effect resets.
 */
const HeroRotatingTypewriter = ({
  words,
  className = '',
  typeMs = DEFAULT_TYPE_MS,
  deleteMs = DEFAULT_DELETE_MS,
  pauseFullMs = DEFAULT_PAUSE_FULL_MS,
  pauseEmptyMs = DEFAULT_PAUSE_EMPTY_MS,
  startDelayMs = DEFAULT_START_DELAY_MS
}) => {
  const [text, setText] = useState(() => words[0] ?? '');
  const [reduceMotion, setReduceMotion] = useState(false);
  const timeoutRef = useRef(null);
  const wordsKey = words.join('\0');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduceMotion && words.length) {
      setText(words[0]);
    }
  }, [reduceMotion, wordsKey, words]);

  useEffect(() => {
    if (reduceMotion || !words.length) {
      return undefined;
    }

    const clear = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const schedule = (fn, ms) => {
      clear();
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        fn();
      }, ms);
    };

    const stateRef = { current: {
      wordIndex: 0,
      charIndex: words[0].length,
      mode: 'pauseFull'
    }};

    const step = () => {
      const s = stateRef.current;
      const targetWord = words[s.wordIndex];

      if (s.mode === 'pauseFull') {
        schedule(() => {
          const cur = stateRef.current;
          stateRef.current = { ...cur, mode: 'deleting' };
          step();
        }, pauseFullMs);
        return;
      }

      if (s.mode === 'deleting') {
        if (s.charIndex > 0) {
          const next = s.charIndex - 1;
          stateRef.current = { ...s, charIndex: next };
          setText(targetWord.slice(0, next));
          schedule(step, deleteMs);
        } else {
          const nextIdx = (s.wordIndex + 1) % words.length;
          stateRef.current = {
            wordIndex: nextIdx,
            charIndex: 0,
            mode: 'typing'
          };
          schedule(step, pauseEmptyMs);
        }
        return;
      }

      if (s.mode === 'typing') {
        const w = words[s.wordIndex];
        if (s.charIndex < w.length) {
          const next = s.charIndex + 1;
          stateRef.current = { ...s, charIndex: next };
          setText(w.slice(0, next));
          schedule(step, typeMs);
        } else {
          stateRef.current = { ...s, mode: 'pauseFull' };
          schedule(step, pauseFullMs);
        }
      }
    };

    const startId = setTimeout(() => {
      stateRef.current = {
        wordIndex: 0,
        charIndex: words[0].length,
        mode: 'pauseFull'
      };
      setText(words[0]);
      step();
    }, startDelayMs);

    return () => {
      clearTimeout(startId);
      clear();
    };
  }, [reduceMotion, wordsKey, words, typeMs, deleteMs, pauseFullMs, pauseEmptyMs, startDelayMs]);

  return (
    <span className={className.trim()} aria-live={reduceMotion ? 'off' : 'polite'}>
      {text}
    </span>
  );
};

export default HeroRotatingTypewriter;
