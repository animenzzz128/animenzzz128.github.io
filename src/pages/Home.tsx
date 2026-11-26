import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Featured from '../components/Featured';
import { FEATURED, MORE, href } from '../projects';
import { ExperienceCard } from '../components/ExperienceCard';
import { EducationCard } from '../components/EducationCard';
import { SkillsCard } from '../components/SkillsCard';
import T from '../components/T';
import Testimonials from '../components/Testimonials';

type Heading = { en: string; zh: string };
/** The heading as plain text: the fallback if the animated one cannot load, and (hidden) its placeholder meanwhile. */
function PlainHeading({ en, zh, hidden }: Heading & { hidden?: boolean }) {
  return <h2 style={hidden ? { visibility: 'hidden' } : undefined}><T en={en} zh={zh} /></h2>;
}
// The animated heading needs GSAP, so it arrives in its own download after first paint.
const SplitHeading = lazy(() => import('../components/SplitHeading').catch(() => ({ default: PlainHeading as (p: Heading) => JSX.Element })));
function SectionHeading(p: Heading) {
  return <Suspense fallback={<PlainHeading {...p} hidden />}><SplitHeading {...p} /></Suspense>;
}


export default function Home() {
  const body = useRef<HTMLDivElement>(null);
  // Cards rise in as they scroll into view. The motion code loads after first paint; if it never does, nothing is hidden.
  useEffect(() => {
    let undo: (() => void) | undefined, gone = false;
    import('../motion').then((m) => { if (!gone && body.current) undo = m.revealOnScroll(body.current, '.glance > *'); }).catch(() => undefined);
    return () => { gone = true; undo?.(); };
  }, []);

  return (
    <>
      <Intro />
      <Hero />
      <div ref={body}>
        <div className="wrap">
          <section className="home-sec">
            <div className="sec-head">
              <div className="eyebrow"><T en="The wall · Selected work" zh="作品墙 · 主打作品" /></div>
              <SectionHeading en="Three AI products, each live and each with a measured eval" zh="三个 AI 产品，都已上线，都有评测数据" />
            </div>
            <Featured works={FEATURED} />
          </section>
          <section className="home-sec">
            <div className="sec-head">
              <div className="eyebrow"><T en="Wall text · Background" zh="展墙说明 · 背景" /></div>
              <SectionHeading en="Strategy, consulting and research" zh="策略、咨询与研究" />
            </div>
            <div className="glance" aria-label="At a glance">
              <ExperienceCard />
              <EducationCard />
              <SkillsCard />
            </div>
            <Testimonials />
            <div className="links more">
              <Link to="/experience"><T en="Full experience" zh="完整经历" /> →</Link>
              <Link to="/about"><T en="About me" zh="关于我" /> →</Link>
            </div>
          </section>
          <section className="home-sec">
            <div className="sec-head">
              <div className="eyebrow"><T en="Side room · More work" zh="侧厅 · 更多作品" /></div>
              <SectionHeading en="Also built: one more product and three experiments" zh="还做过：一个产品和三个试验作品" />
            </div>
            <ul className="more-works">
              {MORE.map((p) => (
                <li key={p.id}><Link to={href(p)}><b>{p.name}</b><span><T {...p.tagline} /></span><i aria-hidden="true">→</i></Link></li>
              ))}
            </ul>
            <div className="links more">
              <Link to="/projects"><T en="All projects" zh="全部项目" /> →</Link>
              <Link to="/games"><T en="All games" zh="全部游戏" /> →</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
