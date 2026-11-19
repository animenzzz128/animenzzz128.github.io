import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';

// Facts from the level-0-survive repo at 47faf00 plus the Pages deploy (PR #3), 2026-11-18: src/game,
// the PR #1/#2 descriptions and git history; tsc and build, all 10,000 seeds generated headlessly,
// headless entity and director runs, and a headless-Chrome start on the live page.
// The setting and most entity names come from the Backrooms community wikis (CC BY-SA); say so, never "original world".
export default function Level0() {
  return (
    <ProjectPage id="level0">
      <article className="case" id="level0">
        <div className="case-meta">
          <strong>Level 0: Threshold</strong>
          <span><span className="en">Gameplay direction &amp; acceptance, solo; built with Google AI Studio and Claude Code</span><span className="zh">玩法方向与验收（独立完成），使用 Google AI Studio 和 Claude Code 开发</span></span>
          <span><span className="en">Nov 2026 · live</span><span className="zh">2026.11 · 已上线</span></span>
          <span>TypeScript · React · three.js · Web Audio · GitHub Pages</span>
        </div>
        <div className="case-body">
          <div>
            <h1><span className="en">Every tape you take wakes the Backrooms a little more</span><span className="zh">每拿到一盘录像带，后室就醒来一点</span></h1>
            <p className="case-sub"><span className="en">A first-person survival-horror shooter set in the Backrooms’ Level 0, the endless yellow office from internet folklore. It runs in a desktop browser, and every texture, model and sound in it is generated in code.</span><span className="zh">一款第一人称生存恐怖射击游戏，场景是网络怪谈“后室”里无尽的黄色办公室 Level 0。它在电脑浏览器里运行，所有贴图、模型和声音都由代码生成。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/level0.jpg" srcSet="/img/level0-960.jpg 960w, /img/level0.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="Level 0 title screen over a long yellow corridor with a fluorescent light" />
            <figcaption><span className="en">The title screen, over a live 3D corridor.</span><span className="zh">标题画面，背景是实时渲染的 3D 走廊（游戏界面为英文）。</span></figcaption>
          </figure>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'A browser game for keyboard and mouse: search a seeded maze for four VHS tapes, then reach the exit, with scarce ammo, a flashlight that never recharges and three entities that each need a different answer.', zh: '一款键鼠操作的浏览器游戏：在按种子生成的迷宫里找齐四盘录像带，再走到出口；弹药稀缺、手电电池不回充，三类敌人各要用不同办法对付。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'Make each enemy a different problem, not a bigger health bar: one hunts by sound, one ignores bullets and fears light, one hides as a supply pickup.', zh: '让每种敌人成为不同的难题，而不是更厚的血条：一个靠声音追踪，一个不怕子弹只怕光，一个伪装成补给。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'Live on GitHub Pages since 18 Nov 2026. Google AI Studio produced the first version; two Claude Code pull requests added the stealth and survival systems and fixed its bugs. Generating all 10,000 seeds found every pickup and the exit reachable.', zh: '2026-11-18 上线 GitHub Pages。初版由 Google AI Studio 生成，之后两个 Claude Code PR 加入了潜行与生存系统并修复问题；批量生成全部 1 万个种子，补给和出口全部可达。' } },
          ]} />
          <figure className="shot">
            <img src="/img/level0-smiler.jpg" srcSet="/img/level0-smiler-960.jpg 960w, /img/level0-smiler.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="1080" alt="A grinning black figure, the Smiler, stands at the end of a yellow office corridor; HUD shows tapes 0 of 4, vitality, stamina, light and ammo" loading="lazy" />
            <figcaption><span className="en">A Smiler: bullets do nothing; hold the flashlight on it to banish it.</span><span className="zh">Smiler：子弹无效，要用手电持续照射才能驱散。</span></figcaption>
          </figure>
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">In the AI-generated first version, enemies went straight from patrol to chase (on sight, within 7.5 m or after a gunshot within 26 m); there was no crouching, hiding or doors; ammo was plentiful (60 in reserve plus six +24 crates) and the flashlight recharged on its own.</span><span className="zh">AI 生成的初版里，敌人只会从巡逻直接转为追击（看见玩家、进入 7.5 米内或 26 米内响起枪声）；没有蹲伏、躲藏和门；弹药充足（备弹 60 发，另有 6 箱各 +24），手电还会自己回电。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Gameplay direction and acceptance. Google AI Studio generated the first version; Claude Code wrote the three follow-up pull requests (two gameplay, one GitHub Pages deploy) under my direction.</span><span className="zh">负责玩法方向与验收。初版由 Google AI Studio 生成，后续 3 个 PR（两个玩法 PR、一个 GitHub Pages 部署 PR）由 Claude Code 按我的方向编写。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">Live, and redeployed by GitHub Actions on every push to main. No player testing yet: behavior was checked with debug scripts and headless simulations, not people.</span><span className="zh">已上线，每次推送到 main 由 GitHub Actions 自动重新部署。还没有真人试玩：行为检查用的是调试脚本和无界面模拟，不是玩家。</span></dd></div>
          </dl>
          <div className="flow" aria-label="Search, survive, escape">
            <div><small><span className="en">1 · Search</span><span className="zh">1 · 搜寻</span></small><p><span className="en">A seeded 23×23 maze with open office halls; four tapes sit on tables.</span><span className="zh">按种子生成的 23×23 迷宫，带开放的办公大厅；四盘录像带放在桌上。</span></p></div>
            <div><small><span className="en">2 · Survive</span><span className="zh">2 · 求生</span></small><p><span className="en">Each tape makes some lights flicker or die, spawns an entity and deepens the drone; the fourth alerts every entity within hearing.</span><span className="zh">每拿一盘，部分灯光闪烁或熄灭、刷出一个实体、低频声加重；第四盘会惊动所有能听见的实体。</span></p></div>
            <div><small><span className="en">3 · Escape</span><span className="zh">3 · 逃出</span></small><p><span className="en">With all four, the exit beacon turns green; reach the door to win.</span><span className="zh">集齐四盘后出口信标变绿，走到门口即获胜。</span></p></div>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>Three entities, three answers.</b> The Howler is nearly blind but hears 1.6× the normal range, so a gunshot reaches it from about 42 m, and it charges any sound within 10 m; the Smiler ignores bullets and is banished by 1.6 s of flashlight; the Skin-Stealer looks like an Almond Water bottle until you are close.</span><span className="zh"><b>三种敌人，三种解法。</b>Howler 几乎失明，但听觉范围是常规的 1.6 倍：约 42 米外就能听见枪声，10 米内有动静会直接扑过来；Smiler 不怕子弹，用手电照 1.6 秒才能驱散；Skin-Stealer 伪装成杏仁水，走近才现形。</span></li>
            <li><span className="en"><b>Perception, not just pursuit.</b> Entities move between nine states (patrol, investigate, chase, search and more), follow you to your last known spot and give up after a search; closed doors block their sight and paths until they batter through.</span><span className="zh"><b>会“感知”，不只是追。</b>敌人在巡逻、调查、追击、搜索等九种状态间切换，会追到你最后出现的位置并搜索一阵；关上的门挡住视线和寻路，直到被撞开。</span></li>
            <li><span className="en"><b>Scarcity makes the choices.</b> Batteries never recharge, ammo is limited and killed entities return out of sight, so crouching past, closing a door or hiding under a desk is often better than shooting.</span><span className="zh"><b>稀缺才有取舍。</b>电池不回充、弹药有限，被消灭的敌人还会在视线外重生，所以蹲着绕过、关门或躲到桌下，常常比开枪更好。</span></li>
            <li><span className="en"><b>Sound is information.</b> Every entity has its own 3D voice that is muffled through walls, so you can hear where a threat is before you see it.</span><span className="zh"><b>声音就是信息。</b>每个实体都有自己的 3D 声源，隔墙会变闷，看到之前就能听出威胁在哪儿。</span></li>
          </ul>
          <figure className="shot">
            <img src="/img/level0-tape.jpg" srcSet="/img/level0-tape-960.jpg 960w, /img/level0-tape.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="1080" alt="A VHS tape on a small table in an open office hall with pillars and a traffic cone" loading="lazy" />
            <figcaption><span className="en">A tape on its table in one of the open halls.</span><span className="zh">开放大厅里放着录像带的桌子。</span></figcaption>
          </figure>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">Check</span><span className="zh">检查</span></th><th><span className="en">Result</span><span className="zh">结果</span></th></tr></thead>
                <tbody>
                  <tr><td><span className="en">Generate all 10,000 seeds headlessly</span><span className="zh">无界面批量生成全部 1 万个种子</span></td><td className="win"><span className="en">Every pickup and the exit reachable in every level</span><span className="zh">每一关的补给和出口都可达</span></td></tr>
                  <tr><td><span className="en">Entity and director simulation</span><span className="zh">敌人与威胁导演模拟</span></td><td><span className="en">Each counter works as designed; the four-tape escalation runs in order</span><span className="zh">每种克制方式按设计生效，四盘录像带的升级按顺序触发</span></td></tr>
                  <tr><td><span className="en">Players</span><span className="zh">玩家</span></td><td><span className="en">Not yet: no human playtest so far</span><span className="zh">还没有：目前没有真人试玩</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">Checks run on 2026-11-18. The repository has no automated tests yet.</span><span className="zh">检查于 2026-11-18 进行。仓库目前还没有自动化测试。</span></p>
          </div>
          <Reflection title={{ en: 'Next', zh: '下一步' }} items={[
            { en: 'A silent playtest with new players, to tune scarcity and the escalation by feel, not by script.', zh: '请新玩家在无人提示的情况下试玩，按真实手感而不是脚本来调稀缺度和升级节奏。' },
            { en: 'Keep the debug tools out of the public build.', zh: '把调试工具从公开版本里拿掉。' },
            { en: 'Credit the Backrooms community wikis, where the setting and most of the entity names come from, inside the game.', zh: '在游戏里注明后室设定和多数实体名称来自后室社区维基。' },
          ]} />
          <div className="links">
            <a className="btn primary" href="https://animenzzz128.github.io/level-0-survive/" target="_blank" rel="noopener"><span className="en">Play in the browser</span><span className="zh">在线试玩</span> ↗</a>
            <a href="https://github.com/animenzzz128/level-0-survive" target="_blank" rel="noopener">GitHub ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
