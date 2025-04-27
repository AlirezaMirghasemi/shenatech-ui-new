// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User"; // Assuming User type doesn't include token
import { fetchUser, loginUser, logoutUser, registerUser } from "../thunks/authThunk";
import { DataStatus } from "@/constants/data/DataStatus";
import { AuthState } from "@/constants/state/Auth";



const initialState: AuthState = {
  user: null,
  isAuthenticated: false, // Start as false
  loading: DataStatus.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Optional: Add a reducer to manually clear errors if needed
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        // Payload is now just User
        state.loading = DataStatus.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload; // User data comes from login response
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || { message: "Login failed" };
      })
      // Register cases remain similar, don't log in automatically after register
      .addCase(registerUser.pending, (state) => {
        state.loading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => { // No user/auth state change on register success
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.error = action.payload || { message: "Registration failed" };
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
         // Optionally set loading state if you want UI feedback during logout
         state.loading = DataStatus.PENDING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = DataStatus.IDLE;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error("Logout Thunk Rejected:", action.payload);
        // Even if logout API fails, clear state on client-side for consistency
        state.isAuthenticated = false;
        state.user = null;
        state.loading = DataStatus.IDLE;
        // Keep the error if needed for UI feedback
        state.error = action.payload || { message: "Logout failed" };
      })
      // Fetch user cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = DataStatus.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null; // Clear error on successful fetch
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.isAuthenticated = false;
        state.user = null;
        // Don't store "Unauthorized" as error message if handled by interceptor/logout
        if (typeof action.payload === 'string' || action.payload?.message !== "Unauthorized") {
             state.error = action.payload || { message: "Failed to fetch user" };
        } else {
             state.error = null; // Error handled by auto-logout
        }
      });
  },
});

export const { clearAuthError } = authSlice.actions; // Export if added
export default authSlice.reducer;
