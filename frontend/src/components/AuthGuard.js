'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function AuthGuard({ children, requireAuth = true }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
      } else if (!requireAuth && isAuthenticated) {
        router.push('/dashboard'); // or wherever authenticated users should go
      }
    }
  }, [isAuthenticated, loading, requireAuth, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect to login
  }

  if (!requireAuth && isAuthenticated) {
    return null; // Will redirect to dashboard
  }

  return children;
}