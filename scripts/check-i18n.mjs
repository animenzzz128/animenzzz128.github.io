// Fails the build when a component has an English span without its Chinese twin, or the reverse.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.tsx')) files.push(p);
  }
})('src');

let bad = 0;
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  const en = (s.match(/className="en"/g) || []).length;
  const zh = (s.match(/className="zh"/g) || []).length;
  if (en !== zh) { console.error(`${f}: ${en} English vs ${zh} Chinese blocks`); bad++; }
}
if (bad) process.exit(1);
console.log(`i18n check: ${files.length} files, every English block has a Chinese one`);
