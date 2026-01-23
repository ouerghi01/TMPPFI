import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../../api/auth';
import { setAuthToken, clearAuthToken, getAuthToken } from '../../client';

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = getAuthToken();
    const savedUser = localStorage.getItem('userProfile');

    if (token) {
      setIsLoggedIn(true);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      // Persist token
      setAuthToken(response.token);

      // Generate mock profile (since we don't have a /me endpoint yet)
      const nameParts = email.split('@')[0];
      const firstName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1);
      const lastName = 'User';

      const savedProfile = localStorage.getItem('userProfile');
      let userProfile: UserProfile;

      if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        userProfile.email = email; // Update email if needed
      } else {
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
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    clearAuthToken();
    localStorage.removeItem('userProfile');
    // We might want to keep userProfile if we want to remember the user (e.g. email in login form), 
    // but typically logout clears session data. 
    // The previous implementation kept it: "Keep userProfile in localStorage so data persists". 
    // I'll stick to removing it to be "clean", or keep it if that was the intent. 
    // The prompt says "Clear cached auth state".
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
