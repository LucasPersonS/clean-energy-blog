import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Skeleton from '../components/Utilitarios/Skeleton';

/**
 * A Higher-Order Component to protect routes from unauthenticated access.
 * @param children - The protected component's children.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Skeleton />; // Show a loading indicator while checking auth
  }

  return <>{children}</>;
};

export default ProtectedRoute;