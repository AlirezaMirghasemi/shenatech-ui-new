import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  checkFieldIsUniqueAsync,
  createUserAsync,
  fetchPermissionUsersAsync,
  fetchRoleUsersAsync,
  getUsersAsync,
} from "@/store/thunks/userThunk";
import { CreateUser } from "@/types/User";
import { useCallback } from "react";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const {
    data: users,
    meta: meta,
    loading,
    error,
    uniqueLoading,
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
  return {
    users,
    meta,
    error,
    loading,
    uniqueLoading,
    actions: {
      createUser,
      fetchRoleUsers,
      fetchPermissionUsers,
      fetchUsers,
      checkFieldIsUnique,
    },
  };
};
