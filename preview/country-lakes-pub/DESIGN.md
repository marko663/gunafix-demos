# The Country Lakes Pub — v2 design: "Game night", scoreboard type on pool-table felt
Direction (trend #5, playful games, on a dark saturated colour world, trend #6; pattern A adapted: a pool rack that builds itself as you scroll). Nothing from cadawg.wixsite.com/thepub (2014 free Wix site, "Under construction" menu page, 2014 schedule) or our first demo (condensed Bebas hero over a pool-table photo).

## Mood
Friday night in Browns Mills: felt green, chalk-white scoreboard letters, one neon-orange accent like a bar sign. Things to do, not just read: rack the balls, throw a dart.

## Colour
- Felt `#0B3B2A` (page)
- Chalk `#F1F0E8` (text) — 11:1 on felt
- Neon `#FF7A1A` (accent, scores, buttons; dark text on it)

## Type
- Display: Bungee (scoreboard caps), leading .95
- Body/UI: IBM Plex Mono 400/600, 16px/1.6

## Spacing & shape
8px grid; scoreboard tiles 2px chalk borders with 6px radius; flip-tile letters for the grub board; round elements (balls, board) are the only circles.

## Components
Scoreboard tiles (2 bars, deck bar, 15 TVs, pool, darts), SVG pool rack with 15 balls, playable dartboard (click/tap/Enter throws; score counter; 3 darts a round), flip-board "Pub grub" list (real items from the pub's specials page), party booking card, visit card with both phone lines.

## Motion
- Pattern A: pinned scene, 15 balls roll in from the edges and settle into the triangle; the cue ball rolls in last (GSAP scrub).
- Grub board letters flip in when scrolled into view (CSS 3D rotateX, staggered).
- Dart throws animate along a short arc; neon sign flickers once on load.
- Reduced motion: rack shown complete, no flips, darts land instantly.

## Layout per breakpoint
- Laptop >=1025: hero 7/5 split, name stacked left at 8.4vw, 2x3 scoreboard right. Rack pinned 1800px: copy left, rack right. Game row: dartboard (5 cols) + grub board (7 cols). Party and visit side by side.
- iPad 768-1024: name full width at 12vw, scoreboard 3x2 under it. Rack pinned 1400px, rack on top. Dartboard 64vw centred, grub board below in 2 columns. Party and visit stacked.
- Phone <=767: name at 14.5vw, scoreboard 2 columns. Rack pinned 1000px at 88vw. Dartboard 86vw, grub list one column. Sticky "Call the pub" bar.
