
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Calendar, Globe, Award, ExternalLink, CreditCard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Slider data for hero section
const heroSlides = [
  {
    image: "/sponsor-benefit/Picture01.png",
    title: "Brand Visibility & Recognition",
    subtitle: "Platinum Tier Benefits",
    description: "Maximize your brand exposure with prominent logo placement across all event materials, presentations, and digital platforms. Reach thousands of cloud security professionals and decision-makers."
  },
  {
    image: "/sponsor-benefit/Picture02.png",
    title: "Networking & Business Development",
    subtitle: "Connect & Grow",
    description: "Access exclusive networking opportunities with C-level executives, security architects, and industry thought leaders. Build meaningful relationships that drive business growth."
  },
  {
    image: "/sponsor-benefit/Picture03.png",
    title: "Thought Leadership Platform",
    subtitle: "Share Your Expertise",
    description: "Position your organization as a thought leader through speaking opportunities, panel discussions, and technical workshops. Share insights with a highly engaged audience."
  },
  {
    image: "/sponsor-benefit/Picture04.png",
    title: "Market Intelligence & Insights",
    subtitle: "Stay Ahead",
    description: "Gain valuable market insights through direct engagement with practitioners, understand emerging trends, and stay ahead of the competition in the cloud security landscape."
  },
  {
    image: "/sponsor-benefit/Picture05.png",
    title: "Community Impact & CSR",
    subtitle: "Make a Difference",
    description: "Support the advancement of cloud security education and research. Contribute to a safer digital future while demonstrating your organization's commitment to the community."
  }
];

// Sponsor and Partner data (from Index page)
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

const sponsorshipTiers = [
  {
    name: "Platinum",
    price: "$5,000",
    priceValue: 5000,
    stripeProductId: "prod_SpACkIzs6Mu0vy",
    stripePriceId: "price_1RtVs8FKTK8ICUprI5sOstOV",
    stripePaymentLink: "https://buy.stripe.com/test_7sYfZh0wv8vw0iRal3abK06",
    description: "Maximum visibility and engagement opportunities",
    features: [
      "Logo prominently displayed on all event materials",
      "Speaking opportunity at quarterly events",
      "Dedicated booth space at all events",
      "Logo on website homepage with link",
      "Social media mentions and promotion",
      "Access to member directory",
      "Quarterly newsletter inclusion",
      "Co-marketing opportunities"
    ],
    popular: true
  },
  {
    name: "Gold",
    price: "$3,000",
    priceValue: 3000,
    stripeProductId: "prod_SpADwX487uKFub",
    stripePriceId: "price_1RtVt7FKTK8ICUprMBqHqjh3",
    stripePaymentLink: "https://buy.stripe.com/test_28E14n5QP7rse9H2SBabK07",
    description: "Strong brand presence and networking access",
    features: [
      "Logo on event materials and presentations",
      "Booth space at major events",
      "Website logo placement",
      "Social media acknowledgment",
      "Newsletter mentions",
      "Member networking access",
      "Event presentation opportunities"
    ],
    popular: false
  },
  {
    name: "Silver",
    price: "$1,500",
    priceValue: 1500,
    stripeProductId: "prod_SpAEMMgs97IGiD",
    stripePriceId: "price_1RtVtaFKTK8ICUprhZ6uPoYV",
    stripePaymentLink: "https://buy.stripe.com/test_9B6cN5cfdbHIe9HfFnabK08",
    description: "Brand recognition and community support",
    features: [
      "Logo on select event materials",
      "Website sponsor page listing",
      "Social media recognition",
      "Newsletter acknowledgment",
      "Networking event invitations",
      "Member directory access"
    ],
    popular: false
  },
  {
    name: "Bronze",
    price: "$500",
    priceValue: 500,
    stripeProductId: "prod_SpAEGHk3Z4yFA6",
    stripePriceId: "price_1RtVu6FKTK8ICUprQ3iKqFMN",
    stripePaymentLink: "https://buy.stripe.com/test_bJecN51Az5jk2qZ64NabK09",
    description: "Community support and brand awareness",
    features: [
      "Logo on website sponsor page",
      "Social media mention",
      "Newsletter acknowledgment",
      "Event networking opportunities"
    ],
    popular: false
  }
];

const benefits = [
  {
    icon: Users,
    title: "Access to Cloud Security Professionals",
    description: "Connect with 500+ cloud security experts, practitioners, and decision-makers in the Bay Area."
  },
  {
    icon: Calendar,
    title: "Year-Round Visibility",
    description: "Maintain brand presence through quarterly events, workshops, and networking sessions."
  },
  {
    icon: Globe,
    title: "Thought Leadership Platform",
    description: "Share your expertise and insights with a highly engaged technical audience."
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Align your brand with the leading cloud security organization and enhance credibility."
  }
];

export default function Sponsorship() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  // Stripe Checkout Handler
  const handleStripeCheckout = (tier: typeof sponsorshipTiers[0]) => {
    setLoadingTier(tier.name);
    
    try {
      // Redirect to Stripe payment link
      window.location.href = tier.stripePaymentLink;
      
      // Fallback redirect if the first attempt doesn't work
      setTimeout(() => {
        window.location.replace(tier.stripePaymentLink);
      }, 1000);
      
    } catch (error) {
      console.error('Payment redirect failed:', error);
      setLoadingTier(null);
      
      // Fallback: open in new tab
      window.open(tier.stripePaymentLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-csa-blue via-csa-navy to-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-csa-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Dynamic Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-csa-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </div>
              
              {/* Main Heading with Gradient Text */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Partner with CSA
                  </span>
                  <span className="block bg-gradient-to-r from-csa-accent via-blue-400 to-csa-accent bg-clip-text text-transparent transition-all duration-500">
                    {heroSlides[currentSlide].title}
                  </span>
                </h1>
              </div>
              
              {/* Enhanced Description */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-light transition-all duration-500">
                  {heroSlides[currentSlide].description}
                </p>
                
                {/* Action Button */}
                <div className="pt-6">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <Link to="/contact">Get Started Today</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Enhanced Image Slider */}
            <div className="lg:text-right animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative group">
                {/* Image Container with Modern Effects */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-1 backdrop-blur-sm border border-white/20">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    {/* Image Slider */}
                    <div className="relative w-full h-full">
                      {heroSlides.map((slide, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            index === currentSlide 
                              ? 'opacity-100 transform translate-x-0' 
                              : index < currentSlide 
                                ? 'opacity-0 transform -translate-x-full' 
                                : 'opacity-0 transform translate-x-full'
                          }`}
                        >
                          <img 
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-6">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-csa-accent scale-125' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Floating Benefit Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white text-csa-navy px-6 py-3 rounded-xl shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-semibold">Sponsor Benefits</div>
                      <div className="text-xs text-gray-600">Premium Partnership</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-csa-accent rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -left-3 w-4 h-4 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" fill="white" fillOpacity="1"></path>
          </svg>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-csa-navy mb-4">
              Sponsorship Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the sponsorship level that best fits your organization's 
              goals and budget. All tiers provide valuable networking and branding opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <Card key={index} className={`relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${tier.popular ? 'border-csa-blue shadow-lg ring-2 ring-csa-blue/20' : 'hover:border-csa-blue/30'}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-csa-blue text-white shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                {/* Gradient background for popular tier */}
                {tier.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-blue/5 via-transparent to-csa-accent/5 rounded-lg"></div>
                )}
                
                <CardHeader className="text-center relative z-10">
                  <CardTitle className="text-csa-navy text-xl font-bold">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-csa-blue">{tier.price}</div>
                  <CardDescription className="text-gray-600">{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Enhanced Stripe Payment Button */}
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleStripeCheckout(tier);
                    }}
                    disabled={loadingTier === tier.name}
                    className={`w-full mt-6 h-12 ${
                      tier.popular 
                        ? 'bg-csa-blue hover:bg-csa-blue/90 shadow-lg hover:shadow-xl' 
                        : 'bg-csa-accent hover:bg-csa-accent/90'
                    } text-white font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-70`}
                  >
                    {loadingTier === tier.name ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Purchase {tier.name}
                      </>
                    )}
                  </Button>
                  
                  {/* Alternative Contact Option */}
                  <div className="mt-3 text-center">
                    <Button 
                      asChild
                      variant="ghost" 
                      size="sm"
                      className="text-csa-navy hover:text-csa-blue text-sm"
                    >
                      <Link to="/contact">
                        Questions? Contact Us
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-csa-navy mb-4">
              Why Sponsor CSA San Francisco?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partner with the premier cloud security organization in the Bay Area 
              and connect with the most influential professionals in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <benefit.icon className="h-12 w-12 text-csa-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="py-16">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-csa-navy mb-4">
              Our Valued Sponsors
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're proud to partner with industry-leading organizations that 
              share our commitment to advancing cloud security.
            </p>
          </div>

          {/* Technical Partner Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-csa-navy text-center mb-6">Technical Partner</h3>
            <div className="flex justify-center">
              {technicalPartner.map((partner, index) => (
                <div key={index} className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-csa-blue/20 max-w-xs">
                  <div className="flex items-center justify-center h-20">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-16 max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-csa-navy text-center mb-6">Sponsors</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sponsors.map((sponsor, index) => (
                <a 
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-csa-blue/20 hover:scale-105"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-blue/5 to-csa-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
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
                  <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-csa-blue to-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink className="h-3 w-3 text-csa-blue" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="text-xl font-semibold text-csa-navy text-center mb-6">Community Partners</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {partners.map((partner, index) => (
                <a 
                  key={index}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-csa-blue/20 hover:scale-105"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-blue/5 to-csa-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo container */}
                  <div className="relative z-10 flex items-center justify-center h-16">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-12 max-w-[140px] object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                    />
                  </div>
                  
                  {/* Company name overlay on hover */}
                  <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      {partner.name}
                    </span>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-csa-blue to-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink className="h-3 w-3 text-csa-blue" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Sponsorship */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-csa-navy mb-6">
              Custom Sponsorship Opportunities
            </h2>
            <p className="text-gray-600 mb-8">
              Looking for something specific? We can create custom sponsorship packages 
              tailored to your organization's unique needs and objectives.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 text-csa-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2">Event Sponsorship</h3>
                  <p className="text-gray-600 text-sm">Sponsor specific events or workshops</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-csa-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2">Training Programs</h3>
                  <p className="text-gray-600 text-sm">Support certification and training initiatives</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-8 w-8 text-csa-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2">Research Projects</h3>
                  <p className="text-gray-600 text-sm">Fund cloud security research initiatives</p>
                </CardContent>
              </Card>
            </div>
            <Button 
              asChild 
              size="lg" 
              className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-3"
            >
              <Link to="/contact">Discuss Custom Options</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
