import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import T from './T';

const KEY = 'intro-seen';

function shouldPlay() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try { return !sessionStorage.getItem(KEY); } catch (e) { return false; }
}

/**
 * A two-second "lights on" opening: a spotlight sweeps across the name, then the wall lights up.
 * Plays once per visit; any click, key or the Skip button ends it. The page underneath is already rendered.
 */
export default function Intro() {
  const [on, setOn] = useState(shouldPlay);

  useEffect(() => {
    if (!on) return;
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* storage blocked */ }
    const end = () => setOn(false);
    const t = setTimeout(end, 2300);
    window.addEventListener('keydown', end);
    return () => { clearTimeout(t); window.removeEventListener('keydown', end); };
  }, [on]);

  if (!on) return null;
  // Portal to <body>: <main> animates in with a transform, which would trap a fixed overlay inside it.
  return createPortal(
    <div className="intro" onClick={() => setOn(false)} aria-hidden="true">
      <div className="intro-beam" />
      <div className="intro-text">
        <div className="intro-kicker">Admit one · Yale SOM ’27</div>
        <div className="intro-name">Jiaqi (Jacky) Yao</div>
        <div className="intro-cn">姚嘉骐</div>
      </div>
      <button type="button" className="intro-skip" tabIndex={-1}><T en="Skip" zh="跳过" /></button>
    </div>,
    document.body,
  );
}
