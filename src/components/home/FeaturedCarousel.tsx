import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "@/hooks/useVehicles";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

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
          <Link 
            to="/fleet"
            className="text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            View All →
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
            {displayVehicles.map((vehicle) => (
              <CarouselItem key={vehicle.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link 
                  to={`/fleet/${vehicle.slug || vehicle.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted mb-4">
                    <img
                      src={vehicle.cover_image_url || vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {vehicle.featured && (
                      <div className="absolute top-3 left-3 bg-brass text-charcoal text-xs font-medium px-2 py-1 rounded-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-foreground group-hover:text-brass transition-colors mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      From R{vehicle.daily_rate.toLocaleString()} / day
                    </p>
                  </div>
                </Link>
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
