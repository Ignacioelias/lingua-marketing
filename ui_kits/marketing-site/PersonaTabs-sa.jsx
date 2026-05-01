// PersonaTabs.jsx — "Lingua is made for you"
function PersonaTabs() {
  const personas = [
    { id: 'consultants', tab: 'Consultants', em: 'Consultants', body: 'Decks, client memos, post-call recaps — the typing tax that eats your billable hours. Walk-and-talk your way through follow-ups, dictate frameworks straight into slides, and leave the office before sundown.', img: '../../assets/persona-consultant.png' },
    { id: 'creators', tab: 'Creators', em: 'Creators', body: 'Ideas hit fast, but execution is slow. Breeze through unread DMs, comment replies, and draft posts with your voice. Create more, type less.', img: '../../assets/persona-creator.png' },
    { id: 'devs', tab: 'Developers', em: 'Developers', body: 'Dictate in natural language and let Lingua translate — perfect for Cursor, VS Code, or wherever you build. From commit messages to refactors, stay in flow.', img: '../../assets/persona-developer.png' },
    { id: 'sales', tab: 'Sales', em: 'Sales', body: 'Slow follow-ups mean lost deals. Send instant follow-ups after meetings, personalize outreach, and punch up your pitch — without typing a word.', img: '../../assets/persona-sales.png' },
    { id: 'students', tab: 'Students', em: 'Students', body: 'Blank pages and looming deadlines? Lingua\'s got you. Capture lectures, draft cover letters, break through writer\'s block — all by talking.', img: '../../assets/persona-student.png' },
  ];
  const [active, setActive] = React.useState(personas[0].id);
  const cur = personas.find(p => p.id === active);
  return (
    <section className="lg-personas">
      <div className="lg-eyebrow">Built for you</div>
      <h2 className="lg-section__title">Lingua is made for <em className="emphasis">you</em>.</h2>
      <div className="lg-personas__tabs" role="tablist">
        {personas.map(p => (
          <button key={p.id} role="tab" aria-selected={p.id===active}
            className={`lg-personas__tab ${p.id===active?'is-active':''}`}
            onClick={() => setActive(p.id)}>{p.tab}</button>
        ))}
      </div>
      <div className="lg-personas__panel">
        <div className="lg-personas__copy">
          <h3 className="lg-personas__h">Lingua for <em className="emphasis">{cur.em}</em></h3>
          <p className="lg-personas__b">{cur.body}</p>
          <div className="lg-personas__ctas">
            <a className="lg-btn lg-btn--primary" href="#">Learn more</a>
            <a className="lg-btn lg-btn--ghost" href="#">Download for free</a>
          </div>
        </div>
        <div className="lg-personas__art"><img src={cur.img} alt="" /></div>
      </div>
    </section>
  );
}
window.PersonaTabs = PersonaTabs;
