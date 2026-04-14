

# Fix: Revert "DREAM BIG." to "DREAM IT."

During CMS testing, the hero tagline was changed to "DREAM BIG." and the revert didn't persist. The database still holds the test value.

## Fix

Run a single SQL update to restore the original value:

```sql
UPDATE page_content SET value = 'DREAM IT.' WHERE id = 'home.hero.tagline_1';
```

One migration, no code changes needed.

