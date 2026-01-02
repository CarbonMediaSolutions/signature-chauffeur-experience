import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { vehicles } from "@/data/fleet";
import heroImage from "@/assets/hero-home.jpg";
import interiorImage from "@/assets/detail-interior.jpg";

const clientSegments = [
  {
    title: "Business Executives",
    description: "Arriving with presence. Command attention with vehicles that reflect your success.",
  },
  {
    title: "Luxury Travellers",
    description: "Explore Cape Town in style. From coastal drives to Winelands escapes.",
  },
  {
    title: "Special Occasions",
    description: "Weddings, anniversaries, milestones. Make every moment unforgettable.",
  },
  {
    title: "Discretion Focused",
    description: "Privacy as a priority. Experience luxury without the spotlight.",
  },
];

const services = [
  {
    title: "Doorstep Delivery",
    description: "Your vehicle arrives at your preferred location, impeccably prepared.",
  },
  {
    title: "Flexible Terms",
    description: "Daily, weekly, or extended rentals tailored to your schedule.",
  },
  {
    title: "Concierge Service",
    description: "Personal consultation to match you with the perfect vehicle.",
  },
];

const Index = () => {
  const featuredVehicles = vehicles.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury sports car on Cape Town coastal road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        </div>
        
        <div className="relative container-luxury pb-20 md:pb-28">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-caption text-primary-foreground/70 tracking-luxury mb-4">
              Cape Town, South Africa
            </p>
            <h1 className="text-display text-primary-foreground mb-6">
              Bespoke Luxury Vehicle Hire
            </h1>
            <p className="text-body-lg text-primary-foreground/80 mb-10 max-w-xl">
              This is not standard car hire. Experience curated vehicles, delivered 
              with intention and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fleet">
                <LuxuryButton variant="hero" size="lg">
                  Explore Our Fleet
                </LuxuryButton>
              </Link>
              <Link to="/contact">
                <LuxuryButton variant="heroInverse" size="lg">
                  Enquire Now
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="line-accent mb-8" />
              <h2 className="text-headline text-foreground mb-6">
                Luxury is not loud
              </h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                It is confident. It is considered. It is intentional.
              </p>
              <p className="text-body text-muted-foreground mb-8">
                At Signature Car Rentals, we believe in the art of quiet excellence. 
                Every vehicle in our fleet is handpicked for its character, every 
                detail of your experience thoughtfully considered. From the moment 
                you enquire to the day you return, we ensure seamless, discreet, 
                and effortless service.
              </p>
              <Link to="/about">
                <LuxuryButton variant="subtle" size="default">
                  Our Story
                </LuxuryButton>
              </Link>
            </div>
            <div className="relative aspect-square">
              <img
                src={interiorImage}
                alt="Luxury car interior details"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-caption text-muted-foreground tracking-luxury mb-3">
                Our Collection
              </p>
              <h2 className="text-headline text-foreground">
                Featured Vehicles
              </h2>
            </div>
            <Link to="/fleet">
              <LuxuryButton variant="subtle" size="sm">
                View All Vehicles →
              </LuxuryButton>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Cater To */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-caption text-muted-foreground tracking-luxury mb-3">
              Our Clients
            </p>
            <h2 className="text-headline text-foreground mb-6">
              Who We Cater To
            </h2>
            <p className="text-body text-muted-foreground">
              From executives who command presence to travellers seeking 
              unforgettable experiences, we serve those who appreciate 
              the finer details.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientSegments.map((segment, index) => (
              <div 
                key={segment.title}
                className="p-8 border border-border/50 hover:border-border transition-colors duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-serif text-lg font-medium text-foreground mb-3">
                  {segment.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {segment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="w-12 h-px bg-primary-foreground/30 mb-8" />
              <h2 className="text-headline mb-6">
                Bespoke Service
              </h2>
              <p className="text-body-lg text-primary-foreground/70 mb-8">
                Every element feels seamless, discreet, and effortless. 
                We handle the details so you can focus on the experience.
              </p>
              <Link to="/process">
                <LuxuryButton variant="hero" size="default">
                  How It Works
                </LuxuryButton>
              </Link>
            </div>
            
            <div className="space-y-8">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className="border-l border-primary-foreground/20 pl-8 py-2"
                >
                  <h3 className="font-serif text-xl font-medium mb-2">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/60">
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
          <h2 className="text-headline text-foreground mb-6">
            Experience luxury, your way
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10">
            Enquire now to reserve your Signature vehicle. Our team will 
            personally guide you to the perfect choice.
          </p>
          <Link to="/contact">
            <LuxuryButton variant="default" size="xl">
              Begin Your Enquiry
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
