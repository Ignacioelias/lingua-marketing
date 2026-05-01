// LangToggle.jsx — pill toggle to switch UI language between ES and EN.
// Uses window.i18n.useLang() to stay in sync with the rest of the app.
function LangToggle({ compact = false }) {
  const [lang, setLang] = window.i18n.useLang();
  return (
    <div className={"lg-langtoggle" + (compact ? " is-compact" : "")} role="group" aria-label="Language">
      <button
        type="button"
        className={"lg-langtoggle__btn" + (lang === 'es' ? ' is-on' : '')}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >ES</button>
      <button
        type="button"
        className={"lg-langtoggle__btn" + (lang === 'en' ? ' is-on' : '')}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >EN</button>
    </div>
  );
}
window.LangToggle = LangToggle;
