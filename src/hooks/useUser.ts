import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPermissionUsersAsync, fetchRoleUsersAsync, getUsersAsync } from "@/store/thunks/userThunk";
import { useCallback } from "react";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const {
    data: users,
    meta: meta,
    loading,
    error,
  } = useAppSelector((state) => state.users);

 const fetchUsers = useCallback(
    (page?: string, perPage?: string) => {
      try {
        return dispatch(getUsersAsync({ page, perPage })).unwrap();
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
    [dispatch]
  );

  const fetchRoleUsers = useCallback(
    (roleId: number, perPage?: string, page?: string) => {
      dispatch(fetchRoleUsersAsync({ roleId, perPage, page }));
    },
    [dispatch]
  );
  const fetchPermissionUsers = useCallback(
    (permissionId: number, perPage?: string, page?: string) => {
      dispatch(fetchPermissionUsersAsync({ permissionId, perPage, page }));
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
      fetchPermissionUsers,
      fetchUsers
    },
  };
};
