import ProjectPage from '../components/ProjectPage';

export default function TouTouLe() {
  return (
    <ProjectPage id="toutoule">
      <article className="case" id="toutoule">
        <div className="case-meta">
          <strong>投投乐 TouTouLe</strong>
          <span><span className="en">Founder &amp; product owner, solo</span><span className="zh">发起人兼产品负责人（独立完成）</span></span>
          <span>2026.09 —</span>
          <span>Python · Claude API · Pydantic · Streamlit · SQLite</span>
        </div>
        <div className="case-body">
          <div>
            <h3><span className="en">An AI agent that triages job postings with evidence</span><span className="zh">带证据的招聘信息筛选 AI Agent</span></h3>
            <p className="case-sub"><span className="en">A scheduled prompt gives you a summary you have to trust. TouTouLe gives you a decision record you can verify, with a measured error rate on the fields where an error costs an opportunity.</span><span className="zh">定时提示词只能给你一份需要信任的摘要；投投乐给你一份可以核验的决策记录，并且在“出错就会错失机会”的字段上有实测错误率。</span></p>
          </div>
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">Each posting took 15–20 minutes to check eligibility, application caps, deadline and required materials, and mistakes landed where they cost most.</span><span className="zh">每条 JD 要花 15–20 分钟核对资格、投递上限、截止日期和材料要求，而最容易出错的恰好是代价最高的地方。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Everything: PRD, decision log, eval design, labeling, code, deployment.</span><span className="zh">全部独立完成：PRD、决策日志、评测设计、标注、开发和上线。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">v0.1.0 live. Critical hallucinations down 60–70% vs. baseline; critical misses held under 10%.</span><span className="zh">v0.1.0 已上线。关键字段幻觉较基线下降 60–70%，关键字段漏检控制在 10% 以内。</span></dd></div>
          </dl>
          <div className="split">
            <ul className="decisions">
              <li><span className="en"><b>Evidence or nothing.</b> Every extracted value carries a verbatim quote, and code checks it against the posting. A field that fails becomes “Not stated”.</span><span className="zh"><b>没有证据就不算数。</b>每个抽取值都附原文引用，由代码逐字比对原文；校验失败的字段直接记为“未说明”。</span></li>
              <li><span className="en"><b>Rules decide eligibility, not the model.</b> Six deterministic rules flag visa, graduation window, degree, deadline and cap problems.</span><span className="zh"><b>资格由规则判断，而不是模型。</b>六条确定性规则检查签证、毕业时间、学位、截止日期和投递上限。</span></li>
              <li><span className="en"><b>Evals tiered by the cost of an error.</b> 50 labeled postings, 3 iterations, and a written hypothesis before each run.</span><span className="zh"><b>按错误代价分层评测。</b>50 条标注 JD，3 轮迭代，每轮先写下假设再运行。</span></li>
              <li><span className="en"><b>Say what it doesn’t do.</b> The README lists the targets it missed and why.</span><span className="zh"><b>写清楚它做不到什么。</b>README 列出了没达标的指标和原因。</span></li>
            </ul>
            <aside className="proof" aria-label="Example of TouTouLe extracting fields with evidence">
              <div className="proof-head"><span>toutoule · extract</span><span>v0.1.0</span></div>
              <p className="jd">“…Candidates must <mark className="hl">graduate between Dec 2026 and Aug 2027</mark>. <mark className="hl">Each candidate may apply to at most 2 positions</mark>. Applications close <mark className="hl">November 15, 2026</mark>…”</p>
              <ul className="fields">
                <li><span className="k">grad_window</span><span>2026-12 → 2027-08</span><span className="tag ok">quote ✓</span></li>
                <li><span className="k">application_cap</span><span>2</span><span className="tag ok">quote ✓</span></li>
                <li><span className="k">deadline</span><span>2026-11-15</span><span className="tag ok">quote ✓</span></li>
                <li><span className="k">visa_sponsorship</span><span>Not stated</span><span className="tag na">no quote</span></li>
              </ul>
              <p className="proof-foot"><span className="en">Illustrative posting. Every value must quote the source, and code checks the quote word for word.</span><span className="zh">示意 JD。每个字段都必须引用原文，并由代码逐字校验。</span></p>
            </aside>
          </div>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">Metric (50 postings)</span><span className="zh">指标（50 条 JD）</span></th><th><span className="en">Target</span><span className="zh">目标</span></th><th><span className="en">Plain prompt</span><span className="zh">普通提示词</span></th><th><span className="en">Shipped v4</span><span className="zh">上线版 v4</span></th></tr></thead>
                <tbody>
                  <tr><td><span className="en">Critical hallucination</span><span className="zh">关键字段幻觉</span></td><td>0 / 249</td><td>20 / 249</td><td className="win">6–8 / 249</td></tr>
                  <tr><td><span className="en">Critical false negative</span><span className="zh">关键字段漏检</span></td><td>≤ 10%</td><td>5 / 67</td><td className="win">5–6 / 67 ✓</td></tr>
                  <tr><td><span className="en">Critical accuracy</span><span className="zh">关键字段准确率</span></td><td>≥ 95%</td><td>94.7%</td><td>88.7–94.7%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">Ranges are the derived and fresh v4 runs. Prompts were tuned on the same 50 postings, so there is no held-out set yet.</span><span className="zh">区间为 v4 的两次运行结果。提示词是在同一批 50 条 JD 上调的，目前还没有独立测试集。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/toutoule.png" width="2560" height="1270" alt="TouTouLe triage form, with a sidebar showing the sample profile in use" loading="lazy" />
            <figcaption><span className="en">The live demo runs on a redacted sample profile. Next in v0.2: a daily watch of about 30 career sites that skips unchanged pages by content hash.</span><span className="zh">在线 Demo 使用脱敏的示例简历。v0.2 正在开发：每天巡检约 30 个招聘官网，按内容哈希跳过未变化的页面。</span></figcaption>
          </figure>
          <div className="links">
            <a href="https://toutoule-uz7gtw3pxwffgea8l8mgwq.streamlit.app/" target="_blank" rel="noopener"><span className="en">Live demo</span><span className="zh">在线 Demo</span> ↗</a>
            <a href="https://github.com/animenzzz128/toutoule" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="https://github.com/animenzzz128/toutoule/blob/main/docs/01_PRD.md" target="_blank" rel="noopener">PRD ↗</a>
            <a href="https://github.com/animenzzz128/toutoule/blob/main/docs/06_DECISION_LOG.md" target="_blank" rel="noopener"><span className="en">Decision log</span><span className="zh">决策日志</span> ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
