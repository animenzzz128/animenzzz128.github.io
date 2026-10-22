import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import meta from '../meta.json';
import { useLang } from '../lang';
import Contact from './Contact';
import T from './T';

// Sections of the old single-page site, so links already shared keep working.
const OLD_ANCHORS: Record<string, string> = {
  '#work': '/projects',
  '#toutoule': '/projects/toutoule',
  '#dayweave': '/projects/dayweave',
  '#experience': '/experience',
  '#about': '/about',
  '#life': '/about',
};

export default function Layout() {
  const [lang, setLang] = useLang();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/' && OLD_ANCHORS[hash]) navigate(OLD_ANCHORS[hash], { replace: true });
  }, [pathname, hash, navigate]);

  useEffect(() => {
    const titles = meta as Record<string, { title: string }>;
    const m = titles[pathname.replace(/(.)\/$/, '$1')];
    document.title = (m || titles['/']).title;
    if (hash === '#contact') document.getElementById('contact')?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <header className="bar">
        <div className="wrap">
          <Link className="monogram" to="/">JY<span style={{ color: 'var(--muted)' }}>.</span></Link>
          <nav className="nav" aria-label="Pages">
            <NavLink to="/projects"><T en="Projects" zh="项目" /></NavLink>
            <NavLink to="/experience"><T en="Experience" zh="经历" /></NavLink>
            <NavLink to="/about"><T en="About" zh="关于" /></NavLink>
            <a href="#contact"><T en="Contact" zh="联系" /></a>
            <div className="lang" role="group" aria-label="Language">
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              <button type="button" aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中文</button>
            </div>
          </nav>
        </div>
      </header>
      <main id="top" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Contact />
    </>
  );
}
