import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";

export const createRoleAsync = createAsyncThunk(
  "role/createRole",
  async (role: string) => {
    try {
      const response = await api.post("/roles", {
        name: role,
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
export const editRoleAsync = createAsyncThunk(
  "role/editRole",
  async ({ roleId, roleName }: { roleId: number; roleName: string }) => {
    try {
      const response = await api.put(`/roles/${roleId}`, {
        name: roleName,
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
export const fetchRolesAsync = createAsyncThunk(
  "role/fetchRoles",
  async ({
    page = "1",
    perPage = "10",
  }: {
    page?: string;
    perPage?: string;
  }) => {
    try {
      const response = await api.get("/roles", {
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
export const assignRolePermissionsAsync = createAsyncThunk(
  "role/assignPermissions",
  async ({
    roleId,
    permissionIds,
  }: {
    roleId: number;
    permissionIds: number[];
  }) => {
    try {
      const response = await api.post(`/roles/${roleId}/assign-permissions`, {
        permissionIds: permissionIds,
      });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
export const deleteRolePermissionsAsync = createAsyncThunk(
  "role/revokePermissions",
  async (
    {
      roleId,
      permissionIds,
    }: {
      roleId: number;
      permissionIds: Set<number>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(`/roles/${roleId}/revoke-permissions`, {
        data: { permissionIds: Array.from(permissionIds) },
      });

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({ message: axiosError.message });
    }
  }
);
export const checkRoleNameIsUniqueAsync = createAsyncThunk(
  "role/checkRoleNameIsUnique",
  async (roleName: string) => {
    try {
      const response = await api.get(`/roles/role-name-is-unique/${roleName}`);
      return response.data == 1 ? true : false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      return axiosError.response?.data || { message: axiosError.message };
    }
  }
);
