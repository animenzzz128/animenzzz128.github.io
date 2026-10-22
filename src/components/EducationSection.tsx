import T from './T';

const SCHOOLS = [
  { school: { en: 'Yale School of Management', zh: '耶鲁大学管理学院' }, when: { en: '2027', zh: '2027' }, degree: { en: 'Master of Management Science (STEM)', zh: '管理科学硕士（STEM）' } },
  { school: { en: 'University of British Columbia', zh: '不列颠哥伦比亚大学' }, when: { en: '2026', zh: '2026' }, degree: { en: 'Master of Management', zh: '管理学硕士' } },
  { school: { en: 'Duke University', zh: '杜克大学' }, when: { en: '2025', zh: '2025' }, degree: { en: 'BA Political Economics · GPA 3.81', zh: '政治经济学学士 · GPA 3.81' } },
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
