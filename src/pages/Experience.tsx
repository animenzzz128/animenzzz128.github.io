import { EducationSection } from '../components/EducationSection';

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
            <h4><span className="en">ByteDance, TikTok Shop</span><span className="zh">字节跳动（TikTok Shop）</span> <span><span className="en">· Strategy &amp; Operations Intern</span><span className="zh">· 战略运营实习生</span></span></h4>
            <ul className="en">
              <li>Targeted 5,000+ merchants and creators across six Southeast Asian markets with 30+ local teams, lifting ad revenue as a share of GMV by 0.5–0.8pp.</li>
              <li>Built the business case for automating the MBP process, which helped raise MBP GMV penetration by 1.5pp.</li>
              <li>Broke regional targets for 12 major campaigns down to country, merchant and creator level, and tracked them daily.</li>
              <li>Defined campaign metrics, built 50+ dashboards from scratch and analyzed 200,000+ records to find operating issues.</li>
            </ul>
            <ul className="zh">
              <li>负责东南亚六国 5,000 余名商家与达人的定向筛选，协同 30 余个当地团队执行，目标群体广告收入占 GMV 比率提升 0.5–0.8 个百分点。</li>
              <li>构建 MBP 流程自动化的商业论证，助力东南亚 MBP GMV 渗透率提升 1.5 个百分点。</li>
              <li>独立将 12 场大促的区域目标拆解至国家、商家与达人层级，并每日跟踪执行。</li>
              <li>定义活动核心指标，从零搭建 50 余份监测看板，分析 20 万余条数据定位运营问题。</li>
            </ul>
          </div>
        </div>
        <div className="xp-row">
          <div className="xp-when"><span className="en">May – Jul 2024 · Beijing</span><span className="zh">2024.05 – 07 · 北京</span></div>
          <div className="xp-what">
            <h4><span className="en">Deloitte Consulting</span><span className="zh">德勤咨询</span> <span><span className="en">· Consulting Analyst Intern</span><span className="zh">· 咨询分析师实习生</span></span></h4>
            <ul className="en">
              <li>Analyzed 18,000+ retail records in Python and Tableau to identify the key metrics for a leading building-materials company’s two-year outlook.</li>
              <li>Turned insights from 6 data reports into a 30+ page Axure prototype for a digital retail platform, and helped design the implementation blueprint.</li>
              <li>Presented findings in 9 client meetings, 50+ pages of slides and 10 assessment reports.</li>
            </ul>
            <ul className="zh">
              <li>使用 Python 和 Tableau 分析 1.8 万余条零售数据，为头部建材企业的两年期业务展望识别关键指标。</li>
              <li>将 6 份数据可视化报告中的洞察转化为 30 余页 Axure 数字零售平台原型，并参与实施蓝图设计。</li>
              <li>通过 9 场客户会议、50 余页演示材料和 10 份评估报告传达结论与建议。</li>
            </ul>
          </div>
        </div>
        <div className="xp-row">
          <div className="xp-when"><span className="en">Jun 2023 – Apr 2024 · Shanghai</span><span className="zh">2023.06 – 2024.04 · 上海</span></div>
          <div className="xp-what">
            <h4>IQVIA <span><span className="en">· Analyst Intern</span><span className="zh">· 分析师实习生</span></span></h4>
            <ul className="en">
              <li>Ran end-to-end market and user research for a menopause treatment, including survey design and 10+ expert interviews.</li>
              <li>Assessed pricing and market strategy across 12 drugs by combining consumer data with regulatory and clinical research.</li>
            </ul>
            <ul className="zh">
              <li>参与更年期综合征治疗产品的全流程市场与用户研究，涵盖问卷设计和 10 余次专家访谈。</li>
              <li>结合监管、临床与行业研究，分析 12 款药品的定价与消费者行为，评估定价与市场策略。</li>
            </ul>
          </div>
        </div>
      </section>
      <EducationSection />
    </div>
  );
}
