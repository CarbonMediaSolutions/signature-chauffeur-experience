import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { PricingSummary } from "@/components/booking/PricingSummary";
import { useVehicle } from "@/hooks/useVehicles";
import { useUnavailableDates } from "@/hooks/useAvailability";
import { ArrowLeft, Users, Fuel, Settings, Briefcase, Loader2 } from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: vehicle, isLoading } = useVehicle(id || "");
  const { data: unavailableDates = [] } = useUnavailableDates(id || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding container-luxury flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

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
    { icon: Settings, label: "Transmission", value: vehicle.transmission || "Automatic" },
    { icon: Users, label: "Seats", value: vehicle.seats?.toString() || "4" },
    { icon: Fuel, label: "Engine", value: vehicle.engine || "Petrol" },
    { icon: Briefcase, label: "Category", value: vehicle.category },
  ];

  const handleBookNow = () => {
    if (dateRange?.from && dateRange?.to) {
      const params = new URLSearchParams({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      });
      navigate(`/checkout/${vehicle.id}?${params.toString()}`);
    }
  };

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
              
              {vehicle.limited_availability && (
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
              {vehicle.why_we_chose && (
                <div className="mt-12">
                  <h3 className="font-serif text-xl font-medium text-foreground mb-4">
                    Why We Chose This Vehicle
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {vehicle.why_we_chose}
                  </p>
                </div>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-serif text-xl font-medium text-foreground mb-4">
                    Features
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-[120px] p-8 bg-secondary/50 border border-border">
                <p className="text-caption text-muted-foreground tracking-luxury mb-2">
                  Starting From
                </p>
                <p className="text-3xl font-serif font-medium text-foreground mb-1">
                  R{vehicle.daily_rate.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  per day
                </p>

                {/* Date Picker */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">Select Dates</p>
                  <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    unavailableDates={unavailableDates}
                  />
                </div>

                {/* Pricing Summary */}
                {dateRange?.from && dateRange?.to && (
                  <PricingSummary
                    dailyRate={vehicle.daily_rate}
                    dateRange={dateRange}
                    className="mb-6"
                  />
                )}

                <div className="space-y-3">
                  <LuxuryButton
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={handleBookNow}
                    disabled={!dateRange?.from || !dateRange?.to}
                  >
                    {dateRange?.from && dateRange?.to ? "Book Now" : "Select Dates to Book"}
                  </LuxuryButton>
                  
                  <Link to={`/contact?vehicle=${vehicle.id}`} className="block">
                    <LuxuryButton variant="outline" size="lg" className="w-full">
                      Enquire Instead
                    </LuxuryButton>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground mt-6 text-center">
                  Hold expires after 15 minutes. Payment via PayFast.
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