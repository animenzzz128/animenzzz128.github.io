import { Brief, Reflection } from '../components/Brief';
import ProjectPage from '../components/ProjectPage';

// Facts from the jacky-s-room repo at 67d8666 plus the content and Pages PR (#4), 2026-11-18: README,
// pixel-room-spec.md, prototype/, server.ts and git history; server and rate-limit tests, pixel-exact
// re-runs of the art scripts, and the live GitHub Pages site. The central illustration is AI-generated.
export default function Room() {
  return (
    <ProjectPage id="room">
      <article className="case" id="room">
        <div className="case-meta">
          <strong>像素小屋 Jacky's Room</strong>
          <span><span className="en">Concept, art direction &amp; content, solo; built with Claude, Google AI Studio and Claude Code</span><span className="zh">构思、美术方向与内容（独立完成），使用 Claude、Google AI Studio 和 Claude Code 开发</span></span>
          <span><span className="en">Nov 2026 · live</span><span className="zh">2026.11 · 已上线</span></span>
          <span>HTML · CSS · JavaScript · Canvas · Python · GitHub Pages</span>
        </div>
        <div className="case-body">
          <div>
            <h1><span className="en">A homepage you can click around</span><span className="zh">一个可以点来点去的个人主页</span></h1>
            <p className="case-sub"><span className="en">My personal homepage as a pixel-art dusk study. Click the laptop for my projects, the certificate for my education, the phone to get in touch. Anyone in a hurry can open a text-only Quick view instead.</span><span className="zh">把个人主页做成一间像素风的黄昏书房：点笔记本电脑看项目，点证书看教育背景，点手机联系我。赶时间的人可以直接打开纯文字的“快速浏览”。</span></p>
          </div>
          <figure className="shot">
            <img src="/img/room.jpg" srcSet="/img/room-960.jpg 960w, /img/room.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="960" alt="A pixel-art study at dusk: a chibi character with glasses and headphones at a laptop, a cat on the desk, bookshelves, a window with a sunset city, a clock and a cork board" />
            <figcaption><span className="en">The room. Every highlighted object opens a panel or does something small.</span><span className="zh">房间全景。物件可以点开面板，或者触发一点小互动。</span></figcaption>
          </figure>
          <Brief items={[
            { label: { en: 'What:', zh: '做了什么：' }, text: { en: 'A clickable 480×270 pixel room whose objects open panels on my experience, projects, education, skills, places, hobbies and contact, with a lamp night mode, record-player music and a few easter eggs.', zh: '一间可点击的 480×270 像素房间：物件打开经历、项目、教育、技能、足迹、爱好和联系方式等面板，另有台灯夜间模式、唱片机音乐和几个小彩蛋。' } },
            { label: { en: 'Key decision:', zh: '关键决定：' }, text: { en: 'The facts are never hidden behind the game: a text-only Quick view, an item list, deep links and full keyboard support sit beside the room, and objects with nothing real behind them stay unclickable rather than show sample text.', zh: '不让“好玩”挡住信息：房间旁边就有纯文字快速浏览、物件清单、深链接和完整键盘操作；还没有真实内容的物件暂不可点，而不是显示示例文字。' } },
            { label: { en: 'Result:', zh: '结果：' }, text: { en: 'Live on GitHub Pages since 18 Nov 2026. Claude wrote the design brief and the first static prototype under my direction, Google AI Studio supplied a project scaffold and the optional Gemini server, and Claude Code then built the full 480×270 room, the AI photo-object option, owner mode, and the content swap and GitHub Pages deploy, in a series of pull requests. Every fact about me in it comes from my public website.', zh: '2026-11-18 上线 GitHub Pages。设计稿和第一版静态原型由 Claude 按我的方向编写，Google AI Studio 提供了项目脚手架和可选的 Gemini 服务器，之后由 Claude Code 完成整间 480×270 房间、AI 照片摆件选项、站长模式，以及内容替换和 GitHub Pages 部署（分多个 PR 完成）。里面关于我的信息都取自个人网站已公开的内容。' } },
          ]} />
          <figure className="shot">
            <img src="/img/room-zh.jpg" srcSet="/img/room-zh-960.jpg 960w, /img/room-zh.jpg 1920w" sizes="(max-width: 720px) 100vw, 880px" width="1920" height="1080" alt="The same room in Chinese, with a welcome speech bubble from the character" loading="lazy" />
            <figcaption><span className="en">The Chinese version, with the welcome bubble.</span><span className="zh">中文界面和欢迎气泡。</span></figcaption>
          </figure>
          <dl className="prm">
            <div><dt><span className="en">Problem</span><span className="zh">问题</span></dt><dd><span className="en">A résumé page says what you did but not who you are, and game-like homepages usually bury the facts behind the gimmick.</span><span className="zh">简历式页面说得清做过什么，却看不出你是谁；而游戏化的主页又常常把关键信息藏在花样后面。</span></dd></div>
            <div><dt><span className="en">My role</span><span className="zh">我的角色</span></dt><dd><span className="en">Concept, art direction, content and acceptance. Claude wrote the design brief and first prototype under my direction, Google AI Studio supplied the scaffold, and the rest was built with Claude Code; the central illustration is AI-generated.</span><span className="zh">负责构思、美术方向、内容与验收。Claude 按我的方向编写设计稿和初版原型，Google AI Studio 提供脚手架，其余由 Claude Code 辅助开发；中心插画是 AI 生成的。</span></dd></div>
            <div><dt><span className="en">Outcome</span><span className="zh">结果</span></dt><dd><span className="en">Live on GitHub Pages as a static site, so the optional photo-to-object AI feature, which needs a server, is switched off there.</span><span className="zh">以静态网站部署在 GitHub Pages 上；需要服务器的“照片变摆件”AI 功能在线上版关闭。</span></dd></div>
          </dl>
          <ul className="decisions">
            <li><span className="en"><b>One pixel grid, scaled only by whole numbers.</b> A script snapped the AI-generated center illustration onto a 240×135 grid, and a second script drew the other three quarters of the 480×270 room pixel by pixel; both reproduce the committed images exactly, and the canvas is only ever enlarged by whole numbers, so every pixel stays square.</span><span className="zh"><b>统一像素网格，只按整数倍放大。</b>中间的 AI 生成插画由脚本吸附到 240×135 的像素网格，480×270 房间的其余四分之三由另一个脚本逐像素绘制；两个脚本都能逐像素复现仓库里的图片，画面只按整数倍放大，每个像素都保持方正。</span></li>
            <li><span className="en"><b>Photos become objects without leaking where they were taken.</b> An uploaded photo is re-encoded in the browser to strip EXIF and GPS, then reduced to a 12×14 “pixel polaroid” in one of 36 slots.</span><span className="zh"><b>照片变摆件，但不泄露拍摄地点。</b>上传的照片先在浏览器里重新编码、去掉 EXIF 和 GPS，再缩成 12×14 的“像素拍立得”，放进 36 个槽位之一。</span></li>
            <li><span className="en"><b>Paid AI stays behind a key.</b> The optional Gemini endpoint meant to turn a photo into a pixel object only accepts requests carrying the owner key and is rate-limited per IP address.</span><span className="zh"><b>付费 AI 只给站长用。</b>可选的 Gemini 接口用来把照片转成像素摆件，只接受带站长密钥的请求，并按 IP 限流。</span></li>
          </ul>
          <Reflection title={{ en: 'Next', zh: '下一步' }} items={[
            { en: 'Fill the shelves that are still empty: a reading list, this year’s goals and a few fun facts.', zh: '把还空着的物件填上：书单、今年的目标和几条冷知识。' },
            { en: 'Store the owner’s photos on a server, so every visitor sees them, not just my browser.', zh: '把站长上传的照片存到服务器上，让所有访客都能看到，而不只是我自己的浏览器。' },
            { en: 'Run the AI object feature end to end with a real key before turning it on anywhere public.', zh: '用真实密钥把 AI 摆件端到端跑通之后，再考虑在公开版本里打开。' },
          ]} />
          <div className="links">
            <a className="btn primary" href="https://animenzzz128.github.io/jacky-s-room/" target="_blank" rel="noopener"><span className="en">Visit the room</span><span className="zh">进入小屋</span> ↗</a>
            <a href="https://github.com/animenzzz128/jacky-s-room" target="_blank" rel="noopener">GitHub ↗</a>
          </div>
        </div>
      </article>
    </ProjectPage>
  );
}
