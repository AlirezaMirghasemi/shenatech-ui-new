import { DataStatus } from "@/constants/data/DataStatus";
import { createSlice } from "@reduxjs/toolkit";
import { PaginatedResponse } from "@/types/Api";
import { Permission } from "@/types/Permission";
import { PermissionState } from "@/constants/state/Permission";
import {
  checkPermissionNameIsUniqueAsync,
  createPermissionAsync,
  deletePermissionRolesAsync,
  deletePermissionsAsync,
  fetchPermissionsAsync,
  fetchRoleNotPermissionsAsync,
  fetchRolePermissionsAsync,
} from "../thunks/permissionThunk";
const initialState: PermissionState = {
  assigned: [],
  unassigned: [],
  data: [],
  meta: {} as PaginatedResponse<Permission>,
  loading: DataStatus.IDLE,
  uniqueLoading: DataStatus.IDLE,
  error: null,
};
const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPermissionAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(createPermissionAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(createPermissionAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to create permission",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(deletePermissionsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(deletePermissionsAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(deletePermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to delete permission",
          };
        } else {
          state.error = null;
        }
      })

      .addCase(fetchPermissionsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(fetchPermissionsAsync.fulfilled, (state, action) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "data" in action.payload &&
          "meta" in action.payload
        ) {
          state.data = action.payload.data as Permission[];
          state.meta = action.payload.meta as PaginatedResponse<Permission>;
          state.error = null; // Clear error on successful fetch
        } else {
          state.data = [];
          state.meta = {} as PaginatedResponse<Permission>;
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(fetchPermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to fetch permissions",
          };
        } else {
          state.error = null;
        }
      })

      .addCase(fetchRolePermissionsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(fetchRolePermissionsAsync.fulfilled, (state, { payload }) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          payload &&
          typeof payload === "object" &&
          "data" in payload &&
          "meta" in payload
        ) {
          state.assigned = payload.data;
          state.meta = payload.meta;
          state.error = null;
        } else {
          state.assigned = [];
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(fetchRolePermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.assigned = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to fetch Permissions",
          };
        } else {
          state.error = null;
        }
      })

      .addCase(fetchRoleNotPermissionsAsync.pending , (state) => {
        state.loading = DataStatus.PENDING;
      })
      .addCase(fetchRoleNotPermissionsAsync.fulfilled, (state, { payload }) => {
        state.loading = DataStatus.SUCCEEDED;
        if (payload && typeof payload === "object" && "data" in payload) {
          state.unassigned = payload.data;
          state.error = null;
        } else {
          state.unassigned = [];
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(fetchRoleNotPermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.unassigned = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to fetch Not Permissions",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(checkPermissionNameIsUniqueAsync.pending, (state) => {
        state.uniqueLoading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(checkPermissionNameIsUniqueAsync.fulfilled, (state) => {
        state.uniqueLoading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(checkPermissionNameIsUniqueAsync.rejected, (state, action) => {
        state.uniqueLoading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to check permission name uniqueness",
          };
        } else {
          state.error = null;
        }
      })
      .addCase(deletePermissionRolesAsync.pending, (state) => {
              state.loading = DataStatus.PENDING;
              state.error = null;
            })
            .addCase(deletePermissionRolesAsync.fulfilled, (state) => {
              state.loading = DataStatus.SUCCEEDED;
              state.error = null;
            })
            .addCase(deletePermissionRolesAsync.rejected, (state, action) => {
              state.loading = DataStatus.FAILED;
              state.data = [];
              if (typeof action.payload === "string") {
                state.error = action.payload || {
                  message: "Failed to delete permission roles",
                };
              } else {
                state.error = null;
              }
            });
  },
});
export default permissionSlice.reducer;
