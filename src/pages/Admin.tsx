import { useState, useEffect } from "react";
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

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  excerpt: string;
  slug: string;
  speakers: string[];
  tags: string[];
  attendees: number;
  capacity: number;
}

const initialEvents: Event[] = [
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
    capacity: 0
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
      capacity: 0
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSpeakersChange = (speakersString: string) => {
    const speakers = speakersString.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({ ...prev, speakers }));
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({ ...prev, tags }));
  };

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
      capacity: formData.capacity || 0
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
      capacity: formData.capacity || 0
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
      capacity: event.capacity
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

  const EventForm = ({ onSave, onCancel, isEditing = false }: {
    onSave: () => void;
    onCancel: () => void;
    isEditing?: boolean;
  }) => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title *</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
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
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="auto-generated-from-title"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Venue name, address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Description</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description of the event"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speakers">Speakers (comma separated)</Label>
          <Input
            id="speakers"
            value={formData.speakers?.join(', ') || ""}
            onChange={(e) => handleSpeakersChange(e.target.value)}
            placeholder="John Doe, Jane Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={formData.tags?.join(', ') || ""}
            onChange={(e) => handleTagsChange(e.target.value)}
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
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
              placeholder="60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attendees">Current Attendees</Label>
            <Input
              id="attendees"
              type="number"
              value={formData.attendees || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, attendees: parseInt(e.target.value) || 0 }))}
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
  );

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
                                <div className="text-sm text-gray-500">{event.speakers.join(", ")}</div>
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
                                      onSave={handleEditEvent}
                                      onCancel={() => {
                                        setEditingEvent(null);
                                        resetForm();
                                      }}
                                      isEditing={true}
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
                  onSave={handleAddEvent}
                  onCancel={() => {
                    resetForm();
                    setIsAddingEvent(false);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}