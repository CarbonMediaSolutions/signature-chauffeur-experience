import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FareHarborCalendarProps {
  itemCode: string;
  className?: string;
}

const FareHarborCalendar = ({ itemCode, className }: FareHarborCalendarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = `https://fareharbor.com/embeds/script/calendar/signaturecarrentals/items/${itemCode}/?fallback=simple&full-items=yes&flow=1580598`;
    script.async = true;

    const observer = new MutationObserver(() => {
      if (container.children.length > 1) setLoaded(true);
    });
    observer.observe(container, { childList: true, subtree: true });

    container.appendChild(script);

    const timeoutId = window.setTimeout(() => setLoaded(true), 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      container.innerHTML = "";
    };
  }, [itemCode]);

  return (
    <div
      className={cn(
        "border border-border/40 bg-card/40 rounded-sm p-6 md:p-8",
        className,
      )}
    >
      <h3 className="font-serif text-xl text-foreground mb-1">Live Availability</h3>
      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Reserve directly · Instant confirmation
      </p>
      <div ref={containerRef} className="min-h-[120px] relative">
        {!loaded && (
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Loading availability…
          </p>
        )}
      </div>
    </div>
  );
};

export default FareHarborCalendar;
