import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useBooking } from "@/hooks/useBookings";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const { data: booking, isLoading, refetch } = useBooking(bookingId || "");
  const [pollCount, setPollCount] = useState(0);

  // Poll for booking confirmation (ITN may take a moment)
  useEffect(() => {
    if (booking?.status === "confirmed" || pollCount >= 10) return;

    const timer = setTimeout(() => {
      refetch();
      setPollCount((c) => c + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [booking, pollCount, refetch]);

  const isConfirmed = booking?.status === "confirmed";
  const isPending = booking?.status === "pending_payment";

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-xl mx-auto text-center">
            {isLoading ? (
              <div className="py-20">
                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mx-auto mb-6" />
                <h1 className="font-serif text-2xl text-foreground mb-4">
                  Processing Payment
                </h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment...
                </p>
              </div>
            ) : isConfirmed ? (
              <div className="py-20">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h1 className="font-serif text-3xl text-foreground mb-4">
                  Booking Confirmed
                </h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for your booking. You will receive a confirmation email shortly.
                </p>
                <Link to={`/payment/confirmed/${bookingId}`}>
                  <Button size="lg">View Booking Details</Button>
                </Link>
              </div>
            ) : isPending ? (
              <div className="py-20">
                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mx-auto mb-6" />
                <h1 className="font-serif text-2xl text-foreground mb-4">
                  Payment Received
                </h1>
                <p className="text-muted-foreground mb-4">
                  We're confirming your payment. This usually takes just a moment.
                </p>
                <p className="text-sm text-muted-foreground">
                  You can safely close this page. We'll send you a confirmation email once complete.
                </p>
              </div>
            ) : (
              <div className="py-20">
                <h1 className="font-serif text-2xl text-foreground mb-4">
                  Booking Not Found
                </h1>
                <p className="text-muted-foreground mb-8">
                  We couldn't find this booking. Please contact support if you believe this is an error.
                </p>
                <Link to="/fleet">
                  <Button variant="outline">Browse Fleet</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentReturn;
