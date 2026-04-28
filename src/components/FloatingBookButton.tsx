import { CalendarCheck } from "lucide-react";
import FareHarborButton from "./FareHarborButton";

const FloatingBookButton = () => {
  return (
    <div
      className="fixed bottom-24 right-6 z-50 animate-fade-in-up"
      style={{ animationDelay: "0.3s" }}
    >
      <FareHarborButton
        variant="primary"
        size="md"
        className="shadow-[0_10px_30px_-10px_hsl(var(--foreground)/0.4)]"
      >
        <CalendarCheck className="w-4 h-4" />
        Book Now
      </FareHarborButton>
    </div>
  );
};

export default FloatingBookButton;
