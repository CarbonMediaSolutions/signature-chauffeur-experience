

# Homepage SEO Improvements

## Summary
Enhance search engine optimization with structured data, local SEO signals, and technical improvements to boost visibility for "luxury car rental Cape Town" searches.

---

## 1. Add JSON-LD Structured Data

**Why**: Helps Google understand your business and enables rich snippets in search results.

**Add to `index.html`**:
- LocalBusiness schema with name, address, phone, opening hours
- Organization schema with logo and social profiles
- Service schema for car rental offerings

---

## 2. Add Sitemap

**Why**: Helps search engines discover all your pages.

**Create `public/sitemap.xml`** with URLs for:
- Homepage (/)
- Fleet (/fleet)
- About (/about)
- Contact (/contact)
- FAQ (/faq)
- Process (/process)
- Terms (/terms)
- List Your Vehicle (/list-your-vehicle)

**Update `public/robots.txt`** to include sitemap reference.

---

## 3. Add Missing Meta Tags

**Add to `index.html`**:
- `og:url` - Full canonical URL
- `og:locale` - en_ZA for South Africa
- `canonical` link tag
- Geographic meta tags (geo.region, geo.placename, geo.position)
- `keywords` meta tag for luxury car rental terms

---

## 4. Improve Semantic Content

**Why**: The H1 ("DREAM IT. DRIVE IT. LIVE IT.") is catchy but not keyword-rich.

**Solution**: Add a visually hidden SEO H1 tag with descriptive text like:
*"Luxury Car Rental Cape Town - Premium Vehicle Hire"*

This preserves the creative headline while giving search engines keyword-rich content.

---

## 5. Add Page-Specific Meta Tags

**Install react-helmet-async** to dynamically set meta tags per page, so each route (Fleet, About, etc.) has unique titles and descriptions.

---

## Files Summary

| File | Action |
|------|--------|
| `index.html` | Add structured data, canonical, geo tags |
| `public/sitemap.xml` | Create new sitemap |
| `public/robots.txt` | Add sitemap reference |
| `src/pages/Index.tsx` | Add SEO-friendly hidden H1 |
| `package.json` | Add react-helmet-async |
| `src/components/layout/Layout.tsx` | Wrap with HelmetProvider |

---

## Technical Details

**JSON-LD Schema Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Signature Car Rentals",
  "description": "Bespoke luxury vehicle hire in Cape Town",
  "url": "https://signature-chauffeur-experience.lovable.app",
  "telephone": "+27...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cape Town",
    "addressRegion": "Western Cape",
    "addressCountry": "ZA"
  },
  "priceRange": "$$$$"
}
```

**Hidden SEO H1 Pattern:**
```tsx
<h1 className="sr-only">
  Luxury Car Rental Cape Town - Premium Vehicle Hire | Signature Car Rentals
</h1>
```

