# Cakeview Bakery & Cafe — v2 design: "Mango world", one rich colour and one hero object
Direction (trend #6, saturated single-colour world with one hero object; pattern A, a mille crêpe that builds itself layer by layer as you scroll). Nothing from cakeviewbakery.webflow.io (a Webflow staging template with placeholder product cards) and nothing from our first demo (cream background, serif wordmark, photo cut-out).

## Mood
Sunny, generous, a little playful: the whole page is the colour of the Fresh Mango Cake. Bilingual (English + Chinese names exactly as on Cakeview's price list).

## Colour
- Mango `#FFB21A` (page)
- Cocoa `#4A1609` (ink, buttons) — 8.9:1 on mango
- Cream `#FFF4DE` (cards, crêpe layers)

## Type
- Display: Unbounded 800, -0.03em, leading .9
- Body: Manrope 400/600, 17px/1.55
- Chinese names: system CJK font fallback (no extra download)

## Spacing & shape
8px base; 40px card radius ("cake box" corners); 2px cocoa rules; pill buttons 52px tall.

## Components
Illustrated crêpe slice (SVG), giant outline 芒果 behind the hero, live open status (8am–8pm daily, Toronto time), price board with category tabs (real prices from Cakeview's own site), tappable egg tart (wobble easter egg), visit card.

## Motion
- Pattern A: pinned scene, 18 crêpe layers drop and stack with a live layer counter, then cream and mango slices land on top (GSAP scrub).
- Hero slice floats; 芒果 outline drifts on scroll (parallax).
- Tabs switch with a wipe (clip-path).
- Reduced motion: stacked crêpe shown complete, no pin.

## Layout per breakpoint
- Laptop >=1025: 3-column hero (facts | slice | call card), headline spanning the top. Crêpe scene pinned 2000px, counter left, crêpe right. Price board: tabs left column (vertical), 2-column price list right. Story: 2 arches + text. Visit: 3 columns.
- iPad 768-1024: headline top, slice centred at 58vw, facts and call card side by side below. Crêpe scene pinned 1600px, crêpe on top, counter under it. Tabs as a horizontal pill row, list in 2 columns. Story: arches side by side, text below. Visit: 2 columns.
- Phone <=767: headline 11vw, slice 80vw, full-width call button, facts as a swipeable chip row. Crêpe pinned 1100px, crêpe 78vw. Tabs become a scrollable pill row, list single column. Story: one arch. Visit stacked; sticky "Call to order" bar.
