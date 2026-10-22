import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCards from '../components/ProjectCards';
import { ExperienceCard } from '../components/ExperienceCard';
import { EducationCard } from '../components/EducationCard';
import { SkillsCard } from '../components/SkillsCard';
import T from '../components/T';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="wrap">
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
