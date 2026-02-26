

# Dynamic Service-Type Pricing (Admin-Set Fixed Rates)

## Overview

Each vehicle gets admin-defined daily rates for Self-Drive and Chauffeur services. Events always shows "Request Pricing." The existing `daily_rate` field becomes the Self-Drive rate by default.

## How It Works

**For users on the vehicle detail page:**
- No service type selected or **Self-Drive** selected: shows `self_drive_rate` (falls back to `daily_rate` if not set)
- **Chauffeur** selected: shows `chauffeur_rate` per day; if admin left it at 0/null, shows "Request Pricing"
- **Events** selected: hides all pricing, shows "Request Pricing - please enquire for a custom quote"
- Multi-day discounts still apply on top of the active service rate

**For admins in the fleet editor:**
- New "Service Type Pricing" section with two simple Rand inputs:
  - **Self-Drive Daily Rate (R)** - defaults to the base daily rate
  - **Chauffeur Daily Rate (R)** - admin types in a custom price (0 or empty = "Request Pricing")
  - Events is always enquiry-only, no price field needed

## What Changes

### 1. Database Migration

Add two columns to the `vehicles` table:

```sql
ALTER TABLE public.vehicles
  ADD COLUMN self_drive_rate integer DEFAULT NULL,
  ADD COLUMN chauffeur_rate integer DEFAULT NULL;
```

Both nullable. When `self_drive_rate` is null, the frontend uses `daily_rate` as fallback. When `chauffeur_rate` is null or 0, the frontend shows "Request Pricing."

### 2. Admin Vehicle Form (`src/components/admin/VehicleForm.tsx`)

- Add `self_drive_rate` and `chauffeur_rate` to `VehicleFormData` interface
- Add a new "Service Type Pricing" section after the Multi-Day Promotional Pricing section with two number inputs:
  - Self-Drive Daily Rate (R) - placeholder shows the base daily rate as reference
  - Chauffeur Daily Rate (R) - placeholder "Leave empty for Request Pricing"
- Helper text: "These override the base daily rate when a customer selects a specific service type. Leave blank to use the base daily rate for Self-Drive, or to show 'Request Pricing' for Chauffeur."

### 3. Admin Fleet New/Edit pages

- `AdminFleetNew.tsx`: Include `self_drive_rate` and `chauffeur_rate` in the insert payload
- `AdminFleetEdit.tsx`: Include both in the update payload

### 4. Enquiry Widget (`src/components/enquiry/WhatsAppEnquiry.tsx`)

- Accept new props: `selfDriveRate?: number | null`, `chauffeurRate?: number | null`
- When `serviceType` changes, determine the effective daily rate:
  - `"Self-Drive"`: use `selfDriveRate ?? dailyRate`
  - `"Chauffeur"`: if `chauffeurRate` is set and > 0, use it; otherwise set a flag to show "Request Pricing"
  - `"Events"`: always show "Request Pricing"
- When in "Request Pricing" mode: replace the entire pricing breakdown with a styled message and change the CTA to just "Enquire" without dollar amounts
- The `buildMessage()` function includes the service type but omits pricing when in request-pricing mode

### 5. Vehicle Detail Page (`src/pages/VehicleDetail.tsx`)

- Pass `selfDriveRate` and `chauffeurRate` from vehicle data to `WhatsAppEnquiry`

## User Experience

| Service Type | Admin Sets Price? | Customer Sees |
|---|---|---|
| Self-Drive | Optional (falls back to base rate) | Full pricing breakdown |
| Chauffeur | Yes, typed in | Full pricing at chauffeur rate |
| Chauffeur | Left empty/0 | "Request Pricing" |
| Events | No field | Always "Request Pricing" |

