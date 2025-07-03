import { DataStatus } from "@/constants/data/DataStatus";
import { PaginatedResponse } from "@/types/Api";
import { Tag } from "@/types/Tag";
import { createSlice } from "@reduxjs/toolkit";
import { getTagsAsync } from "../thunks/tagThunk";
import { TagState } from "@/constants/state/Tag";

const initialState: TagState = {
  data: [],
  meta: {} as PaginatedResponse<Tag>,
  loading: DataStatus.IDLE,
  error: null,
  uniqueLoading: DataStatus.IDLE,
};
const TagSlice = createSlice({
  name: "Tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
      })
      .addCase(getTagsAsync.fulfilled, (state, action) => {
        state.loading = DataStatus.SUCCEEDED;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          "data" in action.payload &&
          "meta" in action.payload
        ) {
          state.data = action.payload.data as Tag[];
          state.meta = action.payload.meta as PaginatedResponse<Tag>;
          state.error = null;
        } else {
          state.data = [];
          state.meta = {} as PaginatedResponse<Tag>;
          state.error = { message: "Invalid response format" };
        }
      })
      .addCase(getTagsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        state.data = [];
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to fetch Tags" };
        } else {
          state.error = null;
        }
      });
  },
});
export default TagSlice.reducer;
