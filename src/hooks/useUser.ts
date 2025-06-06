import { UserStatus } from "@/constants/data/UserStatus";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  checkFieldIsUniqueAsync,
  createUserAsync,
  editUserAsync,
  editUserStatusAsync,
  fetchPermissionUsersAsync,
  fetchRoleUsersAsync,
  fetchUnAssignedRoleUsersAsync,
  getUsersAsync,
} from "@/store/thunks/userThunk";
import { CreateUser, EditUser } from "@/types/User";
import { useCallback } from "react";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const {
    data: users,
    meta: meta,
    loading,
    error,
    uniqueLoading,
    unassignedRoleUsers
  } = useAppSelector((state) => state.users);
  const createUser = useCallback(
    async (user: CreateUser, profileImage?: File) => {
      try {
        return dispatch(createUserAsync({ user, profileImage })).unwrap();
      } catch (error) {
        console.error("Error creating permission:", error);
        throw error;
      }
    },
    [dispatch]
  );
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
  const checkFieldIsUnique = useCallback(
    async ({
      fieldValue,
      fieldName,
    }: {
      fieldValue: string;
      fieldName: string;
    }): Promise<boolean> => {
      try {
        const result = await dispatch(
          checkFieldIsUniqueAsync({
            fieldValue: fieldValue,
            fieldName: fieldName,
          })
        ).unwrap();
        return result as boolean;
      } catch (error) {
        console.error("Error checking field uniqueness:", error);
        return false;
      }
    },
    [dispatch]
  );

  const editUserStatus = useCallback(
    async (userId: number, status: UserStatus) => {
      try {
        return dispatch(editUserStatusAsync({ userId, status })).unwrap();
      } catch (error) {
        console.error("Error editing user status:", error);
        throw error;
      }
    },
    [dispatch]
  );
  const editUser = useCallback(
    async (userId: number, user: EditUser, profileImage?: File) => {
      try {
        return dispatch(editUserAsync({ userId, user, profileImage })).unwrap();
      } catch (error) {
        console.error("Error editing user:", error);
        throw error;
      }
    },
    [dispatch]
  );
  const fetchUnAssignedRoleUsers = useCallback(
    async (roleId: number) => {
      try {
        await dispatch(fetchUnAssignedRoleUsersAsync({ roleId })).unwrap();
      } catch (error) {
        console.error("Error fetching unassigned role users:", error);
      }
    },
    [dispatch]
  );
  return {
    users,
    meta,
    error,
    loading,
    uniqueLoading,
    unassignedRoleUsers,
    actions: {
      createUser,
      editUser,
      fetchRoleUsers,
      fetchPermissionUsers,
      editUserStatus,
      fetchUsers,
      checkFieldIsUnique,
      fetchUnAssignedRoleUsers
    },
  };
};
