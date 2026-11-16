import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import { ExperienceCard } from '../components/ExperienceCard';
import { EducationCard } from '../components/EducationCard';
import { SkillsCard } from '../components/SkillsCard';
import T from '../components/T';
import Testimonials from '../components/Testimonials';

const EXPLORE = [
  { to: '/projects', title: { en: 'Projects', zh: '个人项目' }, text: { en: 'Three products with live demos and case studies', zh: '三个产品，可在线试用，附项目详情' } },
  { to: '/experience', title: { en: 'Experience', zh: '工作经历' }, text: { en: 'TikTok Shop, Deloitte, IQVIA, plus education', zh: 'TikTok Shop、德勤、IQVIA 及教育背景' } },
  { to: '/about', title: { en: 'About', zh: '关于我' }, text: { en: 'How I work, plus band and travel photos', zh: '我的做事方式，还有乐队和旅行照片' } },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="wrap">
        <section className="home-sec">
          <div className="sec-head">
            <div className="eyebrow"><T en="The wall · Projects" zh="作品墙 · 个人项目" /></div>
            <h2><T en="Three products I built end to end, each one live" zh="三个我从零做出来的产品，每个都能直接用" /></h2>
          </div>
          <Gallery />
        </section>
        <section className="home-sec">
          <div className="sec-head">
            <div className="eyebrow"><T en="Wall text · Background" zh="展墙说明 · 背景" /></div>
            <h2><T en="Strategy, consulting and research" zh="策略、咨询与研究" /></h2>
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
        <nav className="explore" aria-label="Explore">
          <div className="eyebrow explore-head"><T en="Gallery guide" zh="展厅导览" /></div>
          {EXPLORE.map((e, i) => (
            <Link className="explore-card" to={e.to} key={e.to}>
              <small>0{i + 1}</small>
              <b><T {...e.title} /></b>
              <p><T {...e.text} /></p>
              <em aria-hidden="true">→</em>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
