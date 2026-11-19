# The Wheatsheaf — v2 design: "An evening in Old Glossop", a cinematic scroll story
Direction (trend #1, cinematic scroll-storytelling, light version; pattern C, curtain/wipe transitions, plus a scroll-poured pint). Nothing from glossopwheatsheaf.wixsite.com/mysite (free Wix "Mysite" template, ad banner, white page) or our first demo (fireplace photo hero with a serif headline and pint cut-out).

## Mood
Dusk to last orders. Each screen is a scene in a short film: arrive in the village, the pint is poured, the kitchen, the beer garden, then the booking. Quiet, warm, filmic. Letterbox bars and chapter numerals.

## Colour
- Moss night `#0F1F19` (page)
- Ale amber `#E3A33F` (accent, the pint, links)
- Bone `#EEE7D8` (text) — 14:1 on moss

## Type
- Display: Cormorant Garamond 500 italic / 700, huge (12–16vw), leading .85
- Body: Work Sans 400/600, 17px/1.6
- Chapter numerals: Cormorant 700, roman (I–V)

## Spacing & shape
Full-bleed scenes, 100vh each on laptop; 6vw gutters; hairline 1px bone rules; square corners only (film frames). Buttons: underlined text links + one amber rectangular button.

## Components
Chapter rail with progress (laptop), progress bar (iPad/phone), letterboxed photo scenes with grain overlay, SVG pint that fills with scroll, 300 m countdown, weekly-menu card (links to the pub's Facebook where the menu is posted), hours table with live open/closed in UK time, food-serving times, booking card.

## Motion
- Pattern C: every in-page link triggers an amber curtain wipe (clip-path, 420ms) before the jump; scene photos open with an iris/inset reveal tied to scroll (CSS animation-timeline: view(), progressive enhancement).
- Pinned pour: ale rises, foam settles, "300 m" counts down to 0 (GSAP scrub).
- Reduced motion: no curtain, pint full, photos shown plainly.

## Layout per breakpoint
- Laptop >=1025: fixed left chapter rail (I–V, 160px) + scenes in the remaining width; hero title bottom-left over the photo; pour scene 3 columns (text | pint | counter); food scene photo 60% + menu card 40%; hours as 2-column table beside booking card.
- iPad 768-1024: rail turns into a top progress bar with chapter labels; hero title centred; pour scene pint on top, text and counter side by side below; food scene photo full width with the menu card overlapping its lower edge; hours table full width, booking card below.
- Phone <=767: thin progress line only; nav = wordmark + "Book" button; hero 70svh photo with title under it; pour scene pint 46svh with one line of text and the counter; food photo then card; hours as stacked rows; sticky call bar.
