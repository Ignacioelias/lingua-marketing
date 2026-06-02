// reveal.js — lightweight scroll-reveal for the marketing site.
// Auto-tags section content (no per-component edits) and fades+rises it in on
// scroll, with a small per-sibling stagger. Hero is excluded (own motion).
// Honors prefers-reduced-motion. Plain JS — loads after React mounts; rescans
// a few times to catch Babel/React's async render + language re-renders.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // "Reveal units" — section intros, cards, tiles, rows. Curated + generic.
  var SEL = [
    '[data-reveal]',
    '.lg-section__title', '.lg-section__sub', '.lg-eyebrow',
    '.lg-apps__stage', '.lg-tone__intro', '.lg-tone__card',
    'main > section h2', 'main > section h3', 'main > section .lead',
    'main > section [class*="card"]', 'main > section [class*="tile"]',
    'main > section [class*="__item"]', 'main > section [class*="persona"]',
    'main > section [class*="love"]', 'main > section [class*="value"]',
    'main > section [class*="cta"]', 'main > section [class*="step"]'
  ];

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  var tagged = new WeakSet();
  function scan() {
    var set = new Set();
    SEL.forEach(function (s) {
      try { document.querySelectorAll(s).forEach(function (el) { set.add(el); }); } catch (_) {}
    });
    set.forEach(function (el) {
      if (tagged.has(el)) return;
      if (el.closest('.lg-hero')) return;            // hero animates itself
      if (el.closest('.lg-orbit')) return;           // orbit icons animate themselves
      tagged.add(el);
      el.classList.add('lg-reveal');
      // stagger siblings that are themselves reveal units
      var parent = el.parentElement;
      if (parent) {
        var sibs = [].slice.call(parent.children).filter(function (c) { return c.classList.contains('lg-reveal'); });
        var idx = sibs.indexOf(el);
        if (idx > 0) el.style.setProperty('--rd', (Math.min(idx, 6) * 0.06).toFixed(2) + 's');
      }
      // already in view on load? reveal next frame (no jarring pop)
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-in'); }); });
      } else {
        io.observe(el);
      }
    });
  }

  function boot() { scan(); setTimeout(scan, 350); setTimeout(scan, 1000); setTimeout(scan, 2200); }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
