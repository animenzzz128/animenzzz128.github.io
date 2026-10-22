import ProjectCards from '../components/ProjectCards';
import T from '../components/T';

export default function Projects() {
  return (
    <div className="wrap page">
      <section>
        <div className="sec-head">
          <div className="eyebrow"><T en="Projects" zh="个人项目" /></div>
          <h2><T en="Two products I built and use every day" zh="两个我独立做出来、每天都在用的产品" /></h2>
        </div>
        <ProjectCards />
      </section>
    </div>
  );
}
