import { UserStatus } from "@/constants/data/UserStatus";
import { fetcher, mutator, swrConfig } from "@/lib/swrConfig";
import { ApiError, PaginatedResponse } from "@/types/Api";
import { CreateUser, DeleteUser, EditUser, User } from "@/types/User";
import { useCallback, useState } from "react";
import useSWR, { mutate, SWRResponse } from "swr";

export const useUser = () => {
  const [params, setParams] = useState({
    page: "1",
    perPage: "5",
    search: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const getTagsKey = useCallback(() => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.perPage) query.set("per_page", params.perPage);
    if (params.search) query.set("search", params.search);
    return `/users?${query.toString()}`;
  }, [params]);
  const {
    data: users,
    error: usersError,
    isLoading: loading,
    mutate: mutateUsers,
  }: SWRResponse<PaginatedResponse<User>, ApiError> = useSWR(
    getTagsKey(),
    fetcher,
    {
      ...swrConfig,
      keepPreviousData: true,
    }
  );

  const createUser = useCallback(
    async (user: CreateUser, profileImage?: File) => {
      setIsCreating(true);
      try {
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
          if (
            key !== "profile_image" &&
            value !== null &&
            value !== undefined
          ) {
            formData.append(key, value as string);
          }
        });
        if (profileImage) {
          formData.append("profile_image", profileImage);
        }
        const newUser = await mutator("/users", "POST", formData);
        mutate((key: string) => key.startsWith("/users"), undefined, {
          revalidate: true,
        });

        return newUser;
      } catch (error) {
        console.error("خطا در ایجاد کاربر:", error);
        throw error as ApiError;
      } finally {
        setIsCreating(false);
      }
    },
    [mutate]
  );

  const deleteUser = useCallback(
    async (deleteUserData: DeleteUser) => {
      setIsDeleting(true);
      try {
        await mutator("/users/delete", "POST", {
          options: {
            removeProfilePicture: deleteUserData.removeProfilePicture,
            removeRoles: deleteUserData.removeRoles,
          },
        });
        mutate((key: string) => key.startsWith("/users"), undefined, {
          revalidate: true,
        });
      } catch (err) {
        console.error("خطا در حذف کاربر:", err);
        throw err as ApiError;
      } finally {
        setIsDeleting(false);
      }
    },
    [mutate] // اضافه کردن mutate به وابستگی‌ها
  );
  const fetchUsers = useCallback(
    async (newParams: { search?: string; page?: string; perPage?: string }) => {
      setIsFetching(true); // شروع دریافت داده‌ها
      try {
        const shouldResetPage =
          newParams.search !== undefined && newParams.search !== params.search;

        setParams((prev) => ({
          ...prev,
          ...newParams,
          page: shouldResetPage ? "1" : newParams.page || prev.page,
        }));
        await mutateUsers();
      } catch (error) {
        console.error("خطا در دریافت کاربران:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [mutateUsers, setParams, params.search]
  );
  const fetchRoleUsers = useCallback(
    async (roleId: number, newParams: { page?: string; perPage?: string }) => {
      setIsFetching(true);
      try {
        const result = await fetcher(`/roles/${roleId}/users`, {
          page: newParams.page || "1",
          per_page: newParams.perPage || "5",
        });
        return result;
      } catch (error) {
        console.error("خطا در دریافت کاربران با نقش:", error);
        throw error as ApiError;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );
  const fetchPermissionUsers = useCallback(
    async (
      permissionId: number,
      newParams: { page?: string; perPage?: string }
    ) => {
      setIsFetching(true);
      try {
        const result = await fetcher(`/permissions/${permissionId}/users`, {
          page: newParams.page || "1",
          per_page: newParams.perPage || "5",
        });
        return result;
      } catch (error) {
        console.error("خطا در دریافت کاربران با دسترسی:", error);
        throw error as ApiError;
      } finally {
        setIsFetching(false);
      }
    },
    []
  );

  const checkFieldIsUnique = useCallback(
    async ({
      fieldValue,
      fieldName,
    }: {
      fieldValue: string;
      fieldName: string;
    }): Promise<boolean> => {
      setIsCheckingUniqueness(true);
      try {
        const result = await fetcher("/users/field-is-unique", {
          fieldName: fieldName,
          fieldValue: fieldValue,
        });
        return result.isUnique;
      } catch (error) {
        console.error("خطا در بررسی تکراری بودن فیلد:", error);
        throw error as ApiError;
      } finally {
        setIsCheckingUniqueness(false);
      }
    },
    []
  );
  const editUserStatus = useCallback(
    async (userId: number, status: UserStatus) => {
      setIsEditing(true);
      try {
        const result = await mutator(`/users/${userId}/status`, "PUT", {
          status,
        });
        mutate((key: string) => key.startsWith("/users"), undefined, {
          revalidate: true,
        });
        return result;
      } catch (error) {
        console.error("خطا در ویرایش وضعیت کاربر:", error);
        throw error as ApiError;
      } finally {
        setIsEditing(false);
      }
    },
    [mutate]
  );

  const editUser = useCallback(
    async (userId: number, user: EditUser, profileImage?: File) => {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key !== "profile_image" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }
      setIsEditing(true);
      try {
        const result = await mutator(`/users/${userId}`, "POST", {
          formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        mutate((key: string) => key.startsWith("/users"), undefined, {
          revalidate: true,
        });
        return result;
      } catch (error) {
        console.error("خطا در ویرایش کاربر:", error);
        throw error as ApiError;
      } finally {
        setIsEditing(false);
      }
    },
    [mutate]
  );
 const fetchUnAssignedRoleUsers = useCallback(
    async (roleId: number) => {
        setIsFetching(true);
        try {
            const result=await fetcher(`/users/${roleId}/roles/unassigned`);
            return result;
        } catch (error) {
            console.error("خطا در دریافت نقش های بدون کاربر:", error);
            throw error as ApiError;
        }finally {
            setIsFetching(false);
        }
    },
    []
  );



  return {
     users: users?.data || [],
        meta: users || ({} as PaginatedResponse<User>),
    error:
      usersError && typeof usersError === "object"
        ? { message: usersError.message }
        : null,
    loading: loading || isFetching,

    actions: {
      createUser,
      editUser,
      deleteUser,
      fetchRoleUsers,
      fetchPermissionUsers,
      editUserStatus,
      fetchUsers,
      checkFieldIsUnique,
      fetchUnAssignedRoleUsers,
    },
    statuses:{
        isCreating,
        isEditing,
        isFetching,
        isCheckingUniqueness,
        isDeleting
    }
  };
};
