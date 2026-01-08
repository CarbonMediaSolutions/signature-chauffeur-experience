import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import capeTownRoad from "@/assets/cape-town-road.jpg";
import interiorDetail from "@/assets/detail-interior.jpg";
import lifestyleCoastal from "@/assets/lifestyle-coastal-drive.jpg";
import lifestyleBusiness from "@/assets/lifestyle-business.jpg";
import aboutMilestone from "@/assets/about-milestone.jpg";
import aboutDean from "@/assets/about-dean-placeholder.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero - Our Story Opening Quote */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">
              OUR STORY
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground italic leading-relaxed">
              "Cars have always meant more than just the destination."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Story Part 1 + Image Collage */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                Long before they represent success or status, they live in our imagination. As children, we pin posters to our bedroom walls. We watch our favourite movie characters arrive in iconic cars. We associate them with confidence, freedom, and the belief that life can be bigger than what we know at the time. Even before we understand engines or price tags, we understand what a car symbolises.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                As we grow older, that meaning evolves. The car becomes part of our milestones - the one you take to impress on a first date, the one you arrive in for an important meeting, the one that makes you feel like you've finally stepped into the life you've been working toward. Whether true or assumed, society reads a luxury car as focus, ambition, and achievement. It suggests someone who is going places.
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

      {/* Quote Break - Full Width */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0">
          <img
            src={lifestyleBusiness}
            alt="Signature experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container-luxury relative z-10">
          <blockquote className="max-w-3xl mx-auto text-center font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground italic leading-relaxed">
            "Signature Car Rentals was created from that understanding."
          </blockquote>
        </div>
      </section>

      {/* Story Part 2 + Image */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src={aboutMilestone}
                  alt="Milestone moment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                We don't see cars as mechanical machines alone. We see them as emotional experiences, shaped by sound, movement, craftsmanship, and the way they make you feel behind the wheel. A great car doesn't just take you somewhere; it changes how you show up. It sharpens confidence. It heightens awareness. It reminds you of what's possible.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                Signature exists to give people access to that feeling. To let someone feel, even for a moment, like that kid staring at a poster on their wall, believing that anything is achievable. Whether it's a celebration, a defining moment, or simply the desire to experience something extraordinary, we're here for the moments where ambition meets emotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Quote - Our Story */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-relaxed mb-4">
              "Because cars aren't just driven.
            </blockquote>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-relaxed">
              They're felt."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">
              MEET THE FOUNDER
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
              "I'm Dean Oliver, CEO and founder of Signature Car Rentals."
            </p>
          </div>
        </div>
      </section>

      {/* Dean's Story + Photo */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src={aboutDean}
                alt="Dean Oliver - CEO"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                My love for cars started long before business plans or balance sheets. As a kid, I had a poster of a Ferrari F40 on my wall. Alongside that came weekends watching Formula One - captivated by speed, design, and the sense that these machines represented something bigger than themselves. To me, cars weren't just vehicles. They symbolised possibility, ambition, and the belief that one day, more was achievable.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                As I grew older, that fascination never left. Eventually, it became a reality, owning and driving the very kinds of cars I once only dreamed about. What stayed with me wasn't status or image, but how those cars made me feel: focused, confident, alive, and fully present in the moment.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                Signature Car Rentals was born from that feeling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dean's Vision Quote */}
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
          <blockquote className="max-w-4xl mx-auto text-center font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground italic leading-relaxed">
            "To let someone sit behind the wheel of a car they once dreamed about, and feel like that kid staring at a poster on the wall, believing anything is possible."
          </blockquote>
        </div>
      </section>

      {/* Dean's Closing Philosophy */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-body-lg text-muted-foreground leading-relaxed mb-8">
              This business exists to give others access to that same experience, even if it's just for a day.
            </p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-relaxed mb-8">
              "Because luxury isn't just about what you drive.<br />
              It's about how it makes you show up."
            </blockquote>
            <p className="text-caption text-muted-foreground tracking-[0.15em]">
              - Dean Oliver
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              CEO & Founder
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
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
