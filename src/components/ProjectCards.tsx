import { Link } from 'react-router-dom';
import { href, srcSet, type Project } from '../projects';
import T from './T';

export default function ProjectCards({ works }: { works: readonly Project[] }) {
  return (
    <div className="pcards">
      {works.map((p) => (
        <article className="pcard" key={p.id}>
          <Link to={href(p)} className="pcard-shot" tabIndex={-1} aria-hidden="true">
            <img src={p.image} srcSet={srcSet(p)} sizes="(max-width: 760px) 100vw, 540px" alt="" loading="lazy" />
            {p.demo
              ? <span className="pcard-live"><i aria-hidden="true" />{p.kind === 'game' ? <T en="Playable online" zh="可在线试玩" /> : <T en="Live demo" zh="可在线试用" />}</span>
              : <span className="pcard-live soon">{p.kind === 'game' ? <T en="Playable demo coming soon" zh="试玩版即将上线" /> : <T en="Live demo coming soon" zh="在线 Demo 即将上线" />}</span>}
            <span className="pcard-open"><T en="Open case study" zh="查看项目详情" /> →</span>
          </Link>
          <div className="pcard-body">
            <h2><Link to={href(p)}>{p.name}</Link></h2>
            <p className="pcard-tag"><T {...p.tagline} /></p>
            <p className="pcard-blurb"><T {...p.blurb} /></p>
            <ul className="pcard-stats">
              {p.stats.map((s, i) => <li key={i}><T {...s} /></li>)}
            </ul>
            <div className="links">
              {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noopener">{p.kind === 'game' ? <T en="Play in browser" zh="在线试玩" /> : <T en="Try live demo" zh="在线试用" />} ↗</a>}
              <Link className={p.demo ? 'btn' : 'btn primary'} to={href(p)}><T en="Read case study" zh="项目详情" /> →</Link>
              {p.repo && <a className="pcard-repo" href={p.repo} target="_blank" rel="noopener">GitHub ↗</a>}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
