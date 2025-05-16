import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchPermissionsAsync = createAsyncThunk(
  "permission/fetchPermissions",
  async (
    { perPage = "10", page = "1" }: { perPage?: string; page?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/permissions", {
        params: {
          per_page: perPage,
          page: page,
        },
      });
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای دریافت مجوز ها",
      });
    }
  }
);

export const fetchRolePermissionsAsync = createAsyncThunk(
  "role/fetchRolePermissions",
  async (
    {
      roleId,
      perPage = "10",
      page = "1",
    }: {
      roleId: number;
      perPage?: string;
      page?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/roles/${roleId}/permissions`, {
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
        message: axiosError.message || "خطای دریافت مجوز های نقش",
      });
    }
  }
);
export const fetchRoleNotPermissionsAsync = createAsyncThunk(
  "role/fetchRoleNotPermissions",
  async ({ roleId }: { roleId: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/roles/${roleId}/not-permissions`);
      return {
        data: response.data.data,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message:
          axiosError.message || "خطای دریافت مجوز های تخصیص داده نشده به نقش",
      });
    }
  }
);
