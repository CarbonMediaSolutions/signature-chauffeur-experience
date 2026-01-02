import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

interface PaymentRequest {
  vehicleId: string;
  startDate: string;
  endDate: string;
  dailyRate: number;
  totalAmount: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: PaymentRequest = await req.json();
    const { vehicleId, startDate, endDate, dailyRate, totalAmount, customer } = body;

    console.log("Creating payment for:", { vehicleId, startDate, endDate, totalAmount });

    // 1. Check availability one more time
    const { data: existingBookings } = await supabase
      .from("bookings")
      .select("id")
      .eq("vehicle_id", vehicleId)
      .in("status", ["pending_payment", "confirmed"])
      .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

    if (existingBookings && existingBookings.length > 0) {
      return new Response(
        JSON.stringify({ error: "These dates are no longer available" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Check for active holds
    const { data: existingHolds } = await supabase
      .from("holds")
      .select("id")
      .eq("vehicle_id", vehicleId)
      .eq("status", "active")
      .gt("expires_at", new Date().toISOString())
      .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

    if (existingHolds && existingHolds.length > 0) {
      return new Response(
        JSON.stringify({ error: "Someone else is currently booking these dates. Please try again in a few minutes." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Create or get customer
    let customerId: string;
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", customer.email.toLowerCase())
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update customer details
      await supabase
        .from("customers")
        .update({ 
          full_name: customer.fullName, 
          phone: customer.phone 
        })
        .eq("id", customerId);
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          email: customer.email.toLowerCase(),
          full_name: customer.fullName,
          phone: customer.phone,
        })
        .select("id")
        .single();

      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    // 4. Create hold (expires in 15 minutes)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const { data: hold, error: holdError } = await supabase
      .from("holds")
      .insert({
        vehicle_id: vehicleId,
        start_date: startDate,
        end_date: endDate,
        status: "active",
        expires_at: expiresAt,
      })
      .select("id")
      .single();

    if (holdError) throw holdError;

    // 5. Create pending booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        customer_id: customerId,
        vehicle_id: vehicleId,
        hold_id: hold.id,
        start_date: startDate,
        end_date: endDate,
        daily_rate: dailyRate,
        total_amount: totalAmount,
        status: "pending_payment",
      })
      .select("id")
      .single();

    if (bookingError) throw bookingError;

    console.log("Created booking:", booking.id);

    // 6. Generate PayFast payment URL
    const merchantId = Deno.env.get("PAYFAST_MERCHANT_ID");
    const merchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY");
    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") || "";

    if (!merchantId || !merchantKey) {
      // For demo/testing without PayFast credentials
      console.log("PayFast credentials not configured - returning mock URL");
      return new Response(
        JSON.stringify({ 
          paymentUrl: `${req.headers.get("origin")}/payment/return?booking_id=${booking.id}`,
          bookingId: booking.id,
          note: "PayFast not configured - simulating payment"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const origin = req.headers.get("origin") || "https://localhost:8080";
    const notifyUrl = `${supabaseUrl}/functions/v1/payfast-itn`;

    // Build PayFast data
    const pfData: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${origin}/payment/return?booking_id=${booking.id}`,
      cancel_url: `${origin}/payment/cancel?booking_id=${booking.id}`,
      notify_url: notifyUrl,
      name_first: customer.fullName.split(" ")[0],
      name_last: customer.fullName.split(" ").slice(1).join(" ") || customer.fullName,
      email_address: customer.email,
      m_payment_id: booking.id,
      amount: totalAmount.toFixed(2),
      item_name: `Vehicle Rental - ${vehicleId}`,
    };

    // Generate signature
    let signatureString = Object.keys(pfData)
      .map((key) => `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}`)
      .join("&");
    
    if (passphrase) {
      signatureString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest("MD5", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    pfData.signature = signature;

    // Build payment URL
    const paymentUrl = "https://www.payfast.co.za/eng/process?" + 
      Object.keys(pfData)
        .map((key) => `${key}=${encodeURIComponent(pfData[key])}`)
        .join("&");

    console.log("Payment URL generated for booking:", booking.id);

    return new Response(
      JSON.stringify({ paymentUrl, bookingId: booking.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error creating payment:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create payment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
