import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { MessageCircle, Copy, Phone, Mail, Check } from "lucide-react";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/siteConfig";
import { toast } from "sonner";

interface WhatsAppEnquiryProps {
  vehicleName: string;
  dailyRate: number;
  unavailableDates?: Date[];
}

export const WhatsAppEnquiry = ({ 
  vehicleName, 
  dailyRate, 
  unavailableDates = [] 
}: WhatsAppEnquiryProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [dateError, setDateError] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildMessage = (): string => {
    if (!dateRange?.from || !dateRange?.to) return "";

    const startDate = format(dateRange.from, "d MMM yyyy");
    const endDate = format(dateRange.to, "d MMM yyyy");
    
    let message = `Hi Signature Car Rentals, I'm interested in the ${vehicleName} from ${startDate} to ${endDate}.`;
    
    if (location.trim()) {
      message += `\n\nPickup/Delivery: ${location.trim()}`;
    }
    
    if (notes.trim()) {
      message += `\n\nNotes: ${notes.trim()}`;
    }
    
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

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setDateError(false);
    }
  };

  return (
    <div className="sticky top-[120px] p-8 bg-secondary/50 border border-border">
      {/* Pricing */}
      <p className="text-caption text-muted-foreground tracking-luxury mb-2">
        Starting From
      </p>
      <p className="text-3xl font-serif font-medium text-foreground mb-1">
        R{dailyRate.toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        per day
      </p>

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

      {/* Date Summary */}
      {dateRange?.from && dateRange?.to && (
        <div className="py-3 border-y border-border mb-5">
          <p className="text-sm text-foreground font-medium">
            {format(dateRange.from, "d MMM")} – {format(dateRange.to, "d MMM yyyy")}
          </p>
        </div>
      )}

      {/* Pickup/Delivery Location - Optional */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Pickup / Delivery Location
        </p>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value.slice(0, 200))}
          placeholder="e.g. Cape Town Airport"
          className="h-11 bg-background border-border"
        />
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
          className="h-12 w-12 flex items-center justify-center border border-border bg-background hover:bg-secondary transition-colors duration-200 rounded-sm"
          title="Copy message to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
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
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Mail className="w-4 h-4" />
          Email us
        </a>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
        Every enquiry is personally reviewed to ensure a seamless, tailored experience.
      </p>
    </div>
  );
};
