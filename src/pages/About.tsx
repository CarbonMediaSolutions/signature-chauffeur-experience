import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import capeTownRoad from "@/assets/cape-town-road.jpg";
import interiorDetail from "@/assets/detail-interior.jpg";
import lifestyleCoastal from "@/assets/lifestyle-coastal-drive.jpg";
import aboutDean from "@/assets/about-dean-placeholder.jpg";

const About = () => {
  return (
    <Layout>
      {/* Section 1: Our Story */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">
              OUR STORY
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground italic leading-relaxed">
              "Cars have always meant more than just the destination."
            </blockquote>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Long before they represent success, cars live in our imagination — pinned to walls, driven by icons, associated with the belief that life can be bigger. Signature was created from that understanding. We see cars not as machines, but as emotional experiences that change how you show up, sharpen confidence, and remind you of what's possible.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={capeTownRoad}
                  alt="Cape Town coastal road"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-sm">
                  <img
                    src={interiorDetail}
                    alt="Luxury interior craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-sm">
                  <img
                    src={lifestyleCoastal}
                    alt="Coastal lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Signature Experience */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-luxury">
          <div className="max-w-5xl mx-auto">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em] text-center">
              THE SIGNATURE EXPERIENCE
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-16" />
            
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {/* Why Signature */}
              <div className="text-center md:text-left">
                <h3 className="font-serif text-xl text-foreground mb-4">
                  Why Signature
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  We focus on how a drive makes you feel — not just what you drive. Every booking, every car, every interaction is handled with intention.
                </p>
              </div>
              
              {/* Who We Serve */}
              <div className="text-center md:text-left">
                <h3 className="font-serif text-xl text-foreground mb-4">
                  Who We Serve
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-4">
                  For those who see a car as part of the moment:
                </p>
                <ul className="space-y-2 text-body text-muted-foreground">
                  <li>Business leaders arriving with presence</li>
                  <li>Travellers seeking something extraordinary</li>
                  <li>Those celebrating milestones worth remembering</li>
                </ul>
              </div>
              
              {/* Our Values */}
              <div className="text-center md:text-left">
                <h3 className="font-serif text-xl text-foreground mb-4">
                  Our Values
                </h3>
                <ul className="space-y-3 text-body text-muted-foreground">
                  <li>
                    <span className="text-foreground font-medium">Possibility</span>
                    <span className="block text-sm mt-1">Access to experiences once only dreamed of</span>
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Discretion</span>
                    <span className="block text-sm mt-1">Personal, attentive, never transactional</span>
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Humanity</span>
                    <span className="block text-sm mt-1">A family-led business with a face behind the name</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Founder Story */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">
              MEET THE FOUNDER
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
              "I'm Dean Oliver, founder of Signature Car Rentals."
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src={aboutDean}
                alt="Dean Oliver - Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                My love for cars started with a Ferrari F40 poster and weekends watching Formula One. To me, they symbolised possibility — the belief that one day, more was achievable.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                That fascination never left. When I eventually owned the cars I once dreamed about, what stayed with me wasn't status, but how they made me feel: focused, confident, fully present. Signature was born from that feeling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Vision Quote - Full Width */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0">
          <img
            src={capeTownRoad}
            alt="The journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container-luxury relative z-10">
          <blockquote className="max-w-4xl mx-auto text-center font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground italic leading-relaxed mb-6">
            "To let someone sit behind the wheel of a car they once dreamed about, and feel like that kid staring at a poster on the wall."
          </blockquote>
          <p className="text-center text-primary-foreground/80 text-sm tracking-[0.15em]">
            — Dean Oliver, Founder
          </p>
        </div>
      </section>

      {/* Section 4: The Difference */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">
              THE DIFFERENCE
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                We believe cars are emotional experiences — they symbolise ambition and possibility.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                Signature is family-led and hands-on, built on trust and genuine care.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                We exist for the dreamers — creating access without intimidation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Final Statement + CTA */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-relaxed mb-6">
              "Because luxury isn't just about what you drive.<br />
              It's about how it makes you show up."
            </blockquote>
            <p className="text-caption text-muted-foreground tracking-[0.15em] mb-16">
              — Dean Oliver
            </p>
            
            <h2 className="text-headline text-foreground mb-12">
              Begin Your Signature Experience
            </h2>
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
        </div>
      </section>
    </Layout>
  );
};

export default About;
