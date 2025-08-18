import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  jobRole?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'linkedin') => Promise<boolean>;
  completeProfile: (profileData: {
    firstName: string;
    lastName: string;
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
    role: 'admin' as const,
    firstName: 'CSA',
    lastName: 'Admin',
    companyName: 'Cloud Security Alliance',
    jobRole: 'Administrator',
    profileCompleted: true
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  // Check for stored authentication on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('csaUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Show profile dialog if user hasn't completed their profile
        if (!parsedUser.profileCompleted) {
          setShowProfileDialog(true);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('csaUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_CREDENTIALS.user);
      localStorage.setItem('csaUser', JSON.stringify(ADMIN_CREDENTIALS.user));
      setLoading(false);
      return true;
    }
    
    // For demo purposes, allow any other email with a simple password
    if (email && password && password.length >= 6) {
      const regularUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: 'user',
        profileCompleted: false
      };
      setUser(regularUser);
      localStorage.setItem('csaUser', JSON.stringify(regularUser));
      setShowProfileDialog(true); // Show profile dialog for new users
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
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
    setShowProfileDialog(true); // Show profile dialog for social login users
    setLoading(false);
    return true;
  };

  const completeProfile = (profileData: {
    firstName: string;
    lastName: string;
    companyName: string;
    jobRole: string;
  }) => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      companyName: profileData.companyName,
      jobRole: profileData.jobRole,
      profileCompleted: true,
      name: `${profileData.firstName} ${profileData.lastName}`
    };
    
    setUser(updatedUser);
    localStorage.setItem('csaUser', JSON.stringify(updatedUser));
    setShowProfileDialog(false);
  };

  const logout = () => {
    setUser(null);
    setShowProfileDialog(false);
    localStorage.removeItem('csaUser');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
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