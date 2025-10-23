import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Filter, X, ChevronLeft, ChevronRight, Folder, ArrowLeft, Image as ImageIcon } from "lucide-react";

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
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_011431365.jpg",
        caption: "Welcome and registration at CSA San Francisco Chapter meeting",
        photographer: "CSA SF Chapter"
      },
      {
        id: "2", 
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_011435479.jpg",
        caption: "Attendees gathering for networking session",
        photographer: "CSA SF Chapter"
      },
      {
        id: "3",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_011633540.MP.jpg",
        caption: "Opening remarks and chapter updates presentation",
        photographer: "CSA SF Chapter"
      },
      {
        id: "4",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_011649046.jpg",
        caption: "Cybersecurity professionals engaging in discussions",
        photographer: "CSA SF Chapter"
      },
      {
        id: "5",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_011705295.jpg",
        caption: "Technical presentation on cloud security best practices",
        photographer: "CSA SF Chapter"
      },
      {
        id: "6",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_012032166.jpg",
        caption: "Interactive Q&A session with industry experts",
        photographer: "CSA SF Chapter"
      },
      {
        id: "7",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_012058247.jpg",
        caption: "Networking break with refreshments and conversations",
        photographer: "CSA SF Chapter"
      },
      {
        id: "8",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_020544799.MP.jpg",
        caption: "Keynote presentation on emerging security threats",
        photographer: "CSA SF Chapter"
      },
      {
        id: "9",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_020735792.jpg",
        caption: "Panel discussion with security thought leaders",
        photographer: "CSA SF Chapter"
      },
      {
        id: "10",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_031114753.MP.jpg",
        caption: "Group networking and knowledge sharing session",
        photographer: "CSA SF Chapter"
      },
      {
        id: "11",
        url: "/Events-pictures/2025-aug-csa-pauloalto/PXL_20250828_031116526.MP.jpg",
        caption: "Closing remarks and upcoming events announcement",
        photographer: "CSA SF Chapter"
      }
    ]
  },
  {
    id: "2",
    eventTitle: "CSA San Francisco Chapter Meeting July - 2025", 
    date: "2025-07-23",
    location: "Adobe World Headquarters, San Jose, CA",
    tags: ["Cybersecurity", "Cloud Security", "Networking"],
    photos: [
      {
        id: "12",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02175.JPG",
        caption: "Welcome reception at Adobe World Headquarters",
        photographer: "CSA SF Chapter"
      },
      {
        id: "13",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02176.JPG",
        caption: "Registration and networking session begins",
        photographer: "CSA SF Chapter"
      },
      {
        id: "14",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02177.JPG",
        caption: "Attendees gathering in Adobe's modern conference space",
        photographer: "CSA SF Chapter"
      },
      {
        id: "15",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02178.JPG",
        caption: "Opening remarks and chapter updates presentation",
        photographer: "CSA SF Chapter"
      },
      {
        id: "16",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02180.JPG",
        caption: "Cybersecurity professionals engaging in discussions",
        photographer: "CSA SF Chapter"
      },
      {
        id: "17",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02181.JPG",
        caption: "Technical presentation on cloud security frameworks",
        photographer: "CSA SF Chapter"
      },
      {
        id: "18",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02182.JPG",
        caption: "Interactive workshop on security best practices",
        photographer: "CSA SF Chapter"
      },
      {
        id: "19",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02183.JPG",
        caption: "Panel discussion with industry experts",
        photographer: "CSA SF Chapter"
      },
      {
        id: "20",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02184.JPG",
        caption: "Audience engagement during Q&A session",
        photographer: "CSA SF Chapter"
      },
      {
        id: "21",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02185.JPG",
        caption: "Networking break with refreshments and conversations",
        photographer: "CSA SF Chapter"
      },
      {
        id: "22",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02186.JPG",
        caption: "Security architects sharing insights and experiences",
        photographer: "CSA SF Chapter"
      },
      {
        id: "23",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02187.JPG",
        caption: "Keynote presentation on emerging security threats",
        photographer: "CSA SF Chapter"
      },
      {
        id: "24",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02188.JPG",
        caption: "Collaborative discussions on cloud security strategies",
        photographer: "CSA SF Chapter"
      },
      {
        id: "25",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02189.JPG",
        caption: "Professional networking and knowledge exchange",
        photographer: "CSA SF Chapter"
      },
      {
        id: "26",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02190.JPG",
        caption: "Technical deep dive on security architecture",
        photographer: "CSA SF Chapter"
      },
      {
        id: "27",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02191.JPG",
        caption: "Group discussions on industry challenges",
        photographer: "CSA SF Chapter"
      },
      {
        id: "28",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02192.JPG",
        caption: "Presentation on zero trust security models",
        photographer: "CSA SF Chapter"
      },
      {
        id: "29",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02193.JPG",
        caption: "Interactive session on threat intelligence",
        photographer: "CSA SF Chapter"
      },
      {
        id: "30",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02194.JPG",
        caption: "Security professionals sharing best practices",
        photographer: "CSA SF Chapter"
      },
      {
        id: "31",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02195.JPG",
        caption: "Workshop on cloud compliance and governance",
        photographer: "CSA SF Chapter"
      },
      {
        id: "32",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02196.JPG",
        caption: "Panel on future of cybersecurity landscape",
        photographer: "CSA SF Chapter"
      },
      {
        id: "33",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02197.JPG",
        caption: "Networking session with industry thought leaders",
        photographer: "CSA SF Chapter"
      },
      {
        id: "34",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02198.JPG",
        caption: "Technical demonstration of security tools",
        photographer: "CSA SF Chapter"
      },
      {
        id: "35",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02199.JPG",
        caption: "Collaborative problem-solving session",
        photographer: "CSA SF Chapter"
      },
      {
        id: "36",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02203.JPG",
        caption: "Case study presentation on security incidents",
        photographer: "CSA SF Chapter"
      },
      {
        id: "37",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02204.JPG",
        caption: "Discussion on regulatory compliance requirements",
        photographer: "CSA SF Chapter"
      },
      {
        id: "38",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02205.JPG",
        caption: "Workshop on incident response planning",
        photographer: "CSA SF Chapter"
      },
      {
        id: "39",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02206.JPG",
        caption: "Security metrics and measurement strategies",
        photographer: "CSA SF Chapter"
      },
      {
        id: "40",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02207.JPG",
        caption: "Final networking session and wrap-up",
        photographer: "CSA SF Chapter"
      },
      {
        id: "41",
        url: "/Events-pictures/2025-july-csa-adobe/DSC02210.JPG",
        caption: "Group photo with speakers and attendees",
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
  const [viewMode, setViewMode] = useState<'folders' | 'photos'>('folders');
  const [selectedEventData, setSelectedEventData] = useState<GalleryEvent | null>(null);

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

  const openEventFolder = (event: GalleryEvent) => {
    setSelectedEventData(event);
    setViewMode('photos');
  };

  const backToFolders = () => {
    setViewMode('folders');
    setSelectedEventData(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-3xl">
            {viewMode === 'folders' ? (
              <>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Event Gallery
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
                  Explore moments from our past events. Click on an event folder to view all photos from that gathering.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    onClick={backToFolders}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Events
                  </Button>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {selectedEventData?.eventTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedEventData && formatEventDate(selectedEventData.date)}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedEventData?.location}</span>
                  <span>•</span>
                  <span>{selectedEventData?.photos.length} photos</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Filters and Search - Only show in folder view */}
      {viewMode === 'folders' && (
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
      )}

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container-site">
          {viewMode === 'folders' ? (
            // Folder View
            filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                  <Card 
                    key={event.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => openEventFolder(event)}
                  >
                    <div className="relative">
                      {/* Folder Cover Image */}
                      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-csa-blue/10 to-csa-navy/10">
                        {event.photos.length > 0 ? (
                          <img
                            src={event.photos[0].url}
                            alt={event.eventTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-gray-300" />
                          </div>
                        )}
                        
                        {/* Top Right Icons */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          {/* Photo Count Badge */}
                          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                            {event.photos.length} Photo{event.photos.length !== 1 ? 's' : ''}
                          </div>
                          {/* Folder Icon */}
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <Folder className="h-6 w-6 text-csa-blue" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Info */}
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-csa-navy mb-3 group-hover:text-csa-blue transition-colors">
                          {event.eventTitle}
                        </h3>
                        
                        <div className="space-y-2 text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-csa-blue" />
                            <span className="text-sm">{formatEventDate(event.date)}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="h-4 w-4 flex items-center justify-center mt-0.5">
                              <div className="h-2 w-2 bg-csa-blue rounded-full"></div>
                            </div>
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-csa-blue/10 text-csa-blue text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {event.tags.length > 3 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                              +{event.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
                      </div>
            )
          ) : (
            // Photo View
            selectedEventData && (
              <div className="space-y-8">
                {/* Event Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedEventData.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-csa-blue/10 text-csa-blue">
                            {tag}
                          </Badge>
                        ))}
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedEventData.photos.map(photo => (
                      <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <Dialog>
                          <DialogTrigger asChild>
                          <div onClick={() => openLightbox(photo, selectedEventData.photos)}>
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={photo.url}
                                  alt={photo.caption}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <CardContent className="p-4">
                              <p className="text-sm text-gray-600 line-clamp-2">{photo.caption}</p>
                              <p className="text-xs text-gray-400 mt-1">© {photo.photographer}</p>
                              </CardContent>
                            </div>
                          </DialogTrigger>
                        </Dialog>
                      </Card>
                    ))}
                  </div>

                {/* Photo Summary */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                    Showing {selectedEventData.photos.length} photos from this event
              </p>
            </div>
              </div>
            )
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

