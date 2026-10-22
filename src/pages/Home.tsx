import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCards from '../components/ProjectCards';
import { ExperienceCard } from '../components/ExperienceCard';
import { EducationCard } from '../components/EducationCard';
import { SkillsCard } from '../components/SkillsCard';
import T from '../components/T';

const EXPLORE = [
  { to: '/projects', title: { en: 'Projects', zh: '个人项目' }, text: { en: 'Two AI products with live demos and case studies', zh: '两个 AI 产品，可在线试用，附项目详情' } },
  { to: '/experience', title: { en: 'Experience', zh: '工作经历' }, text: { en: 'TikTok Shop, Deloitte, IQVIA, plus education', zh: 'TikTok Shop、德勤、IQVIA 及教育背景' } },
  { to: '/about', title: { en: 'About', zh: '关于我' }, text: { en: 'How I work, plus band and travel photos', zh: '我的做事方式，还有乐队和旅行照片' } },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="wrap">
        <nav className="explore" aria-label="Explore">
          {EXPLORE.map((e, i) => (
            <Link className="explore-card" to={e.to} key={e.to}>
              <small>0{i + 1}</small>
              <b><T {...e.title} /></b>
              <p><T {...e.text} /></p>
              <em aria-hidden="true">→</em>
            </Link>
          ))}
        </nav>
        <section className="home-sec">
          <div className="sec-head">
            <div className="eyebrow"><T en="Projects" zh="个人项目" /></div>
            <h2><T en="Two products I built and use every day" zh="两个我独立做出来、每天都在用的产品" /></h2>
          </div>
          <ProjectCards />
        </section>
        <section className="home-sec">
          <div className="sec-head">
            <div className="eyebrow"><T en="Background" zh="背景" /></div>
            <h2><T en="Strategy, consulting and research" zh="策略、咨询与研究" /></h2>
          </div>
          <div className="glance" aria-label="At a glance">
            <ExperienceCard />
            <EducationCard />
            <SkillsCard />
          </div>
          <div className="links more">
            <Link to="/experience"><T en="Full experience" zh="完整经历" /> →</Link>
            <Link to="/about"><T en="About me" zh="关于我" /> →</Link>
          </div>
        </section>
      </div>
    </>
  );
}
