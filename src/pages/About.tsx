import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import capeTownRoad from "@/assets/cape-town-road.jpg";
import aboutDean from "@/assets/about-dean-placeholder.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={capeTownRoad}
            alt="Scenic coastal road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/40" />
        </div>
      </section>

      {/* Section 1: Our Story */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">
              OUR STORY
            </p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-relaxed">
              "Cars have always meant more than the destination."
            </h1>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Cars have always meant more than the destination. Long before status or success, they live in our imagination. Symbols of confidence, freedom, and possibility. As we grow, that meaning evolves. Cars become part of our milestones: how we arrive, how we're perceived, and how we feel stepping into moments that matter.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Signature Car Rentals was created from that understanding. We don't see cars as machines alone, but as emotional experiences shaped by design, sound, and the feeling they create behind the wheel. A great car doesn't just take you somewhere. It changes how you show up.
              </p>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Signature exists to give people access to that feeling. For moments where ambition meets emotion.
              </p>
              <p className="font-serif text-lg text-foreground italic">
                Because cars aren't just driven. They're felt.
              </p>
            </div>
            <div className="aspect-video bg-charcoal rounded-sm overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-primary/40" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-foreground/60 border-b-8 border-b-transparent ml-1" />
                </div>
                <p className="text-caption text-primary-foreground/60 tracking-[0.2em]">
                  VIDEO COMING SOON
                </p>
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
            
            {/* Desktop: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-12 lg:gap-16">
              {/* Why Signature */}
              <div className="text-left">
                <h3 className="font-serif text-xl text-foreground mb-4">
                  Why Signature
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  We focus on how a drive makes you feel — not just what you drive. Every booking, every car, every interaction is handled with intention.
                </p>
              </div>
              
              {/* Who We Serve */}
              <div className="text-left">
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
              <div className="text-left">
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

            {/* Mobile: Carousel */}
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Why Signature */}
                  <CarouselItem>
                    <div className="text-center px-4">
                      <h3 className="font-serif text-xl text-foreground mb-4">
                        Why Signature
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        We focus on how a drive makes you feel — not just what you drive. Every booking, every car, every interaction is handled with intention.
                      </p>
                    </div>
                  </CarouselItem>
                  
                  {/* Who We Serve */}
                  <CarouselItem>
                    <div className="text-center px-4">
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
                  </CarouselItem>
                  
                  {/* Our Values */}
                  <CarouselItem>
                    <div className="text-center px-4">
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
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              {/* Carousel dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
                <div className="w-2 h-2 rounded-full bg-primary/30" />
                <div className="w-2 h-2 rounded-full bg-primary/30" />
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
            <div>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                My love for cars started with a Ferrari F40 poster and weekends watching Formula One. To me, they symbolised possibility — the belief that one day, more was achievable. That fascination never left. When I eventually owned the cars I once dreamed about, what stayed with me wasn't status, but how they made me feel: focused, confident, fully present. Signature was born from that feeling.
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


      {/* Section 5: Final Statement + CTA */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
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
