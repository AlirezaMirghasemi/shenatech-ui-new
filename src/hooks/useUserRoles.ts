import { fetcher, mutator, swrConfig } from "@/lib/swrConfig";
import { ApiError, PaginatedResponse } from "@/types/Api";
import { Role } from "@/types/Role";
import { useCallback, useState } from "react";
import useSWR, { SWRResponse } from "swr";

export const useUserRoles = () => {
  const [params, setParams] = useState({
    page: "1",
    perPage: "5",
    search: "",
    userId: null as number | null,
  });
  //   const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  //   const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const getUserRolesKey = useCallback(() => {
    if (!params.userId) return null;
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.perPage) query.set("per_page", params.perPage);
    if (params.search) query.set("search", params.search);
    return `/users/${params.userId}/roles?${query.toString()}`;
  }, [params]);

  const {
    data: userRoles,
    error: userRolesError,
    mutate: mutateUserRoles,
  }: SWRResponse<PaginatedResponse<Role>, ApiError> = useSWR(
    getUserRolesKey(),
    fetcher,
    {
      ...swrConfig,
      keepPreviousData: true,
    }
  );
  const fetchUnAssignedUserRoles = useCallback(async (userId: number) => {
    setIsFetching(true);
    try {
      const response = await fetcher(`/users/${userId}/unassigned-roles`);
      return response.data;
    } catch (error) {
      console.error("Error fetching User roles:", error);
      throw error;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchUserRoles = useCallback(
    async (newParams: {
      userId: number;
      search?: string;
      page?: string;
      perPage?: string;
    }) => {
      setIsFetching(true);
      try {
        const shouldResetPage =
          (newParams.search !== undefined &&
            newParams.search !== params.search) ||
          newParams.userId !== params.userId;
        setParams((prev) => ({
          ...prev,
          ...newParams,
          //userId: newParams.userId,
          page: shouldResetPage ? "1" : newParams.page || prev.page,
        }));

        await mutateUserRoles();
      } catch (error) {
        console.error("Error fetching User roles:", error);
        throw error;
      } finally {
        setIsFetching(false);
      }
    },
    [mutateUserRoles, setParams, params.search, params.userId]
  );
  const assignRolesToUser = useCallback(
    async (roleIds: number[], userId: number) => {
      setIsEditing(true);
      try {
        const result = await mutator(`/users/${userId}/assign-roles`, "PUT", {
          roleIds: roleIds,
        });
        return result;
      } catch (error) {
        console.error("Error assigning roles to users:", error);
        throw error;
      } finally {
        setIsEditing(false);
      }
    },
    [mutateUserRoles]
  );

  const deleteUserFromRoles = useCallback(
    async (userId: number, roleIds: number[]) => {
      setIsDeleting(true);
      try {
        const result = await mutator(
          `/users/${userId}/revoke-roles`,
          "DELETE",
          {
            data: { roleIds: roleIds },
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
    [mutateUserRoles]
  );

  return {
    userRoles: userRoles?.data || [],
    meta: userRoles || ({} as PaginatedResponse<Role>),
    error:
      userRolesError && typeof userRolesError === "object"
        ? { message: userRolesError.message }
        : null,
    actions: { fetchUserRoles, assignRolesToUser, deleteUserFromRoles,fetchUnAssignedUserRoles },
    statuses: {
      //isCreating,
      isDeleting,
      //isCheckingUniqueness,
      isFetching,
      isEditing,
    },
    mutate: { mutateUserRoles },
  };
};
