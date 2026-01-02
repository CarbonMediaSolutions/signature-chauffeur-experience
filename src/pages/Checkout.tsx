import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { format, differenceInDays, parseISO } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVehicle } from "@/hooks/useVehicles";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const customerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
});

const Checkout = () => {
  const { vehicleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  const { data: vehicle, isLoading: vehicleLoading } = useVehicle(vehicleId || "");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate dates
  useEffect(() => {
    if (!startDate || !endDate) {
      navigate(`/fleet/${vehicleId}`);
    }
  }, [startDate, endDate, vehicleId, navigate]);

  if (vehicleLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!vehicle || !startDate || !endDate) {
    return null;
  }

  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const numberOfDays = differenceInDays(end, start) + 1;
  const totalAmount = vehicle.daily_rate * numberOfDays;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      const validation = customerSchema.safeParse({ fullName, email, phone });
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Call edge function to create payment
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          vehicleId: vehicle.id,
          startDate,
          endDate,
          dailyRate: vehicle.daily_rate,
          totalAmount,
          customer: {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
          },
        },
      });

      if (error) throw error;

      if (data?.paymentUrl) {
        // Redirect to PayFast
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <Link
            to={`/fleet/${vehicleId}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to vehicle
          </Link>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <div>
              <p className="text-caption text-muted-foreground mb-4">Checkout</p>
              <h1 className="text-display-sm text-foreground mb-8">
                Complete Your Booking
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="As it appears on your ID"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+27 XX XXX XXXX"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay R${totalAmount.toLocaleString()}`
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  You will be redirected to PayFast to complete payment securely.
                </p>
              </form>
            </div>

            {/* Right: Summary */}
            <div className="lg:pl-8 lg:border-l border-border">
              <div className="sticky top-32">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-caption text-muted-foreground mb-2">
                  {vehicle.category}
                </p>
                <h2 className="font-serif text-2xl text-foreground mb-6">
                  {vehicle.name}
                </h2>

                <div className="space-y-4 py-6 border-t border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pick-up</span>
                    <span className="text-foreground">{format(start, "d MMMM yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return</span>
                    <span className="text-foreground">{format(end, "d MMMM yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground">
                      {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      R{vehicle.daily_rate.toLocaleString()} × {numberOfDays} days
                    </span>
                    <span className="text-foreground">
                      R{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-border">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-serif text-2xl text-foreground">
                      R{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
