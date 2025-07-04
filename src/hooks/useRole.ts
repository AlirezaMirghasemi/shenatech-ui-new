import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import {
  assignRolePermissionsAsync,
  assignRoleToUsersAsync,
  checkRoleNameIsUniqueAsync,
  createRoleAsync,
  deleteRoleAsync,
  deleteRolePermissionsAsync,
  deleteUsersFromRoleAsync,
  editRoleAsync,
  fetchPermissionRolesAsync,
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
    assigned
  } = useAppSelector((state) => state.roles);
  const createRole = useCallback(
    (roleName: string) => {
      try {
        return dispatch(createRoleAsync(roleName)).unwrap();
      } catch (error) {
        console.error("Error creating role:", error);
        return null;
      }
    },
    [dispatch]
  );
  const editRole = useCallback(
    (roleId: number, roleName: string) => {
      try {
        return dispatch(editRoleAsync({ roleId, roleName })).unwrap();
      } catch (error) {
        console.error("Error editing role:", error);
        return null;
      }
    },
    [dispatch]
  );
  const deleteRole = useCallback(
    (roleId: number) => {
      try {
        return dispatch(deleteRoleAsync(roleId)).unwrap();
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    },
    [dispatch]
  );

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
        return dispatch(
          assignRolePermissionsAsync({ roleId, permissionIds })
        ).unwrap();
      } catch (error) {
        console.error("Error assigning role permissions:", error);
        return [];
      }
    },
    [dispatch]
  );
  const fetchPermissionRoles = useCallback(
      async (permissionId: number, perPage?: string, page?: string) => {
        try {
          return await dispatch(
            fetchPermissionRolesAsync({ permissionId, perPage, page })
          ).unwrap();
        } catch (error) {
          console.error("Error fetching permission roles:", error);
          throw error;
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
        const result = await dispatch(
          checkRoleNameIsUniqueAsync(roleName)
        ).unwrap();
        return result as boolean;
      } catch (error) {
        console.error("Error checking role name uniqueness:", error);
        return false;
      }
    },
    [dispatch]
  );
const assignRoleToUsers = useCallback(
  (roleId: number, userIds: number[]) => {
    try {
      return dispatch(assignRoleToUsersAsync({ roleId, userIds })).unwrap();
    } catch (error) {
      console.error("Error assigning role to users:", error);
      return null;
    }
  },
  [dispatch]
);
  const deleteUsersFromRole = useCallback(
  (roleId: number, userIds: Set<number>) => {
    try {
      return dispatch(deleteUsersFromRoleAsync({ roleId, userIds })).unwrap();
    } catch (error) {
      console.error("Error deleting users from role:", error);
      return null;
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
    assigned,
    actions: {
      fetchRoles,
      assignRolePermissions,
      deleteRolePermissions,
      roleNameIsUnique,
      createRole,
      editRole,
      deleteRole,
      fetchPermissionRoles,
      assignRoleToUsers,
      deleteUsersFromRole
    },
  };
};
