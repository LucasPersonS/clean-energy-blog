/**
 * Represents a user in the system.
 */
export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    isFollowing?: boolean;
  }
  
  /**
   * Payload for user login.
   */
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  /**
   * Payload for user registration.
   */
  export interface RegisterInput {
    name: string;
    email: string;
    password: string;
  }
  
  /**
   * Response returned after successful authentication.
   */
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  /**
   * Represents errors related to authentication.
   */
  export interface AuthError {
    message: string;
    // You can add more fields like error codes if needed
  }
  
  export interface UserContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }

  export interface User {
    
  }