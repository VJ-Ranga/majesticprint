---
created: 2026-10-05
updated: 2026-10-05
status: future-acceptance-plan
tags: [qa, acceptance]
---

# QA and acceptance

These are planned acceptance criteria. They have not been executed against a new website.

## HTML review

- Core templates work at small/medium/large widths without losing important content.
- Buyers can find business print and gifts and understand shop versus quote actions.
- Every required state has a clear next step, including upload and payment simulations.
- Keyboard, focus, labels, errors, contrast, zoom and reduced motion are manually reviewed.
- Assets stay within agreed budgets; measured results include device/network conditions.
- Sample-only prices and actions are explicit; forms do not create real external orders.
- Approved logo and brand rules are respected.

## WordPress transaction checks

| Area | Meaningful acceptance scenario |
|---|---|
| Price | Staff-verified configurations, tier boundaries, minimums, fees and invalid combinations |
| Cart | Same product with different artwork remains two separate jobs; refresh/edit preserves selections |
| Upload | Required/unsupported/oversized/failed files handled; unauthorised artwork access denied |
| Quote | Accepted specification/version/expiry preserved; price changes cannot be silently accepted |
| Proof | Revised artwork invalidates approval; production cannot use an earlier approved version |
| Payment | Verified success/pending/fail/cancel; duplicate notifications safe; incorrect amounts rejected |
| Production | Cannot release while unpaid or missing required approval; staff override is deliberate/audited |
| Delivery | Correct eligible methods/rates; oversized/installation jobs follow quote policy |
| Notifications | Customer/staff receive correct references and next actions without leaking private files |
| Repeat order | Price/stock revalidated; changed artwork requires a new review |
| Migration | Orders/customers preserved; sample legacy redirects land correctly; restore rehearsal succeeds |

Test sandbox payment cases on staging. Any controlled live test requires the client's authorised test arrangements. Record what was tested, environment, observed result and unresolved defects.

## Release criteria

No unresolved critical payment, price, artwork-access or production-release issues. Required content/policies approved. Relevant WCAG checks recorded. Operational staff demonstrate the workflow. Backups, migration, rollback, monitoring and launch ownership agreed.

## Evidence distinction

**Static/code checks** verify source/assets. **Browser/staging checks** verify rendered behaviour. **Gateway sandbox checks** verify test integrations. **Production checks** verify deployed operation. Report each separately; one is not proof of the others.

## Current wireframe checks

Verify sitemap covers all 12 families; palette matches the guide; intended font roles and fallback are explicit; mobile navigation and annotation toggle work; links remain local/planned; no external uploads or orders occur; layout reflows at phone/desktop widths. Record actual browser evidence separately from these planned checks. The wireframe is a layout study, not a completed storefront.
