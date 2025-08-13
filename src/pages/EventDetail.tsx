
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, ExternalLink, ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";
import { Event } from "@/types/event";

// Mock event data - in real app this would come from CMS/API or shared state
const eventData: Record<string, Event> = {
  "csa-san-francisco-chapter-meeting-august-2025": {
    id: "1",
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
        imageUrl: "/public/Speaker-images/Spencer.png"
      },
      {
        id: "10",
        name: "Debrup Ghosh",
        role: "Principal Product Manager",
        company: "F5",
        about: "Debrup Ghosh is a product management leader—currently serving as Principal Product Manager at F5 Networks—renowned for driving innovative AI/ML-enabled Web Application and API Protection (WAAP) solutions, having previously led Synopsys’s Polaris application security platform to award-winning status and holding a computer-vision patent simplifying U.S. truck driver inspections.",
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
    regUrl: "https://www.eventbrite.com/e/csa-san-francisco-chapter-meeting-august-2025-tickets-11111111111",
    mapUrl: "https://maps.google.com/?q=Adobe,345+Park+Avenue,San+Jose,CA",
    posterUrl: "/public/posters/CSA-Sfo-August.png"
  },
  "csa-san-francisco-chapter-meeting-july-2025": {
    id: "2",
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
        imageUrl: "/public/Speaker-images/omkar-nimbalkar.png"
      },
      {
        id: "3",
        name: "Louis Roberts",
        role: "Global Sales Director",
        company: "RAD Security",
        about: "Specialist in Head day to day operations and ongoing strategy of the RAD Sales and Customer Success team.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "4",
        name: "Mike Zelle",
        role: "Pre-Sales Technical Solutions Director",
        company: "Tanium",
        about: "Specialist in Technology Strategy & Innovation Focused Solution Producer.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "5",
        name: "Chris Oshaben",
        role: "Technology & Cybersecurity Audit",
        company: "Delta Dental",
        about: "Specialist in technology and security reviews at Delta Dental of California, assessing effectiveness, identifying risks, and reporting findings to the Board of Directors and Senior Leadership",
        imageUrl: "/public/Speaker-images/chris-oshaben.png"
      }
    ],
    tags: ["Cybersecurity", "Cloud Security", "Networking"],
    attendees: 55,
    capacity: 55,
    mapUrl: "https://maps.google.com/?q=Adobe,345+Park+Avenue,San+Jose,CA",
    posterUrl: "/public/posters/CSA-SFO-July.png"
  },
  "csa-san-francisco-chapter-meeting-may-2025": {
    id: "3",
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
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "7",
        name: "Pavi Ramamurthy ",
        role: "Global CISO & CIO", 
        company: "Blackhawk Network",
        about: "Responsible for Information Security, Fraud & Risk, Corporate IT and Business Systems.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "8",
        name: "Varun Badhwar ",
        role: "Founder & CEO", 
        company: "Endor Labs",
        about: "Founder & CEO of Endor Labs which is a Application Security platform for the AI-driven software development revolution.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
       id: "9",
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
    mapUrl: "https://maps.google.com/?q=Salesforce+Tower,415+Mission+St,San+Francisco,CA",
    posterUrl: "/public/posters/CSA-SFO-May.png"
  }
};

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    title: "",
    dietaryRestrictions: "",
    comments: ""
  });

  const event = slug ? eventData[slug as keyof typeof eventData] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Button asChild className="bg-csa-accent hover:bg-csa-accent/90 text-white">
            <Link to="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const spotsLeft = event.capacity - event.attendees;
  const isFullyBooked = spotsLeft <= 0;

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success(
      isFullyBooked 
        ? "You've been added to the waitlist!" 
        : "Registration successful! Check your email for confirmation."
    );
    
    setIsRegistering(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      title: "",
      dietaryRestrictions: "",
      comments: ""
    });
  };

  const generateCalendarFile = () => {
    const startDate = new Date(event.date);
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
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm">
                    {eventDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-csa-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm">{event.location}</div>
                  {event.parkingCheckIn && (
                    <div className="text-sm mt-1">
                      <span className="font-medium">Parking/Check In: </span>
                      <span>{event.parkingCheckIn}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-csa-accent" />
                <div>
                  <div className="font-medium">
                    {event.attendees}/{event.capacity} registered
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
				{event.posterUrl && (
					<img
						src={event.posterUrl}
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
                          src={speaker.imageUrl}
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
            {/* Registration Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-csa-navy">
                  {isFullyBooked ? "Join Waitlist" : "Register Now"}
                </CardTitle>
                <CardDescription>
                  {isFullyBooked 
                    ? "This event is fully booked, but you can join the waitlist."
                    : "Secure your spot for this exclusive event."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-csa-light rounded-lg">
                  <span className="font-medium text-csa-navy">Status:</span>
                  <span className={`font-medium ${isFullyBooked ? 'text-red-600' : 'text-green-600'}`}>
                    {isFullyBooked ? "Waitlist Only" : `${spotsLeft} spots left`}
                  </span>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-csa-blue hover:bg-csa-blue/90" size="lg">
                      {isFullyBooked ? "Join Waitlist" : "Register Now"}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>
                        {isFullyBooked ? "Join Waitlist" : "Event Registration"}
                      </SheetTitle>
                      <SheetDescription>
                        {isFullyBooked 
                          ? "We'll notify you if a spot becomes available."
                          : "Please fill out the form below to register for this event."
                        }
                      </SheetDescription>
                    </SheetHeader>
                    
                    <form onSubmit={handleRegistration} className="space-y-6 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dietary">Dietary Restrictions</Label>
                        <Textarea
                          id="dietary"
                          value={formData.dietaryRestrictions}
                          onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
                          placeholder="Please let us know of any dietary restrictions..."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="comments">Additional Comments</Label>
                        <Textarea
                          id="comments"
                          value={formData.comments}
                          onChange={(e) => setFormData({...formData, comments: e.target.value})}
                          placeholder="Any questions or special requirements..."
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-csa-blue hover:bg-csa-blue/90" 
                        size="lg"
                        disabled={isRegistering}
                      >
                        {isRegistering 
                          ? "Processing..." 
                          : isFullyBooked 
                            ? "Join Waitlist" 
                            : "Complete Registration"
                        }
                      </Button>
                    </form>
                  </SheetContent>
                </Sheet>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={generateCalendarFile}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
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
                    <button
                      onClick={generateCalendarFile}
                      className="text-center p-2 border rounded text-csa-blue hover:bg-csa-light transition-colors"
                    >
                      Apple
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-csa-navy">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">{event.location}</p>
                  {event.parkingCheckIn && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Parking/Check In:</p>
                      <p className="text-sm text-gray-600">{event.parkingCheckIn}</p>
                    </div>
                  )}
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={event.mapUrl}
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
    </div>
  );
}
