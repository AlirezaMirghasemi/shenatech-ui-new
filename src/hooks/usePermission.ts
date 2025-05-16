import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPermissionsAsync,
  fetchRoleNotPermissionsAsync,
  fetchRolePermissionsAsync,
} from "@/store/thunks/permissionThunk";
import { useCallback } from "react";

export const usePermission = () => {
  const dispatch = useAppDispatch();
  const {
    data: permissions,
    assigned,
    unassigned,
    meta:meta,
    loading,
    error,
  } = useAppSelector((state) => state.permissions);
  const fetchPermissions = useCallback(
    (page?: string, perPage?: string) => {
      try {
        return dispatch(fetchPermissionsAsync({ page, perPage })).unwrap();
      } catch (error) {
        console.error("Error fetching permissions:", error);
        return [];
      }
    },
    [dispatch]
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
    permissions,
    meta,
    error,
    loading,
    actions: {
      fetchPermissions,
      fetchRolePermissions,
      fetchRoleNotPermissions,
    },
  };
};
