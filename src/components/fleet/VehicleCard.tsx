import { Link } from "react-router-dom";
import { Vehicle } from "@/hooks/useVehicles";
import { Users, Gauge, Zap, Cog } from "lucide-react";

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
  const acceleration = vehicle.acceleration ?? null;
  const powerKw = vehicle.power_kw ?? null;
  const engine = vehicle.engine ?? null;
  
  // Extract engine type (V8, V6, etc.) from engine string
  const engineType = engine?.match(/V\d+|Inline-\d+|I\d+|Flat-\d+/i)?.[0] || null;
  
  // Multi-day pricing - calculate from discount percentage
  const discountPercent = vehicle.multi_day_discount_percent ?? 10;
  const multiDayThreshold = vehicle.multi_day_threshold ?? 4;
  const discountedRate = discountPercent > 0 
    ? Math.round(vehicle.daily_rate * (1 - discountPercent / 100)) 
    : null;

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
        
        {/* Hot Right Now badge */}
        {vehicle.is_hot && (
          <div className="absolute top-4 left-4">
            <span className="text-[10px] tracking-[0.15em] uppercase bg-red-600/90 text-white px-3 py-1.5 rounded-sm">
              Hot Right Now
            </span>
          </div>
        )}
        
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
        <h3 
          className="font-serif text-xl font-semibold text-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-500 leading-tight line-clamp-1" 
          title={vehicle.name}
        >
          {vehicle.name}
        </h3>
        
        {/* Quick specs row */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {powerKw && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-medium text-foreground">{powerKw} kW</span>
            </div>
          )}
          {acceleration && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Gauge className="w-3.5 h-3.5" />
              <span className="text-xs font-medium text-foreground">0-100: {acceleration}</span>
            </div>
          )}
          {engineType && (
            <span className="text-xs font-medium text-foreground bg-accent/10 px-2 py-0.5 rounded">
              {engineType}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{seats}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Cog className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground">{isAutomatic ? "Auto" : "Manual"}</span>
          </div>
        </div>
        
        {/* Pricing section */}
        <div className="border-t border-border/50 pt-4">
          {discountedRate && discountPercent > 0 ? (
            <div className="space-y-1">
              {/* Strikethrough original + discounted price */}
              <div className="flex items-baseline gap-3">
                <span className="text-lg text-muted-foreground line-through">
                  R{vehicle.daily_rate.toLocaleString()}
                </span>
                <span className="text-xl font-semibold text-foreground">
                  R{discountedRate.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">/ day</span>
              </div>
              <p className="text-xs text-accent font-medium">
                {multiDayThreshold}+ day rate • Save {discountPercent}%
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              From <span className="text-foreground font-semibold text-lg">R{vehicle.daily_rate.toLocaleString()}</span> / day
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
