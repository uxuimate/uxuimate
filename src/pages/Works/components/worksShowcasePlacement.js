/**
 * Interlocking 2×2 pattern: row1 [wide | narrow], row2 [narrow | wide] (≈ 3/4 + 1/4 tracks).
 * Maps index → grid placement; handles incomplete last rows when count % 4 !== 0.
 */
export function getInterlockPlacement(index, total) {
  const isLast = index === total - 1;
  const remainder = total % 4;

  if (isLast && remainder === 1) {
    return 'span-all';
  }

  if (isLast && remainder === 3 && index % 4 === 2) {
    return 'span-all';
  }

  switch (index % 4) {
    case 0:
      return 'wide-left';
    case 1:
      return 'narrow-right';
    case 2:
      return 'narrow-left';
    case 3:
      return 'wide-right';
    default:
      return 'wide-left';
  }
}

export const INTERLOCK_PLACEMENT_CLASS = {
  'wide-left': 'works-showcase__cell--wl',
  'narrow-right': 'works-showcase__cell--nr',
  'narrow-left': 'works-showcase__cell--nl',
  'wide-right': 'works-showcase__cell--wr',
  'span-all': 'works-showcase__cell--span-all'
};
