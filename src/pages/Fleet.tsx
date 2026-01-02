import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { FleetSearch } from "@/components/fleet/FleetSearch";
import { useVehicles, useCategories } from "@/hooks/useVehicles";
import { useAvailableVehicles } from "@/hooks/useAvailability";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";

const Fleet = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchDateRange, setSearchDateRange] = useState<DateRange | undefined>();
  const [hasActiveSearch, setHasActiveSearch] = useState(false);
  
  const { data: vehicles = [], isLoading } = useVehicles();
  const { data: categories = [] } = useCategories();
  const { data: availableVehicleIds, isLoading: isSearching } = useAvailableVehicles(
    hasActiveSearch && searchDateRange?.from && searchDateRange?.to 
      ? { from: searchDateRange.from, to: searchDateRange.to } 
      : null
  );

  // Filter by category first
  let filteredVehicles = selectedCategory
    ? vehicles.filter((v) => v.category === selectedCategory)
    : vehicles;

  // Then filter by availability if search is active
  if (hasActiveSearch && availableVehicleIds) {
    filteredVehicles = filteredVehicles.filter((v) => 
      availableVehicleIds.includes(v.id)
    );
  }

  const handleSearch = (dateRange: DateRange | undefined) => {
    setSearchDateRange(dateRange);
    setHasActiveSearch(true);
  };

  const handleClearSearch = () => {
    setSearchDateRange(undefined);
    setHasActiveSearch(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding-sm bg-background border-b border-border/30">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="text-caption text-muted-foreground mb-4">
              The Collection
            </p>
            <h1 className="text-display text-foreground mb-8">
              Our Fleet
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Each vehicle has been thoughtfully selected for its character, 
              performance, and ability to deliver an exceptional experience.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-background border-b border-border/30">
        <div className="container-luxury">
          <FleetSearch 
            onSearch={handleSearch}
            isSearching={isSearching}
            onClear={handleClearSearch}
            hasActiveSearch={hasActiveSearch}
          />
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border/50 sticky top-[73px] z-30">
        <div className="container-luxury">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "text-sm tracking-wide px-5 py-2 border transition-all duration-300",
                selectedCategory === null
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/50"
              )}
            >
              All Vehicles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "text-sm tracking-wide px-5 py-2 border transition-all duration-300",
                  selectedCategory === category
                    ? "bg-foreground text-primary-foreground border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {isLoading || isSearching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>
          )}
          
          {!isLoading && !isSearching && filteredVehicles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                {hasActiveSearch 
                  ? "No vehicles available for the selected dates."
                  : "No vehicles found in this category."}
              </p>
              {hasActiveSearch && (
                <button
                  onClick={handleClearSearch}
                  className="text-sm text-foreground underline hover:no-underline"
                >
                  Clear search and show all vehicles
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Fleet;