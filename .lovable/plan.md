

# Fleet Enhancements, Admin Founder Image & Em-Dash Cleanup

## Summary
This plan covers four features:
1. Add a "Hot Right Now" badge to vehicles (configurable from admin)
2. Make multi-day pricing fully dynamic (threshold + discount % are already editable, ensuring consistency)
3. Allow admin users to upload/change founder images on the About page
4. Remove all em-dash characters ("—") sitewide

---

## 1. "Hot Right Now" Badge for Vehicles

### Database Change
Add a new boolean column `is_hot` to the `vehicles` table to track which cars should display the badge.

```sql
ALTER TABLE vehicles ADD COLUMN is_hot boolean DEFAULT false;
```

### Admin VehicleForm Changes
**File:** `src/components/admin/VehicleForm.tsx`

Add a new toggle in the "Basic Information" section:
- Add `is_hot: boolean` to the `VehicleFormData` interface
- Add a Switch component labeled "Hot Right Now" below the existing "Limited Availability" toggle
- Initialize from `initialData?.is_hot || false`

### Vehicle Type Update
**File:** `src/hooks/useVehicles.tsx`

Add `is_hot: boolean | null` to the `Vehicle` interface.

### Admin Fleet Edit
**File:** `src/pages/admin/AdminFleetEdit.tsx`

Add `is_hot: data.is_hot || false` to the update mutation.

### Fleet Card Display
**File:** `src/components/fleet/VehicleCard.tsx`

Add a "Hot Right Now" badge next to (or replacing) the "Limited" badge when `vehicle.is_hot` is true:
```tsx
{vehicle.is_hot && (
  <div className="absolute top-4 left-4">
    <span className="text-[10px] tracking-[0.15em] uppercase bg-red-600/90 text-white px-3 py-1.5">
      Hot Right Now
    </span>
  </div>
)}
```

### Admin Fleet Grid
**File:** `src/pages/admin/AdminFleet.tsx`

Display a "Hot" badge on cards in admin view when `vehicle.is_hot` is true.

---

## 2. Dynamic Multi-Day Pricing

The multi-day pricing system is already dynamic - the admin form in `VehicleForm.tsx` (lines 412-466) allows editing:
- **Day Threshold** (e.g., 4+ days, 6+ days)
- **Discount Percentage** (e.g., 10%, 22%)

The discounted rate is calculated automatically from the daily rate:
```typescript
discountedRate = dailyRate * (1 - discountPercent / 100)
```

### Verification Steps
Confirm the following are correctly wired:
- `AdminFleetEdit.tsx` saves both `multi_day_threshold` and `multi_day_discount_percent`
- `VehicleCard.tsx` displays the correct threshold and percentage dynamically
- Both values default to 4 days and 10% as requested

**Status:** Already implemented - no changes needed. The admin can set any day threshold (e.g., 6 days) and any discount percentage (e.g., 22%) per vehicle.

---

## 3. Admin-Editable Founder Image

### Database Change
Create a new `site_settings` table to store configurable content like founder images.

```sql
CREATE TABLE site_settings (
  id text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- Initial founder image setting
INSERT INTO site_settings (id, value) VALUES ('founder_image_url', null);

-- RLS policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
```

### Create Hook for Site Settings
**New File:** `src/hooks/useSiteSettings.tsx`

```typescript
export const useSiteSetting = (key: string) => {
  return useQuery({
    queryKey: ["site_settings", key],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("id", key)
        .maybeSingle();
      return data?.value || null;
    },
  });
};

export const useUpdateSiteSetting = () => {
  // Mutation to upsert site settings
};
```

### Create Admin Settings Page
**New File:** `src/pages/admin/AdminSettings.tsx`

A simple admin page with:
- Section: "About Page"
- Field: "Founder Image" with MediaManager component for uploading
- Uses the `specials` or a new `site-assets` storage bucket

### Update About Page
**File:** `src/pages/About.tsx`

- Import and use `useSiteSetting('founder_image_url')`
- If the value exists, use it; otherwise fall back to the static import `aboutDean`
- Update both the founder photo (line 250) locations

### Add Route
**File:** `src/App.tsx`

Add route: `/admin/settings` pointing to `AdminSettings`

### Update Admin Layout Navigation
**File:** `src/pages/admin/AdminLayout.tsx`

Add "Settings" link to the admin sidebar.

---

## 4. Remove Em-Dash Characters ("—") Sitewide

Replace all em-dash characters with regular hyphens or appropriate alternatives.

### Files to Update

**`src/pages/About.tsx`** (4 instances):
| Line | Current | Replacement |
|------|---------|-------------|
| 122 | "feel — not just" | "feel - not just" |
| 153 | "feel — not just" | "feel - not just" |
| 257 | "possibility — the belief" | "possibility - the belief" |
| 279 | "— Dean Oliver" | "- Dean Oliver" |

**`src/pages/admin/AdminSpecials.tsx`** (2 instances):
| Line | Current | Replacement |
|------|---------|-------------|
| 125 | `"—"` | `"-"` |
| 129 | `"—"` | `"-"` |

---

## Files Summary

| File | Action |
|------|--------|
| `src/hooks/useVehicles.tsx` | Add `is_hot` to Vehicle interface |
| `src/components/admin/VehicleForm.tsx` | Add "Hot Right Now" toggle |
| `src/pages/admin/AdminFleetEdit.tsx` | Save `is_hot` field |
| `src/pages/admin/AdminFleetNew.tsx` | Save `is_hot` field |
| `src/pages/admin/AdminFleet.tsx` | Show "Hot" badge in admin grid |
| `src/components/fleet/VehicleCard.tsx` | Display "Hot Right Now" badge |
| `src/hooks/useSiteSettings.tsx` | New hook for site settings |
| `src/pages/admin/AdminSettings.tsx` | New admin settings page |
| `src/pages/admin/AdminLayout.tsx` | Add Settings nav link |
| `src/App.tsx` | Add admin settings route |
| `src/pages/About.tsx` | Use dynamic founder image + remove em-dashes |
| `src/pages/admin/AdminSpecials.tsx` | Replace em-dashes with hyphens |
| **Database migration** | Add `is_hot` column, create `site_settings` table |

---

## Technical Notes

- The "Hot Right Now" badge will appear on the left side of vehicle cards (red background)
- The "Limited" badge will remain on the right side (existing position)
- Both badges can appear simultaneously if a vehicle is both hot and limited
- Founder image uses existing storage infrastructure (no new bucket needed)
- All em-dash replacements use standard hyphen with surrounding spaces for readability

