import { DataStatus } from "@/constants/data/DataStatus";
import { createSlice } from "@reduxjs/toolkit";
import { PaginatedResponse } from "@/types/Api";
import { User } from "@/types/User";
import { UserState } from "@/constants/state/User";
import { fetchRoleUsersAsync } from "../thunks/userThunk";
const initialState: UserState = {
  data: [],
  meta: {} as PaginatedResponse<User>,
  loading: DataStatus.IDLE,
  error: null,
};
const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});
export default UserSlice.reducer;
