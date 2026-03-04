

# Update Contact Page: Two Contact Numbers

## What Changed
The client wants Jason's number (+27 79 578 7154) listed first as the primary booking contact, with Dean's existing number (+27 82 783 0342) as the alternative.

## Changes

### 1. Update `siteConfig` in `src/lib/siteConfig.ts`
Add Jason's contact details alongside the existing ones:
```typescript
export const siteConfig = {
  whatsapp: {
    number: "27795787154",           // Jason - primary bookings
    displayNumber: "+27 79 578 7154"
  },
  whatsappAlt: {
    number: "27827830342",           // Dean - alternative
    displayNumber: "+27 82 783 0342"
  },
  contact: { ... }
};
```

### 2. Update Contact page sidebar (`src/pages/Contact.tsx`, lines 145-154)
Replace the single WhatsApp link with two contacts:
- **Jason** (Sales / Bookings): +27 79 578 7154 — listed first
- **Dean** (Alternative): +27 82 783 0342

### 3. Update WhatsApp Enquiry widget (`src/components/enquiry/WhatsAppEnquiry.tsx`)
The "Enquire on WhatsApp" button on vehicle pages will now send to Jason's number (the new primary).

### 4. Update Floating WhatsApp button (`src/components/layout/FloatingWhatsApp.tsx`)
Will use the new primary number (Jason's).

### 5. Footer stays consistent
The footer WhatsApp link and "Call us" will also use the primary number.

No database changes required — this is a frontend config update only.

