import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";

const steps = [
  {
    number: "01",
    title: "Enquire",
    description: "Browse & submit your request",
  },
  {
    number: "02",
    title: "Confirm",
    description: "We handle the details",
  },
  {
    number: "03",
    title: "Receive",
    description: "Delivered to your door",
  },
  {
    number: "04",
    title: "Drive",
    description: "Enjoy the experience",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 md:py-20 bg-charcoal text-primary-foreground">
      <div className="container-luxury">
        <p className="text-caption text-primary-foreground/60 mb-4 tracking-[0.25em] text-center">
          HOW IT WORKS
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-10 md:mb-14">
          Four Simple Steps
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <span className="block font-serif text-3xl md:text-4xl text-brass mb-3">
                {step.number}
              </span>
              <h3 className="font-serif text-lg md:text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-primary-foreground/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/contact">
            <LuxuryButton variant="hero" size="lg">
              Start Your Enquiry
            </LuxuryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
