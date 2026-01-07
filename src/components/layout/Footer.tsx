import { Link } from "react-router-dom";

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
              <span className="font-serif text-2xl font-medium tracking-tight">
                Signature
              </span>
              <span className="block text-caption text-primary-foreground/60 tracking-luxury text-[10px] mt-1">
                Car Rentals
              </span>
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
              href="https://wa.me/27000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@signaturecarrentals.co.za"
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
