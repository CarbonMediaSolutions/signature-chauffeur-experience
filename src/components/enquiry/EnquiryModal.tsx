import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { X, Send, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { toast } from "sonner";

interface EnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: {
    id: string;
    name: string;
    image?: string;
  };
  dateRange?: DateRange;
}

export const EnquiryModal = ({ 
  open, 
  onOpenChange, 
  vehicle,
  dateRange 
}: EnquiryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Enquiry sent successfully", {
      description: "Our team will be in touch within 24 hours.",
    });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background border-border p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-serif text-2xl font-medium text-foreground">
            {vehicle ? `Enquire About ${vehicle.name}` : "Make an Enquiry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Vehicle Summary */}
          {vehicle && (
            <div className="flex items-center gap-4 p-4 bg-secondary/50 border border-border rounded-sm">
              {vehicle.image && (
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-20 h-14 object-cover rounded-sm"
                />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{vehicle.name}</p>
                {dateRange?.from && dateRange?.to && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(dateRange.from, "d MMM")} – {format(dateRange.to, "d MMM yyyy")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Full Name *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="h-12 bg-background border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="h-12 bg-background border-border"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Phone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+27..."
                  className="h-12 bg-background border-border"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about your requirements, preferred dates, or any questions..."
                className="min-h-[100px] bg-background border-border resize-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <LuxuryButton
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Enquiry
                </>
              )}
            </LuxuryButton>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Every enquiry is personally reviewed to ensure a seamless, tailored experience.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
