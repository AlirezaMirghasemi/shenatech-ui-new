import axios from "axios";
//import type { AppDispatch } from "@/store/store";
// import { logoutUser } from "@/store/thunks/authThunk";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const SANCTUM_URL = process.env.NEXT_PUBLIC_LARAVEL_URL!;

// instance اولیه
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

export default function axiosInstance(
   // dispatch: AppDispatch
) {
  api.interceptors.request.use(async (config) => {
    await axios.get(`${SANCTUM_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
    return config;
  });

//   api.interceptors.response.use(
//     (res) => res,
//     async (error: AxiosError) => {
//       const status = error.response?.status;
//       const originalConfig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

//       if ((status === 401 || status === 419) && !originalConfig._retry) {
//         originalConfig._retry = true; // جلوگیری از loop :contentReference[oaicite:13]{index=13}
//         await dispatch(logoutUser()).unwrap(); // dispatch logout :contentReference[oaicite:14]{index=14}
//         window.location.assign(`/auth/admin/login`);
//         return Promise.resolve(error.response);
//       }
//       return Promise.reject(error);
//     }
//   );
}

export { api };
