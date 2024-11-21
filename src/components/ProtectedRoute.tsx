import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

/**
 * A Higher-Order Component to protect routes from unauthenticated access.
 * @param children - The protected component's children.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (user === null) {
    return <p>Carregando...</p>; // Loading state
  }

  return <>{children}</>;
};

export default ProtectedRoute;