import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ListVehicle = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submission Received",
      description: "Thank you for your interest. Our team will review your submission and be in touch shortly.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      message: "",
    });
  };

  const services = [
    { 
      title: "Client Screening & Approval", 
      desc: "Every potential renter is carefully vetted. We select clients who respect and appreciate exceptional vehicles." 
    },
    { 
      title: "Professional Presentation", 
      desc: "Your vehicle is presented with refined photography and compelling copy that reflects its true character." 
    },
    { 
      title: "Full Rental Administration", 
      desc: "Contracts, communications, and coordination — every detail managed with precision on your behalf." 
    },
    { 
      title: "Secure Handovers & Returns", 
      desc: "Personal handovers with full familiarisation. Your vehicle is collected and returned with the utmost care." 
    },
    { 
      title: "Pre & Post-Rental Inspections", 
      desc: "Thorough inspections before and after every rental ensure your vehicle remains in impeccable condition." 
    },
    { 
      title: "Transparent Reporting", 
      desc: "Regular updates on bookings, performance, and earnings. Complete visibility, no surprises." 
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background border-b border-border/30">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground mb-4">
              For Vehicle Owners · Cape Town
            </p>
            <h1 className="text-display text-foreground mb-8">
              Partner With Signature
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Own a luxury or performance vehicle? We offer complete concierge 
              management for a curated selection of exceptional cars — not a 
              marketplace, but a partnership built on trust, discretion, and care.
            </p>
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="section-padding bg-secondary/20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-headline text-foreground mb-10">
                What We Handle
              </h2>
              <p className="text-body text-muted-foreground mb-8">
                When you partner with Signature, you gain a dedicated team 
                that treats your vehicle as if it were their own. Every detail 
                is managed with intention and care.
              </p>
              
              {/* Who This Is For */}
              <div className="border-t border-border/50 pt-8">
                <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                  Who This Is For
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">—</span>
                    <span>Owners who want to offset the costs of ownership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">—</span>
                    <span>Those who prefer not to manage rentals themselves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">—</span>
                    <span>Individuals who value discretion and careful handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">—</span>
                    <span>Owners who want their vehicle represented to the right clientele</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              {services.map((item) => (
                <div key={item.title} className="border-l border-accent pl-6 py-2">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-headline text-foreground mb-4">
                Submit Your Vehicle
              </h2>
              <p className="text-body text-muted-foreground">
                Interested in listing your vehicle with Signature? Share your details 
                and our team will be in touch to discuss suitability and next steps. 
                This is a curated partnership — not every vehicle is accepted.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Vehicle Make *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Porsche"
                    value={formData.vehicleMake}
                    onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 911 Carrera"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2023"
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">
                  Additional Information
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your vehicle, its condition, current mileage, and your expectations..."
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              <div className="pt-4">
                <LuxuryButton type="submit" variant="default" size="lg" className="w-full md:w-auto">
                  Submit for Consideration
                </LuxuryButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ListVehicle;
