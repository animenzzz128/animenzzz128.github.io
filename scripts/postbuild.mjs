// Gives every route its own HTML file (title, description, share preview) so direct links never 404 on GitHub Pages.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const meta = JSON.parse(readFileSync('src/meta.json', 'utf8'));
const base = readFileSync('dist/index.html', 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(route, m) {
  return base
    .replace(/<title>.*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(m.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(m.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(m.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1https://animenzzz128.github.io${route === '/' ? '/' : route}`);
}

for (const [route, m] of Object.entries(meta)) {
  if (route === '/') continue;
  mkdirSync(`dist${route}`, { recursive: true });
  writeFileSync(`dist${route}/index.html`, page(route, m));
}
writeFileSync('dist/404.html', page('/', meta['/']).replace('<head>', '<head>\n<meta name="robots" content="noindex">'));
console.log(`postbuild: ${Object.keys(meta).length - 1} route pages + 404.html`);
