import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "An absolutely seamless experience from start to finish. The car was immaculate and the personal service made all the difference.",
    name: "James M.",
    title: "Business Executive",
  },
  {
    quote: "Signature made our wedding day even more special. The attention to detail was exceptional.",
    name: "Sarah & Michael",
    title: "Wedding Clients",
  },
  {
    quote: "Finally, a car rental experience that matches the quality of the vehicles. Truly first-class service.",
    name: "David L.",
    title: "International Visitor",
  },
  {
    quote: "The team went above and beyond to accommodate our last-minute request. Highly recommend.",
    name: "Amanda K.",
    title: "Event Planner",
  },
];

export const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="py-16 md:py-20 bg-[hsl(35,30%,95%)]">
      <div className="container-luxury">
        <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em] text-center">
          CLIENT EXPERIENCES
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-10 md:mb-14">
          What Our Clients Say
        </h2>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="bg-background rounded-sm p-8 text-center">
                    <Quote className="w-8 h-8 text-brass mx-auto mb-6" />
                    <blockquote className="font-serif text-lg text-foreground italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-brass w-6"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-sm p-6 text-center"
            >
              <Quote className="w-6 h-6 text-brass mx-auto mb-4" />
              <blockquote className="font-serif text-sm text-foreground italic mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <p className="text-sm font-medium text-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {testimonial.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
