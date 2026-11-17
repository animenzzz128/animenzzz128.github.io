/**
 * Scrolling and scroll-driven animation, in one place. This module pulls in GSAP and Lenis, so nothing imports it
 * directly: Layout and Home load it after first paint, and the page works the same (minus motion) if it never arrives.
 * - Lenis smooths wheel scrolling on the page (touch scrolling stays native; visitors who prefer reduced
 *   motion get the browser's own scrolling, which Lenis respects by default).
 * - GSAP's ticker drives Lenis, and Lenis tells ScrollTrigger when the page moved, so scroll-triggered
 *   animations and the smoothed scroll position never disagree.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { smooth } from './scroll';

gsap.registerPlugin(ScrollTrigger);

/** Starts smooth scrolling; returns the function that stops it. */
export function startSmoothScroll() {
  // anchors: clicks on in-page links such as #contact glide there instead of jumping.
  const l = new Lenis({ anchors: true });
  smooth.lenis = l;
  l.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => l.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    l.destroy();
    if (smooth.lenis === l) smooth.lenis = null;
  };
}

/**
 * Elements matching `selector` inside `scope` rise in as they scroll into view; returns the undo function.
 * Only elements still below the fold are hidden first, so nothing already on screen ever blinks out.
 */
export function revealOnScroll(scope: HTMLElement, selector: string) {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const below = Array.from(scope.querySelectorAll<HTMLElement>(selector)).filter((el) => el.getBoundingClientRect().top > innerHeight * 0.9);
    if (!below.length) return;
    gsap.set(below, { opacity: 0, y: 28 });
    ScrollTrigger.batch(below, {
      start: 'top 90%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true, clearProps: 'transform' }),
    });
  });
  return () => mm.revert();
}
