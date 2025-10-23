import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true  // Enable OAuth callback detection
  }
})

// OTP authentication functions
export const sendOTP = async (email: string, userData?: { name: string; organization: string }) => {
  
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      data: userData ? {
        name: userData.name,
        organization: userData.organization,
        full_name: userData.name,
        display_name: userData.name
      } : {}
    }
  })
  
  if (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
  
  return data
}

export const verifyOTP = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email'
  })
  
  if (error) {
    console.error('Error verifying OTP:', error)
    throw error
  }
  return data
}

// Update user metadata (for signup after OTP verification)
export const updateUserMetadata = async (userData: { name: string; organization: string }) => {
  console.log('Updating user metadata:', userData);
  
  const { data, error } = await supabase.auth.updateUser({
    data: {
      name: userData.name,
      organization: userData.organization,
      full_name: userData.name,
      display_name: userData.name
    }
  })
  
  if (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
  
  console.log('User metadata updated successfully:', data);
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// LinkedIn OAuth authentication
export const signInWithLinkedIn = async () => {
  console.log('Initiating LinkedIn OAuth...');
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: {
      redirectTo: `${window.location.origin}/linkedin-callback`
    }
  })
  
  if (error) {
    console.error('Error signing in with LinkedIn:', error)
    throw error
  }
  
  console.log('LinkedIn OAuth initiated:', data);
  return data
}
