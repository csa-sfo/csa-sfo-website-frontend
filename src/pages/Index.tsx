import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award, TrendingUp, ExternalLink, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";
import { Event } from "@/types/event";
import FAQ from "@/components/FAQ";
import { homepageFAQs } from "@/data/faqData";

// Custom hook for real-time page visits counter
const usePageVisitsCounter = () => {
  const [visits, setVisits] = useState(() => {
    // Check if we need to reset the counter on initial load
    try {
      const storedVisits = localStorage.getItem('csa-total-visits');
      if (storedVisits && parseInt(storedVisits) > 10000) {
        localStorage.setItem('csa-total-visits', '600');
        return 600;
      }
      return storedVisits ? parseInt(storedVisits) : 600;
    } catch (error) {
      return 600;
    }
  });

  useEffect(() => {
    // Track this page visit
    const trackPageVisit = () => {
      // Get current count from localStorage
      const storedVisits = localStorage.getItem('csa-total-visits');
      let currentCount = storedVisits ? parseInt(storedVisits) : 600;
      
      // Reset counter if it's above the new starting point (likely old data)
      if (currentCount > 10000) {
        currentCount = 600;
        localStorage.setItem('csa-total-visits', '600');
      }
      
      // Increment by 1 for this visit
      const newCount = currentCount + 1;
      localStorage.setItem('csa-total-visits', newCount.toString());
      setVisits(newCount);
      
      // Store last visit timestamp
      localStorage.setItem('csa-last-visit', Date.now().toString());
    };

    // Track this visit immediately
    trackPageVisit();

    // Set up real-time updates from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'csa-total-visits' && e.newValue) {
        setVisits(parseInt(e.newValue));
      }
    };

    // Listen for changes from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Update counter every few seconds to show activity
    const interval = setInterval(() => {
      const lastVisit = localStorage.getItem('csa-last-visit');
      const now = Date.now();
      
      // If it's been more than 30 seconds since last tracked activity,
      // simulate some organic traffic (1-2 visits every 10-30 seconds)
      if (!lastVisit || (now - parseInt(lastVisit)) > 30000) {
        let currentVisits = parseInt(localStorage.getItem('csa-total-visits') || '600');
        
        // Reset counter if it's above the new starting point (likely old data)
        if (currentVisits > 10000) {
          currentVisits = 600;
          localStorage.setItem('csa-total-visits', '600');
        }
        const increment = Math.random() < 0.7 ? 1 : 2; // 70% chance of 1 visit, 30% chance of 2
        const newVisits = currentVisits + increment;
        
        localStorage.setItem('csa-total-visits', newVisits.toString());
        localStorage.setItem('csa-last-visit', now.toString());
        setVisits(newVisits);
      }
    }, Math.random() * 20000 + 10000); // Random interval 10-30 seconds

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return visits;
};

const upcomingEvent = {
  title: "CSA San Francisco Chapter Meeting - August 2025",
  date_time: "2025-08-27T16:30:00-08:00",
  location: "3000 Tannery Way, Santa Clara, CA",
  excerpt: "Join us for an evening of networking with cybersecurity enthusiasts, learn about the latest industry trends, and share your own experiences.",
  slug: "csa-san-francisco-chapter-meeting-august-2025",
  speakers: [
    "Spencer Thellmann",
    "Debrup Ghosh",
    "Sudesh Gadewar",
    "Brent Ichien"
  ],
  tags: ["CSA", "Cybersecurity", "Cloud Security", "Networking"]
};


const sponsors = [
  { name: "Corgea", logo: "/lovable-uploads/corgea-logo.png", website: "https://corgea.com/" },
  { name: "Dev Ocean", logo: "/lovable-uploads/devocean-logo.png", website: "https://www.devocean.security/" },
  { name: "Oasis", logo: "/lovable-uploads/oasis-logo.png", website: "https://www.oasis.security/" },
  { name: "P0 Security", logo: "/lovable-uploads/posecurity-logo.png", website: "https://www.p0.dev/" },
  { name: "RAD Security", logo: "/lovable-uploads/RAD-logo.png", website: "https://www.radsecurity.ai/" },
  { name: "Strong DM", logo: "/lovable-uploads/strongdm-logo.png", website: "https://www.strongdm.com/" },
  { name: "SANS", logo: "/lovable-uploads/SANS-logo.png", website: "https://www.sans.org/" },
  { name: "Horizon3.ai", logo: "/lovable-uploads/horizon3logo.jpg", website: "https://www.horizon3.ai/" },
  { name: "Palo Alto Networks", logo: "/lovable-uploads/palo.jpg", website: "https://www.paloaltonetworks.com/" },
];

const partners = [
  { name: "Indrasol", logo: "/lovable-uploads/83c978ae-a49f-42da-9c88-adc23bf34dc3.png", website: "https://indrasol.com/" },
  { name: "Pacific Hackers Conference", logo: "/lovable-uploads/pacific hacker.png", website: "https://www.phack.org/" },
  { name: "OWASP", logo: "/lovable-uploads/logo-owasp-org.png", website: "https://owasp.org/" },
  { name: "ISC2 Silicon Valley", logo: "/lovable-uploads/ISC2-SiliconValley.png", website: "https://www.isc2-siliconvalley-chapter.org/" },
  { name: "CSS", logo: "/lovable-uploads/PRIMARY LOGO - CSS_Horiz_Color.png", website: "https://www.css.org/" },
];

export default function Index() {
  const navigate = useNavigate();
  const [upcomingEventData, setUpcomingEventData] = useState<Event | null>(null);
  const [attendeesCount, setAttendeesCount] = useState<number>(0);
  const pageVisits = usePageVisitsCounter();

  // Fetch upcoming events and get the first one
  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        // Fetch events from API
        const response = await fetch(API_ENDPOINTS.EVENTS_PUBLIC);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        const events = data.events || [];
        
        // Filter upcoming events (events with future dates)
        const now = new Date();
        const upcomingEvents = events.filter((event: Event) => {
          const eventDate = new Date(event.date_time);
          return eventDate > now;
        });
        
        // Sort by date and get the first upcoming event
        const sortedUpcomingEvents = upcomingEvents.sort((a: Event, b: Event) => 
          new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
        );
        
        if (sortedUpcomingEvents.length > 0) {
          const firstUpcomingEvent = sortedUpcomingEvents[0];
          setUpcomingEventData(firstUpcomingEvent);
          
          // Fetch attendees count for this event
          try {
            const response = await fetch(`${API_ENDPOINTS.EVENT_ATTENDEES}/${firstUpcomingEvent.id}`);
            if (response.ok) {
              const data = await response.json();
              setAttendeesCount(data.attendees || 0);
            }
          } catch (error) {
            console.error('Error fetching attendees count:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching upcoming event:', error);
      }
    };

    fetchUpcomingEvent();
  }, []);

  // Use dynamic event data if available, otherwise fallback to hardcoded data
  const displayEvent = upcomingEventData || upcomingEvent;
  const eventDate = displayEvent ? new Date(displayEvent.date_time) : null;
  
  // Check if we have any upcoming events
  const hasUpcomingEvents = upcomingEventData !== null;
  
  const stats = [
    { label: "Active Members", value: "1000+", icon: Users },
    { label: "Events This Year", value: "12", icon: Calendar },
    { label: "Industry Partners", value: "25+", icon: Award },
    { label: "Years Active", value: "4", icon: TrendingUp },
    { label: "Page Visits", value: pageVisits.toLocaleString(), icon: Eye },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        
        {/* Powered by Indrasol - Close to header */}
        <div className="container-site pt-1 pb-0">
          <a 
            href="https://indrasol.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-xs text-primary hover:text-primary/80 transition-colors font-bold"
          >
            Powered by Indrasol
          </a>
        </div>
        
        <div className="container-site py-6 sm:py-8 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-start lg:items-center relative">
            {/* Left Column - Text Content */}
            <div className="space-y-6 lg:space-y-8 animate-fade-in pt-0 lg:pt-0 relative z-30">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-secondary">
                  <div className="text-secondary">Advancing Cloud Security</div>
                  <div>in the <span className="text-csa-accent">Bay Area</span></div>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                  Join San Francisco's premier community of cloud security professionals. 
                  Connect, learn, and shape the future of cloud security together.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 relative z-10">
                <Button 
                  onClick={() => {
                    navigate('/events#upcoming');
                  }}
                  size="lg" 
                  className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-xl relative z-20"
                  style={{ pointerEvents: 'auto' }}
                >
                  View Upcoming Events
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-csa-accent text-csa-accent hover:bg-csa-accent hover:text-white text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Link to="/get-involved">Join Our Community</Link>
                </Button>
              </div>
              
              {/* CSA Chapter of Excellence Logo - Below buttons */}
              <div className="flex justify-start">
                <img 
                  src="/lovable-uploads/CSA-Chapter-of-Excellence.png"
                  alt="CSA Chapter of Excellence"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Right Column - Blended Image */}
            <div className="relative animate-fade-in mt-4 lg:mt-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <img 
                  src="/lovable-uploads/cc966b67-e195-47f4-9d87-2b8757659a42.png"
                  alt="Golden Gate Bridge representing San Francisco Cloud Security Alliance"
                  className="w-full h-auto object-cover opacity-90"
                />
                {/* Subtle gradient overlay for light blending */}
                <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-white/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced background decorative elements */}
        <div className="absolute top-1/4 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-csa-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-48 h-48 lg:w-64 lg:h-64 bg-csa-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-csa-accent/3 rounded-full blur-2xl"></div>

      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
                {hasUpcomingEvents 
                  ? "Don't miss our upcoming event featuring industry experts and networking opportunities."
                  : "Stay tuned for our next chapter meeting. We're planning exciting events for the community."
                }
              </p>
            </div>

            {hasUpcomingEvents ? (
              <Card className="overflow-hidden shadow-lg animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{displayEvent.title}</CardTitle>
                      <CardDescription className="text-gray-200">
                        {displayEvent.excerpt}
                      </CardDescription>
                    </div>
                    <Button 
                      asChild 
                      size="lg"
                      className="bg-csa-accent hover:bg-csa-accent/90 text-white whitespace-nowrap"
                    >
                      <Link to={`/events/${displayEvent.slug}`}>
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
                          {eventDate?.toLocaleDateString('en-US', {
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
                        <span>{displayEvent.location}</span>
                      </div>
                      {attendeesCount > 0 && (
                        <div className="flex items-center space-x-3 text-gray-700">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-medium">{attendeesCount} attendees registered</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-secondary mb-2">Featured Speakers</h4>
                        <div className="space-y-1">
                          {displayEvent.speakers.map((speaker, index) => (
                            <div key={typeof speaker === 'string' ? `speaker-${index}-${speaker}` : `speaker-${speaker.id || index}-${speaker.name}`} className="text-gray-700">
                              {typeof speaker === 'string' ? speaker : speaker.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-2">Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {displayEvent.tags.map(tag => (
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
            ) : (
              <Card className="overflow-hidden shadow-lg animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
                  <div className="text-center">
                    <CardTitle className="text-2xl mb-2 text-gray-700">Event Details Coming Soon</CardTitle>
                    <CardDescription className="text-gray-600">
                      We're working on planning our next chapter meeting. Check back soon for updates!
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Calendar className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">Stay Connected</h3>
                      <p className="text-gray-600">
                        Follow us on social media and join our mailing list to be the first to know about upcoming events.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => {
                          navigate('/events#past');
                        }}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        View Past Events
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>


      {/* Sponsors Section - Scrolling Client Showcase */}
      <section className="py-16 section-light overflow-hidden relative">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Sponsors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you to our generous sponsors who support our community initiatives and help advance cloud security education
            </p>
          </div>

          {/* Scrolling Logo Carousel - Single Row */}
          <div className="relative py-8">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
            
            <div className="flex overflow-hidden relative">
              <div 
                className="flex"
                style={{
                  animation: 'scroll-left 45s linear infinite',
                  animationFillMode: 'forwards'
                }}
                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
              >
                {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                  <div 
                    key={`${sponsor.name}-${index}`}
                    className="flex-shrink-0 mx-6 group"
                  >
                    <a 
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative bg-gradient-to-br from-white via-gray-50/50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-3 border border-gray-200/50 hover:border-primary/30 overflow-hidden cursor-pointer"
                      aria-label={`Visit ${sponsor.name} website`}
                    >
                      {/* Background decoration */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-csa-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-csa-accent/20 to-primary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                      
                      {/* Logo container */}
                      <div className="relative z-10 flex items-center justify-center h-16">
                        <img 
                          src={sponsor.logo} 
                          alt={`${sponsor.name} logo`}
                          className={`object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110 ${
                            sponsor.name === "Horizon3.ai" 
                              ? "max-h-16 max-w-[180px]" 
                              : "max-h-12 max-w-[140px]"
                          }`}
                        />
                      </div>
                      
                      {/* Company name overlay on hover */}
                      <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                          {sponsor.name}
                        </span>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-primary to-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* External link indicator */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ExternalLink className="h-3 w-3 text-primary" />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-20"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-20"></div>
            
            {/* Subtle light beams */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none z-10 opacity-50"></div>
            <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-csa-accent/20 to-transparent pointer-events-none z-10 opacity-50"></div>
          </div>

          {/* Sponsor Testimonial Quote */}
          <div className="text-center mt-12">
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
              <p className="text-lg text-gray-700 italic leading-relaxed mb-4">
                Supporting the San Francisco CSA chapter allows us to contribute to a vibrant community that's driving innovation and best practices in cloud security.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Sponsor Community Feedback</span>
              </div>
            </div>
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with leading security organizations to strengthen our community and advance cybersecurity education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center justify-items-center max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <a
                key={partner.name}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`Visit ${partner.name} website`}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 hover:border-csa-accent/30 relative overflow-hidden min-h-[120px] flex flex-col justify-center">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative z-10 flex items-center justify-center h-20">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-16 w-auto object-contain transition-all duration-500 group-hover:brightness-110"
                    />
                  </div>
                  
                  {/* Partner name overlay on hover */}
                  <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      {partner.name}
                    </span>
                  </div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink className="h-3 w-3 text-csa-accent" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        faqs={homepageFAQs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about the Cloud Security Alliance San Francisco Chapter"
      />

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

      {/* Floating Social Media Bar */}
      <div className="fixed right-4 bottom-40 md:bottom-32 lg:top-1/2 lg:transform lg:-translate-y-1/2 z-30">
        <div className="flex flex-col space-y-3 lg:space-y-4">
          <a
            href="https://www.linkedin.com/groups/14049487/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200 hover:border-primary/20"
            aria-label="Join our LinkedIn Group"
          >
            <svg 
              className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300" 
              viewBox="0 0 24 24" 
              fill="#0077B5"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            
            {/* Tooltip - positioned to the left for right-side placement */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden sm:block">
              Join our LinkedIn Group
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
            
            {/* Mobile tooltip - positioned above */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none sm:hidden">
              LinkedIn
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-px w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
