---
created: 2026-10-05
updated: 2026-10-05
status: proposed-operational-design
tags: [artwork, production]
---

# Artwork and proof workflow

## Proposed responsibilities

Customer supplies accurate content and approves the final proof. Staff assess file suitability, create/revise the proof, and approve production readiness. System records payment and approval evidence. A browser preview assists selection; it is not a replacement for prepress review.

## Workflow

1. Collect files for the relevant line item. Record original filename, type, size, version and upload time.
2. Check server-side file type/size and required files. Explain upload limits before selection.
3. Staff check the product's actual size, bleed, resolution, colour, fonts and special-finish layers where relevant.
4. Request replacement or design assistance when necessary. Preserve earlier versions and correspondence according to an agreed retention policy.
5. Publish a proof with a version and linked specification.
6. Customer approves that version or requests a revision. Revisions invalidate earlier approval.
7. Release production only when payment, required proof and other production prerequisites are satisfied.

## File handling requirements

Use controlled storage and authorised staff/customer access. Random-looking upload URLs are not sufficient access control. Set agreed size/type limits, server validation, rate limits, malware scanning where supported, and retention/deletion rules. Avoid storing unnecessary customer material or exposing artwork through public media galleries, analytics, or emails with unrestricted links.

A WooCommerce upload extension may be useful, but verify its behaviour rather than selecting on its label. [Official file-upload extension documentation](https://woocommerce.com/document/upload-files-on-product-cart-checkout-page-in-woocommerce/) describes configurable restrictions and storage options; test access control and order-line linkage on the selected stack.

## Artwork guide

Provide product-specific dimensions, downloadable templates/dielines, accepted formats, file-size limits and explanatory diagrams. Do not enforce a single bleed/resolution requirement for every printed product. Majestic's production team must approve the instructions.

Explain what staff checking does and does not include: technical suitability, spelling/content, colour matching and physical proofs are distinct responsibilities. The proposed scope of checking remains unconfirmed.

Related: [[Product Model and Pricing]], [[WordPress Architecture]], [[Open Questions]].

## Specialist artwork inputs

Align preparation with the 12 guide families: packaging requires approved dielines; cutting/engraving may require vector geometry and material thickness; UV needs surface/print-area details; signage and vehicle work may need measurements/photos and installation approval. These are proposed intake fields; production staff must validate actual formats/tolerances. Brand fonts/colours describe the website identity, not every customer’s artwork.
