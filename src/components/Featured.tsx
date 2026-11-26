import { Link } from 'react-router-dom';
import { href, srcSet, type Project } from '../projects';
import T from './T';

/** One wall of the home page: every work of a section hung side by side, so all of them show without dragging. */
export default function Featured({ works }: { works: readonly Project[] }) {
  return (
    <div className={`feats n${works.length}`}>
      {works.map((p, i) => (
        <article className="feat" key={p.id}>
          <Link to={href(p)} className="frame" tabIndex={-1} aria-hidden="true">
            <span className="mat"><img src={p.image} srcSet={srcSet(p)} sizes="(max-width: 880px) calc(100vw - 80px), 340px" alt="" /></span>
          </Link>
          <div className="placard">
            <div className="placard-no">No. {String(i + 1).padStart(2, '0')}<span aria-hidden="true"> / {String(works.length).padStart(2, '0')}</span></div>
            <h3><Link to={href(p)}>{p.name}</Link></h3>
            <p className="placard-tag"><T {...p.tagline} /></p>
            <ul className="placard-facts">
              {p.stats.map((s, j) => <li key={j}><T {...s} /></li>)}
            </ul>
            <div className="placard-links">
              {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noopener">{p.kind === 'game' ? <T en="Play it" zh="在线试玩" /> : <T en="Try it live" zh="在线试用" />} ↗</a>}
              <Link className="btn" to={href(p)}><T en="Case study" zh="项目详情" /> →</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
