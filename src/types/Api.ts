// src/types/api.ts

// ساختار پاسخ صفحه‌بندی شده از API
export interface PaginatedResponse<T> {
  data: T[]; // آرایه‌ای از آیتم‌ها

  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    first_page_url: string | null;
    last_page_url: string | null;
  };
}

// ساختار خطاهای اعتبارسنجی از API (معمولاً در پاسخ 422 Validation Error)
export interface ValidationErrors {
  message: string; // پیام کلی خطا (مانند "The given data was invalid.")
  errors: {
    [key: string]: string[]; // آبجکتی که کلید آن نام فیلد و مقدار آن آرایه‌ای از پیام‌های خطا است
  };
}

// تایپ Union برای انواع خطاهای API
export type ApiError = string | ValidationErrors | { message: string } | Error;
