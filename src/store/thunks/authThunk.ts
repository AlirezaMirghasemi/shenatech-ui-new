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
    return rejectWithValue(
      axiosError.response?.data || { message: axiosError.message }
    );
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
    return rejectWithValue(
      axiosError.response?.data || { message: axiosError.message }
    );
  }
});

export const logoutUser = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: ApiError }
>('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/logout');
    document.cookie = 'laravel_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/admin/login';
    return response.data; // شامل { message }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data || { message: axiosError.message }
    );
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
    if ([401, 419].includes(axiosError.response?.status ?? 0)) {
      return rejectWithValue({ message: 'Unauthorized' });
    }
    return rejectWithValue(
      axiosError.response?.data || { message: axiosError.message }
    );
  }
});
