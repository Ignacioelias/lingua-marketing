// AppGrid.jsx — "Write faster in all your apps" + app-aware tone demo
function AppGrid() {
  const [, , t] = window.i18n.useLang();
  const apps = [
    { src: window.__resources.appWord, label: 'Word' },
    { src: window.__resources.appOutlook, label: 'Outlook' },
    { src: window.__resources.appPowerpoint, label: 'PowerPoint' },
    { src: window.__resources.appTeams, label: 'Teams' },
    { src: window.__resources.appGmail, label: 'Gmail' },
    { src: window.__resources.appImessage, label: 'iMessage' },
    { src: window.__resources.appSlack, label: 'Slack' },
    { src: window.__resources.appNotion, label: 'Notion' },
    { src: window.__resources.appFigma, label: 'Figma' },
    { src: window.__resources.appVscode, label: 'VS Code' },
    { src: window.__resources.appCursor, label: 'Cursor' },
    { src: window.__resources.appClaude, label: 'Claude' },
    { src: window.__resources.appChatgpt, label: 'ChatGPT' },
  ];
  const toneRows = [
    { app: 'Slack',    logo: window.__resources.appSlack, bg: '#4a154b', mark: 'S',  out: t('tone.row.slack'),    pill: t('tone.pill.casual') },
    { app: 'Gmail',    logo: window.__resources.appGmail, bg: '#1d3a8a', mark: 'G',  out: t('tone.row.gmail'),    pill: t('tone.pill.formal') },
    { app: 'LinkedIn', bg: '#0a66c2', mark: 'in',                                     out: t('tone.row.linkedin'), pill: t('tone.pill.professional') },
    { app: 'WhatsApp', logo: window.__resources.appWhatsapp, bg: '#25d366', mark: 'W',out: t('tone.row.whatsapp'), pill: t('tone.pill.brief') },
  ];
  return (
    <section className="lg-apps" id="apps">
      <h2 className="lg-section__title">{t('apps.title.a')}<em className="emphasis">{t('apps.title.em')}</em>{t('apps.title.b')}</h2>
      <p className="lg-section__sub">{t('apps.sub')}</p>
      <div className="lg-apps__grid">
        {apps.map(a => (
          <div className="lg-apps__cell" key={a.label} title={a.label}>
            <img src={a.src} alt={a.label} />
          </div>
        ))}
        <div className="lg-apps__cell lg-apps__cell--any" title={t('apps.any.eb')}>
          <span className="lg-apps__any-eb">{t('apps.any.eb')}</span>
          <span className="lg-apps__any-sub">{t('apps.any.sub')}</span>
        </div>
      </div>

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
