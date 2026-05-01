// Footer.jsx
function Footer() {
  const [, , t] = window.i18n.useLang();
  const [contactTopic, setContactTopic] = React.useState(null);
  const openContact = (topic) => (e) => { e.preventDefault(); setContactTopic(topic); };

  return (
    <footer className="lg-footer">
      <div className="lg-footer__cols">
        <div>
          <h4 className="lg-footer__h">{t('footer.col.company')}</h4>
          <a href="about.html">{t('nav.about')}</a><a href="#" onClick={openContact('careers')}>{t('nav.careers')}</a>
        </div>
        <div>
          <h4 className="lg-footer__h">{t('footer.col.product')}</h4>
          <a href="whats-new.html">{t('nav.whatsnew')}</a><a href="use-cases.html">{t('nav.usecases')}</a><a href="#">{t('nav.business')}</a>
        </div>
        <div>
          <h4 className="lg-footer__h">{t('footer.col.resources')}</h4>
          <a href="#" onClick={openContact('support')}>{t('nav.support')}</a>
          <a href="#" onClick={openContact('sales')}>{t('nav.sales')}</a>
        </div>
        <div>
          <h4 className="lg-footer__h">{t('footer.col.contact')}</h4>
          <a href="#" onClick={openContact('general')}>{t('nav.contact')}</a><a href="#">{t('footer.twitter')}</a><a href="#">{t('footer.linkedin')}</a>
        </div>
      </div>
      <div className="lg-footer__bottom">
        <img src="assets/lingua-wordmark.svg" height="22" alt="Lingua" />
        <span className="lg-footer__copy">{t('footer.copy')}</span>
        <span className="lg-footer__legal"><a href="#">{t('footer.terms')}</a><a href="#">{t('footer.privacy')}</a><a href="#">{t('footer.data')}</a></span>
      </div>
      {contactTopic && window.ContactModal && (
        React.createElement(window.ContactModal, { topic: contactTopic, onClose: () => setContactTopic(null) })
      )}
    </footer>
  );
}
window.Footer = Footer;
