
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Car, X, Loader2, Trophy } from "lucide-react";
import { Event } from "@/types/event";
import { API_ENDPOINTS } from "@/config/api";
import { RaffleWheel } from "@/components/RaffleWheel";

// All events data - will be dynamically categorized as upcoming or past
// COMMENTED OUT: Now fetching from API instead of using hardcoded data
/*
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
*/

export default function Events() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  const [raffleEventId, setRaffleEventId] = useState<string | null>(null);
  const [raffleAttendees, setRaffleAttendees] = useState<{ name: string; email: string }[]>([]);
  const [raffleEventTitle, setRaffleEventTitle] = useState("");
  const [isLoadingRaffle, setIsLoadingRaffle] = useState(false);
  // Default fallback images (local)
  const defaultLocalImages = [
    {
      src: "/Events-pictures/PXL_20250522_024915629.MP.jpg",
      caption: "Community networking and learning",
      description: "Community networking and learning"
    },
    {
      src: "/Events-pictures/1729377993131.jpeg",
      caption: "Industry experts sharing knowledge",
      description: "Industry experts sharing knowledge"
    },
    {
      src: "/Events-pictures/20250604_111127.jpg",
      caption: "Collaborative discussions and workshops",
      description: "Collaborative discussions and workshops"
    },
    {
      src: "/Events-pictures/20250605_133448.jpg",
      caption: "Professional development sessions",
      description: "Professional development sessions"
    },
    {
      src: "/Events-pictures/PXL_20250327_020441379.MP.jpg",
      caption: "Tech talks and demonstrations",
      description: "Tech talks and demonstrations"
    },
    {
      src: "/Events-pictures/PXL_20250522_015003557.MP.jpg",
      caption: "Networking and collaboration opportunities",
      description: "Networking and collaboration opportunities"
    }
  ];

  const [slideshowImages, setSlideshowImages] = useState<any[]>(defaultLocalImages);
  const [hasLoadedSupabaseImages, setHasLoadedSupabaseImages] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    // Check hash immediately on component initialization
    const hash = window.location.hash;
    if (hash === '#past') return 'past';
    if (hash === '#upcoming') return 'upcoming';
    return 'upcoming';
  });


  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_ENDPOINTS.EVENTS_PUBLIC);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract events array from response
      const eventsArray = data.events || data;
      
      // Check if eventsArray is an array
      if (!Array.isArray(eventsArray)) {
        throw new Error('API response is not in expected format');
      }
      
      // Transform API data to match Event interface
      const transformedEvents: Event[] = eventsArray.map((event: any) => ({
        id: event.id,
        title: event.title,
        date_time: event.date_time,
        location: event.location,
        checkins: event.checkins,
        excerpt: event.excerpt,
        slug: event.slug,
        speakers: event.speakers || [],
        agenda: event.agenda || [],
        tags: event.tags || [],
        capacity: event.capacity || 0,
        attendees: event.attendees || 0,
        image_url: event.image_url,
        map_url: event.map_url,
        poster_url: event.poster_url
      }));
      
      setAllEvents(transformedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      // Fallback to empty array if API fails
      setAllEvents([]);
    } finally {
      setLoading(false);
    }
  };

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

  // Fetch raffle attendees for an event
  const openRaffle = async (eventId: string, eventTitle: string) => {
    setIsLoadingRaffle(true);
    setRaffleEventId(eventId);
    setRaffleEventTitle(eventTitle);
    
    try {
      const response = await fetch(`${API_ENDPOINTS.EVENT_REGISTERED_USERS}/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch attendees');
      }
      
      const data = await response.json();
      
      // The API returns { registered_users: [...], count: N }
      const registeredUsers = data.registered_users || [];
      
      // Transform data to match RaffleWheel expected format
      const attendees = registeredUsers.map((user: any) => ({
        name: user.name || user.full_name || user.email?.split('@')[0] || 'Anonymous',
        email: user.email || ''
      }));
      
      setRaffleAttendees(attendees);
    } catch (error) {
      setRaffleAttendees([]);
    } finally {
      setIsLoadingRaffle(false);
    }
  };

  const closeRaffle = () => {
    setRaffleEventId(null);
    setRaffleAttendees([]);
    setRaffleEventTitle("");
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
    fetchSlideshowImages(); // Fetch from Supabase with fallback to local images
  }, []);

  // Handle hash navigation to switch tabs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#past') {
        setActiveTab('past');
        // Use requestAnimationFrame to ensure DOM is updated before scrolling
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: 500, behavior: 'smooth' });
          });
        });
      } else if (hash === '#upcoming') {
        setActiveTab('upcoming');
        // Use requestAnimationFrame to ensure DOM is updated before scrolling
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: 900, behavior: 'smooth' });
          });
        });
      } else {
        setActiveTab('upcoming');
        // Smooth scroll to top when no specific hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Fetch attendee counts when events change
  useEffect(() => {
    if (allEvents.length > 0) {
      fetchAttendeeCounts();
    }
  }, [allEvents]);

  // Refresh attendee counts when page becomes visible (user returns from event detail)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && allEvents.length > 0) {
        fetchAttendeeCounts();
      }
    };

    const handleFocus = () => {
      if (allEvents.length > 0) {
        fetchAttendeeCounts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [allEvents]);

  
  // Fetch slideshow images from backend
  const fetchSlideshowImages = async () => {
    // Prevent duplicate loading
    if (hasLoadedSupabaseImages) {
      return;
    }
    
    try {
      const response = await fetch(API_ENDPOINTS.LIST_EVENT_IMAGES);
      
      if (response.ok) {
        const data = await response.json();
        const images = data.images || [];
        
        if (images.length > 0) {
          // Transform to slideshow format - ALL images come from Supabase
          const allImages = images.map((img: any) => ({
            src: img.url,
            caption: img.caption || '',
            description: img.caption || ''
          }));
          
          // Set all images from Supabase
          setSlideshowImages(allImages);
          setHasLoadedSupabaseImages(true);
        }
      }
    } catch (error) {
      // Keep default local images (already set in initial state)
    }
  };


  // Auto-slide functionality
  useEffect(() => {
    if (slideshowImages.length === 0 || isSlideshowPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 1500); // Change slide every 1.5 seconds

    return () => clearInterval(interval);
  }, [slideshowImages.length, isSlideshowPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (slideshowImages.length === 0) return;
      
      if (event.key === 'ArrowLeft') {
        setCurrentSlide((prev) => 
          prev === 0 ? slideshowImages.length - 1 : prev - 1
        );
      } else if (event.key === 'ArrowRight') {
        setCurrentSlide((prev) => 
          (prev + 1) % slideshowImages.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideshowImages.length]);

  // Function to categorize events as upcoming or past based on current date
  const categorizeEvents = () => {
    const now = new Date();
    const upcoming: Event[] = [];
    const past: Event[] = [];

    allEvents.forEach(event => {
      const eventDate = new Date(event.date_time);
      if (eventDate >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    // Sort upcoming events by date (earliest first)
    upcoming.sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());
    
    // Sort past events by date (most recent first)
    past.sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());

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
      const eventYear = new Date(event.date_time).getFullYear().toString();
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
    allEvents.map(event => new Date(event.date_time).getFullYear().toString())
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
    const dateInfo = formatEventDate(event.date_time);
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
                  className="text-csa-blue hover:font-bold transition-all cursor-pointer"
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
            {/*<div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-csa-blue" />
              <span>{currentAttendees}/{event.capacity}</span>
            </div>*/}
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-csa-blue mt-0.5 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          {event.checkins && (
            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <Car className="h-4 w-4 text-csa-blue mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Parking/Check In: </span>
                <span>{event.checkins}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Speakers:</div>
            <div className="text-sm text-gray-600">
              {event.speakers.map(speaker => speaker.name).join(", ")}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {event.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-csa-blue/10 text-csa-blue">
                {tag}
              </Badge>
            ))}
            <Button
              onClick={() => openRaffle(event.id, event.title)}
              variant="outline"
              size="sm"
              className="ml-auto border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
            >
              <Trophy className="h-4 w-4 mr-1" />
              Raffle
            </Button>
          </div>

          {showRegistration && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {spotsLeft > 0 ? (
                    <span className="text-green-600 font-medium">
                      Available
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
                  onClick={() => {
                    setActiveTab('upcoming');
                    window.location.hash = '#upcoming';
                    // Use requestAnimationFrame to ensure DOM is updated before scrolling
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        window.scrollTo({ top: 600, behavior: 'smooth' });
                      });
                    });
                  }}
                  size="lg" 
                  className="bg-csa-accent hover:bg-csa-accent/90 text-white text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Explore Events
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
          <div className="relative flex items-center justify-center p-4">
            
            {/* Cover Flow Carousel */}
            {slideshowImages.length > 0 && (
              <div 
                className="relative w-full max-w-7xl h-[550px] overflow-hidden"
                onMouseEnter={() => setIsSlideshowPaused(true)}
                onMouseLeave={() => setIsSlideshowPaused(false)}
              >
                {/* Carousel Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Carousel Images */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {slideshowImages.map((image, index) => {
                      const distance = Math.abs(index - currentSlide);
                      const isActive = index === currentSlide;
                      const isPrev = index === currentSlide - 1 || (currentSlide === 0 && index === slideshowImages.length - 1);
                      const isNext = index === currentSlide + 1 || (currentSlide === slideshowImages.length - 1 && index === 0);
                      
                      let transform = '';
                      let opacity = 0.3;
                      let scale = 0.7;
                      let zIndex = 1;
                      
                      if (isActive) {
                        transform = 'translateX(0)';
                        opacity = 1;
                        scale = 1;
                        zIndex = 10;
                      } else if (isPrev) {
                        transform = 'translateX(-250px)';
                        opacity = 0.6;
                        scale = 0.8;
                        zIndex = 5;
                      } else if (isNext) {
                        transform = 'translateX(250px)';
                        opacity = 0.6;
                        scale = 0.8;
                        zIndex = 5;
                      } else {
                        transform = `translateX(${(index - currentSlide) * 500}px)`;
                        opacity = 0.2;
                        scale = 0.6;
                        zIndex = 1;
                      }
                      
                      return (
                        <div
                          key={index}
                          className="absolute transition-all duration-700 ease-out cursor-pointer"
                          style={{
                            transform,
                            opacity,
                            zIndex
                          }}
                          onClick={() => {
                            if (isActive) {
                              setSelectedImage(image.src);
                            } else {
                              setCurrentSlide(index);
                            }
                          }}
                        >
                          <div className="relative group">
                            {/* Image Shadow */}
                            <div 
                              className="absolute inset-0 bg-black/30 rounded-2xl blur-lg"
                              style={{
                                scale: scale * 1.1
                              }}
                            />
                            
                            {/* Main Image */}
                            <img
                              src={image.src}
                              alt={`CSA Event ${index + 1}`}
                              className="relative w-[32rem] h-[24rem] object-cover rounded-2xl shadow-2xl border-2 border-white/20 transition-all duration-300 group-hover:scale-105"
                              style={{
                                transform: `scale(${scale})`
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            
                            {/* Caption Overlay - visible on hover */}
                            {image.caption && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4">
                                  <p className="text-white/80 text-xs truncate" title={image.caption}>
                                    {image.caption}
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {/* Active Indicator */}
                            {isActive && (
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-csa-accent rounded-full"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {slideshowImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide((prev) => 
                        prev === 0 ? slideshowImages.length - 1 : prev - 1
                      )}
                      className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-4 transition-all duration-300 group"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => 
                        (prev + 1) % slideshowImages.length
                      )}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-4 transition-all duration-300 group"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Slide Counter */}
                <div className="absolute top-6 right-6 z-10 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm text-white font-medium">
                    {currentSlide + 1} / {slideshowImages.length}
                  </span>
                </div>

              </div>
            )}

            {/* Fallback when no images */}
            {slideshowImages.length === 0 && (
              <div className="relative w-full max-w-2xl h-[400px] lg:h-[480px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📸</div>
                  <div className="text-lg font-medium">Loading Event Images...</div>
                  <div className="text-sm">Images will appear here once loaded</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-csa-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div> */}

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
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-csa-blue animate-spin mb-4" />
              <p className="text-csa-blue text-lg">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 text-lg">
              <p>Error: {error}</p>
              <Button onClick={fetchEvents} className="bg-csa-blue hover:bg-csa-blue/90">
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
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
                            setActiveTab('past');
                            window.location.hash = '#past';
                            // Use requestAnimationFrame to ensure DOM is updated before scrolling
                            requestAnimationFrame(() => {
                              requestAnimationFrame(() => {
                                window.scrollTo({ top: 500, behavior: 'smooth' });
                              });
                            });
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
          )}
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
            
            {/* Caption for selected image */}
            {(() => {
              const currentImageData = slideshowImages.find(img => img.src === selectedImage);
              return currentImageData?.caption && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 max-w-2xl">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
                    <p className="text-white text-base font-medium text-center">
                      {currentImageData.caption}
                    </p>
                  </div>
                </div>
              );
            })()}
            
            {/* Image navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                {slideshowImages.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(image.src);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedImage === image.src 
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

      {/* Raffle Wheel Modal */}
      <RaffleWheel
        isOpen={raffleEventId !== null && !isLoadingRaffle}
        onClose={closeRaffle}
        attendees={raffleAttendees}
        eventTitle={raffleEventTitle}
      />
    </div>
  );
}
