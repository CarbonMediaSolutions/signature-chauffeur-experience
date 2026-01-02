import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";

const termsContent = [
  {
    title: "Eligibility Requirements",
    content: [
      "Minimum age of 25 years (30 years for certain high-performance vehicles)",
      "Valid driver's license held for at least 3 years",
      "Clean driving record with no major violations in the past 3 years",
      "Valid credit card in the renter's name for security deposit",
    ],
  },
  {
    title: "Documentation Required",
    content: [
      "Valid driver's license (international license required for non-South African licenses)",
      "Valid passport or South African ID",
      "Proof of residential address (utility bill or bank statement)",
      "Valid credit card for security deposit processing",
    ],
  },
  {
    title: "Security Deposits",
    content: [
      "A refundable security deposit is required for all rentals",
      "Deposit amounts vary by vehicle category (details provided upon booking)",
      "Deposits are processed via credit card pre-authorization",
      "Full release typically occurs within 7-14 business days after return",
    ],
  },
  {
    title: "Insurance Coverage",
    content: [
      "Comprehensive insurance is included in all rentals",
      "An excess amount applies in the event of a claim",
      "Excess reduction options are available for added peace of mind",
      "Coverage details are provided in full prior to rental confirmation",
    ],
  },
  {
    title: "Mileage Policy",
    content: [
      "Daily rentals include a generous daily mileage allowance",
      "Extended rental packages may include additional or unlimited mileage",
      "Excess mileage is charged at a fair per-kilometer rate",
      "Custom mileage packages available upon request",
    ],
  },
  {
    title: "Cancellation Policy",
    content: [
      "Cancellations made 7+ days before pickup: Full refund",
      "Cancellations made 3-7 days before pickup: 50% refund",
      "Cancellations made within 72 hours: No refund",
      "Modifications to bookings subject to availability and may incur charges",
    ],
  },
];

const Terms = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding-sm bg-background border-b border-border/30">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground mb-4">
              Information
            </p>
            <h1 className="text-display text-foreground mb-8">
              Rental Terms
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Transparency is fundamental. Our requirements and policies, 
              designed to ensure a smooth experience.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl">
            {termsContent.map((section, index) => (
              <div
                key={section.title}
                className="py-10 border-b border-border last:border-0"
              >
                <h2 className="font-serif text-xl font-medium text-foreground mb-6">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-body text-muted-foreground flex gap-3"
                    >
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury text-center">
          <h2 className="text-headline text-foreground mb-6">
            Questions About Our Terms?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Our team is here to clarify any questions you may have. 
            We believe in complete transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/faq">
              <LuxuryButton variant="default" size="lg">
                View FAQ
              </LuxuryButton>
            </Link>
            <Link to="/contact">
              <LuxuryButton variant="outline" size="lg">
                Contact Us
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
