
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Archive", href: "/archive" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <header className="bg-white text-primary sticky top-0 z-50 border-b border-primary/20">
      <div className="container-site">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 font-semibold text-base sm:text-lg"
            aria-label="CSA San Francisco Chapter Home"
          >
            <img 
              src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
              alt="CSA San Francisco Chapter logo" 
              className="h-8 sm:h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <nav className="flex items-center space-x-6 xl:space-x-8" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive(item.href) 
                      ? "text-accent border-b-2 border-accent pb-1" 
                      : "text-primary"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Auth and Sponsorship Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                asChild
                className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 text-sm"
              >
                <Link to="/sponsorship">Sponsorship</Link>
              </Button>
              <Button
                onClick={handleAuthClick}
                className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 text-sm"
              >
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-primary hover:bg-primary/20 h-8 w-8 sm:h-10 sm:w-10"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="bg-primary border-primary/20 w-full">
              <div className="flex flex-col space-y-4 sm:space-y-6 pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 sm:space-x-3 font-semibold text-base sm:text-lg text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <img 
                      src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
                      alt="CSA San Francisco Chapter logo" 
                      className="h-8 sm:h-10 md:h-12"
                    />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-3 sm:space-y-4" aria-label="Mobile navigation">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base sm:text-lg font-medium transition-colors hover:text-accent py-2 px-4 rounded-md ${
                        isActive(item.href) ? "text-accent bg-white/10" : "text-white"
                      }`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Auth and Sponsorship Buttons */}
                <div className="flex flex-col space-y-3 sm:space-y-4 pt-4 border-t border-white/20">
                  <Button
                    asChild
                    className="bg-orange-500 text-white hover:bg-orange-600 w-full py-3 text-base font-medium"
                  >
                    <Link to="/sponsorship" onClick={() => setIsOpen(false)}>
                      Sponsorship
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      handleAuthClick();
                    }}
                    className="bg-orange-500 text-white hover:bg-orange-600 w-full py-3 text-base font-medium"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
}
