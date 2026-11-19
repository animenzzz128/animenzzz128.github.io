import ProjectCards from '../components/ProjectCards';
import T from '../components/T';
import { Link } from 'react-router-dom';
import { GAMES } from '../projects';

export default function Games() {
  return (
    <div className="wrap page">
      <section>
        <div className="sec-head">
          <div className="eyebrow"><T en="Games" zh="游戏作品" /></div>
          <h1><T en="Games I directed, built with AI coding tools" zh="我主导、借助 AI 编程工具做出来的游戏" /></h1>
        </div>
        <ProjectCards works={GAMES} />
        <div className="links more">
          <Link to="/projects"><T en="Projects" zh="个人项目" /> →</Link>
        </div>
      </section>
    </div>
  );
}
