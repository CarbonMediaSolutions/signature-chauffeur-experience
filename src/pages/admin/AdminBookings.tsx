import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useBookings, useUpdateBookingStatus } from "@/hooks/useBookings";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending_payment", label: "Pending Payment" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "expired", label: "Expired" },
];

const AdminBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  const { toast } = useToast();
  
  const { data: bookings, isLoading } = useBookings(
    statusFilter !== "all" ? { status: statusFilter } : undefined
  );
  const updateStatus = useUpdateBookingStatus();

  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const booking = bookings?.find((b) => b.id === selectedBooking);

  const handleStatusChange = async (bookingId: string, newStatus: "pending_payment" | "confirmed" | "cancelled" | "expired" | "completed") => {
    try {
      await updateStatus.mutateAsync({ id: bookingId, status: newStatus });
      toast({ title: "Status updated successfully" });
    } catch (error) {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground mb-2">Bookings</h1>
        <p className="text-muted-foreground">Manage all vehicle reservations</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            if (value === "all") {
              searchParams.delete("status");
            } else {
              searchParams.set("status", value);
            }
            setSearchParams(searchParams);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="border border-border rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Reference
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dates
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-foreground">
                    {booking.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-foreground">
                        {booking.customers?.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.customers?.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {booking.vehicles?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {format(parseISO(booking.start_date), "d MMM")} — {format(parseISO(booking.end_date), "d MMM yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-sm ${
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-600"
                          : booking.status === "pending_payment"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : booking.status === "completed"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground text-right">
                    R{booking.total_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBooking(booking.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 border border-border rounded-sm">
          <p className="text-muted-foreground">No bookings found</p>
        </div>
      )}

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {booking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reference</p>
                  <p className="font-mono text-foreground">
                    {booking.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Select
                    value={booking.status}
                    onValueChange={(value) => handleStatusChange(booking.id, value as any)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending_payment">Pending Payment</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Customer</p>
                <p className="text-foreground">{booking.customers?.full_name}</p>
                <p className="text-sm text-muted-foreground">{booking.customers?.email}</p>
                {booking.customers?.phone && (
                  <p className="text-sm text-muted-foreground">{booking.customers?.phone}</p>
                )}
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
                <p className="text-foreground">{booking.vehicles?.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pick-up</p>
                  <p className="text-foreground">
                    {format(parseISO(booking.start_date), "d MMMM yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Return</p>
                  <p className="text-foreground">
                    {format(parseISO(booking.end_date), "d MMMM yyyy")}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-serif text-xl text-foreground">
                    R{booking.total_amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {booking.payfast_payment_id && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">PayFast Details</p>
                  <div className="text-sm space-y-1">
                    <p>Payment ID: {booking.payfast_payment_id}</p>
                    <p>Status: {booking.payfast_status}</p>
                    {booking.payfast_reference && (
                      <p>Reference: {booking.payfast_reference}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
