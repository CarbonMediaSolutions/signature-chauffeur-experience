import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

// Fallback testimonials when no 5-star Google reviews are available
const fallbackTestimonials = [
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

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  isGoogle?: boolean;
  profilePhoto?: string | null;
}

// Google "G" icon component
const GoogleIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-4 h-4 inline-block ml-1.5"
    aria-label="Google Review"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Star rating display
const StarRating = () => (
  <div className="flex justify-center gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-brass text-brass" />
    ))}
  </div>
);

export const Testimonials = () => {
  const { data: googleReviews, isLoading } = useGoogleReviews();
  
  // Transform Google reviews to testimonial format
  const testimonials: Testimonial[] = useMemo(() => {
    if (googleReviews && googleReviews.length > 0) {
      return googleReviews.map((review) => ({
        quote: review.text,
        name: review.author_name,
        title: "Google Review",
        isGoogle: true,
        profilePhoto: review.profile_photo_url,
      }));
    }
    // Fall back to hardcoded testimonials
    return fallbackTestimonials.map((t) => ({ ...t, isGoogle: false }));
  }, [googleReviews]);

  const hasGoogleReviews = googleReviews && googleReviews.length > 0;

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

  const TestimonialCard = ({ testimonial, centered = false }: { testimonial: Testimonial; centered?: boolean }) => (
    <div className={`bg-background rounded-sm p-6 md:p-8 ${centered ? 'text-center' : 'text-center'}`}>
      {testimonial.isGoogle ? (
        <StarRating />
      ) : (
        <Quote className="w-6 h-6 md:w-8 md:h-8 text-brass mx-auto mb-4 md:mb-6" />
      )}
      <blockquote className="font-serif text-sm md:text-base text-foreground italic mb-4 md:mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center justify-center gap-2">
        {testimonial.profilePhoto && (
          <img 
            src={testimonial.profilePhoto} 
            alt={testimonial.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-medium text-foreground inline-flex items-center">
            {testimonial.name}
            {testimonial.isGoogle && <GoogleIcon />}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em] text-center">
            CLIENT EXPERIENCES
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-10 md:mb-14">
            What Our Clients Say
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse bg-muted rounded-sm w-64 h-48" />
          </div>
        </div>
      </section>
    );
  }

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

        {/* Google attribution (required by TOS) */}
        {hasGoogleReviews && (
          <p className="text-center text-xs text-muted-foreground mt-8">
            Reviews from Google
          </p>
        )}
      </div>
    </section>
  );
};
