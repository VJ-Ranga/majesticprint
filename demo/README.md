# Majestic Print — homepage demo

Working HTML demo of the new homepage. Open `index.html` in a browser (no build step).

- `assets/data.js` — products, 12 services, occasions, steps and contacts. Edit here.
- `assets/css/style.css` — design tokens (brand inks, type scale, 8px spacing, button system) and motion.
- `assets/js/main.js` — rendering, product filter, swatch book, occasion tabs, quote → WhatsApp brief.

Design concept: **the website is a print job.**
- Paper is trimmed square — no rounded corners (only the WhatsApp button stays round).
- Every photo is a printed sheet with crop marks and a slug line.
- Brand inks act as process plates: Bright Blue = C, Magenta = M, Gold = Y, Deep Blue = K.
  The hero headline prints as separate plates that lock into register.
- Print / Pack / Promote images are duotones in their own ink; full colour on hover.
- Products are spec sheets (size, stock, finish, minimum).
- Solutions is a capability index: 12 processes, each with its own photo.
- Gifts is a Sri Lankan print calendar (Avurudu, Vesak, Deepavali, Christmas, weddings).
- How it works is a job ticket that ticks itself off and stamps the proof APPROVED.
- Buttons misregister (cyan/magenta offset) on hover. All motion off under `prefers-reduced-motion`.

## Demo view switcher
The dark bar at the top compares hero variants (saved per browser; also via URL):
- `?layout=full` / `?layout=boxed` — full-width sheet or boxed sheet on the press bed
- `?media=tall` / `?media=wide` / `?media=none` — portrait photo, wide photo, or no photo (CMY overprint graphic)

Remove `.demo-bar` before production.

## Photos
Temporary Unsplash/Pexels stock images in `assets/img/photos/` (credits in `CREDITS.md`). Each is captioned
as a sample. Replace with Majestic's own product, project and workshop photography.

## Waiting on client
- WhatsApp number, phone, email and hours (placeholders in `data.js`)
- Licensed Nexa Heavy / Nexa Text webfonts (Poppins fallback in use)
- Master logo files (public header logo used for reference)
- Real product, project and workshop photography (illustrated stand-ins now)
- Rate card / prices, delivery coverage and proof policy wording
