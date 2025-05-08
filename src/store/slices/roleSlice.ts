import { DataStatus } from "@/constants/data/DataStatus";
import { RoleState } from "@/constants/state/Role";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRolesAsync } from "../thunks/roleThunk";
import { Role } from "@/types/Role";
const initialState: RoleState = {
  data: [],
  loading: DataStatus.IDLE,
  error: null,
};
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        // Don't clear error immediately, might be useful from previous action
      })
      .addCase(
        fetchRolesAsync.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          state.loading = DataStatus.SUCCEEDED;
          state.data = action.payload;
          state.error = null; // Clear error on successful fetch
        }
      )
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch roles" };
        } else {
          state.error = null;
        }
      });
  },
});
export default roleSlice.reducer;
