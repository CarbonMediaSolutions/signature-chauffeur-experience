import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import { MessageCircle, Phone, Mail, Copy, Check, Loader2 } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { PlacesAutocomplete, PlaceResult } from "@/components/ui/places-autocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/lib/siteConfig";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WhatsAppEnquiryProps {
  vehicleName: string;
  dailyRate: number;
  unavailableDates?: Date[];
  multiDayThreshold?: number;
  multiDayDiscountPercent?: number;
  securityDeposit?: number | null;
}

const formatCurrency = (amount: number) => {
  return `R${amount.toLocaleString()}`;
};

export const WhatsAppEnquiry = ({
  vehicleName,
  dailyRate,
  unavailableDates = [],
  multiDayThreshold = 4,
  multiDayDiscountPercent = 10,
  securityDeposit,
}: WhatsAppEnquiryProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [location, setLocation] = useState<PlaceResult>({ address: "" });
  const [serviceType, setServiceType] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [dateError, setDateError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Calculate pricing
  const pricing = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return null;
    }

    const numDays = differenceInDays(dateRange.to, dateRange.from) + 1;
    const qualifiesForDiscount = numDays >= multiDayThreshold;
    const discountedDailyRate = Math.round(dailyRate * (1 - multiDayDiscountPercent / 100));
    const effectiveRate = qualifiesForDiscount ? discountedDailyRate : dailyRate;
    const totalEstimate = numDays * effectiveRate;
    const savings = qualifiesForDiscount ? numDays * (dailyRate - discountedDailyRate) : 0;

    return {
      numDays,
      qualifiesForDiscount,
      discountedDailyRate,
      effectiveRate,
      totalEstimate,
      savings,
    };
  }, [dateRange, dailyRate, multiDayThreshold, multiDayDiscountPercent]);

  const buildMessage = (): string => {
    let message = `Hi Signature Car Rentals, I'm interested in the ${vehicleName}.`;

    if (dateRange?.from && dateRange?.to) {
      const startDate = format(dateRange.from, "d MMM yyyy");
      const endDate = format(dateRange.to, "d MMM yyyy");
      message += `\n\nPreferred Dates: ${startDate} to ${endDate}`;
      if (pricing) {
        message += ` (${pricing.numDays} day${pricing.numDays !== 1 ? 's' : ''})`;
      }
    }

    if (serviceType) {
      message += `\n\nService Type: ${serviceType}`;
    }

    if (location.address.trim()) {
      message += `\n\nPickup/Delivery: ${location.address.trim()}`;
    }

    if (notes.trim()) {
      message += `\n\nNotes: ${notes.trim()}`;
    }

    message += "\n\nPlease let me know availability and next steps.";

    return message;
  };

  const handleWhatsAppClick = () => {
    if (!dateRange?.from || !dateRange?.to) {
      setDateError(true);
      return;
    }
    
    setDateError(false);
    const message = buildMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyMessage = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      setDateError(true);
      return;
    }
    
    setDateError(false);
    const message = buildMessage();
    
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success("Message copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy message");
    }
  };

  const handleEmailEnquiry = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      setDateError(true);
      return;
    }

    setDateError(false);
    setIsSendingEmail(true);

    try {
      const message = buildMessage();
      const startDate = format(dateRange.from, "yyyy-MM-dd");
      const endDate = format(dateRange.to, "yyyy-MM-dd");

      const { error } = await supabase.functions.invoke("send-contact-enquiry", {
        body: {
          name: "Vehicle Page Enquiry",
          email: siteConfig.contact.email,
          phone: "N/A",
          enquiryType: vehicleName,
          preferredVehicle: vehicleName,
          startDate,
          endDate,
          message,
          referralSource: "Vehicle Page Enquiry",
        },
      });

      if (error) throw error;
      toast.success("Enquiry sent successfully! We'll be in touch shortly.");
    } catch (err) {
      console.error("Email enquiry error:", err);
      toast.error("Failed to send enquiry. Please try again or use WhatsApp.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setDateError(false);
    }
  };

  const handleLocationChange = (result: PlaceResult) => {
    setLocation(result);
  };

  return (
    <div className="sticky top-[120px] p-8 bg-secondary/50 border border-border">
      {/* Pricing Header */}
      <p className="text-caption text-muted-foreground tracking-luxury mb-2">
        Starting From
      </p>
      <div className="flex items-baseline gap-2 flex-wrap">
        {pricing?.qualifiesForDiscount ? (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {formatCurrency(dailyRate)}
            </span>
            <span className="text-3xl font-serif font-medium text-foreground">
              {formatCurrency(pricing.discountedDailyRate)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-serif font-medium text-foreground">
            {formatCurrency(dailyRate)}
          </span>
        )}
        <span className="text-sm text-muted-foreground">per day</span>
      </div>
      {multiDayThreshold > 1 && (
        <p className="text-xs text-muted-foreground mt-1 mb-6">
          {multiDayDiscountPercent}% off for {multiDayThreshold}+ days
        </p>
      )}

      {/* Date Picker - Required */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Rental Dates <span className="text-accent">*</span>
        </p>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={handleDateChange}
          unavailableDates={unavailableDates}
        />
        {dateError && (
          <p className="text-xs text-destructive mt-2">
            Please select your rental dates to continue.
          </p>
        )}
      </div>

      {/* Pricing Breakdown */}
      {pricing && (
        <div className="bg-background/50 border border-border/50 p-4 mb-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {pricing.numDays} day{pricing.numDays !== 1 ? 's' : ''} × {formatCurrency(pricing.effectiveRate)}/day
            </span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(pricing.totalEstimate)}
            </span>
          </div>
          {pricing.qualifiesForDiscount && (
            <div className="flex justify-between items-center text-accent">
              <span className="text-sm">
                Multi-day discount ({multiDayDiscountPercent}%)
              </span>
              <span className="text-sm font-medium">
                Save {formatCurrency(pricing.savings)}
              </span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Estimated Rental Total
            </span>
            <span className="text-lg font-serif text-foreground">
              {formatCurrency(pricing.totalEstimate)}
            </span>
          </div>
          {securityDeposit && securityDeposit > 0 && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Security Deposit (refundable)
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatCurrency(securityDeposit)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  Total Payable
                </span>
                <span className="text-xl font-serif text-foreground">
                  {formatCurrency(pricing.totalEstimate + securityDeposit)}
                </span>
              </div>
            </>
          )}
          <p className="text-[10px] text-muted-foreground italic">
            Prices are indicative. Final pricing confirmed upon enquiry.
          </p>
        </div>
      )}

      {/* Pickup/Delivery Location with Google Places */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Pickup / Delivery Location
        </p>
        <PlacesAutocomplete
          value={location.address}
          onChange={handleLocationChange}
          placeholder="e.g. Cape Town Airport"
        />
      </div>

      {/* Service Type Dropdown */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Service Type
        </p>
        <Select value={serviceType} onValueChange={setServiceType}>
          <SelectTrigger className="h-11 bg-background border-border">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <SelectItem value="Self-Drive">Self-Drive</SelectItem>
            <SelectItem value="Chauffeur">Chauffeur</SelectItem>
            <SelectItem value="Events">Events</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes - Optional */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Notes / Special Requests
        </p>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, 500))}
          placeholder="Any additional requirements..."
          className="min-h-[80px] bg-background border-border resize-none"
        />
      </div>

      {/* Primary CTA - WhatsApp */}
      <div className="flex gap-2 mb-4">
        <LuxuryButton
          variant="default"
          size="lg"
          className="flex-1"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Enquire on WhatsApp
        </LuxuryButton>
        <button
          onClick={handleCopyMessage}
          className="w-12 py-4 flex items-center justify-center border border-border bg-background hover:bg-secondary transition-colors duration-200 rounded-sm"
          title="Copy message to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Secondary CTAs */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Phone className="w-4 h-4" />
          Call us
        </a>
        <span className="text-border">•</span>
        <button
          onClick={handleEmailEnquiry}
          disabled={isSendingEmail}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 disabled:opacity-50"
        >
          {isSendingEmail ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {isSendingEmail ? "Sending..." : "Email us"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
        Every enquiry is personally reviewed to ensure a seamless, tailored experience.
      </p>
    </div>
  );
};
