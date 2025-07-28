
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Calendar, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";

const sponsorshipTiers = [
  {
    name: "Platinum",
    price: "$5,000",
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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner with CSA San Francisco
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed mb-8">
              Join leading organizations in supporting the cloud security community. 
              Our sponsorship opportunities provide unparalleled access to cloud security 
              professionals and thought leaders in the Bay Area.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-3"
            >
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-16">
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

      {/* Sponsorship Tiers */}
      <section className="py-16 section-light">
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
              <Card key={index} className={`relative ${tier.popular ? 'border-csa-blue shadow-lg' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-csa-blue text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-csa-navy">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-csa-blue">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full mt-6 ${tier.popular ? 'bg-csa-blue hover:bg-csa-blue/90' : 'bg-csa-accent hover:bg-csa-accent/90'} text-white`}
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
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

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
            {/* Placeholder sponsor logos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
              <div key={sponsor} className="bg-gray-100 h-20 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">Sponsor Logo</span>
              </div>
            ))}
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
