# FareHarbor Booking Integration

Add FareHarbor's Lightframe popup booking flow across the site without disturbing the luxury aesthetic or the existing enquiry/checkout flows.

## 1. Load the Lightframe script globally

Edit `index.html` and add immediately before `</body>`:

```html
<script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"></script>
```

This single script auto-intercepts any anchor pointing at `fareharbor.com/embeds/...` and opens it as a popup overlay.

## 2. New component: `src/components/FareHarborButton.tsx`

Reusable anchor styled to match the site's existing button language (the bordered "Book" link in the header + `LuxuryButton`).

- Props: `itemCode?: string`, `variant?: "primary" | "secondary" | "outline"` (default `primary`), `size?: "sm" | "md" | "lg"` (default `md`), `className?: string`, `children`.
- Renders an `<a>` (required for the Lightframe API), with `target="_blank"` and `rel="noopener noreferrer"` as a graceful fallback.
- `href`:
  - With code: `https://fareharbor.com/embeds/book/signaturecarrentals/items/{itemCode}/?full-items=yes&flow=1580598`
  - Without code: `https://fareharbor.com/embeds/book/signaturecarrentals/?full-items=yes`
- Styling uses existing tokens: `primary` mirrors the dark-on-cream "Book" header button; `outline` is bordered/transparent (for Gift Cards); `secondary` uses the brass/gold accent. Hover: subtle scale + soft shadow in accent colour.

## 3. New component: `src/components/FareHarborCalendar.tsx`

Inline live availability calendar for vehicle detail pages.

- Props: `itemCode: string`, `className?: string`.
- Mounts a `<div ref={containerRef}>` wrapped in a luxury frame (cream background, hairline border, generous padding, serif heading "Live Availability").
- In `useEffect`: create a `<script>` with `src = https://fareharbor.com/embeds/script/calendar/signaturecarrentals/items/{itemCode}/?fallback=simple&full-items=yes&flow=1580598`, `async = true`, append to the container. Cleanup on unmount removes the script and clears `innerHTML` to prevent double-mounting.
- Loading state: shows "Loading availability…" in muted small-caps until the script's injected DOM appears (detected via a `MutationObserver` on the container, or a simple timeout fallback).

## 4. New component: `src/components/FloatingBookButton.tsx`

Site-wide CTA in the bottom-right corner.

- `position: fixed`, `bottom-6 right-6`, `z-50`.
- Wraps `FareHarborButton` (no `itemCode` → catalogue) with a `CalendarCheck` icon from lucide-react and the label "Book Now".
- Entrance: fade + slide-up (Tailwind `animate-fade-in-up` already used in the project).
- Hover: subtle scale-up + soft accent glow.
- Mounted once in `src/components/layout/Layout.tsx`, alongside the existing `<FloatingWhatsApp />` (offset vertically so they don't overlap — Book sits above WhatsApp). This keeps it on every page that uses Layout, which is all public pages.

## 5. Vehicle data — map item codes (DB migration)

Vehicle data lives in Supabase (`vehicles` table) and is consumed via `useVehicles`/`useVehicle`. Plan:

1. Migration: add column `fareharbor_item_code text` (nullable) to `public.vehicles`.
2. Migration: `UPDATE` rows by `id` (slugs are stable):

| Vehicle DB id | Code |
|---|---|
| `bmw-i8-protonic-limited-edition` | 720696 |
| `bmw-z4-m40i-black` | 721112 |
| `bmw-z4-m40i-red` | 721116 |
| `ford-mustang-50-gt` (Silver) | 721117 |
| `ford-mustang-gt-50-red` | 721119 |
| `mercedes-g63-g-wagon` | 721120 |
| `porsche-911-carrera-gts` | 721122 |
| `mercedes-gle-400d` | 721125 |
| `porsche-boxster-718-s` | 721131 |
| `mercedes-cls-400d` | 721139 |

Note: there is a duplicate-looking row `ford-mustang-5-0-gt-silver` whose name is "Ford Mustang 5.0 GT (Red)" — ignored to avoid a wrong mapping; the two real Mustangs (`ford-mustang-50-gt` Silver, `ford-mustang-gt-50-red` Red) get the codes. Other vehicles (Audi R8, Ferrari California, McLarens, etc.) keep `fareharbor_item_code = NULL` and fall back to the catalogue link.

3. Extend the `Vehicle` interface in `src/hooks/useVehicles.tsx` with `fareharbor_item_code: string | null`.

## 6. Wire booking buttons into cards & detail pages

**`src/components/fleet/VehicleCard.tsx`** — currently the entire card is a single `<Link>` to the detail page. Refactor: keep the image + info as the link target, but append a small actions row at the bottom containing:

- `<FareHarborButton itemCode={vehicle.fareharbor_item_code ?? undefined} size="sm">Book Now</FareHarborButton>`

The "View Vehicle" affordance on the image remains. The booking anchor uses `e.stopPropagation()` so clicking it doesn't also navigate to the detail page (split the outer `<Link>` into a wrapper `<div>` with an inner link covering only the visual card area).

**`src/pages/VehicleDetail.tsx`** — add:

- Above the fold, near the existing pricing/CTA block: `<FareHarborButton itemCode={v.fareharbor_item_code ?? undefined} size="lg">Reserve This Vehicle</FareHarborButton>`.
- After the description / specs block: `<FareHarborCalendar itemCode={v.fareharbor_item_code} />` — only rendered when a code exists.
- A second `<FareHarborButton size="lg">` near the bottom of the page.
- Existing `WhatsAppEnquiry` and any checkout flow remain untouched.

## 7. Gift Cards link in header

In `src/components/layout/Header.tsx`, next to the existing "Book" CTA on desktop, add:

```tsx
<FareHarborButton itemCode="721140" variant="outline" size="sm">Gift Cards</FareHarborButton>
```

Mobile: add the same link inside the mobile menu overlay below "Book Now" so it's reachable on small screens.

## Out of scope

- No changes to `.env`, no secrets, no edits to Supabase auth.
- The existing internal `/checkout` PayFast flow is left intact — FareHarbor is added in parallel, not as a replacement.
- No changes to the existing `WhatsAppEnquiry` widget or floating WhatsApp button beyond repositioning the floating WhatsApp slightly to make room for the new floating Book button.

## Files touched

- `index.html` (script tag)
- `src/components/FareHarborButton.tsx` (new)
- `src/components/FareHarborCalendar.tsx` (new)
- `src/components/FloatingBookButton.tsx` (new)
- `src/components/layout/Layout.tsx` (mount floating button)
- `src/components/layout/FloatingWhatsApp.tsx` (minor offset so the two floating buttons stack cleanly)
- `src/components/layout/Header.tsx` (Gift Cards link)
- `src/components/fleet/VehicleCard.tsx` (Book Now button)
- `src/pages/VehicleDetail.tsx` (Reserve button + embedded calendar)
- `src/hooks/useVehicles.tsx` (type extension)
- One Supabase migration: add column + populate 10 codes

## Open question

The DB has a row `ford-mustang-5-0-gt-silver` whose displayed name is "Ford Mustang 5.0 GT (Red)" — looks like a leftover/duplicate. Plan ignores it. If it should actually receive code 721117 or 721119 instead of one of the other rows, flag before approval and I'll swap the mapping.
