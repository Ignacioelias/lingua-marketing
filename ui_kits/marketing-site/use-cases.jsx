// use-cases.jsx — extended persona pages with animated demos (i18n-aware)

/* ---------- shared helpers ---------- */
function useTypewriter(text, opts = {}) {
  const { speed = 28, startDelay = 600, loopDelay = 4000 } = opts;
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    let alive = true;
    let t1, t2;
    const start = () => {
      setI(0);
      t1 = setTimeout(() => {
        let k = 0;
        const tick = () => {
          if (!alive) return;
          k++;
          setI(k);
          if (k < text.length) {
            t2 = setTimeout(tick, speed);
          } else {
            t2 = setTimeout(start, loopDelay);
          }
        };
        tick();
      }, startDelay);
    };
    start();
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [text]);
  return text.slice(0, i);
}

/* ---------- HERO ---------- */
function UCHero() {
  const [, , t] = window.i18n.useLang();
  return (
    <section className="uc-hero">
      <p className="uc-hero__eb">{t('uc.eyebrow')}</p>
      <h1 className="uc-hero__h">
        {t('uc.hero.h.a')}<em>{t('uc.hero.h.em')}</em>{t('uc.hero.h.b')}
      </h1>
      <p className="uc-hero__sub">{t('uc.hero.sub')}</p>
      <div className="uc-jumps">
        <a href="#consultants">{t('uc.jump.consultants')}</a>
        <a href="#creators">{t('uc.jump.creators')}</a>
        <a href="#devs">{t('uc.jump.devs')}</a>
        <a href="#sales">{t('uc.jump.sales')}</a>
        <a href="#students">{t('uc.jump.students')}</a>
      </div>
    </section>
  );
}

/* 1. CONSULTANTS */
function UCConsultants() {
  const [, , t] = window.i18n.useLang();
  const draft = t('uc.cons.draft');
  const out = useTypewriter(draft, { speed: 22, startDelay: 700, loopDelay: 5000 });
  return (
    <section className="uc-sec" id="consultants">
      <div className="uc-sec__head">
        <div>
          <p className="uc-sec__num"><span>01</span>{t('uc.cons.tag')}</p>
          <h2 className="uc-sec__h">{t('uc.cons.h.a')}<em>{t('uc.cons.h.em')}</em>{t('uc.cons.h.b')}</h2>
        </div>
        <p className="uc-sec__b">{t('uc.cons.sub')}</p>
      </div>
      <div className="uc-sec__body">
        <div className="uc-sec__copy">
          <ul className="uc-list">
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.cons.e1.before')}</p>
              <p className="uc-list__b">{t('uc.cons.e1.b.a')}<em>{t('uc.cons.e1.b.em')}</em>{t('uc.cons.e1.b.b')}</p>
            </li>
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.cons.e2.before')}</p>
              <p className="uc-list__b">{t('uc.cons.e2.b')}</p>
            </li>
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.cons.e3.before')}</p>
              <p className="uc-list__b"><s>{t('uc.cons.e3.s')}</s> → "<em>{t('uc.cons.e3.em')}</em>"</p>
            </li>
          </ul>
          <div className="uc-stat">
            <span className="uc-stat__big">{t('uc.cons.stat')}</span>
            <span className="uc-stat__lbl">{t('uc.cons.statLbl')}</span>
          </div>
          <div className="uc-apps">
            <span className="uc-apps__lbl">{t('uc.worksIn')}</span>
            <span className="uc-apps__pill"><img src="../../assets/app-gmail.png" alt="" />Gmail</span>
            <span className="uc-apps__pill"><img src="../../assets/app-slack.png" alt="" />Slack</span>
            <span className="uc-apps__pill"><img src="../../assets/app-notion.avif" alt="" />Notion</span>
          </div>
        </div>

        <div className="uc-demo">
          <div className="uc-demo__chrome">
            <span className="uc-demo__dot is-r"></span>
            <span className="uc-demo__dot is-y"></span>
            <span className="uc-demo__dot is-g"></span>
            <span className="uc-demo__title">{t('uc.cons.demoTitle')}</span>
          </div>
          <div className="uc-demo__body">
            <p className="uc-doc__type">{out}</p>
            <p className="uc-doc__live">{t('uc.cons.live')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. CREATORS */
function UCCreators() {
  const [, , t] = window.i18n.useLang();
  const dms = [
    { who: t('uc.cre.dm1.who'), when: '2m',  av: '#37589f', msg: t('uc.cre.dm1.msg'), reply: t('uc.cre.dm1.reply') },
    { who: t('uc.cre.dm2.who'), when: '8m',  av: '#c5775a', msg: t('uc.cre.dm2.msg'), reply: t('uc.cre.dm2.reply') },
    { who: t('uc.cre.dm3.who'), when: '14m', av: '#7b6e98', msg: t('uc.cre.dm3.msg'), reply: t('uc.cre.dm3.reply') },
  ];
  return (
    <section className="uc-sec uc-sec--alt uc-sec--reverse" id="creators">
      <div className="uc-sec__inner">
        <div className="uc-sec__head">
          <div>
            <p className="uc-sec__num"><span>02</span>{t('uc.cre.tag')}</p>
            <h2 className="uc-sec__h">{t('uc.cre.h.a')}<em>{t('uc.cre.h.em')}</em>{t('uc.cre.h.b')}</h2>
          </div>
          <p className="uc-sec__b">{t('uc.cre.sub')}</p>
        </div>
        <div className="uc-sec__body">
          <div className="uc-sec__copy">
            <ul className="uc-list">
              <li className="uc-list__item">
                <p className="uc-list__before">{t('uc.cre.e1.before')}</p>
                <p className="uc-list__b">{t('uc.cre.e1.b.a')}<em>{t('uc.cre.e1.b.em')}</em>{t('uc.cre.e1.b.b')}</p>
              </li>
              <li className="uc-list__item">
                <p className="uc-list__before">{t('uc.cre.e2.before')}</p>
                <p className="uc-list__b">{t('uc.cre.e2.b')}</p>
              </li>
              <li className="uc-list__item">
                <p className="uc-list__before">{t('uc.cre.e3.before')}</p>
                <p className="uc-list__b"><s>{t('uc.cre.e3.s')}</s> → "<em>{t('uc.cre.e3.em')}</em>"</p>
              </li>
            </ul>
            <div className="uc-stat">
              <span className="uc-stat__big">{t('uc.cre.stat')}</span>
              <span className="uc-stat__lbl">{t('uc.cre.statLbl')}</span>
            </div>
            <div className="uc-apps">
              <span className="uc-apps__lbl">{t('uc.worksIn')}</span>
              <span className="uc-apps__pill">Instagram</span>
              <span className="uc-apps__pill"><img src="../../assets/app-whatsapp.png" alt="" />WhatsApp</span>
              <span className="uc-apps__pill">TikTok</span>
            </div>
          </div>

          <div className="uc-demo">
            <div className="uc-demo__chrome">
              <span className="uc-demo__dot is-r"></span>
              <span className="uc-demo__dot is-y"></span>
              <span className="uc-demo__dot is-g"></span>
              <span className="uc-demo__title">{t('uc.cre.demoTitle')}</span>
            </div>
            <div className="uc-demo__body">
              <div className="uc-dms">
                {dms.map((d, i) => (
                  <div key={i} className="uc-dm" style={{animationDelay: `${0.2 + i * 0.45}s`}}>
                    <div className="uc-dm__av" style={{background: d.av}}>{d.who[0]}</div>
                    <div className="uc-dm__body">
                      <div className="uc-dm__who">{d.who}<span>{d.when}</span></div>
                      <p className="uc-dm__msg">{d.msg}</p>
                      <div className="uc-dm__reply" style={{animationDelay: `${1.0 + i * 0.45}s`}}>
                        {d.reply}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3. DEVELOPERS */
function UCDevelopers() {
  const [, , t] = window.i18n.useLang();
  const DEV_DICTATION = t('uc.dev.dictation');
  const dictation = useTypewriter(DEV_DICTATION, { speed: 32, startDelay: 700, loopDelay: 6000 });
  const showCode = dictation.length === DEV_DICTATION.length;
  return (
    <section className="uc-sec" id="devs">
      <div className="uc-sec__head">
        <div>
          <p className="uc-sec__num"><span>03</span>{t('uc.dev.tag')}</p>
          <h2 className="uc-sec__h">{t('uc.dev.h.a')}<em>{t('uc.dev.h.em')}</em>{t('uc.dev.h.b')}</h2>
        </div>
        <p className="uc-sec__b">{t('uc.dev.sub')}</p>
      </div>
      <div className="uc-sec__body">
        <div className="uc-sec__copy">
          <ul className="uc-list">
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.dev.e1.before')}</p>
              <p className="uc-list__b">{t('uc.dev.e1.b.a')}<em>{t('uc.dev.e1.b.em1')}</em>{t('uc.dev.e1.b.b')}<em>{t('uc.dev.e1.b.em2')}</em>{t('uc.dev.e1.b.c')}</p>
            </li>
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.dev.e2.before')}</p>
              <p className="uc-list__b">{t('uc.dev.e2.b.a')}<em>{t('uc.dev.e2.b.em')}</em>{t('uc.dev.e2.b.b')}</p>
            </li>
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.dev.e3.before')}</p>
              <p className="uc-list__b">{t('uc.dev.e3.b')}</p>
            </li>
          </ul>
          <div className="uc-stat">
            <span className="uc-stat__big">{t('uc.dev.stat')}</span>
            <span className="uc-stat__lbl">{t('uc.dev.statLbl')}</span>
          </div>
          <div className="uc-apps">
            <span className="uc-apps__lbl">{t('uc.worksIn')}</span>
            <span className="uc-apps__pill"><img src="../../assets/app-vscode.png" alt="" />VS Code</span>
            <span className="uc-apps__pill">GitHub</span>
            <span className="uc-apps__pill">Linear</span>
          </div>
        </div>

        <div className="uc-demo">
          <div className="uc-demo__chrome">
            <span className="uc-demo__dot is-r"></span>
            <span className="uc-demo__dot is-y"></span>
            <span className="uc-demo__dot is-g"></span>
            <span className="uc-demo__title">{t('uc.dev.demoTitle')}</span>
          </div>
          <div className="uc-term">
            <span className="uc-term__line is-mic">{dictation}{!showCode && <span className="uc-term__caret"></span>}</span>
            {showCode && <React.Fragment>
              <span className="uc-term__line"></span>
              <span className="uc-term__line"><span className="uc-term__cmt">// Lingua → AI →</span></span>
              <span className="uc-term__line"><span className="uc-term__kw">useEffect</span>(() {'=>'} {'{'}</span>
              <span className="uc-term__line">{'  '}<span className="uc-term__kw">const</span> load = <span className="uc-term__kw">async</span> () {'=>'} {'{'}</span>
              <span className="uc-term__line">{'    '}<span className="uc-term__kw">try</span> {'{'}</span>
              <span className="uc-term__line">{'      '}<span className="uc-term__kw">const</span> r = <span className="uc-term__kw">await</span> <span className="uc-term__fn">fetch</span>(<span className="uc-term__str">'/api/users'</span>);</span>
              <span className="uc-term__line">{'      '}<span className="uc-term__fn">setUsers</span>(<span className="uc-term__kw">await</span> r.<span className="uc-term__fn">json</span>());</span>
              <span className="uc-term__line">{'    '}{'}'} <span className="uc-term__kw">catch</span> (e) {'{'} <span className="uc-term__fn">setErr</span>(e); {'}'}</span>
              <span className="uc-term__line">{'  '}{'}'};</span>
              <span className="uc-term__line">{'  '}<span className="uc-term__fn">load</span>();<span className="uc-term__caret"></span></span>
              <span className="uc-term__line">{'}'}, []);</span>
            </React.Fragment>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4. SALES */
function UCSales() {
  const [, , t] = window.i18n.useLang();
  const mails = [
    { who: t('uc.sales.m1.who'), sub: t('uc.sales.m1.sub'), time: '0:04' },
    { who: t('uc.sales.m2.who'), sub: t('uc.sales.m2.sub'), time: '0:11' },
    { who: t('uc.sales.m3.who'), sub: t('uc.sales.m3.sub'), time: '0:18' },
    { who: t('uc.sales.m4.who'), sub: t('uc.sales.m4.sub'), time: '0:24' },
  ];
  const [count, setCount] = React.useState(11);
  React.useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="uc-sec uc-sec--alt uc-sec--reverse" id="sales">
      <div className="uc-sec__inner">
        <div className="uc-sec__head">
          <div>
            <p className="uc-sec__num"><span>04</span>{t('uc.sales.tag')}</p>
            <h2 className="uc-sec__h">{t('uc.sales.h.a')}<em>{t('uc.sales.h.em')}</em>{t('uc.sales.h.b')}</h2>
          </div>
          <p className="uc-sec__b">{t('uc.sales.sub')}</p>
        </div>
        <div className="uc-sec__body">
          <div className="uc-sec__copy">
            <ul className="uc-list">
              <li className="uc-list__item">
                <p className="uc-list__before">{t('uc.sales.e1.before')}</p>
                <p className="uc-list__b">{t('uc.sales.e1.b')}</p>
              </li>
              <li className="uc-list__item">
                <p className="uc-list__before">{t('uc.sales.e2.before')}</p>
                <p className="uc-list__b">{t('uc.sales.e2.b.a')}<em>{t('uc.sales.e2.b.em')}</em>{t('uc.sales.e2.b.b')}</p>
              </li>
              <li className="uc-list__item">
                <p className="uc-list__before">{t('uc.sales.e3.before')}</p>
                <p className="uc-list__b"><s>{t('uc.sales.e3.s')}</s> → "<em>{t('uc.sales.e3.em')}</em>"</p>
              </li>
            </ul>
            <div className="uc-stat">
              <span className="uc-stat__big">{t('uc.sales.stat')}</span>
              <span className="uc-stat__lbl">{t('uc.sales.statLbl')}</span>
            </div>
            <div className="uc-apps">
              <span className="uc-apps__lbl">{t('uc.worksIn')}</span>
              <span className="uc-apps__pill"><img src="../../assets/app-gmail.png" alt="" />Gmail</span>
              <span className="uc-apps__pill"><img src="../../assets/app-outlook.png" alt="" />Outlook</span>
              <span className="uc-apps__pill">Salesforce</span>
            </div>
          </div>

          <div className="uc-demo">
            <div className="uc-demo__chrome">
              <span className="uc-demo__dot is-r"></span>
              <span className="uc-demo__dot is-y"></span>
              <span className="uc-demo__dot is-g"></span>
              <span className="uc-demo__title">{t('uc.sales.demoTitle')}</span>
            </div>
            <div className="uc-demo__body">
              <div className="uc-mail">
                {mails.map((m, i) => (
                  <div key={i} className="uc-mail__row" style={{animationDelay: `${0.25 + i * 0.4}s`}}>
                    <span className="uc-mail__check">✓</span>
                    <div>
                      <div className="uc-mail__who">{m.who}</div>
                      <div className="uc-mail__sub">{m.sub}</div>
                    </div>
                    <span className="uc-mail__time">{m.time}</span>
                  </div>
                ))}
              </div>
              <div className="uc-mail__counter">
                <span className="uc-mail__counter-n">{count}</span>
                <span className="uc-mail__counter-l">{t('uc.sales.counterLbl')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. STUDENTS */
function UCStudents() {
  const [, , t] = window.i18n.useLang();
  const lines = [
    t('uc.stu.note1'),
    t('uc.stu.note2'),
    t('uc.stu.note3'),
    t('uc.stu.note4'),
    t('uc.stu.note5'),
  ];
  return (
    <section className="uc-sec" id="students">
      <div className="uc-sec__head">
        <div>
          <p className="uc-sec__num"><span>05</span>{t('uc.stu.tag')}</p>
          <h2 className="uc-sec__h">{t('uc.stu.h.a')}<em>{t('uc.stu.h.em')}</em>{t('uc.stu.h.b')}</h2>
        </div>
        <p className="uc-sec__b">{t('uc.stu.sub')}</p>
      </div>
      <div className="uc-sec__body">
        <div className="uc-sec__copy">
          <ul className="uc-list">
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.stu.e1.before')}</p>
              <p className="uc-list__b">{t('uc.stu.e1.b.a')}<em>{t('uc.stu.e1.b.em')}</em>{t('uc.stu.e1.b.b')}</p>
            </li>
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.stu.e2.before')}</p>
              <p className="uc-list__b">{t('uc.stu.e2.b')}</p>
            </li>
            <li className="uc-list__item">
              <p className="uc-list__before">{t('uc.stu.e3.before')}</p>
              <p className="uc-list__b"><s>{t('uc.stu.e3.s')}</s> → "<em>{t('uc.stu.e3.em')}</em>"</p>
            </li>
          </ul>
          <div className="uc-stat">
            <span className="uc-stat__big">{t('uc.stu.stat')}</span>
            <span className="uc-stat__lbl">{t('uc.stu.statLbl')}</span>
          </div>
          <div className="uc-apps">
            <span className="uc-apps__lbl">{t('uc.worksIn')}</span>
            <span className="uc-apps__pill"><img src="../../assets/app-notion.avif" alt="" />Notion</span>
            <span className="uc-apps__pill">Google Docs</span>
            <span className="uc-apps__pill">Word</span>
          </div>
        </div>

        <div className="uc-demo">
          <div className="uc-demo__chrome">
            <span className="uc-demo__dot is-r"></span>
            <span className="uc-demo__dot is-y"></span>
            <span className="uc-demo__dot is-g"></span>
            <span className="uc-demo__title">{t('uc.stu.demoTitle')}</span>
          </div>
          <div className="uc-note">
            {lines.map((l, i) => (
              <div key={i} className="uc-note__line" style={{animationDelay: `${0.4 + i * 0.6}s`}}>
                <span className="uc-note__bullet">·</span>
                <span>
                  {i === 1 || i === 4
                    ? <span className="uc-note__hl">{l}</span>
                    : l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.UCHero = UCHero;
window.UCConsultants = UCConsultants;
window.UCCreators = UCCreators;
window.UCDevelopers = UCDevelopers;
window.UCSales = UCSales;
window.UCStudents = UCStudents;
