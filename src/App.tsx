import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import VehicleDetail from "./pages/VehicleDetail";
import About from "./pages/About";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import ListVehicle from "./pages/ListVehicle";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import PaymentReturn from "./pages/payment/PaymentReturn";
import PaymentCancel from "./pages/payment/PaymentCancel";
import PaymentConfirmed from "./pages/payment/PaymentConfirmed";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminAvailability from "./pages/admin/AdminAvailability";
import AdminFleet from "./pages/admin/AdminFleet";
import AdminFleetNew from "./pages/admin/AdminFleetNew";
import AdminFleetEdit from "./pages/admin/AdminFleetEdit";
import AdminBulkImport from "./pages/admin/AdminBulkImport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/fleet/:id" element={<VehicleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/list-vehicle" element={<ListVehicle />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout/:vehicleId" element={<Checkout />} />
            <Route path="/payment/return" element={<PaymentReturn />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/payment/confirmed/:bookingId" element={<PaymentConfirmed />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="availability" element={<AdminAvailability />} />
              <Route path="fleet" element={<AdminFleet />} />
              <Route path="fleet/new" element={<AdminFleetNew />} />
              <Route path="fleet/bulk-import" element={<AdminBulkImport />} />
              <Route path="fleet/:id/edit" element={<AdminFleetEdit />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;