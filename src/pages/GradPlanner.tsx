import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';

// Facts from the grad-trip repo: README, docs/brief.md, docs/decisions.md,
// docs/iterations/iteration-1.md and the test suite (122 passing on 2026-11-09).
export default function GradPlanner() {
  return (
    <ProjectPage id="gradplanner">
      <article className="case" id="gradplanner">
        <div className="case-meta">
          <strong>毕业去哪儿 Grad Planner</strong>
          <span><span className="en">Product design &amp; acceptance, built with Claude Code</span><span className="zh">主导产品设计与验收，使用 Claude Code 辅助开发</span></span>
          <span><span className="en">Nov 2026 — present · in iteration</span><span className="zh">2026.11 — 至今 · 持续迭代中</span></span>
          <span>React · Tailwind · Netlify Functions · Netlify Blobs · Vitest</span>
        </div>
        <div className="case-body">
          <div>
            <h3><span className="en">A graduation trip, organised from one link</span><span className="zh">毕业旅行，一个链接就能组起来</span></h3>
            <p className="case-sub"><span className="en">Class trips get planned in group chats and shared docs: dozens of opinions, and where, when and how much all pull against each other. Grad Planner puts votes, budgets and free dates on one board, then carries the group through the itinerary and the settle-up.</span><span className="zh">毕业旅行通常靠微信群接龙加在线文档：消息刷屏、几十人意见分散，去哪儿、什么时候、花多少钱三件事互相牵制。毕业去哪儿把投票、预算和可出行日期放到一张看板上，再一路带到行程和 AA 结算。</span></p>
          </div>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'A no-sign-up web app: an organiser creates a trip and shares the link; classmates add a budget cap, free dates and destination votes; the board recommends a window; the group edits a daily itinerary and logs expenses.', zh: '一个无需注册的网页应用：发起人建团、发链接；同学填预算上限、可出行日期和目的地投票；看板推荐出行窗口；大家一起改每日行程、记账分摊。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'The public link must never break. Production is reached only by promoting a draft that passed a smoke test, with automatic rollback, and staging writes to a separate data store.', zh: '公开链接永远不能挂。生产环境只能通过“冒烟测试通过的草稿部署”晋级上线，失败自动回滚；预发环境写入独立的数据存储。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'A 30-minute first version, then six releases (v0.2–v0.7) in the first iteration, all through the staged pipeline; 122 unit tests today, and a full demo trip one click from the homepage.', zh: '30 分钟上线第一版，首轮迭代又发布了 6 个版本（v0.2–v0.7），全部走分级发布流程；目前 122 项单元测试，首页一键打开完整示例团。' } },
          ]} />
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">Destination, dates and budget depend on each other, so a big group rarely converges in a chat thread, and splitting costs afterwards strains friendships.</span><span className="zh">目的地、日期和预算互相牵制，人一多在群里很难收敛；出发后的 AA 账目也容易算不清、伤感情。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Product design and acceptance: brief, issues with acceptance criteria, decision log and iteration reports, with Claude Code writing the code under review.</span><span className="zh">负责产品设计与验收：产品简报、带验收标准的需求、决策日志和迭代报告；代码由 Claude Code 在评审下完成。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">Live on Netlify's free plan with a self-seeding demo trip. Now in its second iteration: animations, a tap-a-day availability view and split suggestions for big classes.</span><span className="zh">已在 Netlify 免费版上线，带自动生成的示例团；正在第二轮迭代：动效、点日期看谁能去，以及大班级的拆团建议。</span></dd></div>
          </dl>
          <div className="flow" aria-label="Decide, plan, settle">
            <div><small><span className="en">1 · Decide</span><span className="zh">1 · 决策</span></small><p><span className="en">Vote ranking, budget distribution and a date-overlap heatmap. The recommended window maximises how many people can go, then its length.</span><span className="zh">投票排行、预算分布和日期重合热力图；推荐出行窗口先让能去的人最多，再让天数最长。</span></p></div>
            <div><small><span className="en">2 · Plan</span><span className="zh">2 · 行程</span></small><p><span className="en">Choosing a destination generates an editable daily itinerary from built-in presets for 29 cities.</span><span className="zh">确定目的地后，用内置的 29 个城市预设生成可编辑的每日行程。</span></p></div>
            <div><small><span className="en">3 · Settle</span><span className="zh">3 · 结算</span></small><p><span className="en">Expenses in four categories, per-person shares, over-budget alerts and the fewest transfers to settle up.</span><span className="zh">交通、住宿、餐饮、活动四类记账，自动算人均、提醒超预算，并给出最少转账方案。</span></p></div>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>Protect the live link over the stack.</b> Kept a static site, one serverless function and one JSON document per trip instead of migrating to Django and Postgres, giving up relational queries and row-level concurrency control.</span><span className="zh"><b>保住线上链接，优先于换技术栈。</b>保留静态站 + 一个 Netlify Function + 每个团一份 JSON 文档，没有迁移到 Django + Postgres；代价是放弃关系查询和行级并发控制。</span></li>
            <li><span className="en"><b>Follow the recommendation only when it is fair.</b> The itinerary uses the recommended window only if it covers at least half the trip, so one member with a two-day window cannot shrink everyone's seven-day plan.</span><span className="zh"><b>推荐要公平才采用。</b>推荐窗口至少覆盖团期一半时才按它排行程，避免一个只有两天空的人把所有人的七天计划压缩掉。</span></li>
            <li><span className="en"><b>Budgets are total caps.</b> The per-destination estimate is local daily cost × days plus a round-trip fare, so the voting card and the expense page agree on who is over budget.</span><span className="zh"><b>预算是总上限。</b>每个目的地的估算 = 当地日均花费 × 天数 + 往返交通，这样投票卡片和费用页对“谁超预算”的判断一致。</span></li>
            <li><span className="en"><b>Guard what people edit for minutes.</b> Only the itinerary carries a version number: a stale save gets a 409, and the editor keeps the draft and offers “see latest” or “overwrite with mine”.</span><span className="zh"><b>只保护需要长时间编辑的部分。</b>只有行程带版本号：基于旧版本的保存会返回 409，草稿保留，并提供“查看最新”或“用我的版本覆盖”。</span></li>
            <li><span className="en"><b>A demo that is never empty.</b> A fictional trip creates itself on first visit, and anyone can reset it, so visitors can try every feature alone.</span><span className="zh"><b>示例永远不是空的。</b>虚构的示例团在首次访问时自动生成，任何人都能一键重置，一个人打开也能试遍所有功能。</span></li>
          </ul>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">Iteration 1 checks</span><span className="zh">首轮迭代的检查</span></th><th><span className="en">Result</span><span className="zh">结果</span></th></tr></thead>
                <tbody>
                  <tr><td><span className="en">Independent-context code review on each PR</span><span className="zh">每个 PR 由独立上下文的 Agent 评审</span></td><td><span className="en">All 6 reviews found at least one real bug that tests had missed</span><span className="zh">6 次评审每次都发现了测试漏掉的真实 bug</span></td></tr>
                  <tr><td><span className="en">Real-browser QA at desktop and 375px</span><span className="zh">桌面和 375px 宽度的真机浏览器验收</span></td><td><span className="en">Found bugs no review or test caught, such as time inputs clipping “PM”</span><span className="zh">找出了评审和测试都没发现的问题，比如时间输入框把“PM”截掉</span></td></tr>
                  <tr><td><span className="en">Production link during releases</span><span className="zh">发布期间的线上链接</span></td><td className="win"><span className="en">Returned 200 throughout</span><span className="zh">始终返回 200</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">From the project's iteration report. Neither check replaced the other.</span><span className="zh">数据来自项目的迭代报告。两种检查都有用，谁也替代不了谁。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/gradplanner.jpg" width="1920" height="960" alt="Grad Planner demo trip: decision board with the top destination, median budget, days everyone can go and the recommended window" loading="lazy" />
            <figcaption><span className="en">The decision board of the demo trip (the app's interface is in Chinese).</span><span className="zh">示例团的决策看板。</span></figcaption>
          </figure>
          <Reflection title={{ en: 'Next on the backlog', zh: '待办中的下一步' }} items={[
            { en: 'Atomic storage writes, for true concurrency safety beyond the itinerary.', zh: '存储层原子写入，让行程之外的部分也真正并发安全。' },
            { en: 'Lightweight identity: claim a member with a PIN.', zh: '轻量身份：用 PIN 认领成员身份。' },
            { en: 'Export the itinerary or settlement as an image to share in group chats.', zh: '把行程或结算导出成图片，方便发到群里。' },
          ]} />
          <div className="links">
            <a className="btn primary" href="https://grad-trip-planner.netlify.app/" target="_blank" rel="noopener"><span className="en">Try the live app</span><span className="zh">打开在线应用</span> ↗</a>
            <a href="https://grad-trip-planner.netlify.app/t/demo2026" target="_blank" rel="noopener"><span className="en">Open the demo trip</span><span className="zh">查看示例团</span> ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
