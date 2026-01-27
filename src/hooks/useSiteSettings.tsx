import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSetting = (key: string) => {
  return useQuery({
    queryKey: ["site_settings", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("id", key)
        .maybeSingle();
      
      if (error) throw error;
      return data?.value || null;
    },
  });
};

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string | null }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: key, value, updated_at: new Date().toISOString() });
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["site_settings", variables.key] });
    },
  });
};
