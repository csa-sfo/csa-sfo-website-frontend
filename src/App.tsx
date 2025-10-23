import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import About from "./pages/About";
import Admin from "./pages/Admin";
import { AdminRoute } from "@/components/auth/ProtectedRoute";
import Archive from "./pages/Archive";
import ChatBotWrapper from "@/components/chatbot/ChatBotWrapper";
import Contact from "./pages/Contact";
import EventDetail from "./pages/EventDetail";
import Events from "./pages/Events";
import { Footer } from "@/components/layout/Footer";
import Gallery from "./pages/Gallery";
import GetInvolved from "./pages/GetInvolved";
import { Header } from "@/components/layout/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Sponsorship from "./pages/Sponsorship";
import SponsorshipSuccess from "./pages/SponsorshipSuccess";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProfileDialog } from "@/components/auth/UserProfileDialog";
import AuthCallback from "./pages/AuthCallback";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const AppContent = () => {
  const { showProfileDialog, completeProfile, loading } = useAuth();

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetail />} />
              {/* <Route path="/archive" element={<Archive />} /> */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/google-callback" element={<AuthCallback />} />
              <Route path="/linkedin-callback" element={<AuthCallback />} />
              <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/sponsorship/success" element={<SponsorshipSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ChatBotWrapper />
        </div>
      </BrowserRouter>
      <UserProfileDialog
        isOpen={showProfileDialog}
        onClose={() => {}} // Profile completion is required, so no close button
        onSave={completeProfile}
        loading={loading}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
