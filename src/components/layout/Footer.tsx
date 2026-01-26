import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import logo from "@/assets/logo.png";

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
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                alt="Signature Car Rentals" 
                className="h-16 md:h-20 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="mt-6 text-body text-primary-foreground/70 max-w-md">
              Bespoke luxury vehicle hire in Cape Town. Every detail considered, 
              every experience curated with intention.
            </p>
            <div className="mt-8">
              <p className="text-caption text-primary-foreground/50 tracking-luxury">
                Cape Town, South Africa
              </p>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-caption text-primary-foreground/50 tracking-luxury mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="text-caption text-primary-foreground/50 tracking-luxury mb-6">
              Information
            </h4>
            <ul className="space-y-4">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Signature Car Rentals. All rights reserved. Website made with love by{" "}
            <a
              href="https://carbonmediasolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors duration-300"
            >
              Carbon Media Solutions
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/signaturecarrentals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/signaturecarrentals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
