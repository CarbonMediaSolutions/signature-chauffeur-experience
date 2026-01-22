import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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
  // Mobile carousel with autoplay
  const mobileAutoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  const [mobileRef, mobileApi] = useEmblaCarousel({ loop: true }, [mobileAutoplay.current]);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState(0);

  // Desktop carousel with autoplay (only used when >4 testimonials)
  const desktopAutoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );
  const [desktopRef, desktopApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1 },
    [desktopAutoplay.current]
  );
  const [desktopSelectedIndex, setDesktopSelectedIndex] = useState(0);

  const shouldDesktopScroll = testimonials.length > 4;

  // Mobile carousel callbacks
  const onMobileSelect = useCallback(() => {
    if (!mobileApi) return;
    setMobileSelectedIndex(mobileApi.selectedScrollSnap());
  }, [mobileApi]);

  useEffect(() => {
    if (!mobileApi) return;
    onMobileSelect();
    mobileApi.on("select", onMobileSelect);
    return () => {
      mobileApi.off("select", onMobileSelect);
    };
  }, [mobileApi, onMobileSelect]);

  const scrollToMobile = useCallback(
    (index: number) => {
      if (mobileApi) mobileApi.scrollTo(index);
    },
    [mobileApi]
  );

  // Desktop carousel callbacks
  const onDesktopSelect = useCallback(() => {
    if (!desktopApi) return;
    setDesktopSelectedIndex(desktopApi.selectedScrollSnap());
  }, [desktopApi]);

  useEffect(() => {
    if (!desktopApi || !shouldDesktopScroll) return;
    onDesktopSelect();
    desktopApi.on("select", onDesktopSelect);
    return () => {
      desktopApi.off("select", onDesktopSelect);
    };
  }, [desktopApi, onDesktopSelect, shouldDesktopScroll]);

  const TestimonialCard = ({ testimonial, centered = false }: { testimonial: typeof testimonials[0]; centered?: boolean }) => (
    <div className={`bg-background rounded-sm p-6 md:p-8 ${centered ? 'text-center' : 'text-center'}`}>
      <Quote className="w-6 h-6 md:w-8 md:h-8 text-brass mx-auto mb-4 md:mb-6" />
      <blockquote className="font-serif text-sm md:text-base text-foreground italic mb-4 md:mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>
      <p className="text-sm font-medium text-foreground">
        {testimonial.name}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        {testimonial.title}
      </p>
    </div>
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

        {/* Mobile: Always carousel with autoplay */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={mobileRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <TestimonialCard testimonial={testimonial} centered />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToMobile(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === mobileSelectedIndex
                    ? "bg-brass w-6"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Static grid if ≤4, carousel if >4 */}
        {shouldDesktopScroll ? (
          // Desktop carousel for >4 testimonials
          <div className="hidden md:block">
            <div className="overflow-hidden" ref={desktopRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_25%] min-w-0 px-3">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Minimal dot indicators for desktop carousel */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => desktopApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === desktopSelectedIndex
                      ? "bg-brass w-4"
                      : "bg-muted-foreground/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop static grid for ≤4 testimonials
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
