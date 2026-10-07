# Majestic Print — website demo

Working multi-page HTML demo. Open `index.html` in a browser (no build step; a local server is best so links with `?p=` work everywhere).

## Pages
| File | What it is |
|---|---|
| `index.html` | Homepage (full-width hero with tall image) |
| `shop.html` | Catalogue as spec sheets — filter by Print/Pack/Promote, occasion, search (`?route=Pack`, `?occasion=weddings`) |
| `product.html?p=<slug>` | Product configurator: options, quantity, artwork upload/design/later, live job ticket, add to quote list, order on WhatsApp |
| `solutions.html` | Capability index of all 12 processes + which processes make what |
| `service.html?s=<slug>` | One template for every process: photo, what we make, materials, "to quote we need", products, next/previous process |
| `work.html` | Portfolio with process filter and lightbox |
| `about.html` | Story, three plates, brand traits, visit the workshop |
| `how-to-order.html` | Standard vs custom tickets, interactive bleed/trim/safe diagram, artwork table, FAQ |
| `contact.html` | Quote list + brief form → one WhatsApp message |

Shared header/footer/quote list live in `assets/js/common.js`; page builders in `assets/js/home.js` and `assets/js/pages.js`; inner-page styles in `assets/css/pages.css`.
The quote list is stored in the visitor's browser only (demo stand-in for a cart).

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

## Photos
Temporary Unsplash/Pexels stock images in `assets/img/photos/` (credits in `CREDITS.md`). Each is captioned
as a sample. Replace with Majestic's own product, project and workshop photography.

## Waiting on client
- WhatsApp number, phone, email and hours (placeholders in `data.js`)
- Licensed Nexa Heavy / Nexa Text webfonts (Poppins fallback in use)
- Master logo files (public header logo used for reference)
- Real product, project and workshop photography (illustrated stand-ins now)
- Rate card / prices, delivery coverage and proof policy wording
