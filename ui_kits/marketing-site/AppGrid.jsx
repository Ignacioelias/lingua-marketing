// AppGrid.jsx — "Write faster in all your apps" + app-aware tone demo
function AppGrid() {
  const [, , t] = window.i18n.useLang();
  const apps = [
    { src: '../../assets/app-word.png', label: 'Word' },
    { src: '../../assets/app-outlook.png', label: 'Outlook' },
    { src: '../../assets/app-powerpoint.png', label: 'PowerPoint' },
    { src: '../../assets/app-teams.png', label: 'Teams' },
    { src: '../../assets/app-gmail.png', label: 'Gmail' },
    { src: '../../assets/app-imessage.avif', label: 'iMessage' },
    { src: '../../assets/app-slack.png', label: 'Slack' },
    { src: '../../assets/app-notion.avif', label: 'Notion' },
    { src: '../../assets/app-figma.png', label: 'Figma' },
    { src: '../../assets/app-vscode.png', label: 'VS Code' },
    { src: '../../assets/app-cursor.webp', label: 'Cursor' },
    { src: '../../assets/app-claude.avif', label: 'Claude' },
    { src: '../../assets/app-chatgpt.avif', label: 'ChatGPT' },
  ];
  const toneRows = [
    { app: 'Slack',    logo: '../../assets/app-slack.png', bg: '#4a154b', mark: 'S',  out: t('tone.row.slack'),    pill: t('tone.pill.casual') },
    { app: 'Gmail',    logo: '../../assets/app-gmail.png', bg: '#1d3a8a', mark: 'G',  out: t('tone.row.gmail'),    pill: t('tone.pill.formal') },
    { app: 'LinkedIn', bg: '#0a66c2', mark: 'in',                                     out: t('tone.row.linkedin'), pill: t('tone.pill.professional') },
    { app: 'WhatsApp', logo: '../../assets/app-whatsapp.png', bg: '#25d366', mark: 'W',out: t('tone.row.whatsapp'), pill: t('tone.pill.brief') },
  ];
  return (
    <section className="lg-apps" id="apps">
      <h2 className="lg-section__title">{t('apps.title.a')}<em className="emphasis">{t('apps.title.em')}</em>{t('apps.title.b')}</h2>
      <p className="lg-section__sub">{t('apps.sub')}</p>
      {(() => {
        // Split icons across two counter-rotating orbit rings. Each icon
        // orbits on its own ring via one CSS keyframe; negative animation-delay
        // distributes them evenly, and the keyframe keeps them upright.
        const inner = apps.slice(0, 6);
        const outer = apps.slice(6);
        const ring = (a, i, n, r, dur, cls) => (
          <span
            className={`lg-orbit__icon ${cls}`}
            key={a.label}
            title={a.label}
            style={{ '--r': r, '--dur': dur, '--delay': `-${(i / n * parseFloat(dur)).toFixed(2)}s` }}
          >
            <img src={a.src} alt={a.label} loading="lazy" />
          </span>
        );
        return (
          <div className="lg-apps__stage" data-reveal>
            <div className="lg-orbit">
              <div className="lg-orbit__core">
                <span className="lg-orbit__pulse" aria-hidden="true" />
                <svg className="lg-orbit__mic" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
                <span className="lg-orbit__core-label">{t('apps.any.eb')}</span>
              </div>
              {inner.map((a, i) => ring(a, i, inner.length, '150px', '40s', 'lg-orbit__icon--in'))}
              {outer.map((a, i) => ring(a, i, outer.length, '250px', '58s', 'lg-orbit__icon--out'))}
            </div>
          </div>
        );
      })()}

      <div className="lg-tone">
        <div className="lg-tone__intro">
          <div className="lg-eyebrow">{t('tone.eyebrow')}</div>
          <h3 className="lg-tone__h">{t('tone.title.a')}<em className="emphasis">{t('tone.title.em')}</em>{t('tone.title.b')}</h3>
          <p className="lg-tone__b">{t('tone.body')}</p>
        </div>
        <div className="lg-tone__card">
          <div className="lg-tone__head">
            {t('tone.said.label')}<span className="lg-tone__said">{t('tone.said.text')}</span>
          </div>
          {toneRows.map((r, i) => (
            <div className="lg-tone__row" key={i}>
              <span className="lg-tone__app">
                {r.logo ? (
                  <span className="lg-tone__badge lg-tone__badge--logo">
                    <img src={r.logo} alt="" />
                  </span>
                ) : (
                  <span className="lg-tone__badge" style={{ background: r.bg }}>{r.mark}</span>
                )}
                {r.app}
              </span>
              <div className="lg-tone__out">
                {r.out}
                <span className="lg-tone__pill">{r.pill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.AppGrid = AppGrid;
