import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { SpecialsCarousel } from "@/components/home/SpecialsCarousel";
import { MissionIcons } from "@/components/home/MissionIcons";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import heroImage from "@/assets/hero-home.webp";
import logo from "@/assets/logo.png";
import { usePageContent, getContent } from "@/hooks/usePageContent";

const Index = () => {
  const { data: content } = usePageContent("home");

  return (
    <Layout>
      <h1 className="sr-only">
        Luxury Car Rental Cape Town - Premium Vehicle Hire | Signature Car Rentals
      </h1>

      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury vehicle on Cape Town coastal road" className="w-full h-full object-cover" width={1920} height={1080} fetchPriority="high" />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        <div className="relative container-luxury py-24 md:py-32">
          <div className="max-w-3xl text-left ml-0 md:ml-0 animate-fade-in-up">
            <div className="mb-8 flex justify-center md:justify-start">
              <img src={logo} alt="Signature Car Rentals" className="h-20 md:h-28 lg:h-32 w-auto brightness-0 invert" width={300} height={96} />
            </div>
            <p className="text-display text-primary-foreground mb-6 tracking-tight" aria-hidden="true">
              <span className="block mx-0 px-0 ml-0 mr-0">{getContent(content, "home.hero.tagline_1", "DREAM IT.")}</span>
              <span className="block">{getContent(content, "home.hero.tagline_2", "DRIVE IT.")}</span>
              <span className="block">{getContent(content, "home.hero.tagline_3", "LIVE IT.")}</span>
            </p>
            <p className="font-serif text-lg md:text-xl lg:text-2xl text-primary-foreground/80 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              <span className="block">{getContent(content, "home.hero.subtitle_1", "Luxury Car Rental")}</span>
              <span className="block">{getContent(content, "home.hero.subtitle_2", "created for moments that matter.")}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/contact" className="w-full sm:w-[260px]">
                <LuxuryButton variant="hero" size="lg" className="w-full whitespace-nowrap">
                  {getContent(content, "home.hero.cta_primary", "Book Now")}
                </LuxuryButton>
              </Link>
              <Link to="/fleet" className="w-full sm:w-[260px]">
                <LuxuryButton variant="heroInverse" size="lg" className="w-full whitespace-nowrap">
                  {getContent(content, "home.hero.cta_secondary", "Explore Your Dream Ride")}
                </LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MissionIcons />
      <FeaturedCarousel />
      <SpecialsCarousel />
      <HowItWorks />
      <Testimonials />

      {/* Mission Statement */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Background" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="relative container-luxury text-center max-w-4xl mx-auto">
          <p className="text-caption text-primary-foreground/60 mb-6 tracking-[0.25em]">{getContent(content, "home.mission.label", "Our Mission")}</p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-relaxed">
            "{getContent(content, "home.mission.quote", "Our mission is to transform luxury car rental into an experience. One that inspires confidence, ambition, and belief.")}"
          </blockquote>
        </div>
      </section>

      <NewsletterSignup />

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <h2 className="text-headline text-foreground mb-8">{getContent(content, "home.cta.heading", "Begin your Signature experience")}</h2>
          <p className="text-body-lg text-muted-foreground mb-12">{getContent(content, "home.cta.subheading", "Our team will personally guide you to the perfect vehicle.")}</p>
          <Link to="/contact">
            <LuxuryButton variant="default" size="xl">
              {getContent(content, "home.cta.button", "Start Your Booking")}
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};
export default Index;
