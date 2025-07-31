
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ChatBotWrapper from "@/components/chatbot/ChatBotWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Archive from "./pages/Archive";
import GetInvolved from "./pages/GetInvolved";
import Sponsorship from "./pages/Sponsorship";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:slug" element={<EventDetail />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
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
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
