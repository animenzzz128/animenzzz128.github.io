import T from './T';

const SCHOOLS = [
  { school: { en: 'Yale School of Management', zh: '耶鲁大学管理学院' }, when: { en: 'Expected Jun 2027', zh: '预计 2027.06' }, degree: { en: 'Master of Management Studies, Global Business and Society · Management Science major (STEM)', zh: '全球商业与社会管理学硕士（MMS）· 管理科学方向（STEM）' } },
  { school: { en: 'University of British Columbia', zh: '不列颠哥伦比亚大学' }, when: { en: 'May 2026', zh: '2026.05' }, degree: { en: 'Master of Management', zh: '管理学硕士' } },
  { school: { en: 'Duke University', zh: '杜克大学' }, when: { en: 'May 2025', zh: '2025.05' }, degree: { en: 'Bachelor of Economics, Political Economy (Economics emphasis) · GPA 3.807 · Dean’s List with Distinction', zh: '经济学学士，政治经济学专业（经济学方向）· GPA 3.807 · 院长优异名单' } },
  { school: { en: 'Peking University', zh: '北京大学' }, when: { en: '2026', zh: '2026' }, degree: { en: 'Doing Business in China', zh: 'DBIC 短期项目' } },
];

export function EducationSection() {
  return (
    <section id="education">
      <div className="sec-head">
        <div className="eyebrow"><T en="Education" zh="教育背景" /></div>
        <h2><T en="Yale SOM, UBC and Duke" zh="耶鲁、UBC 与杜克" /></h2>
      </div>
      {SCHOOLS.map((s) => (
        <div className="xp-row" key={s.degree.en}>
          <div className="xp-when"><T {...s.when} /></div>
          <div className="xp-what"><h4><T {...s.school} /> <span>· <T {...s.degree} /></span></h4></div>
        </div>
      ))}
    </section>
  );
}
