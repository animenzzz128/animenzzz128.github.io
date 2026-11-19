import ProjectCards from '../components/ProjectCards';
import T from '../components/T';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../projects';

export default function Projects() {
  return (
    <div className="wrap page">
      <section>
        <div className="sec-head">
          <div className="eyebrow"><T en="Projects" zh="个人项目" /></div>
          <h1><T en="Products I designed and shipped with AI coding tools" zh="我主导设计、借助 AI 编程工具上线的产品" /></h1>
        </div>
        <ProjectCards works={PROJECTS} />
        <div className="links more">
          <Link to="/games"><T en="Games" zh="游戏作品" /> →</Link>
        </div>
      </section>
    </div>
  );
}
