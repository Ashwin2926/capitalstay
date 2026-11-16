# Hostaway API: showing listings on capitalstayuae.com

Research notes, November 2026. Sources are listed at the end. Items marked
**unverified** come from third-party summaries and must be checked against the
official reference (https://api.hostaway.com/documentation) on first use.

## Verdict

Possible. The Hostaway public API can supply everything needed to show live
listings, photos, amenities, an availability calendar and a price quote on our
own site. Payment stays on Hostaway's checkout (booking.capitalstayuae.com),
so Stripe, reservations and calendar blocking keep working as they do today.

## What the API provides

| Need on the site | API call | Confidence |
|---|---|---|
| Log in | `POST /v1/accessTokens` (form body: `grant_type=client_credentials`, `client_id`=Account ID, `client_secret`=API key, `scope=general`). Token valid up to 24 months; send as `Authorization: Bearer <token>`. Hostaway advises renewing every 12 months. | Official docs + Hostaway support |
| List of properties | `GET /v1/listings` with `limit`, `offset`, `city`, `country`, `sortOrder`; also `availabilityDateStart`, `availabilityDateEnd` for date search | Official docs (via search) |
| Photos and amenities | Add `includeResources=1`; without it `listingImages` and `listingAmenities` come back empty. Amenity = id + name. Exact image fields (url, caption, order) **unverified** | Official docs (via search) |
| One property | `GET /v1/listings/{id}?includeResources=1` | Official docs |
| Availability calendar | `GET /v1/listings/{id}/calendar` (per-day: `isAvailable`, `price`, `minimumStay`). GET parameters (`startDate`/`endDate`) **unverified** | Mixed |
| Price for chosen dates | `POST /v1/listings/{id}/calendar/priceDetails` with `startingDate`, `endingDate`, `numberOfGuests` (required), `version: 2`; returns `totalPrice`. Breakdown of fees and taxes **unverified** | Official docs (via search) |
| Reviews | `GET /v1/reviews`, filter by listing with `listingMapIds[]=`; also `channelIds`, `ratingMin`. Response fields **unverified** | Official changelog |
| Change alerts | Unified webhooks: `reservation.created`, `reservation.updated`, `message.received`. No listing-change event, so listing data must be refreshed on a schedule. Legacy reservation webhooks are being retired. | Hostaway support + third party |
| Rate limits | Per account; some endpoints have their own caps (examples quoted: 400 requests / 10 s, 30 / min). Exceeding returns HTTP 429. General limit **unverified** | Mixed |

## Booking hand-off

- Listing pages on our booking site already work at
  `https://booking.capitalstayuae.com/listings/{listingId}` (used by Key Destinations).
- Search with dates already works at
  `https://booking.capitalstayuae.com/search?start=YYYY-MM-DD&end=YYYY-MM-DD&numberOfGuests=N&city=...`
  (used by the home page search).
- A checkout link that pre-fills dates (reported as `/checkout/{id}?start=&end=&numberOfGuests=`)
  is **not documented by Hostaway**. One site using it runs a daily check in case
  the format changes. We should confirm with a real link from our booking site.

## Constraints

1. **The API key must never be in the website's code.** The site is plain files
   in the browser; anything there is public. Calls must go through a small
   server-side piece.
2. **Hosting is cPanel.** cPanel hosts run PHP, so the server-side piece can be a
   PHP script on our own domain (for example `capitalstayuae.com/api/hostaway.php`)
   with the key in a config file outside `public_html`. No extra hosting needed.
3. **Caching.** To stay inside rate limits and keep pages fast, the PHP script
   caches responses on disk: listings about 30 minutes, calendars about 10 minutes,
   price quotes not cached (or 1 minute).
4. **No listing webhooks.** New photos or descriptions appear after the cache
   expires, not instantly.
5. **Plan and terms.** The API is self-serve in Hostaway (Settings > Hostaway API).
   One third-party source says it needs a Pro/Enterprise plan; confirm with Hostaway.
   Terms allow integrating with your own systems; they forbid building competing
   services, which does not apply to our own booking site.

## Proposed build

1. **PHP proxy** on cPanel: token handling, caching, and four read-only routes
   (listings, listing, calendar, price quote). No write access exposed.
2. **Properties page**: grid of live listings with photo, area, bedrooms, guests,
   "from" price; filters by area, guests and dates.
3. **Property page**: photo gallery, description, amenities, availability calendar
   with booked nights disabled, live price for chosen dates, "Book now".
4. **Book now** opens Hostaway checkout pre-filled if the link format is confirmed,
   otherwise the listing page on booking.capitalstayuae.com.
5. Optional later: Airbnb reviews from `/v1/reviews`, and replacing the
   hand-written location data where it duplicates listing data.

## Needed from the owner

- Hostaway Account ID and API key (Settings > Hostaway API), entered on the
  cPanel server, not shared in chat or committed to GitHub.
- Confirmation that the cPanel plan runs PHP 8 (almost all do).
- One real checkout link copied from booking.capitalstayuae.com after picking
  dates and guests, to confirm the hand-off format.

## Sources

- [Hostaway Public API Reference](https://api.hostaway.com/documentation) / [mirror](https://hostaway.github.io/api/)
- [Hostaway support: Public API account and secret key](https://support.hostaway.com/hc/en-us/articles/360002576293-Hostaway-Public-API-Account-Secret-Key)
- [Hostaway support: Using webhooks](https://support.hostaway.com/hc/en-us/articles/360009022653-Using-Hostaway-Webhooks)
- [Hostaway support: Booking Website custom domain](https://support.hostaway.com/hc/en-us/articles/1260802545450-Using-a-Custom-Domain-for-the-Booking-Engine)
- [Hostaway Terms of Service](https://www.hostaway.com/terms/)
- [Hostaway/api pull request on listing and review fields](https://github.com/Hostaway/api/pull/66)
- [Hookdeck: Hostaway webhooks guide](https://hookdeck.com/webhooks/platforms/guide-to-hostaway-webhooks-features-and-best-practices)
- [Example Next.js site using Hostaway listings and calendar](https://github.com/Nidhi-Sharma-1612/e-and-a-rentals)
- [hostaway-ts client](https://github.com/jcjiron/hostaway-ts), [niklashof/hostaway-api client](https://github.com/niklashof/hostaway-api)
- [GitHub PR noting the undocumented checkout URL](https://github.com/uncfreak1255-code/seascape-vacations-site/pull/643)
- [Stylabs: Hostaway API guide](https://www.stylabs.com/services/hostaway-development), [Rapid Eye: API guide](https://rapideyeinspections.com/blog/hostaway-api-guide/)
