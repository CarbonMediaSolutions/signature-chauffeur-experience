import { Link } from "react-router-dom";
import { Vehicle } from "@/hooks/useVehicles";
import { Users, Gauge, DoorOpen, Snowflake, Car, Cog } from "lucide-react";

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

  // Fallback values for specs if not in database
  const seats = vehicle.seats ?? 4;
  const transmission = vehicle.transmission ?? "Automatic";
  const acceleration = vehicle.acceleration ?? "5.2s";
  const doors = vehicle.doors ?? 4;
  const hasAircon = vehicle.has_aircon ?? true;
  const driveType = vehicle.drive_type ?? "RWD";
  
  // Multi-day pricing
  const multiDayThreshold = vehicle.multi_day_threshold ?? 4;
  const multiDayRate = vehicle.multi_day_rate;
  const originalMultiDayRate = vehicle.original_multi_day_rate;

  const isAutomatic = transmission?.toLowerCase().includes("auto");

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
        {/* Category badge */}
        <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-3 bg-accent/10 px-2 py-1">
          {vehicle.category}
        </span>
        
        {/* Vehicle name - bolder */}
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-500 leading-tight">
          {vehicle.name}
        </h3>
        
        {/* Quick specs grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{seats}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Cog className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{isAutomatic ? "Auto" : "Manual"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Gauge className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{acceleration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DoorOpen className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{doors} doors</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Snowflake className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{hasAircon ? "A/C" : "No A/C"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Car className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{driveType}</span>
          </div>
        </div>
        
        {/* Pricing section */}
        <div className="space-y-1.5 border-t border-border/50 pt-4">
          {/* Daily rate */}
          <p className="text-sm text-muted-foreground">
            From <span className="text-foreground font-semibold text-base">R{vehicle.daily_rate.toLocaleString()}</span> / day
          </p>
          
          {/* Multi-day rate with strikethrough */}
          {multiDayRate && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-accent font-medium">
                R{multiDayRate.toLocaleString()} / day for {multiDayThreshold}+ days
              </span>
              {originalMultiDayRate && originalMultiDayRate > multiDayRate && (
                <span className="text-xs text-muted-foreground line-through">
                  R{originalMultiDayRate.toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
