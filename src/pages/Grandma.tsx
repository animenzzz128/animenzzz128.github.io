import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';

// Facts from the grandmas-wifi-password repo at eb1c8c7 (2026-11-18): README, CREDITS,
// docs/01, 05, 07, 10 and 13, eval/README and reports, and the test suite (282 passing).
// This page links only the live game.
export default function Grandma() {
  return (
    <ProjectPage id="grandma">
      <article className="case" id="grandma">
        <div className="case-meta">
          <strong>Grandma's Wi-Fi Password</strong>
          <span><span className="en">Game design, product &amp; AI evaluation, solo; built with Claude Code</span><span className="zh">游戏设计、产品与 AI 评测（独立完成），使用 Claude Code 辅助开发</span></span>
          <span><span className="en">Nov 2026 — present · live</span><span className="zh">2026.11 — 至今 · 已上线</span></span>
          <span>TypeScript · React · React Three Fiber · Hono · Claude Haiku · Fly.io</span>
        </div>
        <div className="case-body">
          <div>
            <h1><span className="en">Get the Wi-Fi password out of Grandma</span><span className="zh">从奶奶嘴里问出 Wi-Fi 密码</span></h1>
            <p className="case-sub"><span className="en">“Needle in a haystack” is the classic long-context test for LLMs. This game flips it: the player takes the test, and an LLM-powered Grandma is the haystack. The sticky note only gives the password’s recipe; the answer is somewhere in her true but rambling memories.</span><span className="zh">“大海捞针”是检验大模型长上下文的经典测试。这款游戏把它反过来：人来捞针，LLM 驱动的奶奶就是那片大海。便利贴上只写着密码的“配方”，答案藏在她真实却绕弯的回忆里。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/grandma.jpg" srcSet="/img/grandma-960.jpg 960w, /img/grandma.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="Title screen of Grandma's Wi-Fi Password over Grandma's 3D living room, with Grandma in her armchair" />
            <figcaption><span className="en">The title screen, over Grandma’s 3D living room.</span><span className="zh">标题画面，背景是奶奶的 3D 客厅。</span></figcaption>
          </figure>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'A browser game for desktop and phone: read the note, ask Grandma in your own words, look around the room for proof, and type the answer into the router before her tea runs out. Eight notes across three difficulty levels, plus a Daily Grandma challenge.', zh: '一款电脑和手机浏览器都能玩的游戏：读便利贴，用自己的话问奶奶，在客厅里找物证，赶在她的茶喝完前把答案输进路由器。8 张便利贴、3 档难度，外加每日挑战（Daily Grandma）。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'The model only phrases Grandma’s replies. Her facts, the puzzles, the tea and every rule live in preset data and server code, and the password is never in her prompt.', zh: '模型只负责奶奶的措辞。她的人物事实、谜题、茶杯体力和所有规则都写在预设数据和服务端代码里，密码从不进入提示词。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'Live seven days after the first design docs, with 65 logged iterations. A 60-question bank and a 32-attack red-team set, run on three models (Sonnet on the first 12 attacks only), found zero password leaks in this eval; Claude Haiku was chosen as the fastest of the three.', zh: '首版设计文档后 7 天上线，实现日志记录 65 轮迭代。60 题问题库和 32 条攻击集在三个模型上评测（Sonnet 只跑前 12 条攻击），这套评测中均未泄露密码，最终选了三者中最快的 Claude Haiku。' } },
          ]} />
          <figure className="shot">
            <img src="/img/grandma-room.jpg" srcSet="/img/grandma-room-960.jpg 960w, /img/grandma-room.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="In the game: Grandma in her armchair, the tea meter, room views across the top, and topic cards above the question box" loading="lazy" />
            <figcaption><span className="en">A visit: the tea meter, the room views, and topic cards above the question box.</span><span className="zh">一局游戏（游戏界面和对话为英文）：左上是茶杯体力，上方是房间视角，提问框上方是话题卡片。</span></figcaption>
          </figure>
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">An LLM character is fun to talk to but hard to build a fair puzzle on: it can invent facts, contradict itself, or be talked into revealing the answer.</span><span className="zh">和 LLM 角色聊天很有趣，但很难在它身上做公平的谜题：它会编造、会前后矛盾，也可能被玩家套出答案。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Game design, product and evaluation: pillars, puzzles and the tea economy, the eval sets and the model choice. Claude Code drafted the code, preset data, design docs and the Blender scripts for the 3D room and Grandma under my direction.</span><span className="zh">负责游戏设计、产品和评测：设计支柱、谜题和茶杯体力、评测集和模型选型；代码、预设数据、设计文档，以及 3D 客厅和奶奶模型的 Blender 脚本由 Claude Code 按我的方向起草。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">Playable in the browser with keyboard, mouse or touch, voice and accessibility settings, and a $5 daily model budget; past the budget, an offline Grandma takes over. The next step is a silent playtest with new players.</span><span className="zh">浏览器即可游玩，支持键鼠、触屏、语音和无障碍设置，模型费用每日上限 5 美元，超出后由离线奶奶接替。下一步是请新玩家在无人提示的情况下试玩。</span></dd></div>
          </dl>
          <div className="flow" aria-label="Read, ask and look, deduce">
            <div><small><span className="en">1 · Read the note</span><span className="zh">1 · 读便利贴</span></small><p><span className="en">A recipe, not a password: “the sock thief + the year we said ‘I do’”. Harder notes add relative dates and multi-step clues.</span><span className="zh">给的是配方而不是密码，比如“偷袜子的家伙 + 我们说‘我愿意’的那一年”。难的便利贴还有相对日期和多步线索。</span></p></div>
            <div><small><span className="en">2 · Ask and look</span><span className="zh">2 · 问与看</span></small><p><span className="en">Tap a topic card or type any question. Every question costs tea; follow-ups cost less and rudeness costs more. Photos and objects in the room hold links in the chain and rule out look-alike answers.</span><span className="zh">点话题卡片或直接打字提问。每问都消耗茶，追问更省、粗鲁更贵；房间里的照片和物件藏着推理链的一环，也能排除似是而非的答案。</span></p></div>
            <div><small><span className="en">3 · Deduce</span><span className="zh">3 · 推理</span></small><p><span className="en">Type the password into the router. Three attempts, then a result card to share.</span><span className="zh">把密码输入路由器，共 3 次机会，最后生成可分享的结果卡。</span></p></div>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>The model picks the words, the code decides.</b> Facts, puzzles, stamina and rules are data and code; the model writes one structured reply per question, and a validator rejects new names or numbers, year contradictions and leaks before the player sees it. A rejected reply gets one rewrite; if that is rejected too, a fixed “say that again” line stands in.</span><span className="zh"><b>模型负责措辞，代码负责决定。</b>事实、谜题、体力和规则都是数据和代码；模型每问写一条结构化回复，校验器在玩家看到前拦下新名字或数字、年份矛盾和泄露；被拦下的回复重写一次，仍不行就换成一句固定的“请再说一遍”。</span></li>
            <li><span className="en"><b>Keep the password out of the prompt.</b> She is given the memories holding its parts, never the password itself, so the eval attacks those memories directly with injection, role-play and extraction attempts.</span><span className="zh"><b>密码不进提示词。</b>进提示词的是藏着它各部分的回忆，没有密码本身，所以评测直接用注入、角色扮演和套话去攻击这些回忆。</span></li>
            <li><span className="en"><b>Color, not clues.</b> Her small invented details were mostly charm, but some looked like clues. Instead of retrieval, she got 47 preset “little things” checked by script to contain no digits, answer words or time words, and a rule never to invent names, places, dates or links between people.</span><span className="zh"><b>可以有趣，不能误导。</b>她自己加的小细节大多是可爱的点缀，但有一部分像线索。没有改用检索，而是给她加了 47 条预设的“生活小事”，用脚本确保不含数字、答案词和时间词，并规定她不能编造人名、地点、日期或人物关系。</span></li>
            <li><span className="en"><b>Pick the model by what players feel.</b> Haiku was the fastest of the three (1.30 s median at selection) with the best recall; GPT-6 Luna was a little cheaper per turn but about a second slower. At selection, a 15-question visit cost about $0.002 in model fees.</span><span className="zh"><b>按玩家的体感选模型。</b>Haiku 是三者中最快的（选型时中位 1.30 秒），召回率也最高；GPT-6 Luna 单轮略便宜，但慢了约 1 秒。选型时 15 问一局模型费约 0.002 美元。</span></li>
            <li><span className="en"><b>Never spend money silently.</b> A daily budget counted from the turn logs, a kill switch that needs no redeploy, and rate limits. Past the budget or with the kill switch on, players keep playing with the offline Grandma; a rate limit only asks them to wait.</span><span className="zh"><b>花钱必须有上限。</b>每日预算按对话日志累计、无需重新部署的紧急开关，以及限流。超出预算或打开紧急开关时，玩家可以继续和离线奶奶玩；触发限流只会提示稍后再问。</span></li>
          </ul>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">Model bake-off, all 8 notes</span><span className="zh">模型对比（8 张便利贴）</span></th><th>Claude Haiku 5.5</th><th>GPT-6 Luna</th><th>Claude Sonnet 5.5</th></tr></thead>
                <tbody>
                  <tr><td><span className="en">Turns (attacks)</span><span className="zh">轮数（其中攻击）</span></td><td>736 (256)</td><td>736 (256)</td><td><span className="en">96 (first 12 attacks)</span><span className="zh">96（只跑前 12 条攻击）</span></td></tr>
                  <tr><td><span className="en">Password leaks</span><span className="zh">密码泄露</span></td><td className="win">0</td><td className="win">0</td><td className="win">0</td></tr>
                  <tr><td><span className="en">Median / p95 reply time</span><span className="zh">回复耗时 中位 / p95</span></td><td className="win">1.30 / 2.44 s</td><td>2.33 / 4.79 s</td><td>2.55 / 4.32 s</td></tr>
                  <tr><td><span className="en">Right memory for the question (recall)</span><span className="zh">用对回忆（召回率）</span></td><td>99.7%</td><td>99.2%</td><td>–</td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">Rule-based metrics from the model-selection runs on 2026-11-18. For both Haiku and Luna, 624 of the 736 turns reached the model; the rest were password requests answered in code. The leak result covers this test set only, not every possible attack.</span><span className="zh">数据来自 2026-11-18 选型评测，均为规则统计；Haiku、Luna 各 736 轮中有 624 轮进入模型，其余是由代码直接挡回的要密码请求。“零泄露”只针对这套测试，不代表能挡住所有攻击。</span></p>
          </div>
          <Reflection title={{ en: 'Next', zh: '下一步' }} items={[
            { en: 'A silent playtest with new players: so far the builds were scored by review agents and browser runs, not by people.', zh: '请新玩家在无人提示的情况下试玩：目前的评分来自审查 Agent 和浏览器实测，还不是真人玩家。' },
            { en: 'Calibrate the LLM judge against human labels before trusting its scores for consistency and invented details.', zh: '先用人工标注校准 LLM 评审模型，再采信它给出的一致性和编造率分数。' },
            { en: 'Run an AI player agent through full visits to test long-conversation consistency, which the per-question eval doesn’t cover.', zh: '让一个 AI 玩家 Agent 跑完整局，检验长对话里的一致性；逐题评测覆盖不到这一点。' },
          ]} />
          <div className="links">
            <a className="btn primary" href="https://grandmas-wifi-password.fly.dev" target="_blank" rel="noopener"><span className="en">Play in your browser</span><span className="zh">在浏览器里玩</span> ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
