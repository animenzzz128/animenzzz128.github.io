import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../projects';
import T from './T';

/** Frame for a case study: back link above, the other project below. */
export default function ProjectPage({ id, children }: { id: string; children: ReactNode }) {
  const next = PROJECTS.find((p) => p.id !== id)!;
  return (
    <div className="wrap page">
      <p className="crumbs"><Link to="/projects">← <T en="All projects" zh="全部项目" /></Link></p>
      {children}
      <Link className="next-proj" to={`/projects/${next.id}`}>
        <span className="eyebrow"><T en="Next project" zh="下一个项目" /></span>
        <b>{next.name}</b>
        <span><T {...next.tagline} /> →</span>
      </Link>
    </div>
  );
}
