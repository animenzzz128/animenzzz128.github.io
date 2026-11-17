import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Gallery from '../components/Gallery';
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
              <div className="eyebrow"><T en="The wall · Projects" zh="作品墙 · 个人项目" /></div>
              <SectionHeading en="Three products I built end to end, each one live" zh="三个我从零做出来的产品，每个都能直接用" />
            </div>
          </section>
        </div>
        {/* The wall runs edge to edge, so it sits outside .wrap (100vw would overflow by the scrollbar width). */}
        <Gallery />
        <div className="wrap">
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
        </div>
      </div>
    </>
  );
}
