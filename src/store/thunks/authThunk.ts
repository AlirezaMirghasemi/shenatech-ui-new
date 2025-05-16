import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '@/lib/axiosInstance';
import { ApiError } from '@/types/Api';
import { LoginCredentials, RegisterCredentials } from '@/types/Auth';
import { User } from '@/types/User';

export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ApiError }
>('auth/login', async (loginCredentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', loginCredentials);
    // پاسخ به صورت { data: UserResource } بسته‌بندی شده است
    return response.data.data;
  } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ورود"
      });
    }
});

export const registerUser = createAsyncThunk<
  { message: string; data: User },
  RegisterCredentials,
  { rejectValue: ApiError }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // شامل { message, data }
  } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای ایجاد کاربر"
      });
    }
});

export const logoutUser = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: ApiError }
>('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/logout');

    return response.data;
  } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای خروج کاربر"
      });
    }
});

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: ApiError }
>('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/user');
    return response.data.data;
  } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({
        message: axiosError.message || "خطای دریافت کاربر "
      });
    }
});
