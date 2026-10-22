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
          </Link>
          <div className="pcard-body">
            <h3><Link to={`/projects/${p.id}`}>{p.name}</Link></h3>
            <p className="pcard-tag"><T {...p.tagline} /></p>
            <p className="pcard-blurb"><T {...p.blurb} /></p>
            <ul className="pcard-stats">
              {p.stats.map((s, i) => <li key={i}><T {...s} /></li>)}
            </ul>
            <div className="links">
              <Link to={`/projects/${p.id}`}><T en="Case study" zh="项目详情" /> →</Link>
              <a href={p.demo} target="_blank" rel="noopener"><T en="Live demo" zh="在线 Demo" /> ↗</a>
              <a href={p.repo} target="_blank" rel="noopener">GitHub ↗</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
