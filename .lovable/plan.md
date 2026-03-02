

# Fix: Fleet Page Blank When Admin Logged In

## Root Cause

The **BMW i8 Protonic** record has `category: ""` and `image: ""` in the database. While code-level fallbacks were added in a previous round, there are two remaining issues:

1. **The data itself was never fixed** -- a migration to update the BMW i8's category was planned but the SQL `UPDATE` was never executed
2. **The published site** may not have the latest resilience code deployed yet

## Fix

### 1. Database migration to fix the BMW i8 data

```sql
UPDATE public.vehicles
SET category = 'Performance',
    image = COALESCE(
      (SELECT gallery_urls[1] FROM public.vehicles WHERE id = 'bmw-i8-protonic-limited-edition'),
      '/placeholder.svg'
    )
WHERE id = 'bmw-i8-protonic-limited-edition'
  AND (category = '' OR image = '');
```

This sets a proper category and copies the first gallery image into the `image` field so no rendering path encounters an empty string.

### 2. Add a React error boundary around the vehicle grid in `src/pages/Fleet.tsx`

Wrap each `VehicleCard` in a try/catch-style error boundary so that one broken vehicle record can never blank the entire page. If a single card fails to render, it shows a small fallback instead of crashing the whole grid.

### Files changed
- Database migration (fix BMW i8 data)
- `src/pages/Fleet.tsx` -- wrap grid items in error boundary

This is a small, targeted fix. Once applied, the admin should re-publish the site to push the changes live.

