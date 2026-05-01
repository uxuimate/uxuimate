/** Match body data-offset / fixed nav used on Innovative home + Services */
const HEADER_OFFSET = 90;
let lenisLoaderPromise = null;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function getLenis() {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!lenisLoaderPromise) {
    lenisLoaderPromise = import('@/lenisInstance')
      .then(module => module.lenis)
      .catch(() => null);
  }
  return lenisLoaderPromise;
}

/** Scroll to a section by id, with fixed-header offset. Uses Lenis (same as wheel smoothing). */
export async function lenisScrollToElementId(id, options = {}) {
  if (!id) {
    return;
  }
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  const immediate = prefersReducedMotion();
  const lenis = await getLenis();
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -HEADER_OFFSET,
      immediate,
      ...options
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: immediate ? 'auto' : 'smooth'
  });
}

export async function lenisScrollToTop(options = {}) {
  const immediate = prefersReducedMotion();
  const lenis = await getLenis();
  if (lenis) {
    lenis.scrollTo(0, {
      immediate,
      ...options
    });
    return;
  }
  window.scrollTo({
    top: 0,
    behavior: immediate ? 'auto' : 'smooth'
  });
}
