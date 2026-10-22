// Renders the share-preview images in public/og/. Run once after changing them:
// node scripts/og/render.cjs  (needs playwright-core and a Chromium path in CHROMIUM)
const path = require('path');
const { chromium } = require('playwright-core');

const cards = [
  { file: 'home.png', html: `<div class="eyebrow">Yale SOM · MMS ’27</div><h1>Jiaqi (Jacky) Yao</h1><p class="sub">I turn messy problems into decisions you can <mark>check</mark>.</p><div class="foot"><span>Strategy · Analytics · AI products</span><span>animenzzz128.github.io</span></div>` },
  { file: 'toutoule.png', project: '/img/toutoule.png', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>投投乐 TouTouLe</h1><p class="sub">AI agent that triages job postings <mark>with evidence</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'dayweave.png', project: '/img/dayweave.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>Dayweave</h1><p class="sub">AI daily planner that proposes and <mark>waits for approval</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
];

(async () => {
  const root = path.resolve(__dirname, '../..');
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM, args: ['--headless=new'] });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const c of cards) {
    await p.goto('file://' + path.join(__dirname, 'template.html'), { waitUntil: 'networkidle' });
    await p.evaluate(({ html, project, root }) => {
      document.getElementById('c').innerHTML = html;
      if (project) {
        document.body.classList.add('project');
        const img = document.createElement('img');
        img.className = 'shot';
        img.src = 'file://' + root + '/public' + project;
        document.body.appendChild(img);
      }
    }, { ...c, root });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(root, 'public/og', c.file) });
  }
  await b.close();
})();
