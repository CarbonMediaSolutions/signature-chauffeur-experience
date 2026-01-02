import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const luxuryButtonVariants = cva(
  "inline-flex items-center justify-center font-sans text-sm font-light tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-foreground/20 bg-transparent hover:bg-foreground hover:text-primary-foreground",
        ghost:
          "bg-transparent hover:bg-secondary",
        subtle:
          "border border-foreground/10 bg-transparent text-foreground hover:border-foreground/30",
        hero:
          "bg-background text-foreground border border-foreground/20 hover:bg-foreground hover:text-primary-foreground",
        heroInverse:
          "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      size: {
        default: "px-8 py-3",
        sm: "px-6 py-2.5",
        lg: "px-10 py-4",
        xl: "px-12 py-5 text-base",
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
