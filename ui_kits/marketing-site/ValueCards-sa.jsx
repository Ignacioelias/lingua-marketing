// ValueCards.jsx — Lingua's four mission values
function ValueCards() {
  const values = [
    { eb: '01 / Mission', t: 'We eliminate the', em: 'keyboard.', body: 'The keyboard was a workaround. Speaking is the most natural interface humans have ever had — Lingua makes it the fastest one too.', icon: '../../assets/icon-toggles.svg' },
    { eb: '02 / Mission', t: 'We give you back your', em: 'time.', body: 'Speech is 4× faster than typing. Across a year, that\'s weeks of your life returned, not spent pecking at keys.', icon: '../../assets/icon-award.svg' },
    { eb: '03 / Mission', t: 'We lower the barriers to', em: 'technology.', body: 'Anyone with a voice can use a computer. No training, no manuals — just say what you mean and Lingua takes care of the rest.', icon: '../../assets/icon-users.svg' },
    { eb: '04 / Mission', t: 'We build things that feel like', em: 'magic.', body: 'Attention to detail, end to end. Lingua should feel less like software and more like talking to a friend who happens to type at 220 wpm.', icon: '../../assets/wispr-mic-2.svg' },
  ];
  return (
    <section className="lg-values">
      <div className="lg-eyebrow">What we believe</div>
      <h2 className="lg-section__title" style={{maxWidth: 720, margin: '8px auto 40px'}}>Four things we won't compromise on.</h2>
      <div className="lg-values__grid">
        {values.map((v, i) => (
          <article className="lg-value" key={i}>
            <img className="lg-value__icon" src={v.icon} alt="" />
            <div className="lg-value__eb">{v.eb}</div>
            <h3 className="lg-value__t">{v.t} <em className="emphasis">{v.em}</em></h3>
            <p className="lg-value__b">{v.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.ValueCards = ValueCards;
