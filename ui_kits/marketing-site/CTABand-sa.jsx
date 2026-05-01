// CTABand.jsx — dark "Start speaking" band
function CTABand() {
  return (
    <section className="lg-cta-band">
      <h2 className="lg-cta-band__t">Start <em className="emphasis">speaking</em>.</h2>
      <p className="lg-cta-band__b">Effortless voice dictation in every application. 4× faster than typing, with AI commands and auto-edits.</p>
      <div className="lg-cta-band__ctas">
        <a className="lg-btn lg-btn--blue" href="#"><img src="../../assets/wispr-icon-mic.svg" width="14" height="14" alt="" /> Try it free</a>
        <a className="lg-btn lg-btn--cream" href="#">Download for free</a>
      </div>
      <p className="lg-cta-band__fine">Available on Mac and Windows. No card required.</p>
    </section>
  );
}
window.CTABand = CTABand;
