import { useState } from "react";
import { useVehicles, Vehicle } from "@/hooks/useVehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil } from "lucide-react";

const AdminFleet = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: vehicles, isLoading } = useVehicles();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    daily_rate: 0,
    image: "",
    description: "",
    transmission: "",
    seats: 0,
    limited_availability: false,
  });

  const updateVehicle = useMutation({
    mutationFn: async (data: Partial<Vehicle> & { id: string }) => {
      const { id, ...updates } = data;
      const { error } = await supabase
        .from("vehicles")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast({ title: "Vehicle updated successfully" });
      setSelectedVehicle(null);
    },
    onError: () => {
      toast({ title: "Failed to update vehicle", variant: "destructive" });
    },
  });

  const openEditDialog = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      category: vehicle.category,
      daily_rate: vehicle.daily_rate,
      image: vehicle.image,
      description: vehicle.description || "",
      transmission: vehicle.transmission || "",
      seats: vehicle.seats || 0,
      limited_availability: vehicle.limited_availability || false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    updateVehicle.mutate({
      id: selectedVehicle.id,
      ...formData,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground mb-2">Fleet Management</h1>
        <p className="text-muted-foreground">Manage your vehicle inventory</p>
      </div>

      {/* Vehicles Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : vehicles && vehicles.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="border border-border rounded-sm overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {vehicle.category}
                    </p>
                    <h3 className="font-serif text-lg text-foreground">
                      {vehicle.name}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(vehicle)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    R{vehicle.daily_rate.toLocaleString()} / day
                  </span>
                  {vehicle.limited_availability && (
                    <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-sm">
                      Limited
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-border rounded-sm">
          <p className="text-muted-foreground">No vehicles in fleet</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Daily Rate (R)</Label>
                <Input
                  type="number"
                  value={formData.daily_rate}
                  onChange={(e) => setFormData({ ...formData, daily_rate: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Transmission</Label>
                <Input
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Seats</Label>
                <Input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Limited Availability</Label>
              <Switch
                checked={formData.limited_availability}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, limited_availability: checked })
                }
              />
            </div>

            <Button type="submit" className="w-full" disabled={updateVehicle.isPending}>
              {updateVehicle.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFleet;
