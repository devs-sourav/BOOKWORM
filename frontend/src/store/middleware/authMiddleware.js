import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loginUser, logoutUser, verifyToken } from '../slices/authSlice';

// Create listener middleware for side effects
export const authMiddleware = createListenerMiddleware();

// Listen to login success to handle redirects or additional logic
authMiddleware.startListening({
  actionCreator: loginUser.fulfilled,
  effect: (action, listenerApi) => {
    // You can add additional logic here
    console.log('User logged in successfully:', action.payload.user);
    
    // Example: Redirect to dashboard
    // if (typeof window !== 'undefined') {
    //   window.location.href = '/dashboard';
    // }
  },
});

// Listen to logout to handle cleanup
authMiddleware.startListening({
  actionCreator: logoutUser.fulfilled,
  effect: (action, listenerApi) => {
    console.log('User logged out successfully');
    
    // Example: Redirect to login
    // if (typeof window !== 'undefined') {
    //   window.location.href = '/login';
    // }
  },
});

// Listen to token verification failure
authMiddleware.startListening({
  actionCreator: verifyToken.rejected,
  effect: (action, listenerApi) => {
    console.log('Token verification failed:', action.payload);
    
    // Optionally redirect to login
    // if (typeof window !== 'undefined') {
    //   window.location.href = '/login';
    // }
  },
});

export default authMiddleware;