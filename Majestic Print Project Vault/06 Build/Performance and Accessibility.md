---
created: 2026-10-05
updated: 2026-10-05
status: proposed-quality-targets
tags: [performance, accessibility]
---

# Performance and accessibility

The user explicitly requires responsive, accessible pages and limited animation. The following are design targets, not measured results or current-site compliance claims.

## Performance targets

Aim for LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile, evaluated separately for mobile and desktop when field data becomes available. Lab measurements guide development; they do not establish field compliance. [Official Web Vitals guidance](https://web.dev/articles/vitals).

Provisional engineering budgets: first-visit homepage transferred assets around 1 MB or less; primary hero image around 200 KB or less; first-route custom JavaScript around 100 KB compressed or less, excluding required gateway/vendor overhead. Refine with actual images, font and stack measurements. Record intentional exceptions; do not compromise readable products to hit an arbitrary number.

Use responsive AVIF/WebP where appropriate, explicit image dimensions, lazy loading below the fold, limited font weights, and route-specific assets. Keep primary content server-rendered/HTML. Load a configurator/editor only where needed. Preserve live headline text and avoid an image-only hero.

## Motion policy

No autoplay hero video, scroll hijacking, required intro, parallax dependency or automatic product carousel. Short state transitions may assist feedback. Honour reduced-motion preferences; all essential content must remain usable without animation.

## Accessibility target

Target WCAG 2.2 AA across the complete buying/quote process. Provide semantic headings/landmarks, meaningful image alternatives, visible keyboard focus, labelled inputs, useful error messages and announced dynamic totals/status. Normal text contrast must meet 4.5:1; large text and meaningful UI graphics follow applicable 3:1 requirements. Avoid colour-only status. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Use generous 44 × 44 CSS-pixel controls as a design preference; this is not the AA minimum. WCAG 2.2 AA target-size guidance uses 24 × 24 with exceptions/spacing rules. [Target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

## Responsive and inclusive verification

Review at 320/390/768/1024/1440 CSS-pixel widths and 200% zoom; also test applicable reflow requirements at 400% zoom. Check low-end Android and slower mobile connections where available. Dialogs/menus must preserve focus; sticky controls must not obscure it. Forms need typed and keyboard alternatives to drag-only uploads/personalisation.

Confirm whether Sinhala/Tamil content is needed. If included, use appropriate fonts, language attributes and client-reviewed translations. Machine-generated translations should not define commercial specifications or policies without review.

Related: [[QA and Acceptance]], [[Brand and Asset Register]].

## Exact brand-colour and font application

Use the guide values and measured pairing table in [[Brand Guide Findings]]. White normal text passes on deep blue, magenta and bright blue, but not orange/gold. Gold-on-deep-blue is 4.35:1, so do not use it for ordinary small text. The homepage wireframe uses those accents mainly as decorative marks. Font roles are declared with system fallback; standalone licensed font files are pending. Validate actual font metrics/loading/language coverage in the final design.
