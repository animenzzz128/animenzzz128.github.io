import { Link } from 'react-router-dom';
import type { Bi } from '../lang';
import T from './T';

type Step = { when: Bi; stage: Bi; title: Bi; text: Bi; to?: string };

// Oldest first: economics, then research, consulting, strategy and operations, then building AI products.
const STEPS: Step[] = [
  { when: { en: 'Undergrad · to 2025', zh: '本科 · 2025 毕业' }, stage: { en: 'Economics', zh: '经济学' }, title: { en: 'Duke University', zh: '杜克大学' }, text: { en: 'Bachelor of Economics, Political Economy. Where I learned to ask how a number was made before trusting it.', zh: '经济学学士，政治经济学专业。在这里学会了先问一个数字是怎么来的，再决定信不信它。' } },
  { when: { en: '2023 – 2024', zh: '2023 – 2024' }, stage: { en: 'Research', zh: '研究' }, title: { en: 'IQVIA', zh: 'IQVIA' }, text: { en: 'Pricing and consumer-behavior analysis across 12 drugs, built on 10+ expert interviews.', zh: '分析 12 款药品的定价与消费者行为，整理 10 余次专家访谈。' } },
  { when: { en: '2024', zh: '2024' }, stage: { en: 'Consulting', zh: '咨询' }, title: { en: 'Deloitte Consulting', zh: '德勤咨询' }, text: { en: 'Retail data analysis in Python and Tableau, and 30+ platform pages prototyped in Axure.', zh: '用 Python、Tableau 分析零售数据，用 Axure 设计 30 余页平台原型。' } },
  { when: { en: '2025', zh: '2025' }, stage: { en: 'Strategy & operations', zh: '策略与运营' }, title: { en: 'TikTok Shop', zh: 'TikTok Shop' }, text: { en: 'Business case for automating MBP and campaign analytics across six Southeast Asian markets.', zh: '为 MBP 自动化做商业论证，并负责东南亚六国的活动数据分析。' }, to: '/experience' },
  { when: { en: '2026', zh: '2026' }, stage: { en: 'Management', zh: '管理' }, title: { en: 'UBC and Peking University', zh: 'UBC 与北京大学' }, text: { en: 'Master of Management at UBC, and Doing Business in China at Peking University.', zh: 'UBC 管理学硕士，以及北京大学 DBIC 短期项目。' } },
  { when: { en: '2026', zh: '2026' }, stage: { en: 'AI products', zh: 'AI 产品' }, title: { en: 'Dayweave and TouTouLe', zh: 'Dayweave 与投投乐' }, text: { en: 'Two AI products built end to end, each with a public demo and a measured eval.', zh: '从零做出两个 AI 产品，都有公开 Demo 和可量化的评测。' }, to: '/projects' },
  { when: { en: 'Now – 2027', zh: '至今 – 2027' }, stage: { en: 'Next', zh: '现在' }, title: { en: 'Yale School of Management', zh: '耶鲁大学管理学院' }, text: { en: 'Master of Management Studies, Management Science (STEM).', zh: '管理学硕士，管理科学方向（STEM）。' } },
];

export default function Timeline() {
  return (
    <section id="path">
      <div className="sec-head">
        <div className="eyebrow"><T en="Path" zh="路径" /></div>
        <h2><T en="From economics to AI products" zh="从经济学到 AI 产品" /></h2>
      </div>
      <ol className="timeline">
        {STEPS.map((s) => (
          <li key={s.title.en as string}>
            <div className="tl-when"><T {...s.when} /></div>
            <div className="tl-body">
              <span className="tl-stage"><T {...s.stage} /></span>
              <b>{s.to ? <Link to={s.to}><T {...s.title} /> →</Link> : <T {...s.title} />}</b>
              <p><T {...s.text} /></p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
