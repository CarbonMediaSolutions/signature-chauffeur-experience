

# Form Enhancements: List Your Vehicle & Contact Us

## Summary
This plan implements four key enhancements across both forms:
1. Country code dropdown for phone numbers on both forms
2. Vehicle year dropdown (1970-current year) on List Your Vehicle form
3. Photo examples section with expandable guidance on List Your Vehicle form
4. Contact Us form updates: dynamic fleet vehicles & Events dropdown specification

---

## 1. Reusable Country Code Phone Input Component

Create a new reusable component that combines a country code dropdown with a phone number input field.

### New File: `src/components/ui/phone-input.tsx`

This component will:
- Display a dropdown with common country codes (defaulting to South Africa +27)
- Include major countries: South Africa (+27), United Kingdom (+44), United States (+1), Namibia (+264), Botswana (+267), Zimbabwe (+263), etc.
- Combine the country code and phone number into a single value
- Match the existing form styling (transparent background, border-border, etc.)

```tsx
// Structure:
// [+27 ▼] [Phone Number Input]

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const countryCodes = [
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+264", country: "Namibia", flag: "🇳🇦" },
  { code: "+267", country: "Botswana", flag: "🇧🇼" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  // ... more as needed
];
```

---

## 2. Vehicle Year Dropdown (1970 - Current Year)

### File: `src/pages/ListVehicle.tsx`

Replace the text input for vehicle year with a Select dropdown.

**Changes:**
- Import Select components from `@/components/ui/select`
- Add `countryCode` to form state (default: "+27")
- Generate year options dynamically from current year down to 1970
- Update form state to use `vehicleYear` as a select value

```tsx
// Generate years from current year down to 1970
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);

// In the form:
<Select value={formData.vehicleYear} onValueChange={(val) => setFormData({...formData, vehicleYear: val})}>
  <SelectTrigger className="w-full px-4 py-3 bg-transparent border border-border">
    <SelectValue placeholder="Select year" />
  </SelectTrigger>
  <SelectContent className="bg-background max-h-60">
    {years.map((year) => (
      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## 3. Photo Examples Section with Collapsible Expander

### File: `src/pages/ListVehicle.tsx`

Add an expandable section above the photo upload area that shows example photos and guidance.

**Implementation:**
- Use the existing `Collapsible` component from `@/components/ui/collapsible`
- Create three example cards with placeholder images and descriptions
- Include clear guidance text

**Photo Types to Display:**
1. **Front View** - "Capture your vehicle head-on, showing the grille, headlights, and overall front profile. Ensure good lighting and a clean background."
2. **Side Profile** - "A full side view showcasing the vehicle's silhouette and proportions. Stand back to capture the entire vehicle in frame."
3. **Rear Three-Quarter** - "The classic automotive angle showing the rear and one side. This view highlights the vehicle's character and stance."

```tsx
<Collapsible>
  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-accent hover:underline mb-4">
    <Camera className="w-4 h-4" />
    <span>Photo Guidelines - What We Need</span>
    <ChevronDown className="w-4 h-4 transition-transform data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-secondary/30 border border-border/50">
      {/* Front View Card */}
      <div className="text-center">
        <div className="aspect-[4/3] bg-muted mb-3 flex items-center justify-center">
          <Camera className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h4 className="text-sm font-medium text-foreground mb-1">Front View</h4>
        <p className="text-xs text-muted-foreground">
          Capture your vehicle head-on, showing the grille, headlights, and front profile.
        </p>
      </div>
      {/* Side Profile Card */}
      {/* Rear Three-Quarter Card */}
    </div>
    <p className="text-xs text-muted-foreground italic mb-4">
      Quality photos help us assess your vehicle quickly. Clear, well-lit images in outdoor 
      settings work best. Avoid clutter in the background.
    </p>
  </CollapsibleContent>
</Collapsible>
```

---

## 4. Contact Us Form Updates

### File: `src/pages/Contact.tsx`

**4a. Add Country Code Dropdown for Phone**
- Import and use the new `PhoneInput` component
- Add `countryCode` to form state

**4b. Preferred Vehicles - Use Database Fleet**
- Import `useVehicles` hook from `@/hooks/useVehicles`
- Replace the static `vehicles` import from `@/data/fleet.ts`
- Use the dynamic database-driven vehicle list

```tsx
import { useVehicles } from "@/hooks/useVehicles";

const Contact = () => {
  const { data: fleetVehicles = [] } = useVehicles();
  // ...
  
  // In the select:
  {fleetVehicles.map((v) => (
    <option key={v.id} value={v.name}>{v.name}</option>
  ))}
}
```

**4c. Events Dropdown - Add Event Type Specification**
- Update the "Events" option in `enquiryTypes` to include examples

```tsx
const enquiryTypes = [
  "Self-Drive Rental",
  "Chauffeur Service",
  "Events (Matric Ball, Music Videos, Corporate Functions)",
  "List Your Vehicle for Investment",
];
```

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/ui/phone-input.tsx` | **New file** - Reusable phone input with country code dropdown |
| `src/pages/ListVehicle.tsx` | Add phone input component, year dropdown, photo examples collapsible |
| `src/pages/Contact.tsx` | Add phone input component, use dynamic fleet, update Events text |

---

## Technical Notes

- The phone input stores the full number with country code (e.g., "+27 72 123 4567")
- Year dropdown generates years dynamically, so it will automatically include future years
- Photo examples use placeholder icons initially; can be replaced with actual example images later
- The Collapsible component from Radix UI is already installed and configured
- Database vehicles are fetched using the existing `useVehicles` hook with React Query caching

