import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { CreateTags, DeleteTags } from "@/types/Tag";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getTagsAsync = createAsyncThunk(
  "tag/getTags",
  async (
    {
      page = "1",
      perPage = "10",
      search = "",
    }: {
      page?: string;
      perPage?: string;
      search?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/tags", {
        params: {
          page: page,
          per_page: perPage,
          search: search,
        },
      });
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای دریافت کاربران",
      });
    }
  }
);
export const createTagsAsync = createAsyncThunk(
  "tag/createTags",
  async (tags: CreateTags, { rejectWithValue }) => {
    try {
      const response = await api.post("/tags/store", tags);
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ایجاد هشتگ",
      });
    }
  }
);
export const deleteTagsAsync = createAsyncThunk(
  "tag/deleteTags",
  async (tagIds: DeleteTags, { rejectWithValue }) => {
    try {
      const response = await api.delete("/tags/", { data: {  tagIds },});
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای حدف هشتگ",
      });
    }
  }
);
export const isTagUniqueAsync = createAsyncThunk(
  "tag/isTagUnique",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tags/tag-name-is-unique/${title}`);
      return { isUnique: response };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای بررسی یکتایی هشتگ",
      });
    }
  }
);
