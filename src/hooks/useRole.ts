import { fetcher, mutator, swrConfig } from "@/lib/swrConfig";
import { ApiError, PaginatedResponse } from "@/types/Api";
import { CreateRole, Role } from "@/types/Role";
import { useCallback, useState } from "react";
import useSWR, { mutate, SWRResponse } from "swr";

export const useRole = () => {
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

  const getRolesKey = useCallback(() => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.perPage) query.set("per_page", params.perPage);
    if (params.search) query.set("search", params.search);
    return `/roles?${query.toString()}`;
  }, [params]);

  const {
    data: roles,
    error: rolesError,
    isLoading: loading,
    mutate: mutateRoles,
  }: SWRResponse<PaginatedResponse<Role>, ApiError> = useSWR(
    getRolesKey(),
    fetcher,
    {
      ...swrConfig,
      keepPreviousData: true,
    }
  );

  const createRole = useCallback(
    async (name: CreateRole) => {
      setIsCreating(true);
      try {
        const newRole = await mutator("/roles", "POST", name);
        mutate((key: string) => key.startsWith("/roles"), undefined, {
          revalidate: true,
        });
        return newRole;
      } catch (err) {
        console.error("خطا در ایجاد مجوز:", err);
        throw err as ApiError;
      } finally {
        setIsCreating(false);
      }
    },
    [mutate]
  );

  const editRole = useCallback(
    async (roleId: number, name: string) => {
      setIsEditing(true);
      try {
        const editedRole = await mutator(`/roles/${roleId}`, "PUT", {
          name: name,
        });
        mutate((key: string) => key.startsWith("/roles"), undefined, {
          revalidate: true,
        });
        return editedRole;
      } catch (err) {
        console.error("خطا در ویرایش مجوز:", err);
        throw err as ApiError;
      } finally {
        setIsEditing(false);
      }
    },
    [mutate]
  );

  const deleteRole = useCallback(
    async (roleId: number) => {
      setIsDeleting(true);
      try {
        await mutator(`/roles/${roleId}`, "DELETE");
        mutate((key: string) => key.startsWith("/roles"), undefined, {
          revalidate: true,
        });
        return true;
      } catch (err) {
        console.error("خطا در حذف مجوز:", err);
        throw err as ApiError;
      } finally {
        setIsDeleting(false);
      }
    },
    [mutate]
  );

  const fetchRoles = useCallback(
    async (newParams: { search?: string; page?: string; perPage?: string }) => {
      setIsFetching(true);
      try {
        const shouldResetPage =
          newParams.search !== undefined && newParams.search !== params.search;

        setParams((prev) => ({
          ...prev,
          ...newParams,
          page: shouldResetPage ? "1" : newParams.page || prev.page,
        }));
        await mutateRoles();
      } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
      } finally {
        setIsFetching(false);
      }
    },
    [mutateRoles, setParams, params.search]
  );

  const assignRolePermissions = useCallback(
    async (roleId: number, permissionIds: number[]) => {
      setIsEditing(true);
      try {
        const result = await mutator(`/roles/${roleId}/permissions`, "POST", {
          permissions: permissionIds,
        });
        return result;
      } catch (error) {
        console.error("Error assigning permissions to role:", error);
        throw error;
      } finally {
        setIsEditing(false);
      }
    },
    [mutate]
  );

  const deleteRolePermissions = useCallback(
    async (roleId: number, permissionIds: number[]) => {
      setIsDeleting(true);
      try {
        const result = await mutator(
          `/roles/${roleId}/revoke-permissions`,
          "DELETE",
          {
            data: { permissionIds: permissionIds },
          }
        );
        return result;
      } catch (error) {
        console.error("Error deleting permissions from role:", error);
        throw error;
      } finally {
        setIsDeleting(false);
      }
    },
    [mutate]
  );

  const roleNameIsUnique = useCallback(
    async (roleName: string): Promise<boolean> => {
      setIsCheckingUniqueness(true);
      try {
        const response = await fetcher(
          `/roles/role-name-is-unique/${roleName}`
        );
        return response.isUnique;
      } catch (err) {
        console.error("خطا در بررسی یکتا بودن نام مجوز:", err);
        return false;
      } finally {
        setIsCheckingUniqueness(false);
      }
    },
    []
  );

  const assignRoleToUsers = useCallback(
    async (roleId: number, userIds: number[]) => {
      setIsEditing(true);
      try {
        const result = await mutator(`/roles/${roleId}/assign-users`, "PUT", {
          userIds: userIds,
        });
        return result;
      } catch (error) {
        console.error("Error assigning users to role:", error);
        throw error;
      } finally {
        setIsEditing(false);
      }
    },
    [mutate]
  );

  const deleteUsersFromRole = useCallback(
    async (roleId: number, userIds: number[]) => {
      setIsDeleting(true);
      try {
        const result = await mutator(
          `/roles/${roleId}/revoke-users`,
          "DELETE",
          {
            data: { userIds: userIds },
          }
        );
        return result;
      } catch (error) {
        console.error("Error deleting users from role:", error);
        throw error;
      } finally {
        setIsDeleting(false);
      }
    },
    [mutate]
  );

  return {
    roles: roles?.data || [],
    meta: roles || ({} as PaginatedResponse<Role>),
    error:
      rolesError && typeof rolesError === "object"
        ? { message: rolesError.message }
        : null,
    loading: loading || isFetching,

    actions: {
      fetchRoles,
      assignRolePermissions,
      deleteRolePermissions,
      roleNameIsUnique,
      createRole,
      editRole,
      deleteRole,
      assignRoleToUsers,
      deleteUsersFromRole,
    },
    statuses: {
      isCreating,
      isDeleting,
      isCheckingUniqueness,
      isFetching,
      isEditing,
    },
    mutate: { mutateRoles },
  };
};
