# Station Parfume

## Project overview and status

Station Parfume is a web store for a perfume-refill seller that also sells on Shopee. The website mirrors the Shopee catalog: the same titles, variants (aroma and size), prices and SKUs, with about 50 aromas. Jordan Arya Leksana owns the Go backend.

Status: in development and NOT in production yet. There is no live store or public demo. The backend is being modernised milestone by milestone after an audit, and the payment migration is still in progress. Backend repository: https://github.com/JordanAryaLeksana/Station-parfume-backend

## Tech stack

- Backend: Go with Gin, GORM over PostgreSQL, Redis for caching and a JWT token blacklist, JWT access and refresh tokens, Google OAuth2, bcrypt, request validation.
- Payments: Midtrans Core API originally; a migration to Xendit Payment Sessions is designed behind a PAYMENT_PROVIDER feature flag, where only verified webhooks can mark an order as paid.
- Frontend (separate repository): Next.js storefront with Tailwind CSS, shadcn/Radix UI, Redux Toolkit and Zustand.
- Deployment: Docker.

## Security audit and modernisation

Jordan wrote an evidence-based audit of about 3.7k lines of Go. It found an authentication bypass (an error helper that never aborted the request), unauthenticated admin endpoints, SQL injection through path parameters, database credentials in git history and an order route that was never registered, so the original payment flow could never have worked end to end. He chose incremental modernisation over a rewrite and planned it as an 11-milestone roadmap.

## Schema v2 and checkout

- Schema v2 has 18 PostgreSQL tables modelled on Shopee listings: products with up to two variation tiers and models with SKU and price, prices stored as integer rupiah, foreign keys, CHECK constraints and soft deletes. It passed 36 test scenarios on PostgreSQL 17.
- Checkout runs in a database transaction that snapshots prices and handles stock, and the payment amount is taken from the order total instead of the client.
- An idempotent CSV seeder with dry-run and admin modes loads the catalog. Startup no longer runs destructive auto-migrations.
