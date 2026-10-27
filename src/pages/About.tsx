import Timeline from '../components/Timeline';

export default function About() {
  return (
    <div className="wrap page">
      <section id="about">
        <div className="about">
          <div className="eyebrow"><span className="en">About</span><span className="zh">关于我</span></div>
          <div>
            <h2><span className="en">I start from the cost of being wrong</span><span className="zh">我习惯先想清楚“错了代价是什么”</span></h2>
            <p><span className="en">My background spans economics, consulting, strategy and operations. Across all of it I learned that a confident number is worth little until you know how it was made, and which mistakes would actually cost something.</span><span className="zh">我的背景横跨经济学、咨询、策略和运营。这些经历让我明白，一个看起来很确定的数字，在你知道它怎么来的、错了会付出什么代价之前，没什么价值。</span></p>
            <p><span className="en">That shapes how I work, whether I am sizing a market, running a campaign or building with AI: get to the decision fast, show the evidence behind it, and say plainly what is still uncertain.</span><span className="zh">无论是做市场分析、推进大促，还是用 AI 做产品，我的方式都一样：尽快推到决策，把背后的证据摆出来，并坦白说明哪些地方还不确定。</span></p>
            <p><span className="en">Outside work I sing and play keys in a band, and I travel whenever I can.</span><span className="zh">工作之外，我在乐队里唱歌、弹键盘，有机会就去旅行。</span></p>
          </div>
        </div>
      </section>
      <Timeline />
      <section id="life">
        <div className="sec-head">
          <div className="eyebrow"><span className="en">Off the clock</span><span className="zh">工作之外</span></div>
          <h2><span className="en">Stages, offices and one volcano</span><span className="zh">舞台、办公室，还有一座火山</span></h2>
        </div>
        <div className="film">
          <figure><img src="/img/stage.jpg" width="801" height="1200" alt="Jacky singing on stage with a band, a Korg keyboard in front" loading="lazy" /><figcaption><span className="en">On stage with my band</span><span className="zh">和乐队一起演出</span></figcaption></figure>
          <figure><img src="/img/tiktok.jpg" width="900" height="1200" alt="Jacky in front of the TikTok logo wall at the office" loading="lazy" /><figcaption><span className="en">TikTok Shop, Shanghai · 2025</span><span className="zh">TikTok Shop 上海 · 2025</span></figcaption></figure>
          <figure><img src="/img/volcano.jpg" width="900" height="1200" alt="Jacky sitting on the rim of Mount Bromo’s smoking crater in Indonesia" loading="lazy" /><figcaption><span className="en">Mount Bromo, Indonesia</span><span className="zh">印尼 Bromo 火山</span></figcaption></figure>
          <figure><img src="/img/pku.jpg" width="1200" height="900" alt="Jacky presenting a strategy deck at Peking University Guanghua School of Management" loading="lazy" /><figcaption><span className="en">Presenting at PKU Guanghua · 2026</span><span className="zh">北大光华汇报 · 2026</span></figcaption></figure>
          <figure><img src="/img/yale.jpg" width="900" height="1200" alt="Jacky at the Yale School of Management 50th anniversary backdrop" loading="lazy" /><figcaption><span className="en">Yale SOM · 2026</span><span className="zh">耶鲁管理学院 · 2026</span></figcaption></figure>
        </div>
      </section>
    </div>
  );
}
