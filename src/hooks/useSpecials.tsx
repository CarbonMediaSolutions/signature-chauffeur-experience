import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import specialData from "@/data/specials.json";

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

const specials = (specialData as Special[]).sort(
  (a, b) => a.display_order - b.display_order,
);

const getActiveSpecials = (today: string) =>
  specials.filter(
    (special) =>
      special.is_active &&
      (!special.start_date || special.start_date <= today) &&
      (!special.end_date || special.end_date >= today),
  );

/** Public offers are bundled locally and require no database connection. */
export const useSpecials = () => {
  return useQuery({
    queryKey: ["specials", "static"],
    queryFn: async () => specials,
    initialData: specials,
    staleTime: Infinity,
  });
};

export const useActiveSpecials = () => {
  const today = new Date().toISOString().split("T")[0];
  const data = getActiveSpecials(today);

  return useQuery({
    queryKey: ["specials", "static", "active", today],
    queryFn: async () => data,
    initialData: data,
    staleTime: Infinity,
  });
};

export const useSpecial = (id: string) => {
  const data = specials.find((special) => special.id === id) ?? null;

  return useQuery({
    queryKey: ["specials", "static", id],
    queryFn: async () => data,
    initialData: data,
    enabled: !!id,
    staleTime: Infinity,
  });
};

/** Admin screens continue to use live offers so their edits remain visible there. */
export const useAdminSpecials = () => {
  return useQuery({
    queryKey: ["specials", "admin"],
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

export const useAdminSpecial = (id: string) => {
  return useQuery({
    queryKey: ["specials", "admin", id],
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
