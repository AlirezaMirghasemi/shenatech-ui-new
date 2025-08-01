import { DataStatus } from "@/constants/data/DataStatus";
import { PaginatedResponse } from "@/types/Api";
import { Tag } from "@/types/Tag";
import { createSlice } from "@reduxjs/toolkit";
import {
  createTagsAsync,
  deleteTagsAsync,
  getTagsAsync,
  isTagUniqueAsync,
} from "../thunks/tagThunk";
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
      })
      .addCase(createTagsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
      })
      .addCase(createTagsAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(createTagsAsync.rejected, (state, action) => {
        state.loading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || { message: "Failed to create Tags" };
        } else {
          state.error = null;
        }
      })
      .addCase(deleteTagsAsync.pending, (state) => {
        state.loading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(deleteTagsAsync.fulfilled, (state) => {
        state.loading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(deleteTagsAsync.rejected, (state, action) => {
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
      .addCase(isTagUniqueAsync.pending, (state) => {
        state.uniqueLoading = DataStatus.PENDING;
        state.error = null;
      })
      .addCase(isTagUniqueAsync.fulfilled, (state) => {
        state.uniqueLoading = DataStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(isTagUniqueAsync.rejected, (state, action) => {
        state.uniqueLoading = DataStatus.FAILED;
        if (typeof action.payload === "string") {
          state.error = action.payload || {
            message: "Failed to check tag uniqueness",
          };
        } else {
          state.error = null;
        }
      });
  },
});

export default TagSlice.reducer;
