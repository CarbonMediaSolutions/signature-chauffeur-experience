import { Link } from "react-router-dom";
import { useVehicles } from "@/hooks/useVehicles";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Loader2 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { VehicleCard } from "@/components/fleet/VehicleCard";

export const FeaturedCarousel = () => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const featuredVehicles = vehicles.filter(v => v.featured) || vehicles.slice(0, 6);
  const displayVehicles = featuredVehicles.length > 0 ? featuredVehicles : vehicles.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="container-luxury">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    );
  }

  if (displayVehicles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-caption text-muted-foreground mb-2 tracking-[0.25em]">
              HOT PICKS
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              Featured Cars
            </h2>
          </div>
          <Link to="/fleet">
            <LuxuryButton variant="default" size="default">
              View All Cars
            </LuxuryButton>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {displayVehicles.map((vehicle, index) => (
              <CarouselItem key={vehicle.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <VehicleCard vehicle={vehicle} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-background border-border hover:bg-muted" />
          <CarouselNext className="hidden md:flex -right-4 bg-background border-border hover:bg-muted" />
        </Carousel>
      </div>
    </section>
  );
};
