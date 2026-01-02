import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import capeTownRoad from "@/assets/cape-town-road.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-caption text-muted-foreground mb-4">
              About Us
            </p>
            <h1 className="text-display text-foreground mb-10">
              Driven by Passion,<br />Delivered with Care
            </h1>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="pb-16">
        <div className="container-luxury">
          <div className="aspect-[21/9] overflow-hidden bg-muted">
            <img
              src={capeTownRoad}
              alt="Cape Town coastal road"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">
            <div>
              <div className="line-accent mb-10" />
              <h2 className="text-headline text-foreground mb-8">
                Our Story
              </h2>
            </div>
            <div className="space-y-8">
              <p className="text-body-lg text-muted-foreground">
                Signature Car Rentals began with a shared passion. Dean and Andrea, 
                lifelong enthusiasts, saw an opportunity to bring something different 
                to Cape Town — a car rental experience that feels personal, considered, 
                and genuinely special.
              </p>
              <p className="text-body text-muted-foreground">
                What started as a vision has grown into a curated collection of 
                exceptional vehicles, each handpicked for its character. But more 
                than the vehicles themselves, it is the service that sets us apart.
              </p>
              <p className="text-body text-muted-foreground">
                Every interaction is personal. Every detail, thoughtfully considered. 
                From the moment you enquire to the day you return — seamless, 
                discreet, effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-headline mb-10">
              Our Mission
            </h2>
            <p className="text-body-lg text-primary-foreground/70 mb-10">
              To make exceptional vehicles accessible in a way that feels personal, 
              genuine, and utterly effortless. We are not a marketplace. We are a 
              concierge service dedicated to matching you with the perfect vehicle.
            </p>
            <div className="w-16 h-px bg-primary-foreground/20 mx-auto" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <h2 className="text-headline text-foreground">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                title: "Intention",
                description: "Every decision is deliberate. From the vehicles we select to the service we provide — nothing left to chance.",
              },
              {
                title: "Discretion",
                description: "Privacy is paramount. We serve clients who value sophistication over spectacle.",
              },
              {
                title: "Excellence",
                description: "Good enough is never enough. We continuously refine our service to exceed expectations.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-5">
                  {value.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/20">
        <div className="container-luxury text-center">
          <h2 className="text-headline text-foreground mb-8">
            Experience the Difference
          </h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover our curated collection and begin your Signature experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/fleet">
              <LuxuryButton variant="default" size="lg">
                Explore the Fleet
              </LuxuryButton>
            </Link>
            <Link to="/contact">
              <LuxuryButton variant="outline" size="lg">
                Begin Your Enquiry
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
