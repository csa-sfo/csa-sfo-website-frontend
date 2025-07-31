
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, User, Settings, LogOut, Shield } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

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
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

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
        <div className="flex justify-between h-14 sm:h-16">
          {/* Logo and Phone Number Group - Bottom Aligned */}
          <div className="flex items-end space-x-3 sm:space-x-4 md:space-x-6">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex flex-col items-start font-semibold text-base sm:text-lg"
              aria-label="CSA San Francisco Chapter Home"
            >
              <img 
                src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
                alt="CSA San Francisco Chapter logo" 
                className="h-8 sm:h-10 md:h-12"
              />
            </Link>

            {/* Phone Number */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-primary/5 to-csa-accent/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-primary/10 hover:border-primary/20 transition-all duration-300 mb-1">
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              </div>
              <a 
                href="tel:+1-415-555-0123" 
                className="text-xs sm:text-sm font-semibold text-primary hover:text-csa-accent transition-colors duration-300"
              >
                (415) 555-0123
              </a>
            </div>
          </div>

          {/* Desktop Navigation - Center Aligned */}
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
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user?.name}</span>
                      {isAdmin && <Shield className="h-3 w-3 text-orange-500" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-gray-500 text-xs">{user?.email}</div>
                      {isAdmin && (
                        <div className="text-orange-600 text-xs font-medium mt-1">
                          Administrator
                        </div>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center space-x-2">
                            <Settings className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={handleAuthClick}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 text-sm"
                >
                  Sign Up
                </Button>
              )}
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
                  
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      {/* User Info */}
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-white" />
                          <span className="text-white font-medium">{user?.name}</span>
                          {isAdmin && <Shield className="h-3 w-3 text-orange-300" />}
                        </div>
                        <div className="text-white/70 text-sm mt-1">{user?.email}</div>
                        {isAdmin && (
                          <div className="text-orange-300 text-xs font-medium mt-1">
                            Administrator
                          </div>
                        )}
                      </div>
                      
                      {/* Admin Panel Link for Mobile */}
                      {isAdmin && (
                        <Button
                          asChild
                          className="bg-white/20 text-white hover:bg-white/30 w-full py-3 text-base font-medium"
                        >
                          <Link to="/admin" onClick={() => setIsOpen(false)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </Button>
                      )}
                      
                      {/* Logout Button */}
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                        className="bg-red-600 text-white hover:bg-red-700 w-full py-3 text-base font-medium"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        handleAuthClick();
                      }}
                      className="bg-orange-500 text-white hover:bg-orange-600 w-full py-3 text-base font-medium"
                    >
                      Sign Up
                    </Button>
                  )}
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
