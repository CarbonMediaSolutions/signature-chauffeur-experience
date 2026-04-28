import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FareHarborButtonProps {
  itemCode?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const FH_BASE = "https://fareharbor.com/embeds/book/signaturecarrentals";
const FH_FLOW = "1580598";

const buildHref = (itemCode?: string) =>
  itemCode
    ? `${FH_BASE}/items/${itemCode}/?full-items=yes&flow=${FH_FLOW}`
    : `${FH_BASE}/?full-items=yes`;

const variantClasses: Record<NonNullable<FareHarborButtonProps["variant"]>, string> = {
  primary:
    "bg-foreground text-primary-foreground border border-foreground hover:bg-foreground/90",
  secondary:
    "bg-accent text-accent-foreground border border-accent hover:bg-accent/90",
  outline:
    "bg-transparent text-foreground border border-foreground/30 hover:bg-foreground hover:text-primary-foreground",
};

const sizeClasses: Record<NonNullable<FareHarborButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-xs tracking-[0.15em]",
  md: "px-6 py-2.5 text-sm tracking-[0.15em]",
  lg: "px-8 py-3.5 text-sm tracking-[0.2em]",
};

const FareHarborButton = ({
  itemCode,
  children,
  variant = "primary",
  size = "md",
  className,
}: FareHarborButtonProps) => {
  return (
    <a
      href={buildHref(itemCode)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-light uppercase rounded-sm transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-[0_8px_24px_-12px_hsl(var(--accent)/0.6)]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </a>
  );
};

export default FareHarborButton;
