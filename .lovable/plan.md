

# Integrate Google Reviews into Testimonials Section

## Summary
Connect the homepage Testimonials section to Google Places API to display only 5-star reviews with written text, keeping the existing luxury magazine aesthetic.

---

## How It Will Work

1. A backend function fetches reviews from Google Places API every few hours
2. Reviews are cached in your database to avoid hitting API limits
3. The Testimonials component displays only 5-star reviews with text
4. If no 5-star reviews are available, the current manual testimonials serve as fallback

---

## What You'll Need to Provide

| Requirement | Description |
|-------------|-------------|
| **Google Place ID** | The unique identifier for your business on Google Maps |

To find your Place ID:
1. Go to [Google's Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for "Signature Car Rentals Cape Town"
3. Copy the Place ID (looks like `ChIJ...`)

Your existing `GOOGLE_MAPS_API_KEY` will be used - it just needs the Places API enabled.

---

## Implementation Steps

### 1. Create Database Table for Cached Reviews

Store fetched reviews to reduce API calls and improve performance:

```text
Table: google_reviews
- id (text, primary key)
- author_name (text)
- rating (integer)
- text (text)
- time (timestamp)
- profile_photo_url (text, nullable)
- fetched_at (timestamp)
```

### 2. Create Edge Function: fetch-google-reviews

Backend function that:
- Calls Google Places API with your Place ID
- Returns all reviews (API provides max 5)
- Filters to only 5-star reviews with text
- Caches results in database

### 3. Store Place ID in Admin Settings

Add a "Google Place ID" field to Admin Settings:
- Saves to `site_settings` table with key `google_place_id`
- Easy to update without code changes

### 4. Update Testimonials Component

Modify `Testimonials.tsx` to:
- Fetch reviews from the `google_reviews` table
- Filter for 5-star reviews only
- Fall back to hardcoded testimonials if no 5-star reviews exist
- Add subtle Google attribution (required by Terms of Service)

---

## Visual Changes

The design stays the same with these additions:

- Small Google "G" icon next to reviewer names (for authenticity)
- "Reviews from Google" subtle text below the section (required attribution)
- Star rating display (5 stars in brass color)
- Reviewer profile photos (optional, if available from Google)

---

## Technical Architecture

```text
+------------------+     +----------------------+     +----------------+
|   Admin Settings | --> | google_place_id      | --> | Edge Function  |
|   (Place ID)     |     | (site_settings)      |     | fetch-google-  |
+------------------+     +----------------------+     | reviews        |
                                                      +-------+--------+
                                                              |
                                                              v
+------------------+     +----------------------+     +----------------+
|   Testimonials   | <-- | google_reviews       | <-- | Google Places  |
|   Component      |     | (cached reviews)     |     | API            |
+------------------+     +----------------------+     +----------------+
```

---

## API Limitations to Be Aware Of

| Limitation | Impact |
|------------|--------|
| Max 5 reviews per API call | You may get fewer than 5 five-star reviews |
| No rating filter | We filter client-side after fetching |
| Reviews sorted by "relevance" | Google decides which 5 reviews to return |
| Requires Places API enabled | Your existing Maps API key works if Places is enabled |

---

## Files to Create/Modify

| File | Change |
|------|--------|
| `supabase/functions/fetch-google-reviews/index.ts` | New edge function |
| `src/components/home/Testimonials.tsx` | Fetch from database, add Google styling |
| `src/pages/admin/AdminSettings.tsx` | Add Google Place ID input field |
| `src/hooks/useGoogleReviews.tsx` | New hook for fetching cached reviews |
| Database migration | Create `google_reviews` table |

---

## Fallback Behavior

If no 5-star reviews with text are found, the component will automatically display the existing hardcoded testimonials. This ensures the section is never empty.

