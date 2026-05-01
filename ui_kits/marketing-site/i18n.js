// i18n.js — language store + dictionary for the Lingua marketing site.
//
// Default language is Spanish (Castellano, informal "tú"). English is the
// alternate. Choice persists in localStorage and is reflected in ?lang=.
//
// Public API (window.i18n):
//   getLang()                 → 'es' | 'en'
//   setLang(lang)             → persist + ?lang=… + dispatch 'langchange'
//   t(key, fallback?)         → string, picks current lang
//   onChange(handler)         → subscribe; returns unsubscribe fn
//   useLang()                 → React hook, returns [lang, setLang, t]

(function () {
  const KEY = 'lingua.lang';
  const VALID = ['es', 'en'];

  function readQuery() {
    try {
      const u = new URL(window.location.href);
      const q = u.searchParams.get('lang');
      return VALID.includes(q) ? q : null;
    } catch (_) { return null; }
  }

  function readStorage() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }

  function initialLang() {
    return readQuery() || (VALID.includes(readStorage()) ? readStorage() : 'es');
  }

  let lang = initialLang();

  function setLang(next) {
    if (!VALID.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (_) {}
    try {
      const u = new URL(window.location.href);
      u.searchParams.set('lang', lang);
      window.history.replaceState({}, '', u.toString());
    } catch (_) {}
    document.documentElement.setAttribute('lang', lang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function getLang() { return lang; }

  function t(key, fallback) {
    const dict = (window.I18N_DICT || {})[lang] || {};
    if (dict[key] != null) return dict[key];
    const en = (window.I18N_DICT || {}).en || {};
    if (en[key] != null) return en[key];
    return fallback != null ? fallback : key;
  }

  function onChange(handler) {
    const wrapped = (e) => handler(e.detail.lang);
    window.addEventListener('langchange', wrapped);
    return () => window.removeEventListener('langchange', wrapped);
  }

  // React hook (assumes React is loaded before any component uses it).
  function useLang() {
    const [l, setL] = React.useState(lang);
    React.useEffect(() => onChange(setL), []);
    return [l, setLang, (k, fb) => t(k, fb)];
  }

  // Set <html lang> on first paint.
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', lang);
  }

  window.i18n = { getLang, setLang, t, onChange, useLang };
})();
