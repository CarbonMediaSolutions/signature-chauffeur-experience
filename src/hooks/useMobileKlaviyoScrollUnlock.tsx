import { useEffect } from "react";

/**
 * Mobile-only safety net: Klaviyo's onsite popup occasionally leaves the
 * `klaviyo-prevent-body-scrolling` class (and inline overflow/position
 * styles) on <body> even when its dialog is hidden by our CSS. On phones
 * this freezes scrolling until the route changes. This hook continuously
 * strips that lock on viewports under 768px.
 */
export function useMobileKlaviyoScrollUnlock() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = () => window.innerWidth < 768;

    const unlock = () => {
      if (!isMobile()) return;
      const body = document.body;
      const html = document.documentElement;
      if (!body) return;

      if (body.classList.contains("klaviyo-prevent-body-scrolling")) {
        body.classList.remove("klaviyo-prevent-body-scrolling");
      }
      // Klaviyo sometimes sets inline overflow:hidden / position:fixed on body
      if (body.style.overflow === "hidden") body.style.overflow = "";
      if (body.style.position === "fixed") {
        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
      }
      if (html.style.overflow === "hidden") html.style.overflow = "";
    };

    unlock();

    const observer = new MutationObserver(unlock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    // Also observe new nodes (popup remounts) to re-run cleanup
    observer.observe(document.body, { childList: true, subtree: false });

    const onResize = () => unlock();
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
