import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createTagsAsync,
  getTagsAsync,
  isTagUniqueAsync,
} from "@/store/thunks/tagThunk";
import { CreateTags } from "@/types/Tag";
import { useCallback } from "react";

export const useTag = () => {
  const dispatch = useAppDispatch();
  const {
    data: tags,
    meta: meta,
    loading,
    error,
    uniqueLoading,
  } = useAppSelector((state) => state.tags);
  const fetchTags = useCallback(
    (page?: string, perPage?: string) => {
      try {
        return dispatch(getTagsAsync({ page, perPage })).unwrap();
      } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
      }
    },
    [dispatch]
  );
  const createTags = useCallback(
    (tags: CreateTags) => {
      try {
        return dispatch(createTagsAsync(tags)).unwrap();
      } catch (error) {
        console.error("Error creating tags:", error);
        return [];
      }
    },
    [dispatch]
  );
  const isTagUnique = useCallback(
    async ({ title }: { title: string }): Promise<boolean> => {
      try {
        const result = await dispatch(isTagUniqueAsync(title)).unwrap();
        return result.isUnique as boolean;
      } catch (error) {
        console.error("Error checking tag title uniqueness:", error);
        return false;
      }
    },
    [dispatch]
  );

  return {
    tags,
    meta,
    error,
    loading,
    uniqueLoading,
    actions: {
      fetchTags,
      createTags,
      isTagUnique,
    },
  };
};
