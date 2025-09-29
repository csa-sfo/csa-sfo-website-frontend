
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/config/api";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, ExternalLink, ArrowLeft, Download, CheckCircle, User } from "lucide-react";
import { toast } from "sonner";
import { Event } from "@/types/event";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";

// Mock event data - COMMENTED OUT: Now fetching from API instead of using hardcoded data
/*
const eventData: Record<string, Event> = {
  "csa-san-francisco-chapter-meeting-august-2025": {
    id: "1dd7038a-8ef4-415c-8078-24ae2307ab2b",
    title: "CSA San Francisco Chapter Meeting - August 2025",
    date: "2025-08-27T16:30:00-08:00",
    location: "3000 Tannery Way, Santa Clara, CA 95054",
    parkingCheckIn: "The west tower parking garage, East Tower lobby for check-in",
    excerpt: "Join us for an evening of networking with cybersecurity enthusiasts, learn about the latest industry trends, and share your own experiences.",
    slug: "csa-san-francisco-chapter-meeting-august-2025",
    description: `Come join us for the next CSA San Francisco Chapter Meeting on Aug 27th sponsored by Paulo Alto networks ! This in-person event is a great opportunity to network with fellow cybersecurity enthusiasts, learn about the latest industry trends, and share your own experiences. Don't miss out on this chance to connect with like-minded professionals in the cybersecurity field. We look forward to seeing you there! In today's fast-evolving tech landscape, building a successful career in cybersecurity requires more than technical skills — it takes strategy, mentorship, and intentional growth. `,
    agenda: [
      {
        id: "1",
        duration: "5:30 PM - 6:00 PM",
        topic: "Networking",
        description: "Welcome to start networking with fellow cybersecurity enthusiasts."
      },
      {
        id: "2",
        duration: "6:10 PM - 6:30 PM",
        topic: "CSA Introduction",
        description: "CSA Introduction and upcoming events overview."
      },
      {
        id: "3",
        duration: "6:30 PM - 7:00 PM",
        topic: "Keynote - Spencer Thellmann ",
        description: "The Rise of Autonomous AI: Understanding the New Threat Landscape"
      },
      {
        id: "4",
        duration: "7:05 PM - 7:40 PM",
        topic: "Panel Discussion - Debrup Ghosh, Sudesh Gadewar, Brent Ichien",
        description: "AI/ML Policy & Governance: Who’s Watching the Watchers?"
      }
      
    ],
    speakers: [
      {
        id: "9",
        name: "Spencer Thellmann",
        role: "Principal Product Manager",
        company: "Palo Alto Networks",
        about: "Spencer Thellmann is a Principal Product Manager at Palo Alto Networks, holding an MPhil in Technology Policy from the University of Cambridge, and leading efforts in AI runtime security—most recently advancing the Prisma AIRS platform and Python SDK to protect AI applications and agents from real-time threats.",
        imageUrl: "/Speaker-images/Spencer.png"
      },
      {
        id: "10",
        name: "Debrup Ghosh",
        role: "Principal Product Manager",
        company: "F5",
        about: "Debrup Ghosh is a product management leader—currently serving as Principal Product Manager at F5 Networks—renowned for driving innovative AI/ML-enabled Web Application and API Protection (WAAP) solutions, having previously led Synopsys’s Polaris application security platform to award-winning status and holding a computer-vision patent simplifying U.S. truck driver inspections.",
        imageUrl: "/Speaker-images/Debrup.png"
      },
      {
        id: "11",
        name: "Sudesh Gadewar",
        role: "President",
        company: "CSA SF Chapter",
        about: "Sudesh Gadewar is the President of the Cloud Security Alliance San Francisco Chapter, a global non-profit organization dedicated to advancing the adoption of best practices for securing the cloud. He is a recognized leader in the field of cybersecurity, with over 20 years of experience in the industry.",
        imageUrl: "/lovable-uploads/members/sudeshgadewar.png"
      },
      {
        id: "12",
        name: "Brent Ichien",
        role: "Regional Account Executive",
        company: "Endor Labs",
        about: "Brent Ichien is a Regional Account Executive at Endor Labs, specializing in Software Supply Chain Security since March 2024, and previously served as a Regional Sales Manager at Synopsys from November 2020 to March 2024",
        imageUrl: "/Speaker-images/brent.png"
      },
      
    ],
    tags: ["CSA","Cybersecurity","Cloud Security", "Networking"],
    attendees: 45,
    capacity: 60,
    regUrl: "https://www.eventbrite.com/e/csa-san-francisco-chapter-meeting-august-2025-tickets-11111111111",
    mapUrl: "https://maps.app.goo.gl/cgfA3zNLHyZEdWkCA",
    posterUrl: "/posters/CSA-Sfo-August.png"
  },
  "csa-san-francisco-chapter-meeting-july-2025": {
    id: "fe806e0e-791a-48f0-8910-51b2c5edc58d",
    title: "CSA San Francisco Chapter Meeting July - 2025",
    date: "2024-07-23T16:30:00-08:00",
    location: "Room Names: San Jose State, UC Berkeley & Stanford, Adobe World Headquarters: 345 Park Avenue San Jose, CA 95110, West Tower, 6th Floor",
    parkingCheckIn: "Use the Almaden/East Tower parking garage at 321 Park Avenue San Jose, CA and check in at East Tower lobby.",
    excerpt: "Great opportunity to network with fellow cybersecurity enthusiasts, learn about the latest industry trends, and share your own experiences.",
    slug: "csa-san-francisco-chapter-meeting-july-2025",
    description: `Join us for our monthly CSA San Francisco Chapter meeting where cybersecurity professionals come together to share knowledge, network, and discuss the latest trends in cloud security and cybersecurity.

This session will focus on practical applications of cybersecurity frameworks in modern enterprise environments, featuring presentations from industry experts and interactive networking opportunities.

Whether you're a seasoned professional or new to the field, this meeting provides valuable insights and connections in the cybersecurity community.`,
    agenda: [
      {
        id: "1",
        duration: "5:30 PM - 6:00 PM",
        topic: "Networking",
        description: "Check-in, welcome to start networking with fellow cybersecurity enthusiasts."
      },
      {
        id: "2", 
        duration: "6:00 PM - 6:15 PM",
        topic: "CSA Introduction",
        description: "Latest chapter news, upcoming events, and community updates."
      },
      {
        id: "3",
        duration: "6:15 PM - 7:00 PM",
        topic: "Panel Discussion - From Reactive to Proactive - Leveraging AI and Automation",
        description: "This panel would examine how cutting-edge technologies—like AI and automation—are reshaping the security landscape, enabling faster threat detection and response."
      },
      {
        id: "4",
        duration: "7:00 PM - 8:40 PM",
        topic: "Hack your career - Chris Oshaben",
        description: "In today's fast-evolving tech landscape, building a successful career in cybersecurity requires more than technical skills — it takes strategy, mentorship, and intentional growth." 
      },
      
    ],
    speakers: [
      {
        id: "2",
        name: "Omkar Nimbalkar",
        role: "Senior Manager, Cyber Threat Research & Intelligence",
        company: "Adobe",
        about: "Expert in Cyber Threat Research & Intelligence.",
        imageUrl: "/Speaker-images/omkar-nimbalkar.png"
      },
      {
        id: "3",
        name: "Louis Roberts",
        role: "Global Sales Director",
        company: "RAD Security",
        about: "Specialist in Head day to day operations and ongoing strategy of the RAD Sales and Customer Success team.",
        imageUrl: "/Speaker-images/louis.jpg"
      },
      {
        id: "4",
        name: "Mike Zelle",
        role: "Pre-Sales Technical Solutions Director",
        company: "Tanium",
        about: "Specialist in Technology Strategy & Innovation Focused Solution Producer.",
        imageUrl: "/Speaker-images/mike.png"
      },
      {
        id: "5",
        name: "Chris Oshaben",
        role: "Technology & Cybersecurity Audit",
        company: "Delta Dental",
        about: "Specialist in technology and security reviews at Delta Dental of California, assessing effectiveness, identifying risks, and reporting findings to the Board of Directors and Senior Leadership",
        imageUrl: "/Speaker-images/chris-oshaben.png"
      }
    ],
    tags: ["Cybersecurity", "Cloud Security", "Networking"],
    attendees: 55,
    capacity: 55,
    mapUrl: "https://maps.google.com/?q=Adobe,345+Park+Avenue,San+Jose,CA",
    posterUrl: "/posters/CSA-SFO-July.png"
  },
  "csa-san-francisco-chapter-meeting-may-2025": {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "CSA San Francisco Chapter Meeting May - 2025",
    date: "2024-05-21T16:30:00-08:00",
    location: "Salesforce Tower, 415 Mission St, San Francisco, CA",
    parkingCheckIn: "Valet parking available at Salesforce Tower. Check in at the 34th floor Ohana reception desk.",
    excerpt: "Monthly chapter meeting focusing on Zero Trust architectures and enterprise security best practices.",
    slug: "csa-san-francisco-chapter-meeting-may-2025",
    description: `This month's CSA San Francisco Chapter meeting focuses on Zero Trust Architecture implementation and enterprise security best practices. 

We'll explore real-world case studies, implementation challenges, and lessons learned from organizations that have successfully deployed Zero Trust frameworks.

Join us for an engaging session that combines technical deep-dives with practical insights from industry leaders who are at the forefront of modern security architecture.`,
    agenda: [
      {
        id: "1",
        duration: "5:30 PM - 6:00 PM",
        topic: "Networking",
        description: "Welcome reception with refreshments and networking opportunities."
      },
      {
        id: "2",
        duration: "6:00 PM - 6:10 PM", 
        topic: "Introduction to CSA",
        description: "Chapter updates and overview of upcoming events and initiatives."
      },
      {
        id: "3",
        duration: "6:10 PM - 6:40 PM",
        topic: "Keep it Simple, Secure everything - Hardeep Singh ",
        description: "Decoding Security for a cloud-native, AI-Driven world."
      },
      {
        id: "4",
        duration: "6:45 PM - 7:30 PM",
        topic: "Panel Discusssion : Pavi Ramamurthy, Varun Badhwar & Anshu Gupta",
        description: "Empowering AppSec Teams to Embrace the AI Software Development Revolution."
      }
      
    ],
    speakers: [
      {
        id: "6",
        name: "Hardeep Singh ",
        role: "Security Architect",
        company: "-",
        about: "Expert in Security for a cloud-native, AI-Driven world",
        imageUrl: "/Speaker-images/hardeep.png"
      },
      {
        id: "7",
        name: "Pavi Ramamurthy ",
        role: "Global CISO & CIO", 
        company: "Blackhawk Network",
        about: "Responsible for Information Security, Fraud & Risk, Corporate IT and Business Systems.",
        imageUrl: "/Speaker-images/pavi.jpg"
      },
      {
        id: "8",
        name: "Varun Badhwar ",
        role: "Founder & CEO", 
        company: "Endor Labs",
        about: "Founder & CEO of Endor Labs which is a Application Security platform for the AI-driven software development revolution.",
        imageUrl: "/Speaker-images/varun.jpg"
      },
      {
       id: "9",
       name: "Anshu Gupta ",
       role: "Chief Information Security Officer/ Investor", 
       company: "SVCI - Silicon Valley CISO Investments",
       about: "Information Security leader with experience working at startups, SaaS and eCommerce companies along with Big 4 experience at Ernst & Young LLP and KPMG LLP, delivering security & compliance advisory services to Fortune 500 companies.",
       imageUrl: "/Speaker-images/anshu.jpg"
     }
    ],
    tags: ["CSA","Cybersecurity","Cloud Security", "Networking"],
    attendees: 40,
    capacity: 45,
    mapUrl: "https://maps.google.com/?q=Salesforce+Tower,415+Mission+St,San+Francisco,CA",
    posterUrl: "/posters/CSA-SFO-May.png"
  },
  "csa-san-francisco-chapter-owasp-bay-area-meeting-september-2025": {
    id: "d41184c8-4964-4453-a23b-d1c5009600aa",
    title: "CSA San Francisco Chapter & OWASP Bay Area Meeting",
    date: "2025-09-23T17:00:00-07:00",
    location: "Blackhawk Network, 6220 Stoneridge Mall Rd, Pleasanton, CA 94588",
    parkingCheckIn: "Parking available at Stoneridge Mall",
    excerpt: "Join us for an evening of knowledge sharing, innovation, and networking in collaboration with OWASP Bay Area Chapter. Featuring technical talks on AI, MCP Security, and a panel discussion on building trust in AI.",
    slug: "csa-san-francisco-chapter-owasp-bay-area-meeting-september-2025",
    description: `We're thrilled to announce our next chapter meeting in collaboration with OWASP Bay Area Chapter, for an evening of knowledge sharing, innovation, and networking! Huge thanks to our sponsor Corgea and our host Blackhawk Network for making this possible. Let's build stronger bridges across the security community together!

This special collaboration brings together two leading cybersecurity organizations to explore the intersection of AI and security. The evening will feature cutting-edge technical presentations, interactive panel discussions, and valuable networking opportunities.

Whether you're interested in AI security, MCP (Model Context Protocol) security, or building trust in AI systems, this event offers insights from industry experts and thought leaders.`,
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
    regUrl: "https://lnkd.in/gFApuHZ2",
    mapUrl: "https://maps.google.com/?q=Blackhawk+Network,6220+Stoneridge+Mall+Rd,Pleasanton,CA+94588",
    posterUrl: "/posters/CSA-Sfo-September.png"
  }
};
*/

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendeesCount, setAttendeesCount] = useState(0);

  // Check if user is already registered for this event
  const checkRegistrationStatus = useCallback(async () => {
    
    if (!isAuthenticated || !user) {
      setIsRegistered(false);
      return;
    }

    // Always get data from Supabase backend
    try {
      const tokenData = localStorage.getItem('csaTokens');
      const token = tokenData ? JSON.parse(tokenData).accessToken : null;
      
      const userId = user.id || "5be05254-c5e2-4eba-bece-d75393b911f2";
      
      const response = await fetch(`${API_ENDPOINTS.EVENT_REGISTRATIONS}/${userId}`, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      
      if (response.ok) {
        // Check if response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const responseData = await response.json();
          
          const registrations = responseData.registrations || [];
          
          const isUserRegistered = registrations.some((reg: any) => reg.event_id === event?.id);
          
          setIsRegistered(isUserRegistered);
          
          // Update localStorage to match backend status for performance
          const registrationKey = `registered_${user.id}_${event?.id}`;
          if (isUserRegistered) {
            localStorage.setItem(registrationKey, 'true');
          } else {
            localStorage.removeItem(registrationKey);
          }
        } else {
          const text = await response.text();
          setIsRegistered(false);
        }
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      setIsRegistered(false);
    }
  }, [isAuthenticated, user, event?.id]);

  // Update attendees count after registration
  const updateAttendeesCount = useCallback(async () => {
    try {
      // Fetch updated attendee count from backend
      const response = await fetch(`${API_ENDPOINTS.EVENT_ATTENDEES}/${event?.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setAttendeesCount(data.attendees);
      } else {
        // Fallback: increment locally if backend fails
        setAttendeesCount(prev => {
          const newCount = prev + 1;
          return newCount;
        });
      }
    } catch (error) {
      // Fallback: increment locally if backend fails
      setAttendeesCount(prev => {
        const newCount = prev + 1;
        return newCount;
      });
    }
  }, [event?.id]);

  // Fetch event on component mount
  useEffect(() => {
    fetchEventBySlug();
  }, [slug]);

  // Check registration status on component mount
  useEffect(() => {
    if (event?.id) {
      checkRegistrationStatus();
      updateAttendeesCount();
    }
  }, [checkRegistrationStatus, updateAttendeesCount, event?.id]);

  // Fetch event by slug from API
  const fetchEventBySlug = async () => {
    if (!slug) {
      setError("No event slug provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First, try to get all events and find the one with matching slug
      const response = await fetch(API_ENDPOINTS.EVENTS_PUBLIC);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.events && Array.isArray(data.events)) {
        // Find event by slug
        const foundEvent = data.events.find((e: any) => e.slug === slug);
        
        if (foundEvent) {
          // Transform the API data to match our Event interface
          const transformedEvent: Event = {
            id: foundEvent.id,
            title: foundEvent.title,
            date_time: foundEvent.date_time,
            location: foundEvent.location,
            checkins: foundEvent.checkins || "",
            excerpt: foundEvent.excerpt || "",
            slug: foundEvent.slug || foundEvent.id,
            speakers: foundEvent.speakers || [],
            tags: foundEvent.tags || [],
            attendees: foundEvent.attendees || 0,
            capacity: foundEvent.capacity || 100,
            agenda: foundEvent.agenda || [],
            reg_url: foundEvent.reg_url || "",
            description: foundEvent.description || "",
            map_url: foundEvent.map_url || "",
            poster_url: foundEvent.poster_url || ""
          };
          
          setEvent(transformedEvent);
          setAttendeesCount(transformedEvent.attendees);
        } else {
          setError("Event not found");
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching event:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-csa-blue mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Event...</h1>
          <p className="text-gray-600">Fetching event details from our database</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <Card className="overflow-hidden shadow-lg animate-fade-in max-w-2xl mx-auto">
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
                      window.location.href = '/events#past';
                    }}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View Past Events
                  </Button>
                  <Button 
                    asChild 
                    className="bg-csa-blue hover:bg-csa-blue/90 text-white"
                  >
                    <Link to="/events">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Events
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event?.date_time || new Date());
  const spotsLeft = (event?.capacity || 0) - attendeesCount;
  const isFullyBooked = spotsLeft <= 0;

  const handleRegistration = async () => {
    
    if (!isAuthenticated || !user) {
      setShowAuthModal(true);
      return;
    }
    setIsRegistering(true);

    try {
      // Get token safely
      const tokenData = localStorage.getItem('csaTokens');
      const token = tokenData ? JSON.parse(tokenData).accessToken : null;
      
      const requestBody = {
        user_id: user.id || "5be05254-c5e2-4eba-bece-d75393b911f2", // Fallback to valid user ID for testing
        event_id: event.id
      };
      
      // API call to register user for event
      const response = await fetch(API_ENDPOINTS.SIMPLE_REGISTRATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(requestBody)
      });

      // Check if response is JSON before parsing
      let result;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const text = await response.text();
          throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
        }
      } catch (parseError) {
        throw new Error(`Failed to parse response: ${parseError.message}`);
      }

      if (!response.ok) {
        
        // If the error is due to invalid user ID, clear localStorage and redirect to signup
        if (result && result.detail && result.detail.includes('not present in table "users"')) {
          localStorage.removeItem('csaUser');
          localStorage.removeItem('csaTokens');
          localStorage.removeItem('csaPendingSignup');
          setShowAuthModal(true);
          setAuthMode('signup');
          toast.error('User not found in database. Please signup first.');
          return;
        }
        
        toast.error(result.detail || `Registration failed: ${response.status}`);
        return;
      }
      
      // toast.success("Registration successful! Check your email for confirmation.");
      toast.success("Registered successfully");
      setIsRegistered(true);
      
      // Store registration status in localStorage
      const registrationKey = `registered_${user.id}_${event.id}`;
      localStorage.setItem(registrationKey, 'true');
      
      // Update attendees count after successful registration
      await updateAttendeesCount();
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
    setIsRegistering(false);
    }
  };


  const generateCalendarFile = () => {
    const startDate = new Date(event.date_time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CSA SF//Event//EN
BEGIN:VEVENT
UID:${slug}-${Date.now()}@cloudsecurityalliance.org
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.excerpt}
LOCATION:${event.location}
URL:${window.location.href}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-10 md:py-14">
        <div className="container-site">
          <div className="mb-6">
            <Button asChild className="bg-csa-accent hover:bg-csa-accent/90 text-white border-none">
              <Link to="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Left: Text */}
            <div className="max-w-2xl order-2 md:order-1">
              <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
              {event.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {event.title}
            </h1>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-gray-100">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-csa-accent" />
                <div>
                  <div className="font-medium">
                    {eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'America/Los_Angeles'
                    })}
                  </div>
                  <div className="text-sm">
                    {eventDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZoneName: 'short',
                      timeZone: 'America/Los_Angeles'
                    }).replace('PDT', 'PDT').replace('PST', 'PDT')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-csa-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm">{event.location}</div>
                  {event.checkins && (
                    <div className="text-sm mt-1">
                      <span className="font-medium">Parking/Check In: </span>
                      <span>{event.checkins}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-csa-accent" />
                <div>
                  <div className="font-medium">
                    {attendeesCount}/{event.capacity} registered
                  </div>
                  <div className="text-sm">
                    {isFullyBooked ? "Waitlist available" : `${spotsLeft} spots remaining`}
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Right: Poster */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
				{event.poster_url && (
					<img
						src={event.poster_url}
						alt={`${event.title} poster`}
                  className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl shadow-2xl border border-white/20 mt-2 md:mt-0"
					/>
				)}
            </div>
          </div>
        </div>
      </section>

      <div className="container-site py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-csa-navy mb-6">About This Event</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {event.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Agenda */}
            <div>
              <h2 className="text-2xl font-bold text-csa-navy mb-6">Agenda</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {event.agenda.map((item, index) => (
                  <AccordionItem key={item.id} value={`item-${index}`} className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="text-sm font-medium text-csa-blue bg-csa-light px-3 py-1 rounded">
                          {item.duration}
                        </div>
                        <div className="font-semibold">{item.topic}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p className="mb-2">{item.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Speakers */}
            <div>
              <h2 className="text-2xl font-bold text-csa-navy mb-6">Speakers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <Card key={speaker.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={speaker.image_url}
                          alt={`${speaker.name} profile`}
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-csa-navy mb-1">
                            {speaker.name}
                          </h3>
                          <p className="text-csa-blue font-medium mb-1">{speaker.role}</p>
                          <p className="text-sm text-gray-600 mb-3">{speaker.company}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {speaker.about}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card - Only show for non-admin users */}
            {!isAdmin && (
              <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-csa-navy">
                  {isRegistered ? "Registration Confirmed" : (isFullyBooked ? "Join Waitlist" : "Register Now")}
                </CardTitle>
                <CardDescription>
                  {isRegistered 
                    ? "You're successfully registered for this event."
                    : isFullyBooked 
                    ? "This event is fully booked, but you can join the waitlist."
                    : "Secure your spot for this exclusive event."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-csa-light rounded-lg">
                  <span className="font-medium text-csa-navy">Status:</span>
                  <span className={`font-medium ${isRegistered ? 'text-green-600' : (isFullyBooked ? 'text-red-600' : 'text-green-600')}`}>
                    {isRegistered ? "Registered" : (isFullyBooked ? "Waitlist Only" : `${spotsLeft} spots left`)}
                  </span>
                </div>

                {isRegistered ? (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="text-green-600 font-medium mb-2">Registration Confirmed!</p>
                    {/* <p className="text-sm text-gray-600">You'll receive a confirmation email shortly.</p> */}
                  </div>
                ) : !isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-4">Please sign in to register for this event.</p>
                    </div>
                    <Button 
                      onClick={() => setShowAuthModal(true)}
                      className="w-full bg-csa-blue hover:bg-csa-blue/90" 
                      size="lg"
                    >
                      Sign In to Register
                    </Button>
                        </div>
                ) : (
                  <div className="space-y-4">
                    {/* Registration button */}
                      <Button 
                      onClick={handleRegistration}
                        className="w-full bg-csa-blue hover:bg-csa-blue/90" 
                        size="lg"
                        disabled={isRegistering}
                      >
                        {isRegistering 
                          ? "Processing..." 
                        : "Register Now"
                        }
                      </Button>
                    
                  </div>
                )}

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={generateCalendarFile}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.excerpt)}&location=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center p-2 border rounded text-csa-blue hover:bg-csa-light transition-colors"
                    >
                      Google
                    </a>
                    <a
                      href={`https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${eventDate.toISOString()}&enddt=${new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString()}&body=${encodeURIComponent(event.excerpt)}&location=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center p-2 border rounded text-csa-blue hover:bg-csa-light transition-colors"
                    >
                      Outlook
                    </a>
                    
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            {/* Admin Info Card - Only show for admin users */}
            {isAdmin && (
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-csa-navy">Admin View</CardTitle>
                  <CardDescription>
                    You're viewing this event as an administrator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-csa-light rounded-lg">
                    <span className="font-medium text-csa-navy">Event Status:</span>
                    <span className="font-medium text-blue-600">
                      {isFullyBooked ? "Fully Booked" : `${spotsLeft} spots left`}
                    </span>
                  </div>
                  
                  <div className="text-center py-4">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <p className="text-blue-600 font-medium mb-2">Event Management</p>
                    <p className="text-sm text-gray-600">
                      As an admin, you can manage this event from the admin dashboard.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={generateCalendarFile}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.excerpt)}&location=${encodeURIComponent(event.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-2 border rounded text-csa-blue hover:bg-csa-light transition-colors"
                      >
                        Google
                      </a>
                      <a
                        href={`https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${eventDate.toISOString()}&enddt=${new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString()}&body=${encodeURIComponent(event.excerpt)}&location=${encodeURIComponent(event.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-2 border rounded text-csa-blue hover:bg-csa-light transition-colors"
                      >
                        Outlook
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-csa-navy">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">{event.location}</p>
                  {event.checkins && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Parking/Check In:</p>
                      <p className="text-sm text-gray-600">{event.checkins}</p>
                    </div>
                  )}
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={event.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Map
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}
