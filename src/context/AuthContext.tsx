import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../app/types/User';
import { useRouter } from 'next/router';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  /**
   * Logs in the user by setting the user state and storing it in localStorage.
   * @param userData - The authenticated user's data.
   */
  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  /**
   * Updates the user's profile by calling the internal API route.
   * @param updatedData - Partial user data to update.
   */
  const updateUser = async (updatedData: Partial<User>) => {
    if (!user) return;

    try {
      const response = await fetch('/api/auth/profile', { // Internal API route
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access AuthContext.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};