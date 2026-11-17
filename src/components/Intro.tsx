import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../projects';
import { cjkFonts } from '../fonts';
import T from './T';

const KEY = 'intro-seen';
const CAPTIONS = [
  { en: 'The title wall', zh: '展名墙' },
  { en: 'Three products, each one live', zh: '三个产品，每个都能直接用' },
  { en: 'Every claim comes with a number you can check', zh: '每个结论，都有可以核对的数字' },
  { en: 'Admit one', zh: '凭券入场' },
];

/** `?intro=3.2` holds the film on the frame at 3.2 s, for tuning and screenshots; a click closes it. */
function heldAt() {
  const m = /[?&]intro=([\d.]+)/.exec(location.search);
  return m ? parseFloat(m[1]) : null;
}

function shouldPlay() {
  if (heldAt() !== null) return true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // In-app browsers such as WeChat's are where a WebGL film is least reliable and least wanted.
  if (/MicroMessenger/i.test(navigator.userAgent)) return false;
  if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return false;
  try { if (sessionStorage.getItem(KEY)) return false; } catch (e) { return false; }
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

function fontsReady() {
  const fonts = document.fonts;
  if (!fonts?.load) return Promise.resolve();
  return Promise.race([
    // The Chinese faces are declared by a stylesheet that loads late (fonts.ts), so wait for it before asking for one.
    cjkFonts.then(() => Promise.all([fonts.load('500 100px "Fraunces Variable"'), fonts.load('500 30px "IBM Plex Mono"'), fonts.load('500 60px "Noto Serif SC"', '姚嘉骐')])).catch(() => undefined),
    new Promise((res) => setTimeout(res, 1500)),
  ]);
}

/**
 * A six-second opening: the name goes up on the green title wall, the camera rounds the corner to the three
 * projects, steps up to the first one, and its label becomes the ticket in the hero (see opening/scene.ts).
 * Plays once per visit; a click, a key, a scroll or the Skip button ends it. The page underneath is already
 * rendered, and visitors who prefer reduced motion, have no WebGL or are in WeChat never see the film.
 */
export default function Intro() {
  const [on, setOn] = useState(shouldPlay);
  const [chapter, setChapter] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!on) return;
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* storage blocked */ }
    const hold = heldAt();
    let dead = false, raf = 0, started = 0, skipAt = 0, last = 0;
    let giveUp: ReturnType<typeof setTimeout> | undefined;
    let film: { frame: (t: number) => number; resize: () => void; dispose: () => void } | null = null;
    const stop = () => { dead = true; cancelAnimationFrame(raf); clearTimeout(giveUp); film?.dispose(); film = null; };
    const end = () => { stop(); setOn(false); };
    // Skipping fades the film out from wherever it is; before the film has started there is nothing to fade.
    const skip = () => { if (!started || hold !== null) end(); else if (!skipAt) skipAt = performance.now(); };
    skipRef.current = skip;
    // Nobody should wait on an intro: if it is not running within three seconds, show the page.
    giveUp = setTimeout(() => { if (!started) end(); }, 3000);

    (async () => {
      try {
        const [{ createOpening, END, CHAPTERS }] = await Promise.all([import('../opening/scene'), fontsReady()]);
        if (dead || !canvas.current) return;
        const root$ = document.documentElement;
        const theme = root$.getAttribute('data-theme');
        const zh = root$.getAttribute('data-lang') === 'zh';
        film = await createOpening({
          canvas: canvas.current,
          dark: theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches),
          zh,
          works: PROJECTS.map((p) => ({ name: p.name, line: String(zh ? p.tagline.zh : p.tagline.en), facts: p.stats.map((s) => String(zh ? s.zh : s.en)), image: p.image })),
          ticketRect: () => document.querySelector('.ticket')?.getBoundingClientRect() ?? null,
        }, () => dead);
        if (dead || !film) return;
        started = performance.now();
        const caption = (t: number) => {
          let c = 0;
          while (c < CHAPTERS.length - 1 && t >= CHAPTERS[c + 1]) c++;
          if (c !== last) { last = c; setChapter(c); }
          if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, t / END)})`;
        };
        if (hold !== null) {
          const alpha = film.frame(hold);
          if (root.current) root.current.style.opacity = String(Math.max(0.05, alpha));
          caption(hold);
          return;
        }
        const tick = (now: number) => {
          if (dead || !film) return;
          const t = (now - started) / 1000;
          let alpha = film.frame(t);
          if (skipAt) alpha *= 1 - (now - skipAt) / 280;
          if (root.current) root.current.style.opacity = String(Math.max(0, alpha));
          caption(t);
          if (t >= END || alpha <= 0) return end();
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch (e) {
        end();
      }
    })();

    const resize = () => film?.resize();
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      stop();
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('resize', resize);
    };
  }, [on]);

  if (!on) return null;
  // Portal to <body>: <main> animates in with a transform, which would trap a fixed overlay inside it.
  return createPortal(
    <div className="opening" ref={root} onClick={() => skipRef.current()} aria-hidden="true">
      <canvas ref={canvas} />
      <p className="opening-cap"><T {...CAPTIONS[chapter]} /></p>
      <button type="button" className="opening-skip" tabIndex={-1}><T en="Skip" zh="跳过" /></button>
      <div className="opening-bar" ref={bar} />
    </div>,
    document.body,
  );
}
