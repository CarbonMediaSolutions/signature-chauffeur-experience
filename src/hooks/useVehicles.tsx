import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import vehicleData from "@/data/vehicles.json";

export interface Vehicle {
  id: string;
  name: string;
  slug: string | null;
  category: string;
  daily_rate: number;
  image: string;
  description: string | null;
  engine: string | null;
  transmission: string | null;
  seats: number | null;
  features: string[] | null;
  why_we_chose: string | null;
  limited_availability: boolean | null;
  is_active: boolean | null;
  featured: boolean | null;
  fuel_type: string | null;
  drive_type: string | null;
  luggage_capacity: string | null;
  mileage_limit: string | null;
  security_deposit: number | null;
  insurance_excess: number | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  video_urls: string[] | null;
  hero_video_url: string | null;
  acceleration: string | null;
  top_speed: string | null;
  doors: number | null;
  excess_mileage_rate: number | null;
  minimum_rental_days: number | null;
  multi_day_threshold: number | null;
  multi_day_rate: number | null;
  original_multi_day_rate: number | null;
  multi_day_discount_percent: number | null;
  has_aircon: boolean | null;
  power_kw: number | null;
  is_hot: boolean | null;
  self_drive_rate: number | null;
  chauffeur_rate: number | null;
  fareharbor_item_code: string | null;
  created_at: string;
  updated_at: string;
}

const vehicles = vehicleData as Vehicle[];

const getStaticVehicles = (includeInactive: boolean) =>
  includeInactive ? vehicles : vehicles.filter((vehicle) => vehicle.is_active);

/** Public fleet content is bundled with the site and never queries the database. */
export const useVehicles = (includeInactive = false) => {
  const data = getStaticVehicles(includeInactive);

  return useQuery({
    queryKey: ["vehicles", "static", { includeInactive }],
    queryFn: async () => data,
    initialData: data,
    staleTime: Infinity,
  });
};

export const useVehicle = (id: string) => {
  const data = vehicles.find((vehicle) => vehicle.id === id && vehicle.is_active) ?? null;

  return useQuery({
    queryKey: ["vehicle", "static", id],
    queryFn: async () => data,
    initialData: data,
    enabled: !!id,
    staleTime: Infinity,
  });
};

export const useCategories = () => {
  const data = [
    ...new Set(
      vehicles
        .filter((vehicle) => vehicle.is_active)
        .map((vehicle) => vehicle.category)
        .filter((category) => category && category.trim() !== ""),
    ),
  ];

  return useQuery({
    queryKey: ["categories", "static"],
    queryFn: async () => data,
    initialData: data,
    staleTime: Infinity,
  });
};

/** Admin screens continue to read live records so edits and new vehicles appear immediately. */
export const useAdminVehicles = (includeInactive = true) => {
  return useQuery({
    queryKey: ["vehicles", "admin", { includeInactive }],
    queryFn: async () => {
      let query = supabase.from("vehicles").select("*");

      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query.order("name");
      if (error) throw error;
      return data as Vehicle[];
    },
  });
};
