// LoveLetters.jsx — testimonial grid
function LoveLetters() {
  const [, , t] = window.i18n.useLang();
  const quotes = [
    { who: t('love.who1'), role: t('love.role1'), img: window.__resources.personaTara,    q: t('love.q1') },
    { who: t('love.who2'), role: t('love.role2'), img: window.__resources.personaRahul,    q: t('love.q2') },
    { who: t('love.who3'), role: t('love.role3'), img: window.__resources.personaSuzanne,  q: t('love.q3') },
  ];
  return (
    <section className="lg-letters" id="love">
      <div className="lg-eyebrow">{t('love.eyebrow')}</div>
      <h2 className="lg-section__title">{t('love.title.a')}<em className="emphasis">{t('love.title.em')}</em>{t('love.title.b')}</h2>
      <div className="lg-letters__grid">
        {quotes.map((q, i) => (
          <article className="lg-letter" key={i}>
            <p className="lg-letter__q">"{q.q}"</p>
            <div className="lg-letter__who">
              <img src={q.img} alt="" />
              <div>
                <div className="lg-letter__name">{q.who}</div>
                <div className="lg-letter__role">{q.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
window.LoveLetters = LoveLetters;
