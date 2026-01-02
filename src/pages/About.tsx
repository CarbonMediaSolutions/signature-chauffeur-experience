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
            <p className="text-caption text-muted-foreground tracking-luxury mb-3">
              About Us
            </p>
            <h1 className="text-display text-foreground mb-8">
              Driven by Passion,<br />Delivered with Care
            </h1>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="pb-12">
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
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="line-accent mb-8" />
              <h2 className="text-headline text-foreground mb-6">
                Our Story
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground">
                Signature Car Rentals was born from a shared passion. Dean and Andrea, 
                lifelong car enthusiasts, saw an opportunity to bring something different 
                to Cape Town — a car rental experience that felt personal, considered, 
                and genuinely special.
              </p>
              <p className="text-body text-muted-foreground">
                What started as a vision has grown into a curated collection of 
                exceptional vehicles, each handpicked for its character and ability 
                to deliver memorable experiences. But more than the cars themselves, 
                it is the service that sets us apart.
              </p>
              <p className="text-body text-muted-foreground">
                We believe luxury should be accessible without compromising on quality. 
                Every interaction is personal, every detail thoughtfully considered. 
                From the moment you enquire to the day you return your vehicle, we 
                ensure the experience is seamless, discreet, and effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-headline mb-8">
              Our Mission
            </h2>
            <p className="text-body-lg text-primary-foreground/80 mb-8">
              To make exceptional vehicles accessible in a way that feels personal, 
              genuine, and utterly effortless. We are not a marketplace. We are a 
              concierge service dedicated to matching you with the perfect vehicle 
              for your journey.
            </p>
            <div className="w-12 h-px bg-primary-foreground/30 mx-auto" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="text-headline text-foreground">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Intention",
                description: "Every decision is deliberate. From the vehicles we select to the service we provide, nothing is left to chance.",
              },
              {
                title: "Discretion",
                description: "Privacy is paramount. We serve clients who value sophistication over spectacle, quality over quantity.",
              },
              {
                title: "Excellence",
                description: "Good enough is never enough. We continuously refine our service to exceed expectations.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
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
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury text-center">
          <h2 className="text-headline text-foreground mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover our curated fleet and begin your Signature experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/fleet">
              <LuxuryButton variant="default" size="lg">
                Explore Our Fleet
              </LuxuryButton>
            </Link>
            <Link to="/contact">
              <LuxuryButton variant="outline" size="lg">
                Get in Touch
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
