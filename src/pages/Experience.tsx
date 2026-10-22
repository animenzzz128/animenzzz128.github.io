import { EducationSection } from '../components/EducationSection';
import T from '../components/T';
import type { Bi } from '../lang';

/** Tools and methods named in each résumé entry. */
function Skills({ items }: { items: (string | Bi)[] }) {
  return (
    <div className="tags xp-tags" aria-label="Skills used">
      {items.map((t, i) => <span key={i}>{typeof t === 'string' ? t : <T {...t} />}</span>)}
    </div>
  );
}

export default function Experience() {
  return (
    <div className="wrap page">
      <section id="experience">
        <div className="sec-head">
          <div className="eyebrow"><span className="en">Experience</span><span className="zh">工作经历</span></div>
          <h2><span className="en">Strategy, consulting and research</span><span className="zh">策略、咨询与研究</span></h2>
        </div>
        <div className="xp-row">
          <div className="xp-when"><span className="en">May – Aug 2025 · Shanghai</span><span className="zh">2025.05 – 08 · 上海</span></div>
          <div className="xp-what">
            <h4><span className="en">ByteDance, TikTok Shop</span><span className="zh">字节跳动（TikTok Shop）</span> <span><span className="en">· Strategy Operations Intern, Regional Analytics &amp; Special Projects</span><span className="zh">· 战略运营实习生，区域分析与专项项目组</span></span></h4>
            <ul className="en">
              <li>Built the analytics and business case for automating Monetized Business Packages (MBP), supporting Data Science and Engineering investment; contributed to a 1.5pp increase in Southeast Asia MBP GMV penetration.</li>
              <li>Selected campaign KPIs and built 50+ Excel dashboards from scratch, analyzing about 200K cumulative seller, creator, product and campaign data points to identify performance gaps.</li>
              <li>Screened 5K+ sellers and creators across six Southeast Asian markets and coordinated with 30+ local-market contacts; targeted pools saw ad revenue/GMV rise 0.5–0.8pp and incremental ad revenue/incremental GMV rise 0.2–0.6pp.</li>
            </ul>
            <ul className="zh">
              <li>基于历史表现与预期价值，构建 MBP（商业化资源包）自动化商业论证，支持数据科学与工程资源投入；助力东南亚 MBP GMV 渗透率提升 1.5 个百分点。</li>
              <li>选取活动监测指标，从零搭建并维护 50 余份 Excel 看板，分析累计约 20 万条商家、达人、商品及活动数据点，定位表现差异。</li>
              <li>在东南亚六国累计筛选 5,000 余名商家与达人，协同 30 余名当地市场对接人推进活动；目标群体广告收入/GMV 提升 0.5–0.8 个百分点，增量广告收入/增量 GMV 提升 0.2–0.6 个百分点。</li>
            </ul>
            <Skills items={['Excel', { en: 'KPI design', zh: '指标设计' }, { en: 'Business case', zh: '商业论证' }, { en: 'Seller & creator analytics', zh: '商家与达人分析' }, { en: 'Cross-market coordination', zh: '跨市场协作' }]} />
          </div>
        </div>
        <div className="xp-row">
          <div className="xp-when"><span className="en">May – Jul 2024 · Beijing</span><span className="zh">2024.05 – 07 · 北京</span></div>
          <div className="xp-what">
            <h4><span className="en">Deloitte Consulting</span><span className="zh">德勤咨询</span> <span><span className="en">· Consulting Analyst Intern</span><span className="zh">· 咨询分析师实习生</span></span></h4>
            <ul className="en">
              <li>Produced six data-visualization reports and supported the design of 30+ digital retail-platform pages in Axure, contributing to the implementation blueprint with the business-analysis team.</li>
              <li>Cleaned and analyzed 18K+ retail records using Python and Tableau, applying exploratory and predictive analysis to inform a building-materials client’s two-year business outlook.</li>
            </ul>
            <ul className="zh">
              <li>完成 6 份可视化报告，用 Axure 支持 30 余页数字零售平台原型设计，并参与业务分析团队的实施蓝图设计。</li>
              <li>使用 Python、Tableau 清洗并分析 1.8 万余条零售数据，以探索与预测分析支持建材客户两年期业务展望。</li>
            </ul>
            <Skills items={['Python', 'Tableau', 'Axure', { en: 'Data visualization', zh: '数据可视化' }, { en: 'Predictive analysis', zh: '预测分析' }]} />
          </div>
        </div>
        <div className="xp-row">
          <div className="xp-when"><span className="en">Jun 2023 – Apr 2024 · Shanghai</span><span className="zh">2023.06 – 2024.04 · 上海</span></div>
          <div className="xp-what">
            <h4>IQVIA <span><span className="en">· Analyst Intern</span><span className="zh">· 分析师实习生</span></span></h4>
            <ul className="en">
              <li>Analyzed pricing and consumer-behavior information across 12 drugs and synthesized 10+ expert interviews, drawing on regulatory and clinical research to assess market and pricing strategies.</li>
            </ul>
            <ul className="zh">
              <li>分析 12 款药品定价与消费者行为，整理 10 余次专家访谈，结合监管及临床研究支持市场和定价策略评估。</li>
            </ul>
            <Skills items={[{ en: 'Pricing analysis', zh: '定价分析' }, { en: 'Expert interviews', zh: '专家访谈' }, { en: 'Market research', zh: '市场研究' }]} />
          </div>
        </div>
      </section>
      <EducationSection />
      <p className="links more"><span className="en"><a href="/resume/Jiaqi_Yao_Resume_EN.pdf" target="_blank" rel="noopener">Download résumé (PDF) ↗</a> · <a href="/resume/Jiaqi_Yao_Resume_CN.pdf" target="_blank" rel="noopener">中文简历 ↗</a></span><span className="zh"><a href="/resume/Jiaqi_Yao_Resume_CN.pdf" target="_blank" rel="noopener">下载中文简历 (PDF) ↗</a> · <a href="/resume/Jiaqi_Yao_Resume_EN.pdf" target="_blank" rel="noopener">English résumé ↗</a></span></p>
    </div>
  );
}
