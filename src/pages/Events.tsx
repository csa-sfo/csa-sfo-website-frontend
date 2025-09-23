
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Car, X } from "lucide-react";
import { Event } from "@/types/event";
import { API_ENDPOINTS } from "@/config/api";

// All events data - will be dynamically categorized as upcoming or past
export const allEvents: Event[] = [
  {
    id: "1dd7038a-8ef4-415c-8078-24ae2307ab2b",
    title: "CSA San Francisco Chapter Meeting - August 2025",
    date: "2025-08-27T16:30:00-08:00",
    location: "3000 Tannery Way, Santa Clara, CA",
    parkingCheckIn: "The west tower parking garage, East Tower lobby for check-in",
    excerpt: "Join us for an evening of networking with cybersecurity enthusiasts, learn about the latest industry trends, and share your own experiences.",
    slug: "csa-san-francisco-chapter-meeting-august-2025",
    speakers: [
      {
        id: "9",
        name: "Spencer Thellmann",
        role: "Principal Product Manager",
        company: "Palo Alto Networks",
        about: "Spencer Thellmann is a Principal Product Manager at Palo Alto Networks, holding an MPhil in Technology Policy from the University of Cambridge, and leading efforts in AI runtime security—most recently advancing the Prisma AIRS platform and Python SDK to protect AI applications and agents from real-time threats.",
        imageUrl: "/public/Speaker-images/Spencer.png"
      },
      {
        id: "10",
        name: "Debrup Ghosh",
        role: "Principal Product Manager",
        company: "F5",
        about: "Debrup Ghosh is a product management leader—currently serving as Principal Product Manager at F5 Networks—renowned for driving innovative AI/ML-enabled Web Application and API Protection (WAAP) solutions, having previously led Synopsys's Polaris application security platform to award-winning status and holding a computer-vision patent simplifying U.S. truck driver inspections.",
        imageUrl: "/public/Speaker-images/Debrup.png"
      },
      {
        id: "11",
        name: "Sudesh Gadewar",
        role: "President",
        company: "CSA SF Chapter",
        about: "Sudesh Gadewar is the President of the Cloud Security Alliance San Francisco Chapter, a global non-profit organization dedicated to advancing the adoption of best practices for securing the cloud. He is a recognized leader in the field of cybersecurity, with over 20 years of experience in the industry.",
        imageUrl: "/public/lovable-uploads/members/sudeshgadewar.png"
      },
      {
        id: "12",
        name: "Brent Ichien",
        role: "Regional Account Executive",
        company: "Endor Labs",
        about: "Brent Ichien is a Regional Account Executive at Endor Labs, specializing in Software Supply Chain Security since March 2024, and previously served as a Regional Sales Manager at Synopsys from November 2020 to March 2024",
        imageUrl: "/public/Speaker-images/brent.png"
      },
      
      
    ],
    tags: ["CSA","Cybersecurity","Cloud Security", "Networking"],
    attendees: 45,
    capacity: 60,
    agenda: []
  },
  {
    id: "fe806e0e-791a-48f0-8910-51b2c5edc58d",
    title: "CSA San Francisco Chapter Meeting July - 2025",
    date: "2024-07-23T16:30:00-08:00",
    location: "Room Names: San Jose State, UC Berkeley & Stanford ,Adobe World Headquarters : 345 Park Avenue San Jose, CA 95110, West Tower, 6th Floor",
    parkingCheckIn: "the Almaden/East Tower parking garage the address is 321 Park Avenue San Jose, CA and East Tower lobby for check-ins.",
    excerpt: "Deep dive into great opportunity to network with fellow cybersecurity enthusiasts, learn about the latest industry trends, and share your own experiences.",
         slug: "csa-san-francisco-chapter-meeting-july-2025",
    speakers: [
      {
        id: "1",
        name: "Omkar Nimbalkar",
        role: "Senior Manager, Cyber Threat Research & Intelligence",
        company: "Adobe",
        about: "Expert in Cyber Threat Research & Intelligence.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "2",
        name: "Louis Roberts",
        role: "Global Sales Director",
        company: "RAD Security",
        about: "Specialist in Head day to day operations and ongoing strategy of the RAD Sales and Customer Success team.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "3",
        name: "Mike Zelle",
        role: "Pre-Sales Technical Solutions Director",
        company: "Tanium",
        about: "Specialist in Technology Strategy & Innovation Focused Solution Producer.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "4",
        name: "Chris Oshaben",
        role: "Technology & Cybersecurity Audit",
        company: "Delta Dental",
        about: "Specialist in technology and security reviews at Delta Dental of California, assessing effectiveness, identifying risks, and reporting findings to the Board of Directors and Senior Leadership",
        imageUrl: "/api/placeholder/150/150"
      }
    ],
         tags: ["Cybersecurity", "Cloud Security","Networking"],
     attendees: 55,
     capacity: 55,
     agenda: []
   },
   {
     id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
     title: "CSA San Francisco Chapter Meeting May - 2025",
     date: "2025-05-21T16:30:00-08:00",
     location: "Blackhawk Network - 6220 Stoneridge Mall Road Pleasanton, CA 94588",
     parkingCheckIn: "Parking available at Stoneridge Mall.",
     excerpt: "Come join us for the next CSA San Francisco Chapter Meeting on May 21st ",
     slug: "csa-san-francisco-chapter-meeting-may-2025",
     speakers: [
       {
         id: "5",
         name: "Hardeep Singh ",
         role: "Security Architect",
         company: "-",
         about: "Expert in Security for a cloud-native, AI-Driven world",
         imageUrl: "/api/placeholder/150/150"
       },
       {
         id: "6",
         name: "Pavi Ramamurthy ",
         role: "Global CISO & CIO", 
         company: "Blackhawk Network",
         about: "Responsible for Information Security, Fraud & Risk, Corporate IT and Business Systems.",
         imageUrl: "/api/placeholder/150/150"
       },
       {
         id: "7",
         name: "Varun Badhwar ",
         role: "Founder & CEO", 
         company: "Endor Labs",
         about: "Founder & CEO of Endor Labs which is a Application Security platform for the AI-driven software development revolution.",
         imageUrl: "/api/placeholder/150/150"
       },
       {
        id: "8",
        name: "Anshu Gupta ",
        role: "Chief Information Security Officer/ Investor", 
        company: "SVCI - Silicon Valley CISO Investments",
        about: "Information Security leader with experience working at startups, SaaS and eCommerce companies along with Big 4 experience at Ernst & Young LLP and KPMG LLP, delivering security & compliance advisory services to Fortune 500 companies.",
        imageUrl: "/api/placeholder/150/150"
      }
     ],
     tags: ["CSA","Cybersecurity","Cloud Security", "Networking"],
     attendees: 40,
     capacity: 45,
     agenda: []
   },
    {
      id: "d41184c8-4964-4453-a23b-d1c5009600aa",
      title: "CSA San Francisco Chapter & OWASP Bay Area Meeting",
     date: "2025-09-23T17:00:00-07:00",
     location: "Blackhawk Network, 6220 Stoneridge Mall Rd, Pleasanton, CA 94588",
     parkingCheckIn: "Parking available at Stoneridge Mall",
     excerpt: "Join us for an evening of knowledge sharing, innovation, and networking in collaboration with OWASP Bay Area Chapter. Featuring technical talks on AI, MCP Security, and a panel discussion on building trust in AI.",
     slug: "csa-san-francisco-chapter-owasp-bay-area-meeting-september-2025",
     speakers: [
       {
         id: "13",
         name: "Badari Kalagi",
         role: "Panelist",
         company: "Vagaro",
         about: "Expert in AI implementation and security",
         imageUrl: "/Speaker-images/badari.jpg"
       },
       {
         id: "14",
         name: "Ahmad Sadeddin",
         role: "Panelist",
         company: "Corgea",
         about: "Expert in AI and creativity applications",
         imageUrl: "/Speaker-images/Ahmad.jpg"
       },
       {
         id: "15",
         name: "Abhishek Bansal",
         role: "Panelist",
         company: "Autharva",
         about: "Specialist in AI security and trust building",
         imageUrl: "/Speaker-images/abhishek.jpg"
       },
       {
         id: "16",
         name: "Eugene Weiss",
         role: "Speaker",
         company: "Stash Global Inc",
         about: "Technical expert in MCP Security",
         imageUrl: "/Speaker-images/Eugene.jpg"
       },
       {
         id: "17",
         name: "Brent Ichien",
         role: "Moderator",
         company: "Endor Labs",
         about: "Regional Account Executive at Endor Labs, specializing in Software Supply Chain Security",
         imageUrl: "/Speaker-images/brent.png"
       }
     ],
     tags: ["CSA", "OWASP", "AI", "Cybersecurity", "Networking", "Panel Discussion"],
     attendees: 0,
     capacity: 100,
     agenda: [
       {
         id: "1",
         duration: "5:00 PM - 5:30 PM",
         topic: "Networking",
         description: "Welcome and networking session"
       },
       {
         id: "2",
         duration: "5:30 PM - 5:40 PM",
         topic: "Keynote Speaker",
         description: "Sudesh Gadewar - CSA San Francisco Chapter"
       },
       {
         id: "3",
         duration: "5:40 PM - 6:25 PM",
         topic: "Vibe Coding in Action: When AI Meets Creativity",
         description: "Ahmad Sadeddin - Corgea"
       },
       {
         id: "4",
         duration: "6:25 PM - 7:10 PM",
         topic: "Technical Talk: How to do MCP Security Right, Part a",
         description: "Eugene Weiss - Stash Global Inc"
       },
       {
         id: "5",
         duration: "7:10 PM - 7:55 PM",
         topic: "Panel Discussion: AI on Day One: Building Trust, Busting Myths, and Dodging Pitfalls",
         description: "Abhishek Bansal, Ahmad Sadeddin & Badari Kalagi"
       }
     ],
     regUrl: "https://lnkd.in/gFApuHZ2",
     description: "We're thrilled to announce our next chapter meeting in collaboration with OWASP Bay Area Chapter, for an evening of knowledge sharing, innovation, and networking! Huge thanks to our sponsor Corgea and our host Blackhawk Network for making this possible. Let's build stronger bridges across the security community together!"
   }
];

export default function Events() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});

  // Fetch attendee counts for all events
  const fetchAttendeeCounts = async () => {
    const counts: Record<string, number> = {};
    
    for (const event of allEvents) {
      try {
        const response = await fetch(`${API_ENDPOINTS.EVENT_ATTENDEES}/${event.id}`);
        
        if (response.ok) {
          const data = await response.json();
          counts[event.id] = data.attendees;
        } else {
          counts[event.id] = event.attendees;
        }
      } catch (error) {
        counts[event.id] = event.attendees;
      }
    }
    
    setAttendeeCounts(counts);
  };

  // Fetch attendee counts on component mount
  useEffect(() => {
    fetchAttendeeCounts();
  }, []);

  // Event images array for the modal
  const eventImages = [
    "/Events-pictures/1729377993131.jpeg",
    "/Events-pictures/20250604_111127.jpg",
    "/Events-pictures/20250605_133448.jpg",
    "/Events-pictures/PXL_20250327_020441379.MP.jpg",
    "/Events-pictures/PXL_20250522_015003557.MP.jpg",
    "/Events-pictures/PXL_20250522_024915629.MP.jpg"
  ];

  // Function to categorize events as upcoming or past based on current date
  const categorizeEvents = () => {
    const now = new Date();
    const upcoming: Event[] = [];
    const past: Event[] = [];

    allEvents.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    // Sort upcoming events by date (earliest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Sort past events by date (most recent first)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcoming, past };
  };

  const { upcoming: upcomingEvents, past: pastEvents } = categorizeEvents();

  const allTags = Array.from(new Set([
    ...upcomingEvents.flatMap(e => e.tags),
    ...pastEvents.flatMap(e => e.tags)
  ]));

  // Filter events based on selected year and topic
  const filterEvents = (events: Event[]) => {
    return events.filter(event => {
      const eventYear = new Date(event.date).getFullYear().toString();
      const yearMatch = selectedYear === "all" || eventYear === selectedYear;
      const topicMatch = selectedTopic === "all" || event.tags.some(tag => 
        tag.toLowerCase() === selectedTopic.toLowerCase()
      );
      return yearMatch && topicMatch;
    });
  };

  const filteredUpcomingEvents = filterEvents(upcomingEvents);
  const filteredPastEvents = filterEvents(pastEvents);

  // Get unique years from all events for the year filter
  const availableYears = Array.from(new Set(
    allEvents.map(event => new Date(event.date).getFullYear().toString())
  )).sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        timeZone: 'America/Los_Angeles'
      }),
      date: date.toLocaleDateString('en-US', { 
        day: 'numeric',
        timeZone: 'America/Los_Angeles'
      }),
      month: date.toLocaleDateString('en-US', { 
        month: 'short',
        timeZone: 'America/Los_Angeles'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        timeZoneName: 'short',
        timeZone: 'America/Los_Angeles'
      }).replace('PDT', 'PDT').replace('PST', 'PDT')
    };
  };

  const EventCard = ({ event, showRegistration = false }: { event: Event, showRegistration?: boolean }) => {
    const dateInfo = formatEventDate(event.date);
    const currentAttendees = attendeeCounts[event.id] ?? event.attendees;
    const spotsLeft = event.capacity - currentAttendees;

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2 leading-tight">
                <Link 
                  to={`/events/${event.slug}`}
                  className="hover:text-csa-blue transition-colors"
                >
                  {event.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-gray-600">
                {event.excerpt}
              </CardDescription>
            </div>
            <div className="text-center bg-csa-light p-3 rounded-lg flex-shrink-0">
              <div className="text-sm text-gray-600 font-medium">{dateInfo.day}</div>
              <div className="text-2xl font-bold text-csa-navy">{dateInfo.date}</div>
              <div className="text-sm text-gray-600">{dateInfo.month}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-csa-blue" />
              <span>{dateInfo.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-csa-blue" />
              <span>{currentAttendees}/{event.capacity}</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-csa-blue mt-0.5 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          {event.parkingCheckIn && (
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <Car className="h-4 w-4 text-csa-blue mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Parking/Check In: </span>
                <span>{event.parkingCheckIn}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Speakers:</div>
            <div className="text-sm text-gray-600">
              {event.speakers.map(speaker => speaker.name).join(", ")}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-csa-blue/10 text-csa-blue">
                {tag}
              </Badge>
            ))}
          </div>

          {showRegistration && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {spotsLeft > 0 ? (
                    <span className="text-green-600 font-medium">
                      {spotsLeft} spots remaining
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">Waitlist only</span>
                  )}
                </div>
                <Button asChild className="bg-csa-blue hover:bg-csa-blue/90">
                  <Link to={`/events/${event.slug}`}>
                    {spotsLeft > 0 ? "Register" : "Join Waitlist"}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Ultra-Modern Hero Section with Dynamic Image Gallery */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-slate-900 via-csa-navy to-slate-800 overflow-hidden">
        {/* Dynamic Background with Moving Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-csa-accent/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-tr from-csa-blue/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        {/* Split Layout: Content Left, Image Gallery Right */}
        <div className="relative z-10 min-h-[70vh] grid lg:grid-cols-2 gap-0">
          
          {/* Left Column - Content */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="max-w-2xl space-y-8">
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in">
                <div className="w-2 h-2 bg-csa-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-100 uppercase tracking-wider">Live Events Gallery</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Connect.
                  </span>
                  <span className="block bg-gradient-to-r from-csa-accent via-blue-400 to-csa-accent bg-clip-text text-transparent">
                    Learn.
                  </span>
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Secure.
                  </span>
            </h1>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Experience the future of <span className="font-semibold text-white">cloud security</span> through our 
                immersive community events, featuring world-class speakers and cutting-edge innovations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Link to="#upcoming">Explore Events</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-csa-accent text-csa-accent hover:bg-csa-accent hover:text-white text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Link to="/get-involved">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Image Gallery */}
          <div className="relative flex items-center justify-center p-8">
            
            {/* Gallery Container */}
            <div className="relative w-full max-w-2xl h-[400px] lg:h-[480px]">
              
              {/* Central Featured Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="relative w-80 h-56 lg:w-96 lg:h-64 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: '1s' }}
                  onClick={() => setSelectedImage("/Events-pictures/PXL_20250522_024915629.MP.jpg")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-csa-accent/20 to-csa-blue/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <img 
                    src="/Events-pictures/PXL_20250522_024915629.MP.jpg"
                    alt="CSA Event Highlight"
                    className="relative w-full h-full object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-all duration-500 border-2 border-white/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">CSA Community Event</p>
                  </div>
                </div>
              </div>

              {/* Orbiting Images */}
              
              {/* Image 2 - Top */}
              <div 
                className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-4 w-48 h-32 lg:w-56 lg:h-36 cursor-pointer group animate-fade-in"
                style={{ animationDelay: '1.2s' }}
                onClick={() => setSelectedImage("/Events-pictures/1729377993131.jpeg")}
              >
                <img 
                  src="/Events-pictures/1729377993131.jpeg"
                  alt="CSA Event"
                  className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/30"
                />
              </div>

              {/* Image 3 - Top Right */}
              <div 
                className="absolute top-16 right-0 transform translate-x-4 w-44 h-28 lg:w-52 lg:h-32 cursor-pointer group animate-fade-in"
                style={{ animationDelay: '1.4s' }}
                onClick={() => setSelectedImage("/Events-pictures/20250604_111127.jpg")}
              >
                <img 
                  src="/Events-pictures/20250604_111127.jpg"
                  alt="CSA Event"
                  className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/30"
                />
              </div>

              {/* Image 4 - Bottom Right */}
              <div 
                className="absolute bottom-16 right-0 transform translate-x-4 w-48 h-32 lg:w-56 lg:h-36 cursor-pointer group animate-fade-in"
                style={{ animationDelay: '1.6s' }}
                onClick={() => setSelectedImage("/Events-pictures/20250605_133448.jpg")}
              >
                <img 
                  src="/Events-pictures/20250605_133448.jpg"
                  alt="CSA Event"
                  className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/30"
                />
              </div>

              {/* Image 5 - Bottom */}
              <div 
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-4 w-48 h-32 lg:w-56 lg:h-36 cursor-pointer group animate-fade-in"
                style={{ animationDelay: '1.8s' }}
                onClick={() => setSelectedImage("/Events-pictures/PXL_20250327_020441379.MP.jpg")}
              >
                <img 
                  src="/Events-pictures/PXL_20250327_020441379.MP.jpg"
                  alt="CSA Event"
                  className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/30"
                />
              </div>

              {/* Image 6 - Top Left */}
              <div 
                className="absolute top-16 left-0 transform -translate-x-4 w-44 h-28 lg:w-52 lg:h-32 cursor-pointer group animate-fade-in"
                style={{ animationDelay: '2s' }}
                onClick={() => setSelectedImage("/Events-pictures/PXL_20250522_015003557.MP.jpg")}
              >
                <img 
                  src="/Events-pictures/PXL_20250522_015003557.MP.jpg"
                  alt="CSA Event"
                  className="w-full h-full object-cover rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/30"
                />
              </div>

              {/* Connecting Lines/Dots */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="150" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-spin" style={{ animationDuration: '20s' }}>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F27D42" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#367ABB" stopOpacity="0.5"/>
                      </linearGradient>
                    </defs>
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-csa-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-csa-accent rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-csa-blue rounded-full opacity-80 animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-70 animate-ping" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-csa-accent rounded-full opacity-60 animate-ping" style={{ animationDelay: '6s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-csa-blue rounded-full opacity-70 animate-ping" style={{ animationDelay: '8s' }}></div>
          <div className="absolute top-1/6 right-2/3 w-1 h-1 bg-orange-300 rounded-full opacity-50 animate-ping" style={{ animationDelay: '10s' }}></div>
        </div>
      </section>

      {/* Events Content */}
      <section id="upcoming" className="py-16">
        <div className="container-site">
          <Tabs defaultValue="upcoming" className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <TabsList className="grid w-full lg:w-auto grid-cols-2">
                <TabsTrigger value="upcoming" className="px-8">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="px-8">Past Events</TabsTrigger>
              </TabsList>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag.toLowerCase()}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid gap-6">
                {filteredUpcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} showRegistration={true} />
                ))}
              </div>
              {filteredUpcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No upcoming events</h3>
                  <p className="text-gray-500">Check back soon for new events!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="grid gap-6">
                {filteredPastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredPastEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No past events found</h3>
                  <p className="text-gray-500">No events match your current filters.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-60 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close image"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Main image */}
            <img
              src={selectedImage}
              alt="CSA Event - Full Size"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-fade-in"
              style={{ animationDuration: '0.3s' }}
            />
            
            {/* Image navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                {eventImages.map((image, index) => (
                  <button
                    key={image}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(image);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedImage === image 
                        ? 'bg-csa-accent scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
