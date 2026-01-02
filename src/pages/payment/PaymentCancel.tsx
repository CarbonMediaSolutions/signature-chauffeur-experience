import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-xl mx-auto text-center py-20">
            <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            
            <h1 className="font-serif text-3xl text-foreground mb-4">
              Payment Cancelled
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Your payment was cancelled and no charges were made. 
              Your date selection has been released.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fleet">
                <Button variant="outline" size="lg">
                  Browse Fleet
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

export default PaymentCancel;
