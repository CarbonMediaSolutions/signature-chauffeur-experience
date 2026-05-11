## Goal
Fix the mobile issue where the Fleet page stops scrolling until a vehicle is opened and the user navigates back.

## Plan
1. Add a small mobile-only cleanup hook that watches for hidden Klaviyo popup state and immediately removes any leftover body scroll lock.
2. Mount that hook once at app layout level so it protects the whole site, including the Fleet page, without touching desktop behavior.
3. Keep the existing mobile CSS hide rule, but tighten it so hidden popup wrappers cannot capture touch/scroll events or leave the page in a locked state.
4. Verify in phone viewport on the Fleet page that:
   - the page scrolls normally on first load
   - it still scrolls after the popup scripts initialize
   - opening a vehicle and going back is no longer required
   - WhatsApp and Book Now floating buttons still work

## Technical details
- Create a hook such as `useMobileKlaviyoScrollUnlock` in `src/hooks/`.
- In the hook:
  - only run under `window.innerWidth < 768`
  - remove `klaviyo-prevent-body-scrolling` from `document.body`
  - clear inline `overflow` / `position` styles Klaviyo may leave behind
  - observe DOM/body class changes with `MutationObserver` so the cleanup runs whenever the popup remounts
- Mount the hook in `src/components/layout/Layout.tsx` so it applies site-wide.
- Update `src/index.css` mobile selectors if needed to also neutralize any fixed/off-screen dialog wrappers.

## Expected outcome
On iPhone/mobile, users can freely scroll the Fleet page even if the signup popup script loads in the background.