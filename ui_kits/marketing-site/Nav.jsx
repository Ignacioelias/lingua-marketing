// Nav.jsx — sticky cream blurred top bar.
//
// Three real dropdown menus (Company / Product / Resources) mirror the footer
// directory exactly. Plus a flat "Typing test" link, a "Contact" link that
// opens the shared <ContactModal>, and a LangToggle (ES/EN).

function Nav() {
  const [lang, , t] = window.i18n.useLang();
  const [openMenu, setOpenMenu] = React.useState(null);
  const [contactOpen, setContactOpen] = React.useState(false);

  const navRef = React.useRef(null);
  React.useEffect(() => {
    if (!openMenu) return;
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null); };
    const onKey  = (e) => { if (e.key === 'Escape') setOpenMenu(null); };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const openContact = (topic) => (e) => {
    e.preventDefault();
    setOpenMenu(null);
    setContactOpen(topic);
  };

  const MENUS = {
    company: {
      label: t('nav.menu.company'),
      items: [
        { label: t('nav.about'),   href: 'about.html' },
        { label: t('nav.careers'), onClick: openContact('careers') },
      ],
    },
    product: {
      label: t('nav.menu.product'),
      items: [
        { label: t('nav.whatsnew'),  href: 'whats-new.html' },
        { label: t('nav.usecases'),  href: 'use-cases.html' },
        { label: t('nav.business'),  href: '#' },
      ],
    },
  };

  return (
    <nav className="lg-nav" ref={navRef}>
      <a className="lg-nav__brand" href="index.html" style={{display:'inline-flex',alignItems:'center',gap:8,textDecoration:'none',border:'none'}}>
        <svg width="26" height="26" viewBox="0 0 1024 1024" fill="#3791bf" aria-hidden="true">
          <rect x="92.16" y="588.8" width="163.84" height="307.2" rx="81.92" ry="81.92"/>
          <rect x="317.44" y="358.4" width="163.84" height="537.6" rx="81.92" ry="81.92"/>
          <rect x="542.72" y="128" width="163.84" height="768" rx="81.92" ry="81.92"/>
          <rect x="768" y="435.2" width="163.84" height="460.8" rx="81.92" ry="81.92"/>
        </svg>
        <span style={{font:"600 18px/1 'Geist','Inter',sans-serif",letterSpacing:'-0.03em',color:'#0e1116'}}>Lingua</span>
      </a>

      <div className="lg-nav__links">
        {Object.entries(MENUS).map(([key, m]) => (
          <React.Fragment key={key}>
            <NavMenu
              label={m.label}
              items={m.items}
              isOpen={openMenu === key}
              onToggle={() => setOpenMenu(openMenu === key ? null : key)}
            />
            {key === 'product' && (
              <a className="lg-nav__link" href="pricing.html">{t('nav.pricing')}</a>
            )}
          </React.Fragment>
        ))}

        <a className="lg-nav__link" href="typing-test.html">{t('nav.typingtest')}</a>
      </div>

      <div className="lg-nav__spacer" />
      <LangToggle />
      <a className="lg-nav__login" href="#">{t('nav.login')}</a>
      <a
        className="lg-nav__link lg-nav__contact"
        href="#contact"
        onClick={(e) => { e.preventDefault(); setContactOpen('general'); }}
      >{t('nav.contact')}</a>
      <NavCTA label={t('nav.cta')} />

      {contactOpen && window.ContactModal && (
        React.createElement(window.ContactModal, {
          topic: contactOpen,
          onClose: () => setContactOpen(false),
        })
      )}
    </nav>
  );
}

function NavMenu({ label, items, isOpen, onToggle }) {
  return (
    <div className="lg-nav__menu">
      <button
        type="button"
        className={'lg-nav__link lg-nav__menu-trigger' + (isOpen ? ' is-open' : '')}
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label} <span className="lg-nav__caret">▾</span>
      </button>
      {isOpen && (
        <div className="lg-nav__menu-pop" role="menu">
          {items.map((it, i) => (
            <a
              key={i}
              className="lg-nav__menu-item"
              href={it.href || '#'}
              onClick={it.onClick}
              role="menuitem"
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// CTA with a one-shot "roller coaster" letter wave on hover.
function NavCTA({ label }) {
  const [rideKey, setRideKey] = React.useState(0);
  const [riding, setRiding] = React.useState(false);
  // Re-arm the animation when the label string changes (i.e. lang switch),
  // otherwise the per-char animation delay arrays from the previous render
  // outnumber the new chars.
  React.useEffect(() => { setRideKey(k => k + 1); }, [label]);
  return (
    <a
      className="lg-nav__cta"
      href="#download"
      onClick={(e)=>{e.preventDefault();alert('Download flow → wire to wisprflow.onelink equivalent')}}
      onMouseEnter={() => { setRideKey(k => k + 1); setRiding(true); }}
      onMouseLeave={() => { setRiding(false); }}
    >
      <span className={`lg-nav__cta-label${riding ? ' is-riding' : ''}`} key={rideKey}>
        {label.split("").map((ch, i) => (
          <span
            key={i}
            className="lg-nav__cta-char"
            style={{ animationDelay: `${i * 38}ms` }}
          >
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </span>
    </a>
  );
}
window.Nav = Nav;
