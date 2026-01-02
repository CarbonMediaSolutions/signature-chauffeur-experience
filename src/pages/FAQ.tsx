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
        q: "How do I book a vehicle?",
        a: "Simply submit an enquiry through our website or contact us via WhatsApp. Our team will personally review your request, recommend suitable vehicles, and guide you through the booking process. We prioritize personal consultation over instant booking to ensure you receive the perfect vehicle.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 48-72 hours in advance for standard vehicles, and 1-2 weeks for high-demand or limited availability vehicles. For peak seasons or special events, earlier booking is advisable.",
      },
      {
        q: "Can I extend my rental?",
        a: "Yes, extensions are possible subject to vehicle availability. Please contact us as early as possible to arrange an extension. We will do our best to accommodate your needs.",
      },
    ],
  },
  {
    category: "Driver Requirements",
    questions: [
      {
        q: "What are the age requirements?",
        a: "The minimum age is 25 years for most vehicles, with a minimum of 3 years driving experience. For certain high-performance vehicles, the minimum age is 30 years with additional experience requirements.",
      },
      {
        q: "Do you accept international licenses?",
        a: "Yes, we accept valid international driving permits alongside your original national license. Please ensure your license is in English or accompanied by a certified translation.",
      },
      {
        q: "Can someone else drive the vehicle?",
        a: "Additional drivers must be registered and approved in advance. They must meet the same eligibility requirements as the primary driver and provide all necessary documentation.",
      },
    ],
  },
  {
    category: "Insurance & Deposits",
    questions: [
      {
        q: "What insurance is included?",
        a: "Comprehensive insurance is included in all rentals, covering third-party liability and vehicle damage subject to an excess amount. Optional excess reduction is available for added peace of mind.",
      },
      {
        q: "How much is the security deposit?",
        a: "Security deposit amounts vary by vehicle category and are communicated clearly before booking confirmation. Deposits are processed via credit card pre-authorization and released within 7-14 business days after the vehicle is returned.",
      },
      {
        q: "What happens if there is damage?",
        a: "Any damage is assessed upon vehicle return. The excess amount may be deducted from your deposit, with the remainder refunded. We provide a detailed inspection report and maintain full transparency throughout the process.",
      },
    ],
  },
  {
    category: "Collection & Delivery",
    questions: [
      {
        q: "Do you deliver vehicles?",
        a: "Yes, we offer complimentary delivery and collection within the Cape Town metropolitan area. Delivery to locations outside this area can be arranged for an additional fee.",
      },
      {
        q: "Can I collect from the airport?",
        a: "Absolutely. We offer airport delivery and collection at Cape Town International Airport. Simply let us know your flight details, and your vehicle will be waiting.",
      },
      {
        q: "What time can I collect or return?",
        a: "Standard operating hours are 8am to 6pm. After-hours arrangements can be made upon request and may incur an additional fee.",
      },
    ],
  },
  {
    category: "During Your Rental",
    questions: [
      {
        q: "What if I break down or need assistance?",
        a: "We provide 24/7 roadside assistance for all rentals. Simply call our emergency line, and we will arrange immediate support wherever you are.",
      },
      {
        q: "Can I take the vehicle outside Cape Town?",
        a: "Yes, travel within South Africa is permitted. Cross-border travel requires prior approval and additional documentation. Please discuss your travel plans with us at the time of booking.",
      },
      {
        q: "What are my mileage limits?",
        a: "Daily rentals include a generous daily mileage allowance. Extended rentals may include additional or unlimited mileage. Excess mileage charges apply beyond the allowance. Custom mileage packages are available.",
      },
    ],
  },
  {
    category: "Listing Your Vehicle",
    questions: [
      {
        q: "What types of vehicles do you accept?",
        a: "We focus on luxury, sports, and premium vehicles that meet our quality standards. Each vehicle is assessed individually based on condition, age, and market appeal.",
      },
      {
        q: "How does the revenue split work?",
        a: "Revenue sharing details are discussed during our consultation. We aim for a fair arrangement that reflects the value of your vehicle and the services we provide.",
      },
      {
        q: "Is my vehicle insured while listed?",
        a: "Yes, comprehensive insurance coverage is provided for all listed vehicles during rental periods. Coverage details are discussed during the partnership agreement.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding-sm bg-background border-b border-border/50">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground tracking-luxury mb-3">
              Support
            </p>
            <h1 className="text-display text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Find answers to common questions about our service. If you need 
              further assistance, our team is always here to help.
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
                      className="border-b border-border py-2"
                    >
                      <AccordionTrigger className="text-left font-sans font-normal text-foreground hover:no-underline py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
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

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury text-center">
          <h2 className="text-headline mb-6">
            Still Have Questions?
          </h2>
          <p className="text-body-lg text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Our team is ready to assist you with any additional questions or 
            to help you begin your Signature experience.
          </p>
          <Link to="/contact">
            <LuxuryButton variant="hero" size="lg">
              Get in Touch
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
