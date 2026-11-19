# La Paradita Tapas Bar — v2 design: "Letras de la terraza", kinetic type that reacts to you
Direction (trend #4, kinetic and interactive typography; pattern B, a cursor-reactive menu with photo previews and a tap fallback; signature "letter as curtain" transition). Nothing from laparaditatapasbar.com (WordPress "Estamos en Construcción" page with lorem ipsum) or our first demo (photo hero with Anton type and a glass cut-out).

## Mood
Madrid at night after the Teatro Real lets out: neon-ish red letters on black, loud and cheap-and-cheerful (cañas, mojitos, tapas). The name is the hero; the letters move away from your cursor like people making room at the bar.

## Colour
- Noche `#111014` (page)
- Rojo `#FF3B2F` (letters, accents)
- Hueso `#F3EBDD` (text) — 15:1 on noche; rojo used for display only

## Type
- Display: Big Shoulders Display 900, uppercase, leading .8
- Body: Inter Tight 400/600, 17px/1.55
- Labels: Inter Tight 600, uppercase, letter-spacing .2em

## Spacing & shape
Edge-to-edge type; 4vw gutters; 1px hueso rules between menu rows; pill buttons with 2px border; no cards.

## Components
Kinetic hero wordmark (per-letter spans, repel on pointer, wave on touch/scroll), size picker type (CAÑA / DOBLE / JARRA growing in size), menu list with floating preview (fine pointer) or inline photo on tap, terraza photo band, contact grid, sticky "Carta / Llamar" bar on phone.

## Motion
- Hero letters repel from the pointer (rAF lerp, transform only); on touch the letters ripple once on load and skew with scroll velocity.
- Pattern B: hover a dish name, its photo follows the cursor with a clip-path reveal; letters roll on hover. Touch: tap the row to open the photo inline (button with aria-expanded).
- Letter curtain: a giant red "P" grows to cover the screen on in-page jumps, then fades.
- Reduced motion: static letters, no curtain, no follow; photos open inline.

## Layout per breakpoint
- Laptop >=1025: hero "LA" small + "PARADITA" one line at 17vw, info row in 3 columns below. Size picker: three words in a row, increasing size. Menu: two columns (Para comer | Para beber) of 5vw names, preview follows the cursor. Terraza: full-bleed photo with overlapping headline. Visit: 4 columns.
- iPad 768-1024: wordmark on 2 lines ("LA PARA / DITA") at 24vw; info 2 columns. Size picker stacked with right-aligned sizes. Menu one column at 8vw, tap to expand photos. Visit 2x2.
- Phone <=767: wordmark on 3 lines (LA / PARA / DITA) at 33vw; info stacked. Size picker stacked. Menu at 11vw, tap-to-expand. Visit stacked; sticky "Ver la carta / Llamar" bar.
