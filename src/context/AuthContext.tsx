import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, AuthError, LoginInput } from '../app/types/User';
import { useRouter } from 'next/router';

// define o tipo do contexto de autenticação
type AuthContextType = {
  currentUser: User | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

// cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica se tem um token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Verifica se existe um perfil
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/perfil`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          const data: { nome: string; email: string } = await response.json();
          setCurrentUser({
            id: '', // Salva com o ID, se existir
            name: data.nome,
            email: data.email,
            avatarUrl: '', // Se tiver um avatar, salva aqui
            createdAt: '',
            updatedAt: '',
          });
        })
        .catch((err) => {
          console.error(err);
          setCurrentUser(null);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (input: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      const result: AuthResponse | AuthError = await response.json();

      if (!response.ok) {
        throw new Error((result as AuthError).message || 'Login failed');
      }

      // salva o token
      localStorage.setItem('token', (result as AuthResponse).token);
      setCurrentUser((result as AuthResponse).user);
      router.push('/posts'); // Redireciona depois de logar
    } catch (err: any) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth tem que ter um AuthProvider');
  }
  return context;
};