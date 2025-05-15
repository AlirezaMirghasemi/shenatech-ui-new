import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchRolePermissionsAsync = createAsyncThunk(
  "role/fetchRolePermissions",
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
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
export const fetchRoleNotPermissionsAsync = createAsyncThunk(
  "role/fetchRoleNotPermissions",
  async ({ roleId }: { roleId: number }) => {
    try {
      const response = await api.get(`/roles/${roleId}/not-permissions`);
      return {
        data: response.data.data,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
