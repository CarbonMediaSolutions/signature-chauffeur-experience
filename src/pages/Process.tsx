import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";

const steps = [
  {
    number: "01",
    title: "Enquire",
    description: "Share your requirements through our enquiry form or reach out directly via WhatsApp. Tell us your preferred dates, vehicle preferences, and any special requests. No payment required at this stage.",
  },
  {
    number: "02",
    title: "Consultation",
    description: "Our team personally reviews your request, understanding your journey, delivery location, and any specific requirements. We recommend vehicles that perfectly match your needs — tailored, considered, never rushed.",
  },
  {
    number: "03",
    title: "Confirmation",
    description: "Once you've selected your vehicle, we confirm your booking with clear pricing and terms. A simple documentation checklist, transparent conditions — no unnecessary complexity, no surprises.",
  },
  {
    number: "04",
    title: "Preparation",
    description: "Your vehicle is professionally detailed, fully inspected, and prepared to Signature standards. Every detail checked, ensuring it is presented in pristine condition.",
  },
  {
    number: "05",
    title: "Delivery",
    description: "Your vehicle arrives at your preferred location — airport, accommodation, or private address. A personal handover includes full familiarisation with the vehicle's features and controls.",
  },
  {
    number: "06",
    title: "Enjoy",
    description: "Experience Cape Town your way, without interruption. Our team remains available should you need anything, but the focus is entirely on your enjoyment.",
  },
  {
    number: "07",
    title: "Return",
    description: "We collect the vehicle from your chosen location at a pre-arranged time. Smooth, efficient, and respectful of your schedule — a seamless conclusion to your experience.",
  },
];

const Process = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background border-b border-border/30">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground mb-4">
              The Process
            </p>
            <h1 className="text-display text-foreground mb-8">
              How It Works
            </h1>
            <p className="text-body-lg text-muted-foreground">
              From first enquiry to final return — seamless, personal, 
              and free of friction. Every step designed to feel simple, 
              reassuring, and premium.
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
          <h2 className="text-headline mb-8">
            No Surprises. Just Excellence.
          </h2>
          <p className="text-body-lg text-primary-foreground/60 mb-4">
            Complete transparency at every stage. Clear rates, fair terms, and a 
            team that communicates openly throughout your experience.
          </p>
          <p className="text-body text-primary-foreground/60 mb-10">
            This is not transactional — it is relational. A concierge-style service 
            where every detail is handled with intention and care.
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
