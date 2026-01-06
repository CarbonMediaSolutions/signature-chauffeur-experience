import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { EnquiryModal } from "@/components/enquiry/EnquiryModal";
import { MediaGallery } from "@/components/vehicle/MediaGallery";
import { useVehicle } from "@/hooks/useVehicles";
import { useUnavailableDates } from "@/hooks/useAvailability";
import { ArrowLeft, Users, Fuel, Settings, Briefcase, Loader2, MessageCircle } from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const { data: vehicle, isLoading } = useVehicle(id || "");
  const { data: unavailableDates = [] } = useUnavailableDates(id || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

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

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello, I'm interested in hiring the ${vehicle.name}${
        dateRange?.from && dateRange?.to 
          ? ` from ${format(dateRange.from, "d MMM yyyy")} to ${format(dateRange.to, "d MMM yyyy")}`
          : ""
      }. Could you please confirm availability?`
    );
    window.open(`https://wa.me/27000000000?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Back link */}
      <div className="container-luxury pt-8">
        <Link
          to="/fleet"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
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
                  <p className="text-body text-muted-foreground leading-relaxed">
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
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Media Gallery */}
              <MediaGallery
                images={vehicle.gallery_urls || []}
                videos={vehicle.video_urls || []}
                vehicleName={vehicle.name}
              />
            </div>

            {/* Sidebar - Enquiry Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-[120px] p-8 bg-secondary/50 border border-border">
                <p className="text-caption text-muted-foreground tracking-luxury mb-2">
                  Starting From
                </p>
                <p className="text-3xl font-serif font-medium text-foreground mb-1">
                  R{vehicle.daily_rate.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  per day
                </p>

                {/* Date Picker */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Preferred Dates
                  </p>
                  <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    unavailableDates={unavailableDates}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Optional – we can discuss dates in your enquiry.
                  </p>
                </div>

                {/* Date Summary */}
                {dateRange?.from && dateRange?.to && (
                  <div className="py-4 border-y border-border mb-6">
                    <p className="text-sm text-muted-foreground">
                      {format(dateRange.from, "d MMM")} – {format(dateRange.to, "d MMM yyyy")}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <LuxuryButton
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Enquire About This Vehicle
                  </LuxuryButton>
                  
                  <LuxuryButton 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Request Availability
                  </LuxuryButton>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-3"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact via WhatsApp
                  </button>
                </div>

                <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
                  Every enquiry is personally reviewed to ensure a seamless, tailored experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        vehicle={{
          id: vehicle.id,
          name: vehicle.name,
          image: vehicle.image,
        }}
        dateRange={dateRange}
      />
    </Layout>
  );
};

export default VehicleDetail;
