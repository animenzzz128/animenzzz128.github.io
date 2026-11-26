import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FILM } from '../projects';
import { cjkFonts } from '../fonts';
import type { TicketLayout } from '../opening/scene';
import T from './T';

const CAPTIONS = [
  { en: 'The title wall', zh: '展名墙' },
  { en: 'Four products, each one live', zh: '四个产品，每个都能直接用' },
  { en: 'Every claim comes with a number you can check', zh: '每个结论，都有可以核对的数字' },
  { en: 'Admit one', zh: '凭券入场' },
];

/** `?intro=3.2` holds the film on the frame at 3.2 s, for tuning and screenshots; a click closes it. */
function heldAt() {
  const m = /[?&]intro=([\d.]+)/.exec(location.search);
  return m ? parseFloat(m[1]) : null;
}

/** The event the hero's "Watch the opening" button sends. */
export const PLAY = 'play-opening';

function canPlay() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

/** The hero ticket's rows as the film paints them: labels as shown (visible language, CSS uppercase) and where they sit. */
function ticketRows(): TicketLayout | null {
  const t = document.querySelector('.ticket');
  const r = t?.getBoundingClientRect();
  if (!t || !r || r.height <= 0) return null;
  const f = (y: number) => (y - r.top) / r.height;
  const divs = [...t.querySelectorAll('dl > div')];
  let size = 0;
  const rows = divs.map((d) => {
    const dt = d.querySelector('dt') as HTMLElement | null;
    const b = (dt ?? d).getBoundingClientRect();
    const cs = dt ? getComputedStyle(dt) : null;
    const px = cs ? parseFloat(cs.fontSize) || 11 : 11;
    const lh = cs ? parseFloat(cs.lineHeight) || px * 1.6 : px * 1.6;
    size = px / r.height;
    // The baseline of a single line sits about 73% down its line box for this mono face at line-height 1.6.
    return { label: (dt?.innerText ?? '').trim(), top: f(d.getBoundingClientRect().top), base: f(b.top + Math.min(lh, b.height) * 0.73) };
  }).filter((row) => row.label);
  if (!rows.length) return null;
  // The figures: Fraunces at line-height 1 puts its baseline about 86% down the line box.
  let numSize = 0;
  const nums = [...t.querySelectorAll('.now-nums b')].map((b) => {
    const br = b.getBoundingClientRect();
    const px = parseFloat(getComputedStyle(b).fontSize) || 24;
    numSize = px / r.height;
    return { text: (b as HTMLElement).innerText.trim(), left: (br.left - r.left) / r.width, base: f(br.top + px * 0.86) };
  });
  return { rows, bottom: f(divs[divs.length - 1].getBoundingClientRect().bottom), size, nums, numSize };
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
 * A six-second opening: the name goes up on the green title wall, the camera rounds the corner to the
 * projects (one frame per entry in projects.ts), steps up to the first one, and its label becomes the ticket in the
 * hero (see opening/scene.ts).
 * It never plays on its own: a visitor reads the page first and starts the film from the hero's "Watch the opening"
 * button. A click, a key, a scroll or the Skip button ends it.
 */
export default function Intro() {
  const [on, setOn] = useState(() => heldAt() !== null && canPlay());
  const [chapter, setChapter] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const play = () => { if (canPlay()) { setChapter(0); setOn(true); } };
    window.addEventListener(PLAY, play);
    return () => window.removeEventListener(PLAY, play);
  }, []);

  useEffect(() => {
    if (!on) return;
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
          works: FILM.map((p) => ({ name: p.name, line: String(zh ? p.tagline.zh : p.tagline.en), facts: p.stats.map((s) => String(zh ? s.zh : s.en)), image: p.image })),
          ticketRect: () => document.querySelector('.ticket')?.getBoundingClientRect() ?? null,
          ticketRows,
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
