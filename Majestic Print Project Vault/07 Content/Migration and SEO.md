---
created: 2026-10-05
updated: 2026-10-05
status: proposed-migration-plan
tags: [migration, seo]
---

# Migration and SEO

## Preserve before replacing

Obtain a verified database/files backup, content/media export, current integrations, catalogue, orders and customer-data scope before staging work. Confirm existing checkout, analytics, email and gateway settings with authorised admin access. Public sitemap inventory cannot replace these records.

## URL/content migration

Use `90 Evidence/current-url-inventory.json` as the initial route register. It records current URLs and a proposed destination family, not an approved redirect map. Review category archives, pagination, attachments, search-engine data and remaining content before final mapping.

Preserve useful URLs where practical. If consolidating duplicate service/product pages, identify the correct destination per page and use reviewed permanent redirects. Avoid redirecting all old routes to the homepage. Do not discard currently offered materials/CNC services without an explicit scope decision.

Product pages should have meaningful titles/descriptions, breadcrumb structure and appropriate product data only when price/stock/reviews are accurate. Quote-only services must not carry fabricated offer prices. Never copy placeholder rates into new structured data.

## Staging and deployment

Keep staging access-controlled and excluded from indexing. Prevent live customer emails/payments on staging. Rehearse migration and restoration; determine how production orders placed during development and cutover are preserved. A frozen snapshot must not overwrite newer orders/customers.

Prepare release checklist, production-change window, rollback plan and owner. Launch only after approved staging acceptance. Verify domain/HTTPS, indexability, redirects, canonical URLs, sitemaps, core forms, order email, gateway callback, private artwork and operational access after release.

## Measurement

Confirm existing analytics access and record a baseline if available. Proposed events: product view/configuration, quote submission, cart, checkout, verified purchase, artwork action and reorder. Never send artwork, message text, personalisation content or personal contact details as analytics parameters. Define reporting and applicable consent requirements with the client.

Related: [[Current Site Inventory]], [[QA and Acceptance]], [[Project Roadmap]].

## Guide expansion

Plan 12 solution destinations and cross-links without losing legacy product/service search traffic. New UV/signage/fabrication/packaging pages need original guide-aligned copy and real project evidence. Keep the initial inventory as history and build a separate approved redirect map; the expanded guide is not permission to discard older materials pages.
