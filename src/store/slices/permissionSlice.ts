import { DataStatus } from "@/constants/data/DataStatus";
import { createSlice } from "@reduxjs/toolkit";
import { PaginatedResponse } from "@/types/Api";
import { Permission } from "@/types/Permission";
import { PermissionState } from "@/constants/state/Permission";
import { fetchRolePermissionsAsync } from "../thunks/permissionThunk";
const initialState: PermissionState = {
  data: [],
  meta: {} as PaginatedResponse<Permission>,
  loading: DataStatus.IDLE,
  error: null,
};
const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolePermissionsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(
        fetchRolePermissionsAsync.fulfilled,
        (state, action) => {
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
        }
      )
      .addCase(fetchRolePermissionsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch Permissions" };
        } else {
          state.error = null;
        }
      })
  },
});
export default permissionSlice.reducer;
