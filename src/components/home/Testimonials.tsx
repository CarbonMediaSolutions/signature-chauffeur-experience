import { useEffect, useRef } from "react";

export const Testimonials = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Check if script already exists to avoid duplicates
    const existingScript = widgetRef.current.querySelector('script[src*="trustindex"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?b8da22a6312c812b39766d27171';
    script.defer = true;
    script.async = true;
    widgetRef.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (widgetRef.current) {
        const scriptToRemove = widgetRef.current.querySelector('script[src*="trustindex"]');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[hsl(35,30%,95%)]">
      <div className="container-luxury">
        <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em] text-center">
          CLIENT EXPERIENCES
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-10 md:mb-14">
          What Our Clients Say
        </h2>

        {/* TrustIndex Widget Container */}
        <div ref={widgetRef} className="flex justify-center" />
      </div>
    </section>
  );
};
