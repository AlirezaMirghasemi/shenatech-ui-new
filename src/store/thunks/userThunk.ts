import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export const getUsersAsync = createAsyncThunk(
  "user/getUsers",
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
      const response = await api.get("/users", {
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
export const fetchRoleUsersAsync = createAsyncThunk(
  "role/fetchRoleUsers",
  async ({
    roleId,
    perPage = "10",
    page = "1",
  }: {
    roleId: number;
    perPage?: string;
    page?: string;
  }) => {
    try {
      const response = await api.get(`/roles/${roleId}/users`, {
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
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
export const fetchPermissionUsersAsync = createAsyncThunk(
  "permission/fetchPermissionUsers",
  async ({
    permissionId,
    perPage = "10",
    page = "1",
  }: {
    permissionId: number;
    perPage?: string;
    page?: string;
  }) => {
    try {
      const response = await api.get(`/permissions/${permissionId}/users`, {
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
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
