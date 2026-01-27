import { useState, useMemo } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type SortOption = "newest" | "updated" | "name" | "price";
type StatusFilter = "all" | "active" | "inactive";

const AdminFleet = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: vehicles, isLoading } = useVehicles();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteVehicle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("vehicles")
        .update({ is_active: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast({ title: "Vehicle deactivated" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Failed to deactivate vehicle", variant: "destructive" });
    },
  });

  // Get unique categories from vehicles
  const categories = useMemo(() => {
    if (!vehicles) return [];
    return [...new Set(vehicles.map((v) => v.category))].sort();
  }, [vehicles]);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];

    let result = [...vehicles];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((v) => v.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((v) =>
        statusFilter === "active" ? v.is_active : !v.is_active
      );
    }

    // Sort
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        result.sort((a, b) => b.daily_rate - a.daily_rate);
        break;
      case "updated":
        // Assuming updated_at exists, fallback to name
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Reverse order for newest first
        result.reverse();
        break;
    }

    return result;
  }, [vehicles, searchQuery, categoryFilter, statusFilter, sortBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Fleet Management</h1>
          <p className="text-muted-foreground">
            {vehicles?.length || 0} vehicles in fleet
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/fleet/bulk-import">
            <Button variant="outline">
              Bulk Import
            </Button>
          </Link>
          <Link to="/admin/fleet/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Vehicle
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="updated">Recently Updated</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="price">Price High-Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vehicles Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredVehicles.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="border border-border rounded-sm overflow-hidden group"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={vehicle.cover_image_url || vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!vehicle.is_active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Inactive</span>
                  </div>
                )}
                {vehicle.featured && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm">
                    Featured
                  </div>
                )}
                {(vehicle as any).is_hot && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
                    Hot
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      {vehicle.category}
                    </p>
                    <h3 className="font-serif text-lg text-foreground truncate">
                      {vehicle.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">
                    R{vehicle.daily_rate.toLocaleString()} / day
                  </span>
                  <div className="flex items-center gap-1">
                    <Link to={`/fleet/${vehicle.id}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/admin/fleet/${vehicle.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(vehicle.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {vehicle.limited_availability && (
                  <span className="inline-block mt-2 text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-sm">
                    Limited Availability
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-border rounded-sm">
          <p className="text-muted-foreground mb-4">
            {searchQuery || categoryFilter !== "all" || statusFilter !== "all"
              ? "No vehicles match your filters"
              : "No vehicles in fleet"}
          </p>
          {!searchQuery && categoryFilter === "all" && statusFilter === "all" && (
            <Link to="/admin/fleet/new">
              <Button variant="outline">Add Your First Vehicle</Button>
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Vehicle</AlertDialogTitle>
            <AlertDialogDescription>
              This will hide the vehicle from the public fleet. You can reactivate it later by editing the vehicle.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteVehicle.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteVehicle.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Deactivate"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminFleet;
