import { useBookings } from "@/hooks/useBookings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Car, CheckCircle, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Fetch all vehicles including inactive for dashboard stats
const useAllVehicles = () => {
  return useQuery({
    queryKey: ["vehicles-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("id, is_active")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });
};

const AdminDashboard = () => {
  const { data: bookings } = useBookings();
  const { data: vehicles } = useAllVehicles();

  const confirmedBookings = bookings?.filter((b) => b.status === "confirmed") || [];
  const pendingBookings = bookings?.filter((b) => b.status === "pending_payment") || [];
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.total_amount, 0);

  const activeVehicles = vehicles?.filter((v) => v.is_active) || [];
  const inactiveVehicles = vehicles?.filter((v) => !v.is_active) || [];

  const stats = [
    {
      label: "Confirmed Bookings",
      value: confirmedBookings.length,
      icon: CheckCircle,
      href: "/admin/bookings?status=confirmed",
    },
    {
      label: "Pending Payment",
      value: pendingBookings.length,
      icon: Clock,
      href: "/admin/bookings?status=pending_payment",
    },
    {
      label: "Active Vehicles",
      value: activeVehicles.length,
      icon: Car,
      href: "/admin/fleet",
      subtext: inactiveVehicles.length > 0 ? `${inactiveVehicles.length} inactive` : undefined,
    },
    {
      label: "Total Revenue",
      value: `R${totalRevenue.toLocaleString()}`,
      icon: Calendar,
      href: "/admin/bookings",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your rental business</p>
        </div>
        <Link to="/admin/fleet/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Vehicle
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="p-6 border border-border rounded-sm hover:border-foreground/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-serif text-3xl text-foreground">{stat.value}</p>
            {stat.subtext && (
              <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-foreground">Recent Bookings</h2>
          <Link
            to="/admin/bookings"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="border border-border rounded-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
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
                      {booking.start_date} — {booking.end_date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-sm ${
                          booking.status === "confirmed"
                            ? "bg-green-500/10 text-green-600"
                            : booking.status === "pending_payment"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground text-right">
                      R{booking.total_amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 border border-border rounded-sm">
            <p className="text-muted-foreground">No bookings yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
