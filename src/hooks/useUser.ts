import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRoleUsersAsync } from "@/store/thunks/userThunk";
import { useCallback } from "react";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const {
    data: users,
    meta: meta,
    loading,
    error,
  } = useAppSelector((state) => state.users);
  const fetchRoleUsers = useCallback(
    (roleId: number, perPage?: string, page?: string) => {
      dispatch(fetchRoleUsersAsync({ roleId, perPage, page }));
    },
    [dispatch]
  );
  return {
    users,
    meta,
    error,
    loading,
    actions: {
      fetchRoleUsers,
    },
  };
};
