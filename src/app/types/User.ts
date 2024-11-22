export interface User {
    id: string;
    nome: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    isFollowing?: boolean;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }


  export interface RegisterInput {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface AuthError {
    message: string;
  }
  
  export interface UserContextType {
    user: User | null;
    login: (userData: User, saveLogin: boolean) => void;
    logout: () => void;
    loading: boolean;
  }

  export interface User {
    
  }