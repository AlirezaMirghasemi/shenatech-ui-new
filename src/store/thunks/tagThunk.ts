import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getTagsAsync = createAsyncThunk(
  "tag/getTags",
  async (
    {
      page = "1",
      perPage = "10",
    }: {
      page?: string;
      perPage?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/tags", {
        params: {
          page: page,
          per_page: perPage,
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
