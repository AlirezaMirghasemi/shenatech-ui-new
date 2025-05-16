import { Permission } from "@/types/Permission";
import { DataStatus } from "../data/DataStatus";
import { ApiError, PaginatedResponse } from "@/types/Api";

export interface PermissionState {
  assigned: Permission[]; // permissions already on the role
  unassigned: Permission[]; // permissions not yet on the role
  data: Permission[];
  meta: PaginatedResponse<Permission>;
  loading: DataStatus;
  error: ApiError | null;
  uniqueLoading: DataStatus;
}
