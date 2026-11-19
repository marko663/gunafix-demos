# One Family Diner — v2 design: "The One Family Daily", a morning broadsheet that follows the Dorchester sunrise
Direction (trend #7 menu-first usefulness in a type-led editorial broadsheet, trend #4; pattern B as a "photo desk": hover or focus a dish and its photo appears in the side column, tap to open inline on touch; page-turn wipe, pattern C). Nothing from silveiramgs10.wixsite.com/one-family-diner (free Wix template with ad banner and "Contact | Lawrence" leftovers) or our first demo (diner-interior photo hero with DM Serif and a plate cut-out).

## Mood
The diner opens at 5:30am, before the paper lands. The page is that morning's paper: masthead, dateline in Boston time, the menu as the market-prices page. A thin sky band at the top changes colour with the real time in Dorchester (night, dawn, morning, afternoon).

## Colour
- Newsprint `#F3EFE6` (page)
- Ink `#161514` (text) — 17:1
- Sunrise `#E85D12` (accent: rules, prices highlight, buttons with ink text)
- Sky band uses tints of sunrise/ink only

## Type
- Display: Newsreader 800 / 500 italic, leading .92 (masthead, headlines)
- Body/UI: Figtree 400/600, 17px/1.55; prices tabular figures

## Spacing & shape
Strict 12-column newspaper grid on laptop with 1px column rules; 8px base; hairline and double rules; no rounded corners except buttons (4px).

## Components
Sky band + live dateline and open status (Boston time), masthead, lead story, "Today's specials" price table (real prices from the diner's own site), full menu as columns (Breakfast combos, Omelets, Lunch, Sandwiches), photo desk (3 stock photos, labelled), classifieds box (order ahead: phone, Grubhub, Uber Eats, DoorDash), notices (cash prices / 4% non-cash charge, first come first served), hours box.

## Motion
- Pattern B: photo desk swaps with a clip-path reveal when a dish with a photo is hovered or focused; on touch a "Photo" toggle opens it inline.
- Page-turn wipe (newsprint panel with a skewed edge) on in-page jumps.
- Headlines set word by word on load; sky band eases to the current time colour.
- Reduced motion: no wipe, no word animation, photos inline on demand.

## Layout per breakpoint
- Laptop >=1025: masthead across 12 columns; lead story 8 cols + photo desk 4 cols (sticky); specials table 8 cols; menu sections in 3 CSS columns with rules; classifieds + hours + notices as a 3-box row.
- iPad 768-1024: masthead full; lead story full width with photo desk as a 3-photo strip below; specials full width; menu in 2 columns; boxes 2 + 1.
- Phone <=767: compact masthead (title on 2 lines), dateline under it; lead story single column; specials as a list with dotted leaders; menu sections as collapsible <details> (Specials open); boxes stacked; sticky "Call ahead" bar.
