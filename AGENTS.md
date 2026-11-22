# Architecture rules

- Public vehicles, specials, and page copy use bundled JSON snapshots with local media; keep live content reads in admin-only hooks so visitor content does not depend on content database availability.
