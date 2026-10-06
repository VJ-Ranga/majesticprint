---
created: 2026-10-05
updated: 2026-10-05
status: proposed-architecture
tags: [wordpress, woocommerce]
---

# WordPress architecture

## Proposed base

WordPress for managed content; WooCommerce for purchasable products, orders, checkout and customer accounts; a custom theme/design system for the approved HTML experience; a focused project plugin for business rules. Develop on staging and preserve production while the replacement is reviewed.

## Implementation options

**Custom theme with controlled blocks — recommended starting point:** predictable markup/assets, reusable brand system, editor flexibility for content. Requires custom development for configurators and operational screens.

**Elementor-based custom build:** can suit existing staff workflows, but requires an asset budget and restrained widgets/plugins. Existing public references do not make it mandatory.

**Headless storefront:** adds API, checkout/authentication, SEO and hosting complexity. No demonstrated need at this stage.

Confirm the editor preference after assessing staff needs, hosting and existing integrations. Final plugin versions and compatibility require an implementation-stage audit.

## Domain boundaries

| Component | Responsibility |
|---|---|
| Theme | Layout, styling, content templates, reusable blocks |
| WooCommerce | Product/order/account and payment lifecycle |
| Pricing module | Valid options, quantity tiers, server calculation and price snapshot |
| Artwork/proof module | Controlled storage, versions, staff review, recorded approval |
| Quote module | Enquiry → versioned estimate → acceptance → payable order |
| Fulfilment | Production readiness, staff queue, pickup/dispatch details |
| Integrations | Approved gateway, mail and optional courier/WhatsApp connections |

Business rules should survive a theme change. Keep payment state, artwork state and production state distinct, with a clear combined “next action” in the customer interface.

## Extension evaluation

[WooCommerce Product Add-Ons](https://woocommerce.com/document/product-add-ons/) documents product customisation and file-upload fields. It does not itself prove suitability for private artwork access, print pricing or proof approval. Evaluate buy-versus-build against the agreed workflow. Prefer one capability per chosen tool; avoid stacking overlapping configurators and upload plugins.

Before selecting extensions, verify supported WordPress/WooCommerce/PHP versions, checkout implementation, order storage/HPOS compatibility, accessibility, security, licences, maintenance, exports and staff usability. Use supported WooCommerce APIs rather than direct order-table assumptions.

## Environment and administration

Separate staging/live credentials and configuration, backups, transactional email, protected uploads, monitoring and role-based access. Content editors should manage approved copy and campaigns; price changes and production approvals need deliberate permissions and audit history. No credentials belong in project notes or frontend assets.

Related: [[Payments and Fulfilment]], [[Migration and SEO]], [[Artwork and Proof Workflow]].

## Guide-aligned content model

Represent all 12 solution families with managed service pages/templates, cross-linked to relevant WooCommerce products. Keep identity tokens and licensed font roles shared across theme components. Tailor quote fields by service family rather than using a generic form for every job. No guide requirement mandates a new page-builder/plugin stack.
