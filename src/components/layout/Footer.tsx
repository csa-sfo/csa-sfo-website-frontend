
import { Link } from "react-router-dom";
import { Calendar, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-csa-blue text-white">
      <div className="container-site py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* About Section */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
                alt="CSA San Francisco Chapter logo" 
                className="h-8 sm:h-10 md:h-12"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              The San Francisco Chapter of the Cloud Security Alliance promotes 
              best practices for providing security assurance within cloud computing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-csa-accent text-base">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/events" className="text-sm text-gray-300 hover:text-csa-accent transition-colors">
                Upcoming Events
              </Link>
              <Link to="/get-involved" className="text-sm text-gray-300 hover:text-csa-accent transition-colors">
                Get Involved
              </Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-csa-accent transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-gray-300 hover:text-csa-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-csa-accent text-base">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-csa-accent mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:sanfrancisco@cloudsecurityalliance.org"
                  className="text-sm text-gray-300 hover:text-csa-accent transition-colors break-all"
                >
                  sanfrancisco@cloudsecurityalliance.org
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-csa-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  San Francisco Bay Area, CA
                </span>
              </div>
            </div>
          </div>

          {/* CSA Global */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-csa-accent text-base">CSA Global</h3>
            <div className="space-y-3">
              <a
                href="https://cloudsecurityalliance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-csa-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                <span>Global Website</span>
              </a>
              <a
                href="https://research.cloudsecurityalliance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-csa-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                <span>Research Portal</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-csa-blue/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 space-y-2 sm:space-y-0">
          <p className="text-center sm:text-left">
            &copy; 2025 Cloud Security Alliance San Francisco Chapter. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Built with accessibility and performance in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
