import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { SpecialsCarousel } from "@/components/home/SpecialsCarousel";
import { MissionIcons } from "@/components/home/MissionIcons";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import heroImage from "@/assets/hero-home.webp";
import logo from "@/assets/logo.png";
const Index = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury vehicle on Cape Town coastal road" className="w-full h-full object-cover" width={1920} height={1080} fetchPriority="high" />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        
        <div className="relative container-luxury py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0 animate-fade-in-up">
            {/* Logo above headline */}
            <div className="mb-8 flex justify-center md:justify-start">
              <img src={logo} alt="Signature Car Rentals" className="h-20 md:h-28 lg:h-32 w-auto brightness-0 invert" width={300} height={96} />
            </div>
            <h1 className="text-display text-primary-foreground mb-6 tracking-tight">
              <span className="block mx-0 px-0 ml-0 mr-0">DREAM IT.</span>
              <span className="block">DRIVE IT.</span>
              <span className="block">LIVE IT.</span>
            </h1>
            <p className="font-serif text-lg md:text-xl lg:text-2xl text-primary-foreground/80 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              <span className="block">Luxury Car Rental</span>
              <span className="block">created for moments that matter.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/contact" className="w-full sm:w-[220px]">
                <LuxuryButton variant="hero" size="lg" className="w-full">
                  Book Now
                </LuxuryButton>
              </Link>
              <Link to="/fleet" className="w-full sm:w-[220px]">
                <LuxuryButton variant="heroInverse" size="lg" className="w-full">
                  Explore Your Dream Ride
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Icons - What makes us special */}
      <MissionIcons />

      {/* Featured Cars Carousel */}
      <FeaturedCarousel />

      {/* Special Offers Carousel */}
      <SpecialsCarousel />

      {/* How It Works Steps - Swipeable on mobile */}
      <HowItWorks />

      {/* Testimonials - Social Proof */}
      <Testimonials />

      {/* Mission Statement - Full Width */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Background" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="relative container-luxury text-center max-w-4xl mx-auto">
          <p className="text-caption text-primary-foreground/60 mb-6 tracking-[0.25em]">
            Our Mission
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-relaxed">
            "Our mission is to transform luxury car rental into an <span className="text-brass">experience</span>. One that inspires confidence, ambition, and belief."
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <h2 className="text-headline text-foreground mb-8">
            Begin your Signature experience
          </h2>
          <p className="text-body-lg text-muted-foreground mb-12">
            Our team will personally guide you to the perfect vehicle.
          </p>
          <Link to="/contact">
            <LuxuryButton variant="default" size="xl">
              Start Your Booking
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>;
};
export default Index;