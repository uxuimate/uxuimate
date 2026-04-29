import { lenis } from '@/lenisInstance';

/** Match body data-offset / fixed nav used on Innovative home + Services */
const HEADER_OFFSET = 90;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Scroll to a section by id, with fixed-header offset. Uses Lenis (same as wheel smoothing). */
export function lenisScrollToElementId(id, options = {}) {
  if (!id) {
    return;
  }
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  const immediate = prefersReducedMotion();
  lenis.scrollTo(el, {
    offset: -HEADER_OFFSET,
    immediate,
    ...options
  });
}

export function lenisScrollToTop(options = {}) {
  const immediate = prefersReducedMotion();
  lenis.scrollTo(0, {
    immediate,
    ...options
  });
}
