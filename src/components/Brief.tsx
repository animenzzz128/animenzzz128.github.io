import type { Bi } from '../lang';
import T from './T';

/** The one-minute version at the top of a case study. */
export function Brief({ items }: { items: { label: Bi; text: Bi }[] }) {
  return (
    <section className="brief" aria-label="One-minute version">
      <div className="eyebrow"><T en="The one-minute version" zh="一分钟看懂" /></div>
      <ul>
        {items.map((it, i) => <li key={i}><b><T {...it.label} /></b> <T {...it.text} /></li>)}
      </ul>
    </section>
  );
}

/** What I would change if I started over, from the project's own records. */
export function Reflection({ items }: { items: Bi[] }) {
  return (
    <section className="reflect">
      <h4><T en="If I started over" zh="如果重做一遍" /></h4>
      <ul>
        {items.map((it, i) => <li key={i}><T {...it} /></li>)}
      </ul>
    </section>
  );
}
