import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS, WORKS, href } from '../projects';
import T from './T';

/** Frame for a case study: back link to its section above, the next work in that section below. */
export default function ProjectPage({ id, children }: { id: string; children: ReactNode }) {
  const sec = SECTIONS[WORKS.find((p) => p.id === id)!.kind];
  const i = sec.works.findIndex((p) => p.id === id);
  const next = sec.works[(i + 1) % sec.works.length];
  return (
    <div className="wrap page">
      <p className="crumbs"><Link to={sec.path}>← <T {...sec.all} /></Link></p>
      {children}
      <Link className="next-proj" to={href(next)}>
        <span className="eyebrow"><T {...sec.next} /></span>
        <b>{next.name}</b>
        <span><T {...next.tagline} /> →</span>
      </Link>
    </div>
  );
}
