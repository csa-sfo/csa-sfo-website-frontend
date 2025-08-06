export interface AgendaItem {
  id: string;
  duration: string;
  topic: string;
  description: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  about: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  excerpt: string;
  slug: string;
  speakers: Speaker[];
  tags: string[];
  attendees: number;
  capacity: number;
  agenda: AgendaItem[];
  description?: string;
  regUrl?: string;
  mapUrl?: string;
}