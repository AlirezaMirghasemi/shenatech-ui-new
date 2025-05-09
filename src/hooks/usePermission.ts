import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRolePermissionsAsync } from "@/store/thunks/permissionThunk";
import { useCallback } from "react";

export const usePermission = () => {
  const dispatch = useAppDispatch();
  const {
    data: permissions,
    meta: meta,
    loading,
    error,
  } = useAppSelector((state) => state.permissions);
  const fetchRolePermissions = useCallback(
    (roleId: number, perPage?: string, page?: string) => {
      dispatch(fetchRolePermissionsAsync({ roleId, perPage, page }));
    },
    [dispatch]
  );
  return {
    permissions,
    meta,
    error,
    loading,
    actions: {
      fetchRolePermissions,
    },
  };
};
