
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Award, Users, TrendingUp, Target } from "lucide-react";

const boardMembers = [
  {
    name: "Satish Govindappa",
    role: "Chapter Chair",
    company: "Oracle",
    bio: "Cloud security architect with 15+ years in enterprise security and cloud transformation.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Dr. Sarah Chen",
    role: "Vice Chair",
    company: "Salesforce",
    bio: "Research scientist specializing in zero trust architectures and identity management.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Michael Rodriguez",
    role: "Program Director",
    company: "Adobe",
    bio: "Program management leader focused on cloud security education and community building.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Emily Watson",
    role: "Outreach Coordinator",
    company: "Cisco",
    bio: "Security evangelist driving industry partnerships and community engagement initiatives.",
    image: "/api/placeholder/150/150"
  }
];

const partners = [
  { name: "Adobe", logo: "/api/placeholder/120/60", tier: "Gold" },
  { name: "Salesforce", logo: "/api/placeholder/120/60", tier: "Gold" },
  { name: "Cisco", logo: "/api/placeholder/120/60", tier: "Silver" },
  { name: "Oracle", logo: "/api/placeholder/120/60", tier: "Silver" },
  { name: "Google Cloud", logo: "/api/placeholder/120/60", tier: "Bronze" },
  { name: "AWS", logo: "/api/placeholder/120/60", tier: "Bronze" },
];

const achievements = [
  {
    icon: Users,
    title: "250+ Active Members",
    description: "Growing community of cloud security professionals"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "CSA Chapter Excellence Award recipient 2023"
  },
  {
    icon: TrendingUp,
    title: "8 Years Strong",
    description: "Consistent growth and impact since 2017"
  },
  {
    icon: Target,
    title: "12 Events Annually",
    description: "Regular programming with expert speakers"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CSA San Francisco
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              We are the San Francisco Bay Area chapter of the Cloud Security Alliance, 
              dedicated to promoting best practices for providing security assurance within cloud computing.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To promote the use of best practices for providing security assurance within 
                cloud computing, and to provide education on the uses of cloud computing to 
                help secure all other forms of computing in the San Francisco Bay Area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-csa-navy">What We Do</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Host monthly chapter meetings with industry experts</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Facilitate networking opportunities for security professionals</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Contribute to global CSA research initiatives</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Provide educational resources and best practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-csa-navy">Who We Serve</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Cloud security architects and engineers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>IT leaders and decision makers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Security researchers and academics</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Technology vendors and service providers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600">
              Building a stronger, more secure cloud ecosystem in the Bay Area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={achievement.title} className="text-center">
                <CardContent className="pt-6">
                  <achievement.icon className="h-12 w-12 text-csa-blue mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-csa-navy mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Meet the dedicated professionals leading our chapter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, index) => (
              <Card key={member.name} className="text-center overflow-hidden">
                <CardContent className="pt-6">
                  <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-csa-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-csa-blue font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.company}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Our Partners
            </h2>
            <p className="text-lg text-gray-600">
              We're grateful for the support of these industry-leading organizations.
            </p>
          </div>

          <div className="space-y-8">
            {["Gold", "Silver", "Bronze"].map(tier => (
              <div key={tier}>
                <h3 className="text-xl font-semibold text-csa-navy mb-4 text-center">
                  <Badge variant="outline" className={`
                    ${tier === "Gold" ? "border-yellow-500 text-yellow-600" : ""}
                    ${tier === "Silver" ? "border-gray-400 text-gray-600" : ""}
                    ${tier === "Bronze" ? "border-orange-500 text-orange-600" : ""}
                  `}>
                    {tier} Partners
                  </Badge>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                  {partners
                    .filter(partner => partner.tier === tier)
                    .map((partner, index) => (
                      <div 
                        key={partner.name}
                        className="grayscale hover:grayscale-0 transition-all duration-300"
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
            ))}
          </div>
        </div>
      </section>

      {/* CSA Global Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Part of a Global Movement
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The Cloud Security Alliance is the world's leading organization dedicated to 
              defining and raising awareness of best practices to help ensure a secure cloud 
              computing environment. With chapters worldwide, we're part of a global community 
              working to advance cloud security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://cloudsecurityalliance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-csa-blue text-csa-blue hover:bg-csa-blue hover:text-white transition-colors rounded-md font-medium"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit CSA Global
              </a>
              <a
                href="https://research.cloudsecurityalliance.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-csa-blue text-csa-blue hover:bg-csa-blue hover:text-white transition-colors rounded-md font-medium"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Research Portal
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
