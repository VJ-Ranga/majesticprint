---
created: 2026-10-05
updated: 2026-10-05
status: guide-aligned-page-tree
tags: [sitemap, navigation]
---

# Sitemap and navigation

Primary navigation: **Shop · Solutions · Our work · Help · About · Contact**. Quote is a prominent action; search/cart/account/tracking are utilities. Do not use Marketplace unless the client confirms a separate marketplace business.

## Full proposed page tree

```text
Home /
├── Shop /shop/
│   ├── Business stationery
│   ├── Marketing & publications
│   ├── Labels & tags
│   ├── Packaging
│   ├── Gifts & apparel
│   ├── Weddings & events
│   ├── Signs & displays
│   └── Product detail → standard / personalised / quote-based
├── Solutions /solutions/
│   ├── Offset Printing
│   ├── Digital Offset Printing
│   ├── Digital Printing
│   ├── UV Printing
│   ├── Large Format Printing
│   ├── Signage & 3D Signage
│   ├── CNC Cutting & Engraving
│   ├── Laser Cutting & Engraving
│   ├── Sublimation Printing
│   ├── Vehicle Branding
│   ├── Packaging & Branding
│   └── Promotional & Corporate Gifts
├── Our work /our-work/ → project detail
├── Help /help/
│   ├── How to order
│   ├── Artwork preparation
│   ├── Design help
│   ├── Materials & finishes
│   ├── Delivery & pickup
│   ├── Payments
│   └── FAQ (preserve /faq/ if practical)
├── About /about/
├── Contact /contact/
├── Request a quote /request-a-quote/ → quote result / acceptance
├── Utilities → search / cart / checkout / payment result / account / tracking / proof
└── Footer policies → privacy / terms / returns & cancellation / artwork & proof
```

The HTML review tree at `planning/sitemap.html` expands routes into purpose, primary action, section order and input needs. `planning/sitemap.json` holds the same structure. [[Page Structure Trees]] is the Obsidian reading version.

## Customer vocabulary versus guide families

Shop groups products by intended use. Solutions retains every exact service family from the guide. A product may link several solution pages without becoming duplicate product listings. [[Service Coverage Matrix]] maps all 12 families to outputs and buy/quote routes.

Packaging is a visible launch capability; quote-based until standard dimensions/materials/rates are approved. CNC, laser and UV are explicit solution pages. Legacy materials are preserved in migration planning; whether to add a shop collection still needs confirmation.

## Navigation behaviour

Desktop: small clear top-level navigation, product/solution subnavigation when needed. Mobile: keyboard-accessible expandable groups with clear labels and direct quote access. No hover-only controls. Breadcrumbs connect product and solution detail pages to their parent collections.

## URL policy

All new route names are proposed. Preserve old useful product/core paths where practical. The 64-URL legacy inventory remains intact. Do not replace old service routes with invented redirects until each equivalent destination has been reviewed. See [[Migration and SEO]].
