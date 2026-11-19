# Four Star Family Restaurant — v2 design: "The Four Star scrapbook", cut-paper collage and a burger built by scrolling
Direction (trend #3, imperfect by design: collage, tape, torn paper, halftone, hand-drawn marks; pattern A, a cut-paper burger that stacks itself as you scroll). Nothing from fourstarfamilyrest.wixsite.com/website-1 (free Wix template copy "revolutionizing the way people eat", ad banner, no menu) or our first demo (dark diner photo hero with Anton type and a prime-rib cut-out).

## Mood
A family scrapbook pinned up behind the register: kraft paper, taped photos, a hand-drawn star rating, sticky notes for the specials. Warm, homemade, small-town Illinois. Hand-made signals are limited to tape, torn edges and doodles; the text stays clean and readable.

## Colour
- Kraft `#EADDC3` (page)
- Diner navy `#1B2A4A` (ink) — 10.8:1
- Cherry `#D7263D` (stars, stickers, buttons with white text 4.9:1)

## Type
- Display: Shrikhand (retro script-bold), leading .95
- Body/UI: Schibsted Grotesk 400/700, 17px/1.55
- Doodle labels: Schibsted Grotesk 700 uppercase, rotated

## Spacing & shape
Off-grid on purpose: cards rotated -3 to 3deg, torn edges via clip-path, tape strips (semi-transparent rectangles), halftone dot overlay on photos (CSS radial-gradient); 8px base spacing inside cards.

## Components
Collage hero (3 taped stock photos, labelled), hand-drawn 4-star doodle (SVG stroke animation), cut-paper burger in 7 layers (SVG), zine cards (Mondays prime rib, wings, breakfast, burgers & wraps), "since 2010" sticker, live open status (6am–9pm every day, Central time), visit sticky note.

## Motion
- Pattern A: pinned scene; bun, lettuce, tomato, cheese, patty and top bun drop in and squash on landing (GSAP scrub), stars draw themselves.
- Photos wobble slightly on hover (fine pointer); tape "peels" on hover.
- Reduced motion: burger shown stacked, stars drawn, no wobble.

## Layout per breakpoint
- Laptop >=1025: hero 5/7 split, headline left, collage of 3 overlapping photos right. Burger scene pinned 1800px, burger centre with captions left and a sticky-note right. Zine: 4 cards in a staggered 2x2 with offsets. Visit: sticky note + hours card side by side.
- iPad 768-1024: headline centred full width, collage as a 3-photo row overlapping under it. Burger pinned 1400px with captions under it. Zine: 2 columns, smaller rotation. Visit stacked.
- Phone <=767: headline 17vw, collage of 2 photos. Burger pinned 1000px at 80vw. Zine stacked one per row, alternating tilt of 1.5deg. Sticky "Call to order" bar.
