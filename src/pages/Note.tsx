import { Link, useParams } from 'react-router-dom';
import { NOTES } from '../notes';
import T from '../components/T';
import NotFound from './NotFound';

export default function Note() {
  const { slug } = useParams();
  const note = NOTES.find((n) => n.slug === slug);
  if (!note) return <NotFound />;
  const next = NOTES.find((n) => n.slug !== note.slug);
  return (
    <div className="wrap page">
      <p className="crumbs"><Link to="/notes">← <T en="All notes" zh="全部笔记" /></Link></p>
      <article className="article">
        <small className="article-meta"><T {...note.date} /> · <Link to={note.project.to}>{note.project.name}</Link></small>
        <h1><T {...note.title} /></h1>
        <p className="article-lede"><T {...note.summary} /></p>
        {note.body.map((b, i) =>
          'h' in b ? <h2 key={i}><T {...b.h} /></h2>
          : 'list' in b ? <ul key={i}>{b.list.map((li, j) => <li key={j}><T {...li} /></li>)}</ul>
          : <p key={i}><T {...b.p} /></p>,
        )}
        <p className="links"><Link className="btn" to={note.project.to}><T en={`Read the ${note.project.name} case study`} zh={`查看 ${note.project.name} 项目详情`} /> →</Link></p>
      </article>
      {next && (
        <Link className="next-proj" to={`/notes/${next.slug}`}>
          <span className="eyebrow"><T en="Next note" zh="下一篇" /></span>
          <b><T {...next.title} /></b>
          <span><T {...next.summary} /> →</span>
        </Link>
      )}
    </div>
  );
}
