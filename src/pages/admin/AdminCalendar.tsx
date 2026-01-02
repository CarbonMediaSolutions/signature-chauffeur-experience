import { useState, useMemo } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, isWithinInterval } from "date-fns";
import { useBookings } from "@/hooks/useBookings";
import { useVehicles } from "@/hooks/useVehicles";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: vehicles } = useVehicles();
  const { data: bookings } = useBookings();

  const { data: blocks } = useQuery({
    queryKey: ["availability-blocks-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("availability_blocks")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: addDays(monthEnd, 7) }).slice(0, 35);

  const getEventForVehicleAndDay = (vehicleId: string, day: Date) => {
    // Check bookings
    const booking = bookings?.find((b) => 
      b.vehicle_id === vehicleId &&
      (b.status === "confirmed" || b.status === "pending_payment") &&
      isWithinInterval(day, {
        start: parseISO(b.start_date),
        end: parseISO(b.end_date),
      })
    );

    if (booking) {
      return {
        type: booking.status === "confirmed" ? "confirmed" : "pending",
        label: booking.customers?.full_name?.split(" ")[0] || "Booked",
      };
    }

    // Check blocks
    const block = blocks?.find((b) =>
      b.vehicle_id === vehicleId &&
      isWithinInterval(day, {
        start: parseISO(b.start_date),
        end: parseISO(b.end_date),
      })
    );

    if (block) {
      return {
        type: "blocked",
        label: block.reason || "Blocked",
      };
    }

    return null;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground mb-2">Calendar</h1>
        <p className="text-muted-foreground">View all bookings and availability</p>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth((prev) => addDays(startOfMonth(prev), -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth((prev) => addDays(endOfMonth(prev), 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/50" />
          <span className="text-muted-foreground">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-yellow-500/20 border border-yellow-500/50" />
          <span className="text-muted-foreground">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-muted border border-border" />
          <span className="text-muted-foreground">Blocked</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-border rounded-sm overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border w-48">
                Vehicle
              </th>
              {days.slice(0, 14).map((day) => (
                <th
                  key={day.toISOString()}
                  className={cn(
                    "px-1 py-3 text-xs font-medium text-center border-r border-border last:border-r-0",
                    isSameDay(day, new Date())
                      ? "bg-foreground text-background"
                      : "text-muted-foreground"
                  )}
                >
                  <div>{format(day, "EEE")}</div>
                  <div className="text-sm">{format(day, "d")}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vehicles?.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-4 py-3 text-sm text-foreground border-r border-border">
                  {vehicle.name}
                </td>
                {days.slice(0, 14).map((day) => {
                  const event = getEventForVehicleAndDay(vehicle.id, day);
                  return (
                    <td
                      key={day.toISOString()}
                      className={cn(
                        "px-1 py-2 text-center border-r border-border last:border-r-0",
                        event?.type === "confirmed" && "bg-green-500/10",
                        event?.type === "pending" && "bg-yellow-500/10",
                        event?.type === "blocked" && "bg-muted"
                      )}
                    >
                      {event && (
                        <span className="text-xs text-muted-foreground truncate block max-w-[60px]">
                          {event.label}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCalendar;
