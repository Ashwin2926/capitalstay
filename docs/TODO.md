# To-do

## Hostaway listings and booking on the website (planned)

Goal: guests browse, check availability and get prices on capitalstayuae.com; only the
payment step happens on Hostaway's secure checkout (booking.capitalstayuae.com, Stripe).

### Plan
1. **Server-side proxy** holding the Hostaway Account ID + API key (never in frontend code;
   `VITE_*` env vars are public). Hostaway API: `https://api.hostaway.com/v1`, OAuth2 client
   credentials via `POST /v1/accessTokens` (client_id = Account ID, client_secret = API key).
   Proxy routes: listings, single listing, calendar/availability, price quote. Cache listings.
2. **Properties page**: live listings from Hostaway (photos, amenities, price), search + filters.
3. **Property page**: availability calendar (booked dates disabled) and price quote via
   `/listings/{id}/calendar/priceDetails`.
4. **Book now**: hand off to Hostaway checkout pre-filled with listing, dates and guests.
   Hostaway takes payment, creates the reservation, blocks the calendar, sends confirmation.

### Not doing
- Creating reservations via `POST /reservations` and emailing a payment link: unpaid holds
  block dates, and payment links appear to be dashboard-only (no API).
- Taking cards on our own site (PCI scope, payment reconciliation).

### Needed before starting
- [ ] A sample Hostaway checkout URL (open a property on booking.capitalstayuae.com, pick
      dates + guests, click Book, copy the URL) to confirm the deep-link format.
- [ ] Where the proxy runs (cPanel PHP/Node app, Vercel or Cloudflare Worker).
- [ ] Hostaway Account ID + API key (Hostaway > Settings > Hostaway API), stored as
      server environment variables.
- [ ] Verify request formats, rate limits and direct-booking channel ID against
      https://api.hostaway.com/documentation

## Mobile layouts site-wide
- [ ] Audit other pages for sections that stack into one long column on mobile; prefer
      side-by-side grids or swipeable rows (done on the Team page).
