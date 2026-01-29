

# Add Newsletter Subscribe Forms with Klaviyo Integration

## Summary
Add email subscription forms to the homepage and contact page that integrate with the already-installed Klaviyo tracking to capture leads and automate email marketing flows.

---

## Implementation Overview

### 1. Create Reusable Newsletter Component

**New file:** `src/components/newsletter/NewsletterSignup.tsx`

A reusable component with:
- Email input field matching the luxury brand aesthetic
- Submit button using `LuxuryButton` component
- Loading and success states
- Klaviyo API integration using `window.klaviyo.identify()`
- Optional checkbox for marketing consent

---

### 2. Homepage Integration

**File:** `src/pages/Index.tsx`

Add the newsletter signup in one of two strategic locations:
- **Option A**: After the "Mission Statement" section (recommended - high engagement point)
- **Option B**: Before the final CTA section

The section will include:
- Elegant heading: "Stay in the Loop"
- Subtext about exclusive offers and new arrivals
- Inline email signup form
- Matching the luxury magazine aesthetic

---

### 3. Contact Page Integration

**File:** `src/pages/Contact.tsx`

Add newsletter opt-in in the sidebar area:
- Positioned after the "Response Time" info card
- Compact design with heading and email input
- Integrates seamlessly with existing sidebar layout

---

### 4. Footer Newsletter (Global)

**File:** `src/components/layout/Footer.tsx`

Add a newsletter signup section:
- Positioned in the brand column
- Simple inline form (email + subscribe button)
- Appears on all pages for maximum capture

---

## Technical Approach

### Klaviyo Integration
Since Klaviyo is already loaded on the page, we'll use the JavaScript API:

```typescript
// Subscribe user to Klaviyo
const subscribeToKlaviyo = async (email: string) => {
  if (window.klaviyo) {
    window.klaviyo.identify({
      email: email,
      $consent: ['email'],
    });
    
    // Track the signup event
    window.klaviyo.track('Newsletter Signup', {
      source: 'website',
      page: window.location.pathname,
    });
  }
};
```

### TypeScript Declaration
Add Klaviyo type declaration for TypeScript support:

```typescript
// In src/vite-env.d.ts or new types file
declare global {
  interface Window {
    klaviyo?: {
      identify: (properties: Record<string, unknown>) => void;
      track: (event: string, properties?: Record<string, unknown>) => void;
      push: (args: unknown[]) => void;
    };
  }
}
```

---

## Visual Design

The newsletter form will follow the existing luxury aesthetic:
- Minimal border styling matching other form inputs
- Serif headings for section titles
- Muted color palette with brass/gold accents
- Smooth transitions and loading states

### Homepage Section Layout:
```text
┌─────────────────────────────────────────────────┐
│                                                 │
│              Stay in the Loop                   │
│   Be the first to know about new arrivals,     │
│   exclusive offers, and curated experiences.   │
│                                                 │
│   ┌──────────────────────┐ ┌─────────────┐    │
│   │ Your email address   │ │  Subscribe  │    │
│   └──────────────────────┘ └─────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/newsletter/NewsletterSignup.tsx` | Create - Reusable component |
| `src/pages/Index.tsx` | Update - Add newsletter section |
| `src/pages/Contact.tsx` | Update - Add sidebar newsletter |
| `src/components/layout/Footer.tsx` | Update - Add footer newsletter |
| `src/vite-env.d.ts` | Update - Add Klaviyo type declarations |

---

## Benefits

1. **Automated Lead Capture**: Every subscriber is automatically added to your Klaviyo list
2. **Event Tracking**: Klaviyo tracks where signups came from for segmentation
3. **Consistent Branding**: Forms match the luxury aesthetic
4. **Multiple Touchpoints**: Homepage, contact page, and footer maximize capture opportunities

