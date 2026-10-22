import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="hero-band">
      <div className="wrap">
        <div className="hero">
          <div>
            <div className="eyebrow"><span className="en">Yale SOM · MMS ’27 · Management Science (STEM)</span><span className="zh">耶鲁大学管理学院 · 管理学硕士 2027 届（STEM）</span></div>
            <h1>Jiaqi (Jacky) Yao</h1>
            <p className="cn-name">姚嘉骐</p>
            <p className="thesis">
              <span className="en">I turn messy problems into decisions you can <mark className="hl" style={{ '--d': '.35s' } as CSSProperties}>check</mark>.</span>
              <span className="zh">我把复杂的问题，变成<mark className="hl" style={{ '--d': '.35s' } as CSSProperties}>可以被核验</mark>的决策。</span>
            </p>
            <ul className="chips" aria-label="Focus areas">
              <li><span className="en">Strategy &amp; operations</span><span className="zh">策略与运营</span></li>
              <li><span className="en">Data &amp; analytics</span><span className="zh">数据分析</span></li>
              <li><span className="en">AI products</span><span className="zh">AI 产品</span></li>
              <li><span className="en">English · 中文 · 日本語</span><span className="zh">中文 · English · 日本語</span></li>
            </ul>
            <div className="actions">
              <a className="btn primary" href="#contact"><span className="en">Contact me</span><span className="zh">联系我</span></a>
              <span className="en"><a className="btn" href="/resume/Jiaqi_Yao_Resume_EN.pdf" target="_blank" rel="noopener">Résumé (PDF)</a></span><span className="zh"><a className="btn" href="/resume/Jiaqi_Yao_Resume_CN.pdf" target="_blank" rel="noopener">简历 PDF</a></span>
              <a className="btn" href="https://www.linkedin.com/in/jiaqi-jacky-yao-94188b25a/" target="_blank" rel="noopener">LinkedIn ↗</a>
              <a className="btn" href="https://github.com/animenzzz128" target="_blank" rel="noopener">GitHub ↗</a>
            </div>
          </div>
          <aside className="now" aria-label="Snapshot">
            <div className="now-status"><span className="dot" aria-hidden="true"></span><span className="en">Open to full-time roles</span><span className="zh">正在寻找全职机会</span></div>
            <dl>
              <div><dt><span className="en">Graduating</span><span className="zh">毕业</span></dt><dd><span className="en">June 2027 · Yale SOM (STEM)</span><span className="zh">2027 年 6 月 · 耶鲁管理学院（STEM）</span></dd></div>
              <div><dt><span className="en">Location</span><span className="zh">地点</span></dt><dd><span className="en">New Haven, CT · open to North America &amp; China</span><span className="zh">美国纽黑文 · 北美与国内均可</span></dd></div>
              <div><dt><span className="en">Building</span><span className="zh">在做</span></dt><dd><span className="en"><Link to="/projects/dayweave">Dayweave</Link> v1.5.5, an AI daily planner<br /><Link to="/projects/toutoule">TouTouLe</Link> v0.2, an AI job-triage agent</span><span className="zh"><Link to="/projects/dayweave">Dayweave</Link> v1.5.5，AI 日程助手<br /><Link to="/projects/toutoule">投投乐</Link> v0.2，AI 求职筛选 Agent</span></dd></div>
            </dl>
            <div className="now-nums">
              <div><b>+1.5pp</b><span className="en">MBP GMV penetration, TikTok Shop</span><span className="zh">TikTok Shop MBP GMV 渗透率</span></div>
              <div><b>5,000+</b><span className="en">merchants &amp; creators, 6 markets</span><span className="zh">商家与达人，覆盖六国</span></div>
              <div><b>−60%</b><span className="en">AI hallucinations vs. baseline</span><span className="zh">AI 幻觉较基线下降</span></div>
            </div>
          </aside>
        </div>
        <div className="creds" aria-label="Organizations">
          <span className="eyebrow"><span className="en">Worked &amp; studied at</span><span className="zh">工作与学习经历</span></span>
          <b>Yale SOM</b><b>TikTok Shop</b><b>Deloitte</b><b>IQVIA</b><b>Duke</b><b>UBC</b><b>Peking University</b>
        </div>
      </div>
    </div>
  );
}
