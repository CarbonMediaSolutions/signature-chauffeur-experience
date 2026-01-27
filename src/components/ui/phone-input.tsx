import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const countryCodes = [
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+264", country: "Namibia", flag: "🇳🇦" },
  { code: "+267", country: "Botswana", flag: "🇧🇼" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, required = false, className }, ref) => {
    // Parse the value to extract country code and phone number
    const parseValue = (val: string) => {
      if (!val) return { countryCode: "+27", phoneNumber: "" };
      
      // Try to find a matching country code
      for (const cc of countryCodes) {
        if (val.startsWith(cc.code)) {
          return { 
            countryCode: cc.code, 
            phoneNumber: val.slice(cc.code.length).trim() 
          };
        }
      }
      
      // Default to South Africa if no match
      return { countryCode: "+27", phoneNumber: val };
    };

    const { countryCode, phoneNumber } = parseValue(value);

    const handleCountryCodeChange = (newCode: string) => {
      onChange(`${newCode} ${phoneNumber}`.trim());
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhone = e.target.value;
      onChange(`${countryCode} ${newPhone}`.trim());
    };

    return (
      <div className={cn("flex gap-2", className)}>
        <Select value={countryCode} onValueChange={handleCountryCodeChange}>
          <SelectTrigger className="w-[100px] px-3 py-3 bg-transparent border border-border focus:border-foreground h-auto">
            <SelectValue>
              {countryCodes.find(c => c.code === countryCode)?.flag} {countryCode}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-background border-border max-h-60">
            {countryCodes.map((cc) => (
              <SelectItem key={cc.code} value={cc.code}>
                {cc.flag} {cc.code} ({cc.country})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          ref={ref}
          type="tel"
          required={required}
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Phone number"
          className="flex-1 px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
