import { useRef, useEffect, useState, useCallback } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const libraries: ("places")[] = ["places"];

export interface PlaceResult {
  address: string;
  placeId?: string;
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (result: PlaceResult) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const PlacesAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter pickup/delivery location",
  className,
  disabled = false,
}: PlacesAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setInputValue(place.formatted_address);
        onChange({
          address: place.formatted_address,
          placeId: place.place_id,
        });
      }
    }
  }, [onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Also update parent with manual input (no placeId)
    onChange({ address: newValue });
  };

  // Show loading state
  if (!isLoaded) {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10"
          disabled
        />
      </div>
    );
  }

  // Show error fallback - regular input
  if (loadError) {
    console.error("Google Maps load error:", loadError);
    return (
      <div className={cn("relative", className)}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
        </div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10"
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none">
        <MapPin className="w-4 h-4" />
      </div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: "za" },
          types: ["geocode", "establishment"],
        }}
      >
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10"
          disabled={disabled}
        />
      </Autocomplete>
    </div>
  );
};
