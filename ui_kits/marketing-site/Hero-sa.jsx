// Hero.jsx — Lingua marketing hero
// Wispr-style hero animation: ONE long stream of raw, messy speech flows along
// a curved SVG path. The path arcs in from the upper-left, dips through a
// central waveform pill, and exits down/right. Text scrolls at ~80 wpm.
//
// Implementation:
//   - SVG <textPath> attached to a curved <path>.
//   - We animate startOffset via SMIL <animate> (well-supported, smoothly
//     follows the curve — CSS transforms can't do this).
//   - The text content is duplicated so the loop is seamless.

function HeroAnim() {
  // Hero animation tells the speech-to-text story in two registers:
  //
  //   TOP: a curved stream of words flowing through a central waveform pill
  //        — this is "what's being spoken".
  //   BOTTOM: a transcription card — this is "what gets written".
  //
  // The flow plays in cycles: it streams for a few seconds, then PAUSES (the
  // waveform calms, the curve text freezes) and at that exact moment a
  // chunk of finalized text "pums" into the transcription card. After a
  // brief beat it resumes the flow with the next testimonial. The card
  // keeps the last 3 transcribed lines, oldest fading out at the top.
  const TESTIMONIALS = [
    "I write entire chapters while pacing the living room.",
    "My wrist's chronic tendinitis barely bothers me anymore.",
    "I went from three thousand words a day to almost six thousand, effortlessly.",
    "My terminal is my life, and Lingua is invisible.",
    "I say useEffect and useEffect appears — not use effect.",
    "My pull requests finally have decent descriptions.",
    "I went from twenty minutes to write an email to two.",
    "I read in English, think in Spanish, and dictate mixing the two.",
    "I do interviews in the morning and have the article half-written by afternoon.",
    "I've doubled the pieces I deliver each month without working more hours.",
    "I used to spend two hours a day typing; now it's twenty minutes.",
    "I answer complex emails over coffee, in thirty seconds.",
    "I used to leave the clinic at nine; now I leave at seven thirty.",
    "My wife says I've given her family dinners back.",
    "Patients notice I'm paying them more attention.",
  ];

  // The curve always shows the SAME long stream (so it never empties), but
  // the *speed* drops to zero during a pause. We drive startOffset by
  // accumulating delta-time gated by a "playing" flag.
  const ONE_PASS = TESTIMONIALS.join("   ·   ") + "   ·   ";
  const STREAM   = ONE_PASS + ONE_PASS;
  const wordCount = ONE_PASS.split(/\s+/).filter(Boolean).length;
  // Effective scroll speed (wpm) while playing. 270 wpm = visibly rushing.
  const durationSec = Math.round((wordCount / 270) * 60);

  const textPathRef = React.useRef(null);
  const offsetRef   = React.useRef(0); // current startOffset in %, drifts negative

  // Transcription card: rolling buffer of finalized lines.
  const [transcript, setTranscript] = React.useState([
    { id: 0, text: TESTIMONIALS[0], age: 1 },
    { id: 1, text: TESTIMONIALS[1], age: 0 },
  ]);
  const [pumKey, setPumKey] = React.useState(0); // bumps every time a new line lands

  // 1) Smooth rAF loop drives startOffset — the curve is continuous, never stops.
  React.useEffect(() => {
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      offsetRef.current -= (dt / durationSec) * 50; // 0% → -50% per loop
      if (offsetRef.current <= -50) offsetRef.current += 50; // seamless wrap
      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offsetRef.current}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationSec]);

  // 2) Cycle: every ~3.9s a new finalized line POPs into the transcript card.
  //    The curve stream and waveform NEVER stop — they're continuous registers
  //    of "what's being spoken" and only the transcript on the right updates
  //    in discrete beats.
  React.useEffect(() => {
    let cancelled = false;
    let nextIdx = 2; // first two are already seeded above
    const INTERVAL_MS = 3900;

    const drop = () => {
      if (cancelled) return;
      const line = TESTIMONIALS[nextIdx % TESTIMONIALS.length];
      nextIdx++;
      setTranscript((prev) => {
        const stamped = [...prev, { id: Date.now(), text: line, age: 0 }]
          .map((t, i, arr) => ({ ...t, age: arr.length - 1 - i }))
          .slice(-3);
        return stamped;
      });
      setPumKey((k) => k + 1);
      setTimeout(drop, INTERVAL_MS);
    };

    const initial = setTimeout(drop, INTERVAL_MS);
    return () => { cancelled = true; clearTimeout(initial); };
  }, []);

  return (
    <div className="lg-hero-anim" aria-hidden="true">
      <svg
        className="lg-hero-anim__svg"
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Flowing path — arcs in from upper-left, dips through the pill, exits down-right. */}
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

      {/* Central waveform pill — always pulsing, the continuous "sound" register */}
      <div className="lg-hero-anim__pill">
        <div className="lg-hero-anim__wave">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 8) * 0.09}s` }} />
          ))}
        </div>
      </div>

      {/* Transcription card — the "what gets written" register */}
      <div className="lg-hero-anim__transcript" key={pumKey}>
        <div className="lg-hero-anim__transcript-head">
          <span className="lg-hero-anim__dot" />
          <span className="lg-hero-anim__app">Lingua  ·  transcribing</span>
        </div>
        <div className="lg-hero-anim__transcript-body">
          {transcript.map((t) => (
            <p
              key={t.id}
              className={`lg-hero-anim__line lg-hero-anim__line--age${t.age}`}
            >
              {t.text}
            </p>
          ))}
          <span className="lg-hero-anim__cursor" />
        </div>
      </div>
    </div>
  );
}

function HeroTitle() {
  // Animated headline: types "Less " then makes realistic mistakes on "keyboard",
  // erases, retries, corrects, then ". More speak." appears instantly. ~55 wpm.
  //
  // 55 wpm × 5 chars/word ≈ 275 cpm ≈ 218 ms per character. We add small jitter
  // for human-feel and a longer pause before each backspace burst.
  //
  // Sequence (each step is "type these chars" or "delete N chars" or "wait ms"):
  //   Type "Less "
  //   Type "leyrb"        ← typo
  //   Delete "leyrb"      ← back to "Less "
  //   Type "keyboart"     ← almost! one wrong letter at the end
  //   Delete "t"          ← drop the t
  //   Type "d"            ← "keyboard" ✓
  //   Reveal ". More speak." instantly
  //   Hold, then loop.

  const FINAL_TAIL = ". More "; // appears with "speak" italic right after "keyboard"
  const STEPS = React.useMemo(() => ([
    { type: "Less " },
    { wait: 126 },
    { type: "leyrb" },
    { wait: 292 },              // realize the mistake
    { del: 5 },                 // erase "leyrb"
    { wait: 153 },
    { type: "keyboart" },
    { wait: 264 },              // notice the t
    { del: 1 },                 // erase "t"
    { wait: 83 },
    { type: "d" },              // "keyboard"
    { wait: 153 },
    { revealTail: true },       // reveal ". More speak." instantly
    // animation ends here — no reset, headline stays fixed
  ]), []);

  const [typed, setTyped] = React.useState("");        // text after "Less " ... up through "keyboard"
  const [tailVisible, setTailVisible] = React.useState(false);
  const [stepIdx, setStepIdx] = React.useState(0);
  const [subProgress, setSubProgress] = React.useState(0); // chars consumed within the current type/del step

  React.useEffect(() => {
    const step = STEPS[stepIdx];
    if (!step) return; // animation finished — leave headline frozen

    if (step.wait != null) {
      const t = setTimeout(() => setStepIdx((i) => i + 1), step.wait);
      return () => clearTimeout(t);
    }

    if (step.revealTail) {
      setTailVisible(true);
      setStepIdx((i) => i + 1);
      return;
    }

    if (step.type) {
      if (subProgress >= step.type.length) {
        setSubProgress(0);
        setStepIdx((i) => i + 1);
        return;
      }
      // Base typing speed sped up another 20% → ~152ms
      const delay = 139 + Math.random() * 56;
      const t = setTimeout(() => {
        setTyped((s) => s + step.type[subProgress]);
        setSubProgress((p) => p + 1);
      }, delay);
      return () => clearTimeout(t);
    }

    if (step.del != null) {
      if (subProgress >= step.del) {
        setSubProgress(0);
        setStepIdx((i) => i + 1);
        return;
      }
      // backspaces are a bit faster than typing — sped up another 20%
      const t = setTimeout(() => {
        setTyped((s) => s.slice(0, -1));
        setSubProgress((p) => p + 1);
      }, 49 + Math.random() * 28);
      return () => clearTimeout(t);
    }
  }, [stepIdx, subProgress, STEPS]);

  const isFinished = stepIdx >= STEPS.length;

  return (
    <h1 className="lg-hero__title">
      <span className="lg-hero__typed">{typed}</span>
      {!isFinished && <span className="lg-hero__caret" aria-hidden="true" />}
      {tailVisible && (
        <span className="lg-hero__tail">
          .<br />More <em className="emphasis">speak</em>.
        </span>
      )}
    </h1>
  );
}

function Hero() {
  return (
    <section className="lg-hero">
      <div className="lg-eyebrow">Our mission</div>
      <HeroTitle />
      <p className="lg-hero__sub">
        The voice-to-text AI that turns what you say into clear, polished writing — in every app you use.
      </p>
      <div className="lg-hero__platforms">
        <span><img src="../../assets/icon-apple.svg" width="14" height="14" alt="" /> Mac</span>
        <span><img src="../../assets/icon-windows.svg" width="14" height="14" alt="" /> Windows</span>
      </div>
      <div className="lg-hero__ctas">
        <a className="lg-btn lg-btn--blue" href="typing-test.html">Start typing test</a>
      </div>
      <p className="lg-hero__fine">See how much time Lingua saves you. Takes about 30 seconds.</p>

      <HeroAnim />
    </section>
  );
}
window.Hero = Hero;
