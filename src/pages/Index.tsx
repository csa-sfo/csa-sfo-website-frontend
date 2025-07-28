import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award, TrendingUp, ExternalLink } from "lucide-react";

const stats = [
  { label: "Active Members", value: "250+", icon: Users },
  { label: "Events This Year", value: "12", icon: Calendar },
  { label: "Industry Partners", value: "25+", icon: Award },
  { label: "Years Active", value: "8", icon: TrendingUp },
];

const upcomingEvent = {
  title: "Zero Trust Architecture: Implementing Mature Security Models",
  date: "2025-01-28T17:30:00-08:00",
  location: "Adobe, 345 Park Avenue, San Jose, CA",
  excerpt: "Join us for an evening of networking and expert insights on implementing Zero Trust security frameworks in enterprise environments.",
  slug: "zero-trust-architecture-jan-2025",
  speakers: ["Satish Govindappa", "Dr. Sarah Chen"],
  tags: ["Zero Trust", "Enterprise Security"]
};

const technicalPartner = [
  { name: "Indrasol", logo: "/lovable-uploads/83c978ae-a49f-42da-9c88-adc23bf34dc3.png" },
];

const sponsors = [
  { name: "Microsoft", logo: "/api/placeholder/120/60" },
  { name: "Google Cloud", logo: "/api/placeholder/120/60" },
];

const partners = [
  { name: "Adobe", logo: "/api/placeholder/120/60" },
  { name: "Salesforce", logo: "/api/placeholder/120/60" },
  { name: "Cisco", logo: "/api/placeholder/120/60" },
  { name: "Oracle", logo: "/api/placeholder/120/60" },
];

export default function Index() {
  const eventDate = new Date(upcomingEvent.date);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="container-site py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-secondary">
                <span className="text-secondary">Advancing Cloud Security in the</span>{" "}
                <span className="text-csa-accent">Bay Area</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Join San Francisco's premier community of cloud security professionals. 
                Connect, learn, and shape the future of cloud security together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-3 shadow-lg"
                >
                  <Link to="/events">View Upcoming Events</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-csa-accent text-csa-accent hover:bg-csa-accent hover:text-white text-lg px-8 py-3 shadow-lg"
                >
                  <Link to="/get-involved">Join Our Community</Link>
                </Button>
              </div>
              
              {/* CSA Badges */}
              <div className="flex flex-col items-center sm:items-start pt-4 space-y-4">
                <div className="flex gap-4 items-center">
                  <img 
                    src="/lovable-uploads/2dad453f-52d8-4e4c-b61a-c988b8f613a1.png"
                    alt="CSA Chapter of Excellence Badge"
                    className="w-32 h-32 object-contain"
                  />
                  <img 
                    src="/lovable-uploads/d2c2311b-14e8-4df8-8a1e-950422afff50.png"
                    alt="CSA San Francisco Chapter Badge"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <p className="text-gray-600 text-sm font-medium">We are a 501(c)3 nonprofit</p>
              </div>
            </div>

            {/* Right Column - Blended Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <img 
                  src="/lovable-uploads/cc966b67-e195-47f4-9d87-2b8757659a42.png"
                  alt="Golden Gate Bridge representing San Francisco Cloud Security Alliance"
                  className="w-full h-auto object-cover opacity-90"
                />
                {/* Subtle gradient overlay for better blending */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white/30"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-csa-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-csa-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Event Section */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Next Chapter Meeting
              </h2>
              <p className="text-lg text-gray-600">
                Don't miss our upcoming event featuring industry experts and networking opportunities.
              </p>
            </div>

            <Card className="overflow-hidden shadow-lg animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">{upcomingEvent.title}</CardTitle>
                    <CardDescription className="text-gray-200">
                      {upcomingEvent.excerpt}
                    </CardDescription>
                  </div>
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-csa-accent hover:bg-csa-accent/90 text-white whitespace-nowrap"
                  >
                    <Link to={`/events/${upcomingEvent.slug}`}>
                      Register Now
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {eventDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}
                      </span>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-700">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <span>{upcomingEvent.location}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Featured Speakers</h4>
                      <div className="space-y-1">
                        {upcomingEvent.speakers.map(speaker => (
                          <div key={speaker} className="text-gray-700">{speaker}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {upcomingEvent.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Partner Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Technical Partner
            </h2>
            <p className="text-lg text-gray-600">
              Our technical partner providing cutting-edge cloud infrastructure solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 items-center justify-items-center">
            {technicalPartner.map((partner, index) => (
              <a
                key={partner.name}
                href="https://indrasol.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="h-20 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Sponsors
            </h2>
            <p className="text-lg text-gray-600">
              Thank you to our generous sponsors who support our community initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
            {sponsors.map((sponsor, index) => (
              <div 
                key={sponsor.name}
                className="grayscale hover:grayscale-0 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`}
                  className="h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600">
              Thank you to our industry partners who make our events possible.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className="grayscale hover:grayscale-0 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 section-light">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with cloud security professionals, attend exclusive events, 
            and stay ahead of the latest industry trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-3"
            >
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-3"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
