import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GoogleReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  time: string;
  profile_photo_url: string | null;
  fetched_at: string;
}

export const useGoogleReviews = () => {
  return useQuery({
    queryKey: ["google_reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("google_reviews")
        .select("*")
        .eq("rating", 5)
        .order("time", { ascending: false });

      if (error) {
        console.error("Error fetching Google reviews:", error);
        return [];
      }

      return (data as GoogleReview[]) || [];
    },
    staleTime: 1000 * 60 * 5, // Consider fresh for 5 minutes
  });
};
