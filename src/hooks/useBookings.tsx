import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Booking {
  id: string;
  customer_id: string;
  vehicle_id: string;
  hold_id: string | null;
  start_date: string;
  end_date: string;
  daily_rate: number;
  total_amount: number;
  status: "pending_payment" | "confirmed" | "cancelled" | "expired" | "completed";
  payfast_payment_id: string | null;
  payfast_reference: string | null;
  payfast_status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingWithDetails extends Booking {
  customers: {
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
  } | null;
  vehicles: {
    id: string;
    name: string;
    image: string;
  } | null;
}

export const useBookings = (filters?: { status?: string; vehicleId?: string }) => {
  return useQuery({
    queryKey: ["bookings", filters],
    queryFn: async () => {
      let query = supabase
        .from("bookings")
        .select(`
          *,
          customers (id, email, full_name, phone),
          vehicles (id, name, image)
        `)
        .order("created_at", { ascending: false });

      if (filters?.status) {
        query = query.eq("status", filters.status);
      }
      if (filters?.vehicleId) {
        query = query.eq("vehicle_id", filters.vehicleId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BookingWithDetails[];
    },
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          customers (id, email, full_name, phone),
          vehicles (id, name, image, daily_rate)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as BookingWithDetails | null;
    },
    enabled: !!id,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "pending_payment" | "confirmed" | "cancelled" | "expired" | "completed" }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status: status as any })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
