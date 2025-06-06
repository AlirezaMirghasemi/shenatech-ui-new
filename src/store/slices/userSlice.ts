import { DataStatus } from "@/constants/data/DataStatus";
import { createSlice } from "@reduxjs/toolkit";
import { PaginatedResponse } from "@/types/Api";
import { User } from "@/types/User";
import { UserState } from "@/constants/state/User";
import {
  checkFieldIsUniqueAsync,
  createUserAsync,
  editUserAsync,
  editUserStatusAsync,
  fetchPermissionUsersAsync,
  fetchRoleUsersAsync,
  fetchUnAssignedRoleUsersAsync,
  getUsersAsync,
} from "../thunks/userThunk";
const initialState: UserState = {
  data: [],
  meta: {} as PaginatedResponse<User>,
  unassignedRoleUsers: [],
  loading: DataStatus.IDLE,
  error: null,
  uniqueLoading: DataStatus.IDLE,
};
const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(createUserAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to create user",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(fetchRoleUsersAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(fetchRoleUsersAsync.fulfilled, (state, action) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "data" in action.payload &&
          "meta" in action.payload
        ) {
          state.data = action.payload.data as User[];
          state.meta = action.payload.meta as PaginatedResponse<User>;
          state.error = null; // Clear error on successful fetch
        } else {
          state.data = [];
          state.meta = {} as PaginatedResponse<User>;
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(fetchRoleUsersAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch Users" };
        } else {
          state.error = null;
        }
      })
      .addCase(fetchPermissionUsersAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(fetchPermissionUsersAsync.fulfilled, (state, action) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "data" in action.payload &&
          "meta" in action.payload
        ) {
          state.data = action.payload.data as User[];
          state.meta = action.payload.meta as PaginatedResponse<User>;
          state.error = null; // Clear error on successful fetch
        } else {
          state.data = [];
          state.meta = {} as PaginatedResponse<User>;
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(fetchPermissionUsersAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch Users" };
        } else {
          state.error = null;
        }
      })
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "data" in action.payload &&
          "meta" in action.payload
        ) {
          state.data = action.payload.data as User[];
          state.meta = action.payload.meta as PaginatedResponse<User>;
          state.error = null;
        } else {
          state.data = [];
          state.meta = {} as PaginatedResponse<User>;
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch Users" };
        } else {
          state.error = null;
        }
      })
      .addCase(checkFieldIsUniqueAsync.pending, (state) => {
        state.uniqueLoading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(checkFieldIsUniqueAsync.fulfilled, (state) => {
        state.uniqueLoading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(checkFieldIsUniqueAsync.rejected, (state, action) => {
        state.uniqueLoading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to check field uniqueness",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(editUserStatusAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(editUserStatusAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(editUserStatusAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to edit user status",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(editUserAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(editUserAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to edit user",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(fetchUnAssignedRoleUsersAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
      })
      .addCase(
        fetchUnAssignedRoleUsersAsync.fulfilled,
        (state, { payload }) => {
          state.loading = DataStatus.SUCCEEDED;
          state.error = null;
          state.unassignedRoleUsers = payload.data as User[];
        }
      )
      .addCase(fetchUnAssignedRoleUsersAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.unassignedRoleUsers = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch Users" };
        } else {
          state.error = null;
        }
      });
  },
});
export default UserSlice.reducer;
