---
created: 2026-10-05
updated: 2026-10-05
status: planned-page-structures
tags: [page-plan, wireframe, sitemap]
---

# Page structure trees

This note specifies section order for each reusable page type. The visual sitemap in `planning/sitemap.html` expands every proposed route into its purpose, action and section tree. The full machine-readable register is `planning/sitemap.json`. Paths are proposed; migration decisions must preserve or redirect existing URLs explicitly.

## Shared shell

Header → breadcrumb where useful → one main page heading → page-specific content → contextual help/quote → footer. Use the approved identity and guide palette throughout. Do not build a different brand style for each of the 12 services.

## Home

Purpose: introduce the full company and route shoppers/projects. Primary action: shop products; secondary: project quote.

```text
Header → brand hero → Print/Pack/Promote routes → selected products
→ specialist capabilities → ordering steps → real projects
→ company evidence → quote invitation → footer
```

Detailed annotations and stable H01–H10 section IDs: [[Homepage Wireframe Plan]].

## Shop hub and category

```text
Shop hub
├── Intro: browse by product need
├── Category tiles + business/personal routes
├── Selected products with buy/configure/quote labels
├── Help choosing + custom-project alternative
└── Artwork/delivery guidance links

Category
├── Breadcrumb + title + brief application description
├── Relevant filters + sort + result count
├── Product grid with honest price basis / quote indication
├── Compare sizes/materials where useful
├── Product-specific FAQs / artwork help
└── Related solution and bulk/custom quote
```

Categories: business stationery; marketing/publications; labels/tags; packaging; gifts/apparel; weddings/events; signs/displays. An additional legacy-materials collection remains a business-scope question.

## Standard product and personalised product

```text
Product
├── Breadcrumb + title + application benefit
├── Gallery: overall / detail / scale / material
├── Configure: size → material → print/finish → quantity
├── Price basis + order total + fulfilment note
├── Artwork: upload / approved design-help route
├── Review choices + Add to cart (only validated priceable SKU)
├── Specifications + downloadable artwork guide
├── Production/proof/delivery explanation
└── FAQs / relevant work / custom quote

Personalised variant adds
├── Item / size / colour
├── Supported text/image choices
├── Illustrative preview + clear limitations
└── Personalisation review before cart
```

Representative launch product candidates: business cards, leaflets/brochures, labels, calendars, mugs and T-shirts. These are examples to price/approve, not a complete sales catalogue.

## Solutions hub

```text
Solutions
├── One-partner intro + Print / Pack / Promote grouping
├── Twelve guide families, each with outcome-led description
├── Materials/applications chooser (simple links first)
├── Project examples / approved capability evidence
└── Guided project quote
```

## Each of the 12 solution detail pages

```text
Solution detail
├── Breadcrumb + exact service-family name
├── What it makes possible + real example image
├── Outputs / applications from the guide
├── Supported materials and limits (staff-approved)
├── Relevant purchasable products if validated
├── Real project: brief → material/process → result
├── How this service is specified/produced
├── Service-specific FAQs / artwork requirements
└── Quote CTA with correct family preselected
```

Use [[Service Coverage Matrix]] for each family's outputs and quote inputs. Offset/digital pages link the same relevant shop products rather than duplicating business cards. UV asks about substrate/print area; packaging about style/dimensions/dieline; CNC/laser about thickness/vector drawing; signage about lighting/mounting; vehicle branding about vehicle/photos/coverage. Installation work must not enter generic courier checkout.

## Quote and quote result

```text
Request quote
├── Choose guide service / “Help me choose”
├── Describe intended output / application
├── Relevant specs with “I'm not sure” options
├── Quantity + desired date + destination/installation
├── Artwork / references + file guidance
├── Contact preference and details
├── Review brief + privacy information
└── Submit → reference + next steps / recoverable error
```

The future backend creates a versioned quote and agreed payment path. The wireframe does not submit anything or promise a response deadline.

## Our work and project detail

```text
Our work → introduction → filter by output/service → real project grid → quote
Project → brief → images → materials/process → scope/result → related products/solution → quote
```

Use customer permission and verified facts. Three empty project slots in the wireframe are content requests, not invented portfolio cases.

## Help hub and information pages

```text
Help → buy/quote/artwork questions → topic cards → contact fallback
How to order → standard path → quote path → proof/payment gates → FAQs
Artwork → choose product → dimensions/template → preparation → upload limits → design help
Design help → brief requirements → fees/revisions policy → proof responsibilities → contact/quote
Materials → visual comparison → applications/limits → product/solution links
Delivery → pickup → courier coverage/cost → oversized/installation → lead-time explanation
Payments → accepted methods → payment status/retry → receipts/refunds → support
FAQ → grouped specific questions → relevant help links → contact
```

## About and contact

```text
About → guide positioning → verified story → capabilities → facility/team
→ documented awards if supplied → work → contact
Contact → reason for enquiry → verified phone/email/address/hours
→ location map on demand → accessible enquiry form → support links
```

## Policies

Privacy, terms, returns/cancellations and artwork/proof policy each need a readable client-approved page: title/effective date → clear sections → relevant obligations and contact. They must describe actual operational and payment rules.

## Transaction/account templates

```text
Cart → specification/artwork per line → edit/remove → total/fees → checkout
Checkout → guest/contact → destination → eligible fulfilment → total → gateway
Payment result → verified state → order reference → next action / retry / support
Track order → authorised lookup → payment/artwork/production/dispatch → next action
Account → profile → orders → quote/proof actions → reorder with revalidation
Proof → authorised version → review/change request → explicit approval → receipt of action
```

Final HTML prototype and WordPress acceptance must cover error/empty/hold states as well as happy paths. [[QA and Acceptance]] defines the later functional checks.
