---
created: 2026-10-11
updated: 2026-10-19
status: demo-built-awaiting-client-review
tags: [build, demo, design-system, current-state]
---

# HTML demo — current state

The HTML prototype phase is built and published for review. This note is the single place to see what exists, how it is designed, what was verified and what is still waiting on the client. Last code change: 7 October 2026.

- **Live demo:** https://vj-ranga.github.io/majesticprint/demo/
- **Repository:** https://github.com/VJ-Ranga/majesticprint (public, branch `main`; GitHub Pages redeploys on every push)
- **Local files:** `/home/vjranga/Documents/majesticprint/demo/`
- **Developer notes:** `demo/README.md` in the repository

The pages carry `noindex, nofollow`, so search engines will not list the demo. The repository is public: anyone with the link can see placeholder contacts and stock photos.

## Design concept: the website is a print job

The user approved this direction on 7 October after rejecting an earlier version as generic. See [[Decision Log]] P07–P08 and D12–D19.

| Rule | How it shows up |
|---|---|
| Paper is trimmed square | No rounded corners anywhere, except the WhatsApp button |
| Every photo is a printed sheet | Crop marks at the corners and a small mono caption line |
| Brand inks act as press plates | Bright Blue = C, Magenta = M, Gold = Y, Deep Blue = K |
| Labels are registration targets | Crosshair circle before each section label; no gradient ribbons |
| Backgrounds mean something | Halftone dot fields, cutting-mat grid, slowly turning registration target |
| Buttons misregister on hover | Blue and magenta edges offset behind the button |

Rejected and not to be reintroduced: rounded cards, pill buttons, gradient accent ribbons, coloured strips on top of cards, plain colour-swatch boxes for services, large empty white sections.

## Changes on 19 October 2026

- **Removed at the client's request:** the Our work portfolio (page, menu item and homepage showcase) and the homepage Gifts & seasons calendar. The shop's occasion filter is kept.
- **Menu is now:** Shop · Services · How to order · About · Contact. `solutions.html` is renamed `services.html`, headed "What we do" as in the brand guide.
- **Service content now comes word for word from the brand guide:** names, taglines (e.g. "Traditional Print Excellence", "Print Beyond Paper"), descriptions and full item lists (5–12 items each), including local terms such as Visiting Cards and NCR Bill Books. The guide's closing statement appears on the Services page.
- **Still not from the guide:** the "Materials" lists on service pages and the shop's product option lists are typical values to confirm.

## Pages built

| File | What it does |
|---|---|
| `index.html` | Homepage: hero slider, service ticker, Print/Pack/Promote, products, services index, Why Majestic, job ticket and press run, quote form |
| `shop.html` | 13 products as spec sheets; filter by Print/Pack/Promote, occasion and search; filters live in the URL |
| `product.html?p=<slug>` | Configurator: option tiles, quantity, artwork (upload / design for me / send later), live job ticket, add to quote list, order on WhatsApp |
| `services.html` | "What we do": all 12 services with guide taglines, the guide's closing statement, and which processes make what |
| `service.html?s=<slug>` | One template for every service: guide tagline, description and full item list, materials, "to quote we need", related products, previous/next |
| `about.html` | Statement, three plates, brand personality words, visit card with map link |
| `how-to-order.html` | Standard vs custom tickets, interactive bleed/trim/safe diagram, artwork table, FAQ |
| `contact.html` | Quote list plus brief form, sent as one WhatsApp message |

Shared header, footer, mobile menu and quote list are built once in `assets/js/common.js`. All editable content is in `assets/data.js`.

## Homepage features

- **Press control strip** under the header: job and sheet number, CMYK density patches (decorative readings), Pannala clock, millimetre ruler.
- **Hero slider**, four sheets: brand, Pack, Promote, season. Each change replays the plate registration. The colour bar is the slide control and progress timer. Pause, arrows, swipe and keyboard all work.
- **Job label** above each headline: ink number chip, mono text, drawn rule.
- **Printer's loupe** on the hero photo (desktop): magnifier with halftone dots and crosshair.
- **Stamp badge** turning slowly on the hero image: "Proof before print · Pannala · Sri Lanka".
- **Print/Pack/Promote** as duotones in each ink; full colour on hover.
- **Products as spec sheets:** size, stock, finish, minimum.
- **Services index:** 12 services with custom icons and the guide's taglines; hover or tap shows that service as a proof.
- **Job ticket** that ticks itself off and stamps the proof APPROVED, plus an animated four-unit press run.
- **Quote form** that builds a WhatsApp brief; nothing is sent until the visitor taps send.

## Site-wide features

- **Loading screen** ("make-ready"): logo plates register, ink bar fills 0–100%, sheet wipes up. Homepage only, first visit in a browser only. Slow-connection behaviour is deferred to the WordPress build (D17).
- **Mobile menu** as a press sheet: guide logo, numbered items, Shop-by tiles, quote and WhatsApp buttons, contacts.
- **WhatsApp button** bottom-left; **Back to top** tab bottom-right with a scroll progress bar.
- **Quote list** in the header: products added from the shop are sent together in one WhatsApp message. Stored in the visitor's browser only.
- **Click feedback:** small burst of blue, magenta and gold dots on buttons and tiles.
- **Reduced motion:** every animation switches off or becomes a fade when the visitor's device asks for it.

## Brand fidelity (audited 7 October)

- **Logo:** header, loading screen and mobile menu use the light horizontal logo; the footer uses the dark one. Both were cropped as vectors from the brand guide PDF, unaltered, in `demo/assets/img/brand/`. The public website SVG is used only as the browser tab icon, because its wordmark is live text that falls back to a serif without Nexa installed.
- **Colours:** the five guide values are used exactly. Other colours are neutrals, WhatsApp green and form success/error colours.
- **Fonts:** not on brand yet. Poppins stands in for Nexa Heavy and Nexa Text; a Helvetica-style stack stands in for Swiss721 on the footer tagline. IBM Plex Mono is a design addition for technical labels and is not in the guide.

See [[Brand Guide Findings]] and [[Brand and Asset Register]].

## Technical summary

- Plain HTML, CSS and JavaScript. Bootstrap 5 grid, Font Awesome icons, Google Fonts. No build step and no animation library.
- GSAP 3.15 (including ScrollTrigger) is free for commercial use and is an option for the WordPress build if heavier scroll animation is wanted. Self-host it in the theme.
- 32 temporary stock photos from Unsplash and Pexels, credited in `demo/assets/img/photos/CREDITS.md`. Each is labelled as a sample on the page.
- The brand guide PDF is excluded from the public repository.

## What was verified

- Every page loaded in a desktop browser with no script errors.
- Homepage and product page checked at phone width with no sideways scrolling.
- Quote list tested with two items producing one correct WhatsApp message.
- Loading screen tested for first visit, return visit and inner pages.
- Live GitHub Pages URLs returned successfully.

Not yet done: a full accessibility audit, real-device testing, cross-browser testing beyond Chrome, and performance measurement. See [[QA and Acceptance]] and [[Performance and Accessibility]].

## Demo limits

- An uploaded artwork file stays on the visitor's device; nothing is uploaded.
- The quote list is saved only in that visitor's browser.
- There is no cart, checkout, payment, account or policy page. Those belong to the WordPress/WooCommerce build.
- Product option lists, artwork rules and FAQ answers are typical values written for the demo, not confirmed Majestic policy.

## Waiting on client

1. Real WhatsApp number, phone, email and opening hours. The demo uses a placeholder number, so WhatsApp links reach no one.
2. Licensed web font files and licences: Nexa Heavy, Nexa Text (the guide shows a Trial version) and Swiss721 Medium.
3. Master logo files to replace the copies taken from the guide PDF.
4. Real product, project and workshop photography. Weakest stock images: Vesak and Avurudu (not genuinely Sri Lankan), UV and digital offset, sublimation, packaging (shows another brand).
5. Rate card, so product pages can show prices instead of "Confirmed with your proof".
6. Confirmation of product options, minimum quantities and artwork requirements.
7. Company story, founding year and team for the About page.
8. Payment methods, delivery coverage and proof policy wording.
9. Decision on mono labels: keep IBM Plex Mono or use brand fonts only.

## Next steps

1. Client reviews the live demo and gives feedback.
2. Collect the items above.
3. Agree the WordPress/WooCommerce scope from [[WordPress Architecture]], including cart, checkout, payment gateway, artwork upload and proof workflow.
4. Decide the loading-screen behaviour on slow connections during that build.

Related: [[00 Start Here]], [[HTML Prototype Scope]], [[Project Roadmap]], [[Open Questions]], [[Decision Log]].
