import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  bio: string;
  avatar: string;
  preferences: {
    language: 'fr' | 'de' | 'en';
    emailNotifications: boolean;
    smsNotifications: boolean;
    favoriteThemes: string[];
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email: string, firstName: string, lastName: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('userProfile');
    
    if (savedAuth === 'true' && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, firstName: string, lastName: string) => {
    // Check if profile already exists
    const savedProfile = localStorage.getItem('userProfile');
    let userProfile: UserProfile;

    if (savedProfile) {
      userProfile = JSON.parse(savedProfile);
      // Update email if changed
      userProfile.email = email;
      userProfile.firstName = firstName;
      userProfile.lastName = lastName;
    } else {
      // Create new profile
      userProfile = {
        firstName,
        lastName,
        email,
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        bio: '',
        avatar: '',
        preferences: {
          language: 'fr',
          emailNotifications: true,
          smsNotifications: false,
          favoriteThemes: []
        }
      };
    }

    setUser(userProfile);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    // Keep userProfile in localStorage so data persists
  };

  const updateProfile = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateProfile }}>
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
