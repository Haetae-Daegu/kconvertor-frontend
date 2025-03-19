import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

export function useRequireAuth(redirectUrl = '/auth/login') {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [loading, isAuthenticated, router, redirectUrl]);

  return { user, loading, isAuthenticated };
} 