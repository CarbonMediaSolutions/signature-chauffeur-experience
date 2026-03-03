import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { usePageContent, getContent, getJsonContent } from "@/hooks/usePageContent";

import lifestyleBusiness from "@/assets/lifestyle-business.jpg";
import lifestyleCelebration from "@/assets/lifestyle-celebration.jpg";
import lifestyleCoastalDrive from "@/assets/lifestyle-coastal-drive.jpg";
import capeTownRoad from "@/assets/cape-town-road.jpg";

const defaultImages = [lifestyleBusiness, lifestyleCelebration, lifestyleCoastalDrive, capeTownRoad];

const defaultSteps = [
  { number: "01", title: "Enquire", description: "Browse our curated fleet and submit an enquiry for your Signature vehicle. Every request is personally reviewed to ensure availability and suitability." },
  { number: "02", title: "Confirm", description: "We connect with you to finalise details, confirm availability, and handle all documentation with clarity and ease." },
  { number: "03", title: "Receive", description: "Your vehicle is professionally prepared and delivered or collected at your chosen location, ready to enjoy." },
  { number: "04", title: "Live the Dream", description: "Experience the journey at your own pace. At the end of your rental, return or collection is arranged seamlessly." },
];

const Process = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { data: content } = usePageContent("process");

  const steps = getJsonContent(content, "process.steps", defaultSteps);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => { setCurrent(api.selectedScrollSnap()); });
  }, [api]);

  const scrollTo = useCallback((index: number) => { api?.scrollTo(index); }, [api]);

  return (
    <Layout>
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury text-center">
          <p className="text-caption text-muted-foreground mb-4 tracking-[0.2em]">{getContent(content, "process.hero.label", "RENTAL PROCESS")}</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">{getContent(content, "process.hero.heading", "Luxury Made Effortless")}</h1>
          <p className="text-body-lg text-muted-foreground">{getContent(content, "process.hero.subheading", "How It Works")}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury">
          <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {steps.map((step: any, index: number) => (
                <CarouselItem key={step.number}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-sm">
                      <img src={defaultImages[index] || defaultImages[0]} alt={step.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 tracking-widest">{step.number} / {String(steps.length).padStart(2, "0")}</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">{step.title}</h2>
                    <p className="text-body text-muted-foreground max-w-lg">{step.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
            <CarouselNext className="right-0 md:-right-12 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
          </Carousel>
          <div className="flex justify-center gap-2 mt-8">
            {steps.map((_: any, index: number) => (
              <button key={index} onClick={() => scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index ? "bg-foreground w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} aria-label={`Go to step ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${lifestyleCoastalDrive})` }} />
        <div className="absolute inset-0 bg-[hsl(var(--charcoal))]/85" />
        <div className="relative container-luxury text-center max-w-3xl mx-auto text-white">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-8 italic">
            "{getContent(content, "process.philosophy.quote", "More than a process. A feeling.")}"
          </h2>
          <div className="space-y-6 text-white/70">
            <p className="text-body-lg">{getContent(content, "process.philosophy.paragraph_1", "From first enquiry to final handover, everything we do is guided by care, intention, and respect - for you, for the car, and for the moment you're stepping into.")}</p>
            <p className="text-body">{getContent(content, "process.philosophy.paragraph_2", "This isn't about ticking boxes or moving quickly. It's about creating an experience that feels considered, personal, and worthy of what the car represents.")}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">Ready to Begin?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"><LuxuryButton variant="hero" size="lg">Book Now</LuxuryButton></Link>
            <Link to="/terms"><LuxuryButton variant="outline" size="lg">View Rental Terms</LuxuryButton></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Process;
