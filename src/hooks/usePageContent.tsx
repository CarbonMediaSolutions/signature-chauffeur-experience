import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import pageContentData from "@/data/page-content.json";

export interface ContentBlock {
  id: string;
  page: string;
  section: string | null;
  content_type: string;
  value: string | null;
  label: string | null;
  display_order: number;
}

const contentBlocks = pageContentData as ContentBlock[];

const getContentMap = (page: string) => {
  const map = new Map<string, string>();
  contentBlocks
    .filter((block) => block.page === page)
    .sort((a, b) => a.display_order - b.display_order)
    .forEach((block) => {
      if (block.value != null) map.set(block.id, block.value);
    });
  return map;
};

/** Public page copy is bundled with the site and available without a database. */
export const usePageContent = (page: string) => {
  const data = getContentMap(page);

  return useQuery({
    queryKey: ["page_content", "static", page],
    queryFn: async () => data,
    initialData: data,
    staleTime: Infinity,
  });
};

export const useAllPageContent = () => {
  return useQuery({
    queryKey: ["page_content", "static", "all"],
    queryFn: async () => contentBlocks,
    initialData: contentBlocks,
    staleTime: Infinity,
  });
};

/** The admin editor keeps reading and writing live content independently of the public snapshot. */
export const useAdminAllPageContent = () => {
  return useQuery({
    queryKey: ["page_content", "admin", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .order("page")
        .order("display_order");
      if (error) throw error;
      return data as unknown as ContentBlock[];
    },
  });
};

export const useUpdatePageContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: { id: string; value: string }[]) => {
      for (const update of updates) {
        const { error } = await supabase
          .from("page_content")
          .update({ value: update.value, updated_at: new Date().toISOString() })
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
  fallback: string,
): string => {
  return content?.get(key) ?? fallback;
};

/** Helper: get JSON content with fallback */
export const getJsonContent = <T,>(
  content: Map<string, string> | undefined,
  key: string,
  fallback: T,
): T => {
  const val = content?.get(key);
  if (!val) return fallback;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
};
