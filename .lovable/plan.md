## Issue

Several "Book Now" / "Explore Your Dream Ride" CTAs still link to `/contact` (the enquiry form) instead of opening the FareHarbor Lightframe popup. Kristina wants these to open the booking widget directly.

## Fix

Swap each `<Link to="/contact">…Book Now…</Link>` (and the homepage hero "Explore Your Dream Ride") for a `<FareHarborButton>` (no `itemCode` -> opens the full catalogue picker in the Lightframe).

### Files to update

1. **`src/pages/Index.tsx`** (hero)
   - "Book Now" -> `FareHarborButton` (full catalogue), keep luxury hero styling via `className`.
   - "Explore Your Dream Ride" -> `FareHarborButton` (full catalogue), keep inverse-hero styling. (Per the brief, the booking widget should replace the enquiry form path here too.)
   - Keep the bottom-of-page "Start Your Booking" CTA also pointing to FareHarbor.

2. **`src/components/layout/Header.tsx`**
   - Desktop "Book" pill (line 110-112) -> FareHarbor Lightframe link.
   - Mobile top "Book Now" (line 117-119) -> FareHarbor Lightframe link.
   - Mobile menu "Book Now" (line 183-189) -> FareHarbor Lightframe link.

3. **`src/pages/About.tsx`** (line 240) - "Book Now" -> FareHarbor.
4. **`src/pages/Process.tsx`** (line 101) - "Book Now" -> FareHarbor.
5. **`src/pages/FAQ.tsx`** (line 123) - "Book Now" -> FareHarbor.

### Implementation note

To preserve the existing luxury button look (LuxuryButton variants like `hero`, `heroInverse`, `default`, `outline`), I'll render `FareHarborButton` with a passthrough `className` that mirrors the existing button styling, OR wrap a styled `<a>` directly using the same Tailwind classes the LuxuryButton produces. The FareHarbor global script (already in `index.html`) intercepts `fareharbor.com/embeds/book/...` anchors and opens them in the Lightframe popup, so as long as the element is an `<a>` with that href, it will pop up - no navigation away.

### What stays the same

- "Contact" nav link, contact page, and the WhatsApp/Enquiry forms remain (they're for general enquiries, not bookings).
- Vehicle cards, vehicle detail page, floating Book button, and Gift Cards already use FareHarbor - no change.
