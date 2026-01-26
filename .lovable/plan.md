
# Hero Alignment & Button Fixes

## Summary
Two adjustments needed: (1) Align hero content to match the navigation's "Home" position, and (2) ensure both hero buttons are exactly the same length.

---

## 1. Align Hero Content Underneath Navigation

**Current Issue:**
The hero section uses `justify-center md:justify-start` on the `<section>`, but this causes the container-luxury to start from the very left of the section. The navigation uses `container-luxury` which has `max-w-7xl mx-auto px-6 md:px-12 lg:px-20` padding - but the hero isn't properly using this same alignment context.

**Solution:**
Remove the `md:justify-start` from the section and instead let the `container-luxury` class handle the horizontal positioning naturally. The content inside should be left-aligned within the container.

**File:** `src/pages/Index.tsx` (line 14)

From:
```jsx
<section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[75vh] flex items-center justify-center md:justify-start">
```

To:
```jsx
<section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[75vh] flex items-center">
```

This allows the `container-luxury` wrapper to center the content area with the same max-width and padding as the header navigation, ensuring the hero content aligns directly underneath "Home".

---

## 2. Make Buttons Exactly Same Length

**Current Issue:**
The buttons are wrapped in `<Link>` components which are inline-block by default. The `min-w-[220px]` is applied to the buttons inside, but the links don't stretch to match, causing inconsistent visual appearance.

**Solution:**
Apply the width classes to both the `<Link>` wrapper AND the button, ensuring they both expand to the same fixed width on desktop.

**File:** `src/pages/Index.tsx` (lines 36-45)

From:
```jsx
<Link to="/contact">
  <LuxuryButton variant="hero" size="lg" className="w-full sm:w-auto sm:min-w-[220px]">
    Book Now
  </LuxuryButton>
</Link>
<Link to="/fleet">
  <LuxuryButton variant="heroInverse" size="lg" className="w-full sm:w-auto sm:min-w-[220px]">
    Explore Your Dream Ride
  </LuxuryButton>
</Link>
```

To:
```jsx
<Link to="/contact" className="w-full sm:w-[220px]">
  <LuxuryButton variant="hero" size="lg" className="w-full">
    Book Now
  </LuxuryButton>
</Link>
<Link to="/fleet" className="w-full sm:w-[220px]">
  <LuxuryButton variant="heroInverse" size="lg" className="w-full">
    Explore Your Dream Ride
  </LuxuryButton>
</Link>
```

Key changes:
- Apply exact fixed width `sm:w-[220px]` to the `<Link>` wrappers (not min-width)
- Set `w-full` on the buttons so they expand to fill the link container
- Both buttons will now be exactly 220px wide on tablet/desktop and full-width on mobile

---

## Files to Modify
- `src/pages/Index.tsx` (lines 14, 36-45)
