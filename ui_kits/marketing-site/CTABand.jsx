// CTABand.jsx — dark "Start speaking" band
function CTABand() {
  const [, , t] = window.i18n.useLang();
  return (
    <section className="lg-cta-band">
      <h2 className="lg-cta-band__t">{t('cta.title.a')}<em className="emphasis">{t('cta.title.em')}</em>{t('cta.title.b')}</h2>
      <p className="lg-cta-band__b">{t('cta.body')}</p>
      <div className="lg-cta-band__ctas">
        <a className="lg-btn lg-btn--blue" href="#"><img src="../../assets/wispr-icon-mic.svg" width="14" height="14" alt="" /> {t('cta.try')}</a>
        <a className="lg-btn lg-btn--cream" href="#">{t('cta.download')}</a>
      </div>
      <p className="lg-cta-band__fine">{t('cta.fine')}</p>
    </section>
  );
}
window.CTABand = CTABand;
