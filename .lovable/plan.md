

# Hero Layout Adjustment - Left Alignment

## Summary
Simplify the hero content alignment to anchor it to the left side of the page, removing artificial centering and offsets.

---

## Current State
```tsx
<div className="max-w-3xl mx-auto text-center md:text-left md:mx-0 lg:ml-28 animate-fade-in-up">
```

The current approach uses:
- `mx-auto` for mobile centering
- `md:mx-0` to remove centering on medium+
- `lg:ml-28` as an artificial offset to align under "Home"
- `text-center` on mobile, `md:text-left` on desktop

---

## Proposed Change

**File:** `src/pages/Index.tsx`

Update the hero content wrapper to:
```tsx
<div className="max-w-3xl text-left ml-0 animate-fade-in-up">
```

**Changes:**
- Remove `mx-auto` (no horizontal centering)
- Remove `text-center md:text-left` (always left-aligned)
- Remove `md:mx-0` (not needed without mx-auto)
- Remove `lg:ml-28` (no artificial offset)
- Add `ml-0` for explicit left anchoring
- Keep `text-left` at all breakpoints

---

## Visual Result
The hero content (logo, headline, subheadline, buttons) will be anchored to the left edge of the `container-luxury` padding, creating a clean editorial layout where the headline naturally aligns with the page's content grid.

---

## Files Summary

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Update hero content container classes |

