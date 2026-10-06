---
created: 2026-10-05
updated: 2026-10-05
status: proposed-awaiting-rate-card
tags: [commerce, catalogue]
---

# Product model and pricing

## Four product types

| Type | Examples to confirm | Price / action |
|---|---|---|
| Standard configured print | Business-card packs, leaflets | Valid option/quantity matrix → buy |
| Personalised product | Mugs, shirts, selected gifts | Product price plus approved customisation costs → buy |
| Bespoke project | Vehicle branding, unusual books, installation | Human-reviewed quote → accepted order → pay |
| Stock/material item | Tapes, sheets, fasteners if in scope | Unit/pack pricing and stock → buy |

These types prevent every item being treated as a simple stock product. Do not expose technically invalid combinations or assume every advertised service has a fixed price.

## Required catalogue fields

Product ID/SKU, category, customer name, ordering type, dimensions and unit, materials, print sides/colour, finish, quantity/MOQ, permitted combinations, price basis, tax treatment, artwork requirements, design-help cost, proof policy, production lead time, delivery class, images, FAQs and related products.

Examples are schema candidates, not approved product specifications. A book may require page count/binding; a shirt needs size/colour; signage may need measurement and installation details.

## Price rules

- “Quantity” must distinguish pieces from packs; a 100-card pack must not become 100 packs accidentally.
- Show item total, quantity basis, included options, and delivery/tax treatment before payment.
- Publish quantity tiers only from an approved rate card.
- Price changes must explain which option caused the change.
- Quote acceptance must snapshot the agreed specification, amount, expiry and exclusions.
- Recalculate totals on the server in WordPress. Browser totals are display only.
- Sample prices in the future HTML prototype must be labelled demonstrative and unable to take real payment.

## Artwork linkage

Files belong to a specific quote/order line with a version, not only to a customer message. Two copies of the same product with different artwork must stay separate. Quantity changes must not unexpectedly merge custom jobs.

## Client validation

Start with a small set of high-volume products. Staff must manually verify sample configurations, minimums, rounding, discounts and tax treatment before those products can be sold online. See [[Open Questions]].

## Guide coverage

Service-family scope is now defined in [[Service Coverage Matrix]], including packaging, UV, signage, CNC, laser and corporate campaigns. Add substrate/thickness, dimensions/dieline, lighting/mounting and vehicle/application fields only for relevant families. The guide supplies examples, not prices/MOQs; do not convert every bullet into an immediately purchasable SKU.
