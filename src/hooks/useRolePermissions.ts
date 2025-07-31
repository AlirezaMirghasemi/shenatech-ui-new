import { fetcher, swrConfig } from "@/lib/swrConfig";
import { ApiError, PaginatedResponse } from "@/types/Api";
import { Role } from "@/types/Role";
import { useCallback, useState } from "react";
import useSWR, { SWRResponse } from "swr";

export const useRolePermissions = () => {
  const [params, setParams] = useState({
    page: "1",
    perPage: "5",
    search: "",
    permissionId: null as number | null,
  });

  //   const [isCreating, setIsCreating] = useState(false);
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [isDeleting, setIsDeleting] = useState(false);
  //   const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getPermissionRolesKey = useCallback(() => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.perPage) query.set("per_page", params.perPage);
    if (params.search) query.set("search", params.search);
    return `/permissions/${params.permissionId}/roles?${query.toString()}`;
  }, [params]);
  const {
    data: permissionRoles,
    error: permissionRolesError,
    mutate: mutatePermissionRoles,
  }: SWRResponse<PaginatedResponse<Role>, ApiError> = useSWR(
    getPermissionRolesKey(),
    fetcher,
    {
      ...swrConfig,
      keepPreviousData: true,
    }
  );
  const fetchPermissionRoles = useCallback(
    async (newParams: {
      permissionId: number;
      search?: string;
      page?: string;
      perPage?: string;
    }) => {
      setIsFetching(true);
      try {
        const shouldResetPage =
          (newParams.search !== undefined &&
            newParams.search !== params.search) ||
          newParams.permissionId !== params.permissionId;
        setParams((prev) => ({
          ...prev,
          ...newParams,
          permissionId: newParams.permissionId,
          page: shouldResetPage ? "1" : newParams.page || prev.page,
        }));

        await mutatePermissionRoles();
      } catch (error) {
        console.error("Error fetching permission roles:", error);
        throw error;
      } finally {
        setIsFetching(false);
      }
    },
    [mutatePermissionRoles, setParams, params.search, params.permissionId]
  );
  return {
    permissionRoles: permissionRoles?.data || [],
    meta: permissionRoles || ({} as PaginatedResponse<Role>),
    error:
      permissionRolesError && typeof permissionRolesError === "object"
        ? { message: permissionRolesError.message }
        : null,
    statuses: {
      //   isCreating,
      //   isDeleting,
      //   isCheckingUniqueness,
      isFetching,
      //isEditing,
    },
    actions: {
      fetchPermissionRoles,
    },
    mutate: {
      mutatePermissionRoles,
    },
  };
};
