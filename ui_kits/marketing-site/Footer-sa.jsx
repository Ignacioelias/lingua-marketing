// Footer.jsx
function Footer() {
  return (
    <footer className="lg-footer">
      <div className="lg-footer__cols">
        <div>
          <h4 className="lg-footer__h">Company</h4>
          <a href="about.html">About</a><a href="#">Careers</a><a href="#">Trust Center</a><a href="#">Affiliates</a><a href="#">Media kit</a>
        </div>
        <div>
          <h4 className="lg-footer__h">Product</h4>
          <a href="#">What's new</a><a href="#">Use cases</a><a href="#">Lingua for Students</a><a href="#">Non-profits</a><a href="#">Lingua for Business</a>
        </div>
        <div>
          <h4 className="lg-footer__h">Resources</h4>
          <a href="#">Workflows</a><a href="#">Talk to support</a><a href="#">Talk to sales</a>
        </div>
        <div>
          <h4 className="lg-footer__h">Get in touch</h4>
          <a href="#">hello@lingua.ai</a><a href="#">Twitter</a><a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="lg-footer__bottom">
        <img src="assets/lingua-wordmark.svg" height="22" alt="Lingua" />
        <span className="lg-footer__copy">© Lingua 2026 — The voice interface company</span>
        <span className="lg-footer__legal"><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Data controls</a></span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
