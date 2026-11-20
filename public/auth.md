# Auth.md

Ponde Meats – Authentication Guide

## 1. Public Storefront & Orders
- **Customer Checkout**: No password required. Customers provide Name, Email, Phone, and Delivery Address.
- **Order Token**: The 5-digit Order Number (e.g. `32975`) serves as an access token for `/order/payment-details/?order={id}` and `/order/confirm-payment/?order={id}`.

## 2. Admin Reply Portal (`/admin`)
- **Passcode Gate**: Gated by `X-Admin-Passcode` HTTP header.
- **Server Enforcement**: All `/api/admin/*` endpoints strictly validate this header against `ADMIN_PASSCODE` env var.
