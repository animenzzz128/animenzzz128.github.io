import { TESTIMONIALS } from '../testimonials';
import T from './T';

export default function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <div className="quotes">
      {TESTIMONIALS.map((t) => (
        <figure className="quote" key={t.name}>
          <blockquote><T {...t.quote} /></blockquote>
          <figcaption><b>{t.name}</b> · <T {...t.role} />{t.source && <> · <a href={t.source} target="_blank" rel="noopener">LinkedIn ↗</a></>}</figcaption>
        </figure>
      ))}
    </div>
  );
}
