import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTagsAsync } from "@/store/thunks/tagThunk";
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
  return {
    tags,
    meta,
    error,
    loading,
    uniqueLoading,
    actions: {
      fetchTags,
    },
  };
};
