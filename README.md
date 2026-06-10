# Tennex Express

A modern tennis equipment storefront built with Next.js 16 App Router, TypeScript, and Tailwind CSS v4.

## What we built

**13 product categories** — racquets, strings, overgrips, dampeners, bags, balls, accessories, court equipment, stringing machines, junior gear, men's clothing, women's clothing, and shoes.

**100+ products** with real Tennis Warehouse CDN images for all categories except shoes (placeholders). Brands include Wilson, Babolat, Head, Nike, adidas, New Balance, Lacoste, On Running, Prince, Yonex, and more.

**Shopping cart** — persistent via localStorage, slide-out drawer, variant/size selection, quick-add buttons on every product card.

**Checkout flow** — shipping address, shipping method (standard/express), promo codes (`TENNEX10`, `RALLY5`), payment method selector (Card/PayPal/Stripe UI), order confirmation with receipt.

**Transactional emails** via Resend — order confirmation, newsletter welcome, and contact form lead notification all send to `alexeiborbot@gmail.com`.

**Search** — full-text modal (Cmd+K) searching all products by name, brand, category, and tags.

**Category filters** — sidebar with Brand, Level, Price, Item Type, Availability, and Status filters. OR within group, AND across groups.

**Static pages** — /shipping, /returns, /privacy, /terms, /contact, /about, /blog.

**Other features** — page transitions, skeleton loaders, scroll-to-top, sticky announcement bar, size guide modal, OG image, JSON-LD schema, breadcrumbs, related products.

## Running locally

Double-click **Start Tennex.bat** on the Desktop. It starts the dev server and opens the browser automatically.

> Use `http://127.0.0.1:3000` — not `localhost:3000` (DNS issue on this machine).

## Tech stack

- Next.js 16.2.7 (App Router, SSG)
- React 19
- TypeScript 5
- Tailwind CSS v4
- Resend (email)

## Still to do

1. **Stripe** — checkout is currently a UI mock, no real payments
2. **Resend domain** — verify a custom domain to send emails to real customers
3. **Deploy to Vercel** — site only runs locally
4. **Shoe images** — swap picsum placeholders with real TW CDN codes
