import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";

export const createRoleAsync = createAsyncThunk(
  "role/createRole",
  async (role: string, { rejectWithValue }) => {
    try {
      const response = await api.post("/roles", {
        name: role,
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ایجاد نقش",
      });
    }
  }
);

export const editRoleAsync = createAsyncThunk(
  "role/editRole",
  async (
    { roleId, roleName }: { roleId: number; roleName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/roles/${roleId}`, {
        name: roleName,
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ویرایش نقش",
      });
    }
  }
);
export const deleteRoleAsync = createAsyncThunk(
  "role/deleteRole",
  async (roleId: number | null, { rejectWithValue }) => {
    try {
      if (roleId) {
        const response = await api.delete(`/roles/${roleId}`);
        return response.data.data;
      } else {
        throw new Error("شناسه نقش یافت نشد!");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای حذف نقش",
      });
    }
  }
);
export const fetchRolesAsync = createAsyncThunk(
  "role/fetchRoles",
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
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای دریافت نقش",
      });
    }
  }
);
export const assignRolePermissionsAsync = createAsyncThunk(
  "role/assignPermissions",
  async (
    {
      roleId,
      permissionIds,
    }: {
      roleId: number;
      permissionIds: number[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/roles/${roleId}/assign-permissions`, {
        permissionIds: permissionIds,
      });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای تخصیص مجوز به نقش",
      });
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
      return rejectWithValue({
        message: axiosError.message || "خطای حذف مجوز از نقش",
      });
    }
  }
);
export const checkRoleNameIsUniqueAsync = createAsyncThunk(
  "role/checkRoleNameIsUnique",
  async (roleName: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/roles/role-name-is-unique/${roleName}`);
      return response.data == 1 ? true : false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای چک کردن یکتایی نقش",
      });
    }
  }
);
export const fetchPermissionRolesAsync = createAsyncThunk(
  "role/fetchPermissionRoles",
  async (
    {
      permissionId,
      perPage = "10",
      page = "1",
    }: {
      permissionId: number;
      perPage?: string;
      page?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/permissions/${permissionId}/roles`, {
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
        message: axiosError.message || "خطای دریافت نقش های مجوز",
      });
    }
  }
);
export const assignRoleToUsersAsync = createAsyncThunk(
  "role/assignRoleToUsers",
  async (
    { roleId, userIds }: { roleId: number; userIds: number[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/roles/${roleId}/assign-users`, {
        userIds: userIds,
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای تخصیص نقش به کاربران",
      });
    }
  }
);
export const deleteUsersFromRoleAsync = createAsyncThunk(
  "role/deleteUsersFromRole",
  async (
    {
      roleId,
      userIds,
    }: {
      roleId: number;
      userIds: Set<number>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(`/roles/${roleId}/revoke-users`, {
        data: { userIds: Array.from(userIds) },
      });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای حذف کاربران از نقش",
      });
    }
  }
);
