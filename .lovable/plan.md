
# Website Updates Plan

## Summary
This plan covers 6 updates to the Signature Car Rentals website: changing button text from "Enquire" to "Book", fixing button widths, adjusting hero alignment, updating the WhatsApp number, adding social icons to the footer, and replacing the footer text logo with the actual logo image.

---

## 1. Update "Enquire Now" to "Book Now"

Update all CTA button text across the site:

**Files to modify:**

| File | Location | Current Text | New Text |
|------|----------|--------------|----------|
| `src/pages/Index.tsx` | Line 45 | "Enquire Now" | "Book Now" |
| `src/components/layout/Header.tsx` | Line 106 | "Enquire" | "Book" |
| `src/components/layout/Header.tsx` | Line 112 | "Enquire Now" | "Book Now" |
| `src/components/layout/Header.tsx` | Line 182 | "Enquire Now" | "Book Now" |
| `src/components/home/HowItWorks.tsx` | Line 14 | "Enquire" (step title) | "Enquire" (keep as-is - describes process step) |
| `src/pages/Process.tsx` | Line 192 | "Enquire Now" | "Book Now" |
| `src/pages/About.tsx` | Line 299 | "Enquire Now" | "Book Now" |
| `src/pages/FAQ.tsx` | Line 172 | "Enquire Now" | "Book Now" |

---

## 2. Make Hero Buttons Same Length

Currently, "Book Now" and "Explore Your Dream Ride" buttons have different widths because they rely on content width.

**Solution:** Add a minimum width class to both buttons so they appear equal in length.

**File:** `src/pages/Index.tsx`

Update the button container from:
```jsx
<div className="flex flex-col sm:flex-row gap-4 justify-center">
```

To:
```jsx
<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
```

And add `className="w-full sm:w-auto sm:min-w-[220px]"` to each `LuxuryButton` to ensure consistent width.

---

## 3. Move Hero Content More to the Left on Desktop

Currently the hero content uses `mx-auto` which centers it even though text is left-aligned.

**File:** `src/pages/Index.tsx`

The current hero container has `md:mx-0` which should work, but the button container still has `justify-center`. 

**Changes:**
- Change button flex container from `justify-center` to `justify-center md:justify-start`
- This ensures buttons align left on desktop while remaining centered on mobile

---

## 4. Update WhatsApp Number

**File:** `src/lib/siteConfig.ts`

Update:
```typescript
export const siteConfig = {
  whatsapp: {
    number: "27716649603",  // Changed from 27827830342
    displayNumber: "+27 71 664 9603"  // Updated display format
  },
  contact: {
    email: "enquiries@signaturecarrentals.co.za",
    phone: "+27 71 664 9603"  // Updated phone
  }
};
```

Also update **Footer.tsx** which has a hardcoded WhatsApp number:
- Import `siteConfig` 
- Replace `https://wa.me/27000000000` with dynamic value using `siteConfig.whatsapp.number`

---

## 5. Add Instagram and Facebook Icons to Footer

**File:** `src/components/layout/Footer.tsx`

Add Instagram and Facebook icons from Lucide React in the bottom bar social links section.

**Changes:**
- Import `Instagram` and `Facebook` icons from `lucide-react`
- Add icon links before the WhatsApp and Email links
- Style consistently with existing links

**New social section will look like:**
```jsx
<div className="flex items-center gap-6">
  <a href="https://instagram.com/signaturecarrentals" ...>
    <Instagram className="w-5 h-5" />
  </a>
  <a href="https://facebook.com/signaturecarrentals" ...>
    <Facebook className="w-5 h-5" />
  </a>
  <a href={`https://wa.me/${siteConfig.whatsapp.number}`} ...>
    WhatsApp
  </a>
  <a href="mailto:..." ...>
    Email
  </a>
</div>
```

---

## 6. Replace Footer Text Logo with Actual Logo Image

**File:** `src/components/layout/Footer.tsx`

Replace the text-based logo:
```jsx
<span className="font-serif text-2xl font-medium tracking-tight">
  Signature
</span>
<span className="block text-caption text-primary-foreground/60 ...">
  Car Rentals
</span>
```

With the actual logo image (inverted for dark background):
```jsx
import logo from "@/assets/logo.png";

// In the component:
<img 
  src={logo} 
  alt="Signature Car Rentals" 
  className="h-16 md:h-20 w-auto brightness-0 invert" 
/>
```

The `brightness-0 invert` classes will make the logo white to match the dark footer background.

---

## Technical Notes

- All changes follow existing code patterns and conventions
- The logo uses the same invert technique already used in the homepage hero
- Social media URLs are placeholders - can be updated with actual profile URLs when available
- WhatsApp number format: "27716649603" (country code 27 + number without leading 0)

---

## Files to Modify

1. `src/lib/siteConfig.ts` - WhatsApp number update
2. `src/pages/Index.tsx` - Button text, button width, alignment
3. `src/components/layout/Header.tsx` - Button text updates (3 locations)
4. `src/components/layout/Footer.tsx` - Logo, social icons, WhatsApp number
5. `src/components/home/HowItWorks.tsx` - Button text
6. `src/pages/Process.tsx` - Button text
7. `src/pages/About.tsx` - Button text
8. `src/pages/FAQ.tsx` - Button text
