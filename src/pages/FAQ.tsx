import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Rentals & Booking",
    questions: [
      {
        q: "How do I check availability?",
        a: "Availability can be checked via our website or by enquiring on a specific vehicle. All requests are personally reviewed by our team.",
      },
      {
        q: "Is payment required when enquiring?",
        a: "No. No payment is required at enquiry. We'll guide you through next steps once availability is confirmed.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend enquiring at least 48–72 hours in advance. For high-demand vehicles or peak seasons, earlier enquiries are advisable to secure your preferred dates.",
      },
    ],
  },
  {
    category: "Driver Requirements",
    questions: [
      {
        q: "What are the requirements to rent a vehicle?",
        a: "Drivers must be at least 25 years of age with a minimum of 3 years driving experience. A valid driver's licence, proof of address, and credit card are required. Additional requirements may apply for certain vehicles.",
      },
      {
        q: "Can international clients rent a vehicle?",
        a: "Yes. We welcome international guests. A valid international driving permit alongside your original national licence is required. Please ensure documentation is in English or accompanied by a certified translation.",
      },
    ],
  },
  {
    category: "Insurance & Deposits",
    questions: [
      {
        q: "Is a security deposit required?",
        a: "Yes. A refundable security deposit is required prior to handover. The amount depends on the vehicle and will be confirmed in advance. Deposits are released within 7–14 business days after the vehicle is returned in good order.",
      },
      {
        q: "Are the vehicles insured?",
        a: "Yes. Comprehensive insurance is included in all rentals, covering third-party liability and vehicle damage subject to an excess amount. Optional excess reduction is available for added peace of mind.",
      },
    ],
  },
  {
    category: "Collection & Delivery",
    questions: [
      {
        q: "Do you offer vehicle delivery?",
        a: "Yes. We offer flexible delivery and collection options, including airport and accommodation handovers by arrangement. Delivery within the Cape Town metropolitan area is complimentary.",
      },
      {
        q: "Can I collect the vehicle myself?",
        a: "Absolutely. Self-collection can be arranged at a convenient location. We'll confirm the address and handover time during your consultation.",
      },
    ],
  },
  {
    category: "During the Rental",
    questions: [
      {
        q: "Is there a mileage limit?",
        a: "Daily rentals include a generous mileage allowance. Extended rentals may include additional or unlimited mileage. Any excess will be discussed and agreed in advance. No surprises.",
      },
      {
        q: "What happens if I need assistance during my rental?",
        a: "We provide 24/7 roadside assistance for all rentals. Should you require any support, simply contact us and we will arrange immediate assistance wherever you are.",
      },
    ],
  },
  {
    category: "Returns & Cancellations",
    questions: [
      {
        q: "What happens at the end of the rental?",
        a: "Your vehicle will be collected at the pre-arranged location and time. A brief inspection is conducted together, and your deposit is released promptly thereafter.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellation terms are confirmed at the time of booking. We understand plans change. Please notify us as early as possible, and we'll work with you to find the best solution.",
      },
    ],
  },
  {
    category: "Listing Your Vehicle",
    questions: [
      {
        q: "Can I list my luxury vehicle with Signature?",
        a: "Yes, subject to approval. We work with select vehicle owners whose cars align with our brand standards. Submit your details, and our team will be in touch to discuss suitability.",
      },
      {
        q: "Do you manage the entire rental process?",
        a: "Completely. From client screening and bookings to handovers, inspections, and administration, we handle every detail. You simply receive regular updates and transparent reporting.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding-sm bg-background border-b border-border/30">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <h1 className="font-serif text-display text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Everything you need to know about renting with Signature.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl">
            {faqCategories.map((category) => (
              <div key={category.category} className="mb-16 last:mb-0">
                <h2 className="font-serif text-xl font-medium text-foreground mb-6 pb-4 border-b border-border">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-0">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="border-b border-border/50"
                    >
                      <AccordionTrigger className="text-left font-sans font-normal text-foreground hover:no-underline hover:bg-muted/30 py-5 px-2 -mx-2 rounded transition-colors duration-200">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 pt-1 px-2">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Reassurance Block */}
      <section className="section-padding bg-muted/30 border-t border-border/30">
        <div className="container-luxury text-center">
          <h2 className="font-serif text-headline text-foreground mb-6">
            Still Have Questions?
          </h2>
          <p className="text-body text-muted-foreground mb-4 max-w-xl mx-auto">
            If you have any additional questions, we're always happy to assist.
          </p>
          <p className="text-body text-muted-foreground mb-10 max-w-xl mx-auto">
            Every enquiry is handled personally to ensure a seamless experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <LuxuryButton variant="hero" size="lg">
                Book Now
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

export default FAQ;
