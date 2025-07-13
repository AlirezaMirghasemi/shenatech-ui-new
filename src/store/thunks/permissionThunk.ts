import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createPermissionAsync = createAsyncThunk(
  "permission/createPermission",
  async (permission: string, { rejectWithValue }) => {
    try {
      const response = await api.post("/permissions", {
        name: permission,
      });

      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ایجاد مجوز",
      });
    }
  }
);

export const checkPermissionNameIsUniqueAsync = createAsyncThunk(
  "permission/checkPermissionNameIsUnique",
  async (permissionName: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/permissions/permission-name-is-unique/${permissionName}`
      );
      return response.data == 1 ? true : false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای چک کردن یکتایی مجوز",
      });
    }
  }
);
export const deletePermissionsAsync = createAsyncThunk(
  "permission/deletePermissions",
  async (permissionIds: number[] | null, { rejectWithValue }) => {
    try {
      if (permissionIds) {
        const response = await api.delete(`/permissions`, {
          data: { permissionIds: permissionIds },
        });
        return response.data.data;
      } else {
        throw new Error("شناسه مجوز یافت نشد!");
      }
    } catch (error: unknown) {
      console.log("error");
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای حذف مجوز",
      });
    }
  }
);
export const fetchPermissionsAsync = createAsyncThunk(
  "permission/fetchPermissions",
  async (
    { search="",perPage = "10", page = "1" }: { search?: string;perPage?: string; page?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/permissions", {
        params: {
          search: search,
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

export const deletePermissionRolesAsync = createAsyncThunk(
  "role/revokeRoles",
  async (
    {
      permissionId,
      roleIds,
    }: {
      permissionId: number;
      roleIds: Set<number>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(
        `/permissions/${permissionId}/revoke-roles`,
        {
          data: { roleIds: Array.from(roleIds) },
        }
      );

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای حذف نقش از مجوز",
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
