import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  multi_day_threshold: number | null;
  multi_day_discount_percent: number | null;
  has_aircon: boolean | null;
  doors: number | null;
  acceleration: string | null;
  power_kw: number | null;
  is_hot: boolean | null;
  fareharbor_item_code: string | null;
}

export const useVehicles = (includeInactive = false) => {
  return useQuery({
    queryKey: ["vehicles", { includeInactive }],
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

export const useVehicle = (id: string) => {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Vehicle | null;
    },
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("category")
        .eq("is_active", true);
      
      if (error) throw error;
      const categories = [...new Set(data.map((v) => v.category).filter((c) => c && c.trim() !== ""))];
      return categories;
    },
  });
};
