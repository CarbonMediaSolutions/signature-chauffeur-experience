import { useState, useEffect, useRef } from "react";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Settings, Upload, X, MapPin, RefreshCw } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  
  // Founder image settings
  const { data: founderImageUrl, isLoading: founderLoading } = useSiteSetting("founder_image_url");
  const [founderImage, setFounderImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Google Place ID settings
  const { data: googlePlaceId, isLoading: placeIdLoading } = useSiteSetting("google_place_id");
  const [placeId, setPlaceId] = useState("");
  const [fetchingReviews, setFetchingReviews] = useState(false);
  
  const updateSetting = useUpdateSiteSetting();

  useEffect(() => {
    if (founderImageUrl !== undefined) {
      setFounderImage(founderImageUrl);
    }
  }, [founderImageUrl]);

  useEffect(() => {
    if (googlePlaceId !== undefined) {
      setPlaceId(googlePlaceId || "");
    }
  }, [googlePlaceId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    const fileExt = file.name.split(".").pop();
    const fileName = `site-assets/founder-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("specials")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("specials")
      .getPublicUrl(fileName);

    setFounderImage(urlData.publicUrl);
    setUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setFounderImage(null);
  };

  const handleFetchReviews = async () => {
    if (!placeId.trim()) {
      toast({
        title: "Place ID required",
        description: "Please enter a Google Place ID first",
        variant: "destructive",
      });
      return;
    }

    setFetchingReviews(true);

    try {
      // First save the Place ID
      await updateSetting.mutateAsync({ 
        key: "google_place_id", 
        value: placeId.trim() 
      });

      // Then trigger the edge function
      const { data, error } = await supabase.functions.invoke("fetch-google-reviews");

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Reviews fetched successfully",
          description: `Found ${data.fiveStarReviews} five-star reviews out of ${data.totalReviews} total`,
        });
      } else {
        throw new Error(data?.error || "Failed to fetch reviews");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Failed to fetch reviews",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setFetchingReviews(false);
    }
  };

  const handleSave = async () => {
    try {
      await Promise.all([
        updateSetting.mutateAsync({ 
          key: "founder_image_url", 
          value: founderImage 
        }),
        updateSetting.mutateAsync({ 
          key: "google_place_id", 
          value: placeId.trim() || null 
        }),
      ]);
      toast({ title: "Settings saved successfully" });
    } catch (error) {
      toast({ 
        title: "Failed to save settings", 
        variant: "destructive" 
      });
    }
  };

  const isLoading = founderLoading || placeIdLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-foreground mb-2">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage site-wide content and integrations
        </p>
      </div>

      {/* About Page Section */}
      <section className="border border-border rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-serif text-xl text-foreground">About Page</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              Founder Image
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a photo of Dean Oliver for the "Meet the Founder" section. 
              Recommended: Square aspect ratio (1:1), minimum 800x800px.
            </p>
            
            {founderImage ? (
              <div className="relative group w-64">
                <img
                  src={founderImage}
                  alt="Founder"
                  className="w-64 h-64 object-cover rounded-sm"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="founder-image-upload"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <label htmlFor="founder-image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    disabled={uploading}
                    asChild
                  >
                    <span>
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </>
                      )}
                    </span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or WebP, up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="border border-border rounded-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-serif text-xl text-foreground">Google Reviews</h2>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="google-place-id" className="text-sm font-medium text-foreground mb-2 block">
              Google Place ID
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Google Place ID to display 5-star reviews in the Testimonials section.
              Find your Place ID at{" "}
              <a 
                href="https://developers.google.com/maps/documentation/places/web-service/place-id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brass underline hover:no-underline"
              >
                Google's Place ID Finder
              </a>
              .
            </p>
            
            <div className="flex gap-3 max-w-lg">
              <Input
                id="google-place-id"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
                placeholder="ChIJ..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleFetchReviews}
                disabled={fetchingReviews || !placeId.trim()}
              >
                {fetchingReviews ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Fetch Reviews
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Only 5-star reviews with written text will be displayed. The API returns up to 5 reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="pt-4 border-t border-border">
        <Button 
          onClick={handleSave} 
          disabled={updateSetting.isPending}
        >
          {updateSetting.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
