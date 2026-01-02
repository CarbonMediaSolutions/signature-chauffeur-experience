import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuxuryButton } from "@/components/ui/luxury-button";

interface FleetSearchProps {
  onSearch: (dateRange: DateRange | undefined) => void;
  isSearching?: boolean;
  onClear?: () => void;
  hasActiveSearch?: boolean;
}

export const FleetSearch = ({ 
  onSearch, 
  isSearching, 
  onClear,
  hasActiveSearch 
}: FleetSearchProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleSearch = () => {
    if (dateRange?.from && dateRange?.to) {
      onSearch(dateRange);
    }
  };

  const handleClear = () => {
    setDateRange(undefined);
    onClear?.();
  };

  return (
    <div className="bg-secondary/50 border border-border p-6 md:p-8">
      <h2 className="font-serif text-xl md:text-2xl text-foreground mb-6">
        Search Available Cars
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        {/* Start Date */}
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
            Start Date
          </label>
          <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12 bg-background border-border",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  format(dateRange.from, "d MMM yyyy")
                ) : (
                  <span>Select start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background" align="start">
              <Calendar
                mode="single"
                selected={dateRange?.from}
                onSelect={(date) => {
                  setDateRange(prev => ({ ...prev, from: date }));
                  setIsStartOpen(false);
                  if (date && !dateRange?.to) {
                    setIsEndOpen(true);
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
            End Date
          </label>
          <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12 bg-background border-border",
                  !dateRange?.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.to ? (
                  format(dateRange.to, "d MMM yyyy")
                ) : (
                  <span>Select end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background" align="start">
              <Calendar
                mode="single"
                selected={dateRange?.to}
                onSelect={(date) => {
                  setDateRange(prev => ({ ...prev, to: date }));
                  setIsEndOpen(false);
                }}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  if (date < today) return true;
                  if (dateRange?.from && date < dateRange.from) return true;
                  return false;
                }}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex gap-2">
          <LuxuryButton
            variant="default"
            size="lg"
            onClick={handleSearch}
            disabled={!dateRange?.from || !dateRange?.to || isSearching}
            className="h-12 px-8"
          >
            <Search className="w-4 h-4 mr-2" />
            {isSearching ? "Searching..." : "Search Cars"}
          </LuxuryButton>
          
          {hasActiveSearch && (
            <Button
              variant="outline"
              onClick={handleClear}
              className="h-12 px-4"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {hasActiveSearch && dateRange?.from && dateRange?.to && (
        <p className="text-sm text-muted-foreground mt-4">
          Showing vehicles available from {format(dateRange.from, "d MMMM")} to {format(dateRange.to, "d MMMM yyyy")}
        </p>
      )}
    </div>
  );
};