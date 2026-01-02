import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const luxuryButtonVariants = cva(
  "inline-flex items-center justify-center font-sans text-sm font-normal tracking-[0.04em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/85",
        outline:
          "border border-foreground/15 bg-transparent hover:bg-foreground hover:text-primary-foreground",
        ghost:
          "bg-transparent hover:bg-secondary/50",
        subtle:
          "border border-foreground/10 bg-transparent text-foreground hover:border-foreground/25",
        hero:
          "bg-background text-foreground border border-foreground/15 hover:bg-foreground hover:text-primary-foreground",
        heroInverse:
          "bg-primary-foreground text-primary hover:bg-primary-foreground/85",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/85",
      },
      size: {
        default: "px-8 py-3.5",
        sm: "px-6 py-2.5",
        lg: "px-12 py-4",
        xl: "px-14 py-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LuxuryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof luxuryButtonVariants> {
  asChild?: boolean;
}

const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(luxuryButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";

export { LuxuryButton, luxuryButtonVariants };
