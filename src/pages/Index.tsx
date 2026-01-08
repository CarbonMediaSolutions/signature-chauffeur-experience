import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useVehicles } from "@/hooks/useVehicles";
import heroImage from "@/assets/hero-home.jpg";
import capeTownRoad from "@/assets/cape-town-road.jpg";
import detailInterior from "@/assets/detail-interior.jpg";
import lifestyleCoastalDrive from "@/assets/lifestyle-coastal-drive.jpg";
import lifestyleBusiness from "@/assets/lifestyle-business.jpg";
import lifestyleCelebration from "@/assets/lifestyle-celebration.jpg";
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[750px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury vehicle on Cape Town coastal road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        
        <div className="relative container-luxury pb-24 md:pb-32">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-caption text-primary-foreground/70 mb-6 tracking-[0.25em]">
              Cape Town, South Africa
            </p>
            <h1 className="text-display text-primary-foreground mb-8 tracking-tight">
              DREAM IT. DRIVE IT.<br />LIVE IT.
            </h1>
            <p className="text-body-lg text-primary-foreground/90 mb-4 max-w-lg font-medium">
              Luxury car rental created for moments that matter.
            </p>
            <p className="text-body text-primary-foreground/75 mb-8 max-w-lg">
              More than hiring a car - it's where the dream comes alive!
            </p>
            <p className="text-sm text-primary-foreground/50 mb-12 tracking-wide">
              Based in Cape Town. Serving clients nationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <LuxuryButton variant="hero" size="lg">
                  Begin Your Enquiry
                </LuxuryButton>
              </Link>
              <Link to="/fleet">
                <LuxuryButton variant="heroInverse" size="lg">
                  Explore the Fleet
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Quote */}
      <section className="py-24 md:py-32 bg-[hsl(35,30%,95%)]">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">
            Introduction
          </p>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8 italic">
            "Luxury car rental created for <span className="text-brass">moments</span> that matter."
          </blockquote>
          <p className="text-body-lg text-muted-foreground">
            More than hiring a car - it's where the dream comes alive.
          </p>
        </div>
      </section>

      {/* Our Values + Image Collage */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">
                Our Values
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                We believe luxury is about more than status
              </h2>
              <p className="text-body text-muted-foreground leading-relaxed mb-6">
                It's about possibility, confidence, and how something makes you feel. We exist to inspire people to arrive differently: to feel empowered, alive, and present in moments that matter.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed mb-6">
                Whether it's a defining business meeting, a first date, a milestone celebration, or an unforgettable drive along iconic roads like Chapman's Peak or the coast to Hermanus - we see cars not as objects, but as experiences that awaken the senses and elevate the journey.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                Built on trust, passion, and human connection, we are a family-led business with a face behind the name - creating access to extraordinary experiences, caring deeply for every vehicle, and allowing owners and drivers alike to share in the joy, meaning, and opportunity that luxury in motion can create.
              </p>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 row-span-2">
                  <img 
                    src={capeTownRoad} 
                    alt="Scenic Cape Town coastal road" 
                    className="w-full h-full object-cover aspect-[3/4] rounded-sm"
                  />
                </div>
                <div className="col-span-5">
                  <img 
                    src={detailInterior} 
                    alt="Luxury car interior details" 
                    className="w-full h-full object-cover aspect-square rounded-sm"
                  />
                </div>
                <div className="col-span-5">
                  <img 
                    src={lifestyleCelebration} 
                    alt="Luxury celebration moment" 
                    className="w-full h-full object-cover aspect-[4/3] rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Full Width */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="relative container-luxury text-center max-w-4xl mx-auto">
          <p className="text-caption text-primary-foreground/60 mb-6 tracking-[0.25em]">
            Our Mission
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-relaxed">
            "Our mission is to transform luxury car rental into an <span className="text-brass">experience</span>. One that inspires confidence, ambition, and belief."
          </blockquote>
        </div>
      </section>

      {/* Who We Serve + Image */}
      <section className="py-20 md:py-28 bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <img 
                src={lifestyleBusiness} 
                alt="Business professional with luxury vehicle" 
                className="w-full h-auto object-cover aspect-[4/5] rounded-sm"
              />
            </div>
            
            <div>
              <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">
                Who We Serve
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                Who is Signature Car Rentals for?
              </h2>
              <div className="space-y-6">
                <p className="text-body text-muted-foreground leading-relaxed">
                  Signature Car Rentals is for those who see a car as part of the moment, not just the journey. For people who value quality, discretion, and how an experience makes them feel.
                </p>
                <p className="text-body text-muted-foreground leading-relaxed">
                  We work with business leaders, travellers, hosts, and individuals celebrating meaningful milestones, from important meetings and international visits to weddings, events, and once-in-a-lifetime occasions.
                </p>
                <p className="text-body text-muted-foreground leading-relaxed">
                  By intentionally working with a select number of clients, we're able to offer a more personal, attentive experience, where every booking is handled with care and intention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Signature + Image Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">
                The Difference
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                Why Signature Car Rentals?
              </h2>
              <div className="space-y-6">
                <p className="text-body text-muted-foreground leading-relaxed">
                  Because we believe cars are more than machines - they're experiences that symbolise ambition, confidence, and possibility. We focus on how a drive makes you feel, not just what you drive.
                </p>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Signature is a family-led, hands-on business, built on trust and genuine care. Every car, every booking, and every interaction is treated with intention and respect.
                </p>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Most importantly, Signature exists for the dreamers - for those who have always believed a car could represent something more. We create access to extraordinary experiences, without intimidation, and with meaning.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/about">
                  <LuxuryButton variant="subtle" size="default">
                    Discover Our Story
                  </LuxuryButton>
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <img 
                src={lifestyleCoastalDrive} 
                alt="Luxury sports car on scenic coastal road" 
                className="w-full h-auto object-cover aspect-[4/5] rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p className="text-caption text-muted-foreground mb-4">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">
            <div>
              <div className="w-16 h-px bg-primary-foreground/20 mb-10" />
              <h2 className="text-headline mb-8">
                Every Detail, Handled
              </h2>
              <p className="text-body-lg text-primary-foreground/60 mb-10">
                Seamless. Discreet. Effortless. We manage the details 
                so you focus on the experience.
              </p>
              <Link to="/process">
                <LuxuryButton variant="hero" size="default">
                  How It Works
                </LuxuryButton>
              </Link>
            </div>
            
            <div className="space-y-10">
              {services.map((service) => (
                <div 
                  key={service.title}
                  className="border-l border-primary-foreground/15 pl-10 py-3"
                >
                  <h3 className="font-serif text-xl font-medium mb-3">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/50 text-body">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <h2 className="text-headline text-foreground mb-8">
            Begin your Signature experience
          </h2>
          <p className="text-body-lg text-muted-foreground mb-12">
            Our team will personally guide you to the perfect vehicle.
          </p>
          <Link to="/contact">
            <LuxuryButton variant="default" size="xl">
              Start Your Enquiry
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
