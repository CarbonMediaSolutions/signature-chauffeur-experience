import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Vehicle {
  id: string;
  name: string;
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
}

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("is_active", true)
        .order("name");
      
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
      const categories = [...new Set(data.map((v) => v.category))];
      return categories;
    },
  });
};
