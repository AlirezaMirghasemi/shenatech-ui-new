import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  checkPermissionNameIsUniqueAsync,
  createPermissionAsync,
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
    meta: meta,
    loading,
    error,
    uniqueLoading,
  } = useAppSelector((state) => state.permissions);
  const createPermission = useCallback(
    (permissionName: string) => {
      try {
        return dispatch(createPermissionAsync(permissionName)).unwrap();
      } catch (error) {
        console.error("Error creating permission:", error);
        return null;
      }
    },
    [dispatch]
  );
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
  const permissionNameIsUnique = useCallback(
    async (permissionName: string): Promise<boolean> => {
      try {
        const result = await dispatch(
          checkPermissionNameIsUniqueAsync(permissionName)
        ).unwrap();
        return result as boolean;
      } catch (error) {
        console.error("Error checking permission name uniqueness:", error);
        return false;
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
    uniqueLoading,
    actions: {
      createPermission,
      fetchPermissions,
      fetchRolePermissions,
      fetchRoleNotPermissions,
      permissionNameIsUnique,
    },
  };
};
