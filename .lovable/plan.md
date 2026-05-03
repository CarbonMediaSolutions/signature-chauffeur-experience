## Problem

A user reported that on iPhone, the Klaviyo signup popup appears off-screen at the bottom right of the page, with only half of the close (X) button visible and barely tappable. The popup also freezes the page.

We already have a CSS rule in `src/index.css` (lines 296-304) intended to hide Klaviyo forms on mobile, but it relies on a brittle obfuscated class name (`.go3958317564`) that Klaviyo regenerates on every deploy. As a result, the live popup is no longer being hidden on mobile.

## Fix

Strengthen the mobile hide rule in `src/index.css` to catch all Klaviyo popup variants regardless of the rotating class names, while keeping the inline footer newsletter (which we render ourselves in `Footer.tsx`) untouched.

Updated `@media (max-width: 767px)` block will hide:

- `div[class*="klaviyo-form-"]` - all Klaviyo-rendered form containers (popups + embeds)
- `div[class*="needsclick"][class*="kl-private"]` - Klaviyo's internal popup wrapper
- `div[data-testid="POPUP"]` - tested popup container
- `.klaviyo_embed_footer_module` - legacy embed
- Any `iframe[src*="klaviyo"]` - safety net for iframe-based popups

This is purely CSS, scoped to widths under 768px, so desktop behaviour is unchanged. Our own footer signup form (custom HTML inside `Footer.tsx`) is unaffected because it doesn't use any `klaviyo-*` classes.

## Files changed

- `src/index.css` - replace lines 296-304 with the broader selector list

## Verification

After the change I will open the preview at iPhone width (390x844) and confirm:
1. No Klaviyo popup appears at the bottom of the page
2. The WhatsApp + Book Now floating buttons remain tappable
3. Desktop view (1280+) still shows the Klaviyo popup as before
