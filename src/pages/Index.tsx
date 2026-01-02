import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useVehicles } from "@/hooks/useVehicles";
import heroImage from "@/assets/hero-home.jpg";
import interiorImage from "@/assets/detail-interior.jpg";
import { Loader2 } from "lucide-react";

const clientSegments = [
  {
    title: "Business Executives",
    description: "Arrive with presence. Vehicles that reflect your standards.",
  },
  {
    title: "Luxury Travellers",
    description: "Explore Cape Town in style. Coastal drives to Winelands escapes.",
  },
  {
    title: "Special Occasions",
    description: "Weddings, anniversaries, milestones. Moments made memorable.",
  },
  {
    title: "Discretion Focused",
    description: "Privacy as priority. Luxury without the spotlight.",
  },
];

const services = [
  {
    title: "Doorstep Delivery",
    description: "Your vehicle arrives impeccably prepared, wherever you are.",
  },
  {
    title: "Flexible Terms",
    description: "Daily, weekly, or extended. Tailored to your schedule.",
  },
  {
    title: "Personal Consultation",
    description: "We guide you to the perfect vehicle for your journey.",
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
            <p className="text-caption text-primary-foreground/60 mb-6">
              Cape Town, South Africa
            </p>
            <h1 className="text-display text-primary-foreground mb-8">
              Bespoke Luxury<br />Vehicle Hire
            </h1>
            <p className="text-body-lg text-primary-foreground/75 mb-12 max-w-lg">
              This is not standard car hire. Curated vehicles, delivered with 
              intention and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fleet">
                <LuxuryButton variant="hero" size="lg">
                  Explore the Fleet
                </LuxuryButton>
              </Link>
              <Link to="/contact">
                <LuxuryButton variant="heroInverse" size="lg">
                  Begin Your Enquiry
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
            <div>
              <div className="line-accent mb-10" />
              <h2 className="text-headline text-foreground mb-8">
                Luxury is not loud
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                It is confident. Considered. Intentional.
              </p>
              <p className="text-body text-muted-foreground mb-10">
                Every vehicle in our collection is handpicked for its character. 
                Every detail of your experience, thoughtfully considered. From 
                enquiry to return — seamless, discreet, effortless.
              </p>
              <Link to="/about">
                <LuxuryButton variant="subtle" size="default">
                  Our Story
                </LuxuryButton>
              </Link>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <img
                src={interiorImage}
                alt="Refined interior details"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="section-padding bg-secondary/20">
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
              <LuxuryButton variant="subtle" size="sm">
                View All →
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

      {/* Who We Cater To */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-caption text-muted-foreground mb-4">
              Our Clients
            </p>
            <h2 className="text-headline text-foreground mb-8">
              Who We Serve
            </h2>
            <p className="text-body text-muted-foreground">
              Executives, travellers, and those who appreciate the 
              finer details.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {clientSegments.map((segment, index) => (
              <div 
                key={segment.title}
                className="p-10 border border-border/40 hover:border-border/80 transition-colors duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-serif text-xl font-medium text-foreground mb-4">
                  {segment.title}
                </h3>
                <p className="text-body text-muted-foreground">
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
