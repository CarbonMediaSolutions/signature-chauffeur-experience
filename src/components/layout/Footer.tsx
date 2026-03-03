import { Link } from "react-router-dom";
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { usePageContent, getContent } from "@/hooks/usePageContent";

const footerLinks = {
  explore: [
    { name: "Our Fleet", href: "/fleet" },
    { name: "About Us", href: "/about" },
    { name: "Rental Process", href: "/process" },
    { name: "Contact", href: "/contact" },
  ],
  information: [
    { name: "Rental Terms", href: "/terms" },
    { name: "FAQ", href: "/faq" },
    { name: "List Your Vehicle", href: "/list-vehicle" },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { data: content } = usePageContent("footer");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      if (window.klaviyo) {
        window.klaviyo.identify({ email: email, $consent: ["email"] });
        window.klaviyo.track("Newsletter Signup", { source: "footer", page: window.location.pathname });
      }
      setIsSuccess(true);
      toast({ title: "Welcome to the List", description: "You'll be the first to know about exclusive offers." });
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Signature Car Rentals" className="h-16 md:h-20 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-6 text-body text-primary-foreground/70 max-w-md">
              {getContent(content, "footer.tagline", "Bespoke luxury vehicle hire in Cape Town. Every detail considered, every experience curated with intention.")}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-6">
              <p className="text-sm text-primary-foreground/70 mb-3">Subscribe for exclusive offers</p>
              <div className="flex gap-2 max-w-sm">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" disabled={isLoading} className="flex-1 px-3 py-2 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:border-primary-foreground/50 outline-none transition-colors" />
                <button type="submit" disabled={isLoading || isSuccess} className="px-4 py-2 bg-primary-foreground text-primary text-sm font-medium hover:bg-primary-foreground/90 transition-colors disabled:opacity-50">
                  {isSuccess ? "✓" : isLoading ? "..." : "Join"}
                </button>
              </div>
            </form>
            <div className="mt-6">
              <p className="text-caption text-primary-foreground/50 tracking-luxury">
                {getContent(content, "footer.location", "Cape Town, South Africa")}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-caption text-primary-foreground/50 tracking-luxury mb-6">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}><Link to={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-caption text-primary-foreground/50 tracking-luxury mb-6">Information</h4>
            <ul className="space-y-4">
              {footerLinks.information.map((link) => (
                <li key={link.name}><Link to={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Signature Car Rentals. All rights reserved. Website made with love by{" "}
            <a href="https://carbonmediasolutions.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors duration-300">Carbon Media Solutions</a>
          </p>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/signature_car_rental?igsh=MXJxYWxuZnlpc2Jycw==" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/share/1DuB6RTeRk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
            <a href={`https://wa.me/${siteConfig.whatsapp.number}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300">WhatsApp</a>
            <a href={`mailto:${siteConfig.contact.email}`} className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
