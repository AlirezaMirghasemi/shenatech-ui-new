import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/thunks/authThunk";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const SANCTUM_URL = process.env.NEXT_PUBLIC_LARAVEL_URL!;

// ایجاد نمونه axios با تنظیمات پایه
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // فعال‌سازی انتقال کوکی‌ها
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name))
    ?.split('=')[1];
};

export default function axiosInstance(dispatch: AppDispatch) {
  // Interceptor برای مدیریت درخواست‌ها
  api.interceptors.request.use(async (config) => {
    if (!['get', 'head'].includes(config.method!.toLowerCase())) {
      await axios.get(`${SANCTUM_URL}/sanctum/csrf-cookie`);
      config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
    }
    return config;
  });

  // Interceptor برای مدیریت پاسخ‌ها
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalConfig = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if ((status === 401 || status === 419) && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await dispatch(logoutUser()).unwrap();
        } catch (err) {
          console.error("Logout failed:", err);
        }

        window.location.assign(
          `/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );

        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
}

export { api };
