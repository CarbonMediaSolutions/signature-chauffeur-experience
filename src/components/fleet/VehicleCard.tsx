import { Link } from "react-router-dom";
import { Vehicle } from "@/data/fleet";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export const VehicleCard = ({ vehicle, index = 0 }: VehicleCardProps) => {
  return (
    <Link
      to={`/fleet/${vehicle.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Limited availability badge */}
        {vehicle.limitedAvailability && (
          <div className="absolute top-4 right-4">
            <span className="text-[10px] tracking-luxury uppercase bg-accent text-accent-foreground px-3 py-1.5">
              Limited Availability
            </span>
          </div>
        )}
        
        {/* Hover CTA */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
          <span className="text-sm text-primary-foreground tracking-wide">
            View Vehicle →
          </span>
        </div>
      </div>
      
      {/* Vehicle info */}
      <div className="pt-5">
        <p className="text-caption text-muted-foreground tracking-luxury mb-2">
          {vehicle.category}
        </p>
        <h3 className="font-serif text-xl font-medium text-foreground mb-2">
          {vehicle.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          From <span className="text-foreground">R{vehicle.dailyRate.toLocaleString()}</span> / day
        </p>
      </div>
    </Link>
  );
};
