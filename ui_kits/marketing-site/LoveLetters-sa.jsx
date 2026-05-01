// LoveLetters.jsx — testimonial grid
function LoveLetters() {
  const quotes = [
    { who: 'Sarah Sanders', role: 'Founding Partner, Large Spanish VC', img: '../../assets/persona-tara.avif',
      q: "You're making texting actually delightful right now. I can see this becoming a can't-live-without product fast." },
    { who: 'Rahul Vora', role: 'CEO, Silicon Valley Startup', img: '../../assets/persona-rahul.avif',
      q: 'This is the best AI product I\'ve used since ChatGPT.' },
    { who: 'Suzanne Xie', role: 'Partner, Management Consulting', img: '../../assets/persona-suzanne.avif',
      q: "I've been using Lingua almost every day since I downloaded it. It's probably my favorite part of the day, especially clearing my inbox." },
  ];
  return (
    <section className="lg-letters">
      <div className="lg-eyebrow">Lingua love</div>
      <h2 className="lg-section__title">Love letters to <em className="emphasis">Lingua</em>.</h2>
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
