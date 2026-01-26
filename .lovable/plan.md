

# Fix Hero Button Text Wrap & Navigation Alignment

## Summary
Two fixes needed: (1) Prevent "Explore Your Dream Ride" button text from wrapping to two lines, and (2) align the hero content with the "Home" navigation item instead of the logo position.

---

## 1. Prevent Button Text Wrapping

**Current Issue:**
The button width of `sm:w-[220px]` is too narrow for "Explore Your Dream Ride" text, causing it to wrap to two lines.

**Solution:**
Increase the button width from `220px` to `260px` and add `whitespace-nowrap` to prevent any text wrapping.

**File:** `src/pages/Index.tsx` (lines 36-45)

From:
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

To:
```jsx
<Link to="/contact" className="w-full sm:w-[260px]">
  <LuxuryButton variant="hero" size="lg" className="w-full whitespace-nowrap">
    Book Now
  </LuxuryButton>
</Link>
<Link to="/fleet" className="w-full sm:w-[260px]">
  <LuxuryButton variant="heroInverse" size="lg" className="w-full whitespace-nowrap">
    Explore Your Dream Ride
  </LuxuryButton>
</Link>
```

---

## 2. Align Hero Content with "Home" Navigation Item

**Current Issue:**
The header navigation uses a 3-column layout with `justify-between`:
- Left: Logo (approx 80px wide on desktop)
- Center: Navigation links (starting with "Home")
- Right: Book button

The hero content starts at the left edge of `container-luxury` (with padding), but "Home" starts after the logo. This creates a misalignment.

**Solution:**
Add left margin to the hero content wrapper on desktop to offset it to where the navigation links begin. The logo is approximately `h-20` (80px) plus some spacing (gap-10 = 40px equivalent). Adding `lg:ml-32` (128px) or similar should align the hero text with "Home".

**File:** `src/pages/Index.tsx` (line 21)

From:
```jsx
<div className="max-w-3xl mx-auto text-center md:text-left md:mx-0 animate-fade-in-up">
```

To:
```jsx
<div className="max-w-3xl mx-auto text-center md:text-left md:mx-0 lg:ml-28 animate-fade-in-up">
```

The `lg:ml-28` (112px) adds left margin on large screens to push the content rightward, aligning it approximately with where the "Home" navigation item begins.

---

## Files to Modify
- `src/pages/Index.tsx` (lines 21, 36-45)

