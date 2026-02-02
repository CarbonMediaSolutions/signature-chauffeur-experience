import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  author_url?: string;
}

interface PlaceDetailsResponse {
  result?: {
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const googleMapsApiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");

    if (!googleMapsApiKey) {
      throw new Error("GOOGLE_MAPS_API_KEY not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the Place ID from site_settings
    const { data: placeIdSetting, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("id", "google_place_id")
      .maybeSingle();

    if (settingsError) {
      throw new Error(`Failed to fetch Place ID: ${settingsError.message}`);
    }

    const placeId = placeIdSetting?.value;
    if (!placeId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Google Place ID not configured in Admin Settings" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Fetch reviews from Google Places API
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${googleMapsApiKey}`;
    
    const googleResponse = await fetch(googleApiUrl);
    const googleData: PlaceDetailsResponse = await googleResponse.json();

    if (googleData.status !== "OK") {
      throw new Error(
        `Google API error: ${googleData.status} - ${googleData.error_message || "Unknown error"}`
      );
    }

    const reviews = googleData.result?.reviews || [];
    
    // Filter to only 5-star reviews with text
    const fiveStarReviews = reviews.filter(
      (review) => review.rating === 5 && review.text && review.text.trim().length > 0
    );

    // Clear existing reviews and insert new ones
    const { error: deleteError } = await supabase
      .from("google_reviews")
      .delete()
      .neq("id", "placeholder"); // Delete all

    if (deleteError) {
      console.error("Error deleting old reviews:", deleteError);
    }

    // Insert filtered reviews
    if (fiveStarReviews.length > 0) {
      const reviewsToInsert = fiveStarReviews.map((review, index) => ({
        id: `google_${placeId}_${index}_${review.time}`,
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: new Date(review.time * 1000).toISOString(),
        profile_photo_url: review.profile_photo_url || null,
        fetched_at: new Date().toISOString(),
      }));

      const { error: insertError } = await supabase
        .from("google_reviews")
        .upsert(reviewsToInsert, { onConflict: "id" });

      if (insertError) {
        throw new Error(`Failed to cache reviews: ${insertError.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Fetched and cached ${fiveStarReviews.length} five-star reviews`,
        totalReviews: reviews.length,
        fiveStarReviews: fiveStarReviews.length,
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching Google reviews:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
