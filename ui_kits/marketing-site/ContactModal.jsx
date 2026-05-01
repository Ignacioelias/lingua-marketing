// ContactModal.jsx — shared contact form modal.
const CONTACT_RECIPIENT = "ielias.1@alumni.unav.es";
// When true, the recipient email is shown in the modal subtitle.
// Per-topic overrides below let us keep it private for public-facing forms.
const SHOW_RECIPIENT_DEFAULT = true;

const TOPIC_KEYS = {
  roles:   { hKey: 'contact.h.roles',   prefix: '' },
  support: { hKey: 'contact.h.support', prefix: '[Support] ' },
  sales:   { hKey: 'contact.h.sales',   prefix: '[Sales] ' },
  general: { hKey: 'contact.h.general', prefix: '' },
  careers: { hKey: 'contact.h.careers', prefix: '[Careers] ', showRecipient: false, subKey: 'contact.sub.careers', subjectLabelKey: 'contact.field.name' },
};

function ContactModal({ topic = "general", onClose }) {
  const [, , t] = window.i18n.useLang();
  const cfg = TOPIC_KEYS[topic] || TOPIC_KEYS.general;
  const [subject, setSubject] = React.useState("");
  const [phone, setPhone]     = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    const finalSubject = (cfg.prefix || "") + subject;
    const body = `Phone: ${phone}\n\n${message}`;
    const href = `mailto:${CONTACT_RECIPIENT}`
      + `?subject=${encodeURIComponent(finalSubject)}`
      + `&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    onClose();
  };

  const subjectPh = t('contact.placeholder.subject.' + topic);
  const messagePh = t('contact.placeholder.message.' + topic);

  return ReactDOM.createPortal((
    <div
      className="lg-roles-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lg-contact-title"
      onClick={onClose}
    >
      <div className="lg-roles-modal__card" onClick={(e)=>e.stopPropagation()}>
        <button className="lg-roles-modal__x" aria-label="Close" onClick={onClose}>×</button>
        <h3 id="lg-contact-title" className="lg-roles-modal__h">{t(cfg.hKey)}</h3>
        <p className="lg-roles-modal__sub">
          {cfg.showRecipient === false
            ? t(cfg.subKey || 'contact.sub.private')
            : (<>{t('contact.sub.a')}<strong>{CONTACT_RECIPIENT}</strong>{t('contact.sub.b')}</>)
          }
        </p>
        <form className="lg-roles-modal__form" onSubmit={submit}>
          <label className="lg-roles-modal__field">
            <span>{t(cfg.subjectLabelKey || 'contact.field.subject')}</span>
            <input
              type="text"
              required
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              placeholder={subjectPh}
            />
          </label>
          <label className="lg-roles-modal__field">
            <span>{t('contact.field.phone')}</span>
            <input
              type="tel"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder={t('contact.placeholder.phone')}
            />
          </label>
          <label className="lg-roles-modal__field">
            <span>{t('contact.field.message')}</span>
            <textarea
              required
              rows="6"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              placeholder={messagePh}
            />
          </label>
          <div className="lg-roles-modal__actions">
            <button type="button" className="lg-btn lg-btn--ghost" onClick={onClose}>{t('contact.cancel')}</button>
            <button type="submit" className="lg-btn lg-btn--primary">{t('contact.send')}</button>
          </div>
        </form>
      </div>
    </div>
  ), document.body);
}

window.ContactModal = ContactModal;
