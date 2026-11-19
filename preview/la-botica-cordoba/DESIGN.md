# La Botica Bar & Tapas — v2 design: "La rebotica", an apothecary cabinet of tapas
Direction (trend #7, immersive but genuinely useful: a searchable, filterable menu cabinet; with one hand-made signal from trend #3, an azulejo tile border). Nothing from labotica-bar-tapas-com.webnode.es (free Webnode template with banner and contacto@ejemplo.com placeholder) or our first demo (serif hero over a Mezquita photo with a salmorejo cut-out).

## Mood
"Botica" is the old Spanish pharmacy. The bar is a cabinet of remedies: every tapa gets a numbered apothecary label, the categories are drawers, the house philosophy ("nos encanta aconsejar") becomes "consulta al boticario". Calm, crafted, local to Córdoba (patios, tiles, lime-washed walls).

## Colour
- Cal (lime-wash) `#F4EFE6` (page)
- Botica green `#1F4D3A` (ink, drawers) — 9.6:1
- Terracota `#C0532E` (labels, accents; large text and borders only)

## Type
- Display: Bodoni Moda 800 / 500 italic, high contrast, leading .9
- Body/UI: DM Sans 400/600, 17px/1.55
- Labels: DM Sans 600 small caps feel (uppercase, .16em)

## Spacing & shape
8px grid; double-rule label borders (apothecary label), 4px radius; arched photo frames; repeating azulejo tile strip (inline SVG pattern, 2 KB).

## Components
Apothecary label hero, live status (Córdoba time, real split hours), drawer filters (Tapas, Montaditos, Tostas, Boca-pizzas, Desayunos, Bebidas), accent-insensitive search ("albondigas" finds "Albóndigas"), numbered label cards, "consulta al boticario" picker (pick a mood, get a real item from the carta), hours table, contact card.

## Motion
- Drawers open with a vertical wipe (clip-path) when a filter is chosen; cards re-flow with a short stagger.
- Labels tilt slightly towards the cursor on fine pointers; tap shows the same card raised.
- Tile strip drifts slowly; photo arches reveal on scroll (animation-timeline: view(), progressive).
- Reduced motion: instant filter, no tilt, no drift.

## Layout per breakpoint
- Laptop >=1025: hero 2 columns (label card | arched patio photo). Cabinet: sticky left drawer column (filters + search, 300px) and a 3-column label grid. Consulta + hours + contact in 3 columns.
- iPad 768-1024: hero label centred above a wide arched photo. Cabinet: filters as two rows of pills above search, 2-column label grid. Consulta full width; hours and contact side by side.
- Phone <=767: label card full width, photo arch under it. Cabinet: search first, then a horizontally scrolling drawer row, 1-column list (compact labels). Sections stacked; sticky "Llamar / Cómo llegar" bar.
