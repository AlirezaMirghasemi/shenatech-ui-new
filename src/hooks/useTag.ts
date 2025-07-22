import useSWR, { mutate, SWRResponse } from "swr";
import { fetcher, mutator, swrConfig } from "@/lib/swrConfig";
import { PaginatedResponse, ApiError } from "@/types/Api";
import { Tag, CreateTags, DeleteTags } from "@/types/Tag";
import { DataStatus } from "@/constants/data/DataStatus";
import { useCallback, useState } from "react";

export const useTag = () => {
  const [params, setParams] = useState({
    page: "1",
    perPage: "5",
    search: "",
  });

  const getTagsKey = useCallback(() => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.perPage) query.set("per_page", params.perPage);
    if (params.search) query.set("search", params.search);
    return `/tags?${query.toString()}`;
  }, [params]);

  const {
    data: tagsResponse,
    error: tagsError,
    isLoading: isTagsLoading,
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
      try {
        const newTag = await mutator("/tags/store", "POST", tags);
        mutate((key: string) => key.startsWith("/tags"), undefined, {
          revalidate: true,
        });
        return newTag;
      } catch (err) {
        console.error("خطا در ایجاد تگ‌ها:", err);
        throw err as ApiError;
      }
    },
    [mutate]
  );

  const deleteTags = useCallback(
    async (tagIds: DeleteTags) => {
      try {
        await mutator("/tags/", "DELETE", { tagIds });
        mutateTags((currentData) => {
          if (!currentData) return currentData;
          const newData = currentData.data.filter(
            (tag) => !tagIds.ids.includes(tag.id)
          );
          return {
            ...currentData,
            data: newData,
            total: currentData.meta.total - tagIds.ids.length,
          };
        }, true);
      } catch (err) {
        console.error("خطا در حذف تگ‌ها:", err);
        throw err as ApiError;
      }
    },
    [mutateTags]
  );

  const isTagUnique = useCallback(async (title: string): Promise<boolean> => {
    try {
      const response = await fetcher(`/tags/tag-name-is-unique/${title}`);
      return response.isUnique;
    } catch (err) {
      console.error("خطا در بررسی یکتا بودن تگ:", err);
      return false;
    }
  }, []);

  const fetchTags = useCallback(
    async (newParams: { search?: string; page?: string; perPage?: string }) => {
      setParams((prev) => ({ ...prev, ...newParams }));
      await mutateTags();
    },
    [mutateTags, setParams]
  );

  return {
    tags: tagsResponse?.data || [],
    meta: tagsResponse || ({} as PaginatedResponse<Tag>),
    error:
      tagsError && typeof tagsError === "object"
        ? { message: tagsError.message }
        : null,
    loading: isTagsLoading ? DataStatus.PENDING : DataStatus.SUCCEEDED,
    uniqueLoading: DataStatus.IDLE,
    actions: {
      fetchTags,
      createTags,
      deleteTags,
      isTagUnique,
    },
    mutate: mutateTags, // افزودن mutate به خروجی
  };
};
