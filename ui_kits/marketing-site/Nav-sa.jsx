// Nav.jsx — sticky cream blurred top bar
function Nav() {
  return (
    <nav className="lg-nav">
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
        <a className="lg-nav__link" href="#">Product <span className="lg-nav__caret">▾</span></a>
        <a className="lg-nav__link" href="#">Individuals <span className="lg-nav__caret">▾</span></a>
        <a className="lg-nav__link" href="#business">Business</a>
        <a className="lg-nav__link" href="#">Resources <span className="lg-nav__caret">▾</span></a>
      </div>
      <div className="lg-nav__spacer" />
      <a className="lg-nav__login" href="#">Log in</a>
      <NavCTA />
    </nav>
  );
}

// CTA with a one-shot "roller coaster" letter wave on hover. Re-arms whenever
// the cursor leaves, so each fresh hover replays the ride from the start.
function NavCTA() {
  const LABEL = "Download for free";
  const [rideKey, setRideKey] = React.useState(0);
  const [riding, setRiding] = React.useState(false);
  return (
    <a
      className="lg-nav__cta"
      href="#download"
      onClick={(e)=>{e.preventDefault();alert('Download flow → wire to wisprflow.onelink equivalent')}}
      onMouseEnter={() => { setRideKey(k => k + 1); setRiding(true); }}
      onMouseLeave={() => { setRiding(false); }}
    >
      <span className={`lg-nav__cta-label${riding ? ' is-riding' : ''}`} key={rideKey}>
        {LABEL.split("").map((ch, i) => (
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
