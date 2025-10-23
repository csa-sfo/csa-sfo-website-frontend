
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Calendar, Globe, Award, ExternalLink, CreditCard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Slider data for hero section
const heroSlides = [
  // {
  //   image: "/sponsor-benefit/Picture01.png",
  //   title: "Brand Visibility & Recognition",
  //   subtitle: "Platinum Tier Benefits",
  //   description: "Maximize your brand exposure with prominent logo placement across all event materials, presentations, and digital platforms. Reach thousands of cloud security professionals and decision-makers."
  // },
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
    duration: "3 years",
    price: "$5,000",
    priceValue: 5000,
    stripeProductId: "prod_SsCCvAwsBE9mPE",
    stripePriceId: "price_1RwRoL1UuWDRyCc1UZWBec7B",
    stripePaymentLink: "https://buy.stripe.com/eVq4gs14vfiMav17i66sw00",
    description: "Maximum visibility and engagement opportunities",
    features: [
      "Premium logo placement on all event materials and CSA SF website",
      "Opportunity to deliver a keynote or moderate a panel",
      "Opportunity for a speaking slot in the events",
      "Featured mention in CSA SF LinkedIn promotions",
      "Registration list shared"
      
    ],
    popular: true
  },
  {
    name: "Gold",
    duration: "2 years",
    price: "$3,000",
    priceValue: 3000,
    stripeProductId: "prod_SsCDl33DNshyt6",
    stripePriceId: "price_1RwRor1UuWDRyCc1GNRJ65ZX",
    stripePaymentLink: "https://buy.stripe.com/00weV628z7Qk5aH6e26sw01",
    description: "Strong brand presence and networking access",
    features: [
      "Logo placement on CSA SF event slides and website",
      "Opportunity for a speaking slot in the events",
      "Mention during event welcome remarks",
      "Event sponsor covers the cost of food and refereshments",
      "Registration list shared"
    ],
    popular: false
  },
  {
    name: "Silver",
    duration: "1 year",
    price: "$2,000",
    priceValue: 2000,
    stripeProductId: "prod_SsCE0iUAHFIOMz",
    stripePriceId: "price_1SAEpm1UuWDRyCc19Ep1USNx",
    stripePaymentLink: "https://buy.stripe.com/7sY3codRh5Ic9qX31Q6sw02",
    description: "Brand recognition and community support",
    features: [
      "Logo placement on CSA SF event slides and website",
      "Opportunity for a speaking slot in the events",
      "Mention during event welcome remarks",
      "Event sponsor covers the cost of food and refreshments"
      
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
  const handleStripeCheckout = async (tier: typeof sponsorshipTiers[0]) => {
    setLoadingTier(tier.name);
    
    try {
      // Get the current domain for success/cancel URLs
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/sponsorship/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${baseUrl}/sponsorship`;
      
      // Call our backend to create a checkout session
      const response = await fetch(`${import.meta.env.VITE_PROD_API_URL}/api/v1/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: tier.stripePriceId,
          customer_email: '', // You might want to collect this from a form
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: {
            tier: tier.name,
            // Add any additional metadata you want to track
          }
        })
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.detail || 'Failed to create checkout session');
      }
      
      // Initialize Stripe
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: responseData.sessionId,
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error (e.g., show error message to user)
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-csa-blue via-csa-navy to-slate-900 text-white py-12 sm:py-16 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating Elements - Hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 bg-csa-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="hidden sm:block absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        <div className="container-site relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left Column - Dynamic Text Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-csa-accent rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-gray-100 uppercase tracking-wider">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </div>
              
              {/* Main Heading with Gradient Text */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Partner with CSA
                  </span>
                  <span className="block bg-gradient-to-r from-csa-accent via-blue-400 to-csa-accent bg-clip-text text-transparent transition-all duration-500">
                    {heroSlides[currentSlide].title}
                  </span>
                </h1>
              </div>
              
              {/* Enhanced Description */}
              <div className="space-y-4 sm:space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed font-light transition-all duration-500">
                  {heroSlides[currentSlide].description}
                </p>
                
                {/* Action Button */}
                <div className="pt-4 sm:pt-6">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-csa-accent hover:bg-csa-accent/90 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                  >
                    <Link to="/contact">Get Started Today</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Enhanced Image Slider */}
            <div className="lg:text-right animate-fade-in order-first lg:order-last" style={{ animationDelay: '0.3s' }}>
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
                <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                  {heroSlides.map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 p-0 border-0 ${
                        index === currentSlide 
                          ? 'bg-csa-accent scale-125' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      variant="ghost"
                      size="sm"
                    />
                  ))}
                </div>
                
                {/* Floating Benefit Badge - Hidden on small screens */}
                <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white text-csa-navy px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-xl border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold">Sponsor Benefits</div>
                      <div className="text-xs text-gray-600">Premium Partnership</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements - Hidden on mobile */}
                <div className="hidden sm:block absolute -top-4 -right-4 w-6 sm:w-8 h-6 sm:h-8 bg-csa-accent rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="hidden sm:block absolute top-1/2 -left-3 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" fill="white" fillOpacity="1"></path>
          </svg>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-12 sm:py-16">
        <div className="container-site px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-csa-navy mb-4">
              Sponsorship Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Choose the sponsorship level that best fits your organization's 
              goals and budget. All tiers provide valuable networking and branding opportunities.
            </p>
          </div>

          {/* Mobile Cards Layout */}
          <div className="block lg:hidden space-y-6 mb-8">
            {sponsorshipTiers.map((tier, index) => (
              <Card key={index} className={`relative overflow-hidden ${tier.popular ? 'ring-2 ring-csa-accent' : ''}`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-csa-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Popular
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600' :
                      index === 1 ? 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500' :
                      'bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500'
                    }`}>
                      <span className="text-white text-lg font-bold">
                        {index === 0 ? '🏆' : index === 1 ? '🥇' : '🥈'}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-csa-navy">
                        {tier.name} {index === 1 ? 'Sponsor' : ''}
                      </CardTitle>
                      <div className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-full mt-2">
                        {tier.price} – ({tier.duration})
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-center text-gray-600">
                    {tier.description}
                  </CardDescription>
                  
                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStripeCheckout(tier);
                      }}
                      disabled={loadingTier === tier.name}
                      className="w-full h-12 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 bg-csa-accent hover:bg-csa-accent/90 text-white border-0"
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
                    
                    <Button 
                      asChild
                      variant="ghost" 
                      size="sm"
                      className="text-gray-600 hover:text-csa-blue text-xs w-full hover:bg-white/50 rounded-lg transition-all duration-200"
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

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto mb-8">
            <div className="min-w-full bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                </colgroup>
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50">
                    <th className="px-8 py-8 text-center text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-csa-blue to-csa-navy rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✨</span>
                  </div>
                          <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Benefits
                          </span>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-8 text-center text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-br from-yellow-50 to-amber-50">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                          <span className="text-white text-lg font-bold">🏆</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
                              Platinum
                            </div>
                            <div className="bg-csa-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                              Popular
                            </div>
                          </div>
                          <div className="text-sm font-bold text-gray-700 bg-white/80 px-4 py-2 rounded-full">
                            $5,000 – (3 Years)
                          </div>
                        </div>
                        <div className="space-y-4 w-full">
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleStripeCheckout(sponsorshipTiers[0]);
                            }}
                            disabled={loadingTier === sponsorshipTiers[0].name}
                            className="w-full h-14 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 bg-csa-accent hover:bg-csa-accent/90 text-white border-0"
                          >
                            {loadingTier === sponsorshipTiers[0].name ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CreditCard className="h-5 w-5 mr-2" />
                                Purchase Platinum
                              </>
                            )}
                          </Button>
                          
                          <Button 
                            asChild
                            variant="ghost" 
                            size="sm"
                            className="text-gray-600 hover:text-csa-blue text-xs w-full hover:bg-white/50 rounded-lg transition-all duration-200"
                          >
                            <Link to="/contact">
                              Questions? Contact Us
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-8 text-center text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                          <span className="text-white text-lg font-bold">🥇</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            Gold Sponsor
                          </div>
                          <div className="text-sm font-bold text-gray-700 bg-white/80 px-4 py-2 rounded-full">
                            $3,000 – (2 Years)
                          </div>
                        </div>
                        <div className="space-y-4 w-full">
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleStripeCheckout(sponsorshipTiers[1]);
                            }}
                            disabled={loadingTier === sponsorshipTiers[1].name}
                            className="w-full h-14 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 bg-csa-accent hover:bg-csa-accent/90 text-white border-0"
                          >
                            {loadingTier === sponsorshipTiers[1].name ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CreditCard className="h-5 w-5 mr-2" />
                                Purchase Gold
                              </>
                            )}
                          </Button>
                          
                          <Button 
                            asChild
                            variant="ghost" 
                            size="sm"
                            className="text-gray-600 hover:text-csa-blue text-xs w-full hover:bg-white/50 rounded-lg transition-all duration-200"
                          >
                            <Link to="/contact">
                              Questions? Contact Us
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-8 text-center text-sm font-bold text-gray-800 bg-gradient-to-br from-gray-50 to-slate-100">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                          <span className="text-white text-lg font-bold">🥈</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold bg-gradient-to-r from-gray-600 to-slate-700 bg-clip-text text-transparent">
                            Silver
                          </div>
                          <div className="text-sm font-bold text-gray-700 bg-white/80 px-4 py-2 rounded-full">
                            $2,000 – (1 Year)
                          </div>
                        </div>
                        <div className="space-y-4 w-full">
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                              handleStripeCheckout(sponsorshipTiers[2]);
                            }}
                            disabled={loadingTier === sponsorshipTiers[2].name}
                            className="w-full h-14 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 bg-csa-accent hover:bg-csa-accent/90 text-white border-0"
                          >
                            {loadingTier === sponsorshipTiers[2].name ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                                <CreditCard className="h-5 w-5 mr-2" />
                                Purchase Silver
                      </>
                    )}
                  </Button>
                  
                    <Button 
                      asChild
                      variant="ghost" 
                      size="sm"
                            className="text-gray-600 hover:text-csa-blue text-xs w-full hover:bg-white/50 rounded-lg transition-all duration-200"
                    >
                      <Link to="/contact">
                        Questions? Contact Us
                      </Link>
                    </Button>
                  </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🎯</span>
                        </div>
                        <span>Logo Placement</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Premium logo on all event materials, banners, and CSA SF website</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Prominent logo on event slides and CSA SF website</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Logo on CSA SF website and event slides</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🎤</span>
                        </div>
                        <span>Speaking Opportunities</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Deliver a keynote or moderate a panel, plus guaranteed event speaking slots 3 events</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Opportunity for a speaking slot at CSA SF events 2 events</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">One speaking slot at a CSA SF event</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">📢</span>
                        </div>
                        <span>Event Mentions</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Featured in CSA SF LinkedIn promotions and newsletters</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Mention during event introductions and in social posts</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Mention during event welcome remarks</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">📈</span>
                        </div>
                        <span>Marketing Visibility</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Featured in marketing materials and event promotions</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Recognition in CSA SF marketing & social media</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✕</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">📋</span>
                        </div>
                        <span>Event Registration List</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Full access to registration lists (attendee info)</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Access to registration lists</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✕</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🤝</span>
                        </div>
                        <span>Workshops & Co-Branding</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Priority inclusion in co-branded community initiatives or workshops</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Eligible for collaborative sessions</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✕</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🌐</span>
                        </div>
                        <span>Networking Access</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Invitations to exclusive sponsor & community events</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Invitations to sponsor networking events</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Included in chapter networking events</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🍽️</span>
                        </div>
                        <span>Food & Refreshments</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Optional — CSA SF manages event catering</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Sponsor covers food & refreshments</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Sponsor covers food & refreshments</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🎉</span>
                        </div>
                        <span>Appreciation Dinner</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Recognized at Year-End Sponsor & Volunteer Dinner</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Invited to Year-End Sponsor Dinner</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Invited to Year-End Sponsor Dinner</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200">
                    <td className="px-8 py-6 text-sm font-bold text-gray-800 border-r border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50 rounded-bl-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">🎓</span>
                        </div>
                        <span>Mentorship & Community Programs</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/50 to-amber-50/50">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Option to mentor or host educational sessions</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 border-r border-gray-100 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Option to participate in community mentorship</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700 bg-gradient-to-r from-gray-50/30 to-slate-50/30 rounded-br-2xl">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <div className="font-medium">Option to support local initiatives</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-12 sm:py-16 section-light">
        <div className="container-site px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-csa-navy mb-4">
              Why Sponsor CSA San Francisco?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Partner with the premier cloud security organization in the Bay Area 
              and connect with the most influential professionals in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6 px-4 sm:px-6">
                  <benefit.icon className="h-10 sm:h-12 w-10 sm:w-12 text-csa-blue mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2 text-sm sm:text-base">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="py-12 sm:py-16">
        <div className="container-site px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-csa-navy mb-4">
            Executive Member
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              We're proud to partner with industry-leading organizations that 
              share our commitment to advancing cloud security.
            </p>
          </div>

          {/* Technical Partner Section */}
          <div className="mb-8 sm:mb-12">
            
            <div className="flex justify-center">
              {technicalPartner.map((partner, index) => (
                <div key={index} className="group relative bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-csa-blue/20 max-w-xs w-full sm:w-auto">
                  <div className="flex items-center justify-center h-16 sm:h-20">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-12 sm:max-h-16 max-w-[140px] sm:max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center mt-2 sm:mt-3">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl font-semibold text-csa-navy text-center mb-4 sm:mb-6">Sponsors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sponsors.map((sponsor, index) => (
                <a 
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-csa-blue/20 hover:scale-105"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-blue/5 to-csa-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo container */}
                  <div className="relative z-10 flex items-center justify-center h-12 sm:h-16">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`}
                      className="max-h-8 sm:max-h-12 max-w-[100px] sm:max-w-[140px] object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                    />
                  </div>
                  
                  {/* Company name overlay on hover - Hidden on mobile for cleaner look */}
                  <div className="hidden sm:block absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      {sponsor.name}
                    </span>
                  </div>
                  
                  {/* Mobile: Show name always */}
                  <div className="sm:hidden text-center mt-2">
                    <span className="text-xs font-medium text-gray-600">
                      {sponsor.name}
                    </span>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-br from-csa-blue to-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-csa-blue" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-csa-navy text-center mb-4 sm:mb-6">Community Partners</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {partners.map((partner, index) => (
                <a 
                  key={index}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-csa-blue/20 hover:scale-105"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-blue/5 to-csa-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo container */}
                  <div className="relative z-10 flex items-center justify-center h-12 sm:h-16">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-8 sm:max-h-12 max-w-[100px] sm:max-w-[140px] object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                    />
                  </div>
                  
                  {/* Company name overlay on hover - Hidden on mobile for cleaner look */}
                  <div className="hidden sm:block absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      {partner.name}
                    </span>
                  </div>
                  
                  {/* Mobile: Show name always */}
                  <div className="sm:hidden text-center mt-2">
                    <span className="text-xs font-medium text-gray-600">
                      {partner.name}
                    </span>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-br from-csa-blue to-csa-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-csa-blue" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Sponsorship */}
      <section className="py-12 sm:py-16 section-light">
        <div className="container-site px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-csa-navy mb-4 sm:mb-6">
              Custom Sponsorship Opportunities
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Looking for something specific? We can create custom sponsorship packages 
              tailored to your organization's unique needs and objectives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6 text-center px-4 sm:px-6">
                  <Calendar className="h-6 sm:h-8 w-6 sm:w-8 text-csa-blue mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2 text-sm sm:text-base">Event Sponsorship</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Sponsor specific events or workshops</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6 text-center px-4 sm:px-6">
                  <Users className="h-6 sm:h-8 w-6 sm:w-8 text-csa-blue mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2 text-sm sm:text-base">Training Programs</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Support certification and training initiatives</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300 sm:col-span-2 md:col-span-1">
                <CardContent className="pt-6 text-center px-4 sm:px-6">
                  <Globe className="h-6 sm:h-8 w-6 sm:w-8 text-csa-blue mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold text-csa-navy mb-2 text-sm sm:text-base">Research Projects</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Fund cloud security research initiatives</p>
                </CardContent>
              </Card>
            </div>
            <Button 
              asChild 
              size="lg" 
              className="bg-csa-accent hover:bg-csa-accent/90 text-white text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
            >
              <Link to="/contact">Discuss Custom Options</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
