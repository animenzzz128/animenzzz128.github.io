import { Link } from 'react-router-dom';
import { PROJECTS } from '../projects';
import T from './T';

export default function ProjectCards() {
  return (
    <div className="pcards">
      {PROJECTS.map((p) => (
        <article className="pcard" key={p.id}>
          <Link to={`/projects/${p.id}`} className="pcard-shot" tabIndex={-1} aria-hidden="true">
            <img src={p.image} alt="" loading="lazy" />
            <span className="pcard-live"><i aria-hidden="true" /><T en="Live demo" zh="可在线试用" /></span>
            <span className="pcard-open"><T en="Open case study" zh="查看项目详情" /> →</span>
          </Link>
          <div className="pcard-body">
            <h3><Link to={`/projects/${p.id}`}>{p.name}</Link></h3>
            <p className="pcard-tag"><T {...p.tagline} /></p>
            <p className="pcard-blurb"><T {...p.blurb} /></p>
            <ul className="pcard-stats">
              {p.stats.map((s, i) => <li key={i}><T {...s} /></li>)}
            </ul>
            <div className="links">
              <a className="btn primary" href={p.demo} target="_blank" rel="noopener"><T en="Try live demo" zh="在线试用" /> ↗</a>
              <Link className="btn" to={`/projects/${p.id}`}><T en="Read case study" zh="项目详情" /> →</Link>
              <a className="pcard-repo" href={p.repo} target="_blank" rel="noopener">GitHub ↗</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
