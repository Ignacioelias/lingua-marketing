// ValueCards.jsx — Lingua's four mission values
function ValueCards() {
  const [, , t] = window.i18n.useLang();
  const values = [
    { eb: t('values.1.eb'), tt: t('values.1.t'), em: t('values.1.em'), body: t('values.1.body'), icon: window.__resources.iconToggles },
    { eb: t('values.2.eb'), tt: t('values.2.t'), em: t('values.2.em'), body: t('values.2.body'), icon: window.__resources.iconAward },
    { eb: t('values.3.eb'), tt: t('values.3.t'), em: t('values.3.em'), body: t('values.3.body'), icon: window.__resources.iconUsers },
    { eb: t('values.4.eb'), tt: t('values.4.t'), em: t('values.4.em'), body: t('values.4.body'), icon: window.__resources.wisprMic2 },
  ];
  return (
    <section className="lg-values" id="values">
      <div className="lg-eyebrow">{t('values.eyebrow')}</div>
      <h2 className="lg-section__title" style={{maxWidth: 720, margin: '8px auto 40px'}}>{t('values.title')}</h2>
      <div className="lg-values__grid">
        {values.map((v, i) => (
          <article className="lg-value" key={i}>
            <img className="lg-value__icon" src={v.icon} alt="" />
            <div className="lg-value__eb">{v.eb}</div>
            <h3 className="lg-value__t">{v.tt} <em className="emphasis">{v.em}</em></h3>
            <p className="lg-value__b">{v.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.ValueCards = ValueCards;
