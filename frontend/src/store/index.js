// store/index.js
import { configureStore } from '@reduxjs/toolkit';

// Import the reducer directly with proper naming
import authReducer from './slices/authSlice';

// Create and export the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other slices here as you create them
    // user: userSlice,
    // books: booksSlice,
    // etc.
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Selector helpers
export const selectAuth = (state) => state.auth;

// Export types for TypeScript (if needed later)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;