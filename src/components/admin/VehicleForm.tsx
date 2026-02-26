import { useState } from "react";
import { Vehicle } from "@/hooks/useVehicles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaManager } from "./MediaManager";
import { Loader2 } from "lucide-react";

export interface VehicleFormData {
  name: string;
  category: string;
  daily_rate: number;
  image: string;
  description: string;
  engine: string;
  transmission: string;
  seats: number;
  features: string[];
  why_we_chose: string;
  limited_availability: boolean;
  is_active: boolean;
  featured: boolean;
  fuel_type: string;
  drive_type: string;
  luggage_capacity: string;
  mileage_limit: string;
  security_deposit: number;
  insurance_excess: number;
  cover_image_url: string | null;
  gallery_urls: string[];
  video_urls: string[];
  hero_video_url: string | null;
  acceleration: string;
  top_speed: string;
  doors: number;
  excess_mileage_rate: number;
  minimum_rental_days: number;
  multi_day_threshold: number;
  multi_day_discount_percent: number;
  has_aircon: boolean;
  is_hot: boolean;
  self_drive_rate: number | null;
  chauffeur_rate: number | null;
}

interface VehicleFormProps {
  initialData?: Partial<Vehicle>;
  onSubmit: (data: VehicleFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

const CATEGORIES = [
  "Luxury Sedan",
  "Performance",
  "SUV",
  "Convertible",
  "Grand Tourer",
  "Sports Car",
];

const TRANSMISSIONS = ["Automatic", "Manual", "DCT", "PDK"];
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];
const DRIVE_TYPES = ["RWD", "AWD", "4WD", "FWD"];

export const VehicleForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
}: VehicleFormProps) => {
  const [formData, setFormData] = useState<VehicleFormData>({
    name: initialData?.name || "",
    category: initialData?.category || "",
    daily_rate: initialData?.daily_rate || 0,
    image: initialData?.image || "",
    description: initialData?.description || "",
    engine: initialData?.engine || "",
    transmission: initialData?.transmission || "",
    seats: initialData?.seats || 4,
    features: initialData?.features || [],
    why_we_chose: initialData?.why_we_chose || "",
    limited_availability: initialData?.limited_availability || false,
    is_active: initialData?.is_active ?? true,
    featured: initialData?.featured || false,
    fuel_type: initialData?.fuel_type || "",
    drive_type: initialData?.drive_type || "",
    luggage_capacity: initialData?.luggage_capacity || "",
    mileage_limit: initialData?.mileage_limit || "",
    security_deposit: initialData?.security_deposit || 0,
    insurance_excess: initialData?.insurance_excess || 0,
    cover_image_url: initialData?.cover_image_url || null,
    gallery_urls: initialData?.gallery_urls || [],
    video_urls: initialData?.video_urls || [],
    hero_video_url: (initialData as any)?.hero_video_url || null,
    acceleration: (initialData as any)?.acceleration || "",
    top_speed: (initialData as any)?.top_speed || "",
    doors: (initialData as any)?.doors || 4,
    excess_mileage_rate: (initialData as any)?.excess_mileage_rate || 0,
    minimum_rental_days: (initialData as any)?.minimum_rental_days || 1,
    multi_day_threshold: (initialData as any)?.multi_day_threshold || 4,
    multi_day_discount_percent: (initialData as any)?.multi_day_discount_percent ?? 10,
    has_aircon: (initialData as any)?.has_aircon ?? true,
    is_hot: (initialData as any)?.is_hot || false,
    self_drive_rate: (initialData as any)?.self_drive_rate ?? null,
    chauffeur_rate: (initialData as any)?.chauffeur_rate ?? null,
  });

  const [featuresInput, setFeaturesInput] = useState(
    initialData?.features?.join(", ") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    onSubmit({ ...formData, features });
  };

  const updateField = <K extends keyof VehicleFormData>(
    field: K,
    value: VehicleFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Basic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Vehicle Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g., Porsche 911 Carrera S"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => updateField("category", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="daily_rate">Daily Rate (R) *</Label>
            <Input
              id="daily_rate"
              type="number"
              value={formData.daily_rate}
              onChange={(e) => updateField("daily_rate", parseInt(e.target.value) || 0)}
              required
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="is_active">Active (visible on site)</Label>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => updateField("is_active", checked)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="featured">Featured Vehicle</Label>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => updateField("featured", checked)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="limited_availability">Limited Availability</Label>
            <Switch
              id="limited_availability"
              checked={formData.limited_availability}
              onCheckedChange={(checked) =>
                updateField("limited_availability", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <Label htmlFor="is_hot">Hot Right Now</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Display a red "Hot Right Now" banner
              </p>
            </div>
            <Switch
              id="is_hot"
              checked={formData.is_hot}
              onCheckedChange={(checked) => updateField("is_hot", checked)}
            />
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Specifications
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="engine">Engine</Label>
            <Input
              id="engine"
              value={formData.engine}
              onChange={(e) => updateField("engine", e.target.value)}
              placeholder="e.g., 3.0L Twin-Turbo V6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transmission">Transmission</Label>
            <Select
              value={formData.transmission}
              onValueChange={(v) => updateField("transmission", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Seats</Label>
            <Input
              id="seats"
              type="number"
              value={formData.seats}
              onChange={(e) => updateField("seats", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuel_type">Fuel Type</Label>
            <Select
              value={formData.fuel_type}
              onValueChange={(v) => updateField("fuel_type", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                {FUEL_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="drive_type">Drive Type</Label>
            <Select
              value={formData.drive_type}
              onValueChange={(v) => updateField("drive_type", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select drive type" />
              </SelectTrigger>
              <SelectContent>
                {DRIVE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="luggage_capacity">Luggage Capacity</Label>
            <Input
              id="luggage_capacity"
              value={formData.luggage_capacity}
              onChange={(e) => updateField("luggage_capacity", e.target.value)}
              placeholder="e.g., 2 large bags"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="acceleration">Acceleration (0-100 km/h)</Label>
            <Input
              id="acceleration"
              value={formData.acceleration}
              onChange={(e) => updateField("acceleration", e.target.value)}
              placeholder="e.g., 3.3 sec"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="top_speed">Top Speed</Label>
            <Input
              id="top_speed"
              value={formData.top_speed}
              onChange={(e) => updateField("top_speed", e.target.value)}
              placeholder="e.g., 305 km/h"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doors">Doors</Label>
            <Input
              id="doors"
              type="number"
              value={formData.doors}
              onChange={(e) => updateField("doors", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </section>

      {/* Rental Terms */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Rental Terms
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mileage_limit">Mileage Limit</Label>
            <Input
              id="mileage_limit"
              value={formData.mileage_limit}
              onChange={(e) => updateField("mileage_limit", e.target.value)}
              placeholder="e.g., 200km/day"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="security_deposit">Security Deposit (R)</Label>
            <Input
              id="security_deposit"
              type="number"
              value={formData.security_deposit}
              onChange={(e) =>
                updateField("security_deposit", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance_excess">Insurance Excess (R)</Label>
            <Input
              id="insurance_excess"
              type="number"
              value={formData.insurance_excess}
              onChange={(e) =>
                updateField("insurance_excess", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excess_mileage_rate">Excess Mileage Rate (R/km)</Label>
            <Input
              id="excess_mileage_rate"
              type="number"
              value={formData.excess_mileage_rate}
              onChange={(e) =>
                updateField("excess_mileage_rate", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimum_rental_days">Minimum Rental Days</Label>
            <Input
              id="minimum_rental_days"
              type="number"
              value={formData.minimum_rental_days}
              onChange={(e) =>
                updateField("minimum_rental_days", parseInt(e.target.value) || 1)
              }
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="has_aircon">Air Conditioning</Label>
            <Switch
              id="has_aircon"
              checked={formData.has_aircon}
              onCheckedChange={(checked) => updateField("has_aircon", checked)}
            />
          </div>
        </div>
      </section>

      {/* Multi-Day Promotional Pricing */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Multi-Day Promotional Pricing
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set a discount percentage for longer rentals. The discounted rate is automatically calculated from the daily rate.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="multi_day_threshold">Day Threshold (e.g., 4+ days)</Label>
            <Input
              id="multi_day_threshold"
              type="number"
              value={formData.multi_day_threshold}
              onChange={(e) =>
                updateField("multi_day_threshold", parseInt(e.target.value) || 4)
              }
              min={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="multi_day_discount_percent">Discount Percentage (%)</Label>
            <Input
              id="multi_day_discount_percent"
              type="number"
              value={formData.multi_day_discount_percent}
              onChange={(e) =>
                updateField("multi_day_discount_percent", parseInt(e.target.value) || 0)
              }
              min={0}
              max={50}
              placeholder="e.g., 10"
            />
          </div>
        </div>
        
        {/* Live preview */}
        {formData.daily_rate > 0 && formData.multi_day_discount_percent > 0 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Preview:</strong>{" "}
              <span className="text-accent font-medium">
                R{Math.round(formData.daily_rate * (1 - formData.multi_day_discount_percent / 100)).toLocaleString()}
              </span>
              /day for {formData.multi_day_threshold}+ days{" "}
              <span className="line-through text-muted-foreground">
                R{formData.daily_rate.toLocaleString()}
              </span>{" "}
              ({formData.multi_day_discount_percent}% off)
            </p>
          </div>
        )}
      </section>

      {/* Service Type Pricing */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Service Type Pricing
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set custom daily rates per service type. Leave blank to use the base daily rate for Self-Drive, or to show "Request Pricing" for Chauffeur. Events is always enquiry-only.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="self_drive_rate">Self-Drive Daily Rate (R)</Label>
            <Input
              id="self_drive_rate"
              type="number"
              value={formData.self_drive_rate ?? ""}
              onChange={(e) =>
                updateField("self_drive_rate", e.target.value ? parseInt(e.target.value) : null)
              }
              placeholder={`Leave empty to use base rate (R${formData.daily_rate})`}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chauffeur_rate">Chauffeur Daily Rate (R)</Label>
            <Input
              id="chauffeur_rate"
              type="number"
              value={formData.chauffeur_rate ?? ""}
              onChange={(e) =>
                updateField("chauffeur_rate", e.target.value ? parseInt(e.target.value) : null)
              }
              placeholder="Leave empty for Request Pricing"
              min={0}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Content
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              placeholder="Detailed vehicle description..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="why_we_chose">Why We Chose It</Label>
            <Textarea
              id="why_we_chose"
              value={formData.why_we_chose}
              onChange={(e) => updateField("why_we_chose", e.target.value)}
              rows={3}
              placeholder="What makes this vehicle special..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Textarea
              id="features"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              rows={2}
              placeholder="e.g., Panoramic Roof, Heated Seats, Adaptive Cruise Control"
            />
          </div>
        </div>
      </section>

      {/* Legacy Image URL (fallback) */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Legacy Image URL
        </h3>
        <div className="space-y-2">
          <Label htmlFor="image">Fallback Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="https://..."
          />
          <p className="text-xs text-muted-foreground">
            Used if no cover image is uploaded. You can leave this empty if uploading media below.
          </p>
        </div>
      </section>

      {/* Media Manager */}
      <section>
        <h3 className="font-serif text-lg text-foreground mb-4 pb-2 border-b border-border">
          Media
        </h3>
        <MediaManager
          coverImage={formData.cover_image_url}
          galleryUrls={formData.gallery_urls}
          videoUrls={formData.video_urls}
          heroVideo={formData.hero_video_url}
          onCoverImageChange={(url) => updateField("cover_image_url", url)}
          onGalleryChange={(urls) => updateField("gallery_urls", urls)}
          onVideoChange={(urls) => updateField("video_urls", urls)}
          onHeroVideoChange={(url) => updateField("hero_video_url", url)}
          vehicleId={initialData?.id}
        />
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-4 pt-6 border-t border-border">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
