// PersonaTabs.jsx — "Lingua is made for you"
function PersonaTabs() {
  const [, , t] = window.i18n.useLang();
  const personas = [
    { id: 'consultants', tab: t('personas.consultants.tab'), em: t('personas.consultants.em'), body: t('personas.consultants.body'), img: window.__resources.personaConsultant },
    { id: 'creators',    tab: t('personas.creators.tab'),    em: t('personas.creators.em'),    body: t('personas.creators.body'),    img: window.__resources.personaCreator },
    { id: 'devs',        tab: t('personas.devs.tab'),        em: t('personas.devs.em'),        body: t('personas.devs.body'),        img: window.__resources.personaDeveloper },
    { id: 'sales',       tab: t('personas.sales.tab'),       em: t('personas.sales.em'),       body: t('personas.sales.body'),       img: window.__resources.personaSales },
    { id: 'students',    tab: t('personas.students.tab'),    em: t('personas.students.em'),    body: t('personas.students.body'),    img: window.__resources.personaStudent },
  ];
  const [active, setActive] = React.useState(personas[0].id);
  const cur = personas.find(p => p.id === active);
  return (
    <section className="lg-personas" id="for-you">
      <div className="lg-eyebrow">{t('personas.eyebrow')}</div>
      <h2 className="lg-section__title">{t('personas.title.a')}<em className="emphasis">{t('personas.title.em')}</em>{t('personas.title.b')}</h2>
      <div className="lg-personas__tabs" role="tablist">
        {personas.map(p => (
          <button key={p.id} role="tab" aria-selected={p.id===active}
            className={`lg-personas__tab ${p.id===active?'is-active':''}`}
            onClick={() => setActive(p.id)}>{p.tab}</button>
        ))}
      </div>
      <div className="lg-personas__panel">
        <div className="lg-personas__copy">
          <h3 className="lg-personas__h">{t('personas.heading.a')}<em className="emphasis">{cur.em}</em></h3>
          <p className="lg-personas__b">{cur.body}</p>
          <div className="lg-personas__ctas">
            <a className="lg-btn lg-btn--primary" href="#">{t('personas.cta.learn')}</a>
            <a className="lg-btn lg-btn--ghost" href="#">{t('personas.cta.download')}</a>
          </div>
        </div>
        <div className="lg-personas__art"><img src={cur.img} alt="" /></div>
      </div>
    </section>
  );
}
window.PersonaTabs = PersonaTabs;
