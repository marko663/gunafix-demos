# Brianna's Cafe — v2 design: "The order pad", neo-brutalist diner ticket with things to play with
Direction (trend #5, playful "hold / pick" interactions, on a neo-brutalist ticket layout; pattern C, a tomato-red curtain wipe on every jump). Nothing from briannascafe.co (a white Squarespace "Website coming soon!" page) or our first demo (photo hero with condensed Bebas headline).

## Mood
Loud, friendly, early-morning. The page is a diner order pad: perforated tickets, rubber-stamp labels, hard black borders and offset shadows. Two toys: hold the button to pour a coffee, and a 24-hour clock showing when the griddle is on.

## Colour
- Ticket cream `#FFF8EC` (page)
- Diner black `#141414` (ink, borders) — 17:1
- Ketchup `#F0442C` (accent fills, curtain; never used for body text)

## Type
- Display: Archivo Black, uppercase, leading .86
- Body/UI: Space Grotesk 400/700, 17px/1.5
- Stamps: Space Grotesk 700 uppercase, letter-spacing .12em, rotated -3deg

## Spacing & shape
8px grid; 3px black borders; 8px 8px 0 offset shadows (pressed state 2px); 0 radius except the mug and clock; perforated edges via radial-gradient masks.

## Components
Ticket cards with perforation, stamps ("6AM–3PM", "EVERY DAY"), hold-to-pour coffee (pointer, touch and keyboard: hold Space/Enter), live 24h clock dial in Somerville time with the open band 6am–3pm, three big order buttons (call for pickup, Uber Eats, DoorDash), photo stickers (stock, labelled).

## Motion
- Pattern C: ketchup curtain wipes on nav jumps; tickets slide in with a slight rotate.
- Coffee fills while held, drains when released, steam loop when full.
- Clock hand rotates to the real time on load.
- Reduced motion: no curtain, instant fill, static tickets.

## Layout per breakpoint
- Laptop >=1025: 12-column grid. Hero ticket spans 7 columns with "BRIANNA'S" at 11vw, photo stickers stacked in the remaining 5. Toys row: clock (5 cols) + coffee (7 cols). Order: 3 buttons in a row. Visit: address ticket + hours stamp side by side.
- iPad 768-1024: hero ticket full width (name 15vw), stickers as a 2-up row under it. Toys: clock and coffee side by side at equal width. Order buttons stacked full width (large tap targets). Visit stacked.
- Phone <=767: nav = name + "Call" button. Hero ticket full width, name 17vw, one sticker. Clock 78vw, then coffee. Order buttons stacked, 64px tall. Sticky bottom "Call for pickup" bar.
