
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Download, Play, Search, Filter } from "lucide-react";

const archivedEvents = [
  {
    id: "1",
    title: "AI/ML Security in the Cloud: Challenges and Solutions",
    date: "2024-12-10T17:30:00-08:00",
    location: "Cisco Campus, San Jose, CA",
    speakers: ["Dr. James Liu", "Rebecca Zhang"],
    tags: ["AI/ML", "Cloud Security", "Machine Learning"],
    attendees: 55,
    slidesUrl: "/archive/slides/ai-ml-security-dec-2024.pdf",
    videoUrl: "https://youtube.com/watch?v=example1",
    description: "Deep dive into securing AI/ML workloads in cloud environments and emerging threat vectors."
  },
  {
    id: "2",
    title: "Cloud Native Security: DevSecOps Best Practices",
    date: "2024-11-15T17:30:00-08:00",
    location: "Salesforce Tower, San Francisco, CA",
    speakers: ["Maria Rodriguez", "Alex Kim", "John Smith"],
    tags: ["DevSecOps", "Cloud Native", "Security"],
    attendees: 42,
    slidesUrl: "/archive/slides/devSecops-nov-2024.pdf",
    videoUrl: "https://youtube.com/watch?v=example2",
    description: "Implementing security practices in cloud-native development workflows."
  },
  {
    id: "3",
    title: "Zero Trust Implementation: Enterprise Case Studies",
    date: "2024-10-22T17:30:00-08:00",
    location: "Adobe Campus, San Jose, CA",
    speakers: ["Satish Govindappa", "Emily Watson"],
    tags: ["Zero Trust", "Enterprise", "Implementation"],
    attendees: 38,
    slidesUrl: "/archive/slides/zero-trust-oct-2024.pdf",
    videoUrl: "https://youtube.com/watch?v=example3",
    description: "Real-world case studies of Zero Trust architecture implementations."
  },
  {
    id: "4",
    title: "Cloud Compliance: Navigating SOC 2, FedRAMP, and GDPR",
    date: "2024-09-18T17:30:00-08:00",
    location: "Google Cloud Campus, Sunnyvale, CA",
    speakers: ["Dr. Sarah Chen", "Michael Brown"],
    tags: ["Compliance", "SOC 2", "FedRAMP", "GDPR"],
    attendees: 47,
    slidesUrl: "/archive/slides/compliance-sep-2024.pdf",
    videoUrl: "https://youtube.com/watch?v=example4",
    description: "Understanding and implementing major cloud compliance frameworks."
  },
  {
    id: "5",
    title: "Container Security: Best Practices and Tools",
    date: "2024-08-20T17:30:00-08:00",
    location: "Oracle Campus, Redwood City, CA",
    speakers: ["Lisa Park", "David Wilson"],
    tags: ["Containers", "Kubernetes", "Security Tools"],
    attendees: 51,
    slidesUrl: "/archive/slides/container-security-aug-2024.pdf",
    videoUrl: "https://youtube.com/watch?v=example5",
    description: "Comprehensive guide to securing containerized applications in the cloud."
  }
];

export default function Archive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const allTags = Array.from(new Set(archivedEvents.flatMap(e => e.tags)));
  const years = Array.from(new Set(archivedEvents.map(e => new Date(e.date).getFullYear().toString())));

  const filteredEvents = archivedEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === "all" || new Date(event.date).getFullYear().toString() === selectedYear;
    
    const matchesTag = selectedTag === "all" || event.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesYear && matchesTag;
  });

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadSlides = (slidesUrl: string, eventTitle: string) => {
    // In a real app, this would handle the actual download
    const link = document.createElement('a');
    link.href = slidesUrl;
    link.download = `${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_slides.pdf`;
    link.click();
  };

  const VideoPlayer = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
    // Extract video ID from YouTube URL for embed
    const getYouTubeId = (url: string) => {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    };

    const videoId = getYouTubeId(videoUrl);
    
    if (!videoId) {
      return (
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Video not available</p>
        </div>
      );
    }

    return (
      <div className="aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Event Archive
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Access presentations, videos, and resources from our past events. 
              Catch up on the latest cloud security insights and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-csa-light">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events, speakers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag.toLowerCase()}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-16">
        <div className="container-site">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Video Section */}
                    <div className="p-6">
                      <VideoPlayer videoUrl={event.videoUrl} title={event.title} />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 lg:border-l">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-csa-blue font-medium">
                              {formatEventDate(event.date)}
                            </span>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                          
                          <h2 className="text-2xl font-bold text-csa-navy mb-3">
                            {event.title}
                          </h2>
                          
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-csa-navy mb-2">Speakers:</h4>
                            <p className="text-gray-600">{event.speakers.join(", ")}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-csa-navy mb-2">Location:</h4>
                            <p className="text-gray-600">{event.location}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-csa-navy mb-2">Topics:</h4>
                            <div className="flex flex-wrap gap-2">
                              {event.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-csa-blue/10 text-csa-blue">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-3">
                          <h4 className="font-semibold text-csa-navy">Resources:</h4>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleDownloadSlides(event.slidesUrl, event.title)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Slides
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              asChild
                            >
                              <a
                                href={event.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Watch on YouTube
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination could go here if needed */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-600">
                Showing {filteredEvents.length} of {archivedEvents.length} archived events
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
