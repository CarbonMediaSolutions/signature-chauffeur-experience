import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Fleet", href: "/fleet" },
  {
    name: "Process",
    href: "/process",
    children: [
      { name: "How It Works", href: "/process" },
      { name: "Rental Terms", href: "/terms" },
    ],
  },
  { name: "List Your Vehicle", href: "/list-vehicle" },
  { name: "Contact Us", href: "/contact" },
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
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md shadow-sm border-b border-border/30">
      <nav className="container-luxury flex items-center justify-between py-5">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Signature Car Rentals" className="h-16 md:h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-light tracking-wide transition-colors duration-300",
                    location.pathname === item.href ||
                      item.children.some((child) => location.pathname === child.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-background border border-border/50 shadow-lg rounded-sm py-2 min-w-[160px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors duration-200",
                          location.pathname === child.href
                            ? "text-foreground bg-muted/50"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}
        </div>

        {/* CTA Button - Desktop */}
        <Link to="/contact" className="hidden lg:block text-sm font-light tracking-wide border border-foreground/20 px-6 py-2.5 rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-300">
          Book
        </Link>

        {/* Mobile: Book button + Menu button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link to="/contact" className="text-xs font-light tracking-wide border border-foreground/20 px-4 py-2 rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-300">
            Book Now
          </Link>
          <button type="button" className="p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Fixed full-screen overlay */}
      <div className={cn("lg:hidden fixed inset-0 z-[60] transition-all duration-300", mobileMenuOpen ? "visible" : "invisible pointer-events-none")} style={{
      backgroundColor: mobileMenuOpen ? '#FAF8F5' : 'transparent'
    }}>
        {/* Overlay header with logo and close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src={logo} alt="Signature Car Rentals" className="h-16 w-auto" />
          </Link>
          <button type="button" className="p-2 -mr-2" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items */}
        <div className="container-luxury py-10 flex flex-col gap-6 bg-primary-foreground">
          {navigation.map((item, index) => (
            <div key={item.name}>
              <Link
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-2xl font-serif font-medium transition-all duration-300 block",
                  location.pathname === item.href ||
                    item.children?.some((child) => location.pathname === child.href)
                    ? "text-foreground"
                    : "text-muted-foreground",
                  mobileMenuOpen && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
              {/* Sub-menu items */}
              {item.children && (
                <div className="mt-3 ml-4 flex flex-col gap-3">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-light transition-all duration-300",
                        location.pathname === child.href
                          ? "text-foreground"
                          : "text-muted-foreground",
                        mobileMenuOpen && "animate-fade-in-up"
                      )}
                      style={{ animationDelay: `${(index + childIndex + 1) * 0.1}s` }}
                    >
                      → {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 text-center text-sm font-light tracking-wide border border-foreground/20 px-6 py-4 rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>;
};