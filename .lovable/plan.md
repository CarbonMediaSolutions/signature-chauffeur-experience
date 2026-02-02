

# Add TrustIndex Widget for Google Reviews

## Summary
Replace the current custom Google reviews implementation with the TrustIndex widget you've configured. This third-party solution handles review fetching, filtering, and display automatically.

---

## What Will Change

The Testimonials section will be simplified to embed your TrustIndex widget, which will display your Google reviews with their pre-built styling.

---

## Implementation Steps

### 1. Update Testimonials Component

Simplify `src/components/home/Testimonials.tsx` to:
- Remove the custom Google Reviews API integration
- Add a container div where the TrustIndex widget will load
- Use a `useEffect` hook to dynamically load the TrustIndex script
- Keep the section styling (background, heading) consistent with your luxury aesthetic

### 2. Clean Up Unused Code

The following can be removed since TrustIndex handles everything:
- `useGoogleReviews` hook calls
- Custom testimonial cards for Google reviews
- Google icon component
- Star rating component

The fallback testimonials will be kept as a backup in case the widget fails to load.

---

## Technical Details

The TrustIndex script will be loaded dynamically when the Testimonials section mounts:

```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.trustindex.io/loader.js?b8da22a6312c812b39766d27171';
  script.defer = true;
  script.async = true;
  containerRef.current?.appendChild(script);
  
  return () => {
    // Cleanup on unmount
  };
}, []);
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/home/Testimonials.tsx` | Simplify to embed TrustIndex widget |

---

## Considerations

- **Styling**: TrustIndex has its own styling. The widget appearance is configured in your TrustIndex dashboard
- **Loading**: The widget loads asynchronously, so there may be a brief delay before reviews appear
- **Admin Settings**: The Google Place ID field in Admin Settings can be kept for reference or removed since TrustIndex manages everything

