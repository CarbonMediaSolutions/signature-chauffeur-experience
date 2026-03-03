import { Car, User, Calendar, CircleDollarSign, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent, getJsonContent } from "@/hooks/usePageContent";

const iconMap: Record<string, any> = {
  "Self-Drive": Car,
  "Chauffeur Service": User,
  "Events & Weddings": Calendar,
  "List Your Vehicle": CircleDollarSign,
  "Curated Fleet": Sparkles,
  "Personal Service": Heart,
};

const defaultServices = [
  { title: "Self-Drive", description: "Take the wheel of your dream car", link: "/fleet" },
  { title: "Chauffeur Service", description: "Arrive in style, stress-free", link: "/contact" },
  { title: "Events & Weddings", description: "Make moments unforgettable", link: "/contact" },
  { title: "List Your Vehicle", description: "Earn returns on your investment", link: "/list-your-vehicle" },
  { title: "Curated Fleet", description: "Hand-selected luxury & performance", link: "/fleet" },
  { title: "Personal Service", description: "A face behind every booking", link: "/about" },
];

const defaultIcons = [Car, User, Calendar, CircleDollarSign, Sparkles, Heart];

export const MissionIcons = () => {
  const { data: content } = usePageContent("home");
  const services = getJsonContent(content, "home.missionicons", defaultServices);

  return (
    <section className="py-12 md:py-16 bg-[hsl(35,30%,95%)]">
      <div className="container-luxury">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {services.map((service: any, idx: number) => {
            const Icon = iconMap[service.title] || defaultIcons[idx] || Car;
            return (
              <Link key={service.title} to={service.link} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border mb-4 transition-all duration-300 group-hover:border-brass group-hover:shadow-md">
                  <Icon className="w-6 h-6 text-brass transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-serif text-base md:text-lg lg:text-xl text-foreground mb-1 md:mb-2 group-hover:text-brass transition-colors duration-300">{service.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
