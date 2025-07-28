
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users } from "lucide-react";

const upcomingEvents = [
  {
    id: "1",
    title: "Zero Trust Architecture: Implementing Mature Security Models",
    date: "2025-01-28T17:30:00-08:00",
    location: "Adobe, 345 Park Avenue, San Jose, CA",
    excerpt: "Join us for an evening of networking and expert insights on implementing Zero Trust security frameworks in enterprise environments.",
    slug: "zero-trust-architecture-jan-2025",
    speakers: ["Satish Govindappa", "Dr. Sarah Chen"],
    tags: ["Zero Trust", "Enterprise Security"],
    attendees: 45,
    capacity: 60
  },
  {
    id: "2", 
    title: "Cloud Security Mesh: Next-Gen Architecture Patterns",
    date: "2025-02-25T17:30:00-08:00",
    location: "Salesforce Tower, 415 Mission St, San Francisco, CA",
    excerpt: "Explore the latest cloud security mesh patterns and how they're reshaping enterprise security architectures.",
    slug: "cloud-security-mesh-feb-2025",
    speakers: ["Maria Rodriguez", "Alex Kim"],
    tags: ["Cloud Architecture", "Security Mesh"],
    attendees: 32,
    capacity: 50
  }
];

const pastEvents = [
  {
    id: "3",
    title: "AI/ML Security in the Cloud: Challenges and Solutions",
    date: "2024-12-10T17:30:00-08:00",
    location: "Cisco Campus, 170 W Tasman Dr, San Jose, CA",
    excerpt: "Deep dive into securing AI/ML workloads in cloud environments and emerging threat vectors.",
    slug: "ai-ml-security-dec-2024",
    speakers: ["Dr. James Liu", "Rebecca Zhang"],
    tags: ["AI/ML", "Cloud Security", "Machine Learning"],
    attendees: 55,
    capacity: 55
  }
];

export default function Events() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const allTags = Array.from(new Set([
    ...upcomingEvents.flatMap(e => e.tags),
    ...pastEvents.flatMap(e => e.tags)
  ]));

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
    };
  };

  const EventCard = ({ event, showRegistration = false }: { event: any, showRegistration?: boolean }) => {
    const dateInfo = formatEventDate(event.date);
    const spotsLeft = event.capacity - event.attendees;

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
              <span>{event.attendees}/{event.capacity}</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-csa-blue mt-0.5 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Speakers:</div>
            <div className="text-sm text-gray-600">
              {event.speakers.join(", ")}
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Events & Meetings
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Join our community events featuring industry experts, networking opportunities, 
              and cutting-edge discussions on cloud security trends.
            </p>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
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
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
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
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} showRegistration={true} />
                ))}
              </div>
              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No upcoming events</h3>
                  <p className="text-gray-500">Check back soon for new events!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="grid gap-6">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
