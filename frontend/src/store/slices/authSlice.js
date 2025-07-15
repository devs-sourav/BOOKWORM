// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import axios differently to avoid circular dependency issues
let axiosInstance;
try {
  axiosInstance = require('@/lib/axios').default;
} catch (error) {
  // Fallback import
  import('@/lib/axios').then(module => {
    axiosInstance = module.default;
  });
}

// Helper functions for localStorage with SSR safety
const getFromLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  }
  return null;
};

const setToLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} to localStorage:`, error);
    }
  }
};

const removeFromLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
};

// Define initial state first
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationSuccess: false,
};

// Define async thunks
const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', userData);
      
      // Store token and user in localStorage if they exist in response
      if (response.data.token) {
        setToLocalStorage('token', response.data.token);
      }
      if (response.data) {
        setToLocalStorage('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      
      // Store token and user in localStorage
      if (response.data.token) {
        setToLocalStorage('token', response.data.token);
      }
      if (response.data) {
        setToLocalStorage('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove token and user from localStorage
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
      
      return true;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Logout failed';
      return rejectWithValue(message);
    }
  }
);

const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = getFromLocalStorage('token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
      const message = error.response?.data?.message || error.message || 'Token verification failed';
      return rejectWithValue(message);
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.registrationSuccess = false;
      // Also clear localStorage when clearing credentials
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
    },
    // Add action to initialize auth state from localStorage
    initializeAuth: (state) => {
      const token = getFromLocalStorage('token');
      const userStr = getFromLocalStorage('user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
          // Clear invalid data
          removeFromLocalStorage('token');
          removeFromLocalStorage('user');
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registrationSuccess = true;
        // If registration returns token and user, set them in state
        if (action.payload.token && action.payload.user) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      })
      
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Verify Token
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = getFromLocalStorage('token');
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

// Extract actions and reducer
const { clearError, clearRegistrationSuccess, clearCredentials, initializeAuth } = authSlice.actions;
const authReducer = authSlice.reducer;

// Export everything explicitly
export { 
  registerUser, 
  loginUser, 
  logoutUser, 
  verifyToken, 
  clearError, 
  clearRegistrationSuccess, 
  clearCredentials,
  initializeAuth
};

export default authReducer;