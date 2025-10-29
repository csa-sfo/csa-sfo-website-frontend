
import { Link } from "react-router-dom";
import { Calendar, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-csa-blue via-csa-navy to-slate-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-csa-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container-site py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1 animate-fade-in">
            <div className="relative group">
              <div className="flex flex-col items-start space-y-3">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
                    alt="CSA San Francisco Chapter logo" 
                    className="h-10 sm:h-12 md:h-14 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-csa-accent/20 via-blue-400/20 to-csa-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <a 
                  href="https://indrasol.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="w-1.5 h-1.5 bg-csa-accent rounded-full animate-pulse"></div>
                  Powered by Indrasol
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              The San Francisco Chapter of the Cloud Security Alliance promotes 
              best practices for providing security assurance within cloud computing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <h3 className="font-bold text-white text-lg mb-1">Quick Links</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-csa-accent to-blue-400 rounded-full"></div>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/events" className="group flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300">
                <div className="w-1 h-1 bg-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Upcoming Events</span>
              </Link>
              <Link to="/get-involved" className="group flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300">
                <div className="w-1 h-1 bg-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Get Involved</span>
              </Link>
              <Link to="/about" className="group flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300">
                <div className="w-1 h-1 bg-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
              </Link>
              <Link to="/contact" className="group flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-all duration-300">
                <div className="w-1 h-1 bg-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <h3 className="font-bold text-white text-lg mb-1">Contact</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-csa-accent to-blue-400 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="group flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="p-1.5 bg-csa-accent/20 rounded-md group-hover:bg-csa-accent/30 transition-colors">
                  <Mail className="h-4 w-4 text-csa-accent flex-shrink-0" />
                </div>
                <a 
                  href="mailto:csasanfranciscochapter@gmail.com"
                  className="text-sm text-gray-300 hover:text-white transition-colors break-all leading-relaxed"
                >
                  csasanfranciscochapter@gmail.com
                </a>
              </div>
              <div className="group flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="p-1.5 bg-csa-accent/20 rounded-md group-hover:bg-csa-accent/30 transition-colors">
                  <MapPin className="h-4 w-4 text-csa-accent flex-shrink-0" />
                </div>
                <span className="text-sm text-gray-300 leading-relaxed">
                  San Francisco Bay Area, CA
                </span>
              </div>
            </div>
          </div>

          {/* CSA Global */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <h3 className="font-bold text-white text-lg mb-1">CSA Global</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-csa-accent to-blue-400 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <a
                href="https://cloudsecurityalliance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="p-1.5 bg-csa-accent/20 rounded-md group-hover:bg-csa-accent/30 transition-colors">
                  <ExternalLink className="h-4 w-4 text-csa-accent flex-shrink-0" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Global Website</span>
              </a>
              <a
                href="https://research.cloudsecurityalliance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="p-1.5 bg-csa-accent/20 rounded-md group-hover:bg-csa-accent/30 transition-colors">
                  <ExternalLink className="h-4 w-4 text-csa-accent flex-shrink-0" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Research Portal</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-12 sm:mt-16">
          {/* Separator with gradient */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                &copy; 2025 Cloud Security Alliance San Francisco Chapter. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-csa-accent/10 rounded-full border border-csa-accent/20">
                <div className="w-2 h-2 bg-csa-accent rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300 font-medium">501(c)3 Nonprofit Organization</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-medium">Website and AI Assistant developed by <span className="text-blue-400 font-semibold">Indrasol</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
