import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

// Gallery data organized by events
const galleryData = [
  {
    id: "1",
    eventTitle: "CSA San Francisco Chapter Meeting - August 2025",
    date: "2025-08-27",
    location: "Santa Clara, CA",
    tags: ["CSA", "Cybersecurity", "Cloud Security", "Networking"],
    photos: [
      {
        id: "1",
        url: "/Events-pictures/20250604_111127.jpg",
        caption: "Networking session with cybersecurity professionals",
        photographer: "CSA SF Chapter"
      },
      {
        id: "2", 
        url: "/Events-pictures/20250605_133448.jpg",
        caption: "Speaker presentation on AI runtime security",
        photographer: "CSA SF Chapter"
      }
    ]
  },
  {
    id: "2",
    eventTitle: "CSA San Francisco Chapter Meeting July - 2025", 
    date: "2024-07-23",
    location: "Adobe World Headquarters, San Jose, CA",
    tags: ["Cybersecurity", "Cloud Security", "Networking"],
    photos: [
      {
        id: "3",
        url: "/Events-pictures/PXL_20250327_020441379.MP.jpg",
        caption: "Panel discussion on cyber threat intelligence",
        photographer: "CSA SF Chapter"
      },
      {
        id: "4",
        url: "/Events-pictures/PXL_20250522_015003557.MP.jpg", 
        caption: "Attendees engaging in technical discussions",
        photographer: "CSA SF Chapter"
      }
    ]
  },
  {
    id: "3",
    eventTitle: "CSA San Francisco Chapter Meeting May - 2025",
    date: "2025-05-21", 
    location: "Blackhawk Network, Pleasanton, CA",
    tags: ["CSA", "Cybersecurity", "Cloud Security", "Networking"],
    photos: [
      {
        id: "5",
        url: "/Events-pictures/PXL_20250522_024915629.MP.jpg",
        caption: "Security architects sharing best practices",
        photographer: "CSA SF Chapter"
      },
      {
        id: "6",
        url: "/Events-pictures/1729377993131.jpeg",
        caption: "Group photo of attendees and speakers",
        photographer: "CSA SF Chapter"
      }
    ]
  }
];

interface Photo {
  id: string;
  url: string;
  caption: string;
  photographer: string;
}

interface GalleryEvent {
  id: string;
  eventTitle: string;
  date: string;
  location: string;
  tags: string[];
  photos: Photo[];
}

export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);

  // Get all unique events for filter
  const events = galleryData.map(event => ({ id: event.id, title: event.eventTitle }));
  
  // Get all unique tags
  const allTags = Array.from(new Set(galleryData.flatMap(event => event.tags)));

  // Filter events based on search and selection
  const filteredEvents = galleryData.filter(event => {
    const matchesSearch = event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEvent = selectedEvent === "all" || event.id === selectedEvent;

    return matchesSearch && matchesEvent;
  });

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openLightbox = (photo: Photo, eventPhotos: Photo[]) => {
    setSelectedPhoto(photo);
    setAllPhotos(eventPhotos);
    setCurrentPhotoIndex(eventPhotos.findIndex(p => p.id === photo.id));
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setAllPhotos([]);
    setCurrentPhotoIndex(0);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (allPhotos.length === 0) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : allPhotos.length - 1;
    } else {
      newIndex = currentPhotoIndex < allPhotos.length - 1 ? currentPhotoIndex + 1 : 0;
    }
    
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(allPhotos[newIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Event Gallery
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Explore moments from our past events. See the community in action, 
              networking sessions, speaker presentations, and memorable gatherings.
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
                placeholder="Search events, locations, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title.length > 30 ? `${event.title.substring(0, 30)}...` : event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container-site">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredEvents.map(event => (
                <div key={event.id} className="space-y-6">
                  {/* Event Header */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-csa-navy mb-2">
                          {event.eventTitle}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatEventDate(event.date)}</span>
                          </div>
                          <span>•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-csa-blue/10 text-csa-blue">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {event.photos.map(photo => (
                      <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div onClick={() => openLightbox(photo, event.photos)}>
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={photo.url}
                                  alt={photo.caption}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <CardContent className="p-4">
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {photo.caption}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  Photo by {photo.photographer}
                                </p>
                              </CardContent>
                            </div>
                          </DialogTrigger>
                        </Dialog>
                      </Card>
                    ))}
                  </div>

                  {event.photos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No photos available for this event yet.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                Showing {filteredEvents.reduce((total, event) => total + event.photos.length, 0)} photos 
                from {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
            <div className="relative w-full h-full flex flex-col">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={closeLightbox}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Navigation buttons */}
              {allPhotos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                    onClick={() => navigatePhoto('prev')}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                    onClick={() => navigatePhoto('next')}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image */}
              <div className="flex-1 flex items-center justify-center bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="bg-white p-6 border-t">
                <p className="text-gray-800 mb-2">{selectedPhoto.caption}</p>
                <p className="text-sm text-gray-500">Photo by {selectedPhoto.photographer}</p>
                {allPhotos.length > 1 && (
                  <p className="text-xs text-gray-400 mt-2">
                    {currentPhotoIndex + 1} of {allPhotos.length}
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

