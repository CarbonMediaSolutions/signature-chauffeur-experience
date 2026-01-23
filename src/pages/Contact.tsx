import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { vehicles } from "@/data/fleet";
import { siteConfig } from "@/lib/siteConfig";

const enquiryTypes = [
  "Self-Drive Rental",
  "Chauffeur Service",
  "Events",
  "List Your Vehicle for Investment",
];

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const preselectedVehicle = searchParams.get("vehicle");
  const vehicle = preselectedVehicle
    ? vehicles.find((v) => v.id === preselectedVehicle)
    : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: vehicle ? "Vehicle Rental" : "",
    preferredVehicle: vehicle?.name || "",
    startDate: "",
    endDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted",
      description: "Thank you for your enquiry. Our team will respond within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      enquiryType: "",
      preferredVehicle: "",
      startDate: "",
      endDate: "",
      message: "",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding-sm bg-background border-b border-border/30">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground mb-4">
              Get in Touch
            </p>
            <h1 className="text-display text-foreground mb-8">
              Begin Your Enquiry
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Share your requirements and our team will personally guide you 
              to the perfect vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-6">
                    Your Details
                  </h3>
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
                  <div className="mt-6">
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
                </div>

                {/* Enquiry Details */}
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-6">
                    Enquiry Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-foreground mb-2">
                        Enquiry Type *
                      </label>
                      <select
                        required
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-foreground outline-none transition-colors text-foreground"
                      >
                        <option value="">Select an option</option>
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">
                        Preferred Vehicle (if any)
                      </label>
                      <select
                        value={formData.preferredVehicle}
                        onChange={(e) => setFormData({ ...formData, preferredVehicle: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-foreground outline-none transition-colors text-foreground"
                      >
                        <option value="">No preference / Not sure yet</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-foreground mb-2">
                          Preferred Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-foreground mb-2">
                          Preferred End Date
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your requirements, preferences, or any special requests..."
                        className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <LuxuryButton type="submit" variant="default" size="lg">
                    Submit Enquiry
                  </LuxuryButton>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
            <div className="sticky top-[120px] space-y-10">
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-foreground transition-colors"
                    >
                      WhatsApp: {siteConfig.whatsapp.displayNumber}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We aim to respond to all enquiries within 24 hours during 
                    business days. For urgent requests, please reach out via WhatsApp.
                  </p>
                </div>

                <div className="p-6 bg-secondary/50 border border-border">
                  <p className="text-sm text-muted-foreground italic">
                    "We do not take payments online. All bookings are confirmed 
                    through personal consultation to ensure we match you with 
                    the perfect vehicle."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
