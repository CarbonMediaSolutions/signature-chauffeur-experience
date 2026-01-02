import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";

const steps = [
  {
    number: "01",
    title: "Enquire",
    description: "Share your requirements through our enquiry form or WhatsApp. Tell us about your dates, preferences, and any special requests.",
  },
  {
    number: "02",
    title: "Consultation",
    description: "Our team personally reviews your request and reaches out to understand your needs. We recommend vehicles that perfectly match your journey.",
  },
  {
    number: "03",
    title: "Confirmation",
    description: "Once you have selected your vehicle, we confirm your booking and handle all documentation. Clear, transparent, no hidden surprises.",
  },
  {
    number: "04",
    title: "Preparation",
    description: "Your vehicle is meticulously prepared. Cleaned, inspected, and ensured to be in pristine condition for your arrival.",
  },
  {
    number: "05",
    title: "Delivery",
    description: "Your vehicle arrives at your preferred location — airport, hotel, or private address — at your specified time.",
  },
  {
    number: "06",
    title: "Enjoy",
    description: "Experience Cape Town your way. Our team remains available throughout your rental for any assistance you may need.",
  },
  {
    number: "07",
    title: "Return",
    description: "At the end of your journey, we collect the vehicle from your location. Simple, seamless, stress-free.",
  },
];

const Process = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background border-b border-border/50">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground tracking-luxury mb-3">
              The Process
            </p>
            <h1 className="text-display text-foreground mb-6">
              How It Works
            </h1>
            <p className="text-body-lg text-muted-foreground">
              From first enquiry to final return, every step is designed to be 
              seamless, personal, and free of friction. This is car hire, 
              reimagined.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="grid grid-cols-12 gap-6 md:gap-10 py-12 border-b border-border last:border-0"
              >
                <div className="col-span-12 md:col-span-2">
                  <span className="text-4xl font-serif font-medium text-muted-foreground/30">
                    {step.number}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-10">
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <h2 className="text-headline mb-6">
            No Surprises, Just Excellence
          </h2>
          <p className="text-body-lg text-primary-foreground/70 mb-8">
            We believe in complete transparency. Rates are clear, terms are fair, 
            and our team is always available to answer your questions. This is 
            not transactional — it is relational.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <LuxuryButton variant="hero" size="lg">
                Start Your Enquiry
              </LuxuryButton>
            </Link>
            <Link to="/terms">
              <LuxuryButton variant="heroInverse" size="lg">
                View Rental Terms
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Process;
