import { Link } from 'react-router-dom';
import T from '../components/T';

export default function NotFound() {
  return (
    <div className="wrap page">
      <section>
        <div className="sec-head">
          <div className="eyebrow">404</div>
          <h2><T en="This page doesn’t exist" zh="这个页面不存在" /></h2>
        </div>
        <p className="links"><Link to="/"><T en="Back to the home page" zh="回到主页" /> →</Link></p>
      </section>
    </div>
  );
}
