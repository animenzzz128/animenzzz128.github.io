import type { Bi } from './lang';

/** Which section a work lives in: product projects under /projects, games under /games. */
export type Kind = 'project' | 'game';

export type Project = {
  id: string;
  kind: Kind;
  name: string;
  tagline: Bi;
  blurb: Bi;
  stats: Bi[];
  image: string;
  /** Pixel width of `image`; a 960px copy sits beside it as `name-960.ext`. */
  imageWidth: number;
  imageAlt: string;
  /** Omitted until the work has a public link. */
  demo?: string;
  /** Omitted while the repository is private, or when the site links only the live product (grandma). */
  repo?: string;
};

/** Every work, in display order within each section. */
export const WORKS: Project[] = [
  {
    id: 'dayweave',
    kind: 'project',
    name: 'Dayweave',
    tagline: { en: 'AI daily planner that proposes and waits for approval', zh: '只提建议、获批才动手的 AI 日程助手' },
    blurb: {
      en: 'Cited daily briefs, assignment breakdowns and natural-language scheduling proposals, each checked against its evidence. Nothing reaches the calendar until you approve it.',
      zh: '带引用的每日简报、作业拆解和自然语言排程提议，每条都对照证据校验；没有你的批准，什么都不会写进日历。',
    },
    stats: [
      { en: 'AI eval 61/63', zh: 'AI 评测 61/63' },
      { en: 'Bilingual live demo', zh: '中英双语 Demo' },
      { en: 'Open source', zh: '已开源' },
    ],
    image: '/img/dayweave.jpg',
    imageWidth: 1920,
    imageAlt: 'Dayweave Today view with calendar events, dashed AI-proposed focus blocks and a sourced daily brief',
    demo: 'https://animenzzz128.github.io/dayweave/',
    repo: 'https://github.com/animenzzz128/dayweave',
  },
  {
    id: 'grandma',
    kind: 'game',
    name: "Grandma's Wi-Fi Password",
    tagline: { en: 'A conversational deduction game where the AI is the haystack', zh: '对话推理解谜游戏：AI 是草堆，密码是那根针' },
    blurb: {
      en: "Ask an LLM-powered Grandma about the old days, look around her 3D living room for proof, and work out the Wi-Fi password from her true but rambling memories. The model only phrases her replies; the facts and rules live in code.",
      zh: '向 LLM 驱动的奶奶打听往事，在她的 3D 客厅里找物证，从真实却绕弯的回忆中推出 Wi-Fi 密码。模型只负责措辞，事实和规则都在代码里。',
    },
    stats: [
      { en: '0 password leaks in the eval', zh: '评测中 0 次泄露密码' },
      { en: '65 iterations in seven days', zh: '7 天 65 轮迭代' },
      { en: 'Live on desktop and phone', zh: '已上线，电脑手机可玩' },
    ],
    image: '/img/grandma.jpg',
    imageWidth: 1920,
    imageAlt: "Title screen of Grandma's Wi-Fi Password over Grandma's 3D living room",
    demo: 'https://grandmas-wifi-password.fly.dev',
    // No repo on purpose: the site links only the live game.
  },
  {
    id: 'toutoule',
    kind: 'project',
    name: '投投乐 TouTouLe',
    tagline: { en: 'AI tool that triages job postings with evidence', zh: '带原文证据的 AI 岗位筛选工具' },
    blurb: {
      en: 'Every extracted field quotes the posting, rules decide eligibility, and errors are measured where they cost an opportunity.',
      zh: '每个抽取字段都引用原文，资格由规则判断，并在出错代价最高的字段上实测错误率。',
    },
    stats: [
      { en: 'Critical hallucinations 20 → 8 of 249', zh: '关键字段幻觉 20 → 8 / 249' },
      { en: '481 automated tests pass', zh: '481 项自动化测试通过' },
      { en: 'Live demo', zh: '在线 Demo' },
    ],
    image: '/img/toutoule.png',
    imageWidth: 2560,
    imageAlt: 'TouTouLe triage form, with a sidebar showing the sample profile in use',
    demo: 'https://toutoule-uz7gtw3pxwffgea8l8mgwq.streamlit.app/',
    repo: 'https://github.com/animenzzz128/toutoule',
  },
  {
    id: 'gradplanner',
    kind: 'project',
    name: '毕业去哪儿 Grad Trip',
    tagline: { en: 'Group planner for graduation trips: one link from vote to settle-up', zh: '毕业旅行拼团规划：一个链接从投票到分账' },
    blurb: {
      en: 'Classmates join by link with no sign-up, add budgets, free dates and destination votes, and get a recommended window, an editable itinerary and a simplified settle-up plan.',
      zh: '同学点链接即可加入、无需注册，填预算、可出行日期和目的地投票，自动得到推荐出行窗口、可编辑的每日行程和简化转账方案。',
    },
    stats: [
      { en: '294 unit tests', zh: '294 项单元测试' },
      { en: 'Staged deploys, auto-rollback', zh: '分级发布 + 自动回滚' },
      { en: 'Three iterations · 23 merged PRs', zh: '三轮迭代 · 合并 23 个 PR' },
    ],
    image: '/img/gradplanner.jpg',
    imageWidth: 1920,
    imageAlt: 'Grad Trip demo trip: decision board with top destination, median budget, days everyone can go and the recommended window',
    demo: 'https://grad-trip-planner.netlify.app/',
  },
  {
    id: 'room',
    kind: 'project',
    name: "像素小屋 Jacky's Room",
    tagline: { en: 'A pixel-art homepage you can click around', zh: '可以点来点去的像素风个人主页' },
    blurb: {
      en: 'My homepage as a pixel-art dusk study: objects open panels on my experience, projects and contact, with a text-only Quick view for anyone in a hurry.',
      zh: '把个人主页做成像素风黄昏书房：点物件看经历、项目和联系方式，赶时间的人可以直接看纯文字快速浏览。',
    },
    stats: [
      { en: 'Live since 18 Nov 2026', zh: '2026-11-18 上线' },
      { en: 'Text-only Quick view', zh: '纯文字快速浏览' },
      { en: 'Chinese & English', zh: '中英双语' },
    ],
    image: '/img/room.jpg',
    imageWidth: 1920,
    imageAlt: 'A pixel-art study at dusk with a chibi character at a laptop, a cat, bookshelves and a sunset window',
    demo: 'https://animenzzz128.github.io/jacky-s-room/',
    repo: 'https://github.com/animenzzz128/jacky-s-room',
  },
  {
    id: 'spire',
    kind: 'game',
    name: '烬塔 Spire of Ashes',
    tagline: { en: 'A roguelike deckbuilder tuned with a bot simulator', zh: '用机器人模拟器调数值的卡牌构筑爬塔游戏' },
    blurb: {
      en: 'A Slay the Spire–style genre exercise for the browser, with original names. A bot plays 2,000 runs per class on the real engine, and CI fails if its balance metrics leave their guardrail bands.',
      zh: '《杀戮尖塔》同类玩法练习，一款网页卡牌构筑游戏（名称均已改为原创）。机器人在真实引擎上每个职业跑 2,000 局，平衡指标超出护栏区间时 CI 报错。',
    },
    stats: [
      { en: '2,000 bot runs per class', zh: '每职业 2,000 局模拟' },
      { en: 'Balance guardrails in CI', zh: 'CI 平衡护栏' },
      { en: 'Chinese & English', zh: '中英双语' },
    ],
    image: '/img/spire.jpg',
    imageWidth: 1920,
    imageAlt: 'A turn-based card battle with an armored hero, a green ooze showing its next move and five cards in hand',
    demo: 'https://animenzzz128.github.io/spire-of-ashes/',
    repo: 'https://github.com/animenzzz128/spire-of-ashes',
  },
  {
    id: 'level0',
    kind: 'game',
    name: 'Level 0: Threshold',
    tagline: { en: 'A Backrooms survival-horror shooter for the browser', zh: '后室题材的网页生存恐怖射击' },
    blurb: {
      en: 'Find four tapes in a seeded maze while the level wakes up around you. Three entities need three different answers, and every texture and sound is made in code.',
      zh: '在按种子生成的迷宫里找齐四盘录像带，关卡会一点点“醒来”。三种敌人要用三种办法对付，所有贴图和声音都由代码生成。',
    },
    stats: [
      { en: 'Playable in the browser', zh: '浏览器直接玩' },
      { en: '3 entities, 3 counters', zh: '3 种敌人 3 种解法' },
      { en: 'All art and sound in code', zh: '美术与声音全由代码生成' },
    ],
    image: '/img/level0.jpg',
    imageWidth: 1920,
    imageAlt: 'Level 0 title screen over a long yellow office corridor',
    demo: 'https://animenzzz128.github.io/level-0-survive/',
    repo: 'https://github.com/animenzzz128/level-0-survive',
  },
];

export const PROJECTS = WORKS.filter((p) => p.kind === 'project');
export const GAMES = WORKS.filter((p) => p.kind === 'game');
export const SECTIONS = {
  project: { path: '/projects', works: PROJECTS, all: { en: 'All projects', zh: '全部项目' }, next: { en: 'Next project', zh: '下一个项目' } },
  game: { path: '/games', works: GAMES, all: { en: 'All games', zh: '全部游戏' }, next: { en: 'Next game', zh: '下一个游戏' } },
} as const;
/** Case-study route of a work. */
export const href = (p: Project) => `${SECTIONS[p.kind].path}/${p.id}`;
/** The works the opening film hangs on its wall: the first four of the Projects wall (the film was built for four
 *  frames), so its caption "Four products, each one live" stays true. */
export const FILM = ['dayweave', 'toutoule', 'gradplanner', 'room'].map((id) => WORKS.find((p) => p.id === id)!);

/** The 960px copy for phones and the home wall, the full-size file for large and high-density screens. */
export const srcSet = (p: Project) => `${p.image.replace(/\.(\w+)$/, '-960.$1')} 960w, ${p.image} ${p.imageWidth}w`;
