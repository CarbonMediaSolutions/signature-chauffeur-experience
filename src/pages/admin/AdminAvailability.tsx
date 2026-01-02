import { useState } from "react";
import { format, parseISO } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useVehicles } from "@/hooks/useVehicles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface AvailabilityBlock {
  id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  created_at: string;
}

const AdminAvailability = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: vehicles } = useVehicles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [vehicleId, setVehicleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const { data: blocks, isLoading } = useQuery({
    queryKey: ["availability-blocks-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("availability_blocks")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw error;
      return data as AvailabilityBlock[];
    },
  });

  const createBlock = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("availability_blocks").insert({
        vehicle_id: vehicleId,
        start_date: startDate,
        end_date: endDate,
        reason: reason || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability-blocks-admin"] });
      toast({ title: "Availability block created" });
      setIsDialogOpen(false);
      setVehicleId("");
      setStartDate("");
      setEndDate("");
      setReason("");
    },
    onError: () => {
      toast({ title: "Failed to create block", variant: "destructive" });
    },
  });

  const deleteBlock = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("availability_blocks")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability-blocks-admin"] });
      toast({ title: "Availability block deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete block", variant: "destructive" });
    },
  });

  const getVehicleName = (id: string) => {
    return vehicles?.find((v) => v.id === id)?.name || id;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleId || !startDate || !endDate) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    createBlock.mutate();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Availability Blocks</h1>
          <p className="text-muted-foreground">Block dates for maintenance or other reasons</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Block
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Availability Block</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select value={vehicleId} onValueChange={setVehicleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles?.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason (optional)</Label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Maintenance, Service, Reserved"
                />
              </div>

              <Button type="submit" className="w-full" disabled={createBlock.isPending}>
                {createBlock.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Block
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blocks List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : blocks && blocks.length > 0 ? (
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dates
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blocks.map((block) => (
                <tr key={block.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">
                    {getVehicleName(block.vehicle_id)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {format(parseISO(block.start_date), "d MMM yyyy")} — {format(parseISO(block.end_date), "d MMM yyyy")}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {block.reason || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => deleteBlock.mutate(block.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 border border-border rounded-sm">
          <p className="text-muted-foreground">No availability blocks</p>
        </div>
      )}
    </div>
  );
};

export default AdminAvailability;
