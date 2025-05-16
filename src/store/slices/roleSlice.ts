import { DataStatus } from "@/constants/data/DataStatus";
import { RoleState } from "@/constants/state/Role";
import { createSlice } from "@reduxjs/toolkit";
import {
  assignRolePermissionsAsync,
  checkRoleNameIsUniqueAsync,
  createRoleAsync,
  deleteRoleAsync,
  deleteRolePermissionsAsync,
  editRoleAsync,
  fetchRolesAsync,
} from "../thunks/roleThunk";
import { Role } from "@/types/Role";
import { PaginatedResponse } from "@/types/Api";
const initialState: RoleState = {
  data: [],
  meta: {} as PaginatedResponse<Role>,
  loading: DataStatus.IDLE,
  error: null,
  uniqueLoading: DataStatus.IDLE,
};
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoleAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(createRoleAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(createRoleAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to create role" };
        } else {
          state.error = null;
        }
      })

      .addCase(editRoleAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(editRoleAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(editRoleAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to edit role" };
        } else {
          state.error = null;
        }
      })
      .addCase(deleteRoleAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(deleteRoleAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(deleteRoleAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (action.payload) {
          state.error = {
            message: (action.payload as { message: string }).message,
          };
        } else {
          state.error = { message: "خطای پیشفرض" };
        }
      })
      .addCase(fetchRolesAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "data" in action.payload &&
          "meta" in action.payload
        ) {
          state.data = action.payload.data as Role[];
          state.meta = action.payload.meta as PaginatedResponse<Role>;
          state.error = null; // Clear error on successful fetch
        } else {
          state.data = [];
          state.meta = {} as PaginatedResponse<Role>;
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch roles" };
        } else {
          state.error = null;
        }
      })

      .addCase(assignRolePermissionsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(assignRolePermissionsAsync.fulfilled, (state) => {
        // No user/auth state change on register success
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(assignRolePermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch roles" };
        } else {
          state.error = null;
        }
      })

      .addCase(deleteRolePermissionsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(deleteRolePermissionsAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(deleteRolePermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to delete role permissions",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(checkRoleNameIsUniqueAsync.pending, (state) => {
        state.uniqueLoading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(checkRoleNameIsUniqueAsync.fulfilled, (state) => {
        state.uniqueLoading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(checkRoleNameIsUniqueAsync.rejected, (state, action) => {
        state.uniqueLoading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to check role name uniqueness",
          };
        } else {
          state.error = null;
        }
      });
  },
});
export default roleSlice.reducer;
