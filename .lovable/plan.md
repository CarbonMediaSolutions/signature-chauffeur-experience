

# Hide Klaviyo "Sign Up" Button on Mobile

## Problem
The Klaviyo newsletter signup button ("SIGN UP!") at the bottom of the screen overlaps with the WhatsApp floating button on mobile devices, blocking user access to chat support.

## Solution
Add CSS to hide Klaviyo's embedded onsite forms on mobile only. This will prevent the signup button from appearing on small screens while keeping it visible on desktop.

## Implementation

### File to Modify

| File | Change |
|------|--------|
| `src/index.css` | Add mobile-specific CSS to hide Klaviyo embedded forms |

### CSS to Add

Add this rule at the end of the `@layer utilities` section:

```css
/* Hide Klaviyo embedded signup on mobile to prevent overlap with WhatsApp button */
@media (max-width: 767px) {
  .klaviyo-form,
  div[data-testid="POPUP"],
  .klaviyo_embed_footer_module,
  .go3958317564 {
    display: none !important;
  }
}
```

This targets common Klaviyo form container classes and will hide them on screens smaller than 768px (mobile breakpoint matching the rest of the site).

## Alternative Option

If you prefer to keep the Klaviyo form but just avoid the overlap, you could instead adjust the form's position in your **Klaviyo dashboard** settings:
- Log into Klaviyo
- Go to Sign-up Forms
- Edit the form's mobile display settings
- Either disable mobile or adjust positioning

## Why This Approach

The CSS solution is:
- Quick to implement
- Does not require external dashboard access
- Maintains the form on desktop where there's more screen space
- Follows the existing mobile breakpoint (768px) used throughout the site

