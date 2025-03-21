
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindDonor from "./pages/FindDonor";
import BecomeDonor from "./pages/BecomeDonor";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HospitalDashboard from "./pages/hospital/Dashboard";
import DonorDashboard from "./pages/donor/Dashboard";
import AlertSettings from "./pages/donor/AlertSettings";
import EmergencyRequest from "./pages/hospital/EmergencyRequest";
import EventsAndCampaigns from "./pages/EventsAndCampaigns";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-donor" element={<FindDonor />} />
            <Route path="/become-donor" element={<BecomeDonor />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<EventsAndCampaigns />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
            <Route path="/hospital/emergency-request" element={<EmergencyRequest />} />
            <Route path="/donor/dashboard" element={<DonorDashboard />} />
            <Route path="/donor/alert-settings" element={<AlertSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
