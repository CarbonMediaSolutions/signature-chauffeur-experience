
# Move Hero Content Further Left on Desktop

## Summary
The hero section content ("DREAM IT. DRIVE IT. LIVE IT.") needs to be positioned closer to the left edge on desktop. Currently, it's left-aligned within a centered container, making it appear in the middle of the screen.

---

## Current Issue

The hero section has this structure:
- The outer `<section>` uses `flex items-center justify-center` which centers the container horizontally
- The `container-luxury` class applies `max-w-7xl mx-auto px-6 md:px-12 lg:px-20` which centers with generous padding
- The content wrapper has `md:mx-0` but the parent centering keeps it visually centered

---

## Solution

Modify the section's flex alignment to start from the left on desktop screens:

**File:** `src/pages/Index.tsx`

**Change on line 14:**
From:
```jsx
<section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[75vh] flex items-center justify-center">
```

To:
```jsx
<section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[75vh] flex items-center justify-center md:justify-start">
```

This ensures:
- Mobile: Content remains centered (`justify-center`)
- Desktop: Content aligns to the left edge (`md:justify-start`)

The `container-luxury` padding (`px-6 md:px-12 lg:px-20`) will provide appropriate breathing room from the left edge while positioning the content much closer to the left side of the screen.

---

## Files to Modify
- `src/pages/Index.tsx` (line 14 only)
