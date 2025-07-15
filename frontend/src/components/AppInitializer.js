// components/AppInitializer.js
"use client";

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { verifyToken } from '@/store/slices/authSlice';

export default function AppInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user has a token and verify it on app load
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return children;
}

// Usage in your main layout or _app.js
// Wrap your app with this component:
// <AppInitializer>
//   <YourApp />
// </AppInitializer>