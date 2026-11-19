import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';
import { WORKS } from '../projects';

// Facts from the spire-of-ashes repo: main 98c8894 for the game and the bot simulator, plus the rename (PR #3,
// original names, mechanics and numbers unchanged) and the revert of a partial AI Studio push (PR #4), 2026-11-18.
// lint, engine checks, sim:check (2,000 runs per class) and build re-run; live at /spire-of-ashes/. Bot win rates are
// for relative comparison only (not player data; no human playtest). The game is an openly labeled Slay the
// Spire-style genre exercise: keep that credit, and never call the design or IP original.
export default function Spire() {
  // Demo and repo links live on the WORKS entry, so they change in one place.
  const spire = WORKS.find((p) => p.id === 'spire');
  return (
    <ProjectPage id="spire">
      <article className="case" id="spire">
        <div className="case-meta">
          <strong>烬塔 Spire of Ashes</strong>
          <span><span className="en">Gameplay &amp; balance direction, solo; built with Google AI Studio and Claude Code</span><span className="zh">玩法与数值方向（独立完成），使用 Google AI Studio 和 Claude Code 开发</span></span>
          <span><span className="en">Nov 2026</span><span className="zh">2026.11</span></span>
          <span>TypeScript · React · Vite · Tailwind · GitHub Actions</span>
        </div>
        <div className="case-body">
          <div>
            <h1><span className="en">Tuning a deckbuilder with 4,000 simulated runs</span><span className="zh">用 4,000 局模拟对局给卡牌游戏调数值</span></h1>
            <p className="case-sub"><span className="en">A browser roguelike deckbuilder made as an openly labeled Slay the Spire–style genre exercise: the two starting decks and relics, most card numbers and mechanics, and the Act 1 elite line-up follow Slay the Spire (names changed to original ones). Climb a 15-floor branching spire, read what enemies are about to do, and build a deck that can beat the boss. After the first version, most of the work went into balance, measured by a bot that plays full runs on the real game engine.</span><span className="zh">一款公开标注的《杀戮尖塔》同类玩法练习（浏览器 Roguelike 卡牌构筑）：两个职业的初始牌组和遗物、大部分卡牌数值与机制以及第一幕精英组合都沿用原作（名称已改为原创）。沿 15 层分支高塔向上，看清敌人下一步要做什么，构筑一套能打倒首领的牌组。初版之后，大部分工作花在数值平衡上，用一个在真实游戏引擎上跑完整局的机器人来衡量。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/spire.jpg" srcSet="/img/spire-960.jpg 960w, /img/spire.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="A turn-based card battle: the armored hero on the left, a green slime enemy showing its next attack on the right, and five cards in hand" />
            <figcaption><span className="en">A first-floor fight: the enemy shows its next move above its head.</span><span className="zh">第一层的一场战斗：敌人头顶显示下一步行动。</span></figcaption>
          </figure>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'Two classes, 52 cards, 14 relics, 7 potions, 10 enemy types and three ascension levels on a 15-floor map with shops, rest sites and events, in Chinese and English.', zh: '2 个职业、52 张卡、14 件遗物、7 种药水、10 种敌人和 3 档进阶，15 层地图上有商店、营火和事件，中英文切换。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'Tune with a simulator, not by feel alone: a bot plays 2,000 full runs per class on the real engine, and CI fails the build if win rates leave the target band.', zh: '不只凭手感调数值：机器人在真实引擎上每个职业跑 2,000 局完整对局，胜率超出目标区间时 CI 直接报错。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'At the base difficulty, the bot’s win rate went from about 2% to 12% for one class and from about 8–10% to 17% for the other. These are bot numbers for comparing classes and encounters, not player data.', zh: '在基础难度下，机器人胜率一个职业从约 2% 提到 12%，另一个从约 8–10% 提到 17%。这是机器人数据，用来比较职业和遭遇，不是玩家数据。' } },
          ]} />
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">The AI-generated first version was almost unwinnable for one class: the bot won about 2% of its runs.</span><span className="zh">AI 生成的初版对其中一个职业几乎打不赢：机器人只赢下约 2% 的对局。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Gameplay and balance direction and acceptance. Google AI Studio generated the first version, largely following Slay the Spire's Act 1 cards, relics and enemies, plus the art; Claude Code wrote the fixes, the renaming, the simulator and CI under my direction.</span><span className="zh">负责玩法与数值方向和验收。初版由 Google AI Studio 生成，卡牌、遗物和敌人大体沿用《杀戮尖塔》第一幕，美术也由它生成；修复、改名、模拟器和 CI 由 Claude Code 按我的方向编写。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">Both classes now sit inside the target win-rate band at the base difficulty, checked by CI on every pull request and every push to main. No human playtest yet.</span><span className="zh">两个职业在基础难度下的胜率都落在目标区间内，CI 在每个 PR 和每次推送到 main 时都会检查。还没有真人试玩。</span></dd></div>
          </dl>
          <div>
            <div className="table-scroll">
              <table>
                <thead><tr><th><span className="en">Bot, base difficulty, 2,000 runs per class</span><span className="zh">机器人，基础难度，每职业 2,000 局</span></th><th><span className="en">Before</span><span className="zh">调整前</span></th><th><span className="en">After</span><span className="zh">调整后</span></th></tr></thead>
                <tbody>
                  <tr><td><span className="en">Win rate, armored class</span><span className="zh">胜率：重甲职业</span></td><td>≈ 2%</td><td className="win">≈ 12%</td></tr>
                  <tr><td><span className="en">Win rate, poison class</span><span className="zh">胜率：剧毒职业</span></td><td>≈ 8–10%</td><td className="win">≈ 17%</td></tr>
                  <tr><td><span className="en">Boss win rate, once reached</span><span className="zh">打到首领后的胜率</span></td><td>8.5–10% / 22–27%</td><td className="win">24–27% / 36–40%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption"><span className="en">Ranges come from repeated runs of the same bot; win rates move by about ±1.5 points between runs. The bot follows simple fixed rules, and how its results compare with real players has not been tested.</span><span className="zh">区间来自同一个机器人的多次运行，胜率在不同运行之间约有 ±1.5 个百分点波动。机器人按简单的固定规则出牌，它的结果和真人玩家差多少还没有测过。</span></p>
          </div>
          <ul className="decisions">
            <li><span className="en"><b>Measure where runs die.</b> The simulator reports win rate, the floor each run ended on, HP lost per encounter and the boss win rate, so changes target the fights that actually kill runs.</span><span className="zh"><b>先看清死在哪儿。</b>模拟器统计胜率、每局死在第几层、每场遭遇战掉多少血和首领胜率，调整只针对真正“杀死”对局的战斗。</span></li>
            <li><span className="en"><b>Ramp the encounters, then the numbers.</b> Early floors got a four-tier encounter ramp; starting from the inherited numbers, elite and boss HP, card values, reward rarity and a rare-card pity timer were retuned against the simulator.</span><span className="zh"><b>先调遭遇节奏，再调数值。</b>前几层改成四档递进的遭遇梯度；在沿用的原始数值基础上，精英和首领血量、卡牌数值、奖励稀有度和稀有卡保底都对着模拟器重调。</span></li>
            <li><span className="en"><b>Guardrails in CI.</b> Typecheck, engine checks, the balance band and the build run on every pull request and every push to main, so a later change cannot quietly break the curve.</span><span className="zh"><b>把护栏写进 CI。</b>每个 PR 和每次推送到 main 都跑类型检查、引擎校验、平衡区间和构建，后续改动不会悄悄破坏难度曲线。</span></li>
            <li><span className="en"><b>Bilingual from the engine up.</b> Combat text became language-neutral messages translated at display time, so both languages stay complete.</span><span className="zh"><b>从引擎层支持双语。</b>战斗文字改成与语言无关的消息、显示时再翻译，中英文都不会缺。</span></li>
          </ul>
          <Reflection title={{ en: 'Next', zh: '下一步' }} items={[
            { en: 'A playtest with real players, to check the bot’s curve against how people actually play.', zh: '请真人试玩，看机器人的难度曲线和真实玩家的体验是否一致。' },
            { en: 'A stronger bot policy, so the simulator can tune the higher ascension levels too.', zh: '写一个更强的机器人策略，让模拟器也能调更高的进阶难度。' },
          ]} />
          <div className="links">
            {spire?.demo && <a className="btn primary" href={spire.demo} target="_blank" rel="noopener"><span className="en">Play in the browser</span><span className="zh">在线试玩</span> ↗</a>}
            {spire?.repo && <a href={spire.repo} target="_blank" rel="noopener">GitHub ↗</a>}
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
