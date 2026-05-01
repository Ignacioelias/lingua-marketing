// Hero.jsx — Lingua marketing hero (i18n-aware)
//
// Three pieces:
//   - HeroAnim: curved word-stream + waveform + transcription card
//   - HeroTitle: typed headline ("Less" → "leyrb" typo → "keyboard" → ". More speak.")
//   - Hero: composes them with subtitle + CTAs
//
// The typed headline pulls all string fragments from i18n keys so it works
// in both ES and EN. The chars we type for the typo are deliberately wrong —
// in EN: "leyrb" (was "keybr"-ish typo, lands wrong). In ES: "tcedaol" (a
// scrambled "teclado"). The system erases these and types the real word.

// Persona portraits — real-photo headshots that match the tone & context of
// each testimonial. Sourced from randomuser.me (CC0, free to use), curated
// per phrase so the avatar reads as a plausible speaker:
//   0  novelist / writer (woman, calm)
//   1  knowledge worker (man, easy-going)
//   2  AI researcher / academic
//   3  founder / business owner (cost-conscious tone)
//   4  account manager dealing with clients
//   5  doctor (clinic, family dinners)
//   6  schoolteacher
//   7  productivity-driven operator
//   8  bilingual writer (ES↔EN)
//   9  photographer ("after the camera")
//   10 manager running meetings
//   11 journalist / weekly columnist
//   12 engineering lead (action log)
//   13 designer / creative
//   14 startup PM (output 3x)
//   15 older professional (RSI / fingers)
//   16 wellbeing-minded knowledge worker
//   17 quiet solo founder ("invisible engine")
//   18 consultant ("10 hours back")
//   19 screenwriter
const PERSONA_PHOTOS = [
  'https://randomuser.me/api/portraits/women/68.jpg',  // 0  novelist
  'https://randomuser.me/api/portraits/men/32.jpg',    // 1  knowledge worker
  'https://randomuser.me/api/portraits/men/76.jpg',    // 2  researcher
  'https://randomuser.me/api/portraits/women/44.jpg',  // 3  founder
  'https://randomuser.me/api/portraits/women/65.jpg',  // 4  account manager
  'https://randomuser.me/api/portraits/men/52.jpg',    // 5  doctor
  'https://randomuser.me/api/portraits/women/26.jpg',  // 6  teacher
  'https://randomuser.me/api/portraits/men/15.jpg',    // 7  operator
  'https://randomuser.me/api/portraits/women/12.jpg',  // 8  bilingual writer
  'https://randomuser.me/api/portraits/men/41.jpg',    // 9  photographer
  'https://randomuser.me/api/portraits/women/33.jpg',  // 10 meetings PM
  'https://randomuser.me/api/portraits/men/22.jpg',    // 11 journalist
  'https://randomuser.me/api/portraits/men/85.jpg',    // 12 engineering lead
  'https://randomuser.me/api/portraits/women/79.jpg',  // 13 designer
  'https://randomuser.me/api/portraits/men/9.jpg',     // 14 startup PM
  'https://randomuser.me/api/portraits/women/72.jpg',  // 15 older professional
  'https://randomuser.me/api/portraits/women/50.jpg',  // 16 wellbeing
  'https://randomuser.me/api/portraits/men/64.jpg',    // 17 solo founder
  'https://randomuser.me/api/portraits/men/18.jpg',    // 18 consultant
  'https://randomuser.me/api/portraits/women/8.jpg',   // 19 screenwriter
];

function PersonaAvatar({ index, size = 56 }) {
  const i = ((index % PERSONA_PHOTOS.length) + PERSONA_PHOTOS.length) % PERSONA_PHOTOS.length;
  const src = PERSONA_PHOTOS[i];
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      decoding="async"
      style={{
        display: 'block',
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        background: '#eee6d6',
      }}
    />
  );
}

// Preload all persona photos once, module-side, so the first swap-in
// renders instantly instead of blank-circle while the request flies. A
// module-scope cache survives the per-line remount that React does when
// the avatar's `key` changes, which is what was causing every face to
// re-download.
const PERSONA_PRELOADED = new Set();
function preloadPersonaPhotos() {
  if (typeof window === 'undefined') return;
  for (const src of PERSONA_PHOTOS) {
    if (PERSONA_PRELOADED.has(src)) continue;
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    PERSONA_PRELOADED.add(src);
  }
}

function HeroAnim() {
  const [lang, , t] = window.i18n.useLang();

  // Preload all persona photos once on mount so per-line remounts render
  // the face instantly instead of flashing a blank circle.
  React.useEffect(() => { preloadPersonaPhotos(); }, []);

  // Read 20 testimonials from the dictionary, keyed off `lang` (a stable
  // string) — `t` is a fresh closure each render and would re-fire useMemo
  // forever if used as a dep.
  const TESTIMONIAL_COUNT = 20;
  const TESTIMONIALS = React.useMemo(() => (
    Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => t(`hero.t.${i}`))
  ), [lang]);
  const transcribingLabel = t('hero.transcript.app');

  const ONE_PASS = TESTIMONIALS.join("   ·   ") + "   ·   ";
  const STREAM   = ONE_PASS + ONE_PASS;
  const wordCount = ONE_PASS.split(/\s+/).filter(Boolean).length;
  // Slowed 30% so phrases are easier to read along with the curved stream.
  const durationSec = Math.max(26, Math.round((wordCount / 270) * 60 * 1.3));

  const textPathRef = React.useRef(null);
  const offsetRef   = React.useRef(0);

  const [transcript, setTranscript] = React.useState(() => [
    { id: 'init-0', text: TESTIMONIALS[0], personaIdx: 0, age: 1 },
    { id: 'init-1', text: TESTIMONIALS[1], personaIdx: 1, age: 0 },
  ]);
  const [pumKey, setPumKey] = React.useState(0);
  // Track which lang the transcript was seeded with, so we only reseed when
  // it actually flips. Using a ref + effect avoids depending on the memoized
  // TESTIMONIALS array (which, despite useMemo, was apparently still
  // triggering the reseed effect on first paint and storming setState).
  const seededLangRef = React.useRef(lang);

  // When language flips, reseed the transcript with the new lines.
  React.useEffect(() => {
    if (seededLangRef.current === lang) return;
    seededLangRef.current = lang;
    setTranscript([
      { id: 'seed-' + lang + '-0', text: TESTIMONIALS[0], personaIdx: 0, age: 1 },
      { id: 'seed-' + lang + '-1', text: TESTIMONIALS[1], personaIdx: 1, age: 0 },
    ]);
    setPumKey(k => k + 1);
  }, [lang, TESTIMONIALS]);

  React.useEffect(() => {
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      offsetRef.current -= (dt / durationSec) * 50;
      if (offsetRef.current <= -50) offsetRef.current += 50;
      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offsetRef.current}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationSec]);

  React.useEffect(() => {
    let cancelled = false;
    let nextIdx = 2;
    const INTERVAL_MS = 5070; // 3900 * 1.3 → 30% slower so each line lingers

    const drop = () => {
      if (cancelled) return;
      const personaIdx = nextIdx % TESTIMONIALS.length;
      const line = TESTIMONIALS[personaIdx];
      nextIdx++;
      setTranscript((prev) => {
        const stamped = [...prev, { id: Date.now(), text: line, personaIdx, age: 0 }]
          .map((tt, i, arr) => ({ ...tt, age: arr.length - 1 - i }))
          .slice(-3);
        return stamped;
      });
      setPumKey((k) => k + 1);
      setTimeout(drop, INTERVAL_MS);
    };

    const initial = setTimeout(drop, INTERVAL_MS);
    return () => { cancelled = true; clearTimeout(initial); };
  }, [TESTIMONIALS]);

  return (
    <div className="lg-hero-anim" aria-hidden="true">
      <svg
        className="lg-hero-anim__svg"
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="lg-anim-path"
            fill="none"
            d="
              M -300  140
              C   60   30,  280  10,  450 100
              C  580  170,  640  220,  720  220
              C  800  220,  860  170,  990  100
              C 1160   10, 1380   30, 1700  140
            "
          />
          <linearGradient id="lg-anim-fade" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#0e1116" stopOpacity="0" />
            <stop offset="10%"  stopColor="#0e1116" stopOpacity="0.65" />
            <stop offset="40%"  stopColor="#0e1116" stopOpacity="0.65" />
            <stop offset="46%"  stopColor="#0e1116" stopOpacity="0.12" />
            <stop offset="54%"  stopColor="#0e1116" stopOpacity="0.12" />
            <stop offset="60%"  stopColor="#0e1116" stopOpacity="0.85" />
            <stop offset="90%"  stopColor="#0e1116" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0e1116" stopOpacity="0" />
          </linearGradient>
        </defs>

        <text className="lg-hero-anim__text" fill="url(#lg-anim-fade)">
          <textPath ref={textPathRef} href="#lg-anim-path" startOffset="0%">
            {STREAM}
          </textPath>
        </text>
      </svg>

      <div className="lg-hero-anim__pill">
        <div className="lg-hero-anim__wave">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 8) * 0.09}s` }} />
          ))}
        </div>
      </div>

      <div className="lg-hero-anim__transcript" key={pumKey}>
        <div className="lg-hero-anim__transcript-head">
          <span className="lg-hero-anim__dot" />
          <span className="lg-hero-anim__app">{transcribingLabel}</span>
        </div>
        <div className="lg-hero-anim__transcript-body">
          {transcript.map((tt) => (
            <p
              key={tt.id}
              className={`lg-hero-anim__line lg-hero-anim__line--age${tt.age}`}
            >
              {tt.text}
            </p>
          ))}
          <span className="lg-hero-anim__cursor" />
        </div>
        {(() => {
          const newest = transcript.find((tt) => tt.age === 0) || transcript[transcript.length - 1];
          if (!newest) return null;
          return (
            <div
              className="lg-hero-anim__persona"
              key={'persona-' + newest.id}
              aria-hidden="true"
            >
              <PersonaAvatar index={newest.personaIdx} size={56} />
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function HeroTitle() {
  const [, , t] = window.i18n.useLang();

  // Headline is "<head><emphasized word>." on a single line.
  //   EN: "don't " + (typo "tuoe" → erase to "t" → "type") + "."
  //   ES: "no "    + (typo "esbric" → erase to "e" → "escribas") + "."
  //
  // The head text is static — it sits there from the start. Only the
  // emphasized word animates, and it does it once: type a typo, backspace
  // down to just the first letter, then type the rest of the real word.
  // The tail typo MUST start with the same first letter as the tail target.
  const head       = t('hero.title.start');     // "don't " / "no "
  const tailTarget = t('hero.title.tail.em');   // "type" / "escribas"
  const tailTypo   = t('hero.title.tail.typo'); // "tuoe" / "esbric"
  const tailDot    = t('hero.title.tail.dot');  // "."

  // After erasing the typo down to its first letter, we type the rest of
  // the real word (target without its first character).
  const tailRest = tailTarget.slice(1);

  const STEPS = React.useMemo(() => ([
    { wait: 360 },                       // brief beat before the word starts
    { type: tailTypo },                  // type the typo, e.g. "tuoe"
    { wait: 320 },
    { del: tailTypo.length - 1 },        // backspace down to just the first letter
    { wait: 160 },
    { type: tailRest },                  // finish the real word
    { wait: 180 },
    { revealDot: true },
  ]), [tailTypo, tailRest]);

  const [tail, setTail] = React.useState("");
  const [dotVisible, setDotVisible] = React.useState(false);
  const [stepIdx, setStepIdx] = React.useState(0);
  const [subProgress, setSubProgress] = React.useState(0);

  // Reset when language switches (STEPS identity changes).
  React.useEffect(() => {
    setTail("");
    setDotVisible(false);
    setStepIdx(0);
    setSubProgress(0);
  }, [STEPS]);

  React.useEffect(() => {
    const step = STEPS[stepIdx];
    if (!step) return;

    if (step.wait != null) {
      const id = setTimeout(() => setStepIdx((i) => i + 1), step.wait);
      return () => clearTimeout(id);
    }

    if (step.revealDot) {
      setDotVisible(true);
      setStepIdx((i) => i + 1);
      return;
    }

    if (step.type) {
      if (subProgress >= step.type.length) {
        setSubProgress(0);
        setStepIdx((i) => i + 1);
        return;
      }
      const delay = 139 + Math.random() * 56;
      const id = setTimeout(() => {
        setTail((s) => s + step.type[subProgress]);
        setSubProgress((p) => p + 1);
      }, delay);
      return () => clearTimeout(id);
    }

    if (step.del != null) {
      if (subProgress >= step.del) {
        setSubProgress(0);
        setStepIdx((i) => i + 1);
        return;
      }
      const id = setTimeout(() => {
        setTail((s) => s.slice(0, -1));
        setSubProgress((p) => p + 1);
      }, 49 + Math.random() * 28);
      return () => clearTimeout(id);
    }
  }, [stepIdx, subProgress, STEPS]);

  const isFinished = stepIdx >= STEPS.length;

  return (
    <h1 className="lg-hero__title">
      <span className="lg-hero__typed">{head}</span>
      <em className="emphasis">{tail}</em>
      {!isFinished && <span className="lg-hero__caret" aria-hidden="true" />}
      {dotVisible && <span className="lg-hero__typed">{tailDot}</span>}
    </h1>
  );
}

function Hero() {
  const [, , t] = window.i18n.useLang();
  return (
    <section className="lg-hero" id="home">
      <div className="lg-eyebrow">{t('hero.eyebrow')}</div>
      <HeroTitle />
      <p className="lg-hero__sub">
        {t('hero.sub')}
      </p>
      <div className="lg-hero__platforms">
        <span><img src="../../assets/icon-apple.svg" width="14" height="14" alt="" /> {t('hero.platform.mac')}</span>
        <span><img src="../../assets/icon-windows.svg" width="14" height="14" alt="" /> {t('hero.platform.windows')}</span>
      </div>
      <div className="lg-hero__ctas">
        <a className="lg-btn lg-btn--blue" href="typing-test.html">{t('hero.cta.test')}</a>
        <a
          className="lg-btn lg-btn--blue"
          href="#download"
          onClick={(e)=>{e.preventDefault();alert('Download flow → wire to wisprflow.onelink equivalent')}}
        ><img src="../../assets/wispr-icon-mic.svg" width="14" height="14" alt="" /> {t('hero.cta.try')}</a>
      </div>
      <p className="lg-hero__fine">{t('hero.fine')}</p>

      <HeroAnim />
    </section>
  );
}
window.Hero = Hero;
