

# Fix Fleet Page + Add Team Members to About Page

## Issue 1: Fleet Page Breaking

The newly added **BMW i8 Protonic** has an **empty `category`** field (blank string instead of a valid category like "Sports Car" or "Performance"). This causes problems in the fleet filter logic and displays a blank category badge. The `image` field is also empty, though the gallery has valid images.

### Fixes

**Database fix**: Update the BMW i8 to have a proper category (e.g., "Performance" or "Grand Tourer").

**Code resilience** in `src/components/fleet/VehicleCard.tsx`:
- Add a fallback for empty category: display "Uncategorised" if category is blank
- Ensure `displayImage` has a placeholder fallback when all image sources are empty

**Code resilience** in `src/pages/Fleet.tsx`:
- Filter out empty-string categories from the category list so blank entries don't appear in filters

**Code resilience** in `src/components/admin/VehicleForm.tsx`:
- Make the Category field required with validation so this can't happen again

## Issue 2: Team Photos & Bios on About Page (Admin-Managed)

Currently the About page only has a single founder image managed from Admin Settings. There's no team members section and no way to add team bios from the dashboard.

### New `team_members` database table

```sql
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
-- Anyone can view active team members
-- Admins can manage all team members
```

### New admin page: `src/pages/admin/AdminTeam.tsx`

A CRUD interface to add/edit/remove team members with:
- Name, role/title, bio text, photo upload, display order, active toggle
- Reuses the same image upload pattern as the founder image (upload to `specials` bucket under `site-assets/team/`)

### Add route and nav

- Add "Team" nav item to `AdminLayout.tsx`
- Add route `/admin/team` in `App.tsx`

### New section on About page

- Add a "Meet the Team" section after "Meet the Founder" in `src/pages/About.tsx`
- Query `team_members` table, display active members ordered by `display_order`
- Each card shows photo, name, role, and bio
- Grid layout: 2-3 columns on desktop, single column on mobile

### Files changed
- `src/pages/Fleet.tsx` -- empty category guard
- `src/components/fleet/VehicleCard.tsx` -- image/category fallbacks
- `src/components/admin/VehicleForm.tsx` -- category validation
- `src/pages/admin/AdminLayout.tsx` -- add Team nav
- `src/pages/admin/AdminTeam.tsx` -- new file
- `src/pages/About.tsx` -- add team section
- `src/App.tsx` -- add team admin route
- Database migration for BMW i8 fix + team_members table

