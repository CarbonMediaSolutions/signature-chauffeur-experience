import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContentBlock {
  id: string;
  page: string;
  section: string | null;
  content_type: string;
  value: string | null;
  label: string | null;
  display_order: number;
}

export const usePageContent = (page: string) => {
  return useQuery({
    queryKey: ["page_content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content" as any)
        .select("*")
        .eq("page", page)
        .order("display_order");
      if (error) throw error;
      const map = new Map<string, string>();
      (data as any[])?.forEach((row: any) => {
        if (row.value != null) map.set(row.id, row.value);
      });
      return map;
    },
  });
};

export const useAllPageContent = () => {
  return useQuery({
    queryKey: ["page_content", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content" as any)
        .select("*")
        .order("page")
        .order("display_order");
      if (error) throw error;
      return (data as any[]) as ContentBlock[];
    },
  });
};

export const useUpdatePageContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: { id: string; value: string }[]) => {
      for (const update of updates) {
        const { error } = await supabase
          .from("page_content" as any)
          .update({ value: update.value, updated_at: new Date().toISOString() } as any)
          .eq("id", update.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_content"] });
    },
  });
};

/** Helper: get content value with fallback */
export const getContent = (
  content: Map<string, string> | undefined,
  key: string,
  fallback: string
): string => {
  return content?.get(key) ?? fallback;
};

/** Helper: get JSON content with fallback */
export const getJsonContent = <T,>(
  content: Map<string, string> | undefined,
  key: string,
  fallback: T
): T => {
  const val = content?.get(key);
  if (!val) return fallback;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
};
