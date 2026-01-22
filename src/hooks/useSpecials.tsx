import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Special {
  id: string;
  title: string;
  description: string | null;
  category_tag: string;
  image_url: string | null;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
  discount_percent: number | null;
  created_at: string;
  updated_at: string;
}

export type SpecialInsert = Omit<Special, "id" | "created_at" | "updated_at">;
export type SpecialUpdate = Partial<SpecialInsert>;

export const useSpecials = () => {
  return useQuery({
    queryKey: ["specials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("specials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Special[];
    },
  });
};

export const useActiveSpecials = () => {
  const today = new Date().toISOString().split("T")[0];
  
  return useQuery({
    queryKey: ["specials", "active", today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("specials")
        .select("*")
        .eq("is_active", true)
        .or(`start_date.is.null,start_date.lte.${today}`)
        .or(`end_date.is.null,end_date.gte.${today}`)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Special[];
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useSpecial = (id: string) => {
  return useQuery({
    queryKey: ["specials", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("specials")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Special | null;
    },
    enabled: !!id,
  });
};

export const useCreateSpecial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (special: SpecialInsert) => {
      const { data, error } = await supabase
        .from("specials")
        .insert(special)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specials"] });
    },
  });
};

export const useUpdateSpecial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: SpecialUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("specials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specials"] });
    },
  });
};

export const useDeleteSpecial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("specials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specials"] });
    },
  });
};
