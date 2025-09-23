
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

            {/* Phone Number - Commented out */}
            {/* <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-primary/5 to-csa-accent/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-primary/10 hover:border-primary/20 transition-all duration-300 mb-1">
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              </div>
              <a 
                href="tel:+1-415-417-0991" 
                className="text-xs sm:text-sm font-semibold text-primary hover:text-csa-accent transition-colors duration-300"
              >
                +1 415 417 0991
              </a>
            </div> */}
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
                    <Button 
                      variant="ghost" 
                      className="relative flex items-center space-x-3 px-2 py-1.5 h-auto bg-gradient-to-r from-orange-50 to-blue-50 hover:from-orange-100 hover:to-blue-100 border border-orange-200/50 hover:border-orange-300/70 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                    >
                      {/* Avatar Circle */}
                      <div className="relative">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        {isAdmin && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                            <Shield className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* User Info */}
                      <div className="hidden sm:flex flex-col items-start min-w-0">
                        <div className="font-semibold text-gray-800 text-sm truncate max-w-[120px] group-hover:text-gray-900 transition-colors">
                          {user?.name}
                        </div>
                      </div>
                      
                      {/* Chevron indicator */}
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/0 via-orange-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-2 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-2xl rounded-2xl overflow-hidden">
                    {/* User Header Section */}
                    <div className="relative px-4 py-4 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-blue-500/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/30">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm truncate">{user?.name}</div>
                          <div className="text-gray-600 text-xs truncate">{user?.email}</div>
                        </div>
                        {isAdmin && (
                          <div className="flex-shrink-0">
                            <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full shadow-sm flex items-center space-x-1">
                              <Shield className="h-3 w-3" />
                              <span>Admin</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-lg"></div>
                    </div>
                    
                    <div className="py-2">
                      {isAdmin && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/admin" className="group flex items-center space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 transition-all duration-200">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <Settings className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">Admin Panel</div>
                                <div className="text-gray-500 text-xs">Manage system settings</div>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <div className="mx-4 my-2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        </>
                      )}
                      
                      <DropdownMenuItem onClick={async () => await logout()} className="group flex items-center space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                          <LogOut className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">Sign Out</div>
                          <div className="text-gray-500 text-xs">End your session</div>
                        </div>
                      </DropdownMenuItem>
                    </div>
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
                    <div className="space-y-4">
                      {/* Modern Mobile User Profile */}
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-lg"></div>
                        
                        <div className="relative flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/30">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-semibold text-base truncate">{user?.name}</span>
                              {isAdmin && (
                                <div className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full shadow-sm flex items-center space-x-1">
                                  <Shield className="h-2.5 w-2.5" />
                                  <span>Admin</span>
                                </div>
                              )}
                            </div>
                            <div className="text-white/80 text-sm truncate">{user?.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Modern Admin Panel Link for Mobile */}
                      {isAdmin && (
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-start text-left p-4 h-auto bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300"
                        >
                          <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                              <Settings className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white text-sm">Admin Panel</div>
                              <div className="text-white/70 text-xs">Manage system settings</div>
                            </div>
                          </Link>
                        </Button>
                      )}
                      
                      {/* Modern Logout Button */}
                      <Button
                        onClick={async () => {
                          setIsOpen(false);
                          await logout();
                        }}
                        variant="ghost"
                        className="w-full justify-start text-left p-4 h-auto bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                            <LogOut className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white text-sm">Sign Out</div>
                            <div className="text-white/70 text-xs">End your session</div>
                          </div>
                        </div>
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
