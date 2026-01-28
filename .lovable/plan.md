

# Vehicle Detail Page - Gallery Grid & Pricing Enhancements

## Summary
Two main enhancements for the vehicle detail page:
1. Replace the carousel gallery with a grid of clickable images that open in fullscreen with navigation
2. Update the pricing summary to show security deposit and total with/without deposit

---

## 1. Gallery Grid with Fullscreen Lightbox

### Current State
- The page uses an Embla Carousel showing 4 images at a time
- Images are not clickable for fullscreen view
- The `MediaGallery` component exists with lightbox functionality but isn't used

### Proposed Changes

**File:** `src/pages/VehicleDetail.tsx`

Replace the carousel section with the existing `MediaGallery` component, which already includes:
- A responsive grid layout (2 columns on mobile, 3 on desktop)
- Click-to-open fullscreen lightbox
- Left/right navigation arrows in lightbox
- Image counter (e.g., "3 / 10")
- Keyboard-friendly navigation

**Changes needed:**
- Import `MediaGallery` component
- Remove Carousel imports (no longer needed)
- Replace the carousel section with `MediaGallery`
- Pass `gallery_urls` to the `images` prop

```tsx
// Before: Carousel
<Carousel>
  <CarouselContent>
    {galleryImages.map(...)}
  </CarouselContent>
</Carousel>

// After: Grid with lightbox
<MediaGallery 
  images={galleryImages} 
  vehicleName={vehicle.name} 
/>
```

**Grid Layout:**
- 2 columns on mobile
- 3 columns on tablet/desktop
- 4:3 aspect ratio per image (matching site standards)
- Hover effect with slight zoom

---

## 2. Pricing Summary with Security Deposit

### Current State
The pricing breakdown shows:
- Days × Rate
- Multi-day discount (if applicable)
- Estimated Total

### Proposed Changes

**File:** `src/components/enquiry/WhatsAppEnquiry.tsx`

Add `securityDeposit` as a new prop and update the pricing breakdown to show:

| Line Item | Example |
|-----------|---------|
| 4 days × R4,050/day | R16,200 |
| Multi-day discount (10%) | Save R1,800 |
| **Estimated Rental Total** | **R16,200** |
| Security Deposit (refundable) | R10,000 |
| **Total Payable** | **R26,200** |

**Implementation:**
```tsx
interface WhatsAppEnquiryProps {
  // ... existing props
  securityDeposit?: number;
}

// In the pricing breakdown section:
{pricing && (
  <div className="...">
    {/* Existing rental calculation */}
    
    {/* New: Rental Total line */}
    <div className="flex justify-between">
      <span>Estimated Rental Total</span>
      <span>{formatCurrency(pricing.totalEstimate)}</span>
    </div>
    
    {/* New: Security Deposit line */}
    {securityDeposit && securityDeposit > 0 && (
      <div className="flex justify-between text-muted-foreground">
        <span>Security Deposit (refundable)</span>
        <span>{formatCurrency(securityDeposit)}</span>
      </div>
    )}
    
    {/* New: Total Payable line */}
    {securityDeposit && securityDeposit > 0 && (
      <div className="border-t pt-3 flex justify-between">
        <span className="font-medium">Total Payable</span>
        <span className="text-xl font-serif">
          {formatCurrency(pricing.totalEstimate + securityDeposit)}
        </span>
      </div>
    )}
  </div>
)}
```

**File:** `src/pages/VehicleDetail.tsx`

Pass the security deposit to the enquiry component:
```tsx
<WhatsAppEnquiry
  vehicleName={vehicle.name}
  dailyRate={vehicle.daily_rate}
  unavailableDates={unavailableDates}
  multiDayThreshold={multiDayThreshold}
  multiDayDiscountPercent={multiDayDiscountPercent}
  securityDeposit={vehicle.security_deposit}  // NEW
/>
```

---

## Files Summary

| File | Action |
|------|--------|
| `src/pages/VehicleDetail.tsx` | Replace Carousel with MediaGallery, pass securityDeposit prop |
| `src/components/enquiry/WhatsAppEnquiry.tsx` | Add securityDeposit prop, update pricing breakdown |

---

## Technical Notes

- The `MediaGallery` component is already built and tested with a fullscreen Dialog lightbox
- Security deposit is already available on the vehicle object (`vehicle.security_deposit`)
- The lightbox supports keyboard navigation (arrow keys work out of the box with Radix Dialog)
- Grid uses the standard 4:3 aspect ratio for consistency with fleet cards

