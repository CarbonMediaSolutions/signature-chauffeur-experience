import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VehicleForm, VehicleFormData } from "@/components/admin/VehicleForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminFleetNew = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createVehicle = useMutation({
    mutationFn: async (data: VehicleFormData) => {
      // Generate a slug-like ID from the name
      const id = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const { error } = await supabase.from("vehicles").insert({
        id,
        name: data.name,
        category: data.category,
        daily_rate: data.daily_rate,
        image: data.cover_image_url || data.image || "",
        description: data.description || null,
        engine: data.engine || null,
        transmission: data.transmission || null,
        seats: data.seats || null,
        features: data.features.length > 0 ? data.features : null,
        why_we_chose: data.why_we_chose || null,
        limited_availability: data.limited_availability,
        is_active: data.is_active,
        featured: data.featured,
        fuel_type: data.fuel_type || null,
        drive_type: data.drive_type || null,
        luggage_capacity: data.luggage_capacity || null,
        mileage_limit: data.mileage_limit || null,
        security_deposit: data.security_deposit || null,
        insurance_excess: data.insurance_excess || null,
        cover_image_url: data.cover_image_url || null,
        gallery_urls: data.gallery_urls,
        video_urls: data.video_urls,
        hero_video_url: data.hero_video_url || null,
        multi_day_threshold: data.multi_day_threshold || 4,
        multi_day_discount_percent: data.multi_day_discount_percent ?? 10,
        is_hot: data.is_hot || false,
        self_drive_rate: data.self_drive_rate || null,
        chauffeur_rate: data.chauffeur_rate || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast({ title: "Vehicle created successfully" });
      navigate("/admin/fleet");
    },
    onError: (error) => {
      toast({
        title: "Failed to create vehicle",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      <div className="mb-8">
        <Link to="/admin/fleet">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Fleet
          </Button>
        </Link>
        <h1 className="font-serif text-3xl text-foreground mb-2">Add New Vehicle</h1>
        <p className="text-muted-foreground">Create a new vehicle listing</p>
      </div>

      <div className="max-w-4xl">
        <VehicleForm
          onSubmit={(data) => createVehicle.mutate(data)}
          isSubmitting={createVehicle.isPending}
          submitLabel="Create Vehicle"
        />
      </div>
    </div>
  );
};

export default AdminFleetNew;
