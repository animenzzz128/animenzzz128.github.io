import ProjectPage from '../components/ProjectPage';

export default function Dayweave() {
  return (
    <ProjectPage id="dayweave">
      <article className="case" id="dayweave">
        <div className="case-meta">
          <strong>Dayweave</strong>
          <span><span className="en">Founder &amp; product owner, solo</span><span className="zh">发起人兼产品负责人（独立完成）</span></span>
          <span><span className="en">v1.5.5 · Oct 2026</span><span className="zh">v1.5.5 · 2026.10</span></span>
          <span>Node.js · SQLite · React · TypeScript</span>
        </div>
        <div className="case-body">
          <div>
            <h3><span className="en">An AI daily planner that proposes, and waits for your approval</span><span className="zh">只提建议、等你批准才动手的 AI 日程助手</span></h3>
            <p className="case-sub"><span className="en">Most AI assistants act first and explain later. Dayweave turns coursework, calendar and inbox evidence into a daily plan you can review, and keeps what a source says, what the assistant recommends and what you approve visibly separate.</span><span className="zh">多数 AI 助手先动手、后解释。Dayweave 把课程、日历和邮件里的信息整理成一份可以审阅的每日计划，并始终把“来源说了什么”“助手建议什么”“你批准了什么”分开展示。</span></p>
          </div>
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">Deadlines and requirements were spread across Canvas, syllabi, calendar and email, and a planner that writes to your calendar on its own is hard to trust.</span><span className="zh">截止日期和作业要求散落在 Canvas、课程大纲、日历和邮件里；而一个会自己往日历里写东西的助手，很难让人放心。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Everything: phased roadmap, data contract, decision log, code, tests, privacy checks and releases.</span><span className="zh">全部独立完成：分阶段路线图、数据契约、决策日志、开发、测试、隐私检查和版本发布。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">v1.5.5 released. I run it on my own coursework from a pinned stable build, and the repo and a bilingual demo are public.</span><span className="zh">v1.5.5 已发布。我自己用固定的稳定版本管理课业；代码仓库和中英双语 Demo 均已公开。</span></dd></div>
          </dl>
          <div className="flow" aria-label="Source, recommendation, approval">
            <div><small><span className="en">1 · Source</span><span className="zh">1 · 来源</span></small><p><span className="en">Canvas, syllabi, Google Calendar and a read-only Gmail snapshot, each with its collection time and coverage.</span><span className="zh">Canvas、课程大纲、Google 日历和只读的 Gmail 快照，每一项都标明采集时间和覆盖范围。</span></p></div>
            <div><small><span className="en">2 · Recommendation</span><span className="zh">2 · 建议</span></small><p><span className="en">Deterministic focus blocks: 09:00–24:00, at most 90 minutes each, at least 20% of the day left free.</span><span className="zh">确定性的专注时段：09:00–24:00 之间，每段不超过 90 分钟，每天至少留 20% 空闲。</span></p></div>
            <div><small><span className="en">3 · Approval</span><span className="zh">3 · 批准</span></small><p><span className="en">Nothing is written to a calendar until you approve an exact, versioned request. The app itself never writes.</span><span className="zh">只有你批准了某个具体版本的请求，才会写入日历；应用本身从不直接写入。</span></p></div>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>Stale data looks stale.</b> A failed read keeps the last good records and says so, instead of showing an empty inbox or a clear day.</span><span className="zh"><b>过期数据要看得出过期。</b>读取失败时保留上一次的有效记录并明确标注，而不是显示成“收件箱为空”或“今天没事”。</span></li>
            <li><span className="en"><b>Proposals fail closed.</b> Requests that overlap known events, fall outside verified coverage, sit in the past or reuse an action ID are rejected.</span><span className="zh"><b>拿不准就拒绝。</b>与已知日程冲突、超出已验证范围、时间已过或重复使用操作编号的请求一律拒绝。</span></li>
            <li><span className="en"><b>Public without personal data.</b> The demo runs on a fictional student in the browser, and a privacy check scans every tracked file and the build before release.</span><span className="zh"><b>公开但不暴露个人数据。</b>Demo 使用虚构学生的数据、完全在浏览器内运行；每次发布前用隐私检查扫描所有入库文件和构建产物。</span></li>
            <li><span className="en"><b>Shipped in scoped releases.</b> Phase 6 went out as four features, each with its own issue, PR and acceptance guide.</span><span className="zh"><b>小步发布。</b>Phase 6 的四个功能各自对应独立的 issue、PR 和验收文档。</span></li>
          </ul>
          <figure className="shot">
            <img src="/img/dayweave.jpg" width="1920" height="960" alt="Dayweave Today view: a timeline with calendar events and dashed AI-proposed focus blocks, a sourced daily brief and three priorities" loading="lazy" />
            <figcaption><span className="en">The Today view in the public demo. Dashed blocks are AI proposals; they reach the calendar only after approval.</span><span className="zh">公开 Demo 的“今天”页面。虚线框是 AI 建议的时段，只有批准后才会写入日历。</span></figcaption>
          </figure>
          <div className="links">
            <a href="https://animenzzz128.github.io/dayweave/" target="_blank" rel="noopener"><span className="en">Live demo</span><span className="zh">在线 Demo</span> ↗</a>
            <a href="https://github.com/animenzzz128/dayweave" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="https://github.com/animenzzz128/dayweave/blob/main/docs/roadmap.md" target="_blank" rel="noopener"><span className="en">Roadmap</span><span className="zh">路线图</span> ↗</a>
            <a href="https://github.com/animenzzz128/dayweave/blob/main/docs/decisions.md" target="_blank" rel="noopener"><span className="en">Decision log</span><span className="zh">决策日志</span> ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
