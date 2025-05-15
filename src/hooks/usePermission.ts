import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRoleNotPermissionsAsync,
  fetchRolePermissionsAsync,
} from "@/store/thunks/permissionThunk";
import { useCallback } from "react";

export const usePermission = () => {
  const dispatch = useAppDispatch();
  const { assigned, unassigned, meta, loading, error } = useAppSelector(
    (state) => state.permissions
  );

  const fetchRolePermissions = useCallback(
    async (roleId: number, perPage?: string, page?: string) => {
      try {
        return await dispatch(
          fetchRolePermissionsAsync({ roleId, perPage, page })
        ).unwrap();
      } catch (error) {
        console.error("Error fetching role permissions:", error);
        return [];
      }
    },
    [dispatch]
  );

  const fetchRoleNotPermissions = useCallback(
    async (roleId: number) => {
      try {
        return await dispatch(
          fetchRoleNotPermissionsAsync({ roleId })
        ).unwrap();
      } catch (error) {
        console.error("Error fetching role not permissions:", error);
        return [];
      }
    },
    [dispatch]
  );

  return {
    assigned,
    unassigned,
    meta,
    error,
    loading,
    actions: {
      fetchRolePermissions,
      fetchRoleNotPermissions,
    },
  };
};
