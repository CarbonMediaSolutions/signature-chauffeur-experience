import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { WhatsAppEnquiry } from "@/components/enquiry/WhatsAppEnquiry";

import { useVehicle } from "@/hooks/useVehicles";
import { useUnavailableDates } from "@/hooks/useAvailability";
import { ArrowLeft, Loader2, Play, Gauge, Zap, Car, Users, Settings, Calendar, Shield, Route } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const VehicleDetail = () => {
  const { id } = useParams();
  const { data: vehicle, isLoading } = useVehicle(id || "");
  const { data: unavailableDates = [] } = useUnavailableDates(id || "");

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

  // Cast to any to access new fields until types are regenerated
  const v = vehicle as any;

  const vehicleSpecs = [
    { icon: Settings, label: "Engine", value: vehicle.engine || "—" },
    { icon: Zap, label: "Acceleration", value: v.acceleration || "—" },
    { icon: Gauge, label: "Top Speed", value: v.top_speed || "—" },
    { icon: Users, label: "Seats & Doors", value: `${vehicle.seats || "—"} and ${v.doors || "—"}` },
    { icon: Car, label: "Transmission", value: vehicle.transmission || "—" },
  ];

  const rentalInfo = [
    { icon: Shield, label: "Security Deposit", value: vehicle.security_deposit ? `R${vehicle.security_deposit.toLocaleString()}` : "—" },
    { 
      icon: Route, 
      label: "Mileage Allowance", 
      value: vehicle.mileage_limit 
        ? `${vehicle.mileage_limit}${v.excess_mileage_rate ? `, thereafter R${v.excess_mileage_rate}/km` : ""}`
        : "—" 
    },
    { icon: Shield, label: "Max Liability (Accident)", value: vehicle.insurance_excess ? `R${vehicle.insurance_excess.toLocaleString()}` : "—" },
    { icon: Calendar, label: "Minimum Rental", value: v.minimum_rental_days ? `${v.minimum_rental_days} Day${v.minimum_rental_days > 1 ? "s" : ""}` : "1 Day" },
  ];

  // Resolve best available image for fallback
  const heroImage = 
    vehicle.cover_image_url || 
    (vehicle.gallery_urls && vehicle.gallery_urls.length > 0 ? vehicle.gallery_urls[0] : null) || 
    vehicle.image;

  // Get hero video: prioritize hero_video_url, then fall back to first video_urls entry
  const heroVideoUrl = v.hero_video_url || 
    (vehicle.video_urls && vehicle.video_urls.length > 0 ? vehicle.video_urls[0] : null);

  // Convert YouTube/Vimeo URL to embed URL with autoplay
  const getEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&rel=0`;
    }
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`;
    }
    return url;
  };

  // Gallery images for carousel
  const galleryImages = vehicle.gallery_urls || [];

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

      {/* Hero Video / Image */}
      <section className="section-padding-sm">
        <div className="container-luxury">
          <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted rounded-sm relative">
            {heroVideoUrl ? (
              <iframe
                src={getEmbedUrl(heroVideoUrl)}
                title={`${vehicle.name} video`}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 0 }}
              />
            ) : (
              <div className="relative w-full h-full group">
                <img
                  src={heroImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                {/* Video placeholder overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-foreground ml-1" />
                  </div>
                </div>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-wide">
                  Video Coming Soon
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Carousel Gallery */}
      {galleryImages.length > 0 && (
        <section className="pb-8">
          <div className="container-luxury">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="aspect-[4/3] overflow-hidden bg-muted rounded-sm">
                      <img
                        src={image}
                        alt={`${vehicle.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </section>
      )}

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

              {/* Specs & Rental Info Grid */}
              <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-border">
                {/* Vehicle Specifications */}
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                    Vehicle Specifications
                  </h3>
                  <div className="space-y-4">
                    {vehicleSpecs.map((spec) => (
                      <div key={spec.label} className="flex items-center gap-3">
                        <spec.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <div className="flex justify-between w-full border-b border-border/50 pb-2">
                          <span className="text-sm text-muted-foreground">{spec.label}</span>
                          <span className="text-sm font-medium text-foreground">{spec.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rental Information */}
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                    Rental Information
                  </h3>
                  <div className="space-y-4">
                    {rentalInfo.map((info) => (
                      <div key={info.label} className="flex items-center gap-3">
                        <info.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <div className="flex justify-between w-full border-b border-border/50 pb-2">
                          <span className="text-sm text-muted-foreground">{info.label}</span>
                          <span className="text-sm font-medium text-foreground">{info.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
            </div>

            {/* Sidebar - WhatsApp Enquiry Panel */}
            <div className="lg:col-span-1">
              <WhatsAppEnquiry
                vehicleName={vehicle.name}
                dailyRate={vehicle.daily_rate}
                unavailableDates={unavailableDates}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VehicleDetail;
