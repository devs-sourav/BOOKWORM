// components/AuthInitializer.js
"use client";

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeAuth, verifyToken } from '@/store/slices/authSlice';

export default function AuthInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
    
    // If there's a token, verify it with the server
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return children;
}

// Usage: Wrap your app with this component in your layout or _app.js
// <AuthInitializer>
//   <YourApp />
// </AuthInitializer>