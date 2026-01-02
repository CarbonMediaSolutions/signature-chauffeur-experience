import { useState } from "react";
import { format, differenceInDays, addDays, isBefore, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  unavailableDates?: Date[];
  className?: string;
}

export const DateRangePicker = ({
  dateRange,
  onDateRangeChange,
  unavailableDates = [],
  className,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = startOfDay(new Date());

  const isDateUnavailable = (date: Date) => {
    // Disable past dates
    if (isBefore(date, today)) return true;
    
    // Disable unavailable dates
    return unavailableDates.some(
      (unavailable) =>
        unavailable.toDateString() === date.toDateString()
    );
  };

  const numberOfDays =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from) + 1
      : 0;

  return (
    <div className={cn("space-y-4", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-auto py-4 px-4 bg-background border-border",
              !dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
            <div className="flex flex-col items-start">
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
                    </span>
                    <span className="text-foreground">
                      {format(dateRange.from, "d MMM")} — {format(dateRange.to, "d MMM yyyy")}
                    </span>
                  </>
                ) : (
                  <span className="text-foreground">{format(dateRange.from, "d MMMM yyyy")}</span>
                )
              ) : (
                <span>Select your dates</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              onDateRangeChange(range);
              if (range?.from && range?.to) {
                setIsOpen(false);
              }
            }}
            numberOfMonths={2}
            disabled={isDateUnavailable}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
