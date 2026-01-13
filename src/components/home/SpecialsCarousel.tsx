import { Link } from "react-router-dom";
import { useActiveSpecials } from "@/hooks/useSpecials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export const SpecialsCarousel = () => {
  const { data: specials, isLoading } = useActiveSpecials();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  if (isLoading || !specials || specials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Special Offers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exclusive deals and seasonal promotions for your next luxury experience
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {specials.map((special) => (
              <CarouselItem
                key={special.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-card border border-border rounded-sm overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  {/* Image */}
                  {special.image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={special.image_url}
                        alt={special.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category Tag */}
                    <Badge
                      variant="secondary"
                      className="self-start mb-3 bg-primary/10 text-primary border-primary/20 uppercase text-xs tracking-wider"
                    >
                      {special.category_tag}
                    </Badge>

                    {/* Title */}
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      {special.title}
                    </h3>

                    {/* Description */}
                    {special.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {special.description}
                      </p>
                    )}

                    {/* CTA Button */}
                    <Link to={special.cta_link} className="mt-auto">
                      <LuxuryButton variant="outline" className="w-full">
                        {special.cta_text}
                      </LuxuryButton>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {specials.length > 1 && (
            <>
              <CarouselPrevious className="hidden md:flex -left-12 bg-background border-border hover:bg-muted" />
              <CarouselNext className="hidden md:flex -right-12 bg-background border-border hover:bg-muted" />
            </>
          )}
        </Carousel>

        {/* Dot indicators for mobile */}
        {specials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {specials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
