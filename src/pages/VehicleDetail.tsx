import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { vehicles } from "@/data/fleet";
import { ArrowLeft, Users, Fuel, Settings, Briefcase } from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <Layout>
        <div className="section-padding container-luxury text-center">
          <h1 className="text-headline text-foreground mb-4">Vehicle Not Found</h1>
          <Link to="/fleet">
            <LuxuryButton variant="subtle">Return to Fleet</LuxuryButton>
          </Link>
        </div>
      </Layout>
    );
  }

  const specs = [
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Users, label: "Seats", value: vehicle.seats.toString() },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuelType },
    { icon: Briefcase, label: "Luggage", value: vehicle.luggageCapacity },
  ];

  return (
    <Layout>
      {/* Back link */}
      <div className="container-luxury pt-8">
        <Link
          to="/fleet"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fleet
        </Link>
      </div>

      {/* Hero Image */}
      <section className="section-padding-sm">
        <div className="container-luxury">
          <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted rounded-sm">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding-sm">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-caption text-muted-foreground tracking-luxury mb-3">
                {vehicle.category}
              </p>
              <h1 className="text-display text-foreground mb-6">
                {vehicle.name}
              </h1>
              
              {vehicle.limitedAvailability && (
                <span className="inline-block text-[10px] tracking-luxury uppercase bg-accent text-accent-foreground px-3 py-1.5 mb-6">
                  Limited Availability
                </span>
              )}
              
              <p className="text-body-lg text-muted-foreground mb-8">
                {vehicle.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <spec.icon className="w-5 h-5 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Why We Chose It */}
              <div className="mt-12">
                <h3 className="font-serif text-xl font-medium text-foreground mb-4">
                  Why We Chose This Vehicle
                </h3>
                <p className="text-body text-muted-foreground">
                  {vehicle.whyWeChoseIt}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[120px] p-8 bg-secondary/50 border border-border">
                <p className="text-caption text-muted-foreground tracking-luxury mb-2">
                  Starting From
                </p>
                <p className="text-3xl font-serif font-medium text-foreground mb-1">
                  R{vehicle.dailyRate.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  per day
                </p>

                <div className="space-y-3">
                  <Link to={`/contact?vehicle=${vehicle.id}`} className="block">
                    <LuxuryButton variant="default" size="lg" className="w-full">
                      Enquire About This Vehicle
                    </LuxuryButton>
                  </Link>
                  <a
                    href={`https://wa.me/27000000000?text=Hi, I'm interested in the ${vehicle.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <LuxuryButton variant="outline" size="lg" className="w-full">
                      WhatsApp Us
                    </LuxuryButton>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground mt-6 text-center">
                  Rates are indicative. Final pricing provided upon enquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VehicleDetail;
