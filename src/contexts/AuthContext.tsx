import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
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
    role: 'admin' as const
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored authentication on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('csaUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
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
        role: 'user'
      };
      setUser(regularUser);
      localStorage.setItem('csaUser', JSON.stringify(regularUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('csaUser');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    loading
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