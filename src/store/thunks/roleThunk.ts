import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "@/lib/axiosInstance";
import { ApiError } from "@/types/Api";

export const fetchRolesAsync = createAsyncThunk("role/fetchRoles", async ({page="1",perPage="10"}:{page?:string,perPage?:string}) => {
  try {
    const response = await api.get("/roles",{
        params:{
            page:page,
            per_page:perPage
        }
    });
    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.data || { message: axiosError.message };
  }
});
