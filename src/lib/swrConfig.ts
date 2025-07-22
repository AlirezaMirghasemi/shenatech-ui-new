import { SWRConfiguration } from "swr";
import { ApiError } from "@/types/Api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const SANCTUM_URL = process.env.NEXT_PUBLIC_LARAVEL_URL!;

const getCookie = (name: string): string | undefined => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];
};

export const fetcher = async (url: string, params?: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  const fullUrl = query ? `${BASE_URL}${url}?${query}` : `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData as ApiError;
  }

  return response.json();
};

export const mutator = async (
  url: string,
  method: "POST" | "DELETE" | "PUT",
  data?: object
) => {
  // Step 1: Get CSRF cookie
  const csrfResponse = await fetch(`${SANCTUM_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });

  if (!csrfResponse.ok) {
    throw new Error("Failed to get CSRF token");
  }

  // Step 2: Extract XSRF-TOKEN from cookies

  const xsrfToken = getCookie("XSRF-TOKEN") || "";

  // Step 3: Prepare headers
  const headers: HeadersInit = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-XSRF-TOKEN": xsrfToken,
  };

  // Add Content-Type only for requests with body
  if (data) {
    headers["Content-Type"] = "application/json";
  }

  // Step 4: Send main request
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
  });

  // Step 5: Handle response
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "Unknown error occurred" };
    }

    if (response.status === 401 || response.status === 419) {
      window.location.assign(
        `/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`
      );
    }

    throw errorData as ApiError;
  }

  // Step 6: Handle empty responses (e.g., for DELETE)
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  onError: (error: Error) => {
    console.error("خطا در SWR:", error);
  },
};
