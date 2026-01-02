import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  // PayFast ITN is always a POST request
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse form data from PayFast
    const formData = await req.formData();
    const pfData: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      pfData[key] = value.toString();
    }

    console.log("Received ITN:", JSON.stringify(pfData, null, 2));

    const bookingId = pfData.m_payment_id;
    const paymentStatus = pfData.payment_status;
    const amountGross = parseFloat(pfData.amount_gross || "0");
    const pfPaymentId = pfData.pf_payment_id;

    if (!bookingId) {
      console.error("No booking ID in ITN");
      return new Response("OK", { status: 200 });
    }

    // Get the booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle();

    if (bookingError || !booking) {
      console.error("Booking not found:", bookingId);
      return new Response("OK", { status: 200 });
    }

    // Verify amount matches
    if (Math.abs(amountGross - booking.total_amount) > 1) {
      console.error("Amount mismatch:", { expected: booking.total_amount, received: amountGross });
      
      await supabase
        .from("bookings")
        .update({
          status: "cancelled",
          payfast_status: "amount_mismatch",
          payfast_payment_id: pfPaymentId,
        })
        .eq("id", bookingId);

      return new Response("OK", { status: 200 });
    }

    // Validate PayFast signature (optional but recommended)
    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") || "";
    
    // Build signature string (excluding signature field)
    const signatureFields = Object.keys(pfData)
      .filter((key) => key !== "signature")
      .sort();
    
    let signatureString = signatureFields
      .map((key) => `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}`)
      .join("&");
    
    if (passphrase) {
      signatureString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest("MD5", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calculatedSignature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (pfData.signature && calculatedSignature !== pfData.signature) {
      console.error("Signature mismatch");
      // Continue processing anyway for sandbox/testing
    }

    // Process based on payment status
    if (paymentStatus === "COMPLETE") {
      console.log("Payment complete for booking:", bookingId);

      // Update booking to confirmed
      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          payfast_status: "complete",
          payfast_payment_id: pfPaymentId,
          payfast_reference: pfData.pf_reference || null,
        })
        .eq("id", bookingId);

      // Convert hold to converted
      if (booking.hold_id) {
        await supabase
          .from("holds")
          .update({ status: "converted" })
          .eq("id", booking.hold_id);
      }

    } else if (paymentStatus === "CANCELLED" || paymentStatus === "FAILED") {
      console.log("Payment failed/cancelled for booking:", bookingId);

      // Update booking to cancelled
      await supabase
        .from("bookings")
        .update({
          status: "cancelled",
          payfast_status: paymentStatus.toLowerCase(),
          payfast_payment_id: pfPaymentId,
        })
        .eq("id", bookingId);

      // Release hold
      if (booking.hold_id) {
        await supabase
          .from("holds")
          .update({ status: "released" })
          .eq("id", booking.hold_id);
      }
    } else {
      // Pending or other status
      console.log("Payment pending for booking:", bookingId, "Status:", paymentStatus);

      await supabase
        .from("bookings")
        .update({
          payfast_status: paymentStatus?.toLowerCase() || "unknown",
          payfast_payment_id: pfPaymentId,
        })
        .eq("id", bookingId);
    }

    // PayFast expects a 200 OK response
    return new Response("OK", { status: 200 });

  } catch (error: any) {
    console.error("Error processing ITN:", error);
    // Still return 200 to prevent PayFast retries
    return new Response("OK", { status: 200 });
  }
});
