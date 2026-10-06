# Majestic Print — homepage demo

Working HTML demo of the new homepage. Open `index.html` in a browser (no build step).

- `assets/data.js` — products, 12 services, occasions, steps and contacts. Edit here.
- `assets/css/style.css` — design tokens (brand inks, type scale, 8px spacing, button system) and motion.
- `assets/js/main.js` — rendering, product filter, swatch book, occasion tabs, quote → WhatsApp brief.

Signature ideas: the hero is a press sheet (crop marks, registration targets, colour bar) and the headline
prints as separate C/M/Y plates that lock into register. Services are shown as a swatch book. The proof step
gets an APPROVED stamp. All motion is disabled under `prefers-reduced-motion`.

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
