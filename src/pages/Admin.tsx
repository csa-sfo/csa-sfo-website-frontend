import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
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
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Event, AgendaItem, Speaker } from "@/types/event";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";
// import { handleApiError, handleAuthError } from "@/utils/authUtils";

// Separate EventForm component to prevent re-renders
interface EventFormProps {
  formData: Partial<Event>;
  isEditing: boolean;
  isLoading: boolean;
  onSave: () => void;
  onCancel: () => void;
  onTitleChange: (title: string) => void;
  onDateChange: (date: string) => void;
  onSlugChange: (slug: string) => void;
  onLocationChange: (location: string) => void;
  onParkingCheckInChange: (parkingCheckIn: string) => void;
  onDescriptionChange: (description: string) => void;
  onPosterChange: (posterUrl: string) => void;
  onPosterUpload: (file: File) => Promise<void>;
  isUploadingPoster: boolean;
  onSpeakerImageUpload: (speakerId: string, file: File) => Promise<void>;
  uploadingSpeakerId: string | null;
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
  isLoading,
  onSave,
  onCancel,
  onTitleChange,
  onDateChange,
  onSlugChange,
  onLocationChange,
  onParkingCheckInChange,
  onDescriptionChange,
  onPosterChange,
  onPosterUpload,
  isUploadingPoster,
  onSpeakerImageUpload,
  uploadingSpeakerId,
  onTagsChange,
  onCapacityChange,
  onAttendeesChange,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onRemoveAgendaItem,
  onAddSpeaker,
  onUpdateSpeaker,
  onRemoveSpeaker
}: EventFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speakerImageInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onPosterUpload(file);
      // Reset the input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSpeakerImageSelect = async (speakerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onSpeakerImageUpload(speakerId, file);
      // Reset the input
      if (speakerImageInputRefs.current[speakerId]) {
        speakerImageInputRefs.current[speakerId]!.value = '';
      }
    }
  };

  return (
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
            value={formData.date_time || ""}
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
        <Label htmlFor="parkingCheckIn">Parking/Check In</Label>
        <Input
          id="checkins"
          value={formData.checkins || ""}
          onChange={(e) => onParkingCheckInChange(e.target.value)}
          placeholder="Parking instructions and check-in details"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Event description (will be used for both excerpt and description)"
          rows={4}
        />
      </div>

      {/* Poster upload / URL */}
      <div className="space-y-2">
        <Label htmlFor="posterUrl">Poster Image</Label>
        <div className="flex gap-2">
          <Input
            id="posterUrl"
            value={formData.poster_url || ""}
            onChange={(e) => onPosterChange(e.target.value)}
            className="flex-1"
          />
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="poster-file-input"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPoster}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {isUploadingPoster ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </>
              )}
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500">Upload an image from your computer or enter a URL</p>
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
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`speaker-image-${speaker.id}`}>Speaker Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`speaker-image-${speaker.id}`}
                        value={speaker.image_url}
                        onChange={(e) => onUpdateSpeaker(speaker.id, 'image_url', e.target.value)}
                        className="flex-1"
                      />
                      <div>
                        <input
                          ref={(el) => speakerImageInputRefs.current[speaker.id] = el}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSpeakerImageSelect(speaker.id, e)}
                          className="hidden"
                          id={`speaker-image-file-${speaker.id}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => speakerImageInputRefs.current[speaker.id]?.click()}
                          disabled={uploadingSpeakerId === speaker.id}
                          className="flex items-center gap-2 whitespace-nowrap"
                        >
                          {uploadingSpeakerId === speaker.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              <span>Upload</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
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
          placeholder="Cloud Security, Zero Trust, Enterprise Security"
          defaultValue={formData.tags ? formData.tags.join(', ') : ''}
          onBlur={(e) => {
            // Parse tags when user finishes typing (on blur)
            const tagsString = e.target.value.trim();
            if (tagsString) {
              const tags = tagsString
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);
              onTagsChange(tags.join(', '));
            }
          }}
          onKeyDown={(e) => {
            // Also parse when user presses Enter
            if (e.key === 'Enter') {
              e.preventDefault();
              const tagsString = e.currentTarget.value.trim();
              if (tagsString) {
                const tags = tagsString
                  .split(',')
                  .map(tag => tag.trim())
                  .filter(tag => tag.length > 0);
                onTagsChange(tags.join(', '));
              }
            }
          }}
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
          <Label htmlFor="attendees">Initial Attendees Count</Label>
          <Input
            id="attendees"
            type="number"
            value={formData.attendees ?? ""}
            onChange={(e) => onAttendeesChange(e.target.value)}
            placeholder="Enter initial attendees count"
          />
        </div>
      </div>
    </div>

    <div className="flex gap-4 pt-4">
      <Button 
        onClick={onSave} 
        disabled={isLoading}
        className="bg-csa-blue hover:bg-csa-blue/90 disabled:opacity-50"
      >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isEditing ? "Updating..." : "Saving..."}</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Update Event" : "Add Event"}
              </>
            )}
      </Button>
      <Button variant="outline" onClick={onCancel}>
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
    </div>
  </div>
  );
});

// const initialEvents: Event[] = [
//   {
//     id: "1",
//     title: "Zero Trust Architecture: Implementing Mature Security Models",
//     date_time: "2025-01-28T17:30:00-08:00",
//     location: "Adobe, 345 Park Avenue, San Jose, CA",
//     checkins: "Free parking available in the Adobe campus garage. Check in at the main lobby reception.",
//     excerpt: "Join us for an evening of networking and expert insights on implementing Zero Trust security frameworks in enterprise environments.",
//     slug: "zero-trust-architecture-jan-2025",
//     speakers: [
//       {
//         id: "1",
//         name: "Satish Govindappa",
//         role: "Chapter Chair",
//         company: "Oracle",
//         about: "Cloud security architect with 15+ years in enterprise security and cloud transformation.",
//         image_url: "/api/placeholder/150/150"
//       },
//       {
//         id: "2",
//         name: "Dr. Sarah Chen",
//         role: "Principal Security Architect",
//         company: "Salesforce",
//         about: "Research scientist specializing in zero trust architectures and identity management.",
//         image_url: "/api/placeholder/150/150"
//       }
//     ],
//     tags: ["Zero Trust", "Enterprise Security"],
//     attendees: 45,
//     capacity: 60,
//     agenda: [
//       {
//         id: "1",
//         duration: "5:30 PM - 6:00 PM",
//         topic: "Registration & Networking",
//         description: "Welcome reception with light refreshments and networking opportunities."
//       },
//       {
//         id: "2",
//         duration: "6:00 PM - 6:15 PM",
//         topic: "Welcome & Chapter Updates",
//         description: "Chapter updates and upcoming events overview."
//       },
//       {
//         id: "3",
//         duration: "6:15 PM - 7:00 PM",
//         topic: "Zero Trust Implementation",
//         description: "Real-world case study and lessons learned from implementing Zero Trust at scale."
//       }
//     ]
//   },
//   {
//     id: "2", 
//     title: "Cloud Security Mesh: Next-Gen Architecture Patterns",
//     date_time: "2025-02-25T17:30:00-08:00",
//     location: "Salesforce Tower, 415 Mission St, San Francisco, CA",
//     checkins: "Valet parking available at Salesforce Tower. Check in at the 34th floor Ohana reception desk.",
//     excerpt: "Explore the latest cloud security mesh patterns and how they're reshaping enterprise security architectures.",
//     slug: "cloud-security-mesh-feb-2025",
//     speakers: [
//       {
//         id: "3",
//         name: "Maria Rodriguez",
//         role: "Security Architect",
//         company: "Google Cloud",
//         about: "Cloud security specialist focusing on mesh architectures and distributed security models.",
//         image_url: "/api/placeholder/150/150"
//       },
//       {
//         id: "4",
//         name: "Alex Kim",
//         role: "Principal Engineer",
//         company: "AWS",
//         about: "Expert in cloud infrastructure and security patterns with focus on service mesh technologies.",
//         image_url: "/api/placeholder/150/150"
//       }
//     ],
//     tags: ["Cloud Architecture", "Security Mesh"],
//     attendees: 32,
//     capacity: 50,
//     agenda: [
//       {
//         id: "4",
//         duration: "5:30 PM - 6:00 PM",
//         topic: "Registration & Welcome",
//         description: "Registration and welcome networking session."
//       },
//       {
//         id: "5",
//         duration: "6:00 PM - 7:00 PM",
//         topic: "Cloud Security Mesh Patterns",
//         description: "Deep dive into next-generation security mesh architectures."
//       }
//     ]
//   }
// ];

interface EventRegistration {
  id: string;
  event_id: string;
  events: {
    title: string;
    slug: string;
    date_time: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  company_name?: string;
  role?: string;
  provider?: string;
  linkedin_id?: string;
  headline?: string;
  avatar_url?: string;
  created_at?: string;
  last_login?: string;
  registrations?: EventRegistration[];
  registration_count?: number;
}

export default function Admin() {
  const { user, isAdmin, fetchUserDetails } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [updatingEventId, setUpdatingEventId] = useState<string | null>(null);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [uploadingSpeakerId, setUploadingSpeakerId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedEventForUsers, setSelectedEventForUsers] = useState<string | null>(null);
  const [eventRegisteredUsers, setEventRegisteredUsers] = useState<any[]>([]);
  const [isLoadingEventUsers, setIsLoadingEventUsers] = useState(false);
  const [isEventUsersDialogOpen, setIsEventUsersDialogOpen] = useState(false);
  const [eventRegistrationCounts, setEventRegistrationCounts] = useState<Record<string, number>>({});
  const [eventUsersCurrentPage, setEventUsersCurrentPage] = useState(1);
  const [eventUsersPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("manage");
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    date_time: "",
    location: "",
    checkins: "",
    excerpt: "",
    slug: "",
    speakers: [],
    tags: [],
    attendees: undefined,
    capacity: 0,
    agenda: [],
    poster_url: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      date_time: "",
      location: "",
      checkins: "",
      excerpt: "",
      slug: "",
      speakers: [],
      tags: [],
      attendees: undefined,
      capacity: 0,
      agenda: [],
      poster_url: ""
    });
  };

  // Function to fetch all events from the backend
  const fetchEvents = async () => {
    if (!isAdmin) {
      return;
    }

    setIsLoadingEvents(true);
    try {
      // Get authentication token
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        console.warn('No authentication token found, skipping events fetch');
        // setEvents(initialEvents);
        setEvents([]);
        return;
      }

      const tokens = JSON.parse(storedTokens);
      let accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        // Try to get a fresh admin token if user is admin but no token found
        if (user && user.role === 'admin') {
          try {
            const adminCheckResponse = await fetch(`${API_BASE_URL}/v1/routes/admin/check`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: user.email }),
            });
            
            if (adminCheckResponse.ok) {
              const adminResult = await adminCheckResponse.json();
              if (adminResult.is_admin && adminResult.admin_token) {
                const freshTokens = { accessToken: adminResult.admin_token };
                localStorage.setItem('csaTokens', JSON.stringify(freshTokens));
                accessToken = adminResult.admin_token;
              }
            }
          } catch (error) {
            console.error('Failed to get fresh admin token:', error);
          }
        }
        
        if (!accessToken) {
          console.warn('No access token available, skipping events fetch');
          // setEvents(initialEvents);
          setEvents([]);
          return;
        }
      }

      // Call the events/all endpoint
      const response = await fetch(API_ENDPOINTS.EVENTS_ALL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // if (handleApiError(response, 'Failed to fetch events')) {
        //   return; // Error was handled (token expired)
        // }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch events');
      }

          const result = await response.json();
          
          // Use backend events directly (no mapping needed)
          const backendEvents = result.events;

          setEvents(backendEvents);
          
          // Fetch registration counts for all events
          if (backendEvents && backendEvents.length > 0) {
            const eventIds = backendEvents.map((e: Event) => e.id);
            fetchEventRegistrationCounts(eventIds);
          }
    } catch (error) {
      console.error('Error fetching events:', error);
      // handleAuthError(error);
      // Fallback to initial events if API fails
      // setEvents(initialEvents);
      setEvents([]);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchUsers = async () => {
    if (!isAdmin) {
      return;
    }

    setIsLoadingUsers(true);
    try {
      // Get authentication token
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        console.warn('No authentication token found, skipping users fetch');
        setUsers([]);
        return;
      }

      const tokens = JSON.parse(storedTokens);
      let accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        console.warn('No access token found');
        setUsers([]);
        return;
      }

      // Debug: Check token payload
      try {
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        
        // If token doesn't have admin role, try to refresh it
        if (!payload.role || payload.role !== 'admin') {
          console.warn('Token missing admin role, attempting to refresh...');
          
          if (user && user.email) {
            try {
              const adminCheckResponse = await fetch(`${API_BASE_URL}/v1/routes/admin/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
              });
              
              if (adminCheckResponse.ok) {
                const adminResult = await adminCheckResponse.json();
                if (adminResult.is_admin && adminResult.admin_token) {
                  localStorage.setItem('csaTokens', JSON.stringify({ accessToken: adminResult.admin_token }));
                  accessToken = adminResult.admin_token;
                  console.log('Admin token refreshed successfully');
                }
              }
            } catch (refreshError) {
              console.error('Failed to refresh admin token:', refreshError);
            }
          }
        }
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
      }

      const response = await fetch(API_ENDPOINTS.USERS_ALL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch users:', errorText);
        
        if (response.status === 401) {
          // handleAuthError(() => {
          //   console.log('Session expired, redirecting to login...');
          // });
          console.log('Session expired, redirecting to login...');
        } else {
          // toast.error('Failed to fetch users');
        }
        return;
      }

      const data = await response.json();
      setUsers(data.users || []);
      setCurrentPage(1); // Reset to first page when users are refreshed
    } catch (error) {
      console.error('Error fetching users:', error);
      // toast.error('Error loading users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Fetch registration counts for all events
  const fetchEventRegistrationCounts = async (eventIds: string[]) => {
    const counts: Record<string, number> = {};
    
    await Promise.all(
      eventIds.map(async (eventId) => {
        try {
          const response = await fetch(`${API_ENDPOINTS.EVENT_REGISTERED_USERS}/${eventId}`);
          if (response.ok) {
            const data = await response.json();
            counts[eventId] = data.count || 0;
          }
        } catch (error) {
          console.error(`Error fetching count for event ${eventId}:`, error);
        }
      })
    );
    
    setEventRegistrationCounts(counts);
  };

  // Fetch registered users for a specific event
  const fetchEventRegisteredUsers = async (eventId: string) => {
    setIsLoadingEventUsers(true);
    setEventUsersCurrentPage(1); // Reset to first page
    try {
      const response = await fetch(`${API_ENDPOINTS.EVENT_REGISTERED_USERS}/${eventId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch registered users');
      }
      
      const data = await response.json();
      setEventRegisteredUsers(data.registered_users || []);
      setEventRegistrationCounts(prev => ({
        ...prev,
        [eventId]: data.count || 0
      }));
      setSelectedEventForUsers(eventId);
      setIsEventUsersDialogOpen(true);
    } catch (error) {
      console.error('Error fetching registered users:', error);
      // toast.error('Failed to load registered users');
    } finally {
      setIsLoadingEventUsers(false);
    }
  };

  // Fetch events when component mounts
  useEffect(() => {
    if (isAdmin && user) {
      fetchEvents();
      fetchUsers(); // Also fetch users for the Users tab
    }
  }, [isAdmin, user]);

  // Refresh registration counts when switching to manage tab
  useEffect(() => {
    if (activeTab === "manage" && events.length > 0 && isAdmin) {
      const eventIds = events.map((e: Event) => e.id);
      fetchEventRegistrationCounts(eventIds);
    }
  }, [activeTab]);


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
    // Split by comma and clean up each tag
    const tags = tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0); // Remove empty tags
    
    setFormData(prev => ({ ...prev, tags }));
  }, []);

  const handleAddEvent = async () => {
    if (!formData.title || !formData.date_time || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isAdmin) {
      toast.error("Admin access required to create events");
      return;
    }

    setIsLoading(true);
    try {
      // Get authentication token (handle both admin and regular user tokens)
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const tokens = JSON.parse(storedTokens);
      
      // Admin tokens are stored as accessToken, regular user tokens might be different
      const accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        console.error('Available token keys:', Object.keys(tokens)); // Debug log
        
        // Try to get a fresh admin token if user is admin but no token found
        if (user && user.role === 'admin') {
          try {
            const adminCheckResponse = await fetch(`${API_BASE_URL}/v1/routes/admin/check`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: user.email }),
            });
            
            if (adminCheckResponse.ok) {
              const adminResult = await adminCheckResponse.json();
              if (adminResult.is_admin && adminResult.admin_token) {
                const freshTokens = { accessToken: adminResult.admin_token };
                localStorage.setItem('csaTokens', JSON.stringify(freshTokens));
                // Retry with fresh token
                const freshAccessToken = adminResult.admin_token;
                if (freshAccessToken) {
                  // Continue with the API call using fresh token
                  const response = await fetch(API_ENDPOINTS.EVENT_CREATE, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${freshAccessToken}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  });
                  
                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Failed to create event');
                  }
                  
                  const result = await response.json();
                  
          // Create event object with the returned ID
          const newEvent: Event = {
            id: result.event_id,
            title: formData.title!,
            date_time: formData.date_time!,
            location: formData.location!,
            checkins: formData.checkins,
            excerpt: formData.excerpt || "",
            slug: formData.slug!,
            speakers: formData.speakers || [],
            tags: formData.tags || [],
            attendees: formData.attendees ?? 0,
            capacity: formData.capacity || 0,
            agenda: formData.agenda || [],
            poster_url: formData.poster_url || ""
          };

                  setEvents(prev => [...prev, newEvent]);
                  resetForm();
                  setIsAddingEvent(false);
                  toast.success(`Event created successfully!`);
                  
                  // Refresh events list to get the latest data
                  fetchEvents();
                  return;
                }
              }
            }
          } catch (error) {
            console.error('Failed to get fresh admin token:', error);
          }
        }
        
        toast.error('Authentication token not found. Please log out and log in again.');
        throw new Error('No access token found. Please log in again.');
      }

          // Prepare data for backend (convert date_time string to ISO format and ensure all required fields)
          const backendData = {
            title: formData.title || "",
            date_time: formData.date_time ? new Date(formData.date_time).toISOString() : new Date().toISOString(),
            slug: formData.slug || "",
            location: formData.location || "",
            checkins: formData.checkins || "",
            excerpt: formData.description || "", // Use description for both excerpt and description
            description: formData.description || "",
            agenda: formData.agenda || [],
            speakers: formData.speakers || [],
            tags: formData.tags || [],
            reg_url: formData.reg_url || null,
            map_url: formData.map_url || null,
            poster_url: formData.poster_url || null,
            capacity: formData.capacity || 0,
            attendees: formData.attendees ?? 0
          };

          // Call backend API directly with converted data
          const response = await fetch(API_ENDPOINTS.EVENT_CREATE, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(backendData),
          });

      if (!response.ok) {
        // if (handleApiError(response, 'Failed to create event')) {
        //   return; // Error was handled (token expired)
        // }
        const errorData = await response.json();
        console.error('Backend error response:', errorData);
        throw new Error(JSON.stringify(errorData) || 'Failed to create event');
      }

      const result = await response.json();
      
          // Create event object with the returned ID
          const newEvent: Event = {
            id: result.event_id,
            title: formData.title!,
            date_time: formData.date_time!,
            location: formData.location!,
            checkins: formData.checkins,
            excerpt: formData.excerpt || "",
            slug: formData.slug!,
            speakers: formData.speakers || [],
            tags: formData.tags || [],
            attendees: formData.attendees ?? 0,
            capacity: formData.capacity || 0,
            agenda: formData.agenda || [],
            poster_url: formData.poster_url || ""
          };

      setEvents(prev => [...prev, newEvent]);
      resetForm();
      setIsAddingEvent(false);
      toast.success(`Event created successfully!`);
      
      // Refresh events list to get the latest data
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      // handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEvent = async () => {
    if (!editingEvent || !formData.title || !formData.date_time || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isAdmin) {
      toast.error("Admin access required to update events");
      return;
    }

    setIsLoading(true);
    setUpdatingEventId(editingEvent.id);
    try {
      // Get authentication token
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        throw new Error('No authentication token found');
      }

      const tokens = JSON.parse(storedTokens);
      const accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        throw new Error('No access token found');
      }

          // Prepare data for backend (convert date_time string to ISO format and ensure all required fields)
          const backendData = {
            title: formData.title || "",
            date_time: formData.date_time ? new Date(formData.date_time).toISOString() : new Date().toISOString(),
            slug: formData.slug || "",
            location: formData.location || "",
            checkins: formData.checkins || "",
            excerpt: formData.description || "", // Use description for both excerpt and description
            description: formData.description || "",
            agenda: formData.agenda || [],
            speakers: formData.speakers || [],
            tags: formData.tags || [],
            reg_url: formData.reg_url || null,
            map_url: formData.map_url || null,
            poster_url: formData.poster_url || null,
            capacity: formData.capacity || 0,
            attendees: formData.attendees ?? 0
          };

          // Call backend update endpoint with converted data
          const response = await fetch(`${API_ENDPOINTS.EVENT_UPDATE}/${editingEvent.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(backendData),
          });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update event');
      }

      const result = await response.json();
      
          // Update local state
          const updatedEvent: Event = {
            ...editingEvent,
            title: formData.title!,
            date_time: formData.date_time!,
            location: formData.location!,
            checkins: formData.checkins,
            excerpt: formData.excerpt || "",
            slug: formData.slug!,
            speakers: formData.speakers || [],
            tags: formData.tags || [],
            attendees: formData.attendees ?? 0,
            capacity: formData.capacity || 0,
            agenda: formData.agenda || [],
            poster_url: formData.poster_url || ""
          };

      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? updatedEvent : event
      ));
      resetForm();
      setEditingEvent(null);
      setIsEditDialogOpen(false);
      toast.success("Event updated successfully!");
      
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(`Failed to update event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setUpdatingEventId(null);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!isAdmin) {
      toast.error("Admin access required to delete events");
      return;
    }

    setDeletingEventId(eventId);
    try {
      // Get authentication token
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        throw new Error('No authentication token found');
      }

      const tokens = JSON.parse(storedTokens);
      const accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Call backend delete endpoint
      const response = await fetch(`${API_ENDPOINTS.EVENT_DELETE}/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete event');
      }

      // Update local state
      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success("Event deleted successfully!");
      
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(`Failed to delete event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeletingEventId(null);
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Convert to datetime-local format (YYYY-MM-DDTHH:MM)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const startEditing = (event: Event) => {
    setEditingEvent(event);
    setIsEditDialogOpen(true);
    setFormData({
      title: event.title,
      date_time: formatDateForInput(event.date_time),
      location: event.location,
      checkins: event.checkins,
      description: event.description || event.excerpt,
      slug: event.slug,
      speakers: event.speakers || [],
      tags: event.tags || [],
      attendees: event.attendees,
      capacity: event.capacity,
      agenda: event.agenda || [],
      poster_url: event.poster_url
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
      image_url: ""
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
    setFormData(prev => ({ ...prev, date_time: value }));
  }, []);

  const handleSlugChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, slug: value }));
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
  }, []);

  const handleParkingCheckInChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, checkins: value }));
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  }, []);

  const handlePosterChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, poster_url: value }));
  }, []);

  const handlePosterUpload = useCallback(async (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setIsUploadingPoster(true);
    try {
      // Get authentication token
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        throw new Error('No authentication token found');
      }

      const tokens = JSON.parse(storedTokens);
      const accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Create FormData and append the file
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      // Upload to backend with image_type as query parameter
      const response = await fetch(`${API_ENDPOINTS.UPLOAD_IMAGE}?image_type=poster`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formDataUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload image');
      }

      const result = await response.json();
      
      // Update the poster URL in the form
      setFormData(prev => ({ ...prev, poster_url: result.url }));
      toast.success('Poster image uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploadingPoster(false);
    }
  }, []);

  const handleSpeakerImageUpload = useCallback(async (speakerId: string, file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploadingSpeakerId(speakerId);
    try {
      // Get authentication token
      const storedTokens = localStorage.getItem('csaTokens');
      if (!storedTokens) {
        throw new Error('No authentication token found');
      }

      const tokens = JSON.parse(storedTokens);
      const accessToken = tokens.accessToken || tokens.adminToken || tokens.token;

      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Create FormData and append the file
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      // Upload to backend with image_type as query parameter
      const response = await fetch(`${API_ENDPOINTS.UPLOAD_IMAGE}?image_type=speaker`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formDataUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload image');
      }

      const result = await response.json();
      
      // Update the speaker's image URL in the form
      setFormData(prev => ({
        ...prev,
        speakers: prev.speakers?.map(speaker =>
          speaker.id === speakerId
            ? { ...speaker, image_url: result.url }
            : speaker
        ) || []
      }));
      toast.success('Speaker image uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading speaker image:', error);
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploadingSpeakerId(null);
    }
  }, []);

  const handleCapacityChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, capacity: parseInt(value) || 0 }));
  }, []);

  const handleAttendeesChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, attendees: parseInt(value) || undefined }));
  }, []);



  // Check if user is admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  // Show loading state while fetching events
  if (isLoadingEvents) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-csa-blue mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Events</h2>
          <p className="text-gray-600">Please wait while we fetch your events...</p>
        </div>
      </div>
    );
  }

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="manage">Manage Events</TabsTrigger>
            <TabsTrigger value="add">Add New Event</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-csa-blue" />
                      Current Events
                    </CardTitle>
                    <CardDescription>
                      View and manage all events in the system
                    </CardDescription>
                  </div>
                  <Button
                    onClick={fetchEvents}
                    disabled={isLoadingEvents}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {isLoadingEvents ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                    {isLoadingEvents ? "Loading..." : "Refresh"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingEvents ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : events.length === 0 ? (
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
                          <TableHead>Registered Users</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium text-csa-navy">{event.title}</div>
                                <div className="text-sm text-gray-500">{(event.speakers || []).map(s => s.name).join(", ")}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-csa-blue" />
                                <span className="text-sm">{formatEventDate(event.date_time)}</span>
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
                                {(event.tags || []).slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {(event.tags || []).length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{(event.tags || []).length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchEventRegisteredUsers(event.id)}
                                className="flex items-center gap-2"
                              >
                                <Users className="h-4 w-4" />
                                <span>{eventRegistrationCounts[event.id] ?? '...'}</span>
                              </Button>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Dialog open={isEditDialogOpen && editingEvent?.id === event.id} onOpenChange={(open) => {
                                  if (!open) {
                                    setIsEditDialogOpen(false);
                                    setEditingEvent(null);
                                    resetForm();
                                  }
                                }}>
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
                                      isLoading={isLoading}
                                      onCancel={() => {
                                        setEditingEvent(null);
                                        resetForm();
                                        setIsEditDialogOpen(false);
                                      }}
                                      onTitleChange={handleTitleChange}
                                      onDateChange={handleDateChange}
                                      onSlugChange={handleSlugChange}
                                      onLocationChange={handleLocationChange}
                                      onParkingCheckInChange={handleParkingCheckInChange}
                                      onDescriptionChange={handleDescriptionChange}
                                      onPosterChange={handlePosterChange}
                                      onPosterUpload={handlePosterUpload}
                                      isUploadingPoster={isUploadingPoster}
                                      onSpeakerImageUpload={handleSpeakerImageUpload}
                                      uploadingSpeakerId={uploadingSpeakerId}
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
                                        disabled={deletingEventId === event.id}
                                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                                      >
                                        {deletingEventId === event.id ? (
                                          <div className="flex items-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Deleting...</span>
                                          </div>
                                        ) : (
                                          "Delete"
                                        )}
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

            {/* Dialog for viewing registered users */}
            <Dialog 
              open={isEventUsersDialogOpen} 
              onOpenChange={(open) => {
                setIsEventUsersDialogOpen(open);
                // Refresh registration counts when dialog is closed
                if (!open && events.length > 0) {
                  const eventIds = events.map((e: Event) => e.id);
                  fetchEventRegistrationCounts(eventIds);
                }
              }}
            >
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-csa-blue" />
                    Registered Users
                  </DialogTitle>
                </DialogHeader>
                
                {isLoadingEventUsers ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-csa-blue"></div>
                  </div>
                ) : eventRegisteredUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No users registered for this event yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 mb-4">
                      Total registered: <span className="font-semibold">{eventRegisteredUsers.length}</span>
                    </div>
                    <div className="grid gap-3">
                      {eventRegisteredUsers
                        .slice(
                          (eventUsersCurrentPage - 1) * eventUsersPerPage,
                          eventUsersCurrentPage * eventUsersPerPage
                        )
                        .map((user, index) => {
                          const actualIndex = (eventUsersCurrentPage - 1) * eventUsersPerPage + index + 1;
                          return (
                            <div 
                              key={user.id} 
                              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold shadow-md">
                                  {actualIndex}
                                </div>
                              </div>
                              
                              {user.avatar_url ? (
                                <img 
                                  src={user.avatar_url} 
                                  alt={user.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                                <div className="text-sm text-gray-500 truncate">{user.email}</div>
                                {user.company_name && (
                                  <div className="text-sm text-gray-600 truncate">
                                    {user.company_name}
                                    {user.role && ` • ${user.role}`}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-shrink-0">
                                {user.user_type === 'admin' ? (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    Admin
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                                    User
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    
                    {/* Pagination Controls */}
                    {eventRegisteredUsers.length > eventUsersPerPage && (
                      <div className="mt-6 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            Showing <span className="font-medium">{(eventUsersCurrentPage - 1) * eventUsersPerPage + 1}</span> to{' '}
                            <span className="font-medium">
                              {Math.min(eventUsersCurrentPage * eventUsersPerPage, eventRegisteredUsers.length)}
                            </span>{' '}
                            of <span className="font-medium">{eventRegisteredUsers.length}</span> users
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEventUsersCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={eventUsersCurrentPage === 1}
                            className="h-8"
                          >
                            Previous
                          </Button>
                          
                          {Array.from({ length: Math.ceil(eventRegisteredUsers.length / eventUsersPerPage) }, (_, i) => i + 1)
                            .filter(page => {
                              const totalPages = Math.ceil(eventRegisteredUsers.length / eventUsersPerPage);
                              if (totalPages <= 5) return true;
                              if (page === 1 || page === totalPages) return true;
                              if (Math.abs(page - eventUsersCurrentPage) <= 1) return true;
                              return false;
                            })
                            .map((page, index, array) => {
                              if (index > 0 && array[index - 1] !== page - 1) {
                                return [
                                  <span key={`ellipsis-${page}`} className="px-2 text-gray-400">...</span>,
                                  <Button
                                    key={page}
                                    variant={eventUsersCurrentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEventUsersCurrentPage(page)}
                                    className={`h-8 w-8 p-0 ${
                                      eventUsersCurrentPage === page 
                                        ? 'bg-csa-blue hover:bg-blue-700' 
                                        : ''
                                    }`}
                                  >
                                    {page}
                                  </Button>
                                ];
                              }
                              return (
                                <Button
                                  key={page}
                                  variant={eventUsersCurrentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setEventUsersCurrentPage(page)}
                                  className={`h-8 w-8 p-0 ${
                                    eventUsersCurrentPage === page 
                                      ? 'bg-csa-blue hover:bg-blue-700' 
                                      : ''
                                  }`}
                                >
                                  {page}
                                </Button>
                              );
                            })}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEventUsersCurrentPage(prev => 
                              Math.min(prev + 1, Math.ceil(eventRegisteredUsers.length / eventUsersPerPage))
                            )}
                            disabled={eventUsersCurrentPage >= Math.ceil(eventRegisteredUsers.length / eventUsersPerPage)}
                            className="h-8"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
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
                  isLoading={isLoading}
                  onCancel={() => {
                    resetForm();
                    setIsAddingEvent(false);
                  }}
                  onTitleChange={handleTitleChange}
                  onDateChange={handleDateChange}
                  onSlugChange={handleSlugChange}
                  onLocationChange={handleLocationChange}
                  onParkingCheckInChange={handleParkingCheckInChange}
                  onDescriptionChange={handleDescriptionChange}
                  onPosterChange={handlePosterChange}
                  onPosterUpload={handlePosterUpload}
                  isUploadingPoster={isUploadingPoster}
                  onSpeakerImageUpload={handleSpeakerImageUpload}
                  uploadingSpeakerId={uploadingSpeakerId}
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

          <TabsContent value="users" className="space-y-6">
            <Card className="border-t-4 border-t-csa-blue">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl font-medium">
                      <div className="p-2 bg-csa-blue rounded-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      All Users
                      <Badge variant="secondary" className="ml-2 bg-csa-blue/10 text-csa-blue border-csa-blue/20">
                        {users.length} Total
                      </Badge>
                    </CardTitle>
                  </div>
                  <Button
                    onClick={fetchUsers}
                    disabled={isLoadingUsers}
                    className="bg-csa-blue hover:bg-csa-blue/90 text-white shadow-md"
                    size="sm"
                  >
                    {isLoadingUsers ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Users className="h-4 w-4 mr-2" />
                    )}
                    {isLoadingUsers ? "Loading..." : "Refresh Users"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-csa-blue"></div>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm mt-2">Click refresh to load users</p>
                  </div>
                ) : (
                  <>
                  <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200">
                          <TableHead className="font-semibold text-gray-700">Name</TableHead>
                          <TableHead className="font-semibold text-gray-700">Email</TableHead>
                          <TableHead className="font-semibold text-gray-700">Company</TableHead>
                          <TableHead className="font-semibold text-gray-700">Role</TableHead>
                          <TableHead className="font-semibold text-gray-700">Provider</TableHead>
                          <TableHead className="font-semibold text-gray-700">Registered Events</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(() => {
                          // Calculate pagination
                          const indexOfLastUser = currentPage * usersPerPage;
                          const indexOfFirstUser = indexOfLastUser - usersPerPage;
                          const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
                          
                          return currentUsers.map((usr, index) => (
                          <TableRow key={usr.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                {usr.avatar_url ? (
                                  <img src={usr.avatar_url} alt={usr.name} className="h-10 w-10 rounded-full border-2 border-csa-blue/20 shadow-sm" />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-csa-blue to-purple-600 flex items-center justify-center shadow-md">
                                    <span className="text-sm font-semibold text-white">
                                      {usr.name?.charAt(0) || usr.email.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold text-gray-900">{usr.name || 'N/A'}</div>
                                  <div className="text-xs text-gray-500">User #{index + 1 + (currentPage - 1) * usersPerPage}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-700">{usr.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`${usr.company_name ? 'text-gray-800 font-medium' : 'text-gray-400 italic'}`}>
                                {usr.company_name || 'No company'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`${usr.role || usr.headline ? 'text-gray-800' : 'text-gray-400 italic'}`}>
                                {usr.role || usr.headline || 'No role'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`capitalize font-medium ${
                                  usr.provider === 'linkedin_oidc' 
                                    ? 'bg-blue-100 text-blue-700 border-blue-300' 
                                    : 'bg-gray-100 text-gray-700 border-gray-300'
                                }`}
                              >
                                {usr.provider?.replace('_oidc', '') || 'email'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {usr.registration_count ? (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="gap-2 bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400 font-medium"
                                    >
                                      <Calendar className="h-4 w-4" />
                                      <span className="flex items-center gap-1">
                                        <span className="font-bold">{usr.registration_count}</span>
                                        {usr.registration_count === 1 ? 'event' : 'events'}
                                      </span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl border-t-4 border-t-csa-blue">
                                    <DialogHeader>
                                      <DialogTitle className="text-xl flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-csa-blue" />
                                        Registered Events - {usr.name}
                                      </DialogTitle>
                                      <DialogDescription className="text-base">
                                        Events that {usr.name} has registered for
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                      {usr.registrations?.map((reg, idx) => (
                                        <div key={reg.id} className="flex items-center justify-between p-4 border-l-4 border-l-csa-blue bg-gradient-to-r from-blue-50 to-white rounded-lg hover:shadow-md transition-shadow">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <span className="bg-csa-blue text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                                {idx + 1}
                                              </span>
                                              <p className="font-semibold text-base text-gray-900">{reg.events.title}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1 ml-8">
                                              📅 {new Date(reg.events.date_time).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                              })}
                                            </p>
                                          </div>
                                          <Badge className="ml-2 bg-green-100 text-green-700 border-green-300">
                                            ✓ Registered
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              ) : (
                                <Badge variant="outline" className="text-gray-400 border-gray-300">
                                  No registrations
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                          ));
                        })()}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Pagination Controls */}
                  <div className="mt-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white border-csa-blue/30 text-gray-700 font-medium px-3 py-1">
                        Showing {Math.min((currentPage - 1) * usersPerPage + 1, users.length)} - {Math.min(currentPage * usersPerPage, users.length)} of {users.length} users
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-white hover:bg-csa-blue hover:text-white transition-colors disabled:opacity-50"
                      >
                        ← Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {(() => {
                          const totalPages = Math.ceil(users.length / usersPerPage);
                          const pages = [];
                          
                          // Show page numbers
                          for (let i = 1; i <= totalPages; i++) {
                            // Show first page, last page, current page, and pages around current
                            if (
                              i === 1 ||
                              i === totalPages ||
                              (i >= currentPage - 1 && i <= currentPage + 1)
                            ) {
                              pages.push(
                                <Button
                                  key={i}
                                  variant={currentPage === i ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setCurrentPage(i)}
                                  className={currentPage === i 
                                    ? "bg-gradient-to-r from-csa-blue to-purple-600 hover:from-csa-blue/90 hover:to-purple-600/90 text-white shadow-md font-bold min-w-[2.5rem]" 
                                    : "bg-white hover:bg-blue-50 hover:border-csa-blue min-w-[2.5rem]"
                                  }
                                >
                                  {i}
                                </Button>
                              );
                            } else if (
                              i === currentPage - 2 ||
                              i === currentPage + 2
                            ) {
                              pages.push(<span key={i} className="px-2 text-gray-400 font-bold">•••</span>);
                            }
                          }
                          
                          return pages;
                        })()}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(users.length / usersPerPage)))}
                        disabled={currentPage === Math.ceil(users.length / usersPerPage)}
                        className="bg-white hover:bg-csa-blue hover:text-white transition-colors disabled:opacity-50"
                      >
                        Next →
                      </Button>
                    </div>
                  </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}