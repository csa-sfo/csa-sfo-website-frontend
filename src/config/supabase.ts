import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_CSA_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_CSA_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for the users table
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  company_name?: string;
  role?: string;  // Job role/title (e.g., "Software Engineer")
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  message: string;  // Basic signup just returns a string message
}

export interface SignupDetailsRequest {
  company_name: string;
  role: string;
}

export interface SignupDetailsResponse {
  user: UserProfile;
  message: string;
}
