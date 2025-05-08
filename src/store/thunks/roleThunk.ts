import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '@/lib/axiosInstance';
import { ApiError } from '@/types/Api';

export const fetchRolesAsync = createAsyncThunk('role/fetchRoles', async () => {
  try {
    const response = await api.get('/roles');
    return response.data.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiError>;
    return (
      axiosError.response?.data || { message: axiosError.message }
    );
  }
});
