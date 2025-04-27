
import { useCallback } from "react";
import { LoginCredentials, RegisterCredentials } from "@/types/Auth";
import { ValidationErrors, ApiError } from "@/types/Api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@/store/thunks/authThunk";
import { clearAuthError } from "@/store/slices/authSlice"; // Import if added
import { User } from "@/types/User";
import { unwrapResult } from '@reduxjs/toolkit'; // Use unwrapResult for cleaner error handling

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<User> => { // Return User on success
      try {
        // Dispatch loginUser and unwrap the result
        const resultAction = await dispatch(loginUser(credentials));
        // unwrapResult throws an error if the thunk was rejected
        const loggedInUser = unwrapResult(resultAction);
        return loggedInUser;
      } catch (err: unknown) {
        console.error("Error in login action hook:", err);
        throw err as ApiError;
      }
    },
    [dispatch]
  );

  const register = useCallback(
     async (userData: RegisterCredentials): Promise<{ message: string; user: User }> => {
      try {
        const resultAction = await dispatch(registerUser(userData));
        const result = unwrapResult(resultAction);
        return { message: result.message, user: result.data };
      } catch (err: unknown) {
        console.error("Error in register action hook:", err);
        throw err as ApiError;
      }
    },
    [dispatch]
  );

  const logout = useCallback(async (): Promise<{ message: string }> => { // Return backend response
    try {
      const resultAction = await dispatch(logoutUser());
      const result = unwrapResult(resultAction);
      return result;
    } catch (err: unknown) {
      console.error("Error in logout action hook:", err);
      throw err as ApiError;
    }
  }, [dispatch]);

  const loadUser = useCallback(async (): Promise<User> => { // Return User
    // This is typically called on app load to check existing session
    try {
       console.log("Attempting to load user via hook...");
      const resultAction = await dispatch(fetchUser());
      const currentUser = unwrapResult(resultAction);
      console.log("User loaded successfully via hook:", currentUser.email);
      return currentUser;
    } catch (err: unknown) {
       console.error("Error in loadUser action hook:", err);
       throw err as ApiError;
    }
  }, [dispatch]);

   // Function to clear errors from the UI state
   const clearError = useCallback(() => {
       dispatch(clearAuthError()); // Dispatch the action if added to the slice
   }, [dispatch]);


  // --- Error Handling Helpers ---
  // Check if the error object has validation errors
  const validationErrors =
    error && typeof error === "object" && "errors" in error
      ? (error as ValidationErrors).errors
      : null;

  // Get the main error message
  const apiErrorMessage =
    error && typeof error === "object" && "message" in error
      ? (error as { message: string }).message
      : typeof error === 'string' ? error : null; // Handle if error is just a string


  return {
    user,
    // token is removed
    isAuthenticated,
    isLoading: loading === "pending",
    status: loading,
    error: apiErrorMessage, // The main error message
    validationErrors,    // Specific field validation errors
    actions: {
      login,
      register,
      logout,
      loadUser,
      clearError, // Expose clearError action
    },
  };
};
