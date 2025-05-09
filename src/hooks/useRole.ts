import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { fetchRolesAsync } from "@/store/thunks/roleThunk";

export const useRole = () => {
  const dispatch = useAppDispatch();
  const {
    data: roles,
    meta: meta,
    loading,
    error,
  } = useAppSelector((state) => state.roles);
  const fetchRoles = useCallback(
    (page?: string, perPage?: string) => {
      dispatch(fetchRolesAsync({ page, perPage }));
    },
    [dispatch]
  );
  return {
    roles,
    meta,
    error,
    loading,
    actions: {
      fetchRoles,
    },
  };
};
