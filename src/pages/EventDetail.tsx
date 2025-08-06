
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
  "zero-trust-architecture-jan-2025": {
    id: "1",
    title: "Zero Trust Architecture: Implementing Mature Security Models",
    date: "2025-01-28T17:30:00-08:00",
    location: "Adobe, 345 Park Avenue, San Jose, CA 95110",
    excerpt: "Join us for an evening of networking and expert insights on implementing Zero Trust security frameworks in enterprise environments.",
    slug: "zero-trust-architecture-jan-2025",
    description: `Zero Trust has evolved from a buzzword to a fundamental security paradigm. This session will provide practical insights into implementing mature Zero Trust architectures in enterprise environments.

Our expert speakers will cover real-world implementation challenges, lessons learned, and best practices for organizations at various stages of their Zero Trust journey.

This event includes networking opportunities before and after the presentation, allowing you to connect with fellow security professionals and discuss implementation strategies.`,
    agenda: [
      {
        id: "1",
        duration: "5:30 PM - 6:00 PM",
        topic: "Registration & Networking",
        description: "Welcome reception with light refreshments and networking opportunities."
      },
      {
        id: "2",
        duration: "6:00 PM - 6:15 PM",
        topic: "Welcome & Chapter Updates",
        description: "Chapter updates and upcoming events overview by Satish Govindappa."
      },
      {
        id: "3",
        duration: "6:15 PM - 7:00 PM",
        topic: "Zero Trust Implementation: Enterprise Perspective",
        description: "Real-world case study and lessons learned from implementing Zero Trust at scale."
      },
      {
        id: "4",
        duration: "7:00 PM - 7:15 PM",
        topic: "Q&A Session",
        description: "Interactive discussion with speakers and audience."
      },
      {
        id: "5",
        duration: "7:15 PM - 8:00 PM",
        topic: "Networking & Closing",
        description: "Continued networking and informal discussions."
      }
    ],
    speakers: [
      {
        id: "1",
        name: "Satish Govindappa",
        role: "Chapter Chair, CSA SF",
        company: "Oracle",
        about: "Cloud security architect with 15+ years in enterprise security and cloud transformation. Currently leading cloud security initiatives at Oracle.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "2",
        name: "Dr. Sarah Chen",
        role: "Principal Security Architect",
        company: "Salesforce",
        about: "Research scientist specializing in zero trust architectures and identity management. Published author on cloud security frameworks.",
        imageUrl: "/api/placeholder/150/150"
      }
    ],
    tags: ["Zero Trust", "Enterprise Security", "Cloud Architecture"],
    attendees: 45,
    capacity: 60,
    regUrl: "https://example.com/register/abc123",
    mapUrl: "https://maps.google.com/?q=Adobe,345+Park+Avenue,San+Jose,CA"
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
          <Button asChild>
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
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="mb-6">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-csa-navy">
              <Link to="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {event.title}
            </h1>
            
            <div className="grid md:grid-cols-3 gap-6 text-gray-100">
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
