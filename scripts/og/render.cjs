// Renders the share-preview images in public/og/. Run once after changing them:
// node scripts/og/render.cjs  (needs playwright-core and a Chromium path in CHROMIUM)
const path = require('path');
const { chromium } = require('playwright-core');

const cards = [
  { file: 'home.png', html: `<div class="eyebrow">Yale SOM · MMS ’27</div><h1>Jiaqi (Jacky) Yao</h1><p class="sub">I turn messy problems into decisions you can <mark>check</mark>.</p><div class="foot"><span>Strategy · Analytics · AI products</span><span>animenzzz128.github.io</span></div>` },
  { file: 'toutoule.png', project: '/img/toutoule.png', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>投投乐 TouTouLe</h1><p class="sub">AI tool that triages job postings <mark>with evidence</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'dayweave.png', project: '/img/dayweave.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>Dayweave</h1><p class="sub">AI daily planner that proposes and <mark>waits for approval</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'grandma.png', project: '/img/grandma-room.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>Grandma's Wi-Fi Password</h1><p class="sub">A deduction game where <mark>the AI is the haystack</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'gradplanner.png', project: '/img/gradplanner.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>毕业去哪儿 Grad Trip</h1><p class="sub">Graduation trips, from vote to settle-up <mark>in one link</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'room.png', project: '/img/room.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>Jacky's Room</h1><p class="sub">A pixel-art homepage <mark>you can click around</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'spire.png', project: '/img/spire.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>Spire of Ashes</h1><p class="sub">A deckbuilder tuned with <mark>2,000 simulated runs</mark> per class</p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'level0.png', project: '/img/level0.jpg', html: `<div class="eyebrow">Case study · Jacky Yao</div><h1>Level 0: Threshold</h1><p class="sub">A Backrooms survival-horror shooter <mark>for the browser</mark></p><div class="foot"><span>animenzzz128.github.io</span></div>` },
  { file: 'games.png', project: '/img/grandma.jpg', html: `<div class="eyebrow">Games · Jacky Yao</div><h1>Games I directed</h1><p class="sub">Browser games built with AI coding tools, <mark>playable online</mark></p><div class="foot"><span>animenzzz128.github.io/games</span></div>` },
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
