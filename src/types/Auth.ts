// src/types/auth.ts
import { User } from "./User";

export interface AuthResponse {
  user: User;
  token: string;
  message?: string; // پیام اختیاری در پاسخ لاگین/ثبت نام
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password_confirmation: string; // فیلد تایید پسورد
}
