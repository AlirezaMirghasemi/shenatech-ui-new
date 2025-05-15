// src/types/api.ts

// ساختار پاسخ صفحه‌بندی شده از API
export interface PaginatedResponse<T> {
    data: T[]; // آرایه‌ای از آیتم‌ها
    current_page: string;
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: string;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  }

  // ساختار خطاهای اعتبارسنجی از API (معمولاً در پاسخ 422 Validation Error)
  export interface ValidationErrors {
    message: string; // پیام کلی خطا (مانند "The given data was invalid.")
    errors: {
      [key: string]: string[]; // آبجکتی که کلید آن نام فیلد و مقدار آن آرایه‌ای از پیام‌های خطا است
    };
  }

  // تایپ Union برای انواع خطاهای API
  export type ApiError = string | ValidationErrors | { message: string };
