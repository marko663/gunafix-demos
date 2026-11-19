# Barbablù — v2 design: "Barba blù", an illustrated two-colour seaside world
Direction (trend #2, illustrated brand world with a tiny palette; pattern A, scroll-built pizza). Shares nothing with ristorantebarbablu.it (a Deltacommerce "sito in costruzione" placeholder with a logo) or with our first demo (dark serif hero with a photo cut-out).

## Mood
Cheeky, sunny, hand-drawn. The name means "Blue-beard": the mascot is a beard made of Adriatic waves. Everything is drawn in one blue on sand, like a beach-hut sign painted with one tin of paint.

## Colour (strictly two)
- Blù cobalt `#1D3FD1` (ink, fills, buttons)
- Sabbia sand `#F6EEDB` (paper)
Contrast cobalt on sand 7.2:1 (AA/AAA body). No third colour; tints only via opacity.

## Type
- Display: Bricolage Grotesque 800, tight leading .82, -0.04em
- Body: Karla 400/600, 17px/1.55
- Labels: Karla 600 uppercase, 12px, tracking .18em

## Spacing & shape
8px base; sections 120/96/72px vertical (laptop/iPad/phone). 2px cobalt outlines, 999px pill buttons, 28px card radius. Wavy SVG dividers between sections.

## Components
Wave-beard mascot (SVG, idle wave loop), status chip (live open/closed if hours known, else "chiamate per gli orari"), pill CTAs, illustrated pizza in 5 layers, porthole photo (duotone via blend), contact tickets, sticky call bar (phone).

## Motion
- Pattern A: pinned scene; dough, pomodoro, mozzarella, basilico and the cut lines fly in and settle as you scroll (GSAP ScrollTrigger scrub). Step labels swap alongside.
- Waves drift (CSS keyframes, transform only). Letters of "blù" bob on hover (fine pointer).
- Easter egg: tap the beard 5 times.
- Reduced motion: pizza shown fully built, no pin, no wave drift.

## Layout per breakpoint
- Laptop >=1025: nav logo | links | call pill. Hero 2 columns: giant stacked "Barba / blù" (15vw) left, mascot plate right. Pizza scene pinned 220vh: steps left, pizza right (min(46vw,620px)). Lungomare: 5/7 split, porthole left. Contacts: 3 tickets in a row.
- iPad 768-1024: nav logo + call pill, links as a scrolling row under it. Hero centered single column: type 19vw, mascot under it at 62vw. Pizza pinned 180vh: pizza top centred (60vw), current step below. Lungomare: porthole on top, text in 2 columns. Contacts: 2x2 grid.
- Phone <=767: nav logo + round call button. Hero: mascot first (72vw), type 24vw, CTAs full width stacked. Pizza: pinned 140vh with pizza 84vw and one step line beneath. Lungomare stacked. Contacts: stacked list rows. Sticky bottom bar with "Chiama" and "Cellulare".
