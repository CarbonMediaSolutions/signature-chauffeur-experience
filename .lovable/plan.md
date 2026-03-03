

# Admin CMS: Editable Page Content & Images

## The Problem

All text content and images across the site are hardcoded in React components. The admin has no way to update headings, paragraphs, quotes, FAQ answers, terms, or section images without code changes.

## Scope of Hardcoded Content

Pages with editable content:
- **Home** -- hero taglines, mission quote, CTA text, hero image
- **About** -- Our Story paragraphs, founder bio, values, Signature Experience text, quotes, hero/section images
- **Process** -- step titles/descriptions, philosophy quote, step images
- **Contact** -- hero text, sidebar text, response time text
- **FAQ** -- all categories, questions, and answers
- **Terms** -- all sections and bullet points
- **List Your Vehicle** -- hero text, benefits, services list, "Who This Is For" content, quote, section images
- **Footer** -- tagline, location text
- **Home components** -- MissionIcons titles/descriptions, HowItWorks step text

## Proposed Approach

### Database: `page_content` table

A single flexible table to store all editable content blocks:

```text
page_content
├── id (text, PK) — e.g. "home.hero.tagline", "about.story.paragraph_1"
├── page (text) — e.g. "home", "about", "faq", "terms"
├── section (text) — e.g. "hero", "story", "values"
├── content_type (text) — "text", "rich_text", "image", "json"
├── value (text) — the actual content or image URL
├── label (text) — human-readable label for the admin UI, e.g. "Hero Tagline"
├── display_order (int) — for ordering within a section
├── updated_at (timestamptz)
```

For structured content like FAQ and Terms, `content_type = "json"` stores the full structure as JSON (array of categories with questions, array of sections with bullet points).

### Admin UI: New "Content" page (`/admin/content`)

- Organized by page tabs: Home, About, Process, Contact, FAQ, Terms, List Vehicle, Footer
- Each tab shows sections with editable fields
- Text fields use `<Input>` or `<Textarea>` depending on length
- Image fields show current image with upload/replace/remove buttons (reusing the existing upload-to-storage pattern)
- FAQ and Terms get a structured JSON editor with add/remove/reorder for categories, questions, and bullet points
- Save button per page (or per section)

### Data Hook: `usePageContent`

```typescript
// Fetch all content for a page
usePageContent("home") → returns Map<string, string>

// Fetch single block
useContentBlock("home.hero.tagline") → returns string
```

### Frontend Integration

Each page component replaces hardcoded strings with content from the hook, with the current hardcoded text as the fallback default. This means pages render immediately with defaults even if the database hasn't been seeded yet.

### Seed Migration

A migration inserts all current hardcoded text as the initial content, so the admin sees the existing copy when they first open the CMS.

### Navigation

Add "Content" to the admin sidebar between "Team" and "Settings".

## Implementation Order

1. Create `page_content` database table with RLS policies
2. Seed migration with all current hardcoded text/image references
3. Create `usePageContent` hook
4. Build the admin Content page with tabs and editors
5. Update each frontend page to pull content from the hook

## Estimated Scope

This is a large feature touching ~15 files. It would be best implemented incrementally -- starting with 2-3 pages (Home, About, FAQ) and extending to the rest.

