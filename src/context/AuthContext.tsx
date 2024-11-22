import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserContextType } from '../app/types/User';

const AuthContext = createContext<UserContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from Local Storage on initial render if available
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from Local Storage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Logs in the user.
   * @param userData - The user data to set.
   * @param saveLogin - If true, saves the user data to localStorage.
   */
  const login = (userData: User, saveLogin: boolean) => {
    setUser(userData);
    if (saveLogin) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  /**
   * Logs out the user and clears any saved data.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optionally, clear other related data from Local Storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 * @returns The AuthContext value.
 * @throws Error if used outside of AuthProvider.
 */
export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};