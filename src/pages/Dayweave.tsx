import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';

export default function Dayweave() {
  return (
    <ProjectPage id="dayweave">
      <article className="case" id="dayweave">
        <div className="case-meta">
          <strong>Dayweave</strong>
          <span><span className="en">Product, UX &amp; AI-assisted development, solo</span><span className="zh">产品、交互与 AI 辅助开发（独立完成）</span></span>
          <span><span className="en">Oct 2026 — present · in daily use</span><span className="zh">2026.10 — 至今 · 每天在用</span></span>
          <span>React · TypeScript · Node.js · SQLite · Claude API · Fly.io · Google OAuth</span>
        </div>
        <div className="case-body">
          <div>
            <h1><span className="en">An AI daily planner that proposes, and waits for your approval</span><span className="zh">只提建议、等你批准才动手的 AI 日程助手</span></h1>
            <p className="case-sub"><span className="en">Most AI assistants act first and explain later. Dayweave turns coursework, calendar and inbox evidence into a daily plan you can review, and keeps what a source says, what the assistant recommends and what you approve visibly separate.</span><span className="zh">多数 AI 助手先动手、后解释。Dayweave 把课程、日历和邮件里的信息整理成一份可以审阅的每日计划，并始终把“来源说了什么”“助手建议什么”“你批准了什么”分开展示。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/dayweave.jpg" srcSet="/img/dayweave-960.jpg 960w, /img/dayweave.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="Dayweave Today view: a timeline with calendar events and dashed AI-proposed focus blocks, a sourced daily brief and three priorities" />
            <figcaption><span className="en">The Today view in the public demo. Dashed blocks are AI proposals; they reach the calendar only after approval.</span><span className="zh">公开 Demo 的“今天”页面。虚线框是 AI 建议的时段，只有批准后才会写入日历。</span></figcaption>
          </figure>
          <figure className="shot">
            <video className="en" controls preload="none" playsInline poster="/img/dayweave-video-en.jpg" width="1280" height="800" src="/video/dayweave-demo-en.mp4" aria-label="48-second walkthrough of the Dayweave demo: a cited brief, a source outage, planning a day and approving it" />
            <video className="zh" controls preload="none" playsInline poster="/img/dayweave-video-zh.jpg" width="1280" height="800" src="/video/dayweave-demo-zh.mp4" aria-label="48 秒 Dayweave Demo 演示：带引用的简报、数据源中断、排一天的计划并批准写入" />
            <figcaption><span className="en">A 48-second walkthrough of the public demo, on fictional data: the cited brief, a source outage, then planning a day and approving it.</span><span className="zh">公开 Demo 的 48 秒演示（虚构数据）：带引用的简报、数据源中断，再到排好一天并批准写入。</span></figcaption>
          </figure>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'A bilingual planner for graduate students, with cited daily briefs, assignment breakdowns and natural-language scheduling proposals.', zh: '一个面向研究生的中英双语日程助手，提供带引用的每日简报、作业拆解和自然语言排程提议。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'Rules decide what matters and when. The model only explains, breaks down or parses, every output is checked against its evidence, and nothing reaches the calendar without approval of an exact version.', zh: '重要性和时间由规则决定，模型只负责解释、拆解和理解指令；每条输出都要对照证据校验，未经批准的具体版本不会写进日历。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'I run it on my own coursework: a 7:33 a.m. cloud run collects the day unattended, and 14 approved versions put 85 blocks on my calendar over 16 days in a row. The AI eval re-scored 61/63, and daily use makes no paid model API calls.', zh: '我自己用它管理课业：每天 7:33 云端自动采集，14 个批准版本在连续 16 天里往我的日历写入 85 个时间块；AI 评测复评 61/63，日常使用不调用付费模型 API。' } },
          ]} />
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">Deadlines and requirements were spread across Canvas, syllabi, calendar and email. General AI assistants summarize that well but get the details wrong, and a planner that writes to your calendar on its own is hard to trust.</span><span className="zh">截止日期和作业要求散落在 Canvas、课程大纲、日历和邮件里。通用 AI 助手擅长概括，却常在细节上出错；而一个会自己往日历里写东西的助手，很难让人放心。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Product, UX and AI-assisted development: roadmap, data contract, decision log, evaluation set, tests and releases.</span><span className="zh">负责产品、交互及 AI 辅助开发：路线图、数据契约、决策日志、评测集、测试和版本发布。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">A private instance I use every day, plus a public bilingual demo and open-source repo. 85 approved blocks written over 16 consecutive days, the AI eval re-scored 61/63, and $0 API spend in daily use.</span><span className="zh">一个我每天在用的私有实例，加上公开的中英双语 Demo 和开源代码。连续 16 天写入 85 个批准的时间块；AI 评测复评 61/63；日常使用 0 API 花费。</span></dd></div>
          </dl>
          <div className="flow" aria-label="Source, recommendation, approval">
            <div><small><span className="en">1 · Source</span><span className="zh">1 · 来源</span></small><p><span className="en">Canvas, course sites, Google Calendar and school mail, read every morning by an unattended cloud run, each with its collection time and coverage.</span><span className="zh">Canvas、课程网站、Google 日历和学校邮件，每天早上由云端任务自动读取，每一项都标明采集时间和覆盖范围。</span></p></div>
            <div><small><span className="en">2 · Recommendation</span><span className="zh">2 · 建议</span></small><p><span className="en">Rules rank the work and place focus blocks. AI writes the cited brief and breakdowns; anything that fails its checks falls back to rule-written text.</span><span className="zh">规则排序任务、安排专注时段；AI 撰写带引用的简报和作业拆解，校验不通过就退回规则生成的文本。</span></p></div>
            <div><small><span className="en">3 · Approval</span><span className="zh">3 · 批准</span></small><p><span className="en">I adjust the day and approve an exact version. The site then writes it with my own Google consent (calendar events only): it re-reads the calendar, stops on any conflict, creates each block once and reads it back.</span><span className="zh">我调整当天并批准一个确切版本，网站用我本人的 Google 授权（只含日历活动权限）写入：先重新读取日历，有冲突就停，每个块只创建一次并读回核对。</span></p></div>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>AI explains, rules decide.</b> Every brief sentence must cite records that exist, and numbers and times must come from those records. Outputs are generated offline and re-validated in the browser before display.</span><span className="zh"><b>AI 负责解释，规则负责决定。</b>简报的每句话都必须引用真实存在的记录，数字和时间必须来自被引用的记录；输出离线生成，在浏览器里展示前再校验一次。</span></li>
            <li><span className="en"><b>Stale data looks stale.</b> A failed read keeps the last good records and says so, instead of showing an empty inbox or a clear day.</span><span className="zh"><b>过期数据要看得出过期。</b>读取失败时保留上一次的有效记录并明确标注，而不是显示成“收件箱为空”或“今天没事”。</span></li>
            <li><span className="en"><b>Proposals fail closed.</b> Requests that overlap known events, fall outside verified coverage, sit in the past or reuse an action ID are rejected.</span><span className="zh"><b>拿不准就拒绝。</b>与已知日程冲突、超出已验证范围、时间已过或重复使用操作编号的请求一律拒绝。</span></li>
            <li><span className="en"><b>Public without personal data.</b> The demo runs on a fictional student in the browser, and a privacy check scans every tracked file and the build before release.</span><span className="zh"><b>公开但不暴露个人数据。</b>Demo 使用虚构学生的数据、完全在浏览器内运行；每次发布前用隐私检查扫描所有入库文件和构建产物。</span></li>
          </ul>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">AI eval (21 cases × 3 runs)</span><span className="zh">AI 评测（21 个场景 × 3 次）</span></th><th><span className="en">Passed</span><span className="zh">通过</span></th><th><span className="en">Note</span><span className="zh">说明</span></th></tr></thead>
                <tbody>
                  <tr><td><span className="en">First scoring</span><span className="zh">首次评分</span></td><td>58 / 63</td><td><span className="en">3 of 5 failures were a validator bug</span><span className="zh">5 个失败里有 3 个是评分器的 bug</span></td></tr>
                  <tr><td><span className="en">Re-scored, same outputs</span><span className="zh">修复后复评同批输出</span></td><td className="win">61 / 63</td><td><span className="en">Fix covered by regression tests</span><span className="zh">修复已加回归测试</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">Cases include source outages, a moved deadline, the DST change day and instructions injected into an email. 21 cases on one fictional student are a regression set, not a measure of reliability on real data.</span><span className="zh">场景包括数据源中断、截止日期变更、夏令时切换日、邮件里被注入的指令等。21 个场景都基于同一位虚构学生，是回归测试集，不代表真实数据上的可靠性。</span></p>
          </div>
          <Reflection items={[
            { en: 'Start with deterministic rules and scored checks. An early trial that let the model read raw inputs got deadline boundaries and uncertainty wrong.', zh: '一开始就用确定性规则和可打分的检查。早期让模型直接读原始数据的尝试，在截止时间边界和不确定性上出了错。' },
            { en: 'Test the scorer as hard as the model. Three of the first five eval failures were a bug in my validator, not in the outputs.', zh: '评分器要和模型一样认真测试。首轮 5 个失败里，有 3 个是我写的校验器的 bug，而不是输出的问题。' },
            { en: 'Confirm account access before building on a provider. The school Outlook connection was never established, so I moved to Google.', zh: '先确认账号权限，再基于某个服务开发。学校 Outlook 的连接始终没能建立，最后改用了 Google。' },
          ]} />
          <div className="links">
            <a className="btn primary" href="https://animenzzz128.github.io/dayweave/" target="_blank" rel="noopener"><span className="en">Try the live demo</span><span className="zh">打开在线 Demo</span> ↗</a>
            <a href="https://animenzzz128.github.io/dayweave/#/case-study" target="_blank" rel="noopener"><span className="en">Full case study</span><span className="zh">完整案例</span> ↗</a>
            <a href="https://github.com/animenzzz128/dayweave" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="https://github.com/animenzzz128/dayweave/blob/main/evals/luna-ai/README.md" target="_blank" rel="noopener"><span className="en">AI eval</span><span className="zh">AI 评测</span> ↗</a>
            <a href="https://github.com/animenzzz128/dayweave/blob/main/docs/decisions.md" target="_blank" rel="noopener"><span className="en">Decision log</span><span className="zh">决策日志</span> ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
