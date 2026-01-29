

# Add Klaviyo Onsite Tracking

## Summary
Add Klaviyo's tracking scripts to enable email marketing features like popups, forms, and visitor tracking across the site.

---

## Implementation

**File:** `index.html`

Add the Klaviyo scripts just before the closing `</body>` tag:

```html
    <!-- Klaviyo Onsite Tracking -->
    <script async type='text/javascript' src='https://static.klaviyo.com/onsite/js/TVBPXs/klaviyo.js?company_id=TVBPXs'></script>
    <script type="text/javascript">
      //Initialize Klaviyo object on page load
      !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
    </script>
  </body>
</html>
```

---

## What This Enables

- Klaviyo popup forms and embedded signup forms
- Visitor tracking for email marketing segmentation
- Abandoned browse/cart tracking (if integrated with checkout)
- Back-in-stock notifications

---

## Files Summary

| File | Action |
|------|--------|
| `index.html` | Add Klaviyo scripts before `</body>` |

