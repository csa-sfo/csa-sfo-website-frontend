
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const boardMembers = [
  {
    name: "Sudesh Gadewar ",
    role: "President",
    linkedin: "https://www.linkedin.com/in/sudeshgadewar/ ",
    image: "/lovable-uploads/members/sudeshgadewar.png"
  },
  {
    name: "Satish Govindappa ",
    role: "Vice President/Chapter Lead ",
    linkedin: "https://www.linkedin.com/in/hkgsatish/ ",
    image: "/lovable-uploads/members/satishgovindappa.png"
  },
  {
    name: "Megha Satish",
    role: "Program Manager ",
    linkedin: "https://www.linkedin.com/in/megha-satish22/",
    image: "/lovable-uploads/members/meghasatish.png"
  },
  {
    name: "Brent Ichien ",
    role: "Marketing and Sponsorship Coordinator  ",
    linkedin: "https://www.linkedin.com/in/brent-ichien-49128650/ ",
    image: "/lovable-uploads/members/brentIchien.png"
  },
  {
    name: "Poonam Dhillon",
    role: "Program Manager and Sponsorship Coordinator ",
    linkedin: "https://www.linkedin.com/in/poonamdhillon1/ ",
    image: "/lovable-uploads/members/poonamdhillon.png"
  }
];

const advisoryMembers = [
  
  {
    name: "Kapil Raina",
    role: "Advisory Member",
    linkedin: "https://www.linkedin.com/in/kapilraina/ ",
    image: "/lovable-uploads/members/Kapilraina.png"
  },
  {
    name: "Rahul Kalva",
    role: "Advisory Member",
    linkedin: "https://www.linkedin.com/in/rahul-kalva",
    image: "/lovable-uploads/members/rahulkalva.png"
  }
];

const volunteers = [
  {
    name: "Volunteer Name 1",
    role: "Community Volunteer",
    linkedin: "https://www.linkedin.com/in/volunteer1",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Volunteer Name 2", 
    role: "Event Coordinator Volunteer",
    linkedin: "https://www.linkedin.com/in/volunteer2",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Volunteer Name 3",
    role: "Technical Volunteer",
    linkedin: "https://www.linkedin.com/in/volunteer3",
    image: "/api/placeholder/150/150"
  }
];



export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
            {/* Left Column - Enhanced Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-csa-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Our Story</span>
              </div>
              
              {/* Main Heading with Gradient Text */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Welcome to the CSA
                  </span>
                  <span className="block bg-gradient-to-r from-csa-accent via-blue-400 to-csa-accent bg-clip-text text-transparent">
                    San Francisco Chapter
                  </span>
                </h1>
              </div>
              
              {/* Enhanced Description */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-light">
                  The <span className="font-semibold text-white">Cloud Security Alliance (CSA) San Francisco Chapter</span> is a vibrant community of cybersecurity professionals, cloud enthusiasts, researchers, and industry leaders. We are committed to driving thought leadership, fostering collaboration, and advancing best practices in cloud security through local events, research, and education.
                </p>
                
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-csa-accent">1000+</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-csa-accent">4+</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">Years Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-csa-accent">25+</div>
                    <div className="text-sm text-gray-300 uppercase tracking-wide">Partners</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Enhanced Team Image */}
            <div className="lg:text-right animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative group">
                {/* Image Container with Modern Effects */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-1 backdrop-blur-sm border border-white/20">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src="/lovable-uploads/aboutus.png"
                      alt="CSA San Francisco Team"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Floating Team Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white text-csa-navy px-6 py-3 rounded-xl shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-semibold">Our Amazing Team</div>
                      <div className="text-xs text-gray-600">Leaders in Cloud Security</div>
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

      {/* Leadership Team Section */}
      <section className="py-16 bg-white">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
            CSA SFO Team
            </h2>
            <p className="text-lg text-gray-600">
              Meet the dedicated professionals leading our chapter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {boardMembers.map((member, index) => (
              <Card key={member.name} className="text-center overflow-hidden h-full">
                <CardContent className="pt-8 pb-6">
                  <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
                  />
                  <h3 className="text-xl font-semibold text-csa-navy mb-2">
                    {member.name}
                  </h3>
                  <p className="text-csa-blue font-medium mb-4 text-sm leading-tight">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-[#0077b5] text-white rounded hover:bg-[#005885] transition-colors"
                    aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  >
                    <svg 
                      className="w-6 h-6" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Members Section */}
      <section className="py-16 bg-white">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Advisory Members
            </h2>
            <p className="text-lg text-gray-600">
              Distinguished advisors providing strategic guidance and expertise.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {advisoryMembers.map((member, index) => (
                <Card key={member.name} className="text-center overflow-hidden h-full">
                  <CardContent className="pt-8 pb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} profile`}
                      className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
                    />
                    <h3 className="text-xl font-semibold text-csa-navy mb-2">
                      {member.name}
                    </h3>
                    <p className="text-csa-blue font-medium mb-4 text-sm leading-tight">{member.role}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 bg-[#0077b5] text-white rounded hover:bg-[#005885] transition-colors"
                      aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    >
                      <svg 
                        className="w-6 h-6" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="py-16 section-light">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Volunteers
            </h2>
            <p className="text-lg text-gray-600">
              Dedicated volunteers who help make our community events and initiatives successful.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              {volunteers.map((volunteer, index) => (
                <Card key={volunteer.name} className="text-center overflow-hidden h-full">
                  <CardContent className="pt-8 pb-6">
                    <img
                      src={volunteer.image}
                      alt={`${volunteer.name} profile`}
                      className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
                    />
                    <h3 className="text-xl font-semibold text-csa-navy mb-2">
                      {volunteer.name}
                    </h3>
                    <p className="text-csa-blue font-medium mb-4 text-sm leading-tight">{volunteer.role}</p>
                    <a
                      href={volunteer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 bg-[#0077b5] text-white rounded hover:bg-[#005885] transition-colors"
                      aria-label={`Visit ${volunteer.name}'s LinkedIn profile`}
                    >
                      <svg 
                        className="w-6 h-6" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                  <CardTitle className="text-csa-navy">Who Are We</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    The CSA SF Chapter connects professionals across the Bay Area to share knowledge, promote awareness, and help shape the future of cloud and cybersecurity. As part of the global CSA network, we support CSA's mission locally by offering events, workshops, and opportunities for practitioners, founders, students, and leaders.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-csa-navy mb-3">Our Goals:</h4>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Foster professional growth and community engagement</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Provide a platform for knowledge-sharing and innovation</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Promote diversity, mentorship, and career support in cybersecurity</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

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

              <Card>
                <CardHeader>
                  <CardTitle className="text-csa-navy">Get Involved</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-csa-navy mb-2">Become a Member</h4>
                    <p className="text-gray-600 mb-4">
                      Whether you're a seasoned expert or just starting out, CSA SF welcomes you!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-csa-navy mb-3">Ways to get involved:</h4>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Attend our events</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Join a working group</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Volunteer to mentor or speak</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-csa-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span>Participate in research and peer review</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>



      {/* CSA Global Section */}
      <section className="py-16 section-light">
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
