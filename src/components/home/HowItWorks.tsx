import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { usePageContent, getContent, getJsonContent } from "@/hooks/usePageContent";

const defaultSteps = [
  { number: "01", title: "Enquire", description: "Browse & submit your request" },
  { number: "02", title: "Confirm", description: "We handle the details" },
  { number: "03", title: "Receive", description: "Delivered to your door" },
  { number: "04", title: "Drive", description: "Enjoy the experience" },
];

export const HowItWorks = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: content } = usePageContent("home");

  const steps = getJsonContent(content, "home.howitworks.steps", defaultSteps);
  const heading = getContent(content, "home.howitworks.heading", "Four Simple Steps");

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-20 bg-charcoal text-primary-foreground">
      <div className="container-luxury">
        <p className="text-caption text-primary-foreground/60 mb-4 tracking-[0.25em] text-center">HOW IT WORKS</p>
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-10 md:mb-14">{heading}</h2>
        
        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {steps.map((step: any) => (
                <div key={step.number} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="text-center py-8">
                    <span className="block font-serif text-5xl text-brass mb-4">{step.number}</span>
                    <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                    <p className="text-base text-primary-foreground/60">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6 mb-10">
            {steps.map((_: any, index: number) => (
              <button key={index} onClick={() => scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-brass w-6" : "bg-primary-foreground/30"}`} aria-label={`Go to step ${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-14">
          {steps.map((step: any) => (
            <div key={step.number} className="text-center">
              <span className="block font-serif text-3xl md:text-4xl text-brass mb-3">{step.number}</span>
              <h3 className="font-serif text-lg md:text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-primary-foreground/60">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/contact"><LuxuryButton variant="hero" size="lg">Start Your Booking</LuxuryButton></Link>
        </div>
      </div>
    </section>
  );
};
