import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useVehicles } from "@/hooks/useVehicles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-home.jpg";
import interludeImage from "@/assets/cape-town-road.jpg";
import { Loader2 } from "lucide-react";

const services = [
  {
    title: "Doorstep Delivery & Collection",
    description: "Your vehicle arrives impeccably prepared, wherever you are.",
  },
  {
    title: "Flexible Rental Periods",
    description: "Daily, weekly, or extended. Tailored to your schedule.",
  },
  {
    title: "Personal Consultation",
    description: "We guide you to the perfect vehicle for your journey.",
  },
  {
    title: "Concierge-Style Service",
    description: "Discreet, attentive support from enquiry to return.",
  },
];

const Index = () => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const featuredVehicles = vehicles.slice(0, 4);

  // Scroll animation hooks
  const valuesAnimation = useScrollAnimation<HTMLDivElement>();
  const missionAnimation = useScrollAnimation<HTMLDivElement>();
  const whoAnimation = useScrollAnimation<HTMLDivElement>();
  const whyAnimation = useScrollAnimation<HTMLDivElement>();
  const fleetAnimation = useScrollAnimation<HTMLDivElement>();
  const servicesAnimation = useScrollAnimation<HTMLDivElement>();
  const ctaAnimation = useScrollAnimation<HTMLDivElement>();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury vehicle on Cape Town coastal road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        
        <div className="relative container-luxury pb-28 md:pb-36 lg:pb-40">
          <div className="max-w-2xl">
            {/* Location */}
            <p className="text-caption text-primary-foreground/60 mb-8 tracking-[0.3em] animate-fade-in-up">
              Cape Town, South Africa
            </p>
            
            {/* Headline */}
            <h1 className="text-display text-primary-foreground/95 mb-10 tracking-tight animate-fade-in-delayed" style={{ animationDuration: '1s' }}>
              DREAM IT. DRIVE IT.<br />LIVE IT.
            </h1>
            
            {/* Subheadline */}
            <p className="text-body-lg text-primary-foreground/80 mb-4 max-w-lg animate-fade-in-delayed-2">
              Luxury car rental created for moments that matter.
            </p>
            <p className="text-body text-primary-foreground/60 mb-10 max-w-lg animate-fade-in-delayed-2">
              More than hiring a car — it's where the dream comes alive!
            </p>
            
            {/* National service note */}
            <p className="text-sm text-primary-foreground/40 mb-14 tracking-wider animate-fade-in-delayed-3">
              Based in Cape Town. Serving clients nationally.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-delayed-3">
              <Link to="/contact">
                <LuxuryButton variant="hero" size="lg" className="shadow-xl shadow-primary/20">
                  Begin Your Enquiry
                </LuxuryButton>
              </Link>
              <Link to="/fleet">
                <LuxuryButton variant="heroInverse" size="lg" className="border-primary-foreground/30 hover:border-primary-foreground/50">
                  Explore the Fleet
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Interlude - Emotional Bridge */}
      <section className="visual-interlude my-20 md:my-28 lg:my-36">
        <div className="relative aspect-[16/9] w-full">
          <img
            src={interludeImage}
            alt="Scenic Cape Town coastal drive"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center mt-6 font-serif text-sm text-muted-foreground/50 italic tracking-wide">
          Chapman's Peak Drive, Cape Town
        </p>
      </section>

      {/* Our Values Section */}
      <section className="py-28 md:py-36 lg:py-44 bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <div 
              ref={valuesAnimation.ref}
              className={`text-center mb-20 animate-on-scroll ${valuesAnimation.isInView ? 'in-view' : ''}`}
            >
              <p className="text-caption text-muted-foreground/70 mb-5 tracking-[0.3em]">
                Introduction
              </p>
              <h2 className="text-headline text-foreground">
                Our Values
              </h2>
            </div>
            
            <div className="space-y-20">
              {/* Main Values Statement */}
              <div 
                ref={missionAnimation.ref}
                className={`text-center animate-on-scroll ${missionAnimation.isInView ? 'in-view' : ''}`}
              >
                <p className="text-body-lg text-muted-foreground leading-[2] prose-luxury">
                  At Signature Car Rentals, we believe luxury is about more than status — it's about possibility, confidence, and how something makes you feel. We exist to inspire people to arrive differently: to feel empowered, alive, and present in moments that matter, whether it's a defining business meeting, a first date, a milestone celebration, or an unforgettable drive along iconic roads like Chapman's Peak or the coast to Hermanus. We see cars not as objects, but as experiences that awaken the senses and elevate the journey. Built on trust, passion, and human connection, we are a family-led business with a face behind the name — creating access to extraordinary experiences, caring deeply for every vehicle, and allowing owners and drivers alike to share in the joy, meaning, and opportunity that luxury in motion can create.
                </p>
              </div>

              {/* Our Mission */}
              <div 
                ref={whoAnimation.ref}
                className={`border-t border-border/30 pt-20 animate-on-scroll ${whoAnimation.isInView ? 'in-view' : ''}`}
              >
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
                      Our Mission
                    </h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-body-lg text-muted-foreground leading-[2]">
                      Our mission is to transform luxury car rental into an experience. One that inspires confidence, ambition, and belief.
                    </p>
                  </div>
                </div>
              </div>

              {/* Who is Signature For */}
              <div 
                className={`border-t border-border/30 pt-20 animate-on-scroll ${whoAnimation.isInView ? 'in-view' : ''}`}
                style={{ transitionDelay: '0.15s' }}
              >
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
                      Who is Signature Car Rentals for?
                    </h3>
                  </div>
                  <div className="lg:col-span-2 space-y-7">
                    <p className="text-body text-muted-foreground leading-[2]">
                      Signature Car Rentals is for those who see a car as part of the moment, not just the journey. For people who value quality, discretion, and how an experience makes them feel.
                    </p>
                    <p className="text-body text-muted-foreground leading-[2]">
                      We work with business leaders, travellers, hosts, and individuals celebrating meaningful milestones, from important meetings and international visits to weddings, events, and once-in-a-lifetime occasions.
                    </p>
                    <p className="text-body text-muted-foreground leading-[2]">
                      By intentionally working with a select number of clients, we're able to offer a more personal, attentive experience, where every booking is handled with care and intention.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Signature */}
              <div 
                ref={whyAnimation.ref}
                className={`border-t border-border/30 pt-20 animate-on-scroll ${whyAnimation.isInView ? 'in-view' : ''}`}
              >
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
                      Why Signature Car Rentals?
                    </h3>
                  </div>
                  <div className="lg:col-span-2 space-y-7">
                    <p className="text-body text-muted-foreground leading-[2]">
                      Because we believe cars are more than machines — they're experiences that symbolise ambition, confidence, and possibility. We focus on how a drive makes you feel, not just what you drive.
                    </p>
                    <p className="text-body text-muted-foreground leading-[2]">
                      Signature is a family-led, hands-on business, built on trust and genuine care. Every car, every booking, and every interaction is treated with intention and respect.
                    </p>
                    <p className="text-body text-muted-foreground leading-[2]">
                      Most importantly, Signature exists for the dreamers — for those who have always believed a car could represent something more. We create access to extraordinary experiences, without intimidation, and with meaning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-20">
              <Link to="/about">
                <LuxuryButton variant="subtle" size="default">
                  Our Story
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="py-28 md:py-36 lg:py-44 bg-secondary/20">
        <div className="container-luxury">
          <div 
            ref={fleetAnimation.ref}
            className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 animate-on-scroll ${fleetAnimation.isInView ? 'in-view' : ''}`}
          >
            <div>
              <p className="text-caption text-muted-foreground/70 mb-5 tracking-[0.3em]">
                The Collection
              </p>
              <h2 className="text-headline text-foreground">
                Featured Vehicles
              </h2>
            </div>
            <Link to="/fleet">
              <LuxuryButton variant="subtle" size="default">
                Explore the Full Collection →
              </LuxuryButton>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
              {featuredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-28 md:py-36 lg:py-44 bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div 
            ref={servicesAnimation.ref}
            className={`grid lg:grid-cols-2 gap-20 lg:gap-32 animate-on-scroll ${servicesAnimation.isInView ? 'in-view' : ''}`}
          >
            <div>
              <div className="w-20 h-px bg-primary-foreground/15 mb-12" />
              <h2 className="text-headline mb-10">
                Every Detail, Handled
              </h2>
              <p className="text-body-lg text-primary-foreground/50 mb-12 leading-relaxed">
                Seamless. Discreet. Effortless. We manage the details 
                so you focus on the experience.
              </p>
              <Link to="/process">
                <LuxuryButton variant="hero" size="default" className="shadow-lg shadow-primary-foreground/5">
                  How It Works
                </LuxuryButton>
              </Link>
            </div>
            
            <div className="space-y-12">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={`border-l border-primary-foreground/10 pl-12 py-4 animate-slide-left ${servicesAnimation.isInView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}
                >
                  <h3 className="font-serif text-xl md:text-2xl font-medium mb-4 text-primary-foreground/95">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/40 text-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 lg:py-48 bg-background">
        <div 
          ref={ctaAnimation.ref}
          className={`container-luxury text-center max-w-2xl mx-auto animate-on-scroll ${ctaAnimation.isInView ? 'in-view' : ''}`}
        >
          <h2 className="text-headline text-foreground mb-10">
            Begin your Signature experience
          </h2>
          <p className="text-body-lg text-muted-foreground/70 mb-14 leading-relaxed">
            Our team will personally guide you to the perfect vehicle.
          </p>
          <Link to="/contact">
            <LuxuryButton 
              variant="default" 
              size="xl" 
              className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/15 transition-shadow duration-500"
            >
              Start Your Enquiry
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
