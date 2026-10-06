---
created: 2026-10-05
updated: 2026-10-05
status: proposed-build-scope
tags: [html, prototype]
---

# HTML prototype scope

Build a reusable, responsive experience in HTML/CSS with small amounts of JavaScript after the design direction and required inputs are agreed. The **complete linked wireframe set** now exists at `planning/wireframes/index.html`, alongside the homepage study and page-tree viewer. See [[Full Wireframe Set]]. These are design artifacts; functional catalogue/cart/upload/payment product code is not built.

## Historical first review slice

Homepage, a shop/category page, a standard business-print product, a personalised gift product, and a custom quote page. Use these to validate brand expression, mixed audience, product configuration and the quote/purchase split before expanding.

## Proposed complete prototype coverage

| Template | States to demonstrate |
|---|---|
| Home/header/footer | Desktop/mobile navigation; search access |
| Catalogue/search | Filters, no results, category context |
| Standard print product | Valid/invalid options, quantity, total, artwork route |
| Gift product | Personalisation, preview/help, missing required input |
| Custom quote | Required fields, unknown specifications, submission simulation |
| Cart | Empty/populated, specification edit/remove, artwork state |
| Checkout | Guest form, delivery options, validation, demonstrative result |
| Confirmation/payment result | Success/pending/failure/cancelled simulations |
| Status/proof/account | Sample job states, approve/revise demonstration, reorder concept |
| Information pages | About/work, how to order, artwork, FAQ, delivery/contact/policy templates |

Use fixture data for realistic products and options, clearly labelled where prices or policies are unapproved. Representative templates can cover many catalogue items; a separate bespoke page for every SKU is unnecessary.

## Prototype boundaries

No real checkout, uploads to third parties, payment credentials, live forms, customer records, or production orders. Simulations must visibly identify their status. A selected local file may be displayed for interaction testing, but it must not silently leave the device.

## Reusable structure

Shared design tokens, semantic components and consistent fixture schema. Keep domain concepts (product type, options, quantity, artwork, proof, price basis) aligned with WordPress planning. Reuse the approved design and assets; WooCommerce cart/payment behaviour will still require real implementation, not merely HTML wrapping.

## Review and exit

Review core journeys at small/large widths, keyboard, zoom and slow-network conditions. Resolve visual, usability and content issues. Deliver source and evidence, with a list of mock-only behaviour. Obtain client review of the template/state set before WordPress conversion.

Related: [[QA and Acceptance]], [[Page Blueprints]], [[Project Roadmap]].

## Brand baseline and next slice

Use [[Brand Guide Findings]] and [[Service Coverage Matrix]] as exact identity/scope inputs. Next high-fidelity slice: approved homepage, shop/category, Solutions hub/detail, a standard product, a gift and a family-specific quote. Replace system-font and imagery placeholders with approved assets. The complete wireframe set covers every sitemap node and example feedback states. Working commerce, calculation, validation and external submissions belong to the later prototype / WordPress stages.
