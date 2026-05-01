// AppGrid.jsx — "Write faster in all your apps" + app-aware tone demo
function AppGrid() {
  const apps = [
    // Microsoft / Windows suite up top — balanced first row
    { src: '../../assets/app-word.svg', label: 'Word' },
    { src: '../../assets/app-outlook.svg', label: 'Outlook' },
    { src: '../../assets/app-powerpoint.svg', label: 'PowerPoint' },
    { src: '../../assets/app-teams.svg', label: 'Teams' },
    { src: '../../assets/app-gmail.webp', label: 'Gmail' },
    { src: '../../assets/app-imessage.avif', label: 'iMessage' },
    { src: '../../assets/app-slack.webp', label: 'Slack' },
    // Productivity + creative
    { src: '../../assets/app-notion.avif', label: 'Notion' },
    { src: '../../assets/app-figma.webp', label: 'Figma' },
    { src: '../../assets/app-arc.avif', label: 'Arc' },
    { src: '../../assets/app-vscode.webp', label: 'VS Code' },
    { src: '../../assets/app-cursor.webp', label: 'Cursor' },
    { src: '../../assets/app-claude.avif', label: 'Claude' },
    { src: '../../assets/app-chatgpt.avif', label: 'ChatGPT' },
  ];
  // App-aware tone — same dictation, rewritten for the surface you're in.
  const toneRows = [
    { app: 'Slack',    bg: '#4a154b', mark: 'S',  out: 'Hey — gotta push our 1:1 tomorrow 🙏 ok to reschedule?',          pill: 'casual' },
    { app: 'Gmail',    bg: '#1d3a8a', mark: 'G',  out: "Hi — apologies, I won't be able to make our 1:1 tomorrow. Could we reschedule for later this week?", pill: 'formal' },
    { app: 'LinkedIn', bg: '#0a66c2', mark: 'in', out: 'Quick note — I need to push our 1:1 tomorrow. Open to rescheduling whenever works for you.',         pill: 'professional' },
    { app: 'WhatsApp', bg: '#25d366', mark: 'W',  out: "hey can't do tomorrow's 1:1, push it?",                            pill: 'brief' },
  ];
  return (
    <section className="lg-apps">
      <h2 className="lg-section__title">Write faster in <em className="emphasis">every</em> app you use</h2>
      <p className="lg-section__sub">Seamless speech-to-text, on your phone or computer. Lingua works wherever your cursor blinks.</p>
      <div className="lg-apps__grid">
        {apps.map(a => (
          <div className="lg-apps__cell" key={a.label} title={a.label}>
            <img src={a.src} alt={a.label} />
          </div>
        ))}
      </div>

      {/* App-aware tone — Lingua rewrites your one dictation to match the surface. */}
      <div className="lg-tone">
        <div className="lg-tone__intro">
          <div className="lg-eyebrow">App-aware tone</div>
          <h3 className="lg-tone__h">Same words. <em className="emphasis">Right voice</em>, every time.</h3>
          <p className="lg-tone__b">Lingua reads the app you're in and tunes your phrasing — formal at work, brief on WhatsApp, sharp on LinkedIn — without changing what you meant.</p>
        </div>
        <div className="lg-tone__card">
          <div className="lg-tone__head">
            You said <span className="lg-tone__said">"i won't make it tomorrow have to push our 1:1"</span>
          </div>
          {toneRows.map((r, i) => (
            <div className="lg-tone__row" key={i}>
              <span className="lg-tone__app">
                <span className="lg-tone__badge" style={{ background: r.bg }}>{r.mark}</span>
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
