import { Link } from 'react-router-dom';
import { NOTES } from '../notes';
import T from '../components/T';

export default function Notes() {
  return (
    <div className="wrap page">
      <section id="notes">
        <div className="sec-head">
          <div className="eyebrow"><T en="Notes" zh="笔记" /></div>
          <h2><T en="Short notes from building AI products" zh="做 AI 产品时的几篇短文" /></h2>
        </div>
        <div className="note-list">
          {NOTES.map((n) => (
            <Link className="note-card" to={`/notes/${n.slug}`} key={n.slug}>
              <small><T {...n.date} /> · {n.project.name}</small>
              <b><T {...n.title} /></b>
              <p><T {...n.summary} /></p>
              <em aria-hidden="true">→</em>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
