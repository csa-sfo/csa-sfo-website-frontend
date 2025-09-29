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
  image_url: string;
}

export interface Event {
  id: string;
  title: string;
  date_time: string;
  location: string;
  checkins?: string;
  excerpt: string;
  slug: string;
  speakers: Speaker[];
  tags: string[];
  attendees: number;
  capacity: number;
  agenda: AgendaItem[];
  description?: string;
  reg_url?: string;
  map_url?: string;
  poster_url?: string;
}