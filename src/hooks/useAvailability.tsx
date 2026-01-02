import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { addDays, eachDayOfInterval, isWithinInterval, parseISO } from "date-fns";

interface DateRange {
  from: Date;
  to: Date;
}

interface UnavailablePeriod {
  start_date: string;
  end_date: string;
}

export const useUnavailableDates = (vehicleId: string) => {
  return useQuery({
    queryKey: ["unavailable-dates", vehicleId],
    queryFn: async () => {
      // Fetch confirmed bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("start_date, end_date")
        .eq("vehicle_id", vehicleId)
        .in("status", ["pending_payment", "confirmed"]);

      if (bookingsError) throw bookingsError;

      // Fetch active holds
      const { data: holds, error: holdsError } = await supabase
        .from("holds")
        .select("start_date, end_date")
        .eq("vehicle_id", vehicleId)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString());

      if (holdsError) throw holdsError;

      // Fetch availability blocks
      const { data: blocks, error: blocksError } = await supabase
        .from("availability_blocks")
        .select("start_date, end_date")
        .eq("vehicle_id", vehicleId);

      if (blocksError) throw blocksError;

      // Combine all unavailable periods
      const allPeriods: UnavailablePeriod[] = [
        ...(bookings || []),
        ...(holds || []),
        ...(blocks || []),
      ];

      // Convert to array of individual dates
      const unavailableDates: Date[] = [];
      allPeriods.forEach((period) => {
        const start = parseISO(period.start_date);
        const end = parseISO(period.end_date);
        const days = eachDayOfInterval({ start, end });
        unavailableDates.push(...days);
      });

      return unavailableDates;
    },
    enabled: !!vehicleId,
    staleTime: 30000, // 30 seconds
  });
};

export const useCheckAvailability = (
  vehicleId: string,
  dateRange: DateRange | null
) => {
  return useQuery({
    queryKey: ["check-availability", vehicleId, dateRange?.from, dateRange?.to],
    queryFn: async () => {
      if (!dateRange?.from || !dateRange?.to) return { available: false };

      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];

      // Check for overlapping bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("id")
        .eq("vehicle_id", vehicleId)
        .in("status", ["pending_payment", "confirmed"])
        .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

      if (bookingsError) throw bookingsError;
      if (bookings && bookings.length > 0) return { available: false };

      // Check for overlapping holds
      const { data: holds, error: holdsError } = await supabase
        .from("holds")
        .select("id")
        .eq("vehicle_id", vehicleId)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

      if (holdsError) throw holdsError;
      if (holds && holds.length > 0) return { available: false };

      // Check for overlapping blocks
      const { data: blocks, error: blocksError } = await supabase
        .from("availability_blocks")
        .select("id")
        .eq("vehicle_id", vehicleId)
        .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

      if (blocksError) throw blocksError;
      if (blocks && blocks.length > 0) return { available: false };

      return { available: true };
    },
    enabled: !!vehicleId && !!dateRange?.from && !!dateRange?.to,
  });
};

export const useAvailableVehicles = (dateRange: DateRange | null) => {
  return useQuery({
    queryKey: ["available-vehicles", dateRange?.from?.toISOString(), dateRange?.to?.toISOString()],
    queryFn: async () => {
      if (!dateRange?.from || !dateRange?.to) return [];

      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];

      // Get all active vehicles
      const { data: vehicles, error: vehiclesError } = await supabase
        .from("vehicles")
        .select("id")
        .eq("is_active", true);

      if (vehiclesError) throw vehiclesError;
      if (!vehicles) return [];

      // Get vehicle IDs with overlapping bookings
      const { data: bookedVehicles, error: bookingsError } = await supabase
        .from("bookings")
        .select("vehicle_id")
        .in("status", ["pending_payment", "confirmed"])
        .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

      if (bookingsError) throw bookingsError;

      // Get vehicle IDs with overlapping holds
      const { data: heldVehicles, error: holdsError } = await supabase
        .from("holds")
        .select("vehicle_id")
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

      if (holdsError) throw holdsError;

      // Get vehicle IDs with overlapping blocks
      const { data: blockedVehicles, error: blocksError } = await supabase
        .from("availability_blocks")
        .select("vehicle_id")
        .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

      if (blocksError) throw blocksError;

      // Combine unavailable vehicle IDs
      const unavailableIds = new Set([
        ...(bookedVehicles || []).map((b) => b.vehicle_id),
        ...(heldVehicles || []).map((h) => h.vehicle_id),
        ...(blockedVehicles || []).map((bl) => bl.vehicle_id),
      ]);

      // Return available vehicle IDs
      return vehicles
        .filter((v) => !unavailableIds.has(v.id))
        .map((v) => v.id);
    },
    enabled: !!dateRange?.from && !!dateRange?.to,
  });
};
