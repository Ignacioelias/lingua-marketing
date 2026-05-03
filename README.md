# Lingua Design System

**Live:** <https://ignacioelias.github.io/lingua-marketing/ui_kits/marketing-site/index.html> — root `/` redirects there.

This repo hosts the Claude-Design handoff bundle as a static site on GitHub Pages. The site is React-via-Babel + plain CSS, no build step.

---

> Lingua is software that **transcribes what you say** to make life easier and technology accessible to everyone. Our mission: eliminate the keyboard, save people time, lower the barriers to technology, and redefine how humans interact with machines.

This design system encodes Lingua's voice — both the brand voice and the literal one — into reusable visual foundations, components, and UI kit recreations so any agent or designer can ship on-brand work in minutes.

---

## Sources & references

| Source | What we used it for |
|---|---|
| **Wispr Flow** — `https://wisprflow.ai/` | Primary visual + interaction reference. The user explicitly asked Lingua to mirror Wispr's look-and-feel since the products are similar. We pulled hero structure, the cream/ink palette, the italic-serif emphasis pattern, the rounded UI frames and the small-line-icon family. |
| **Wispr Flow About** — `https://wisprflow.ai/about` | Mission/value framing, "we care about…" cadence, conversational tone. |
| **Lingua repo** — `tobyc11/Lingua` (GitHub) | ❗ **Inaccessible.** The GitHub App is not installed on `tobyc11`'s account. Banner shown to user; once installed we should re-import for any Lingua-specific brand assets, source copy, or actual logo files. |

> ⚠️ **Caveat — fonts.** We do not have Lingua-licensed type, and Wispr's exact custom sans (Söhne-like) is not freely available. We substitute **Geist** for the primary sans, **Instrument Serif (italic)** for emphasis, and **Geist Mono** for code. If/when Lingua provides licensed fonts, swap the `@font-face`/Google Fonts import in `colors_and_type.css`.

---

## Index

```
.
├── README.md                ← you are here
├── SKILL.md                 ← Agent SKill manifest (cross-compat)
├── colors_and_type.css      ← all CSS vars: color, type, spacing, shadow, radius
├── assets/                  ← logos, app icons, line-icon family, photography, UI frames
├── preview/                 ← Design System cards (auto-rendered in DS tab)
└── ui_kits/
    └── marketing-site/      ← Lingua marketing site recreation
        ├── README.md
        ├── index.html       ← clickable homepage
        ├── Nav.jsx
        ├── Hero.jsx
        ├── AppGrid.jsx
        ├── ValueCards.jsx
        ├── PersonaTabs.jsx
        ├── LoveLetters.jsx
        ├── CTABand.jsx
        └── Footer.jsx
```

---

## Content fundamentals

Lingua's voice borrows the warmth and confidence of Wispr Flow but rotates the message toward our **mission values**: eliminating the keyboard, giving people their time back, lowering the barriers to tech, building things that feel like magic.

### Tone & posture
- **Conversational and warm**, never corporate. We talk to one human, not a market segment.
- **Confident, not loud.** Short, declarative sentences carry the weight; we don't shout in caps.
- **Plain over clever.** "Don't type. Just speak." beats any pun.
- **Magic > tech specs.** We describe outcomes (*"goes from rambled thought to perfect text"*) not pipelines.
- **Inclusive.** Accessibility is a first-class story, not a footer link.

### Person & casing
- **You / your** for the reader. **We / our** for Lingua. Never "users."
- Sentence case for headlines and buttons (`Download for free`, not `DOWNLOAD FOR FREE`).
- ALL-CAPS only for tiny eyebrow labels (`GET STARTED`, `FLOW FOR…`) with wide letter-spacing.
- One italic-serif word per heading is the brand's signature emphasis, e.g. **Lingua for *Creators***, **The keyboard is *over***. Use sparingly — once per section.

### Punctuation & rhythm
- Em dashes for asides — like this — keep prose breathy.
- Avoid exclamation points except in user testimonials.
- Numerals welcome in marketing copy: "4× faster," "220 wpm," "100+ languages."
- Contractions ("you're," "we're," "don't") — formal voice feels like a different brand.

### Emoji & symbols
- **No decorative emoji** in product UI or marketing body copy.
- Country-flag emoji are acceptable *only* in the language list (the one place Wispr uses them).
- Unicode symbols like `→` and `×` are fine in microcopy.

### Example messages (Lingua-authored)

| Where | Copy |
|---|---|
| Hero headline | **Don't type. Just speak.** |
| Hero sub | The voice-to-text AI that turns what you say into clear, polished writing — in every app. |
| Value 1 | We *eliminate* the keyboard. |
| Value 2 | We give you your *time* back. |
| Value 3 | We lower the *barriers* to technology. |
| Value 4 | We build things that feel like *magic*. |
| Section eyebrow | OUR MISSION |
| CTA primary | Download for free |
| CTA secondary | Try Lingua in your browser |
| Persona card | Lingua for *Accessibility* — Your voice deserves a shortcut. |
| Footer micro | Available on Mac and Windows. No card required. |

---

## Visual foundations

### Color
A two-temperature palette: **warm cream + deep ink** for surfaces, **electric blue** as the only true brand accent. Cream is the default page background (NOT pure white) — it is the single biggest signal of "this is Lingua." Pure white is reserved for cards/UI frames floating on the cream.

- **Lingua Blue** `#3791bf` — links, primary buttons, mic-active state, active waveform.
- **Cream** `#f6f1ea` and **Cream-2** `#ede5d9` — page bg, secondary surfaces.
- **Ink** `#0e1116` — primary text and dark-mode bands (used for "Start flowing" CTA bands).
- **Coral pop** `#ff6b4a` — used once or twice per page (tiny squiggly underlines, single icon highlight). Never as a background.
- Semantic green/amber/red for system feedback only. Avoid in marketing.

### Type
- **Headlines:** Geist 600, tight tracking (`-0.025em`), generous size (48–84px on hero).
- **One italic serif word** per headline using *Instrument Serif italic* (substitute for Wispr's serif emphasis face).
- **Body:** Geist 400, 17/1.55, on cream background. `text-wrap: pretty` everywhere.
- **Eyebrows:** 12px, 500, uppercase, letter-spacing `0.14em`, muted color.
- **Numbers as copy** ("220 wpm") get the same Geist sans, no tabular figures needed.

### Spacing & layout
- 8-pt base scale exposed as `--space-1` through `--space-10`.
- Section vertical rhythm: 96px top/bottom on desktop, 48px on mobile.
- Container max-width 1200px, page gutter 24/48px.
- **Cards** float on the cream background with `--radius-lg` (24px) and `--shadow-card-cream` — a soft brown-tinted shadow, not a generic gray.
- Fixed elements: top nav is sticky and translucent (`backdrop-filter: blur(12px)` over cream at 80% opacity).

### Imagery
- **UI frames** are the hero asset: rounded 24–32px corners, soft drop shadow, often tilted 0–4° for life.
- **Persona portraits** are warm-toned, slightly desaturated (NOT b&w, NOT cool). Round 56–80px on testimonial cards.
- **App-logo grid** uses each app's real logo on a **transparent background** — never inside a colored chip. Marquee/carousel effect.
- **No stock illustrations**, no AI-generated imagery, no purple-blue gradient blobs.
- Backgrounds: **flat cream** is default. The dark CTA band (`--color-bg-ink`) is the second background. **No gradients on hero.**

### Iconography
- **Single line-icon family** (the `ni-*` set lifted from Wispr's CDN, stored in `assets/`). 1.5px stroke, rounded caps, mostly monochrome ink.
- **Mic / waveform** is the brand's signature mark — the wordmark mark itself is a 5-bar waveform.
- App-integration logos use the real brand logo (Slack, Notion, Cursor, Claude, Figma…).
- Platform symbols (Apple, Windows, Android) are official mono glyphs.
- **Never use emoji as icons.** **Never hand-roll a new icon** — if missing, fall back to `assets/icon-*.svg` from this kit.

### Animation
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-cubic-soft) for most things; `cubic-bezier(0.34, 1.56, 0.64, 1)` for the rare playful bounce on the mic.
- **Durations:** 180ms micro (hover), 320ms standard (panel/card), 600–900ms hero illustrations.
- **Logo marquee:** continuous linear scroll at ~40s/cycle, paused on hover.
- **Mic pulse:** breathing scale 1.0 → 1.06 over 1.6s, infinite, when "listening."
- **Number counters** animate up on scroll (45 wpm → 220 wpm).
- No bouncy/spring effects on UI. No parallax. Reduced motion respected throughout.

### Hover & press states
- **Buttons:** primary darkens 8% on hover (`--color-brand-blue` → `--color-brand-blue-deep`); press scales `0.98`.
- **Links / nav items:** color shifts ink → Lingua blue, no underline change.
- **Cards:** lift `translateY(-2px)` and shadow grows from `--shadow-sm` to `--shadow-md`. No color change.
- **Icon buttons:** background fills `--color-bg-cream-2` on hover.

### Borders, shadows & elevation
- Hairlines `1px solid var(--color-border)` — beige, NOT gray, on cream surfaces.
- On white panels: `--color-border-mist`.
- Three-tier shadow: `--shadow-sm / md / lg`. The signature **`--shadow-card-cream`** has a brown undertone (`rgba(58,42,16,0.06)`) to feel printed, not digital.
- **No inner shadows** in this system. **No neumorphism.**

### Corner radii
- 6 / 10 / 16 / 24 / 32 / pill. Buttons are pill (999px). Cards are 24px. UI frames are 32px. Inputs are 10px. Avatars are 50%.

### Transparency & blur
- Used in exactly two places: (1) the sticky nav, (2) the floating "Try Lingua" mic widget. Everywhere else, surfaces are opaque.

### Layout rules
- 12-column grid, 24px gutter.
- Hero is full-bleed cream; floating UI frame is centered, ~70% column width on desktop.
- "Persona" cards lay out as a horizontal tab strip on desktop, vertical stack on mobile.
- Footer is full-bleed cream, 4-column link list, mark + tagline left.

### Imagery temperature
- Warm-leaning. Slight golden cast on photography, never cold/blue. Persona shots are natural-light, candid.

---

## Iconography

Lingua uses a **single-family line-icon set** lifted from the Wispr CDN (the `ni-*` series — `ni-toggles.svg`, `ni-lock.svg`, `ni-pen-line.svg`, etc.) plus the official platform glyphs (Apple, Windows, Android) and real third-party app logos.

- Files live in `assets/icon-*.svg` and `assets/app-*.{webp,avif}`.
- Stroke weight: ~1.5px. Caps: rounded. Color: inherits `currentColor`.
- Sizes: 16 / 20 / 24 / 32 px. Anything bigger should be a graphic, not an icon.
- **No SVGs are hand-drawn in this kit.** If a needed icon is missing, the closest match from `assets/` should be used; if truly absent, pull from Lucide CDN (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`) — flag the substitution to the team.
- **Emoji** is allowed in exactly two places: country flags in the language list, and (rare) user-supplied content like dictionary entries. Never decoratively.
- **Logos:** `assets/lingua-wordmark.svg` (full lockup) and `assets/lingua-mark.svg` (square mark) are the only official Lingua marks. The mark is a 5-bar waveform on a near-black rounded square.

---

This README is the entry point. Open `colors_and_type.css` for tokens and the `ui_kits/marketing-site/` folder for a working clickable recreation. The DS tab also previews the system as cards.

---

## Manifest (root folder)

```
README.md                    ← this file
SKILL.md                     ← Agent SKill manifest (cross-compatible with Claude Code)
colors_and_type.css          ← single source of truth for all design tokens
assets/
  lingua-wordmark.svg        ← horizontal lockup
  lingua-mark.svg            ← square mark (5-bar waveform on ink)
  icon-*.svg                 ← `ni-*` line-icon family
  app-*.{webp,avif}          ← real third-party app integration logos
  persona-*.avif             ← warm-toned testimonial portraits
  ui-frame-*.avif            ← rounded UI screenshots for hero/persona panels
  hero-graphic*.svg          ← decorative brand graphics
  squiggly.svg               ← coral underline accent
preview/                     ← Design-System tab cards (24 entries):
  colors-brand · colors-surfaces · colors-ink · colors-semantic
  type-display · type-headings · type-body · type-utility
  spacing-scale · radii · shadows
  logo · icons · app-integrations
  buttons · cards · inputs · mic-widget · badges · nav
  testimonial · app-tone · hero-block · speed-comparison
ui_kits/
  marketing-site/            ← clickable Lingua homepage
    README.md  index.html  styles.css
    Nav.jsx · Hero.jsx · AppGrid.jsx · ValueCards.jsx
    PersonaTabs.jsx · LoveLetters.jsx · CTABand.jsx · Footer.jsx
```
