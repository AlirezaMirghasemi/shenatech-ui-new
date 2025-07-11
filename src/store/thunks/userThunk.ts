import { UserStatus } from "@/constants/data/UserStatus";
import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";
import { CreateUser, EditUser } from "@/types/User";
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

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (
    { user, profileImage }: { user: CreateUser; profileImage?: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key !== "profile_image" && value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }
      const response = await api.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ایجاد کاربر",
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
export const checkFieldIsUniqueAsync = createAsyncThunk<
  boolean,
  { fieldValue: string; fieldName: string },
  { rejectValue: ApiError }
>(
  "user/checkFieldIsUniqueAsync",
  async (
    { fieldName: fieldName, fieldValue: fieldValue },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/users/field-is-unique", {
        params: {
          fieldName: fieldName,
          fieldValue: fieldValue,
        },
      });
      return response.data == 1 ? true : false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای چک کردن یکتایی فیلد",
      });
    }
  }
);
export const editUserStatusAsync = createAsyncThunk(
  "user/editUserStatus",
  async (
    { userId, status }: { userId: number; status: UserStatus },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/users/${userId}/status`, { status });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ویرایش وضعیت کاربر",
      });
    }
  }
);
export const editUserAsync = createAsyncThunk(
  "user/editUser",
  async (
    {
      userId,
      user,
      profileImage,
    }: { userId: number; user: EditUser; profileImage?: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key !== "profile_image" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await api.postForm(`/users/${userId}`, formData);
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ویرایش کاربر",
      });
    }
  }
);
export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (
    {
      userId,
      removeProfilePicture,
    }: { userId: number; removeProfilePicture: boolean },
    { rejectWithValue }
  ) => {
    try {
        console.log("removeProfilePicture", removeProfilePicture);
      const response = await api.post(`/users/delete/${userId}`, {
        removeProfilePicture: removeProfilePicture,
      });
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای حذف کاربر",
      });
    }
  }
);
export const fetchUnAssignedRoleUsersAsync = createAsyncThunk(
  "user/fetchUnAssignedRoleUsers",
  async ({ roleId }: { roleId: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${roleId}/roles/unassigned`);
      return {
        data: response.data.data,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(
        axiosError.response?.data || { message: axiosError.message }
      );
    }
  }
);
