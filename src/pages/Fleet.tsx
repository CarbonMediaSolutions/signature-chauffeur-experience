import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { VehicleCardErrorBoundary } from "@/components/fleet/VehicleCardErrorBoundary";
import { FleetSearch } from "@/components/fleet/FleetSearch";
import { useVehicles, useCategories } from "@/hooks/useVehicles";
import { useState, useMemo } from "react";
import { Loader2 } from "lucide-react";

const Fleet = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  
  const { data: vehicles = [], isLoading } = useVehicles();
  const { data: categories = [] } = useCategories();

  // Extract unique brands from vehicle names
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    vehicles.forEach((v) => {
      // Extract brand from vehicle name (first word or known patterns)
      const name = v.name;
      if (name.startsWith("Mercedes")) brandSet.add("Mercedes");
      else if (name.startsWith("BMW")) brandSet.add("BMW");
      else if (name.startsWith("Porsche")) brandSet.add("Porsche");
      else if (name.startsWith("Ford")) brandSet.add("Ford");
      else if (name.startsWith("Audi")) brandSet.add("Audi");
      else if (name.startsWith("Range Rover")) brandSet.add("Range Rover");
      else if (name.startsWith("Bentley")) brandSet.add("Bentley");
      else if (name.startsWith("Lamborghini")) brandSet.add("Lamborghini");
      else if (name.startsWith("Ferrari")) brandSet.add("Ferrari");
      else if (name.startsWith("Rolls-Royce")) brandSet.add("Rolls-Royce");
      else {
        // Default: extract first word
        const firstWord = name.split(" ")[0].split("-")[0];
        brandSet.add(firstWord);
      }
    });
    return Array.from(brandSet).sort();
  }, [vehicles]);

  // Filter by category and brand
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesCategory = !selectedCategory || v.category === selectedCategory;
      const matchesBrand = !selectedBrand || v.name.toLowerCase().includes(selectedBrand.toLowerCase());
      return matchesCategory && matchesBrand;
    });
  }, [vehicles, selectedCategory, selectedBrand]);

  const handleFilter = (category: string | null, brand: string | null) => {
    setSelectedCategory(category === "all" ? null : category);
    setSelectedBrand(brand === "all" ? null : brand);
  };

  const hasActiveFilters = selectedCategory !== null || selectedBrand !== null;

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

      {/* Fleet Search Filters */}
      <section className="py-8 bg-background border-b border-border/30">
        <div className="container-luxury">
          <FleetSearch 
            categories={categories}
            brands={brands}
            onFilter={handleFilter}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {hasActiveFilters && (
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''}
                  {selectedCategory && ` in ${selectedCategory}`}
                  {selectedBrand && ` by ${selectedBrand}`}
                </p>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredVehicles.map((vehicle, index) => (
                  <VehicleCardErrorBoundary key={vehicle.id} vehicleName={vehicle.name}>
                    <VehicleCard vehicle={vehicle} index={index} />
                  </VehicleCardErrorBoundary>
                ))}
              </div>
            </>
          )}
          
          {!isLoading && filteredVehicles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                No vehicles found matching your criteria.
              </p>
              <button
                onClick={() => handleFilter(null, null)}
                className="text-sm text-foreground underline hover:no-underline transition-all duration-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Fleet;
