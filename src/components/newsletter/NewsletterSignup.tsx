import { useState } from "react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "footer";
  showHeading?: boolean;
  className?: string;
}

export const NewsletterSignup = ({
  variant = "default",
  showHeading = true,
  className = "",
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Klaviyo integration
      if (window.klaviyo) {
        window.klaviyo.identify({
          email: email,
          $consent: ["email"],
        });

        window.klaviyo.track("Newsletter Signup", {
          source: "website",
          page: window.location.pathname,
        });
      }

      setIsSuccess(true);
      toast({
        title: "Welcome to the List",
        description: "You'll be the first to know about exclusive offers and new arrivals.",
      });
      setEmail("");

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={`mt-6 ${className}`}>
        <p className="text-sm text-primary-foreground/70 mb-3">
          Subscribe for exclusive offers
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            disabled={isLoading}
            className="flex-1 px-3 py-2 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:border-primary-foreground/50 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="px-4 py-2 bg-primary-foreground text-primary text-sm font-medium hover:bg-primary-foreground/90 transition-colors disabled:opacity-50"
          >
            {isSuccess ? "✓" : isLoading ? "..." : "Join"}
          </button>
        </div>
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`p-6 bg-secondary/30 border border-border ${className}`}>
        {showHeading && (
          <h3 className="font-serif text-lg font-medium text-foreground mb-2">
            Stay Updated
          </h3>
        )}
        <p className="text-sm text-muted-foreground mb-4">
          Get exclusive offers and be first to know about new arrivals.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
          />
          <LuxuryButton
            type="submit"
            variant="default"
            size="sm"
            className="w-full"
            disabled={isLoading || isSuccess}
          >
            {isSuccess ? "Subscribed!" : isLoading ? "Subscribing..." : "Subscribe"}
          </LuxuryButton>
        </form>
      </div>
    );
  }

  // Default variant - full width section
  return (
    <section className={`section-padding bg-secondary/30 ${className}`}>
      <div className="container-luxury text-center max-w-2xl mx-auto">
        {showHeading && (
          <>
            <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">
              Newsletter
            </p>
            <h2 className="text-headline text-foreground mb-4">
              Stay in the Loop
            </h2>
          </>
        )}
        <p className="text-body-lg text-muted-foreground mb-8">
          Be the first to know about new arrivals, exclusive offers, and curated experiences.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={isLoading}
            className="flex-1 px-6 py-3.5 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          />
          <LuxuryButton
            type="submit"
            variant="default"
            size="default"
            disabled={isLoading || isSuccess}
          >
            {isSuccess ? "Subscribed!" : isLoading ? "..." : "Subscribe"}
          </LuxuryButton>
        </form>
      </div>
    </section>
  );
};
