import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Event, AgendaItem, Speaker } from "@/types/event";

// Separate EventForm component to prevent re-renders
interface EventFormProps {
  formData: Partial<Event>;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onTitleChange: (title: string) => void;
  onDateChange: (date: string) => void;
  onSlugChange: (slug: string) => void;
  onLocationChange: (location: string) => void;
  onExcerptChange: (excerpt: string) => void;
  onTagsChange: (tags: string) => void;
  onCapacityChange: (capacity: string) => void;
  onAttendeesChange: (attendees: string) => void;
  onAddAgendaItem: () => void;
  onUpdateAgendaItem: (id: string, field: keyof AgendaItem, value: string) => void;
  onRemoveAgendaItem: (id: string) => void;
  onAddSpeaker: () => void;
  onUpdateSpeaker: (id: string, field: keyof Speaker, value: string) => void;
  onRemoveSpeaker: (id: string) => void;
}

const EventForm = memo(({
  formData,
  isEditing,
  onSave,
  onCancel,
  onTitleChange,
  onDateChange,
  onSlugChange,
  onLocationChange,
  onExcerptChange,
  onTagsChange,
  onCapacityChange,
  onAttendeesChange,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onRemoveAgendaItem,
  onAddSpeaker,
  onUpdateSpeaker,
  onRemoveSpeaker
}: EventFormProps) => (
  <div className="space-y-6">
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          value={formData.title || ""}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter event title"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date & Time *</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.date || ""}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            value={formData.slug || ""}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="auto-generated-from-title"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          value={formData.location || ""}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Venue name, address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Description</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt || ""}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Brief description of the event"
          rows={3}
        />
      </div>

      {/* Agenda Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Agenda Details</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddAgendaItem}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Agenda Item
          </Button>
        </div>
        
        {formData.agenda && formData.agenda.length > 0 ? (
          <div className="space-y-3">
            {formData.agenda.map((item, index) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Agenda Item {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveAgendaItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`duration-${item.id}`}>Duration (e.g., "10:00 AM – 11:00 AM")</Label>
                    <Input
                      id={`duration-${item.id}`}
                      value={item.duration}
                      onChange={(e) => onUpdateAgendaItem(item.id, 'duration', e.target.value)}
                      placeholder="5:30 PM - 6:00 PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`topic-${item.id}`}>Topic</Label>
                    <Input
                      id={`topic-${item.id}`}
                      value={item.topic}
                      onChange={(e) => onUpdateAgendaItem(item.id, 'topic', e.target.value)}
                      placeholder="Session topic or title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${item.id}`}>Description</Label>
                    <Textarea
                      id={`description-${item.id}`}
                      value={item.description}
                      onChange={(e) => onUpdateAgendaItem(item.id, 'description', e.target.value)}
                      placeholder="Detailed description of this agenda item"
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No agenda items added yet. Click "Add Agenda Item" to get started.</p>
          </div>
        )}
      </div>

      {/* Speakers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Speakers Details</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddSpeaker}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Speaker
          </Button>
        </div>
        
        {formData.speakers && formData.speakers.length > 0 ? (
          <div className="space-y-4">
            {formData.speakers.map((speaker, index) => (
              <Card key={speaker.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Speaker {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveSpeaker(speaker.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`speaker-name-${speaker.id}`}>Name</Label>
                    <Input
                      id={`speaker-name-${speaker.id}`}
                      value={speaker.name}
                      onChange={(e) => onUpdateSpeaker(speaker.id, 'name', e.target.value)}
                      placeholder="Speaker full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`speaker-role-${speaker.id}`}>Role</Label>
                    <Input
                      id={`speaker-role-${speaker.id}`}
                      value={speaker.role}
                      onChange={(e) => onUpdateSpeaker(speaker.id, 'role', e.target.value)}
                      placeholder="e.g., Keynote Speaker, Panelist"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`speaker-company-${speaker.id}`}>Company</Label>
                    <Input
                      id={`speaker-company-${speaker.id}`}
                      value={speaker.company}
                      onChange={(e) => onUpdateSpeaker(speaker.id, 'company', e.target.value)}
                      placeholder="Company or organization"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`speaker-image-${speaker.id}`}>Image URL</Label>
                    <Input
                      id={`speaker-image-${speaker.id}`}
                      value={speaker.imageUrl}
                      onChange={(e) => onUpdateSpeaker(speaker.id, 'imageUrl', e.target.value)}
                      placeholder="https://... or /path/to/image.jpg"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`speaker-about-${speaker.id}`}>About the Speaker</Label>
                    <Textarea
                      id={`speaker-about-${speaker.id}`}
                      value={speaker.about}
                      onChange={(e) => onUpdateSpeaker(speaker.id, 'about', e.target.value)}
                      placeholder="Brief bio and background information"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No speakers added yet. Click "Add Speaker" to get started.</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags?.join(', ') || ""}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="Cloud Security, Zero Trust"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity || ""}
            onChange={(e) => onCapacityChange(e.target.value)}
            placeholder="60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="attendees">Current Attendees</Label>
          <Input
            id="attendees"
            type="number"
            value={formData.attendees || ""}
            onChange={(e) => onAttendeesChange(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
    </div>

    <div className="flex gap-4 pt-4">
      <Button onClick={onSave} className="bg-csa-blue hover:bg-csa-blue/90">
        <Save className="h-4 w-4 mr-2" />
        {isEditing ? "Update Event" : "Add Event"}
      </Button>
      <Button variant="outline" onClick={onCancel}>
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
    </div>
  </div>
));

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Zero Trust Architecture: Implementing Mature Security Models",
    date: "2025-01-28T17:30:00-08:00",
    location: "Adobe, 345 Park Avenue, San Jose, CA",
    excerpt: "Join us for an evening of networking and expert insights on implementing Zero Trust security frameworks in enterprise environments.",
    slug: "zero-trust-architecture-jan-2025",
    speakers: [
      {
        id: "1",
        name: "Satish Govindappa",
        role: "Chapter Chair",
        company: "Oracle",
        about: "Cloud security architect with 15+ years in enterprise security and cloud transformation.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "2",
        name: "Dr. Sarah Chen",
        role: "Principal Security Architect",
        company: "Salesforce",
        about: "Research scientist specializing in zero trust architectures and identity management.",
        imageUrl: "/api/placeholder/150/150"
      }
    ],
    tags: ["Zero Trust", "Enterprise Security"],
    attendees: 45,
    capacity: 60,
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
        description: "Chapter updates and upcoming events overview."
      },
      {
        id: "3",
        duration: "6:15 PM - 7:00 PM",
        topic: "Zero Trust Implementation",
        description: "Real-world case study and lessons learned from implementing Zero Trust at scale."
      }
    ]
  },
  {
    id: "2", 
    title: "Cloud Security Mesh: Next-Gen Architecture Patterns",
    date: "2025-02-25T17:30:00-08:00",
    location: "Salesforce Tower, 415 Mission St, San Francisco, CA",
    excerpt: "Explore the latest cloud security mesh patterns and how they're reshaping enterprise security architectures.",
    slug: "cloud-security-mesh-feb-2025",
    speakers: [
      {
        id: "3",
        name: "Maria Rodriguez",
        role: "Security Architect",
        company: "Google Cloud",
        about: "Cloud security specialist focusing on mesh architectures and distributed security models.",
        imageUrl: "/api/placeholder/150/150"
      },
      {
        id: "4",
        name: "Alex Kim",
        role: "Principal Engineer",
        company: "AWS",
        about: "Expert in cloud infrastructure and security patterns with focus on service mesh technologies.",
        imageUrl: "/api/placeholder/150/150"
      }
    ],
    tags: ["Cloud Architecture", "Security Mesh"],
    attendees: 32,
    capacity: 50,
    agenda: [
      {
        id: "4",
        duration: "5:30 PM - 6:00 PM",
        topic: "Registration & Welcome",
        description: "Registration and welcome networking session."
      },
      {
        id: "5",
        duration: "6:00 PM - 7:00 PM",
        topic: "Cloud Security Mesh Patterns",
        description: "Deep dive into next-generation security mesh architectures."
      }
    ]
  }
];

export default function Admin() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    date: "",
    location: "",
    excerpt: "",
    slug: "",
    speakers: [],
    tags: [],
    attendees: 0,
    capacity: 0,
    agenda: []
  });

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
      excerpt: "",
      slug: "",
      speakers: [],
      tags: [],
      attendees: 0,
      capacity: 0,
      agenda: []
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = useCallback((title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  }, []);



  const handleTagsChange = useCallback((tagsString: string) => {
    const tags = tagsString.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({ ...prev, tags }));
  }, []);

  const handleAddEvent = () => {
    if (!formData.title || !formData.date || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title!,
      date: formData.date!,
      location: formData.location!,
      excerpt: formData.excerpt || "",
      slug: formData.slug!,
      speakers: formData.speakers || [],
      tags: formData.tags || [],
      attendees: formData.attendees || 0,
      capacity: formData.capacity || 0,
      agenda: formData.agenda || []
    };

    setEvents(prev => [...prev, newEvent]);
    resetForm();
    setIsAddingEvent(false);
    toast.success("Event added successfully!");
  };

  const handleEditEvent = () => {
    if (!editingEvent || !formData.title || !formData.date || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedEvent: Event = {
      ...editingEvent,
      title: formData.title!,
      date: formData.date!,
      location: formData.location!,
      excerpt: formData.excerpt || "",
      slug: formData.slug!,
      speakers: formData.speakers || [],
      tags: formData.tags || [],
      attendees: formData.attendees || 0,
      capacity: formData.capacity || 0,
      agenda: formData.agenda || []
    };

    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? updatedEvent : event
    ));
    resetForm();
    setEditingEvent(null);
    toast.success("Event updated successfully!");
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast.success("Event deleted successfully!");
  };

  const startEditing = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      excerpt: event.excerpt,
      slug: event.slug,
      speakers: event.speakers,
      tags: event.tags,
      attendees: event.attendees,
      capacity: event.capacity,
      agenda: event.agenda
    });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Agenda management functions
  const addAgendaItem = useCallback(() => {
    const newItem: AgendaItem = {
      id: Date.now().toString(),
      duration: "",
      topic: "",
      description: ""
    };
    setFormData(prev => ({
      ...prev,
      agenda: [...(prev.agenda || []), newItem]
    }));
  }, []);

  const updateAgendaItem = useCallback((id: string, field: keyof AgendaItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      agenda: prev.agenda?.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ) || []
    }));
  }, []);

  const removeAgendaItem = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      agenda: prev.agenda?.filter(item => item.id !== id) || []
    }));
  }, []);

  // Speaker management functions
  const addSpeaker = useCallback(() => {
    const newSpeaker: Speaker = {
      id: Date.now().toString(),
      name: "",
      role: "",
      company: "",
      about: "",
      imageUrl: ""
    };
    setFormData(prev => ({
      ...prev,
      speakers: [...(prev.speakers || []), newSpeaker]
    }));
  }, []);

  const updateSpeaker = useCallback((id: string, field: keyof Speaker, value: string) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers?.map(speaker => 
        speaker.id === id ? { ...speaker, [field]: value } : speaker
      ) || []
    }));
  }, []);

  const removeSpeaker = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers?.filter(speaker => speaker.id !== id) || []
    }));
  }, []);

  // Create stable event handlers for basic form fields
  const handleDateChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, date: value }));
  }, []);

  const handleSlugChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, slug: value }));
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
  }, []);

  const handleExcerptChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, excerpt: value }));
  }, []);

  const handleCapacityChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, capacity: parseInt(value) || 0 }));
  }, []);

  const handleAttendeesChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, attendees: parseInt(value) || 0 }));
  }, []);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-site py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-csa-navy">Event Management</h1>
              <p className="text-gray-600 mt-2">Manage upcoming events and registrations</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Calendar className="h-3 w-3 mr-1" />
                {events.length} Events
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <Tabs defaultValue="manage" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="manage">Manage Events</TabsTrigger>
            <TabsTrigger value="add">Add New Event</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-csa-blue" />
                  Current Events
                </CardTitle>
                <CardDescription>
                  View and manage all events in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {events.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No events found</h3>
                    <p className="text-gray-500">Start by adding your first event!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium text-csa-navy">{event.title}</div>
                                <div className="text-sm text-gray-500">{event.speakers.map(s => s.name).join(", ")}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-csa-blue" />
                                <span className="text-sm">{formatEventDate(event.date)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-csa-blue" />
                                <span className="text-sm">{event.location.split(',')[0]}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-csa-blue" />
                                <span className="text-sm">{event.attendees}/{event.capacity}</span>
                                <Badge 
                                  variant={event.attendees >= event.capacity ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {event.attendees >= event.capacity ? "Full" : `${event.capacity - event.attendees} left`}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {event.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {event.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{event.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => startEditing(event)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Edit Event</DialogTitle>
                                      <DialogDescription>
                                        Make changes to the event details below.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <EventForm
                                      formData={formData}
                                      isEditing={true}
                                      onSave={handleEditEvent}
                                      onCancel={() => {
                                        setEditingEvent(null);
                                        resetForm();
                                      }}
                                      onTitleChange={handleTitleChange}
                                      onDateChange={handleDateChange}
                                      onSlugChange={handleSlugChange}
                                      onLocationChange={handleLocationChange}
                                      onExcerptChange={handleExcerptChange}
                                      onTagsChange={handleTagsChange}
                                      onCapacityChange={handleCapacityChange}
                                      onAttendeesChange={handleAttendeesChange}
                                      onAddAgendaItem={addAgendaItem}
                                      onUpdateAgendaItem={updateAgendaItem}
                                      onRemoveAgendaItem={removeAgendaItem}
                                      onAddSpeaker={addSpeaker}
                                      onUpdateSpeaker={updateSpeaker}
                                      onRemoveSpeaker={removeSpeaker}
                                    />
                                  </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{event.title}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDeleteEvent(event.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-csa-blue" />
                  Add New Event
                </CardTitle>
                <CardDescription>
                  Create a new event for the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventForm
                  formData={formData}
                  isEditing={false}
                  onSave={handleAddEvent}
                  onCancel={() => {
                    resetForm();
                    setIsAddingEvent(false);
                  }}
                  onTitleChange={handleTitleChange}
                  onDateChange={handleDateChange}
                  onSlugChange={handleSlugChange}
                  onLocationChange={handleLocationChange}
                  onExcerptChange={handleExcerptChange}
                  onTagsChange={handleTagsChange}
                  onCapacityChange={handleCapacityChange}
                  onAttendeesChange={handleAttendeesChange}
                  onAddAgendaItem={addAgendaItem}
                  onUpdateAgendaItem={updateAgendaItem}
                  onRemoveAgendaItem={removeAgendaItem}
                  onAddSpeaker={addSpeaker}
                  onUpdateSpeaker={updateSpeaker}
                  onRemoveSpeaker={removeSpeaker}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}