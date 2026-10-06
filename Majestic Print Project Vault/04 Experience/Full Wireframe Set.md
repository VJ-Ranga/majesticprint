---
created: 2026-10-05
updated: 2026-10-05
status: built-for-review
tags: [wireframes, pages, review]
---

# Full wireframe set

User requested every planned page as a wireframe, including individual product pages and About. This extends the existing guide-aligned sitemap and H01–H10 homepage layout. It does not implement the later functional HTML prototype or WordPress store.

## Start the review

Open `planning/wireframes/index.html` from the workspace. The directory links every page and feedback state. The existing sitemap now has an **Open page wireframe** link on each node. All pages use local assets and work as saved HTML without a build step.

## Coverage

67 linked HTML wireframes: all 51 sitemap nodes (including page templates and two review grouping pages), 15 example feedback states, and the page directory.

- Homepage with navigation into the complete set.
- Shop, seven distinct product collections, standard product and personalised product layouts.
- Solutions hub and all 12 service-family pages, with tailored brief input areas.
- Work portfolio and project detail.
- About, Contact, Help, how to order, artwork, design help, materials, delivery, payments and FAQ.
- Custom quote, quote review/acceptance, search, cart, checkout, payment result, account, order status and proof review.
- Four policy layouts.
- Empty cart, no search results, required-input layouts, quote/enquiry receipts, accepted/revised quotes, payment success/failure/cancellation, proof approval/revision and page-not-found layouts.

The standard product uses business cards as its representative item. The personalised layout uses a mug. Other collection cards link to the applicable template or quote route; they do not establish a complete approved SKU catalogue. Packaging and installation-led products use the custom quote route.

## Wireframe conventions

Exact guide palette and the existing public logo reference are retained. Arial is the fallback until licensed brand webfonts are supplied. Dashed slots identify imagery and content to collect. Prices, delivery promises, legal policy wording and company evidence remain unapproved content areas.

Native fields can be explored for layout review. No values are persisted or transmitted. Links into cart, receipts, quote acceptance, payment and proof states show screens only; they do not perform those actions. Error states show feedback placement and recovery intent, not implemented validation. Filters and search are layout controls rather than a working catalogue engine.

Use **Show design notes** to hide annotations. Shared navigation, mobile menu, local review routes and disclosure panels are the implemented presentation controls.

## Evidence

See [[Planning Verification]]. All 67 pages were opened at requested 320- and 390-pixel widths: 134 completed browser checks, with no horizontal overflow, missing reference logo or incorrect H1 count. Desktop samples, mobile menu and annotation toggle were checked. These checks establish wireframe rendering, not full accessibility or commerce acceptance.

`planning/wireframes/coverage.json` maps each reviewed node to its file and proposed production route. Rebuild the wireframe set with `python3 planning/build_wireframes.py` from the workspace root. The generator retains shared layouts while keeping product, quote, checkout, status and solution structures distinct.

Related: [[Page Structure Trees]], [[Homepage Wireframe Plan]], [[Service Coverage Matrix]], [[HTML Prototype Scope]].
