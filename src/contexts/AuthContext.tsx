import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/authService';
import type { UserProfile, SignupRequest } from '../config/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  userRole: 'admin' | 'user';  // System role (admin/user permissions)
  firstName?: string;
  lastName?: string;
  companyName?: string;
  jobRole?: string;  // Job title (e.g., "Software Engineer") - maps to database "role" column
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (signupData: SignupRequest) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'linkedin') => Promise<boolean>;
  completeProfile: (profileData: {
    companyName: string;
    jobRole: string;
  }) => void;
  logout: () => void;
  loading: boolean;
  showProfileDialog: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo admin credentials - in production, this would be handled by a backend
const ADMIN_CREDENTIALS = {
  email: 'admin@csasf.org',
  password: 'CSA2024!',
  user: {
    id: '1',
    email: 'admin@csasf.org',
    name: 'CSA Admin',
    userRole: 'admin' as const,
    companyName: 'Cloud Security Alliance',
    jobRole: 'Administrator',
    profileCompleted: true
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  // Check for Supabase session on app load and listen to auth changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await AuthService.getCurrentSession();
        if (session?.user) {
          const profile = await AuthService.getUserProfile(session.user.id);
          if (profile) {
            const userData: User = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              userRole: 'user',  // Default to regular user
              companyName: profile.company_name,
              jobRole: profile.role,  // Database role = job title
              profileCompleted: profile.profile_completed
            };
            setUser(userData);
            
            // Show profile dialog if user hasn't completed their profile
            if (!profile.profile_completed) {
              setShowProfileDialog(true);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await AuthService.getUserProfile(session.user.id);
        if (profile) {
          const userData: User = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            userRole: 'user',  // Default to regular user
            companyName: profile.company_name,
            jobRole: profile.role,  // Database role = job title
            profileCompleted: profile.profile_completed
          };
          setUser(userData);
          
          if (!profile.profile_completed) {
            setShowProfileDialog(true);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setShowProfileDialog(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Check demo admin credentials first for backwards compatibility
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setUser(ADMIN_CREDENTIALS.user);
        setLoading(false);
        return true;
      }

      // Use Supabase Auth for real authentication
      const result = await AuthService.signIn(email, password);
      if (result.user && result.profile) {
        const userData: User = {
          id: result.profile.id,
          email: result.profile.email,
          name: result.profile.name,
          userRole: 'user',  // Default to regular user
          companyName: result.profile.company_name,
          jobRole: result.profile.role,  // Database role = job title
          profileCompleted: result.profile.profile_completed
        };
        setUser(userData);
        
        if (!result.profile.profile_completed) {
          setShowProfileDialog(true);
        }
        
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const signup = async (signupData: SignupRequest): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Option 1: Use backend API (recommended - more reliable)
      const result = await AuthService.signupBasic(signupData);
      
      // Option 2: Direct Supabase integration (has permission issues)
      // const result = await AuthService.signupDirect(signupData);
      
      if (result.message) {
        // Basic signup successful - now sign in the user to get their profile
        const loginResult = await AuthService.signIn(signupData.email, signupData.password);
        
        if (loginResult.user && loginResult.profile) {
          const userData: User = {
            id: loginResult.profile.id,
            email: loginResult.profile.email,
            name: loginResult.profile.name,
            userRole: 'user',  // Default to regular user
            companyName: loginResult.profile.company_name,
            jobRole: loginResult.profile.role,  // Database role = job title
            profileCompleted: loginResult.profile.profile_completed
          };
          setUser(userData);
          
          if (!loginResult.profile.profile_completed) {
            setShowProfileDialog(true);
          }
          
          setLoading(false);
          return true;
        }
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      throw error; // Re-throw so the UI can show the error message
    }
  };

  const socialLogin = async (provider: 'google' | 'linkedin'): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, simulate successful social login
    const socialUser: User = {
      id: Date.now().toString(),
      email: `user@${provider}.example.com`,
      name: `${provider} User`,
      userRole: 'user',
      profileCompleted: false
    };
    
    setUser(socialUser);
    localStorage.setItem('csaUser', JSON.stringify(socialUser));
    setShowProfileDialog(true); // Show profile dialog for social login users
    setLoading(false);
    return true;
  };

  const completeProfile = async (profileData: {
    companyName: string;
    jobRole: string;
  }) => {
    if (!user) return;
    
    try {
      // For demo admin, just update locally
      if (user.id === ADMIN_CREDENTIALS.user.id) {
        const updatedUser: User = {
          ...user,
          companyName: profileData.companyName,
          jobRole: profileData.jobRole,
          profileCompleted: true
        };
        setUser(updatedUser);
        setShowProfileDialog(false);
        return;
      }

      // Option 1: Use backend API for signup details (recommended)
      const result = await AuthService.signupDetails({
        company_name: profileData.companyName,
        role: profileData.jobRole
      });
      
      const updatedUser: User = {
        ...user,
        companyName: result.user.company_name,
        jobRole: result.user.role,
        profileCompleted: result.user.profile_completed
      };
      
      setUser(updatedUser);
      setShowProfileDialog(false);
      
      // Option 2: Direct Supabase update (fallback)
      // const updatedProfile = await AuthService.updateUserProfile(user.id, {
      //   company_name: profileData.companyName,
      //   role: profileData.jobRole,
      //   profile_completed: true
      // });
      // 
      // const updatedUser: User = {
      //   ...user,
      //   companyName: updatedProfile.company_name,
      //   jobRole: updatedProfile.role,
      //   profileCompleted: updatedProfile.profile_completed
      // };
      // 
      // setUser(updatedUser);
      // setShowProfileDialog(false);
    } catch (error) {
      console.error('Error completing profile:', error);
    }
  };

  const logout = async () => {
    try {
      await AuthService.signOut();
      setUser(null);
      setShowProfileDialog(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if Supabase logout fails
      setUser(null);
      setShowProfileDialog(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.userRole === 'admin',
    login,
    signup,
    socialLogin,
    completeProfile,
    logout,
    loading,
    showProfileDialog
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}