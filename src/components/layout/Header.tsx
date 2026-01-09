import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Fleet", href: "/fleet" },
  { name: "Process", href: "/process" },
  { name: "List Your Vehicle", href: "/list-vehicle" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md shadow-sm border-b border-border/30">
      <nav className="container-luxury flex items-center justify-between py-5">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Signature Car Rentals" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-light tracking-wide transition-colors duration-300",
                location.pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <Link
          to="/contact"
          className="hidden lg:block text-sm font-light tracking-wide border border-foreground/20 px-6 py-2.5 rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
        >
          Enquire
        </Link>

        {/* Mobile: Enquire button + Menu button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            to="/contact"
            className="text-xs font-light tracking-wide border border-foreground/20 px-4 py-2 rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
          >
            Enquire Now
          </Link>
          <button
            type="button"
            className="p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Fixed full-screen overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[60] transition-all duration-300",
          mobileMenuOpen ? "visible" : "invisible pointer-events-none"
        )}
        style={{ backgroundColor: mobileMenuOpen ? '#FAF8F5' : 'transparent' }}
      >
        {/* Overlay header with logo and close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src={logo} alt="Signature Car Rentals" className="h-12 w-auto" />
          </Link>
          <button
            type="button"
            className="p-2 -mr-2"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items */}
        <div className="container-luxury py-10 flex flex-col gap-8">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-2xl font-serif font-medium transition-all duration-300",
                location.pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground",
                mobileMenuOpen && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 text-center text-sm font-light tracking-wide border border-foreground/20 px-6 py-4 rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  );
};
