import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import capeTownRoad from "@/assets/cape-town-road.jpg";
import interiorDetail from "@/assets/detail-interior.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">
              About Us · Cape Town, South Africa
            </p>
            <h1 className="text-display text-foreground mb-10">
              Driven by Passion,<br />Delivered with Care
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              This is not standard car hire. It is a curated, intentional experience — 
              where every vehicle is handpicked and every detail considered.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="pb-16">
        <div className="container-luxury">
          <div className="aspect-[21/9] overflow-hidden bg-muted rounded-sm">
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
                Dean and Andrea are lifelong car enthusiasts. For them, driving has 
                never been about getting from A to B — it has always been about the 
                experience itself.
              </p>
              <p className="text-body text-muted-foreground">
                Some time ago, they rented a luxury vehicle simply for the joy of 
                driving something exceptional. That moment — the feel of the wheel, 
                the sound of the engine, the sense of occasion — stayed with them.
              </p>
              <p className="text-body text-muted-foreground">
                It sparked an idea: what if more people could access exceptional 
                vehicles in a way that feels personal, effortless, and far removed 
                from the transactional experience of typical car rental?
              </p>
              <p className="text-body text-muted-foreground">
                Signature Car Rentals was born from a place of pure passion for cars. 
                Every vehicle in our collection is handpicked for its character. Every 
                interaction, genuinely personal. From enquiry to return — seamless, 
                discreet, and utterly effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interior Detail Image */}
      <section className="pb-16 md:pb-24">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] overflow-hidden bg-muted rounded-sm">
              <img
                src={interiorDetail}
                alt="Refined interior craftsmanship"
                className="w-full h-full object-cover"
              />
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
            <p className="text-body-lg text-primary-foreground/70 mb-8">
              Signature Car Rentals is not a marketplace. It is a concierge-style, 
              highly personal service.
            </p>
            <p className="text-body text-primary-foreground/60 mb-10 max-w-2xl mx-auto">
              We make exceptional vehicles accessible in a way that feels calm, 
              effortless, and considered. We do not simply offer any available car. 
              We match each client with the right vehicle — one that suits their 
              journey, their style, and their expectations.
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
                description: "Every decision is deliberate. From vehicle selection to service delivery — nothing left to chance.",
              },
              {
                title: "Discretion",
                description: "Privacy and quiet confidence. For clients who value sophistication over spectacle.",
              },
              {
                title: "Excellence",
                description: "Beyond good enough. Continuous refinement of every detail, every experience.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-5">
                  {value.title}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
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
            Begin Your Signature Experience
          </h2>
          <p className="text-body-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            Discover our curated collection of exceptional vehicles.
          </p>
          <p className="text-body text-muted-foreground mb-12 max-w-xl mx-auto">
            Every detail considered, every experience curated with intention.
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
