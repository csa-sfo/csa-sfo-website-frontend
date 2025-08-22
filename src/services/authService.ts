import { API_ENDPOINTS } from '../config/api';
import { supabase } from '../config/supabase';
import type { SignupRequest, SignupResponse, SignupDetailsRequest, SignupDetailsResponse, UserProfile } from '../config/supabase';

export class AuthService {
  /**
   * Test Supabase connection and permissions
   */
  static async testSupabaseConnection() {
    try {
      console.log('Testing Supabase connection...');
      
      // Test 1: Check if we can connect to Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('Session check:', { session, error: sessionError });
      
      // Test 2: Check if we can read from users table (this will tell us about RLS)
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      console.log('Users table access:', { users, error: usersError });
      
      // Test 3: Check auth configuration
      const { data: config, error: configError } = await supabase.auth.getUser();
      console.log('Auth config:', { config, error: configError });
      
      return {
        connectionOk: !sessionError,
        tableAccess: !usersError,
        authOk: !configError
      };
    } catch (error) {
      console.error('Supabase connection test failed:', error);
      return {
        connectionOk: false,
        tableAccess: false,
        authOk: false,
        error
      };
    }
  }
  /**
   * Register a new user using the backend API endpoint
   * This calls the POST /v1/routes/signup/basic endpoint which:
   * - Registers user using Supabase Auth
   * - Stores extended profile in 'users' table
   */
  static async signupBasic(signupData: SignupRequest): Promise<SignupResponse> {
    try {
      console.log('🚀 Sending signup request to:', API_ENDPOINTS.SIGNUP_BASIC);
      console.log('📝 Request data:', { email: signupData.email, name: signupData.name, password: '[HIDDEN]' });
      
      const response = await fetch(API_ENDPOINTS.SIGNUP_BASIC, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      console.log('📦 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        // Try to parse error JSON; if it fails, fall back to status text
        let message = `HTTP error! status: ${response.status}`;
        let errorDetails = null;
        
        try {
          const text = await response.text();
          console.log('❌ Error response body:', text);
          
          if (text) {
            try {
              errorDetails = JSON.parse(text);
              if (errorDetails?.message) message = errorDetails.message;
              if (errorDetails?.error) message = errorDetails.error;
              if (errorDetails?.details) console.log('🔍 Error details:', errorDetails.details);
            } catch (_) {
              // Not JSON, use raw text
              message = text || response.statusText || message;
            }
          }
        } catch (_) {
          message = response.statusText || message;
        }
        
        const error = new Error(message);
        (error as any).status = response.status;
        (error as any).details = errorDetails;
        throw error;
      }

      // Response body may be empty on some backends; guard parsing
      const text = await response.text();
      console.log('✅ Success response body:', text);
      
      if (!text) {
        throw new Error('Empty response from server');
      }
      
      const message: string = JSON.parse(text);
      console.log('🎉 Parsed response message:', message);
      
      // Create a response object that matches our interface
      const data: SignupResponse = { message };
      return data;
    } catch (error) {
      console.error('💥 Signup error:', error);
      throw error;
    }
  }

  /**
   * Step 2: Add company and role details for a user created in step 1
   * This calls the POST /v1/routes/signup/details endpoint
   * Requires authorization header with JWT token
   */
  static async signupDetails(detailsData: SignupDetailsRequest): Promise<SignupDetailsResponse> {
    try {
      console.log('🏢 Sending signup details request to:', API_ENDPOINTS.SIGNUP_DETAILS);
      console.log('📝 Details data:', detailsData);
      
      // Get the current session token for authorization
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('No valid session found. Please log in again.');
      }
      
      console.log('🔑 Using authorization token:', session.access_token.substring(0, 20) + '...');
      
      const response = await fetch(API_ENDPOINTS.SIGNUP_DETAILS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(detailsData),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      console.log('📦 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let message = `HTTP error! status: ${response.status}`;
        let errorDetails = null;
        
        try {
          const text = await response.text();
          console.log('❌ Error response body:', text);
          
          if (text) {
            try {
              errorDetails = JSON.parse(text);
              if (errorDetails?.message) message = errorDetails.message;
              if (errorDetails?.error) message = errorDetails.error;
              if (errorDetails?.details) console.log('🔍 Error details:', errorDetails.details);
            } catch (_) {
              message = text || response.statusText || message;
            }
          }
        } catch (_) {
          message = response.statusText || message;
        }
        
        const error = new Error(message);
        (error as any).status = response.status;
        (error as any).details = errorDetails;
        throw error;
      }

      const text = await response.text();
      console.log('✅ Success response body:', text);
      
      if (!text) {
        throw new Error('Empty response from server');
      }
      
      const data: SignupDetailsResponse = JSON.parse(text);
      console.log('🎉 Parsed details response:', { ...data, user: { ...data.user, id: '[ID]' } });
      return data;
    } catch (error) {
      console.error('💥 Signup details error:', error);
      throw error;
    }
  }

  /**
   * Register a new user directly with Supabase (alternative implementation)
   * This bypasses the backend and directly:
   * - Creates user in Supabase Auth
   * - Stores extended profile in 'users' table
   */
  static async signupDirect(signupData: SignupRequest): Promise<SignupResponse> {
    try {
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Step 2: Store extended profile in users table
      const userProfile: Omit<UserProfile, 'created_at' | 'updated_at'> = {
        id: authData.user.id,
        email: signupData.email,
        name: signupData.name,
        company_name: null,
        role: null,  // Job role will be set later
        profile_completed: false
      };

      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .insert(userProfile)
        .select()
        .single();

      if (profileError) {
        // Cleanup: attempt to delete the auth user if profile creation failed
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
        } catch (cleanupError) {
          console.error('Failed to cleanup auth user after profile error:', cleanupError);
        }
        throw new Error(`Failed to create user profile: ${profileError.message}`);
      }

      return {
        user: profileData,
        message: 'User registered successfully'
      } as any; // This is for the direct signup method which returns user data
    } catch (error) {
      console.error('Direct signup error:', error);
      throw error;
    }
  }

  /**
   * Sign in using Supabase Auth directly (for existing users)
   */
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Get user profile from our custom users table
      if (data.user) {
        const userProfile = await this.getUserProfile(data.user.id);
        return { user: data.user, profile: userProfile };
      }

      return { user: data.user, profile: null };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Get user profile from the users table
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      return null;
    }
  }

  /**
   * Update user profile directly in Supabase (fallback method)
   * Note: This bypasses the backend API and updates the database directly
   */
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      console.log('📝 Updating user profile directly in Supabase for user:', userId);
      console.log('🔄 Updates:', updates);
      
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('✅ Profile updated successfully:', data);
      return data;
    } catch (error) {
      console.error('💥 Update user profile error:', error);
      throw error;
    }
  }

  /**
   * Sign out
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Get current session
   */
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}
