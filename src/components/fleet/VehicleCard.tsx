import { Link } from "react-router-dom";
import { Vehicle } from "@/hooks/useVehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export const VehicleCard = ({ vehicle, index = 0 }: VehicleCardProps) => {
  // Resolve best available image: cover_image_url > first gallery image > legacy image
  const displayImage = 
    vehicle.cover_image_url || 
    (vehicle.gallery_urls && vehicle.gallery_urls.length > 0 ? vehicle.gallery_urls[0] : null) || 
    vehicle.image;

  return (
    <Link
      to={`/fleet/${vehicle.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <img
          src={displayImage}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
          width={400}
          height={300}
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Limited availability badge */}
        {vehicle.limited_availability && (
          <div className="absolute top-4 right-4">
            <span className="text-[10px] tracking-[0.15em] uppercase bg-accent/90 text-accent-foreground px-3 py-1.5">
              Limited
            </span>
          </div>
        )}
        
        {/* Hover CTA */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <span className="text-sm text-primary-foreground tracking-wide drop-shadow-md">
            View Vehicle →
          </span>
        </div>
      </div>
      
      {/* Vehicle info */}
      <div className="pt-6">
        <p className="text-caption text-muted-foreground mb-3">
          {vehicle.category}
        </p>
        <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-foreground/80 transition-colors duration-500">
          {vehicle.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          From <span className="text-foreground font-normal">R{vehicle.daily_rate.toLocaleString()}</span> / day
        </p>
      </div>
    </Link>
  );
};