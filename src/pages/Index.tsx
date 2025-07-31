import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award, TrendingUp, ExternalLink } from "lucide-react";

const stats = [
  { label: "Active Members", value: "250+", icon: Users },
  { label: "Events This Year", value: "12", icon: Calendar },
  { label: "Industry Partners", value: "25+", icon: Award },
  { label: "Years Active", value: "4", icon: TrendingUp },
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
  { name: "Corgea", logo: "/lovable-uploads/corgea-logo.png", website: "https://corgea.com/" },
  { name: "Dev Ocean", logo: "/lovable-uploads/devocean-logo.png", website: "https://www.devocean.security/" },
  { name: "Oasis", logo: "/lovable-uploads/oasis-logo.png", website: "https://www.oasis.security/" },
  { name: "P0 Security", logo: "/lovable-uploads/posecurity-logo.png", website: "https://www.p0.dev/" },
  { name: "RAD Security", logo: "/lovable-uploads/RAD-logo.png", website: "https://www.radsecurity.ai/" },
  { name: "Strong DM", logo: "/lovable-uploads/strongdm-logo.png", website: "https://www.strongdm.com/" },
  { name: "SANS", logo: "/lovable-uploads/SANS-logo.png", website: "https://www.sans.org/" },
];

const partners = [
  { name: "Pacific Hackers Conference", logo: "/lovable-uploads/pacific hacker.png", website: "https://www.phack.org/" },
  { name: "OWASP", logo: "/lovable-uploads/logo-owasp-org.png", website: "https://owasp.org/" },
  { name: "ISC2 Silicon Valley", logo: "/lovable-uploads/ISC2-SiliconValley.png", website: "https://www.isc2-siliconvalley-chapter.org/" },
];

export default function Index() {
  const eventDate = new Date(upcomingEvent.date);
  
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
        
        <div className="container-site py-4 sm:py-8 lg:py-12 xl:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-start lg:items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 lg:space-y-8 animate-fade-in pt-4 lg:pt-0">
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
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Link to="/events">View Upcoming Events</Link>
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
              
              {/* CSA Badges */}
              <div className="pt-6 lg:pt-8">
                <div className="flex flex-col items-center sm:items-start space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center">
                    <img 
                      src="/lovable-uploads/2dad453f-52d8-4e4c-b61a-c988b8f613a1.png"
                      alt="CSA Chapter of Excellence Badge"
                      className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 object-contain"
                    />
                    <img 
                      src="/lovable-uploads/d2c2311b-14e8-4df8-8a1e-950422afff50.png"
                      alt="CSA San Francisco Chapter Badge"
                      className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 object-contain"
                    />
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base font-semibold text-center sm:text-left">
                    We are a 501(c)3 nonprofit
                  </p>
                </div>
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
      <section className="py-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-csa-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="container-site relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-csa-accent/10 px-2.5 py-1 rounded-full mb-3">
              <div className="w-1.5 h-1.5 bg-csa-accent rounded-full animate-pulse"></div>
              <span className="text-csa-accent font-semibold text-xs uppercase tracking-wider">Partnership</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-2">
              Technical Partner
            </h2>
            <p className="text-base text-gray-600 max-w-lg mx-auto">
              Partnering with industry leaders to deliver cutting-edge cloud infrastructure solutions
            </p>
          </div>

          <div className="max-w-8xl mx-auto">
            <Card className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-0">
                {/* Left Column - Logo & Company Info */}
                <div className="bg-gradient-to-br from-white to-gray-50/50 p-3 lg:p-4 flex flex-col justify-center items-center text-center">
                  <div className="w-full flex flex-col items-center space-y-3">
                    {technicalPartner.map((partner, index) => (
                      <a
                        key={partner.name}
                        href="https://indrasol.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block transition-all duration-300 hover:scale-105 animate-fade-in group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="bg-white rounded-lg p-4 shadow-md group-hover:shadow-lg transition-all duration-300 w-full max-w-[160px]">
                          <img 
                            src={partner.logo} 
                            alt={`${partner.name} logo`}
                            className="h-16 md:h-20 lg:h-24 object-contain mx-auto w-full"
                          />
                        </div>
                      </a>
                    ))}
                    
                                         <div className="text-center">
                       <div className="flex items-center gap-1.5 justify-center">
                         <ExternalLink className="h-3 w-3 text-csa-accent" />
                         <a 
                           href="https://indrasol.com/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-csa-accent hover:text-csa-accent/80 font-medium transition-colors text-xs"
                         >
                           Visit Website
                         </a>
                       </div>
                     </div>
                  </div>
                </div>

                {/* Right Column - Description & Features */}
                <div className="p-4 lg:p-6 bg-gradient-to-br from-blue-50/30 to-white">
                  <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="space-y-3">
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed font-medium">
                        Indrasol delivers end-to-end solutions from AI/LLM development to cloud-native engineering, data platforms, and security.
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Helps businesses innovate faster and safer with integrated development-to-defense capabilities.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-csa-accent/10 rounded-md flex items-center justify-center">
                          <Award className="h-3 w-3 text-csa-accent" />
                        </div>
                        <h3 className="text-base lg:text-lg font-bold text-secondary">Core Focus Areas</h3>
                      </div>
                      
                      <div className="grid gap-2">
                        {[
                          { title: "AI Solutions & Security", icon: "🤖" },
                          { title: "Cloud Engineering & Security", icon: "☁️" },
                          { title: "Application Security & Compliance", icon: "🔒" },
                          { title: "Data Engineering & Security", icon: "📊" }
                        ].map((item, index) => (
                          <div 
                            key={item.title}
                            className="flex items-center gap-2.5 p-2.5 bg-white/60 rounded-md border border-gray-100 hover:border-csa-accent/20 hover:bg-white/80 transition-all duration-300 group"
                            style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                          >
                            <div className="text-base group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200/50">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Trusted Technical Partner since 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Section - Scrolling Client Showcase */}
      <section className="py-16 section-light overflow-hidden relative">
        <div className="container-site">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-xs uppercase tracking-wider">Our Sponsors</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Powered by Industry Leaders
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
                          className="max-h-12 max-w-[140px] object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
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
              <div className="text-2xl text-primary mb-4">"</div>
              <p className="text-lg text-gray-700 italic leading-relaxed mb-4">
                "Supporting the San Francisco CSA chapter allows us to contribute to a vibrant community that's driving innovation and best practices in cloud security."
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
            <div className="inline-flex items-center gap-2 bg-csa-accent/10 px-3 py-1.5 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-csa-accent rounded-full animate-pulse"></div>
              <span className="text-csa-accent font-semibold text-xs uppercase tracking-wider">Our Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with leading security organizations to strengthen our community and advance cybersecurity education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">
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
      <div className="fixed right-4 bottom-24 md:bottom-32 lg:top-1/2 lg:transform lg:-translate-y-1/2 z-30">
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
