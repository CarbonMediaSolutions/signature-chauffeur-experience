

# Hero Layout - Mobile Centered, Desktop Left Offset

## Summary
Adjust the hero content alignment to be centered on mobile but pushed left by 50px on desktop.

---

## Current State
```tsx
<div className="max-w-3xl text-left ml-0 animate-fade-in-up">
```

Currently left-aligned at all breakpoints with no offset.

---

## Proposed Change

**File:** `src/pages/Index.tsx`

Update the hero content wrapper to:
```tsx
<div className="max-w-3xl mx-auto text-center md:text-left md:mx-0 md:ml-[50px] animate-fade-in-up">
```

**Changes:**
- `mx-auto` - center on mobile
- `text-center` - center text on mobile
- `md:text-left` - left-align text on desktop
- `md:mx-0` - remove auto margins on desktop
- `md:ml-[50px]` - push 50px from left on desktop

Also update the logo container to match:
```tsx
<div className="mb-8 flex justify-center md:justify-start">
```
(This is already correct in the current code)

---

## Visual Result
- **Mobile**: Centered content as shown in the first screenshot
- **Desktop**: Content anchored 50px from the left edge of the container

---

## Files Summary

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Update hero content container classes |

