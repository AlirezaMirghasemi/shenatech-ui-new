import { Permission } from "@/types/Permission";
import { DataStatus } from "../data/DataStatus";
import { ApiError, PaginatedResponse } from "@/types/Api";

export interface PermissionState {
  data: Permission[] | [];
  meta?: PaginatedResponse<Permission>;
  loading: DataStatus;
  error: ApiError | null;
}
