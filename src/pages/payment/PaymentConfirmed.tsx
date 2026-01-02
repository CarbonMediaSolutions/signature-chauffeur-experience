import { useParams, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { useBooking } from "@/hooks/useBookings";
import { Loader2, CheckCircle, Calendar, Car, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentConfirmed = () => {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useBooking(bookingId || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-xl mx-auto text-center py-20">
              <h1 className="font-serif text-2xl text-foreground mb-4">
                Booking Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                We couldn't find this booking.
              </p>
              <Link to="/fleet">
                <Button variant="outline">Browse Fleet</Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const startDate = parseISO(booking.start_date);
  const endDate = parseISO(booking.end_date);

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="font-serif text-3xl text-foreground mb-4">
                Booking Confirmed
              </h1>
              <p className="text-muted-foreground">
                Reference: <span className="text-foreground font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
              </p>
            </div>

            {/* Vehicle Card */}
            {booking.vehicles && (
              <div className="flex gap-6 p-6 border border-border rounded-sm mb-8">
                <div className="w-32 h-24 overflow-hidden rounded-sm flex-shrink-0">
                  <img
                    src={booking.vehicles.image}
                    alt={booking.vehicles.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Car className="h-4 w-4" />
                    <span className="text-sm">Vehicle</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground">
                    {booking.vehicles.name}
                  </h3>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              {/* Dates */}
              <div className="p-6 border border-border rounded-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Rental Period</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Pick-up</span>
                    <p className="text-foreground">{format(startDate, "EEEE, d MMMM yyyy")}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Return</span>
                    <p className="text-foreground">{format(endDate, "EEEE, d MMMM yyyy")}</p>
                  </div>
                </div>
              </div>

              {/* Customer */}
              {booking.customers && (
                <div className="p-6 border border-border rounded-sm">
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Customer Details</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      {booking.customers.full_name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {booking.customers.email}
                    </div>
                    {booking.customers.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {booking.customers.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="p-6 border border-border rounded-sm mb-8">
              <h3 className="font-medium text-foreground mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily rate</span>
                  <span className="text-foreground">R{booking.daily_rate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-medium text-foreground">Total paid</span>
                  <span className="font-serif text-xl text-foreground">
                    R{booking.total_amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fleet">
                <Button variant="outline" size="lg">
                  Browse More Vehicles
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentConfirmed;
