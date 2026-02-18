import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useVehicles } from "@/hooks/useVehicles";
import { siteConfig } from "@/lib/siteConfig";
import { PhoneInput } from "@/components/ui/phone-input";
import { supabase } from "@/integrations/supabase/client";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

const enquiryTypes = [
  "Self-Drive Rental",
  "Chauffeur Service",
  "Events (Matric Ball, Music Videos, Corporate Functions)",
  "List Your Vehicle for Investment",
];

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { data: fleetVehicles = [] } = useVehicles();
  const preselectedVehicle = searchParams.get("vehicle");
  const vehicle = preselectedVehicle
    ? fleetVehicles.find((v) => v.id === preselectedVehicle)
    : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+27 ",
    enquiryType: vehicle ? "Vehicle Rental" : "",
    preferredVehicle: vehicle?.name || "",
    startDate: "",
    endDate: "",
    message: "",
    referralSource: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-enquiry", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Enquiry Submitted",
        description: "Thank you for your enquiry. Our team will respond within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "+27 ",
        enquiryType: "",
        preferredVehicle: "",
        startDate: "",
        endDate: "",
        message: "",
        referralSource: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData({ ...formData, phone: value })}
                      required
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
                        {fleetVehicles.map((v) => (
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

                    <div>
                      <label className="block text-sm text-foreground mb-2">
                        How did you hear about Signature Car Rentals? *
                      </label>
                      <select
                        required
                        value={formData.referralSource}
                        onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-foreground outline-none transition-colors text-foreground"
                      >
                        <option value="">Select an option</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Referred by a friend / client">Referred by a friend / client</option>
                        <option value="Referred by a partner / business">Referred by a partner / business</option>
                        <option value="Saw one of your cars in person">Saw one of your cars in person</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <LuxuryButton type="submit" variant="default" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit Enquiry"}
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

                {/* Newsletter Signup */}
                <NewsletterSignup variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
