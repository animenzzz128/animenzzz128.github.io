import type { Bi } from './lang';

export type Project = {
  id: string;
  name: string;
  tagline: Bi;
  blurb: Bi;
  stats: Bi[];
  image: string;
  imageAlt: string;
  demo: string;
  /** Omitted while the repository is private. */
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'dayweave',
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
    imageAlt: 'Dayweave Today view with calendar events, dashed AI-proposed focus blocks and a sourced daily brief',
    demo: 'https://animenzzz128.github.io/dayweave/',
    repo: 'https://github.com/animenzzz128/dayweave',
  },
  {
    id: 'toutoule',
    name: '投投乐 TouTouLe',
    tagline: { en: 'AI agent that triages job postings with evidence', zh: '带证据的招聘信息筛选 AI Agent' },
    blurb: {
      en: 'Every extracted field quotes the posting, rules decide eligibility, and errors are measured where they cost an opportunity.',
      zh: '每个抽取字段都引用原文，资格由规则判断，并在出错代价最高的字段上实测错误率。',
    },
    stats: [
      { en: 'Critical hallucinations 20 → 8 of 249', zh: '关键字段幻觉 20 → 8 / 249' },
      { en: '435 tests', zh: '435 项测试' },
      { en: 'v0.1.0 live', zh: 'v0.1.0 已上线' },
    ],
    image: '/img/toutoule.png',
    imageAlt: 'TouTouLe triage form, with a sidebar showing the sample profile in use',
    demo: 'https://toutoule-uz7gtw3pxwffgea8l8mgwq.streamlit.app/',
    repo: 'https://github.com/animenzzz128/toutoule',
  },
  {
    id: 'gradplanner',
    name: '毕业去哪儿 Grad Planner',
    tagline: { en: 'Group planner for graduation trips: one link from vote to settle-up', zh: '毕业旅行拼团规划：一个链接从投票到分账' },
    blurb: {
      en: 'Classmates join by link with no sign-up, add budgets, free dates and destination votes, and get a recommended window, an editable itinerary and a minimum-transfer settlement.',
      zh: '同学点链接即可加入、无需注册，填预算、可出行日期和目的地投票，自动得到推荐出行窗口、可编辑的每日行程和最少转账的结算方案。',
    },
    stats: [
      { en: '122 unit tests', zh: '122 项单元测试' },
      { en: 'Staged deploys, auto-rollback', zh: '分级发布 + 自动回滚' },
      { en: 'In active iteration', zh: '持续迭代中' },
    ],
    image: '/img/gradplanner.jpg',
    imageAlt: 'Grad Planner demo trip: decision board with top destination, median budget, days everyone can go and the recommended window',
    demo: 'https://grad-trip-planner.netlify.app/',
  },
];
