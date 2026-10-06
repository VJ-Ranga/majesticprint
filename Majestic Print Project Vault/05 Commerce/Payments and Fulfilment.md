---
created: 2026-10-05
updated: 2026-10-05
status: proposed-provider-unconfirmed
tags: [payments, delivery]
---

# Payments and fulfilment

## Existing payment status

The user states the WordPress site includes a payment gateway. The current provider, merchant account, settlement arrangements, plugin version and live operation were not verified. Request these via client/admin access in the implementation stage; do not store secrets in this vault.

## Proposed integration policy

Prefer retaining the client's approved gateway if suitable. PayHere is a **candidate**, not the selected provider. Its [official WooCommerce guide](https://support.payhere.lk/shopping-cart-plugins/plugin-for-woocommerce) documents an integration and sandbox testing. Confirm merchant eligibility and stack compatibility before committing to it.

For a custom PayHere integration, the [Checkout API documentation](https://support.payhere.lk/api-%26-mobile-sdk/checkout-api) describes server notifications and checksum verification. Keep secrets and price validation on the server; a return-page visit alone must not mark an order paid. These requirements must be checked against the actual selected gateway.

## Proposed payment acceptance cases

Success, pending, declined, cancelled, interrupted connection, callback before/after redirect, repeated callback, altered amount/currency/order reference, retry, refund, and chargeback/manual reconciliation. Handling must avoid duplicate orders and duplicate production release. Never show unverified payment as confirmed.

Keep guest checkout available if supported. Show only payment methods the merchant can actually accept. Bank transfer, cash pickup, deposits and COD are optional business-policy decisions, not assumed inclusions. Payment received and production-ready remain separate states.

## Delivery and pickup

Confirm pickup location/hours, courier coverage/rates, weight/size handling, installation zones, fragile items, deadlines and dispatch ownership. Pannala origin matters; do not copy Colombo competitors' delivery promises.

Give customers a distinction between production time after approval and transit time after dispatch. Calculate or confirm the fulfilment cost before payment. Installation and oversized jobs may need a quote rather than standard courier checkout.

## Staff operating model

Define who verifies bank transfers, handles gateway exceptions, reviews artwork, sends proofs, schedules print, records dispatch and handles complaints/refunds. Agree notifications and staff response expectations. Email is the proposed base notification channel; WhatsApp automation is a separate integration decision.

Related: [[Customer Journeys]], [[WordPress Architecture]], [[Open Questions]].

## Service-scope reconciliation

Guide-confirmed signage, vehicle branding, large-format and specialist fabrication may require survey/installation/custom freight. Route these through an accepted quote rather than a generic courier rate. Corporate gifts can involve split recipients or campaign fulfilment only if the client approves that capability. No new gateway or delivery guarantee follows from the brand guide.
