import useSWR, { mutate, SWRResponse } from "swr";
import { fetcher, mutator, swrConfig } from "@/lib/swrConfig";
import { PaginatedResponse, ApiError } from "@/types/Api";
import { Tag, CreateTags, DeleteTags } from "@/types/Tag";
import { useCallback, useState } from "react";

export const useTag = () => {
  const [params, setParams] = useState({
    page: "1",
    perPage: "5",
    search: "",
  });
  // وضعیت‌های بارگذاری برای عملیات مختلف
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const getTagsKey = useCallback(() => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.perPage) query.set("per_page", params.perPage);
    if (params.search) query.set("search", params.search);
    return `/tags?${query.toString()}`;
  }, [params]);

  const {
    data: tags,
    error: tagsError,
    isLoading: loading,
    mutate: mutateTags,
  }: SWRResponse<PaginatedResponse<Tag>, ApiError> = useSWR(
    getTagsKey(),
    fetcher,
    {
      ...swrConfig,
      keepPreviousData: true,
    }
  );
  const createTags = useCallback(
    async (tags: CreateTags) => {
      setIsCreating(true);
      try {
        const newTag = await mutator("/tags/store", "POST", tags);
        mutate((key: string) => key.startsWith("/tags"), undefined, {
          revalidate: true,
        });
        return newTag;
      } catch (err) {
        console.error("خطا در ایجاد تگ‌ها:", err);
        throw err as ApiError;
      } finally {
        setIsCreating(false);
      }
    },
    [mutate]
  );

  const deleteTags = useCallback(
    async (tagIds: DeleteTags) => {
      setIsDeleting(true);
      try {
        await mutator("/tags/", "DELETE", { tagIds });

        mutate((key: string) => key.startsWith("/tags"), undefined, {
          revalidate: true,
        });
      } catch (err) {
        console.error("خطا در حذف تگ‌ها:", err);
        throw err as ApiError;
      } finally {
        setIsDeleting(false);
      }
    },
    [mutate] // اضافه کردن mutate به وابستگی‌ها
  );

const restoreTags = useCallback(
    async (tagIds:  number[]) => {
      setIsEditing(true);
      try {
        await mutator("/tags/restores", "POST", { tagIds });
        mutate((key: string) => key.startsWith("/tags"), undefined, {
          revalidate: true,
        });
      } catch (err) {
        console.error("خطا در بازیابی تگ‌ها:", err);
        throw err as ApiError;
      } finally {
        setIsEditing(false);
      }
    },
    [mutate] // اضافه کردن mutate به وابستگی‌ها
  );

  const isTagUnique = useCallback(async (title: string): Promise<boolean> => {
    setIsCheckingUniqueness(true);
    try {
      const response = await fetcher(`/tags/tag-name-is-unique/${title}`);
      return response.isUnique;
    } catch (err) {
      console.error("خطا در بررسی یکتا بودن تگ:", err);
      return false;
    } finally {
      setIsCheckingUniqueness(false);
    }
  }, []);

  const fetchTags = useCallback(
    async (newParams: { search?: string; page?: string; perPage?: string }) => {
      setIsFetching(true); // شروع دریافت داده‌ها
      try {
        const shouldResetPage =
          newParams.search !== undefined && newParams.search !== params.search;

        setParams((prev) => ({
          ...prev,
          ...newParams,
          page: shouldResetPage ? "1" : newParams.page || prev.page,
        }));
        await mutateTags();
      } catch (error) {
        console.error("خطا در دریافت تگ‌ها:", error);
      } finally {
        setIsFetching(false); // پایان دریافت داده‌ها
      }
    },
    [mutateTags, setParams, params.search]
  );

  return {
    tags: tags?.data || [],
    meta: tags || ({} as PaginatedResponse<Tag>),
    error:
      tagsError && typeof tagsError === "object"
        ? { message: tagsError.message }
        : null,
    loading: loading || isFetching,
    actions: {
      fetchTags,
      createTags,
      deleteTags,
      isTagUnique,
      restoreTags
    },
    statuses: {
      isCreating,
      isDeleting,
      isCheckingUniqueness,
      isFetching,
      isEditing
    },
    mutate: mutateTags, // افزودن mutate به خروجی
  };
};
