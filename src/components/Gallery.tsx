import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { href, srcSet, type Project } from '../projects';
import T from './T';

/**
 * Home-page "wall": each project hangs as a framed work with a museum label beside it.
 * Scroll sideways (drag, trackpad, arrow buttons or ← → keys); the work nearest the centre is lit.
 * Everything is plain HTML, so content is readable without any animation running.
 */
export default function Gallery({ works, label }: { works: readonly Project[]; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The lit work is whichever one sits nearest the middle of the rail; recomputed on every scroll.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    el.scrollLeft = 0; // always open on the first work, even if the browser restored an old position
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestD = Infinity;
      el.querySelectorAll<HTMLElement>('.work').forEach((w, i) => {
        const d = Math.abs(w.offsetLeft - el.offsetLeft + w.offsetWidth / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  function go(i: number) {
    const el = rail.current;
    const w = el?.querySelectorAll<HTMLElement>('.work')[Math.max(0, Math.min(works.length - 1, i))];
    if (!el || !w) return;
    el.scrollTo({ left: w.offsetLeft - el.offsetLeft - (el.clientWidth - w.clientWidth) / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  // Mouse drag to walk along the wall (touch and trackpads scroll natively).
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  function down(e: RPointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !rail.current) return;
    rail.current.focus({ preventScroll: true }); // so ← → work right after a drag
    e.preventDefault(); // no text selection or native image/link drag, which would cancel the pointer stream
    drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false };
  }
  function move(e: RPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || !rail.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      rail.current.classList.add('dragging');
      try { rail.current.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
    }
    rail.current.scrollLeft = d.left - dx;
  }
  function up() {
    const el = rail.current;
    const d = drag.current;
    if (!el || !d) return;
    el.classList.remove('dragging');
    // Snap to the nearest work explicitly, so the end position never depends on the browser re-snapping.
    if (d.moved) {
      const works = el.querySelectorAll<HTMLElement>('.work');
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      works.forEach((w, i) => {
        const c = (x: HTMLElement) => Math.abs(x.offsetLeft - el.offsetLeft + x.offsetWidth / 2 - mid);
        if (c(w) < c(works[best])) best = i;
      });
      go(best);
    }
    setTimeout(() => { drag.current = null; }, 0);
  }

  // Gentle tilt toward the pointer, like leaning in to look at a frame.
  function tilt(e: RPointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -4}deg`);
    e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 5}deg`);
  }
  function untilt(e: RPointerEvent<HTMLElement>) {
    e.currentTarget.style.removeProperty('--rx');
    e.currentTarget.style.removeProperty('--ry');
  }

  return (
    <div className="gallery" aria-roledescription="carousel" aria-label={label}>
      <div
        className="rail"
        ref={rail}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
        }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onLostPointerCapture={up}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => { if (drag.current?.moved) { e.preventDefault(); e.stopPropagation(); } }}
      >
        {works.map((p, i) => (
          <article className={`work${i === active ? ' lit' : ''}`} data-i={i} key={p.id} aria-label={`${i + 1} / ${works.length}`}>
            <Link to={href(p)} className="frame" tabIndex={-1} aria-hidden="true" draggable={false} onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="mat"><img src={p.image} srcSet={srcSet(p)} sizes="(max-width: 760px) calc(100vw - 110px), 560px" alt="" draggable={false} /></span>
            </Link>
            <div className="placard">
              <div className="placard-no">No. {String(i + 1).padStart(2, '0')}<span aria-hidden="true"> / {String(works.length).padStart(2, '0')}</span></div>
              <h3><Link to={href(p)}>{p.name}</Link></h3>
              <p className="placard-medium">
                {p.kind === 'game'
                  ? (p.demo ? <T en="Browser game" zh="网页游戏" /> : <T en="Browser game · playable demo coming soon" zh="网页游戏 · 试玩版即将上线" />)
                  : (p.demo ? <T en="Live web app" zh="在线可用的网页产品" /> : <T en="Web app · live demo coming soon" zh="网页产品 · 在线 Demo 即将上线" />)}
                {p.repo ? <> · <T en="open source" zh="已开源" /></> : null}
              </p>
              <p className="placard-tag"><T {...p.tagline} /></p>
              <ul className="placard-facts">
                {p.stats.map((s, j) => <li key={j}><T {...s} /></li>)}
              </ul>
              <div className="placard-links">
                {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noopener">{p.kind === 'game' ? <T en="Play it" zh="在线试玩" /> : <T en="Try it live" zh="在线试用" />} ↗</a>}
                <Link className={p.demo ? 'btn' : 'btn primary'} to={href(p)}><T en="Case study" zh="项目详情" /> →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="wall-ctrl">
        <button type="button" className="wall-btn" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous work">←</button>
        <ol className="wall-dots">
          {works.map((p, i) => (
            <li key={p.id}><button type="button" aria-current={i === active} onClick={() => go(i)}><span className="sr">{p.name}</span></button></li>
          ))}
        </ol>
        <button type="button" className="wall-btn" onClick={() => go(active + 1)} disabled={active === works.length - 1} aria-label="Next work">→</button>
        <span className="wall-hint"><T en="Drag, or use ← → keys" zh="拖动，或按 ← → 键" /></span>
      </div>
    </div>
  );
}
