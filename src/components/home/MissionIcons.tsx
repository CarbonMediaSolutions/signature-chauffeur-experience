import { Car, Heart, Sparkles } from "lucide-react";

const values = [
  {
    icon: Car,
    title: "Curated Fleet",
    description: "Hand-selected luxury & performance cars",
  },
  {
    icon: Heart,
    title: "Personal Service",
    description: "A face behind every booking",
  },
  {
    icon: Sparkles,
    title: "Effortless Experience",
    description: "Doorstep delivery, every time",
  },
];

export const MissionIcons = () => {
  return (
    <section className="py-12 md:py-16 bg-[hsl(35,30%,95%)]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border mb-4">
                <value.icon className="w-6 h-6 text-brass" />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
