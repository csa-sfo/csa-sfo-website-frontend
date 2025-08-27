import React, { createContext, useContext, useEffect, useState } from 'react';

import { API_ENDPOINTS } from '@/config/api';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  companyName?: string;
  jobRole?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  completeProfile: (profileData: { companyName: string; jobRole: string }) => Promise<void>;
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
    role: 'admin' as const,
    companyName: 'Cloud Security Alliance',
    jobRole: 'Administrator',
    profileCompleted: true
  }
};

type Tokens = {
  accessToken?: string;
  refreshToken?: string;
  signupToken?: string;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens>({});
  const [loading, setLoading] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  // Check for stored authentication on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('csaUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Set default values if they don't exist
        const userWithDefaults = {
          ...parsedUser,
          companyName: parsedUser.companyName || 'Event Aug 27',
          jobRole: parsedUser.jobRole || 'Participant',
          profileCompleted: true
        };
        setUser(userWithDefaults);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('csaUser');
      }
    }
    const storedTokens = localStorage.getItem('csaTokens');
    if (storedTokens) {
      try {
        setTokens(JSON.parse(storedTokens));
      } catch {
        localStorage.removeItem('csaTokens');
      }
    }
    setLoading(false);
  }, []);

  const persistState = (nextUser: User | null, nextTokens?: Tokens) => {
    if (nextUser) localStorage.setItem('csaUser', JSON.stringify(nextUser));
    else localStorage.removeItem('csaUser');
    if (nextTokens) {
      setTokens(nextTokens);
      localStorage.setItem('csaTokens', JSON.stringify(nextTokens));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const u = data.user as any;
      const nextUser: User = {
        id: u.id,
        email: u.email,
        name: u.name,
        role: (u.type === 'admin' ? 'admin' : 'user'),
        companyName: u.company_name,
        jobRole: u.role,
        profileCompleted: !!u.profile_completed || (!!u.company_name && !!u.role)
      };
      const nextTokens: Tokens = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
      setUser(nextUser);
      persistState(nextUser, nextTokens);
      setShowProfileDialog(!nextUser.profileCompleted);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.SIGNUP_BASIC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      const signupToken = data.token as string | undefined;
      if (!signupToken) return false;

      const nextTokens: Tokens = { signupToken };
      const nextUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
        profileCompleted: false,
      };
      setUser(nextUser);
      persistState(nextUser, nextTokens);
      
      // Automatically complete profile with default values
      try {
        const profileData = {
          company_name: 'Event Aug 27',
          role: 'Participant'
        };
        
        const res = await fetch(API_ENDPOINTS.SIGNUP_DETAILS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${signupToken}`,
          },
          body: JSON.stringify(profileData),
        });
        
        if (res.ok) {
          // Profile completed successfully, now login with the stored credentials
          const pending = localStorage.getItem('csaPendingSignup');
          if (pending) {
            const { email, password } = JSON.parse(pending);
            localStorage.removeItem('csaPendingSignup');
            await login(email, password);
          }
        }
      } catch (error) {
        console.error('Failed to auto-complete profile:', error);
      }
      
      localStorage.setItem('csaPendingSignup', JSON.stringify({ email, password }));
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
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
      role: 'user',
      profileCompleted: false
    };
    
    setUser(socialUser);
    localStorage.setItem('csaUser', JSON.stringify(socialUser));
    
    // Automatically complete profile for social login users
    const updatedUser: User = {
      ...socialUser,
      companyName: 'Event Aug 27',
      jobRole: 'Participant',
      profileCompleted: true,
    };
    setUser(updatedUser);
    localStorage.setItem('csaUser', JSON.stringify(updatedUser));
    
    setLoading(false);
    return true;
  };

  const completeProfile = async (profileData: { companyName: string; jobRole: string }) => {
    if (!user) return;
    setLoading(true);
    try {
      const current = tokens;
      if (current.signupToken) {
        const res = await fetch(API_ENDPOINTS.SIGNUP_DETAILS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${current.signupToken}`,
          },
          body: JSON.stringify({
            company_name: profileData.companyName,
            role: profileData.jobRole,
          }),
        });
        if (!res.ok) throw new Error('Failed to store details during signup');
        const pending = localStorage.getItem('csaPendingSignup');
        if (pending) {
          const { email, password } = JSON.parse(pending);
          localStorage.removeItem('csaPendingSignup');
          await login(email, password);
        }
        const nextTokens: Tokens = { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
        persistState(user, nextTokens);
      } else if (tokens.accessToken) {
        const res = await fetch(API_ENDPOINTS.USER_DETAILS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({
            company_name: profileData.companyName,
            role: profileData.jobRole,
          }),
        });
        if (!res.ok) throw new Error('Failed to update details');
        const updatedUser: User = {
          ...user,
          companyName: profileData.companyName,
          jobRole: profileData.jobRole,
          profileCompleted: true,
        };
        setUser(updatedUser);
        persistState(updatedUser, tokens);
      } else {
        const updatedUser: User = {
          ...user,
          companyName: profileData.companyName,
          jobRole: profileData.jobRole,
          profileCompleted: true,
        };
        setUser(updatedUser);
        persistState(updatedUser, tokens);
      }
      setShowProfileDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setShowProfileDialog(false);
    setTokens({});
    localStorage.removeItem('csaUser');
    localStorage.removeItem('csaTokens');
    localStorage.removeItem('csaPendingSignup');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
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