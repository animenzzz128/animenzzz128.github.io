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
  repo: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'toutoule',
    name: '投投乐 TouTouLe',
    tagline: { en: 'AI agent that triages job postings with evidence', zh: '带证据的招聘信息筛选 AI Agent' },
    blurb: {
      en: 'Every extracted field quotes the posting, rules decide eligibility, and errors are measured where they cost an opportunity.',
      zh: '每个抽取字段都引用原文，资格由规则判断，并在出错代价最高的字段上实测错误率。',
    },
    stats: [
      { en: '−60–70% critical hallucinations', zh: '关键字段幻觉 −60–70%' },
      { en: '435 tests', zh: '435 项测试' },
      { en: 'v0.1.0 live', zh: 'v0.1.0 已上线' },
    ],
    image: '/img/toutoule.png',
    imageAlt: 'TouTouLe triage form, with a sidebar showing the sample profile in use',
    demo: 'https://toutoule-uz7gtw3pxwffgea8l8mgwq.streamlit.app/',
    repo: 'https://github.com/animenzzz128/toutoule',
  },
  {
    id: 'dayweave',
    name: 'Dayweave',
    tagline: { en: 'AI daily planner that proposes and waits for approval', zh: '只提建议、获批才动手的 AI 日程助手' },
    blurb: {
      en: 'Turns coursework, calendar and inbox evidence into a reviewable daily plan. Nothing reaches the calendar until you approve it.',
      zh: '把课程、日历和邮件里的信息整理成可审阅的每日计划；没有你的批准，什么都不会写进日历。',
    },
    stats: [
      { en: 'v1.5.5 released', zh: 'v1.5.5 已发布' },
      { en: 'Open source', zh: '已开源' },
      { en: 'Bilingual demo', zh: '中英双语 Demo' },
    ],
    image: '/img/dayweave.jpg',
    imageAlt: 'Dayweave Today view with calendar events, dashed AI-proposed focus blocks and a sourced daily brief',
    demo: 'https://animenzzz128.github.io/dayweave/',
    repo: 'https://github.com/animenzzz128/dayweave',
  },
];
