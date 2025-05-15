import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import {
  assignRolePermissionsAsync,
  checkRoleNameIsUniqueAsync,
  createRoleAsync,
  deleteRolePermissionsAsync,
  fetchRolesAsync,
} from "@/store/thunks/roleThunk";

export const useRole = () => {
  const dispatch = useAppDispatch();
  const {
    data: roles,
    meta: meta,
    loading,
    error,
    uniqueLoading,
  } = useAppSelector((state) => state.roles);
const createRole = useCallback(
  (roleName: string) => {
    try {
      return dispatch(createRoleAsync( roleName )).unwrap();
    } catch (error) {
      console.error("Error creating role:", error);
      return null;
    }
  },
  [dispatch]
)

  const fetchRoles = useCallback(
    (page?: string, perPage?: string) => {
        try {
               return dispatch(fetchRolesAsync({ page, perPage })).unwrap();
        } catch (error) {
          console.error("Error fetching roles:", error);
          return [];
        }
    },
    [dispatch]
  );
  const assignRolePermissions = useCallback(
    (roleId: number, permissionIds: number[]) => {
        try {
          return  dispatch(assignRolePermissionsAsync({ roleId, permissionIds })).unwrap();
        } catch (error) {
          console.error("Error assigning role permissions:", error);
          return [];
        }
    },
    [dispatch]
  );
  const deleteRolePermissions = useCallback(
    (roleId: number, permissionIds: Set<number>) => {
      try {
        return dispatch(
          deleteRolePermissionsAsync({ roleId, permissionIds })
        ).unwrap();
      } catch (error) {
        console.error(
          "Error deleting role permissions for roleId:",
          roleId,
          error
        );
      }
    },
    [dispatch]
  );
  const roleNameIsUnique = useCallback(
    async (roleName: string): Promise<boolean> => {
      try {
        const result = await dispatch(checkRoleNameIsUniqueAsync(roleName)).unwrap();
        return result as boolean;
      } catch (error) {
        console.error("Error checking role name uniqueness:", error);
        return false;
      }
    },
    [dispatch]
  );

  return {
    roles,
    meta,
    error,
    loading,
    uniqueLoading,
    actions: {
      fetchRoles,
      assignRolePermissions,
      deleteRolePermissions,
      roleNameIsUnique,
      createRole,
    },
  };
};
