import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  checkPermissionNameIsUniqueAsync,
  createPermissionAsync,
  deletePermissionRolesAsync,
  deletePermissionsAsync,
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
        throw error;
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
        throw error;
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
        throw error;
      }
    },
    [dispatch]
  );
 const deletePermissionRoles = useCallback(
    (permissionId: number, roleIds: Set<number>) => {
      try {
        return dispatch(
          deletePermissionRolesAsync({ permissionId, roleIds })
        ).unwrap();
      } catch (error) {
        console.error(
          "Error deleting permission roles for permissionId:",
          permissionId,
          error
        );
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
        throw error;
      }
    },
    [dispatch]
  );
  const deletePermission = useCallback(
    async (permissionIds: number[]) => {
      try {
        return await dispatch(deletePermissionsAsync(permissionIds)).unwrap();
      } catch (error) {
        console.error("Error deleting permission:", error);
        throw error;
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
      deletePermission,
      deletePermissionRoles
    },
  };
};
