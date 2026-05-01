# Lingua — Marketing Site UI Kit

A clickable recreation of the Lingua marketing homepage, structured exactly like wisprflow.ai but rewritten with Lingua's mission values: **eliminate the keyboard, save people time, lower the barriers to technology, build things that feel like magic**.

## Files
- `index.html` — full clickable page, glues all components together
- `Nav.jsx` — sticky blurred cream nav with dropdowns
- `Hero.jsx` — display headline + sub + platform pills + floating UI frame
- `AppGrid.jsx` — "Write faster in all your apps" — real third-party logos
- `ValueCards.jsx` — Lingua's four mission values, each with italic-serif emphasis
- `PersonaTabs.jsx` — "Lingua is made for you" — tabbed persona explorer
- `LoveLetters.jsx` — testimonial wall
- `CTABand.jsx` — dark "Start flowing" band
- `Footer.jsx` — multi-column footer w/ wordmark

## Interactions implemented
- Top nav highlights on hover; dropdowns open on hover
- Persona tabs are clickable and swap the headline + body
- "Try Lingua" floating mic widget toggles a fake listening overlay
- Logo marquee auto-scrolls and pauses on hover
- All CTAs alert("Lingua signup flow — wire to onelink") so the click is observable
