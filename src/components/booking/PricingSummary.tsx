import { differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface PricingSummaryProps {
  dailyRate: number;
  dateRange: DateRange | undefined;
}

export const PricingSummary = ({ dailyRate, dateRange }: PricingSummaryProps) => {
  if (!dateRange?.from || !dateRange?.to) {
    return (
      <div className="py-6 border-t border-border">
        <p className="text-muted-foreground text-sm">
          Select dates to see pricing breakdown
        </p>
      </div>
    );
  }

  const numberOfDays = differenceInDays(dateRange.to, dateRange.from) + 1;
  const subtotal = dailyRate * numberOfDays;
  // No additional fees for simplicity
  const total = subtotal;

  return (
    <div className="py-6 border-t border-border space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          R{dailyRate.toLocaleString()} × {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
        </span>
        <span className="text-foreground">R{subtotal.toLocaleString()}</span>
      </div>
      
      <div className="flex justify-between pt-4 border-t border-border">
        <span className="font-medium text-foreground">Total</span>
        <span className="font-serif text-xl text-foreground">
          R{total.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
