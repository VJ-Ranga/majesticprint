---
created: 2026-10-05
updated: 2026-10-05
status: public-audit
tags: [audit, current-site]
---

# Current site audit

Research date: **5 October 2026**, Asia/Colombo. Public site read only. See [[Research Method and Limits]] for verification limits.

## Existing value to preserve

The site presents a wide printing and advertising offer: offset/digital work, signs, sublimation, CNC/laser work, and materials. Its [About page](https://majesticprint.lk/about/) describes experience and regional print awards. Its public contact information establishes a Pannala location. These are useful starting points, but claims and current details need client verification before new copy is approved.

The homepage and shop advertise seven purchasable product types. Service pages cover a much broader offer. [[Current Site Inventory]] records the distinction.

## Findings and proposed response

| Priority | Observed evidence | Customer implication | Proposed response |
|---|---|---|---|
| High | [Contact](https://majesticprint.lk/contact/) contains copy referring to Pharmavo and medication/equipment | Undermines confidence in company details | Replace with approved printing-business copy |
| High | [Book printing](https://majesticprint.lk/services/book-printing/), [mugs](https://majesticprint.lk/services/mugs/), [vehicle branding](https://majesticprint.lk/services/vehicle-branding/), and [tag cards](https://majesticprint.lk/product/tag-cards/) contain placeholder text | Buyers lack meaningful specifications | Write product-specific benefits, options, limits, and ordering guidance |
| High | [Business cards](https://majesticprint.lk/product/business-cards/) shows LKR 2 and quantity starting at 1 without a clear pack/minimum explanation | Buyer may misinterpret the total or available specification | Publish approved quantity tiers and explicit units |
| High | Product pages contain both Add to Cart and a separate enquiry/artwork form | Relationship between purchase and artwork is unclear from public HTML | Attach artwork and options to the actual order line; separate quote route |
| High | Forms direct files above 5 MB to Sendspace and ask for a pasted URL | Customer effort; artwork may become detached from the job | Product-specific uploads with recoverable failure states and controlled staff access |
| Medium | [All Products](https://majesticprint.lk/all-products/) is largely grouped by production methods; [Marketplace](https://majesticprint.lk/shop/) is another catalogue | Customers must understand the shop's internal structure | One product-led shop, with quote-based service pages |
| Medium | Tag Cards is assigned to many unrelated categories; sizes are only Large/Medium/Small | Categories and dimensions do not help selection | Clean taxonomy and exact dimensions/materials |
| Medium | [FAQ](https://majesticprint.lk/faq/) refers to majesticprintsl.com and a different email | Instructions may not match the current ordering experience | Rewrite against the implemented flow and approved contacts |
| Medium | Order tracking/Return Policy links resolve to `#` in sampled homepage markup; footer policy labels are not meaningful destinations in the sampled link inventory | Self-service links cannot deliver their stated purpose | Add verified functional tracking and policy pages |
| Medium | TikTok link points to an `autocruze.adelaid` video | Possible wrong-brand social link | Ask client to confirm the correct account |
| Medium | Hero slides rely on promotional image layers, with production-method messaging | Main message may be less useful to a shopper and less robust during loading | Live text, static product hero, clear shop and quote CTAs |
| Review | Returned homepage HTML is about 792 KB before referenced assets; markup references several slider/builder libraries | Complexity warrants measurement, not an assumed performance verdict | Establish budgets and measure prototype/staging |

## Public technical evidence

HTML references WordPress, WooCommerce, Elementor/Pro, ElementsKit, JetElements, JetEngine, JetTabs, JetWooBuilder, Slider Revolution, Google Site Kit, and theme paths `majestic-print` / `majestic-print-child`. This proves references in sampled responses, **not an authenticated plugin/version/licence audit**. Do not copy or replace that stack automatically.

Homepage source contains four counters initially output as zero. These may be animated values; zero in source is not proof that customers always see zero. Repeated menus/product cards may be responsive variants or carousel clones rather than separate visible content.

## Browser evidence

Sampled homepage rendering at a desktop override (1440 × 1000) and mobile override (390 × 844). Screenshots represent a moment in an animated page. Some content present in source was absent from the sampled browser snapshot; full runtime/accessibility testing is still required.

![[current-home-desktop.jpg]]

![[current-home-mobile.jpg]]

## Payment and security limits

The user states a payment gateway exists. A public empty-cart checkout request did not reveal the active provider or usable checkout form. No order was added, submitted, or paid. Form delivery, cart persistence, gateway callbacks, refunds, and existing uploads were not tested. No security vulnerability assessment was performed.

## Reconciliation with the supplied guide

The guide is now the new-brand and service-scope baseline. The findings above remain historical observations, not newly repeated transactions. The redesign must explicitly introduce the guide’s UV, large-format, 3D-signage, packaging and corporate-gift coverage and distinguish CNC from laser families. Preserve old content/URLs for migration while replacing placeholder copy. [[Brand Guide Findings]] and [[Service Coverage Matrix]] supersede any assumption that old navigation defines the complete offer.
