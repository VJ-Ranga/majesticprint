---
created: 2026-10-05
updated: 2026-10-05
status: authoritative-brand-baseline
tags: [brand, source-of-truth]
---

# Brand guide findings

Source: the client-supplied **BRAND GUIDELINES copy.pdf**, a one-page, long-format document in the workspace root. Text and visual layout were reviewed. User instruction: follow this guide for identity, colour, typography and services. This supersedes the earlier missing-guide assumptions.

## Identity

- Brand: **MAJESTIC PRINT SOLUTIONS**.
- Tagline: **Print. Pack. Promote.**
- Positioning: an all-in-one printing, packaging, branding and promotional solutions provider.
- Personality: professional, modern, reliable, creative, innovative, established and technology-driven.
- Final brand statement: **ONE PARTNER. EVERY PRINTING SOLUTION.**

The website should carry this broader positioning. The mixed business/personal audience remains valid; gifts are one part of the company, rather than the entire identity.

## Exact colour tokens

| Token | Guide value | Guide role | Website application proposed |
|---|---|---|---|
| Magenta | `#D01C60` | Highlights / creative accents | Occasional high-emphasis highlight; limited use |
| Orange | `#CF6428` | Secondary accent | Small decorative/category detail |
| Yellow / Gold | `#EAA123` | Energy / premium accents | Rules, shapes, large decorative highlights |
| Deep Blue | `#13477A` | Corporate / primary blue | Main brand surfaces, primary controls, headings |
| Bright Blue | `#007CAC` | Technology / digital accents | Secondary brand detail and links on light surfaces |

White and neutral greys support layout and wireframe placeholders. They are supporting UI colours, not additions to the brand palette. Avoid applying all five accents equally to every component.

Calculated white-text contrast: deep blue **9.50:1**, magenta **5.23:1**, bright blue **4.69:1**, orange **3.81:1**, gold **2.18:1**. White normal-size text is unsuitable on orange/gold. Gold against deep blue is **4.35:1**, below the normal-text target, so use it as decoration or appropriately large text. These calculations inform pairings; they are not a complete WCAG audit.

The earlier public SVG contains slightly different fills. Preserve the original logo asset unchanged; use the **guide values** for website UI. Final logo variants should come from supplied masters rather than recolouring the public logo.

## Typography: guide versus website proposal

The typography panel names **Nexa Heavy**, **Nexa Text-Trial**, and **Swis721 Md BT Medium** under the wordmark/tagline examples. PDF embedded-font metadata also identifies Swiss721BT-Medium and NexaText-Trial-Regular. It contains Poppins and Myriad in the document, but those are not presented as the identity type choices; do not silently promote them into website brand fonts.

Proposed site allocation: Nexa Heavy for primary headings; the licensed production Nexa Text equivalent for body/forms/navigation; Swiss721 medium for the approved tagline treatment. This allocation is a web-design interpretation, not an explicit complete UI typography specification in the guide.

No standalone licensed WOFF/WOFF2 files have been supplied. The wireframe declares the intended font roles and falls back to system sans-serif. It does not extract or embed PDF font subsets. Confirm the retail font/version and web licence for the `Trial` designation before production. [Fontfabric Nexa](https://www.fontfabric.com/fonts/nexa/), [Fontfabric help](https://www.fontfabric.com/help/).

## Logo system

The guide shows stacked and horizontal applications, including light/dark presentations. Keep supplied artwork proportions and wordmark/tagline relationships. It does not provide measured clear-space/minimum-size rules; request those rather than inventing mandatory dimensions.

The homepage wireframe uses the unmodified public header-logo reference for orientation. It is labelled a reference in the design notes; final production requires approved master variants.

## What the guide does and does not settle

The guide confirms identity and **12 service families**, mapped in [[Service Coverage Matrix]]. It does not settle rates, minimum quantities, stock, production limits, dispatch coverage, proof rules, gateway, staff responsibilities or guarantees. Separate a confirmed capability family from a ready-to-sell SKU.

Related: [[Brand and Asset Register]], [[Recommended Experience]], [[Performance and Accessibility]].
