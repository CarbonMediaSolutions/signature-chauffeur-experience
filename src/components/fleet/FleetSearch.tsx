import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LuxuryButton } from "@/components/ui/luxury-button";

interface FleetSearchProps {
  categories: string[];
  brands: string[];
  onFilter: (category: string | null, brand: string | null) => void;
  hasActiveFilters: boolean;
}

export const FleetSearch = ({ 
  categories,
  brands,
  onFilter,
  hasActiveFilters
}: FleetSearchProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const handleSearch = () => {
    onFilter(
      selectedCategory || null,
      selectedBrand || null
    );
  };

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    onFilter(null, null);
  };

  return (
    <div className="bg-secondary/50 border border-border p-6 md:p-8">
      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-2">
        Find Your Perfect Drive
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Browse by category and brand to discover your ideal vehicle.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        {/* Category Filter */}
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
            Category
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-12 bg-background border-border">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
            Brand
          </label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="h-12 bg-background border-border">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <LuxuryButton
            variant="default"
            size="lg"
            onClick={handleSearch}
            className="h-12 px-8"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Fleet
          </LuxuryButton>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClear}
              className="h-12 px-4"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
