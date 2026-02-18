

# Update WhatsApp Number, Email, and Add "How Did You Hear About Us" Field

## Summary of Changes

Three updates across a few files:

---

## 1. Update WhatsApp Number

**File: `src/lib/siteConfig.ts`**
- Change `number` from `"27716649603"` to `"27827830342"`
- Change `displayNumber` from `"+27 71 664 9603"` to `"+27 82 783 0342"`
- Change `phone` from `"+27 71 664 9603"` to `"+27 82 783 0342"`

This single change will automatically update the WhatsApp number across the entire site (floating button, footer, contact page sidebar, vehicle enquiry panel).

**File: `index.html`**
- Update the structured data `telephone` from `"+27716649603"` to `"+27827830342"`

---

## 2. Update Contact Email

**File: `src/lib/siteConfig.ts`**
- Change `email` from `"enquiries@signaturecarrentals.co.za"` to `"info@signaturecarrentals.co.za"`

**File: `index.html`**
- Update the structured data `email` from `"enquiries@signaturecarrentals.co.za"` to `"info@signaturecarrentals.co.za"`

---

## 3. Add "How Did You Hear About Us" to Contact Form

**File: `src/pages/Contact.tsx`**
- Add `referralSource` field to form state (default empty string)
- Add a required dropdown field after the Message field with the label **"How did you hear about Signature Car Rentals? *"**
- Options:
  - Instagram
  - Facebook
  - TikTok
  - Google Search
  - Google Ads
  - YouTube
  - Referred by a friend / client
  - Referred by a partner / business
  - Saw one of your cars in person
  - Other
- Reset `referralSource` on form submit

---

## Technical Details

| File | Change |
|------|--------|
| `src/lib/siteConfig.ts` | Update WhatsApp number and email |
| `index.html` | Update structured data (telephone + email) |
| `src/pages/Contact.tsx` | Add `referralSource` to form state + new required dropdown field |

