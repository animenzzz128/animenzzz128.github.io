import ProjectCards from '../components/ProjectCards';
import T from '../components/T';

export default function Projects() {
  return (
    <div className="wrap page">
      <section>
        <div className="sec-head">
          <div className="eyebrow"><T en="Projects" zh="个人项目" /></div>
          <h2><T en="Three products I built end to end" zh="三个我从零做出来的产品" /></h2>
        </div>
        <ProjectCards />
      </section>
    </div>
  );
}
