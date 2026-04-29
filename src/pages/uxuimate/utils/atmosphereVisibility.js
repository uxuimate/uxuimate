/**
 * Pauses expensive WebGL work when the host leaves the viewport or the tab is hidden.
 * `setRunning` receives true when updates + renders should run.
 */
export function subscribeAtmosphereVisibility(host, setRunning) {
  let inView = true;
  let tabVisible = document.visibilityState !== 'hidden';

  const sync = () => {
    setRunning(inView && tabVisible);
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry ? entry.isIntersecting : true;
      sync();
    },
    { root: null, rootMargin: '96px 0px', threshold: 0 }
  );
  io.observe(host);

  const onVis = () => {
    tabVisible = document.visibilityState !== 'hidden';
    sync();
  };
  document.addEventListener('visibilitychange', onVis);
  sync();

  return () => {
    io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
  };
}
