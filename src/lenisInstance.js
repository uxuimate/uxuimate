import Lenis from 'lenis';

/**
 * Single Lenis instance for the whole app (wheel / trackpad smoothing).
 * Programmatic scroll should use this via utils/lenisScroll.js so anchor
 * navigation matches the same easing as user scroll.
 */
export const lenis = new Lenis();
