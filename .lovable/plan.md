

# Send "List Your Vehicle" Submissions to Info Email

## Problem

The "List Your Vehicle" form currently uploads images to storage and logs the submission to the browser console, but **never sends an email or saves to the database**. The comment on line 115 literally says: "For now, just show toast (could save to DB or send via email later)."

## Solution

After the image uploads succeed, call the existing `send-contact-enquiry` backend function to email the submission details to `info@signaturecarrentals.co.za` and persist it in the `contact_submissions` table.

## What Changes

**File: `src/pages/ListVehicle.tsx`**

After the image upload loop (line 113), add a call to `supabase.functions.invoke("send-contact-enquiry")` with:
- `name`: from form
- `email`: from form
- `phone`: from form
- `enquiryType`: "List Your Vehicle"
- `preferredVehicle`: constructed as `{year} {make} {model}`
- `message`: the user's message plus a list of uploaded image URLs
- `referralSource`: "List Your Vehicle Page"

Replace the console.log placeholder (line 115-116) with this invocation. If the function call fails, show an error toast. On success, keep the existing success toast and form reset.

**No other files need to change** -- the existing edge function already handles optional fields and saves to the database.

## Technical Detail

The message body sent to the edge function will concatenate the user's freeform message with the uploaded image URLs so the admin email contains clickable links to the submitted vehicle photos.

