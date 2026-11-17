import type Lenis from 'lenis';

/** The running Lenis instance once motion.ts has loaded; until then (or without it) scrolling is the browser's. */
export const smooth: { lenis: Lenis | null } = { lenis: null };

/** Jump to the top of the page, for route changes. */
export function scrollToTop() {
  if (smooth.lenis) smooth.lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/** Scroll an element into view by selector. */
export function scrollToElement(selector: string) {
  if (smooth.lenis) smooth.lenis.scrollTo(selector);
  else document.querySelector(selector)?.scrollIntoView();
}
