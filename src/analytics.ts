// Cookie-free page and click counts via GoatCounter. Leave the code empty to turn tracking off.
export const GOATCOUNTER_CODE = 'jackyyao';

type GC = { count: (v: { path: string; title?: string; event?: boolean }) => void };
declare global { interface Window { goatcounter?: GC & { no_onload?: boolean } } }

const queue: Parameters<GC['count']>[0][] = [];

export function initAnalytics() {
  if (!GOATCOUNTER_CODE || location.hostname === 'localhost') return;
  window.goatcounter = { no_onload: true } as Window['goatcounter'];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  s.onload = () => queue.splice(0).forEach((v) => window.goatcounter?.count(v));
  document.head.appendChild(s);

  // Count outbound links and résumé downloads, e.g. "click: animenzzz128.github.io/dayweave/".
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin === location.origin && !url.pathname.endsWith('.pdf')) return;
    track({ path: `click: ${url.host}${url.pathname}`, title: a.textContent?.trim() || url.href, event: true });
  });
}

export function track(v: Parameters<GC['count']>[0]) {
  if (!GOATCOUNTER_CODE) return;
  if (window.goatcounter?.count) window.goatcounter.count(v);
  else queue.push(v);
}
