import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';

// Facts from the grad-trip repo at main 6b93aab: README, docs/brief.md, docs/decisions.md,
// docs/iterations/iteration-1..3.md, merged PRs #2–#43 and the test suite (294 passing in 12 files, run 2026-11-18).
// The settle-up is greedy (at most n−1 transfers), so never call it “fewest”.
export default function GradPlanner() {
  return (
    <ProjectPage id="gradplanner">
      <article className="case" id="gradplanner">
        <div className="case-meta">
          <strong>毕业去哪儿 Grad Trip</strong>
          <span><span className="en">Product design &amp; acceptance, built with Claude Code</span><span className="zh">主导产品设计与验收，使用 Claude Code 辅助开发</span></span>
          <span><span className="en">Nov 2026 · three iterations</span><span className="zh">2026.11 · 三轮迭代</span></span>
          <span>React · Tailwind · Netlify Functions · Netlify Blobs · Vitest</span>
        </div>
        <div className="case-body">
          <div>
            <h1><span className="en">A graduation trip, organized from one link</span><span className="zh">毕业旅行，一个链接就能组起来</span></h1>
            <p className="case-sub"><span className="en">Class trips get planned in group chats and shared docs: dozens of opinions, and where, when and how much all pull against each other. Grad Trip puts votes, budgets and free dates on one board, then carries the group through the itinerary and the settle-up.</span><span className="zh">毕业旅行通常靠微信群接龙加在线文档：消息刷屏、几十人意见分散，去哪儿、什么时候、花多少钱三件事互相牵制。毕业去哪儿把投票、预算和可出行日期放到一张看板上，再一路带到行程和 AA 结算。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/gradplanner.jpg" srcSet="/img/gradplanner-960.jpg 960w, /img/gradplanner.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="Grad Trip demo trip: decision board with the top destination, median budget, days everyone can go and the recommended window" />
            <figcaption><span className="en">The decision board of the demo trip (the app's interface is in Chinese).</span><span className="zh">示例团的决策看板。</span></figcaption>
          </figure>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'A no-sign-up web app: an organizer creates a trip and shares the link; classmates add a budget cap, free dates and destination votes; the board recommends a window; the group edits a daily itinerary and logs expenses.', zh: '一个无需注册的网页应用：发起人建团、发链接；同学填预算上限、可出行日期和目的地投票；看板推荐出行窗口；大家一起改每日行程、记账分摊。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'The public link must never break. Production is reached only by promoting a draft that passed a smoke test, with automatic rollback, and staging writes to a separate data store.', zh: '公开链接永远不能挂。生产环境只能通过“冒烟测试通过的草稿部署”晋级上线，失败自动回滚；预发环境写入独立的数据存储。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'A time-boxed first version, then 14 releases (v0.2–v0.15) over three iterations, all through the staged pipeline; 294 unit tests, and a full demo trip one click from the homepage.', zh: '限时原型上线后，三轮迭代共发布 14 个版本（v0.2–v0.15），全部走分级发布流程；294 项单元测试，首页一键打开完整示例团。' } },
          ]} />
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">Destination, dates and budget depend on each other, so a big group rarely converges in a chat thread, and splitting costs afterwards strains friendships.</span><span className="zh">目的地、日期和预算互相牵制，人一多在群里很难收敛；出发后的 AA 账目也容易算不清、伤感情。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Product design and acceptance: I defined the problem, requirements and acceptance criteria, made the product trade-offs and approved merges and releases. Claude Code wrote the code, the decision log and the iteration reports under my direction, and an independent-context review agent checked each code PR.</span><span className="zh">负责产品设计与验收：定义问题、需求与验收标准，拍板产品取舍，审批合并与发布；代码、决策日志和迭代报告由 Claude Code 在我的指导下撰写，每个代码 PR 由独立上下文的审查 Agent 复核。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">Live on Netlify's free plan with a self-seeding demo trip, after three iterations: round 2 added split suggestions, PIN identity, organizer tools and motion; round 3 added atomic writes so simultaneous edits aren't silently lost (tested with 10 at once), 2.5-second sync while the page is in use, departure cities with map links, share images and drag-to-reorder.</span><span className="zh">已在 Netlify 免费版上线，带自动生成的示例团，共完成三轮迭代：第二轮加入拆团建议、PIN 身份、发起人管理和动效；第三轮加入原子写入（多人同时修改不会被悄悄覆盖，已做 10 路并发测试）、使用中每 2.5 秒同步、出发城市与地图链接、分享图和拖拽排序。</span></dd></div>
          </dl>
          <div className="flow" aria-label="Decide, plan, settle">
            <div><small><span className="en">1 · Decide</span><span className="zh">1 · 决策</span></small><p><span className="en">Vote ranking, budget distribution and a date-overlap heatmap. The recommended window (at least 2 days) maximizes the minimum number of people available on any day in it, then its length.</span><span className="zh">投票排行、预算分布和日期重合热力图；推荐出行窗口（至少 2 天）先让窗口内每天可出行人数的最小值最大，再让天数最长。</span></p></div>
            <div><small><span className="en">2 · Plan</span><span className="zh">2 · 行程</span></small><p><span className="en">Choosing a destination generates an editable daily itinerary from 45 built-in city and region presets (generic suggestions elsewhere); places link to a map search, and items can be dragged to reorder.</span><span className="zh">确定目的地后，用内置的 45 个城市/地区预设生成可编辑的每日行程（其他目的地用通用建议）；景点附地图搜索链接，条目可拖拽调整顺序。</span></p></div>
            <div><small><span className="en">3 · Settle</span><span className="zh">3 · 结算</span></small><p><span className="en">Expenses in four categories, per-person shares, over-budget alerts and a simplified settle-up plan (greedy matching, at most n−1 transfers) that members can mark as paid; settlements can be shared as an image.</span><span className="zh">交通、住宿、餐饮、活动四类记账，自动算人均、提醒超预算，并给出简化转账方案（贪心配对，最多 n−1 笔），可标记已转账，结算可生成分享图。</span></p></div>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>Protect the live link over the stack.</b> Kept a static site, one serverless function and one JSON document per trip instead of migrating to Django and Postgres, giving up relational queries and row-level concurrency control.</span><span className="zh"><b>保住线上链接，优先于换技术栈。</b>保留静态站 + 一个 Netlify Function + 每个团一份 JSON 文档，没有迁移到 Django + Postgres；代价是放弃关系查询和行级并发控制。</span></li>
            <li><span className="en"><b>Follow the recommendation only when it is fair.</b> The itinerary uses the recommended window only if it covers at least half the trip, so one member with a two-day window cannot shrink everyone's seven-day plan.</span><span className="zh"><b>推荐要公平才采用。</b>推荐窗口至少覆盖团期一半时才按它排行程，避免一个只有两天空的人把所有人的七天计划压缩掉。</span></li>
            <li><span className="en"><b>Budgets are total caps.</b> The per-destination estimate is local daily cost × days plus a round trip priced from each member's departure city, checked against the same total cap the expense page uses. It is a rough estimate, not live prices.</span><span className="zh"><b>预算是总上限。</b>每个目的地的估算 = 当地日均 × 天数 + 按各成员出发城市估算的往返交通，与费用页使用同一个总预算上限对比；这是粗略估算，不是实时价格。</span></li>
            <li><span className="en"><b>Guard what people edit for minutes.</b> The itinerary has a version check: a stale save gets a 409, and the editor keeps the draft and offers “see latest” or “overwrite with mine”. Since iteration 3 every write is also a compare-and-swap on the stored trip, so simultaneous changes are re-applied instead of lost.</span><span className="zh"><b>对长时间编辑的部分做冲突提示。</b>行程带版本校验：基于旧版本的保存返回 409，草稿保留，并提供“查看最新”或“用我的版本覆盖”。第三轮起所有写入都改为条件写入（比较并交换），同时提交的修改会在最新数据上重放，而不是互相覆盖。</span></li>
            <li><span className="en"><b>A demo that is never empty.</b> A fictional trip creates itself on first visit and anyone can reset it, so visitors can try nearly every feature alone (trip settings and removals are locked on the demo).</span><span className="zh"><b>示例永远不是空的。</b>虚构的示例团在首次访问时自动生成，任何人都能一键重置，一个人打开也能试遍大部分功能（示例团锁定了改团信息和移除成员/目的地）。</span></li>
          </ul>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">Check</span><span className="zh">检查</span></th><th><span className="en">Result</span><span className="zh">结果</span></th></tr></thead>
                <tbody>
                  <tr><td><span className="en">Independent-context review of each code PR (round 1)</span><span className="zh">每个代码 PR 由独立上下文的审查 Agent 复核（第一轮）</span></td><td><span className="en">All 6 reviews found at least one real defect</span><span className="zh">6 次审查每次都发现至少 1 个真实缺陷</span></td></tr>
                  <tr><td><span className="en">Real-browser QA on staging at desktop and 375px (run by agents)</span><span className="zh">预发环境中由 Agent 执行的真实浏览器验收（桌面与 375px 宽度）</span></td><td><span className="en">Found bugs no review or test caught, such as time inputs clipping “PM”</span><span className="zh">找出了评审和测试都没发现的问题，比如时间输入框把“PM”截掉</span></td></tr>
                  <tr><td><span className="en">Concurrency smoke test on staging, against real storage (round 3)</span><span className="zh">预发环境真实存储上的并发冒烟测试（第三轮）</span></td><td><span className="en">Caught 1 of 8 parallel joins silently lost while every request returned 200, which unit tests had missed; fixed, and it now runs on every staging deploy</span><span className="zh">发现 8 个并发加入中有 1 个被悄悄丢失（所有请求都返回 200），单元测试没有发现；已修复，并改为每次预发部署都跑</span></td></tr>
                  <tr><td><span className="en">Production link during round-1 releases</span><span className="zh">第一轮发布期间的线上链接</span></td><td className="win"><span className="en">Returned 200 throughout</span><span className="zh">始终返回 200</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">From the project's iteration reports and PRs. No one check replaced the others.</span><span className="zh">数据来自项目的迭代报告和 PR 记录。几种检查各有用处，谁也替代不了谁。</span></p>
          </div>
          <Reflection title={{ en: 'Possible next steps (not yet planned)', zh: '可能的下一步（尚未立项）' }} items={[
            { en: 'Animate items moving between days.', zh: '跨天移动行程条目时的动画。' },
            { en: 'A built-in QR code on share images.', zh: '分享图内置二维码。' },
            { en: 'Let members edit their own budget and dates.', zh: '成员自行修改预算和可出行日期。' },
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
