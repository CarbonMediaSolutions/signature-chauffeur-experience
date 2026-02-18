

# Make "Email us" Send Enquiry Silently via Backend

## What Changes

The "Email us" button on the vehicle enquiry panel currently opens your device's email app. Instead, it will silently send the enquiry details (vehicle name, dates, location, service type, notes) directly to info@signaturecarrentals.co.za via the backend -- no pop-ups, no new windows.

---

## How It Will Work

1. User fills in the enquiry form (dates, location, etc.) on the vehicle page
2. Clicks "Email us"
3. If dates are not selected, a validation message appears (same as WhatsApp button)
4. The enquiry is sent silently in the background using the existing `send-contact-enquiry` backend function
5. A success toast notification confirms "Enquiry sent successfully"
6. The submission is also saved to the database and visible in Admin > Enquiries

---

## Technical Details

**File: `src/components/enquiry/WhatsAppEnquiry.tsx`**

- Change the "Email us" `<a>` tag from a `mailto:` link to a `<button>` with an `onClick` handler
- Add `isSendingEmail` state for loading feedback
- Add a `handleEmailEnquiry` function that:
  - Validates dates are selected (reuses existing validation)
  - Calls `supabase.functions.invoke("send-contact-enquiry")` with the form data, using the vehicle name as both the enquiry type and preferred vehicle
  - Sets `referralSource` to "Vehicle Page Enquiry" (since this form doesn't have that field)
  - Shows a success/error toast
- The `message` field will use the same `buildMessage()` output already used for WhatsApp
- Import `supabase` client and `toast` (sonner already imported)
- While sending, show a small spinner or disabled state on the button

**File: `supabase/functions/send-contact-enquiry/index.ts`**

- Make `referralSource` optional in validation (since vehicle page enquiries won't have the full contact form fields)
- Default `referralSource` to "Not specified" if not provided

